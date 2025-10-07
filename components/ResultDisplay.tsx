
import React, { useState, useEffect } from 'react';
import { Agent } from '../types';
import { CopyIcon, CheckIcon } from './icons';

interface ResultDisplayProps {
  agent: Agent;
}

const JsonSyntaxHighlight: React.FC<{ json: object }> = ({ json }) => {
  const jsonString = JSON.stringify(json, null, 2);
  const highlighted = jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-green-300'; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-cyan-400'; // key
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-violet-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-slate-500'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );

  return (
    <pre
      className="bg-slate-900 text-sm p-4 rounded-b-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ agent }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if(copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(agent, null, 2));
        setCopied(true);
    };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-t-lg">
            <h3 className="text-lg font-semibold text-slate-200">Generated Agent</h3>
            <button
                onClick={handleCopy}
                className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-600 hover:bg-slate-500 text-slate-200 transition"
            >
                {copied ? (
                    <>
                        <CheckIcon className="w-4 h-4 mr-2 text-green-400" />
                        Copied!
                    </>
                ) : (
                    <>
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Copy JSON
                    </>
                )}
            </button>
        </div>
      <JsonSyntaxHighlight json={agent} />
    </div>
  );
};

export default ResultDisplay;
