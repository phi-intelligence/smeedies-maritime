# ✅ AWS Amplify Deployment Checklist

## Pre-Deployment Preparation

### 1. Code Preparation
- [x] All mobile responsiveness fixes implemented
- [x] Environment variables documented
- [x] Build configuration verified
- [x] Amplify.yml created
- [x] .amplifyrc created
- [ ] All changes committed to git
- [ ] Repository pushed to GitHub

### 2. Environment Variables Required
```
DATABASE_URL=postgresql://neondb_owner:npg_98JvbgKpczea@ep-calm-dawn-adbvka0k-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
OPENAI_API_KEY=your-openai-api-key-here
SESSION_SECRET=smeedies-maritime-production-secret-key-2024
NODE_ENV=production
```

## AWS Amplify Console Setup

### 3. Create New App
- [ ] Go to AWS Amplify Console
- [ ] Click "New app" → "Host web app"
- [ ] Connect GitHub repository
- [ ] Select repository: SeaRouteConnect
- [ ] Select branch: main

### 4. Build Settings
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Base directory: `/`
- [ ] Node.js version: 18.x or 20.x

### 5. Environment Variables
- [ ] Add DATABASE_URL (mark as secure)
- [ ] Add OPENAI_API_KEY (mark as secure)
- [ ] Add SESSION_SECRET (mark as secure)
- [ ] Add NODE_ENV=production

### 6. Advanced Settings
- [ ] Enable auto-deployment on git push
- [ ] Configure build notifications (optional)
- [ ] Set up custom headers if needed

## Deployment Process

### 7. Initial Deployment
- [ ] Click "Save and deploy"
- [ ] Monitor build logs
- [ ] Wait for deployment completion
- [ ] Note the Amplify URL

### 8. Verification Tests
- [ ] Home page loads with 3D globe
- [ ] Navigation works between pages
- [ ] Services page accordion sliders function
- [ ] Operations page video backgrounds play
- [ ] Warehousing page displays correctly
- [ ] Contact page forms work
- [ ] Chatbot responds to messages
- [ ] Mobile responsiveness verified
- [ ] All animations and transitions work

## Post-Deployment Configuration

### 9. Custom Domain (Optional)
- [ ] Add custom domain in Amplify Console
- [ ] Configure DNS records
- [ ] Wait for SSL certificate provisioning
- [ ] Test custom domain access

### 10. Security & Performance
- [ ] Verify HTTPS is enabled
- [ ] Check SSL certificate validity
- [ ] Monitor application performance
- [ ] Set up CloudWatch monitoring (optional)

### 11. Final Testing
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test chatbot functionality
- [ ] Test form submissions
- [ ] Verify database connectivity
- [ ] Check error handling

## Monitoring & Maintenance

### 12. Ongoing Tasks
- [ ] Monitor build logs for errors
- [ ] Review application performance
- [ ] Update dependencies regularly
- [ ] Backup database data
- [ ] Monitor security advisories
- [ ] Review and rotate API keys

## Troubleshooting Common Issues

### Build Failures
- Check build logs in Amplify Console
- Verify all dependencies in package.json
- Check environment variables are set
- Verify Node.js version compatibility

### Runtime Errors
- Check application logs in CloudWatch
- Verify database connectivity
- Check API key validity
- Test environment variables

### Performance Issues
- Monitor bundle size
- Optimize images and assets
- Check CDN configuration
- Review database query performance

---

## Deployment URLs
- **Amplify URL**: [Will be provided after deployment]
- **Custom Domain**: [Configure if needed]
- **SSL Status**: Automatically enabled

## Contact Information
- **Project**: Smeedies Maritime Website
- **Technology**: React + Node.js + NeonDB
- **Hosting**: AWS Amplify
- **Last Updated**: [Date of deployment]
