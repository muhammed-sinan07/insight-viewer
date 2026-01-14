import { useState, useCallback } from "react";
import { MeasurementMode } from "@/components/analysis/MeasurementTools";

interface Point {
  x: number;
  y: number;
}

interface Measurement {
  id: string;
  type: "ruler" | "angle";
  points: Point[];
  value: number;
  unit: string;
}

// Mock pixel-to-mm conversion (in real app, this would come from DICOM metadata)
const PIXEL_TO_MM = 0.5;

export const useMeasurements = () => {
  const [mode, setMode] = useState<MeasurementMode>("none");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [pendingPoints, setPendingPoints] = useState<Point[]>([]);

  const calculateDistance = (p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy) * PIXEL_TO_MM;
  };

  const calculateAngle = (p1: Point, p2: Point, p3: Point): number => {
    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
    
    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    const cosAngle = dot / (mag1 * mag2);
    return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
  };

  const addPoint = useCallback((point: Point) => {
    if (mode === "none") return;

    const newPendingPoints = [...pendingPoints, point];
    
    if (mode === "ruler" && newPendingPoints.length === 2) {
      const distance = calculateDistance(newPendingPoints[0], newPendingPoints[1]);
      const newMeasurement: Measurement = {
        id: crypto.randomUUID(),
        type: "ruler",
        points: newPendingPoints,
        value: distance,
        unit: "mm",
      };
      setMeasurements((prev) => [...prev, newMeasurement]);
      setPendingPoints([]);
    } else if (mode === "angle" && newPendingPoints.length === 3) {
      const angle = calculateAngle(newPendingPoints[0], newPendingPoints[1], newPendingPoints[2]);
      const newMeasurement: Measurement = {
        id: crypto.randomUUID(),
        type: "angle",
        points: newPendingPoints,
        value: angle,
        unit: "°",
      };
      setMeasurements((prev) => [...prev, newMeasurement]);
      setPendingPoints([]);
    } else {
      setPendingPoints(newPendingPoints);
    }
  }, [mode, pendingPoints]);

  const clearMeasurements = useCallback(() => {
    setMeasurements([]);
    setPendingPoints([]);
  }, []);

  const deleteMeasurement = useCallback((id: string) => {
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const setMeasurementMode = useCallback((newMode: MeasurementMode) => {
    setMode(newMode);
    setPendingPoints([]);
  }, []);

  return {
    mode,
    setMode: setMeasurementMode,
    measurements,
    pendingPoints,
    addPoint,
    clearMeasurements,
    deleteMeasurement,
  };
};
