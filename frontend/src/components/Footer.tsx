import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0A0E27] text-white py-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Grid with three equal columns */}
        <div className="grid gap-8 md:grid-cols-3 border-b border-gray-700 pb-8">
          {/* 1️⃣ Información de la empresa */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold mb-2">El Mundo de Mery</h2>
            <p className="text-sm">Cerámica Decorativa Artesanal</p>
            <p className="text-sm">Dirección: Comas, Lima, Perú</p>
            <p className="text-sm">WhatsApp: +51 987654321</p>
            <p className="text-sm">Correo: contacto@elmundodemery.com</p>
          </div>

          {/* 2️⃣ Redes Sociales */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-lg font-medium mb-2">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#F04D30] transition-colors text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#F04D30] transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-[#F04D30] transition-colors text-2xl">
                <FaTiktok />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-[#F04D30] transition-colors text-2xl">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* 3️⃣ Atención al Cliente */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium mb-2">Atención al Cliente</h3>
            <p className="text-sm">Horario: Lunes‑Viernes 8:30 am ‑ 10:00 pm</p>
            <p className="text-sm">Tiempo estimado de respuesta: 24‑48 horas</p>
            <p className="text-sm italic">
              Todas las piezas son elaboradas artesanalmente y pueden presentar ligeras variaciones.
            </p>
          </div>
        </div>
        {/* Copyright bar */}
        <div className="text-center text-xs mt-6">
          © {new Date().getFullYear()} El Mundo de Mery. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
