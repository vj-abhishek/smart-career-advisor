import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentData } from "../lib/careerEngine";

const TOTAL_STEPS = 5;

const INTEREST_OPTIONS = [
  "Web Development","Mobile Apps","AI/ML","Cybersecurity","Data Analysis",
  "Cloud","UI/UX Design","Business","Research","Networking","DevOps",
  "Open Source","Leadership Roles","Arts/Music","Management",
];

const EXTRACURRICULAR_OPTIONS = [
  "Hackathons","Open Source Contributions","Sports / Athletics","Arts & Music",
  "Student Leadership","Volunteering / NGO Work","Research Projects",
  "Competitive Programming","Internships","Freelancing","Blog / Content Creation",
];

const defaultData: AssessmentData = {
  name: "", degreeLevel: "", field: "", cgpa: 7.0,
  skills: { programming:5,mathematics:5,communication:5,problemSolving:5,creativity:5,leadership:5,analyticalThinking:5,teamwork:5,dataAnalysis:5,networking:5 },
  interests: [], extracurricular: [],
  aptitude: { logical:60,verbal:60,quantitative:60 },
};

const SKILL_META = [
  { key:"programming" as const, label:"Programming", desc:"Coding across languages & frameworks", icon:"💻" },
  { key:"mathematics" as const, label:"Mathematics", desc:"Stats, algebra, discrete math", icon:"📐" },
  { key:"communication" as const, label:"Communication", desc:"Written & verbal expression", icon:"🗣️" },
  { key:"problemSolving" as const, label:"Problem Solving", desc:"Breaking down complex issues", icon:"🧩" },
  { key:"creativity" as const, label:"Creativity", desc:"Original thinking & design", icon:"🎨" },
  { key:"leadership" as const, label:"Leadership", desc:"Guiding & motivating teams", icon:"👑" },
  { key:"analyticalThinking" as const, label:"Analytical Thinking", desc:"Pattern recognition & logic", icon:"🔍" },
  { key:"teamwork" as const, label:"Teamwork", desc:"Collaboration & co-operation", icon:"🤝" },
  { key:"dataAnalysis" as const, label:"Data Analysis", desc:"Interpreting data & charts", icon:"📊" },
  { key:"networking" as const, label:"Networking", desc:"Computer networks & protocols", icon:"🌐" },
];

const STEP_LABELS = ["Education","Skills","Interests","Activities","Aptitude"];
const STEP_ICONS = ["🎓","⚡","💡","🏆","🧠"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="relative">
              {i < TOTAL_STEPS - 1 && (
                <div className="absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 z-0"
                  style={{ background: i < step ? "var(--accent-blue)" : "#e2e8f0", width: "calc(100% + 1rem)" }} />
              )}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative z-10"
                style={{
                  background: i < step ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : i === step ? "white" : "#f1f5f9",
                  color: i < step ? "white" : i === step ? "var(--accent-blue)" : "var(--text-muted)",
                  border: i === step ? "2px solid var(--accent-blue)" : "2px solid transparent",
                  boxShadow: i === step ? "0 0 0 4px rgba(37,99,235,0.12)" : i < step ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                }}>
                {i < step ? "✓" : STEP_ICONS[i]}
              </div>
            </div>
            <span className="text-xs font-medium hidden sm:block transition-colors"
              style={{ color: i === step ? "var(--accent-blue)" : i < step ? "var(--text-secondary)" : "var(--text-muted)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(step / (TOTAL_STEPS - 1)) * 100}%`, background: "linear-gradient(90deg, #2563eb, #0ea5e9)" }} />
      </div>
    </div>
  );
}

function SkillSlider({ label, desc, icon, value, onChange }: { label:string; desc:string; icon:string; value:number; onChange:(v:number)=>void }) {
  const color = value >= 8 ? "#10b981" : value >= 5 ? "#2563eb" : "#f59e0b";
  const levelLabel = value >= 8 ? "Expert" : value >= 6 ? "Proficient" : value >= 4 ? "Intermediate" : "Beginner";
  return (
    <div className="p-4 rounded-2xl mb-3 transition-all duration-200"
      style={{ background: "white", border: "1.5px solid #f1f5f9" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${color}12`, color }}>{levelLabel}</span>
          <span className="text-xl font-display font-bold min-w-[1.5ch] text-right" style={{ color }}>{value}</span>
        </div>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(90deg, ${color} ${(value-1)/9*100}%, #e2e8f0 ${(value-1)/9*100}%)` }} />
    </div>
  );
}

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(defaultData);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function toggleMulti(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
  }

  function validate(): boolean {
    const errs: string[] = [];
    if (step === 0) {
      if (!data.name.trim()) errs.push("Please enter your name.");
      if (!data.degreeLevel) errs.push("Please select your degree level.");
      if (!data.field) errs.push("Please select your field of study.");
    }
    if (step === 2 && data.interests.length === 0) errs.push("Please select at least one interest.");
    setErrors(errs);
    return errs.length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else { sessionStorage.setItem("careerData", JSON.stringify(data)); navigate("/results"); }
  }

  const inputStyle = {
    background: "white", border: "1.5px solid #e2e8f0", color: "var(--text-primary)",
    borderRadius: "12px", padding: "12px 16px", fontSize: "14px", width: "100%", outline: "none",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 sticky top-0" style={{ background: "rgba(240,244,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(37,99,235,0.08)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent-blue)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
            ← CareerIQ
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-blue)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Step {step + 1} of {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 pb-20">
        <ProgressBar step={step} />

        <div className="rounded-3xl p-8 animate-fade-up"
          style={{ background: "white", boxShadow: "0 20px 60px rgba(37,99,235,0.08), 0 4px 16px rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.08)" }}>

          {/* Step 0: Education */}
          {step === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(37,99,235,0.08)" }}>🎓</div>
                <div>
                  <h2 className="text-xl font-display font-bold" style={{ color: "var(--text-primary)" }}>Your Background</h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Tell us about your academic profile</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Full Name</label>
                <input type="text" value={data.name} onChange={e => updateField("name", e.target.value)}
                  placeholder="e.g. Joshua Abhishek" style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "var(--accent-blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Degree Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {["High School","Bachelor's","Master's","PhD"].map(level => (
                    <button key={level} onClick={() => updateField("degreeLevel", level)}
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-150"
                      style={{
                        background: data.degreeLevel === level ? "rgba(37,99,235,0.08)" : "#f8fafc",
                        border: `1.5px solid ${data.degreeLevel === level ? "var(--accent-blue)" : "#e2e8f0"}`,
                        color: data.degreeLevel === level ? "var(--accent-blue)" : "var(--text-secondary)",
                      }}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Field of Study</label>
                <div className="grid grid-cols-3 gap-2">
                  {["CS/IT","Engineering","Science","Business","Arts","Other"].map(f => (
                    <button key={f} onClick={() => updateField("field", f)}
                      className="px-3 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-150"
                      style={{
                        background: data.field === f ? "rgba(37,99,235,0.08)" : "#f8fafc",
                        border: `1.5px solid ${data.field === f ? "var(--accent-blue)" : "#e2e8f0"}`,
                        color: data.field === f ? "var(--accent-blue)" : "var(--text-secondary)",
                      }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                  CGPA / GPA
                  <span className="ml-2 text-xl font-display font-bold" style={{ color: "var(--accent-blue)" }}>{data.cgpa.toFixed(1)}</span>
                  <span className="ml-1 text-xs" style={{ color: "var(--text-muted)" }}>/ 10.0</span>
                </label>
                <input type="range" min={4} max={10} step={0.1} value={data.cgpa}
                  onChange={e => updateField("cgpa", parseFloat(e.target.value))}
                  style={{ background: `linear-gradient(90deg, var(--accent-blue) ${(data.cgpa-4)/6*100}%, #e2e8f0 ${(data.cgpa-4)/6*100}%)` }} />
                <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>4.0</span><span>10.0</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: "rgba(37,99,235,0.08)" }}>⚡</div>
                <div>
                  <h2 className="text-xl font-display font-bold" style={{ color: "var(--text-primary)" }}>Rate Your Skills</h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Be honest — this directly affects your match accuracy</p>
                </div>
              </div>
              {SKILL_META.map(sk => (
                <SkillSlider key={sk.key} label={sk.label} desc={sk.desc} icon={sk.icon}
                  value={data.skills[sk.key]}
                  onChange={v => updateField("skills", { ...data.skills, [sk.key]: v })} />
              ))}
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: "rgba(37,99,235,0.08)" }}>💡</div>
                <div>
                  <h2 className="text-xl font-display font-bold" style={{ color: "var(--text-primary)" }}>Your Interests</h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Select all domains that excite you</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => {
                  const selected = data.interests.includes(interest);
                  return (
                    <button key={interest} onClick={() => updateField("interests", toggleMulti(data.interests, interest))}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150"
                      style={{
                        background: selected ? "rgba(37,99,235,0.1)" : "#f8fafc",
                        border: `1.5px solid ${selected ? "var(--accent-blue)" : "#e2e8f0"}`,
                        color: selected ? "var(--accent-blue)" : "var(--text-secondary)",
                        transform: selected ? "scale(1.03)" : "scale(1)",
                      }}>
                      {selected ? "✓ " : ""}{interest}
                    </button>
                  );
                })}
              </div>
              {data.interests.length > 0 && (
                <div className="mt-4 px-3 py-2 rounded-xl text-sm inline-flex items-center gap-2"
                  style={{ background: "rgba(37,99,235,0.06)", color: "var(--accent-blue)" }}>
                  ✓ {data.interests.length} interest{data.interests.length > 1 ? "s" : ""} selected
                </div>
              )}
            </div>
          )}

          {/* Step 3: Extracurricular */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: "rgba(37,99,235,0.08)" }}>🏆</div>
                <div>
                  <h2 className="text-xl font-display font-bold" style={{ color: "var(--text-primary)" }}>Extracurricular Activities</h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Select activities you participate in</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {EXTRACURRICULAR_OPTIONS.map(activity => {
                  const selected = data.extracurricular.includes(activity);
                  return (
                    <button key={activity} onClick={() => updateField("extracurricular", toggleMulti(data.extracurricular, activity))}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-150"
                      style={{
                        background: selected ? "rgba(37,99,235,0.06)" : "#f8fafc",
                        border: `1.5px solid ${selected ? "var(--accent-blue)" : "#e2e8f0"}`,
                        color: selected ? "var(--text-primary)" : "var(--text-secondary)",
                      }}>
                      <div className="w-5 h-5 rounded-md flex items-center justify-center text-xs flex-shrink-0 transition-all"
                        style={{ background: selected ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "#e2e8f0", color: selected ? "white" : "transparent" }}>
                        ✓
                      </div>
                      {activity}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Aptitude */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: "rgba(37,99,235,0.08)" }}>🧠</div>
                <div>
                  <h2 className="text-xl font-display font-bold" style={{ color: "var(--text-primary)" }}>Aptitude Scores</h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Enter your approximate scores (0–100 scale)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl mb-6 text-sm flex items-start gap-3"
                style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", color: "var(--text-secondary)" }}>
                <span className="text-lg">💡</span>
                <span>No formal test? Estimate: 40–50 = below avg · 60–70 = average · 80–90 = strong · 90+ = excellent</span>
              </div>

              {[
                { key:"logical" as const, label:"Logical Reasoning", desc:"Patterns, sequences, logical deduction", icon:"🔢" },
                { key:"verbal" as const, label:"Verbal Ability", desc:"Reading comprehension, vocabulary", icon:"📝" },
                { key:"quantitative" as const, label:"Quantitative Aptitude", desc:"Arithmetic, algebra, data interpretation", icon:"📊" },
              ].map(apt => {
                const v = data.aptitude[apt.key];
                const color = v >= 75 ? "#10b981" : v >= 50 ? "#2563eb" : "#f59e0b";
                return (
                  <div key={apt.key} className="p-4 rounded-2xl mb-3"
                    style={{ background: "white", border: "1.5px solid #f1f5f9" }}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{apt.icon}</span>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{apt.label}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{apt.desc}</div>
                        </div>
                      </div>
                      <span className="text-xl font-display font-bold" style={{ color }}>{v}</span>
                    </div>
                    <input type="range" min={0} max={100} step={5} value={v}
                      onChange={e => updateField("aptitude", { ...data.aptitude, [apt.key]: Number(e.target.value) })}
                      style={{ background: `linear-gradient(90deg, ${color} ${v}%, #e2e8f0 ${v}%)` }} />
                  </div>
                );
              })}

              {/* Summary */}
              <div className="mt-4 p-4 rounded-2xl" style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.1)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent-blue)" }}>Assessment Summary</div>
                <div className="text-sm space-y-1.5" style={{ color: "var(--text-secondary)" }}>
                  <div>👤 <strong style={{ color: "var(--text-primary)" }}>{data.name}</strong> · {data.degreeLevel} in {data.field} · CGPA {data.cgpa.toFixed(1)}</div>
                  <div>💡 Interests: {data.interests.slice(0,3).join(", ")}{data.interests.length > 3 ? ` +${data.interests.length - 3} more` : ""}</div>
                  <div>⚡ Top skills: {Object.entries(data.skills).sort((a,b) => b[1]-a[1]).slice(0,3).map(([k]) => k.replace(/([A-Z])/g,' $1').trim()).join(", ")}</div>
                </div>
              </div>
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.2)", color: "#f43f5e" }}>
              {errors.map(e => <div key={e}>⚠ {e}</div>)}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "var(--text-secondary)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; }}>
                ← Back
              </button>
            )}
            <button onClick={handleNext}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "white", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,99,235,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(37,99,235,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              {step === TOTAL_STEPS - 1 ? "🚀 Analyze My Career →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
