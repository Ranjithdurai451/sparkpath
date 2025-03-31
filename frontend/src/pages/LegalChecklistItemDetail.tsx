
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Clock, DollarSign, FileText, ListChecks, BookOpen, Link2, FileQuestion } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { generateLegalChecklistDetails } from '@/lib/action';
import PageLoader from '@/components/PageLoader';
import ReactMarkdown from 'react-markdown';
import { LegalDetailDataType } from '@/lib/types';



const LegalChecklistItemDetail = () => {
  const { itemTitle } = useParams<{ itemTitle: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('what');
  const [item, setItem] = useState<LegalDetailDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || '{}');
    if (!formData || !itemTitle) {
      navigate("/roadmap-result");
      return;
    }
    const fetchData = async () => {
      try {
       if(!localStorage.getItem(`${itemTitle}-explaination`)){
        console.log("Fetching new data...");
        const result = await generateLegalChecklistDetails({ formData, taskTitle: itemTitle });
        console.log(result);
        
        if (result) {
          console.log("working")
          setItem(result);
        }
       }
  
       else {
         setItem(JSON.parse(localStorage.getItem(`${itemTitle}-explaination`) || '{}'));
       }
       
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
      finally{
        setLoading(false);
      }
    };
  
    fetchData();
  
  }, [itemTitle, navigate]);
  


useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  }, 300);

  return () => clearInterval(interval);
}, []);



if (loading) return <PageLoader loading={loading} progress={progress} />;
  const handleBack = () => {
    navigate(-1);
  };

 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6" 
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Checklist
          </Button>
          
          <Card className="glass-panel border-none shadow-lg animate-fade-in">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md sm:text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {item?.title}
                </CardTitle>
              </div>
              <CardDescription className="mt-2">
                Comprehensive guidance for legal compliance
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="what" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto scrollbar-hide pb-2 px-4 sm:px-6 pt-4">
                <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 h-auto p-1 mb-4 sm:mb-6">
                  <TabsTrigger value="what" className="py-2">
                    <BookOpen className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">What</span>
                  </TabsTrigger>
                  <TabsTrigger value="why" className="py-2">
                    <ListChecks className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Why</span>
                  </TabsTrigger>
                  <TabsTrigger value="how" className="py-2">
                    <FileQuestion className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">How</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="py-2">
                    <Clock className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Timeline</span>
                  </TabsTrigger>
                  <TabsTrigger value="cost" className="py-2">
                    <DollarSign className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Cost</span>
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="py-2">
                    <Link2 className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Resources</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="px-6 pb-6 flex justify-center">
                <TabsContent value="what" className="animate-fade-in mt-0">
                  <div className="prose dark:prose-invert max-w-none flex justify-center">
                    <p className="text-base leading-relaxed w-[80%] text-justify p-5">{item?.what}</p>
                 
                  </div>
                </TabsContent>
                
                <TabsContent value="why" className="animate-fade-in mt-0">
                  <div className="prose dark:prose-invert max-w-none flex justify-center">
                    <div className='text-base leading-relaxed w-[80%] text-justify p-5'>
                    <ReactMarkdown>{item?.why}</ReactMarkdown>

                    </div>

                  </div>
                </TabsContent>
                
                <TabsContent value="how" className="animate-fade-in mt-0">
                  <ScrollArea className="h-[300px] pr-4">
                    <ol className="space-y-4 list-none list-inside flex flex-col items-center">
                    {item?.how?.length ? (
                        item.how.map((step, index) => (
                          <li key={index} className="text-base w-[80%] text-justify px-5">
                            <ReactMarkdown>
                            {step}
                            </ReactMarkdown>
                           
                          </li>
                        ))
                      ) : (
                        <p>Loading data...</p>
                      )}
                    </ol>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="timeline" className="animate-fade-in mt-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 px-40">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Estimated Timeline</h3>
                  </div>
                  <p className="text-base leading-relaxed text-justify px-40">{item?.timeline}</p>
                </TabsContent>
                
                <TabsContent value="cost" className="animate-fade-in mt-0">
                  <div className="flex items-center gap-2 mb-3 px-40">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Estimated Cost</h3>
                  </div>
             <div className='px-40 text-justify'>

                  <ReactMarkdown>{item?.cost}</ReactMarkdown>
             </div>
      
                </TabsContent>
                
                <TabsContent value="resources" className="animate-fade-in mt-0">
                  <div className="space-y-6 px-40">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Helpful Resources</h3>
                      {item?.resources?.length > 0 ? (
                        <ul className="space-y-2">
                          {item?.resources?.map((resource, index) => (
                            <li key={index}>
                              <a 
                                href={resource?.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                <Link2 className="h-4 w-4" />
                                {resource?.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No resources available yet.</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Required Documents</h3>
                      {item?.documents?.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {item?.documents?.map((doc, index) => (
                            <Badge key={index} variant="outline" className="flex items-center justify-between w-fit p-3">
                              <div className='flex p-5 gap-1'>
                              <ReactMarkdown>{doc}</ReactMarkdown>

                              </div>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No document requirements specified yet.</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      
    </div>
  );
};

export default LegalChecklistItemDetail;
