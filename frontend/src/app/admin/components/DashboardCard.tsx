"use client";

import { FaDollarSign, FaUsers, FaBox, FaClock } from "react-icons/fa";

interface DashboardCardProps {
    title: string;
    value: number | string;
    iconType: "sales" | "users" | "inventory" | "pending";
}

export default function DashboardCard({ title, value, iconType }: DashboardCardProps) {
    const icons = {
        sales: <FaDollarSign className="w-8 h-8 text-black" />,
        users: <FaUsers className="w-8 h-8 text-black" />,
        inventory: <FaBox className="w-8 h-8 text-black" />,
        pending: <FaClock className="w-8 h-8 text-black" />,
    };

    return (
        <div className="flex items-center justify-between p-6 bg-white border-2 border-slate-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow min-w-[240px] flex-1">
            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-800 tracking-tight">{title}</p>
                <p className="text-3xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-xl flex items-center justify-center">
                {icons[iconType]}
            </div>
        </div>
    );
}