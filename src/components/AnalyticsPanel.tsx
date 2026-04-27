"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";


interface Order {
    id: string;
    email: string;
    total: number;
    date: string;
    status: "pending" | "completed" | "shipped";
}

interface Props {
    orders: Order[];
}

export default function AnalyticsPanel({ orders }: Props) {

    // Fake data (tu peux remplacer plus tard avec vrai calcul)
    const data = [
        { day: "Lun", revenue: 12000 },
        { day: "Mar", revenue: 18000 },
        { day: "Mer", revenue: 9000 },
        { day: "Jeu", revenue: 22000 },
        { day: "Ven", revenue: 15000 },
        { day: "Sam", revenue: 27000 },
        { day: "Dim", revenue: 32000 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

            {/* Chart */}
            <div className="lg:col-span-2 bg-white border border-[#0B1C2D]/10 p-6 hover:border-[#C6A75E]/30 transition-all duration-300">
                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-4">
                    Revenus (7 derniers jours)
                </p>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#C6A75E"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Statuts */}
            <div className="bg-white border border-[#0B1C2D]/10 p-6">
                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-6">
                    Statuts des commandes
                </p>

                <div className="h-56">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Completed", value: orders.filter(o => o.status === "completed").length },
                                    { name: "Pending", value: orders.filter(o => o.status === "pending").length },
                                    { name: "Shipped", value: orders.filter(o => o.status === "shipped").length },
                                ]}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={80}
                            >
                                <Cell fill="#16a34a" />
                                <Cell fill="#eab308" />
                                <Cell fill="#2563eb" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}