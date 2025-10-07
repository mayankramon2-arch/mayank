
import React, { useState } from 'react';
import { Status } from '../types';

interface IdeaInputFormProps {
  onSubmit: (idea: string) => void;
  status: Status;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ onSubmit, status }) => {
  const [idea, setIdea] = useState('');
  const isLoading = status !== Status.IDLE && status !== Status.SUCCESS && status !== Status.ERROR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg">
        <label htmlFor="agent-idea" className="block text-lg font-medium text-slate-300 mb-2">
          Enter your Agent idea
        </label>
        <textarea
          id="agent-idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., 'An AI agent that helps users write creative and funny poems.'"
          className="w-full h-32 p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="mt-4 w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Agent'
          )}
        </button>
      </div>
    </form>
  );
};

export default IdeaInputForm;
