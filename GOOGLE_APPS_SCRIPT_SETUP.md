# 🚀 Google Apps Script Setup Guide

This guide will help you set up the Google Apps Script backend to enable direct GitHub publishing from your admin panel.

## 📋 Prerequisites

1. **Google Account** (free)
2. **GitHub Personal Access Token** (with repo permissions)
3. **Your GitHub repository** (betashorts-site)

## 🔧 Step-by-Step Setup

### Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name: `BetaShorts Admin API`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (optional, for triggering GitHub Actions)
5. Click **"Generate token"**
6. **Copy the token** (you'll need it in Step 3)

### Step 2: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Rename project to: `BetaShorts Admin API`
4. Delete the default code
5. Copy and paste the complete script from the code block below

### Step 3: Configure the Script

In the script, update these values:

```javascript
const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"; // Paste your token here
const GITHUB_REPO = "betashorts/betashorts-site"; // Your repo: username/repo-name
const FILE_PATH = "_data/template-content.yml"; // Path to your YAML file
```

Also update the secret key (optional security):

```javascript
if (secretKey !== 'your-secret-key-here') { // Change this to a secret key
```

### Step 4: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click **"Select type"** → **"Web app"**
3. Configure:
   - **Description:** `BetaShorts Admin API v1`
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone` (or `Anyone with Google Account` for more security)
4. Click **"Deploy"**
5. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)

### Step 5: Update Admin Panel

In your `admin.html` file, find this line:

```javascript
const scriptUrl = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual web app URL.

Also update the secret key to match the one in your script:

```javascript
secretKey: "your-secret-key-here"; // Must match the one in your Google Apps Script
```

## 🎯 Complete Google Apps Script Code

```javascript
// BetaShorts Admin API - GitHub Content Updater
// Deploy this as a web app to handle admin panel submissions

// Configuration - UPDATE THESE VALUES
const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"; // Replace with your actual token
const GITHUB_REPO = "betashorts/betashorts-site"; // Your repo: username/repo-name
const FILE_PATH = "_data/template-content.yml"; // Path to your YAML file

function doPost(e) {
  try {
    // Parse the incoming request
    const requestData = JSON.parse(e.postData.contents);
    const yamlContent = requestData.content;
    const commitMessage =
      requestData.message || "Update home template content via admin panel";
    const secretKey = requestData.secretKey; // Optional security

    // Basic security check (optional)
    if (secretKey !== "your-secret-key-here") {
      return createResponse(401, { error: "Unauthorized" });
    }

    // Validate required data
    if (!yamlContent) {
      return createResponse(400, { error: "No content provided" });
    }

    // Get current file SHA (required for GitHub API)
    const currentFile = getCurrentFile();
    if (!currentFile.success) {
      return createResponse(500, {
        error: "Failed to get current file: " + currentFile.error,
      });
    }

    // Commit the new content
    const commitResult = commitFile(
      yamlContent,
      commitMessage,
      currentFile.sha
    );
    if (!commitResult.success) {
      return createResponse(500, {
        error: "Failed to commit file: " + commitResult.error,
      });
    }

    // Success response
    return createResponse(200, {
      success: true,
      message: "Content updated successfully!",
      commitUrl: commitResult.commitUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in doPost:", error);
    return createResponse(500, {
      error: "Internal server error: " + error.message,
    });
  }
}

function getCurrentFile() {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "BetaShorts-Admin-API",
      },
    });

    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      return { success: true, sha: data.sha };
    } else {
      return {
        success: false,
        error: `HTTP ${response.getResponseCode()}: ${response.getContentText()}`,
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function commitFile(content, message, sha) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const payload = {
      message: message,
      content: Utilities.base64Encode(content),
      sha: sha,
    };

    const response = UrlFetchApp.fetch(url, {
      method: "PUT",
      contentType: "application/json",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "BetaShorts-Admin-API",
      },
      payload: JSON.stringify(payload),
    });

    if (
      response.getResponseCode() === 200 ||
      response.getResponseCode() === 201
    ) {
      const data = JSON.parse(response.getContentText());
      return {
        success: true,
        commitUrl: data.commit.html_url,
      };
    } else {
      return {
        success: false,
        error: `HTTP ${response.getResponseCode()}: ${response.getContentText()}`,
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function createResponse(statusCode, data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setStatusCode(statusCode);
}

// Test function - you can run this to test your setup
function testConnection() {
  const result = getCurrentFile();
  console.log("Test result:", result);
  return result;
}
```

## 🧪 Testing Your Setup

1. **Test the Script:**

   - In Google Apps Script, click the "Run" button next to `testConnection()`
   - Check the logs to see if it can connect to your GitHub repo

2. **Test the Admin Panel:**
   - Go to your admin panel: `https://betashorts.com/admin.html`
   - Make a small change to any content
   - Click the **"🚀 Publish to GitHub"** button
   - You should see a success message with a commit URL

## 🔒 Security Notes

- **Never share your GitHub token** - it gives full access to your repos
- **Keep your secret key private** - it prevents unauthorized access to your API
- **Consider restricting access** to "Anyone with Google Account" for extra security

## 🚨 Troubleshooting

### Common Issues:

1. **"Unauthorized" error:**

   - Check that your secret key matches in both the script and admin panel
   - Verify your GitHub token has the correct permissions

2. **"Failed to get current file" error:**

   - Verify your GitHub token is correct
   - Check that the repository name and file path are correct
   - Ensure the file exists in your repo

3. **"Failed to commit file" error:**

   - Check that your GitHub token has `repo` permissions
   - Verify the repository name is correct

4. **CORS errors:**
   - Google Apps Script handles CORS automatically, so this shouldn't be an issue

## 🎉 Success!

Once everything is working, you can:

1. Edit content in your admin panel
2. Click "🚀 Publish to GitHub"
3. See your changes live on your site within a few minutes!

The system will automatically:

- Update your `_data/template-content.yml` file
- Create a commit with your changes
- Trigger a rebuild of your GitHub Pages site
- Show you the commit URL for reference
