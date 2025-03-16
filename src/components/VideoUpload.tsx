
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Video, FileVideo, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onVideoProcessed: () => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { toast } = useToast();

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

  const processVideo = useCallback(() => {
    setIsUploading(true);
    
    // Simulate video processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Video processed successfully",
        description: "Your video has been analyzed. View your insights below.",
      });
      onVideoProcessed();
    }, 3000);
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
          processVideo();
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
  }, [processVideo, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes('video/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setVideoPreview(reader.result as string);
          processVideo();
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
  }, [processVideo, toast]);

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
            <label htmlFor="video-upload">
              <div className="relative">
                <Button className="relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <FileVideo className="w-4 h-4" />
                    Select Video
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-background opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                <input 
                  id="video-upload" 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileSelect}
                />
              </div>
            </label>
            <p className="mt-4 text-xs text-muted-foreground">
              Supported formats: MP4, MOV, AVI (max 100MB)
            </p>
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video 
              src={videoPreview} 
              className="w-full h-full object-cover"
              controls
            />
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <span className="loader mb-4"></span>
                <p className="text-white font-medium">Analyzing video...</p>
                <p className="text-white/70 text-sm mt-2">This may take a moment</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoUpload;
