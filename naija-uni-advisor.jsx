import { useState, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const FEDERAL_UNIVERSITIES = [
  "University of Lagos (UNILAG)", "University of Ibadan (UI)", "Ahmadu Bello University, Zaria (ABU)",
  "Obafemi Awolowo University, Ile-Ife (OAU)", "University of Nigeria, Nsukka (UNN)",
  "University of Benin (UNIBEN)", "University of Ilorin (UNILORIN)", "University of Port-Harcourt (UNIPORT)",
  "University of Abuja (UNIABUJA)", "University of Calabar (UNICAL)", "University of Jos (UNIJOS)",
  "University of Maiduguri (UNIMAID)", "University of Uyo (UNIUYO)", "Nnamdi Azikiwe University, Awka (UNIZIK)",
  "Bayero University, Kano (BUK)", "Abubakar Tafawa Balewa University, Bauchi (ATBU)",
  "Federal University of Technology, Akure (FUTA)", "Federal University of Technology, Minna (FUTMinna)",
  "Federal University of Technology, Owerri (FUTO)", "Modibbo Adama University, Yola (MAU)",
  "Federal University of Petroleum Resources, Effurun (FUPRE)", "Federal University of Agriculture, Abeokuta (FUNAAB)",
  "Michael Okpara University of Agriculture, Umudike (MOUAU)", "Joseph Sarwuan Tarka University, Makurdi",
  "Federal University, Oye-Ekiti (FUOYE)", "Federal University, Lokoja (FULOKOJA)",
  "Federal University, Lafia (FULAFIA)", "Federal University, Dutse (FUD)",
  "Alex Ekwueme Federal University, Ndufu-Alike (AE-FUNAI)", "Federal University, Wukari (FUWukari)",
  "National Open University of Nigeria (NOUN)", "Nigerian Defence Academy, Kaduna (NDA)",
];

const STATE_UNIVERSITIES = [
  "Lagos State University (LASU)", "Olabisi Onabanjo University, Ago-Iwoye (OOU)",
  "Ekiti State University (EKSU)", "Osun State University (UNIOSUN)",
  "Delta State University, Abraka (DELSU)", "Ambrose Alli University, Ekpoma (AAU)",
  "Anambra State University (ANSU)", "Imo State University (IMSU)",
  "Rivers State University (RSU)", "Cross River University of Technology (CRUTECH)",
  "Akwa Ibom State University (AKSU)", "Kogi State University (KSU)",
  "Benue State University (BSU)", "Nasarawa State University (NSUK)",
  "Plateau State University (PLASU)", "Taraba State University (TASU)",
  "Gombe State University (GSU)", "Adamawa State University (ADSU)",
  "Sokoto State University (SSU)", "Kebbi State University (KSUSTA)",
  "Zamfara State University", "Katsina State University (KASU)",
  "Yobe State University (YSU)", "Borno State University (BOSU)",
  "Bauchi State University (BASU)", "Niger State University (NSUGAWA)",
  "Kwara State University (KWASU)", "Oyo State University of Education, Oyo",
  "Lagos State University of Science and Technology (LASUSTECH)",
  "Adekunle Ajasin University, Akungba-Akoko (AAUA)",
];

const PRIVATE_UNIVERSITIES = [
  "Covenant University, Ota", "Babcock University, Ilishan-Remo",
  "Pan-Atlantic University (PAU), Lagos", "American University of Nigeria, Yola (AUN)",
  "Landmark University, Omu-Aran", "Bowen University, Iwo",
  "Lead City University, Ibadan", "Redeemer's University, Ede",
  "Crawford University, Igbesa", "Madonna University, Okija",
  "Elizade University, Ilara-Mokin", "Achievers University, Owo",
  "Augustine University, Ilara", "Salem University, Lokoja",
  "Bingham University, Karu", "Caritas University, Enugu",
  "Godfrey Okoye University, Enugu", "Afe Babalola University, Ado-Ekiti (ABUAD)",
  "Al-Hikmah University, Ilorin", "Caleb University, Lagos",
  "Joseph Ayo Babalola University (JABU), Ikeji-Arakeji",
  "Igbinedion University, Okada", "Novena University, Ogume",
  "Western Delta University, Oghara", "Wellspring University, Benin City",
];

const FEDERAL_POLYTECHNICS = [
  "Federal Polytechnic, Abeokuta", "Federal Polytechnic, Ado-Ekiti",
  "Federal Polytechnic, Bida", "Federal Polytechnic, Bauchi",
  "Auchi Polytechnic, Auchi", "Federal Polytechnic, Ede",
  "Federal Polytechnic, Idah", "Federal Polytechnic, Ilaro",
  "Federal Polytechnic, Mubi", "Federal Polytechnic, Nasarawa",
  "Federal Polytechnic, Nekede", "Federal Polytechnic, Offa",
  "Federal Polytechnic, Oko", "Kaduna Polytechnic, Kaduna",
  "Yaba College of Technology (YABATECH), Lagos", "Akanu Ibiam Federal Polytechnic, Unwana",
  "Federal Polytechnic, Daura", "Federal Polytechnic, Kaltungo",
  "Federal Polytechnic, Kaura-Namoda", "Federal Polytechnic, Lapai",
  "Federal Polytechnic, Monguno", "Federal Polytechnic, Bali",
  "Air Force Institute of Technology (AFIT), Kaduna",
];

const COURSE_DATA = {
  "Medicine & Surgery (MBBS)": { years: 6, faculty: "Medical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 280, type: "Science", career: "Medical Doctor" },
  "Law (LLB)": { years: 5, faculty: "Law", jamb: ["English", "Literature/Any Arts subject x3"], waec: ["English", "Maths + 4 Arts/Social Sci"], cutoff: 200, type: "Arts", career: "Lawyer, Judge, Legal Consultant" },
  "Engineering (Civil/Mech/Elec)": { years: 5, faculty: "Engineering", jamb: ["English", "Maths", "Physics", "Chemistry"], waec: ["English", "Maths", "Physics", "Chemistry"], cutoff: 200, type: "Science", career: "Engineer, Project Manager" },
  "Accounting": { years: 4, faculty: "Management Sciences", jamb: ["English", "Maths", "Economics", "Any Social Sci"], waec: ["English", "Maths", "Economics", "Accounting"], cutoff: 180, type: "Social Science", career: "Accountant, Auditor, Banker" },
  "Computer Science": { years: 4, faculty: "Physical Sciences", jamb: ["English", "Maths", "Physics", "Chemistry/Biology"], waec: ["English", "Maths", "Physics", "Chemistry"], cutoff: 180, type: "Science", career: "Software Developer, Data Analyst, IT Consultant" },
  "Pharmacy": { years: 5, faculty: "Pharmaceutical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics/Maths"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 250, type: "Science", career: "Pharmacist, Drug Researcher" },
  "Nursing Science": { years: 5, faculty: "Medical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics/Maths"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 200, type: "Science", career: "Nurse, Healthcare Manager" },
  "Economics": { years: 4, faculty: "Social Sciences", jamb: ["English", "Maths", "Economics", "Any Social Sci"], waec: ["English", "Maths", "Economics"], cutoff: 160, type: "Social Science", career: "Economist, Policy Analyst, Banker" },
  "Mass Communication": { years: 4, faculty: "Social Sciences/Arts", jamb: ["English", "Literature", "Any two Social Sci/Arts"], waec: ["English", "Maths + Social Sci/Arts"], cutoff: 160, type: "Arts", career: "Journalist, PR Officer, Broadcaster" },
  "Architecture": { years: 5, faculty: "Environmental Sciences", jamb: ["English", "Maths", "Physics", "Fine Art/Geography"], waec: ["English", "Maths", "Physics", "Fine Art"], cutoff: 180, type: "Science", career: "Architect, Urban Planner" },
  "Estate Management": { years: 5, faculty: "Environmental Sciences", jamb: ["English", "Maths", "Economics", "Geography"], waec: ["English", "Maths", "Economics", "Geography"], cutoff: 160, type: "Social Science", career: "Estate Surveyor, Property Manager" },
  "Business Administration": { years: 4, faculty: "Management Sciences", jamb: ["English", "Maths", "Economics", "Any Social Sci"], waec: ["English", "Maths", "Economics"], cutoff: 160, type: "Social Science", career: "Business Manager, Entrepreneur, Consultant" },
  "Agriculture": { years: 4, faculty: "Agriculture", jamb: ["English", "Biology", "Chemistry", "Agric Sci/Maths"], waec: ["English", "Maths", "Biology", "Agric Science"], cutoff: 140, type: "Science", career: "Agricultural Officer, Farm Manager, Researcher" },
  "Education (Any Subject)": { years: 4, faculty: "Education", jamb: ["English", "Subject related x3"], waec: ["English", "Maths + subject credits"], cutoff: 140, type: "Education", career: "Teacher, Education Officer, Curriculum Developer" },
  "Political Science": { years: 4, faculty: "Social Sciences", jamb: ["English", "Literature", "Government", "Any Social Sci"], waec: ["English", "Maths", "Government", "Social Sci"], cutoff: 160, type: "Social Science", career: "Diplomat, Civil Servant, Politician, Lecturer" },
  "Biochemistry": { years: 4, faculty: "Life Sciences", jamb: ["English", "Chemistry", "Biology", "Maths/Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 180, type: "Science", career: "Lab Scientist, Researcher, Medical Rep" },
  "Banking & Finance": { years: 4, faculty: "Management Sciences", jamb: ["English", "Maths", "Economics", "Any Social Sci"], waec: ["English", "Maths", "Economics"], cutoff: 160, type: "Social Science", career: "Banker, Financial Analyst, Investment Officer" },
  "Psychology": { years: 4, faculty: "Social Sciences", jamb: ["English", "Biology", "Maths", "Economics/Any Sci"], waec: ["English", "Maths", "Biology"], cutoff: 160, type: "Social Science", career: "Psychologist, HR Manager, Counsellor" },
  "Microbiology": { years: 4, faculty: "Life Sciences", jamb: ["English", "Biology", "Chemistry", "Maths/Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 160, type: "Science", career: "Microbiologist, Lab Scientist, Public Health Officer" },
  "Information Technology (IT)": { years: 4, faculty: "Physical Sciences", jamb: ["English", "Maths", "Physics", "Chemistry/Biology"], waec: ["English", "Maths", "Physics"], cutoff: 160, type: "Science", career: "IT Specialist, Network Admin, Cybersecurity Analyst" },
  "Petroleum Engineering": { years: 5, faculty: "Engineering", jamb: ["English", "Maths", "Physics", "Chemistry"], waec: ["English", "Maths", "Physics", "Chemistry"], cutoff: 220, type: "Science", career: "Petroleum Engineer, Oil & Gas Consultant" },
  "Veterinary Medicine": { years: 6, faculty: "Veterinary Medicine", jamb: ["English", "Biology", "Chemistry", "Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 250, type: "Science", career: "Veterinary Doctor, Animal Scientist" },
  "Sociology": { years: 4, faculty: "Social Sciences", jamb: ["English", "Economics", "Government", "Any Social Sci"], waec: ["English", "Maths", "Social Sci"], cutoff: 140, type: "Social Science", career: "Social Worker, Policy Analyst, NGO Officer" },
  "Public Administration": { years: 4, faculty: "Social Sciences", jamb: ["English", "Maths", "Economics", "Government"], waec: ["English", "Maths", "Government", "Economics"], cutoff: 140, type: "Social Science", career: "Civil Servant, Local Govt Administrator" },
  "English Language": { years: 4, faculty: "Arts", jamb: ["English", "Literature in English", "Any two Arts"], waec: ["English", "Literature", "Arts subjects"], cutoff: 140, type: "Arts", career: "Lecturer, Journalist, Author, Editor" },
  "Dentistry": { years: 6, faculty: "Medical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 270, type: "Science", career: "Dentist, Oral Health Specialist" },
  "Radiography": { years: 5, faculty: "Medical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 200, type: "Science", career: "Radiographer, Medical Imaging Specialist" },
  "Optometry": { years: 6, faculty: "Medical Sciences", jamb: ["English", "Biology", "Chemistry", "Physics"], waec: ["English", "Maths", "Biology", "Chemistry", "Physics"], cutoff: 240, type: "Science", career: "Optometrist, Eye Care Specialist" },
  "Quantity Surveying": { years: 5, faculty: "Environmental Sciences", jamb: ["English", "Maths", "Physics", "Economics/Geography"], waec: ["English", "Maths", "Physics", "Economics"], cutoff: 160, type: "Science", career: "Quantity Surveyor, Cost Consultant" },
  "Statistics": { years: 4, faculty: "Physical Sciences", jamb: ["English", "Maths", "Physics", "Chemistry/Economics"], waec: ["English", "Maths", "Physics"], cutoff: 160, type: "Science", career: "Statistician, Data Scientist, Actuary" },
};

const UNI_QUESTIONS = [
  { id: 1, text: "What type of institution are you considering?", options: ["Federal University", "State University", "Private University", "Polytechnic (Federal)", "Polytechnic (State/Private)", "College of Education", "Open/Distance Learning"] },
  { id: 2, text: "Which geopolitical zone are you from or prefer to study in?", options: ["South West (Lagos, Ogun, Oyo, Osun, Ondo, Ekiti)", "South East (Anambra, Imo, Enugu, Ebonyi, Abia)", "South South (Rivers, Delta, Cross River, Bayelsa, Akwa Ibom, Edo)", "North Central (FCT, Kogi, Benue, Nassarawa, Plateau, Niger, Kwara)", "North West (Kano, Kaduna, Katsina, Sokoto, Zamfara, Kebbi, Jigawa)", "North East (Bauchi, Borno, Adamawa, Gombe, Taraba, Yobe)"] },
  { id: 3, text: "Do you prefer to study in your home state or are you open to any state?", options: ["Home state only", "Nearby states", "Open to any state in Nigeria", "Prefer a major city (Lagos, Abuja, Port Harcourt, Kano)"] },
  { id: 4, text: "What is your expected JAMB (UTME) score range?", options: ["Below 180", "180 – 219", "220 – 259", "260 – 299", "300 and above"] },
  { id: 5, text: "Have you written WAEC/NECO?", options: ["Yes – results are out", "Yes – awaiting results", "No – yet to write", "I have both WAEC and NECO results"] },
  { id: 6, text: "How many sittings do your O'Level results span?", options: ["One sitting (all 5 credits in one exam)", "Two sittings", "Still working on it"] },
  { id: 7, text: "What is your family's approximate annual budget for school fees?", options: ["Below ₦100,000/year (very affordable – public institutions)", "₦100,000 – ₦300,000/year", "₦300,000 – ₦800,000/year", "₦800,000 – ₦2,000,000/year (Private uni range)", "Above ₦2,000,000/year (Elite private universities)"] },
  { id: 8, text: "What accommodation arrangement do you prefer?", options: ["University hostel (on-campus)", "Off-campus rented apartment", "Family home (day student)", "No preference"] },
  { id: 9, text: "How important is the university's academic reputation/ranking to you?", options: ["Very important – I want a top-ranked institution", "Moderately important", "I prioritize affordability over ranking", "Not important – just need a degree"] },
  { id: 10, text: "What faculty/broad field do you intend to study?", options: ["Sciences (Medicine, Pharmacy, Biochemistry, Microbiology)", "Engineering & Technology", "Arts & Humanities", "Social Sciences & Management", "Law", "Environmental Sciences (Architecture, Estate Mgt)", "Education", "Agriculture", "Mass Communication", "Not yet decided"] },
  { id: 11, text: "Do you prefer a specialized (focused) university or a comprehensive one?", options: ["Comprehensive (offers many faculties)", "Technology-focused (e.g., FUT Minna, FUTA)", "Agriculture-focused (e.g., FUNAAB, MOUAU)", "Petroleum/science-focused (e.g., FUPRE)", "Liberal arts/private model (e.g., Covenant, AUN)"] },
  { id: 12, text: "How important is campus infrastructure (labs, library, internet, sports)?", options: ["Very important – I need top facilities", "Moderately important", "Not a priority – I focus on academics"] },
  { id: 13, text: "Are you interested in postgraduate study after your first degree?", options: ["Yes – I plan to do a Master's/PhD", "Maybe – if the opportunity arises", "No – I'll go straight to work"] },
  { id: 14, text: "Do you prefer a religious/faith-based environment?", options: ["Yes – Christian-affiliated", "Yes – Islamic-affiliated", "No – secular environment preferred", "No preference"] },
  { id: 15, text: "How do you feel about school strikes (ASUU, SSANU)?", options: ["Very concerned – I want a strike-proof school (private)", "Somewhat concerned – willing to manage", "Not concerned – I'll manage any situation"] },
  { id: 16, text: "What is your preferred campus size/population?", options: ["Large campus (50,000+ students – e.g., UNILAG, ABU)", "Medium campus (20,000–50,000 students)", "Small/intimate campus (under 20,000 students)", "No preference"] },
  { id: 17, text: "Do you intend to apply for a professional course (Medicine, Law, Engineering, Pharmacy)?", options: ["Yes – a strictly professional course", "No – a non-professional degree is fine", "Undecided"] },
  { id: 18, text: "Are you considering polytechnic as an alternative to a university?", options: ["Yes – polytechnic is fine for me (ND/HND)", "No – I want a full degree (BSc/BEng/BEd etc.)", "I'm open to both options", "I'll consider Top-Up degree after HND"] },
  { id: 19, text: "How important is graduate employment rate from the institution?", options: ["Very important – I want a school with strong industry ties", "Moderately important", "Not a deciding factor for me"] },
  { id: 20, text: "Do you have any special considerations?", options: ["I have a disability and need accessible facilities", "I'm a NYSC or mature student returning", "I prefer a school with strong sports culture", "I need a school with active entrepreneurship/tech hub", "None of the above"] },
];

const COURSE_QUESTIONS = [
  { id: 1, text: "How many years do you want to spend earning your first degree?", options: ["4 years (standard degree)", "5 years (Engineering, Architecture, Law, etc.)", "6 years (Medicine, Dentistry, Pharmacy, Optometry)", "As few as possible – ND (2 yrs) or HND (4 yrs) at Poly", "I don't mind – quality matters more than duration"] },
  { id: 2, text: "What broad subject areas did you enjoy most in secondary school?", options: ["Sciences (Physics, Chemistry, Biology, Maths)", "Arts (Literature, History, CRK/IRS, Fine Art)", "Social Sciences (Economics, Government, Geography)", "Commercial (Accounting, Commerce, Business)", "Technical/Vocational subjects"] },
  { id: 3, text: "What WAEC/NECO subjects do you have the strongest credits in?", options: ["Biology, Chemistry, Physics, Maths (pure sciences)", "Economics, Accounting, Commerce, Maths (commercial)", "Literature, Government, History, CRS/IRS (arts)", "Agricultural Science, Biology, Chemistry (agric)", "Technical Drawing, Physics, Maths (engineering path)"] },
  { id: 4, text: "What is your primary motivation for attending university?", options: ["To secure a high-paying professional career", "To follow my passion regardless of earnings", "To become an entrepreneur/business owner", "To serve my community (social impact)", "Family/parental expectation"] },
  { id: 5, text: "Which career sector interests you the most?", options: ["Healthcare (Medicine, Nursing, Pharmacy)", "Technology & Engineering (Software, Civil, Elec)", "Finance & Business (Banking, Accounting, Economics)", "Law & Governance (Law, Political Sci, Public Admin)", "Media & Communication (Mass Comm, PR, Journalism)", "Education & Academia (Teaching, Research)", "Agriculture & Environment (Farming, Estate Mgt)", "Creative Industries (Fine Art, Architecture, Fashion)"] },
  { id: 6, text: "How do you feel about mathematics-heavy courses?", options: ["I love maths – the more complex the better", "I'm okay with maths – can manage it", "I prefer courses with minimal maths", "I dislike maths – please no maths-heavy courses"] },
  { id: 7, text: "What type of work environment do you see yourself in after graduation?", options: ["Hospital / Clinical setting", "Office / Corporate setting", "Outdoor / Fieldwork", "Classroom / Academic setting", "Tech / Remote / Digital workspace", "Government / Civil service", "Own business / Self-employed"] },
  { id: 8, text: "Are you comfortable with high-pressure/competitive courses?", options: ["Yes – I thrive under pressure (Medicine, Law, Pharmacy)", "Moderate – I prefer balanced difficulty", "No – I prefer manageable academic workload"] },
  { id: 9, text: "How important is your earning potential immediately after graduation?", options: ["Very important – I need a high-earning course", "Moderately important", "Not the priority – passion comes first"] },
  { id: 10, text: "Do you prefer theoretical or practical/hands-on learning?", options: ["Mostly theoretical (Law, Economics, History)", "Mostly practical/hands-on (Engineering, Architecture)", "Mixed theory and practice (Nursing, Computer Sci)", "Purely skills/technical (Polytechnic courses)"] },
  { id: 11, text: "Are you interested in studying any professional course that requires a professional license?", options: ["Yes – Medicine, Dentistry (MDCN license)", "Yes – Law (NBA bar)", "Yes – Engineering (COREN)", "Yes – Pharmacy (PCN)", "Yes – Accounting (ICAN/ACCA)", "No – a regular degree is fine"] },
  { id: 12, text: "What best describes your personality?", options: ["Analytical & logical thinker", "Creative & artistic", "People-oriented & empathetic", "Business-minded & entrepreneurial", "Leadership & politically inclined"] },
  { id: 13, text: "Do you prefer working with people, data, or things?", options: ["People (healthcare, education, law, social work)", "Data/numbers (accounting, statistics, economics, IT)", "Things/machines (engineering, architecture, agriculture)", "Ideas/words (arts, journalism, research)"] },
  { id: 14, text: "How do you feel about years of internship/housemanship as part of the programme?", options: ["Totally fine – practical training is important to me", "Acceptable for the right course", "I prefer to finish and start working immediately"] },
  { id: 15, text: "Do you have a role model whose career you admire?", options: ["Doctor / Medical professional", "Lawyer / Judge", "Engineer / Tech expert", "Banker / Finance expert", "Journalist / Media personality", "Politician / Civil servant", "Lecturer / Researcher", "Entrepreneur / Business tycoon"] },
  { id: 16, text: "How do you handle reading and writing large volumes of material?", options: ["I enjoy extensive reading and essay writing (Law, Arts, Soc Sci)", "I can manage it when needed", "I prefer problem-solving over writing (Science, Engineering)"] },
  { id: 17, text: "What kind of impact do you want your career to have?", options: ["Save lives (Medicine, Nursing, Public Health)", "Build things (Engineering, Architecture)", "Shape policy (Law, Political Science, Economics)", "Educate future generations (Education)", "Drive business growth (Business Admin, Accounting)", "Advance technology (Computer Science, IT, AI)"] },
  { id: 18, text: "Are you open to less popular but high-demand courses?", options: ["Yes – I want a course with less competition and good prospects", "No – I want only mainstream courses", "Maybe – show me options"] },
  { id: 19, text: "What is your JAMB subject combination?", options: ["English, Maths, Physics, Chemistry (Engineering/Sciences)", "English, Biology, Chemistry, Physics (Medicine/Pharmacy)", "English, Maths, Economics, any Social Sci (Business/SS)", "English, Literature, Government, any Arts (Law/Arts)", "English, Biology, Agric Sci, Chemistry (Agriculture)", "English, Maths, Physics, Biology (Computer Sci/IT)"] },
  { id: 20, text: "Finally, do you have a specific course already in mind?", options: ["Yes – I'm certain about my course choice", "I have a shortlist of 2–3 options", "I'm completely undecided and need full guidance", "I had one in mind but want to reconsider"] },
];

// ── RECOMMENDATION ENGINE ──────────────────────────────────────────────────

function getUniRecommendations(answers) {
  const results = [];
  const type = answers[0];
  const zone = answers[1];
  const state = answers[2];
  const jambScore = answers[3];
  const budget = answers[6];
  const faculty = answers[9];
  const specialized = answers[10];
  const faithful = answers[13];
  const strike = answers[14];
  const poly = answers[17];

  let pool = [];

  if (type?.includes("Federal University")) pool = [...FEDERAL_UNIVERSITIES];
  else if (type?.includes("State University")) pool = [...STATE_UNIVERSITIES];
  else if (type?.includes("Private University")) pool = [...PRIVATE_UNIVERSITIES];
  else if (type?.includes("Polytechnic (Federal)")) pool = [...FEDERAL_POLYTECHNICS];
  else pool = [...FEDERAL_UNIVERSITIES, ...STATE_UNIVERSITIES];

  // zone filter
  const zoneMap = {
    "South West": ["Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti", "Ile-Ife", "Ibadan", "Abeokuta", "Iwo", "Ado"],
    "South East": ["Anambra", "Imo", "Enugu", "Ebonyi", "Abia", "Awka", "Nsukka", "Owerri", "Umudike"],
    "South South": ["Rivers", "Delta", "Cross River", "Bayelsa", "Akwa Ibom", "Edo", "Port-Harcourt", "Abraka", "Calabar", "Otuoke", "Effurun", "Uyo", "Ekpoma", "Benin"],
    "North Central": ["Abuja", "Kogi", "Benue", "Nasarawa", "Plateau", "Niger", "Kwara", "Makurdi", "Jos", "Lokoja", "Lafia", "Minna", "Ilorin"],
    "North West": ["Kano", "Kaduna", "Katsina", "Sokoto", "Zamfara", "Kebbi", "Jigawa", "Zaria", "Dutse"],
    "North East": ["Bauchi", "Borno", "Adamawa", "Gombe", "Taraba", "Yobe", "Maiduguri", "Yola", "Wukari", "Damaturu"],
  };

  let zoneKey = null;
  for (const k of Object.keys(zoneMap)) { if (zone?.includes(k)) { zoneKey = k; break; } }

  let filtered = pool;
  if (zoneKey && !state?.includes("any state")) {
    const keywords = zoneMap[zoneKey];
    const zoneFiltered = pool.filter(u => keywords.some(k => u.includes(k)));
    if (zoneFiltered.length >= 3) filtered = zoneFiltered;
  }

  // budget / strike filters for private
  if (budget?.includes("Below ₦100,000") || budget?.includes("₦100,000 – ₦300,000")) {
    filtered = filtered.filter(u => !PRIVATE_UNIVERSITIES.includes(u));
    if (filtered.length === 0) filtered = pool;
  }
  if (strike?.includes("private")) {
    const priv = filtered.filter(u => PRIVATE_UNIVERSITIES.includes(u));
    if (priv.length > 0) filtered = priv;
  }

  // faith filter
  const christianSchools = ["Covenant University", "Babcock University", "Bowen University", "Redeemer's University", "Crawford University", "Bingham University"];
  const islamicSchools = ["Al-Hikmah University", "Bayero University", "Usman Danfodiyo"];
  if (faithful?.includes("Christian")) {
    const faith = filtered.filter(u => christianSchools.some(s => u.includes(s)));
    if (faith.length > 0) filtered = faith;
  }
  if (faithful?.includes("Islamic")) {
    const faith = filtered.filter(u => islamicSchools.some(s => u.includes(s)));
    if (faith.length > 0) filtered = faith;
  }

  // specialized
  if (specialized?.includes("Technology-focused")) {
    const tech = filtered.filter(u => u.toLowerCase().includes("technology") || u.includes("ATBU") || u.includes("AFIT"));
    if (tech.length > 0) filtered = tech;
  }
  if (specialized?.includes("Agriculture")) {
    const agr = filtered.filter(u => u.toLowerCase().includes("agric") || u.includes("FUNAAB") || u.includes("MOUAU"));
    if (agr.length > 0) filtered = agr;
  }

  const topPicks = filtered.slice(0, 5);
  if (topPicks.length === 0) return FEDERAL_UNIVERSITIES.slice(0, 5).map(u => ({ name: u, reason: "Top federal institution" }));

  const reasons = [
    `Matches your preferred institution type (${type || "Federal University"})`,
    `Located in your preferred geopolitical zone`,
    `Fits your budget of ${budget || "your stated range"}`,
    `Known for strong programmes in ${faculty || "your stated faculty"}`,
    `Aligns with your campus environment preference`,
  ];

  return topPicks.map((u, i) => ({ name: u, reason: reasons[i % reasons.length] }));
}

function getCourseRecommendations(answers) {
  const duration = answers[0];
  const subjects = answers[1];
  const waec = answers[2];
  const career = answers[4];
  const maths = answers[5];
  const env = answers[6];
  const pressure = answers[7];
  const practical = answers[9];
  const personality = answers[11];
  const jambCombo = answers[18];

  const scores = {};

  Object.keys(COURSE_DATA).forEach(course => {
    let score = 0;
    const cd = COURSE_DATA[course];

    // Duration match
    if (duration?.includes("4 years") && cd.years === 4) score += 3;
    if (duration?.includes("5 years") && cd.years === 5) score += 3;
    if (duration?.includes("6 years") && cd.years === 6) score += 3;
    if (duration?.includes("few as possible") && cd.years <= 4) score += 2;

    // Subject match
    if (subjects?.includes("Sciences") && cd.type === "Science") score += 3;
    if (subjects?.includes("Arts") && cd.type === "Arts") score += 3;
    if (subjects?.includes("Social Sciences") && cd.type === "Social Science") score += 3;
    if (subjects?.includes("Commercial") && ["Accounting", "Banking & Finance", "Business Administration"].includes(course)) score += 3;

    // Career match
    if (career?.includes("Healthcare") && ["Medicine & Surgery (MBBS)", "Nursing Science", "Pharmacy", "Dentistry", "Optometry", "Radiography"].includes(course)) score += 4;
    if (career?.includes("Technology") && ["Computer Science", "Information Technology (IT)", "Engineering (Civil/Mech/Elec)", "Petroleum Engineering", "Statistics"].includes(course)) score += 4;
    if (career?.includes("Finance") && ["Accounting", "Banking & Finance", "Economics", "Business Administration"].includes(course)) score += 4;
    if (career?.includes("Law") && ["Law (LLB)", "Political Science", "Public Administration"].includes(course)) score += 4;
    if (career?.includes("Media") && ["Mass Communication"].includes(course)) score += 4;
    if (career?.includes("Education") && ["Education (Any Subject)"].includes(course)) score += 4;
    if (career?.includes("Agriculture") && ["Agriculture"].includes(course)) score += 4;
    if (career?.includes("Creative") && ["Architecture"].includes(course)) score += 4;

    // Maths preference
    if (maths?.includes("love maths") && ["Engineering (Civil/Mech/Elec)", "Statistics", "Computer Science", "Accounting", "Economics"].includes(course)) score += 2;
    if (maths?.includes("dislike maths") && ["Law (LLB)", "Mass Communication", "English Language", "Sociology", "Political Science"].includes(course)) score += 2;

    // Environment
    if (env?.includes("Hospital") && cd.career.toLowerCase().includes("doctor") || cd.career.toLowerCase().includes("nurse")) score += 2;
    if (env?.includes("Office") && cd.type === "Social Science") score += 1;
    if (env?.includes("Tech") && ["Computer Science", "Information Technology (IT)"].includes(course)) score += 2;

    // Pressure
    if (pressure?.includes("thrive under pressure") && [6, 5].includes(cd.years)) score += 2;
    if (pressure?.includes("manageable") && cd.years === 4) score += 2;

    // Practical
    if (practical?.includes("hands-on") && cd.type === "Science") score += 1;
    if (practical?.includes("theoretical") && ["Law (LLB)", "Economics", "Political Science", "English Language"].includes(course)) score += 1;

    // JAMB combo
    if (jambCombo?.includes("Physics, Chemistry") && cd.type === "Science") score += 2;
    if (jambCombo?.includes("Biology, Chemistry, Physics") && ["Medicine & Surgery (MBBS)", "Pharmacy", "Nursing Science", "Dentistry"].includes(course)) score += 3;
    if (jambCombo?.includes("Economics, any Social Sci") && cd.type === "Social Science") score += 2;
    if (jambCombo?.includes("Literature, Government") && ["Law (LLB)", "Political Science", "Mass Communication", "English Language"].includes(course)) score += 3;

    scores[course] = score;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return sorted.map(([course]) => ({
    name: course,
    years: COURSE_DATA[course].years,
    faculty: COURSE_DATA[course].faculty,
    jamb: COURSE_DATA[course].jamb,
    waec: COURSE_DATA[course].waec,
    cutoff: COURSE_DATA[course].cutoff,
    career: COURSE_DATA[course].career,
  }));
}

// ── COMPONENTS ────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --green: #1a5c38;
    --green-light: #2d8c5a;
    --green-pale: #e8f5ee;
    --gold: #c4922a;
    --gold-light: #f0c96a;
    --white: #fafaf8;
    --ink: #0f1a12;
    --muted: #5a7060;
    --card: #ffffff;
    --border: #d4e4da;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--ink); }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--green) 0%, #0d3520 50%, #1a2e1c 100%);
    color: white;
    padding: 60px 24px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-flag {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 20px;
  }
  .flag-stripe { width: 28px; height: 18px; border-radius: 3px; }
  .flag-green { background: var(--green-light); }
  .flag-white { background: white; }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 12px;
  }
  .hero h1 span { color: var(--gold-light); }
  .hero p { font-size: 1rem; opacity: 0.85; max-width: 480px; margin: 0 auto 8px; line-height: 1.6; }
  .badge {
    display: inline-block;
    background: rgba(196,146,42,0.25);
    border: 1px solid var(--gold-light);
    color: var(--gold-light);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 4px 12px;
    border-radius: 20px;
    margin-top: 10px;
    text-transform: uppercase;
  }

  /* MAIN MENU */
  .menu { padding: 32px 20px; max-width: 560px; margin: 0 auto; }
  .menu h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 700;
    text-align: center; margin-bottom: 8px; color: var(--green);
  }
  .menu p { text-align: center; color: var(--muted); font-size: 0.9rem; margin-bottom: 28px; }
  .menu-cards { display: flex; flex-direction: column; gap: 16px; }
  .menu-card {
    background: var(--card);
    border: 2px solid var(--border);
    border-radius: 16px;
    padding: 24px 20px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .menu-card:hover { border-color: var(--green-light); box-shadow: 0 4px 20px rgba(26,92,56,0.12); transform: translateY(-2px); }
  .menu-icon { font-size: 2rem; flex-shrink: 0; }
  .menu-card h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--green); margin-bottom: 6px; }
  .menu-card p { font-size: 0.82rem; color: var(--muted); line-height: 1.5; }
  .menu-tag { font-size: 0.7rem; font-weight: 600; background: var(--green-pale); color: var(--green); padding: 2px 8px; border-radius: 10px; display: inline-block; margin-top: 8px; }

  /* QUIZ */
  .quiz { max-width: 560px; margin: 0 auto; padding: 24px 20px; }
  .quiz-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .back-btn {
    background: none; border: 1px solid var(--border); border-radius: 8px;
    padding: 6px 12px; font-size: 0.8rem; cursor: pointer; color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }
  .back-btn:hover { background: var(--green-pale); color: var(--green); }
  .quiz-title { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--green); font-weight: 700; }
  .progress-bar { width: 100%; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; margin-bottom: 28px; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--green), var(--gold)); border-radius: 3px; transition: width 0.4s ease; }
  .progress-label { text-align: right; font-size: 0.75rem; color: var(--muted); margin-top: 6px; margin-bottom: 20px; }

  .question-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 24px 20px;
    margin-bottom: 16px;
  }
  .q-number { font-size: 0.7rem; font-weight: 600; color: var(--gold); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .q-text { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--ink); line-height: 1.4; margin-bottom: 20px; }
  .options { display: flex; flex-direction: column; gap: 10px; }
  .option-btn {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--ink);
    transition: all 0.15s;
    line-height: 1.4;
  }
  .option-btn:hover { border-color: var(--green-light); background: var(--green-pale); }
  .option-btn.selected { border-color: var(--green); background: var(--green-pale); color: var(--green); font-weight: 600; }
  .option-btn.selected::before { content: '✓ '; color: var(--green); }

  .nav-row { display: flex; gap: 12px; margin-top: 20px; }
  .btn-primary {
    flex: 1;
    background: var(--green);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--green-light); }
  .btn-primary:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; }
  .btn-secondary {
    background: white;
    color: var(--green);
    border: 1.5px solid var(--green);
    border-radius: 10px;
    padding: 14px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-secondary:hover { background: var(--green-pale); }

  /* RESULTS */
  .results { max-width: 560px; margin: 0 auto; padding: 24px 20px 40px; }
  .results-hero {
    background: linear-gradient(135deg, var(--green), #0d3520);
    color: white;
    border-radius: 20px;
    padding: 28px 24px;
    margin-bottom: 24px;
    text-align: center;
  }
  .results-hero h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 8px; }
  .results-hero p { font-size: 0.85rem; opacity: 0.85; line-height: 1.5; }
  .results-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: var(--green); margin-bottom: 16px; font-weight: 700;
    display: flex; align-items: center; gap: 8px;
  }
  .rec-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 18px 16px;
    margin-bottom: 14px;
    position: relative;
    overflow: hidden;
  }
  .rec-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px;
    background: var(--green);
    border-radius: 4px 0 0 4px;
  }
  .rec-rank {
    position: absolute; right: 14px; top: 12px;
    background: var(--green-pale); color: var(--green);
    font-size: 0.65rem; font-weight: 700;
    padding: 3px 8px; border-radius: 10px;
  }
  .rec-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--ink); margin-bottom: 6px; padding-right: 60px; }
  .rec-reason { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
  .rec-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .rec-tag {
    font-size: 0.7rem; font-weight: 600;
    padding: 3px 10px; border-radius: 10px;
  }
  .tag-years { background: #fff3e0; color: #e65100; }
  .tag-jamb { background: #e8f5e9; color: #1b5e20; }
  .tag-career { background: #e3f2fd; color: #0d47a1; }
  .tag-cutoff { background: #fce4ec; color: #880e4f; }

  .disclaimer {
    background: #fffbf0;
    border: 1px solid var(--gold-light);
    border-radius: 12px;
    padding: 16px;
    margin-top: 24px;
    font-size: 0.78rem;
    color: #7a5a00;
    line-height: 1.6;
  }
  .disclaimer strong { color: var(--gold); }

  .restart-btn {
    width: 100%;
    background: var(--green);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 24px;
    transition: background 0.2s;
  }
  .restart-btn:hover { background: var(--green-light); }

  .loading {
    text-align: center; padding: 60px 20px;
    font-family: 'Playfair Display', serif;
    color: var(--green); font-size: 1.1rem;
  }
  .spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--green);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .footer {
    background: linear-gradient(135deg, #0d3520, var(--green));
    color: rgba(255,255,255,0.85);
    text-align: center;
    padding: 28px 20px;
    margin-top: auto;
  }
  .footer-name {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--gold-light);
    margin-bottom: 4px;
  }
  .footer-sub {
    font-size: 0.78rem;
    opacity: 0.75;
    line-height: 1.6;
  }
  .footer-divider {
    width: 40px; height: 2px;
    background: var(--gold);
    margin: 12px auto;
    border-radius: 2px;
  }
  .footer-copy {
    font-size: 0.72rem;
    opacity: 0.6;
    margin-top: 6px;
  }
`;

export default function App() {
  const [screen, setScreen] = useState("home"); // home | quiz | loading | results
  const [mode, setMode] = useState(null); // "institution" | "course"
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const questions = mode === "institution" ? UNI_QUESTIONS : COURSE_QUESTIONS;
  const totalQ = questions.length;

  function startMode(m) {
    setMode(m);
    setCurrentQ(0);
    setAnswers({});
    setResults(null);
    setScreen("quiz");
  }

  function selectAnswer(option) {
    setAnswers(prev => ({ ...prev, [currentQ]: option }));
  }

  function next() {
    if (currentQ < totalQ - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setScreen("loading");
      const answerArray = Array.from({ length: totalQ }, (_, i) => answers[i] || "");
      setTimeout(() => {
        const recs = mode === "institution"
          ? getUniRecommendations(answerArray)
          : getCourseRecommendations(answerArray);
        setResults(recs);
        setScreen("results");
      }, 1800);
    }
  }

  function prev() {
    if (currentQ > 0) setCurrentQ(q => q - 1);
    else setScreen("home");
  }

  function restart() {
    setScreen("home");
    setMode(null);
    setCurrentQ(0);
    setAnswers({});
    setResults(null);
  }

  const progress = ((currentQ) / totalQ) * 100;
  const q = questions[currentQ];
  const selected = answers[currentQ];

  return (
    <div className="app">
      <style>{styles}</style>

      <div className="hero">
        <div className="hero-flag">
          <div className="flag-stripe flag-green" />
          <div className="flag-stripe flag-white" />
          <div className="flag-stripe flag-green" />
        </div>
        <h1>🎓 Naija Uni <span>Advisor</span></h1>
        <p>Smart guidance for Nigerian university aspirants — choose the right institution and course for your future.</p>
        <div className="badge">Powered by Chris Praise · NUC & JAMB Data</div>
      </div>

      {screen === "home" && (
        <div className="menu fade-in">
          <h2>What do you need help with?</h2>
          <p>Select an option below to get personalised recommendations</p>
          <div className="menu-cards">
            <div className="menu-card" onClick={() => startMode("institution")}>
              <div className="menu-icon">🏛️</div>
              <div>
                <h3>1. Choice of Institution</h3>
                <p>Find the right university, polytechnic or college of education based on your zone, budget, JAMB score, preferences and more.</p>
                <div className="menu-tag">20 questions · Federal, State, Private & Polytechnics</div>
              </div>
            </div>
            <div className="menu-card" onClick={() => startMode("course")}>
              <div className="menu-icon">📚</div>
              <div>
                <h3>2. Choice of Course</h3>
                <p>Discover which degree programme suits your personality, subject strengths, career goals, and how long you want to study.</p>
                <div className="menu-tag">20 questions · 30+ NUC-approved courses</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div className="quiz fade-in">
          <div className="quiz-header">
            <button className="back-btn" onClick={prev}>← Back</button>
            <span className="quiz-title">{mode === "institution" ? "🏛️ Institution Finder" : "📚 Course Matcher"}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-label">Question {currentQ + 1} of {totalQ}</div>

          <div className="question-card fade-in" key={currentQ}>
            <div className="q-number">Question {currentQ + 1}</div>
            <div className="q-text">{q.text}</div>
            <div className="options">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${selected === opt ? "selected" : ""}`}
                  onClick={() => selectAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="nav-row">
            <button className="btn-secondary" onClick={prev}>← Prev</button>
            <button className="btn-primary" onClick={next} disabled={!selected}>
              {currentQ < totalQ - 1 ? "Next →" : "See My Results ✨"}
            </button>
          </div>
        </div>
      )}

      {screen === "loading" && (
        <div className="loading fade-in">
          <div className="spinner" />
          <p>Analysing your answers…</p>
          <p style={{ fontSize: "0.8rem", color: "#5a7060", marginTop: 8 }}>Matching against NUC & JAMB data</p>
        </div>
      )}

      {screen === "results" && results && (
        <div className="results fade-in">
          <div className="results-hero">
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{mode === "institution" ? "🏛️" : "📚"}</div>
            <h2>{mode === "institution" ? "Your Top Institution Matches" : "Your Top Course Matches"}</h2>
            <p>{mode === "institution"
              ? "Based on your answers, here are the institutions that best fit your profile, budget, zone and academic goals."
              : "Based on your subjects, personality and career goals, these courses are your best fit."}</p>
          </div>

          <div className="results-section-title">
            <span>⭐</span> Top 5 Recommendations
          </div>

          {mode === "institution" && results.map((r, i) => (
            <div className="rec-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="rec-rank">#{i + 1} Pick</div>
              <div className="rec-name">{r.name}</div>
              <div className="rec-reason">✅ {r.reason}</div>
            </div>
          ))}

          {mode === "course" && results.map((r, i) => (
            <div className="rec-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="rec-rank">#{i + 1} Pick</div>
              <div className="rec-name">{r.name}</div>
              <div className="rec-reason">Faculty: {r.faculty}</div>
              <div className="rec-meta">
                <span className="rec-tag tag-years">⏱ {r.years} years</span>
                <span className="rec-tag tag-cutoff">Min JAMB: {r.cutoff}</span>
                <span className="rec-tag tag-career">🎯 {r.career}</span>
              </div>
              <div style={{ marginTop: 10, fontSize: "0.75rem", color: "#5a7060", lineHeight: 1.5 }}>
                <strong>JAMB Subjects:</strong> {r.jamb.join(", ")}
              </div>
            </div>
          ))}

          <div className="disclaimer">
            <strong>⚠️ Important Disclaimer:</strong> These recommendations are based on NUC-approved institutions and JAMB guidelines as of 2025/2026. Always verify cut-off marks, course availability and admission requirements on the <strong>official JAMB portal (jamb.gov.ng)</strong>, the <strong>NUC website (nuc.edu.ng)</strong>, and the specific institution's admissions portal. Requirements change yearly.
          </div>

          <button className="restart-btn" onClick={restart}>🔄 Start Over</button>
        </div>
      )}
      <footer className="footer">
        <div className="footer-name">🎓 Naija Uni Advisor</div>
        <div className="footer-sub">Built by Christopher Praise</div>
        <div className="footer-divider" />
        <div className="footer-sub">Data sourced from NUC & JAMB official records</div>
        <div className="footer-copy">© {new Date().getFullYear()} Christopher Praise. All rights reserved.</div>
      </footer>
    </div>
  );
}
