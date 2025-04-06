import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, SendIcon, Sparkles, Loader2 } from 'lucide-react';
import { askMentorBot } from '@/lib/action';
import ReactMarkdown from 'react-markdown';

const AIMentor = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const sessionId = 'startup-mentor-123';

  useEffect(() => {
    let interval;
    if (loading) {
      const dots = ['.', '..', '...'];
      interval = setInterval(() => {
        setTypingIndex((prevIndex) => (prevIndex + 1) % dots.length);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = JSON.parse(localStorage.getItem("formData") || '{}');
    // console.log("formdata",formdata);
    
    if(!formdata){return;}
    if (!newQuestion.trim()) return;

    setLoading(true);
    setError('');
    
    // Add the user's question immediately
    const updatedQuestions = [
      ...questions, 
      { 
        question: newQuestion, 
        answer: null // Will be populated when the response comes back
      }
    ];
    setQuestions(updatedQuestions);
    const currentQuestion = newQuestion;
    setNewQuestion('');

    try {
      const response = await askMentorBot(sessionId, currentQuestion,formdata);

      if (response) {
        // Update the last question with the answer
        const finalQuestions = [...updatedQuestions];
        finalQuestions[finalQuestions.length - 1].answer = response.message;
        setQuestions(finalQuestions);
      } else {
        setError("An error occurred. Please try again.");
        // Remove the question if there was an error
        setQuestions(questions);
      }
    } catch (error) {
      setError("Failed to fetch response. Check your connection.");
      // Remove the question if there was an error
      setQuestions(questions);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-none shadow-lg animate-scale-in ">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" /> 
          AI Startup Mentor
        </CardTitle>
        <CardDescription>
          Get advice from our AI startup mentor based on data from thousands of successful founders
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6 mb-6">
          {questions.length > 0 ? (
            questions.map((qa, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                    {qa.question}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-sm min-h-10">
                    {qa.answer ? (
                      <ReactMarkdown>{qa.answer}</ReactMarkdown>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className={`h-2 w-2 rounded-full bg-primary/70 animate-bounce`} 
                               style={{ animationDelay: '0ms' }}></div>
                          <div className={`h-2 w-2 rounded-full bg-primary/70 animate-bounce`} 
                               style={{ animationDelay: '200ms' }}></div>
                          <div className={`h-2 w-2 rounded-full bg-primary/70 animate-bounce`} 
                               style={{ animationDelay: '400ms' }}></div>
                        </div>
                        <span className="text-xs text-primary/70">AI Mentor is thinking</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 my-12 justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                No questions yet. Ask a question to get started.
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {showForm ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <Textarea 
              placeholder="Type your startup question here..." 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
              disabled={loading}
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!newQuestion.trim() || loading}
                className="relative"
              >
                {loading ? 
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
                  <SendIcon className="h-4 w-4 mr-2" />
                }
                {loading ? "Sending..." : "Send Question"}
              </Button>
            </div>
          </form>
        ) : (
          <Button 
            onClick={() => setShowForm(true)} 
            className="w-full mt-6"
            disabled={loading}
          >
            Ask a Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIMentor;