---
title: "Failure states are the product"
slug: failure-states-are-the-product
category: Product
excerpt: "Loading, empty, error, and irreversible actions decide whether people trust the software — design them with the happy path, not after it."
summary: "A practical take on treating non-happy paths as first-class product work."
standfirst: "Users forgive a slow feature. They do not forgive a blank screen that never explains itself."
featured: false
publishedAt: 2026-04-02
takeaways:
  - "Every shipped screen needs an explicit empty and error path."
  - "Irreversible actions need confirmation that names the consequence."
  - "Loading should preserve layout so trust does not jump with the pixels."
---

::lead Most teams polish the happy path and invent failure under pressure. By then the product has already taught users that something is wrong — without saying what.

## Map the five states before the layout

Before components, I list: loading, empty, partial, error, and success. If any of those is “spinner forever” or “toast and shrug,” the feature is not ready. The UI is not decoration around an API — it is the contract the user experiences.

## Empty is a teaching moment

An empty table is not a blank. It should say what belongs here and what to do next. The best empty states feel like onboarding for one job, not a dead end with a sad illustration.

## Errors that earn trust

A useful error names what failed, whether it is safe to retry, and who owns the next step. “Something went wrong” is a shrug. “Couldn’t save — your draft is still here” is a product.

> [!NOTE] If the only recovery path is refresh, you have already lost the user’s mental model.

## Irreversible with a spine

Deletes, publishes, and permission changes need copy that names the consequence — not a generic “Are you sure?” Modal fatigue is real; vague confirmations make it worse.

## Ship the boring states first

I often build empty and error before the dense happy path. It forces honesty about edge cases and keeps the UI from becoming a demo that only works on seeded data.

That is how interfaces earn calm: not by looking quiet, but by staying legible when things go wrong.
