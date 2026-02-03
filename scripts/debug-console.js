// OAuth Debug Helper - Paste this in browser console on https://goodmolt.vercel.app
console.log('=== OAuth Debug Info ===');
console.log('Current URL:', window.location.href);
console.log('Has code param:', new URLSearchParams(window.location.search).has('code'));
console.log('Cookies:', document.cookie);
console.log('LocalStorage:', Object.keys(localStorage));

// Test session endpoint
fetch('/api/auth/session', { credentials: 'include' })
  .then(r => r.json())
  .then(data => console.log('Session API:', data))
  .catch(e => console.error('Session API error:', e));

// Test dev-login HEAD
fetch('/api/auth/dev-login', { method: 'HEAD' })
  .then(r => console.log('Dev-login status:', r.status))
  .catch(e => console.error('Dev-login error:', e));
