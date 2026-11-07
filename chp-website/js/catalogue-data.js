// Public website content. See CONTENT-2026.md before publishing.
// Source: original CHP PC 2026 (1106 edition), 80 PDF pages.
const CATALOGUE_2026 = {
  pdfPath: 'downloads/CHP-2026-Product-Catalogue.pdf',
  downloadName: 'CHP-2026-Product-Catalogue.pdf',
  products: []
};

// Existing catalogue pages; do not relabel these as 2026 products.
const LEGACY_GALLERY_IMAGES = {
  "s01": [
    "images/products/01-round-shoulder-bottle_圆肩瓶/p6/p6-1.png",
    "images/products/01-round-shoulder-bottle_圆肩瓶/p7/p7-1.png",
    "images/products/01-round-shoulder-bottle_圆肩瓶/p8/p8-1.png",
    "images/products/01-round-shoulder-bottle_圆肩瓶/p9/p9-1.png"
  ],
  "s02": [
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p11/p11-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p12/p12-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p13/p13-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p14/p14-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p15/p15-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p16/p16-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p17/p17-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p18/p18-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p19/p19-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p20/p20-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p21/p21-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p22/p22-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p23/p23-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p24/p24-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p24/p24-2.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p25/p25-1.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p25/p25-2.png",
    "images/products/02-straight-round-bottle_直肩圆柱瓶/p26/p26-1.png"
  ],
  "s03": [
    "images/products/03-flat-bottle_扁瓶/p23/p23-1.png",
    "images/products/03-flat-bottle_扁瓶/p24/p24-1.png"
  ],
  "s04": [
    "images/products/04-slant-shoulder-bottle_斜肩瓶/p25/p25-1.png"
  ],
  "s05": [
    "images/products/05-triangular-bottle_三角瓶/p27/p27-1.png"
  ],
  "s06": [
    "images/products/06-full-skincare-range_套系瓶/p28/p28-1.png",
    "images/products/06-full-skincare-range_套系瓶/p29/p29-1.png",
    "images/products/06-full-skincare-range_套系瓶/p30/p30-1.png",
    "images/products/06-full-skincare-range_套系瓶/p31/p31-1.png",
    "images/products/06-full-skincare-range_套系瓶/p32/p32-1.png",
    "images/products/06-full-skincare-range_套系瓶/p33/p33-1.png",
    "images/products/06-full-skincare-range_套系瓶/p34/p34-1.png",
    "images/products/06-full-skincare-range_套系瓶/p35/p35-1.png",
    "images/products/06-full-skincare-range_套系瓶/p36/p36-1.png",
    "images/products/06-full-skincare-range_套系瓶/p37/p37-1.png",
    "images/products/06-full-skincare-range_套系瓶/p38/p38-1.png",
    "images/products/06-full-skincare-range_套系瓶/p39/p39-1.png",
    "images/products/06-full-skincare-range_套系瓶/p40/p40-1.png",
    "images/products/06-full-skincare-range_套系瓶/p41/p41-1.png"
  ],
  "s07": [
    "images/products/07-foam-bottle_泡沫瓶/p50/p50-1.png",
    "images/products/07-foam-bottle_泡沫瓶/p51/p51-1.png",
    "images/products/07-foam-bottle_泡沫瓶/p52/p52-1.png"
  ],
  "s08": [
    "images/products/08-dropper-bottle_滴管瓶/p54/p54-1.png"
  ],
  "s09": [
    "images/products/09-straight-round-jar_直圆罐/p56/p56-1.png",
    "images/products/09-straight-round-jar_直圆罐/p57/p57-1.png",
    "images/products/09-straight-round-jar_直圆罐/p58/p58-1.png",
    "images/products/09-straight-round-jar_直圆罐/p59/p59-1.png",
    "images/products/09-straight-round-jar_直圆罐/p60/p60-1.png"
  ],
  "s10": [
    "images/products/10-sunscreen-bottle_防晒瓶/p62/p62-1.png"
  ],
  "s11": [
    "images/products/11-washing-bottle_洗护瓶/p64/p64-1.png",
    "images/products/11-washing-bottle_洗护瓶/p65/p65-1.png"
  ],
  "s12": [
    "images/products/12-sample_试用装/p67/p67-1.png",
    "images/products/12-sample_试用装/p68/p68-1.png"
  ]
};

// Physical PDF page numbers (including cover), not printed footer numbers.
const CATALOGUE_2026_PAGES = {
  "s01": [
    7,
    8,
    9,
    10,
    11,
    12
  ],
  "s02": [
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32
  ],
  "s03": [
    34,
    35,
    36
  ],
  "s04": [
    38
  ],
  "s05": [
    40
  ],
  "s06": [
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54
  ],
  "s07": [
    56,
    57,
    58
  ],
  "s08": [
    60
  ],
  "s09": [
    62,
    63,
    64,
    65,
    66,
    67,
    68
  ],
  "s10": [
    75
  ],
  "s12": [
    77,
    78
  ],
  "s13": [
    70,
    71
  ],
  "s14": [
    73
  ]
};
const CATALOGUE_2026_HIGHLIGHTS = [
  {
    "series": "s13",
    "page": 70
  },
  {
    "series": "s13",
    "page": 71
  },
  {
    "series": "s14",
    "page": 73
  },
  {
    "series": "s01",
    "page": 11
  },
  {
    "series": "s01",
    "page": 12
  },
  {
    "series": "s02",
    "page": 27
  },
  {
    "series": "s02",
    "page": 31
  },
  {
    "series": "s02",
    "page": 32
  },
  {
    "series": "s03",
    "page": 36
  },
  {
    "series": "s09",
    "page": 66
  },
  {
    "series": "s09",
    "page": 67
  },
  {
    "series": "s09",
    "page": 68
  }
];
