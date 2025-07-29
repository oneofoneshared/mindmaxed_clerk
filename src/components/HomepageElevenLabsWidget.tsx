"use client";

import { useEffect } from "react";

export default function HomepageElevenLabsWidget() {
  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement("script");
    script.src = "https://widget.convai.com/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Clean up script when component unmounts
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://widget.convai.com/widget.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div
      id="convai-widget"
      data-agent-id="agent_01k0fw476pff1a9eavgvxka1qb"
      data-api-key="your-api-key-here"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        height: "600px",
      }}
    />
  );
}
