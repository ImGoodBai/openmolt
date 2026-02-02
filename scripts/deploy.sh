#!/bin/bash
# Vercel Deployment Script with Environment Setup

set -e

echo "======================================"
echo "Goodmolt Vercel Deployment Script"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "[ERROR] Vercel CLI not installed"
    echo "Install with: npm install -g vercel"
    exit 1
fi

echo "[1/6] Checking Vercel authentication..."
vercel whoami || {
    echo "[INFO] Not logged in. Running vercel login..."
    vercel login
}

echo ""
echo "[2/6] Generate Prisma client..."
npx prisma generate

echo ""
echo "[3/6] Running type check..."
npm run type-check || {
    echo "[WARN] Type check failed, but continuing..."
}

echo ""
echo "[4/6] Building locally to verify..."
npm run build || {
    echo "[ERROR] Build failed. Fix errors before deploying."
    exit 1
}

echo ""
echo "[5/6] Deploying to Vercel..."
echo "[INFO] First deployment? Follow prompts to configure project."
vercel --prod

echo ""
echo "[6/6] Deployment complete!"
echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo "1. Get your Vercel URL from output above"
echo "2. Update GOOGLE_REDIRECT_URI in Vercel dashboard:"
echo "   vercel env add GOOGLE_REDIRECT_URI production"
echo "   Value: https://YOUR_DOMAIN/api/auth/google"
echo ""
echo "3. Update Google Cloud Console:"
echo "   - Add redirect URI: https://YOUR_DOMAIN/api/auth/google"
echo ""
echo "4. Test your deployment:"
echo "   - Visit https://YOUR_DOMAIN"
echo "   - Try Google login"
echo "======================================"
