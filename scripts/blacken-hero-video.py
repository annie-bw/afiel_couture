"""
Replace the grey studio backdrop in the hero clip with the hero's own charcoal.

The clip is the moving version of the photograph scripts/make-hero-cutout.py
already handled, and the backdrop has the same two problems: it is rgb(~100)
grey behind the model and rgb(~185) on the floor, and a soft shadow pools at her
feet that no single brightness threshold separates from the gown's hem.

So the same three passes run on every frame:

  1  Flood inward from the frame edge over desaturated, light pixels. Inward
     only, so backdrop seen *through* the organza ruffles is kept.
  2  Gradient-following fill for the floor shadow: a step is allowed only when
     the luminance change from the pixel we came from is small, which the
     shadow's smooth falloff satisfies and the gown's hard edge does not.
  3  Enclosed backdrop, such as the gap between an arm and the body. This one
     works on connected components, not on a per-pixel brightness rule: her
     forehead carries a desaturated specular highlight that any global threshold
     punches a hole straight through. As regions they separate cleanly, since the
     grey wall seen through a gap reads 69-95 and that highlight reads ~157.

Pass 1 uses PIL's flood fill rather than a Python queue: at 217 frames the C
implementation is the difference between seconds and several minutes.

The fill colour is the hero section's charcoal, not #000. H.264 has no alpha
channel, so the frame is opaque whatever we do, and a pure black rectangle would
sit visibly darker than the section around it. #1C1A17 disappears into it.
"""
import os
import subprocess
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

FFMPEG = os.environ.get('FFMPEG', 'ffmpeg')
SRC = sys.argv[1] if len(sys.argv) > 1 else 'scripts/hero-video-source.mp4'
DST = sys.argv[2] if len(sys.argv) > 2 else 'public/videos/hero.mp4'

W, H, FPS = 512, 768, 24
FILL = np.array([0x1C, 0x1A, 0x17], dtype=np.float32)

SAT_MAX, LUM_MIN = 26, 62          # pass 1
SHADOW_SAT, SHADOW_LUM, STEP_MAX = 30, 34, 10   # pass 2
# pass 3, applied to whole components rather than single pixels
ENCLOSED_MIN_PX = 150       # smaller than this is invisible at 512x768
ENCLOSED_SAT_MAX = 22       # the wall is neutral; skin runs warmer
ENCLOSED_LUM = (60, 120)    # the wall through a gap; her highlights sit near 157
FLOOR_FROM = 0.80           # below this the bright grey is floor, not skin
FEATHER = 1.2

NEI = ((1, 0), (-1, 0), (0, 1), (0, -1))


def backdrop_mask(a):
    """Boolean mask of backdrop pixels in one RGB frame."""
    f = a.astype(np.int16)
    sat = f.max(axis=2) - f.min(axis=2)
    lum = f.mean(axis=2)
    cand = (sat <= SAT_MAX) & (lum >= LUM_MIN)

    # --- pass 1: border-connected candidates, via a padded C flood fill ------
    pad = np.zeros((H + 2, W + 2), dtype=np.uint8)
    pad[1:-1, 1:-1] = np.where(cand, 255, 0)
    pad[0, :] = pad[-1, :] = pad[:, 0] = pad[:, -1] = 255
    # .copy() is not decoration: fromarray hands back an image that shares the
    # numpy buffer and is flagged read-only, and floodfill then silently writes
    # nothing at all. Without it pass 1 returns an empty mask.
    im = Image.fromarray(pad, 'L').copy()
    ImageDraw.floodfill(im, (0, 0), 128, thresh=0)
    bg = np.asarray(im)[1:-1, 1:-1] == 128

    # --- pass 2: walk down the floor shadow's smooth falloff ----------------
    shadow_cand = (sat <= SHADOW_SAT) & (lum >= SHADOW_LUM)
    q = deque()
    ys, xs = np.nonzero(bg)
    for y, x in zip(ys.tolist(), xs.tolist()):
        if y > H * 0.5:                     # the shadow only lives near the floor
            q.append((y, x))
    while q:
        y, x = q.popleft()
        base = lum[y, x]
        for dy, dx in NEI:
            ny, nx = y + dy, x + dx
            if 0 <= ny < H and 0 <= nx < W and not bg[ny, nx] and shadow_cand[ny, nx]:
                if abs(lum[ny, nx] - base) <= STEP_MAX:
                    bg[ny, nx] = True
                    q.append((ny, nx))

    # --- pass 3: enclosed backdrop, judged region by region -----------------
    leftover = cand & ~bg
    if leftover.any():
        # Label each island by flood filling it with its own value. One fill per
        # island in C beats any per-pixel walk in Python, and 253 spare values is
        # more than a frame ever needs.
        work = Image.fromarray(np.where(leftover, 255, 0).astype(np.uint8), 'L').copy()
        label = 3
        while label < 256:
            arr = np.asarray(work)
            idx = int(np.argmax(arr == 255))
            if arr.flat[idx] != 255:
                break
            y, x = divmod(idx, W)
            ImageDraw.floodfill(work, (x, y), label, thresh=0)
            label += 1
        labels = np.asarray(work).astype(np.int32)

        flat = labels.ravel()
        size = np.bincount(flat, minlength=256).astype(np.float64)
        sum_lum = np.bincount(flat, weights=lum.ravel(), minlength=256)
        sum_sat = np.bincount(flat, weights=sat.ravel().astype(np.float64), minlength=256)
        top = np.full(256, H, dtype=np.int32)
        yy = np.repeat(np.arange(H, dtype=np.int32), W)
        np.minimum.at(top, flat, yy)

        keep = size >= ENCLOSED_MIN_PX
        keep[:3] = False                      # 0 is "not a candidate", 1-2 unused
        with np.errstate(invalid='ignore'):
            mean_lum = np.where(size > 0, sum_lum / np.maximum(size, 1), 0)
            mean_sat = np.where(size > 0, sum_sat / np.maximum(size, 1), 999)
        wall = (mean_lum >= ENCLOSED_LUM[0]) & (mean_lum <= ENCLOSED_LUM[1])
        floor = (mean_lum > ENCLOSED_LUM[1]) & (top >= FLOOR_FROM * H)
        drop = keep & (mean_sat <= ENCLOSED_SAT_MAX) & (wall | floor)
        if drop.any():
            bg |= drop[labels]
    return bg


def composite(a, bg):
    """Frame over the charcoal fill, with the mask edge feathered."""
    alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8), 'L')
    alpha = alpha.filter(ImageFilter.GaussianBlur(FEATHER))
    al = (np.asarray(alpha).astype(np.float32) / 255.0)[:, :, None]
    out = a.astype(np.float32) * al + FILL * (1.0 - al)
    return np.clip(out, 0, 255).astype(np.uint8)


dec = subprocess.Popen(
    [FFMPEG, '-hide_banner', '-v', 'error', '-i', SRC,
     '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
    stdout=subprocess.PIPE)
enc = subprocess.Popen(
    [FFMPEG, '-hide_banner', '-v', 'error', '-y',
     '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-',
     '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20',
     '-pix_fmt', 'yuv420p', '-movflags', '+faststart', DST],
    stdin=subprocess.PIPE)

n, removed, clipped = 0, [], []
size = W * H * 3
while True:
    buf = dec.stdout.read(size)
    if len(buf) < size:
        break
    a = np.frombuffer(buf, dtype=np.uint8).reshape(H, W, 3)
    bg = backdrop_mask(a)
    removed.append(100.0 * bg.sum() / bg.size)
    # The brief is that she stays visible head to toe, so note any frame where
    # the subject runs off the bottom of the source: nothing downstream can add
    # back what the clip never framed.
    if (~bg)[-1].any():
        clipped.append(n)
    enc.stdin.write(composite(a, bg).tobytes())
    n += 1
    if n % 24 == 0:
        print('  %3d frames, backdrop %.1f%%' % (n, removed[-1]), flush=True)

enc.stdin.close()
dec.stdout.close()
enc.wait()
dec.wait()
print('%d frames. backdrop removed: min %.1f%%  mean %.1f%%  max %.1f%%'
      % (n, min(removed), sum(removed) / len(removed), max(removed)))
if clipped:
    print('subject touches the bottom edge in %d/%d frames, from frame %d (%.2fs)'
          % (len(clipped), n, clipped[0], clipped[0] / FPS))
else:
    print('subject clear of the frame edge in all %d frames' % n)
print('wrote %s (%.0f KB)' % (DST, os.path.getsize(DST) / 1024))
