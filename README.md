# Beta Shorts Website

📝 **This is a legacy version of the site. See instructions below to restore or modify.**

## 🚀 Quick Restore Instructions

### To restore this exact version of the site:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/betashorts-site.git
   cd betashorts-site
   ```

2. **Ensure you're on the main branch:**

   ```bash
   git checkout main
   ```

3. **If you need to reset to this exact state later:**

   ```bash
   git reset --hard <commit-hash-of-this-version>
   ```

4. **For local development:**

   ```bash
   # Install Jekyll (if not already installed)
   gem install jekyll bundler

   # Install dependencies
   bundle install

   # Run locally
   bundle exec jekyll serve
   ```

## 📁 File Structure & Purpose

### Core Files

- **`_config.yml`** - Jekyll configuration file containing site metadata, URL settings, and theme configuration
- **`index.html`** - Main homepage with hero section and navigation links
- **`blog.html`** - Blog listing page that displays all posts from `_posts/` directory
- **`CNAME`** - Custom domain configuration for GitHub Pages (set to `betashorts.com`)

### Layout System (`_layouts/`)

- **`default.html`** - Main layout template with navigation, header, footer, and SEO meta tags
- **`post.html`** - Blog post layout that extends default.html for individual articles

### Content Directory (`_posts/`)

Contains all blog posts in Markdown format with Jekyll front matter:

- **Naming convention:** `YYYY-MM-DD-title.md`
- **Current posts:** 25+ articles covering GPU reviews, Bash tutorials, Twitter monetization, and TradingView Pine Script
- **Languages:** Mix of English and Japanese content
- **URL structure:** Posts are accessible at `https://betashorts.com/post-title/` (not date-based)

### Static Assets

- **`css/styles.css`** - Custom styling with responsive design, dark theme, and modern UI
- **`logo.jpg`** - Site logo (29KB)
- **`favicon.ico`** - Browser favicon

### Legal Pages

- **`privacy.html`** - Privacy Policy page
- **`terms.html`** - Terms of Service page
- **`support.html`** - Support/Contact page

## 📝 Blog System

### How Blog Posts Work

1. **File Location:** All posts are stored in `_posts/` directory
2. **URL Structure:** Posts use `permalink: /:title/` (not date-based URLs)
3. **Access:** Posts are accessible at `https://betashorts.com/post-title/`
4. **Listing:** All posts appear on `/blog/` page automatically
5. **Front Matter:** Each post includes metadata like title, date, language, tags, and SEO settings

### Example Post Structure

```markdown
---
layout: post
title: "Post Title"
date: 2025-01-16
lang: "ja" # or "en"
meta: "SEO meta tags..."
tags: [tag1, tag2, tag3]
---
```

### Current Blog Categories

- **GPU & Hardware:** Reviews and guides (e.g., "GPU とは", "GPU 選び")
- **Bash Tutorials:** Programming guides (e.g., "bash-for-loop", "bash-functions")
- **TradingView:** Pine Script tutorials and backtesting guides
- **Twitter Monetization:** Revenue and follower growth strategies

## 🌐 Hosting & Domain

### GitHub Pages Configuration

- **Hosting:** GitHub Pages (Jekyll-based static site)
- **Custom Domain:** `betashorts.com` (configured via CNAME file)
- **Base URL:** `https://betashorts.com`
- **Theme:** Uses Jekyll's `minima` theme as base with custom modifications

### SEO & Analytics

- **Google Analytics:** Configured with tracking ID `G-DPWTFCZR4X`
- **Social Media:** Open Graph and Twitter Card meta tags
- **Structured Data:** JSON-LD schema markup for better search visibility
- **Sitemap:** Automatic sitemap generation via `jekyll-sitemap` plugin

### Domain Management

- **CNAME Record:** Points `betashorts.com` to GitHub Pages
- **SSL:** Automatic HTTPS via GitHub Pages
- **DNS:** Managed through GitHub Pages settings

## 🔧 Development Notes

### Jekyll Configuration

- **Markdown Processor:** Kramdown
- **Permalink Structure:** `/:title/` (clean URLs without dates)
- **Plugins:** `jekyll-sitemap`, `jekyll-redirect-from`
- **Theme:** `minima` with extensive customizations

### Custom Features

- **Responsive Design:** Mobile-first approach with breakpoints at 768px and 480px
- **Dark Theme:** Dark navigation with light content areas
- **Gradient Backgrounds:** Purple-to-blue gradients for visual appeal
- **Hover Effects:** Interactive elements with smooth transitions
- **Multi-language Support:** Posts can specify language via front matter

### File Preservation

- **Blog URLs:** Existing posts will maintain their URLs even if you redesign
- **Content Structure:** All posts in `_posts/` are preserved and accessible
- **Assets:** CSS, images, and other static files remain intact

## 🚨 Important Notes

1. **Backup Strategy:** This README serves as documentation for the current state
2. **URL Preservation:** Blog post URLs are title-based, not date-based
3. **Custom Domain:** The site uses `betashorts.com` - ensure DNS is properly configured
4. **Jekyll Dependencies:** Requires Ruby and Jekyll for local development
5. **Content Management:** New posts should follow the existing naming convention and front matter structure

## 📞 Support

For questions about this site structure or restoration process, refer to the Jekyll documentation or GitHub Pages help resources.
