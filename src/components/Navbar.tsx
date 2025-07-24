import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiLotus } from "react-icons/gi";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const hasDeanOfZenSubscription =
    user?.publicMetadata?.hasDeanOfZenSubscription === true;

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Tabs for signed-in and signed-out users
  const signedOutLinks = [
    { href: "/#features", label: "Features", anchor: true },
    { href: "/#coaches", label: "Coaches", anchor: true },
    { href: "/#pricing", label: "Pricing", anchor: true },
    { href: "/#testimonials", label: "Testimonials", anchor: true },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/dean-of-zen", label: "Dean of Zen", anchor: false },
  ];

  // Always show Dean of Zen tab for signed-in users, but it will be locked if not subscribed
  const signedInLinks = [
    { href: "/#features", label: "Features", anchor: true },
    { href: "/#coaches", label: "Coaches", anchor: true },
    { href: "/#pricing", label: "Pricing", anchor: true },
    { href: "/#testimonials", label: "Testimonials", anchor: true },
    { href: "/dashboard", label: "Dashboard", anchor: false },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/dean-of-zen", label: "Dean of Zen", anchor: false },
  ];

  // Show all tabs if signed in, else only signedOutLinks
  const navLinks = isSignedIn ? signedInLinks : signedOutLinks;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/images/logo/mindmaxed-logo.svg"
                alt="MindMaxED AI"
                width={40}
                height={40}
              />
            </Link>
            <Link
              href="/"
              className="brand"
              style={{
                marginLeft: 8,
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
              }}
            >
              MindMaxED AI
            </Link>
          </div>
          {/* Desktop nav links (hidden on mobile) */}
          <div className="nav-links">
            {navLinks.map((link) => {
              if (link.label === "Dean of Zen") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link-zen${
                      pathname === link.href ? " active" : ""
                    }`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <GiLotus style={{ fontSize: 18, color: "#f59e0b" }} />
                    {link.label}
                  </Link>
                );
              }
              if (!isSignedIn && link.label === "Dashboard") {
                return null;
              }
              return link.anchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="nav-cta">
            {!isMobile &&
              (!isSignedIn ? (
                <>
                  <SignUpButton
                    mode="redirect"
                    signInForceRedirectUrl="/dashboard"
                  >
                    <button
                      className="cta-button primary"
                      style={{
                        transition: "transform 0.15s, box-shadow 0.15s",
                        boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
                        marginLeft: "1rem",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 8px 24px rgba(99,102,241,0.18)";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          "none";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 2px 8px rgba(99,102,241,0.08)";
                      }}
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                  <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                    <button
                      className="secondary-button"
                      style={{
                        border: "2px solid #6366f1",
                        color: "#6366f1",
                        background: "#fff",
                        marginLeft: "0.5rem",
                        transition:
                          "background 0.15s, color 0.15s, border 0.15s",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "#6366f1";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.border =
                          "2px solid #6366f1";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "#fff";
                        (e.currentTarget as HTMLElement).style.color =
                          "#6366f1";
                        (e.currentTarget as HTMLElement).style.border =
                          "2px solid #6366f1";
                      }}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </>
              ) : (
                <div
                  style={{
                    marginLeft: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <UserButton afterSignOutUrl="/" />
                </div>
              ))}
            <button
              className="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {/* Mobile menu overlay */}
        {isMobile && mobileMenuOpen && (
          <div
            className={`mobile-nav-menu active`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="mobile-nav-links"
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => {
                if (link.label === "Dean of Zen") {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`nav-link-zen${
                        pathname === link.href ? " active" : ""
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 24,
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <GiLotus style={{ fontSize: 24, color: "#f59e0b" }} />
                      {link.label}
                    </Link>
                  );
                }
                if (!isSignedIn && link.label === "Dashboard") {
                  return null;
                }
                return link.anchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                    style={{ fontSize: 22 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                    style={{ fontSize: 22 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div
                className="mobile-nav-cta"
                style={{
                  marginTop: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {!isSignedIn ? (
                  <>
                    <SignUpButton>
                      <button
                        className="cta-button primary"
                        style={{ width: 200, fontSize: 18 }}
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                    <SignInButton>
                      <button
                        className="secondary-button"
                        style={{ width: 200, fontSize: 18 }}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </>
                ) : (
                  <UserButton afterSignOutUrl="/" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
