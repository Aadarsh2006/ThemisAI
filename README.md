# Themis AI ⚖️

**Your AI-Powered Legal Assistant for Instant Guidance and Document Preparation.**

Themis AI is a modern, user-friendly web application designed to demystify legal processes and provide accessible support for common legal queries in India. Leveraging the power of Google's Gemini API, Themis offers a suite of tools to help users understand their rights, generate legal documents, and prepare for legal proceedings without the immediate need for a lawyer.

## ✨ Key Features

Themis AI provides a range of specialized services, each tailored to a specific legal need:

* **🤖 AI Legal Chat:** Get instant, conversational answers to complex legal questions. The chat interface is designed for natural language queries, making legal information more accessible than ever.
* **📄 Document Generation:** Automatically create preliminary legal documents. Simply provide your case details, and Themis generates a formatted PDF of a formal complaint or information request.
* **✍️ Letter Drafter:** Draft professional and effective formal letters for various official communications, ensuring you use the right tone and format.
* **🔍 Case Status Helper:** Confused about a case update? Themis helps you understand the status of your case and provides clear guidance on the next steps you should take.
* **📜 Rights Explainer:** Learn about your fundamental rights in various situations. Themis explains your rights in simple, easy-to-understand language, empowering you with knowledge.
* **🎤 Voice-Powered Assistant:** Interact with Themis completely hands-free. Our integrated voice command interface allows for maximum accessibility and ease of use.
* **🌙 Dark & Light Mode:** A sleek, modern interface with theme support for comfortable viewing in any lighting condition.

## 🛠️ Tech Stack

This project was built using a modern, scalable technology stack chosen for performance and developer experience:

* **Frontend:** [React.js](https://reactjs.org/) - A powerful JavaScript library for building dynamic and responsive user interfaces.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
* **AI & Language Model:** [Google Gemini API](https://ai.google.dev/) - The core engine providing the advanced natural language understanding and generation capabilities.
* **Icons:** [Lucide React](https://lucide.dev/) - A beautiful and consistent open-source icon library.
* **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) - A client-side library for generating PDF documents directly in the browser.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* **npm**
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/Aadarsh2006/ThemisAI.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd ThemisAI
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Run the application**
    ```sh
    npm start
    ```
    Your application should now be running on `http://localhost:3000`.

## 📂 Project Structure

The project follows a modular, feature-based structure to ensure scalability and maintainability. Here is a complete breakdown of every file:

'''
themis-ai-app/
├── .gitignore
├── jsconfig.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
└── src/
├── App.jsx
├── index.jsx
├── assets/
│   ├── images/
│   │   └── client-placeholder.png
│   └── styles/
│       └── index.css
├── components/
│   ├── common/
│   │   ├── AIResponseRenderer.jsx
│   │   ├── CircularProgress.jsx
│   │   ├── ConfirmationModal.jsx
│   │   └── Modal.jsx
│   ├── features/
│   │   ├── CaseStatusModal.jsx
│   │   ├── ChatModal.jsx
│   │   ├── CrimeConsequencesModal.jsx
│   │   ├── DocGenModal.jsx
│   │   ├── HearingPrepModal.jsx
│   │   ├── LetterDrafterModal.jsx
│   │   └── RightsExplainerModal.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── ServicesGrid.jsx
│   │   ├── Testimonials.jsx
│   │   └── UpcomingServices.jsx
│   └── layout/
│       ├── Footer.jsx
│       ├── Header.jsx
│       └── ProfileMenu.jsx
├── data/
│   ├── caseCategories.js
│   └── testimonialsData.js
├── hooks/
│   └── useTheme.js
├── pages/
│   ├── HomePage.jsx
│   ├── ProfilePage.jsx
│   └── VoiceAssistantPage.jsx
├── services/
│   └── geminiService.js
└── utils/
└── pdfUtils.js
'''


## 🔮 Future Scope

While Themis AI currently provides foundational legal assistance, there is immense potential for growth. Future enhancements could include:

* **Secure User Accounts:** Allowing users to create accounts to securely save their generated documents, chat history, and case details for future reference.
* **Advanced Document Analysis:** A feature where users can upload existing legal documents (like a lease agreement or a contract) for the AI to analyze, summarize, and flag potential issues.
* **Integration with e-Courts API:** Connecting to the official e-Courts services API in India to fetch real-time, accurate case status information and hearing dates directly.
* **AI-Powered Case Law Search:** Developing a tool that allows users to search for relevant case laws and judgments using natural language, with the AI providing simplified summaries.
* **Verified Lawyer Directory:** A feature to connect users with verified legal professionals in their area for when AI assistance is not enough.


## ✍🏻Author

Aadarsh Jha (Linkedin : www.linkedin.com/in/aadarshjha09)