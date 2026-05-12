# Unit Economics

## Credex Audit Tool — Economics Model

### Converted Lead Value (to Credex)

**Definition:** A user completes an audit → books Credex credit consultation → purchases credit line

**Assumptions:**
- Average credit line size through Credex: $50,000
- Credex revenue per $1 loan: 2-4% annual fees + transaction fees = ~$1,500 ARR per customer
- Gross margin on credit business: 60-70%
- **LTV (Lifetime Value of converted user):** $1,500 × 70% margin × 3-year retention = **$3,150**

**More conservative:** If only 30% of audit completers → consultation → credit purchase:
- LTV = $1,500 × 30% conversion × $3,150 = **$1,417**

**Our assumption: $2,500 per converted audit user** (middle ground)

---

### Channel CAC (Customer Acquisition Cost)

| Channel | Cost/1000 Impressions | Expected Conversion | CAC |
|---------|----------------------|-------------------|-----|
| **Cold Outreach (LinkedIn/Email)** | $0 (organic) | 2% → 0.5% → 10% consult | $0 (time only) |
| **Fintech Communities (Discord)** | $0 (content cost) | 5% → 1% → 15% consult | $0 → $50 (mod time) |
| **Product Hunt Featured** | $0 (paid placement TBD) | 3% → 0.8% → 12% consult | $0 |
| **Indie Hackers** | $0 | 4% → 0.6% → 18% consult | $0 |
| **Paid LinkedIn (if scaling)** | $40 per 1000 | 1.2% → 0.08% → 20% consult | **$48/lead** |
| **Google Search (SEM) - later** | $60 per 1000 | 0.5% → 0.03% → 25% consult | **$73/lead** |

**Effective CAC blend (first 100 users at $0 budget):** ~$0 (sweat equity)

---

### Conversion Funnel: Audit → Consultation → Credit Purchase

**Conservative funnel:**
```
100 people complete free audit
  → 20% book consultation (20 people)
    → 40% approve for credit (8 people)
      → $2,500 LTV = $20,000 total value
```

**Aggressive funnel (with good copy):**
```
100 people complete free audit
  → 35% book consultation (35 people)
    → 60% approve for credit (21 people)
      → $2,500 LTV = $52,500 total value
```

**Required conversion for profitability:**
- If CAC = $0 (launch phase): any conversion > 0% is profitable
- If CAC scales to $50/user: need 2%+ conversion (50 → 1 customer) to break even
- **Breakeven CAC:** $2,500 LTV ÷ 100 audits = **$25 CAC sustainable**

---

### Path to $1M ARR in 18 Months

**Scenario: Credex embeds audit tool in platform**

| Metric | Month 6 | Month 12 | Month 18 |
|--------|---------|----------|----------|
| Monthly Audits Completed | 500 | 2,500 | 6,000 |
| Consultation Booking Rate | 20% | 25% | 30% |
| Monthly Consultations | 100 | 625 | 1,800 |
| Credit Line Approval % | 35% | 45% | 50% |
| New Credit Lines/Month | 35 | 281 | 900 |
| New Revenue/Month (@ $1.5k/year each) | $4,375 | $35,125 | $112,500 |
| **Annualized Revenue (run rate)** | **$52,500** | **$421,500** | **$1,350,000** |

**What has to be true:**
1. Credex maintains/grows user base to 500+ monthly active credit decision-makers
2. Audit completion rate stays ≥40% (of audit page visits)
3. Consultation booking rate reaches 25%+ (via email + in-app CTA)
4. Credit approval rate ≥40% (product quality + market fit)
5. No strong competitive entry in audit space (next 12 months)
6. Credex's existing churn stays <5% monthly

---

### Sensitivity Analysis: What Breaks the Model?

**Downside scenario (20% of units complete audit, 10% book consultation, 20% approve):**
- Month 18: 1,200 new lines = $180k ARR (miss $1M target by 82%)
- **Action:** Pivot to B2B SaaS model (charge fintech platforms directly)

**Upside scenario (60% audit completion, 40% consultation, 60% approval):**
- Month 18: 2,160 new lines = $3.2M ARR (exceed target)
- **Action:** Expand to credit underwriting suite; hire sales team

---

### Gross Margin & Profitability

**Assuming $100k/year engineering + $50k/year ops to run tool:**

| Month 18 Revenue | Variable Cost | Fixed Cost | Gross Profit |
|-----------------|---------------|-----------|--------------|
| $112,500 | $8,400 (7.5% data) | $12,500 | **$91,600/mo** |

**Unit Econ: $91,600 ÷ 900 new lines = $102 profit per credit line sent to Credex**

✓ Highly profitable if embedded in Credex platform

---

### Key Risks & Levers

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Consultation booking rate < 15% | Revenue cut by 60% | A/B test CTA copy; improve audit UX |
| Credit approval rate < 25% | Revenue cut by 50% | Refine audit algorithm; better targeting |
| Fintech enters market with better tool | User churn +3% | Build defensibility: integrate w/ Credex underwriting |

---

**Bottom line:** At $2,500 LTV + 25% consultation booking + 45% approval rate, $1M ARR in 18 months is achievable with embedded distribution.
