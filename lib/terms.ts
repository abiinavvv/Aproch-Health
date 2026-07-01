import type { PolicySection } from "@/lib/legal-document";

export const termsPurpose: string[] = [
  "These Terms and Conditions govern access to and use of the Aproch platform, including all services, features, communications, appointments, and interactions facilitated through the Platform.",
  "By creating an account, accessing the Platform, booking an Appointment, or otherwise using Aproch, the User agrees to be bound by these Terms and Conditions.",
];

export const termsSections: PolicySection[] = [
  {
    id: "general",
    title: "A. General",
    subsections: [
      {
        number: 1,
        title: "Definitions",
        blocks: [
          {
            type: "paragraph",
            text: '"Platform" means Aproch, including its website, mobile application, communication systems, and related services.',
          },
          {
            type: "paragraph",
            text: '"User" means any person who accesses or uses the Platform.',
          },
          {
            type: "paragraph",
            text: '"Client" means a User seeking mental health services through the Platform.',
          },
          {
            type: "paragraph",
            text: '"Professional" means an independent psychologist, therapist, counsellor, or mental health professional listed on the Platform.',
          },
          {
            type: "paragraph",
            text: '"Appointment" means a scheduled consultation between a Client and a Professional.',
          },
          {
            type: "paragraph",
            text: '"Content" means any information, text, images, graphics, audio, video, messages, or materials available on the Platform.',
          },
        ],
      },
      {
        number: 2,
        title: "Acceptance of Terms",
        blocks: [
          {
            type: "paragraph",
            text: "By using the Platform, Users acknowledge that they have read, understood, and agreed to these Terms and Conditions.",
          },
          {
            type: "paragraph",
            text: "If a User does not agree with these Terms, the User must discontinue use of the Platform immediately.",
          },
        ],
      },
      {
        number: 3,
        title: "Eligibility",
        blocks: [
          {
            type: "paragraph",
            text: "Users must be at least eighteen (18) years of age to create an account and independently access services.",
          },
          {
            type: "paragraph",
            text: "Users represent and warrant that all information provided to Aproch is accurate, current, and complete.",
          },
          {
            type: "paragraph",
            text: "Aproch reserves the right to restrict, suspend, or terminate access where eligibility requirements are not met.",
          },
        ],
      },
      {
        number: 4,
        title: "Account Registration",
        blocks: [
          {
            type: "paragraph",
            text: "Certain Platform features may require account creation.",
          },
          { type: "paragraph", text: "Users agree to:" },
          {
            type: "list",
            items: [
              "Provide accurate information",
              "Maintain updated account details",
              "Use their own identity",
              "Not create fraudulent or misleading accounts",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch may request identity verification at any time.",
          },
        ],
      },
      {
        number: 5,
        title: "Account Security",
        blocks: [
          {
            type: "paragraph",
            text: "Users are solely responsible for maintaining the confidentiality of account credentials.",
          },
          {
            type: "paragraph",
            text: "Users shall immediately notify Aproch of any unauthorized access or suspected security breach.",
          },
          {
            type: "paragraph",
            text: "Aproch shall not be responsible for losses arising from failure to protect account credentials.",
          },
        ],
      },
    ],
  },
  {
    id: "platform-services",
    title: "B. Platform Services",
    subsections: [
      {
        number: 6,
        title: "Nature of Services",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch is a technology platform that facilitates connections between Clients and independent Professionals.",
          },
          {
            type: "paragraph",
            text: "Aproch does not provide therapy, counselling, psychiatric treatment, diagnosis, healthcare services, or medical advice directly.",
          },
          {
            type: "paragraph",
            text: "Professional services are provided solely by independent Professionals.",
          },
        ],
      },
      {
        number: 7,
        title: "Independent Professional Relationship",
        blocks: [
          {
            type: "paragraph",
            text: "Professionals listed on the Platform are independent practitioners.",
          },
          {
            type: "paragraph",
            text: "Nothing in these Terms shall create:",
          },
          {
            type: "list",
            items: [
              "Employment relationships",
              "Agency relationships",
              "Partnerships",
              "Joint ventures",
            ],
          },
          {
            type: "paragraph",
            text: "Professionals remain solely responsible for their professional conduct and services.",
          },
        ],
      },
      {
        number: 8,
        title: "Appointment Booking",
        blocks: [
          {
            type: "paragraph",
            text: "Appointments may be booked through the Platform subject to availability.",
          },
          {
            type: "paragraph",
            text: "Booking confirmation is issued only after successful payment and confirmation.",
          },
          {
            type: "paragraph",
            text: "Aproch reserves the right to decline, modify, or cancel bookings where necessary.",
          },
        ],
      },
      {
        number: 9,
        title: "User Responsibilities",
        blocks: [
          { type: "paragraph", text: "Users agree to:" },
          {
            type: "list",
            items: [
              "Provide accurate information",
              "Participate respectfully",
              "Follow applicable laws",
              "Use the Platform in good faith",
              "Comply with all Platform policies",
            ],
          },
          {
            type: "paragraph",
            text: "Users are responsible for maintaining appropriate internet connectivity and devices required for consultations.",
          },
        ],
      },
    ],
  },
  {
    id: "client-conduct",
    title: "C. Client Conduct",
    subsections: [
      {
        number: 10,
        title: "Prohibited Activities",
        blocks: [
          { type: "paragraph", text: "Users shall not:" },
          {
            type: "list",
            items: [
              "Violate laws or regulations",
              "Impersonate another person",
              "Submit false information",
              "Access accounts without authorization",
              "Interfere with Platform operations",
              "Attempt to gain unauthorized access to systems",
              "Upload malicious software or harmful content",
            ],
          },
        ],
      },
      {
        number: 11,
        title: "Harassment Policy",
        blocks: [
          { type: "paragraph", text: "Users shall not engage in:" },
          {
            type: "list",
            items: [
              "Harassment",
              "Threats",
              "Bullying",
              "Intimidation",
              "Hate speech",
              "Discriminatory conduct",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch maintains a zero-tolerance approach toward harassment.",
          },
        ],
      },
      {
        number: 12,
        title: "Abuse Towards Professionals",
        blocks: [
          {
            type: "paragraph",
            text: "Clients shall treat Professionals with dignity and respect.",
          },
          {
            type: "paragraph",
            text: "Verbal abuse, intimidation, threats, harassment, offensive language, stalking, or inappropriate conduct directed toward Professionals may result in immediate suspension or termination of Platform access.",
          },
        ],
      },
      {
        number: 13,
        title: "Fraud Prevention",
        blocks: [
          { type: "paragraph", text: "Users shall not:" },
          {
            type: "list",
            items: [
              "Submit fraudulent claims",
              "Manipulate payment systems",
              "Engage in chargeback abuse",
              "Create duplicate accounts for deceptive purposes",
              "Misrepresent facts during investigations",
            ],
          },
          {
            type: "paragraph",
            text: "Fraudulent activity may result in account termination and legal action.",
          },
        ],
      },
    ],
  },
  {
    id: "professional-conduct",
    title: "D. Professional Conduct",
    subsections: [
      {
        number: 14,
        title: "Professional Standards",
        blocks: [
          {
            type: "paragraph",
            text: "Professionals are expected to maintain professional competence, ethical conduct, integrity, confidentiality, and respect for Clients.",
          },
          {
            type: "paragraph",
            text: "Professionals shall comply with applicable laws, regulations, licensing requirements, and ethical standards.",
          },
        ],
      },
      {
        number: 15,
        title: "Professional Misconduct",
        blocks: [
          {
            type: "paragraph",
            text: "Professional misconduct may include:",
          },
          {
            type: "list",
            items: [
              "Misrepresentation of qualifications",
              "Breach of confidentiality",
              "Harassment",
              "Exploitation of Clients",
              "Discrimination",
              "Negligence",
              "Unethical behaviour",
              "Repeated failure to attend Appointments",
              "Conduct endangering Client safety",
            ],
          },
          {
            type: "paragraph",
            text: "Such conduct may result in disciplinary action.",
          },
        ],
      },
      {
        number: 16,
        title: "Professional Verification",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may verify professional qualifications, credentials, registrations, licenses, and supporting documentation.",
          },
          {
            type: "paragraph",
            text: "Professionals may be required to submit updated documentation periodically.",
          },
          {
            type: "paragraph",
            text: "Verification does not constitute endorsement or guarantee of professional performance.",
          },
        ],
      },
      {
        number: 17,
        title: "Removal of Professionals",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch reserves the right to suspend, restrict, or remove any Professional where:",
          },
          {
            type: "list",
            items: [
              "Policy violations occur",
              "Misconduct is suspected",
              "Credentials cannot be verified",
              "Safety concerns arise",
              "Legal or regulatory concerns exist",
            ],
          },
          {
            type: "paragraph",
            text: "Removal decisions shall be made at Aproch's discretion.",
          },
        ],
      },
    ],
  },
  {
    id: "safety-reporting",
    title: "E. Safety & Reporting",
    subsections: [
      {
        number: 18,
        title: "Reporting Procedure",
        blocks: [
          {
            type: "paragraph",
            text: "Users may report concerns, misconduct, abuse, safety issues, policy violations, or unethical conduct through Aproch's designated reporting channels.",
          },
          {
            type: "paragraph",
            text: "Reports may be submitted through:",
          },
          {
            type: "list",
            items: [
              "WhatsApp",
              "Contact Number",
              "Email",
              "Platform support channels",
            ],
          },
        ],
      },
      {
        number: 19,
        title: "Investigation Procedure",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may investigate reported concerns.",
          },
          {
            type: "paragraph",
            text: "Investigations may include:",
          },
          {
            type: "list",
            items: [
              "Reviewing communications",
              "Requesting supporting documentation",
              "Seeking clarification from involved parties",
              "Temporarily restricting access where necessary",
            ],
          },
          {
            type: "paragraph",
            text: "Users agree to cooperate with investigations.",
          },
        ],
      },
      {
        number: 20,
        title: "False Complaints",
        blocks: [
          {
            type: "paragraph",
            text: "Knowingly false, malicious, misleading, or fraudulent complaints may result in account suspension, termination, or other corrective action.",
          },
        ],
      },
      {
        number: 21,
        title: "Client Safety Measures",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch prioritizes Client safety.",
          },
          {
            type: "paragraph",
            text: "Where concerns arise regarding misconduct, safety risks, ethical violations, or unlawful behaviour, Aproch may:",
          },
          {
            type: "list",
            items: [
              "Restrict access",
              "Suspend accounts",
              "Remove Professionals",
              "Refer matters to regulatory authorities",
              "Contact law enforcement where legally required",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "legal",
    title: "F. Legal",
    subsections: [
      {
        number: 22,
        title: "Limitation of Liability",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch acts solely as a technology platform.",
          },
          {
            type: "paragraph",
            text: "Aproch shall not be liable for:",
          },
          {
            type: "list",
            items: [
              "Clinical decisions made by Professionals",
              "Treatment outcomes",
              "Advice provided during consultations",
              "Acts or omissions of independent Professionals",
              "Indirect or consequential damages",
            ],
          },
        ],
      },
      {
        number: 23,
        title: "Indemnification",
        blocks: [
          {
            type: "paragraph",
            text: "Users agree to indemnify and hold harmless Aproch, its officers, directors, employees, affiliates, and representatives against claims, liabilities, damages, losses, and expenses arising from:",
          },
          {
            type: "list",
            items: [
              "Violations of these Terms",
              "Misuse of the Platform",
              "Unlawful conduct",
              "Breach of applicable laws",
            ],
          },
        ],
      },
      {
        number: 24,
        title: "Force Majeure",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch shall not be liable for delays, interruptions, or failures resulting from events beyond reasonable control, including:",
          },
          {
            type: "list",
            items: [
              "Natural disasters",
              "Internet outages",
              "Government restrictions",
              "Power failures",
              "Public emergencies",
              "Cybersecurity incidents",
              "Other unforeseen circumstances",
            ],
          },
        ],
      },
      {
        number: 25,
        title: "Intellectual Property",
        blocks: [
          {
            type: "paragraph",
            text: "All Platform content, branding, trademarks, logos, software, designs, and materials are owned by or licensed to Aproch.",
          },
          {
            type: "paragraph",
            text: "Users may not reproduce, distribute, modify, or commercially exploit Platform content without prior written permission.",
          },
        ],
      },
      {
        number: 26,
        title: "Platform Availability",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch does not guarantee uninterrupted availability of the Platform.",
          },
          {
            type: "paragraph",
            text: "Maintenance, upgrades, outages, security incidents, or third-party failures may affect access to services.",
          },
        ],
      },
      {
        number: 27,
        title: "Modification of Terms",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch reserves the right to modify these Terms at any time.",
          },
          {
            type: "paragraph",
            text: "Updated Terms become effective upon publication on the Platform.",
          },
          {
            type: "paragraph",
            text: "Continued use of the Platform constitutes acceptance of revised Terms.",
          },
        ],
      },
      {
        number: 28,
        title: "Governing Law",
        blocks: [
          {
            type: "paragraph",
            text: "These Terms shall be governed by and interpreted in accordance with the laws of India.",
          },
        ],
      },
      {
        number: 29,
        title: "Jurisdiction",
        blocks: [
          {
            type: "paragraph",
            text: "Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts having jurisdiction over the registered office of Aproch.",
          },
        ],
      },
      {
        number: 30,
        title: "Severability",
        blocks: [
          {
            type: "paragraph",
            text: "If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.",
          },
        ],
      },
      {
        number: 31,
        title: "Entire Agreement",
        blocks: [
          {
            type: "paragraph",
            text: "These Terms, together with all Platform policies and legal documents, constitute the entire agreement between the User and Aproch regarding Platform use.",
          },
        ],
      },
    ],
  },
  {
    id: "consent",
    title: "G. Consent",
    subsections: [
      {
        number: 32,
        title: "Consent to Teletherapy",
        blocks: [
          {
            type: "paragraph",
            text: "By booking an Appointment, Clients acknowledge and consent to receiving mental health services through online communication technologies.",
          },
          {
            type: "paragraph",
            text: "Clients understand that teletherapy may involve technological limitations and risks.",
          },
        ],
      },
      {
        number: 33,
        title: "Consent to Electronic Communications",
        blocks: [
          {
            type: "paragraph",
            text: "Users consent to receive communications electronically, including emails, notifications, account updates, security alerts, appointment reminders, and service-related communications.",
          },
        ],
      },
      {
        number: 34,
        title: "Consent to WhatsApp Communications",
        blocks: [
          {
            type: "paragraph",
            text: "By providing a mobile number, Users expressly consent to receive WhatsApp communications relating to:",
          },
          {
            type: "list",
            items: [
              "Appointments",
              "Support requests",
              "Service updates",
              "Account notifications",
              "Safety communications",
            ],
          },
        ],
      },
      {
        number: 35,
        title: "Consent to Marketing Communications",
        blocks: [
          {
            type: "paragraph",
            text: "By submitting a mobile number, email address, or other contact information, Users consent to receive promotional messages, newsletters, offers, campaigns, announcements, educational content, and marketing communications from Aproch through:",
          },
          {
            type: "list",
            items: ["SMS", "WhatsApp", "Email", "Phone calls", "Push notifications"],
          },
          {
            type: "paragraph",
            text: "Users may opt out of marketing communications at any time, subject to applicable law.",
          },
        ],
      },
      {
        number: 36,
        title: "Consent to Policy Updates",
        blocks: [
          {
            type: "paragraph",
            text: "Users acknowledge and agree that Aproch may communicate updates, amendments, or revisions to policies, procedures, legal documents, and Platform terms through electronic means.",
          },
          {
            type: "paragraph",
            text: "Continued use of the Platform following such updates constitutes acceptance of the revised policies.",
          },
        ],
      },
    ],
  },
];
