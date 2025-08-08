"use client";

import { Calendar, ExternalLink, User } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
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
        className="container"
        style={{
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Calendar
              size={48}
              color="#6366f1"
              style={{ marginRight: "1rem" }}
            />
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#6366f1",
                margin: 0,
              }}
            >
              Schedule Your Session
            </h1>
          </div>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Ready to transform your mind? Schedule your complimentary
            exploratory session with Dustin.
          </p>
        </div>

        {/* Main Content */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
            padding: "3rem",
            borderRadius: "24px",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <User size={32} color="#8b5cf6" style={{ marginRight: "1rem" }} />
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                color: "#8b5cf6",
                margin: 0,
              }}
            >
              Schedule with Dustin Dean
            </h2>
          </div>

          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              lineHeight: "1.7",
              marginBottom: "2rem",
            }}
          >
            Dustin Dean is the founder of MindMaxED Institute and specializes in
            brain-fitness approaches that help high-achievers optimize their
            mental wellness. Book your complimentary exploratory session to
            experience his unique coaching methodology.
          </p>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(99, 102, 241, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#6366f1",
                margin: "0 0 1rem 0",
              }}
            >
              What to Expect:
            </h3>
            <ul
              style={{
                textAlign: "left",
                color: "#6b7280",
                lineHeight: "1.6",
                margin: 0,
                paddingLeft: "1.5rem",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                Complimentary exploratory session
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Personalized brain-fitness assessment
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Discussion of your mental wellness goals
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Overview of MindMaxED's approach
              </li>
              <li>Next steps for your transformation journey</li>
            </ul>
          </div>

          {/* CTA Button */}
          <a
            href="https://www.mindmaxed.com/coaching"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              fontSize: "1.125rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
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
          >
            <Calendar size={20} />
            Schedule Your Session
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Additional Info */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            padding: "2rem",
            borderRadius: "16px",
            border: "1px solid rgba(99, 102, 241, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#6366f1",
              margin: "0 0 1rem 0",
            }}
          >
            About MindMaxED Institute
          </h3>
          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            MindMaxED Institute is a program built for developing communities of
            leaders working towards joy optimization and maximized mental
            wellness outcomes for themselves and the individuals they are
            committed to serving in their chosen professions.
          </p>
        </div>

        {/* Back to Home */}
        <div
          style={{
            marginTop: "3rem",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#6366f1",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#8b5cf6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6366f1";
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
