"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ElevenLabsConvaiWidget from "../components/ElevenLabsConvaiWidget";

// Custom hook for pricing card interactivity
function usePricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const pricingRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Handle plan selection from URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get("plan");
    if (plan) {
      setSelectedPlan(plan);
      // Scroll to the selected plan
      const planIndex = ["discovery", "power", "transformation"].indexOf(plan);
      if (pricingRefs.current[planIndex]) {
        pricingRefs.current[planIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, []);

  // Handle CTA click
  const handleCTAClick = (plan: string, price: string) => {
    setSelectedPlan(plan);
    // Example: Track analytics event (replace with your tracking logic)
    // trackEvent('pricing_cta_click', { plan, price });
  };

  // Handle hover
  const handleHover = (index: number) => {
    if (pricingRefs.current[index]) {
      pricingRefs.current[index]!.style.transform = "scale(1.05)";
    }
  };
  const handleLeave = (index: number) => {
    if (pricingRefs.current[index]) {
      pricingRefs.current[index]!.style.transform = "scale(1)";
    }
  };

  return {
    selectedPlan,
    setSelectedPlan,
    pricingRefs,
    handleCTAClick,
    handleHover,
    handleLeave,
  };
}

// Custom hook for testimonial carousel
function useTestimonialCarousel(length: number, autoPlayInterval = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  useEffect(() => {
    if (length <= 1) return;
    if (isHoveredRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [length, autoPlayInterval]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, autoPlayInterval);
  };

  return { currentIndex, handleMouseEnter, handleMouseLeave };
}

export default function Home() {
  const {
    selectedPlan,
    pricingRefs,
    handleCTAClick,
    handleHover,
    handleLeave,
  } = usePricingCards();

  // Testimonial carousel logic
  const testimonials = [
    {
      text: "&quot;The AI insights helped me understand my patterns in ways I never could before.&quot;",
      author: "- Tech Executive",
    },
    {
      text: "&quot;Went from surviving to genuinely thriving in both personal and professional life.&quot;",
      author: "- Marketing Director",
    },
    {
      text: "&quot;The brain fitness approach is revolutionary. I wish I had found this years ago.&quot;",
      author: "- Healthcare Professional",
    },
  ];
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const { currentIndex, handleMouseEnter, handleMouseLeave } =
    useTestimonialCarousel(testimonials.length);

  // Update direction when carousel advances
  useEffect(() => {
    setDirection(1); // Always forward for auto-play; can be enhanced for manual navigation
  }, [currentIndex]);
  return (
    <main>
      {/* Navigation removed: now handled by layout/Navbar */}

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-background">
          <div className="grid-pattern"></div>
          <div className="gradient-overlay"></div>
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="hero-title">AI-Powered Brain Fitness Coaching</h1>
          <p className="hero-subtitle">
            Transform your mind from surviving to thriving. Our AI-enhanced
            coaching helps high-achievers process life through power &
            potential, not pain & past.
          </p>
          <div
            className="hero-cta-group"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="/dean-of-zen"
              className="cta-button primary"
              style={{
                transition: "transform 0.15s, box-shadow 0.15s",
                boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 24px rgba(99,102,241,0.18)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px rgba(99,102,241,0.08)";
              }}
            >
              Get Dean of Zen
            </Link>
            <Link
              href="/about"
              className="secondary-button"
              style={{
                border: "2px solid #6366f1",
                color: "#6366f1",
                background: "#fff",
                transition: "background 0.15s, color 0.15s, border 0.15s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#6366f1";
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.border =
                  "2px solid #6366f1";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.color = "#6366f1";
                (e.currentTarget as HTMLElement).style.border =
                  "2px solid #6366f1";
              }}
            >
              Learn More
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Clients Transformed</div>
            </div>
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ElevenLabs Widget Section */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
      >
        <div style={{ maxWidth: 480, width: "100%" }}>
          <ElevenLabsConvaiWidget />
        </div>
      </div>

      {/* AI Features Section */}
      <section className="ai-features" id="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Revolutionary AI-Enhanced Coaching
            </h2>
            <p className="section-subtitle">
              Combining clinical expertise with cutting-edge AI to accelerate
              your transformation journey.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Image
                  src="/assets/images/icons/brain_icon.svg"
                  alt="Brain Fitness"
                  width={48}
                  height={48}
                />
              </div>
              <h3>Brain Fitness Training</h3>
              <p>
                Science-backed methods to retrain your mind for resilience,
                clarity, and peak performance in all areas of life.
              </p>
              <ul className="feature-benefits">
                <li>Neuroplasticity-based exercises</li>
                <li>Cognitive behavioral techniques</li>
                <li>Mindfulness integration</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Image
                  src="/assets/images/icons/ai_icon.svg"
                  alt="AI Enhancement"
                  width={48}
                  height={48}
                />
              </div>
              <h3>AI-Enhanced Sessions</h3>
              <p>
                Personalized coaching powered by AI insights, tracking your
                progress and optimizing your mental fitness journey.
              </p>
              <ul className="feature-benefits">
                <li>Real-time progress analytics</li>
                <li>Personalized recommendations</li>
                <li>Predictive wellness insights</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Image
                  src="/assets/images/icons/growth_icon.svg"
                  alt="Sustainable Growth"
                  width={48}
                  height={48}
                />
              </div>
              <h3>Sustainable Growth</h3>
              <p>
                Build lasting mental habits that help you thrive professionally,
                personally, and emotionally for years to come.
              </p>
              <ul className="feature-benefits">
                <li>Long-term habit formation</li>
                <li>Continuous support system</li>
                <li>Scalable life strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="coaches" id="coaches">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Your Expert Coaches</h2>
            <p className="section-subtitle">
              Licensed professionals combining clinical expertise with
              AI-powered insights for maximum impact.
            </p>
          </div>
          <div className="coaches-grid">
            {/* Coach 1 */}
            <div className="coach-card">
              <div className="coach-image">
                <Image
                  src="/assets/images/coaches/dustin.jpg"
                  alt="Dustin Dean, PMHNP-BC"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="coach-content">
                <h3 className="coach-name">Dustin Dean, PMHNP-BC</h3>
                <p className="coach-title">
                  &quot;The Dean of Zen&quot; | Transformational Coach
                </p>
                <p className="coach-description">
                  Nationally certified Psychiatric-Mental Health Nurse
                  Practitioner with 20+ years of experience. Dustin specializes
                  in brain fitness training that helps high-achievers break
                  through mental barriers and unlock their next level of
                  potential.
                </p>
                <div className="coach-credentials">
                  <span className="credential">PMHNP-BC Certified</span>
                  <span className="credential">20+ Years Experience</span>
                  <span className="credential">500+ Clients Transformed</span>
                </div>
              </div>
            </div>
            {/* Coach 2 */}
            <div className="coach-card">
              <div className="coach-image">
                <Image
                  src="/assets/images/coaches/rashida.jpg"
                  alt="Rashida Dean"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="coach-content">
                <h3 className="coach-name">Rashida Dean</h3>
                <p className="coach-title">
                  Life Coach &amp; Women&apos;s Empowerment Strategist
                </p>
                <p className="coach-description">
                  15+ years of experience coaching individuals and families
                  toward greater purpose and growth. Rashida specializes in
                  helping women and minority mothers navigate complex life
                  transitions with confidence and clarity.
                </p>
                <div className="coach-credentials">
                  <span className="credential">Certified Life Coach</span>
                  <span className="credential">15+ Years Experience</span>
                  <span className="credential">Cultural Liaison Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Transformation Plan</h2>
            <p className="section-subtitle">
              Investment options designed to fit your schedule and commitment
              level.
            </p>
          </div>
          <div className="pricing-grid">
            {/* Dean of Zen Card */}
            <div
              className="pricing-card"
              data-animate="fade-in"
              data-aos-delay="100"
            >
              <div className="pricing-header">
                <h3>Dean of Zen</h3>
                <div className="pricing-price">
                  <span className="currency">$</span>
                  <span className="amount">50</span>
                </div>
                <p className="pricing-period">per month</p>
              </div>
              <div className="pricing-description">
                <p>
                  Affordable monthly access to focused, practical support for
                  stress reduction and mental fitness.
                </p>
              </div>
              <ul className="pricing-features">
                <li>Quick solution focused-supports</li>
                <li>Techniques for reducing stress</li>
                <li>Breathing techniques</li>
                <li>Pre-coaching assessment</li>
              </ul>
              <Link
                href="/dean-of-zen"
                className="pricing-cta primary"
                style={{
                  width: "100%",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Get Dean of Zen
              </Link>
            </div>
            {/* Transformation Program Card */}
            <div
              className="pricing-card featured"
              data-animate="fade-in"
              data-aos-delay="300"
            >
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Transformation Program</h3>
                <div className="pricing-price">
                  <span className="currency">$</span>
                  <span className="amount">750</span>
                </div>
                <p className="pricing-period">per month</p>
              </div>
              <div className="pricing-description">
                <p>
                  Our flagship program for comprehensive, ongoing transformation
                  with AI-powered insights.
                </p>
              </div>
              <ul className="pricing-features">
                <li>Weekly 1-hour coaching sessions</li>
                <li>24/7 AI coaching support</li>
                <li>Personalized brain fitness plan</li>
                <li>Progress analytics dashboard</li>
                <li>Emergency support access</li>
                <li>Monthly goal reviews</li>
                <li>Community access</li>
                <li>Resource library</li>
              </ul>
              <Link
                href="/contact?plan=transformation"
                className="pricing-cta primary"
              >
                Start Transformation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-subtitle">
              Real transformations from real people who chose to thrive.
            </p>
          </div>
          <div className="testimonials-grid grid md:grid-cols-2 ">
            {/* Featured Testimonial */}
            <div className="testimonial-card featured" data-aos="fade-up">
              <div className="testimonial-content mb-4">
                <div className="stars text-yellow-400 text-xl mb-2">★★★★★</div>
                <p className="testimonial-text text-gray-700 mb-4">
                  &quot;As a medical doctor, I&apos;ve been familiar with
                  traditional mental health approaches, but Dustin Dean&apos;s
                  brain-fitness approach is truly unique. He provided constant
                  support, offering skills and encouragement whenever I
                  struggled. This client-focused, solution-based practice has
                  changed my life and probably saved it. For the first time, I
                  feel genuinely heard and understood, which has led to tangible
                  mental wellness results.&quot;
                </p>
                <div className="testimonial-author">
                  <div className="author-name font-semibold">Dr. Sarah M.</div>
                  <div className="author-title text-gray-500">
                    Medical Doctor
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonials Carousel (Mini Testimonials) */}
            <div>
              <div className="testimonials-carousel">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="testimonial-mini active">
                    <p dangerouslySetInnerHTML={{ __html: t.text }} />
                    <cite>{t.author}</cite>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta" id="contact">
        <div className="container ">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Mind?
            </h2>
            <p className="">
              Join 1,200+ high-achievers who&apos;ve chosen to thrive rather
              than just survive. <br />
              Your journey to mental fitness starts with a single step.
            </p>
            <div className="cta-actions flex flex-col md:flex-row gap-4 justify-center mb-4">
              <Link
                href="/contact"
                className="cta-button primary bg-blue-600 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition large"
              >
                Schedule Your Session Today
              </Link>
              <Link
                href="/about"
                className="secondary-button large bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded text-lg font-semibold hover:bg-blue-50 transition"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="contact-info text-gray-600 mt-4">
              <p>
                Questions? Email us at{" "}
                <a
                  href="mailto:hello@mindmaxed.com"
                  className="text-blue-600 underline"
                >
                  hello@mindmaxed.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
