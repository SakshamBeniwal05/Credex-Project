const model_data = [
  {
    "id": 1,
    "product": "Cursor",
    "category": "AI Code Editor",
    "website": "cursor.com",
    "image": "https://www.freelogovectors.net/wp-content/uploads/2025/06/cursor-logo-icon-freelogovectors.net_.png",
    "plans": [
      { "name": "Hobby", "price_monthly": 0, "price_annual": null, "notes": "Limited Agent requests & Tab completions. 1-week Pro trial on signup." },
      { "name": "Pro", "price_monthly": 20, "price_annual": 16, "notes": "$20 monthly credit pool. Frontier models, MCPs, cloud agents, unlimited Tab completions." },
      { "name": "Pro+", "price_monthly": 60, "price_annual": 48, "notes": "3x usage credits ($60 pool). Everything in Pro." },
      { "name": "Ultra", "price_monthly": 200, "price_annual": 160, "notes": "20x usage credits ($400 pool). Priority access to new features." },
      { "name": "Teams", "price_monthly": 40, "price_annual": 32, "notes": "Per user/month. Shared chats, SSO, centralized billing, usage analytics." },
      { "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. Pooled usage, invoice billing, dedicated support." }
    ]
  },
  {
    "id": 2,
    "product": "GitHub Copilot",
    "category": "AI Code Assistant",
    "website": "github.com/features/copilot",
    "image": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-copilot-icon.png",
    "plans": [
      { "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Limited completions & chat. No credit card required." },
      { "name": "Pro", "price_monthly": 10, "price_annual": null, "notes": "$10 monthly AI credits. Unlimited completions, premium model access, cloud agent." },
      { "name": "Pro+", "price_monthly": 39, "price_annual": null, "notes": "$39 monthly AI credits. Full model access including Claude Opus & o3. All Pro features." },
      { "name": "Business", "price_monthly": 19, "price_annual": null, "notes": "Per user/month. $19 AI credits pooled org-wide. SSO, IP indemnity, policy controls." },
      { "name": "Enterprise", "price_monthly": 39, "price_annual": null, "notes": "Per user/month (requires GitHub Enterprise Cloud). Custom models, knowledge base indexing, fine-tuning." }
    ]
  },
  {
    "id": 3,
    "product": "Claude",
    "category": "AI Assistant",
    "website": "claude.ai",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/3840px-Claude_AI_symbol.svg.png",
    "plans": [
      { "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Daily message caps. Access to Claude Sonnet." },
      { "name": "Pro", "price_monthly": 20, "price_annual": null, "notes": "5x more usage than Free. Claude Opus access. Claude Code CLI included." },
      { "name": "Max 5x", "price_monthly": 100, "price_annual": null, "notes": "5x more usage than Pro. Full model access including Opus." },
      { "name": "Max 20x", "price_monthly": 200, "price_annual": null, "notes": "20x more usage than Pro. Highest usage limits." },
      { "name": "Team", "price_monthly": 25, "price_annual": null, "notes": "Per seat/month. Shared projects, admin controls." },
      { "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. 500K context, SSO/SCIM, HIPAA compliance." }
    ]
  },
  {
    "id": 4,
    "product": "Anthropic API",
    "category": "AI API",
    "website": "anthropic.com",
    "image": "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/anthropic-icon-wii9u8ifrjrd99btrqfgi.png/anthropic-icon-tdvkiqisswbrmtkiygb0ia.png?_a=DATAiZAAZAA0",
    "plans": [
      { "name": "Haiku 4.5", "price_monthly": null, "input_per_1M": 1.0, "output_per_1M": 5.0, "notes": "Fastest, most compact model. Best for simple tasks." },
      { "name": "Sonnet 4.6", "price_monthly": null, "input_per_1M": 3.0, "output_per_1M": 15.0, "notes": "Best balance of speed and intelligence." },
      { "name": "Opus 4.6", "price_monthly": null, "input_per_1M": 5.0, "output_per_1M": 25.0, "notes": "Most powerful model for complex tasks." }
    ]
  },
  {
    "id": 5,
    "product": "ChatGPT",
    "category": "AI Assistant",
    "website": "chatgpt.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png",
    "plans": [
      { "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "GPT-5.3 access with ads (US). Limited usage." },
      { "name": "Go", "price_monthly": 8, "price_annual": null, "notes": "Ad-supported. International users. Basic GPT access." },
      { "name": "Plus", "price_monthly": 20, "price_annual": null, "notes": "No ads. GPT-5.4 access. 40 messages/3hrs on flagship model." },
      { "name": "Pro", "price_monthly": 100, "price_annual": null, "notes": "5x usage vs Plus. Direct response to Claude Max 5x." },
      { "name": "Team", "price_monthly": 30, "price_annual": 25, "notes": "Per user/month. Shared workspace, admin controls, higher limits." },
      { "name": "Enterprise", "price_monthly": null, "price_annual": null, "notes": "Custom pricing. Advanced security, compliance, unlimited usage." }
    ]
  },
  {
    "id": 6,
    "product": "OpenAI API",
    "category": "AI API",
    "website": "openai.com",
    "image": "https://www.logo.wine/a/logo/OpenAI/OpenAI-Logo.wine.svg",
    "plans": [
      { "name": "GPT-5.4 Nano", "price_monthly": null, "input_per_1M": 0.2, "output_per_1M": 0.8, "notes": "Cheapest proprietary model. Great for high-volume simple tasks." },
      { "name": "GPT-5.4 Mini", "price_monthly": null, "input_per_1M": 0.75, "output_per_1M": 3.0, "notes": "Best mid-tier value. Cheaper than Claude Haiku on input." },
      { "name": "GPT-5.4", "price_monthly": null, "input_per_1M": 5.0, "output_per_1M": 20.0, "notes": "Flagship model. Full reasoning capabilities." },
      { "name": "GPT-5.4 Pro", "price_monthly": null, "input_per_1M": 21.0, "output_per_1M": 168.0, "notes": "Extended thinking / premium reasoning model." },
      { "name": "Batch API", "price_monthly": null, "input_per_1M": null, "output_per_1M": null, "notes": "50% discount on all models. 24hr async processing." }
    ]
  },
  {
    "id": 7,
    "product": "Gemini",
    "category": "AI Assistant + API",
    "website": "gemini.google.com",
    "image": "https://custom.typingmind.com/assets/landing-page/gemini_logo.png",
    "plans": [
      { "name": "Free", "price_monthly": 0, "price_annual": null, "notes": "Gemini 3 Flash access. Deep Research, Gemini Live, 100 video credits/month." },
      { "name": "Google AI Plus", "price_monthly": 7.99, "price_annual": null, "notes": "Entry paid tier. Launched Jan 2026 globally." },
      { "name": "Google AI Pro", "price_monthly": 19.99, "price_annual": null, "notes": "Gemini 3.1 Pro, 1M context, 2TB storage, Deep Research, Gmail/Docs integration." },
      { "name": "Google AI Ultra", "price_monthly": 249.99, "price_annual": null, "notes": "30TB storage, Deep Think, Veo 3.1 video gen, Project Mariner, all experimental features." },
      { "name": "API Flash", "price_monthly": null, "input_per_1M": 0.1, "output_per_1M": 0.4, "notes": "Gemini 3 Flash. Fastest and cheapest API option." },
      { "name": "API Pro", "price_monthly": null, "input_per_1M": 2.0, "output_per_1M": 12.0, "notes": "Gemini 3.1 Pro. Up to 200K context at standard pricing." }
    ]
  }
];

export default model_data;