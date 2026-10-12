/* ------------------------------------------------------------------ */
/*  Saint James Cosmetics — site data                                  */
/*  Catalog structure, services and story are drawn from the real      */
/*  Saint James Cosmetics (Patricia Saint James, Beverly Hills /       */
/*  Palos Verdes Estates, CA).                                         */
/* ------------------------------------------------------------------ */

export const BUSINESS = {
  name: "Saint James Cosmetics",
  founder: "Patricia Saint James",
  motto: "Beauty That Is Love From Within",
  phone: "(310) 494-8094",
  phoneHref: "tel:+13104948094",
  email: "PSJCosmetics@Yahoo.com",
  emailHref: "mailto:PSJCosmetics@Yahoo.com",
  city: "Palos Verdes Estates, California 90274",
  facebook: "https://www.facebook.com/SaintJamesCosmetics/",
};

export type CategoryId = "face" | "eyes" | "lips" | "skin" | "kits" | "glitter";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "face",
    name: "Face",
    tagline: "Foundations · Powders · Blush",
    description:
      "Bases blended to perfection for rich, exotic skin tones — never ashy, never flat. A flawless canvas in your true shade.",
    image:
      "https://images.pexels.com/photos/7256102/pexels-photo-7256102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Foundation, concealer and compact powder arranged on a warm beige background",
  },
  {
    id: "eyes",
    name: "Eyes",
    tagline: "Shadows · Liners · Brow Cakes",
    description:
      "Velvet shadows, precision liners and brow cakes in the most vibrant of colors — pigment that honors deeper skin.",
    image:
      "https://images.pexels.com/photos/4938194/pexels-photo-4938194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Eyeshadow palette with gold jewelry resting on an open book over marble",
  },
  {
    id: "lips",
    name: "Lips & Tips",
    tagline: "Lipsticks · Lip Service",
    description:
      "Signature lip color — bold, daring and dynamic — paired with Lip Service care that keeps lips soft, smooth and ready.",
    image:
      "https://images.pexels.com/photos/7090361/pexels-photo-7090361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A red lipstick photographed against a black backdrop",
  },
  {
    id: "skin",
    name: "Skin",
    tagline: "Skin Basics · Bath Enhancers",
    description:
      "Skin-care for all types of skin, and delicious bath enhancers. The quiet ritual beneath every beautiful face.",
    image:
      "https://images.pexels.com/photos/9774655/pexels-photo-9774655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A woman massaging cream into her face during her skincare ritual",
  },
  {
    id: "kits",
    name: "Bags & Kits",
    tagline: "Cosmetic Bags · The Essentials",
    description:
      "Beautifully kept essentials. Saint James cosmetic bags and curated kits for the woman whose beauty travels with her.",
    image:
      "https://images.pexels.com/photos/4938502/pexels-photo-4938502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Makeup essentials and a leather cosmetic pouch arranged on marble",
  },
  {
    id: "glitter",
    name: "Fun Stuff",
    tagline: "Glitter · Evening Sparkle",
    description:
      "For galas, stages and nights that ask for more. A touch of glitter — because Saint James women are never overlooked.",
    image:
      "https://images.pexels.com/photos/18854495/pexels-photo-18854495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Close-up beauty portrait with vibrant teal eyeshadow",
  },
];

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  tagline: string;
  description: string;
  benefits: string[];
  shades?: string[];
  image: string;
  alt: string;
  badge?: "Signature" | "Best Loved" | "New Discovery";
}

export const PRODUCTS: Product[] = [
  {
    id: "silk-liquid-foundation",
    name: "Silk Perfection Liquid Foundation",
    category: "face",
    categoryLabel: "Face · Foundations",
    price: 42,
    tagline: "Your skin, at its most luminous",
    description:
      "A weightless liquid foundation blended especially for women of color and exotic skin tones. It evens, warms and illuminates — matching the richness of your complexion rather than masking it. Formulated with a discriminating selection of natural ingredients.",
    benefits: [
      "Blended for golden, warm and deep undertones",
      "Buildable medium-to-full coverage with a skin-like finish",
      "Never grey or ashy on rich skin tones",
      "Complimentary shade matching by phone with Patricia's studio",
    ],
    shades: ["Porcelain Sand", "Warm Honey", "Golden Amber", "Rich Bronze", "Chestnut Glow", "Mahogany", "Deep Ebony"],
    image:
      "https://images.pexels.com/photos/7256092/pexels-photo-7256092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Foundation, concealer and blending sponge displayed on a white surface",
    badge: "Signature",
  },
  {
    id: "perfecting-pressed-powder",
    name: "Perfecting Pressed Powder",
    category: "face",
    categoryLabel: "Face · Powders & Blush",
    price: 34,
    tagline: "A soft-focus finish that lasts",
    description:
      "A finely milled pressed powder that sets foundation, softens shine and leaves skin looking polished — never powdered. True-to-tone pigments keep deeper complexions radiant.",
    benefits: [
      "Sets makeup without dulling your natural warmth",
      "Fine texture — no chalkiness, no flashback",
      "Ideal for touch-ups throughout the day",
      "Pairs perfectly with Silk Perfection Foundation",
    ],
    shades: ["Light Sand", "Honey Beige", "Amber Veil", "Bronze Silk", "Cocoa Matte"],
    image:
      "https://images.pexels.com/photos/7256102/pexels-photo-7256102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Compact powder and foundation products in a flat lay on beige",
    badge: "Best Loved",
  },
  {
    id: "radiance-blush",
    name: "Radiance Blush",
    category: "face",
    categoryLabel: "Face · Powders & Blush",
    price: 28,
    tagline: "The warmth of a compliment, in color",
    description:
      "Vibrant yet refined blush shades chosen to glow against deeper skin — from a whisper of rose to a confident wash of berry. Color that reads as health, not costume.",
    benefits: [
      "High-pigment color that shows beautifully on rich skin",
      "Blendable, buildable intensity",
      "Satin finish — youthful, never glittery",
      "A little goes a very long way",
    ],
    shades: ["Rosewood", "Spiced Peach", "Berry Divine", "Burnt Coral"],
    image:
      "https://images.pexels.com/photos/4938198/pexels-photo-4938198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Elegant beauty products and jewelry arranged on an open book",
  },
  {
    id: "velvet-eye-shadow",
    name: "Velvet Eye Shadow Collection",
    category: "eyes",
    categoryLabel: "Eyes · Eye Shadows",
    price: 38,
    tagline: "Color with intention",
    description:
      "An edited collection of velvet shadows — deep jewel tones, warm metallics and essential neutrals — with the pigment payoff women of color deserve. Silky to apply, dramatic to wear.",
    benefits: [
      "Rich pigment that stays true on deeper lids",
      "Matte, satin and shimmer finishes in one collection",
      "Blendable, crease-resistant wear",
      "Daytime polish to evening drama",
    ],
    shades: ["Golden Hour", "Emerald Reign", "Smoked Plum", "Copper Fire"],
    image:
      "https://images.pexels.com/photos/4938194/pexels-photo-4938194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Eyeshadow palette with gold jewelry on an open book over marble",
    badge: "Best Loved",
  },
  {
    id: "precision-eyeliner",
    name: "Precision Eyeliner Pencil",
    category: "eyes",
    categoryLabel: "Eyes · Eyeliners",
    price: 18,
    tagline: "The line that defines the look",
    description:
      "A smooth-gliding eyeliner pencil that delivers a clean, confident line in a single pass. Soft enough to smudge for evening, precise enough for the sharpest wing.",
    benefits: [
      "Intense, even color payoff",
      "Glides without tugging the delicate eye area",
      "Smudge-able when soft, set when sharp",
      "A staple of Patricia's own teaching kit",
    ],
    shades: ["Onyx Black", "Espresso Brown", "Midnight Navy"],
    image:
      "https://images.pexels.com/photos/7256073/pexels-photo-7256073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Makeup products with clean lines on a beige and white backdrop",
  },
  {
    id: "cake-liner-brow",
    name: "Cake Eyeliner & Brow Cake Duo",
    category: "eyes",
    categoryLabel: "Eyes · Liners & Cakes",
    price: 24,
    tagline: "Old-Hollywood technique, modern ease",
    description:
      "The professional's secret: water-activated cake liner for the most elegant eye line, paired with a brow cake that shapes and fills with a natural, powdered softness.",
    benefits: [
      "Water-activated — control the intensity yourself",
      "The classic Hollywood technique Patricia teaches",
      "Brow cake fills softly; never harsh or drawn-on",
      "Exceptionally long-wearing",
    ],
    shades: ["Classic Black / Soft Brown", "Charcoal / Taupe", "Deep Brown / Auburn"],
    image:
      "https://images.pexels.com/photos/7256160/pexels-photo-7256160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Flat lay of makeup brushes and cosmetics on a beige background",
    badge: "New Discovery",
  },
  {
    id: "signature-lipstick",
    name: "Saint James Signature Lipstick",
    category: "lips",
    categoryLabel: "Lips & Tips · Lipsticks",
    price: 26,
    tagline: "Bold, daring and dynamic",
    description:
      "Our signature lipstick in the most vibrant of colors — formulated to flatter women of color and exotic skin tones. Creamy, confident color that announces a woman who knows who she is.",
    benefits: [
      "Vibrant shades chosen for rich, exotic skin tones",
      "Creamy comfort with a polished satin finish",
      "Color that lasts through conversation and dinner",
      "The finishing touch Patricia is known for",
    ],
    shades: ["Scarlet Statement", "Berry Bold", "Wine Divine", "Copper Kiss", "Coral Flame", "Nude Silk"],
    image:
      "https://images.pexels.com/photos/7090361/pexels-photo-7090361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Red lipstick photographed against a black backdrop",
    badge: "Signature",
  },
  {
    id: "lipstick-trio",
    name: "The Lipstick Wardrobe — Trio",
    category: "lips",
    categoryLabel: "Lips & Tips · Lipsticks",
    price: 58,
    tagline: "Day, evening, and unforgettable",
    description:
      "Three Saint James lipsticks curated as a wardrobe: an everyday nude, a confident berry, and a signature red. One for every room you walk into.",
    benefits: [
      "Three shades for three moods",
      "Curated to work together across seasons",
      "Beautifully presented for gifting",
      "Our most requested combination",
    ],
    shades: ["The Classic Trio", "The Gala Trio", "The Berry Trio"],
    image:
      "https://images.pexels.com/photos/4889718/pexels-photo-4889718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Three lipsticks arranged on a marble surface",
  },
  {
    id: "lip-service-treatment",
    name: "Lip Service — Lip Treatment",
    category: "lips",
    categoryLabel: "Lips & Tips · Lip Service",
    price: 22,
    tagline: "Care before color",
    description:
      "Lip Service is the ritual beneath the lipstick: a nourishing treatment that smooths, softens and prepares lips so color glides on evenly and wears beautifully.",
    benefits: [
      "Softens and smooths dry lips",
      "Creates the perfect canvas for lipstick",
      "Lovely worn alone for a natural sheen",
      "A nightly ritual Patricia recommends to every client",
    ],
    image:
      "https://images.pexels.com/photos/8128064/pexels-photo-8128064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Cosmetic jars casting soft shadows on a beige background",
    badge: "Best Loved",
  },
  {
    id: "skin-basics-cleanser",
    name: "Skin Basics Gentle Cleanser",
    category: "skin",
    categoryLabel: "Skin · Skin Basics",
    price: 30,
    tagline: "Where every beautiful face begins",
    description:
      "The first step of Skin Basics: a gentle, thorough cleanser for all types of skin that lifts away the day while respecting your skin's natural balance.",
    benefits: [
      "For all types of skin",
      "Removes makeup and city residue gently",
      "Skin feels clean, never stripped",
      "Step one of the Saint James skin ritual",
    ],
    image:
      "https://images.pexels.com/photos/8128067/pexels-photo-8128067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Elegant cosmetic products arranged with crystals on a pastel surface",
  },
  {
    id: "skin-basics-moisturizer",
    name: "Skin Basics Moisture Crème",
    category: "skin",
    categoryLabel: "Skin · Skin Basics",
    price: 46,
    tagline: "The canvas beneath the color",
    description:
      "A nourishing moisture crème for all types of skin. Because foundation is only ever as beautiful as the skin beneath it — this is where the glow actually starts.",
    benefits: [
      "Deep, comfortable hydration for all skin types",
      "Smooths the canvas for flawless foundation",
      "Formulated with natural ingredients",
      "Morning and evening ritual essential",
    ],
    image:
      "https://images.pexels.com/photos/5240684/pexels-photo-5240684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A woman applying face cream during her morning ritual at a mirror",
    badge: "Signature",
  },
  {
    id: "bath-enhancer",
    name: "Delicious Bath Enhancer",
    category: "skin",
    categoryLabel: "Skin · Bath Enhancers",
    price: 32,
    tagline: "An hour that belongs only to you",
    description:
      "Our delicious bath enhancers turn an ordinary bath into a ceremony. Draw the water, light a candle, and let the day dissolve — beauty that is love from within, practiced.",
    benefits: [
      "Transforms bath time into a restorative ritual",
      "Leaves skin soft and delicately scented",
      "The perfect companion to an evening of self-care",
      "A beautiful gift for a woman who does everything",
    ],
    image:
      "https://images.pexels.com/photos/6724531/pexels-photo-6724531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Serene spa bath with aromatic candles and fresh flowers",
  },
  {
    id: "cosmetic-bag",
    name: "The Saint James Cosmetic Bag",
    category: "kits",
    categoryLabel: "Bags & Kits · Cosmetic Bags",
    price: 38,
    tagline: "Beauty, beautifully kept",
    description:
      "Our signature cosmetic bag — roomy enough for your full ritual, refined enough for the finest vanity. Because a Saint James woman's beauty travels in style.",
    benefits: [
      "Fits your complete daily ritual",
      "Wipe-clean interior for real life",
      "Elegant enough to carry as a clutch",
      "Arrives ready for gifting",
    ],
    shades: ["Espresso", "Champagne", "Classic Black"],
    image:
      "https://images.pexels.com/photos/29864946/pexels-photo-29864946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Cosmetic bag with skincare products and brushes on a wooden surface",
  },
  {
    id: "essentials-kit",
    name: "The Essentials Kit",
    category: "kits",
    categoryLabel: "Bags & Kits · Kits",
    price: 89,
    tagline: "Patricia's edit, in one beautiful case",
    description:
      "The complete Saint James beginning: foundation, pressed powder, a signature lipstick and Lip Service treatment in our professional brush case. Everything Patricia reaches for first.",
    benefits: [
      "The four essentials Patricia recommends starting with",
      "Professional brush case included",
      "Shade consultation included with every kit",
      "The finest introduction to Saint James",
    ],
    shades: ["Light–Medium", "Medium–Deep", "Deep–Rich"],
    image:
      "https://images.pexels.com/photos/12490383/pexels-photo-12490383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Makeup brushes neatly arranged in a professional case",
    badge: "Signature",
  },
  {
    id: "glamour-glitter",
    name: "Glamour Glitter — Evening Sparkle",
    category: "glitter",
    categoryLabel: "Fun Stuff · Glitter",
    price: 16,
    tagline: "For nights that ask for more",
    description:
      "A fine, elegant glitter for eyes, shoulders and décolletage — gala-ready sparkle that catches candlelight beautifully. Bold, daring and dynamic, exactly as promised.",
    benefits: [
      "Fine texture — elegant, never chunky",
      "Made for galas, stages and celebrations",
      "Layer over shadow or wear at the collarbone",
      "A little ceremony in a small jar",
    ],
    shades: ["Champagne Gold", "Bronze Fire", "Emerald Night", "Ruby Gala"],
    image:
      "https://images.pexels.com/photos/15539395/pexels-photo-15539395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Sophisticated portrait of a woman with gold jewelry against a golden backdrop",
    badge: "New Discovery",
  },
];

/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  format: string;
  description: string;
  includes: string[];
  image: string;
  alt: string;
}

export const SERVICES: Service[] = [
  {
    id: "makeup-lesson",
    name: "The Private Makeup Lesson",
    tagline: "Learn the techniques. Keep them for life.",
    duration: "90 minutes",
    format: "One-on-one with Patricia",
    description:
      "Patricia has taught many of her clients how to use simple industry techniques and basic products to enhance their own natural appearance. In this private lesson, she will do the same for you — building a complete look on your own face, with your own hands, so you can recreate it every morning with confidence.",
    includes: [
      "A full-face lesson, step by step, on your own features",
      "Simple professional techniques you will actually use",
      "An honest edit of your current makeup bag",
      "Your personalized Saint James product recommendations",
      "A written routine card to take home",
    ],
    image:
      "https://images.pexels.com/photos/6954005/pexels-photo-6954005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A makeup artist applying eyeshadow to a client in a bright beauty studio",
  },
  {
    id: "beauty-consultation",
    name: "The Beauty & Shade Consultation",
    tagline: "Your true shades, finally.",
    duration: "45 minutes",
    format: "In studio or by phone",
    description:
      "Finding foundation and color that honors rich, exotic skin tones should never be guesswork. In this consultation we identify your undertone, match your perfect Saint James shades, and design a simple daily routine around your life — not around a trend.",
    includes: [
      "Undertone and shade-matching analysis",
      "Your perfect foundation and powder shades, tested",
      "A simple daily routine designed for your schedule",
      "Color palette guidance for eyes and lips",
      "Complimentary follow-up shade check by phone",
    ],
    image:
      "https://images.pexels.com/photos/8091883/pexels-photo-8091883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A makeup artist applying eye makeup to a woman, showing precision and care",
  },
  {
    id: "events",
    name: "Events, Galas & Beauty Shows",
    tagline: "Saint James, center stage.",
    duration: "By engagement",
    format: "Galas · Fundraisers · Fashion & beauty shows",
    description:
      "Patricia Saint James is a spokesperson and mistress of ceremony for numerous charity events, benefits and fundraisers — and producing successful fashion and beauty shows for those of all ages to enjoy is one of her favorite pastimes. Bring that presence, polish and beauty expertise to your event.",
    includes: [
      "Event makeup for hosts, honorees and speakers",
      "Spokesperson & mistress of ceremony services",
      "Fashion & beauty show production",
      "Backstage beauty for models of all ages",
      "Charity and fundraising partnership experience",
    ],
    image:
      "https://images.pexels.com/photos/7984906/pexels-photo-7984906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A makeup artist applying cosmetics to a mature woman in a salon setting",
  },
];

/* ------------------------------------------------------------------ */

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "find-your-undertone",
    title: "Finding Your True Undertone: Patricia's Guide for Rich Skin",
    category: "Beauty Tips",
    excerpt:
      "Golden, warm, neutral or deep — the secret to foundation that disappears into your skin begins with one word: undertone.",
    readTime: "4 min read",
    image:
      "https://images.pexels.com/photos/8765302/pexels-photo-8765302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Portrait of a woman in a beige top conveying elegance and contemplation",
    body: [
      "The most common frustration women of color share with me is foundation that looks grey, orange or simply wrong. Almost always, the problem is not the shade depth — it is the undertone. Depth is how light or deep your skin is. Undertone is the warmth living beneath it.",
      "Begin in natural light, bare-faced. Look at the skin along your jaw and neck. If it reads golden, amber or warm brown, your undertone is warm. If it reads rich and neutral — neither golden nor rosy — you are likely neutral. Saint James foundations are blended across this full spectrum precisely because exotic skin tones refuse to sit in three beige boxes.",
      "A professional trick I teach every client: test foundation on your jawline, never your hand, and walk to a window. The right shade disappears within a minute as it warms to your skin. If you can see where it ends, it is not your shade — and you should never have to blend a wrong color into submission.",
      "When in doubt, ask. Shade matching is a conversation we love having, and a complimentary consultation is only a phone call away. Your perfect shade exists. It was blended with you in mind.",
    ],
  },
  {
    id: "five-minute-face",
    title: "The Five-Minute Face: Simple Techniques, Beautiful Results",
    category: "Beauty Tips",
    excerpt:
      "Patricia has always believed in simple industry techniques and basic products. Here is her five-minute morning, exactly as she teaches it.",
    readTime: "3 min read",
    image:
      "https://images.pexels.com/photos/5240684/pexels-photo-5240684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A woman applying face cream during her morning routine at a mirror",
    body: [
      "I have spent years teaching clients that a beautiful face does not require forty products — it requires the right few, applied with simple technique. Here is the five-minute face I teach in my private lessons.",
      "Minute one: moisturized skin. Skin Basics Moisture Crème, pressed — not rubbed — into the face. Foundation applied over dry skin will always look like makeup; over cared-for skin, it looks like you. Minutes two and three: foundation only where you need it, blended outward with warm fingers or a damp sponge. Perfection is not the goal — evenness is.",
      "Minute four: pressed powder through the center of the face only, leaving the cheeks luminous, and a sweep of blush high on the cheekbone. Minute five: one coat of color on the lips. A defined lip makes the entire face look intentional, even with bare eyes.",
      "That is all. Five minutes, five products, and you walk out looking like yourself on your best day — which is the only goal worth having.",
    ],
  },
  {
    id: "lipstick-confidence",
    title: "Bold Lip, Bold Woman: Wearing Vibrant Color with Confidence",
    category: "Beauty Tips",
    excerpt:
      "Bold, daring and dynamic is not a slogan — it is an invitation. How to choose and wear the vibrant lip color your skin tone was made for.",
    readTime: "4 min read",
    image:
      "https://images.pexels.com/photos/30168330/pexels-photo-30168330.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Portrait of a confident woman in a bold red outfit with an afro hairstyle",
    body: [
      "There is a moment in every consultation when a client tries a truly vibrant lipstick — a scarlet, a berry, a wine — and sits up straighter. Rich skin tones were made for saturated color. What looks overwhelming in the tube becomes luminous on deep, warm skin.",
      "Begin with preparation: Lip Service treatment first, always. Color over dry lips cracks and fades unevenly; over cared-for lips it wears like satin. Next, choose by undertone. Golden skin glows in coral, copper and warm reds. Deeper, neutral skin carries berry, plum and wine magnificently.",
      "Apply from the center outward, blot once, and apply a second thin layer. This is the industry technique for color that survives dinner and conversation. Then — and this matters — wear it somewhere ordinary first. Confidence is a habit, and habits are built in grocery stores before galas.",
      "Our motto is beauty that is love from within. A bold lip is simply that love, made visible.",
    ],
  },
  {
    id: "evening-glitter",
    title: "An Elegant Guide to Evening Glitter",
    category: "New Discoveries",
    excerpt:
      "Glitter, worn the Saint James way: a whisper of candlelight on the skin, never a costume. Placement is everything.",
    readTime: "3 min read",
    image:
      "https://images.pexels.com/photos/15539395/pexels-photo-15539395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Woman adorned with gold jewelry against a golden backdrop",
    body: [
      "Glitter has a reputation problem — too often it is applied like decoration instead of light. Worn correctly, it is the most elegant thing a woman can bring to an evening: candlelight, carried on the skin.",
      "The rule is placement and restraint. Choose one location only. At the inner corner of the eye, glitter opens and brightens. Pressed at the center of the lid over shadow, it adds dimension that photographs beautifully. Swept along the collarbone and shoulders, it turns a neckline into an occasion.",
      "Press — never swipe — glitter over a slightly tacky base so it stays where you placed it. And keep the rest of the face serene: luminous skin, a defined lip, and one constellation of light. That contrast is what makes it read as luxury rather than costume.",
      "For galas, fundraisers and nights that ask for more, this is your finishing touch. Bold, daring and dynamic — with impeccable manners.",
    ],
  },
  {
    id: "skin-basics-ritual",
    title: "Skin Basics: The Ritual Beneath Every Beautiful Face",
    category: "Beauty Tips",
    excerpt:
      "Makeup enhances; skin care decides. The simple Saint James ritual for skin that makes foundation almost optional.",
    readTime: "5 min read",
    image:
      "https://images.pexels.com/photos/6810869/pexels-photo-6810869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "A woman gently applying skincare cream to her face in natural light",
    body: [
      "Every great makeup application I have ever done began the night before. Skin that is cleansed, hydrated and rested receives foundation like silk; neglected skin fights it. This is why Saint James carries Skin Basics alongside our color — the ritual beneath the beauty.",
      "Evening: cleanse thoroughly but gently, removing the day without stripping the skin. While skin is still slightly damp, apply Moisture Crème and press it in with warm palms. Once or twice a week, let a bath with our Bath Enhancer be part of the ritual — warm water, a candle, and ten unhurried minutes do visible work on both skin and spirit.",
      "Morning: a gentle rinse, moisturizer, and two full minutes before foundation. That pause is the professional secret no one sells: moisturizer given time to settle will not pill, slide or separate under your base.",
      "Cosmetics are a wonderful way to enhance your inner beauty — but cared-for skin is where that beauty begins. Start with the ritual, and everything after becomes easier.",
    ],
  },
  {
    id: "beauty-with-purpose",
    title: "Beauty with Purpose: Saint James in the Community",
    category: "From Patricia",
    excerpt:
      "Charity galas, fundraisers and beauty shows for all ages — why giving beauty away has always been part of the Saint James story.",
    readTime: "3 min read",
    image:
      "https://images.pexels.com/photos/14997803/pexels-photo-14997803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Woman in a red dress with creative makeup posing confidently",
    body: [
      "Saint James Cosmetics was never only about selling lipstick. From the beginning, beauty has been our language for something larger — confidence given, dignity honored, community gathered.",
      "Patricia serves as a spokesperson and mistress of ceremony for numerous charity events, benefits and fundraisers, and produces fashion and beauty shows for people of all ages to enjoy. There is a particular joy in watching someone see herself — perhaps for the first time in a long while — as beautiful.",
      "It is why our motto is not a marketing line but a way of living: beauty that is love from within. When love moves outward — into a fundraiser, a gala, a young woman's first beauty show — it has a way of coming back multiplied.",
      "If your organization is planning a benefit or celebration, we would be honored to talk. Beauty is generous by nature. So are we.",
    ],
  },
];

/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "How do I order Saint James products?",
    a: "Add your selections to your beauty bag and submit an order request. Because Saint James is a personal, mail-order boutique, we confirm every order with you directly — verifying shades, answering questions and arranging payment and shipping — before anything is sent. You may also order by phone at (310) 494-8094 or by email at PSJCosmetics@Yahoo.com.",
  },
  {
    q: "How do I find my foundation shade?",
    a: "That is our favorite conversation. Book a Beauty & Shade Consultation (in studio or by phone) and we will identify your undertone and match your perfect Saint James shade. Every Essentials Kit also includes a shade consultation.",
  },
  {
    q: "Are Saint James products made for my skin tone?",
    a: "Yes. Saint James Cosmetics was designed especially for women of color and exotic skin tones — and for women of all color who have never found their true match in conventional lines. Our colors are blended to perfection to honor golden, warm and deep undertones without ever turning grey or ashy.",
  },
  {
    q: "What ingredients do you use?",
    a: "Our collection is formulated with a discriminating selection of natural ingredients, chosen for performance on real skin. If you have a specific ingredient question or sensitivity, contact us before ordering — we are happy to guide you.",
  },
  {
    q: "Can I book Patricia for an event?",
    a: "Patricia is available as a spokesperson and mistress of ceremony for charity events, benefits and fundraisers, and produces fashion and beauty shows. Send the details through our Services page booking form or call (310) 494-8094 and we will discuss your event personally.",
  },
  {
    q: "Where are you located?",
    a: "Saint James Cosmetics, LLC is based in Palos Verdes Estates, California. Consultations and lessons are by appointment; products are available by mail order nationwide.",
  },
];

export const IMAGES = {
  heroPortrait:
    "https://images.pexels.com/photos/17566310/pexels-photo-17566310.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  heroPortraitAlt: "Studio portrait of a woman with bold lipstick and elegant makeup",
  heroSecondary:
    "https://images.pexels.com/photos/8765302/pexels-photo-8765302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  portraitGold:
    "https://images.pexels.com/photos/15539395/pexels-photo-15539395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  aboutStudio:
    "https://images.pexels.com/photos/8091881/pexels-photo-8091881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  aboutStudioAlt: "A makeup artist applying lipstick to a client in a professional setting",
  ritual:
    "https://images.pexels.com/photos/4672615/pexels-photo-4672615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ritualAlt: "A woman applying face cream at her bathroom mirror with a towel on her head",
  flatlay:
    "https://images.pexels.com/photos/4938266/pexels-photo-4938266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  flatlayAlt: "Makeup, jewelry and a jade roller arranged on a marble surface",
  bath:
    "https://images.pexels.com/photos/6724579/pexels-photo-6724579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bathAlt: "A woman enjoying a calming bath surrounded by flowers and candles",
};
