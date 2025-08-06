"use client";

import { PricingTable, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { Brain, Compass, Mic, Smartphone, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import ElevenLabsConversation from "../../components/ElevenLabsConversation";

export default function DeanOfZenPage() {
  const { isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();
  const { has } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Card data
  const cards = [
    {
      icon: Mic,
      title: "Speak your stress",
      description:
        "Just say what's on your mind—no filters, no scripts. The AI listens without judgment.",
    },
    {
      icon: Brain,
      title: "Decode your mindset",
      description:
        "The assistant picks up patterns in your thoughts and emotional state in real time.",
    },
    {
      icon: Compass,
      title: "Follow its lead",
      description:
        "It guides you through proven techniques—breathwork, grounding, reframing, and more.",
    },
    {
      icon: TrendingUp,
      title: "Shift your state",
      description:
        "Feel yourself move from scattered to centered in just a few guided steps.",
    },
    {
      icon: Smartphone,
      title: "Use it anytime",
      description:
        "Your mindset coach is always just a voice command away—whether you're in traffic, at home, or mid-meltdown.",
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  // Check subscription status with proper updates
  useEffect(() => {
    if (isSignedIn && has) {
      const checkSubscription = async () => {
        const hasZenAccess = has({ plan: "zenai_coaching" });
        const hasTransformationAccess = has({ plan: "transformation_program" });
        setHasAccess(hasZenAccess || hasTransformationAccess);
      };

      checkSubscription();

      // Set up polling to check for subscription changes
      const interval = setInterval(checkSubscription, 2000);
      return () => clearInterval(interval);
    } else {
      setHasAccess(false);
    }
  }, [isSignedIn, has]);

  const handleSubscribe = () => {
    // @ts-expect-error Clerk billing path is supported but not in types
    openUserProfile({ path: "billing" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        padding: "0.5rem 1rem",
      }}
    >
      <div
        className="section-header"
        style={{ marginTop: "1rem", marginBottom: "0rem", textAlign: "center" }}
      >
        <h1 className="section-title">Dean of Zen</h1>
        {/* Card Carousel */}
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            maxWidth: isMobile ? "300px" : "1000px",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            overflow: "hidden",
            padding: isMobile ? "0 1rem" : "0 1rem",
          }}
        >
          {/* Carousel Container */}
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: isMobile
                ? `translateX(-${currentCardIndex * 100}%)`
                : `translateX(-${currentCardIndex * (100 / 3)}%)`,
              gap: isMobile ? "0" : "1.5rem",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {/* Duplicate cards for seamless loop */}
            {[...cards, ...cards.slice(0, isMobile ? 1 : 3)].map(
              (card, index) => {
                const CardIcon = card.icon;
                return (
                  <div
                    key={index}
                    style={{
                      minWidth: isMobile ? "100%" : "calc(33.333% - 1rem)",
                      background:
                        "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                      padding: isMobile ? "0.75rem" : "1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(99, 102, 241, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.25rem",
                          color: "#8b5cf6",
                          background: "rgba(139, 92, 246, 0.1)",
                          padding: "0.375rem",
                          borderRadius: "8px",
                        }}
                      >
                        <CardIcon size={16} />
                      </div>
                      <h3
                        style={{
                          fontSize: isMobile ? "0.875rem" : "1rem",
                          fontWeight: "600",
                          color: "#8b5cf6",
                          margin: 0,
                        }}
                      >
                        {card.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        color: "#9ca3af",
                        lineHeight: "1.5",
                        margin: 0,
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                      }}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              }
            )}
          </div>

          {/* Navigation Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    currentCardIndex === index ? "#6366f1" : "#d1d5db",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ElevenLabs Conversation - only for subscribed users */}
      {isSignedIn && hasAccess && (
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "2rem auto",
            padding: "0 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ElevenLabsConversation
            agentId={
              process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
              "agent_01jyejgskkf9as5h6fr0pxstz7"
            }
            voiceId={process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}
            userId={user?.id}
          />
        </div>
      )}

      {/* Message for signed-in users without subscription */}
      {isSignedIn && !hasAccess && (
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "600px",
            margin: "2rem auto",
            textAlign: "center",
          }}
        >
          <div>
            <h3 style={{ color: "#8b5cf6", marginBottom: "1rem" }}>
              Subscribe to Access Dean of Zen
            </h3>
            <p style={{ color: "#9ca3af", lineHeight: "1.6" }}>
              Get access to your AI-powered mindfulness and brain fitness coach.
              Subscribe below to start your journey toward peak mental
              performance.
            </p>
          </div>
        </div>
      )}

      {/* Pricing table for non-subscribers */}
      {!hasAccess && (
        <div style={{ margin: "2rem auto", width: "100%", maxWidth: "800px" }}>
          <PricingTable
            appearance={{
              elements: {
                pricingTable: {
                  display: "flex",
                },
                pricingTableButton: {
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                },
                formButtonPrimary: {
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                },
                button: {
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                },
                pricingTableCard: {
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.25rem",
                  border: "2px solid rgba(99, 102, 241, 0.3)",
                  minWidth: "400px",
                },
                pricingTableCardTitle: {
                  color: "#8b5cf6",
                },
                pricingTableCardFeatures: {
                  background: "#242230",
                },
                pricingTableCardFeaturesListItemTitle: {
                  color: "#8b5cf6",
                },
                pricingTableCardFee: {
                  color: "#8b5cf6",
                },
                pricingTableCardDescription: {
                  color: "#9ca3af",
                },
                pricingTableCardFeePeriod: {
                  color: "#9ca3af",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
