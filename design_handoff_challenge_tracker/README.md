# Handoff: 영천초등학교 도전활동 기록지 (Challenge Activity Tracker)

## Overview
A gamified daily-challenge tracker for elementary school students (grades 1–6). Students log in by grade/class/name, set a personal goal tied to a character course, do daily check-ins with a completion toggle + one-line diary, and watch their chosen character evolve through 5 growth stages as they build consistency. Teachers/admins get a roster view across all students.

## About the Design Files
The files in this bundle (`design.dc.html`, `support.js`) are **design references** built in this app's own HTML templating runtime — not production code to copy directly. `support.js` is internal plumbing for that runtime and should **not** be added to a real codebase. The task is to **recreate the screens below in your target stack** (React, Vue, etc. — pick React if none exists yet) using your app's own component/state patterns, matching the visuals and behavior documented here.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy below are final; recreate pixel-close.

## Global Style
- **Fonts**: `Gowun Dodum` (headings/titles, soft rounded look) + `Noto Sans KR` (body), loaded from Google Fonts. Sidebar app title is bold.
- **Palette**: warm pastel — ivory card background `oklch(96% 0.015 80)`, sage/green accents `oklch(50-56% ~0.1 150-155)`, warm yellow accents `oklch(~55% 0.1 80-95)`, soft borders `oklch(90% 0.015 85)`, muted text `oklch(52% 0.02 90)` / `oklch(32% 0.02 90)`.
- **Page background**: full-bleed sky gradient, dark navy-to-space at top fading to light blue at bottom: `linear-gradient(180deg,#03040c 0%,#0b1638 12%,#173a6e 26%,#2f6fa8 42%,#5aa8d6 58%,#7cc3ea 74%,#a9dcf3 90%,#cfeefb 100%)`, with a sparse scattered small-white-dot "star" pattern confined to the upper (dark) portion only.
- **Cards**: all main content areas sit inside a rounded ivory card (`border-radius:28px`, soft shadow `0 12px 32px oklch(40% 0.06 220 / 0.18)`, padding ~28-32px) floating on the sky background.
- **Corner radius scale**: 12–16px small controls, 16–24px content cards, 28px page-level cards, 999px pills/badges.
- **Logo**: single PNG asset (`assets/logo.png`) — trophy + holly-leaf badge with "영천" text and a ribbon reading "영천초 도전활동". Used at 4 sizes: 28px (admin header), 30px (app sidebar/topbar), 72px (create-profile header), 96px (login header). Always square, `object-fit: contain`.

## Screens / Views

### 1. Login
- **Purpose**: student picks grade + class, then their name from a filtered list.
- **Layout**: full-viewport, centered column, ivory card (max-width 420px) containing: logo (96px) + title "영천초등학교 / 도전활동 기록지" + subtitle "학년과 반을 입력해주세요"; two side-by-side `<select>` dropdowns (학년 선택 1–6학년, 반 선택 1–4반); once both chosen, either:
  - **No match**: dashed-border ivory notice "해당 학년/반에 등록된 학생이 없어요." + green CTA button "새 프로필 만들기".
  - **Matches found**: list of student rows (avatar circle 44px in course color + name + "학년/반 · 스테이지" subtext), each a clickable pill button; plus a dashed "내 이름이 없나요? 새 프로필 만들기" button at the bottom of the list.
  - Below the card, outside it: small underlined text link "관리자 페이지" → admin screen.

### 2. Create Profile
- **Purpose**: new student sets up name, character course, and goal.
- **Layout**: centered ivory card (max-width 460px): logo (72px) + title "나만의 도전 캐릭터 만들기" + subtitle "캐릭터와 목표를 정하면 도전을 시작할 수 있어요"; then:
  - Text input: 이름 (placeholder "이름을 입력해주세요")
  - Label "캐릭터 도감에서 코스를 골라주세요" + 4-column grid of course cards (까치/호랑이/토끼/다람쥐), each a rounded button (52px icon + name), selected state = colored border + tinted background matching that course's color.
  - Text input: 나의 도전 목표 (placeholder "예: 하루에 줄넘기 100개 하기")
  - Primary button "도전 시작하기" (disabled until name + course + goal all filled; disabled = muted grey, enabled = course-colored green)
  - Secondary text button "뒤로 가기" → login

### 3. Main Dashboard (logged-in student)
- **Layout (desktop/tablet ≥800px)**: left sidebar (216px, opaque ivory-white, border-right) + main content area to the right. **Mobile (<800px)**: sidebar replaced by a bottom tab bar; a small top logo appears in the header instead.
  - **Sidebar**: small logo (30px) + "영천초 도전활동 기록지" wordmark; nav items (icon + label, active = green tint background/text); spacer; dashed "다른 학생으로" (switch student) button pinned to bottom.
  - **Header bar** (opaque ivory-white, border-bottom): screen title (left) + student identity pill (right: 38px avatar circle on course-color background + name/grade-class + course/stage line).
  - **Content area**: centered ivory card (max-width 1080px) holding the active nav section.
- **Dashboard section** (2-column grid ≥800px, stacked 1-column <800px, `gap:20px`):
  1. **"오늘의 도전을 완료했나요?" card**: shows the fixed goal pill ("오늘의 목표 · {goal}"). If not yet checked in today: one-line diary text input (placeholder "예: 생각보다 재미있었다!") + full-width primary button "체크인 저장" (disabled until diary text entered). If already checked in: green confirmation panel showing the saved diary line + "수정하기" button to re-open the form.
  2. **"내 캐릭터 성장 존" card**: course badge pill (top-right); big illustration tile (104px, animated gentle float) + current stage name/description; 5-dot horizontal stage stepper (clickable, locked stages dimmed/locked-icon, current stage highlighted); a growth-guide banner with a progress bar (course-colored fill) showing weekly progress toward next stage.
  3. **"도전 달성 현황" card** (spans full width below): weekly/streak stats and a calendar/streak tabbed view (implementation detail — see existing HTML for exact sub-layout).
  - **Character Codex nav item**: exploration grid of all 4 courses × 5 stages; locked stages shown desaturated/greyed with a lock icon; selecting a stage shows a preview panel (illustration + title + description) to the side.
  - **Award/certificate view** (shown when a student earns it via 4+/week consistency): centered certificate card (max 460px), colored border matching course, trophy/badge icon, "CERTIFICATE OF ACHIEVEMENT" eyebrow, title, body copy, date, "영천초등학교장" signature line.

### 4. Admin Dashboard
- **Layout**: centered ivory card (max-width 1000px). Header: logo + "관리자 페이지 · 전체 도전 현황" title (left), "나가기"-style exit button (right). Filter row: 전체 학년 / 전체 반 dropdowns, student count ("총 N명"), and a pill-style Table/Grid view toggle (right-aligned).
  - **Table view**: columns 이름 / 학년·반 / 코스 (dot + name) / 단계 / 이번주 / 연속 / 오늘, header row on a tinted background, rows on transparent/white with dividers.
  - **Grid view**: responsive card grid (`auto-fill, minmax(150px,1fr)`), each card tinted in the student's course color, with a white avatar circle (64px), name, grade/class, a white stage-name pill, and "오늘 {완료/미완료} · 이번주 N" status line (color-coded).

## Interactions & Behavior
- Dropdown/select changes filter downstream lists live (grade → class → student names).
- Course selection in Create Profile is single-select with visual border/background feedback.
- Check-in form: Save button disabled until diary text is non-empty; after saving, form swaps to a read-only "completed" state with an edit affordance.
- Stage stepper buttons are clickable to preview any stage (locked or unlocked) in the codex/preview panel; locked stages show a lock icon and desaturated art.
- Nav items and admin table/grid toggle are simple active-state button groups (no animation needed beyond color/background change).
- Responsive breakpoint: **800px** — below it, sidebar → bottom tab bar, dashboard grid stacks to 1 column, top logo appears in header.
- Illustration tiles use a slow continuous float animation (translateY, ~3s ease-in-out loop).

## State Management
- Current screen: `login | create | app(dashboard/codex/admin) `.
- Selected grade/class filters (login + admin).
- Selected/current student (id, name, grade, class, course, goal, stage/XP, check-in history, streak).
- Per-day check-in record: `{ completed: boolean, diary: string }`, keyed by date.
- Course + stage catalog: 4 courses × 5 stages each, with name/description/art per stage and unlock thresholds.
- Admin filters (grade/class) + view mode (table/grid).
- Viewport width (drives the 800px responsive behavior).

## Design Tokens
- **Colors** (OKLCH, approximate roles):
  - Ivory card: `oklch(96% 0.015 80)` (was `oklch(97% 0.03 85)` in an earlier pass — final = the more muted one)
  - Card border / dividers: `oklch(90% 0.015 85)`
  - Off-white surfaces (sidebar/header): `oklch(99% 0.007 85)`
  - Primary green (course/CTA): `oklch(50% 0.09 155)` (button), text green `oklch(38-42% 0.05-0.07 155)`
  - Warm yellow accent (progress banner): `oklch(95% 0.04 95)` bg / `oklch(55% 0.1 80)` text
  - Muted text: `oklch(52% 0.02 90)`, body text: `oklch(32% 0.02 90)`
  - Card shadow: `0 12px 32px oklch(40% 0.06 220 / 0.18)`
- **Radius**: 12–16px (inputs/small), 16–24px (cards/tiles), 28px (page card), 999px (pills)
- **Spacing**: card padding 22–32px; grid/flex `gap` 8–24px depending on density
- **Type**: headings `Gowun Dodum`, body `Noto Sans KR`; sizes range ~11–30px (titles largest on login)

## Assets
- `assets/logo.png` — trophy/holly-leaf badge logo (user-supplied final art), used at 28/30/72/96px square sizes throughout.
- All character illustrations (까치/호랑이/토끼/다람쥐, 5 stages each) were inline placeholder art in the prototype — replace with final character art per course/stage in production.

## Files
- `design.dc.html` — full prototype markup + logic (reference only; uses this app's internal template syntax `{{ }}` / `<sc-if>` / `<sc-for>`, not portable as-is)
- `support.js` — internal runtime for the above (do not port into your codebase)
- `assets/logo.png` — final logo asset
