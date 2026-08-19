"""
Package the built site as one archive to upload to a host by hand.

For hosts where you drag a zip into a file manager and extract it (Hostinger's
File Manager, cPanel, any FTP account). Paths inside the archive are relative to
dist/, so extracting inside public_html puts index.html at the web root rather
than at public_html/dist/index.html, which would serve nothing.

.htaccess is included and matters: it carries the rewrite that makes /services
and /products/... work when typed or refreshed. File managers hide dotfiles by
default, so after extracting, switch hidden files on to confirm it arrived.

Run:  npm run build && python scripts/make-upload-zip.py
"""
import os
import zipfile

DIST = 'dist'
OUT = 'afiel-couture-site.zip'
SKIP = {'.gitattributes'}          # only needed by git, not by the server

if not os.path.isdir(DIST):
    raise SystemExit('no dist/ found. Run: npm run build')

count = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for root, _, files in os.walk(DIST):
        for name in files:
            if name in SKIP:
                continue
            path = os.path.join(root, name)
            z.write(path, os.path.relpath(path, DIST))
            count += 1

with zipfile.ZipFile(OUT) as z:
    names = z.namelist()
    print('%s  %d files  %.1f MB' % (OUT, count, os.path.getsize(OUT) / 1e6))
    print('root of archive: %s' % ', '.join(sorted({p.split('/')[0] for p in names})))
    if '.htaccess' not in names:
        raise SystemExit('.htaccess missing: deep links would 404 on the host')
    print('.htaccess included')
