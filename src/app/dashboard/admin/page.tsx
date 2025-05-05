"use client";

import { useEffect, useState } from "react";
import { AdminChart } from "@/components/admin-panel/admin-chart";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  userGrowth: { date: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    userGrowth: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4">
            <div className="text-lg font-medium">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
        </div>
   
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4">
            <div className="text-lg font-medium">Premium Users</div>
            <div className="text-2xl font-bold">{stats.premiumUsers}</div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <div className="col-span-1">
          <AdminChart />
        </div>
        {/* <div className="col-span-1">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4">
              <h3 className="text-base font-medium">Recent Activity</h3>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm">New user registered</p>
                  </div>
                  <p className="text-xs text-muted-foreground">2m ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <p className="text-sm">User upgraded to premium</p>
                  </div>
                  <p className="text-xs text-muted-foreground">15m ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <p className="text-sm">New health tip added</p>
                  </div>
                  <p className="text-xs text-muted-foreground">1h ago</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
} 