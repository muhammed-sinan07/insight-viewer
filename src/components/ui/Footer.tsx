import { Brain, Mail, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">NeuroScan AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Unified deep learning framework for neurological disease detection using MRI/fMRI scans.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/analyze" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Analyze Scan
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Research */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Research</h4>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Alzheimer's Detection</span>
              <span className="text-sm text-muted-foreground">Parkinson's Detection</span>
              <span className="text-sm text-muted-foreground">Brain Tumor Detection</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Research Team</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Krishnapriya</p>
              <p>John Augustin</p>
              <p>Shamil VK</p>
              <p>Muhammed Sinan</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 NeuroScan AI. For research and educational purposes only.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Not intended for clinical diagnosis
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
