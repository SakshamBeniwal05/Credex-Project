const model_data = [
  {
    "id": 1,
    "product": "Cursor",
    "category": "AI Code Editor",
    "website": "cursor.com",
    "image": "https://www.freelogovectors.net/wp-content/uploads/2025/06/cursor-logo-icon-freelogovectors.net_.png",
    "plans": [
      { "id": "cur-01", "name": "Hobby", "price_monthly": 0, "price_annual": null, "notes": "Limited Agent requests & Tab completions. 1-week Pro trial on signup." },
      { "id": "cur-02", "name": "Pro", "price_monthly": 20, "price_annual": 16, "notes": "$20 monthly credit pool. Frontier models, MCPs, cloud agents, unlimited Tab completions." },
      { "id": "cur-03", "name": "Pro+", "price_monthly": 60, "price_annual": 48, "notes": "3x usage credits ($60 pool). Everything in Pro." },
      { "id": "cur-04", "name": "Ultra", "price_monthly": 200, "price_annual": 160, "notes": "20x usage credits ($400 pool). Priority access to new features." },
      { "id": "cur-05", "name": "Teams", "price_monthly": 40, "price_annual": 32, "notes": "Per user/month. Shared chats, SSO, centralized billing, usage analytics." },
      { "id": "cur-06", "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. Pooled usage, invoice billing, dedicated support." }
    ]
  },
  {
    "id": 2,
    "product": "GitHub Copilot",
    "category": "AI Code Assistant",
    "website": "github.com/features/copilot",
    "image": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-copilot-icon.png",
    "plans": [
      { "id": "ghc-01", "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Limited completions & chat. No credit card required." },
      { "id": "ghc-02", "name": "Pro", "price_monthly": 10, "price_annual": null, "notes": "$10 monthly AI credits. Unlimited completions, premium model access, cloud agent." },
      { "id": "ghc-03", "name": "Pro+", "price_monthly": 39, "price_annual": null, "notes": "$39 monthly AI credits. Full model access including Claude Opus & o3. All Pro features." },
      { "id": "ghc-04", "name": "Business", "price_monthly": 19, "price_annual": null, "notes": "Per user/month. $19 AI credits pooled org-wide. SSO, IP indemnity, policy controls." },
      { "id": "ghc-05", "name": "Enterprise", "price_monthly": 39, "price_annual": null, "notes": "Per user/month (requires GitHub Enterprise Cloud). Custom models, knowledge base indexing, fine-tuning." }
    ]
  },
  {
    "id": 3,
    "product": "Claude",
    "category": "AI Assistant",
    "website": "claude.ai",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/3840px-Claude_AI_symbol.svg.png",
    "plans": [
      { "id": "cld-01", "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Daily message caps. Access to Claude Sonnet." },
      { "id": "cld-02", "name": "Pro", "price_monthly": 20, "price_annual": null, "notes": "5x more usage than Free. Claude Opus access. Claude Code CLI included." },
      { "id": "cld-03", "name": "Max 5x", "price_monthly": 100, "price_annual": null, "notes": "5x more usage than Pro. Full model access including Opus." },
      { "id": "cld-04", "name": "Max 20x", "price_monthly": 200, "price_annual": null, "notes": "20x more usage than Pro. Highest usage limits." },
      { "id": "cld-05", "name": "Team", "price_monthly": 25, "price_annual": null, "notes": "Per seat/month. Shared projects, admin controls." },
      { "id": "cld-06", "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. 500K context, SSO/SCIM, HIPAA compliance." }
    ]
  },
  {
    "id": 4,
    "product": "Anthropic API",
    "category": "AI API",
    "website": "anthropic.com",
    "image": "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/anthropic-icon-wii9u8ifrjrd99btrqfgi.png/anthropic-icon-tdvkiqisswbrmtkiygb0ia.png?_a=DATAiZAAZAA0",
    "plans": [
      { "id": "ana-01", "name": "Haiku 4.5", "price_monthly": null, "input_per_1M": 1.0, "output_per_1M": 5.0, "notes": "Fastest, most compact model. Best for simple tasks." },
      { "id": "ana-02", "name": "Sonnet 4.6", "price_monthly": null, "input_per_1M": 3.0, "output_per_1M": 15.0, "notes": "Best balance of speed and intelligence." },
      { "id": "ana-03", "name": "Opus 4.6", "price_monthly": null, "input_per_1M": 5.0, "output_per_1M": 25.0, "notes": "Most powerful model for complex tasks." }
    ]
  },
  {
    "id": 5,
    "product": "ChatGPT",
    "category": "AI Assistant",
    "website": "chatgpt.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png",
    "plans": [
      { "id": "gpt-01", "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "GPT-5.3 access with ads (US). Limited usage." },
      { "id": "gpt-02", "name": "Go", "price_monthly": 8, "price_annual": null, "notes": "Ad-supported. International users. Basic GPT access." },
      { "id": "gpt-03", "name": "Plus", "price_monthly": 20, "price_annual": null, "notes": "No ads. GPT-5.4 access. 40 messages/3hrs on flagship model." },
      { "id": "gpt-04", "name": "Pro", "price_monthly": 100, "price_annual": null, "notes": "5x usage vs Plus. Direct response to Claude Max 5x." },
      { "id": "gpt-05", "name": "Team", "price_monthly": 30, "price_annual": 25, "notes": "Per user/month. Shared workspace, admin controls, higher limits." },
      { "id": "gpt-06", "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. Advanced security, compliance, unlimited usage." }
    ]
  },
  {
    "id": 6,
    "product": "OpenAI API",
    "category": "AI API",
    "website": "openai.com",
    "image": "https://www.logo.wine/a/logo/OpenAI/OpenAI-Logo.wine.svg",
    "plans": [
      { "id": "oaa-01", "name": "GPT-5.4 Nano", "price_monthly": null, "input_per_1M": 0.2, "output_per_1M": 0.8, "notes": "Cheapest proprietary model. Great for high-volume simple tasks." },
      { "id": "oaa-02", "name": "GPT-5.4 Mini", "price_monthly": null, "input_per_1M": 0.75, "output_per_1M": 3.0, "notes": "Best mid-tier value. Cheaper than Claude Haiku on input." },
      { "id": "oaa-03", "name": "GPT-5.4", "price_monthly": null, "input_per_1M": 5.0, "output_per_1M": 20.0, "notes": "Flagship model. Full reasoning capabilities." },
      { "id": "oaa-04", "name": "GPT-5.4 Pro", "price_monthly": null, "input_per_1M": 21.0, "output_per_1M": 168.0, "notes": "Extended thinking / premium reasoning model." },
      { "id": "oaa-05", "name": "Batch API", "price_monthly": null, "input_per_1M": null, "output_per_1M": null, "notes": "50% discount on all models. 24hr async processing." }
    ]
  },
  {
    "id": 7,
    "product": "Gemini",
    "category": "AI Assistant + API",
    "website": "gemini.google.com",
    "image": "https://custom.typingmind.com/assets/landing-page/gemini_logo.png",
    "plans": [
      { "id": "gem-01", "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Gemini 3 Flash access. Deep Research, Gemini Live, 100 video credits/month." },
      { "id": "gem-02", "name": "Google AI Plus", "price_monthly": 7.99, "price_annual": null, "notes": "Entry paid tier. Launched Jan 2026 globally." },
      { "id": "gem-03", "name": "Google AI Pro", "price_monthly": 19.99, "price_annual": null, "notes": "Gemini 3.1 Pro, 1M context, 2TB storage, Deep Research, Gmail/Docs integration." },
      { "id": "gem-04", "name": "Google AI Ultra", "price_monthly": 249.99, "price_annual": null, "notes": "30TB storage, Deep Think, Veo 3.1 video gen, Project Mariner, all experimental features." },
      { "id": "gem-05", "name": "API Flash", "price_monthly": null, "input_per_1M": 0.1, "output_per_1M": 0.4, "notes": "Gemini 3 Flash. Fastest and cheapest API option." },
      { "id": "gem-06", "name": "API Pro", "price_monthly": null, "input_per_1M": 2.0, "output_per_1M": 12.0, "notes": "Gemini 3.1 Pro. Up to 200K context at standard pricing." }
    ]
  }
];

export default model_data;