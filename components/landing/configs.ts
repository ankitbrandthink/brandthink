export type H1Config =
  | { type: 'static'; text: string }
  | { type: 'animated'; prefix: string; strings: string[] };

export interface LandingConfig {
  location: string;
  hero: { h1: H1Config; sub: string; formTitle: string };
  about: { h2: string; sub: string | null; p1: string; p2: string };
  services: { h2: string; cta: string; paidSearchBody: string };
  whySub: string;
  aeoDesc: string;
  budgetOptions: string[];
  faqs: Array<{ q: string; a: string[] }>;
}

export const gurugramConfig: LandingConfig = {
  location: 'Gurugram',
  hero: {
    h1: { type: 'static', text: 'Scale Your Acquisition. Outpace Your Competition.' },
    sub: "If your campaigns are getting clicks but not closing deals or driving sales, the targeting isn't the problem, the strategy is. We fix that.",
    formTitle: 'Schedule Your Growth Strategy Call',
  },
  about: {
    h2: 'Performance Marketing Agency in Gurgaon for B2B Lead Generation',
    sub: null,
    p1: 'In a market that moves at breakneck speed, generic ad strategies just drain your budget. As a premier performance marketing agency in Gurgaon, we strip away the noise to build acquisition systems engineered for your genuine revenue targets. We help you capture qualified demand and turn scaling friction into revenue velocity giving your brand the definitive edge to claim its market share.',
    p2: 'Most agencies spend your budget to find out what works. We deploy campaigns optimized for high-intent audiences to protect your capital from day one. Our model pairs high-velocity creative testing with precise tracking to stabilize your unit economics and drive predictable scale. No wasted spend. No vanity metrics. Just systematic expansion.',
  },
  services: {
    h2: 'Engineered Frameworks for Predictable Scale',
    cta: 'BUILD YOUR STRATEGY',
    paidSearchBody: 'Capture high-intent prospects precisely when they need you. Collaborating with an experienced google ads agency in Gurgaon, you build hyper-targeted search capture pipelines that isolate target keywords, intercept buyer research, and systematically outbid your market competition.',
  },
  whySub: 'The BrandThink Advantage',
  aeoDesc: "We're an AEO and GEO-ready performance marketing agency in Gurgaon built for how people search now.",
  budgetOptions: ['Below Rs. 1,00,000', 'Rs. 1,00,000 - Rs. 5,00,000', 'Rs. 5,00,000 - Rs. 10,00,000', 'Above Rs. 10,00,000'],
  faqs: [
    { q: "What's included when I hire a performance marketing agency in Gurgaon?", a: ["A performance marketing agency in Gurgaon should manage the full lead-generation stack, not just run ads and leave the rest to you.", "Google Ads, LinkedIn Ads, and Meta Ads, run as one funnel", "Landing page and lead-qualification audits", "Weekly reporting tied to pipeline, not just lead count"] },
    { q: 'Why do B2B leads cost more to acquire in Gurgaon than in other cities?', a: ["Gurgaon's concentration of enterprise and SaaS buyers means more advertisers competing for the exact same high-intent audience.", "Finance, SaaS, and consulting keywords are among India's most contested", "Longer B2B sales cycles mean cost per lead looks higher upfront, even when ROI is strong", "We track cost per qualified lead, not just cost per lead, to keep this honest"] },
    { q: 'What should I look for when hiring a performance marketing agency in Gurgaon?', a: ["The agencies that actually drive pipelines look different from the ones that just keep an ad account running.", "Ask whether they report on leads and ROAS, or just clicks and impressions", "Ask if they manage LinkedIn and Google as one strategy, or two disconnected accounts", "Ask for proof of B2B results specifically, not just ecommerce or D2C case studies"] },
    { q: 'How long until I see results from B2B campaigns in Gurgaon?', a: ["B2B timelines run longer than ecommerce simply because the buying decision itself takes longer to move through.", "Initial lead flow in 7-14 days", "Lead quality signals become clear by 30 days", "ROAS and pipeline impact are usually measurable by 60-90 days"] },
    { q: 'Which platforms actually work for B2B lead generation in Gurgaon?', a: ["The right platform mix depends on deal size and who within the company is actually making the buying decision.", "LinkedIn Ads for targeting by job title, company size, and industry", "Google Search for buyers already researching or comparing vendors", "Meta used for retargeting and awareness, not as the primary B2B acquisition channel"] },
    { q: "What's ROAS, and why does it matter more than lead volume?", a: ["A high lead count looks impressive in a report, but it means nothing if those leads never turn into revenue.", "ROAS measures revenue earned per rupee spent on ads", "A campaign generating 200 cheap leads can have worse ROAS than one generating 20 qualified ones", "We report on ROAS and pipeline value, not just lead count, every cycle"] },
    { q: 'Can you run B2B lead generation alongside D2C or ecommerce campaigns?', a: ["Yes, and many Gurgaon businesses do run both, but the two need genuinely different targeting logic to avoid diluting each other.", "B2B campaigns are built around job titles, company size, and intent", "D2C/ecommerce campaigns are built around audience interest and purchase behaviour", "We keep both strategies separate so neither pulls down the other's targeting data"] },
    { q: "I don't have a huge budget. Can B2B lead gen still work?", a: ["Yes, though a smaller budget changes how tightly we need to target rather than whether the approach works at all.", "Tighter targeting matters more on limited spend, especially in a competitive market like Gurgaon", "We focus your spend on the highest-intent audience signals first", "Scaling follows proof of what's converting, not a fixed minimum entry point"] },
  ],
};

export const mumbaiConfig: LandingConfig = {
  location: 'Mumbai',
  hero: {
    h1: { type: 'static', text: "Scaling Your Brand Shouldn't Be a Guessing Game" },
    sub: "Mumbai is India's most expensive ad market. If you bid like everyone else, your budget vanishes in days. BrandThink builds custom, high-efficiency frameworks specifically for this landscape.",
    formTitle: 'Audit My Ad Accounts For Free',
  },
  about: {
    h2: 'A Digital Performance Marketing Agency in Mumbai Focused on Net Margins, Not Vanity Metrics',
    sub: null,
    p1: "Metrics mean nothing without momentum. We don't pitch you on vanity impressions; we align our entire strategy with your actual revenue goals. As a leading performance marketing company, we help Mumbai's most ambitious brands eliminate ad waste and deploy conversion-focused frameworks built to scale.",
    p2: "We approach market capture with absolute precision. By mapping your campaigns directly to real buyer intent, we systematically eliminate wasted media spend, acquire high-value customers, and maximize your ongoing return on investment. Our execution model balances aggressive creative testing with rigorous capital efficiency. From high-intent search capture to multi-platform remarketing, every single digital touchpoint we build is fully optimized to protect and grow your margins.",
  },
  services: {
    h2: 'Custom-Built Funnels to Capture and Convert Demand',
    cta: 'DESIGN YOUR STRATEGY',
    paidSearchBody: 'Capture high-intent buyers at the exact moment they search for your solution. Working as your dedicated google ads agency in Mumbai, we deploy highly optimized bidding structures that systematically outperform competitors and turn raw search intent into reliable customer acquisition.',
  },
  whySub: 'Built as a digital performance marketing agency delivering measurable, scalable growth.',
  aeoDesc: "We're an AEO and GEO-ready performance marketing agency in Mumbai built for how people search now.",
  budgetOptions: ['Below Rs. 1,00,000', 'Rs. 1,00,000 - Rs. 5,00,000', 'Rs. 5,00,000 - Rs. 10,00,000', 'Above Rs. 10,00,000'],
  faqs: [
    { q: "What's included when I hire a performance marketing agency in Mumbai?", a: ["A performance marketing agency in Mumbai should be managing far more than just your ad account.", "Paid media across Google Ads, Meta Ads, and paid search run as one connected strategy rather than separate teams managing separate platforms with no shared view of what's actually converting", "Landing page and funnel audits, since the ad is only half the equation — if the page doesn't convert, the click was wasted", "Weekly reporting tied to leads and sales, not just impressions or reach"] },
    { q: 'Why do Google Ads and Meta Ads cost so much in Mumbai?', a: ["Mumbai is consistently one of the most expensive ad markets in India, and understanding why helps set realistic expectations.", "CPCs run 30–50% above Tier 2 cities for the same keywords, driven by the sheer density of advertisers in finance, real estate, and ecommerce", "Agency fees typically range ₹25,000–₹1,00,000/month, excluding ad spend", "Higher costs make precise targeting even more critical — every wasted impression costs more here than anywhere else in India"] },
    { q: "I run ads already. Why isn't anything converting?", a: ["This is one of the most common frustrations we hear, and in almost every case, the ad itself isn't actually the problem.", "The landing page or checkout flow is usually where traffic is lost — slow load times, unclear offers, or confusing forms can undo even a perfectly targeted ad", "We audit the full funnel before touching your existing campaigns, looking at what happens after the click, not just the click", "Most failed campaigns have a fixable structural issue — wrong audience, wrong offer, wrong landing page — not a broken channel"] },
    { q: 'How fast will I see results?', a: ["How quickly you see results depends on how fast a campaign can gather enough data to be optimised properly.", "Initial data becomes visible within 7-14 days — early signals on click-through rate and cost per click", "Meaningful, optimised performance typically takes 30-90 days — the window where testing across creatives, audiences, and landing pages produces learnable patterns", "Mumbai's competitive market means the optimisation window matters more here than in less saturated cities"] },
    { q: 'Google Ads, Meta, LinkedIn — where should my budget actually go?', a: ["The right platform is whichever one your actual buyers are on when they're ready to make a decision.", "Google Search: best for buyers already researching and comparing options actively", "Meta Ads: works for ecommerce, D2C, retargeting, and awareness campaigns at scale", "LinkedIn: relevant when you're selling to businesses and need to reach by job title, industry, or company size"] },
    { q: "What's ROAS, and why should I care about it?", a: ["ROAS, or Return on Ad Spend, is the single clearest indicator of whether your advertising is actually working.", "It measures the revenue earned for every rupee spent on ads — a direct, unambiguous link between spend and outcome", "A ROAS below 1 means the campaign is losing money, regardless of how many clicks or impressions it's generating", "We report on ROAS first, every cycle, because it's the number that tells you whether to scale up or change direction"] },
    { q: 'My CPA keeps climbing. Can that be fixed?', a: ["A rising cost per acquisition almost always traces back to one of a few specific, identifiable causes.", "Targeting drift: the audience has broadened or saturated over time, making each click less qualified than it used to be", "Creative fatigue: the same ad has been shown to the same audience too many times, causing engagement and relevance scores to drop", "We diagnose the root cause first, then fix it with fresh targeting, new creative, or both — rather than just pausing spend"] },
    { q: "I don't have a huge budget. Can this still work?", a: ["Yes, a smaller budget changes the strategy, not whether the approach works.", "Tighter targeting becomes even more important on limited spend — every rupee needs to reach the right person", "We focus on the highest-converting audience and channel first, then expand as data confirms what's working", "Mumbai's higher ad costs mean precision matters more here than anywhere — which is exactly where good strategy earns its value"] },
  ],
};

export const bangaloreConfig: LandingConfig = {
  location: 'Bangalore',
  hero: {
    h1: { type: 'static', text: "Scaling Your Brand Shouldn't Be a Guessing Game" },
    sub: "As Bangalore's market crowds, traffic is a vanity metric. We build pipeline-first campaigns designed to capture and convert high-intent buyers, prioritizing revenue velocity over raw clicks.",
    formTitle: 'Book A Free 30-Min Consultation Call',
  },
  about: {
    h2: 'Performance Marketing Agency in Bangalore for SaaS & Tech Companies',
    sub: null,
    p1: "We don't settle for surface-level numbers. As an outcome-oriented performance marketing company in Bangalore, we design conversion funnels that directly impact your bottom line.",
    p2: "We don't guess where your budget goes. Every channel we deploy is backed by hard attribution data and engineered for pipeline efficiency. By matching dynamic creative hooks with high-intent buyer streams, we eliminate wasted ad spend, slash your CAC, and maximize ROI.",
  },
  services: {
    h2: 'Eliminating Friction to Drive Predictable Performance',
    cta: 'BUILD YOUR STRATEGY',
    paidSearchBody: 'Capture high-intent buyers at the exact moment they search for your solution. Working as your dedicated google ads agency in Bangalore, we deploy highly optimized bidding structures that systematically outperform competitors and turn raw search intent into reliable customer acquisition.',
  },
  whySub: 'Built as a digital performance marketing agency delivering measurable, scalable growth.',
  aeoDesc: "We're an AEO and GEO-ready performance marketing agency in Bangalore built for how people search now.",
  budgetOptions: ['Below Rs. 1,00,000', 'Rs. 1,00,000 - Rs. 5,00,000', 'Rs. 5,00,000 - Rs. 10,00,000', 'Above Rs. 10,00,000'],
  faqs: [
    { q: "What's included when I hire a performance marketing agency in Bangalore?", a: ["A performance marketing agency in Bangalore should manage the full funnel, not just run ads and leave the rest to you.", "Google Ads and Meta Ads, run as one strategy", "Landing page and funnel audits", "Weekly reporting tied to leads or sales, not just clicks"] },
    { q: 'Why is performance marketing so competitive in Bangalore specifically?', a: ["Bangalore captures more startup funding than any other Indian city, and that concentration drives intense competition for the same searches.", "SaaS, fintech, and AI/tech keywords are among the most contested in India", "Many companies are bidding for the same small pool of high-intent buyers", "We track cost per qualified lead, not just cost per click, to keep this honest"] },
    { q: 'What should I look for when hiring a performance marketing agency in Bangalore?', a: ["The agencies that actually drive pipelines look different from ones that just keep an ad account running.", "Ask whether they report on revenue or pipeline outcomes, not just impressions", "Ask if they've worked with SaaS or tech companies specifically, not just D2C", "Ask for proof of results in your category, not generic case studies"] },
    { q: 'How long until I see results from campaigns in Bangalore?', a: ["Timelines depend on your business type. SaaS and B2B cycles run longer than D2C.", "Initial data in 7-14 days", "Lead or conversion quality becomes clear by 30 days", "ROAS and pipeline impact are usually measurable by 60-90 days"] },
    { q: 'Which platforms work best for SaaS and tech companies in Bangalore?', a: ["The right mix depends on your buyer and deal size.", "LinkedIn Ads for targeting by job title and company size", "Google Search for buyers already comparing solutions", "Meta, used for retargeting and demand generation, not as the primary channel"] },
    { q: "What's ROAS, and why does it matter more than lead volume?", a: ["A high lead count means nothing if those leads never convert into paying customers.", "ROAS measures revenue earned per rupee spent on ads", "A campaign with 200 cheap leads can have worse ROAS than one with 20 qualified ones", "We report on ROAS and pipeline value, not just lead count, every cycle"] },
    { q: 'Do you work with SaaS, D2C, and ecommerce brands in Bangalore?', a: ["Yes, Bangalore's mix of SaaS, tech, and consumer brands means we run both, with different targeting logic for each.", "B2B/SaaS campaigns are built around job titles, company size, and buying intent", "D2C/ecommerce campaigns are built around audience interest and purchase behaviour", "We keep both strategies separate so neither dilutes the other's targeting data"] },
    { q: "I don't have a huge budget. Can this still work?", a: ["Yes, though a smaller budget changes how tightly we target, not whether it works.", "Tighter targeting matters more on limited spend, especially in a market this competitive", "We focus on the highest-converting channel and audience first", "Scaling follows evidence of what's converting, not a fixed minimum spend level"] },
  ],
};

export const hyderabadConfig: LandingConfig = {
  location: 'Hyderabad',
  hero: {
    h1: { type: 'animated', prefix: 'Turn Media Spend Into', strings: ['Market Share', 'Measurable Revenue', 'Predictable Growth'] },
    sub: "From audit to conversion, we handle the full funnel, not just the ad account. Built for the way Hyderabad businesses actually grow.",
    formTitle: 'Schedule a Call Today',
  },
  about: {
    h2: "Performance Marketing Built Around Hyderabad's Cost Advantage",
    sub: null,
    p1: "Too many brands bleed their ad budgets on loose targeting and vanity clicks that don't convert. As a dedicated performance marketing company in Hyderabad, we anchor our entire execution strategy to your actual revenue goals: lowering your customer acquisition costs (CAC), accelerating lead velocity, and maximizing net margins. We replace traditional agency guesswork with data-driven growth pipelines.",
    p2: "Our methodology balances rapid, systematic creative hook testing with advanced audience segmentation. By pairing server-side conversion tracking with deep-funnel data analysis, we eliminate ad fatigue, clear out fragmented data, and maximize your overall return on ad spend (ROAS) across every channel.",
  },
  services: {
    h2: 'How We Architect and Scale Your Full-Funnel Campaigns',
    cta: 'DESIGN YOUR STRATEGY',
    paidSearchBody: 'Capture high-intent buyers at the exact moment they search for your solution. Working as your dedicated google ads agency in Hyderabad, we deploy highly optimized bidding structures that systematically outperform competitors and turn raw search intent into reliable customer acquisition.',
  },
  whySub: 'Built as a digital performance marketing agency delivering measurable, scalable growth.',
  aeoDesc: "We're an AEO and GEO-ready performance marketing agency in Hyderabad built for how people search now.",
  budgetOptions: ['Below Rs. 1,00,000', 'Rs. 1,00,000 - Rs. 5,00,000', 'Rs. 5,00,000 - Rs. 10,00,000', 'Above Rs. 10,00,000'],
  faqs: [
    { q: "What's included when I hire a performance marketing agency in Hyderabad?", a: ["A performance marketing agency in Hyderabad should manage the full funnel, not just run ads and leave the rest to you.", "Google Ads and Meta Ads, run as one strategy", "Landing page and funnel audits", "Weekly reporting tied to leads or sales, not just clicks"] },
    { q: 'Is performance marketing cheaper in Hyderabad than in Bangalore or Mumbai?', a: ["Generally, yes. Hyderabad's overall cost base runs lower than India's other major tech hubs.", "Ad auction competition is typically less intense than Bangalore or Mumbai for comparable keywords", "Agency fees often run ₹25,000 - ₹1,00,000/month, similar structure to other metros but with more efficient ad spend", "This makes Hyderabad a strong market for scaling budget further, not just spending less"] },
    { q: 'What should I look for when hiring a performance marketing agency in Hyderabad?', a: ["The agencies that actually drive results look different from ones that just keep an ad account running.", "Ask whether they report on revenue outcomes, or just impressions and clicks", "Ask if they've worked with IT, pharma, or D2C clients specifically in this market", "Ask for proof of results, not generic case studies copied across cities"] },
    { q: 'How long until I see results?', a: ["Initial signals appear quickly, but real optimisation takes longer.", "Initial data in 7-14 days", "Conversion quality becomes clear by 30 days", "ROAS impact is usually measurable by 60-90 days"] },
    { q: 'Which platforms work best for Hyderabad businesses?', a: ["The right mix depends on what you're selling and who's buying.", "Google Search for buyers already researching a solution", "Meta Ads for D2C, ecommerce, and retargeting", "LinkedIn, where relevant, for IT and B2B targeting by job title and company"] },
    { q: "What's ROAS, and why does it matter more than lead volume?", a: ["A high lead count means nothing if it doesn't convert into revenue.", "ROAS measures revenue earned per rupee spent on ads", "A cheap, high-volume campaign can have worse ROAS than a smaller, targeted one", "We report on ROAS first, every cycle"] },
    { q: 'Do you work with ecommerce, D2C, and Shopify brands in Hyderabad?', a: ["Yes, we build full-funnel strategies tailored to product businesses.", "Campaigns built around traffic acquisition through to repeat purchase", "Conversion optimisation specific to ecommerce checkout flows", "Strategies that account for Hyderabad's lower-cost market relative to Mumbai or Bangalore"] },
    { q: "I don't have a huge budget. Can this still work?", a: ["Yes, and Hyderabad's market actually makes this easier than in pricier cities.", "Lower baseline ad costs mean budgets stretch further here", "Tighter targeting still matters most on limited spend", "Scaling follows evidence of what's converting, not a fixed minimum"] },
  ],
};

export const puneConfig: LandingConfig = {
  location: 'Pune',
  hero: {
    h1: { type: 'animated', prefix: 'Driving Growth That', strings: ['Delivers', 'Performs', 'Scales'] },
    sub: "Every strategy starts with understanding where your funnel is leaking. We fix that first, then build campaigns around precision targeting, the right platforms, and timing that matches how your buyers actually make decisions.",
    formTitle: 'Book A Free Account Performance Test',
  },
  about: {
    h2: 'Performance Marketing Agency in Pune That Actually Drives Business',
    sub: 'A performance marketing agency in Pune focused on delivering measurable growth through data-driven campaigns. We help Pune-based brands scale with Meta Ads, Google Ads, and full-funnel performance strategies.',
    p1: "Many regional brands burn their media spend on unoptimized targeting and vanity metrics that never convert into real cash flow. As a specialized performance marketing company in Pune, we focus entirely on business fundamentals: lowering customer acquisition costs (CAC), accelerating lead velocity, and protecting net margins. We turn complex cross-channel ad distribution into highly profitable growth loops, serving as a trusted performance marketing agency partner that brands deploy to capture clear market share.",
    p2: "Our methodology relies on rigorous, data-driven creative hook testing and clean first-party data capture. By matching server-side attribution with deep market segment analysis, we remove ad fatigue, clean up fragmented reporting numbers, and maximize your actual return on ad spend (ROAS) across every active marketing funnel.",
  },
  services: {
    h2: 'Where We Deploy and Scale Your Media Spend',
    cta: 'DESIGN YOUR STRATEGY',
    paidSearchBody: 'Capture high-intent buyers at the exact moment they search for your solution. Working as your dedicated google ads agency in Pune, we deploy highly optimized bidding structures that systematically outperform competitors and turn raw search intent into reliable customer acquisition.',
  },
  whySub: 'Built as a digital performance marketing agency delivering measurable, scalable growth.',
  aeoDesc: "We're an AEO and GEO-ready performance marketing agency in Pune built for how people search now.",
  budgetOptions: ['Below Rs. 2,50,000', 'Rs. 2,50,000 - Rs. 5,00,000', 'Rs. 7,50,000 - Rs. 15,00,000', 'Above Rs. 15,00,000'],
  faqs: [
    { q: 'What does a performance marketing agency in Pune do?', a: ["A performance marketing agency in Pune manages your entire growth funnel — from the first ad impression to the final conversion.", "Google Ads and Meta Ads planned and run as one connected strategy", "Landing page and funnel audits to fix where you're losing potential customers", "Weekly reporting tied directly to leads, sales, and revenue — not vanity metrics like reach or impressions"] },
    { q: 'How much does performance marketing cost in Pune?', a: ["It depends on your industry, how competitive your keywords are, and what you're putting into ad spend.", "Most businesses start from ₹25,000 - ₹1,00,000/month as an agency retainer, separate from your ad budget", "Your ad spend is on top of that. The retainer covers strategy, execution, and optimisation", "Businesses with tighter budgets can still see results; it just means tighter targeting and slower scaling"] },
    { q: 'Which is the best performance marketing agency in Pune?', a: ["The best one is the agency that ties every decision back to your revenue, not the one with the biggest client logo wall.", "Ask whether they report on business outcomes or just platform metrics", "Ask if they've worked in your specific industry or business model", "Ask for real proof of results, not generic case studies or award nominations"] },
    { q: 'How long until I see results from performance marketing?', a: ["You'll get early signals quickly, but real optimisation takes time.", "First 7-14 days: initial data starts coming in — what's getting clicks, what isn't", "By 30 days: conversion quality becomes clearer and targeting can be refined", "60-90 days: ROAS impact becomes measurable and scaling decisions can be made confidently"] },
    { q: 'What platforms work best for Pune businesses?', a: ["The right mix depends entirely on what you're selling and who's buying it.", "Google Search: best for buyers who are already researching and have intent", "Meta Ads: works well for ecommerce, D2C, and retargeting campaigns", "LinkedIn: relevant for B2B businesses targeting by job role, seniority, or company size"] },
    { q: 'What is ROAS and why does it matter more than lead volume?', a: ["Return on Ad Spend tells you how much revenue you generated for every rupee spent on ads.", "Lead volume tells you almost nothing on its own — leads that don't convert are just wasted spend", "A campaign with 20 paying customers is better than one with 200 unqualified leads", "We report on ROAS first, every cycle, because it's the number that actually reflects business performance"] },
    { q: 'How do you reduce cost per acquisition (CPA)?', a: ["CPA comes down through three things: sharper targeting, stronger landing pages, and moving budget away from what isn't working.", "Tighter audience segmentation means your ads reach people more likely to convert", "Landing page optimisation means more of the people who click actually take action", "Ongoing budget reallocation means you're always putting money behind what's converting, not what looked good last month"] },
    { q: 'Is performance marketing better than traditional marketing?', a: ["Yes, consistently for businesses that need to track exactly where their money is going and what it's producing.", "Every rupee is tracked back to a specific outcome", "Campaigns can be adjusted in real time, not after a quarterly review", "You scale what works and cut what doesn't — that flexibility doesn't exist in traditional marketing"] },
    { q: 'Do you work with ecommerce and D2C brands in Pune?', a: ["Yes. Ecommerce and D2C brands need a different approach than service businesses.", "Full-funnel campaigns from top-of-funnel awareness through to checkout conversion", "Retargeting flows that bring back high-intent visitors who didn't convert the first time", "Strategies built around AOV, repeat purchase rate, and LTV — not just one-time conversion"] },
    { q: 'Do you work with Google Ads and PPC in Pune?', a: ["Yes, Google Ads and PPC campaigns are a core part of what we do, not an add-on.", "Full campaign setup, keyword strategy, and bid management", "Targeting calibrated to what Pune's market actually searches for", "Continuous optimisation based on what's converting, not what looks good on a dashboard"] },
  ],
};
