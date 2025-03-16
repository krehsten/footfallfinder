
import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileVideo, RefreshCw } from 'lucide-react';
import { analyzeVideo } from '@/utils/videoAnalysis';

interface VideoUploadProps {
  onVideoProcessed: (analysisResult: any) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processVideo = useCallback(async () => {
    setIsUploading(true);
    
    try {
      // Make sure the video is loaded and ready
      if (videoRef.current) {
        // Wait for video metadata to load
        if (videoRef.current.readyState < 2) {
          await new Promise(resolve => {
            videoRef.current!.onloadeddata = resolve;
          });
        }
        
        console.log("Video loaded, starting analysis...");
        
        // Analyze the video
        const analysisResult = await analyzeVideo(videoRef.current);
        console.log("Analysis complete:", analysisResult);
        
        toast({
          title: "Video processed successfully",
          description: `Detected ${analysisResult.totalVisitors} people in the video.`,
        });
        
        // Pass the analysis results to the parent component
        onVideoProcessed(analysisResult);
      }
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast({
        variant: "destructive",
        title: "Processing failed",
        description: "An error occurred while analyzing the video.",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onVideoProcessed, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      const fileType = file.type;
      if (fileType.includes('video/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setVideoPreview(reader.result as string);
          // Process will be triggered by onLoadedData event on the video element
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a video file.",
        });
      }
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes('video/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setVideoPreview(reader.result as string);
          // Process will be triggered by onLoadedData event on the video element
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a video file.",
        });
      }
    }
  }, [toast]);

  const handleSelectButtonClick = useCallback(() => {
    // Programmatically click the hidden file input when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleReuploadButtonClick = useCallback(() => {
    // Reset the video preview and allow the user to select a new video
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleVideoLoaded = useCallback(() => {
    console.log("Video loaded, ready for processing");
    processVideo();
  }, [processVideo]);

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <Card 
        className={`relative p-6 border border-dashed rounded-xl transition-all duration-200 
                   ${isDragging ? 'border-primary bg-primary/5' : 'border-border/50 bg-white/50'} 
                   backdrop-blur-sm overflow-hidden`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!videoPreview ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-float">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Upload your video</h3>
            <p className="max-w-md mb-6 text-sm text-muted-foreground">
              Drag and drop your video file here, or click the button below to select a file for footfall analysis
            </p>
            <div className="relative">
              <Button className="relative overflow-hidden group" onClick={handleSelectButtonClick}>
                <span className="relative z-10 flex items-center gap-2">
                  <FileVideo className="w-4 h-4" />
                  Select Video
                </span>
                <span className="absolute inset-0 w-full h-full bg-background opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleFileSelect}
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Supported formats: MP4, MOV, AVI (max 100MB)
            </p>
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video 
              ref={videoRef}
              src={videoPreview} 
              className="w-full h-full object-cover"
              controls
              onLoadedData={handleVideoLoaded}
            />
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <span className="loader mb-4"></span>
                <p className="text-white font-medium">Analyzing video...</p>
                <p className="text-white/70 text-sm mt-2">This may take a moment</p>
              </div>
            )}
            {!isUploading && (
              <div className="absolute top-4 right-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white" 
                  onClick={handleReuploadButtonClick}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reupload
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoUpload;
