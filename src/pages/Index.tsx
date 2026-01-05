import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Disclaimer } from "@/components/ui/Disclaimer";
import {
  Brain,
  ArrowRight,
  Scan,
  Shield,
  Sparkles,
  Activity,
  ChevronRight,
  Upload,
} from "lucide-react";
import heroBrain from "@/assets/hero-brain.png";

const features = [
  {
    icon: Scan,
    title: "Multi-Modal Analysis",
    description:
      "Support for MRI and fMRI scans in DICOM and NIfTI formats for comprehensive brain analysis.",
  },
  {
    icon: Brain,
    title: "Unified Detection",
    description:
      "Simultaneously detect Alzheimer's, Parkinson's, and Brain Tumors with a single scan upload.",
  },
  {
    icon: Sparkles,
    title: "Grad-CAM Visualization",
    description:
      "Interpretable AI with heatmap overlays highlighting regions of interest for clinical transparency.",
  },
  {
    icon: Activity,
    title: "High Accuracy",
    description:
      "Hybrid CNN architecture achieving 90%+ detection accuracy across all conditions.",
  },
];

const diseases = [
  {
    name: "Alzheimer's Disease",
    description: "Early detection of neurodegenerative patterns",
    accuracy: "92%",
  },
  {
    name: "Parkinson's Disease",
    description: "Dopaminergic pathway analysis",
    accuracy: "89%",
  },
  {
    name: "Brain Tumors",
    description: "Mass detection and localization",
    accuracy: "94%",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Research Demo
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    Neurological Disease Detection with{" "}
                    <span className="text-primary">Deep Learning</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    A unified framework for early detection of Alzheimer's,
                    Parkinson's, and Brain Tumors using advanced MRI/fMRI analysis
                    with Grad-CAM interpretability.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="gap-2">
                    <Link to="/analyze">
                      <Upload className="h-4 w-4" />
                      Start Analysis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>

                <Disclaimer />
              </div>

              <div className="relative lg:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-3xl blur-3xl opacity-50" />
                <img
                  src={heroBrain}
                  alt="Neural network visualization of brain analysis"
                  className="relative z-10 w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Diseases Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Conditions We Detect
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our hybrid CNN architecture is trained to identify multiple
                neurological conditions with high accuracy and clinical interpretability.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {diseases.map((disease) => (
                <Card
                  key={disease.name}
                  className="p-6 bg-card hover:shadow-lg transition-shadow group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Brain className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">{disease.accuracy} Accuracy</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {disease.name}
                    </h3>
                    <p className="text-muted-foreground">{disease.description}</p>
                    <Link
                      to="/analyze"
                      className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      Analyze Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Advanced Capabilities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with state-of-the-art deep learning techniques including
                EfficientNet-B4, 3D CNNs, and Xception modules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6 bg-card">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <Card className="p-8 md:p-12 bg-card text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Ready to Analyze Your MRI Scan?
                </h2>
                <p className="text-muted-foreground">
                  Upload your DICOM or NIfTI file and get instant analysis with
                  detailed visualizations and interpretable results.
                </p>
                <Button size="lg" asChild className="gap-2">
                  <Link to="/analyze">
                    <Scan className="h-4 w-4" />
                    Start Free Analysis
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  For research and educational purposes only
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
