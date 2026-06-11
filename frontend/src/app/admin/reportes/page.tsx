"use client";

import { useEffect, useState, useRef } from "react";
import { adminService } from "@/features/admin/services/admin-service";
import DashboardChartCard from "../components/DashboardChartCard";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
import { FaFilePdf, FaPrint, FaFileExcel } from "react-icons/fa";
import { exportToExcel, exportToPDF, printTable } from "@/lib/exportUtils";

interface Transaction {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: "Entregado" | "Pendiente" | "Procesando";
}

export default function AdminReportsPage() {
  const [loading, setLoading] = useState(true);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);
  const [categoryRevenues, setCategoryRevenues] = useState<number[]>([]);

  const revenueChartRef = useRef<HTMLCanvasElement | null>(null);
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const revenueChartInstance = useRef<Chart | null>(null);
  const categoryChartInstance = useRef<Chart | null>(null);

  const handleExportPDF = () => {
    const columns = ["Pedido", "Cliente", "Fecha", "Monto", "Estado"];
    const data = transactions.map(t => [
      `#${t.id.toString().padStart(4, "0")}`,
      t.customer,
      new Date(t.date).toLocaleDateString("es-PE"),
      `S/. ${t.amount.toFixed(2)}`,
      t.status
    ]);
    exportToPDF(columns, data, "Reporte de Transacciones Recientes", "transacciones.pdf");
  };

  const handleExportExcel = () => {
    const data = transactions.map(t => ({
      Pedido: `#${t.id.toString().padStart(4, "0")}`,
      Cliente: t.customer,
      Fecha: new Date(t.date).toLocaleDateString("es-PE"),
      Monto: t.amount,
      Estado: t.status
    }));
    exportToExcel(data, "transacciones.xlsx");
  };

  const handlePrint = () => {
    if (tableRef.current) {
      printTable(tableRef.current.outerHTML, "Reporte de Transacciones Recientes");
    }
  };

  const [transactions] = useState<Transaction[]>([
    { id: 1, customer: "María González", date: "2026-06-09", amount: 245.50, status: "Entregado" },
    { id: 2, customer: "Carlos Ruiz", date: "2026-06-09", amount: 189.00, status: "Procesando" },
    { id: 3, customer: "Ana López", date: "2026-06-08", amount: 312.75, status: "Pendiente" },
    { id: 4, customer: "Luis Fernández", date: "2026-06-08", amount: 156.25, status: "Entregado" },
    { id: 5, customer: "Patricia Mendoza", date: "2026-06-07", amount: 423.00, status: "Entregado" },
    { id: 6, customer: "Jorge Castillo", date: "2026-06-07", amount: 98.50, status: "Procesando" },
    { id: 7, customer: "Elena Vargas", date: "2026-06-06", amount: 567.80, status: "Entregado" },
    { id: 8, customer: "Roberto Díaz", date: "2026-06-06", amount: 234.00, status: "Pendiente" },
  ]);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        const products = await adminService.getProducts();

        const revenueMap: { [key: string]: number } = {};
        products.forEach(product => {
          const categoryName = product.categoryName || "Sin Categoría";
          const revenue = (product.price || 0) * (product.stock || 0);
          if (revenueMap[categoryName]) {
            revenueMap[categoryName] += revenue;
          } else {
            revenueMap[categoryName] = revenue;
          }
        });

        setCategoryLabels(Object.keys(revenueMap));
        setCategoryRevenues(Object.values(revenueMap));

      } catch (error) {
        console.error("Error al cargar datos de reportes", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchReportsData();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (revenueChartRef.current) {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();

      revenueChartInstance.current = new Chart(revenueChartRef.current, {
        type: "bar",
        data: {
          labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
          datasets: [
            {
              label: "Entregados",
              data: [12, 19, 15, 25, 22, 30, 18],
              backgroundColor: "#22c55e",
              borderRadius: 4
            },
            {
              label: "Pendientes",
              data: [5, 8, 6, 10, 7, 12, 9],
              backgroundColor: "#eab308",
              borderRadius: 4
            },
            {
              label: "Cancelados",
              data: [2, 3, 1, 4, 2, 5, 3],
              backgroundColor: "#ef4444",
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                boxWidth: 12,
                font: { size: 11 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "rgba(0, 0, 0, 0.04)" },
              ticks: { stepSize: 1 }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    if (categoryChartRef.current && categoryLabels.length > 0) {
      if (categoryChartInstance.current) categoryChartInstance.current.destroy();

      categoryChartInstance.current = new Chart(categoryChartRef.current, {
        type: "doughnut",
        data: {
          labels: categoryLabels,
          datasets: [{
            label: "Ingresos por Categoría",
            data: categoryRevenues,
            backgroundColor: [
              "#D9C2AD",
              "#C8A98D",
              "#B08968",
              "#7F5539",
              "#EDE0D4",
              "#9C6644",
              "#6F4E37"
            ],
            borderWidth: 2,
            borderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: { size: 11 }
              }
            }
          }
        }
      });
    }

    return () => {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
      if (categoryChartInstance.current) categoryChartInstance.current.destroy();
    };
  }, [loading, categoryLabels, categoryRevenues]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-700";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "Procesando":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="text-slate-500 font-medium">Cargando reportes...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Reportes y Estadísticas</h1>
      </div>

      {/* Gráficos Estadísticos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <DashboardChartCard
            title="Estado de Pedidos"
            subtitle="Pedidos por estado durante la semana"
          >
            <canvas ref={revenueChartRef} />
          </DashboardChartCard>
        </div>
        <div className="lg:col-span-1">
          <DashboardChartCard
            title="Distribución por Categoría"
            subtitle="Ingresos potenciales por tipo de cerámica"
          >
            <canvas ref={categoryChartRef} />
          </DashboardChartCard>
        </div>
      </div>

      {/* Tabla de Transacciones Recientes */}
      <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Transacciones Recientes</h2>
            <p className="text-sm text-slate-500 mt-1">
              Últimos pedidos registrados en el sistema
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              <FaFileExcel />
              Excel
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
            >
              <FaFilePdf />
              PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaPrint />
              Imprimir
            </button>
          </div>
        </div>
        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">
                  Pedido
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">
                  Cliente
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">
                  Fecha
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">
                  Monto
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    #{transaction.id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(transaction.date).toLocaleDateString("es-PE")}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    S/. {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}