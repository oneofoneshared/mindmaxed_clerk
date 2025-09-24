# Clerk Authentication Troubleshooting

## Error: redirect_uri_mismatch

This error occurs when the Clerk configuration doesn't match your deployed domain.

### Steps to Fix:

1. **Go to your Clerk Dashboard** (https://dashboard.clerk.com/)

2. **Select your application**

3. **Navigate to "Domains"** in the left sidebar

4. **Add your production domain**:
   - Add your Vercel domain (e.g., `your-app.vercel.app`)
   - Add any custom domains you're using

5. **Check Redirect URIs**:
   - Go to "Authentication" → "Social Connections" (if using social login)
   - Ensure redirect URIs include:
     - `https://your-domain.vercel.app/api/auth/callback/clerk`
     - `https://your-domain.vercel.app`

6. **Verify Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Ensure these are set correctly:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `CLERK_WEBHOOK_SECRET` (if using webhooks)

7. **Check for Development vs Production Keys**:
   - Make sure you're using production keys for production deployment
   - Development keys (pk_test_...) should only be used locally

### Common Issues:

- **Mixed environments**: Using test keys in production
- **Missing domain**: Production domain not added to Clerk dashboard
- **Incorrect redirect URIs**: Social login providers not configured for production domain
- **Environment variables**: Missing or incorrect environment variables in Vercel

### Testing:

After making changes:
1. Redeploy your Vercel application
2. Clear browser cache/cookies
3. Try signing in again

### Need Help?

If the issue persists:
1. Check Clerk dashboard logs for more details
2. Verify all environment variables match between local and production
3. Contact Clerk support with your application ID
