"use client";

import React from "react";

interface DashboardChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function DashboardChartCard({ title, subtitle, children }: DashboardChartCardProps) {
    return (
        <div className="bg-white border-2 border-slate-300 rounded-2xl shadow-sm p-6 flex flex-col min-w-[300px] flex-1">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight">{title}</h3>
                {subtitle && <p className="text-xs text-[var(--muted)] mt-0.5">{subtitle}</p>}
            </div>

            {/* Esto renderiza el gráfico */}
            <div className="relative h-64 w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}