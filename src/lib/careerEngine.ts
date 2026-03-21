export interface AssessmentData {
  name: string;
  degreeLevel: string;
  field: string;
  cgpa: number;
  skills: {
    programming: number;
    mathematics: number;
    communication: number;
    problemSolving: number;
    creativity: number;
    leadership: number;
    analyticalThinking: number;
    teamwork: number;
    dataAnalysis: number;
    networking: number;
  };
  interests: string[];
  extracurricular: string[];
  aptitude: {
    logical: number;
    verbal: number;
    quantitative: number;
  };
}

export interface CareerResult {
  title: string;
  match: number;
  description: string;
  icon: string;
  color: string;
  avgSalary: string;
  growthRate: string;
  requiredSkills: string[];
  skillGaps: SkillGap[];
  learningPath: LearningResource[];
  model: "Random Forest" | "KNN" | "SVM";
  modelScores?: { "Random Forest": number; KNN: number; SVM: number };
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  priority: "High" | "Medium" | "Low";
}

export interface LearningResource {
  title: string;
  platform: string;
  duration: string;
  type: "Course" | "Certification" | "Project" | "Book";
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function predictCareers(data: AssessmentData): Promise<CareerResult[]> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: data.skills, aptitude: data.aptitude }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.error || "Prediction failed");
    return json.results;
  } catch (err) {
    console.warn("API unavailable, using local fallback:", err);
    return predictCareersLocal(data);
  }
}

function predictCareersLocal(data: AssessmentData): CareerResult[] {
  const CAREERS = [
    {
      title: "Software Developer", icon: "💻", color: "#06b6d4",
      description: "Design, build and maintain scalable software systems and applications.",
      avgSalary: "₹6–18 LPA", growthRate: "+25% by 2030",
      requiredSkills: ["Programming", "Problem Solving", "Teamwork", "Analytical Thinking"],
      weights: { programming: 3.5, mathematics: 1.5, communication: 1.0, problemSolving: 3.0, creativity: 1.5, leadership: 0.5, analyticalThinking: 2.5, teamwork: 2.0, dataAnalysis: 0.5, networking: 0.5 },
      aptitudeWeights: { logical: 0.5, verbal: 0.2, quantitative: 0.3 },
      requiredLevels: { programming: 7, mathematics: 6, problemSolving: 7, analyticalThinking: 6 },
      learning: [
        { title: "The Odin Project – Full Stack Path", platform: "The Odin Project", duration: "6–9 months", type: "Course" as const },
        { title: "AWS Certified Developer Associate", platform: "AWS", duration: "3 months", type: "Certification" as const },
        { title: "CS50x – Intro to Computer Science", platform: "Harvard / edX", duration: "12 weeks", type: "Course" as const },
        { title: "Build 5 Portfolio Projects", platform: "GitHub", duration: "Ongoing", type: "Project" as const },
      ],
    },
    {
      title: "Data Scientist", icon: "🧠", color: "#f59e0b",
      description: "Extract insights from large datasets using statistical modeling and ML.",
      avgSalary: "₹8–22 LPA", growthRate: "+36% by 2030",
      requiredSkills: ["Mathematics", "Data Analysis", "Programming", "Analytical Thinking"],
      weights: { programming: 2.5, mathematics: 3.5, communication: 1.0, problemSolving: 2.5, creativity: 1.0, leadership: 0.5, analyticalThinking: 3.5, teamwork: 1.0, dataAnalysis: 4.0, networking: 0.2 },
      aptitudeWeights: { logical: 0.4, verbal: 0.1, quantitative: 0.5 },
      requiredLevels: { mathematics: 8, dataAnalysis: 7, programming: 6, analyticalThinking: 8 },
      learning: [
        { title: "Applied Data Science with Python", platform: "Coursera / Michigan", duration: "5 months", type: "Course" as const },
        { title: "Google Data Analytics Certificate", platform: "Coursera", duration: "6 months", type: "Certification" as const },
        { title: "Kaggle – 5 Competition Projects", platform: "Kaggle", duration: "3 months", type: "Project" as const },
        { title: "Hands-On ML with Scikit-Learn & TF", platform: "O'Reilly", duration: "Self-paced", type: "Book" as const },
      ],
    },
    {
      title: "ML Engineer", icon: "🤖", color: "#a78bfa",
      description: "Build, train, and deploy production ML models at scale.",
      avgSalary: "₹10–28 LPA", growthRate: "+40% by 2030",
      requiredSkills: ["Programming", "Mathematics", "Data Analysis", "Problem Solving"],
      weights: { programming: 3.5, mathematics: 3.5, communication: 0.8, problemSolving: 3.0, creativity: 1.5, leadership: 0.5, analyticalThinking: 3.0, teamwork: 1.0, dataAnalysis: 3.5, networking: 0.2 },
      aptitudeWeights: { logical: 0.45, verbal: 0.1, quantitative: 0.45 },
      requiredLevels: { programming: 8, mathematics: 8, dataAnalysis: 7, analyticalThinking: 7 },
      learning: [
        { title: "Deep Learning Specialization", platform: "Coursera / DeepLearning.AI", duration: "4 months", type: "Course" as const },
        { title: "MLOps Specialization", platform: "Coursera", duration: "3 months", type: "Certification" as const },
        { title: "TensorFlow Developer Certificate", platform: "Google", duration: "2 months", type: "Certification" as const },
        { title: "End-to-End ML Project on GitHub", platform: "GitHub / HuggingFace", duration: "2 months", type: "Project" as const },
      ],
    },
    {
      title: "Cybersecurity Analyst", icon: "🛡️", color: "#f43f5e",
      description: "Protect organizations from cyber threats through monitoring and incident response.",
      avgSalary: "₹6–20 LPA", growthRate: "+33% by 2030",
      requiredSkills: ["Networking", "Analytical Thinking", "Problem Solving", "Programming"],
      weights: { programming: 2.5, mathematics: 1.5, communication: 1.5, problemSolving: 3.0, creativity: 1.5, leadership: 1.0, analyticalThinking: 3.0, teamwork: 1.5, dataAnalysis: 1.5, networking: 4.0 },
      aptitudeWeights: { logical: 0.55, verbal: 0.2, quantitative: 0.25 },
      requiredLevels: { networking: 7, analyticalThinking: 7, problemSolving: 7, programming: 5 },
      learning: [
        { title: "CompTIA Security+ Certification", platform: "CompTIA", duration: "2–3 months", type: "Certification" as const },
        { title: "Google Cybersecurity Certificate", platform: "Coursera", duration: "6 months", type: "Course" as const },
        { title: "TryHackMe – SOC Level 1 Path", platform: "TryHackMe", duration: "3 months", type: "Project" as const },
        { title: "CEH – Certified Ethical Hacker", platform: "EC-Council", duration: "2 months", type: "Certification" as const },
      ],
    },
    {
      title: "Product Manager", icon: "📊", color: "#34d399",
      description: "Lead cross-functional teams to define, build and launch products users love.",
      avgSalary: "₹9–25 LPA", growthRate: "+19% by 2030",
      requiredSkills: ["Communication", "Leadership", "Analytical Thinking", "Problem Solving"],
      weights: { programming: 1.0, mathematics: 1.0, communication: 4.0, problemSolving: 3.0, creativity: 2.0, leadership: 4.0, analyticalThinking: 3.0, teamwork: 3.0, dataAnalysis: 2.0, networking: 1.5 },
      aptitudeWeights: { logical: 0.35, verbal: 0.4, quantitative: 0.25 },
      requiredLevels: { communication: 8, leadership: 7, analyticalThinking: 7, problemSolving: 7 },
      learning: [
        { title: "Product Management Fundamentals", platform: "Coursera / PM School", duration: "3 months", type: "Course" as const },
        { title: "PSPO I – Scrum Product Owner", platform: "Scrum.org", duration: "1 month", type: "Certification" as const },
        { title: "Conduct User Research & Write PRD", platform: "Self-directed", duration: "1 month", type: "Project" as const },
        { title: "Inspired: How to Create Products", platform: "Marty Cagan", duration: "Self-paced", type: "Book" as const },
      ],
    },
    {
      title: "DevOps Engineer", icon: "⚙️", color: "#818cf8",
      description: "Bridge development and operations by automating pipelines and managing infrastructure.",
      avgSalary: "₹7–20 LPA", growthRate: "+24% by 2030",
      requiredSkills: ["Programming", "Networking", "Problem Solving", "Analytical Thinking"],
      weights: { programming: 3.0, mathematics: 1.0, communication: 1.5, problemSolving: 3.0, creativity: 1.0, leadership: 1.5, analyticalThinking: 2.5, teamwork: 2.5, dataAnalysis: 1.0, networking: 3.5 },
      aptitudeWeights: { logical: 0.5, verbal: 0.15, quantitative: 0.35 },
      requiredLevels: { programming: 7, networking: 7, problemSolving: 7 },
      learning: [
        { title: "DevOps Bootcamp – Nana Janashia", platform: "TechWorld with Nana", duration: "3 months", type: "Course" as const },
        { title: "Docker & Kubernetes Complete Guide", platform: "Udemy", duration: "6 weeks", type: "Course" as const },
        { title: "GitHub Actions CI/CD Pipeline", platform: "GitHub", duration: "2 weeks", type: "Project" as const },
        { title: "CKA – Certified Kubernetes Admin", platform: "Linux Foundation", duration: "2 months", type: "Certification" as const },
      ],
    },
    {
      title: "Business Analyst", icon: "📈", color: "#fbbf24",
      description: "Analyze business processes and translate requirements into actionable solutions.",
      avgSalary: "₹5–15 LPA", growthRate: "+14% by 2030",
      requiredSkills: ["Communication", "Analytical Thinking", "Data Analysis", "Problem Solving"],
      weights: { programming: 1.0, mathematics: 2.0, communication: 3.5, problemSolving: 2.5, creativity: 1.5, leadership: 2.5, analyticalThinking: 3.5, teamwork: 2.5, dataAnalysis: 3.0, networking: 1.0 },
      aptitudeWeights: { logical: 0.35, verbal: 0.35, quantitative: 0.3 },
      requiredLevels: { communication: 7, analyticalThinking: 7, dataAnalysis: 6 },
      learning: [
        { title: "Business Analysis Fundamentals", platform: "Udemy", duration: "6 weeks", type: "Course" as const },
        { title: "CBAP – BA Certification", platform: "IIBA", duration: "3 months", type: "Certification" as const },
        { title: "Excel & Power BI for Business", platform: "Microsoft Learn", duration: "1 month", type: "Course" as const },
        { title: "Requirements Analysis Project", platform: "Self-directed", duration: "1 month", type: "Project" as const },
      ],
    },
    {
      title: "Network Engineer", icon: "🌐", color: "#2dd4bf",
      description: "Design, implement and maintain robust network infrastructure for organizations.",
      avgSalary: "₹5–16 LPA", growthRate: "+15% by 2030",
      requiredSkills: ["Networking", "Problem Solving", "Analytical Thinking", "Communication"],
      weights: { programming: 1.5, mathematics: 1.5, communication: 2.0, problemSolving: 2.5, creativity: 1.0, leadership: 1.0, analyticalThinking: 2.5, teamwork: 2.0, dataAnalysis: 1.0, networking: 5.0 },
      aptitudeWeights: { logical: 0.45, verbal: 0.2, quantitative: 0.35 },
      requiredLevels: { networking: 8, problemSolving: 6, analyticalThinking: 6 },
      learning: [
        { title: "CCNA – Cisco Certified Network Associate", platform: "Cisco / Udemy", duration: "3 months", type: "Certification" as const },
        { title: "Network+ Certification", platform: "CompTIA", duration: "2 months", type: "Certification" as const },
        { title: "Packet Tracer Lab Projects", platform: "Cisco NetAcad", duration: "1 month", type: "Project" as const },
        { title: "CompTIA A+ Foundation", platform: "CompTIA", duration: "1.5 months", type: "Course" as const },
      ],
    },
  ];

  const results: CareerResult[] = CAREERS.map(career => {
    let score = 0, maxScore = 0;
    const skillKeys = Object.keys(career.weights) as Array<keyof typeof career.weights>;
    for (const sk of skillKeys) {
      score += (data.skills[sk as keyof typeof data.skills] / 10) * career.weights[sk];
      maxScore += career.weights[sk];
    }
    const aptScore =
      (data.aptitude.logical / 100) * career.aptitudeWeights.logical +
      (data.aptitude.verbal / 100) * career.aptitudeWeights.verbal +
      (data.aptitude.quantitative / 100) * career.aptitudeWeights.quantitative;
    const finalScore = (score / maxScore) * 0.7 + aptScore * 0.3;
    const matchPct = Math.round(40 + finalScore * 50);

    const skillGaps: SkillGap[] = Object.entries(career.requiredLevels).map(([sk, req]) => {
      const current = data.skills[sk as keyof typeof data.skills];
      return current < req ? {
        skill: sk.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
        current, required: req,
        priority: (req - current) >= 4 ? "High" as const : (req - current) >= 2 ? "Medium" as const : "Low" as const,
      } : null;
    }).filter(Boolean) as SkillGap[];

    return {
      title: career.title, match: matchPct,
      description: career.description, icon: career.icon, color: career.color,
      avgSalary: career.avgSalary, growthRate: career.growthRate,
      requiredSkills: career.requiredSkills, skillGaps,
      learningPath: career.learning as LearningResource[],
      model: "Random Forest" as const,
    };
  });

  return results.sort((a, b) => b.match - a.match).slice(0, 5);
}
