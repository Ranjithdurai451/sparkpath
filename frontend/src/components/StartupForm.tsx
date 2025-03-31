import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building,Lightbulb, Globe, MapPin } from 'lucide-react';
import { useFormContext } from '@/context/FormContext';
import { industries, budgetRanges, teamSizes, marketSizes, regionsByCountry, countries } from '@/lib/mockData';
import { generateFailurePrediction, generateLegalChecklist, generateRoadmap, generateSWOTAnalysis } from '@/lib/action';


const StartupForm = () => {
  const { formData, updateFormData, isFormComplete } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basics');
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    // console.log(formData);
    localStorage.clear();
    setLoading(true);
    console.log("frontend",formData);
    
    e.preventDefault();
    try {
     localStorage.setItem("formData", JSON.stringify(formData));
    const response= await generateRoadmap(formData);
    const swotanalysis=await generateSWOTAnalysis(formData);
    const fetchLegalChecklist=await generateLegalChecklist(formData);
    const failurePrediction=await generateFailurePrediction(formData);
    
   
    
   
    if (response) {
      navigate("/roadmap-result"); // ✅ Navigate with data
    }
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNext = () => {
    if (activeTab === 'basics') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('strategy');
  
  };
  
  const handleBack = () => {
    if (activeTab === 'strategy') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('basics');
  };

  const getRegionsForCountry = (countryCode: string) => {
    return regionsByCountry[countryCode] || [];
  };
  // useEffect(() => {
  //   console.log('Updated formData:', formData);
  // }, [formData]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="glass-panel border-none shadow-lg animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">Your Startup Profile</CardTitle>
          <CardDescription>
            Tell us about your startup to generate a personalized roadmap and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="basics" className="flex-1">
                  <Building className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Startup Basics</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Product Details</span>
                </TabsTrigger>
             
              </TabsList>
              
              <TabsContent value="basics" className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => updateFormData('industry', value)}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select 
                      value={formData.budget} 
                      onValueChange={(value) => updateFormData('budget', value)}
                    >
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select 
                      value={formData.teamSize} 
                      onValueChange={(value) => updateFormData('teamSize', value)}
                    >
                      <SelectTrigger id="teamSize">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marketSize">Target Market Size</Label>
                    <Select 
                      value={formData.marketSize} 
                      onValueChange={(value) => updateFormData('marketSize', value)}
                    >
                      <SelectTrigger id="marketSize">
                        <SelectValue placeholder="Select market size" />
                      </SelectTrigger>
                      <SelectContent>
                        {marketSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center">
                      <Globe className="mr-1 h-4 w-4" />
                      Country
                    </Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => {
                        updateFormData('country', value);
                        // Reset region when country changes
                        updateFormData('region', '');
                      }}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region" className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      Region
                    </Label>
                    <Select 
                      value={formData.region} 
                      onValueChange={(value) => updateFormData('region', value)}
                      disabled={!formData.country}
                    >
                      <SelectTrigger id="region">
                        <SelectValue placeholder={formData.country ? "Select region" : "Select country first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {getRegionsForCountry(formData.country).map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="button" onClick={handleNext} className="w-24">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="problemStatement">Problem Statement</Label>
                  <Textarea 
                    id="problemStatement" 
                    placeholder="What problem does your startup solve?" 
                    className="resize-none" 
                    rows={3}
                    value={formData.problemStatement}
                    onChange={(e) => updateFormData('problemStatement', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetCustomer">Target Customer</Label>
                  <Textarea 
                    id="targetCustomer" 
                    placeholder="Describe your ideal customer persona" 
                    className="resize-none" 
                    rows={3}
                    value={formData.targetCustomer}
                    onChange={(e) => updateFormData('targetCustomer', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="uniqueValueProposition">Unique Value Proposition</Label>
                  <Textarea 
                    id="uniqueValueProposition" 
                    placeholder="What makes your solution unique?" 
                    className="resize-none" 
                    rows={3}
                    value={formData.uniqueValueProposition}
                    onChange={(e) => updateFormData('uniqueValueProposition', e.target.value)}
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack} className="w-24">
                    Back
                  </Button>
                  <Button type="submit" className="px-8" disabled={loading} >
                  {loading ? "Generating..." : "Generate Roadmap"}<ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
            
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupForm;
