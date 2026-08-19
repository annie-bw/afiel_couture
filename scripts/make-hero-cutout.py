"""
Cut the grey studio backdrop out of the hero photograph.

Why: the backdrop is rgb(~95) grey at the top and rgb(~185) at the floor, while
the hero section behind it is rgb(28,26,23). Edge masking cannot fix that, since
the *interior* is a light block on a near-black field. Removing the backdrop lets
the figure sit straight on the charcoal.

Pass 1  Flood fill inward from the frame over desaturated, light pixels. Inward
        only, so grey seen through the organza ruffles is kept.
Pass 3  Enclosed backdrop, such as the gaps where the arms meet the body.
        Separable from organza-over-backdrop by brightness: ~92 versus 40-62.
Pass 2  Gradient-following fill for the soft shadow on the floor. Its core is too
        dark for pass 1 and it touches the gown's hem, so neither a brightness
        threshold nor island removal clears it. This walks down its smooth
        falloff instead: a step is allowed only if the luminance change from the
        pixel we came from is small, which the shadow satisfies and the gown's
        hard edge (floor ~185 straight to black ~20) does not.
"""
import os
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

SRC = 'originals/images/home/hero-section.jpg'
DST = 'public/images/home/hero-figure.webp'

im = Image.open(SRC).convert('RGB')
w, h = im.size
a = np.asarray(im).astype(np.int16)

sat = (a.max(axis=2) - a.min(axis=2)).astype(np.int16)
lum = a.mean(axis=2)

NEI = ((1, 0), (-1, 0), (0, 1), (0, -1))

# --- pass 1 -----------------------------------------------------------------
cand = (sat <= 26) & (lum >= 62)
bg = np.zeros((h, w), dtype=bool)
q = deque()
frame = np.zeros((h, w), dtype=bool)
frame[0, :] = frame[-1, :] = True
frame[:, 0] = frame[:, -1] = True
ys, xs = np.nonzero(frame & cand)
for y, x in zip(ys.tolist(), xs.tolist()):
    bg[y, x] = True
    q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in NEI:
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True
            q.append((ny, nx))
print('pass 1 removed %.1f%%' % (100.0 * bg.sum() / bg.size))

# --- pass 2 -----------------------------------------------------------------
SAT_MAX, LUM_FLOOR, STEP_MAX = 30, 34, 10
q = deque(zip(*(arr.tolist() for arr in np.nonzero(bg))))
grown = 0
while q:
    y, x = q.popleft()
    base = lum[y, x]
    for dy, dx in NEI:
        ny, nx = y + dy, x + dx
        if not (0 <= ny < h and 0 <= nx < w) or bg[ny, nx]:
            continue
        if sat[ny, nx] <= SAT_MAX and lum[ny, nx] >= LUM_FLOOR and abs(lum[ny, nx] - base) <= STEP_MAX:
            bg[ny, nx] = True
            grown += 1
            q.append((ny, nx))
print('pass 2 grew %d px, total removed %.1f%%' % (grown, 100.0 * bg.sum() / bg.size))

# --- pass 3 -----------------------------------------------------------------
# Backdrop fully enclosed by the figure, such as the gaps where her arms meet
# her body. Pass 1 works inward from the frame only, deliberately, so grey seen
# THROUGH the sheer organza survives. But that also spares these true-backdrop
# pockets. They are separable by brightness: measured at mean luminance ~92,
# the same as the outer backdrop, while organza-over-backdrop sits at 40-62.
ENCLOSED_LUM, ENCLOSED_MIN_PX = 75, 150
enclosed = cand & ~bg
lab = np.zeros((h, w), dtype=np.int32)
nxt = 0
cleared = 0
for sy in range(h):
    for sx in range(w):
        if enclosed[sy, sx] and lab[sy, sx] == 0:
            nxt += 1
            lab[sy, sx] = nxt
            cell = [(sy, sx)]
            q2 = deque([(sy, sx)])
            while q2:
                y, x = q2.popleft()
                for dy, dx in NEI:
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and enclosed[ny, nx] and lab[ny, nx] == 0:
                        lab[ny, nx] = nxt
                        cell.append((ny, nx))
                        q2.append((ny, nx))
            if len(cell) >= ENCLOSED_MIN_PX:
                mean_lum = sum(lum[y, x] for y, x in cell) / len(cell)
                if mean_lum >= ENCLOSED_LUM:
                    for y, x in cell:
                        bg[y, x] = True
                    cleared += len(cell)
print('pass 3 cleared %d px of enclosed backdrop, total removed %.1f%%'
      % (cleared, 100.0 * bg.sum() / bg.size))

alpha = np.where(bg, 0, 255).astype(np.uint8)
alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(1.4))

out = im.convert('RGBA')
out.putalpha(alpha_img)
out = out.crop(out.getbbox())
print('cropped to figure: %dx%d (was %dx%d)' % (out.size[0], out.size[1], w, h))

out.save(DST, 'WEBP', quality=90, method=6)
print('wrote %s  %.0f KB' % (DST, os.path.getsize(DST) / 1024))
