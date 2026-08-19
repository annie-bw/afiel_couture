"""
Shrink the site's photographs to the size the pages actually draw them at.

Nothing here is a judgement call about how the pictures should look. Every one of
these files is already downscaled by the browser before you see it: a 2400px
photograph painted into a 300px swatch throws away seven eighths of its pixels
on the fly, every visit, on every device. This does that resize once, offline,
with a better filter than the browser's, and re-encodes at a high quality.

The guarantee, enforced per file rather than assumed: the candidate is only
written when it scores at least MIN_PSNR against the original *at the size the
page displays it*, which is the only comparison that matters. Below that bar the
script tries a larger size and a higher quality, and if nothing clears it the
original is kept untouched. So a file either gets smaller with no visible change,
or it does not get touched.

Originals are copied to originals/ first, outside public/ and gitignored, because
discarded pixels cannot be recovered later.

Run:  python scripts/optimize-images.py            (report only, writes nothing)
      python scripts/optimize-images.py --write
"""
import glob
import io
import math
import os
import re
import shutil
import sys

import numpy as np
from PIL import Image

WRITE = '--write' in sys.argv
MIN_PSNR = 40.0          # visually lossless; below ~35 dB differences start to show
MIN_GAIN = 0.15          # do not rewrite a file to save less than this share
BACKUP = 'originals'

# Widest CSS box each group is drawn in, doubled for retina screens. Sources:
# the max-w / aspect / height classes on the components that render them.
SLOTS = (
    ('/images/fabrics/',             600),  # swatch card
    ('/images/contact/',            2880),  # full-bleed section background
    ('/images/home/five_categories', 1120),  # category card, expanded state at lg
    ('/images/home/',               1240),  # story image, two-column at md
    ('/images/about/',              1240),  # about gallery
    ('/images/products/',            960),  # gallery card, aspect 2/3
    ('/images/services/',            960),  # service card, aspect 4/5
    ('/images/craftsmanship/',       750),  # archive slide, max-h 500
)
# Left alone: logos and the contact map are PNG line art and screenshots, where
# JPEG is the wrong tool, and the hero cutout is a WebP that needs its alpha.
SKIP = ('/images/logo-dark.png', '/images/logo-light.png', '/images/contact/map.png',
        '/images/home/hero-figure.webp', '/images/services/fabric-development/fabric-dyeing.webp')


def slot(path):
    for prefix, need in SLOTS:
        if path.startswith(prefix):
            return need
    return 1240


def psnr(a, b):
    a, b = np.asarray(a, np.float64), np.asarray(b, np.float64)
    mse = ((a - b) ** 2).mean()
    return 99.0 if mse == 0 else 10 * math.log10(255 * 255 / mse)


def referenced():
    out = set()
    for f in glob.glob('src/**/*.ts', recursive=True) + glob.glob('src/**/*.tsx', recursive=True):
        s = io.open(f, encoding='utf-8').read()
        for m in re.finditer(r"['\"](/(?:images|fabrics)/[^'\"]+)['\"]", s):
            out.add(m.group(1))
    return sorted(out)


def candidate(orig, width, quality):
    im = orig if orig.width <= width else orig.resize(
        (width, round(orig.height * width / orig.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=quality, optimize=True, progressive=True)
    return buf.getvalue(), im.size


print('%-58s %14s %14s %8s' % ('file', 'before', 'after', 'PSNR'))
before_total = after_total = 0
changed = kept = 0

for path in referenced():
    src = 'public' + path
    if not os.path.exists(src) or path in SKIP:
        continue
    size_before = os.path.getsize(src)
    before_total += size_before
    orig = Image.open(src)
    if orig.mode != 'RGB':
        orig = orig.convert('RGB')

    need = slot(path)
    display = min(need, orig.width)      # what the browser paints, in device px
    ref = orig if orig.width == display else orig.resize(
        (display, round(orig.height * display / orig.width)), Image.LANCZOS)

    best = None
    for width in (need, round(need * 1.3), round(need * 1.6), orig.width):
        width = min(width, orig.width)
        for quality in (90, 94):
            data, size = candidate(orig, width, quality)
            if len(data) > size_before * (1 - MIN_GAIN):
                continue
            got = Image.open(io.BytesIO(data)).convert('RGB')
            if got.size != ref.size:
                got = got.resize(ref.size, Image.LANCZOS)
            score = psnr(ref, got)
            if score >= MIN_PSNR:
                best = (data, size, score, width, quality)
                break
        if best:
            break

    if not best:
        kept += 1
        after_total += size_before
        print('%-58s %7.0f KB %5s %14s %8s' % (path[-58:], size_before / 1024,
                                               '%dpx' % orig.width, 'kept as is', '-'))
        continue

    data, size, score, width, quality = best
    changed += 1
    after_total += len(data)
    print('%-58s %7.0f KB %5s %7.0f KB %5s %6.1f dB  q%d' % (
        path[-58:], size_before / 1024, '%dpx' % orig.width,
        len(data) / 1024, '%dpx' % size[0], score, quality))

    if WRITE:
        keep = os.path.join(BACKUP, path.lstrip('/'))
        os.makedirs(os.path.dirname(keep), exist_ok=True)
        if not os.path.exists(keep):
            shutil.copy2(src, keep)
        with open(src, 'wb') as fh:
            fh.write(data)

print()
print('%d files rewritten, %d left alone' % (changed, kept))
print('%.1f MB -> %.1f MB  (%.0f%% smaller)' % (
    before_total / 1e6, after_total / 1e6, 100 * (1 - after_total / before_total)))
print('mode: %s' % ('WRITTEN, originals copied to %s/' % BACKUP if WRITE else 'dry run, nothing written'))
