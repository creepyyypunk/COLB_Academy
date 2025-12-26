'use client';

import { useState } from 'react';
import { SchemeBuilderQuestion as SBQType, SchemeConnection } from '@/types/quiz.types';
import { cn } from '@/lib/utils';
import { ArrowRight, Trash2 } from 'lucide-react';

interface SchemeBuilderQuestionProps {
  question: SBQType;
  onAnswer: (answer: SchemeConnection[]) => void;
  initialAnswer?: SchemeConnection[];
}

export function SchemeBuilderQuestion({
  question,
  onAnswer,
  initialAnswer,
}: SchemeBuilderQuestionProps) {
  const [connections, setConnections] = useState<SchemeConnection[]>(initialAnswer ?? []);
  const [selectedFrom, setSelectedFrom] = useState<string | null>(null);

  const handleComponentClick = (componentId: string) => {
    if (!selectedFrom) {
      setSelectedFrom(componentId);
    } else {
      if (selectedFrom !== componentId) {
        const newConnection: SchemeConnection = {
          from: selectedFrom,
          to: componentId,
        };
        const updated = [...connections, newConnection];
        setConnections(updated);
        onAnswer(updated);
      }
      setSelectedFrom(null);
    }
  };

  const removeConnection = (index: number) => {
    const updated = connections.filter((_, i) => i !== index);
    setConnections(updated);
    onAnswer(updated);
  };

  const getComponentStyle = (type: string) => {
    switch (type) {
      case 'circle':
        return 'rounded-full';
      case 'diamond':
        return 'rotate-45';
      default:
        return 'rounded-colb';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <p className="text-sm text-muted-foreground">
        Click two components to create a connection between them
      </p>

      <div className="rounded-lg border border-border bg-muted p-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {question.components.map((component) => {
            const isSelected = selectedFrom === component.id;
            const hasConnectionFrom = connections.some((c) => c.from === component.id);
            const hasConnectionTo = connections.some((c) => c.to === component.id);

            return (
              <button
                key={component.id}
                onClick={() => handleComponentClick(component.id)}
                className={cn(
                  'relative p-6 border-2 transition-all hover:scale-105',
                  getComponentStyle(component.type),
                  isSelected && 'border-accent bg-accent-light scale-105',
                  !isSelected && (hasConnectionFrom || hasConnectionTo) && 'border-green-500 bg-green-50',
                  !isSelected && !hasConnectionFrom && !hasConnectionTo && 'border-border bg-secondary hover:border-accent/50'
                )}
              >
                <span
                  className={cn(
                    'block text-sm font-medium',
                    component.type === 'diamond' && '-rotate-45'
                  )}
                >
                  {component.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Your Connections:</h3>
        {connections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No connections yet. Click two components to create a connection.
          </p>
        ) : (
          <div className="space-y-2">
            {connections.map((conn, index) => {
              const fromComp = question.components.find((c) => c.id === conn.from);
              const toComp = question.components.find((c) => c.id === conn.to);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-colb bg-accent-light p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{fromComp?.label}</span>
                    <ArrowRight className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{toComp?.label}</span>
                  </div>
                  <button
                    onClick={() => removeConnection(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Remove connection"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Points: {question.points} | Connections: {connections.length}
      </p>
    </div>
  );
}
