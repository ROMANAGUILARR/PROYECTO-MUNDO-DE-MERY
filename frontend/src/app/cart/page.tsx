"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/cart-context";
import { useState, useEffect } from "react";
import { FaCheckSquare, FaSquare, FaMinus, FaPlus } from "react-icons/fa";

export default function CartPage() {
  const { items, increaseItem, decreaseItem } = useCart();
  // State to track which items are selected (key: `${productId}-${sizeId}`)
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Initialize selection state when items change
  useEffect(() => {
    setSelected(prev => {
      const newState = { ...prev };
      items.forEach(it => {
        const key = `${it.productId}-${it.sizeId}`;
        if (!(key in newState)) {
          // default to false (not selected) for new items
          newState[key] = false;
        }
      });
      return newState;
    });
  }, [items]);

  const toggleSelect = (key: string) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute selected items
  const selectedItems = items.filter((it) => selected[`${it.productId}-${it.sizeId}`]);
  const selectedCount = selectedItems.reduce((sum, it) => sum + it.quantity, 0);
  const selectedTotal = selectedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // Progress steps – Carro is current, others upcoming
  const steps = [
    { name: "Carro", status: "current" },
    { name: "Entrega", status: "upcoming" },
    { name: "Pago", status: "upcoming" },
  ];

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 md:px-8 lg:px-12">
      {/* Progress bar */}
      <nav className="flex justify-center mb-8 space-x-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                ${step.status === "complete" ? "bg-[#F04D30] border-[#F04D30] text-white" : step.status === "current" ? "border-[#F04D30] bg-white text-[#F04D30]" : "border-gray-300 bg-white text-gray-400"}`}
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

      <h1 className="text-2xl font-bold text-gray-800 max-w-6xl mx-auto mb-6">
        Carro ({items.length} {items.length === 1 ? "producto" : "productos"})
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* Left column – product list */}
        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.sizeId}`}
                 className={`flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200 ${selected[`${item.productId}-${item.sizeId}`] ? "ring-2 ring-[#F04D30]" : "opacity-60"}`}
              >
                {/* Checkbox */}
                <button
                  className="mt-1 text-gray-400 hover:text-[#F04D30]"
                  onClick={() => toggleSelect(`${item.productId}-${item.sizeId}`)}
                >
                  {selected[`${item.productId}-${item.sizeId}`] ? (
                    <FaCheckSquare size={20} />
                  ) : (
                    <FaSquare size={20} />
                  )}
                </button>
                {/* Placeholder image */}
                <Image src={item.imageUrl ? decodeURIComponent(item.imageUrl) : "/categorias/default.webp"} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                <div className="flex-1 space-y-1">
                  <h2 className="font-medium text-gray-800 text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">Pieza • {item.sizeName} ({item.sizeDimension})</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Llega mañana</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Retira mañana</span>
                  </div>
                  {/* Quantity control */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      className={`p-1 border rounded hover:bg-gray-100 ${
                        selected[`${item.productId}-${item.sizeId}`] ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!selected[`${item.productId}-${item.sizeId}`]}
                      onClick={
                        selected[`${item.productId}-${item.sizeId}`]
                          ? () => decreaseItem(item.productId, item.sizeId)
                          : undefined
                      }
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      className={`p-1 border rounded hover:bg-gray-100 ${
                        selected[`${item.productId}-${item.sizeId}`] ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!selected[`${item.productId}-${item.sizeId}`]}
                      onClick={
                        selected[`${item.productId}-${item.sizeId}`]
                          ? () => increaseItem(item.productId, item.sizeId)
                          : undefined
                      }
                    >
                      <FaPlus size={12} />
                    </button>
                    <span className="text-xs text-gray-500 ml-2">Máx 10</span>
                  </div>
                </div>
                {/* Price */}
{selected[`${item.productId}-${item.sizeId}`] && (
                      <p className="font-semibold text-gray-800 whitespace-nowrap">
                        Subtotal: S/{(item.price * item.quantity).toFixed(2)}
                      </p>
                    )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column – summary */}
        <aside className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit self-start">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Resumen de la orden</h2>
            <ul className="space-y-2 mb-4">
              <li className="flex justify-between text-gray-700">
                <span>Productos ({selectedItems.length})</span>
                <span>S/{selectedTotal.toFixed(2)}</span>
              </li>
              <li className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>S/{selectedTotal.toFixed(2)}</span>
              </li>
            </ul>
            <Link
              href="/delivery"
              className={`block w-full text-center py-3 rounded-full font-semibold ${selectedItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#F04D30] hover:bg-[#d33c23] text-white"}`}
              aria-disabled={selectedItems.length === 0}
              onClick={(e) => {
  if (selectedItems.length === 0) {
    e.preventDefault();
  }
}}
            >
              Continuar compra
            </Link>
        </aside>
      </div>
    </section>
  );
}