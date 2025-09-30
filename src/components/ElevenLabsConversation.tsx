"use client";

import { useConversation } from "@elevenlabs/react";
import { Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ElevenLabsConversationProps {
  agentId: string;
  userId?: string;
  voiceId?: string;
}

export default function ElevenLabsConversation({
  agentId,
  userId,
  voiceId,
}: ElevenLabsConversationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.7);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs conversation");
      setIsConnected(true);
      setError(null);
      setHasSpoken(false);

      // Find the audio element created by ElevenLabs SDK
      setTimeout(() => {
        const audioElements = document.querySelectorAll("audio");
        if (audioElements.length > 0) {
          audioElementRef.current = audioElements[
            audioElements.length - 1
          ] as HTMLAudioElement;
          console.log("Found audio element:", audioElementRef.current);
          if (audioElementRef.current) {
            audioElementRef.current.volume = volume;
            console.log("Set initial volume to:", volume);
          }
        }
      }, 1000); // Give SDK time to create audio element
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs conversation");
      setIsConnected(false);
      setHasSpoken(false);
      audioElementRef.current = null;
    },
    onMessage: (message) => {
      console.log("Received message:", message);
    },
    onError: (error: unknown) => {
      console.error("ElevenLabs conversation error:", error);
      setError(
        typeof error === "string"
          ? error
          : error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "An error occurred"
      );
    },
    onDebug: (debug) => {
      console.log("Debug:", debug);
    },
  });

  // Track AI speaking state
  useEffect(() => {
    if (conversation.isSpeaking) {
      setHasSpoken(true);
    }
  }, [conversation.isSpeaking]);

  // Handle full-screen mode when connected
  useEffect(() => {
    setIsFullScreen(isConnected);
    
    // Prevent body scroll when in full-screen mode
    if (isConnected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isConnected]);

  // Update volume when it changes
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume;
      console.log("Volume updated to:", volume);
    }
  }, [volume]);

  // Monitor for new audio elements
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === "AUDIO") {
              audioElementRef.current = element as HTMLAudioElement;
              audioElementRef.current.volume = volume;
              console.log("Found new audio element, set volume to:", volume);
            }
            // Also check for audio elements within added nodes
            const audioElements = element.querySelectorAll("audio");
            if (audioElements.length > 0) {
              audioElementRef.current = audioElements[
                audioElements.length - 1
              ] as HTMLAudioElement;
              audioElementRef.current.volume = volume;
              console.log(
                "Found audio element in added node, set volume to:",
                volume
              );
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [volume]);

  const startConversation = async () => {
    try {
      setIsStarting(true);
      setError(null);

      console.log("Starting conversation with agent:", agentId);
      console.log("Voice ID:", voiceId);
      console.log("User ID:", userId);

      // Request microphone access first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");

      // Start the conversation session
      const sessionOptions: {
        agentId: string;
        connectionType: "webrtc";
        user_id?: string;
        voice_id?: string;
        apiKey?: string;
      } = {
        agentId,
        connectionType: "webrtc",
      };

      if (userId) {
        sessionOptions.user_id = userId;
      }

      if (voiceId) {
        sessionOptions.voice_id = voiceId;
      }

      // Add API key if available
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      if (apiKey) {
        sessionOptions.apiKey = apiKey;
      }

      console.log("Session options:", sessionOptions);

      const conversationId = await conversation.startSession(sessionOptions);

      console.log("Conversation started with ID:", conversationId);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start conversation"
      );
    } finally {
      setIsStarting(false);
    }
  };

  const stopConversation = async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error("Failed to stop conversation:", err);
    }
  };

  const setVolume = async (newVolume: number) => {
    try {
      console.log("Setting volume to:", newVolume);
      setVolumeState(newVolume);

      // Update the audio element volume
      if (audioElementRef.current) {
        audioElementRef.current.volume = newVolume;
        console.log("Volume set via audio element to:", newVolume);
      } else {
        console.warn("Audio element not found for volume control");
      }
    } catch (err) {
      console.error("Failed to set volume:", err);
    }
  };

  return (
    <div
      style={{
        // Dynamic sizing based on full-screen state
        width: isFullScreen ? "100vw" : "100%",
        height: isFullScreen ? "100vh" : "auto",
        maxWidth: isFullScreen ? "none" : "600px",
        margin: isFullScreen ? "0" : "0 auto",
        padding: isFullScreen ? "3rem 2rem" : "2.5rem",
        
        // Keep same visual styling
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)",
        borderRadius: isFullScreen ? "0" : "24px",
        border: isFullScreen ? "none" : "1px solid rgba(99, 102, 241, 0.2)",
        backdropFilter: "blur(20px)",
        boxShadow: isFullScreen ? "none" : "0 20px 40px rgba(99, 102, 241, 0.1)",
        
        // Positioning and layout
        position: isFullScreen ? "fixed" : "relative",
        top: isFullScreen ? "0" : "auto",
        left: isFullScreen ? "0" : "auto",
        zIndex: isFullScreen ? 9999 : "auto",
        overflow: "hidden",
        
        // Smooth transitions
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        
        // Center content when full-screen
        display: isFullScreen ? "flex" : "block",
        alignItems: isFullScreen ? "center" : "stretch",
        justifyContent: isFullScreen ? "center" : "stretch",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        {/* Connected status in top right of entire component */}
        {isConnected && (
          <div
            style={{
              position: "absolute",
              top: "-1rem",
              right: "-1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.25rem 0.5rem",
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: "6px",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              color: "#22c55e",
              fontSize: "0.75rem",
              fontWeight: "500",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#22c55e",
                animation: "pulse 2s infinite",
              }}
            />
            Connected
          </div>
        )}

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#6366f1",
              margin: "0 0 0.5rem 0",
            }}
          >
            Dean of Zen
          </h3>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
              margin: 0,
            }}
          >
            Start a voice conversation with the Dean of Zen
          </p>
        </div>

        {/* Loading Animation */}
        {isStarting && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              padding: "2rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              border: "1px solid rgba(99, 102, 241, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(99, 102, 241, 0.3)",
                  borderTop: "2px solid #6366f1",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <span
                style={{
                  color: "#6366f1",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Starting conversation...
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    animation: `pulse 1.4s ease-in-out infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!isConnected && !isStarting && (
          <button
            onClick={startConversation}
            style={{
              padding: "1rem 2rem",
              borderRadius: "16px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "220px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              color: "white",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 35px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(99, 102, 241, 0.3)";
            }}
            disabled={isStarting}
          >
            <Play size={20} />
            {isStarting ? "Starting..." : "Start Conversation"}
          </button>
        )}

        {isConnected && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Voice lines and stop button container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isFullScreen ? "2rem" : "1rem",
                marginBottom: isFullScreen ? "2rem" : "0",
              }}
            >
              {/* Voice lines */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isFullScreen ? "0.5rem" : "0.25rem",
                }}
              >
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
                ].map((line) => (
                  <div
                    key={line}
                    style={{
                      width: isFullScreen ? "6px" : "3px",
                      height: conversation.isSpeaking 
                        ? (isFullScreen ? "40px" : "20px") 
                        : (isFullScreen ? "16px" : "8px"),
                      background: "#6366f1",
                      borderRadius: "3px",
                      opacity: conversation.isSpeaking ? 1 : 0.3,
                      animation: conversation.isSpeaking
                        ? `voiceLine ${0.6 + line * 0.1}s ease-in-out infinite`
                        : hasSpoken && !conversation.isSpeaking
                        ? `idleVoice ${2 + line * 0.2}s ease-in-out infinite`
                        : "none",
                    }}
                  />
                ))}
              </div>

              {/* Stop button */}
              <button
                onClick={stopConversation}
                style={{
                  padding: isFullScreen ? "1rem" : "0.5rem",
                  borderRadius: isFullScreen ? "12px" : "8px",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: isFullScreen ? "48px" : "32px",
                  height: isFullScreen ? "48px" : "32px",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                  // Mobile touch target optimization
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(239, 68, 68, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(239, 68, 68, 0.3)";
                }}
                title="Stop Conversation"
              >
                <div
                  style={{
                    width: isFullScreen ? "16px" : "12px",
                    height: isFullScreen ? "16px" : "12px",
                    background: "white",
                    borderRadius: "2px",
                  }}
                />
              </button>
            </div>

            {/* Volume control */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <Volume2 size={18} color="#6366f1" />
              <div style={{ flex: 1 }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    height: "6px",
                    borderRadius: "3px",
                    background: "rgba(99, 102, 241, 0.2)",
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
              </div>
              <span
                style={{
                  color: "#6366f1",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  minWidth: "30px",
                }}
              >
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              color: "#ef4444",
              background: "rgba(239, 68, 68, 0.1)",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              fontSize: "0.875rem",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes voiceLine {
          0%,
          100% {
            height: 8px;
            opacity: 0.3;
          }
          50% {
            height: 20px;
            opacity: 1;
          }
        }

        @keyframes idleVoice {
          0%,
          100% {
            height: 4px;
            opacity: 0.2;
          }
          50% {
            height: 12px;
            opacity: 0.6;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
