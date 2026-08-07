import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = process.env.PORTFOLIO_ROOT;
if (!root) throw new Error('PORTFOLIO_ROOT is required.');

const outDir = path.join(root, 'projects', 'my-fit-ideas', 'media', 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

for (const entry of fs.readdirSync(outDir)) {
  if (entry.toLowerCase().endsWith('.png')) {
    fs.unlinkSync(path.join(outDir, entry));
  }
}

const today = new Date().toISOString().slice(0, 10);
const todayLoggedAt = `${today}T22:00:00.000Z`;

const profile = {
  id: 'portfolio-demo-user',
  email: 'demo@example.com',
  firstName: 'James',
  lastName: 'Arnold',
  heightCm: 187.96,
  preferredWeightUnit: 'lb',
  preferredHydrationUnit: 'oz',
  dailyHydrationGoal: 64,
  targetWeight: 210,
  createdAt: '2026-07-01T12:00:00.000Z',
  updatedAt: '2026-07-15T12:00:00.000Z'
};

const measurements = [
  { id: 'm1', weight: 228, waist: 43, chest: 45, hips: 42, bodyFat: 28.0, measurementDate: '2026-07-11T12:00:00.000Z' },
  { id: 'm2', weight: 227, waist: 42, chest: 44, hips: 41, bodyFat: 27.5, measurementDate: '2026-07-12T12:00:00.000Z' },
  { id: 'm3', weight: 228, waist: 42, chest: 44, hips: 41, bodyFat: 28.0, measurementDate: '2026-07-13T12:00:00.000Z' },
  { id: 'm4', weight: 240, waist: 41, chest: 44, hips: 40, bodyFat: 28.8, measurementDate: '2026-07-14T12:00:00.000Z' },
  { id: 'm5', weight: 241, waist: 42, chest: 45, hips: 41, bodyFat: 30.0, measurementDate: '2026-07-15T12:00:00.000Z' }
];

const hydration = [
  {
    id: 'h1', userId: profile.id, amount: 16, unit: 'oz', loggedAt: todayLoggedAt,
    createdAt: todayLoggedAt, updatedAt: todayLoggedAt
  },
  {
    id: 'h2', userId: profile.id, amount: 12, unit: 'oz', loggedAt: '2026-07-13T16:00:00.000Z',
    createdAt: '2026-07-13T16:00:00.000Z', updatedAt: '2026-07-13T16:00:00.000Z'
  },
  {
    id: 'h3', userId: profile.id, amount: 20, unit: 'oz', loggedAt: '2026-07-14T18:00:00.000Z',
    createdAt: '2026-07-14T18:00:00.000Z', updatedAt: '2026-07-14T18:00:00.000Z'
  }
];

const dashboard = {
  currentWeight: 241,
  previousWeight: 240,
  weightDifference: 1,
  bmi: 31.3,
  bmiCategory: 'Obesity',
  todayWaterOz: 16,
  todayWaterMl: 473,
  lastMeasurementDate: '2026-07-15T12:00:00.000Z',
  preferredWeightUnit: 'lb',
  preferredHydrationUnit: 'oz',
  dailyHydrationGoal: 64,
  targetWeight: 210
};

function json(body, status = 200) {
  return {
    status,
    contentType: 'application/json',
    headers: { 'Cache-Control': 'no-store' },
    body: JSON.stringify(body)
  };
}

async function installMockApi(page) {
  await page.route('**/mock-api/**', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const apiPath = url.pathname.replace(/^\/mock-api/, '');
    const method = request.method();

    if (apiPath === '/api/dashboard' && method === 'GET') {
      return route.fulfill(json(dashboard));
    }
    if (apiPath === '/api/measurements' && method === 'GET') {
      return route.fulfill(json({ measurements }));
    }
    if (apiPath === '/api/hydration/daily-total' && method === 'GET') {
      return route.fulfill(json({
        date: url.searchParams.get('date') ?? today,
        totalMl: 473.176,
        totalOz: 16,
        entries: [hydration[0]]
      }));
    }
    if (apiPath === '/api/hydration' && method === 'GET') {
      return route.fulfill(json({ hydration }));
    }
    if (apiPath === '/api/profile' && method === 'GET') {
      return route.fulfill(json({ profile }));
    }
    if (apiPath === '/api/auth/login' && method === 'POST') {
      return route.fulfill(json({
        message: 'Login successful',
        token: 'portfolio-demo-token',
        user: profile
      }));
    }

    return route.fulfill(json({ message: 'Portfolio demonstration response' }));
  });
}

const browser = await chromium.launch();
const base = 'http://127.0.0.1:5173';

const publicContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const loginPage = await publicContext.newPage();
await installMockApi(loginPage);
await loginPage.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
await loginPage.locator('#email').fill('demo@example.com');
await loginPage.locator('#password').fill('');
await loginPage.getByRole('button', { name: 'Sign In' }).waitFor();
await loginPage.screenshot({ path: path.join(outDir, 'login.png'), fullPage: true });
await publicContext.close();

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await context.addInitScript(() => {
  localStorage.setItem('authToken', 'portfolio-demo-token');
  localStorage.setItem('currentUser', JSON.stringify({ firstName: 'James', email: 'demo@example.com' }));
  localStorage.setItem('hydrationGoalOz', '64');
});
const page = await context.newPage();
await installMockApi(page);

async function capture(urlPath, filename, requiredText, extraWait = 600) {
  await page.goto(`${base}${urlPath}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(text => document.body.innerText.includes(text), requiredText);
  await page.waitForTimeout(extraWait);
  await page.screenshot({ path: path.join(outDir, filename), fullPage: true });
}

await capture('/dashboard', 'dashboard.png', 'Current Weight');
await capture('/hydration', 'hydration.png', 'Hydration Tracking');
await capture('/progress', 'progress-charts.png', 'Progress Charts', 1500);

await context.close();
await browser.close();

console.log(`Captured ${fs.readdirSync(outDir).filter(name => name.endsWith('.png')).length} screenshots.`);
