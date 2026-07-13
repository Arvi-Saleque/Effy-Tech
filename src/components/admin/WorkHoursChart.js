"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-neutral-200">{payload[0].payload.name}</p>
        <p className="text-emerald-400 mt-0.5 font-mono">
          Hours: <span className="font-bold">{payload[0].value.toFixed(1)}h</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkHoursChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/20 text-xs text-neutral-500 font-medium">
        No hours logged today.
      </div>
    );
  }

  return (
    <div className="h-64 w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b/30" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false}
            dy={8}
          />
          <YAxis 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false}
            dx={-8}
            allowDecimals={true}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.03)" }} />
          <Bar 
            dataKey="hours" 
            fill="#279159" 
            radius={[4, 4, 0, 0]}
            maxBarSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
