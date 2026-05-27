import React from "react";
import { Card, CardContent } from "../ui/card";
import ReactMarkdown from "react-markdown";

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
  // Strip out the embedded examples from the seeded description text
  const cleanDescription = description.replace(/## Examples[\s\S]*?(?=## Constraints)/i, '');

  return (
    <div className="grid grid-cols-3 gap-2 h-full">
      <Card className="col-span-2 h-full overflow-hidden flex flex-col pt-4">
        <CardContent className="flex-1 min-h-0 overflow-y-auto">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-4 text-foreground hidden" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-md font-semibold mt-4 mb-2 text-foreground" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 text-sm text-muted-foreground" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              code: ({ node, inline, ...props }: any) => 
                inline ? (
                  <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-[13px] text-foreground" {...props} />
                ) : (
                  <code className="block bg-muted p-3 rounded-md font-mono text-[13px] text-foreground overflow-x-auto" {...props} />
                ),
              pre: ({ node, ...props }) => <pre className="mb-4" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
            }}
          >
            {cleanDescription}
          </ReactMarkdown>
        </CardContent>
      </Card>

      <Card className="overflow-hidden flex flex-col pt-4">
        <div className="px-6 pb-2">
          <h3 className="text-sm font-semibold text-foreground">Examples</h3>
        </div>
        <CardContent className="flex-1 min-h-0 overflow-y-auto space-y-4">
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
