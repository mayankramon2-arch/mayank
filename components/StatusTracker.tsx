
import React from 'react';
import { Status } from '../types';
import { ResearchIcon, DefineIcon, GenerateIcon, SuccessIcon, ErrorIcon } from './icons';

interface StatusTrackerProps {
  status: Status;
  error?: string | null;
}

const StatusStep: React.FC<{
  icon: React.ReactNode;
  label: string;
  isCurrent: boolean;
  isCompleted: boolean;
}> = ({ icon, label, isCurrent, isCompleted }) => {
  const baseClasses = "flex items-center p-2 rounded-lg transition-all duration-300";
  const stateClasses = isCompleted 
    ? "bg-green-500/20 text-green-300" 
    : isCurrent 
    ? "bg-cyan-500/20 text-cyan-300"
    : "bg-slate-700/50 text-slate-400";
  
  return (
    <div className={`${baseClasses} ${stateClasses}`}>
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </div>
  );
};


const StatusTracker: React.FC<StatusTrackerProps> = ({ status, error }) => {
  if (status === Status.IDLE) return null;

  const steps = [
    { id: Status.RESEARCHING, label: 'Researching' },
    { id: Status.DEFINING, label: 'Defining Role' },
    { id: Status.GENERATING, label: 'Generating Prompt' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
      {status !== Status.ERROR && status !== Status.SUCCESS && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <StatusStep
              key={step.id}
              icon={
                index === 0 ? <ResearchIcon className="w-5 h-5" /> : 
                index === 1 ? <DefineIcon className="w-5 h-5" /> : 
                <GenerateIcon className="w-5 h-5" />
              }
              label={step.label}
              isCurrent={currentStepIndex === index}
              // FIX: Removed unreachable `status === Status.SUCCESS` check.
              isCompleted={currentStepIndex > index}
            />
          ))}
        </div>
      )}
      {status === Status.SUCCESS && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <StatusStep
              key={step.id}
              icon={
                index === 0 ? <ResearchIcon className="w-5 h-5" /> :
                index === 1 ? <DefineIcon className="w-5 h-5" /> :
                <GenerateIcon className="w-5 h-5" />
              }
              label={step.label}
              isCurrent={false}
              isCompleted={true}
            />
          ))}
          <div className="flex items-center p-3 rounded-lg bg-green-500/20 text-green-300 !mt-4">
            <SuccessIcon className="w-6 h-6" />
            <span className="ml-3 font-bold text-lg">Agent Generation Complete!</span>
          </div>
        </div>
      )}
      {status === Status.ERROR && (
         <div className="flex flex-col p-3 rounded-lg bg-red-500/20 text-red-300">
            <div className="flex items-center">
                <ErrorIcon className="w-6 h-6" />
                <span className="ml-3 font-bold text-lg">An Error Occurred</span>
            </div>
            <p className="mt-2 text-red-400 ml-9">{error}</p>
        </div>
      )}
    </div>
  );
};

export default StatusTracker;
