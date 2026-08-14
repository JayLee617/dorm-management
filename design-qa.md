# Design QA Report

Date: 2026-08-12
Prototype: 晨曦大学 宿舍管理系统 mobile prototype (mobile-app template)
Reference: `../concepts/chenxi_home_1.png` (selected ideation Option 1)

## Method

- Rendered the prototype in a real browser (Playwright, headless Chromium) at the iPhone preset, captured the device screen, and exercised the full core journey: home → 报修 → 提交成功 → 返回首页, plus 服务/消息/我的 tabs and 公告详情.
- Compared the reference mockup against the captured prototype screenshot with a vision model (multi-image analysis), then verified every disputed finding with crop-level analysis, DOM text extraction, and measured layout geometry (bounding boxes, scroll metrics).
- Browser console errors: none. Runtime integrity check: passed (28 protected files).

## Findings and Fixes

| # | Finding | Severity | Resolution |
|---|---------|----------|------------|
| 1 | Header illustration read as a simple generic icon | P1 | Regenerated the asset as a hand-drawn, three-quarter-perspective architectural line sketch (windows, balconies, entrance canopy, bushes, ground lines) and verified it via crop analysis |
| 2 | Room card carried extra copy (`上床下桌 4人间`) and a chevron button | P1 | Removed; card now matches the mock exactly: icon + `3号楼 520室` + `室友 2 人` + `我要报修` |
| 3 | 公告 rows showed dates and an `全部` link not in the mock | P2 | Removed; list is now plain text rows |
| 4 | `我要报修` button had a wrench icon not in the mock | P2 | Removed; plain pill button |
| 5 | 服务 tab used a grid icon; mock shows a heart | P2 | Switched to heart outline icon; all tabs use thin outline icons |
| 6 | Greeting (white) sat on a light gradient zone with weak contrast | P1 | Deepened the hero gradient and strengthened the text shadow; greeting remains white on a medium-blue band |
| 7 | `室友 2 人` was small/low-contrast | P2 | Bumped to 16px and darkened |
| 8 | Second announcement reported as "missing" | false positive | Verified visible: DOM text contains both rows, crop analysis shows both rows, measured geometry places the last row above the tab bar (y 706–749 vs tab bar at 762), and a focused screenshot transcription lists all 13 text lines with nothing clipped |
| 9 | Bell icon next to 最新公告 reported | false positive | Crop analysis confirms no bell icon or bullet dots; header is plain text |

## Remaining P3 Notes (deliberate, low priority)

- The header illustration is an AI interpretation of the mock's sketch, close in style but not pixel-identical.
- Primary button blue is slightly deeper than the mock's #4A90E2.
- Active tab uses ink color (#1D2F45) to match the mock's darker active state; inactive tabs are grey.
- Status bar time/indicators and device chrome are template-owned and intentionally preserved.

## final result: passed

## Follow-up Iteration (2026-08-12) — Repair Form Layout

- Fixed a footer-height math bug on the 报修 form: the form footer height was computed as `84 + tabBarHeight (92)` = 176px, i.e. the safe-area padding was applied twice. This created ~74px of dead space below the 提交报修 button and a ~200px blank band above the footer.
- Form footer is now 102px on iOS (52px button + 16px top padding + 34px safe area). The gap below the button is now just the standard home-indicator safe-area inset; verified by measured geometry (button bottom 818 → footer bottom 849 in the scaled viewport) and vision review ("reasonable safe-area margin").
- Rebalanced the form: section gaps 24px, label margin 12px, 6-row description textarea, content bottom padding `footer + 4px`. The closed-keyboard form now fills the screen exactly (scroll 746/746) with no awkward blank zones; with the keyboard open the page scrolls normally (drag-scroll verified to 327/327).
- Regression: full journey (home → 报修 → 提交成功 → tabs → 公告) re-run after the change; zero console errors, home screen unchanged.

## Follow-up Iteration (2026-08-12) — Repair Form Hint Visibility

- User reported the hint "提交后维修师傅将在 1 小时内接单" was invisible with the keyboard closed. Cause: the hint was the last element of the scrollable content with only 4px clearance above the fixed footer; any browser font-metric variance pushed it behind the footer overlay.
- Fix: moved the hint into the fixed footer, above the 提交报修 button (footer height now 122px on iOS: 12px top padding + 16px hint + 8px gap + 52px button + 34px safe area). The hint is therefore always visible regardless of scroll state or font rendering.
- Verified by geometry (hint rect fully inside footer rect) and vision review of the footer crop: hint text fully visible, button below it unclipped, no defects. Closed-keyboard form still fits one screen (scroll 746/746); keyboard-open scroll re-verified.

## Extension (2026-08-12) — 宿管端 (Dorm Manager Role)

- Added a second role to the prototype with a role switch: 学生端 我的 → 切换到宿管端, and 宿管端 我的 → 切换到学生端.
- 宿管端 screens (same blue-white campus style):
  - 工作台: compact hero (greeting + date/role), stats (在住 214 / 空床 18 / 今日报修 5), primary CTA 开始查寝, 今日待办 list (待入住办理 / 待退宿确认 / 待查寝楼栋 / 维修中工单).
  - 查寝打卡: building + floor chips, per-room 正常/异常 toggles, submit → result screen with summary.
  - 入住办理: student lookup → student card → building/room assignment → 确认办理入住 → success screen.
  - 维修工单: filterable list (全部/待接单/处理中/已完成) → 工单详情 with info rows + progress timeline.
  - 我的 (宿管): profile + menu (楼栋台账/交接班记录/维修工单/设置) + switch back to student role.
  - 宿管端 tab bar: 工作台 / 查寝 / 工单 / 我的.
- QA findings and fixes: first layout pass placed the 开始查寝 CTA below the fold (scroll 852/1003, button at y 857 behind the tab bar); reordered to a compact hero (no large illustration) with CTA directly under the stats row, now fully visible on the first screen (scroll 852/852, button y 314–364). Vision review of all manager screens: no clipping, overlap, or dead space; bottom bars correct.
- Full regression run covers both roles end-to-end (19 screenshots); zero console errors.

## Follow-up Fix (2026-08-12) — 查寝 Tab Dead-End + Button Overlap

- User reported a bug entering 查寝 from the bottom tab. Root cause: the 查寝 destination was a pushed flow screen (fixed 提交查寝 footer, no bottom nav), so entering it via tab replace left no tab bar and no back button — a dead-end page with no way out except submitting.
- Fix: 查寝 is now a proper tab root. It keeps the manager bottom nav (查寝 highlighted), the header has no back arrow, and 提交查寝 became an inline button in the content (with the hint above it). Both the bottom tab and the 开始查寝 CTA land on the same tab root. Verified: tab bar present, no back button, 5 room rows, free tab switching, submit flow works, zero console errors.
- Secondary fix: the inline submit button was partially overlapped by the tab bar because `.check-content`'s `padding: 20px 20px 0` shorthand (same specificity, defined later) reset `.with-tab-footer`'s bottom padding to 0. Bumped `.with-tab-footer` to `.app-screen .with-tab-footer` and tightened the check-form vertical rhythm; the button now sits 20px above the tab bar (measured geometry), fully clickable.

## Extension (2026-08-12) — 维修端 (Maintenance Worker Role)

- Added a third role, reachable via 宿管端 我的 → 切换到维修端; the maintenance worker can switch back to 宿管端 or 学生端 from their own 我的.
- Screens (same blue-white style, 3-tab bottom nav 工作台 / 工单 / 我的):
  - 工作台: compact hero (下午好，李建国 · 维修组), stats (今日工单 6 / 待接单 2 / 处理中 3), primary CTA 去接单大厅, 今日待办 (待接单 2 / 处理中 3 / 待完工确认 1 / 今日已完成 3).
  - 我的工单: filterable list (全部/待接单/处理中/已完成) reusing the shared order data.
  - 工单详情: role-aware footer — 待接单 → 立即接单; 处理中 → 上报完工; 已完成 → disabled 工单已完成 button.
  - 接单结果 / 上报完工 (维修说明 + 更换配件 chips) / 完工结果 success screens.
  - 我的: profile + menu (我的工单/我的评价/设置) + role switches.
- QA: full regression now covers all three roles end-to-end (26 screenshots); zero console errors. Vision review: screens render correctly, no clipping/overlap (the recurring "white circle" in screenshots is the template's custom cursor, not a defect). Maintenance workbench fits one screen (852/852); bottom whitespace is standard safe-area padding.

## Follow-up Fix (2026-08-13) — 今日待办 Shortcuts + 退宿确认

- User asked why all four 今日待办 rows on the maintenance workbench opened the same order list. Cause: they were all wired to the unfiltered orders tab as a prototype shortcut.
- Fix: each row now lands on the order list pre-filtered to its status — 待接单工单 → 待接单, 处理中工单 → 处理中, 待完工确认 → 处理中, 今日已完成 → 已完成; the 去接单大厅 CTA also opens 待接单. Tab-bar navigation still opens the full 全部 list. Verified by automation: FILTER1 = 待接单, FILTER2 = 已完成.
- Also wired the manager workbench 待退宿确认 (previously a visual-only placeholder) to a new checkout flow: 退宿确认 list → 确认退宿 → success screen (床位已释放、门禁已关闭).
- Enriched mock data for realism: +2 待接单 work orders (空调不制冷、插座松动) and +2 checkout applications (4 total); synced workbench stats/counts.
- Full regression extended to 30 steps across all three roles; zero console errors.

## Follow-up Fix (2026-08-13) — 重复按钮清理

- User reported many duplicate buttons across 学生端/宿管端/维修端. Audited every tappable entry and removed pure duplicates while keeping one primary entry plus useful status shortcuts:
  - 宿管工作台: removed 待查寝楼栋 todo row (duplicated the 开始查寝 CTA); 维修中工单 row now opens the order list pre-filtered to 处理中 (previously a plain duplicate of the 工单 tab).
  - 宿管端我的: removed 维修工单 menu row (duplicated the 工单 tab).
  - 维修工作台: removed 待接单工单 row (duplicated the 去接单大厅 CTA) and 待完工确认 row (same destination as 处理中工单).
  - 维修端我的: removed 我的工单 menu row (duplicated the 工单 tab).
  - Kept intentionally: hero CTAs vs bottom tabs (standard shortcut + navigation pattern), and the services catalog tiles on the student side (a service hub, not a duplicate).
- Added `mt-home` spacing so the shorter maintenance workbench still fills the screen (852/852, no scroll).
- Full regression (30 steps, all three roles) re-run after the cleanup: zero console errors; filter shortcuts verified (处理中, 已完成).

## Extension (2026-08-13) — 辅导员端 (Counselor Role)

- Added the fourth role, reachable via 宿管端 我的 → 切换到辅导员端; counselor can switch back to 宿管端 or 学生端 from their own 我的.
- Screens (same blue-white style, 4-tab bottom nav 学生 / 审批 / 查寝 / 我的):
  - 学生住宿: search bar + building filter chips (全部/1号楼/2号楼/3号楼, functional), student list with avatar + 在寝/离校 status → 学生详情 (宿舍、入住时间、晚归记录、最近动态).
  - 申请审批: status filter chips (全部/待审批/已通过/已驳回), application list (晚归/离校/调宿) → 申请详情 with 驳回 / 通过 action bar → result screen; already-processed applications show a disabled status button.
  - 查寝结果: list of past check-ins (building/floor, date, 正常/异常 counts, submitter) → 查寝详情 with stats + 异常寝室明细 (or 全部正常 empty state).
  - 我的: profile (陈静 · 辅导员 · 计算机学院), menu (审批记录/通知设置/设置), role switches.
- QA: full regression extended to 38 steps across all four roles; zero console errors. Vision review: screens render correctly; no real clipping/overlap (list pages scroll behind the tab bar by design; the recurring "white circle" is the template cursor).

## Follow-up Fix (2026-08-13) — 学生住宿列表按钮样式

- User reported the 学生住宿 page had no visible page background and each student row's background looked wrong. Root cause: the student rows are `<button>` elements reusing `.checkout-row` (designed for plain `<div>` rows), so they rendered with the browser-default button chrome — `rgb(240,240,240)` background + `2px outset` border — making each row look like a gray box and the whole page look gray/white.
- Fix: added button resets (background:none, border:none, font-family:inherit, text-align:left, cursor:pointer, box-sizing) to `.checkout-row` and width:100% to `.student-row`. Verified by computed styles (row background now transparent, border 0) and vision review: light-blue page background visible, rows are clean transparent rows with avatar/text, consistent with other list pages.

## Follow-up Fix (2026-08-13) — 列表内容溢出到底栏下方

- User reported the student list visibly extended below the bottom tab bar. Diagnosis: on iOS the app viewport is full-screen and the fixed footer sits 34px above the screen bottom (the home-indicator safe-area strip is transparent), so scrollable content was visible in that bottom strip below the tab bar (confirmed by pixel analysis: avatar pixels at y 772-778 inside the indicator zone).
- Fix: added an app-owned iOS-only bottom mask (`.ios-safe-mask`, 34px, white, pointer-events:none, z-index below the footer) mounted in `Prototype`, covering the transparent safe-area strip on every screen. Content now scrolls fully behind the tab bar.
- Verified by pixel scan (no blue content below y=772 on the students page; bottom strip is white + home indicator) and vision review of three bottom crops (student list, report form, home): all show standard tab bar/button + white strip + home indicator, nothing broken or overlapped. Full 38-step regression re-run: zero console errors.

## Follow-up Fix (2026-08-13) — 列表独立滚动（吸顶搜索/筛选栏）

- User requested that list content scroll independently instead of the whole page scrolling together. Applied a sticky header pattern to the list screens with top chrome: 学生住宿 (search + building chips), 申请审批, 宿管维修工单 (both roles).
- Implementation: wrapped the search/filter bars in `.list-head-sticky` (position:sticky; top:0; z-index:5; full-bleed background matching the page). The app title bar (FlowScreen header) and bottom tab bar were already fixed; now the search/filter row stays fixed too and only the list card scrolls beneath it.
- Verified by DOM geometry (after scrollTop=260: sticky bar stays at top 179 while the first row moves 313→68) and vision review of the scrolled screenshot (search + chips fixed below title, only the list moved, tab bar intact). Full 38-step regression re-run: zero console errors.

## Follow-up Fix (2026-08-13) — 吸顶栏零位移

- User reported the sticky action bar still moved a little when scrolling started. Cause: the bar's natural position sat 16px below the sticky point (parent container top padding), so it slid up those 16px before sticking.
- Fix: `.list-head-sticky` now uses `margin-top: -16px` to cancel the parent's top padding, making its resting position identical to its sticky position.
- Verified by DOM geometry: before and after scrolling, the bar top is 179 both times (zero movement); only the list rows move (first row 298 → 53). Full 38-step regression re-run: zero console errors.

## Follow-up Fix (2026-08-13) — 吸顶栏顶部缝隙

- User reported a thin seam revealing list content between the title bar and the sticky action bar while scrolling. Pixel analysis found a 1-2px mixed row (white card + dark text) at the boundary (screenshot y=100) only in the scrolled state — a sub-pixel gap between the app header bottom and the sticky bar top.
- Fix: added `.list-head-sticky::before` — a 4px-tall background extension painted above the bar's top edge — so any gap is always covered by the page background.
- Verified by pixel scan: the boundary row is now pure background (bg 92, no white/dark mix) in both the rest and scrolled states. Full 38-step regression re-run: zero console errors.

## Extension (2026-08-13) — 查寝页 12 间寝室 + 楼层吸顶

- Per user request (to verify list scrolling), expanded the 查寝 page from 5 rooms to 12 rooms per floor, generated dynamically per selected floor (e.g., 5F → 520-531室, 1F → 120-131室) with varied 在寝 counts.
- Wrapped the 楼栋/楼层 selector in the sticky header pattern (`.list-head-sticky` with a check-specific `-20px` top-margin override), so the floor chips stay fixed while the room list scrolls.
- Increased the 提交查寝 button's bottom margin so it fully clears the tab bar at full scroll (measured 17px clearance).
- Verified: 12 rooms render; scrollHeight 1116 vs viewport 746 (scrolls); sticky selector stays at top 179 with zero movement; submit button fully visible above the tab bar at full scroll; vision review confirms no seams/clipping. Full 38-step regression re-run: zero console errors.

## Extension (2026-08-13) — 列表页内容扩充（滚动验证）

- Per user request, expanded all list pages so each scrolls beyond one screen (fixed-content pages — home, workbenches, forms, details — unchanged):
  - 消息: 4 → 8 items.
  - 工单 (manager + maintenance, shared data): 5 → 9 orders.
  - 退宿确认: 4 → 6 students.
  - 学生住宿: 8 → 14 students.
  - 申请审批: 4 → 8 applications (incl. 已驳回 sample).
  - 查寝结果: 3 → 7 records.
  - Synced workbench stats/counts (今日报修 7, 今日工单 7, 待接单 4, 处理中 3, 待退宿 6, 维修中 3).
- Verified scrollability per page via DOM metrics (scrollHeight vs 746 viewport): messages 868, manager/mt orders 1043, checkout 827, students 1714, approvals 782, check results 806 — all scrollable, zero console errors. Vision review of messages/checkout: lists render cleanly with natural cut-off at the scroll boundary. Full 38-step regression re-run: zero console errors.

## Extension (2026-08-13) — 系统管理员端 (Admin Role)

- Added the fifth and final role, reachable via 宿管端 我的 → 切换到管理员端; admin can switch back to 宿管端 or 学生端 from their own 我的. 5-tab bottom nav: 统计 / 楼栋 / 分配 / 账号 / 我的.
- Screens:
  - 统计: hero + stat tiles (楼栋 5 / 总床位 1120 / 在住 955 / 今日报修 7), 今日概览 (待分配 4 / 停用账号 1 / 维修中 3 / 待退宿 6), 楼栋入住率 with tappable occupancy bars.
  - 楼栋: building list (5 buildings, floors/rooms/beds + occupancy) → 楼栋详情 with 楼层床位 breakdown (generated per floor).
  - 分配: 待分配名单 (4 students) → 宿舍分配 form (student card + building/room chips) → 分配成功.
  - 账号: account list (宿管/维修/辅导员, 启用/停用 status) + permission note.
  - 我的: profile (赵建军 · 系统管理员 · 后勤管理处), menu (楼栋台账/账号权限/操作日志/系统设置), role switches.
- QA: full regression extended to 46 steps across all five roles; zero console errors. Vision review: screens render correctly; reported "keyboard open" and "list clipped" were false positives (keyboard dock is off-screen; first list row sits 18px below the header — verified by DOM).

## Update (2026-08-13) — 独立角色 URL + 我的页面精简

- Each role now has its own English web address (path-based routing in `Prototype`, default `/` = student):
  - `/student` 学生端 · `/manager` 宿管端 · `/maintenance` 维修端 · `/counselor` 辅导员端 · `/admin` 管理员端.
- 我的 pages cleaned up: removed all dead menu rows and the role-switch cards (role entry is now by URL); replaced them with a static profile info card (学院/工号/岗位/负责范围 etc.) and a small version footer. No interactive buttons remain on 我的 pages except the bottom tab bar.
- Regression rewritten to navigate by URL per role; full 46-step run across all five roles: zero console errors. Verified each URL loads the correct role home; vision review of student/manager 我的 pages: clean profile + info rows, no leftover dead buttons.

## Polish Pass (2026-08-13) — 全项目润色（搜索/空状态/动态数据/交互反馈）

Per user request to polish the whole project and collect reference from GitHub, applied a full pass over the five roles:

- **Greeting**: added time-aware `greeting()` (早上好/中午好/下午好/晚上好) to all four workbench/home heroes (student, manager, maintenance, admin).
- **Real functional search** (previously static placeholder bars):
  - 学生端 服务: typing filters the service tiles by name, with 未找到相关服务 empty state + clear (×) button.
  - 辅导员 学生住宿: search by 学号/姓名 combines with the building chips; shows “找到 N 名学生”; empty state when no match.
  - 管理员 账号权限: search by 账号/角色/楼栋 with result count + empty state.
  - Shared `SearchBarInput` component (KeyboardInput + clear button) and `EmptyState` component (icon + title + hint), used consistently across list pages.
- **Empty states** added to all filterable lists: 工单 (宿管/维修), 申请审批, 学生列表, 账号列表, 服务. When a filter/search yields nothing, the card shows a friendly empty state instead of a blank list.
- **查寝结果联动**: the 提交查寝 result screen now renders from the actual form state — floor, room count, 正常/异常 counts, and the exact 异常寝室 ids (previously hardcoded “正常 10 · 异常 2”). Copy refined to “本次共查 N 间，正常 X · 异常 Y / 异常寝室：…，已同步至台账”.
- **入住办理真实查询**: searching now looks up the 待分配名单 (PENDING_STUDENTS) by 学号/姓名; hit shows the real student card, miss shows “未找到该学生” hint; the success screen uses the found student + chosen building/room instead of a hardcoded name.
- **Dashboard numbers derived from data**: 宿管工作台 在住/空床/今日报修 and 待入住/待退宿 counts now compute from BUILDINGS/WORK_ORDERS/PENDING_STUDENTS/CHECKOUTS; 管理员 待分配学生/停用账号 counts compute from PENDING_STUDENTS/ACCOUNTS. No more magic numbers that disagree with the lists.
- **Interaction polish**: active (pressed) states on all tappable rows/chips/buttons, hover shadow on primary buttons, disabled state on the move-in search button when empty, focus ring + transition on search inputs, and a visible clear button in every search field.
- QA: rebuilt (tsc + vite + sites prep, runtime integrity passed), full 46-step regression across all five roles re-run — zero console errors; focused interaction script verified search hits/misses, empty states, dynamic check-result text, and move-in lookup; Qwen vision review of 10 screenshots (search hit/miss, empty states, check result, move-in) — no overflow/overlap, styling consistent.

## Follow-up Fix (2026-08-13) — 辅导员端工作台首页（风格统一）

- User reported the counselor portal's entry page looked inconsistent with the other roles. Root cause: counselor had no home/workbench — its default tab was the 学生住宿 list, while every other role opens on a hero-greeting home (manager/maintenance/admin workbench, student home).
- Added `counselorHomeScreen` matching the shared workbench pattern: blue gradient hero with time-aware greeting + date/role, 3-stat card (负责学生 14 / 在寝 12 / 待审批 5, computed from CSTUDENTS/APPROVALS), 快捷入口 card (学生住宿 / 待审批申请 / 查寝结果 with live counts), and 最近动态 card (latest 3 approvals with status chips, tapping opens 申请详情).
- Bottom nav changed from 学生/审批/查寝/我的 to 工作台/审批/查寝/我的, consistent with the other roles' “home tab = workbench” convention; 学生住宿 is now reached via the 工作台 quick entry (and remains a tab root for internal flow.replace).
- Regression script updated (counselor now opens on workbench, navigates 学生住宿 → detail → back → workbench); full 46-step run: zero console errors. Vision review of the new workbench: layout, alignment, and tabs all clean and consistent with the other roles.

## Follow-up Fix (2026-08-13) — 待审批申请入口直达筛选结果

- User reported the 工作台 → 待审批申请 shortcut opened the full approval list instead of pending ones. Fixed by threading an `initialFilter` through `counselorApprovalsScreen(tabFooterHeight, "待审批")` into `CounselorApprovals`' filter state, so the entry lands on the 待审批 chip with only pending items listed; the 审批 tab still opens on 全部 as before.
- Verified: clicking the shortcut shows the 待审批 chip selected with exactly the 5 pending applications, zero console errors. Rebuilt (runtime integrity passed) and full regression re-run afterward: zero console errors.
