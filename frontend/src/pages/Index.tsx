
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { ArrowRight, Zap, Search, FileText, Bot, TrendingDown } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "AI-Powered Roadmap Generation",
      description: "Get a tailored startup roadmap based on your industry, budget, and market, with actionable steps and timelines."
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-primary" />,
      title: "Failure Prediction",
      description: "AI analyzes potential risks and failure points specific to your startup, helping you avoid common pitfalls."
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Competitor SWOT Analysis",
      description: "Automated analysis of your competitors' strengths, weaknesses, opportunities, and threats."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Legal & Compliance Checklist",
      description: "Ensure your startup follows all necessary legal requirements with our customized compliance checklist."
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI Mentor Bot",
      description: "Get real-time guidance and answers to your startup questions from our AI assistant."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Powerful Features
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                Everything you need to build a successful startup
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our AI-powered tools guide you through every phase of your entrepreneurial journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Simple Process
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                How LaunchPath works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get your personalized startup roadmap in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fill the Startup Profile</h3>
                <p className="text-muted-foreground">
                  Answer questions about your industry, budget, team, and startup vision
                </p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Generates Your Roadmap</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your inputs and creates a custom roadmap and risk assessment
                </p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Execute With Confidence</h3>
                <p className="text-muted-foreground">
                  Follow your roadmap and use our tools to navigate challenges and track progress
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/dashboard">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to build your startup with confidence?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of entrepreneurs who are using LaunchPath to navigate their startup journey
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link to="/dashboard">
                  Get Started For Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
