
import { useEffect, useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const InitialLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        return next > 100 ? 100 : next;
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 px-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 duration-1000"></div>
        <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
          <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse text-primary" />
        </div>
      </div>
      
      <div className="mt-6 flex items-center">
        <span className="text-lg sm:text-xl font-medium">LaunchPath</span>
        <Sparkles className="ml-2 h-3 w-3 sm:h-4 sm:w-4 animate-pulse text-primary" />
      </div>
      
      <div className="w-48 sm:w-56 mt-8">
        <Progress value={progress} className="h-1.5" />
      </div>
      
      <div className="mt-4 flex space-x-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary delay-75"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary delay-150" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary delay-300" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default InitialLoader;
