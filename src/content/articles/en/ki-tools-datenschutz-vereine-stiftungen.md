---
title: "AI tools and the FADP in associations and foundations"
description: "Swiss data protection law applies to ChatGPT, Copilot & co. with no nonprofit exemption. What boards need to settle — with a checklist."
question: "May associations and foundations use AI tools with personal data?"
datePublished: "2026-09-16"
tags: [Data protection, FADP, Nonprofit]
---

Yes — but not with every account and not with all data. The revised Federal Act on Data Protection ([FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de), in German «DSG», often called «nDSG») has applied since September 2023 to all private persons, and thus to associations (Vereine) and foundations — there is no exemption for small or nonprofit organisations. The Federal Data Protection and Information Commissioner (FDPIC) states that the Act applies directly to AI-supported data processing. Anyone who enters member, donor or client data into ChatGPT, Copilot or Gemini remains responsible for it. Three questions decide the matter: which account is used, which data go in, and where do they go?

## The key points at a glance

- **No nonprofit exemption.** The FADP covers every processing of personal data by private persons ([Art. 2 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_2)) — even in the smallest association, and with AI too.
- **In an association, the board is responsible.** Penalties do not hit the organisation but the responsible natural persons ([FDPIC: data protection in associations](https://www.edoeb.admin.ch/de/datenschutz-in-vereinen)).
- **Private accounts are the main risk.** Using an AI tool for personal data means engaging a processor, and the organisation must satisfy itself that the processor guarantees data security ([Art. 9 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_9)). Intentional breaches carry fines of up to CHF 250,000 ([Art. 61 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_61)).
- **Health and social data demand more.** They are sensitive personal data; if they are processed on a large scale, a data protection impact assessment is required — regardless of the organisation's size.
- **Switzerland does not yet have an AI act.** Today, the FADP is the framework that counts.

## The FADP applies to the smallest association too

Associations and foundations are legal entities under private law and therefore «private persons» within the meaning of the Act. The exemption for purely personal use applies only to natural persons. The FDPIC has repeatedly confirmed that AI changes nothing here, most recently in its [update of 8 May 2025](https://www.edoeb.admin.ch/de/update-geltendes-datenschutzgesetz-ist-auf-ki-direkt-anwendbar): the FADP is worded in a technology-neutral way and is therefore directly applicable to AI-supported data processing as well. The duties expressly extend to the «users» (Verwender) of AI systems — that is, the organisation deploying a tool, not just its manufacturer.

Conversely: as long as an AI tool only processes factual information with no link to individuals — a concept, a funding application without names, a translation of a general text — data protection is not engaged. The FDPIC therefore recommends removing personal data before input, while warning that AI may be able to re-identify pseudonymised data ([FDPIC: AI in everyday life](https://www.edoeb.admin.ch/de/ki-im-alltag)).

In an association, the board is responsible: the FDPIC states that compliance with data protection rules lies with the board. For foundations, the same applies by analogy to the foundation board as the supreme body. The FADP's criminal provisions target natural persons, require intent and are, as a rule, prosecuted only upon complaint — which is no free pass, because responsibility for the organisation remains.

## Private accounts are the real risk

When an organisation uses a provider's AI tool for personal data, it transfers the processing to a processor. That is permitted if the data are processed only in the way the organisation itself would be allowed to, and if it satisfies itself that the provider guarantees data security ([Art. 9 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_9)). Anyone who disregards this intentionally risks a fine of up to CHF 250,000 under [Art. 61(b) FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_61).

This is exactly where private and business accounts differ (as at September 2026):

- **ChatGPT:** In private accounts (Free, Plus, Pro), OpenAI may use inputs for model training by default unless the user opts out ([OpenAI](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)). In ChatGPT Business, Enterprise and the API this is not the default, and OpenAI offers a data processing addendum for them ([OpenAI Enterprise Privacy](https://openai.com/enterprise-privacy/)).
- **Microsoft Copilot Chat:** Enterprise data protection applies only when signed in with the organisation's account (Microsoft Entra), not with a personal Microsoft account ([Microsoft](https://learn.microsoft.com/en-us/copilot/faq)). Note: Copilot surfaces every file a person has read access to — overly broad sharing becomes visible this way.
- **Google Gemini:** The commitment not to use inputs for training without permission applies to Gemini in Google Workspace, not to personal Google accounts ([Google](https://knowledge.workspace.google.com/admin/generative-ai/generative-ai-in-google-workspace-privacy-hub)).

Our assessment: with a private account and no contract, a board can hardly demonstrate that it has satisfied itself about data security. Personal data therefore belong only in tools with an organisational account and a data processing agreement.

## Sensitive data: where nonprofits need to look more closely

Many nonprofits process precisely the data the Act protects most ([Art. 5(c) FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_5)): data on health, on religious, ideological or political views, and on social assistance measures. This concerns patient organisations, counselling services, social welfare bodies and church-based charities — and thus often the core of their work.

Two duties follow:

- **Data protection impact assessment.** If processing may entail a high risk, an impact assessment must be carried out beforehand. The risk arises — particularly with new technologies — from the nature, scope, circumstances and purpose of the processing, and exists in particular where sensitive personal data are processed on a large scale ([Art. 22 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_22)). The duty does not depend on size. Anyone who wants to analyse counselling records with AI is squarely in this case. The FDPIC advises small organisations to carry out at least a preliminary risk check when in doubt.
- **Record of processing activities.** Organisations with fewer than 250 employees are exempt — unless they process sensitive personal data on a large scale or carry out high-risk profiling ([Art. 24 DPO](https://www.fedlex.admin.ch/eli/cc/2022/568/de#art_24)). The FDPIC counts volunteers towards this threshold and expects that associations in health and social care will generally be required to keep a record.

## Data abroad: not all of the US is the same

Most AI tools process data in the EU or the US. Under Swiss law, EU states are countries with adequate data protection. Since 15 September 2024, the US counts as adequate only for companies certified under the Swiss-U.S. Data Privacy Framework ([Annex 1 DPO](https://www.fedlex.admin.ch/eli/cc/2022/568/de#annex_1)). The [register](https://www.dataprivacyframework.gov/list) lists Microsoft and Google, but not OpenAI (as at 16 September 2026). Swiss customers conclude their contract with OpenAI Ireland; OpenAI bases onward transfers outside Europe on standard contractual clauses.

A Switzerland-only data region is the exception. OpenAI offers a «Europe including Switzerland» region for Enterprise, Edu and the API. Microsoft includes Switzerland in the EU Data Boundary and stores Copilot interactions in Switzerland for tenants located in Switzerland; the processing itself is not necessarily confined to Switzerland. Google Workspace offers data regions for the US or the EU.

## Transparency towards members, donors and clients

Anyone collecting personal data must at least provide their own identity, the purpose, any recipients and — for disclosure abroad — the country ([Art. 19 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_19)). If an organisation starts using AI tools for personal data, this belongs in its privacy policy.

Two special cases deserve attention. Anyone operating a chatbot must, according to the FDPIC, disclose that users are communicating with a machine and whether their inputs are used further ([FDPIC: AI and data protection](https://www.edoeb.admin.ch/de/ki-und-datenschutz)). And anyone who takes a decision with legal effect or significant impact solely by automated means — conceivable, for instance, when assessing applications for support — must inform the person concerned, who can request that a human review the decision ([Art. 21 FADP](https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_21)).

## And the Swiss AI act?

Switzerland does not yet have an AI act of its own. On 12 February 2025, the Federal Council decided to ratify the [Council of Europe's AI Convention](https://www.admin.ch/de/nsb?id=104110); according to the Federal Council, its scope covers primarily state actors. A consultation draft has been announced for the end of 2026 and had not yet been opened as at 16 September 2026 ([Federal Office of Justice](https://www.bj.admin.ch/de/kuenstliche-intelligenz)). For associations and foundations, the FADP therefore remains the framework that counts — supplemented by the EU AI Act as soon as AI outputs are used in the EU (see [EU AI Act: what applies to Swiss nonprofits?](/en/wissen/eu-ai-act-schweizer-npos)).

## What boards and foundation boards should do now

1. **Map usage.** Establish who in the organisation uses which AI tools — including private accounts and AI features in existing software.
2. **Set a data rule.** Record in writing which data may be entered into AI tools. A simple baseline: no personal data in private accounts, no sensitive personal data without prior review.
3. **Use organisational accounts with a contract.** Where personal data are needed, use only tools with an organisational account and a data processing agreement; switch off training where the setting exists.
4. **Check the international dimension.** Establish where the provider processes data and what the transfer is based on — adequacy, certification or standard contractual clauses.
5. **Assess the risk.** For applications involving health or social data, carry out a preliminary risk check and, where necessary, a data protection impact assessment.
6. **Inform transparently.** Update the privacy policy and label chatbots as such.
7. **Enable rather than prohibit.** A blanket ban drives usage into private accounts. Clear rules, suitable tools and a short training for active people work better.

These points are part of the supreme body's oversight duty — the questions a board should put to management on this are set out in [AI literacy in the boardroom](/en/wissen/ki-strategie-verwaltungsrat). If you would like to set clear guardrails for AI use in your organisation, [arrange a free initial consultation](/en/booking).

_This article provides general guidance and does not constitute legal advice. Provider information as at 16 September 2026 — terms and certifications may change._
