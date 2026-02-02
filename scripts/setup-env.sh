#!/bin/bash
# Quick Environment Variables Setup for Vercel

set -e

echo "======================================"
echo "Setting up Vercel Environment Variables"
echo "======================================"
echo ""

# Get domain from user
read -p "Enter your Vercel domain (e.g., goodmolt.vercel.app): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "[ERROR] Domain cannot be empty"
    exit 1
fi

REDIRECT_URI="https://${DOMAIN}/api/auth/google"

echo ""
echo "Setting environment variables for production..."
echo ""

# DATABASE_URL
echo "[1/7] Setting DATABASE_URL..."
echo "postgresql://goodmolt:Gmolt400%230@pgm-bp12d0030w66nkz8to.pg.rds.aliyuncs.com:5432/goodmolt" | vercel env add DATABASE_URL production

# GOOGLE_CLIENT_ID
echo "[2/7] Setting GOOGLE_CLIENT_ID..."
echo "149801989169-74kvjd5pjqra47rdui2gl0sh9mf9kjvr.apps.googleusercontent.com" | vercel env add GOOGLE_CLIENT_ID production

# GOOGLE_CLIENT_SECRET
echo "[3/7] Setting GOOGLE_CLIENT_SECRET..."
echo "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" | vercel env add GOOGLE_CLIENT_SECRET production

# GOOGLE_REDIRECT_URI
echo "[4/7] Setting GOOGLE_REDIRECT_URI to ${REDIRECT_URI}..."
echo "${REDIRECT_URI}" | vercel env add GOOGLE_REDIRECT_URI production

# SESSION_SECRET
echo "[5/7] Setting SESSION_SECRET..."
echo "BGl70Yw6d1RuYgjn5wHIHvEXISJyTk9IPmts0mJEdDM=" | vercel env add SESSION_SECRET production

# NEXT_PUBLIC_API_URL
echo "[6/7] Setting NEXT_PUBLIC_API_URL..."
echo "https://www.moltbook.com/api/v1" | vercel env add NEXT_PUBLIC_API_URL production

# ENABLE_DEV_LOGIN
echo "[7/7] Setting ENABLE_DEV_LOGIN..."
echo "false" | vercel env add ENABLE_DEV_LOGIN production

echo ""
echo "======================================"
echo "Environment variables configured!"
echo "======================================"
echo ""
echo "IMPORTANT: Update Google OAuth settings:"
echo "1. Go to: https://console.cloud.google.com/apis/credentials"
echo "2. Add authorized redirect URI: ${REDIRECT_URI}"
echo ""
echo "Then run: npm run deploy"
echo "======================================"
