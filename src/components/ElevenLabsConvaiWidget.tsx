import { useEffect, useRef } from "react";

export default function ElevenLabsConvaiWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the script only once
    if (!document.getElementById("elevenlabs-convai-script")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-convai-script";
      document.body.appendChild(script);
    }
    // Inject the custom element
    if (
      containerRef.current &&
      !containerRef.current.querySelector("elevenlabs-convai")
    ) {
      const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", "agent_01jyejgskkf9as5h6fr0pxstz7");
      containerRef.current.appendChild(widget);
    }
  }, []);

  return <div ref={containerRef} />;
}
