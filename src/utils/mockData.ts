
export const generateFootfallData = () => {
  // Generate hours of the day (8am to 10pm)
  const hours = Array.from({ length: 15 }, (_, i) => i + 8);
  
  // Generate random visitor counts for each hour
  const data = hours.map(hour => ({
    hour: hour > 12 ? `${hour-12}pm` : `${hour}am`,
    count: Math.floor(Math.random() * 35) + 5
  }));
  
  return data;
};

export const generateTimeSpentData = () => {
  return [
    { category: "< 5 min", percentage: Math.floor(Math.random() * 25) + 5 },
    { category: "5-15 min", percentage: Math.floor(Math.random() * 25) + 15 },
    { category: "15-30 min", percentage: Math.floor(Math.random() * 20) + 15 },
    { category: "> 30 min", percentage: Math.floor(Math.random() * 20) + 5 }
  ];
};

export const generateHeatmapData = () => {
  // Store layout: 5x5 grid
  const grid = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      // Higher values in the center, lower at edges
      const distFromCenter = Math.sqrt(Math.pow(i-2, 2) + Math.pow(j-2, 2));
      const value = Math.max(0, 100 - Math.floor(distFromCenter * 30) - Math.floor(Math.random() * 20));
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
};

export const generateDashboardStats = () => {
  return {
    totalVisitors: Math.floor(Math.random() * 500) + 100,
    averageTimeSpent: Math.floor(Math.random() * 20) + 5,
    peakHour: Math.floor(Math.random() * 12) + 1 + (Math.random() > 0.5 ? "pm" : "am"),
    conversionRate: Math.floor(Math.random() * 30) + 10
  };
};
