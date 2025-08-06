"use client";

import { PricingTable } from "@clerk/nextjs";
import { Brain, Coffee, Sparkles, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ElevenLabsHomepageWidget from "../components/ElevenLabsHomepageWidget";

// Custom hook for pricing card interactivity
function usePricingCards() {
  // const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  // const pricingRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Handle plan selection from URL
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const plan = urlParams.get("plan");
  //   if (plan) {
  //     setSelectedPlan(plan);
  //     // Scroll to the selected plan
  //     const planIndex = ["discovery", "power", "transformation"].indexOf(plan);
  //     if (pricingRefs.current[planIndex]) {
  //       pricingRefs.current[planIndex]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }
  //   }
  // }, []);

  // Handle CTA click
  // const handleCTAClick = (plan: string) => {
  //   setSelectedPlan(plan);
  //   // Example: Track analytics event (replace with your tracking logic)
  //   // trackEvent('pricing_cta_click', { plan });
  // };

  // Handle hover
  // const handleHover = (index: number) => {
  //   if (pricingRefs.current[index]) {
  //     pricingRefs.current[index]!.style.transform = "scale(1.05)";
  //   }
  // };
  // const handleLeave = (index: number) => {
  //   if (pricingRefs.current[index]) {
  //     pricingRefs.current[index]!.style.transform = "scale(1)";
  //   }
  // };

  return {
    // selectedPlan,
    // setSelectedPlan,
    // pricingRefs,
    // handleCTAClick,
    // handleHover,
    // handleLeave,
  };
}

// Custom hook for testimonial carousel
// function useTestimonialCarousel(length: number, autoPlayInterval = 4000) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const isHoveredRef = useRef(false);

//   useEffect(() => {
//     if (length <= 1) return;
//     if (isHoveredRef.current) return;

//     const startTimer = () => {
//       timerRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % length);
//       }, autoPlayInterval);
//     };

//     startTimer();

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [length, autoPlayInterval]);

//   const handleMouseEnter = useCallback(() => {
//     isHoveredRef.current = true;
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     isHoveredRef.current = false;
//     if (!timerRef.current) {
//       timerRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % length);
//       }, autoPlayInterval);
//     }
//   }, [length, autoPlayInterval]);

//   return {
//     currentIndex,
//     handleMouseEnter,
//     handleMouseLeave
//   };
// }

export default function Home() {
  const {
    // selectedPlan,
    // pricingRefs,
    // handleCTAClick,
    // handleHover,
    // handleLeave,
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
  // const { currentIndex, handleMouseEnter, handleMouseLeave } =
  //   useTestimonialCarousel(testimonials.length);

  // Scroll Up Button logic
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback(() => {
    // Show button if scrolled more than 1 viewport height
    setShowScrollUp(window.scrollY > window.innerHeight * 0.8);
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* Navigation removed: now handled by layout/Navbar */}

      {/* Hero Section */}
      <ElevenLabsHomepageWidget />

      <section className="hero" id="hero">
        <div className="hero-background">
          <div className="grid-pattern"></div>
          <div className="gradient-overlay"></div>
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="hero-title">AI-Powered Brain Fitness Coaching</h1>
          <div
            className="hero-subtitle"
            style={{
              marginTop: "5rem",
              marginBottom: "2rem",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${carouselIndex * 100}%)`,
                }}
              >
                <div
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <Zap size={16} color="#6366f1" style={{ flexShrink: 0 }} />
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    Get real answers in 60 seconds—no waiting, no spiraling.
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <Brain size={16} color="#6366f1" style={{ flexShrink: 0 }} />
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    Exclusive coaching powered by Dustin Dean&apos;s Brain
                    Fitness system.
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <Coffee size={16} color="#6366f1" style={{ flexShrink: 0 }} />
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    24/7 mental fitness for less than a daily coffee.
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <Target size={16} color="#6366f1" style={{ flexShrink: 0 }} />
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    Shift from chaos to control—focus on what you can change.
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <Sparkles
                    size={16}
                    color="#6366f1"
                    style={{ flexShrink: 0 }}
                  />
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    Turn stress into clarity, fast.
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      border: "none",
                      background:
                        carouselIndex === index ? "#6366f1" : "#d1d5db",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

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
            <Image
              src="/hero_1.png"
              alt="Hero Step 1"
              width={300}
              height={0}
              style={{
                width: "300px",
                height: "auto",
                borderRadius: "1.25rem",
                boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
              }}
              priority
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "2rem",
                color: "#6366f1",
                fontWeight: "bold",
              }}
            >
              →
            </div>
            <Image
              src="/hero_2.png"
              alt="Hero Step 2"
              width={300}
              height={0}
              style={{
                width: "300px",
                height: "auto",
                borderRadius: "1.25rem",
                boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
              }}
              priority
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "2rem",
                color: "#6366f1",
                fontWeight: "bold",
              }}
            >
              →
            </div>
            <Image
              src="/hero_3.png"
              alt="Hero Step 3"
              width={300}
              height={0}
              style={{
                width: "300px",
                height: "auto",
                borderRadius: "1.25rem",
                boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
              }}
              priority
            />
          </div>
        </div>
      </section>
      {/* Dean of Zen AI Workflow Image */}

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
              <div
                className="feature-image-fade"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/brain_fitness.png"
                  alt="Brain Fitness"
                  width={150}
                  height={150}
                  style={{ display: "block" }}
                />
              </div>
              <h3 style={{ marginTop: "1.5rem" }}>Brain Fitness Training</h3>
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
              <div
                className="feature-image-fade"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/ai_enhanced.png"
                  alt="AI Enhancement"
                  width={150}
                  height={150}
                  style={{ display: "block" }}
                />
              </div>
              <h3 style={{ marginTop: "1.5rem" }}>AI-Enhanced Sessions</h3>
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
              <div
                className="feature-image-fade"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/sustainable_growth.png"
                  alt="Sustainable Growth"
                  width={150}
                  height={150}
                  style={{ display: "block" }}
                />
              </div>
              <h3 style={{ marginTop: "1.5rem" }}>Sustainable Growth</h3>
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

          {/* Video Section */}
          <div
            className="video-section"
            style={{ marginTop: "4rem", textAlign: "center" }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              The Importance of Brain Fitness
            </h3>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <video
                controls
                preload="metadata"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              >
                <source
                  src="https://fdzkwopw15m9bnnq.public.blob.vercel-storage.com/Video_1.mov"
                  type="video/quicktime"
                />
                <source
                  src="https://fdzkwopw15m9bnnq.public.blob.vercel-storage.com/Video_1.mov"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
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
                pricingTableCardBody: {
                  background: "rgba(255, 255, 255, 0.05)",
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
          <div
            className="testimonials-grid"
            data-testid="testimonials-grid-wrapper"
          >
            {/* Featured Testimonial */}
            <div className="testimonial-card featured" data-aos="fade-up">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">
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
                  <div className="author-name">Dr. Sarah M.</div>
                  <div className="author-title">Medical Doctor</div>
                </div>
              </div>
            </div>
            {/* Testimonials Carousel (Mini Testimonials) */}
            <div className="testimonials-carousel-container">
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
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="cta-title">Ready to Transform Your Mind?</h2>
            <p className="cta-subtitle">
              Join 1,200+ high-achievers who&apos;ve chosen to thrive rather
              than just survive. <br />
              Your journey to mental fitness starts with a single step.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="cta-button primary large">
                Schedule Your Session Today
              </Link>
              <Link href="/about" className="secondary-button large">
                Learn More About Us
              </Link>
            </div>
            <div className="contact-info">
              <p>
                Questions? Email us at{" "}
                <a href="mailto:hello@mindmaxed.com" className="contact-link">
                  hello@mindmaxed.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Up Button */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: isMobile ? "calc(2rem + 125px)" : "2rem",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <button
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          style={{
            opacity: showScrollUp ? 1 : 0,
            transform: showScrollUp ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s, transform 0.4s",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "2.2rem",
            height: "2.2rem",
            boxShadow: "0 2px 12px rgba(99,102,241,0.18)",
            cursor: showScrollUp ? "pointer" : "default",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: showScrollUp ? "auto" : "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#4f46e5")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#6366f1")}
        >
          ↑
        </button>
      </div>
    </main>
  );
}
