# 🚀 AWS Amplify Deployment Guide for Smeedies Maritime

## Prerequisites
- AWS Account with Amplify access
- GitHub repository with the code
- Environment variables ready

## Step 1: Prepare the Repository

### 1.1 Commit All Changes
```bash
git add .
git commit -m "Prepare for AWS Amplify deployment"
git push origin main
```

### 1.2 Environment Variables
You'll need to set these in the Amplify Console:

**Required Environment Variables:**
```
DATABASE_URL=postgresql://neondb_owner:npg_98JvbgKpczea@ep-calm-dawn-adbvka0k-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
OPENAI_API_KEY=your-openai-api-key-here
SESSION_SECRET=smeedies-maritime-production-secret-key-2024
NODE_ENV=production
```

## Step 2: AWS Amplify Setup

### 2.1 Create New App
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Select the repository and branch (main)

### 2.2 Build Settings
Amplify will auto-detect the build settings, but verify:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Base directory**: `/` (root)

### 2.3 Environment Variables
In the Amplify Console:
1. Go to "Environment variables"
2. Add each variable from the list above
3. Make sure to mark sensitive variables as "Secure"

## Step 3: Build Configuration

### 3.1 Amplify.yml (Already Created)
The `amplify.yml` file is configured for:
- Installing dependencies with `npm ci`
- Building the application with `npm run build`
- Serving from the `dist` directory
- Caching node_modules and dist for faster builds

### 3.2 Package.json Scripts
Verify these scripts exist:
```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

## Step 4: Deployment Process

### 4.1 Initial Deployment
1. Click "Save and deploy" in Amplify Console
2. Monitor the build logs
3. Wait for deployment to complete

### 4.2 Verify Deployment
1. Check the provided Amplify URL
2. Test all pages:
   - Home page (3D globe animation)
   - Services page (accordion sliders)
   - Operations page (video backgrounds)
   - Warehousing page (accordion sliders)
   - Contact page (forms and chatbot)

### 4.3 Test Functionality
- ✅ Navigation works
- ✅ 3D models load
- ✅ Chatbot responds
- ✅ Forms submit
- ✅ Mobile responsiveness
- ✅ Video backgrounds play

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain (e.g., smeediesmaritime.com)
4. Follow DNS configuration instructions

### 5.2 SSL Certificate
- Amplify automatically provisions SSL certificates
- HTTPS will be enabled by default

## Step 6: Monitoring and Maintenance

### 6.1 Build Monitoring
- Monitor build logs for any errors
- Set up notifications for failed builds
- Review deployment history

### 6.2 Performance Monitoring
- Use AWS CloudWatch for monitoring
- Monitor application performance
- Set up alerts for errors

### 6.3 Database Monitoring
- Monitor NeonDB connection
- Check database performance
- Review query logs

## Step 7: Security Considerations

### 7.1 Environment Variables
- Never commit sensitive data to git
- Use Amplify environment variables
- Rotate API keys regularly

### 7.2 HTTPS
- Ensure all traffic uses HTTPS
- Check SSL certificate validity
- Monitor security headers

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Amplify Console
   - Verify all dependencies are in package.json
   - Check environment variables

2. **Runtime Errors**
   - Check application logs
   - Verify database connectivity
   - Check API key validity

3. **Performance Issues**
   - Monitor bundle size
   - Optimize images and assets
   - Check CDN configuration

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] 3D models render properly
- [ ] Chatbot functionality works
- [ ] Forms submit successfully
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Support and Maintenance

- Regular updates to dependencies
- Monitor security advisories
- Backup database regularly
- Review and update environment variables
- Monitor application performance
- Update SSL certificates as needed

---

**Deployment URL**: Will be provided after successful deployment
**Custom Domain**: Configure after initial deployment
**SSL Status**: Automatically enabled by Amplify
