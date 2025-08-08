"use client";

import { CheckCircle, MessageCircle, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="about-hero"
        style={{
          padding: "5rem 0  0",
        }}
      >
        <div className="container">
          <div className="section-header">
            <h1 className="section-title" style={{ marginBottom: "1.5rem" }}>
              Revolutionizing Mental Wellness Through AI
            </h1>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.25rem",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              At MindMaxED, we&apos;re pioneering the future of mental fitness
              by combining clinical expertise with cutting-edge AI technology to
              help you thrive, not just survive.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Cards Section */}
      <section style={{ marginBottom: "4rem" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "3rem 0",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                transition: "all 0.3s ease",
                width: "300px",
                height: "280px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#8b5cf6",
                    background: "rgba(139, 92, 246, 0.1)",
                    padding: "1rem",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <MessageCircle size={32} />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#8b5cf6",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Dean of ZenAI was created to
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    lineHeight: "1.5",
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  Give you immediate feedback and coaching on techniques for
                  calmness and relaxation.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                transition: "all 0.3s ease",
                width: "300px",
                height: "280px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#8b5cf6",
                    background: "rgba(139, 92, 246, 0.1)",
                    padding: "1rem",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <Smartphone size={32} />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#8b5cf6",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Call and chat with ZenAI
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    lineHeight: "1.5",
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  to experience the Mindmaxed.com Zen AI enhanced program 24/7
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                transition: "all 0.3s ease",
                width: "300px",
                height: "280px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#8b5cf6",
                    background: "rgba(139, 92, 246, 0.1)",
                    padding: "1rem",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <CheckCircle size={32} />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#8b5cf6",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Use the Dean of ZenAI
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    lineHeight: "1.5",
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  prior to MindMaxxed sessions to maximize your time and
                  potential for change
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section" style={{ marginBottom: "4rem" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <p
              className="section-subtitle"
              style={{ maxWidth: 700, margin: "0 auto 2.5rem auto" }}
            >
              To transform how people approach mental wellness by providing
              AI-enhanced brain fitness coaching that empowers individuals to
              process life through their power and potential rather than their
              pain and past.
            </p>
          </div>
          <div
            className="mission-points"
            style={{
              display: "flex",
              gap: "2.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              className="mission-point"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                borderRadius: "12px",
                padding: "1.5rem",
                minWidth: 260,
                maxWidth: 340,
                textAlign: "center",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                transition: "all 0.3s ease",
                height: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <div
                  className="icon"
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#8b5cf6",
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: "1rem",
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Clean, modern brain SVG */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#8b5cf6" }}
                      aria-hidden="true"
                    >
                      <path d="M11 27c-2.5 0-5-2-5-5 0-1.5.5-2.5 1.5-3.5C5 17 4 15.5 4 13.5 4 9 8 7 11 7c0-2 2-4 5-4s5 2 5 4c3 0 7 2 7 6.5 0 2-1 3.5-3.5 5C28.5 19.5 29 20.5 29 22c0 3-2.5 5-5 5-1.5 0-2.5-.5-3-1-.5.5-1.5 1-3 1z" />
                      <path d="M16 3v26" />
                      <path d="M10 12c1-1 3-1 6-1s5 0 6 1" />
                      <path d="M10 18c1-1 3-1 6-1s5 0 6 1" />
                    </svg>
                  </div>
                </div>
                <h3
                  className="point-title"
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    fontSize: "1.25rem",
                    color: "#8b5cf6",
                  }}
                >
                  Brain Fitness Focus
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    lineHeight: "1.5",
                    fontSize: "0.875rem",
                  }}
                >
                  We treat your mind like a muscle that can be trained,
                  strengthened, and optimized for peak performance.
                </p>
              </div>
            </div>
            <div
              className="mission-point"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                borderRadius: "12px",
                padding: "1.5rem",
                minWidth: 260,
                maxWidth: 340,
                textAlign: "center",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                transition: "all 0.3s ease",
                height: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <div
                  className="icon"
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#8b5cf6",
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: "1rem",
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Robot SVG */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#8b5cf6" }}
                      aria-hidden="true"
                    >
                      <rect x="3" y="7" width="18" height="10" rx="4" />
                      <rect
                        x="7"
                        y="11"
                        width="2"
                        height="2"
                        rx="1"
                        fill="#8b5cf6"
                      />
                      <rect
                        x="15"
                        y="11"
                        width="2"
                        height="2"
                        rx="1"
                        fill="#8b5cf6"
                      />
                      <path d="M12 7V3M8 3h8" />
                    </svg>
                  </div>
                </div>
                <h3
                  className="point-title"
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    fontSize: "1.25rem",
                    color: "#8b5cf6",
                  }}
                >
                  AI-Enhanced Approach
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    lineHeight: "1.5",
                    fontSize: "0.875rem",
                  }}
                >
                  Our proprietary AI system provides personalized insights and
                  tracks your progress for maximum impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Story Section */}
      <section className="story-section" style={{ marginBottom: "4rem" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Story</h2>
            <p
              className="section-subtitle"
              style={{ maxWidth: 700, margin: "0 auto 2.5rem auto" }}
            >
              Born from a vision to revolutionize mental wellness for
              high-achievers.
            </p>
          </div>
          <div
            className="story-text"
            style={{
              maxWidth: 800,
              margin: "0 auto",
              background: "rgba(99,102,241,0.04)",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              boxShadow: "0 2px 8px rgba(99,102,241,0.04)",
            }}
          >
            <h3
              className="story-title"
              style={{
                fontWeight: 600,
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              From Traditional Therapy to Brain Fitness Innovation
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "1.25rem" }}>
              MindMaxED was founded on the belief that mental wellness should be
              proactive, not reactive. After years of working within traditional
              therapeutic frameworks, our founders recognized that
              high-achieving professionals needed a different approach—one that
              focused on optimization rather than just healing.
            </p>
            <p style={{ color: "#6b7280", marginBottom: "1.25rem" }}>
              The breakthrough came when we began integrating AI technology with
              proven brain fitness methodologies. This combination allows us to
              provide personalized, data-driven insights while maintaining the
              human connection that&apos;s essential for transformation.
            </p>
            <p style={{ color: "#6b7280" }}>
              Today, MindMaxED stands at the forefront of the mental fitness
              revolution, helping clients around the world shift from surviving
              to thriving through our unique blend of clinical expertise and
              technological innovation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
