import { useEffect, useRef } from "react";

export default function ElevenLabsConvaiWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set up the iframe content when component mounts
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const agentId =
        process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
        "agent_01jyejgskkf9as5h6fr0pxstz7";

      // Create the HTML content for the iframe
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>ElevenLabs Convai Widget</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: transparent;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            #widget-container {
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            elevenlabs-convai {
              width: 100%;
              max-width: 800px;
              height: 600px;
              border-radius: 12px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <div id="widget-container">
            <elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>
          </div>
          
          <script src="https://unpkg.com/@elevenlabs/convai-widget-embed"></script>
        </body>
        </html>
      `;

      // Set the iframe content
      iframe.srcdoc = iframeContent;
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: "600px",
        border: "none",
        borderRadius: "12px",
        background: "transparent",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      title="ElevenLabs Convai Widget"
      allow="microphone"
    />
  );
}
