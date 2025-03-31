
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {  Clock, Calendar, ChevronRight } from 'lucide-react';


const Roadmap = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState('0');
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>({});

  const roadmapData = JSON.parse(window.localStorage.getItem("roadmap") || '{}');


  const handleStepToggle = (phaseIndex: number, stepIndex: number) => {
    const key = `${phaseIndex}-${stepIndex}`;
    setCheckedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const getPhaseProgress = (phaseIndex: number) => {
    const phase = roadmapData.phases[phaseIndex].tasks;
   
    
    let completedSteps = 0;
    
    phase.forEach((_, stepIndex) => {
      const key = `${phaseIndex}-${stepIndex}`;
      if (checkedSteps[key]) {
        completedSteps++;
      }
    });
    
    return Math.round((completedSteps / phase.length) * 100);
  };
  
  const handleStepClick = (taskTitle: string) => {
    // Encode the title for URL
   
    try {
      const encodedTitle = encodeURIComponent(taskTitle);
     
  navigate(`/checklist-item/${encodedTitle}`);
        
    } catch (error) {
      
    }

 
    
    
  };
  
  return (
    <Card className="glass-panel border-none shadow-lg animate-scale-in overflow-hidden max-w-full">
      <CardHeader className="border-b border-border px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Calendar className="h-5 w-5 text-primary" /> 
          Your Startup Roadmap
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          A customized timeline for your startup's journey, broken down into actionable phases
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="0" value={activePhase} onValueChange={setActivePhase} className="w-full">
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList className="w-full border-b rounded-none h-auto py-0 bg-transparent flex-nowrap justify-start sm:justify-center min-w-max">
            {roadmapData.phases.map((phase, index) => (
              <TabsTrigger 
                key={index} 
                value={index.toString()}
                className="flex-shrink-0 data-[state=active]:bg-secondary rounded-none border-r last:border-r-0 h-14"
              >
                <div className="flex flex-col items-center px-2 sm:px-4">
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{phase.name}</span>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {phase.duration}
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {roadmapData.phases.map((phase, phaseIndex) => (
          <TabsContent 
            key={phaseIndex} 
            value={phaseIndex.toString()}
            className="pt-4 sm:pt-6 px-3 sm:px-6 pb-6 sm:pb-8 animate-fade-in"
          >
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm sm:text-base">{phase.name}</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {getPhaseProgress(phaseIndex)}% Complete
                </span>
              </div>
              <Progress value={getPhaseProgress(phaseIndex)} className="h-2" />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {roadmapData.phases[phaseIndex].tasks.map((step, stepIndex) => {
                const key = `${phaseIndex}-${stepIndex}`;
                const isChecked = checkedSteps[key] || false;
                
                return (
                  <div 
                    key={stepIndex}
                    className={`flex items-start p-2 sm:p-3 rounded-lg transition-colors ${
                      isChecked ? 'bg-secondary/50' : 'hover:bg-secondary/30'
                    }`}
                  >
                    <Checkbox 
                      id={key}
                      checked={isChecked}
                      onCheckedChange={() => handleStepToggle(phaseIndex, stepIndex)}
                      className="mt-0.5"
                    />
                    <div className="flex flex-1 justify-between items-start ml-3">
                      <label 
                        htmlFor={key} 
                        className={`cursor-pointer text-xs sm:text-sm break-words ${
                          isChecked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {step.title}
                      </label>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 p-1 h-auto"
                        onClick={() => handleStepClick(step.title)}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </div>

                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default Roadmap;
