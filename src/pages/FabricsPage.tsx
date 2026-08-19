import { FabricCollection } from "../components/FabricCollection"
import usePageMeta from '../lib/usePageMeta';

export default function FabricsPage() {
  usePageMeta(
    'Fabrics in Store',
    'Ankara, lace, silk, chiffon, cotton, linen, tulle, wool and tissin, dyed and finished at our own mill in Kigali. Come and see what is in store.',
  );

  return (
    // FabricCollection brings its own py-16 (64px). The unscrolled navbar is
    // 108px tall, so this adds the remainder to clear it: 32 + 64 = 96px, and
    // 48 + 64 = 112px from md up. That matches the Products and Services pages.
    <main className="bg-pearl pt-8 md:pt-12">
      <FabricCollection />
    </main>
  )
}
