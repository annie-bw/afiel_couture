import { IMAGE_VERSIONS } from '../data/imageVersions';

/**
 * Appends a content hash to an image path: /images/a.jpg -> /images/a.jpg?v=39282bfb
 *
 * This is what lets the server cache images for a year. Photograph filenames are
 * chosen by hand and stay the same when a picture is swapped, so a long cache on
 * a bare filename would leave visitors looking at the old photograph until the
 * cache expired. The hash changes with the file, so the URL does too, and the new
 * picture appears immediately while the old one stays cached for whoever still
 * has it.
 *
 * Paths without an entry are returned untouched, so nothing breaks if the
 * manifest has not been regenerated.
 */
export default function imageUrl(path: string): string;
export default function imageUrl(path: string | undefined): string | undefined;
export default function imageUrl(path: string | undefined): string | undefined {
  if (!path) return path;
  const version = IMAGE_VERSIONS[path];
  return version ? `${path}?v=${version}` : path;
}
