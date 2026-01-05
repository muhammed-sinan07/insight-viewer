// Mock MRI slice images (placeholders)
export const mockMriSlices = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `Slice ${i + 1}`,
  position: i * 5,
}));

// Mock analysis results
export const mockAnalysisResults = {
  alzheimers: {
    prediction: "Alzheimer's Disease Detected",
    probability: 0.87,
    confidence: "High",
    stage: "Mild Cognitive Impairment",
    details: {
      hippocampalVolume: "Reduced by 18%",
      corticalThickness: "Below normal threshold",
      ventricleSize: "Enlarged",
    },
    regions: [
      { name: "Hippocampus", severity: 0.89 },
      { name: "Temporal Lobe", severity: 0.76 },
      { name: "Parietal Lobe", severity: 0.62 },
      { name: "Frontal Lobe", severity: 0.45 },
    ],
  },
  parkinsons: {
    prediction: "Parkinson's Disease Indicators",
    probability: 0.82,
    confidence: "High",
    stage: "Stage 2 - Bilateral Symptoms",
    details: {
      substantiaNigra: "Dopaminergic reduction detected",
      basalGanglia: "Asymmetric activity",
      motorCortex: "Mild abnormalities",
    },
    regions: [
      { name: "Substantia Nigra", severity: 0.91 },
      { name: "Basal Ganglia", severity: 0.84 },
      { name: "Motor Cortex", severity: 0.58 },
      { name: "Cerebellum", severity: 0.42 },
    ],
  },
  brainTumor: {
    prediction: "Tumor Mass Detected",
    probability: 0.94,
    confidence: "Very High",
    stage: "Grade II Glioma",
    details: {
      location: "Right Temporal Lobe",
      size: "2.3 x 1.8 x 2.1 cm",
      characteristics: "Well-defined margins",
    },
    regions: [
      { name: "Tumor Core", severity: 0.96 },
      { name: "Peritumoral Edema", severity: 0.78 },
      { name: "Adjacent Tissue", severity: 0.52 },
      { name: "Distant Regions", severity: 0.12 },
    ],
  },
  healthy: {
    prediction: "No Abnormalities Detected",
    probability: 0.95,
    confidence: "High",
    stage: "Normal",
    details: {
      overallHealth: "Within normal parameters",
      brainVolume: "Age-appropriate",
      structuralIntegrity: "Intact",
    },
    regions: [
      { name: "All Regions", severity: 0.05 },
    ],
  },
};

export type DiseaseType = "alzheimers" | "parkinsons" | "brainTumor";

export const diseaseOptions = [
  { value: "alzheimers", label: "Alzheimer's Disease", description: "Neurodegenerative disorder affecting memory" },
  { value: "parkinsons", label: "Parkinson's Disease", description: "Movement disorder with dopamine deficiency" },
  { value: "brainTumor", label: "Brain Tumor", description: "Abnormal cell growth in the brain" },
] as const;
