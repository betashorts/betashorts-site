# 🔒 Secure Admin Panel Setup Guide

This guide shows you how to set up the admin panel with **maximum security** using GitHub Secrets and Actions, so your Google Apps Script endpoint is never exposed in the frontend.

## 🛡️ Security Benefits

- ✅ **No exposed API endpoints** in frontend code
- ✅ **GitHub Secrets** protect sensitive tokens
- ✅ **GitHub Actions** handle all API calls securely
- ✅ **Audit trail** of all content changes via GitHub issues
- ✅ **Rate limiting** and abuse protection built-in

## 📋 Setup Steps

### Step 1: Create GitHub Secrets

1. Go to your repository: `https://github.com/betashorts/betashorts-site`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these secrets:

#### **Secret 1: `GOOGLE_APPS_SCRIPT_URL`**

- **Name:** `GOOGLE_APPS_SCRIPT_URL`
- **Value:** Your Google Apps Script web app URL (e.g., `https://script.google.com/macros/s/AKfycbz.../exec`)

#### **Secret 2: `ADMIN_SECRET_KEY`**

- **Name:** `ADMIN_SECRET_KEY`
- **Value:** A secure random string (e.g., `betashorts-admin-2025-secure-key`)

#### **Secret 3: `GITHUB_TOKEN`** (Optional - for enhanced permissions)

- **Name:** `GITHUB_TOKEN`
- **Value:** A GitHub Personal Access Token with `repo` permissions

### Step 2: Create GitHub Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name: `BetaShorts Admin Panel`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (optional, for triggering GitHub Actions)
5. Click **"Generate token"**
6. **Copy the token** - you'll need it for the admin panel

### Step 3: Set Up Google Apps Script

1. Follow the guide in `GOOGLE_APPS_SCRIPT_SETUP.md`
2. **Important:** Update the secret key in your script to match `ADMIN_SECRET_KEY`
3. Deploy as web app and copy the URL
4. Add the URL to GitHub Secrets as `GOOGLE_APPS_SCRIPT_URL`

### Step 4: Configure GitHub Actions

The workflow file `.github/workflows/admin-publish.yml` is already created. It will:

1. **Trigger** when an issue with `[ADMIN-PUBLISH]` in the title is created
2. **Extract** YAML content from the issue body
3. **Call** your Google Apps Script securely using GitHub Secrets
4. **Close** the issue with a success/failure message

### Step 5: Test the Setup

1. Go to your admin panel: `https://betashorts.com/admin.html`
2. Make a small change to any content
3. Click **"🚀 Publish to GitHub"**
4. Enter your GitHub Personal Access Token when prompted
5. Check that a GitHub issue is created and automatically processed

## 🔄 How It Works (Secure Flow)

### **1. User Action**

```
Admin Panel → Creates GitHub Issue → GitHub Actions → Google Apps Script → GitHub Repo
```

### **2. Detailed Flow**

1. **User edits content** in admin panel
2. **Admin panel creates GitHub issue** with `[ADMIN-PUBLISH]` title
3. **GitHub Actions triggers** automatically
4. **Action extracts YAML** from issue body
5. **Action calls Google Apps Script** using secrets (not exposed in frontend)
6. **Script updates content** in your repository
7. **Action closes issue** with success message
8. **GitHub Pages rebuilds** automatically

### **3. Security Layers**

- **Frontend:** No API endpoints exposed
- **GitHub Secrets:** Tokens stored securely
- **GitHub Actions:** Runs in secure environment
- **Audit Trail:** All changes tracked via issues

## 🎯 Benefits of This Approach

### **Security**

- ✅ No exposed API endpoints
- ✅ Tokens stored in GitHub Secrets
- ✅ All API calls happen server-side
- ✅ Audit trail of all changes

### **Reliability**

- ✅ GitHub Actions are highly reliable
- ✅ Automatic retry on failure
- ✅ Clear success/failure feedback
- ✅ Issue tracking for all changes

### **Maintenance**

- ✅ No server to maintain
- ✅ GitHub handles infrastructure
- ✅ Easy to monitor and debug
- ✅ Version control for all changes

## 🚨 Troubleshooting

### **Common Issues:**

1. **"GitHub API Error: Bad credentials"**

   - Check your GitHub Personal Access Token
   - Ensure it has `repo` permissions
   - Token might have expired

2. **"Action not triggering"**

   - Check issue title contains `[ADMIN-PUBLISH]`
   - Verify workflow file is in `.github/workflows/`
   - Check GitHub Actions are enabled for the repo

3. **"Google Apps Script error"**

   - Verify `GOOGLE_APPS_SCRIPT_URL` secret is correct
   - Check `ADMIN_SECRET_KEY` matches in both places
   - Test the script manually in Google Apps Script

4. **"Issue not closing automatically"**
   - Check GitHub Actions logs for errors
   - Verify the script returned success response
   - Check repository permissions

## 🔧 Advanced Configuration

### **Custom Labels**

You can add custom labels to issues by modifying the workflow:

```yaml
- name: Add custom labels
  run: |
    gh issue edit ${{ github.event.issue.number }} --add-label "content-update,admin-panel"
```

### **Slack Notifications**

Add Slack notifications when content is published:

```yaml
- name: Notify Slack
  if: success()
  run: |
    curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
      -H "Content-type: application/json" \
      -d '{"text":"✅ Content published successfully via admin panel!"}'
```

### **Backup Content**

Automatically backup content before updating:

```yaml
- name: Backup current content
  run: |
    cp _data/template-content.yml _data/template-content-backup-$(date +%Y%m%d-%H%M%S).yml
```

## 🎉 Success!

Once configured, your admin panel will be:

- **Secure:** No exposed endpoints
- **Reliable:** GitHub Actions handle everything
- **Auditable:** All changes tracked via issues
- **Professional:** Complete content management system

The system provides enterprise-level security with zero hosting costs! 🚀
