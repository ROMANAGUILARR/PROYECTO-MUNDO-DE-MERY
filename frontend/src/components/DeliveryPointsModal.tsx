"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface DeliveryPoint {
  name: string;
  address: string;
  eta: string;
  cost: string;
  lat: number;
  lng: number;
}

interface DeliveryPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (point: DeliveryPoint) => void;
  initialSelected?: DeliveryPoint | null;
}

const points: DeliveryPoint[] = [
  {
    name: "Falabella Puruchuco",
    address: "Av. Presidentes 2154, Lima",
    eta: "30 min",
    cost: "Gratis",
    lat: -12.0478,
    lng: -76.9338,
  },
  {
    name: "Falabella Santa Anita",
    address: "Av. Santa Anita 2100, Lima",
    eta: "35 min",
    cost: "Gratis",
    lat: -12.0432,
    lng: -76.9714,
  },
  {
    name: "Falabella Express La Molina",
    address: "Jr. La Molina 123, Lima",
    eta: "40 min",
    cost: "Gratis",
    lat: -12.0895,
    lng: -76.9489,
  },
  {
    name: "Falabella Jockey Plaza",
    address: "Jockey Plaza, Av. Javier Prado Este",
    eta: "45 min",
    cost: "Gratis",
    lat: -12.0853,
    lng: -76.9773,
  },
  {
    name: "Tottus Tusilagos",
    address: "Jr. Tusilagos 456, Lima",
    eta: "50 min",
    cost: "Gratis",
    lat: -12.0224,
    lng: -77.0581,
  },
];

function LeafletMap({ points: mapPoints, selected }: { points: DeliveryPoint[]; selected: DeliveryPoint | null }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [leafletL, setLeafletL] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initMap = async () => {
      try {
        const leaflet = await import("leaflet");
        const L = leaflet.default;
        setLeafletL(L);

        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        if (mapRef.current && !mapInstance) {
          const map = L.map(mapRef.current).setView([-12.05, -76.95], 12);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          setMapInstance(map);
        }
      } catch (error) {
        console.error("Error loading Leaflet:", error);
      }
    };

    initMap();
  }, [mapInstance, isClient]);

  useEffect(() => {
    if (mapInstance && leafletL) {
      mapPoints.forEach((p) => {
        const marker = leafletL.marker([p.lat, p.lng]).addTo(mapInstance);
        marker.bindPopup(`${p.name}<br>${p.address}`);
      });
    }
  }, [mapInstance, leafletL, mapPoints]);

  if (!isClient) {
    return <div ref={mapRef} className="h-full w-full rounded bg-gray-100" />;
  }

  return React.createElement("div", { ref: mapRef, className: "h-full w-full rounded" });
}

export default function DeliveryPointsModal({
  isOpen,
  onClose,
  onSave,
  initialSelected = null,
}: DeliveryPointsModalProps) {
  const [selected, setSelected] = useState<DeliveryPoint | null>(initialSelected);

  const handleSave = () => {
    if (selected) {
      onSave(selected);
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-semibold">Puntos de entrega</Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="h-64 mb-4">
                  <LeafletMap points={points} selected={selected} />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-3">
                  {points.map((p) => (
                    <label key={p.name} className="flex items-center p-3 border rounded cursor-pointer hover:border-[#F04D30]">
                      <input
                        type="radio"
                        name="deliveryPoint"
                        className="mr-3"
                        checked={selected?.name === p.name}
                        onChange={() => setSelected(p)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.address}</p>
                        <p className="text-sm text-gray-500">Entrega estimada: {p.eta} - {p.cost}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-[#F04D30] hover:bg-[#d33c23] text-white"
                    onClick={handleSave}
                    disabled={!selected}
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}