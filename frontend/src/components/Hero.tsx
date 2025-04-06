
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16 md:pt-20">
      <div className="container mx-auto px-4 pt-16 pb-24 md:pb-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-fade-in">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              AI-Powered Startup Success
            </span>
          </div>
          
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
            Your Personalized Roadmap to Startup Success
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Let AI guide your entrepreneurial journey with tailored roadmaps, competitive insights, and real-time mentorship to turn your vision into reality.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
   
    </div>
  );
};

export default Hero;
