import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { predictCareers, AssessmentData, CareerResult, SkillGap } from "../lib/careerEngine";

function MatchRing({ match, color }: { match: number; color: string }) {
  const r = 44; const circ = 2 * Math.PI * r;
  const [anim, setAnim] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnim(match), 400); return () => clearTimeout(t); }, [match]);
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="104" height="104" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="52" cy="52" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle cx="52" cy="52" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (anim/100)*circ}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-display font-extrabold" style={{ color }}>{anim}%</div>
        <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>match</div>
      </div>
    </div>
  );
}

function SkillGapBar({ gap }: { gap: SkillGap }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const pc = { High:"#f43f5e", Medium:"#f59e0b", Low:"#10b981" }[gap.priority];
  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{gap.skill}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: `${pc}12`, color: pc }}>{gap.priority}</span>
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {gap.current} → <strong style={{ color: "var(--accent-blue)" }}>{gap.required}</strong>/10
        </span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: "#f1f5f9" }}>
        <div className="absolute top-0 bottom-0 w-0.5 rounded-full z-10"
          style={{ left: `${gap.required*10}%`, background: "rgba(0,0,0,0.1)" }} />
        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
          style={{ width: animated ? `${gap.current*10}%` : "0%", background: `linear-gradient(90deg,${pc},${pc}88)` }} />
      </div>
      <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>+{gap.required - gap.current} points needed</div>
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<CareerResult[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<AssessmentData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = ["Normalizing skill vectors...","Applying feature selection...","Running RF + KNN + SVM ensemble...","Generating skill gap report...","Preparing your results..."];

  useEffect(() => {
    const raw = sessionStorage.getItem("careerData");
    if (!raw) { navigate("/assessment"); return; }
    const data: AssessmentData = JSON.parse(raw);
    setUserData(data);
    const intervals: NodeJS.Timeout[] = [];
    loadingSteps.forEach((_, i) => {
      intervals.push(setTimeout(() => setLoadingStep(i), i * 400));
    });
    const t = setTimeout(async () => {
      const r = await predictCareers(data);
      setResults(r); setLoading(false);
    }, 2400);
    return () => { clearTimeout(t); intervals.forEach(clearTimeout); };
  }, [navigate]);

  const career = results[selected];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
      <div className="text-center max-w-sm mx-auto px-6 animate-fade-in">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="w-20 h-20 rounded-full border-4 animate-spin"
            style={{ borderColor: "rgba(37,99,235,0.15)", borderTopColor: "var(--accent-blue)" }} />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🧠</div>
        </div>
        <h2 className="text-2xl font-display font-bold mb-2" style={{ color: "var(--text-primary)" }}>Analyzing Your Profile</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Running ML ensemble on your data...</p>
        <div className="space-y-2">
          {loadingSteps.map((msg, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-300"
              style={{
                background: i <= loadingStep ? "rgba(37,99,235,0.06)" : "transparent",
                color: i <= loadingStep ? "var(--text-primary)" : "var(--text-muted)",
                border: i <= loadingStep ? "1px solid rgba(37,99,235,0.1)" : "1px solid transparent",
              }}>
              <span style={{ color: i <= loadingStep ? "var(--accent-blue)" : "var(--text-muted)" }}>
                {i < loadingStep ? "✓" : i === loadingStep ? "▶" : "○"}
              </span>
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 sticky top-0" style={{ background: "rgba(240,244,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(37,99,235,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent-blue)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
            ← CareerIQ
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm hidden md:block" style={{ color: "var(--text-muted)" }}>{userData?.name}'s Career Report</span>
            <button onClick={() => navigate("/assessment")}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "rgba(37,99,235,0.08)", color: "var(--accent-blue)", border: "1px solid rgba(37,99,235,0.15)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.08)"; }}>
              Retake
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="text-center py-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
            ✓ Analysis Complete · {results.length} Career Matches Found
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Your Career Recommendations
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Powered by Random Forest · KNN · SVM ensemble</p>
        </div>

        {/* Career selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {results.map((r, i) => (
            <button key={r.title} onClick={() => setSelected(i)}
              className="p-4 rounded-2xl text-left transition-all duration-200"
              style={{
                background: selected === i ? "white" : "white",
                border: `2px solid ${selected === i ? r.color : "#f1f5f9"}`,
                boxShadow: selected === i ? `0 8px 32px ${r.color}20` : "var(--shadow-sm)",
                transform: selected === i ? "translateY(-3px)" : "none",
              }}>
              <div className="text-2xl mb-2">{r.icon}</div>
              <div className="text-xs font-bold mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>{r.title}</div>
              <div className="text-lg font-display font-extrabold" style={{ color: r.color }}>{r.match}%</div>
              {i === 0 && <div className="text-xs font-semibold mt-1" style={{ color: "#10b981" }}>★ Best Match</div>}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {career && (
          <div className="grid lg:grid-cols-3 gap-5 animate-fade-in">
            {/* Career overview */}
            <div className="space-y-4">
              <div className="rounded-2xl p-6" style={{ background: "white", border: `2px solid ${career.color}20`, boxShadow: "var(--shadow-md)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${career.color}12` }}>{career.icon}</div>
                  <div>
                    <h2 className="text-lg font-display font-bold" style={{ color: "var(--text-primary)" }}>{career.title}</h2>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>via {career.model}</div>
                  </div>
                </div>

                <div className="flex justify-center mb-5">
                  <MatchRing match={career.match} color={career.color} />
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{career.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "Avg Salary", value: career.avgSalary, color: "#2563eb" },
                    { label: "Job Growth", value: career.growthRate, color: "#10b981" },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-xl text-center"
                      style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
                      <div className="text-sm font-bold" style={{ color: item.color }}>{item.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Core Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map(s => (
                      <span key={s} className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{ background: `${career.color}10`, color: career.color, border: `1px solid ${career.color}20` }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Model scores */}
              <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "var(--shadow-sm)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>ML Model Confidence</div>
                {[
                  { label: "Random Forest", score: career.modelScores?.["Random Forest"] ?? (career.model === "Random Forest" ? career.match : Math.round(career.match * 0.88)) },
                  { label: "KNN", score: career.modelScores?.["KNN"] ?? (career.model === "KNN" ? career.match : Math.round(career.match * 0.81)) },
                  { label: "SVM", score: career.modelScores?.["SVM"] ?? (career.model === "SVM" ? career.match : Math.round(career.match * 0.84)) },
                ].map(m => (
                  <div key={m.label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "var(--text-secondary)", fontWeight: m.label === career.model ? 700 : 400 }}>{m.label}{m.label === career.model ? " ★" : ""}</span>
                      <span style={{ color: m.label === career.model ? "var(--accent-blue)" : "var(--text-muted)" }}>{m.score}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "#f1f5f9" }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${m.score}%`, background: m.label === career.model ? "linear-gradient(90deg,#2563eb,#0ea5e9)" : "#cbd5e1" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill gap analysis */}
            <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "var(--shadow-md)" }}>
              <h3 className="text-base font-display font-bold mb-1" style={{ color: "var(--text-primary)" }}>Skill Gap Analysis</h3>
              <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Gaps between your skills and career requirements</p>

              {career.skillGaps.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🎉</div>
                  <div className="text-base font-bold mb-1" style={{ color: "#10b981" }}>No significant gaps!</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>Your profile is well-aligned for this career.</div>
                </div>
              ) : (
                <>
                  {career.skillGaps.map(gap => <SkillGapBar key={gap.skill} gap={gap} />)}
                  <div className="mt-4 p-3 rounded-xl text-xs flex gap-4"
                    style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.1)" }}>
                    <span style={{ color: "#f43f5e" }}>🔴 {career.skillGaps.filter(g => g.priority === "High").length} High</span>
                    <span style={{ color: "#f59e0b" }}>🟡 {career.skillGaps.filter(g => g.priority === "Medium").length} Medium</span>
                    <span style={{ color: "#10b981" }}>🟢 {career.skillGaps.filter(g => g.priority === "Low").length} Low</span>
                  </div>
                </>
              )}

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Your Top Strengths</div>
                {userData && Object.entries(userData.skills).sort((a,b) => b[1]-a[1]).slice(0,5).map(([k,v]) => (
                  <div key={k} className="flex items-center gap-3 mb-2">
                    <div className="text-xs min-w-[120px] font-medium" style={{ color: "var(--text-secondary)" }}>
                      {k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}
                    </div>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "#f1f5f9" }}>
                      <div className="h-full rounded-full" style={{ width: `${v*10}%`, background: "linear-gradient(90deg,#10b981,#059669)" }} />
                    </div>
                    <div className="text-xs font-bold min-w-[16px]" style={{ color: "#10b981" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning roadmap */}
            <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "var(--shadow-md)" }}>
              <h3 className="text-base font-display font-bold mb-1" style={{ color: "var(--text-primary)" }}>Learning Roadmap</h3>
              <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Personalized path to close your skill gaps</p>

              <div className="space-y-3">
                {career.learningPath.map((res, i) => {
                  const typeIcon = { Course:"📘",Certification:"🏆",Project:"⚙️",Book:"📚" }[res.type] || "📌";
                  const typeColor = { Course:"#0ea5e9",Certification:"#f59e0b",Project:"#10b981",Book:"#a78bfa" }[res.type] || "#8b8fa8";
                  return (
                    <div key={res.title} className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200"
                      style={{ background: "#f8fafc", border: "1.5px solid #f1f5f9" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)"; (e.currentTarget as HTMLElement).style.background = "white"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9"; (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: `${typeColor}12` }}>{typeIcon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>{res.title}</div>
                        <div className="flex items-center gap-2 text-xs">
                          <span style={{ color: "var(--text-secondary)" }}>{res.platform}</span>
                          <span style={{ color: "var(--text-muted)" }}>· {res.duration}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-semibold shrink-0"
                        style={{ background: `${typeColor}12`, color: typeColor }}>{res.type}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.1)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent-blue)" }}>Action Plan</div>
                <ol className="text-xs space-y-1.5" style={{ color: "var(--text-secondary)" }}>
                  <li>1. Fix <strong style={{ color: "var(--text-primary)" }}>High priority</strong> skill gaps first</li>
                  <li>2. Complete first certification within 3 months</li>
                  <li>3. Build 2+ portfolio projects</li>
                  <li>4. Apply for internships / entry-level roles</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 rounded-2xl text-center text-xs"
          style={{ background: "white", border: "1px solid #f1f5f9", color: "var(--text-muted)" }}>
          Predictions by ML ensemble (Random Forest + KNN + SVM). For guidance purposes only.
          <br />Smart Career Advisor using ML · R.V.R. & J.C. College of Engineering
        </div>
      </div>
    </div>
  );
}
