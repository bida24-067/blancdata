import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description: 'Explore Blanc Data services: automated reporting dashboards, data cleaning pipelines, market analysis, and predictive machine learning models in Botswana.',
}

const detailedServices = [
  {
    id: 'dashboards',
    title: 'Dashboards & Reporting Systems',
    tagline: 'Stop rebuilding the same spreadsheet every month.',
    description:
      'We design and deploy interactive business intelligence reports that automatically refresh from your operational databases, ERPs, or spreadsheets. Your team gets one single source of truth.',
    deliverables: [
      'Automated data refresh schedules with zero manual copy-pasting',
      'Role-based KPI views for executives, managers, and operational teams',
      'Interactive drill-downs across departments, branches, or product lines',
      'Exportable board-ready visual summaries and scheduled email digests',
    ],
    tools: ['Power BI', 'Databricks Lakeview', 'SQL', 'Streamlit'],
  },
  {
    id: 'cleaning',
    title: 'Data Cleaning & Pipeline Engineering',
    tagline: 'Turn fragmented files into clean, queryable data.',
    description:
      'We engineer robust extraction and transformation workflows that ingest messy PDFs, historical exports, and disparate systems, enforcing schema consistency and automated error checks.',
    deliverables: [
      'Automated parsing of unstructured and tabular PDFs into structured SQL tables',
      'Data deduplication, missing-value imputation, and outlier detection',
      'Medallion architecture (Bronze / Silver / Gold) for scalable analytics',
      'Documented schema dictionary and data lineage mapping',
    ],
    tools: ['PySpark', 'Delta Lake', 'Python', 'SQL'],
  },
  {
    id: 'analysis',
    title: 'Market & Sector Analysis',
    tagline: 'Deep analytical intelligence built on verified data.',
    description:
      'We analyze macroeconomic indicators, market concentration, regulatory trends, and industry benchmarks across Botswana and the SADC region to support investment decisions and feasibility studies.',
    deliverables: [
      'Competitor concentration and market share distribution models',
      'Public registry and sector regulatory data aggregations',
      'Sensitivity analysis and scenario stress-testing',
      'Executive briefing decks with documented citations for every chart',
    ],
    tools: ['Python', 'Pandas', 'Statistical Modelling', 'Power BI'],
  },
  {
    id: 'modelling',
    title: 'Predictive Modelling & Machine Learning',
    tagline: 'Forecast outcomes with documented error rates and assumptions.',
    description:
      'We develop supervised and unsupervised machine learning pipelines that predict customer defaults, demand surges, or agricultural yields, complete with explainability and risk boundaries.',
    deliverables: [
      'Production-ready scoring pipelines with feature engineering',
      'Feature importance breakdowns (knowing which variables drive results)',
      'Threshold tuning to balance approval rates against financial risk',
      'Interactive prototype apps for stakeholders to simulate scenarios',
    ],
    tools: ['PySpark MLlib', 'Scikit-Learn', 'Delta Lake', 'Streamlit'],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* ── Page Header ── */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] relative overflow-hidden bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] block mb-3">
              Capabilities & Offerings
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Data analytics built for decision-makers in Botswana.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              We focus on four foundational disciplines. Every project is scoped around the exact commercial or policy questions your organisation needs answered.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Tiles ── */}
      <section className="py-16 md:py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {detailedServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="p-8 md:p-12 rounded-2xl bg-[#191919] border border-white/[0.08] hover:border-white/[0.18] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                {/* Left Overview */}
                <div className="lg:max-w-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-white/40">0{index + 1}</span>
                    <span className="h-px w-8 bg-white/20"></span>
                    <span className="text-xs uppercase tracking-wider text-[#9fa3fc] font-medium">Service</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-base text-white/90 font-medium">
                    {service.tagline}
                  </p>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/40">Technologies:</span>
                    {service.tools.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded bg-[#121212] border border-white/[0.08] text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Deliverables Tile */}
                <div className="lg:w-96 p-6 rounded-xl bg-[#131313] border border-white/[0.06] space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    What You Receive
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                        <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center w-full bg-white/[0.08] hover:bg-white text-white hover:text-black text-xs font-semibold py-2.5 rounded-lg transition-all"
                    >
                      Scope a {service.title.split('&')[0]} project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing Callout ── */}
      <section className="py-20 border-t border-white/[0.08] text-center bg-[#121212]">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
            Have a project in mind?
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Tell us about the datasets you hold and the operational question you need answered. We build an initial prototype before you commit.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-md"
            >
              <span>Start a project inquiry</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
