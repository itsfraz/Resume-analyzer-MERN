const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const analyzeResumeText = async (rawText) => {
  if (!genAI) {
    console.warn("GEMINI_API_KEY is not defined. Returning mock analysis data.");
    return getMockAnalysis();
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are an expert ATS (Applicant Tracking System) parser and senior recruiter.
      Analyze the following resume text and provide a structured JSON response.
      
      Resume Text:
      "${rawText}"

      Return ONLY a JSON object matching this structure:
      {
        "atsScore": number (0-100),
        "scores": {
          "formatting": number (0-100),
          "keyword": number (0-100),
          "readability": number (0-100),
          "completeness": number (0-100)
        },
        "detectedSkills": [string],
        "missingSkills": [string],
        "formattingIssues": [string],
        "readabilityIssues": [string],
        "grammarIssues": [string],
        "suggestions": [string],
        "recruiterReadinessScore": number (0-100)
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI service error:", error);
    return getMockAnalysis();
  }
};

const getMockAnalysis = () => {
  return {
    atsScore: 78,
    scores: {
      formatting: 85,
      keyword: 70,
      readability: 80,
      completeness: 80
    },
    detectedSkills: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Express", "REST APIs"],
    missingSkills: ["TypeScript", "Docker", "Jest", "CI/CD", "AWS"],
    formattingIssues: ["No clear Achievements section", "Font size styling inconsistency detected in headings"],
    readabilityIssues: ["Experience descriptions are slightly wordy. Use bullet points starting with action verbs."],
    grammarIssues: ["Minor punctuation errors in project descriptions"],
    suggestions: [
      "Quantify your achievements (e.g. 'Reduced loading time by 30%').",
      "Add TypeScript to your tech stack as it is highly requested for MERN roles.",
      "Re-format your experience section with clear timeline markers."
    ],
    recruiterReadinessScore: 75
  };
};

// ─── Job Matching ──────────────────────────────────────────────────────────────

const matchJobToResume = async (resumeText, jobDescription) => {
  if (!genAI) {
    console.warn("GEMINI_API_KEY not defined. Returning mock match data.");
    return getMockMatch();
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are a senior technical recruiter and ATS specialist.
      Compare the resume below against the job description and return a detailed JSON match report.

      Resume Text:
      """${resumeText}"""

      Job Description:
      """${jobDescription}"""

      Return ONLY a valid JSON object with this structure:
      {
        "matchScore": number (0-100, overall compatibility),
        "scores": {
          "skills": number (0-100),
          "experience": number (0-100),
          "education": number (0-100),
          "keywords": number (0-100)
        },
        "matchedKeywords": [string],
        "missingKeywords": [string],
        "strengths": [string],
        "gaps": [string],
        "verdict": string (one of: "Strong Match", "Good Match", "Partial Match", "Weak Match"),
        "hiringProbability": number (0-100),
        "tailoringTips": [string]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI job matching error:", error);
    return getMockMatch();
  }
};

const getMockMatch = () => ({
  matchScore: 82,
  scores: { skills: 88, experience: 78, education: 90, keywords: 74 },
  matchedKeywords: ["React", "Node.js", "REST APIs", "JavaScript", "MongoDB", "Express"],
  missingKeywords: ["TypeScript", "GraphQL", "AWS Lambda", "Kubernetes"],
  strengths: [
    "Strong full-stack JavaScript experience aligns well with this role.",
    "REST API design experience is a direct match for the listed requirements.",
    "MongoDB expertise covers the database stack specified in the JD."
  ],
  gaps: [
    "TypeScript is listed as required — your resume does not mention it.",
    "Cloud deployment experience (AWS/GCP) is missing from your profile."
  ],
  verdict: "Good Match",
  hiringProbability: 72,
  tailoringTips: [
    "Add TypeScript to your resume skills list if you have any experience with it.",
    "Mention any AWS or cloud deployment you have done, even personal projects.",
    "Tailor your summary statement to mirror the job title ('Full Stack Developer')."
  ]
});

module.exports = {
  analyzeResumeText,
  matchJobToResume
};
