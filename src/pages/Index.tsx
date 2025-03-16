
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import VideoUpload from '@/components/VideoUpload';
import Dashboard from '@/components/Dashboard';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  
  const handleVideoProcessed = (results: any) => {
    setAnalysisResults(results);
    setShowDashboard(true);
  };
  
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      <section className="py-20 px-4" id="upload-section">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2">VIDEO ANALYSIS</p>
            <h2 className="text-3xl font-bold mb-4">Upload Your Video</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your video footage to get instant insights on foot traffic, 
              dwell time, and customer behavior.
            </p>
          </div>
          
          <VideoUpload onVideoProcessed={handleVideoProcessed} />
        </div>
      </section>
      
      {showDashboard && (
        <>
          <Separator className="max-w-3xl mx-auto" />
          <Dashboard analysisData={analysisResults} />
        </>
      )}
      
      <footer className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">FootfallFinder<span className="text-primary">.</span></h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered video analytics for business intelligence
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 FootfallFinder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
