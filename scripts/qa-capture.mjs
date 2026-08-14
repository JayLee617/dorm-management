import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = "http://localhost:5174";
const outDir = "work/qa";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "C:\\Users\\97412\\AppData\\Local\\ms-playwright\\chromium_headless_shell-1223\\chrome-headless-shell-win64\\chrome-headless-shell.exe",
});
const page = await browser.newPage({ viewport: { width: 1200, height: 960 } });

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

const gotoRole = async (path) => {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.locator(".device-screen").waitFor({ state: "visible", timeout: 15000 });
};

const waitScreen = (testId) =>
  page.locator(`[data-testid="${testId}"]`).last().waitFor({ state: "visible", timeout: 5000 });

async function shot(name) {
  await page.waitForTimeout(500);
  await page.locator(".device-screen").screenshot({ path: `${outDir}/${name}.png` });
}

const tabButton = (name) => page.locator(".tab-bar").getByRole("button", { name });
const backButton = () => page.locator(".header-back");

// ---- Student (/student) ----
await gotoRole("/student");
await shot("01-home");

await page.getByRole("button", { name: /我要报修/ }).first().click();
await waitScreen("report-screen");
await shot("02-report");
await page.getByRole("button", { name: /提交报修/ }).click();
await waitScreen("report-success-screen");
await shot("03-report-success");
await page.getByRole("button", { name: /返回首页/ }).click();
await waitScreen("home-screen");

await tabButton(/^服务/).click();
await waitScreen("services-screen");
await shot("05-services");
await tabButton(/^消息/).click();
await waitScreen("messages-screen");
await shot("06-messages");
await tabButton(/^我的/).click();
await waitScreen("profile-screen");
await shot("07-profile");
await tabButton(/^首页/).click();
await waitScreen("home-screen");
await page.getByRole("button", { name: /暑期留校申请/ }).click();
await waitScreen("notice-detail-screen");
await shot("09-notice-detail");

// ---- Manager (/manager) ----
await gotoRole("/manager");
await shot("10-manager-workbench");

await page.getByRole("button", { name: /开始查寝/ }).click();
await waitScreen("check-screen");
await shot("11-check");
await page.getByRole("button", { name: /提交查寝/ }).click();
await waitScreen("check-result-screen");
await shot("12-check-result");
await page.getByRole("button", { name: /返回工作台/ }).click();
await waitScreen("mgr-workbench-screen");

await page.getByRole("button", { name: /待退宿确认/ }).click();
await waitScreen("checkout-screen");
await shot("27-checkout");
await page.getByRole("button", { name: /确认退宿/ }).first().click();
await waitScreen("checkout-result-screen");
await shot("28-checkout-result");
await page.getByRole("button", { name: /返回工作台/ }).last().click();
await waitScreen("mgr-workbench-screen");

await tabButton(/^工单/).click();
await waitScreen("orders-screen");
await shot("16-orders");
await page.locator('[data-testid="orders-screen"] .order-row').first().click();
await waitScreen("order-detail-screen");
await shot("17-order-detail");
await backButton().click();
await waitScreen("orders-screen");
await tabButton(/^我的/).click();
await waitScreen("mgr-profile-screen");
await shot("18-mgr-profile");

// ---- Maintenance (/maintenance) ----
await gotoRole("/maintenance");
await shot("20-mt-workbench");

await page.getByRole("button", { name: /去接单大厅/ }).click();
await waitScreen("mt-orders-screen");
await shot("21-mt-orders");
await page
  .locator('[data-testid="mt-orders-screen"]')
  .last()
  .locator(".order-row")
  .filter({ hasText: "待接单" })
  .first()
  .click();
await waitScreen("mt-order-detail-screen");
await shot("22-mt-order-detail");
await page.getByRole("button", { name: /立即接单/ }).click();
await waitScreen("mt-accept-success-screen");
await shot("23-mt-accept");
await page.getByRole("button", { name: /返回工单列表/ }).click();
await waitScreen("mt-orders-screen");

await page
  .locator('[data-testid="mt-orders-screen"]')
  .last()
  .locator(".order-row")
  .filter({ hasText: "处理中" })
  .first()
  .click();
await waitScreen("mt-order-detail-screen");
await page.getByRole("button", { name: /上报完工/ }).click();
await waitScreen("mt-finish-screen");
await shot("24-mt-finish");
await page.getByRole("button", { name: /确认完工/ }).click();
await waitScreen("mt-finish-success-screen");
await shot("25-mt-finish-success");
await page.getByRole("button", { name: /返回工单列表/ }).click();
await waitScreen("mt-orders-screen");

await tabButton(/^工作台/).click();
await waitScreen("mt-workbench-screen");
await page.getByRole("button", { name: /处理中工单/ }).last().click();
await waitScreen("mt-orders-screen");
console.log(
  "FILTER1",
  await page.locator('[data-testid="mt-orders-screen"]').last().locator(".filter-chip.selected").innerText(),
);
await tabButton(/^工作台/).click();
await waitScreen("mt-workbench-screen");
await page.getByRole("button", { name: /今日已完成/ }).last().click();
await waitScreen("mt-orders-screen");
console.log(
  "FILTER2",
  await page.locator('[data-testid="mt-orders-screen"]').last().locator(".filter-chip.selected").innerText(),
);
await tabButton(/^我的/).click();
await waitScreen("mt-profile-screen");
await shot("26-mt-profile");

// ---- Counselor (/counselor) ----
await gotoRole("/counselor");
await shot("31-counselor-workbench");
await page.getByRole("button", { name: /学生住宿/ }).click();
await waitScreen("counselor-students-screen");
await page.locator('[data-testid="counselor-students-screen"] .student-row').first().click();
await waitScreen("student-detail-screen");
await shot("32-student-detail");
await backButton().click();
await waitScreen("counselor-students-screen");
await tabButton(/^工作台/).click();
await waitScreen("counselor-workbench-screen");
await shot("31b-counselor-workbench-dynamic");

await tabButton(/^审批/).click();
await waitScreen("counselor-approvals-screen");
await shot("33-counselor-approvals");
await page.locator('[data-testid="counselor-approvals-screen"] .appr-row').first().click();
await waitScreen("approval-detail-screen");
await shot("34-approval-detail");
await page.getByRole("button", { name: /^通过/ }).click();
await waitScreen("approval-result-screen");
await shot("35-approval-result");
await page.getByRole("button", { name: /返回审批列表/ }).click();
await waitScreen("counselor-approvals-screen");

await tabButton(/^查寝/).click();
await waitScreen("counselor-check-screen");
await shot("36-counselor-check");
await page.locator('[data-testid="counselor-check-screen"] .order-row').first().click();
await waitScreen("check-detail-screen");
await shot("37-check-detail");
await backButton().click();
await waitScreen("counselor-check-screen");
await tabButton(/^我的/).click();
await waitScreen("counselor-profile-screen");
await shot("38-counselor-profile");

// ---- Admin (/admin) ----
await gotoRole("/admin");
await shot("39-admin-stats");

await page.getByRole("button", { name: /待分配学生/ }).click();
await waitScreen("admin-allocation-screen");
await shot("40-admin-allocation");
await page.getByRole("button", { name: /^分配$/ }).first().click();
await waitScreen("allocation-form-screen");
await shot("41-allocation-form");
await page.getByRole("button", { name: /确认分配/ }).click();
await waitScreen("allocation-result-screen");
await shot("42-allocation-result");
await page.getByRole("button", { name: /返回分配名单/ }).click();
await waitScreen("admin-allocation-screen");

await tabButton(/^楼栋/).click();
await waitScreen("admin-buildings-screen");
await shot("43-admin-buildings");
await page.locator('[data-testid="admin-buildings-screen"] .order-row').first().click();
await waitScreen("building-detail-screen");
await shot("44-building-detail");
await backButton().click();
await waitScreen("admin-buildings-screen");

await tabButton(/^账号/).click();
await waitScreen("admin-accounts-screen");
await shot("45-admin-accounts");
await tabButton(/^我的/).click();
await waitScreen("admin-profile-screen");
await shot("46-admin-profile");

// ---- Final sanity on student home ----
await gotoRole("/student");
await waitScreen("home-screen");
const homeText = await page.locator('[data-testid="home-screen"]').last().innerText();
console.log("HOME_TEXT_START");
console.log(homeText);
console.log("HOME_TEXT_END");
console.log("CONSOLE_ERRORS:", errors.length ? JSON.stringify(errors, null, 2) : "none");

await browser.close();
