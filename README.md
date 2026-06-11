# CalorAI — Taste Profile

A polished, swipeable food-preference app built with **React Native (managed Expo) + TypeScript**, runnable on **Expo Go** for both iOS and Android. Swipe through foods you love and dislike, and the app generates a personalized taste profile.

> Built for the CalorAI React Native test task. Recreates the Figma's dark, frosted-glass aesthetic with smooth 60fps swipe interactions, with deliberate attention to how the glass effect degrades gracefully on Android.

**Stack:** Expo SDK 54 · React Native 0.81 · React 19.1 · TypeScript · Reanimated 4 · React Navigation 7

---

## Demo

> 📸 **To add before submitting:** drop three screenshots into `docs/screenshots/` named `intro.png`, `swipe.png`, `results.png` (the table below will then render them), and paste your walkthrough video link.

| Intro | Swipe | Results |
| :---: | :---: | :---: |
| ![Intro screen](docs/screenshots/intro.png) | ![Swipe screen](docs/screenshots/swipe.png) | ![Results screen](docs/screenshots/results.png) |

- **Walkthrough video (5–10 min):** _add link (Loom / YouTube unlisted / Drive)_
- **Run it yourself:** `npx expo start`, then scan the QR with Expo Go (see [Getting started](#getting-started-run-on-expo-go)).

---

## Features

### Core (all implemented)

1. **Intro screen** — onboarding card with the 😋 hero, copy, and the green "Start Swiping" CTA.
2. **Swipe screen** — a frosted-glass food-card deck:
   - Swipe **right = like**, **left = dislike** (the graded core), plus **up = super-like** and **down = unsure** to match the four drag-badges in the Figma.
   - The four circular action buttons are an alternative to swiping and route through the **exact same** animation path.
   - A green **progress bar** updates as you work through the 30-card deck.
3. **Results screen** ("Your Taste Profile") — generated from your swipes:
   - "Key Highlights" paged carousel (taste traits → cuisines).
   - "Lifestyle & Goals" checklist.
   - A 4-page carousel: **Foods You Love / Foods You Hate / Favorite Cuisines / Foods You Super-Liked**.
4. **Bottom navigation** — a glass/blur pill (Start · FAQ · Taste Profile) + a standalone search circle.
5. **Consistent theming** — dark gradient backgrounds, green accent, single source-of-truth tokens.

### Bonus features

- Card **rotation + spring physics** during the swipe.
- **Haptic feedback** on commit (varies by direction).
- **Undo last swipe** (appears top-right on the Swipe screen).
- **Profile-generation logic** — Results is derived from your actual swipes, not hardcoded (unit-tested).
- **Onboarding animation** — the Intro card fades/slides in.
- **Animated background** — a subtle green bloom slowly drifts/pulses (UI-thread Reanimated; no per-frame JS).
- **Blurred photo card backdrop** — each food card shows a blurred, dimmed version of its own photo behind the sharp thumbnail.

### Beyond the spec

A functional **FAQ** screen (Q&A about the app) and a real **Search** screen (filters the food data live by name / tag / category), both reachable from the glass nav bar.

---

## Getting started (run on Expo Go)

**Prerequisites:** Node 20+, and the **Expo Go** app on your phone (or an iOS Simulator / Android emulator).

```bash
npm install
npx expo start          # then scan the QR code with Expo Go
# or press:  i  (iOS Simulator)   a  (Android emulator)   r  (reload)
```

> This project targets **Expo SDK 54** — use a matching Expo Go build. If you ever hit a blank screen on Android, clear the Metro cache with `npx expo start -c`.

**Tests / checks:**

```bash
npm test          # jest unit tests for the profile logic (5 passing)
npm run typecheck # tsc --noEmit
npx expo-doctor   # dependency/config sanity (18/18 passing)
```

---

## Libraries used (and why)

| Library | Why |
| --- | --- |
| **expo (SDK 54) / expo-status-bar** | Managed workflow, runs on Expo Go with no custom dev build. |
| **@react-navigation/native + native-stack** | Simple, robust stack flow. The persistent glass nav is rendered at the app level (see below) rather than as a navigator tab bar. |
| **react-native-reanimated 4 + react-native-worklets** | All swipe math runs on the UI thread → real 60fps, including on Android. |
| **react-native-gesture-handler** | The modern `Gesture.Pan()` API for the swipe deck. |
| **zustand** | One tiny store. Selector subscriptions stop the 60fps swipe screen from re-rendering wholesale; trivial undo/reset. |
| **expo-blur** | Real frosted glass on iOS (with an Android fallback — see below). |
| **expo-linear-gradient** | Dark gradient backgrounds, the green bloom, and the super-like button face. |
| **expo-image** | Disk/memory caching, fade-in transitions, `onError` fallback, prefetching upcoming cards, and the blurred card backdrop (`blurRadius`). |
| **@expo/vector-icons** | Crisp vector icons (Ionicons + the `carrot` from MaterialCommunityIcons), identical on both platforms. |
| **react-native-safe-area-context** | Keeps the glass nav above the home indicator / Android gesture bar. |
| **@expo-google-fonts/inter** | The heavy Inter weights render identically on iOS and Android (Android's default font is lighter). |
| **expo-haptics** | Tactile feedback on swipe commit (no-ops silently where unsupported). |

---

## How platform differences (iOS vs Android) are handled

**This is governed by one flag — `ENABLE_BLUR` in [`src/theme/platform.ts`](src/theme/platform.ts) — and one component, [`<Glass>`](src/components/glass/Glass.tsx).**

On Expo Go (Android), `expo-blur`'s default `experimentalBlurMethod` is `'none'`, which renders a **semi-transparent (non-blurred) view** — not an empty/black box. The real native blur (`dimezisBlurView`) is also **janky during screen transitions** and **only blurs same-window content** (so it can't pick up our gradient like iOS does). For those reasons we deliberately:

- **iOS:** render a real `BlurView` (intensity ~22–25, dark tint) + a translucent white overlay.
- **Android:** skip the BlurView and render a **tuned semi-transparent solid frost** (`rgba(22,24,28,0.72)`).

Crucially, the **decoration is identical on both platforms** — same hairline border (`rgba(255,255,255,0.16)`), same top-edge sheen gradient, same radii — so layout never shifts; only the base technique differs.

Other platform handling:

- **Shadows:** iOS `shadow*` props vs Android `elevation`, centralized in [`src/theme/shadows.ts`](src/theme/shadows.ts). Because `overflow:'hidden'` clips shadows, depth lives on an opaque outer wrapper.
- **Colored glows** (the red/green/blue button halos) use a layered translucent ring (`GlowCircle`) instead of shadow/elevation, since Android elevation can't be colored — so they look identical on both platforms.
- **Card backdrop blur** uses `expo-image`'s `blurRadius` (an image-level blur, not a BlurView), so the premium card look is genuinely cross-platform.
- **Emoji:** the data's flag emojis (e.g. 🇮🇹) and ZWJ chef emoji don't render reliably on Android, so cuisines use food emojis (🍝🌮🍣🫒🍔) and section headers use simple single-codepoint emojis.
- **Font scaling:** large headings cap `maxFontSizeMultiplier` so big system-font settings on Android don't clip fixed line-heights.

---

## Architecture & decisions

- **App-level glass nav bar (not a navigator tab bar).** React Navigation warns that toggling a tab bar's visibility mid-navigation can cause glitchy stack animations (worse on Android). So the glass bar is rendered once in [`App.tsx`](App.tsx), *outside* the navigator, and animates its own opacity/translateY based on the active route — it hides cleanly on the Swipe screen.
- **Single swipe-commit path.** Buttons and drag gestures both call one `commit(direction)` worklet, so tapping a button animates the card off-screen exactly like a manual fling. The off-screen target is computed from the card's half-diagonal so a rotated card fully clears the corner on tall/narrow Android screens.
- **State is an append-only decision log.** Everything on the Results screen is *derived* from it via a pure, unit-tested `generateProfile()` ([`src/lib/profile.ts`](src/lib/profile.ts)) — nothing is hardcoded.
- **Separation of concerns:** `screens/` are thin compositions; reusable UI in `components/`; gesture/animation isolated in `components/swipe/`; all platform branching in `theme/`; all business logic in `lib/`.

### Project structure

```
App.tsx                 root: gesture root, safe-area, font gate, nav + app-level glass bar
src/
  navigation/   RootNavigator, routes, navRef
  screens/      Intro, Swipe, Results, Faq, Search
  components/
    glass/      Glass (blur/fallback), GlassCard, GlassButton
    common/     AppText, GradientBackground, PillButton, ProgressBar,
                Pagination, PagedCarousel, Divider, GlowCircle, FoodThumb
    nav/        GlassTabBar, TabItem, SearchFab
    swipe/      CardStack, SwipeCard, FoodCardContent, DirectionOverlay,
                ActionBar, CircleActionButton
    results/    SectionCard, CheckRow, HighlightsCarousel, LifestyleCard, FoodPrefCarousel
  state/        swipeStore (zustand)
  hooks/        useSwipeDeck, useHaptics
  lib/          profile (taste logic), cuisine (tag→cuisine mapping), strings
  theme/        tokens, layout, platform (ENABLE_BLUR), shadows
  data/         foods.json (provided) + foods.ts loader
  types/
__tests__/      profile.test.ts
```

---

## Assumptions & trade-offs

- **No backend / no auth** — all data is the provided `foods.json` (hardcoded), as specified.
- **Cuisine data:** the source PDF's cuisine emojis were flags/garbled, replaced with cross-platform food emojis. Foods have no per-food `cuisine` field, so cuisine is **derived from tags** ([`src/lib/cuisine.ts`](src/lib/cuisine.ts)); if the data ever gains a cuisine field, it's a one-line change.
- **Card copy** follows the Figma's "I love eating salads" pattern: `I love eating {food}`.
- **FAQ and Search are functional** (the spec defines neither), rather than shipping disabled placeholders that read as unfinished.
- **Intro is a one-time onboarding screen**; the "Start" nav item returns to it, and "Start Swiping" resets the deck before re-entering. I used a stack + app-level glass bar instead of a nested Tab navigator — simpler, avoids the tab-bar animation glitch, and looks identical.
- **Results "Key Highlights"** shows derived taste traits on page 1 and top cuisines on page 2. **Page 4 of the food carousel = "Foods You Super-Liked"** (uses the up-swipe), with an empty-state when nothing was super-liked.
- **Lifestyle rows** are inferred from your liked-food tags; the exact illustrative labels are partly heuristic (documented in code).
- **Action-button glow** appears on press only (the Figma shows a resting glow) — a deliberate tweak that looks cleaner on a real device.
- **LTR only**, and color hexes are inferred from the Figma frames (all live in one tokens file for easy tuning).

---

## Time breakdown (~7 hours)

| Phase | Time |
| --- | --- |
| Planning, Figma analysis, architecture | ~1.0h |
| Scaffold, dependencies, theme tokens, data | ~0.75h |
| Glass primitive + Android fallback + gradient + nav bar | ~1.0h |
| Intro screen | ~0.5h |
| Swipe engine (gesture, reanimated, overlays, buttons) | ~1.75h |
| Profile logic + Results carousels + unit test | ~1.0h |
| Cross-platform polish + bonuses (haptics, undo, fade-in, animated bg, FAQ/Search) | ~0.75h |
| README + verification | ~0.5h |

---

## With more time

- Capture-and-share of the final profile (screenshot / deep link).
- Snapshot/UI tests in addition to the profile-logic unit tests.
- A richer profile algorithm (confidence weighting, dietary flags) and a real FAQ/search backend.
- RTL support and full accessibility audit (the basics — labels, font-scaling caps — are in place).

---

## Notes on AI tool usage

Built with **Claude (Claude Code)** as a pair-programmer. It was used to: analyze the Figma frames and the brief into an architecture blueprint; scaffold the Expo project and resolve the SDK-54 / Reanimated-4 / `react-native-worklets` Babel setup; generate component boilerplate; and research the correct Android `expo-blur` behavior for the fallback rationale. Every file was reviewed, the architecture decisions are deliberate, and correctness was verified with `tsc`, `jest`, `expo-doctor`, and Metro bundling for both platforms.
