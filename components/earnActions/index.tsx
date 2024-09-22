import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useActions } from '@/hooks/useActions';
import { Loader2, ExternalLink, Rocket } from "lucide-react";

const EarnActions = () => {
  const { earnActions, loading, error } = useActions();

  if (loading) {
    return <div className="flex justify-center items-center h-40">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>;
  }

  if (error) {
    return <div className="text-red-400">Error loading earn actions: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      {earnActions.map((action, index) => (
        <Card key={index} className="bg-gray-900 border-gray-700 aspect-square">
          <CardContent className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-start">
              <Rocket className="text-blue-400 h-6 w-6" />
              <span className="bg-blue-900 text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {action.multiplier}x points
              </span>
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-sm text-gray-300">{action.description}</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 mt-4"
              onClick={() => console.log(`Perform action: ${action.title}`)}
            >
              {`${action.category === 'swap' ? 'Swap' : action.category === 'holding' ? 'Hold' : 'Execute'} ${action.title.split(' ').pop()}`}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EarnActions;