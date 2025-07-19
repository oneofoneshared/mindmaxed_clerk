"use client";

import { useFormHandler } from "@/hooks/useFormHandler";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  coachingPlan: "",
  challenges: "",
  goals: "",
  timeline: "",
  newsletter: false,
  terms: false,
};

function validate(values: typeof initialValues) {
  const errors: Partial<Record<keyof typeof initialValues, string>> = {};
  if (!values.firstName) errors.firstName = "First name is required";
  if (!values.lastName) errors.lastName = "Last name is required";
  if (!values.email) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = "Invalid email";
  if (!values.terms) errors.terms = "You must agree to the terms";
  return errors;
}

// Helper function to create a synthetic event for checkboxes
function createCheckboxEvent(
  name: string,
  checked: boolean
): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, value: checked } as unknown as HTMLInputElement,
  } as ChangeEvent<HTMLInputElement>;
}

export default function ContactPage() {
  const {
    values,
    errors,
    loading,
    success,
    submitError,
    handleChange,
    handleSubmit,
  } = useFormHandler({
    initialValues,
    validate,
    onSubmit: async (vals) => {
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("Message sent!");
    },
  });

  // FAQ accordion state
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "What makes MindMaxED different from traditional therapy?",
      a: "MindMaxED focuses on brain fitness and proactive mental wellness rather than just addressing problems. Our AI-enhanced approach provides personalized insights and tracks your progress in real-time, helping you build lasting mental habits for peak performance.",
    },
    {
      q: "How does the AI enhancement work?",
      a: "Our AI system analyzes your progress patterns, identifies optimal coaching strategies for your unique needs, and provides personalized recommendations between sessions. It helps track your mental fitness journey and suggests specific exercises and techniques for maximum impact.",
    },
    {
      q: "What can I expect in my first session?",
      a: "Your first session includes a comprehensive brain fitness assessment, goal setting, and introduction to our methodology. We'll discuss your current challenges, establish baseline measurements, and create a personalized action plan for your transformation journey.",
    },
    {
      q: "Are sessions conducted online or in-person?",
      a: "We offer both online and in-person sessions to accommodate your preferences and schedule. Our secure online platform provides the same high-quality experience with full AI integration and progress tracking capabilities.",
    },
    {
      q: "How long does it take to see results?",
      a: "Most clients notice improvements in mental clarity and stress management within 2-3 sessions. Significant transformation typically occurs within 3-6 months of consistent coaching, with many achieving breakthrough results in their first month.",
    },
    {
      q: "Do you accept insurance?",
      a: "As a coaching service focused on performance enhancement rather than medical treatment, our services are typically not covered by insurance. However, we offer flexible payment plans and can provide receipts for HSA/FSA reimbursement where applicable.",
    },
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <section
        className="page-header"
        style={{ padding: "5rem 0 2rem 0", marginBottom: "2rem" }}
      >
        <div className="container">
          <div className="section-header">
            <h1 className="section-title" style={{ marginBottom: "1.5rem" }}>
              Contact MindMaxED
            </h1>
            <p
              className="section-subtitle"
              style={{ fontSize: "1.25rem", maxWidth: 600, margin: "0 auto" }}
            >
              Ready to transform your mind? Let&apos;s start your journey to
              mental fitness and peak performance.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Info & Form */}
      <section
        className="contact-section"
        id="contact-form"
        style={{ marginBottom: "4rem" }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {/* Contact Form */}
          <div
            className="contact-form-container"
            style={{
              width: "100%",
              maxWidth: 900,
              background: "rgba(99,102,241,0.04)",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              boxShadow: "0 2px 8px rgba(99,102,241,0.04)",
            }}
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    value={values.firstName}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstName && (
                    <div className="form-error">{errors.firstName}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    value={values.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <div className="form-error">{errors.lastName}</div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="form-error">{errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="coachingPlan" className="form-label">
                  Interested Coaching Plan
                </label>
                <select
                  id="coachingPlan"
                  name="coachingPlan"
                  className="form-select"
                  value={values.coachingPlan}
                  onChange={handleChange}
                >
                  <option value="">Select a plan</option>
                  <option value="transformation">
                    Transformation Program ($150/month)
                  </option>
                  <option value="consultation">Free Consultation</option>
                </select>
              </div>
              <div>
                <label htmlFor="challenges" className="form-label">
                  What challenges are you facing?
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  className="form-textarea"
                  rows={4}
                  value={values.challenges}
                  onChange={handleChange}
                  placeholder="Tell us about your current situation and what you'd like to achieve..."
                />
              </div>
              <div>
                <label htmlFor="goals" className="form-label">
                  What are your goals?
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  className="form-textarea"
                  rows={3}
                  value={values.goals}
                  onChange={handleChange}
                  placeholder="Describe what success looks like for you..."
                />
              </div>
              <div>
                <label htmlFor="timeline" className="form-label">
                  When would you like to start?
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className="form-select"
                  value={values.timeline}
                  onChange={handleChange}
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="within-week">Within a week</option>
                  <option value="within-month">Within a month</option>
                  <option value="just-exploring">Just exploring options</option>
                </select>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={values.newsletter}
                  onChange={(e) =>
                    handleChange(
                      createCheckboxEvent("newsletter", e.target.checked)
                    )
                  }
                />
                <label htmlFor="newsletter" className="checkbox-label">
                  Subscribe to our newsletter for brain fitness tips and
                  insights
                </label>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={values.terms}
                  onChange={(e) =>
                    handleChange(createCheckboxEvent("terms", e.target.checked))
                  }
                  required
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the{" "}
                  <a
                    href="/terms-of-service"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>{" "}
                  *
                </label>
                {errors.terms && (
                  <div className="form-error">{errors.terms}</div>
                )}
              </div>
              <button
                type="submit"
                className="cta-button large"
                disabled={loading}
                style={{ marginTop: "0.5rem" }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {submitError && <div className="form-error">{submitError}</div>}
              {success && (
                <div className="form-success">Message sent successfully!</div>
              )}
            </form>
          </div>
          {/* Contact Info Section BELOW the form */}
          <div
            className="contact-info"
            style={{ width: "100%", maxWidth: 700, marginTop: "2.5rem" }}
          >
            <h2
              className="section-title"
              style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
            >
              Get in Touch
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Choose the coaching plan that fits your needs, or reach out with
              questions about our AI-enhanced brain fitness approach.
            </p>
            <div
              className="contact-methods"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2.5rem",
                justifyContent: "center",
              }}
            >
              <div
                className="contact-method"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <span
                  className="icon"
                  style={{ fontSize: "1.5rem", color: "#6366f1" }}
                >
                  📧
                </span>
                <div>
                  <h3 className="method-title" style={{ fontWeight: 600 }}>
                    Email
                  </h3>
                  <a
                    href="mailto:hello@mindmaxed.com"
                    className="email-link"
                    style={{ color: "#6366f1", textDecoration: "underline" }}
                  >
                    hello@mindmaxed.com
                  </a>
                  <div
                    className="method-note"
                    style={{ color: "#6b7280", fontSize: "0.95rem" }}
                  >
                    We respond within 24 hours
                  </div>
                </div>
              </div>
              <div
                className="contact-method"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <span
                  className="icon"
                  style={{ fontSize: "1.5rem", color: "#6366f1" }}
                >
                  📞
                </span>
                <div>
                  <h3 className="method-title" style={{ fontWeight: 600 }}>
                    Phone
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className="phone-link"
                    style={{ color: "#6366f1", textDecoration: "underline" }}
                  >
                    +1 (234) 567-8900
                  </a>
                  <div
                    className="method-note"
                    style={{ color: "#6b7280", fontSize: "0.95rem" }}
                  >
                    Available 7 days a week
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="faq-section" style={{ marginBottom: "4rem" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Get answers to common questions about our AI-enhanced coaching
              approach.
            </p>
          </div>
          <div
            className="faq-container"
            style={{
              maxWidth: 800,
              margin: "0 auto",
              background: "rgba(99,102,241,0.04)",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              boxShadow: "0 2px 8px rgba(99,102,241,0.04)",
            }}
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="accordion-item"
                style={{
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "1rem",
                }}
              >
                <button
                  className="accordion-header"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    background: "none",
                    border: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#374151",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <h3
                    className="accordion-title"
                    style={{ margin: 0, fontSize: "0.95rem" }}
                  >
                    {faq.q}
                  </h3>
                  <span
                    className="accordion-icon"
                    style={{ fontSize: "1rem", color: "#6366f1" }}
                  >
                    {openIndex === i ? "▲" : "▼"}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="accordion-content">
                    <div
                      className="accordion-body"
                      style={{ color: "#6b7280", marginTop: "0.75rem" }}
                    >
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
