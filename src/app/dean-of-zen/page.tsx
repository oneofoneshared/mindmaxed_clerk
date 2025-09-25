"use client";

import { PricingTable, useAuth, useUser } from "@clerk/nextjs";
import {
  Brain,
  Compass,
  Mic,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import ElevenLabsConversation from "../../components/ElevenLabsConversation";

export default function DeanOfZenPage() {
  const { isSignedIn, user } = useUser();
  // const { openUserProfile } = useClerk();
  const { has } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

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


  // Check subscription status and whitelist with proper updates
  useEffect(() => {
    if (isSignedIn && has) {
      const checkAccess = async () => {
        // Check for paid subscription access
        const hasZenAccess = has({ plan: "zenai_coaching" });
        const hasTransformationAccess = has({ plan: "transformation_program" });
        const hasPaidAccess = hasZenAccess || hasTransformationAccess;

        // Check for whitelist access
        const isWhitelisted = user?.publicMetadata?.isWhitelisted === true;

        // Grant access if user has paid subscription OR is whitelisted
        setHasAccess(hasPaidAccess || isWhitelisted);
      };

      checkAccess();

      // Set up polling to check for subscription changes
      const interval = setInterval(checkAccess, 2000);
      return () => clearInterval(interval);
    } else {
      setHasAccess(false);
    }
  }, [isSignedIn, has, user?.publicMetadata?.isWhitelisted]);

  // const handleSubscribe = () => {
  //   // @ts-expect-error Clerk billing path is supported but not in types
  //   openUserProfile({ path: "billing" });
  // };

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
        style={{ marginTop: "1rem", marginBottom: "2rem", textAlign: "center" }}
      >
        <h1 className="section-title">Dean of Zen</h1>
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

      {/* Static Cards Column - shown for subscribed users after conversation */}
      {isSignedIn && hasAccess && (
        <div
          style={{
            marginTop: "3rem",
            marginBottom: "2rem",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {cards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={index}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    transition: "all 0.3s ease",
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
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: "#8b5cf6",
                        background: "rgba(139, 92, 246, 0.1)",
                        padding: "0.75rem",
                        borderRadius: "12px",
                        flexShrink: 0,
                      }}
                    >
                      <CardIcon size={24} />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#8b5cf6",
                        margin: 0,
                        lineHeight: "1.3",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "#9ca3af",
                      lineHeight: "1.6",
                      margin: 0,
                      fontSize: "1rem",
                      paddingLeft: "4rem",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
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
          {/* Pricing Toggle Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.25rem",
                background: "rgba(99, 102, 241, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#6366f1",
                }}
              >
                Monthly
              </div>
              <div
                style={{
                  width: "44px",
                  height: "24px",
                  background: "#e5e7eb",
                  borderRadius: "12px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#6366f1",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    transition: "transform 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                }}
              >
                Yearly
              </div>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                fontWeight: "500",
                padding: "0.375rem 0.75rem",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "6px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              💰 Save up to 20% with yearly billing
            </div>
          </div>

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
