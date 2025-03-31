import {  FormData, RoadmapItem } from './types';


const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL; // Replace with your actual API base URL
// const API_BASE_URL = "http://localhost:4000/api"; // local url for frontend


export async function generateRoadmap(formData: FormData) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-roadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
      window.localStorage.setItem("roadmap", JSON.stringify(data.roadmap));
      return data; 
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  }
  

  export async function generateRoadmapExplaination(itemData:RoadmapItem) {
    try {

     
      
      const response = await fetch(`${API_BASE_URL}/task-guidance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
      
      return data; 
    } catch (error) {
      console.error("Error fetching topic details:", error);
    }
  }


  export async function generateFailurePrediction(itemData:FormData) {
    try {

      
      const response = await fetch(`${API_BASE_URL}/failure-prediction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Parse JSON response
      console.log("failure prediction:", data); // ✅ Now this will log correctly
      window.localStorage.setItem("failure-prediction", JSON.stringify(data));
      return data; // ✅ Return data for further use
    } catch (error) {
      console.error("Error fetching failure:", error);
    }
  }

  export async function generateSWOTAnalysis(formData:FormData){
    try {

      const requestData = {
        startupData: formData
      };
      const response = await fetch(`${API_BASE_URL}/swot-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Parse JSON response
      localStorage.setItem("swot", JSON.stringify(data));
      return data; // ✅ Return data for further use
    } catch (error) {
      console.error("Error fetching swot analysis:", error);
    }
  }

  export async function generateLegalChecklist(formData:FormData){
    try {

    
      const response = await fetch(`${API_BASE_URL}/checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Parse JSON response
      localStorage.setItem("legal-checklist", JSON.stringify(data));
      return data; // ✅ Return data for further use
    } catch (error) {
      console.error("Error fetching legal checklist:", error);
    }
  }

  export async function generateLegalChecklistDetails(formData:RoadmapItem){
    try {

      
   
      
      const response = await fetch(`${API_BASE_URL}/checklist/${formData.taskTitle}/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Parse JSON response
     
 
      window.localStorage.setItem(`${formData.taskTitle}-explaination`, JSON.stringify(data));
      return data; // ✅ Return data for further use
    } catch (error) {
      console.error("Error fetching legal checklist:", error);
    }
  }

  export async function generateSuggestedQuestion(){
    try {

     
    
      const response = await fetch(`${API_BASE_URL}/mentor/suggested-questions`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Parse JSON response
    
      return data; // ✅ Return data for further use
    } catch (error) {
      console.error("Error fetching suggested questions:", error);
    }
  }

  export async function askMentorBot(sessionId: string, newQuestion: string,formData:FormData) {
    try {
      const response = await fetch(`${API_BASE_URL}/mentor/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: newQuestion ,formData}),
      });
      const data=await response.json();
      return data;
    } catch (error) {
      console.error("Failed to connect to API:", error);
    }
  }
  