export type FabricCategory =
  | "All"
  | "Silk"
  | "Linen"
  | "Chiffon"
  | "Lace"
  | "Tulle"
  | "Ankara"
  | "Cotton"
  | "Wool"
  | "Karo"
  | "Tissin"
  | "Others"

export type Fabric = {
  id: string
  name: string
  category: Exclude<FabricCategory, "All">
  image: string
  note: string
}

// Images live in public/fabrics/ — swap any of these for your own shots later.
// Ordered by category, roughly nicest/most eye-catching first.
export const fabrics: Fabric[] = [
  // Silk
  {
    id: "silk-charmeuse",
    name: "Silk Charmeuse",
    category: "Silk",
    image: "/images/fabrics/silk-1.jpg",
    note: "A liquid drape with a soft pearl sheen — our most requested eveningwear cloth.",
  },
  {
    id: "silk-satin-spectrum",
    name: "Satin-Silk, Full Spectrum",
    category: "Silk",
    image: "/images/fabrics/silk-2.jpg",
    note: "Glossy, structured satin available across our entire colour range.",
  },
  // Linen
  {
    id: "linen-textured",
    name: "Textured Woven Linen",
    category: "Linen",
    image: "/images/fabrics/linen-1.jpg",
    note: "A slubbed, natural weave with real body and structure.",
  },
  {
    id: "linen-soft",
    name: "Soft Linen Blend",
    category: "Linen",
    image: "/images/fabrics/linen-2.jpg",
    note: "Lightly crinkled and soft-washed, in gentle muted tones.",
  },
  // Chiffon
  {
    id: "chiffon-organza",
    name: "Sheer Organza Chiffon",
    category: "Chiffon",
    image: "/images/fabrics/chiffon-1.jpg",
    note: "Featherlight and sheer, for layering, overlays, and movement.",
  },
  {
    id: "chiffon-rolls",
    name: "Organza Roll Collection",
    category: "Chiffon",
    image: "/images/fabrics/chiffon-2.jpg",
    note: "A rotating edit of sheer organza rolls across our full colourway.",
  },
  // Lace
  {
    id: "lace-guipure",
    name: "Floral Guipure Lace",
    category: "Lace",
    image: "/images/fabrics/lace-1.jpg",
    note: "Dimensional floral lacework, available in a full colour range.",
  },
  {
    id: "lace-beaded",
    name: "Hand-Beaded Bridal Lace",
    category: "Lace",
    image: "/images/fabrics/lace-2.jpg",
    note: "Delicate pearl and sequin embroidery, hand-finished for bridalwear.",
  },
  {
    id: "lace-sequin-blue",
    name: "Sequin-Beaded Lace",
    category: "Lace",
    image: "/images/fabrics/lace-3.jpg",
    note: "Richly beaded lace on sheer tulle, in a striking cobalt blue.",
  },
  // Tulle
  {
    id: "tulle-glitter",
    name: "Glitter Tulle",
    category: "Tulle",
    image: "/images/fabrics/tulle-1.jpg",
    note: "Fine mesh tulle finished with a scatter of glitter, in colour.",
  },
  {
    id: "tulle-bridal",
    name: "Bridal Glitter Tulle",
    category: "Tulle",
    image: "/images/fabrics/tulle-2.jpg",
    note: "Soft, voluminous tulle with a delicate shimmer — built for gowns.",
  },
  // Ankara
  {
    id: "ankara-wax-classic",
    name: "Classic Wax Print",
    category: "Ankara",
    image: "/images/fabrics/ankara-1.jpg",
    note: "Bold, graphic wax prints in our house selection of colourways.",
  },
  {
    id: "ankara-mudcloth",
    name: "Mudcloth-Style Print",
    category: "Ankara",
    image: "/images/fabrics/ankara-2.jpg",
    note: "Earth-toned geometric print, inspired by traditional mudcloth motifs.",
  },
  // Cotton
  {
    id: "cotton-twill",
    name: "Brushed Cotton Twill",
    category: "Cotton",
    image: "/images/fabrics/cotton-1.jpg",
    note: "A crisp, breathable weave in neutral, wearable tones.",
  },
  {
    id: "cotton-rolls",
    name: "Cotton Roll Collection",
    category: "Cotton",
    image: "/images/fabrics/cotton-2.jpg",
    note: "Solid-tone cotton available across a wide, ready-to-order colour range.",
  },
  // Wool
  {
    id: "wool-camel-coating",
    name: "Camel Coating Wool",
    category: "Wool",
    image: "/images/fabrics/wool-1.jpg",
    note: "A dense, felted coating wool in a warm camel tone — structured and clean-finished.",
  },
  {
    id: "wool-knit-stack",
    name: "Soft Knit Wool Blend",
    category: "Wool",
    image: "/images/fabrics/wool-2.jpg",
    note: "A soft, brushed knit wool available across neutral, earthy tones.",
  },
  // Karo (checked / gingham)
  {
    id: "karo-gingham",
    name: "Gingham Check",
    category: "Karo",
    image: "/images/fabrics/karo-1.jpg",
    note: "A classic woven check, soft-handed and easy to work with.",
  },
  {
    id: "karo-tartan",
    name: "Tartan Flannel Check",
    category: "Karo",
    image: "/images/fabrics/karo-2.jpg",
    note: "Soft brushed flannel in classic tartan check, built for structure and warmth.",
  },
  // Tissin (suiting cloth)
  {
    id: "tissin-pinstripe",
    name: "Pinstripe Suiting",
    category: "Tissin",
    image: "/images/fabrics/tissin-1.jpg",
    note: "Fine pinstripe suiting cloth, tailored and structured.",
  },
  {
    id: "tissin-solid",
    name: "Solid Suiting Cloth",
    category: "Tissin",
    image: "/images/fabrics/tissin-2.jpg",
    note: "Smooth, solid-tone suiting fabric in a range of shades.",
  },
  // Others (material not yet confirmed — rename/reassign once known)
  {
    id: "others-brocade",
    name: "Metallic Brocade",
    category: "Others",
    image: "/images/fabrics/others-1.jpg",
    note: "A richly textured jacquard-style cloth in pink and gold — material to be confirmed.",
  },
  {
    id: "others-cord-lace",
    name: "Cord Embroidery Cloth",
    category: "Others",
    image: "/images/fabrics/others-2.jpg",
    note: "A heavily embroidered cord-work cloth in orange and gold — material to be confirmed.",
  },
]

export const categories: FabricCategory[] = [
  "All",
  "Silk",
  "Linen",
  "Chiffon",
  "Lace",
  "Tulle",
  "Ankara",
  "Cotton",
  "Wool",
  "Karo",
  "Tissin",
  "Others",
]
