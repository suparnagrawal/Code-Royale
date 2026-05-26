import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type TestCase = {
  input: string;
  expectedOutput: string;
  isExample: boolean;
};

type MissionProps = {
  title: string;
  description: string;
  examples: TestCase[];
};

const Mission = ({ title, description, examples }: MissionProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="col-span-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="max-h-75 overflow-y-auto">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm">Examples</CardTitle>
        </CardHeader>
        <CardContent className="max-h-75 overflow-y-auto space-y-4">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-md border bg-muted/50 p-3 space-y-2"
            >
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  Input:
                </span>
                <pre className="text-sm mt-1 whitespace-pre-wrap font-mono">
                  {ex.input}
                </pre>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  Expected Output:
                </span>
                <pre className="text-sm mt-1 whitespace-pre-wrap font-mono">
                  {ex.expectedOutput}
                </pre>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Mission;
