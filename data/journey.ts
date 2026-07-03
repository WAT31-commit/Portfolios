import { ActivityItem, ChapterMeta, Quest, Skill } from "@/lib/types";

export const chapters: ChapterMeta[] = [
  {
    id: "shire",
    year: "2022",
    name: "The Shire",
    title: "Where the Journey Begins",
    blurb:
      "A quiet beginning — home, curiosity, and the first steps out the door.",
  },
  {
    id: "old-forest",
    year: "2023",
    name: "The Old Forest",
    title: "Finding the Path",
    blurb: "Tangled, formative years spent building skills in the undergrowth.",
  },
  {
    id: "rivendell",
    year: "2024",
    name: "Rivendell",
    title: "Councils and Craft",
    blurb: "A haven for focused work — the projects that sharpened the blade.",
  },
  {
    id: "mines-mountains",
    year: "2025",
    name: "The Mines & Mountains",
    title: "Into the Depths",
    blurb: "Harder climbs, bigger stakes, and the peaks worth summiting.",
  },
  {
    id: "dark-land",
    year: "2026",
    name: "The Dark Land",
    title: "The Final Trials",
    blurb: "High-pressure battles against the biggest problems yet.",
  },
  {
    id: "the-eye",
    year: "Future",
    name: "The Eye",
    title: "What Comes Next",
    blurb: "Not a threat on the horizon, but a vision — watching, ready, awake.",
  },
];

export const bio = {
  name: "William",
  tagline: "Global Business Management student, builder, and reluctant cartographer of his own journey.",
  home: "Bree",
  summary:
    "I'm William — currently studying Global Business Management, with a habit of treating every class project like it's the One Ring: worth obsessing over, hard to let go of, and usually the thing everyone else warned me not to pick up. This site maps how I got from 'curious first-year' to whatever I am now, region by region.",
  whyGBM:
    "I chose Global Business Management because I wanted a degree that forced me to zoom out — supply chains, markets, culture, strategy — instead of specializing too early. I like understanding how the whole map connects before I decide which region to settle in.",
  goals: [
    "Build products and businesses that solve real, unglamorous problems",
    "Work somewhere that operates across borders, not just one market",
    "Get good enough at both the business and technical sides that I don't need a translator between them",
  ],
  initialSkills: ["Excel", "Public speaking", "Basic HTML/CSS", "Spanish (conversational)"],
  languages: ["English (native)", "Spanish (conversational)", "French (basic)"],
  resumeHref: "/resume.pdf",
  email: "william@example.com",
  linkedin: "https://www.linkedin.com/in/william-example",
  github: "https://github.com/william-example",
};

export const vision = {
  mission:
    "To build things — products, deals, teams — that make an unglamorous problem quietly disappear for the people who had to deal with it every day.",
  philosophy:
    "I don't think the business side and the technical side are actually different disciplines. They're the same discipline — understanding a system well enough to change it — wearing different clothes.",
  goals: [
    "Join or start a team building something that operates across borders",
    "Keep shipping real, working things instead of just planning them",
    "Stay someone who can sit in both the boardroom and the codebase without needing a translator",
  ],
};

export const skills: Skill[] = [
  {
    id: "excel-modeling",
    name: "Financial Modeling",
    icon: "📊",
    level: 4,
    whereLearned: "Intro to Finance, self-taught via case competitions",
    projects: ["Startup valuation case study", "Semester budget model for student org"],
    lessons:
      "Learned that a clean model is a communication tool first, a calculator second — nobody trusts a spreadsheet they can't audit in thirty seconds.",
  },
  {
    id: "market-research",
    name: "Market Research",
    icon: "🔍",
    level: 4,
    whereLearned: "Global Marketing course + internship",
    projects: ["Market-entry analysis for a mid-size retailer", "Competitor teardown deck"],
    lessons:
      "Data is cheap; knowing which three numbers actually change the decision is the hard part.",
  },
  {
    id: "project-mgmt",
    name: "Project Management",
    icon: "🗂️",
    level: 3,
    whereLearned: "Student consulting club",
    projects: ["Led a 5-person team through a semester-long client project"],
    lessons: "A plan survives contact with reality for about a week — build in the slack up front.",
  },
  {
    id: "web-dev",
    name: "Web Development",
    icon: "💻",
    level: 3,
    whereLearned: "Self-taught, YouTube + documentation + a lot of broken builds",
    projects: ["This portfolio site", "A booking tool for a campus club"],
    lessons: "Shipping something small and ugly beats planning something big and perfect.",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: "📈",
    level: 3,
    whereLearned: "Business Analytics course",
    projects: ["Customer churn analysis for a class project", "Event attendance forecasting"],
    lessons: "The chart you make first is rarely the chart that convinces anyone — iterate on the framing, not just the data.",
  },
  {
    id: "public-speaking",
    name: "Public Speaking & Pitching",
    icon: "🎤",
    level: 4,
    whereLearned: "Debate in high school, case competitions in college",
    projects: ["Pitched at a university startup competition (2nd place)", "Presented client findings to a real executive panel"],
    lessons: "Confidence reads before content does — but only content survives the Q&A.",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "student-consulting",
    title: "Student Consulting Club",
    role: "Project Lead",
    period: "2023 – 2024",
    detail: "Led a team of five on pro-bono strategy projects for local small businesses.",
  },
  {
    id: "case-comp",
    title: "Inter-University Case Competition",
    role: "Team Member",
    period: "Spring 2023",
    detail: "Placed 2nd out of 24 teams with a market-entry strategy for a beverage startup.",
  },
  {
    id: "orientation",
    title: "New Student Orientation",
    role: "Peer Mentor",
    period: "2022 – 2023",
    detail: "Mentored a group of 15 incoming first-years through their first semester.",
  },
];

export const quests: Quest[] = [
  // Rivendell — 2024
  {
    id: "campus-booking-tool",
    title: "The Booking Stone",
    year: 2024,
    chapter: "rivendell",
    tagline: "A lightweight booking tool built for a campus club drowning in spreadsheet chaos.",
    tags: ["Web Dev", "Product"],
    description:
      "My student club managed room and equipment bookings through a shared spreadsheet that broke constantly — double bookings, no notifications, no history. I built a small web app to replace it.",
    role: "Sole developer",
    highlights: [
      "Designed the booking flow around how the club actually worked, not how I assumed it worked",
      "Shipped a working v1 in three weeks using Next.js and a simple database",
      "Adopted by the club and still in use a year later",
    ],
    tools: ["Next.js", "SQLite", "Tailwind CSS"],
    link: "",
    repo: "",
  },
  {
    id: "market-entry-case",
    title: "The Beverage Frontier",
    year: 2024,
    chapter: "rivendell",
    tagline: "A full market-entry strategy for a beverage startup, built for a case competition.",
    tags: ["Strategy", "Research"],
    description:
      "Our team was given a real beverage startup considering international expansion and two weeks to build a go/no-go recommendation, backed by market sizing, competitive analysis, and a financial model.",
    role: "Market research & financial modeling",
    highlights: [
      "Built the TAM/SAM/SOM model that anchored the whole pitch",
      "Interviewed two industry contacts to sanity-check our assumptions",
      "Placed 2nd of 24 teams",
    ],
    tools: ["Excel", "Market research", "PowerPoint"],
  },
  // Mines & Mountains — 2025
  {
    id: "churn-dashboard",
    title: "Peak of Falling Numbers",
    year: 2025,
    chapter: "mines-mountains",
    tagline: "A churn-prediction dashboard for a small subscription business.",
    tags: ["Data", "Analytics"],
    mission: "Help a small subscription business understand why customers were leaving before they left.",
    problem:
      "The business had a spreadsheet full of customer data and a rising churn rate, but no way to see which customers were at risk or why.",
    solution:
      "Built a dashboard that scored customers on churn risk using a simple logistic regression model, surfaced the top risk factors, and flagged accounts for outreach.",
    tools: ["Python", "pandas", "scikit-learn", "Streamlit"],
    impact:
      "The business used the risk list to run a targeted retention campaign; early follow-up showed a measurable drop in churn among flagged accounts.",
  },
  {
    id: "internship-supply-chain",
    title: "The Supply Line Summit",
    year: 2025,
    chapter: "mines-mountains",
    tagline: "Summer internship analyzing supplier risk for a mid-size manufacturer.",
    tags: ["Internship", "Supply Chain"],
    mission: "Identify which suppliers posed the highest risk to production continuity.",
    problem:
      "The company had over 200 suppliers and no consolidated view of which ones were financially unstable, geographically risky, or single points of failure.",
    solution:
      "Built a supplier risk-scoring framework combining financial health signals, geographic risk, and dependency concentration, then presented findings to the procurement team.",
    tools: ["Excel", "Power BI", "Supplier data APIs"],
    impact:
      "Procurement used the framework to diversify two high-risk single-source suppliers before a regional disruption hit later that year.",
  },
  // Dark Land — 2026
  {
    id: "capstone-launch",
    title: "The Siege of Launch Day",
    year: 2026,
    chapter: "dark-land",
    tagline: "Senior capstone: taking a student-run micro-business from idea to real revenue in one semester.",
    tags: ["Capstone", "Entrepreneurship"],
    problem:
      "Our capstone team had one semester to design, launch, and generate real revenue from a new micro-business, competing against seven other teams for the top spot.",
    strategy:
      "We chose a narrow, underserved niche instead of a crowded one, betting that speed and focus would beat scope.",
    execution:
      "Ran three pricing experiments in the first month, cut two features that weren't converting, and personally handled the first 20 customer conversations to find the actual objections.",
    outcome:
      "Finished the semester with paying customers and positive unit economics — one of two teams (out of eight) to reach profitability before the final presentation.",
    tools: ["Customer interviews", "Shopify", "Paid ads", "Unit economics modeling"],
  },
];
