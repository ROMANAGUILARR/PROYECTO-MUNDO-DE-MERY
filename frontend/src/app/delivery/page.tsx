"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/cart-context";
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryPointsModal from "@/components/DeliveryPointsModal";

export default function DeliveryPage() {
  const { items, totalAmount } = useCart();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("home"); // "point" or "home"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenPoint, setChosenPoint] = useState(null as null | {
    name: string;
    address: string;
    eta: string;
    cost: string;
    lat: number;
    lng: number;
  });

  // Hard‑coded summary data (replace with real data later)
  const productTotal = 89.0;
  const discount = 24.10;
  const deliveryCost = 9.90;
  const total = productTotal - discount + deliveryCost; // 74.80

  const steps = [
    { name: "Carro", status: "complete" },
    { name: "Entrega", status: "current" },
    { name: "Pago", status: "upcoming" },
  ];

  const handleSavePoint = (point) => {
    setChosenPoint(point);
    setIsModalOpen(false);
    setSelectedOption("point");
  };

  const handleProceedToPayment = () => {
    if (selectedOption === "point" && !chosenPoint) {
      alert("Por favor seleccione un punto de entrega.");
      return;
    }
    // Persist selection (example using sessionStorage)
    sessionStorage.setItem(
      "deliveryOption",
      JSON.stringify({ type: selectedOption, point: chosenPoint })
    );
    // Navigate to payment page (adjust path as needed)
    router.push("/pagar");
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen py-10 px-4 md:px-8 lg:px-12">
        {/* Progress Indicator */}
        <div className="mx-auto max-w-5xl mb-8 flex items-center justify-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full 
                  ${step.status === "complete" ? "bg-[#F04D30] text-white" : step.status === "current" ? "border-2 border-[#F04D30] bg-white text-[#F04D30]" : "border-2 border-gray-300 bg-white text-gray-400"}`}
              >
                {step.status === "complete" ? "✓" : idx + 1}
              </div>
              <span
                className={`font-medium 
                  ${step.status === "complete" ? "text-[#F04D30]" : step.status === "current" ? "text-[#F04D30]" : "text-gray-500"}`}
              >
                {step.name}
              </span>
              {idx < steps.length - 1 && (
                <div className="flex-1 border-t border-gray-300 mx-4" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-800">
                <FaMapMarkerAlt className="text-[#F04D30]" />
                <span className="font-medium">Dirección - Mz B1, Casa1, Los Olivos, Lima</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="#" className="text-sm text-[#F04D30] hover:underline">
                  Cambiar
                </Link>
                <FaInfoCircle className="text-gray-400" />
              </div>
            </div>

            {/* Show chosen point if selected */}
            {selectedOption === "point" && chosenPoint && (
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-800">{chosenPoint.name}</p>
                <p className="text-sm text-gray-600">{chosenPoint.address}</p>
                <p className="text-sm text-gray-600">Entrega estimada: {chosenPoint.eta} - {chosenPoint.cost}</p>
              </div>
            )}

            {/* Delivery Options Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
              {/* Retiro en un punto */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">Retiro en un punto</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:border-[#F04D30]">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="point1"
                      className="mr-2"
                      onChange={() => setSelectedOption("point")}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Retira mañana, 11 de jun. En Falabella Puruchuco (2.6km)</p>
                      <p className="text-sm text-gray-500">Gratis</p>
                    </div>
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:border-[#F04D30]">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="point2"
                      className="mr-2"
                      onChange={() => setSelectedOption("point")}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Retira mañana, 11 de jun. En Falabella Santa Anita (2.7km)</p>
                      <p className="text-sm text-gray-500">Gratis</p>
                    </div>
                  </label>
                  <div className="flex space-x-4 text-sm mt-2">
                    <button className="text-[#F04D30] hover:underline" onClick={() => setIsModalOpen(true)}>
                      Más opciones
                    </button>
                    <button className="text-[#F04D30] hover:underline">¿Retira alguien más?</button>
                  </div>
                </div>
              </section>

              {/* Envío a domicilio */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">Envío a domicilio</h3>
                <label
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer 
                    ${selectedOption === "home" ? "border-[#333333] bg-gray-50" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="home"
                    className="mr-2"
                    checked={selectedOption === "home"}
                    onChange={() => setSelectedOption("home")}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Llega mañana, 11 de jun. de 9 a 21 h</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <button className="text-[#F04D30] hover:underline">Cambiar fecha</button>
                      <span>·</span>
                      <span className="font-medium">S/ 9.90</span>
                    </div>
                  </div>
                </label>
              </section>
            </div>
          </div>

          {/* Right Column – Summary */}
          <aside className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Resumen de la compra</h2>
            <ul className="space-y-2 mb-4 text-gray-700">
              <li className="flex justify-between">
                <span>Productos (1)</span>
                <span>S/ {productTotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Descuentos (1)</span>
                <span className="text-red-600">-S/ {discount.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Entregas (1)</span>
                <span>S/ {deliveryCost.toFixed(2)}</span>
              </li>
            </ul>
            <div className="flex justify-between items-center text-xl font-semibold text-gray-900 mb-6">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
            <button
              className="block w-full text-center py-3 rounded-full font-semibold bg-[#F04D30] hover:bg-[#d33c23] text-white"
              onClick={handleProceedToPayment}
              disabled={selectedOption === "point" && !chosenPoint}
            >
              Ir a Pago
            </button>
          </aside>
        </div>
      </section>

      {/* Delivery Points Modal */}
      <DeliveryPointsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePoint}
      />
    </>
  );
}
