
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from './StatCard';
import { Users, Clock, TrendingUp, BarChart4, Activity } from 'lucide-react';
import { generateDashboardStats, generateFootfallData, generateTimeSpentData, generateHeatmapData } from '@/utils/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';

interface DashboardProps {
  analysisData?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ analysisData }) => {
  // Use analysis data if provided, otherwise fall back to mock data
  const stats = useMemo(() => 
    analysisData?.stats || generateDashboardStats(),
  [analysisData]);
  
  const footfallData = useMemo(() => 
    analysisData?.footfallData || generateFootfallData(),
  [analysisData]);
  
  const timeSpentData = useMemo(() => 
    analysisData?.timeSpentData || generateTimeSpentData(),
  [analysisData]);
  
  const heatmapData = useMemo(() => 
    analysisData?.heatmapData || generateHeatmapData(),
  [analysisData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto py-8 px-4 slide-up">
      <h2 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Visitors" 
          value={stats.totalVisitors} 
          icon={<Users className="w-4 h-4" />} 
          description="People detected in the video"
        />
        <StatCard 
          title="Average Time Spent" 
          value={`${stats.averageTimeSpent} min`} 
          icon={<Clock className="w-4 h-4" />} 
          description="Average dwell time per visitor"
        />
        <StatCard 
          title="Peak Hour" 
          value={stats.peakHour} 
          icon={<TrendingUp className="w-4 h-4" />} 
          description="Highest traffic hour"
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          icon={<Activity className="w-4 h-4" />} 
          description="Visitors who made a purchase"
        />
      </div>
      
      <Tabs defaultValue="footfall" className="w-full">
        <TabsList className="mb-6 mx-auto w-fit">
          <TabsTrigger value="footfall" className="px-6">Footfall</TabsTrigger>
          <TabsTrigger value="time-spent" className="px-6">Time Spent</TabsTrigger>
          <TabsTrigger value="heatmap" className="px-6">Store Heatmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="footfall" className="p-0">
          <Card className="bg-white/70 backdrop-blur-sm border border-border/30">
            <CardHeader>
              <CardTitle className="text-xl">Hourly Footfall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={footfallData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        borderColor: 'hsl(var(--primary))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      name="Visitors"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time-spent" className="p-0">
          <Card className="bg-white/70 backdrop-blur-sm border border-border/30">
            <CardHeader>
              <CardTitle className="text-xl">Time Spent Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeSpentData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="percentage"
                      nameKey="category"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {timeSpentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        borderColor: 'hsl(var(--primary))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="heatmap" className="p-0">
          <Card className="bg-white/70 backdrop-blur-sm border border-border/30">
            <CardHeader>
              <CardTitle className="text-xl">Store Traffic Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-5 gap-1 p-4 max-w-md mx-auto">
                  {heatmapData.map((row, rowIndex) => (
                    row.map((value, colIndex) => (
                      <div 
                        key={`${rowIndex}-${colIndex}`}
                        className="w-16 h-16 rounded-md flex items-center justify-center text-xs font-medium text-white"
                        style={{ 
                          backgroundColor: `rgba(0, 136, 254, ${value/100})`,
                          transform: `scale(${0.85 + (value/500)})`,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {value}%
                      </div>
                    ))
                  ))}
                </div>
                <div className="flex items-center mt-6 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-sm mr-2" style={{ background: 'rgba(0, 136, 254, 0.1)' }}></div>
                  <span className="mr-4">Low Traffic</span>
                  <div className="w-4 h-4 rounded-sm mr-2" style={{ background: 'rgba(0, 136, 254, 0.5)' }}></div>
                  <span className="mr-4">Medium Traffic</span>
                  <div className="w-4 h-4 rounded-sm mr-2" style={{ background: 'rgba(0, 136, 254, 1)' }}></div>
                  <span>High Traffic</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
