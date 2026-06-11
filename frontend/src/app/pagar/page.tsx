"use client";

import Link from "next/link";
import { FaCcVisa, FaCcMastercard, FaMoneyBillWave, FaUniversity, FaMobileAlt } from "react-icons/fa";

export default function PagarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E5] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Form Section */}
        <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-[#F04D30] mb-6">Método de Pago</h2>
          <form className="space-y-4">
            {/* Payment method selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="method">Método</label>
              <select id="method" name="method" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]">
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="pagoEfectivo">PagoEfectivo</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </select>
            </div>
            {/* Card number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="cardNumber">Número de Tarjeta</label>
              <input type="text" id="cardNumber" name="cardNumber" pattern="[0-9]{16}" required placeholder="1234 5678 9012 3456" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            </div>
            {/* Expiration */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="expMonth">Mes</label>
                <select id="expMonth" name="expMonth" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>${String(i + 1).padStart(2, "0")}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="expYear">Año</label>
                <select id="expYear" name="expYear" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]">
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>
            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="cvv">Código de Seguridad (CVV)</label>
              <input type="text" id="cvv" name="cvv" pattern="[0-9]{3}" required placeholder="123" className="w-24 border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            </div>
            {/* Billing Information */}
            <h3 className="text-lg font-semibold text-[#F04D30] mt-8 mb-4">Información de Facturación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="Nombre" required className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
              <input type="text" name="lastName" placeholder="Apellidos" required className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            </div>
            <input type="text" name="address" placeholder="Dirección de facturación" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            <input type="text" name="city" placeholder="Localidad o Ciudad" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="postal" placeholder="Código Postal" required className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
              <select name="country" defaultValue="Perú" required className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]">
                <option value="Perú">Perú</option>
                <option value="Chile">Chile</option>
                <option value="Argentina">Argentina</option>
                <option value="Brasil">Brasil</option>
              </select>
            </div>
            <input type="tel" name="phone" placeholder="Teléfono" required className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F04D30]" />
            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-[#F04D30] hover:bg-[#d33c23] text-white font-semibold py-2 px-6 rounded-md transition-colors shadow-md">Continuar</button>
            </div>
          </form>
        </section>
        {/* Right Info Section */}
        <section className="bg-white rounded-2xl shadow-md p-8 border border-slate-200 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-[#F04D30] mb-4">Métodos de Pago</h2>
          <p className="text-sm text-slate-600 mb-6">Aceptamos los siguientes medios de pago seguros:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2"><FaCcVisa className="text-2xl text-[#F04D30]" /><span className="font-medium">Visa</span></div>
            <div className="flex items-center space-x-2"><FaCcMastercard className="text-2xl text-[#F04D30]" /><span className="font-medium">Mastercard</span></div>
            <div className="flex items-center space-x-2"><FaMoneyBillWave className="text-2xl text-[#F04D30]" /><span className="font-medium">PagoEfectivo</span></div>
            <div className="flex items-center space-x-2"><FaUniversity className="text-2xl text-[#F04D30]" /><span className="font-medium">BBVA / BCP</span></div>
            <div className="flex items-center space-x-2"><FaMobileAlt className="text-2xl text-[#F04D30]" /><span className="font-medium">Yape / Plin</span></div>
          </div>
          <p className="mt-6 text-xs text-slate-500">Todos los pagos se procesan a través de plataformas certificadas y encriptadas.</p>
        </section>
      </div>
    </div>
  );
}
