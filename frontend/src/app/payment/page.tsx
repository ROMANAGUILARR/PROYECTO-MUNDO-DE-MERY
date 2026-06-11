/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaRegHeart, FaRegCheckCircle } from "react-icons/fa";
import { FaCreditCard, FaRegMoneyBillAlt, FaMobileAlt, FaGift } from "react-icons/fa";

export default function PaymentPage() {
  // State for selected payment method and other options
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedOther, setSelectedOther] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [programAccepted, setProgramAccepted] = useState<boolean>(false);

  const isButtonEnabled = selectedMethod !== "" && termsAccepted && programAccepted;

  const paymentMethods = [
    { id: "cmr", label: "Tarjeta CMR", icon: <FaCreditCard className="text-2xl text-[#F04D30]" /> },
    { id: "credit", label: "Tarjeta de crédito", icon: <FaCreditCard className="text-2xl text-[#F04D30]" /> },
    { id: "debit_falabella", label: "Débito Banco Falabella", icon: <FaCreditCard className="text-2xl text-[#F04D30]" /> },
    { id: "debit", label: "Tarjeta de débito", icon: <FaCreditCard className="text-2xl text-[#F04D30]" /> },
    { id: "gift", label: "Gift Card", icon: <FaGift className="text-2xl text-[#F04D30]" /> },
  ];

  const otherOptions = [
    { id: "yape", label: "Yape", icon: <FaMobileAlt className="text-2xl text-[#F04D30]" /> },
    { id: "cash_qr", label: "PagoEfectivo o QR", icon: <FaRegMoneyBillAlt className="text-2xl text-[#F04D30]" /> },
  ];

  const steps = [
    { name: "Carro", status: "complete" },
    { name: "Entrega", status: "complete" },
    { name: "Pago", status: "current" },
  ];

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 md:px-8 lg:px-12">
      {/* Progress bar */}
      <nav className="flex justify-center mb-10 space-x-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                ${step.status === "complete" ? "bg-[#F04D30] border-[#F04D30] text-white" : step.status === "current" ? "bg-white border-[#F04D30] text-[#F04D30]" : "bg-white border-gray-300 text-gray-500"}`}
            >
              {step.status === "complete" ? "✓" : idx + 1}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${step.status === "complete" || step.status === "current" ? "text-[#F04D30]" : "text-gray-500"}`}
            >
              {step.name}
            </span>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 mx-4" aria-hidden="true" />
            )}
          </div>
        ))}
      </nav>

      {/* Main content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center space-x-3">
            <FaMapMarkerAlt className="text-[#F04D30] text-2xl" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Dirección</p>
              <p className="text-gray-600">Mz B1, Casa1, Los Olivos, Lima</p>
            </div>
            <Link href="#" className="text-[#F04D30] hover:underline font-medium">
              Cambiar
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar tarjeta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.id)}
                  className={`flex items-center space-x-3 p-3 border rounded-lg shadow-sm transition-colors
                    ${selectedMethod === m.id ? "border-[#F04D30] bg-[#FFF5E5]" : "border-gray-200 hover:border-[#F04D30]"}`}
                >
                  {m.icon}
                  <span className="font-medium text-gray-800">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Other Options */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Otras opciones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOther(opt.id)}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-colors
                    ${selectedOther === opt.id ? "border-[#F04D30] bg-[#FFF5E5]" : "border-gray-200 hover:border-[#F04D30]"}`}
                >
                  <div className="flex items-center space-x-3">
                    {opt.icon}
                    <span className="font-medium text-gray-800">{opt.label}</span>
                  </div>
                  {selectedOther === opt.id && <FaRegHeart className="text-[#F04D30]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Resumen de la compra</h2>
            <ul className="space-y-2 mb-4 text-gray-800">
              <li className="flex justify-between"><span>Productos (1)</span><span>S/ 89.00</span></li>
              <li className="flex justify-between"><span>Descuentos (1)</span><span className="text-green-600">- S/ 24.10</span></li>
              <li className="flex justify-between"><span>Entregas (1)</span><span>S/ 9.90</span></li>
            </ul>
            <div className="flex justify-between items-center border-t pt-4 text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>S/ 74.80</span>
            </div>
            <button
              type="button"
              disabled={!isButtonEnabled}
              className={`mt-6 w-full py-3 rounded-full text-white font-semibold transition-colors
                ${isButtonEnabled ? "bg-[#F04D30] hover:bg-[#d33c23]" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Continuar
            </button>
          </div>

          {/* Coupon Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
            <p className="text-gray-800">¿Tienes un cupón?</p>
            <button className="bg-[#F04D30] hover:bg-[#d33c23] text-white px-4 py-2 rounded-md font-medium">
              Agregar
            </button>
          </div>

          {/* Invoice Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
            <p className="text-gray-800">¿Necesitas factura?</p>
            <button className="bg-[#F04D30] hover:bg-[#d33c23] text-white px-4 py-2 rounded-md font-medium">
              Solicitar
            </button>
          </div>

          {/* Terms Checkboxes */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 text-[#F04D30] border-gray-300 rounded"
              />
              <span className="text-gray-700">Declaro que he leído y aceptado los términos y condiciones.</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={programAccepted}
                onChange={(e) => setProgramAccepted(e.target.checked)}
                className="h-4 w-4 text-[#F04D30] border-gray-300 rounded"
              />
              <span className="text-gray-700">Acepto los términos para acceder al programa de puntos.</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
