#!/bin/bash
# OAuth Flow Diagnostic Script

echo "========================================="
echo "Google OAuth Flow Diagnostic"
echo "========================================="
echo ""

BASE_URL="https://goodmolt.vercel.app"

echo "[1/5] Testing welcome page access..."
WELCOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/welcome")
echo "Welcome page status: $WELCOME_STATUS"
if [ "$WELCOME_STATUS" != "200" ]; then
    echo "ERROR: Welcome page not accessible"
fi
echo ""

echo "[2/5] Testing Google OAuth redirect..."
OAUTH_REDIRECT=$(curl -s -L -o /dev/null -w "%{url_effective}" "$BASE_URL/api/auth/google")
echo "OAuth redirect URL: $OAUTH_REDIRECT"
if [[ "$OAUTH_REDIRECT" != *"accounts.google.com"* ]]; then
    echo "ERROR: OAuth redirect not working"
fi
echo ""

echo "[3/5] Testing dev-login feature detection..."
DEV_HEAD=$(curl -s -o /dev/null -w "%{http_code}" -X HEAD "$BASE_URL/api/auth/dev-login")
echo "Dev-login HEAD status: $DEV_HEAD"
if [ "$DEV_HEAD" = "403" ]; then
    echo "GOOD: Dev login disabled in production"
else
    echo "WARNING: Dev login may be enabled (expected 403, got $DEV_HEAD)"
fi
echo ""

echo "[4/5] Testing session verification endpoint..."
SESSION_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/auth/session")
echo "Session check status (no cookie): $SESSION_STATUS"
if [ "$SESSION_STATUS" = "401" ]; then
    echo "GOOD: Session endpoint correctly returns 401"
else
    echo "WARNING: Expected 401, got $SESSION_STATUS"
fi
echo ""

echo "[5/5] Testing middleware redirect..."
ROOT_REDIRECT=$(curl -s -I "$BASE_URL/" | grep -i location | head -1)
echo "Root redirect: $ROOT_REDIRECT"
if [[ "$ROOT_REDIRECT" == *"/welcome"* ]]; then
    echo "GOOD: Middleware redirects to welcome"
else
    echo "WARNING: Unexpected redirect behavior"
fi
echo ""

echo "========================================="
echo "Diagnostic Complete"
echo "========================================="
