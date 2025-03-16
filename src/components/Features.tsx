
import React from 'react';
import { Users, Clock, TrendingUp, LineChart, Eye, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "People Counting",
    description: "Accurately count the number of individuals entering and exiting your space with advanced computer vision."
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Dwell Time Analysis",
    description: "Measure how long customers spend in different areas to optimize store layout and product placement."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Traffic Flow Patterns",
    description: "Visualize movement patterns to identify high-traffic areas and optimize customer journeys."
  },
  {
    icon: <LineChart className="w-6 h-6 text-primary" />,
    title: "Trend Analysis",
    description: "Track changes over time to identify peak hours, slow periods, and seasonal variations."
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: "Attention Mapping",
    description: "Discover which displays and products attract the most customer attention and engagement."
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
    title: "Conversion Metrics",
    description: "Correlate footfall data with sales to measure and improve conversion rates."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2">CAPABILITIES</p>
          <h2 className="text-3xl font-bold mb-4">Advanced Analytics Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform uses computer vision technology to provide comprehensive 
            insights from your video footage, helping you make data-driven business decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/30 transition-all duration-300 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
