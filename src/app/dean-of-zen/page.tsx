"use client";

import ElevenLabsConvaiWidget from "../../components/ElevenLabsConvaiWidget";

export default function DeanOfZenPage() {
  return (
    <div className="widget-center">
      <div className="section-header">
        <h1 className="section-title">Dean of Zen</h1>
        <p className="section-subtitle">
          Your AI-powered mindfulness and brain fitness coach. Speak or type to
          begin your journey.
        </p>
      </div>
      <ElevenLabsConvaiWidget />
    </div>
  );
}
