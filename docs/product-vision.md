# AI Driven Shopify + Hydrogen Headless E-commerce Product

> **STATUS: VISION DOC — decisions superseded by `hydrogen-storefront-wizard-spec.md` (2026-08-27).**
> The comprehensive product spec (all locked decisions, pricing, architecture, roadmap) lives at
> `hydrogen-storefront-wizard-spec.md`. Research: `beachhead-market.md`, `customer-profile.md`,
> `gtm-playbook.md`. Engineering spec (in-repo): `Projects/e-commerce-website/openspec/changes/implement-config-driven-theming/`.
> Sections below marked ⚠️ were updated to the settled plan on 2026-08-27.

**Idea**: we have Shopify's open source headless e-commerce engine, Hydrogen. There are 4 competitors in the Shopify headless space — Weaverse, Truestorefront, Webkul and Shopify partner ecosystems/agencies. *(Confirmed by research; add CommerceForge — a dev-facing Hydrogen starter for agencies, found 2026-08-27.)*

**Headless adoption.** Survey of 1015 enterprise decision-makers (US/UK/AU, ~$800M avg revenue) found 73% using headless architecture in 2024, up from 64% since 2021.

**Who adopts headless on Shopify.** The evidence is concentrated at the top: Allbirds (Hydrogen across 35 countries), SKIMS, Gymshark, Good American, Denim Tears all run Hydrogen storefronts. Agency commentary is blunt that headless suits *high-growth DTC and enterprise brands with React teams*, not most merchants: "Most DTC brands don't need it" (Tribe Studio, accessed 2026-08-19, Medium); Hydrogen builds run €200k+ at Ask Phill and $80K–$200K plus $5.2K–$17.3K/month run-rate per Atwix (Medium). Subscription businesses are a named fit (Weaverse Naturelle; BarkBox). Agencies are the distribution bottleneck (AgencyPro, Low).

### The positioning (updated 2026-08-27)

⚠️ The market gap is the **sub-$5M DTC brand that wants headless performance without hiring React engineers** — the segment agencies refuse to serve. **Nobody occupies the merchant-facing slot: "headless storefront, no developer needed."** Every competitor (Weaverse, Pack, Truestorefront, Ciseco, CommerceForge) requires a React dev to install. Our moat: the 15-minute wizard + support SLA + agency enablement — not the codebase (Shopify is commoditizing Hydrogen via the Vercel rebuild).

⚠️ Pitch = **control + ceiling**, not raw speed (median Liquid themes pass Core Web Vitals on 83% of shops): *"change your colors, copy, and layout without a developer — ever."*

### Technology & Product

The product has 2 main layers.

**Layer 1:** The wizard — guides users to what their store should look like; we do the heavy lifting and provide a 3–4 step process completed in under 15 minutes, offering a versatile performant storefront with the latest design technology.

- Ability to choose a design philosophy for your store (⚠️ v1: 2 presets — `minimal` (Exaggerated Minimalism) and `playful` (Partake-inspired); target 3 by launch).
- Ability to adjust layout (⚠️ variant flags, not drag-drop) and select a brand-adjusted color scheme or go with defaults (⚠️ config-driven design tokens).
- Ability to add logo, names, domain name, other information.
- Deploy (⚠️ OAuth install → per-merchant repo → push-to-deploy to their Oxygen).
- Add AI agent readable website (⚠️ llms.txt + schema.org + /products.json in v1; MCP v2).
- ⚠️ **Voice-assisted onboarding planned for v1.5** — "describe your brand, watch it appear": turn-based STT/LLM/TTS overlay on the same config schema.

**Layer 2:** This layer sits on top of Hydrogen — a performant app with fast load times, good SEO and lighthouse scores, a11y and L1n0 capabilities. Core logic and features don't change; the design system and layout change based on user input from Layer 1 (⚠️ config-driven single codebase: `hydrogen.config.json` → runtime token resolution → CSS variables + layout flags; additive-only contract + release-train upgrades).

### Monetisation & Revenue (⚠️ updated 2026-08-27)

⚠️ **Productized, not services** (decision locked via grilling session):

- One-time setup: **$300–500** (recommend $499) — 0.1–1% of the $50k–250k agency alternative.
- Recurring maintenance: **$49–99/mo** (recommend $79) — platform + shared-core maintenance + 1 support hour/mo.
- Custom work outside the wizard's parameter space: separate quote flow, published hourly rate, minimum engagement.
- Billing: **Paddle (merchant of record)** — US customer pays Paddle; payouts monthly in USD to Indian bank (all-in ~6–8%). Unlisted Shopify app in v1; public App Store listing later (0% revenue share on first $1M).

*Superseded: one-time $30,000–$40,000 (US/EU) / $4,000–$5,000 (domestic) — a services model a solo/few-person team cannot deliver at volume.*

### GTM Strategy (⚠️ updated 2026-08-27)

⚠️ **Beachhead: US-first** (evidence: ~10x merchant base, only market with category demand, USD revenue vs INR cost base, 0% GST on exported services via LUT). India = supply-side leverage only (white-label to Indian agencies serving US clients, support base). Full 90-day playbook in `gtm-playbook.md`.

Approach DTC brands that currently use Liquid theme design from Shopify and convince them to switch to our headless product (⚠️ strongest trigger: agency-quote sticker shock; also speed crisis, conversion plateau, app fatigue). Since liquid themes sell for around $350, pricing stays in the $300–500 range with a higher-value recurring maintenance fee. First-100 channels: SEO on uncontested merchant-intent SERPs, trigger-based outreach from BuiltWith/StoreLeads lists, agency white-label, App Store listing later.

### User questions and queries (⚠️ updated 2026-08-27)

The user might want a more custom website than the one we offer — in that case we discuss requirements, timelines, and extra charges (⚠️ structured quote flow outside the wizard, published hourly rate, minimum engagement; no bespoke work inside the 15-minute promise).

### Live documents

- **Product spec (source of truth):** `hydrogen-storefront-wizard-spec.md`
- Beachhead research: `beachhead-market.md` · Customers: `customer-profile.md` · GTM: `gtm-playbook.md`
- Engineering (in store repo): `openspec/changes/implement-config-driven-theming/` (proposal/spec/tasks)
