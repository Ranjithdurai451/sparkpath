
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, ChevronUp, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';

import { generateRoadmapExplaination } from '@/lib/action';

import PageLoader from '@/components/PageLoader';


const ChecklistItemDetail = () => {
  const { itemTitle } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState<any>(null);
  const [loading,isLoading]=useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


useEffect(() => {
  const formData = JSON.parse(localStorage.getItem("formData") || '{}');
  if (!formData || !itemTitle) navigate("/roadmap-result");

  const fetchData = async () => {
    try {
      if (!localStorage.getItem(`${itemTitle}-explaination`)) {
        console.log("Ready to fetch");
        const result = await generateRoadmapExplaination({ formData, taskTitle: itemTitle });

        if (result?.data) {
          setItemData(result.data);
          localStorage.setItem(`${itemTitle}-explaination`, JSON.stringify(result.data));
        }
      } else {
        setItemData(JSON.parse(localStorage.getItem(`${itemTitle}-explaination`) || '{}'));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading(false); // ✅ Stop loading after fetching data
    }
  };

  fetchData();
}, [itemTitle, navigate]);

// ✅ Simulate progress increase
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  }, 300);

  return () => clearInterval(interval);
}, []);

if (loading) return <PageLoader loading={loading} progress={progress} />;
  return (
    <div className="min-h-screen flex flex-col text-justify">
      <Navbar />
      
      <main className="flex-1 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Roadmap
          </Button>
          
          {itemData ? (
            <Card className="glass-panel border-none shadow-lg animate-scale-in max-w-4xl mx-auto">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                     <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{itemData?.explaination?.taskTitle}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
               
                    <h3 className="text-xl font-semibold mb-4">Why This Matters</h3>
                   <p className="mb-4">{itemData?.explaination?.whyThisMatters}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">How To Do It Right</h3>
                                  <div className="space-y-3 mb-4">
                    {itemData?.explaination?.howToDoItRight.map((item, index) => (
                      <div key={index} className="cursor-pointer p-4 border border-secondary rounded-sm" onClick={() => toggleAccordion(index)}>
                        <div className="flex items-center justify-between font-semibold">
                          <span>{item.step}</span>
                          {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        <div
                          className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <div className="mt-2 text-white">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
      
                  <h3 className="text-xl font-semibold mb-4">Common Pitfalls</h3>
                            <ul className="list-decimal cursor-default pl-6 space-y-2 mb-4">
                            {itemData?.explaination?.commonPitfalls.map((item,index)=>{
                                return <li className='pl-2' key={index}>{item}</li>
                             
                              })}
                            </ul>
                    
                    <h3 className="text-xl font-semibold mb-4">Resources</h3>
                    <div className="space-y-2 mt-4">
        {itemData?.explaination?.resources.map((item, index) => (
          <div key={index} className="flex pl-2 gap-2 items-center justify-between">
            <p className="font-medium">{item.title} </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black bg-primary px-2 py-1 rounded hover:scale-95 transition-all duration-300"
            >
              Link
            </a>
          </div>
        ))}
      </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Item information not found</h2>
              <p className="text-muted-foreground">The requested item explanation is not available.</p>
            </div>
          )}
        </div>
      </main>
      
  
    </div>
  );
};

export default ChecklistItemDetail;
