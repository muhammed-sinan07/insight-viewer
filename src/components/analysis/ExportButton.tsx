import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonProps {
  disabled?: boolean;
}

export const ExportButton = ({ disabled }: ExportButtonProps) => {
  const handleExport = () => {
    // Mock export action
    toast.success("PDF Report Generated", {
      description: "Your analysis report has been prepared for download.",
      action: {
        label: "Download",
        onClick: () => {
          toast.info("This is a demo. No actual file was generated.");
        },
      },
    });
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled}
      className="gap-2"
      variant="outline"
    >
      <FileDown className="h-4 w-4" />
      Export PDF Report
    </Button>
  );
};
