const { chromium } = require('playwright');

(async () => {
  console.log('=== Manual Google OAuth Test ===\n');
  console.log('This test will:');
  console.log('1. Open browser to welcome page');
  console.log('2. Click Google login');
  console.log('3. Wait for YOU to complete login manually');
  console.log('4. Capture the result\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture API errors
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/auth/google') && response.request().method() === 'POST') {
      console.log(`\n[OAuth Callback] ${url}`);
      console.log(`Status: ${response.status()}`);

      if (response.status() >= 400) {
        try {
          const body = await response.json();
          console.log('Error Response:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('Unable to parse error response');
        }
      } else {
        console.log('✓ OAuth callback successful');
      }
    }
  });

  try {
    console.log('[Step 1] Navigate to welcome page...');
    await page.goto('https://goodmolt.vercel.app/welcome');
    await page.waitForLoadState('networkidle');
    console.log('✓ Welcome page loaded\n');

    console.log('[Step 2] Clicking Google login button...');
    await page.locator('button:has-text("Continue with Google")').click();
    console.log('✓ Redirecting to Google...\n');

    console.log('===============================================');
    console.log('>>> PLEASE COMPLETE GOOGLE LOGIN IN BROWSER <<<');
    console.log('===============================================\n');
    console.log('Waiting up to 3 minutes for you to login...\n');

    // Wait for dashboard or welcome (loop detection)
    const result = await Promise.race([
      page.waitForURL('**/dashboard', { timeout: 180000 })
        .then(() => 'dashboard'),
      page.waitForURL('**/welcome?*', { timeout: 180000 })
        .then(() => 'welcome-loop'),
    ]).catch(() => 'timeout');

    console.log('\n===============================================');
    if (result === 'dashboard') {
      console.log('✅ SUCCESS! Redirected to dashboard');

      // Check cookies
      const cookies = await context.cookies();
      const sessionCookie = cookies.find(c => c.name === 'session');

      if (sessionCookie) {
        console.log('✅ Session cookie is set');
        console.log(`   Domain: ${sessionCookie.domain}`);
        console.log(`   HttpOnly: ${sessionCookie.httpOnly}`);
        console.log(`   Secure: ${sessionCookie.secure}`);
      } else {
        console.log('❌ WARNING: No session cookie found!');
        console.log('All cookies:', cookies.map(c => c.name).join(', '));
      }

      await page.screenshot({ path: 'oauth-success.png' });

    } else if (result === 'welcome-loop') {
      console.log('❌ FAILED: Loop detected - redirected back to welcome');
      console.log(`Current URL: ${page.url()}`);

      const cookies = await context.cookies();
      console.log(`\nCookies count: ${cookies.length}`);
      const sessionCookie = cookies.find(c => c.name === 'session');

      if (sessionCookie) {
        console.log('Session cookie EXISTS but redirect failed');
      } else {
        console.log('Session cookie NOT SET - this is the problem');
      }

      await page.screenshot({ path: 'oauth-loop.png' });

    } else {
      console.log('❌ TIMEOUT: No redirect after 3 minutes');
      console.log(`Current URL: ${page.url()}`);
      await page.screenshot({ path: 'oauth-timeout.png' });
    }
    console.log('===============================================\n');

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    await page.screenshot({ path: 'oauth-error.png' });
  }

  console.log('Keeping browser open for 10 seconds...');
  await page.waitForTimeout(10000);
  await browser.close();

  console.log('\n=== Test Complete ===');
})();
