# Vercel Deployment Guide

## Prerequisites

1. Vercel account
2. PostgreSQL database (current: Aliyun RDS)
3. Google OAuth credentials

## Step 1: Update Google OAuth Redirect URI

Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

1. Select your project
2. Go to **Credentials** > **OAuth 2.0 Client IDs**
3. Add authorized redirect URI:
   - `https://YOUR_VERCEL_DOMAIN/api/auth/google`
   - Example: `https://goodmolt.vercel.app/api/auth/google`

## Step 2: Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

## Step 3: Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? goodmolt
# - Which directory? ./
# - Override settings? No
```

## Step 4: Configure Environment Variables

Run this command to set all environment variables:

```bash
# Set DATABASE_URL
vercel env add DATABASE_URL production
# Paste: postgresql://goodmolt:Gmolt400%230@pgm-bp12d0030w66nkz8to.pg.rds.aliyuncs.com:5432/goodmolt

# Set GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_ID production
# Paste: 149801989169-74kvjd5pjqra47rdui2gl0sh9mf9kjvr.apps.googleusercontent.com

# Set GOOGLE_CLIENT_SECRET
vercel env add GOOGLE_CLIENT_SECRET production
# Paste: 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

# Set GOOGLE_REDIRECT_URI (replace with your actual domain)
vercel env add GOOGLE_REDIRECT_URI production
# Paste: https://YOUR_VERCEL_DOMAIN/api/auth/google

# Set SESSION_SECRET
vercel env add SESSION_SECRET production
# Paste: BGl70Yw6d1RuYgjn5wHIHvEXISJyTk9IPmts0mJEdDM=

# Set NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_API_URL production
# Paste: https://www.moltbook.com/api/v1

# Set ENABLE_DEV_LOGIN (production should be false)
vercel env add ENABLE_DEV_LOGIN production
# Paste: false
```

## Step 5: Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables if not exist)
npx prisma db push
```

## Step 6: Deploy to Production

```bash
# Deploy to production
vercel --prod
```

## Step 7: Verify Deployment

1. Visit your Vercel URL: `https://YOUR_VERCEL_DOMAIN`
2. Test Google login flow
3. Create/import test account
4. Verify main app functionality

## Quick Redeploy

After initial setup, just run:

```bash
vercel --prod
```

## Useful Commands

```bash
# View logs
vercel logs YOUR_DEPLOYMENT_URL

# List projects
vercel ls

# Check environment variables
vercel env ls

# Remove project
vercel rm goodmolt
```

## Troubleshooting

### Database connection fails
- Check DATABASE_URL is correct
- Verify RDS allows connections from Vercel IPs
- Test connection: `npx prisma db push`

### Google OAuth fails
- Verify GOOGLE_REDIRECT_URI matches your Vercel domain
- Check redirect URI is added in Google Cloud Console
- Ensure domain is HTTPS

### Session issues
- Verify SESSION_SECRET is set
- Check cookies are working (secure flag in production)

## Domain Configuration (Optional)

To use custom domain:

1. Go to Vercel dashboard > Your project > Settings > Domains
2. Add your custom domain
3. Update GOOGLE_REDIRECT_URI to use custom domain
4. Update Google OAuth authorized redirect URIs
