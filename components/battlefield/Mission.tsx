import React from "react";
import { Card, CardContent } from "../ui/card";

type MissionProps = {
  description: string;
  examples: string;
};

const Mission = ({ description, examples }: MissionProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="col-span-2 overflow-hidden">
        <CardContent className="max-h-75 overflow-y-auto">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
      <Card className="overflowhidden">
        <CardContent className="max-h-75 overflow-y-auto">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {examples}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mission;
