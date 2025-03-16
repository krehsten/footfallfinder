
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNiAyNGgtMnY0aDJ2LTR6bTAgMTB2LTRoLTJ2NGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center slide-up">
        <div className="inline-block mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
            AI-Powered Video Analytics
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          FootfallFinder<span className="text-primary">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Transform your video footage into actionable business insights with our 
          advanced people counting and analytics platform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="group relative overflow-hidden"
            onClick={scrollToUpload}
          >
            <span className="relative z-10 flex items-center gap-2">
              Try It Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 w-full h-full bg-background opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/80 backdrop-blur-sm"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-1">99%</div>
            <p className="text-sm text-muted-foreground">Counting Accuracy</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-1">30+</div>
            <p className="text-sm text-muted-foreground">Analytics Metrics</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-1">2x</div>
            <p className="text-sm text-muted-foreground">Business Growth</p>
          </div>
        </div>
      </div>
      
      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-muted-foreground/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
