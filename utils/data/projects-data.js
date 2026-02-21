export const projectsData = [
  {
    id: 1,
    name: "Wealth Management Application",
    executiveSummary: "Built a Playwright + TypeScript automation framework for a Wealth Management app that eliminated 3 days of manual regression, cut QA effort by 70%, and boosted accessibility compliance by 30%.",
    description:
      "Led the design and implementation of a comprehensive Test Automation Framework for a complex wealth management application, utilizing Playwright with TypeScript to automate end-to-end UI and API workflows. Integrated the automation suite into GitHub Actions for continuous testing in CI/CD pipelines, enabling early detection of defects and ensuring high-quality releases. Implemented accessibility testing using axe-core, resulting in improved compliance with WCAG standards and enhanced user experience for all users",
    tools: ["Playwright", "TypeScript", "Jira", "GitHub Actions"],
    role: "Senior Software Test Automation Engineer / SDET",
    code: "",
    demo: "",
    liveReports: [],
    impact: `Reduced manual QA effort by 70% and manual QA time by 80% through automation of complex E2E UI + API workflows, leading to faster release cycles and improved software quality. Enhanced accessibility compliance, resulting in a 30% increase in accessibility score and a more inclusive user experience.`,
  },
  {
    id: 2,
    name: "Playwright with TypeScript - Cross Browser Testing",
    executiveSummary: "Delivered a cross-browser Playwright + TypeScript test suite with built-in accessibility audits and live HTML reports, guaranteeing zero-regression releases across all major browsers via GitHub Actions CI/CD.",
    description:
      "Designed and executed a robust cross-browser testing strategy for a web application using Playwright with TypeScript, ensuring compatibility across multiple browsers and platforms. Developed automated test scripts to validate critical user workflows and integrated them into the CI/CD pipeline for continuous testing. Collaborated with development teams to identify and resolve cross-browser issues, resulting in improved application stability and user experience across diverse environments.",
    tools: ["Playwright", "TypeScript", "Jira", "GitHub Actions", "axe-core"],
    role: "Senior Software Test Automation Engineer / SDET",
    code: "https://github.com/asvignesh-qae/SauceDemo-Automation/blob/main/README.md",
    demo: "",
    liveReports: [
      {
        label: "Playwright UI HTML Report",
        url: "https://asvignesh-qae.github.io/SauceDemo-Automation/ui/",
        type: "playwright",
      },
      {
        label: "Playwright A11Y ♿ HTML Report",
        url: "https://asvignesh-qae.github.io/SauceDemo-Automation/a11y/",
        type: "playwright",
      },
    ],
    impact: ``,
  },
  {
    id: 3,
    name: "Selenium with Java - Hybrid Test Automation Framework",
    executiveSummary: "Architected an enterprise-grade Hybrid Framework (Selenium 4 + Java + BDD + REST Assured) with thread-safe parallel execution and Allure reporting, replacing fragile manual test cycles with a fully automated, CI/CD-integrated solution.",
    description:
      "Architected a Hybrid Test Automation Framework using Selenium 4 with Java 17, combining Page Object Model (POM), Data-Driven Testing, and BDD (Cucumber) approaches into a unified, enterprise-grade solution. Implemented thread-safe parallel execution using ThreadLocal for concurrent test runs, dual test runners (TestNG + Cucumber), and REST Assured for API validation. Integrated Allure reporting with automatic screenshot capture on failures and configured GitHub Actions CI/CD pipelines for automated test execution on every push with self-contained report artifacts.",
    tools: [
      "Selenium",
      "Java",
      "TestNG",
      "Maven",
      "Rest-Assured",
      "GitHub Actions",
    ],
    role: "Senior Software Test Automation Engineer / SDET",
    code: "https://github.com/asvignesh-qae/Genesys-Demo/blob/main/README.md",
    demo: "",
    liveReports: [
      {
        label: "Allure TestNG Report",
        url: "https://asvignesh-qae.github.io/Genesys-Demo/testng/",
        type: "allure",
      },
      {
        label: "Allure Cucumber Report",
        url: "https://asvignesh-qae.github.io/Genesys-Demo/cucumber/",
        type: "allure",
      },
    ],
    impact: ``,
  },
];

// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     liveReports: [],
// },
