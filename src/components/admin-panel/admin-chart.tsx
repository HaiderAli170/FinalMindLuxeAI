"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
<<<<<<< HEAD
  Legend,
} from "recharts";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  userGrowth: { name: string; users: number }[];
}

export function AdminChart({ stats }: { stats: UserStats }) {
  if (!stats || !stats.userGrowth) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading stats...</p>
        </CardContent>
      </Card>
    );
  }

  const userOverviewData = [
    { name: "Total Users", count: stats.totalUsers },
    { name: "Active Users", count: stats.activeUsers },
    { name: "Premium Users", count: stats.premiumUsers },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.userGrowth}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current User Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={userOverviewData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Total Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
=======
} from "recharts";

const data = [
  {
    name: "Jan",
    users: 4000,
  },
  {
    name: "Feb",
    users: 3000,
  },
  {
    name: "Mar",
    users: 2000,
  },
  {
    name: "Apr",
    users: 2780,
  },
  {
    name: "May",
    users: 1890,
  },
  {
    name: "Jun",
    users: 2390,
  },
];

export function AdminChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
>>>>>>> 852510b1f934348e3d82706f00af2b31dd2f6e7f
  );
} 