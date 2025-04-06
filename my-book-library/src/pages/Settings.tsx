
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { setOpenAIKey, hasOpenAIKey } from '@/services/openaiService';
import { ArrowLeft, Key, Sparkles, BookOpen, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [keyExists, setKeyExists] = useState(false);

  useEffect(() => {
    // Check if the API key already exists
    setKeyExists(hasOpenAIKey());
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    // Set the API key
    setOpenAIKey(apiKey.trim());
    setKeyExists(true);
    setApiKey(''); // Clear the input field

    toast({
      title: "Success",
      description: "Your OpenAI API key has been saved",
    });
  };

  const handleRemoveApiKey = () => {
    // Remove the API key
    localStorage.removeItem('openai_api_key');
    setKeyExists(false);

    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed",
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-serif font-bold mb-8">Settings</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2 text-book-accent" />
            OpenAI API Key
          </CardTitle>
          <CardDescription>
            Add your OpenAI API key to enable AI-powered book summaries and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {keyExists ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your API key is currently set. For security reasons, we don't display the key.
              </p>
              <Button variant="outline" onClick={handleRemoveApiKey}>
                Remove API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your OpenAI API key to enable AI features. Your key is stored locally in your browser.
              </p>
              <div className="flex gap-2">
                <Input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey}>Save Key</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Don't have an API key? You can get one from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-book-accent hover:text-book-accent/80">OpenAI website</a>.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About AI Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <p>
              With a valid OpenAI API key, you'll unlock these features:
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <BookOpen className="h-6 w-6 text-book-accent" />
                <span>Enhanced book summaries generated using AI</span>
              </div>
              <div className="flex items-center space-x-4">
                <Wand2 className="h-6 w-6 text-book-accent" />
                <span>Personalized book recommendations based on your searches</span>
              </div>
              <div className="flex items-center space-x-4">
                <Sparkles className="h-6 w-6 text-book-accent" />
                <span>More accurate and relevant search results</span>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Your API key is stored only in your browser's local storage and is never sent to our servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
