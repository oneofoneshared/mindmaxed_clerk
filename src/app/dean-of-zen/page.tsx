"use client";

import { PricingTable, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ElevenLabsConvaiWidget from "../../components/ElevenLabsConvaiWidget";

export default function DeanOfZenPage() {
  const { isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();
  const { has } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

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

      {/* Widget - only for subscribed users */}
      {isSignedIn && hasAccess && (
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
