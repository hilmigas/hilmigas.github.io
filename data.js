const portfolioData = {
  personalInfo: {
    name: "Helmi Sayed Suleiman",
    handle: "HilmiGas",
    title: "Software Engineer",
    subtitles: [
      "Backend Developer",
      "AI Systems Builder",
      "Python Engineer",
      "Full-Stack Developer"
    ],
    bio: "Software Engineering graduate with honors from Istinye University. Passionate about building intelligent systems, robust backend architectures, and solving complex problems with clean, efficient code. From AI-powered attendance systems to full-stack web applications — I ship things that matter.",
    email: "haloomy2002@gmail.com",
    location: "Istanbul, Turkey",
    github: "https://github.com/HilmiGas",
    linkedin: "https://www.linkedin.com/in/helmi-sayed-suleiman-8134b8242/",
    cvLink: "files/Helmi_Sayed_Suleiman_CV.pdf"
  },
  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      items: [
        { name: "Python", level: 90 },
        { name: "C#", level: 82 },
        { name: "C++", level: 78 },
        { name: "PHP", level: 80 }
      ]
    },
    {
      category: "Frameworks & Tools",
      icon: "layers",
      items: [
        { name: "Laravel", level: 85 },
        { name: "REST APIs", level: 88 },
        { name: "Git & GitHub", level: 90 },
        { name: "SQL / Databases", level: 80 }
      ]
    },
    {
      category: "Specializations",
      icon: "cpu",
      items: [
        { name: "Artificial Intelligence", level: 82 },
        { name: "Computer Vision", level: 75 },
        { name: "Backend Architecture", level: 85 },
        { name: "Algorithm Design", level: 80 }
      ]
    }
  ],
  experience: [
    {
      role: "Capstone Project",
      company: "Istinye University",
      location: "Istanbul, Turkey",
      duration: "2025 - 2026",
      description: [
        "Led development of an AI-powered smart attendance system using facial recognition.",
        "Integrated Python + OpenCV-based computer vision pipeline for real-time face detection.",
        "Built a full admin dashboard with Laravel + PHP backend for reporting and management.",
        "Delivered the project with a top academic score, recognized for technical excellence."
      ]
    }
    ,
    {
      role: "Software Engineering Intern",
      company: "scrambleBit",
      location: "Istanbul, Turkey",
      duration: "2025 - 2026",
      description: [
        "learned frontend and backend from eng. Khaled and other engneers",
        "learned php and laravel with full database systems",
        "learned for like 4 monthes the basics of software engineering in a very good way"
      ]
    }
  ],
  education: [
    {
      degree: "B.S. in Software Engineering — Honor Degree",
      institution: "Istinye University",
      location: "Istanbul, Turkey",
      duration: "2022 - 2026",
      gpa: "Honor Graduate",
      achievements: [
        "Graduated with Honors",
        "Capstone project recognized for AI innovation",
        "Coursework: Software Architecture, Artificial Intelligence, Database Systems, Algorithms & Data Structures, Operating Systems, OOP Design Patterns"
      ]
    }
  ],
  projects: [
    {
      id: "attendify",
      title: "Attendify — Next-Gen AI Attendance",
      category: "ai",
      image: "/images/attendify.png",
      badge: "Capstone",
      coDev: "🤝 Co-Developed with @ibrahemassa and @MoBakour",
      coDevUrl: "https://github.com/MoBakour",
      role: "AI Core & Backend Architecture Lead",
      description: "An intelligent, anti-cheat attendance tracking system achieving real presence validation in under 3 seconds. Built to solve the fundamental problem of proxy attendance through a highly secure, triple-layer verification architecture. Attendify represents the future of automated classroom and enterprise management.",
      highlights: [
        "🔐 Cryptographic time-limited tokens to actively prevent photo-sharing and replay attacks",
        "🌍 Precision GPS geofencing utilizing the Haversine formula for foolproof physical presence verification",
        "🧠 Biometric AI face-matching leveraging 512-dimensional FaceNet embeddings paired with pgvector cosine distance",
        "⚡ Sub-50ms vector search latency achieved via HNSW indexing on a high-performance PostgreSQL database",
        "📊 Comprehensive real-time analytics dashboard providing actionable insights for administrators"
      ],
      tags: [
        "Go (Gin-Gonic)",
        "FastAPI",
        "DeepFace",
        "React 19",
        "TypeScript",
        "React Native (Expo)",
        "PostgreSQL",
        "pgvector",
        "HNSW",
        "Laravel",
        "Docker"
      ],
      githubLink: "https://github.com/MoBakour/attendify",
      liveLink: "#"
    },
    {
      id: "snake-game",
      title: "Retro Snake Game",
      category: "frontend",
      image: "/images/snake_test.png",
      badge: "🎮 Interactive Web Game",
      coDev: "",
      coDevUrl: "",
      role: "Frontend Developer",
      description: "A classic, fully playable Snake game built directly in the browser using HTML5 Canvas and Vanilla JavaScript. Features a modern dark-mode UI with smooth animations.",
      highlights: [
        "🕹️ Built with pure HTML5 Canvas for high-performance rendering",
        "⚡ Implemented custom game loop utilizing requestAnimationFrame",
        "🎨 Modern, glowing dark-theme aesthetics tailored for gamers"
      ],
      tags: [
        "JavaScript",
        "HTML5 Canvas",
        "CSS3",
        "Game Dev"
      ],
      githubLink: "https://github.com/hilmigas/HilmiGas.github.io/blob/main/snake.html",
      liveLink: "snake.html"
    },
    {
      id: "gym-tracker",
      title: "FitGas — Gym Companion",
      category: "frontend",
      image: "/images/fitgas.jpg",
      badge: "💪 Standalone Web App, just for view",
      coDev: "",
      coDevUrl: "",
      role: "Full-Stack Frontend Developer",
      description: "A premium, standalone gym companion app featuring a TDEE calorie calculator with macro breakdowns, an interactive workout calendar for scheduling and logging exercises, and a full stats dashboard — all powered by client-side JavaScript with persistent LocalStorage.",
      highlights: [
        "🔥 TDEE Calorie Calculator with protein, carbs & fat macro targets for cut/maintain/bulk goals",
        "📅 Interactive workout calendar — click any date to log sets, reps, and weights",
        "📊 Stats & History dashboard tracking total volume, active days, and monthly progress",
        "📱 Fully responsive with sidebar navigation that feels like a native app"
      ],
      tags: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "LocalStorage",
        "Responsive Design"
      ],
      githubLink: "https://github.com/hilmigas/HilmiGas.github.io/blob/main/gym-tracker.html",
      liveLink: "gym-tracker.html"
    },
    {
      id: "course-factory",
      title: "Course Factory AI",
      category: "frontend",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      badge: "🚀 Rapid AI Prototype",
      coDev: "",
      coDevUrl: "",
      role: "Frontend Developer",
      description: "A high-fidelity prototype demonstrating an AI-powered course generator. Users can input any subject, and the system synthesizes a structured, multi-module learning curriculum in seconds. Designed with a premium, glassmorphism UI.",
      highlights: [
        "✨ Premium UI/UX using Tailwind CSS and glassmorphism techniques",
        "🧠 Simulates AI processing with dynamic loading states and sequential generation",
        "⚡ Zero-dependency standalone architecture for instant load times",
        "📱 Fully responsive design that looks stunning on mobile and desktop"
      ],
      tags: [
        "HTML5",
        "Tailwind CSS",
        "JavaScript",
        "Prototyping",
        "UI/UX"
      ],
      githubLink: "https://github.com/hilmigas/HilmiGas.github.io/blob/main/course-factory.html",
      liveLink: "course-factory.html"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else {
  window.portfolioData = portfolioData;
}
