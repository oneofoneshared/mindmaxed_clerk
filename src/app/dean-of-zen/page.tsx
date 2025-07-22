"use client";

import { SignInButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs";
import ElevenLabsConvaiWidget from "../../components/ElevenLabsConvaiWidget";

export default function DeanOfZenPage() {
  const { isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();
  const hasDeanOfZenSubscription =
    user?.publicMetadata?.hasDeanOfZenSubscription === true;

  const handleSubscribe = () => {
    openUserProfile({ path: "billing" } as any);
  };

  return (
    <div className="widget-center">
      <div className="section-header" style={{ marginTop: "100px" }}>
        <h1 className="section-title">Dean of Zen</h1>
        <p className="section-subtitle">
          Your AI-powered mindfulness and brain fitness coach. Speak or type to
          begin your journey.
        </p>
      </div>
      {!isSignedIn ? (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: "1.1rem", marginBottom: 16 }}>
            Please sign in or sign up to access the Dean of Zen experience.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <SignInButton mode="modal">
              <button className="cta-button primary">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="secondary-button">Sign Up</button>
            </SignUpButton>
          </div>
        </div>
      ) : !hasDeanOfZenSubscription ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="pricing-card"
            style={{
              maxWidth: 340,
              margin: "0 auto 24px auto",
              padding: 24,
              borderRadius: 16,
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 2px 12px rgba(24,25,42,0.10)",
              border: "1px solid rgba(255,255,255,0.10)",
              textAlign: "left",
            }}
          >
            <div className="pricing-header" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Dean of Zen</h3>
              <div
                className="pricing-price"
                style={{ fontSize: "2rem", fontWeight: 700, margin: "8px 0" }}
              >
                <span className="currency">$</span>
                <span className="amount">50</span>
                <span
                  style={{ fontSize: "1rem", fontWeight: 400, marginLeft: 4 }}
                >
                  /month
                </span>
              </div>
            </div>
            <ul
              className="pricing-features"
              style={{ fontSize: "0.98rem", marginBottom: 16, paddingLeft: 18 }}
            >
              <li>Quick solution focused-supports</li>
              <li>Techniques for reducing stress</li>
              <li>Breathing techniques</li>
              <li>Pre-coaching assessment</li>
            </ul>
            <button
              className="pricing-cta primary"
              style={{
                width: "100%",
                display: "inline-block",
                textAlign: "center",
              }}
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: 0,
              color: "#fff",
              textAlign: "center",
            }}
          >
            You need a Dean of Zen subscription to access this experience.
          </p>
        </div>
      ) : (
        <ElevenLabsConvaiWidget />
      )}
    </div>
  );
}
