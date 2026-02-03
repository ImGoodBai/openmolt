const { chromium } = require('playwright');

(async () => {
  console.log('=== Real Google OAuth Test ===\n');

  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture all console logs
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      console.log(`[BROWSER ${type.toUpperCase()}]:`, msg.text());
    }
  });

  // Capture network errors
  page.on('response', async response => {
    if (response.status() >= 400 && response.url().includes('/api/auth/')) {
      console.log(`\n❌ API Error: ${response.url()}`);
      console.log(`Status: ${response.status()}`);
      try {
        const contentType = response.headers()['content-type'];
        if (contentType && contentType.includes('application/json')) {
          const body = await response.json();
          console.log(`Response body:`, JSON.stringify(body, null, 2));
        } else {
          const text = await response.text().catch(() => 'Unable to read response body');
          console.log(`Response text:`, text);
        }
      } catch (e) {
        console.log(`Unable to read response: ${e.message}`);
      }
    }
  });

  try {
    console.log('Step 1: Navigate to welcome page');
    await page.goto('https://goodmolt.vercel.app/welcome', { waitUntil: 'networkidle' });

    console.log('\nStep 2: Click Google login button');
    console.log('⏳ Please complete Google OAuth in the browser window...');
    console.log('(Script will wait for redirect to /dashboard or error)');

    await page.locator('button:has-text("Continue with Google")').click();

    // Wait for either dashboard redirect or error
    try {
      await Promise.race([
        page.waitForURL('**/dashboard', { timeout: 60000 }),
        page.waitForURL('**/welcome**', { timeout: 60000 }),
      ]);

      const finalUrl = page.url();
      console.log('\n✅ OAuth flow completed');
      console.log('Final URL:', finalUrl);

      if (finalUrl.includes('/dashboard')) {
        console.log('✅ SUCCESS: Redirected to dashboard!');

        // Check cookies
        const cookies = await context.cookies();
        const sessionCookie = cookies.find(c => c.name === 'session');
        if (sessionCookie) {
          console.log('✅ Session cookie set:', sessionCookie.name);
        } else {
          console.log('❌ No session cookie found');
        }
      } else {
        console.log('❌ FAILED: Still on welcome page');
      }

      await page.screenshot({ path: 'oauth-final-result.png' });

    } catch (timeoutError) {
      console.log('\n⏱️  Timeout waiting for redirect');
      console.log('Current URL:', page.url());
      await page.screenshot({ path: 'oauth-timeout.png' });
    }

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    await page.screenshot({ path: 'oauth-error.png' });
  } finally {
    console.log('\n=== Test Complete ===');
    console.log('Press Ctrl+C to close browser');
    // Keep browser open for inspection
    await page.waitForTimeout(300000);
    await browser.close();
  }
})();
