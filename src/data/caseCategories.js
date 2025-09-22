export const categories = [
  {
    title: "Marriage and Family Matter",
    subs: [
      {
        title: "Divorce and Dissolution of Marriage",
        options: [
          {
            text: "Mutual Consent Divorce",
            questions: [
              "Have you been separated for more than one year?",
              "Do you have a clear agreement on the division of assets?",
            ],
            documents: [
              "Marriage Certificate",
              "Proof of Residence of both parties",
              "Evidence of separation (if any)",
              "Joint statement/Divorce Petition",
            ],
          },
          {
            text: "Contested Divorce (Cruelty, Desertion, Adultery)",
            questions: [
              "Are there minor children involved?",
              "Do you have evidence to prove your grounds for divorce (e.g., messages, photos, witness statements)?",
            ],
            documents: [
              "Marriage Certificate",
              "Divorce Petition",
              "Evidence of Grounds (e.g., photos, messages, medical reports)",
              "Children’s Birth Certificates (if any)",
              "Proof of Income of both parties",
            ],
          },
        ],
      },
      {
        title: "Domestic Violence",
        options: [
          {
            text: "Protection Order under PWDVA, 2005",
            questions: [
              "Do you have a written complaint or FIR filed with the police?",
              "Do you have medical reports or photographic evidence of physical abuse?",
            ],
            documents: [
              "PWDVA Complaint Form",
              "FIR / Medical Reports",
              "Proof of Residence",
              "Witness Statements (if any)",
            ],
          },
          {
            text: "Residence Order in shared household",
            questions: [
              "Is the shared household in your spouse's name?",
              "Do you have proof of living in the shared household?",
            ],
            documents: [
              "Proof of Residence",
              "Marriage Certificate",
              "Property Documents (if available)",
            ],
          },
        ],
      },
      {
        title: "Child Custody and Support",
        options: [
          {
            text: "Dispute over Child Custody",
            questions: [
              "Is a divorce case already in progress?",
              "Is the child's well-being currently at risk with the other parent?",
            ],
            documents: [
              "Divorce Petition / Court Order (if any)",
              "Children's Birth Certificates",
              "School Records",
              "Proof of Income of both parents",
            ],
          },
          {
            text: "Claiming Child Maintenance",
            questions: [
              "Have you filed for divorce or legal separation?",
              "Do you have proof of your spouse’s income?",
            ],
            documents: [
              "Divorce Petition / Legal Separation Order",
              "Proof of Income of both parties",
              "Bank Statements",
              "Children's Birth Certificates",
            ],
          },
        ],
      },
      {
        title: "Spousal Maintenance (Alimony)",
        options: [
          {
            text: "Claiming Spousal Maintenance",
            questions: [
              "Is this a claim during a pending divorce or post-divorce?",
              "Do you have proof of your spouse's assets and income?",
            ],
            documents: [
              "Divorce Petition / Court Order",
              "Proof of Income and Assets of both parties",
              "Bank Statements",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Loan and Financial Dispute",
    subs: [
      {
        title: "Consumer Financial Protection",
        options: [
          {
            text: "E-commerce Fraud / Mis-selling",
            questions: [
              "Is the product fake or was it never delivered?",
              "Do you have screenshots of the product description and your order details?",
            ],
            documents: [
              "Order Confirmation / Invoice",
              "Communication Records with Seller",
              "Bank Statements showing payment",
              "Product Photos (if fake/damaged)",
            ],
          },
          {
            text: "Unauthorized Transactions / Billing Error",
            questions: [
              "Have you already raised a complaint with the bank or company?",
              "Do you have proof of these unauthorized transactions?",
            ],
            documents: [
              "Bank Statements showing transaction",
              "Communication Records with Bank",
              "ID Proof",
            ],
          },
        ],
      },
      {
        title: "Debt Collection Violations",
        options: [
          {
            text: "Harassment by Recovery Agents / Illegal Deductions",
            questions: [
              "Do you have call recordings or messages of the harassment?",
              "Have you filed a police complaint (FIR)?",
            ],
            documents: [
              "Loan Agreement",
              "Bank Statements showing deductions",
              "Recorded Calls / Messages",
              "Police Complaint (FIR) copy",
            ],
          },
        ],
      },
      {
        title: "Loan Recovery and Default",
        options: [
          {
            text: "Legal Notice for Default",
            questions: [
              "Have you received a formal legal notice for default?",
              "Is the loan a secured loan (e.g., home loan, car loan)?",
            ],
            documents: [
              "Loan Agreement",
              "Legal Notice Received",
              "Property Documents (if secured)",
              "Bank Statements of repayment",
            ],
          },
          {
            text: "SARFAESI Act Proceedings",
            questions: [
              "Has the bank initiated proceedings under the SARFAESI Act?",
              "Do you have a copy of the possession notice issued by the bank?",
            ],
            documents: [
              "SARFAESI Notice (Possession Notice)",
              "Loan Agreement",
              "Property Documents",
              "Legal Advice sought (if any)",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Property and Real Estate",
    subs: [
      {
        title: "Builder-Buyer Disputes",
        options: [
          {
            text: "Delayed Possession",
            questions: [
              "Is the project registered under RERA?",
              "Do you have a copy of the Sale Agreement with the promised possession date?",
            ],
            documents: [
              "Sale Agreement",
              "Payment Receipts",
              "RERA Complaint / Correspondence",
              "Communication with the builder",
            ],
          },
          {
            text: "Poor Construction Quality",
            questions: [
              "Is this a newly constructed property?",
              "Do you have photographic evidence of the construction issues?",
            ],
            documents: [
              "Sale Agreement",
              "Photos/Videos of the issues",
              "RERA Complaint / Correspondence",
              "Engineer's Report (if any)",
            ],
          },
        ],
      },
      {
        title: "Landlord-Tenant Conflicts",
        options: [
          {
            text: "Dispute over Security Deposit / Illegal Eviction",
            questions: [
              "Is your lease agreement registered with the sub-registrar?",
              "Have you received a legal eviction notice?",
            ],
            documents: [
              "Lease Agreement",
              "Rent Receipts",
              "Eviction Notices (if any)",
              "Communication Proof with landlord",
            ],
          },
          {
            text: "Property damage dispute",
            questions: [
              "Do you have photos of the damage from before and after?",
              "Is the damage beyond normal wear and tear?",
            ],
            documents: [
              "Lease Agreement",
              "Photos of Damage",
              "Communication Proof",
              "Initial Inspection Report",
            ],
          },
        ],
      },
      {
        title: "Inheritance Disputes",
        options: [
          {
            text: "Conflict over Ancestral Property Rights",
            questions: [
              "Is there a valid will or succession certificate for the property?",
              "Are there other claimants to the property?",
            ],
            documents: [
              "Will / Succession Certificate",
              "Property Deeds",
              "Family Tree Proofs",
              "Legal Notices (if any)",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Employment and Workplace Disputes",
    subs: [
      {
        title: "Workplace Harassment & Discrimination",
        options: [
          {
            text: "Sexual Harassment",
            questions: [
              "Have you filed a complaint with the Internal Complaints Committee (ICC)?",
              "Do you have evidence (emails, messages, witness statements)?",
            ],
            documents: [
              "ICC Complaint",
              "Emails / Messages",
              "Witness Statements",
              "Employment Contract",
              "Payslips",
            ],
          },
          {
            text: "Discrimination (Gender/Age/Religion)",
            questions: [
              "Do you have any documented proof of the discrimination (e.g., demotion, denial of promotion)?",
              "Have you filed a formal complaint with HR?",
            ],
            documents: [
              "HR Complaint",
              "Emails / Messages",
              "Performance Review Records",
              "Employment Contract / Payslips",
            ],
          },
        ],
      },
      {
        title: "Wage & Hour Violations",
        options: [
          {
            text: "Unpaid Overtime / Illegal Deductions",
            questions: [
              "Do you have a record of the extra hours you worked?",
              "Is your job role subject to specific labor laws?",
            ],
            documents: [
              "Employment Contract",
              "Payslips",
              "Work Logs / Records",
              "HR Correspondence",
            ],
          },
          {
            text: "Non-payment of Bonus / Gratuity",
            questions: [
              "Is the bonus/gratuity amount specified in your contract?",
              "Have you sent a legal notice to the company?",
            ],
            documents: [
              "Employment Contract",
              "Offer Letter",
              "Payslips",
              "Legal Notice Sent",
            ],
          },
        ],
      },
      {
        title: "Wrongful Termination",
        options: [
          {
            text: "Illegal Layoff or Retrenchment",
            questions: [
              "Were you given a termination notice as per your contract?",
              "Has your company given a reason for the termination?",
            ],
            documents: [
              "Employment Contract",
              "Termination Letter",
              "Payslips",
              "HR Correspondence",
            ],
          },
          {
            text: "Termination for Unfair Reasons",
            questions: [
              "Do you believe the termination was based on discrimination or retaliation?",
              "Do you have a history of good performance reviews?",
            ],
            documents: [
              "Performance Review Records",
              "Employment Contract",
              "Termination Letter",
              "Emails / Messages",
            ],
          },
        ],
      },
    ],
  },
];

