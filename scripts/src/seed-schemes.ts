import { db } from "@workspace/db";
import { schemesTable } from "@workspace/db";

const schemes = [
  {
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description: "A national financial inclusion mission ensuring access to financial services like banking, savings and deposit accounts, remittance, credit, insurance, and pension at affordable costs.",
    category: "Finance",
    state: "Central",
    ministry: "Ministry of Finance",
    launchDate: "2014-08-28",
    deadline: null,
    benefits: [
      "Zero balance savings account",
      "RuPay debit card with Rs. 2 lakh accident insurance",
      "Rs. 30,000 life insurance coverage",
      "Overdraft facility up to Rs. 10,000 after 6 months",
      "Access to pension and insurance products"
    ],
    eligibility: [
      "Indian citizen above 10 years of age",
      "No existing bank account",
      "Valid identity proof (Aadhaar, Voter ID, etc.)"
    ],
    documents: [
      "Aadhaar Card or any official valid document",
      "Passport-sized photograph",
      "Address proof (if address different from Aadhaar)"
    ],
    applicationUrl: "https://pmjdy.gov.in",
    tags: ["banking", "financial inclusion", "savings", "insurance"],
    steps: [
      { stepNumber: 1, title: "Locate Bank Branch", description: "Visit any nationalized bank, regional rural bank, or microfinance institution near you." },
      { stepNumber: 2, title: "Fill Application Form", description: "Fill the PMJDY account opening form (available at bank or download from pmjdy.gov.in)." },
      { stepNumber: 3, title: "Submit Documents", description: "Submit Aadhaar card or any official valid document with your photograph." },
      { stepNumber: 4, title: "Account Activation", description: "Your zero-balance account will be opened immediately. You'll receive a RuPay debit card within 2 weeks." },
      { stepNumber: 5, title: "Mobile Banking", description: "Register for mobile banking to access your account digitally." }
    ],
    faqs: [
      { question: "Is there any minimum balance requirement?", answer: "No, PMJDY accounts are zero-balance accounts. You don't need to maintain any minimum balance." },
      { question: "Can I open account without Aadhaar?", answer: "Yes, you can use voter ID, driving license, NREGA job card, or any official document with photo and address." },
      { question: "What is the overdraft limit?", answer: "Up to Rs. 10,000 overdraft is available after 6 months of satisfactory account operation, subject to bank's discretion." }
    ]
  },
  {
    name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    description: "A flagship housing scheme aimed at providing affordable housing to urban poor by 2022, offering credit-linked subsidies and direct financial assistance for construction or enhancement of homes.",
    category: "Housing",
    state: "Central",
    ministry: "Ministry of Housing & Urban Affairs",
    launchDate: "2015-06-25",
    deadline: "2024-12-31",
    benefits: [
      "Credit-linked subsidy up to Rs. 2.67 lakh on home loan interest",
      "Direct benefit transfer for construction of new house",
      "Financial assistance up to Rs. 1.5 lakh for enhancement",
      "Technology innovation grant for affordable construction"
    ],
    eligibility: [
      "Indian citizen",
      "Annual household income up to Rs. 18 lakh (varies by category)",
      "Should not own a pucca house anywhere in India",
      "EWS: income up to Rs. 3 lakh; LIG: Rs. 3-6 lakh; MIG-I: Rs. 6-12 lakh; MIG-II: Rs. 12-18 lakh"
    ],
    documents: [
      "Aadhaar Card",
      "Income certificate",
      "Property documents or allotment letter",
      "Bank account details",
      "Caste certificate (for SC/ST/OBC)",
      "Self-declaration of not owning a pucca house"
    ],
    applicationUrl: "https://pmaymis.gov.in",
    tags: ["housing", "home loan", "subsidy", "urban"],
    steps: [
      { stepNumber: 1, title: "Check Eligibility", description: "Visit pmaymis.gov.in and check if you fall under EWS, LIG, MIG-I or MIG-II category based on your annual income." },
      { stepNumber: 2, title: "Apply Online or at CSC", description: "Apply online at pmaymis.gov.in or visit your nearest Common Service Centre (CSC) or urban local body office." },
      { stepNumber: 3, title: "Document Submission", description: "Upload scanned documents including Aadhaar, income certificate, and self-declaration." },
      { stepNumber: 4, title: "Bank Linkage", description: "For credit-linked subsidy, apply through an empanelled bank or housing finance company." },
      { stepNumber: 5, title: "Subsidy Transfer", description: "After approval, the subsidy amount is directly credited to your loan account, reducing your EMI." }
    ],
    faqs: [
      { question: "Can both husband and wife apply separately?", answer: "No, only one member per family can apply. However, the property can be co-owned and a woman co-applicant is preferred for CLSS." },
      { question: "What if I already have a home loan?", answer: "CLSS benefit can be availed even on existing home loans, provided the loan was taken after June 2015 and you haven't availed any housing benefit from central government earlier." }
    ]
  },
  {
    name: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    description: "World's largest government-funded health assurance scheme providing Rs. 5 lakh per family per year for secondary and tertiary hospitalization care to over 10 crore poor and vulnerable families.",
    category: "Health",
    state: "Central",
    ministry: "Ministry of Health & Family Welfare",
    launchDate: "2018-09-23",
    deadline: null,
    benefits: [
      "Health cover of Rs. 5 lakh per family per year",
      "Covers over 1,500 medical procedures",
      "Free cashless treatment at empanelled hospitals",
      "Coverage for pre-existing conditions from Day 1",
      "No cap on family size or age"
    ],
    eligibility: [
      "Listed in SECC 2011 database as rural poor",
      "Identified occupational category in urban areas (rag pickers, domestic workers, etc.)",
      "Enrolled under RSBY scheme"
    ],
    documents: [
      "Aadhaar Card or any government ID",
      "Ration card",
      "PM-JAY letter (if received)"
    ],
    applicationUrl: "https://pmjay.gov.in",
    tags: ["health", "insurance", "hospitalization", "cashless"],
    steps: [
      { stepNumber: 1, title: "Check Eligibility", description: "Visit pmjay.gov.in and click 'Am I Eligible?' Enter your mobile number and Aadhaar to check eligibility." },
      { stepNumber: 2, title: "Get Ayushman Card", description: "Visit your nearest empanelled hospital or CSC with your Aadhaar. Get your Ayushman card created for free." },
      { stepNumber: 3, title: "Hospital Admission", description: "At any empanelled hospital, show your Ayushman card. The hospital will verify your eligibility online." },
      { stepNumber: 4, title: "Cashless Treatment", description: "All covered treatments are cashless. Pre-authorization is obtained by the hospital for you." },
      { stepNumber: 5, title: "Discharge", description: "No payment needed at discharge for covered procedures. Follow-up costs within 15 days of discharge are also covered." }
    ],
    faqs: [
      { question: "Can I get treatment in any hospital?", answer: "Treatment is available at over 20,000 government and private empanelled hospitals across India. Find empanelled hospitals at pmjay.gov.in." },
      { question: "Is there a waiting period for pre-existing diseases?", answer: "No, PM-JAY covers all pre-existing conditions from the very first day of coverage." },
      { question: "What if I don't have my Ayushman card at the hospital?", answer: "Even without the card, you can get treatment by showing your Aadhaar or any ID. The hospital can verify your eligibility in real-time." }
    ]
  },
  {
    name: "PM KISAN Samman Nidhi",
    description: "A central government scheme providing income support of Rs. 6000 per year to all landholding farmer families in the country to supplement their financial needs.",
    category: "Agriculture",
    state: "Central",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchDate: "2019-02-24",
    deadline: null,
    benefits: [
      "Rs. 6,000 annual direct benefit transfer in three equal installments",
      "Rs. 2,000 per installment directly to bank account",
      "No restrictions on land holding size (after amendment)"
    ],
    eligibility: [
      "All landholding farmer families",
      "Must have valid Aadhaar linked bank account",
      "Excludes institutional land holders",
      "Excludes government servants, pensioners drawing Rs. 10,000+/month, income tax payers",
      "Excludes professionals like doctors, engineers, lawyers, chartered accountants"
    ],
    documents: [
      "Aadhaar Card (mandatory)",
      "Land ownership documents",
      "Bank account details linked to Aadhaar",
      "Mobile number"
    ],
    applicationUrl: "https://pmkisan.gov.in",
    tags: ["farmer", "agriculture", "income support", "direct benefit"],
    steps: [
      { stepNumber: 1, title: "Register Online", description: "Visit pmkisan.gov.in and click 'New Farmer Registration'. Enter your Aadhaar and mobile number." },
      { stepNumber: 2, title: "Fill Farm Details", description: "Enter your state, district, village, landholding details, and bank account information." },
      { stepNumber: 3, title: "Document Verification", description: "State/district officials will verify your land records and eligibility." },
      { stepNumber: 4, title: "Aadhaar Seeding", description: "Ensure your Aadhaar is linked to your bank account for direct benefit transfer." },
      { stepNumber: 5, title: "Receive Installments", description: "Once approved, Rs. 2000 will be credited to your account every 4 months automatically." }
    ],
    faqs: [
      { question: "How can I check my payment status?", answer: "Visit pmkisan.gov.in → 'Beneficiary Status' → Enter your Aadhaar/account number/mobile to check payment status." },
      { question: "What if my payment is stuck?", answer: "Check if your Aadhaar is linked to your bank. If Aadhaar seeding is done, contact your state nodal officer or call PM-KISAN helpline: 155261." }
    ]
  },
  {
    name: "Beti Bachao Beti Padhao",
    description: "A tri-ministerial scheme to address the declining child sex ratio and promote welfare and education of the girl child through community mobilization, awareness drives, and direct financial benefits.",
    category: "Women & Child",
    state: "Central",
    ministry: "Ministry of Women & Child Development",
    launchDate: "2015-01-22",
    deadline: null,
    benefits: [
      "Sukanya Samriddhi Account with higher interest rates (currently 8.2%)",
      "Tax exemption under Section 80C on deposits",
      "Maturity benefit (fully tax-free) at 21 years",
      "Partial withdrawal for higher education at 18 years",
      "Scholarships for girl students under various state programs"
    ],
    eligibility: [
      "Girl child from birth up to 10 years of age",
      "Indian resident",
      "Maximum 2 accounts per family (1 per girl child)"
    ],
    documents: [
      "Birth certificate of the girl child",
      "Aadhaar Card of parent/guardian",
      "Aadhaar Card or birth certificate of girl child",
      "Address proof of parent/guardian"
    ],
    applicationUrl: "https://wcd.nic.in",
    tags: ["girl child", "education", "women", "savings"],
    steps: [
      { stepNumber: 1, title: "Visit Post Office or Bank", description: "Visit any post office or authorized bank branch (SBI, BOB, Canara Bank, etc.)." },
      { stepNumber: 2, title: "Open Sukanya Samriddhi Account", description: "Fill the SSY account opening form and submit with required documents." },
      { stepNumber: 3, title: "Initial Deposit", description: "Minimum deposit of Rs. 250 to open account. Maximum Rs. 1.5 lakh per year." },
      { stepNumber: 4, title: "Annual Deposits", description: "Deposit at least Rs. 250 per year to keep account active. Make deposits until the girl turns 15." },
      { stepNumber: 5, title: "Maturity Claim", description: "Account matures when girl turns 21. Apply for withdrawal with ID proof and account documents." }
    ],
    faqs: [
      { question: "Can I open account for an adopted girl?", answer: "Yes, a legal guardian can open SSY account for an adopted girl child." },
      { question: "What happens if I miss annual deposits?", answer: "Account becomes inactive if minimum Rs. 250 is not deposited annually. It can be reactivated by paying Rs. 50 penalty + all missed annual minimums." }
    ]
  },
  {
    name: "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)",
    description: "Legal guarantee of 100 days of wage employment per year to rural households whose adult members volunteer to do unskilled manual work, providing livelihood security and rural infrastructure development.",
    category: "Employment",
    state: "Central",
    ministry: "Ministry of Rural Development",
    launchDate: "2006-02-02",
    deadline: null,
    benefits: [
      "100 days of guaranteed employment per household per year",
      "Minimum wage as per state rates (typically Rs. 200-350/day)",
      "Work within 5 km of residence, else transportation allowance",
      "Payment within 15 days of work completion",
      "Compensation if work not provided within 15 days of application"
    ],
    eligibility: [
      "Resident of rural area",
      "Adult member (18+ years) willing to do unskilled manual work",
      "Must register with local Gram Panchayat"
    ],
    documents: [
      "Aadhaar Card",
      "Bank or post office account details",
      "Recent photograph",
      "Residence proof"
    ],
    applicationUrl: "https://nrega.nic.in",
    tags: ["employment", "rural", "wages", "livelihood"],
    steps: [
      { stepNumber: 1, title: "Register with Gram Panchayat", description: "Submit registration form at your Gram Panchayat office with household details, adult members, and Aadhaar." },
      { stepNumber: 2, title: "Get Job Card", description: "Within 15 days, a Job Card with photo will be issued free of cost. This is your entitlement document." },
      { stepNumber: 3, title: "Apply for Work", description: "Submit written application for work to the Gram Panchayat or Programme Officer when you need employment." },
      { stepNumber: 4, title: "Work Allocation", description: "Work must be provided within 15 days. If not, you are entitled to unemployment allowance." },
      { stepNumber: 5, title: "Wage Payment", description: "Wages are transferred directly to your bank/post office account within 15 days of completion." }
    ],
    faqs: [
      { question: "What if the Gram Panchayat doesn't provide work within 15 days?", answer: "You're entitled to unemployment allowance: 1/4th of wage rate for first 30 days and 1/2 thereafter. Complain to Programme Officer if denied." },
      { question: "Can women apply?", answer: "Yes, at least 1/3rd of beneficiaries must be women. Women should be given work within 5 km of their home." }
    ]
  },
  {
    name: "National Scholarship Portal (NSP) Schemes",
    description: "One-stop platform for all scholarship schemes of central and state governments, providing financial assistance to meritorious students from economically weaker sections for pursuing higher education.",
    category: "Education",
    state: "Central",
    ministry: "Ministry of Education",
    launchDate: "2015-01-01",
    deadline: "2024-11-30",
    benefits: [
      "Pre-matric scholarship: Rs. 150-750/month + annual grant",
      "Post-matric scholarship: Full fee + maintenance allowance",
      "Merit-cum-means scholarship up to Rs. 50,000/year",
      "Top Class Education Scheme for premier institutions"
    ],
    eligibility: [
      "Indian student studying in recognized institution",
      "Annual family income below Rs. 8 lakh (varies by scheme)",
      "SC/ST/OBC/Minority/PwD as applicable",
      "Minimum 50-60% marks in previous exam (varies by scheme)"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "Income certificate",
      "Caste/community certificate",
      "Previous year marksheet",
      "Institution fee receipt",
      "Bonafide certificate"
    ],
    applicationUrl: "https://scholarships.gov.in",
    tags: ["scholarship", "education", "students", "financial aid"],
    steps: [
      { stepNumber: 1, title: "Register on NSP", description: "Visit scholarships.gov.in and click 'New Registration'. Create account with mobile number and basic details." },
      { stepNumber: 2, title: "Choose Scholarship", description: "Browse available scholarships filtered by state, level of education, and category." },
      { stepNumber: 3, title: "Fill Application", description: "Complete the application form with personal, academic, and bank details. Upload required documents." },
      { stepNumber: 4, title: "Institute Verification", description: "Your institution will verify your enrollment and marks. Follow up with your school/college." },
      { stepNumber: 5, title: "State Verification", description: "State nodal department verifies application. Track status on NSP portal." },
      { stepNumber: 6, title: "Disbursement", description: "Approved scholarship amount is directly credited to your Aadhaar-linked bank account." }
    ],
    faqs: [
      { question: "Can I apply for multiple scholarships?", answer: "Generally, you can apply for one scholarship per scheme. However, you may apply to different schemes (central + state) if rules permit." },
      { question: "What if I don't have Aadhaar?", answer: "Apply for Aadhaar first at your nearest Aadhaar enrollment center. In the meantime, you may apply with an Aadhaar Enrollment Receipt." }
    ]
  },
  {
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    description: "A scheme to provide collateral-free micro loans to non-corporate, non-farm small/micro enterprises through formal financial institutions for business development and expansion.",
    category: "Finance",
    state: "Central",
    ministry: "Ministry of Finance",
    launchDate: "2015-04-08",
    deadline: null,
    benefits: [
      "Shishu: Loans up to Rs. 50,000",
      "Kishore: Loans from Rs. 50,001 to Rs. 5 lakh",
      "Tarun: Loans from Rs. 5 lakh to Rs. 10 lakh",
      "No collateral required",
      "Competitive interest rates",
      "Mudra debit card for working capital management"
    ],
    eligibility: [
      "Non-agricultural, non-corporate micro/small business",
      "Indian citizen",
      "Business in manufacturing, trading, service sector",
      "Valid business plan"
    ],
    documents: [
      "Aadhaar Card and PAN Card",
      "Business registration/license (if applicable)",
      "Bank statements (last 6 months)",
      "Business plan or project report",
      "Quotation for machinery/equipment (if applicable)",
      "Caste certificate (for SC/ST/OBC preferential rates)"
    ],
    applicationUrl: "https://www.mudra.org.in",
    tags: ["loan", "business", "entrepreneur", "MSME", "self-employment"],
    steps: [
      { stepNumber: 1, title: "Prepare Business Plan", description: "Write a brief business plan describing your business, purpose of loan, and repayment capacity." },
      { stepNumber: 2, title: "Approach Bank or MFI", description: "Visit any bank, NBFC, or MFI that offers MUDRA loans. All major banks participate." },
      { stepNumber: 3, title: "Fill Application Form", description: "Complete the MUDRA loan application form at the bank with business and personal details." },
      { stepNumber: 4, title: "Document Submission", description: "Submit all required documents. Bank may conduct a brief interview." },
      { stepNumber: 5, title: "Loan Sanction", description: "Bank processes and sanctions loan typically within 7-30 days. Mudra Card issued for Shishu/Kishore loans." }
    ],
    faqs: [
      { question: "Is MUDRA applicable for agriculture?", answer: "No, MUDRA loans are for non-agricultural businesses. For agricultural credit, apply for Kisan Credit Card." },
      { question: "Can I apply online?", answer: "Yes, apply through Udyamimitra portal (udyamimitra.in) or through individual bank websites. PSB Loans in 59 Minutes portal also covers MUDRA loans." }
    ]
  },
  {
    name: "Swachh Bharat Mission - Grameen (SBM-G)",
    description: "Mission to make rural India open defecation free by providing financial assistance for construction of individual household latrines and improving sanitation infrastructure.",
    category: "Sanitation",
    state: "Central",
    ministry: "Ministry of Jal Shakti",
    launchDate: "2014-10-02",
    deadline: null,
    benefits: [
      "Rs. 12,000 financial assistance for toilet construction",
      "Rs. 15,000 for hilly and difficult areas",
      "Free access to Swachh Bharat App for tracking",
      "Community sanitation complex construction support",
      "Solid and liquid waste management grants to GPs"
    ],
    eligibility: [
      "Rural household without a functional toilet",
      "Below Poverty Line (BPL) or any household willing to construct",
      "Must agree to use toilet after construction"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "BPL certificate (if applicable)",
      "Self-declaration form for toilet construction"
    ],
    applicationUrl: "https://sbm.gov.in",
    tags: ["sanitation", "toilet", "rural", "cleanliness"],
    steps: [
      { stepNumber: 1, title: "Apply at Gram Panchayat", description: "Contact your Gram Panchayat or Swachh Bharat Mission coordinator with your application." },
      { stepNumber: 2, title: "Verification", description: "GP officials verify that you don't have a functional toilet." },
      { stepNumber: 3, title: "Construct Toilet", description: "Construct the toilet yourself using government-approved design. Cost is typically Rs. 10,000-15,000." },
      { stepNumber: 4, title: "Photo Documentation", description: "Take geo-tagged photos of constructed toilet and submit to GP." },
      { stepNumber: 5, title: "Incentive Payment", description: "After verification of use, Rs. 12,000 incentive is transferred directly to your bank account." }
    ],
    faqs: [
      { question: "Do I have to pay anything?", answer: "The incentive of Rs. 12,000 is provided after construction. You construct first, then receive the benefit. Some GPs may provide advance assistance." },
      { question: "What design should the toilet follow?", answer: "Follow the twin-pit design recommended by SBM. Your Swachh Bharat coordinator or GP can provide approved designs." }
    ]
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "A comprehensive crop insurance scheme that provides financial support to farmers suffering crop loss/damage due to unforeseen events like natural calamities, pests and diseases.",
    category: "Agriculture",
    state: "Central",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchDate: "2016-01-13",
    deadline: null,
    benefits: [
      "Maximum 2% premium for Kharif, 1.5% for Rabi crops",
      "5% premium for commercial/horticulture crops",
      "Government pays remaining premium (85-98%)",
      "Coverage from sowing to post-harvest losses",
      "Loss assessment within 72 hours of reporting"
    ],
    eligibility: [
      "All farmers growing notified crops in notified areas",
      "Loanee farmers enrolled compulsorily",
      "Non-loanee farmers can opt in voluntarily"
    ],
    documents: [
      "Land records / ownership proof",
      "Bank account details",
      "Aadhaar Card",
      "Sowing certificate"
    ],
    applicationUrl: "https://pmfby.gov.in",
    tags: ["agriculture", "crop insurance", "farmer", "risk protection"],
    steps: [
      { stepNumber: 1, title: "Contact Bank or CSC", description: "Visit your bank, CSC, or insurance company office before the cut-off date (typically 2 weeks after sowing)." },
      { stepNumber: 2, title: "Fill Proposal Form", description: "Complete the insurance proposal with crop type, area, and land details." },
      { stepNumber: 3, title: "Pay Premium", description: "Pay the nominal farmer's share of premium (2% for Kharif, 1.5% for Rabi)." },
      { stepNumber: 4, title: "Receive Policy", description: "Get your crop insurance policy certificate and note the claim contact numbers." },
      { stepNumber: 5, title: "Report Crop Loss", description: "In case of crop damage, report within 72 hours via PMFBY app, helpline 14447, or nearest bank/CSC." }
    ],
    faqs: [
      { question: "What events are covered?", answer: "Covered events include drought, flood, cyclone, hailstorm, landslide, pests, and diseases. Post-harvest losses for specific crops are also covered." },
      { question: "How is claim amount calculated?", answer: "Claims are calculated based on yield data from Crop Cutting Experiments (CCE). If actual yield < threshold yield, claim is proportional." }
    ]
  },
  {
    name: "Atal Pension Yojana (APY)",
    description: "A government-backed pension scheme focused on workers in the unorganized sector, guaranteeing a fixed minimum pension of Rs. 1,000 to Rs. 5,000 per month after age 60.",
    category: "Social Welfare",
    state: "Central",
    ministry: "Ministry of Finance (NPS Trust / PFRDA)",
    launchDate: "2015-05-09",
    deadline: null,
    benefits: [
      "Guaranteed pension of Rs. 1,000 to Rs. 5,000/month after 60",
      "Government co-contribution (50% or Rs. 1,000/year) for 5 years for eligible subscribers",
      "Spouse pension in case of subscriber's death",
      "Return of corpus to nominee after both subscriber and spouse death",
      "Tax benefit under Section 80CCD(1)"
    ],
    eligibility: [
      "Indian citizen aged 18-40 years",
      "Not an income tax payer",
      "Should have a savings bank account",
      "Not covered under any statutory social security scheme"
    ],
    documents: [
      "Aadhaar Card",
      "Bank savings account",
      "Mobile number linked to bank account"
    ],
    applicationUrl: "https://npscra.nsdl.co.in",
    tags: ["pension", "retirement", "unorganized sector", "social security"],
    steps: [
      { stepNumber: 1, title: "Visit Bank Branch", description: "Visit your bank branch where you have a savings account. Most nationalized banks and many private banks offer APY." },
      { stepNumber: 2, title: "Fill APY Form", description: "Complete the APY registration form with your Aadhaar, bank account, and nomination details. Choose your desired pension amount." },
      { stepNumber: 3, title: "Auto-Debit Setup", description: "Your monthly contribution will be auto-debited from your savings account. Ensure sufficient balance on debit date." },
      { stepNumber: 4, title: "Receive PRAN", description: "You'll receive a Permanent Retirement Account Number (PRAN) to track your APY account." },
      { stepNumber: 5, title: "Pension at 60", description: "At age 60, apply to your bank for pension commencement. Pension will be deposited monthly to your bank account." }
    ],
    faqs: [
      { question: "What is the contribution amount?", answer: "Contribution depends on your age and desired pension. Younger subscribers pay less. E.g., for Rs. 5000/month pension, joining at 18: Rs. 210/month; at 35: Rs. 902/month." },
      { question: "Can I increase my pension amount?", answer: "Yes, you can change your pension amount once per year. Go to your bank and request for modification." }
    ]
  },
  {
    name: "PM SVANidhi - Street Vendor Loan Scheme",
    description: "Affordable working capital loan scheme for street vendors to resume their livelihoods affected by COVID-19, with incentives for digital transactions and reward for timely repayment.",
    category: "Employment",
    state: "Central",
    ministry: "Ministry of Housing & Urban Affairs",
    launchDate: "2020-06-01",
    deadline: null,
    benefits: [
      "Initial loan of Rs. 10,000 for working capital",
      "Enhanced loan of Rs. 20,000 after timely repayment",
      "Further Rs. 50,000 for continued good repayment",
      "7% interest subsidy per annum",
      "Monthly cashback of Rs. 100 on digital transactions",
      "Credit score building"
    ],
    eligibility: [
      "Street vendors who were vending before March 24, 2020 in urban areas",
      "Have Certificate of Vending or identity card from ULB",
      "Or have letter of recommendation from ULB or Town Vending Committee",
      "Or identified via survey by ULB"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "Certificate of vending or letter of recommendation",
      "Photograph"
    ],
    applicationUrl: "https://pmsvanidhi.mohua.gov.in",
    tags: ["street vendor", "loan", "micro-credit", "urban livelihood"],
    steps: [
      { stepNumber: 1, title: "Register on Portal", description: "Visit pmsvanidhi.mohua.gov.in or download PM SVANidhi app. Register with Aadhaar and mobile." },
      { stepNumber: 2, title: "Complete Vending Verification", description: "Get your vending details verified by your Urban Local Body (ULB) or Town Vending Committee." },
      { stepNumber: 3, title: "Apply for Loan", description: "Apply for Rs. 10,000 working capital loan through the portal or nearest bank/MFI." },
      { stepNumber: 4, title: "Loan Sanction", description: "Loan is processed and disbursed to your bank account. Interest subsidy is applied automatically." },
      { stepNumber: 5, title: "Use Digital Payments", description: "Use UPI/QR code for transactions. Monthly cashback of Rs. 100 for digital transactions helps earn extra." }
    ],
    faqs: [
      { question: "Do I need collateral for the loan?", answer: "No collateral is required for SVANidhi loans. It is a collateral-free, guarantee-free loan scheme." },
      { question: "What if I don't have a vending certificate?", answer: "You can still apply with a letter of recommendation from the ULB, urban local body survey identification, or Town Vending Committee recommendation." }
    ]
  }
];

async function seedSchemes() {
  console.log("Seeding schemes...");
  
  const existing = await db.select({ id: schemesTable.id }).from(schemesTable).limit(1);
  if (existing.length > 0) {
    console.log("Schemes already seeded. Skipping.");
    return;
  }
  
  for (const scheme of schemes) {
    await db.insert(schemesTable).values(scheme);
  }
  
  console.log(`Seeded ${schemes.length} schemes successfully!`);
}

seedSchemes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Error seeding:", err);
    process.exit(1);
  });
