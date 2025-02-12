'use client';
import ReportsDashboardTable from '@/modules/analytics/report-table';
import { useAppHeader } from '@/lib/providers/app-provider/appheader-provider';
import { Button } from '@/lib/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import { BarChart, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

const recentActivities = [
  { id: '1', message: 'New user signed up', time: '2 hours ago' },
  { id: '2', message: 'New user signed up', time: '3 hours ago' },
  { id: '3', message: 'New user signed up', time: '4 hours ago' },
  { id: '4', message: 'New user signed up', time: '5 hours ago' },
  { id: '5', message: 'New user signed up', time: '6 hours ago' },
];

export default function Dashboard() {
  const { setBreadcrumbs, setTitle, setCustomHeader } = useAppHeader();

  useEffect(() => {
    setTitle('Dashboard');
    setBreadcrumbs([
      { label: 'Breadcrumb 1', href: '/dashboard' },
      { label: 'Breadcrumb 2', href: '/dashboard' },
      { label: 'Breadcrumb 3', href: '/dashboard' },
    ]);
    setCustomHeader(
      <div className="flex gap-2">
        <Button variant="outline">Secondary</Button>
        <Button variant="default">Primary</Button>
      </div>
    );

    return () => {
      setTitle('');
      setBreadcrumbs([]);
      setCustomHeader(null);
    };
  }, [setTitle, setBreadcrumbs, setCustomHeader]);

  return (
    <div className="flex gap-5 flex-col">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573.7%</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <ReportsDashboardTable />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.message}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
