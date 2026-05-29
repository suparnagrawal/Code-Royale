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
              h1: () => null, // Hidden as problem name is in Navbar
              h2: ({ node, ...props }) => {
                if (props.children?.toString() === "Constraints") {
                  return <h2 className="text-lg font-bold text-primary mt-6 mb-3" {...props} />;
                }
                return <p className="mb-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-normal" {...props} />;
              },
              h3: ({ node, ...props }) => <p className="mb-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-normal" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-normal" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-none mb-4 text-sm text-muted-foreground font-normal" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1 font-normal" {...props} />,
              code: ({ node, inline, ref, ...props }: any) => 
                inline ? (
                  <span className="font-normal text-muted-foreground" {...props} />
                ) : (
                  <div className="block mb-4 text-sm text-muted-foreground whitespace-pre-wrap font-normal" {...props} />
                ),
              pre: ({ node, ref, ...props }: any) => <div className="mb-4 text-sm text-muted-foreground font-normal" {...props} />,
              strong: ({ node, ...props }) => {
                 if (props.children?.toString() === "Constraints") {
                    return <strong className="font-bold text-primary" {...props} />;
                 }
                 return <span className="font-normal" {...props} />;
              },
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
