# CONTENT.md

Everything in `[square brackets]` is a placeholder the owner must supply. Don't invent replacements. Leave the bracket in place, and list every remaining bracket in your final report.

## Facts you can rely on

- Blanc Data is a data consultancy based in Gaborone, Botswana.
- The first projects are the company website and portfolio projects built from public data.
- The company plans to start approaching clients in January 2027.
- It is a separate organisation from UnpakData and from BAC. Neither name appears on the site unless the owner says so.

## Facts you don't have

Don't make up: client names, testimonials, results, statistics, awards, years of experience, team size, certifications, prices, or turnaround times. If a page seems to need one, remove the claim.

## Voice

Plain, specific and calm. Short sentences. Say what the service does, not how impressive it is. Use sentence case for headings and buttons. Name actions exactly: "Start a project", not "Learn more". Don't write "leverage", "unlock", "seamless", "cutting-edge", "empower", or "in today's fast-paced world". Don't open with a question. Let a word repeat if it's the clearest one.

## Services (draft, confirm with the owners)

| Service | One-line description |
|---|---|
| Dashboards and reporting | Interactive reports that update from your data, so you stop rebuilding the same spreadsheet each month. |
| Data cleaning and extraction | Turn PDFs, scattered spreadsheets and messy exports into one clean dataset you can query. |
| Market and sector analysis | Trends, comparisons and concentration across a sector, built from published and public data. |
| Predictive modelling | Models that estimate what is likely to happen next, with the assumptions and error rates spelled out. |

## Home

**Meta title:** Blanc Data | Data analytics in Botswana
**Meta description:** Blanc Data builds dashboards, data pipelines and analysis for organisations in Botswana. Start a project.

**Hero headline:** Data analytics for organisations in Botswana
**Hero subhead:** Blanc Data turns your data into dashboards, analysis and models you can check and reuse.
**Primary button:** Start a project
**Secondary link:** See our projects

**Services heading:** What we build
**Services intro:** Four kinds of work, each scoped to a question you want answered.

**Selected work heading:** Recent projects
**Selected work intro:** These are prototypes built from public data while we prepare to take on client work.
**Link:** View all projects

**How we work heading:** How a project runs
1. Scope: We agree the question, the data, and what done looks like.
2. Prototype: You see a working version early, on real data.
3. Deliver: We finish the work and document how it was built.
4. Hand over: You get the files, the method, and a walkthrough.

**Closing statement:** Bring us a question your data should be able to answer.
**Closing button:** Start a project

## About

**Meta title:** About Us | Blanc Data
**Meta description:** Blanc Data is a data consultancy based in Gaborone, Botswana. Meet the team and see how we work.

**Heading:** About Blanc Data
**Intro paragraph 1:** Blanc Data is a data consultancy in Gaborone, Botswana. We build dashboards, clean and combine datasets, and run analysis for organisations that have data but not the time to work through it. [Founded: year]
**Intro paragraph 2:** We started with the questions Botswana's published data can already answer, and we're building our portfolio on those before taking on client work.

**Team heading:** The team
- Loago Montsho, Founder & Lead Analyst. Loago Kevin Montsho is a Data Analyst and third-year Business Intelligence and Data Analytics student at Botswana Accountancy College, specializing in end-to-end data pipelines, machine learning, and business process optimization. As the founder of blancData and a Lean Six Sigma Yellow Belt, he combines technical proficiency in Databricks, PySpark, SQL, and Power BI to transform complex datasets into actionable insights for financial markets, credit risk, and agricultural forecasting. Based in Gaborone, he is passionate about building scalable, data-driven solutions that drive strategic decision-making and operational efficiency.
- Abia Bleskit, Data Analyst. [Two-sentence bio.]


**How we work heading:** How we work
- We show our sources. Every chart and number links back to where the data came from.
- We build a prototype before we pitch. You see something working before you commit.
- We use your data for your project and nothing else.

## Projects

**Meta title:** Projects | Blanc Data
**Meta description:** Portfolio projects from Blanc Data: dashboards and analysis built from public data in Botswana and the SADC region.

**Heading:** Projects
**Intro:** Portfolio work built from public data. Each card names the data source, and says whether the project is finished.

**Candidate projects** (publish only what is built; confirm each with the owner):

1. **AgriVision Yield Analytics.** Sector: Agriculture Crop Farming. Core Objective: Transform fragmented agronomic, environmental, and historical harvest data into reliable crop yield predictions and actionable operational insights for farmers and agricultural planners. Data: Kaggle Dataset. Tools: Databricks, PySpark, Delta Lake, PySpark MLlib (Random Forest), and Streamlit.. Status: [In progress / Complete]. [More Details in a separate page: An end-to-end agricultural intelligence and crop yield forecasting platform designed to support climate resilience, food security, and data-driven farm planning.
Core Objective: Transform fragmented agronomic, environmental, and historical harvest data into reliable crop yield predictions and actionable operational insights for farmers and agricultural planners.
Tech Stack: Databricks, PySpark, Delta Lake, PySpark MLlib (Random Forest), and Streamlit.
Architecture & Data Processing:
Built on Databricks using PySpark and Delta Lake to process large-scale, multi-variable agricultural datasets.
Standardizes and joins historical crop production metrics with environmental and soil features (such as rainfall patterns, temperature anomalies, fertilizer usage, and regional cultivation data) into analytics-ready Delta tables.
Predictive Modeling:
Trained an MLlib Random Forest regression model to forecast expected crop yields across varying environmental and input conditions.
Evaluates feature importance to identify which agronomic and climatic variables have the strongest impact on harvest outcomes, allowing stakeholders to simulate "what-if" scenarios.
User Interface & Economic Impact:
Interactive Streamlit Web App: Provides an accessible front-end interface where users can input farm parameters, explore regional yield trends, and generate real-time yield forecasts without touching code.
Strategic Relevance: Directly addresses food security and agricultural innovation challenges in Botswana by enabling proactive resource allocation, mitigating climate-driven harvest risks, and modernizing agricultural decision-making.]
2. **Buy Now, Pay Later (BNPL) Credit Risk Scoring & Loan Recommendation Pipeline.** Core Objective: Automate credit underwriting for short-term installment loans by predicting default probabilities, balancing approval rates against financial exposure, and eliminating manual review bottlenecks. Data: Kaggle Dataset. Status: Complete. [more Details in a separate page: An end-to-end automated credit decisioning engine built to evaluate applicant default risk in real time and dynamically recommend tailored credit limits and loan terms.
Core Objective: Automate credit underwriting for short-term installment loans by predicting default probabilities, balancing approval rates against financial exposure, and eliminating manual review bottlenecks.
Tech Stack: Databricks, PySpark, Delta Lake (Medallion Architecture), PySpark ML, Databricks Lakeview Dashboards, and Streamlit.
Architecture & Data Pipeline (Medallion Structure):
Bronze Layer (Raw Ingestion): Ingests raw transaction logs, applicant demographic records, and historical repayment histories into Delta tables with schema enforcement.
Silver Layer (Cleaning & Standardization): Handles missing values, removes duplicate applications, normalizes behavioral payment timestamps, and enforces data quality constraints.
Gold Layer (Feature Store): Engineers high-signal credit indicators—including debt-to-income (DTI) ratios, repayment velocity, historical delinquency counts, and credit utilization patterns—to serve both model training and inference.
Machine Learning & Decision Engine:
Default Probability Scoring: Uses a supervised classification pipeline built in PySpark ML to score each applicant's probability of default (PD).
Rules-Based Recommendation Layer: Pairs the ML risk score with business logic to dynamically assign risk tiers, recommend maximum safe credit limits, and output instant Approve / Decline / Manual Review decisions.
Visualization & Reporting:
Designed a multi-level Databricks Lakeview Dashboard (and an interactive Streamlit prototype) to monitor portfolio-level risk exposure, evaluate cost-loss matrices across probability thresholds, and inspect individual applicant scoring breakdowns.]

## Contact

**Meta title:** Contact | Blanc Data
**Meta description:** Tell Blanc Data about your project. We reply by email.

**Heading:** Tell us about your project
**Intro:** Share a few details and we'll reply by email within 3 business days.

**Step 1 label:** How can we reach you?
**Step 2 label:** Tell us about your project
**Step 2 helper:** A few sentences is enough: what you want to know and what data you have.
**Step 3 label:** How did you find us?

**Consent line:** We'll use these details only to reply to your message. See our privacy policy.
**Submit button:** Send message
**Thank-you heading:** Thanks, you're all set.
**Thank-you text:** We've received your message and will reply within 3 business days. While you wait, see our projects.
**Error text:** The message didn't send. Your answers are saved here. Try again, or email us at hello@blancsociety.co.uk.

**Direct contact:** hello@blancsociety.co.uk · Gaborone, Botswana · https://www.linkedin.com/company/blancdata/

## Footer

**Columns:** Pages (Home, About, Projects, Contact) · Services (the four above) · Company (Privacy policy)
**Copyright:** © 2026 Blanc Data. [Add the registered company name and number once CIPA registration is complete.]
