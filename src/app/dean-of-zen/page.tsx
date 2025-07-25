"use client";

import { PricingTable, useClerk, useUser } from "@clerk/nextjs";
import ElevenLabsConvaiWidget from "../../components/ElevenLabsConvaiWidget";
import { useSubscriptionStatus } from "../../hooks/useSubscriptionStatus";

export default function DeanOfZenPage() {
  const { isSignedIn } = useUser();
  const { openUserProfile } = useClerk();
  const { hasAccess, isLoading } = useSubscriptionStatus();

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
        padding: "2rem 1rem",
      }}
    >
      <div
        className="section-header"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <h1 className="section-title">Dean of Zen</h1>
        <p className="section-subtitle">
          Your AI-powered mindfulness and brain fitness coach. Experience
          personalized guidance, cognitive enhancement techniques, and
          transformative mental wellness strategies. Speak or type to begin your
          journey toward peak mental performance and inner peace.
        </p>
      </div>

      {/* Widget positioned 200px below title - only for subscribed users */}
      {isSignedIn && !isLoading && hasAccess && (
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "-300px 600px 2rem auto",
            padding: "0 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ElevenLabsConvaiWidget />
          </div>
        </div>
      )}

      {/* Message for non-subscribers
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
      )} */}

      {/* Message for non-signed in users */}
      {/* {!isSignedIn && (
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
              Sign In to Access Dean of Zen
            </h3>
            <p style={{ color: "#9ca3af", lineHeight: "1.6" }}>
              Please sign in to access your AI-powered mindfulness and brain
              fitness coach. If you don&apos;t have an account, you can sign up
              below.
            </p>
          </div>
        </div>
      )} */}

      {/* Pricing table at the bottom for non-subscribers */}
      {!isLoading && !hasAccess && (
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
