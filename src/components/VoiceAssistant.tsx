"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  audioUrl?: string;
}

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [micPermission, setMicPermission] = useState<
    "granted" | "denied" | "prompt" | "checking"
  >("checking");
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // ElevenLabs configuration
  const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const VOICE_ID =
    process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
  const AGENT_ID =
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
    "agent_01k0fw476pff1a9eavgvxka1qb";

  // Check microphone permission on component mount
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      if (!navigator.permissions) {
        setMicPermission("prompt");
        return;
      }

      const permission = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      setMicPermission(permission.state);

      permission.onchange = () => {
        setMicPermission(permission.state);
        if (permission.state === "granted") {
          setShowPermissionPrompt(false);
        }
      };
    } catch (error) {
      setMicPermission("prompt");
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      setMicPermission("checking");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission("granted");
      setShowPermissionPrompt(false);
      return true;
    } catch (error) {
      setMicPermission("denied");
      setShowPermissionPrompt(true);
      return false;
    }
  };

  const scrollToBottom = () => {
    const messagesContainer = document.querySelector(
      ".assistant-messages"
    ) as HTMLElement;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    text: string,
    sender: "user" | "assistant",
    audioUrl?: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      audioUrl,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Text-to-Speech using ElevenLabs API
  const textToSpeech = async (text: string): Promise<string> => {
    try {
      if (!ELEVENLABS_API_KEY) {
        return "";
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY || "",
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        return "";
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      return "";
    }
  };

  // Simple voice input using Web Speech API
  const startListening = async () => {
    if (micPermission === "denied") {
      setShowPermissionPrompt(true);
      return;
    }

    if (micPermission === "prompt") {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }

    try {
      const hasSpeechRecognition =
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

      if (!hasSpeechRecognition) {
        setTranscription(
          "Voice input not supported in this browser. Please use text input."
        );
        setTimeout(() => setTranscription(""), 3000);
        return;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      let finalTranscript = "";

      recognition.onstart = () => {
        setIsListening(true);
        setTranscription("Listening...");
        setAudioLevel(0.3);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscription(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setAudioLevel(0);

        if (event.error === "not-allowed") {
          setMicPermission("denied");
          setShowPermissionPrompt(true);
        } else {
          setTranscription("Speech recognition error. Please try again.");
          setTimeout(() => setTranscription(""), 2000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setAudioLevel(0);

        if (finalTranscript.trim()) {
          handleSendMessage(finalTranscript.trim());
        } else {
          setTranscription("");
        }
      };

      recognition.start();
    } catch (error) {
      setIsListening(false);
      setAudioLevel(0);
      setTranscription("Error starting voice input. Please try again.");
      setTimeout(() => setTranscription(""), 2000);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);
    setTranscription("");
  };

  // Send message to ElevenLabs Convai API
  const sendToElevenLabs = async (message: string): Promise<string> => {
    try {
      if (!ELEVENLABS_API_KEY || !AGENT_ID) {
        return getFallbackResponse(message);
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/${AGENT_ID}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY || "",
          },
          body: JSON.stringify({
            message: message,
            user_id: "user_" + Date.now(),
            conversation_id: "dean_of_zen_session",
            stream: false,
          }),
        }
      );

      if (!response.ok) {
        return getFallbackResponse(message);
      }

      const data = await response.json();

      if (data && data.response) {
        return data.response;
      } else if (data && data.text) {
        return data.text;
      } else if (data && typeof data === "string") {
        return data;
      } else {
        return getFallbackResponse(message);
      }
    } catch (error) {
      return getFallbackResponse(message);
    }
  };

  // Fallback response system
  const getFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! I'm the Dean of Zen, your AI mindfulness coach. I'm here to support you on your journey toward inner peace and well-being. What would you like to explore today?";
    }

    if (
      lowerMessage.includes("meditation") ||
      lowerMessage.includes("meditate")
    ) {
      return "Meditation is a beautiful practice for finding inner peace. Start with just 5 minutes of focused breathing. Sit comfortably, close your eyes, and simply observe your breath. When your mind wanders, gently bring it back to your breath.";
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
      return "Stress and anxiety are natural responses, but we can learn to manage them. Try this simple technique: take a deep breath in for 4 counts, hold for 4, exhale for 6. Repeat this 3-5 times. This activates your parasympathetic nervous system, helping you feel calmer.";
    }

    return "Thank you for sharing that with me. Remember, every moment is an opportunity to practice mindfulness and find peace within yourself.";
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    setInputText("");
    setIsLoading(true);

    addMessage(messageText, "user");

    try {
      const response = await sendToElevenLabs(messageText);
      const audioUrl = await textToSpeech(response);
      addMessage(response, "assistant", audioUrl);

      if (audioUrl) {
        setTimeout(() => {
          playAudio(audioUrl);
        }, 100);
      }
    } catch (error) {
      addMessage(
        "I'm sorry, I encountered an error. Please try again.",
        "assistant"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => setIsPlaying(false));
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="voice-assistant"
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "1rem",
        overflow: "hidden",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="assistant-header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1.5rem 2rem",
          background: "#1a1a2e",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          gap: "1rem",
        }}
      >
        <div
          className="assistant-avatar"
          style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
          }}
        >
          <span className="avatar-icon">🧘</span>
        </div>
        <div className="assistant-info">
          <h3
            style={{
              color: "#ffffff",
              fontSize: "1.125rem",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Dean of Zen
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", margin: 0 }}>
            AI Voice Coach
          </p>
        </div>
        <div
          className="assistant-status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          <span
            className={`status-dot ${
              micPermission === "granted" ? "connected" : "disconnected"
            }`}
            style={{
              width: "8px",
              height: "8px",
              background: micPermission === "granted" ? "#10b981" : "#ef4444",
              borderRadius: "50%",
              animation:
                micPermission === "granted" ? "pulse 2s infinite" : "none",
            }}
          ></span>
          {micPermission === "granted"
            ? "Connected"
            : micPermission === "denied"
            ? "Microphone Blocked"
            : "Checking..."}
        </div>
      </div>

      <div
        className="assistant-messages"
        style={{
          flex: 1,
          padding: "2rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          background: "#0a0a0a",
          height: "340px",
          minHeight: "340px",
          maxHeight: "340px",
        }}
      >
        {messages.length === 0 && (
          <div
            className="welcome-message"
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#9ca3af",
            }}
          >
            <div className="welcome-icon">🎙️</div>
            <h4
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "1.25rem",
                fontWeight: "600",
              }}
            >
              Welcome to the Dean of Zen
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                marginBottom: "2rem",
                color: "#e5e7eb",
              }}
            >
              I&apos;m here to guide you on your mindfulness journey. Use voice
              or text to start our conversation.
            </p>
            {!ELEVENLABS_API_KEY && (
              <div
                className="voice-notice"
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  margin: "1.5rem 0",
                }}
              >
                <p
                  style={{ fontSize: "0.875rem", margin: 0, color: "#6366f1" }}
                >
                  🔊 <strong>Voice Feature:</strong> To hear my voice responses,
                  add your ElevenLabs API key to your environment variables.
                </p>
              </div>
            )}
            <div
              className="welcome-tips"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  margin: "4px 0",
                  color: "#9ca3af",
                }}
              >
                💡 <strong style={{ color: "#e5e7eb" }}>Tip:</strong> Hold the
                microphone button to speak naturally
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  margin: "4px 0",
                  color: "#9ca3af",
                }}
              >
                🎧 <strong style={{ color: "#e5e7eb" }}>Tip:</strong> Use
                headphones for the best audio experience
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "user-message" : "assistant-message"
            }`}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "80%",
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              className="message-content"
              style={{
                padding: "1rem 1.5rem",
                borderRadius: "1.25rem",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background:
                  message.sender === "user"
                    ? "linear-gradient(45deg, #6366f1, #8b5cf6)"
                    : "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                border:
                  message.sender === "assistant"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "none",
                boxShadow:
                  message.sender === "user"
                    ? "0 10px 25px rgba(99, 102, 241, 0.3)"
                    : "none",
              }}
            >
              {message.text}
              {message.audioUrl && message.sender === "assistant" && (
                <button
                  className="play-audio-btn"
                  onClick={() =>
                    isPlaying ? stopAudio() : playAudio(message.audioUrl!)
                  }
                  title={isPlaying ? "Stop audio" : "Play audio"}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "4px",
                    borderRadius: "0.375rem",
                    transition: "background 0.15s ease",
                  }}
                >
                  {isPlaying ? "⏹️" : "🔊"}
                </button>
              )}
            </div>
            <div
              className="message-time"
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginTop: "0.25rem",
                alignSelf:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div
            className="message assistant-message"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "80%",
              alignSelf: "flex-start",
            }}
          >
            <div
              className="message-content"
              style={{
                padding: "1rem 1.5rem",
                borderRadius: "1.25rem",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                className="typing-indicator"
                style={{
                  display: "flex",
                  gap: "4px",
                  padding: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#9ca3af",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                  }}
                ></span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#9ca3af",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                    animationDelay: "-0.16s",
                  }}
                ></span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#9ca3af",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                    animationDelay: "-0.32s",
                  }}
                ></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Microphone Permission Prompt */}
      {showPermissionPrompt && (
        <div
          className="permission-prompt"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "2rem",
          }}
        >
          <div
            className="permission-content"
            style={{
              background: "#1a1a2e",
              borderRadius: "1rem",
              padding: "4rem",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="permission-icon">🎤</div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Microphone Access Required
            </h4>
            <p
              style={{
                color: "#e5e7eb",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              To use voice features, please allow microphone access in your
              browser.
            </p>
            <div
              className="permission-actions"
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                className="permission-btn primary"
                onClick={requestMicrophonePermission}
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: "none",
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  color: "#ffffff",
                }}
              >
                Allow Microphone
              </button>
              <button
                className="permission-btn secondary"
                onClick={() => setShowPermissionPrompt(false)}
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#e5e7eb",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="assistant-input"
        style={{
          padding: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "#1a1a2e",
          minHeight: "160px",
        }}
      >
        <div
          className="input-container"
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "flex-end",
          }}
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice input..."
            rows={1}
            disabled={isLoading}
            style={{
              flex: 1,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "1.25rem",
              padding: "1rem 1.5rem",
              color: "#ffffff",
              fontSize: "0.875rem",
              resize: "none",
              minHeight: "44px",
              maxHeight: "44px",
              height: "44px",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
              overflow: "hidden",
            }}
          />
          <div
            className="input-actions"
            style={{
              display: "flex",
              gap: "0.25rem",
            }}
          >
            <button
              className={`voice-button ${isListening ? "listening" : ""} ${
                micPermission === "denied" ? "disabled" : ""
              }`}
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              disabled={isLoading || micPermission === "denied"}
              title={
                micPermission === "denied"
                  ? "Microphone access denied. Please allow in browser settings."
                  : isListening
                  ? "Stop recording"
                  : "Voice input"
              }
              style={{
                width: "44px",
                height: "44px",
                border: "none",
                borderRadius: "50%",
                background:
                  micPermission === "denied"
                    ? "rgba(255, 255, 255, 0.05)"
                    : isListening
                    ? "#ef4444"
                    : "rgba(255, 255, 255, 0.05)",
                color: micPermission === "denied" ? "#9ca3af" : "#e5e7eb",
                cursor:
                  isLoading || micPermission === "denied"
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.15s ease",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transform: isListening
                  ? `scale(${1 + audioLevel * 0.2})`
                  : undefined,
                opacity: isLoading || micPermission === "denied" ? 0.5 : 1,
              }}
            >
              {isListening ? "⏹️" : micPermission === "denied" ? "🚫" : "🎤"}
            </button>
            <button
              className="send-button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              style={{
                width: "44px",
                height: "44px",
                border: "none",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#e5e7eb",
                cursor:
                  !inputText.trim() || isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.15s ease",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                opacity: !inputText.trim() || isLoading ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
        {isListening && (
          <div
            className="recording-indicator"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              color: "#ef4444",
              fontSize: "0.875rem",
              flexWrap: "wrap",
            }}
          >
            <span
              className="recording-dot"
              style={{
                width: "8px",
                height: "8px",
                background: "#ef4444",
                borderRadius: "50%",
                animation: "pulse 1s infinite",
              }}
            ></span>
            Recording... {transcription && `"${transcription}"`}
            <div
              className="audio-level-bar"
              style={{
                width: "100%",
                height: "4px",
                background: "rgba(239, 68, 68, 0.2)",
                borderRadius: "2px",
                overflow: "hidden",
                marginTop: "0.25rem",
              }}
            >
              <div
                className="audio-level-fill"
                style={{
                  width: `${audioLevel * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #ef4444, #f97316)",
                  borderRadius: "2px",
                  transition: "width 0.1s ease",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
}
