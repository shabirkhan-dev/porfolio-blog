---
title: "Mobile that feels native, not wrapped"
slug: mobile-that-feels-native-not-wrapped
category: Frontend
excerpt: "Cross-platform apps fail when they ship web habits on a phone. Hierarchy, offline honesty, and touch rhythm matter more than another shared component."
summary: "Notes on React Native product craft: native feel without abandoning a shared codebase."
standfirst: "Users do not care that you reused a web stack. They care whether the app feels like it belongs on their phone."
featured: false
publishedAt: 2026-06-14
takeaways:
  - "Design for thumb reach and interruption, not desktop density."
  - "Offline and slow-network states are product, not edge cases."
  - "Share logic freely; share chrome carefully."
---

::lead The fastest way to make a React Native app feel cheap is to paste web patterns onto a small screen: dense tables, hover affordances, and infinite chrome.

## Start from the hand, not the Figma frame

Mobile work is interrupted. One primary action per screen beats a toolbar that mirrors the admin. I design for thumb reach, short sessions, and the moment the user glances away — then comes back expecting the app to remember where they were.

## Offline is not optional theater

If the product matters in the field, offline and flaky networks are the real environment. Queue writes, say what is pending, and never pretend a save succeeded when it only left the device. A wrapped website that spins forever on bad signal is not a mobile product.

## Share the brain, not the skin

I share types, API clients, and domain rules across web and mobile. I am careful with visual systems: list density, navigation metaphors, and platform conventions differ. A shared button library is fine; a shared “dashboard chrome” usually is not.

## Motion and feedback on touch

Confirmations should be immediate and physical — haptics where appropriate, optimistic UI where safe, and clear undo for mistakes. Desktop hover tips do not translate. If an action only makes sense with a mouse, rethink it.

## Prove it on a real device

Simulators lie about battery, latency, and one-handed use. I ship slices that a real user can complete on a phone in the wild — then grow. That is how cross-platform stays an advantage instead of an excuse.
