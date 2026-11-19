-- Initial Seed Data for Cloudflare D1
-- Blanc Data Portfolio Projects

INSERT OR REPLACE INTO projects (
  id,
  slug,
  title,
  sector,
  question,
  data_source,
  tools,
  status,
  summary,
  detail,
  disclaimer,
  demo_url
) VALUES (
  'agrivision',
  'agrivision-yield-analytics',
  'AgriVision Yield Analytics',
  'Agriculture & Crop Farming',
  'Which agronomic and climate variables most strongly predict crop yields, and how can farmers use that to plan ahead?',
  'Kaggle dataset (public agricultural data)',
  '["Databricks", "PySpark", "Delta Lake", "PySpark MLlib", "Streamlit"]',
  'in-progress',
  'An end-to-end agricultural intelligence platform that forecasts crop yields from environmental and agronomic data, with an interactive Streamlit interface for farmers and planners.',
  '{"problem":"Fragmented agronomic, environmental, and historical harvest data makes it hard for farmers and agricultural planners to anticipate yields or allocate resources ahead of a season.","data":"Public agricultural dataset from Kaggle covering crop production metrics, rainfall patterns, temperature, fertiliser usage, and regional cultivation data.","method":"Built on Databricks using PySpark and Delta Lake. Trained an MLlib Random Forest regression model on standardised multi-variable datasets. Feature importance analysis identifies which climate and input variables drive outcomes most.","result":"Interactive Streamlit web app where users input farm parameters and receive real-time yield forecasts without touching code.","limits":"Model trained on public Kaggle data, not Botswana-specific field observations. Predictions improve with local data.","techStack":["Databricks","PySpark","Delta Lake","PySpark MLlib (Random Forest)","Streamlit"],"architecture":"Raw data → PySpark cleaning → Delta Lake tables → MLlib Random Forest → Streamlit UI"}',
  'Independent prototype built from a public Kaggle dataset. Not produced for or endorsed by any agricultural organisation.',
  ''
),
(
  'bnpl',
  'bnpl-credit-risk',
  'BNPL Credit Risk Scoring & Loan Recommendation Pipeline',
  'Financial Services / Credit Risk',
  'Which applicants are likely to default on a short-term instalment loan, and what credit limit is safe to offer?',
  'Kaggle dataset (public credit / lending data)',
  '["Databricks", "PySpark", "Delta Lake", "PySpark ML", "Streamlit"]',
  'complete',
  'An automated credit decisioning engine that predicts default probability, assigns risk tiers, and recommends credit limits — built on a Medallion-architecture Delta Lake pipeline.',
  '{"problem":"Manual credit review is slow and inconsistent. BNPL lenders need to approve or decline applications in real time while balancing approval rates against financial exposure.","data":"Public lending dataset from Kaggle covering applicant demographics, transaction logs, and historical repayment histories.","method":"Medallion architecture (Bronze → Silver → Gold) in Databricks. PySpark ML classification model for default probability. Rules-based layer converts risk score to Approve / Decline / Manual Review decision and recommended credit limit.","result":"Multi-level Databricks Lakeview Dashboard and interactive Streamlit prototype showing portfolio-level risk exposure, cost-loss matrices, and individual applicant breakdowns.","limits":"Model trained on public Kaggle data. Performance on real BNPL portfolios would require retraining on actual transaction history.","techStack":["Databricks","PySpark","Delta Lake (Medallion)","PySpark ML","Databricks Lakeview","Streamlit"],"architecture":"Bronze (raw ingestion) → Silver (cleaning) → Gold (feature store) → ML scoring → Decision engine → Dashboard"}',
  'Independent prototype built from a public Kaggle dataset. Not produced for or endorsed by any financial institution.',
  ''
);
