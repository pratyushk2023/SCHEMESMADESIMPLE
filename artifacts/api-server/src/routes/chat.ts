import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { chatHistoryTable } from "@workspace/db";
import { SendChatMessageBody, SendChatMessageResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const LEGAL_KNOWLEDGE_BASE: Record<string, { answer: string; sources: string[] }> = {
  "right to information": {
    answer: "The Right to Information Act (RTI) 2005 gives every citizen the right to access information held by public authorities. You can file an RTI application for Rs. 10 (fee waived for BPL card holders). The public authority must respond within 30 days (48 hours for life/liberty matters).",
    sources: ["Right to Information Act, 2005", "Section 7 - Disposal of requests"]
  },
  "rti": {
    answer: "The Right to Information Act (RTI) 2005 gives every citizen the right to access information held by public authorities. You can file an RTI application for Rs. 10 (fee waived for BPL card holders). The public authority must respond within 30 days (48 hours for life/liberty matters).",
    sources: ["Right to Information Act, 2005", "Section 7 - Disposal of requests"]
  },
  "pension": {
    answer: "Indian citizens are entitled to various pension schemes: Old Age Pension under IGNOAPS for citizens above 60 years below poverty line; National Pension System (NPS) for organized sector workers; Atal Pension Yojana for unorganized sector workers aged 18-40.",
    sources: ["Indira Gandhi National Old Age Pension Scheme", "National Pension System Act, 2013", "Pradhan Mantri Jan Dhan Yojana"]
  },
  "fundamental rights": {
    answer: "The Constitution of India guarantees 6 fundamental rights: Right to Equality (Articles 14-18), Right to Freedom (Articles 19-22), Right Against Exploitation (Articles 23-24), Right to Freedom of Religion (Articles 25-28), Cultural and Educational Rights (Articles 29-30), and Right to Constitutional Remedies (Article 32).",
    sources: ["Constitution of India, Part III", "Articles 12-35"]
  },
  "bribery": {
    answer: "Demanding or accepting bribes is a criminal offence under the Prevention of Corruption Act, 1988. If an official demands a bribe, you can report it to the Central Vigilance Commission (CVC) at 011-24600200, or the Anti-Corruption Bureau. You can also file a complaint at the nearest police station under Section 7 of the PC Act.",
    sources: ["Prevention of Corruption Act, 1988", "Central Vigilance Commission Act, 2003"]
  },
  "consumer rights": {
    answer: "As a consumer, you have rights under the Consumer Protection Act 2019: Right to Safety, Right to Information, Right to Choose, Right to be Heard, Right to Seek Redressal, and Right to Consumer Education. You can file complaints at the National Consumer Disputes Redressal Commission (NCDRC) or state/district consumer forums.",
    sources: ["Consumer Protection Act, 2019", "Consumer Protection Rules, 2020"]
  },
  "labour": {
    answer: "Key labour rights in India include: Minimum Wage Act ensures minimum pay; Factories Act regulates working conditions; Employee Provident Fund (EPF) for retirement savings; Employee State Insurance (ESI) for health coverage; Gratuity Act provides gratuity after 5 years of service; Payment of Bonus Act ensures annual bonus.",
    sources: ["Minimum Wages Act, 1948", "Factories Act, 1948", "EPF Act, 1952"]
  },
  "education": {
    answer: "Right to Education Act (RTE) 2009 guarantees free and compulsory education for children aged 6-14. Government schools must reserve 25% seats for disadvantaged children. Mid-Day Meal scheme provides nutritious meals. Scholarships are available under PM Scholarship Scheme, Central Sector Scheme, and state-specific programs.",
    sources: ["Right to Education Act, 2009", "PM Scholarship Scheme Guidelines"]
  },
  "health": {
    answer: "Key health entitlements: Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides Rs. 5 lakh annual health coverage to 10 crore+ poor families. ASHA workers provide free community health services. Government hospitals provide free treatment to BPL patients. National Health Mission covers immunization and maternal health.",
    sources: ["Pradhan Mantri Jan Arogya Yojana Guidelines", "National Health Mission, 2013"]
  },
  "housing": {
    answer: "Pradhan Mantri Awas Yojana (PMAY) provides affordable housing assistance. Urban PMAY offers credit-linked subsidy for home loans. Rural PMAY (PMAY-G) provides financial assistance to construct houses. EWS/LIG categories get maximum subsidy. Apply through your local municipality or Gram Panchayat.",
    sources: ["Pradhan Mantri Awas Yojana Guidelines", "PMAY-G Operational Guidelines"]
  },
  "women": {
    answer: "Key rights and schemes for women: Protection of Women from Domestic Violence Act 2005; Sexual Harassment at Workplace Act 2013; Maternity Benefit Act ensures 26 weeks paid leave; Beti Bachao Beti Padhao scheme; One Stop Centre Scheme for violence victims; PM Matru Vandana Yojana for Rs. 5000 maternity benefit.",
    sources: ["Protection of Women from Domestic Violence Act, 2005", "Maternity Benefit Act, 1961"]
  },
  "farmer": {
    answer: "Key schemes for farmers: PM-KISAN provides Rs. 6000/year to all farmer families; Pradhan Mantri Fasal Bima Yojana (PMFBY) for crop insurance; Kisan Credit Card for agricultural credit; PM Krishi Sinchayi Yojana for irrigation; e-NAM platform for online agricultural trading.",
    sources: ["PM-KISAN Guidelines", "Pradhan Mantri Fasal Bima Yojana"]
  },
  "disability": {
    answer: "Rights of Persons with Disabilities Act 2016 guarantees equal rights. Benefits include: 3% reservation in government jobs; 5% reservation in educational institutions; UDID (Unique Disability ID) card for accessing benefits; Accessible India Campaign for infrastructure; financial assistance under ADIP scheme for aids and appliances.",
    sources: ["Rights of Persons with Disabilities Act, 2016", "ADIP Scheme Guidelines"]
  },
};

function getLegalResponse(message: string): { reply: string; sources: string[] } {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(LEGAL_KNOWLEDGE_BASE)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  if (lowerMessage.includes("scheme") || lowerMessage.includes("yojana") || lowerMessage.includes("benefit")) {
    return {
      reply: "I can help you find government schemes! Please use the Schemes section to search for programs that match your needs. You can filter by category (agriculture, health, education, etc.) and your state. Each scheme has detailed eligibility criteria, required documents, and step-by-step application guidance. Is there a specific type of scheme you're looking for?",
      sources: ["government.in", "myscheme.gov.in"]
    };
  }
  
  if (lowerMessage.includes("complaint") || lowerMessage.includes("grievance")) {
    return {
      reply: "To file a grievance against a government official or department: (1) First try the department's internal grievance mechanism. (2) File on CPGRAMS (Centralized Public Grievance Redress and Monitoring System) at pgportal.gov.in. (3) Contact the concerned ministry's public grievance officer. (4) For corruption specifically, contact Central Vigilance Commission at 011-24600200.",
      sources: ["CPGRAMS Portal", "Central Vigilance Commission"]
    };
  }
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("help")) {
    return {
      reply: "Hello! I'm your legal awareness assistant for government schemes and citizen rights. I can help you understand: your fundamental rights, RTI (Right to Information), how to report corruption, women's rights, farmer entitlements, health schemes, housing benefits, education rights, and more. What would you like to know about?",
      sources: []
    };
  }
  
  return {
    reply: "I'm specialized in Indian government schemes, citizen rights, and legal procedures. I can help with topics like: Right to Information (RTI), fundamental rights, pension schemes, consumer rights, labour rights, education entitlements, health schemes (Ayushman Bharat), housing (PMAY), women's rights, farmer schemes (PM-KISAN), and how to file grievances or report corruption. Please ask me about any of these topics!",
    sources: ["Constitution of India", "Government of India Official Portals"]
  };
}

router.post("/chat", async (req, res) => {
  try {
    const body = SendChatMessageBody.parse(req.body);
    const { reply, sources } = getLegalResponse(body.message);
    
    await db.insert(chatHistoryTable).values({
      userMessage: body.message,
      botReply: reply,
      language: body.language ?? "en",
    });
    
    const data = SendChatMessageResponse.parse({ reply, sources });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
