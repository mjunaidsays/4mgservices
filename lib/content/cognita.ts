/** Content snapshot: https://insight.apturatech.com/cognita/factsheet/ (2026-09-19).
 * The directory contains 35 records, despite the source comment claiming 50+.
 * Charts and savings are source illustrations, not independently verified outcomes.
 * Kept local so the portfolio never depends on the source website at runtime.
 */
export const cognitaSource =
  "https://insight.apturatech.com/cognita/factsheet/";

export const cognitaWorkflow = [
  {
    title: "Onboard",
    detail: "Online admissions, student profiles & RBAC credentials.",
  },
  {
    title: "Deliver",
    detail: "Lesson planning, class routines & syllabus execution.",
  },
  {
    title: "Evaluate",
    detail: "Online/offline testing, marksheets & rank generation.",
  },
  {
    title: "Recover",
    detail: "Fee invoicing/challans, payment tracking & SMS reminders.",
  },
  {
    title: "Govern",
    detail: "Real-time reports, financial audits & board analytics.",
  },
];

export const cognitaTimeAllocation = [
  { label: "Direct classroom teaching", manual: 45, cognita: 80 },
  { label: "Marksheet & BISE grading", manual: 30, cognita: 10 },
  { label: "Manual attendance & logs", manual: 25, cognita: 10 },
];

export const cognitaEfficiency = [
  { label: "Governance & RBAC", value: 95 },
  { label: "Exam lifecycle", value: 88 },
  { label: "PKR challan recovery", value: 98 },
  { label: "Campus logistics", value: 82 },
  { label: "Parent SMS alerts", value: 90 },
];

export const cognitaRoiInputs = [
  {
    key: "campuses",
    label: "Campuses / branches",
    min: 1,
    max: 15,
    step: 1,
    initial: 3,
  },
  {
    key: "students",
    label: "Total student enrolment across all campuses",
    min: 200,
    max: 10000,
    step: 100,
    initial: 1500,
  },
  {
    key: "faculty",
    label: "Teaching faculty across all campuses",
    min: 10,
    max: 500,
    step: 5,
    initial: 75,
  },
  {
    key: "tuition",
    label: "Average annual tuition per student (PKR)",
    min: 50000,
    max: 1500000,
    step: 25000,
    initial: 300000,
  },
] as const;

export type CognitaRoiValues = Record<
  (typeof cognitaRoiInputs)[number]["key"],
  number
>;

export const cognitaRoiDefaults: CognitaRoiValues = Object.fromEntries(
  cognitaRoiInputs.map((input) => [input.key, input.initial]),
) as CognitaRoiValues;

/** Source model: gross annual estimates; no price or implementation cost is supplied. */
export function calculateCognitaSavings(values: CognitaRoiValues) {
  const normalized = { ...cognitaRoiDefaults };
  for (const input of cognitaRoiInputs) {
    const value = Number.isFinite(values[input.key])
      ? values[input.key]
      : input.initial;
    normalized[input.key] = Math.min(
      input.max,
      Math.max(input.min, Math.round(value)),
    );
  }
  return {
    hours: normalized.faculty * 60,
    revenue: Math.round(normalized.students * normalized.tuition * 0.03),
    consolidation: normalized.campuses * 1200000,
  };
}

export function formatCognitaNumber(value: number) {
  return value.toLocaleString("en-PK");
}

export function formatCognitaPkrScale(value: number) {
  if (value >= 10000000)
    return `${(value / 10000000).toFixed(2)} Crore PKR / year`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)} Lakh PKR / year`;
  return `Rs. ${formatCognitaNumber(value)} / year`;
}

export const cognitaPainPoints = [
  {
    id: "governance",
    title: "Multi-Branch & Campus Data Silos",
    pain: "Executive leadership lacks real-time operational visibility across satellite campuses (e.g. Lahore, Karachi, Islamabad branches). Data remains trapped in manual registers and Excel files.",
    reliefTitle: "Centralized Multi-Campus Oversight",
    relief:
      "A global Super Admin hierarchy allows management to oversee multiple school branches or university departments from a single cloud dashboard with customizable role permissions.",
    impact: "100% Unified Governance",
  },
  {
    id: "academics",
    title: "Faculty Admin Burden & Manual Marksheets",
    pain: "Teachers spend up to 40% of their time on manual attendance, compiling term mark sheets, preparing BISE/Cambridge grades, and writing manual progress cards.",
    reliefTitle: "Automated Academic Pipeline",
    relief:
      "Lesson planning, automated online/offline grading engines, digital mark sheets, merit list generation, and student logs return hundreds of teaching hours back to faculty.",
    impact: "60% Admin Time Saved",
  },
  {
    id: "finance",
    title: "Challan Reconciliation & Fee Leakage",
    pain: "Uncollected tuition fees, unrecorded scholarship discounts, manual bank challan deposits, and delayed due dates lead to persistent cash flow leakage in PKR.",
    reliefTitle: "Automated Fee Lifecycle (PKR)",
    relief:
      "Systematic fee schedules, automated discount logic, print/digital fee challans, automated SMS/Email reminders, and integrated accounting ensure financial clarity.",
    impact: "99% Recovery Efficiency",
  },
  {
    id: "parents",
    title: "Disconnected Parent Communication",
    pain: "Parents remain uninformed about daily student absences, exam dates, fee due dates, and school notices until term-end, causing friction at reception.",
    reliefTitle: "Instant Guardian SMS & Portal Alerts",
    relief:
      "Automated daily attendance alerts via SMS/WhatsApp, direct parent logins, online fee slips, and digital noticeboards build strong family engagement.",
    impact: "Instant Multi-Channel Alerts",
  },
  {
    id: "operations",
    title: "Costly & Fragmented Legacy Software",
    pain: "Paying separate subscription licenses in PKR or USD for van tracking, library assets, hostel rooms, exams, and payroll inflates total cost of ownership.",
    reliefTitle: "All-in-One Facility Management",
    relief:
      "A unified enterprise SaaS solution manages van routes, hostel rooms, inventory, HR payroll, and library assets under one predictable local license.",
    impact: "Lower Total TCO",
  },
];

export const cognitaFeatures = [
  {
    pillar: "p1",
    name: "Multi-Branch Tenant Architecture",
    desc: "Global Super Admin control with branch-specific campus admin views.",
    tags: ["Super Admin", "Multi-Branch", "Governance"],
  },
  {
    pillar: "p1",
    name: "Role-Based Access Control (RBAC)",
    desc: "Granular permissions for Admin, Principal, Teacher, Student, Guardian, Accountant, Librarian, Front Desk.",
    tags: ["Permissions", "Security", "RBAC"],
  },
  {
    pillar: "p1",
    name: "Front Office & Visitor Register",
    desc: "Visitor purpose tracking, CNIC/contact logs, calling logs, postal dispatch & receive.",
    tags: ["Visitor", "Reception", "Front Desk"],
  },
  {
    pillar: "p1",
    name: "System Configuration & Settings",
    desc: "Email settings, payment gateway config, academic year definitions, role permissions.",
    tags: ["System", "Config"],
  },
  {
    pillar: "p1",
    name: "Theme & Language Engine",
    desc: "Customizable institutional themes and localized multi-language controls.",
    tags: ["UI", "Localization"],
  },
  {
    pillar: "p2",
    name: "Curriculum & Section Management",
    desc: "Classes, sections, subjects, syllabus mapping, learning materials, and class passes.",
    tags: ["Class", "Syllabus", "Subjects"],
  },
  {
    pillar: "p2",
    name: "Digital Lesson Planning",
    desc: "Lesson creation, topic progress mapping, timeline tracking, and completion logs.",
    tags: ["Lesson Plan", "Topics", "Timeline"],
  },
  {
    pillar: "p2",
    name: "Class Routine & Timetables",
    desc: "Dynamic class scheduling and routine timetables for teachers and students.",
    tags: ["Timetable", "Routine"],
  },
  {
    pillar: "p2",
    name: "Assignments & Submissions",
    desc: "Digital homework distribution, student online submissions, and teacher evaluation.",
    tags: ["Homework", "Assignment"],
  },
  {
    pillar: "p2",
    name: "Exam Engine (Offline & Online)",
    desc: "Term exam scheduling, exam halls, question banks, suggestions, and online testing.",
    tags: ["Exams", "BISE / O-Level", "Online Testing"],
  },
  {
    pillar: "p2",
    name: "Automated Marksheet & Merit Lists",
    desc: "Result cards, mark evaluations, rank calculations, merit lists, and printable mark sheets.",
    tags: ["Marksheet", "Grading", "Rankings"],
  },
  {
    pillar: "p3",
    name: "Admissions & Student Lifecycle",
    desc: "Student types, online admission portal, bulk onboarding, and activity logs.",
    tags: ["Admissions", "Student Directory"],
  },
  {
    pillar: "p3",
    name: "Guardian & Parent Portals",
    desc: "Dedicated parent login to view academic progress, fee challans, and daily attendance.",
    tags: ["Parents", "Guardian"],
  },
  {
    pillar: "p3",
    name: "Student Promotion Engine",
    desc: "Automated year-end or term-end promotion logic across academic sessions.",
    tags: ["Promotion", "Academic Year"],
  },
  {
    pillar: "p3",
    name: "Scholarships & Donor Management",
    desc: "Need-based / merit scholarship allocations, donor records, and grant tracking.",
    tags: ["Scholarships", "Donors"],
  },
  {
    pillar: "p3",
    name: "ID & Admit Card Generator",
    desc: "Custom template builder for Student ID cards, Examination Admit cards, and Staff cards.",
    tags: ["ID Cards", "Templates"],
  },
  {
    pillar: "p3",
    name: "Certificates Generator",
    desc: "Design and issue official school leaving, character, conduct, and completion certificates.",
    tags: ["Certificates", "Transcripts"],
  },
  {
    pillar: "p4",
    name: "Fee Challans & Billing (PKR)",
    desc: "Custom fee heads, fee collection, digital & printable challans, due fee invoices, paid receipts.",
    tags: ["Fee Challan", "PKR Billing", "Invoicing"],
  },
  {
    pillar: "p4",
    name: "Automated Late Fees & SMS Alerts",
    desc: "Configurable early-bird discounts, late fee surcharges, and automated SMS due fee reminders.",
    tags: ["Discounts", "SMS Reminders"],
  },
  {
    pillar: "p4",
    name: "Accounting Ledger & Cash Book",
    desc: "Income & expense heads, income ledger, petty cash tracking, and financial statements in PKR.",
    tags: ["Accounting", "Ledger", "Finance"],
  },
  {
    pillar: "p4",
    name: "HR Designation & Departments",
    desc: "Manage institutional hierarchy, department groupings, and employee designations.",
    tags: ["HR", "Departments"],
  },
  {
    pillar: "p4",
    name: "Teacher & Staff Directory",
    desc: "Teacher profiles, rating system, class lecture assignments, and staff records.",
    tags: ["Teachers", "Staff"],
  },
  {
    pillar: "p4",
    name: "Leave Management Workflow",
    desc: "Leave types, application submission, approval/decline workflows, and attendance integration.",
    tags: ["Leave", "Approvals"],
  },
  {
    pillar: "p4",
    name: "Payroll & Salary Engine (PKR)",
    desc: "Salary grades, salary slip processing, Provident Fund logs, and payroll history in PKR.",
    tags: ["Payroll", "Salaries"],
  },
  {
    pillar: "p5",
    name: "Inventory & Store Logistics",
    desc: "Suppliers, warehouses, product categories, store purchases, item logs, and stock issuing.",
    tags: ["Inventory", "Supplies", "Stock"],
  },
  {
    pillar: "p5",
    name: "Asset Management & Vendors",
    desc: "Vendor records, fixed asset logging, store categorization, and asset issue histories.",
    tags: ["Assets", "Vendors"],
  },
  {
    pillar: "p5",
    name: "Library & E-Books Engine",
    desc: "Book cataloging, member registration, book issue/return logs, and digital e-books.",
    tags: ["Library", "Books", "E-Books"],
  },
  {
    pillar: "p5",
    name: "Transport & Van Logistics",
    desc: "Vehicle tracking, transport route mapping, driver logs, and transport member allocation.",
    tags: ["Transport", "Vans", "Routes"],
  },
  {
    pillar: "p5",
    name: "Hostel & Dorm Management",
    desc: "Hostel building profiles, room allocation, and hostel member records.",
    tags: ["Hostel", "Dormitory", "Rooms"],
  },
  {
    pillar: "p6",
    name: "Multi-Channel Alert System (SMS/Email)",
    desc: "Integrated SMS gateway, Email alerts, system inbox, compose messaging, notice boards.",
    tags: ["SMS", "Email", "Messaging"],
  },
  {
    pillar: "p6",
    name: "Announcements & News",
    desc: "Publish notices, news updates, public exam notices, and institutional holiday calendars.",
    tags: ["Notice", "News", "Holidays"],
  },
  {
    pillar: "p6",
    name: "Complaint Management System",
    desc: "Categorized complaint logging, tracking, and resolution workflows.",
    tags: ["Complaints", "Feedback"],
  },
  {
    pillar: "p6",
    name: "20+ Comprehensive Report Suites",
    desc: "Real-time reports for fees in PKR, income/expense, attendance, library, and payroll.",
    tags: ["Reports", "Analytics"],
  },
  {
    pillar: "p6",
    name: "Frontend CMS & Media Gallery",
    desc: "Public school website builder, hero sliders, event photo galleries, and FAQ engine.",
    tags: ["CMS", "Website", "Gallery"],
  },
  {
    pillar: "p6",
    name: "SaaS Subscription Settings",
    desc: "Package tiers, subscription plans, slider banners, and billing configurations.",
    tags: ["SaaS", "Billing", "Packages"],
  },
];

export const cognitaBenefits = [
  {
    cat: "exec",
    catName: "Executive Governance & Administration",
    feature: "Multi-Tenant Branch Architecture with RBAC",
    advantage:
      "Allows central executive leadership to oversee multiple campuses across cities while granting strict role-specific permissions to local personnel.",
    benefit:
      "Eliminates administrative blind spots across satellite campuses and guarantees strict data privacy compliance.",
  },
  {
    cat: "exec",
    catName: "Executive Governance & Administration",
    feature: "Comprehensive Analytics & 20+ Report Suites",
    advantage:
      "Generates real-time financial (PKR), academic, attendance, and operational reports across all branches on demand.",
    benefit:
      "Provides executive boards and owners with immediate data clarity to guide strategic expansion and precise budget planning.",
  },
  {
    cat: "academic",
    catName: "Academics & Examination Management",
    feature: "Automated Examination & Grading Engine",
    advantage:
      "Automatically processes marks, calculates merit rankings, generates grade cards, and formats official mark sheets.",
    benefit:
      "Eliminates hundreds of manual calculation hours per term, reducing faculty burnout and grading errors.",
  },
  {
    cat: "academic",
    catName: "Academics & Examination Management",
    feature: "Digital Lesson Planning & Syllabus Tracker",
    advantage:
      "Enables teachers to publish lesson timelines, syllabus milestones, and learning materials centrally.",
    benefit:
      "Ensures uniform curriculum delivery across all sections and branches while maintaining academic transparency.",
  },
  {
    cat: "finance",
    catName: "Fee Recovery & Financial Operations (PKR)",
    feature: "Automated Fee Challans & SMS Payment Reminders",
    advantage:
      "Systematically applies fee heads, discounts, and late fees while triggering automated SMS reminders to guardians.",
    benefit:
      "Reduces outstanding dues, accelerates fee recovery in PKR, and eliminates manual challan reconciliation errors.",
  },
  {
    cat: "finance",
    catName: "Fee Recovery & Financial Operations (PKR)",
    feature: "Integrated Expense Ledger & Payroll Processing",
    advantage:
      "Tracks staff salary grades, employee leave, Provident Fund logs, and operational overhead within a single workflow.",
    benefit:
      "Simplifies audit readiness, prevents cash leakage, and ensures precise budgetary control.",
  },
  {
    cat: "ops",
    catName: "Operations & Resource Logistics",
    feature: "Unified Campus Logistics (Transport, Hostel, Inventory)",
    advantage:
      "Tracks assets, store supplies, hostel room allocations, and van routes inside the same database as student records.",
    benefit:
      "Removes the expense and complexity of purchasing and maintaining multiple third-party software subscriptions.",
  },
  {
    cat: "ops",
    catName: "Operations & Resource Logistics",
    feature: "Automated Attendance & Multi-Channel SMS Alerts",
    advantage:
      "Logs daily attendance for students and staff with instant SMS notification alerts sent directly to parents.",
    benefit:
      "Builds a secure, accountable campus environment where families stay informed about student safety.",
  },
];

export const cognitaRoles = {
  superadmin: {
    role: "Super Admin",
    scope: "Global System / All Branches & Schools",
    perms: [
      "Full multi-tenant control",
      "Manage all branch instances",
      "System subscription billing",
      "Global reports & audit logs",
      "Role permission customization",
    ],
    view: "Executive Overview Dashboard with cross-campus analytics.",
  },
  admin: {
    role: "Campus Principal / Admin",
    scope: "Single Campus / Branch Level",
    perms: [
      "Manage campus staff & students",
      "Approve leaves & expenses",
      "Publish announcements",
      "Configure campus settings",
      "Access branch reports",
    ],
    view: "Campus Operations Command Center.",
  },
  teacher: {
    role: "Teacher / Instructor",
    scope: "Assigned Classes & Subjects",
    perms: [
      "Log student attendance",
      "Create lesson plans",
      "Distribute assignments",
      "Input exam marks & ratings",
      "Request leave",
    ],
    view: "Teacher Academic Dashboard & Class Routine.",
  },
  accountant: {
    role: "Accountant / Fee Officer",
    scope: "Financial Modules & Fee Collection (PKR)",
    perms: [
      "Collect student fees",
      "Issue fee challans & receipts",
      "Manage income/expense heads",
      "Process staff payroll in PKR",
      "Export financial statements",
    ],
    view: "Financial Operations & Fee Reconciliation Portal.",
  },
  student: {
    role: "Student",
    scope: "Personal Academic Record",
    perms: [
      "View class routine & syllabus",
      "Submit online homework",
      "Take online exams",
      "Download mark sheets & ID cards",
      "View library books",
    ],
    view: "Student Learning & Exam Portal.",
  },
  guardian: {
    role: "Guardian / Parent",
    scope: "Linked Wards / Children",
    perms: [
      "View ward attendance & results",
      "View online fee challans (PKR)",
      "Receive SMS alerts & notices",
      "View fee history & receipts",
    ],
    view: "Parent Engagement Portal.",
  },
  librarian: {
    role: "Librarian",
    scope: "Library & Digital Media",
    perms: [
      "Catalog physical books & e-books",
      "Register library members",
      "Issue & return books",
      "Track library fine collection",
    ],
    view: "Library Management Terminal.",
  },
  frontdesk: {
    role: "Front Desk / Receptionist",
    scope: "Front Office & Visitor Register",
    perms: [
      "Register campus visitors (CNIC/Phone)",
      "Log incoming/outgoing calls",
      "Track postal dispatches",
      "Manage complaint registrations",
    ],
    view: "Front Office Reception Interface.",
  },
  staff: {
    role: "General Staff",
    scope: "Personal HR Profile",
    perms: [
      "Log daily attendance",
      "View salary payslips in PKR",
      "Apply for leave",
      "Receive campus notices",
    ],
    view: "Employee Self-Service Profile.",
  },
};

export const cognitaPillars = [
  {
    id: "p1",
    title: "Governance & Security",
    description:
      "Multi-campus oversight & front-office administrative controls.",
    capabilities: [
      "Multi-Tenant Architecture",
      "Role-Based Access Control (RBAC)",
      "Visitor & Reception Logs",
      "Postal & Call Dispatch Tracking",
    ],
  },
  {
    id: "p2",
    title: "Academic & Examination",
    description: "Curriculum execution, online testing & automated grading.",
    capabilities: [
      "Curriculum & Class Routines",
      "Digital Lesson & Syllabus Tracking",
      "Offline & Online Question Banks",
      "Automated Marksheets & Merit Cards",
    ],
  },
  {
    id: "p3",
    title: "Student & Guardian",
    description: "Lifecycle onboarding, parent portals & scholastic logs.",
    capabilities: [
      "Online Admissions & Onboarding",
      "Dedicated Guardian Portals",
      "Promotion Engine & Transfers",
      "Scholarships & Donor Management",
    ],
  },
  {
    id: "p4",
    title: "Finance & Accounting",
    description: "Fee recovery, billing, cashbook ledgers & payroll.",
    capabilities: [
      "Fee Challans & Late Fees (PKR)",
      "Income/Expense Accounting Ledger",
      "HR Payroll & Salary Processing",
      "Leave Approval & Attendance Logs",
    ],
  },
  {
    id: "p5",
    title: "Campus Operations",
    description: "Asset inventory, van routes, hostels & library.",
    capabilities: [
      "Store Inventory & Vendor Tracking",
      "Library & E-Book Cataloging",
      "Transport Route & Van Logistics",
      "Hostel Building & Room Allocation",
    ],
  },
  {
    id: "p6",
    title: "Communication & Reporting",
    description: "Multi-channel broadcasting & 20+ report suites.",
    capabilities: [
      "Automated SMS & Email Broadcasts",
      "Internal Noticeboards & Complaints",
      "20+ Real-Time Report Suites",
      "Public Web CMS & Media Galleries",
    ],
  },
];
