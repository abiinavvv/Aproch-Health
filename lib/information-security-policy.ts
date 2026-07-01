import type { PolicySection } from "@/lib/legal-document";

export const informationSecurityPurpose: string[] = [
  "Aproch is committed to protecting the confidentiality, integrity, availability, and security of information entrusted to the Platform.",
  "This Information Security & Confidentiality Policy establishes the principles, safeguards, responsibilities, and procedures governing the protection of personal information, appointment data, communications, and platform systems.",
  "This Policy applies to all Users, Clients, Professionals, employees, contractors, service providers, and other individuals who access or interact with Aproch systems or information.",
];

export const informationSecuritySections: PolicySection[] = [
  {
    id: "security-measures",
    title: "A. Security Measures",
    subsections: [
      {
        number: 1,
        title: "Security Framework",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch shall implement reasonable administrative, technical, operational, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, destruction, misuse, or loss.",
          },
          {
            type: "paragraph",
            text: "Security measures may be reviewed and updated periodically in response to evolving risks, threats, technologies, legal requirements, and business needs.",
          },
        ],
      },
      {
        number: 2,
        title: "Access Controls",
        blocks: [
          {
            type: "paragraph",
            text: "Access to information shall be restricted to authorized individuals who require such access for legitimate operational, clinical, support, compliance, or security purposes.",
          },
          { type: "paragraph", text: "Aproch may implement:" },
          {
            type: "list",
            items: [
              "Role-based access controls",
              "Permission management systems",
              "Account restrictions",
              "Session management controls",
              "Access monitoring procedures",
            ],
          },
          {
            type: "paragraph",
            text: "Unauthorized access to information is strictly prohibited.",
          },
        ],
      },
      {
        number: 3,
        title: "Authentication Controls",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may implement authentication mechanisms designed to verify the identity of users and authorized personnel.",
          },
          { type: "paragraph", text: "Such measures may include:" },
          {
            type: "list",
            items: [
              "Password authentication",
              "One-Time Passwords (OTPs)",
              "Multi-Factor Authentication (MFA)",
              "Device verification",
              "Session validation procedures",
            ],
          },
          {
            type: "paragraph",
            text: "Users may be required to complete authentication procedures before accessing certain services.",
          },
        ],
      },
      {
        number: 4,
        title: "Password Standards",
        blocks: [
          {
            type: "paragraph",
            text: "Users are responsible for maintaining secure passwords.",
          },
          { type: "paragraph", text: "Users shall:" },
          {
            type: "list",
            items: [
              "Create strong passwords",
              "Avoid password sharing",
              "Avoid password reuse across services",
              "Update passwords when compromise is suspected",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch reserves the right to require password changes where security risks are identified.",
          },
        ],
      },
      {
        number: 5,
        title: "Encryption Measures",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may employ industry-standard encryption technologies to protect information during transmission and storage.",
          },
          { type: "paragraph", text: "Encryption measures may include:" },
          {
            type: "list",
            items: [
              "Secure communication protocols",
              "Encrypted storage systems",
              "Secure payment integrations",
              "Protected backups",
            ],
          },
          {
            type: "paragraph",
            text: "No security system can guarantee absolute protection; however, Aproch shall take reasonable measures to safeguard information.",
          },
        ],
      },
      {
        number: 6,
        title: "Infrastructure Security",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may implement infrastructure safeguards designed to protect systems and information from unauthorized access, disruption, misuse, or attack.",
          },
          { type: "paragraph", text: "Security controls may include:" },
          {
            type: "list",
            items: [
              "Server protections",
              "Security monitoring",
              "Vulnerability management",
              "Access restrictions",
              "Infrastructure hardening measures",
            ],
          },
        ],
      },
      {
        number: 7,
        title: "Network Security",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may maintain network security measures designed to identify, prevent, detect, and respond to security threats.",
          },
          { type: "paragraph", text: "Such measures may include:" },
          {
            type: "list",
            items: [
              "Traffic monitoring",
              "Firewall protections",
              "Intrusion detection systems",
              "Threat intelligence tools",
              "Security logging mechanisms",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "user-responsibilities",
    title: "B. User Responsibilities",
    subsections: [
      {
        number: 8,
        title: "Password Protection",
        blocks: [
          {
            type: "paragraph",
            text: "Users are solely responsible for safeguarding their login credentials.",
          },
          { type: "paragraph", text: "Users shall not:" },
          {
            type: "list",
            items: [
              "Share passwords",
              "Share OTPs",
              "Allow unauthorized access to accounts",
              "Circumvent security controls",
            ],
          },
          {
            type: "paragraph",
            text: "Any activity conducted through a User's account may be attributed to that User unless otherwise demonstrated.",
          },
        ],
      },
      {
        number: 9,
        title: "Device Security",
        blocks: [
          {
            type: "paragraph",
            text: "Users are responsible for securing devices used to access the Platform.",
          },
          { type: "paragraph", text: "Users are encouraged to:" },
          {
            type: "list",
            items: [
              "Install security updates",
              "Use antivirus protection where appropriate",
              "Secure devices with passwords or biometrics",
              "Avoid accessing the Platform from untrusted devices or networks",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch shall not be responsible for security failures occurring on User-controlled devices.",
          },
        ],
      },
      {
        number: 10,
        title: "Unauthorized Access Reporting",
        blocks: [
          {
            type: "paragraph",
            text: "Users shall promptly notify Aproch if they become aware of:",
          },
          {
            type: "list",
            items: [
              "Unauthorized account access",
              "Credential compromise",
              "Suspicious activity",
              "Security vulnerabilities",
              "Suspected breaches involving their information",
            ],
          },
          {
            type: "paragraph",
            text: "Failure to promptly report security concerns may increase risk and limit Aproch's ability to respond effectively.",
          },
        ],
      },
    ],
  },
  {
    id: "confidentiality",
    title: "C. Confidentiality",
    subsections: [
      {
        number: 11,
        title: "Client Confidentiality",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch recognizes the sensitive nature of mental health information.",
          },
          {
            type: "paragraph",
            text: "Client information shall be treated as confidential and may only be accessed, used, disclosed, or processed where reasonably necessary for:",
          },
          {
            type: "list",
            items: [
              "Service delivery",
              "Appointment management",
              "Platform operations",
              "Legal compliance",
              "Safety-related obligations",
            ],
          },
        ],
      },
      {
        number: 12,
        title: "Professional Confidentiality",
        blocks: [
          {
            type: "paragraph",
            text: "Professionals are expected to maintain confidentiality in accordance with:",
          },
          {
            type: "list",
            items: [
              "Professional standards",
              "Ethical obligations",
              "Applicable laws",
              "Platform policies",
            ],
          },
          {
            type: "paragraph",
            text: "Professionals remain responsible for maintaining appropriate confidentiality concerning information obtained through consultations.",
          },
        ],
      },
      {
        number: 13,
        title: "Internal Staff Confidentiality",
        blocks: [
          {
            type: "paragraph",
            text: "Employees, contractors, consultants, and authorized representatives of Aproch who access confidential information shall be expected to maintain confidentiality.",
          },
          { type: "paragraph", text: "Such individuals may be required to:" },
          {
            type: "list",
            items: [
              "Follow confidentiality obligations",
              "Comply with internal policies",
              "Access information only when authorized",
            ],
          },
          {
            type: "paragraph",
            text: "Unauthorized disclosure of confidential information may result in disciplinary action, termination, legal action, or referral to authorities.",
          },
        ],
      },
      {
        number: 14,
        title: "Need-to-Know Access Principle",
        blocks: [
          {
            type: "paragraph",
            text: "Access to confidential information shall be limited to individuals whose responsibilities reasonably require such access.",
          },
          {
            type: "paragraph",
            text: "Aproch shall seek to minimize unnecessary access to personal, clinical, operational, and security-related information.",
          },
        ],
      },
    ],
  },
  {
    id: "incident-management",
    title: "D. Incident Management",
    subsections: [
      {
        number: 15,
        title: "Security Incident Reporting",
        blocks: [
          {
            type: "paragraph",
            text: "Any person who becomes aware of an actual or suspected security incident involving Aproch systems or information is encouraged to report the matter immediately.",
          },
          { type: "paragraph", text: "Reports may include:" },
          {
            type: "list",
            items: [
              "Data exposure",
              "Unauthorized access",
              "Security vulnerabilities",
              "Account compromise",
              "Suspicious activity",
            ],
          },
        ],
      },
      {
        number: 16,
        title: "Data Breach Response",
        blocks: [
          {
            type: "paragraph",
            text: "Where Aproch becomes aware of a suspected or confirmed data breach, reasonable efforts may be undertaken to:",
          },
          {
            type: "list",
            items: [
              "Assess the incident",
              "Contain the impact",
              "Preserve evidence",
              "Restore security",
              "Notify affected parties where appropriate",
              "Comply with legal obligations",
            ],
          },
          {
            type: "paragraph",
            text: "Response actions may vary depending upon the nature and severity of the incident.",
          },
        ],
      },
      {
        number: 17,
        title: "Internal Investigations",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may investigate security incidents, policy violations, suspicious activities, and operational risks.",
          },
          { type: "paragraph", text: "Investigations may involve:" },
          {
            type: "list",
            items: [
              "Review of system records",
              "Review of communications",
              "Collection of evidence",
              "User interviews",
              "Cooperation with service providers or authorities",
            ],
          },
          {
            type: "paragraph",
            text: "Users agree to cooperate reasonably with investigations relating to security matters.",
          },
        ],
      },
      {
        number: 18,
        title: "Corrective Actions",
        blocks: [
          {
            type: "paragraph",
            text: "Following investigation, Aproch may implement corrective measures including:",
          },
          {
            type: "list",
            items: [
              "Account restrictions",
              "Password resets",
              "Security updates",
              "Access modifications",
              "Policy improvements",
              "Suspension or termination of accounts",
            ],
          },
          {
            type: "paragraph",
            text: "Corrective actions shall be determined based on the circumstances of each case.",
          },
        ],
      },
    ],
  },
  {
    id: "business-continuity",
    title: "E. Business Continuity",
    subsections: [
      {
        number: 19,
        title: "Data Backup",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may maintain backup procedures designed to support recovery of critical information and operational continuity.",
          },
          {
            type: "paragraph",
            text: "Backup practices may vary depending on system requirements, legal obligations, and operational considerations.",
          },
        ],
      },
      {
        number: 20,
        title: "Disaster Recovery",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may maintain disaster recovery procedures designed to respond to:",
          },
          {
            type: "list",
            items: [
              "Infrastructure failures",
              "Cybersecurity incidents",
              "Service interruptions",
              "Natural disasters",
              "Other disruptive events",
            ],
          },
          {
            type: "paragraph",
            text: "Recovery priorities shall be determined based on operational and security considerations.",
          },
        ],
      },
      {
        number: 21,
        title: "Service Restoration",
        blocks: [
          {
            type: "paragraph",
            text: "Following significant disruptions, Aproch shall make reasonable efforts to restore services as promptly as practicable.",
          },
          {
            type: "paragraph",
            text: "Restoration timelines may vary depending on the nature, severity, and complexity of the disruption.",
          },
        ],
      },
    ],
  },
  {
    id: "legal-compliance",
    title: "F. Legal Compliance",
    subsections: [
      {
        number: 22,
        title: "Regulatory Compliance",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch shall endeavor to comply with applicable laws, regulations, legal obligations, and industry requirements relating to information security, privacy, confidentiality, and platform operations.",
          },
          {
            type: "paragraph",
            text: "Users are also expected to comply with applicable legal requirements when using the Platform.",
          },
        ],
      },
      {
        number: 23,
        title: "Law Enforcement Requests",
        blocks: [
          { type: "paragraph", text: "Aproch may respond to lawful requests from:" },
          {
            type: "list",
            items: [
              "Courts",
              "Law Enforcement Agencies",
              "Government Authorities",
              "Regulatory Bodies",
              "Other legally authorized entities",
            ],
          },
          {
            type: "paragraph",
            text: "Information may be disclosed where required by law or reasonably necessary to comply with legal obligations.",
          },
        ],
      },
      {
        number: 24,
        title: "Preservation of Evidence",
        blocks: [
          {
            type: "paragraph",
            text: "Where Aproch reasonably believes that information may be relevant to:",
          },
          {
            type: "list",
            items: [
              "Investigations",
              "Security incidents",
              "Legal proceedings",
              "Regulatory matters",
              "Safety concerns",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch may preserve records, communications, logs, documents, and other relevant information for an appropriate period.",
          },
          {
            type: "paragraph",
            text: "Such preservation may occur even where deletion requests have been submitted, where legally permitted or required.",
          },
        ],
      },
      {
        number: 25,
        title: "Policy Violations",
        blocks: [
          {
            type: "paragraph",
            text: "Violations of this Policy may result in:",
          },
          {
            type: "list",
            items: [
              "Warnings",
              "Account restrictions",
              "Suspension",
              "Permanent removal from the Platform",
              "Termination of professional relationships",
              "Legal action",
              "Reporting to relevant authorities",
            ],
          },
        ],
      },
      {
        number: 26,
        title: "Amendments to this Policy",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch reserves the right to modify this Policy at any time.",
          },
          {
            type: "paragraph",
            text: "Updated versions shall become effective upon publication on the Platform.",
          },
          {
            type: "paragraph",
            text: "Continued use of the Platform following publication constitutes acceptance of the revised Policy.",
          },
        ],
      },
      {
        number: 27,
        title: "Contact Information",
        blocks: [
          {
            type: "paragraph",
            text: "For information security concerns, confidentiality matters, data breach reports, security incidents, or policy-related inquiries, Users may contact Aproch using the details below.",
          },
          {
            type: "paragraph",
            text: "Aproch encourages prompt reporting of any suspected security concerns to help protect Users, Professionals, and Platform operations.",
          },
        ],
      },
    ],
  },
];
