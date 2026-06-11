export type Category = {
  id: number;
  title: string;
  description: string;
  accent: string;
  countLabel: string;
  image: string;
  alt: string;
};

export type FeaturedProduct = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  etiqueta: string;
  formato: string;
  tonos: [string, string];
  image: string;
  alt: string;
};

export type BrandValue = {
  id: number;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: 1,
    title: "Animales en cerámica",
    description: "Piezas únicas de animales hechas a mano, con acabados artesanales y presencia cálida.",
    accent: "from-[#d8b49a] to-[#a9694f]",
    countLabel: "Colección animal",
    image: "/categorias/jarrones.png",
    alt: "Figuras de animales en cerámica",
  },
  {
    id: 2,
    title: "Frutas en cerámica",
    description: "Miniaturas de frutas esmaltadas con acabado brillante para decorar cocinas y bandejas.",
    accent: "from-[#c9b8a7] to-[#8d6b5a]",
    countLabel: "Colección frutal",
    image: "/categorias/frutas.png",
    alt: "Miniaturas de frutas en cerámica",
  },
  {
    id: 3,
    title: "Piezas temáticas",
    description: "Objetos con carácter, ideales para regalos, vitrinas pequeñas y colecciones con personalidad.",
    accent: "from-[#e8d8c8] to-[#bc8b67]",
    countLabel: "Serie especial",
    image: "/categorias/brujas.png",
    alt: "Piezas temáticas de cerámica",
  },
];

// Precios por tamaño:
// Pulga: S/ 0.65 | Dije: S/ 0.70 | Mini: S/ 1.00 | Small: S/ 2.50 | Super Small: S/ 8.00

export const featuredProducts: FeaturedProduct[] = [
  // Dijes (6 productos) - Precio base: S/ 0.70
  {
    id: 1,
    nombre: "Aguila Calva",
    precio: 0.70,
    descripcion: "Majestuosa ave de presa con alas extendidas, esculpida en ceramica de tonos tierra y acabado mate.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#d9bfae", "#b77d59"],
    image: "/categorias/Dijes/Aguila%20Calva.png",
    alt: "Figura de aguila calva en cerámica",
  },
  {
    id: 2,
    nombre: "Buho Coral",
    precio: 0.70,
    descripcion: "Buho con detalles en tonos coral, ojos expresivos y postura erguida, ideal para estantes y vitrinas.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#e8a090", "#c97b6b"],
    image: "/categorias/Dijes/B%C3%BAho%20Coral.png",
    alt: "Figura de buho coral en cerámica",
  },
  {
    id: 3,
    nombre: "Buho Graduado",
    precio: 0.70,
    descripcion: "Buho con gradacion de colores en el plumaje, mirada penetrante y base estable para exhibicion.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#b89878", "#8b7355"],
    image: "/categorias/Dijes/B%C3%BAho%20Graduado.png",
    alt: "Figura de buho graduado en cerámica",
  },
  {
    id: 4,
    nombre: "Foca Costera",
    precio: 0.70,
    descripcion: "Foca en posicion de descanso, superficie lisa y curvas naturales que transmiten tranquilidad.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#a0a0a0", "#708090"],
    image: "/categorias/Dijes/Foca%20Costera.png",
    alt: "Figura de foca costera en cerámica",
  },
  {
    id: 5,
    nombre: "Jaguar Ambar",
    precio: 0.70,
    descripcion: "Jaguar con manchas en tonos ambar, musculatura definida y expresion felina caracteristica.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#d4a574", "#b8860b"],
    image: "/categorias/Dijes/Jaguar%20%C3%81mbar.png",
    alt: "Figura de jaguar ambar en cerámica",
  },
  {
    id: 6,
    nombre: "Tigre Imperial",
    precio: 0.70,
    descripcion: "Tigre con rayas marcadas en esmalte imperial, pose dinamica y cola enrollada con elegancia.",
    etiqueta: "NUEVO",
    formato: "Dije decorativo",
    tonos: ["#ff8c00", "#8b4513"],
    image: "/categorias/Dijes/Tigre%20Imperial.png",
    alt: "Figura de tigre imperial en cerámica",
  },
  
  // Minis (6 productos) - Precio base: S/ 1.00
  {
    id: 7,
    nombre: "Chirimoya",
    precio: 1.00,
    descripcion: "Fruta tropical de textura rugosa y color verde intenso, replica artesanal de alta fidelidad.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#6b8e23", "#556b2f"],
    image: "/categorias/Minis/Chirimoya.png",
    alt: "Miniatura de chirimoya en cerámica",
  },
  {
    id: 8,
    nombre: "Fresa",
    precio: 1.00,
    descripcion: "Fresa con semillas marcadas una por una, tono rojo vibrante y hojas verdes en la corona.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#dc143c", "#228b22"],
    image: "/categorias/Minis/Fresa.png",
    alt: "Miniatura de fresa en cerámica",
  },
  {
    id: 9,
    nombre: "Manzana",
    precio: 1.00,
    descripcion: "Manzana con degradado de rojos y amarillos, superficie brillante que invita a tocar.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#ff0000", "#ffd700"],
    image: "/categorias/Minis/Manzana.png",
    alt: "Miniatura de manzana en cerámica",
  },
  {
    id: 10,
    nombre: "Naranja",
    precio: 1.00,
    descripcion: "Naranja con porosidad realista en la cascara, color citrico intenso y forma esferica perfecta.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#ff8c00", "#ffa500"],
    image: "/categorias/Minis/Naranja.png",
    alt: "Miniatura de naranja en cerámica",
  },
  {
    id: 11,
    nombre: "Pera",
    precio: 1.00,
    descripcion: "Pera con curvatura asimetrica natural, tonos verde-amarillentos y pedunculo marcado.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#9acd32", "#daa520"],
    image: "/categorias/Minis/Pera.png",
    alt: "Miniatura de pera en cerámica",
  },
  {
    id: 12,
    nombre: "Sandia",
    precio: 1.00,
    descripcion: "Sandia miniatura con rayas verdes caracteristicas, forma ovalada y peso equilibrado.",
    etiqueta: "NUEVO",
    formato: "Miniatura frutal",
    tonos: ["#2e8b57", "#90ee90"],
    image: "/categorias/Minis/Sandia.png",
    alt: "Miniatura de sandia en cerámica",
  },
  
  // Pulgas (6 productos) - Precio base: S/ 0.65
  {
    id: 13,
    nombre: "Condor Andino",
    precio: 0.65,
    descripcion: "Condor con envergadura imponente, plumaje oscuro y cabeza caracteristica del ave andina.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#2f4f4f", "#696969"],
    image: "/categorias/Pulgas/C%C3%B3ndor%20Andino.png",
    alt: "Figura de condor andino en cerámica",
  },
  {
    id: 14,
    nombre: "Conejo de Pascua",
    precio: 0.65,
    descripcion: "Conejo con orejas erguidas, pelaje blanco nevado y postura alerta, simbolo de fertilidad.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#f5f5f5", "#d3d3d3"],
    image: "/categorias/Pulgas/Conejo%20de%20Pascua.png",
    alt: "Figura de conejo de pascua en cerámica",
  },
  {
    id: 15,
    nombre: "Delfin Perla Azul",
    precio: 0.65,
    descripcion: "Delfin en salto con acabado en azul perla, sonrisa caracteristica y aleta dorsal definida.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#4682b4", "#87ceeb"],
    image: "/categorias/Pulgas/Delf%C3%ADn%20Perla%20Azul.png",
    alt: "Figura de delfin perla azul en cerámica",
  },
  {
    id: 16,
    nombre: "Gato Marfil",
    precio: 0.65,
    descripcion: "Gato en tonos marfil, ojos almendrados y cola enrollada alrededor del cuerpo.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#fffff0", "#f5deb3"],
    image: "/categorias/Pulgas/Gato%20Marfil.png",
    alt: "Figura de gato marfil en cerámica",
  },
  {
    id: 17,
    nombre: "Pez Esmeralda",
    precio: 0.65,
    descripcion: "Pez con escamas en esmalte esmeralda, aletas desplegadas y boca entreabierta.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#50c878", "#2e8b57"],
    image: "/categorias/Pulgas/Pez%20Esmeralda.png",
    alt: "Figura de pez esmeralda en cerámica",
  },
  {
    id: 18,
    nombre: "Raton Nevado",
    precio: 0.65,
    descripcion: "Raton con pelaje blanco niveo, orejas redondas y larga cola curvada con delicadeza.",
    etiqueta: "NUEVO",
    formato: "Pulga decorativa",
    tonos: ["#fffafa", "#f0f0f0"],
    image: "/categorias/Pulgas/Rat%C3%B3n%20Nevado.png",
    alt: "Figura de raton nevado en cerámica",
  },
  
  // Small (6 productos) - Precio base: S/ 2.50
  {
    id: 19,
    nombre: "Delfin Zafiro",
    precio: 2.50,
    descripcion: "Delfin en tonos zafiro profundo, cuerpo hidrodinamico y expresion juguetona.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#0f52ba", "#4169e1"],
    image: "/categorias/Small/Delf%C3%ADn%20Zafiro.png",
    alt: "Figura de delfin zafiro en cerámica",
  },
  {
    id: 20,
    nombre: "Flamengo Rosa del Tropico",
    precio: 2.50,
    descripcion: "Flamenco en rosa tropical, patas largas y cuello curvado en postura caracteristica.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#ff69b4", "#ff1493"],
    image: "/categorias/Small/Flamengo%20Rosa%20del%20Tr%C3%B3pico.png",
    alt: "Figura de flamengo rosa en cerámica",
  },
  {
    id: 21,
    nombre: "Llama Tradicional",
    precio: 2.50,
    descripcion: "Llama andina con lana texturizada, colores tradicionales y expresion serena.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#d2b48c", "#8b7355"],
    image: "/categorias/Small/Llama%20Tradicional.png",
    alt: "Figura de llama tradicional en cerámica",
  },
  {
    id: 22,
    nombre: "Lobo Marino Ambar",
    precio: 2.50,
    descripcion: "Lobo marino en tonos ambar, bigotes marcados y postura de alerta costera.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#ffbf00", "#daa520"],
    image: "/categorias/Small/Lobo%20Marino%20%C3%81mbar.png",
    alt: "Figura de lobo marino ambar en cerámica",
  },
  {
    id: 23,
    nombre: "Pez Palometa Dorado",
    precio: 2.50,
    descripcion: "Pez palometa con escamas doradas, aletas tornasoladas y forma de disco achatado.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#ffd700", "#ff8c00"],
    image: "/categorias/Small/Pez%20Palometa%20Dorado.png",
    alt: "Figura de pez palometa dorado en cerámica",
  },
  {
    id: 24,
    nombre: "Vaca Lola",
    precio: 2.50,
    descripcion: "Vaca con manchas caracteristicas, cuernos cortos y expresion bovina amigable.",
    etiqueta: "NUEVO",
    formato: "Figura Small",
    tonos: ["#000000", "#ffffff"],
    image: "/categorias/Small/Vaca%20Lola.png",
    alt: "Figura de vaca lola en cerámica",
  },
  
  // Super Small (6 productos) - Precio base: S/ 8.00
  {
    id: 25,
    nombre: "Caballo Pucara Rojo",
    precio: 8.00,
    descripcion: "Caballo Pucara en rojo intenso, crin estilizada y patas en movimiento galopante.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#dc143c", "#8b0000"],
    image: "/categorias/Super_Small/Caballo%20Pucar%C3%A1%20Rojo.jpg",
    alt: "Figura de caballo pucara rojo en cerámica",
  },
  {
    id: 26,
    nombre: "Casa de Belen",
    precio: 8.00,
    descripcion: "Casa de Belen con techo de tejas, paredes texturizadas y puerta arqueada.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#8b4513", "#cd853f"],
    image: "/categorias/Super_Small/Casa%20de%20Bel%C3%A9n.jpg",
    alt: "Figura de casa de belen en cerámica",
  },
  {
    id: 27,
    nombre: "Celebracion Celestial",
    precio: 8.00,
    descripcion: "Escena celestial con nubes doradas, angeles y estrellas en relieve pintado a mano.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#ffd700", "#fffacd"],
    image: "/categorias/Super_Small/Celebraci%C3%B3n%20Celestial.jpg",
    alt: "Figura de celebracion celestial en cerámica",
  },
  {
    id: 28,
    nombre: "Ekeko de la Abundancia",
    precio: 8.00,
    descripcion: "Ekeko con bolsa de la abundancia, frutos en miniatura y sonrisa generosa.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#8b4513", "#daa520"],
    image: "/categorias/Super_Small/Ekeko%20de%20la%20Abundancia.png",
    alt: "Figura de ekeko de la abundancia en cerámica",
  },
  {
    id: 29,
    nombre: "Ekeko de la Prosperidad",
    precio: 8.00,
    descripcion: "Ekeko con sombrero tradicional, cargado de simbolos de prosperidad y fortuna.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#654321", "#daa520"],
    image: "/categorias/Super_Small/Ekeko%20de%20la%20Prosperidad.png",
    alt: "Figura de ekeko de la prosperidad en cerámica",
  },
  {
    id: 30,
    nombre: "Llama Acuatica",
    precio: 8.00,
    descripcion: "Llama acuatica en tonos turquesa, cuerpo ondulante y crin que simula olas marinas.",
    etiqueta: "NUEVO",
    formato: "Figura Super Small",
    tonos: ["#40e0d0", "#00ced1"],
    image: "/categorias/Super_Small/Llama%20Acu%C3%A1tica.jpg",
    alt: "Figura de llama acuatica en cerámica",
  },
];

export const brandValues: BrandValue[] = [
  {
    id: 1,
    title: "Diseño con intención",
    description: "Cada pieza es pensada para destacar, combinando estética y funcionalidad.",
  },
  {
    id: 2,
    title: "Trabajo artesanal",
    description: "Nada es en serie: cada producto tiene detalles únicos que lo hacen especial.",
  },
  {
    id: 3,
    title: "Hecho para tu espacio",
    description: "Creamos piezas que se adaptan a tu estilo y aportan personalidad a tu entorno.",
  },
];