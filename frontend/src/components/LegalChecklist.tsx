
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {  FileText, HelpCircle, ChevronRight } from 'lucide-react';
import { generateLegalChecklist } from '@/lib/action';

const LegalChecklist = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<any[]>([]);
  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;
  const handleToggle = (index: number) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index] = {
      ...updatedChecklist[index],
      completed: !updatedChecklist[index].completed
    };
    setChecklist(updatedChecklist);
  };
  
  const handleItemClick = (title: string) => {
    // Encode the title for URL
    navigate(`/legal-checklist-item/${title}`);
    
  };
  
  
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || '{}');
    if (!formData || Object.keys(formData).length === 0) {
        navigate("/roadmap-result");
        return;
    }
  
    let checklistDataFromStorage = JSON.parse(localStorage.getItem("legal-checklist") || '[]');
 

    if (!Array.isArray(checklistDataFromStorage)) {
        checklistDataFromStorage = []; // Ensure it's an array
    }
    
    if (checklistDataFromStorage.length > 0) {
        setChecklist(checklistDataFromStorage);
    }
  
    const fetchData = async () => {
        try {
            if (!localStorage.getItem("swot")) {
                console.log("Fetching SWOT data...");
                const result = await generateLegalChecklist(formData);
                if (result?.data) {
                    localStorage.setItem("swot", JSON.stringify(result.data));
                    setChecklist(result.data);
                }
            }
        } catch (error) {
            console.error("Error fetching SWOT data:", error);
        }
    };
  
    fetchData();
  }, [navigate]);
  


  
  return (
    <Card className="glass-panel border-none shadow-lg animate-scale-in overflow-hidden">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> 
          Legal & Compliance Checklist
        </CardTitle>
        <CardDescription>
          Essential legal and regulatory requirements for your startup
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Compliance Progress</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {checklist.length} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {checklist.length>0 ? (
            checklist?.map((item, index) => (
              <div 
                key={index}
                className={`flex items-start p-4 rounded-lg transition-colors ${
                  item.completed ? 'bg-secondary/50' : 'hover:bg-secondary/30'
                }`}
              >
                <Checkbox 
                  id={`legal-${index}`}
                  checked={item.completed}
                  onCheckedChange={() => handleToggle(index)}
                  className="mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label 
                        htmlFor={`legal-${index}`} 
                        className={`cursor-pointer font-medium truncate w-[90%] ${
                          item.completed ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.title}
                      </label>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="ml-2 text-muted-foreground hover:text-foreground">
                              <HelpCircle className="h-4 w-4" />
                            </button>
                        
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p>{item.details}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2 p-1 h-auto"
                      onClick={() => handleItemClick(item.title)}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </div>
                
             
              </div>
            ))
          ): (
            <p className="text-muted-foreground">
              No legal requirements found for this startup. Please check back later.
            </p>
          )}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalChecklist;
