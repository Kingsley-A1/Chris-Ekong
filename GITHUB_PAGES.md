# GitHub Pages Deployment Guide

This website is configured for automatic deployment to GitHub Pages.

## Setup Instructions

1. **Enable GitHub Pages in Repository Settings:**
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source:** Select "GitHub Actions"
   - Save the settings

2. **Automatic Deployment:**
   - Every push to the `main` branch will automatically deploy to GitHub Pages
   - The workflow file is located at `.github/workflows/deploy-pages.yml`

3. **Manual Deployment:**
   - Go to **Actions** tab in the repository
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow" button

4. **View Your Site:**
   - After deployment completes, your site will be live at:
   - `https://<username>.github.io/<repository-name>/`
   - Example: `https://kingsley-a1.github.io/Chris-Ekong/`

## Merge This PR

Once this PR is merged to the `main` branch, GitHub Pages will automatically deploy the site.

## Notes

- First deployment may take 2-3 minutes
- Subsequent deployments are faster (typically under 1 minute)
- Check the **Actions** tab for deployment status
- All static files (HTML, CSS, JS, images) are deployed as-is
