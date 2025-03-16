
export const generateFootfallData = () => {
  // Generate hours of the day (8am to 10pm)
  const hours = Array.from({ length: 15 }, (_, i) => i + 8);
  
  // Fixed realistic visitor counts for each hour
  const data = hours.map(hour => {
    const hourStr = hour > 12 ? `${hour-12}pm` : `${hour}am`;
    // Higher values during lunch and after work hours
    let count = 0;
    if (hour >= 11 && hour <= 13) { // Lunch hours
      count = hour === 12 ? 2 : 1; // Peak at noon
    } else if (hour >= 17 && hour <= 19) { // After work hours
      count = hour === 18 ? 2 : 1; // Peak at 6pm
    } else {
      count = hour % 3 === 0 ? 1 : 0; // Occasional visitors
    }
    
    return {
      hour: hourStr,
      count
    };
  });
  
  return data;
};

export const generateTimeSpentData = () => {
  return [
    { category: "< 5 min", percentage: 25 },
    { category: "5-15 min", percentage: 50 },
    { category: "15-30 min", percentage: 25 },
    { category: "> 30 min", percentage: 0 }
  ];
};

export const generateHeatmapData = () => {
  // Store layout: 5x5 grid with low traffic values
  const grid = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      // Center area has slightly higher traffic
      const distFromCenter = Math.sqrt(Math.pow(i-2, 2) + Math.pow(j-2, 2));
      const value = Math.max(0, Math.min(20, 20 - Math.floor(distFromCenter * 10)));
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
};

export const generateDashboardStats = () => {
  return {
    totalVisitors: 2,  // Fixed to match the correct number of people in the video
    averageTimeSpent: 8,
    peakHour: "12pm",
    conversionRate: 50
  };
};
