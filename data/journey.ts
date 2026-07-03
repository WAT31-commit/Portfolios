import { ActivityItem, LevelId, LevelMeta, Quest, Skill } from "@/lib/types";

export const levels: LevelMeta[] = [
  {
    id: "foundation",
    year: "2022",
    name: "The Foundation",
    title: "Where the Tower Begins",
    blurb: "A first floor laid on open ground — curiosity, a starting toolkit, and a reason to build.",
    floors: 1,
    accent: "#c9a876",
  },
  {
    id: "groundwork",
    year: "2023",
    name: "Groundwork",
    title: "Learning to Lay Bricks",
    blurb: "The unglamorous years — building the skills that everything above would eventually stand on.",
    floors: 2,
    accent: "#8bd17c",
  },
  {
    id: "craft",
    year: "2024",
    name: "The Craft Floors",
    title: "Sharpening the Work",
    blurb: "Real projects, real stakes — the floors where the work started looking like a career.",
    floors: 2,
    accent: "#a8c8f0",
  },
  {
    id: "ascent",
    year: "2025",
    name: "The Ascent",
    title: "Steeper Climbs",
    blurb: "Harder problems, bigger scope, and the first floors built under real pressure.",
    floors: 2,
    accent: "#c9d6e8",
  },
  {
    id: "trial",
    year: "2026",
    name: "Trial by Fire",
    title: "The Top of the Tower",
    blurb: "The highest-stakes work yet — three floors, because this one earned them.",
    floors: 3,
    accent: "#ff8c42",
  },
];

export function getLevelMeta(id: LevelId): LevelMeta {
  const meta = levels.find((l) => l.id === id);
  if (!meta) throw new Error(`Unknown level id: ${id}`);
  return meta;
}

export const TOTAL_FLOORS = levels.reduce((sum, l) => sum + l.floors, 0);

export const bio = {
  name: "William",
  tagline: "Global Business Management student, builder, and the one laying these bricks.",
  home: "Bree",
  summary:
    "I'm William — currently studying Global Business Management, with a habit of treating every class project like it needs its own floor plan: worth obsessing over, hard to let go of, and usually the thing everyone else warned me not to pick up. This tower is a record of how I got from 'curious first-year' to whatever I am now, floor by floor.",
  whyGBM:
    "I chose Global Business Management because I wanted a foundation that forced me to zoom out — supply chains, markets, culture, strategy — instead of specializing too early. I like understanding how the whole structure holds together before I decide which floor to build next.",
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
    "I don't think the business side and the technical side are actually different disciplines. They're the same discipline — understanding a structure well enough to build on it — wearing different clothes.",
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
    levelId: "groundwork",
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
    levelId: "groundwork",
    whereLearned: "Global Marketing course + internship",
    projects: ["Market-entry analysis for a mid-size retailer", "Competitor teardown deck"],
    lessons: "Data is cheap; knowing which three numbers actually change the decision is the hard part.",
  },
  {
    id: "project-mgmt",
    name: "Project Management",
    icon: "🗂️",
    level: 3,
    levelId: "craft",
    whereLearned: "Student consulting club",
    projects: ["Led a 5-person team through a semester-long client project"],
    lessons: "A plan survives contact with reality for about a week — build in the slack up front.",
  },
  {
    id: "web-dev",
    name: "Web Development",
    icon: "💻",
    level: 3,
    levelId: "craft",
    whereLearned: "Self-taught, YouTube + documentation + a lot of broken builds",
    projects: ["This portfolio site", "A booking tool for a campus club"],
    lessons: "Shipping something small and ugly beats planning something big and perfect.",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: "📈",
    level: 3,
    levelId: "ascent",
    whereLearned: "Business Analytics course",
    projects: ["Customer churn analysis for a class project", "Event attendance forecasting"],
    lessons: "The chart you make first is rarely the chart that convinces anyone — iterate on the framing, not just the data.",
  },
  {
    id: "public-speaking",
    name: "Public Speaking & Pitching",
    icon: "🎤",
    level: 4,
    levelId: "trial",
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
  // The Craft Floors — 2024
  {
    id: "campus-booking-tool",
    title: "The Booking Tool",
    year: 2024,
    levelId: "craft",
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
  },
  {
    id: "market-entry-case",
    title: "The Beverage Case",
    year: 2024,
    levelId: "craft",
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
  // The Ascent — 2025
  {
    id: "churn-dashboard",
    title: "The Churn Dashboard",
    year: 2025,
    levelId: "ascent",
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
    title: "The Supply Chain Internship",
    year: 2025,
    levelId: "ascent",
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
  // Trial by Fire — 2026
  {
    id: "capstone-launch",
    title: "The Capstone Launch",
    year: 2026,
    levelId: "trial",
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
