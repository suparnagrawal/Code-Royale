"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ProfileChartProps = {
  data: { date: string; elo: number }[];
};

export default function ProfileChart({ data }: ProfileChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No battle history yet
      </div>
    );
  }

  // Calculate domain min/max to make the chart look more dynamic
  const elos = data.map(d => d.elo);
  const minElo = Math.max(0, Math.min(...elos) - 50);
  const maxElo = Math.max(...elos) + 50;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={false} 
          tickMargin={10} 
        />
        <YAxis 
          domain={[minElo, maxElo]} 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={false} 
          tickMargin={10} 
          width={50}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "8px", color: "#fff" }}
          itemStyle={{ color: "#eab308" }}
        />
        <Line
          type="monotone"
          dataKey="elo"
          stroke="#eab308"
          strokeWidth={3}
          dot={{ r: 4, fill: "#eab308", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#fff", stroke: "#eab308", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
