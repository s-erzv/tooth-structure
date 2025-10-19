export const anatomyData = [
  {
    id: "gigi-geraham-belakang",
    name: "Gigi Geraham Belakang",
    title: "Molar — Penggiling Utama",
    meshName: "Molar_Back",
    file: "/models/test1/scene.gltf",
    explanation:
    "Gigi geraham belakang (molar) adalah gigi terbesar yang berfungsi menggiling makanan menjadi partikel lebih kecil sebelum ditelan.",
    structure:
    "Terdiri dari mahkota, rongga pulpa, dan akar yang menambatkan gigi pada tulang rahang.",
    functionList: ["Menghancurkan makanan", "Membantu pencernaan mekanis awal"],
    commonDiseases: [{ name: "Karies", desc: "Rusaknya enamel akibat plak dan bakteri." }],
    treatments: ["Tambalan", "Root canal", "Pencabutan"],
  },
  {
    id: "gigi-geraham-depan",
    name: "Gigi Geraham Depan (Premolar)",
    title: "Premolar — Pembantu Penggiling",
    meshName: "Premolar",
    file: "/models/test2/scene.gltf",
    explanation: "Premolar berfungsi sebagai transisi antara gigi taring dan geraham belakang.",
    structure:
    "Memiliki mahkota datar dengan satu atau dua tonjolan (cusps) dan satu atau dua akar.",
    functionList: ["Memecah potongan makanan", "Mendukung fungsi kunyah"],
    commonDiseases: [{ name: "Karies", desc: "Sering muncul pada permukaan kunyah." }],
    treatments: ["Restorasi (filling)", "Inlay/onlay"],
  },
  {
    id: "gigi-taring",
    name: "Gigi Taring",
    title: "Caninus — Perobek Makanan",
    meshName: "Canine",
    file: "/models/test1/scene.gltf",
    explanation:
    "Gigi taring berbentuk runcing dan kuat, khususnya untuk merobek makanan bertekstur keras.",
    structure: "Satu mahkota runcing dan satu akar panjang.",
    functionList: ["Merobek makanan", "Mendukung estetika dan posisi gigi"],
    commonDiseases: [{ name: "Fraktur", desc: "Retak karena trauma gigitan ekstrem." }],
    treatments: ["Crown", "Pencabutan jika parah"],
  },
  {
    id: "gigi-seri",
    name: "Gigi Seri",
    title: "Insisivus — Pemotong Makanan",
    meshName: "Incisors",
    file: "/models/test2/scene.gltf",
    explanation:
    "Gigi seri berada di bagian depan mulut dan memiliki tepi tajam untuk memotong makanan.",
    structure: "Mahkota tipis dan satu akar per gigi.",
    functionList: ["Memotong makanan", "Mendukung artikulasi dan estetika"],
    commonDiseases: [{ name: "Abrasi", desc: "Keausan akibat menggosok keras." }],
    treatments: ["Veneer", "Filling"],
  },
  {
    id: "gigi-susu",
    name: "Gigi Susu",
    title: "Primary Teeth — Gigi Anak",
    meshName: "Baby_Teeth",
    file: "/models/test1/scene.gltf",
    explanation:
    "Gigi sementara pada anak yang menjaga ruang untuk gigi permanen dan membantu perkembangan bicara.",
    structure:
    "Lebih kecil, mahkota lebih lebar relatif terhadap akar, dan akhirnya akan berganti dengan gigi permanen.",
    functionList: ["Membantu mengunyah", "Membantu bicara", "Menjaga ruang untuk gigi permanen"],
    commonDiseases: [{ name: "Karies Anak", desc: "Karies pada gigi susu akibat pola makan manis." }],
  treatments: ["Tambalan", "Ekstraksi bila perlu"],
  },
  {
    id: "lidah",
    name: "Lidah",
    title: "Otot Pengecap & Bicara",
    meshName: "Tongue",
    file: "/models/test2/scene.gltf",
    explanation:
    "Lidah adalah otot lentur yang berperan pada pengecapan, penelanan, dan artikulasi suara.",
    structure: "Terdiri dari otot intrinsik dan ekstrinsik.",
    functionList: ["Rasa", "Menggerakkan makanan", "Bicara"],
    commonDiseases: [{ name: "Glossitis", desc: "Peradangan lidah." }],
    treatments: ["Vitamin", "Antibiotik bila infeksi"],
  },
];