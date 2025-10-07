
import React, { useState, useCallback } from 'react';
import { Status, Agent } from './types';
import { createAgent } from './services/geminiService';
import Header from './components/Header';
import IdeaInputForm from './components/IdeaInputForm';
import StatusTracker from './components/StatusTracker';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [result, setResult] = useState<Agent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runWithFakeDelay = async <T,>(
    fn: () => Promise<T>,
    delay: number,
    statusUpdate: Status
  ): Promise<T> => {
    setStatus(statusUpdate);
    const [res] = await Promise.all([fn(), new Promise(resolve => setTimeout(resolve, delay))]);
    return res;
  };

  const handleGenerateAgent = useCallback(async (idea: string) => {
    setResult(null);
    setError(null);
    
    try {
        await runWithFakeDelay(async () => {}, 1000, Status.RESEARCHING);
        await runWithFakeDelay(async () => {}, 1200, Status.DEFINING);

        const agentResult = await runWithFakeDelay(
            () => createAgent(idea),
            1500,
            Status.GENERATING
        );
        
        setResult(agentResult);
        setStatus(Status.SUCCESS);

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
        setError(errorMessage);
        setStatus(Status.ERROR);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <main className="mt-8">
          <IdeaInputForm onSubmit={handleGenerateAgent} status={status} />
          <StatusTracker status={status} error={error} />
          {status === Status.SUCCESS && result && <ResultDisplay agent={result} />}
        </main>
        <footer className="text-center text-slate-500 text-sm mt-12 pb-4">
            <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
