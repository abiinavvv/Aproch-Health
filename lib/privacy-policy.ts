import type { PolicySection } from "@/lib/legal-document";

export type { PolicyBlock, PolicySubsection, PolicySection } from "@/lib/legal-document";

export const privacyPolicyPurpose: string[] = [
  "Aproch is committed to protecting the privacy, confidentiality, and security of personal information entrusted to us by our users.",
  "This Privacy Policy explains how Aproch collects, uses, stores, protects, processes, and shares personal information when users access or use the Platform.",
  "By accessing the Platform, creating an account, booking an Appointment, communicating with Aproch, or otherwise using the Platform, users acknowledge and consent to the practices described in this Privacy Policy.",
];

export const privacyPolicySections: PolicySection[] = [
  {
    id: "information-collection",
    title: "A. Information Collection",
    subsections: [
      {
        number: 1,
        title: "Information You Provide",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may collect personal information voluntarily provided by Users, including but not limited to:",
          },
          {
            type: "list",
            label: "Identity Information",
            items: [
              "Full Name",
              "Date of Birth",
              "Age",
              "Gender (if provided)",
              "Profile Information",
            ],
          },
          {
            type: "list",
            label: "Contact Information",
            items: [
              "Mobile Number",
              "Email Address",
              "Emergency Contact Information (if provided)",
            ],
          },
          {
            type: "list",
            label: "Appointment Information",
            items: [
              "Appointment Date and Time",
              "Selected Professional",
              "Consultation Preferences",
              "Consultation Notes voluntarily shared through the Platform",
            ],
          },
          {
            type: "list",
            label: "Communication Information",
            items: [
              "Customer Support Requests",
              "Emails",
              "WhatsApp Communications",
              "Chat Messages",
              "Feedback",
              "Complaint Reports",
              "Investigation Submissions",
            ],
          },
          {
            type: "list",
            label: "Payment Information",
            items: [
              "Transaction Details",
              "Payment References",
              "Billing Information",
            ],
          },
          {
            type: "paragraph",
            text: "Aproch does not intentionally store complete payment card details where payments are processed through third-party payment gateways.",
          },
        ],
      },
      {
        number: 2,
        title: "Information Collected Automatically",
        blocks: [
          {
            type: "paragraph",
            text: "When Users access the Platform, certain information may be collected automatically.",
          },
          {
            type: "list",
            label: "Device Information",
            items: [
              "Device Type",
              "Operating System",
              "Device Identifiers",
              "Mobile Application Information",
            ],
          },
          {
            type: "list",
            label: "Browser Information",
            items: ["Browser Type", "Browser Version", "Language Preferences"],
          },
          {
            type: "list",
            label: "Network Information",
            items: [
              "IP Address",
              "Approximate Geographic Location",
              "Connection Information",
            ],
          },
          {
            type: "paragraph",
            text: "Cookies and Similar Technologies — Aproch may use cookies, session cookies, analytics tools, and tracking technologies to improve functionality, security, and user experience.",
          },
          {
            type: "list",
            label: "Usage Information",
            items: [
              "Pages Visited",
              "Features Accessed",
              "Appointment Activity",
              "Session Duration",
              "Interaction Patterns",
              "Error Logs",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "use-of-information",
    title: "B. Use of Information",
    subsections: [
      {
        number: 3,
        title: "Appointment Management",
        blocks: [
          { type: "paragraph", text: "Personal information may be used to:" },
          {
            type: "list",
            items: [
              "Create and manage bookings",
              "Coordinate appointments",
              "Facilitate communication with Professionals",
              "Process cancellations and rescheduling requests",
              "Deliver Platform services",
            ],
          },
        ],
      },
      {
        number: 4,
        title: "Account Administration",
        blocks: [
          { type: "paragraph", text: "Information may be used to:" },
          {
            type: "list",
            items: [
              "Create user accounts",
              "Verify identities",
              "Maintain account security",
              "Manage user preferences",
              "Prevent unauthorized access",
            ],
          },
        ],
      },
      {
        number: 5,
        title: "Customer Support",
        blocks: [
          { type: "paragraph", text: "Information may be used to:" },
          {
            type: "list",
            items: [
              "Respond to inquiries",
              "Resolve complaints",
              "Conduct investigations",
              "Improve support services",
            ],
          },
        ],
      },
      {
        number: 6,
        title: "Security Monitoring",
        blocks: [
          { type: "paragraph", text: "Information may be used to:" },
          {
            type: "list",
            items: [
              "Detect suspicious activity",
              "Prevent fraud",
              "Monitor abuse",
              "Protect users and Professionals",
              "Maintain Platform integrity",
            ],
          },
        ],
      },
      {
        number: 7,
        title: "Compliance Requirements",
        blocks: [
          { type: "paragraph", text: "Information may be processed to:" },
          {
            type: "list",
            items: [
              "Comply with applicable laws",
              "Fulfill regulatory obligations",
              "Respond to lawful requests",
              "Enforce Platform policies",
            ],
          },
        ],
      },
      {
        number: 8,
        title: "Service Improvements",
        blocks: [
          { type: "paragraph", text: "Aproch may use information to:" },
          {
            type: "list",
            items: [
              "Improve Platform functionality",
              "Develop new features",
              "Analyze usage trends",
              "Enhance user experience",
              "Conduct internal research and analytics",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "communications",
    title: "C. Communications",
    subsections: [
      {
        number: 9,
        title: "Service Notifications",
        blocks: [
          {
            type: "paragraph",
            text: "Users may receive communications relating to:",
          },
          {
            type: "list",
            items: [
              "Account activity",
              "Appointment confirmations",
              "Security alerts",
              "Policy updates",
              "Service announcements",
            ],
          },
        ],
      },
      {
        number: 10,
        title: "Appointment Reminders",
        blocks: [
          { type: "paragraph", text: "Aproch may send reminders through:" },
          {
            type: "list",
            items: ["SMS", "WhatsApp", "Email", "Push Notifications", "Phone Calls"],
          },
        ],
      },
      {
        number: 11,
        title: "Verification Messages",
        blocks: [
          { type: "paragraph", text: "Users may receive:" },
          {
            type: "list",
            items: [
              "OTPs",
              "Verification Codes",
              "Authentication Messages",
              "Identity Verification Requests",
            ],
          },
        ],
      },
      {
        number: 12,
        title: "Marketing Communications",
        blocks: [
          {
            type: "paragraph",
            text: "By providing contact information, Users consent to receiving:",
          },
          {
            type: "list",
            items: [
              "Newsletters",
              "Awareness Campaigns",
              "Promotional Offers",
              "Platform Updates",
              "Service Announcements",
              "Educational Content",
              "Marketing Communications",
            ],
          },
        ],
      },
      {
        number: 13,
        title: "WhatsApp Notifications",
        blocks: [
          {
            type: "paragraph",
            text: "Users expressly consent to receiving WhatsApp communications regarding:",
          },
          {
            type: "list",
            items: [
              "Appointment Management",
              "Customer Support",
              "Platform Updates",
              "Promotional Campaigns",
              "Service Notifications",
            ],
          },
        ],
      },
      {
        number: 14,
        title: "Promotional Messages",
        blocks: [
          {
            type: "paragraph",
            text: "Promotional communications may be delivered through:",
          },
          {
            type: "list",
            items: ["WhatsApp", "SMS", "Email", "Push Notifications", "Phone Calls"],
          },
          {
            type: "paragraph",
            text: "Users may opt out of promotional communications at any time by following the unsubscribe instructions or contacting Aproch. Service-related communications may continue where necessary.",
          },
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    title: "D. Information Sharing",
    subsections: [
      {
        number: 15,
        title: "Sharing with Professionals",
        blocks: [
          {
            type: "paragraph",
            text: "Information may be shared with Professionals where reasonably necessary to:",
          },
          {
            type: "list",
            items: [
              "Facilitate consultations",
              "Manage appointments",
              "Provide services",
              "Ensure continuity of care",
            ],
          },
        ],
      },
      {
        number: 16,
        title: "Payment Processors",
        blocks: [
          {
            type: "paragraph",
            text: "Payment-related information may be shared with authorized payment service providers for:",
          },
          {
            type: "list",
            items: [
              "Payment Processing",
              "Refund Processing",
              "Fraud Prevention",
              "Transaction Verification",
            ],
          },
        ],
      },
      {
        number: 17,
        title: "Service Providers",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may engage third-party providers for:",
          },
          {
            type: "list",
            items: [
              "Hosting Services",
              "Cloud Storage",
              "Customer Support",
              "Analytics",
              "Security Monitoring",
              "Communication Services",
            ],
          },
          {
            type: "paragraph",
            text: "Such providers may receive limited information necessary to perform their services.",
          },
        ],
      },
      {
        number: 18,
        title: "Legal Authorities",
        blocks: [
          {
            type: "paragraph",
            text: "Information may be disclosed where required by:",
          },
          {
            type: "list",
            items: [
              "Law",
              "Court Orders",
              "Government Requests",
              "Regulatory Authorities",
              "Law Enforcement Agencies",
            ],
          },
        ],
      },
      {
        number: 19,
        title: "Emergency Situations",
        blocks: [
          {
            type: "paragraph",
            text: "Where Aproch reasonably believes disclosure is necessary to prevent serious harm, protect safety, respond to emergencies, or comply with legal obligations, information may be disclosed to:",
          },
          {
            type: "list",
            items: [
              "Emergency Services",
              "Medical Providers",
              "Law Enforcement Agencies",
              "Relevant Authorities",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "E. Data Retention",
    subsections: [
      {
        number: 20,
        title: "Storage Periods",
        blocks: [
          {
            type: "paragraph",
            text: "Personal information shall be retained only for as long as reasonably necessary to:",
          },
          {
            type: "list",
            items: [
              "Provide services",
              "Meet legal obligations",
              "Resolve disputes",
              "Enforce agreements",
              "Protect Platform interests",
            ],
          },
          {
            type: "paragraph",
            text: "Retention periods may vary depending on the nature of the information.",
          },
        ],
      },
      {
        number: 21,
        title: "Account Closure",
        blocks: [
          {
            type: "paragraph",
            text: "Upon account closure, certain information may continue to be retained where necessary for:",
          },
          {
            type: "list",
            items: [
              "Legal Compliance",
              "Fraud Prevention",
              "Security Purposes",
              "Record Keeping",
              "Dispute Resolution",
            ],
          },
        ],
      },
      {
        number: 22,
        title: "Deletion Requests",
        blocks: [
          {
            type: "paragraph",
            text: "Users may request deletion of personal information by contacting Aproch.",
          },
          {
            type: "paragraph",
            text: "Deletion requests shall be reviewed and processed subject to:",
          },
          {
            type: "list",
            items: [
              "Legal Requirements",
              "Regulatory Obligations",
              "Security Considerations",
              "Legitimate Business Needs",
            ],
          },
          {
            type: "paragraph",
            text: "Certain information may be retained where required by law.",
          },
        ],
      },
    ],
  },
  {
    id: "user-rights",
    title: "F. User Rights",
    subsections: [
      {
        number: 23,
        title: "Access Requests",
        blocks: [
          {
            type: "paragraph",
            text: "Users may request access to personal information held by Aproch, subject to verification and applicable legal requirements.",
          },
        ],
      },
      {
        number: 24,
        title: "Correction Requests",
        blocks: [
          {
            type: "paragraph",
            text: "Users may request correction or updating of inaccurate, incomplete, or outdated information.",
          },
        ],
      },
      {
        number: 25,
        title: "Deletion Requests",
        blocks: [
          {
            type: "paragraph",
            text: "Users may request deletion of eligible personal information in accordance with applicable laws and Platform policies.",
          },
        ],
      },
      {
        number: 26,
        title: "Communication Preferences",
        blocks: [
          { type: "paragraph", text: "Users may:" },
          {
            type: "list",
            items: [
              "Opt out of promotional communications",
              "Update notification preferences",
              "Modify communication settings where available",
            ],
          },
          {
            type: "paragraph",
            text: "Certain essential service communications may remain mandatory.",
          },
        ],
      },
    ],
  },
  {
    id: "security",
    title: "G. Security",
    subsections: [
      {
        number: 27,
        title: "Encryption",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may use industry-standard encryption and secure communication technologies to protect information during transmission and storage.",
          },
          {
            type: "paragraph",
            text: "However, no method of transmission or storage can be guaranteed to be completely secure.",
          },
        ],
      },
      {
        number: 28,
        title: "Access Controls",
        blocks: [
          {
            type: "paragraph",
            text: "Access to personal information shall be restricted to authorized personnel, contractors, Professionals, and service providers who require access for legitimate operational purposes.",
          },
          {
            type: "paragraph",
            text: "Aproch employs reasonable safeguards to prevent unauthorized access, disclosure, modification, or misuse of information.",
          },
        ],
      },
      {
        number: 29,
        title: "Security Monitoring",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch may continuously monitor systems, networks, and services for:",
          },
          {
            type: "list",
            items: [
              "Security Threats",
              "Fraudulent Activity",
              "Unauthorized Access Attempts",
              "Data Breaches",
              "Operational Risks",
            ],
          },
          {
            type: "paragraph",
            text: "Where appropriate, security incidents may be investigated and reported to relevant authorities.",
          },
        ],
      },
      {
        number: 30,
        title: "Changes to this Privacy Policy",
        blocks: [
          {
            type: "paragraph",
            text: "Aproch reserves the right to amend or update this Privacy Policy at any time.",
          },
          {
            type: "paragraph",
            text: "Updated versions shall become effective upon publication on the Platform.",
          },
          {
            type: "paragraph",
            text: "Continued use of the Platform following publication constitutes acceptance of the revised Privacy Policy.",
          },
        ],
      },
    ],
  },
];

export const privacyPolicyContactSection = {
  number: 31,
  title: "Contact Information",
  intro:
    "For privacy-related inquiries, data requests, complaints, or concerns, Users may contact:",
  businessHours: "Monday–Saturday, 9:00 AM – 6:00 PM IST",
};
