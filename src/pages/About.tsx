import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Layers,
  Users,
  Target,
  BookOpen,
  Cpu,
  FlaskConical,
} from "lucide-react";

const teamMembers = [
  { name: "Krishnapriya", role: "Research Lead" },
  { name: "John Augustin", role: "ML Engineer" },
  { name: "Shamil VK", role: "Data Scientist" },
  { name: "Muhammed Sinan", role: "Software Developer" },
];

const techStack = [
  { name: "EfficientNet-B4", description: "Feature extraction backbone" },
  { name: "3D CNN", description: "Volumetric analysis for MRI sequences" },
  { name: "Xception", description: "Depth-wise separable convolutions" },
  { name: "Transfer Learning", description: "Pre-trained on ImageNet" },
  { name: "Grad-CAM", description: "Visual explanations for model predictions" },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <FlaskConical className="h-3 w-3 mr-1" />
              Research Project
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About NeuroScan AI
            </h1>
            <p className="text-lg text-muted-foreground">
              A unified deep learning framework for early detection of
              neurological disorders using MRI and fMRI imaging.
            </p>
          </div>

          {/* Abstract */}
          <Card className="p-8 bg-card mb-12">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Abstract
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Early detection of neurological disorders such as Alzheimer's
                  Disease (AD), Parkinson's Disease (PD), and Brain Tumors is
                  crucial for timely treatment and improved patient outcomes.
                  This project proposes a unified deep learning-based diagnostic
                  system that leverages Magnetic Resonance Imaging (MRI) and
                  functional MRI (fMRI) for multi-disease detection. The
                  architecture utilizes a hybrid Convolutional Neural Network
                  (CNN) framework, combining EfficientNet-B4, 3D CNNs, and
                  Xception modules optimized through transfer learning. MRI and
                  fMRI datasets corresponding to AD, PD, and brain tumors are
                  preprocessed and classified into healthy or diseased
                  categories. The model achieves average detection accuracies
                  exceeding 90%, with integrated Grad-CAM visualizations to
                  highlight relevant brain regions for clinical interpretability.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Objective */}
            <Card className="p-6 bg-card">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Objective
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    To develop a scalable, non-invasive, and highly accurate
                    solution for use in neurology clinics and telemedicine
                    applications, supporting real-time clinical decision-making.
                  </p>
                </div>
              </div>
            </Card>

            {/* Key Innovation */}
            <Card className="p-6 bg-card">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Key Innovation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Unified framework that simultaneously and reliably diagnoses
                    multiple neurodegenerative and neoplastic conditions using a
                    single hybrid architecture.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Technology Stack */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Technology Stack
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {techStack.map((tech) => (
                <Card key={tech.name} className="p-4 bg-card text-center">
                  <div className="font-semibold text-foreground mb-1">
                    {tech.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tech.description}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <Card className="p-6 bg-card mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                System Architecture
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-primary/10 rounded-lg text-primary font-medium">
                MRI/fMRI Input
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="px-4 py-2 bg-muted rounded-lg text-foreground">
                Preprocessing
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="px-4 py-2 bg-muted rounded-lg text-foreground">
                Hybrid CNN
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="px-4 py-2 bg-muted rounded-lg text-foreground">
                Classification
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="px-4 py-2 bg-primary/10 rounded-lg text-primary font-medium">
                Grad-CAM Output
              </div>
            </div>
          </Card>

          {/* Team */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Research Team
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map((member) => (
                <Card key={member.name} className="p-6 bg-card text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="font-semibold text-foreground">
                    {member.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {member.role}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
