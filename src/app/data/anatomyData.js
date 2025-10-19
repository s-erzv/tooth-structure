export const anatomyData = [
  {
    id: 1,
    name: "Gigi Geraham",
    title: "Molar - Pengunyah Utama",
    modelPath: "/models/test1/scene.gltf",  
    explanation:
      "Gigi molar terletak paling belakang dalam rongga mulut. Permukaan gigi ini lebar, digunakan untuk menghaluskan makanan. Molar pertama (M1) rahang atas adalah gigi terbesar di rahang atas dan sering memiliki Cusp Carabelli. Molar tiga (M3) atau gigi bungsu sering mengalami anomali bentuk, ukuran, dan posisi.",
    structure:
      "Memiliki permukaan kunyah (oklusal) yang lebar dengan empat hingga lima tonjolan (cusp). Umumnya memiliki akar bercabang, misalnya Molar pertama atas memiliki tiga akar (mesio-bukal, disto-bukal, dan palatal), sedangkan molar pertama bawah adalah yang terbesar di rahang bawah.",
    functionList: ["Mengunyah dan menghaluskan makanan hingga halus sebelum ditelan."],
    commonDiseases: [
      {
        name: "Erupsi Parsial Molar Tiga",
        desc: "Dapat menyebabkan kelainan periodontal, karies pada gigi di sebelahnya, dan resorpsi akar pada gigi molar dua.",
      },
      {
        name: "Karies Oklusal",
        desc: "Permukaan kunyah yang berlekuk-lekuk membuatnya rentan terhadap penumpukan sisa makanan dan plak.",
      },
    ],
    treatments: [
      "Perawatan periodontal untuk gusi di sekitar molar tiga.",
      "Penambalan (filling) atau pencabutan (ekstraksi) pada kasus karies atau impaksi.",
      "Pembersihan rutin dan fissure sealant untuk pencegahan.",
    ],
  },
  {
    id: 2,
    name: "Geraham Kecil",
    title: "Premolar",
    modelPath: "/models/test2/scene.gltf",  
    explanation:
      "Gigi premolar, atau geraham kecil, terletak di antara gigi taring dan gigi geraham. Premolar 1 atas memiliki dua cusp (bukal dan palatal) dan seringkali memiliki dua akar. Premolar 2 atas memiliki cusp yang hampir sama besar dan umumnya satu akar. Premolar 1 bawah memiliki cusp bukal yang lebih nyata, panjang, dan tajam.",
    structure:
      "Termasuk gigi posterior yang biasanya memiliki satu hingga dua tonjolan tajam (cusp). Bentuknya merupakan transisi antara gigi taring yang runcing dan gigi geraham yang lebar.",
    functionList: ["Memotong makanan.", "Menghancurkan dan menggiling ringan makanan."],
    commonDiseases: [
      {
        name: "Informasi Tidak Tersedia",
        desc: "Sumber tidak menyediakan informasi spesifik mengenai penyakit umum pada gigi premolar.",
      },
    ],
    treatments: ["Sumber tidak menyediakan informasi spesifik mengenai perawatan gigi premolar."],
  },
  {
    id: 3,
    name: "Gigi Taring",
    title: "Caninus",
    modelPath: "/models/test1/scene.gltf",  
    explanation:
      'Gigi kaninus adalah gigi ke-3 dari garis tengah, sering disebut sebagai "corner stone" karena terletak di sudut mulut. Gigi ini memiliki mahkota (korona) terpanjang dan akar terbesar serta terpanjang di antara semua gigi, membuatnya sangat kokoh.',
    structure: "Satu-satunya gigi yang memiliki satu tonjolan (cusp) yang besar dan runcing. Termasuk dalam kelompok gigi anterior.",
    functionList: ["Merobek dan mengoyak makanan yang keras atau alot."],
    commonDiseases: [
      {
        name: "Informasi Tidak Tersedia",
        desc: "Sumber tidak menyediakan informasi spesifik mengenai penyakit umum pada gigi taring.",
      },
    ],
    treatments: ["Sumber tidak menyediakan informasi spesifik mengenai perawatan gigi taring."],
  },
  {
    id: 4,
    name: "Gigi Seri",
    title: "Insisivus",
    modelPath: "/models/test2/scene.gltf", 
    explanation:
      "Gigi insisivus adalah gigi paling depan di rongga mulut. Gigi seri sentral rahang atas adalah yang terbesar, sementara gigi seri sentral rahang bawah bisa jadi yang terkecil. Saat baru tumbuh (erupsi), gigi ini memiliki tonjolan kecil bernama mamelon yang akan aus seiring waktu.",
    structure: "Berbentuk pipih seperti pahat dengan tepi insisal yang tajam. Termasuk dalam kelompok gigi anterior.",
    functionList: ["Memotong makanan menjadi bagian-bagian kecil."],
    commonDiseases: [
      {
        name: "Informasi Tidak Tersedia",
        desc: "Sumber tidak menyediakan informasi spesifik mengenai penyakit umum pada gigi seri.",
      },
    ],
    treatments: ["Sumber tidak menyediakan informasi spesifik mengenai perawatan gigi seri."],
  },
  {
    id: 5,
    name: "Gusi",
    title: "Gingiva",
    modelPath: "/models/test1/scene.gltf",  
    explanation:
      "Gingiva atau gusi adalah jaringan periodontal lunak berwarna merah muda yang mengelilingi gigi dan tidak terlihat pada hasil rontgen (radiografi).",
    structure: "Jaringan lunak yang melindungi akar gigi dan tulang penyangga.",
    functionList: ["Menjaga gigi tetap pada posisinya.", "Melindungi akar gigi dari infeksi."],
    commonDiseases: [
      {
        name: "Inflamasi & Pembengkakan",
        desc: "Dapat meradang, bengkak, dan mengalami perubahan kontur akibat plak dan kalkulus.",
      },
      {
        name: "Poket Gusi",
        desc: "Sulkus (celah antara gusi dan gigi) yang lebih dari 3mm. Bisa berupa pseudopoket (pembesaran gusi) atau poket periodontal (kerusakan tulang).",
      },
      {
        name: "Resesi Gingiva",
        desc: "Penurunan gusi yang menyebabkan akar gigi terekspos, terbagi dalam Kelas I hingga IV.",
      },
    ],
    treatments: [
      "Pemeriksaan dengan palpasi dan probe periodontal.",
      "Pengukuran Probing Depth (PD) dan Clinical Attachment Loss (CAL).",
      "Pemeriksaan Bleeding on Probing (BOP) dan Papillary Bleeding Index (PBI) untuk melihat tingkat peradangan.",
    ],
  },
  {
    id: 6,
    name: "Bibir",
    title: "Labia",
    modelPath: "/models/test2/scene.gltf",  
    explanation: "Bibir adalah struktur lunak yang menjadi bagian terluar dari rongga mulut.",
    structure: "Terdiri dari jaringan otot dan kulit.",
    functionList: ["Menutup mulut.", "Membantu dalam proses berbicara.", "Menunjukkan ekspresi wajah.", "Berperan sebagai pintu masuk makanan."],
    commonDiseases: [
      {
        name: "Informasi Tidak Tersedia",
        desc: "Sumber tidak menyediakan informasi spesifik mengenai penyakit umum pada bibir.",
      },
    ],
    treatments: ["Sumber tidak menyediakan informasi spesifik mengenai perawatan bibir."],
  },
  {
    id: 7,
    name: "Struktur Gigi",
    title: "Anatomi Umum",
    modelPath: "/models/test1/scene.gltf", 
    explanation:
      "Secara umum, gigi memiliki dua bagian utama: mahkota (yang terlihat di mulut) dan akar (yang tertanam di tulang rahang). Batas antara keduanya disebut Cemento-Enamel Junction (CEJ). Jaringan keras gigi terdiri dari Email, Dentin, dan Sementum, sedangkan jaringan lunaknya adalah Pulpa.",
    structure:
      "Email: Lapisan terluar, paling keras, 96% anorganik, tidak bisa regenerasi. Dentin: Di bawah email, kekuningan, jaringan terbanyak pada gigi. Pulpa: Bagian tengah berisi saraf & pembuluh darah. Sementum: Melapisi akar, tempat melekatnya ligamen periodontal.",
    functionList: [
      "Email: Melindungi gigi dari gesekan, suhu, dan zat asam.",
      "Dentin: Menopang email dan menyalurkan rangsangan ke pulpa.",
      "Pulpa: Memberi nutrisi dan sensasi (rasa sakit, tekanan).",
      "Sementum: Menempelkan gigi ke tulang rahang.",
    ],
    commonDiseases: [
      {
        name: "Karies Dentin",
        desc: "Terjadi jika lapisan email terkikis akibat proses karies atau aus, sehingga dentin yang lebih lunak terekspos.",
      },
    ],
    treatments: ["Perawatan karies seperti penambalan untuk mencegah kerusakan lebih lanjut pada struktur gigi."],
  },
];