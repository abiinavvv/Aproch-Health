import type { PolicySubsection } from "@/lib/legal-document";

export const refundPolicySubsections: PolicySubsection[] = [
  {
    number: 1,
    title: "Purpose",
    blocks: [
      {
        type: "paragraph",
        text: 'This Return, Refund, Cancellation & Rescheduling Policy ("Policy") governs payments, cancellations, refunds, rescheduling requests, appointment attendance, and related matters concerning services booked through Aproch.',
      },
      {
        type: "paragraph",
        text: "By booking an Appointment through the Platform, the Client acknowledges and agrees to be bound by this Policy.",
      },
    ],
  },
  {
    number: 2,
    title: "Definitions",
    blocks: [
      {
        type: "paragraph",
        text: '"Platform" means Aproch, including its website, mobile application, and associated services.',
      },
      {
        type: "paragraph",
        text: '"Client" means any individual who books or attends an Appointment through the Platform.',
      },
      {
        type: "paragraph",
        text: '"Professional" means an independent psychologist, therapist, counsellor, or mental health professional providing services through the Platform.',
      },
      {
        type: "paragraph",
        text: '"Appointment" means a scheduled online consultation between a Client and a Professional.',
      },
      {
        type: "paragraph",
        text: '"No-Show" means a failure by a Client to attend an Appointment within fifteen (15) minutes of the scheduled commencement time.',
      },
      {
        type: "paragraph",
        text: '"Rescheduling" means changing an Appointment to a different date or time.',
      },
      {
        type: "paragraph",
        text: '"Refund" means the return of funds paid by the Client in accordance with this Policy.',
      },
    ],
  },
  {
    number: 3,
    title: "Scope of Policy",
    blocks: [
      {
        type: "paragraph",
        text: "This Policy applies to all Appointments booked through Aproch.",
      },
      { type: "paragraph", text: "The Policy governs:" },
      {
        type: "list",
        items: [
          "Appointment fees",
          "Refund requests",
          "Cancellations",
          "Rescheduling requests",
          "No-Show situations",
          "Technical disruptions",
          "Payment disputes",
        ],
      },
      {
        type: "paragraph",
        text: "This Policy shall apply unless otherwise expressly stated in writing by Aproch.",
      },
    ],
  },
  {
    number: 4,
    title: "Appointment Booking",
    blocks: [
      {
        type: "paragraph",
        text: "Appointments are subject to Professional availability.",
      },
      {
        type: "paragraph",
        text: "An Appointment shall be considered confirmed only upon:",
      },
      {
        type: "list",
        items: ["Successful payment", "Booking confirmation issued by the Platform"],
      },
      {
        type: "paragraph",
        text: "Clients are responsible for reviewing appointment details before confirming a booking.",
      },
      {
        type: "paragraph",
        text: "Incorrect booking information provided by the Client may result in loss of eligibility for refunds or rescheduling.",
      },
    ],
  },
  {
    number: 5,
    title: "Payment Terms",
    blocks: [
      {
        type: "paragraph",
        text: "All Appointment fees must be paid in full before the scheduled Appointment unless otherwise specified.",
      },
      {
        type: "paragraph",
        text: "Payment shall be processed through approved payment gateways.",
      },
      {
        type: "paragraph",
        text: "Clients are responsible for ensuring that payment information is accurate and valid.",
      },
      {
        type: "paragraph",
        text: "Aproch reserves the right to refuse, suspend, or cancel bookings where payment cannot be successfully processed.",
      },
    ],
  },
  {
    number: 6,
    title: "Refund Eligibility",
    blocks: [
      {
        type: "paragraph",
        text: "A Client may be eligible for a refund in the following circumstances:",
      },
      {
        type: "list",
        items: [
          "Cancellation made at least twenty-four (24) hours before the Appointment",
          "Professional cancellation",
          "Professional No-Show",
          "Duplicate payment",
          "Incorrect billing attributable to Platform error",
          "Certain exceptional circumstances approved by Aproch",
        ],
      },
      {
        type: "paragraph",
        text: "Refunds shall be subject to verification and compliance with this Policy.",
      },
    ],
  },
  {
    number: 7,
    title: "Non-Refundable Circumstances",
    blocks: [
      {
        type: "paragraph",
        text: "The following circumstances shall generally not qualify for a refund:",
      },
      {
        type: "list",
        items: [
          "Cancellation within twenty-four (24) hours of the Appointment",
          "Client No-Show",
          "Failure to attend due to personal scheduling conflicts",
          "Failure to join because of avoidable technical issues on the Client's side",
          "Dissatisfaction with clinical outcomes",
          "Failure to read booking details or Platform policies",
          "Completed consultations",
        ],
      },
      {
        type: "paragraph",
        text: "Once an Appointment has commenced and professional services have been provided, fees shall generally become non-refundable.",
      },
    ],
  },
  {
    number: 8,
    title: "Client Cancellations",
    blocks: [
      {
        type: "paragraph",
        text: "Clients may cancel an Appointment and receive a full refund only if the cancellation request is submitted at least twenty-four (24) hours before the scheduled Appointment time.",
      },
      {
        type: "paragraph",
        text: "No refund shall be provided for cancellations submitted less than twenty-four (24) hours before the Appointment.",
      },
      {
        type: "paragraph",
        text: "Appointment slots are reserved exclusively for Clients and require advance allocation of Professional time and Platform resources.",
      },
    ],
  },
  {
    number: 9,
    title: "Professional Cancellations",
    blocks: [
      {
        type: "paragraph",
        text: "Where a Professional cancels an Appointment, the Client may choose either:",
      },
      {
        type: "list",
        items: ["A full refund", "Rescheduling to another available slot"],
      },
      {
        type: "paragraph",
        text: "Aproch shall make reasonable efforts to facilitate an alternative appointment where possible.",
      },
    ],
  },
  {
    number: 10,
    title: "Rescheduling Policy",
    blocks: [
      {
        type: "subheading",
        text: "10.1 Rescheduling More Than 24 Hours Before Appointment",
      },
      {
        type: "paragraph",
        text: "Clients may reschedule an Appointment without charge if the request is made at least twenty-four (24) hours before the Appointment.",
      },
      {
        type: "paragraph",
        text: "Rescheduling remains subject to Professional availability.",
      },
      {
        type: "subheading",
        text: "10.2 Rescheduling Within 24 Hours Before Appointment",
      },
      {
        type: "paragraph",
        text: "Clients requesting rescheduling less than twenty-four (24) hours before the Appointment shall be required to pay a rescheduling fee of INR 499.",
      },
      {
        type: "paragraph",
        text: "The Appointment shall be rescheduled only after payment of the applicable fee.",
      },
      {
        type: "subheading",
        text: "10.3 Rescheduling Limits",
      },
      {
        type: "paragraph",
        text: "Aproch reserves the right to limit the number of rescheduling requests permitted for a particular Appointment.",
      },
      {
        type: "paragraph",
        text: "Repeated rescheduling may result in cancellation of the booking without refund.",
      },
    ],
  },
  {
    number: 11,
    title: "No-Show Policy",
    blocks: [
      {
        type: "paragraph",
        text: "A Client shall be deemed a No-Show if they fail to join the Appointment within fifteen (15) minutes of the scheduled commencement time.",
      },
      {
        type: "paragraph",
        text: "No refund shall be issued for Client No-Shows.",
      },
      {
        type: "paragraph",
        text: "No complimentary rescheduling shall be provided for Client No-Shows.",
      },
      {
        type: "paragraph",
        text: "If a Professional fails to attend an Appointment without reasonable notice, the Client shall be entitled to a full refund or a replacement Appointment.",
      },
    ],
  },
  {
    number: 12,
    title: "Technical Failure Policy",
    blocks: [
      {
        type: "paragraph",
        text: "Clients are responsible for ensuring:",
      },
      {
        type: "list",
        items: [
          "Stable internet connectivity",
          "Functional audio and video equipment",
          "Access to the required communication platform",
        ],
      },
      {
        type: "paragraph",
        text: "Where technical difficulties arise, reasonable efforts shall be made by both parties to reconnect.",
      },
      {
        type: "paragraph",
        text: "If a consultation cannot proceed due to substantial technical issues:",
      },
      {
        type: "list",
        items: [
          "The Appointment may be rescheduled",
          "Platform credit may be issued",
          "A refund may be approved following review",
        ],
      },
      {
        type: "paragraph",
        text: "Decisions regarding technical-failure-related refunds shall be made by Aproch at its sole discretion.",
      },
    ],
  },
  {
    number: 13,
    title: "Consultation Discontinuation",
    blocks: [
      {
        type: "paragraph",
        text: "Clients may discontinue participation in therapy at any time.",
      },
      {
        type: "paragraph",
        text: "However, completed sessions shall not be eligible for refunds.",
      },
      {
        type: "paragraph",
        text: "Professionals may discontinue consultations where:",
      },
      {
        type: "list",
        items: [
          "Continuation is clinically inappropriate",
          "Ethical concerns arise",
          "Safety concerns exist",
          "Client behaviour becomes abusive, threatening, or inappropriate",
        ],
      },
      {
        type: "paragraph",
        text: "Future appointments shall remain subject to this Policy.",
      },
    ],
  },
  {
    number: 14,
    title: "Refund Processing Timeline",
    blocks: [
      {
        type: "paragraph",
        text: "Approved refunds shall generally be initiated within seven (7) business days.",
      },
      {
        type: "paragraph",
        text: "Actual receipt of refunded funds may take additional time depending upon:",
      },
      {
        type: "list",
        items: ["Banks", "Card issuers", "Payment gateways", "Financial institutions"],
      },
      {
        type: "paragraph",
        text: "Refunds shall generally be credited to the original payment method used during booking.",
      },
    ],
  },
  {
    number: 15,
    title: "Exceptional Circumstances",
    blocks: [
      {
        type: "paragraph",
        text: "Aproch may consider exceptions to this Policy in limited circumstances, including:",
      },
      {
        type: "list",
        items: [
          "Serious medical emergencies",
          "Hospitalisation",
          "Natural disasters",
          "Government-imposed restrictions",
          "Platform-wide service outages",
          "Other extraordinary circumstances",
        ],
      },
      {
        type: "paragraph",
        text: "Any exception shall be granted solely at Aproch's discretion and shall not create a precedent for future cases.",
      },
    ],
  },
  {
    number: 16,
    title: "Dispute Resolution Regarding Payments",
    blocks: [
      {
        type: "paragraph",
        text: "Clients who believe that a payment, refund, charge, or billing decision is incorrect may contact Aproch for review.",
      },
      {
        type: "paragraph",
        text: "Aproch may request supporting documentation to investigate the matter.",
      },
      {
        type: "paragraph",
        text: "All payment-related disputes shall first be addressed through Aproch's internal review process.",
      },
      {
        type: "paragraph",
        text: "Aproch's decision following review shall be final unless otherwise required by applicable law.",
      },
    ],
  },
  {
    number: 17,
    title: "Contact Details",
    blocks: [
      {
        type: "paragraph",
        text: "For refund requests, payment concerns, cancellation issues, rescheduling requests, or policy-related inquiries, Clients may contact Aproch using the details below.",
      },
      {
        type: "paragraph",
        text: "Aproch shall make reasonable efforts to respond to inquiries within a reasonable timeframe.",
      },
    ],
  },
];
