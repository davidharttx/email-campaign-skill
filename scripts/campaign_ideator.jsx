import { useState } from "react";

/**
 * Campaign Calendar Builder — React UI Component
 *
 * SETUP: This component requires a backend proxy to call the Anthropic API.
 * Direct browser-to-API calls will fail due to CORS restrictions.
 *
 * Option A: Set the VITE_API_PROXY_URL env var to your proxy endpoint
 *   e.g. VITE_API_PROXY_URL=http://localhost:3001/api/generate
 *
 * Option B: Use the default /api/generate endpoint (works with Next.js API routes,
 *   Express middleware, or any backend that forwards to api.anthropic.com/v1/messages)
 *
 * Your proxy should accept the same JSON body and forward it to Anthropic with
 * your API key in the x-anthropic-api-key header. See README for examples.
 */

const API_ENDPOINT = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_PROXY_URL
  ? import.meta.env.VITE_API_PROXY_URL
  : "/api/generate";

const PILLARS = ["Educational", "Social Proof", "Community/Branded", "Product/Collection", "Sales"];
const PILLAR_COLORS = {
  "Educational": "bg-blue-100 text-blue-800 border-blue-200",
  "Social Proof": "bg-purple-100 text-purple-800 border-purple-200",
  "Community/Branded": "bg-green-100 text-green-800 border-green-200",
  "Product/Collection": "bg-amber-100 text-amber-800 border-amber-200",
  "Sales": "bg-red-100 text-red-800 border-red-200",
};
const EMAIL_TYPE_COLORS = {
  "Graphic": "bg-indigo-50 text-indigo-700",
  "Text-Based": "bg-gray-50 text-gray-700",
};

const SYSTEM_PROMPT = `You are an expert email marketing strategist for DTC e-commerce brands. You specialize in Klaviyo campaigns, high-converting copy, and building monthly campaign calendars.

You follow these principles:
- Send 2–4 campaigns/week (sweet spot for revenue vs. unsubscribes)
- Balance across 5 pillars: Educational, Social Proof, Community/Branded, Product/Collection, Sales
- Mix ~80% graphic emails and ~20% text-based emails
- Apply S.C.E. framework: Skimmable, Clear & Concise, Engaging
- One main idea per email, one key CTA direction
- Use strategic discounts only — never over-discount
- Default segment: 90-day engaged list
- For launches/big sales: expand to 180-day engaged

Return ONLY valid JSON — no markdown, no preamble, no explanation outside the JSON structure.`;

function buildPrompt(brand, product, customer, month, frequency, extraNotes) {
  const count = frequency === "2x" ? 8 : frequency === "3x" ? 13 : 17;
  return `Brand: ${brand}
Product: ${product}
Customer: ${customer}
Month: ${month}
Send frequency: ${frequency} per week (~${count} emails total)
Extra notes: ${extraNotes || "None"}

Generate a complete campaign calendar for this month. Respond ONLY with this JSON structure:

{
  "summary": "2-sentence overview of the month's campaign strategy",
  "campaigns": [
    {
      "id": 1,
      "week": 1,
      "day": "Monday",
      "name": "Campaign name",
      "type": "Graphic",
      "pillar": "Educational",
      "angle": "1-sentence core concept",
      "subject": "Subject line",
      "preview": "Preview text",
      "segment": "90-Day Engaged",
      "hook": "Pain point or hook being addressed",
      "cta": "Primary CTA text",
      "design_note": "Brief design/layout guidance",
      "ps": ""
    }
  ]
}

Important rules:
- Include exactly ${count} campaigns
- Balance across all 5 pillars
- At least 2 text-based emails (set type to "Text-Based" and include a ps field)
- Include relevant national holidays or seasonal angles where they fit
- Subject lines should be curiosity-driven or benefit-led — not generic
- Make the angles creative, specific, and brand-relevant`;
}

export default function CampaignIdeator() {
  const [step, setStep] = useState("form"); // form | loading | results
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [customer, setCustomer] = useState("");
  const [month, setMonth] = useState("April 2026");
  const [frequency, setFrequency] = useState("3x");
  const [extraNotes, setExtraNotes] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [filterPillar, setFilterPillar] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const generate = async () => {
    if (!brand || !product || !customer) {
      setError("Please fill in Brand, Product, and Customer fields.");
      return;
    }
    setError("");
    setStep("loading");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [
            { role: "user", content: buildPrompt(brand, product, customer, month, frequency, extraNotes) }
          ],
        }),
      });

      if (!response.ok) {
        const errBody = await response.text().catch(() => "");
        throw new Error(`API returned ${response.status}: ${errBody.slice(0, 200)}`);
      }

      const data = await response.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setSummary(parsed.summary || "");
      setCampaigns(parsed.campaigns || []);
      setStep("results");
    } catch (e) {
      const msg = e.name === "AbortError" ? "Request timed out after 2 minutes." : e.message;
      setError("Generation failed: " + msg);
      setStep("form");
    } finally {
      clearTimeout(timeout);
    }
  };

  const reset = () => {
    setStep("form");
    setCampaigns([]);
    setSummary("");
    setExpandedId(null);
    setFilterPillar("All");
    setFilterType("All");
  };

  const filtered = campaigns.filter(c =>
    (filterPillar === "All" || c.pillar === filterPillar) &&
    (filterType === "All" || c.type === filterType)
  );

  const pillarCounts = PILLARS.reduce((acc, p) => {
    acc[p] = campaigns.filter(c => c.pillar === p).length;
    return acc;
  }, {});

  const weeks = [1, 2, 3, 4, 5];

  if (step === "form") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-3 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Campaign Calendar Builder
            </h1>
            <p className="text-gray-400 mt-2">AI-powered monthly campaign ideation for DTC brands</p>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 mb-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Brand Name *</label>
              <input
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="e.g. GlowRoot, VitalBloom, TrailFuel"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Product Description *</label>
              <textarea
                value={product}
                onChange={e => setProduct(e.target.value)}
                placeholder="What is the product? Key ingredients, benefits, what makes it different..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Customer Description *</label>
              <textarea
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                placeholder="Who is the customer? Demographics, pain points, what they desire, why they buy..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Campaign Month</label>
                <input
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  placeholder="e.g. April 2026"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Send Frequency</label>
                <select
                  value={frequency}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                >
                  <option value="2x">2x per week (~8 emails)</option>
                  <option value="3x">3x per week (~13 emails)</option>
                  <option value="4x">4x per week (~17 emails)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Extra Notes <span className="text-gray-500 font-normal">(optional)</span></label>
              <input
                value={extraNotes}
                onChange={e => setExtraNotes(e.target.value)}
                placeholder="Upcoming launches, active promos, excluded topics, tone preferences..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <button
              onClick={generate}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-violet-900/40"
            >
              Generate Campaign Calendar →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-violet-800 border-t-violet-400 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-white">Building your campaign calendar...</p>
          <p className="text-gray-400 mt-1">Generating ideas, angles, subject lines + segmentation</p>
        </div>
      </div>
    );
  }

  // Results view
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{brand} — {month}</h2>
            <p className="text-gray-400 text-sm">{campaigns.length} campaigns · {frequency}/week cadence</p>
          </div>
          <button
            onClick={reset}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm transition-colors"
          >
            ← New Calendar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Strategy summary */}
        {summary && (
          <div className="bg-violet-900/30 border border-violet-700/50 rounded-2xl p-5">
            <p className="text-sm font-semibold text-violet-300 mb-1 uppercase tracking-wide">Strategy Overview</p>
            <p className="text-gray-200 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Pillar breakdown */}
        <div className="grid grid-cols-5 gap-3">
          {PILLARS.map(p => (
            <div key={p} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{pillarCounts[p] || 0}</div>
              <div className="text-xs text-gray-400 mt-1">{p}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-500 text-sm self-center mr-1">Filter:</span>
          {["All", ...PILLARS].map(p => (
            <button
              key={p}
              onClick={() => setFilterPillar(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterPillar === p ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-gray-600 mx-1 self-center">|</span>
          {["All", "Graphic", "Text-Based"].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === t ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Campaign cards grouped by week */}
        {weeks.map(w => {
          const weekCampaigns = filtered.filter(c => c.week === w);
          if (weekCampaigns.length === 0) return null;
          return (
            <div key={w}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Week {w}</h3>
              <div className="space-y-3">
                {weekCampaigns.map(c => (
                  <div
                    key={c.id}
                    className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors"
                  >
                    {/* Card header */}
                    <div
                      className="flex items-center gap-4 p-4 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-300 shrink-0">
                        {c.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${PILLAR_COLORS[c.pillar] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
                            {c.pillar}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${EMAIL_TYPE_COLORS[c.type] || "bg-gray-800 text-gray-400"}`}>
                            {c.type}
                          </span>
                          <span className="text-xs text-gray-500">{c.day}</span>
                        </div>
                        <p className="font-semibold text-white mt-1 truncate">{c.name}</p>
                        <p className="text-sm text-gray-400 truncate">{c.subject}</p>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Expanded detail */}
                    {expandedId === c.id && (
                      <div className="border-t border-gray-800 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Field label="Angle" value={c.angle} />
                          <Field label="Subject Line" value={c.subject} highlight />
                          <Field label="Preview Text" value={c.preview} />
                          <Field label="Segment" value={c.segment} />
                        </div>
                        <div className="space-y-3">
                          <Field label="Hook / Pain Point" value={c.hook} />
                          <Field label="Primary CTA" value={c.cta} />
                          <Field label="Design Notes" value={c.design_note} />
                          {c.ps && <Field label="P.S. Line" value={c.ps} highlight />}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, value, highlight }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-sm leading-relaxed ${highlight ? "text-violet-300 font-medium" : "text-gray-300"}`}>
        {value}
      </p>
    </div>
  );
}
