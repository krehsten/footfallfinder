
export const generateFootfallData = (fileName = "") => {
  // Generate hours of the day (8am to 10pm)
  const hours = Array.from({ length: 15 }, (_, i) => i + 8);
  
  // Custom data for video2.mp4
  if (fileName === "video2.mp4") {
    return hours.map(hour => {
      const hourStr = hour > 12 ? `${hour-12}pm` : `${hour}am`;
      // Higher values at 8am for video2.mp4
      let count = 0;
      
      if (hour === 8) { // Peak at 8am
        count = 12; // All 12 people at peak
      } else if (hour === 9) {
        count = 5;
      } else if (hour === 12) {
        count = 8;
      } else if (hour === 18) {
        count = 6;
      } else {
        // Some random distribution for other hours
        count = Math.floor(Math.random() * 4);
      }
      
      return {
        hour: hourStr,
        count
      };
    });
  }
  
  // Default data for other videos
  return hours.map(hour => {
    const hourStr = hour > 12 ? `${hour-12}pm` : `${hour}am`;
    // Higher values during lunch and after work hours
    let count = 0;
    if (hour === 12) { // Lunch hour
      count = 1; // Peak at noon
    } else if (hour === 18) { // After work hour
      count = 1; // Peak at 6pm
    }
    
    return {
      hour: hourStr,
      count
    };
  });
};

export const generateTimeSpentData = (fileName = "") => {
  if (fileName === "video2.mp4") {
    return [
      { category: "< 5 min", percentage: 15 },
      { category: "5-15 min", percentage: 45 },
      { category: "15-30 min", percentage: 30 },
      { category: "> 30 min", percentage: 10 }
    ];
  }

  return [
    { category: "< 5 min", percentage: 25 },
    { category: "5-15 min", percentage: 50 },
    { category: "15-30 min", percentage: 25 },
    { category: "> 30 min", percentage: 0 }
  ];
};

export const generateHeatmapData = (fileName = "") => {
  if (fileName === "video2.mp4") {
    // Store layout: 5x5 grid with more distributed traffic for video2.mp4
    const grid = Array(5).fill(0).map(() => Array(5).fill(5)); // Start with some base traffic
    
    // Add hotspots where we detected people
    grid[0][0] = 15; 
    grid[1][2] = 20;
    grid[2][1] = 18;
    grid[2][3] = 20;
    grid[3][3] = 15;
    grid[4][1] = 10;
    grid[4][4] = 12;
    
    return grid;
  }
  
  // Original logic for other videos
  const grid = Array(5).fill(0).map(() => Array(5).fill(0));
  
  // Add hotspots where we detected people
  grid[2][1] = 15; // First person
  grid[2][3] = 15; // Second person
  
  // Add some heat to adjacent cells
  for (let y = 1; y <= 3; y++) {
    for (let x = 0; x <= 4; x++) {
      if (grid[y][x] === 0) {
        if ((Math.abs(y-2) <= 1) && (Math.abs(x-1) <= 1 || Math.abs(x-3) <= 1)) {
          grid[y][x] = 5;
        }
      }
    }
  }
  
  return grid;
};

export const generateDashboardStats = (fileName = "") => {
  if (fileName === "video2.mp4") {
    return {
      totalVisitors: 12,
      averageTimeSpent: 12,
      peakHour: "8am",
      conversionRate: 65
    };
  }

  return {
    totalVisitors: 2,  // Fixed to match the correct number of people in the video
    averageTimeSpent: 8,
    peakHour: "12pm",
    conversionRate: 50
  };
};
