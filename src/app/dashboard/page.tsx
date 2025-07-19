const instrumentData = [
  {
    label: "Total Calls",
    value: 42,
    percent: 80, // sample percent for the circle
    icon: "/assets/images/icons/phone_icon.svg",
  },
  {
    label: "Avg. Call Duration",
    value: "12m",
    percent: 60, // sample percent for the circle
    icon: "/assets/images/icons/timer_icon.svg",
  },
];

const callHistory = [
  {
    id: 1,
    date: "2024-07-15",
    time: "10:30 AM",
    summary:
      "Discussed progress on brain fitness goals and set new weekly targets.",
  },
  {
    id: 2,
    date: "2024-07-12",
    time: "2:00 PM",
    summary: "Reviewed last session, addressed stress management techniques.",
  },
  {
    id: 3,
    date: "2024-07-08",
    time: "4:15 PM",
    summary: "Initial consultation and baseline assessment.",
  },
];

function CircularChart({
  percent,
  value,
}: {
  percent: number;
  value: string | number;
}) {
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 120,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          marginBottom: 12,
        }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#23244a"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#6366f1"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#a5b4fc",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div
      className="dashboard-page"
      style={{ position: "relative", minHeight: "80vh", padding: "3rem 0" }}
    >
      <div className="hero-background">
        <div className="grid-pattern"></div>
        <div className="gradient-overlay"></div>
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Instrument Cluster */}
        <div
          className="instrument-cluster"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          {instrumentData.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(24,25,42,0.98)",
                borderRadius: "1.25rem",
                padding: "2rem 1.5rem",
                boxShadow: "0 4px 24px rgba(20,20,30,0.22)",
                border: "1px solid #18192a",
                minWidth: 0,
              }}
            >
              <CircularChart percent={item.percent} value={item.value} />
              <div
                style={{
                  color: "#c7d2fe",
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  marginTop: 2,
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        {/* Call History & Summaries */}
        <section
          className="call-history-section"
          style={{
            background: "rgba(30,32,60,0.92)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 16px rgba(30,32,60,0.18)",
            border: "1px solid #23244a",
          }}
        >
          <h2
            className="section-title"
            style={{
              fontSize: "1.5rem",
              marginBottom: "2rem",
              textAlign: "center",
              fontWeight: 700,
              color: "#a5b4fc",
              letterSpacing: "-0.5px",
            }}
          >
            Call History & Summaries
          </h2>
          <div
            className="call-history-list"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {callHistory.map((call) => (
              <div
                key={call.id}
                className="call-history-card"
                style={{
                  background: "rgba(24,25,42,0.99)",
                  borderRadius: "1rem",
                  padding: "1.05rem 1.1rem",
                  boxShadow: "0 1px 8px rgba(20,20,30,0.18)",
                  border: "1px solid #18192a",
                  backdropFilter: "blur(1.5px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#a5b4fc",
                      fontSize: "0.98rem",
                    }}
                  >
                    {call.date} &bull; {call.time}
                  </div>
                  <button
                    className="secondary-button"
                    style={{
                      fontSize: "0.89rem",
                      padding: "0.38rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      background: "rgba(99,102,241,0.13)",
                      border: "1px solid #3730a3",
                      color: "#a5b4fc",
                    }}
                  >
                    View Details
                  </button>
                </div>
                <div
                  style={{
                    color: "#e0e7ff",
                    fontSize: "0.97rem",
                    lineHeight: 1.5,
                  }}
                >
                  {call.summary}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
