const { chromium } = require('playwright');

(async () => {
  console.log('=== OAuth Flow Diagnostic with Playwright ===\n');

  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  try {
    console.log('[1/6] Navigating to welcome page...');
    await page.goto('https://goodmolt.vercel.app/welcome', { waitUntil: 'networkidle' });
    console.log('✓ Welcome page loaded');
    console.log('URL:', page.url());
    await page.screenshot({ path: 'debug-1-welcome.png' });

    console.log('\n[2/6] Checking cookies before login...');
    const cookiesBefore = await context.cookies();
    console.log('Cookies before login:', cookiesBefore.length);
    cookiesBefore.forEach(c => console.log(`  - ${c.name}: ${c.value.substring(0, 20)}...`));

    console.log('\n[3/6] Checking if dev-login button is visible...');
    const devLoginVisible = await page.locator('button:has-text("Dev Login")').isVisible().catch(() => false);
    console.log('Dev login button visible:', devLoginVisible);
    if (devLoginVisible) {
      console.log('⚠️  WARNING: Dev login should NOT be visible in production!');
    }

    console.log('\n[4/6] Testing /api/auth/session without cookie...');
    const sessionCheck = await page.evaluate(async () => {
      const res = await fetch('/api/auth/session', { credentials: 'include' });
      return { status: res.status, body: await res.text() };
    });
    console.log('Session API response:', sessionCheck.status);
    console.log('Response body:', sessionCheck.body);

    console.log('\n[5/6] Simulating Google OAuth callback...');
    // Simulate a fake OAuth callback to see what happens
    const fakeCode = 'test_fake_code_123';
    await page.goto(`https://goodmolt.vercel.app/welcome?code=${fakeCode}&state=test`, { waitUntil: 'networkidle' });

    // Wait a bit to see redirects
    await page.waitForTimeout(3000);

    console.log('Current URL after fake callback:', page.url());
    await page.screenshot({ path: 'debug-2-after-fake-callback.png' });

    console.log('\n[6/6] Checking network requests...');
    // Listen to all network requests
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('goodmolt.vercel.app')) {
        requests.push({
          url: request.url(),
          method: request.method(),
        });
      }
    });

    page.on('response', async response => {
      if (response.url().includes('/api/auth/')) {
        console.log(`\nAPI Response: ${response.url()}`);
        console.log(`Status: ${response.status()}`);
        const headers = response.headers();
        if (headers['set-cookie']) {
          console.log(`Set-Cookie: ${headers['set-cookie']}`);
        }
        try {
          const body = await response.text();
          console.log(`Body: ${body.substring(0, 200)}...`);
        } catch (e) {
          // Ignore
        }
      }
    });

    // Try clicking Google login button
    console.log('\n[BONUS] Testing Google OAuth redirect...');
    const googleButton = page.locator('button:has-text("Continue with Google")');
    if (await googleButton.isVisible()) {
      const [popup] = await Promise.all([
        page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
        googleButton.click().catch(() => null)
      ]);

      if (popup) {
        console.log('OAuth popup opened:', popup.url());
        await popup.screenshot({ path: 'debug-3-oauth-popup.png' });
        await popup.close();
      } else {
        // No popup, check if redirected
        await page.waitForTimeout(2000);
        console.log('Redirected to:', page.url());
      }
    }

    console.log('\n[7/6] Final cookie check...');
    const cookiesAfter = await context.cookies();
    console.log('Cookies after test:', cookiesAfter.length);
    cookiesAfter.forEach(c => console.log(`  - ${c.name}: ${c.value.substring(0, 20)}...`));

    await page.screenshot({ path: 'debug-final.png' });

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    await page.screenshot({ path: 'debug-error.png' });
  } finally {
    console.log('\n=== Diagnostic Complete ===');
    console.log('Screenshots saved: debug-*.png');
    await browser.close();
  }
})();
