"use client";

import { useEffect, useState, useRef } from "react";
import { adminService } from "@/features/admin/services/admin-service";
import DashboardCard from "../components/DashboardCard";
import DashboardChartCard from "../components/DashboardChartCard";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

type TimeFilter = "today" | "weekly" | "monthly";

export default function AdminDashboardPage() {
    const [productCount, setProductCount] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);
    const [salesCount, setSalesCount] = useState<number>(300); // Este dato es temporal :v
    const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(12); // lo mismo con este, sino saldría 0
    const [loading, setLoading] = useState(true);

    // Estado para controlar el filtro del gráfico de ingresos
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("monthly");

    // Estado para el reloj en tiempo real
    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    // Estados dinámicos para las etiquetas y valores del gráfico de inventario
    const [categoryLabels, setCategoryLabels] = useState<string[]>([]);
    const [categoryStocks, setCategoryStocks] = useState<number[]>([]);

    // Referencias para los gráficos
    const revenueChartRef = useRef<HTMLCanvasElement | null>(null);
    const inventoryChartRef = useRef<HTMLCanvasElement | null>(null);

    // Instancias de Chart
    const revenueChartInstance = useRef<Chart | null>(null);
    const inventoryChartInstance = useRef<Chart | null>(null);

    // Reloj en teimpo real 
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            const formatted = now.toLocaleString("es-PE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });

            setCurrentDateTime(formatted.charAt(0).toUpperCase() + formatted.slice(1));
        };

        // Ejecutar inmediatamente al montar el componente
        updateClock();

        // Configurar el intervalo para que se ejecute CADA SEGUNDO (1000ms)
        const timerId = setInterval(updateClock, 1000);

        return () => clearInterval(timerId);
    }, []);

    // Se usa useEffect para traer datos del back
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [products, users] = await Promise.all([
                    adminService.getProducts(),
                    adminService.getUsers()
                ]);

                const totalStock = products.reduce((accumulator, product) => {
                    return accumulator + (product.stock || 0);
                }, 0);

                const inventoryMap: { [key: string]: number } = {};

                products.forEach(product => {
                    const categoryName = product.categoryName || "Sin Categoría";
                    const stock = product.stock || 0;

                    if (inventoryMap[categoryName]) {
                        inventoryMap[categoryName] += stock;
                    } else {
                        inventoryMap[categoryName] = stock;
                    }
                });

                setCategoryLabels(Object.keys(inventoryMap));
                setCategoryStocks(Object.values(inventoryMap));

                setProductCount(totalStock);
                setUserCount(users.length);
            } catch (error) {
                console.error("Error al cargar métricas del dashboard", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchDashboardData();
    }, []);

    // Función auxiliar para retornar la data del gráfico según el filtro
    const getRevenueChartConfig = () => {
        switch (timeFilter) {
            case "today":
                return {
                    labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
                    data: [150, 420, 380, 890, 720, 510, 980, 400],
                    subtitle: "Flujo de recaudación por horas de hoy"
                };
            case "weekly":
                return {
                    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                    data: [1800, 2400, 1900, 3100, 4500, 6200, 3900],
                    subtitle: "Historial de ingresos de los últimos 7 días"
                };
            case "monthly":
            default:
                return {
                    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                    data: [80, 1100, 1100, 800, 400, 100, 600, 800, 100, 500, 700, 1000],
                    subtitle: "Historial de recaudación total en el año"
                };
        }
    };

    // UseEffect para iniciar y actualizar los gráficos cuando cambian los datos o el filtro de tiempo
    useEffect(() => {
        if (loading) return;

        // GRÁFICO 1: Ganancias de Tendencias de Ingresos
        if (revenueChartRef.current) {
            if (revenueChartInstance.current) revenueChartInstance.current.destroy();

            const currentConfig = getRevenueChartConfig();

            revenueChartInstance.current = new Chart(revenueChartRef.current, {
                type: "line",
                data: {
                    labels: currentConfig.labels,
                    datasets: [{
                        label: "Ingresos (S/.)",
                        data: currentConfig.data,
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37, 99, 235, 0.05)",
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: "#2563eb",
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            grid: { color: "rgba(0, 0, 0, 0.04)" },
                            ticks: { callback: (value) => "S/. " + value }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // GRÁFICO 2: Distribución de Inventario
        if (inventoryChartRef.current && categoryLabels.length > 0) {
            if (inventoryChartInstance.current) inventoryChartInstance.current.destroy();

            inventoryChartInstance.current = new Chart(inventoryChartRef.current, {
                type: "pie",
                data: {
                    labels: categoryLabels,
                    datasets: [{
                        label: "Unidades disponibles",
                        data: categoryStocks,
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
            if (inventoryChartInstance.current) inventoryChartInstance.current.destroy();
        };
    }, [loading, categoryLabels, categoryStocks, timeFilter]);

    if (loading) {
        return <div className="text-slate-500 font-medium">Cargando resumen del sistema...</div>;
    }

    const currentChartMeta = getRevenueChartConfig();

    return (
        <div className="space-y-6">

            {/* Encabezado con Reloj (ubicado en la esquina superior derecha) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Resumen del Sistema</h1>
                    <p className="text-sm text-[#736357] font-medium mt-1">
                        Estado en tiempo real de las ventas de este mes
                    </p>
                </div>
                {/* Reloj Digital Estilizado */}
                <div className="bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl shadow-sm self-start md:self-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Fecha y Hora Actual
                    </span>
                    <span className="text-sm font-semibold text-slate-800 tabular-nums">
                        {currentDateTime || "Sincronizando reloj..."}
                    </span>
                </div>
            </div>

            {/* Contenedor de las 4 Cards */}
            <div className="flex flex-col sm:flex-row gap-5 w-full">
                <DashboardCard
                    title="Ventas Totales"
                    value={`S/. ${salesCount}`}
                    iconType="sales"
                />
                <DashboardCard
                    title="Usuarios recientes"
                    value={userCount}
                    iconType="users"
                />
                <DashboardCard
                    title="Inventario"
                    value={productCount}
                    iconType="inventory"
                />
                <DashboardCard
                    title="Pedidos pendientes"
                    value={pendingOrdersCount}
                    iconType="pending"
                />
            </div>

            {/* Contenedor de los gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full items-start">

                {/* Gráfico de Ingresos */}
                <div className="lg:col-span-2 relative">
                    <div className="absolute top-6 right-6 z-10 flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => setTimeFilter("today")}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${timeFilter === "today"
                                ? "bg-white text-slate-950 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => setTimeFilter("weekly")}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${timeFilter === "weekly"
                                ? "bg-white text-slate-950 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Última Semana
                        </button>
                        <button
                            onClick={() => setTimeFilter("monthly")}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${timeFilter === "monthly"
                                ? "bg-white text-slate-950 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Mensual
                        </button>
                    </div>

                    <DashboardChartCard
                        title="Ganancias de Tendencias de Ingresos"
                        subtitle={currentChartMeta.subtitle}
                    >
                        <canvas ref={revenueChartRef} />
                    </DashboardChartCard>
                </div>

                {/* Gráfico de Distribución de Inventario*/}
                <div className="lg:col-span-1">
                    <DashboardChartCard title="Distribución de Inventario" subtitle="Unidades en stock por tipo de cerámica">
                        <canvas ref={inventoryChartRef} />
                    </DashboardChartCard>
                </div>

            </div>
        </div>
    );
}