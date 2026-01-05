import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { diseaseOptions, DiseaseType } from "@/data/mockData";
import { Brain, Activity, CircleDot } from "lucide-react";

interface DiseaseSelectorProps {
  value: DiseaseType | null;
  onChange: (value: DiseaseType) => void;
}

const iconMap = {
  alzheimers: Brain,
  parkinsons: Activity,
  brainTumor: CircleDot,
};

export const DiseaseSelector = ({ value, onChange }: DiseaseSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="disease-select" className="text-sm font-medium">
        Select Condition to Analyze
      </Label>
      <Select value={value || undefined} onValueChange={(val) => onChange(val as DiseaseType)}>
        <SelectTrigger id="disease-select" className="w-full bg-card">
          <SelectValue placeholder="Choose a neurological condition..." />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {diseaseOptions.map((option) => {
            const Icon = iconMap[option.value];
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
