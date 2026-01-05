import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DiseaseType } from "@/data/mockData";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#0ea5e9",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: "#64748b",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
    backgroundColor: "#f1f5f9",
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  label: {
    fontSize: 10,
    color: "#64748b",
  },
  value: {
    fontSize: 10,
    color: "#0f172a",
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  prediction: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 5,
  },
  probability: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0ea5e9",
  },
  confidence: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 5,
  },
  regionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    width: 100,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#0ea5e9",
    borderRadius: 3,
  },
  disclaimer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  disclaimerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 5,
  },
  disclaimerText: {
    fontSize: 8,
    color: "#92400e",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
  },
});

interface AnalysisReportProps {
  results: {
    prediction: string;
    probability: number;
    confidence: string;
    stage: string;
    details: Record<string, string>;
    regions: Array<{ name: string; severity: number }>;
  };
  diseaseType: DiseaseType;
  scanDate: string;
  patientId: string;
}

export const AnalysisReport = ({ results, diseaseType, scanDate, patientId }: AnalysisReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NeuroScan AI Analysis Report</Text>
        <Text style={styles.subtitle}>
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </Text>
      </View>

      {/* Patient Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scan Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Patient ID</Text>
          <Text style={styles.value}>{patientId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Scan Date</Text>
          <Text style={styles.value}>{scanDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Analysis Type</Text>
          <Text style={styles.value}>{diseaseType.charAt(0).toUpperCase() + diseaseType.slice(1)} Detection</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model Version</Text>
          <Text style={styles.value}>NeuroScan v2.4.1 (Hybrid CNN)</Text>
        </View>
      </View>

      {/* Main Result */}
      <View style={styles.resultBox}>
        <Text style={styles.prediction}>{results.prediction}</Text>
        <Text style={styles.probability}>{(results.probability * 100).toFixed(1)}%</Text>
        <Text style={styles.confidence}>
          {results.confidence} Confidence | {results.stage}
        </Text>
      </View>

      {/* Key Findings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Findings</Text>
        {Object.entries(results.details).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>
              {key.replace(/([A-Z])/g, " $1").trim()}
            </Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Affected Regions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Affected Brain Regions</Text>
        {results.regions.map((region) => (
          <View key={region.name} style={styles.regionItem}>
            <Text style={styles.label}>{region.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: region.severity * 100 }]} />
              </View>
              <Text style={styles.value}>{(region.severity * 100).toFixed(0)}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>IMPORTANT DISCLAIMER</Text>
        <Text style={styles.disclaimerText}>
          This report is generated by an AI system for research and educational purposes only. 
          It should NOT be used as a substitute for professional medical diagnosis, advice, or treatment. 
          The predictions and findings presented are based on pattern recognition algorithms and may contain errors. 
          Always consult qualified healthcare professionals for medical decisions. 
          The creators of this system bear no responsibility for any clinical decisions made based on this report.
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        NeuroScan AI - Research Demo | Model: Hybrid CNN (EfficientNet-B4 + 3D CNN + Xception) | Accuracy: 92.4%
      </Text>
    </Page>
  </Document>
);
