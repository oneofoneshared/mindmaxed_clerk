"use client";

import { useEffect, useRef } from "react";

export default function ElevenLabsHomepageWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return;

    // Create the widget element
    const widgetElement = document.createElement("elevenlabs-convai");
    widgetElement.setAttribute("agent-id", "agent_01jyejgskkf9as5h6fr0pxstz7");

    // Clear container and append widget
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(widgetElement);

    // Load script only once
    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
    }

    scriptLoadedRef.current = true;

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      ref={containerRef}
      className="elevenlabs-widget-container"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
      }}
    />
  );
}
