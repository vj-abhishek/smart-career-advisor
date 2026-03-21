import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🎯", title: "Precision Matching", desc: "Random Forest, KNN & SVM ensemble delivers highly accurate career predictions tailored to your profile.", color: "#2563eb" },
  { icon: "🔬", title: "Skill Gap Analysis", desc: "Identifies exact competency gaps between your current skills and target career requirements.", color: "#0ea5e9" },
  { icon: "🗺️", title: "Learning Roadmaps", desc: "Step-by-step personalized paths with curated courses, certifications and hands-on projects.", color: "#4f46e5" },
  { icon: "⚡", title: "Instant Results", desc: "Get your complete career report in under 5 minutes. No appointments, no waiting.", color: "#10b981" },
];

const STATS = [
  { value: "10+", label: "Career Paths" },
  { value: "3", label: "ML Models" },
  { value: "95%", label: "Accuracy" },
  { value: "5 min", label: "To Results" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Enter Your Profile", desc: "Share your education, CGPA and academic background." },
  { step: "02", title: "Rate Your Skills", desc: "Self-assess 10 core technical and soft skills." },
  { step: "03", title: "Select Interests", desc: "Pick domains and activities that excite you." },
  { step: "04", title: "Aptitude Scores", desc: "Input logical, verbal and quantitative scores." },
  { step: "05", title: "Get Your Report", desc: "Receive ML-powered career recommendations instantly." },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Navbar */}
      <nav className="relative z-10 sticky top-0" style={{ background: "rgba(240,244,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(37,99,235,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
              🧭
            </div>
            <div>
              <span className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Career<span style={{ color: "var(--accent-blue)" }}>IQ</span>
              </span>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Smart Career Advisor using ML</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>R.V.R. & J.C. College of Engineering</span>
            <button onClick={() => navigate("/assessment")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(37,99,235,0.3)"; }}>
              Start Free →
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="py-20 md:py-28 text-center">
          <div className="animate-fade-up mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)", color: "var(--accent-blue)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-blue)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              Powered by Random Forest · KNN · SVM
            </div>
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}>
            Find Your <span className="shimmer-text">Perfect Career</span>
            <br />with Machine Learning
          </h1>

          <p className="animate-fade-up delay-200 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}>
            Our ML ensemble analyzes your skills, interests and aptitude to deliver
            personalized career recommendations with a complete skill gap roadmap.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => navigate("/assessment")}
              className="px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", boxShadow: "0 8px 32px rgba(37,99,235,0.35)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(37,99,235,0.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,99,235,0.35)"; }}>
              🚀 Take the Assessment — Free
            </button>
            <button className="px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
              style={{ background: "white", color: "var(--accent-blue)", border: "1.5px solid rgba(37,99,235,0.2)", boxShadow: "var(--shadow-md)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Learn How It Works ↓
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl text-center transition-all duration-200"
                style={{ background: "white", border: "1px solid rgba(37,99,235,0.1)", boxShadow: "var(--shadow-sm)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: "var(--accent-blue)" }}>{stat.value}</div>
                <div className="text-xs font-medium mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Why CareerIQ?
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>Data-driven career guidance built on real ML models</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="gradient-border p-6 transition-all duration-300 cursor-default animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              How It Works
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>5 simple steps to your personalized career report</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                {i < 4 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.3), transparent)" }} />
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold font-display mx-auto mb-3 transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                  {step.step}
                </div>
                <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{step.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 mb-8">
          <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 20px 60px rgba(37,99,235,0.35)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: "white", filter: "blur(40px)", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: "white", filter: "blur(30px)", transform: "translate(-30%, 30%)" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                Ready to discover your ideal career?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">Takes less than 5 minutes. No signup required.</p>
              <button onClick={() => navigate("/assessment")}
                className="px-10 py-4 rounded-2xl text-base font-bold transition-all duration-200"
                style={{ background: "white", color: "var(--accent-blue)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}>
                Begin Assessment →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center text-sm"
        style={{ borderColor: "rgba(37,99,235,0.1)", color: "var(--text-muted)" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>🧭</div>
          <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>CareerIQ</span>
        </div>
        Smart Career Advisor using ML · R.V.R. & J.C. College of Engineering
        <br />U. Trivikram · V. Joshua Abhishek · V. Venkata Lakshmi Narasimha
      </footer>
    </div>
  );
}
