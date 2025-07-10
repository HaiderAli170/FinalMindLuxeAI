"use client";

import { useEffect, useState } from "react";
import { AdminChart } from "@/components/admin-panel/admin-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Newspaper, Users, Activity, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalBlogs: number;
  totalHealthMaterials: number;
  userGrowth: { name: string; users: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);

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

  if (!stats) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }
console.log(stats,"stats")
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premiumUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">Blogs</p>
          </CardContent>
        </Card>
      </div>
      {/* Full-width chart */}
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription>Track user growth and engagement over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <AdminChart stats={stats} />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Content Management Section */}
      <div className="w-full">
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage your educational content with ease.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-start">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">Blogs</span>
                <span className="text-muted-foreground text-xs">Create, edit, and manage all mental health blogs.</span>
                <Link href="/dashboard/admin/Blogs" passHref>
                  <Button size="sm" variant="outline" className="mt-1 w-fit">
                    <Newspaper className="mr-2 h-4 w-4" />
                    Manage Blogs
                  </Button>
                </Link>
              </div>
        
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 