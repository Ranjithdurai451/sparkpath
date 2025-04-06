
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, AlertCircle, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from "react";

const RiskIndicator = ({ score }: { score: number }) => {
  let textColor = 'text-green-500';
  let icon = <ArrowDownRight className="h-4 w-4 mr-1" />;
  let label = 'Low';
  let progressColor;
 
  if (score > 70) {
    textColor = 'text-red-500';
    progressColor = 'bg-red-500';
    icon = <ArrowUpRight className="h-4 w-4 mr-1" />;
    label = 'High';
  } else if (score > 40) {
    textColor = 'text-amber-500';
    progressColor = 'bg-amber-500';
    icon = <AlertCircle className="h-4 w-4 mr-1" />;
    label = 'Medium';
  } else {
    progressColor = 'bg-green-500';
  }
  
  return (
    <div className="flex items-center">
      <div className="flex-1 relative h-2 overflow-hidden rounded-full bg-secondary">
        <div 
          className={`absolute left-0 top-0 h-full ${progressColor} transition-all duration-500`} 
          style={{ width: `${score}%` }}
        />
      </div>
      <div className={`ml-3 flex items-center ${textColor} text-sm font-medium`}>
        {icon}
        {label}
      </div>
    </div>
  );
};

const FailurePrediction = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("failure-prediction");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
      
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }

  const { prediction, growthStrategy } = data;
  const { failure_rate, risk_factors, success_rate } = prediction;
  const { insights } = growthStrategy;

  const riskAreas = [
    { name: "Market Fit", score: insights.marketFit.percentage, details: insights.marketFit.suggestion },
    { name: "Cash Flow", score: insights.cashFlow.percentage, details: insights.cashFlow.suggestion },
    { name: "Team Composition", score: insights.teamComposition.percentage, details: insights.teamComposition.suggestion },
    { name: "Competition", score: insights.competition.percentage, details: insights.competition.suggestion },
    { name: "Scalability", score: insights.scalability.percentage, details: insights.scalability.suggestion }
  ];

  return (
    <Card className="glass-panel border-none shadow-lg animate-scale-in overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" /> 
          Failure Prediction Analysis
        </CardTitle>
        <CardDescription>
          AI-powered assessment of potential risks and challenges for your startup
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="bg-secondary/50 rounded-lg p-4 mb-6 hover:bg-secondary/70 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Overall Failure Score
            </h3>
            <span className="text-2xl font-bold">{failure_rate}</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
            <div 
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                parseFloat(failure_rate) > 70 ? 'bg-red-500' : parseFloat(failure_rate) > 40 ? 'bg-amber-500' : 'bg-green-500'
              }`} 
              style={{ width: failure_rate }}
            />
          </div>
          
          
        </div>

         {/* Success Rate */}
         <div className="bg-secondary/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Success Rate
            </h3>
            <span className="text-2xl font-bold">{success_rate}</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
            <div 
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                parseFloat(success_rate) > 70 ? 'bg-red-500' : parseFloat(success_rate) > 40 ? 'bg-amber-500' : 'bg-green-500'
              }`} 
              style={{ width: success_rate }}
            />
          </div>
        </div>

        {/* Risk Factors */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold">Risk Factors From Our RandomForest Model</h3>
          <ul className="list-disc px-5 pt-0 pb-5 space-y-2 text-sm text-muted-foreground">
            {risk_factors.map((factor: string, index: number) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          {riskAreas.map((area, index) => (
            <div key={index} className="animate-fade-in hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">{area.name}</h4>
                <span className="text-sm">{area.score}%</span>
              </div>
              <RiskIndicator score={area.score} />
              <p className="mt-2 text-sm text-muted-foreground">{area.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


export default FailurePrediction;
