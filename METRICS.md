# Metrics & Instrumentation

## North Star Metric

**Primary North Star:** `Monthly Credit Audits Completed`

**Why This One:**
- Audit completion = user engagement + product value realization
- Direct correlation to revenue (each audit = $0.50-$5.00 potential value)
- Precedes all downstream actions (consultation booking, credit purchase)
- Can measure instantly (unlike churn or LTV which take months)
- If this metric grows 30%+ month-over-month, the product-market fit exists

**Target Trajectory:**
- Month 1: 100 audits completed
- Month 2: 180 audits (80% growth)
- Month 3: 320 audits (78% growth)
- Month 6: 2,500 audits (~50% monthly growth by this point)

---

## 3 Input Metrics Driving the North Star

### 1. **Audit Initiation Rate** (Conversion: visitor → starts audit)
- **Why it matters:** If people don't *start* the audit, completion is impossible
- **Target:** 15% of landing page visitors start an audit
- **How to measure:** Google Analytics: `landing_page_views` → `audit_page_loaded`
- **Action:** If dropping below 12%, test headline + hero CTA copy
- **Current state:** [To be measured week 1]

---

### 2. **Audit Completion Rate** (Conversion: starts → finishes)
- **Why it matters:** Abandonment mid-audit is a product quality problem
- **Target:** 70% of started audits get completed (allow 30% drop-offs from scope creep/indecision)
- **How to measure:** App event: `audit_started` → `audit_completed` (track step-by-step dropoff)
- **Action:** If <60%, UX friction is high — analyze where people bail (data entry? results page?)
- **Current state:** [To be measured week 1]

---

### 3. **Consultation Booking Rate** (Conversion: audit completed → books call with Credex)
- **Why it matters:** This is the revenue inflection point (audit → meeting → credit line)
- **Target:** 25% of audit completers book a consultation within 48 hours of seeing results
- **How to measure:** In-app CTA: `book_consultation_clicked` / `audit_completed`
- **Action:** If <15%, your results page isn't compelling; A/B test CTA copy + social proof placement
- **Current state:** [To be measured week 1]

---

## Instrumentation Roadmap (Priority Order)

### Week 1-2: MVP Metrics (Non-negotiable)

**Event 1: Audit Funnel**
```
- audit.initiated (user starts audit)
  → Fields: user_id, source (organic/ads/referral), loan_type
- audit.step_1_completed (applicant info filled)
  → Timestamp, time_spent
- audit.step_2_completed (financial data filled)
  → Fields: data_quality_score, time_spent
- audit.result_shown (risk score shown to user)
  → Fields: risk_score, risk_tier (low/medium/high)
- audit.completed (user views full results)
  → Time to completion, engagement signals
```

**Event 2: Consultation Funnel**
```
- consultation.cta_clicked (user clicks "Book Consultation")
  → Fields: source_location (hero/results_page/email), time_after_audit_completion
- consultation.form_started (email/phone entry started)
- consultation.form_submitted (form completed)
  → Time to form completion
- consultation.scheduled (user calendly/Calendly link clicked)
```

**Event 3: User Engagement**
```
- audit.result_downloaded (user saves PDF/CSV of results)
- audit.shared (user shares results with team)
  → Indicates org-level adoption potential
- user.return_visit (user comes back for 2nd+ audit)
  → Retention signal
```

---

### Week 3-4: Secondary Metrics (High Priority)

**Cohort Analysis:**
- Audit completion rate by cohort (users acquired via LinkedIn vs Discord vs Indie Hackers)
- Consultation booking rate by acquisition source
- Which channel drives highest-quality users? (repeat audits, longer engagement)

**Unit Economics Tracking:**
```
- cost_per_audit_started (paid channels only, initially $0)
- cost_per_audit_completed 
- cost_per_consultation_booked
- revenue_per_consultation_booked (once we have credit purchase data)
```

**Product Quality Metrics:**
```
- average_risk_score (is our algorithm giving diverse outputs or clustering?)
- audit_result_disputed_ratio (what % of Credex consultations challenge the audit score?)
  → If >20%, algorithm accuracy issue
- time_to_audit_completion (should be 3-8 minutes; if >15 min, UX friction)
```

---

### Month 2+: Advanced Metrics (Optimization Phase)

**Retention & Repeat Usage:**
```
- day_7_return_rate (% of users who return for 2nd audit within 7 days)
  → B2B benchmarks: 35-50% is healthy
- month_1_retention (users active in month 2)
  → Benchmarks: 40-60% is acceptable; >70% is excellent
- power_user_ratio (users completing 5+ audits/month)
  → Indicates strong product-market fit
```

**NPS & Qualitative:**
```
- post_audit_nps_survey (1-10: "Would you recommend this to credit teams?")
  → Target NPS: >40 (b2b benchmark >30 is good)
- audit_result_confidence (did the score help you make a better decision?)
- feature_request_volume (what features do users ask for most?)
```

---

## Pivot Triggers (When to Change Direction)

### 🚨 RED FLAGS — Pivot If:

**1. Audit Completion Rate < 45%** (target 70%)
- Signal: Product UX is broken; users don't understand how to input data
- Action: 1-week UX overhaul; simplify data inputs by 50%

**2. Consultation Booking Rate < 10%** (target 25%)
- Signal: Audit results aren't convincing enough to drive consultation bookings
- Action: Redesign results presentation; add customer testimonials; A/B test 3 result formats

**3. Month-over-Month Audit Growth < 15%** (target 50%+)
- Signal: No viral coefficient; word-of-mouth isn't working
- Action: Consider paid acquisition channels; pivot to embedded partnership (Credex platform distribution)

**4. Day-7 Return Rate < 15%** (target 35%+)
- Signal: One-time tool; no repeat engagement; product doesn't solve recurring problem
- Action: Either pivot to consultation/advisory model OR restructure tool for team workflows (not individual audits)

**5. NPS < 20 or "Audit Result Confidence" < 60%**
- Signal: Algorithm accuracy or positioning is wrong; users don't trust the score
- Action: Review 10 disputed audits; retrain algorithm; consider pivot to "decision assistant" (not "risk predictor")

---

## Conversion Funnel Monitoring Dashboard

Track this weekly:

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Target | Status |
|--------|--------|--------|--------|--------|--------|--------|
| Visitors | — | — | — | — | 500 | — |
| Audit Initiated | — | — | — | — | 75 (15%) | — |
| Audit Completed | — | — | — | — | 53 (70% of initiated) | — |
| Consultation Booked | — | — | — | — | 13 (25% of completed) | — |
| Consultation Held | — | — | — | — | 11 (85% of booked) | — |
| Credit Line Purchased | — | — | — | — | 5 (45% of consulted) | — |

---

## First Win Metrics

**Week 1 Success = :**
- ✓ 50+ audits started
- ✓ 35+ audits completed  
- ✓ 5+ consultation bookings
- ✓ Data shows where users are dropping off

**Month 1 Success = :**
- ✓ 500+ total audits  
- ✓ 70%+ completion rate  
- ✓ 15%+ consultation booking rate  
- ✓ NPS > 30  
- ✓ 2-3 credit lines purchased through Credex  

**Month 3 Success = :**
- ✓ 1,500+ monthly audits  
- ✓ 25%+ consultation booking  
- ✓ 30-40 credit lines/month  
- ✓ 3+ paying customers (or partnership deals)

---

## Instrumentation Tools

- **Analytics:** Google Analytics 4 (free tier) + custom event tracking
- **Session Recording:** Hotjar or Fullstory (capture where users drop off in audit flow)
- **A/B Testing:** Optimizely or VWO (test CTA copy, result presentation)
- **Surveys:** Typeform or Google Forms (post-audit NPS + feature requests)
