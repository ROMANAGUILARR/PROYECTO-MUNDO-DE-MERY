"use client";

import Image from "next/image";

interface CollectionCardProps {
  image: string;
  badge: string;
  title: string;
  description: string;
}

function CollectionCard({ image, badge, title, description }: CollectionCardProps) {
  return (
    <article className="group relative flex flex-col rounded-[24px] border-2 border-[#A89D92] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,157,146,0.15)]">
      {/* Badge */}
      <span className="mb-4 inline-flex w-fit rounded-full border border-[#A89D92] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6F665E]">
        {badge}
      </span>

      {/* Image */}
      <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-[16px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-display text-2xl font-semibold text-[#4A403A]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#6F665E]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function CollectionsSection() {
  const collections = [
    {
      image: "/categorias/Dijes/Aguila%20Calva.png",
      badge: "DIJES",
      title: "Animales en cerámica",
      description: "Piezas únicas de animales hechas a mano, con acabados artesanales y presencia cálida.",
    },
    {
      image: "/categorias/Minis/Chirimoya.png",
      badge: "MINIS",
      title: "Frutas en cerámica",
      description: "Miniaturas de frutas esmaltadas con acabado brillante para decorar cocinas y bandejas.",
    },
    {
      image: "/categorias/Pulgas/Cóndor%20Andino.png",
      badge: "PULGAS",
      title: "Piezas temáticas",
      description: "Objetos con carácter, ideales para regalos, vitrinas pequeñas y colecciones con personalidad.",
    },
  ];

  return (
    <section className="bg-[#F7F3EE] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#4A403A] md:text-5xl">
            Una tienda pensada como galería doméstica.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#6F665E]">
            Explora nuestras categorías y encuentra la pieza de cerámica perfecta para ti.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <CollectionCard
              key={index}
              image={collection.image}
              badge={collection.badge}
              title={collection.title}
              description={collection.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}