
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Roadmap from '@/components/Roadmap';
import FailurePrediction from '@/components/FailurePrediction';
import CompetitorAnalysis from '@/components/CompetitorAnalysis';
import LegalChecklist from '@/components/LegalChecklist';
import AIMentor from '@/components/AIMentor';
import { FormProvider } from '@/context/FormContext';
import { CalendarDays, AlertTriangle, Search, FileText, Bot } from 'lucide-react';

const RoadmapResult = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 sm:pt-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                Your Startup Insights
              </span>
              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Your Custom Startup Roadmap
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                Based on your profile, we've generated these insights to guide your entrepreneurial journey
              </p>
            </div>
            
            <Tabs defaultValue="roadmap" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto scrollbar-hide pb-2">
                <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto p-1 mb-4 sm:mb-8 flex-nowrap min-w-max sm:min-w-0">
                  <TabsTrigger value="roadmap" className="py-2 sm:py-3 whitespace-nowrap">
                    <CalendarDays className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Roadmap</span>
                  </TabsTrigger>
                  <TabsTrigger value="failure" className="py-2 sm:py-3 whitespace-nowrap">
                    <AlertTriangle className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Risks</span>
                  </TabsTrigger>
                  <TabsTrigger value="competitors" className="py-2 sm:py-3 whitespace-nowrap">
                    <Search className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Competitors</span>
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="py-2 sm:py-3 whitespace-nowrap">
                    <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Legal</span>
                  </TabsTrigger>
                  <TabsTrigger value="mentor" className="py-2 sm:py-3 whitespace-nowrap">
                    <Bot className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">AI Mentor</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <TabsContent value="roadmap" className="animate-fade-in">
                  <Roadmap />
                </TabsContent>
                
                <TabsContent value="failure" className="animate-fade-in">
                  <FailurePrediction />
                </TabsContent>
                
                <TabsContent value="competitors" className="animate-fade-in">
                  <CompetitorAnalysis />
                </TabsContent>
                
                <TabsContent value="legal" className="animate-fade-in">
                  <LegalChecklist />
                </TabsContent>
                
                <TabsContent value="mentor" className="animate-fade-in">
                  <AIMentor />
                </TabsContent>
              </div>
            </Tabs>
          </div>  
        </main>
        
 
      </div>
    </FormProvider>
  );
};

export default RoadmapResult;
