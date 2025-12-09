# Deploying Retail Sales Management

This project is configured for easy deployment on **Render.com**.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host the repository.
2.  **Render Account**: Sign up at [dashboard.render.com](https://dashboard.render.com/).
3.  **Git LFS**: Since your data file is >100MB, you **MUST** use Git LFS.

## Step 1: Setup Git and LFS

Run these commands in your terminal (at the project root):

```bash
# Initialize git if not already done
git init

# Install Git LFS (if you haven't installed it on your system yet, download it from git-lfs.com)
git lfs install

# Track the large CSV file
git lfs track "backend/data/*.csv"

# Add all files
git add .
git commit -m "Initial commit with Docker and Render config"
```

## Step 2: Push to GitHub

1.  Create a **new repository** on GitHub (e.g., `retail-sales-app`).
2.  Link your local folder to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/retail-sales-app.git
git branch -M main
git push -u origin main
```

*Note: The upload might take a moment due to the 235MB CSV file.*

## Step 3: Deploy on Render

1.  Go to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your GitHub account and select the `retail-sales-app` repository.
4.  Render will automatically detect the `render.yaml` file.
5.  Click **Apply**.

Render will now:
1.  Build the Backend Docker image (including your CSV).
2.  Build the Frontend Docker image.
3.  Link them together automatically.

## Success!
Once finished, Render will provide a URL for your frontend (e.g., `sales-frontend-xyz.onrender.com`). Click it to see your live app!
