# Admin Panel Setup Guide

## 🚀 Overview

The admin panel allows you to edit the home template content and images directly from a web interface, with live preview and automatic Git integration.

## 📋 Features

- **Live Preview**: See changes in real-time
- **Content Editing**: Edit hero, services, and contact sections
- **Image Management**: Upload and replace images
- **Git Integration**: Automatic commits and pushes to GitHub
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Or if you prefer yarn
yarn install
```

### 2. Configure Git (if not already configured)

```bash
# Set up Git credentials (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Ensure you have access to push to the repository
git remote -v
```

### 3. Start the Admin Server

```bash
# Start the server
npm start

# For development with auto-restart
npm run dev
```

The admin panel will be available at: `http://localhost:3000/admin.html`

## 📁 File Structure

```
betashorts-site/
├── admin.html              # Admin panel interface
├── server.js               # Backend API server
├── package.json            # Node.js dependencies
├── images/                 # Uploaded images (created automatically)
├── _layouts/
│   └── home-template.html  # Template being edited
└── home-template-demo.html # Preview page
```

## 🎯 How to Use

### 1. Access Admin Panel

- Navigate to `http://localhost:3000/admin.html`
- You'll see a split-screen interface with admin controls on the left and live preview on the right

### 2. Edit Content

- **Hero Section**: Edit title, subtitle, and button text
- **Services Section**: Edit section title, subtitle, and all 4 service cards
- **Contact Section**: Edit contact information and form labels

### 3. Manage Images

- **Upload New Images**: Click the upload areas to select new images
- **Replace Existing Images**: Upload new images to replace current ones
- **Automatic Updates**: Images are automatically committed to Git

### 4. Preview Changes

- **Live Preview**: Changes appear in real-time in the preview panel
- **Preview Button**: Click "Preview Changes" to refresh the preview
- **Save Changes**: Click "Save & Push to GitHub" to commit and push changes

### 5. Reset Changes

- **Reset to Default**: Click "Reset to Default" to revert all changes

## 🔧 API Endpoints

The server provides these API endpoints:

- `GET /api/template-data` - Get current template data
- `POST /api/update-template` - Update template content
- `POST /api/upload-image` - Upload new image
- `GET /api/images` - Get list of available images
- `POST /api/update-image` - Update image reference in template

## 🖼️ Image Management

### Supported Formats

- JPG/JPEG
- PNG
- GIF
- WebP

### Image Storage

- Images are stored in the `images/` directory
- Each image gets a unique filename with timestamp
- Images are automatically committed to Git

### Image Sizing

- **Hero Images**: Recommended 600x400px
- **Service Icons**: Recommended 80x80px
- **Contact Icons**: Recommended 24x24px

## 🔒 Security Considerations

### For Production Use

1. **Authentication**: Add user authentication
2. **Rate Limiting**: Implement API rate limiting
3. **File Validation**: Add file type and size validation
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Store sensitive data in environment variables

### Current Security Features

- File type validation for images
- Unique filename generation
- Error handling and validation

## 🐛 Troubleshooting

### Common Issues

1. **Server won't start**

   - Check if port 3000 is available
   - Ensure all dependencies are installed
   - Check Node.js version (requires 14+)

2. **Git operations fail**

   - Verify Git credentials are configured
   - Check repository permissions
   - Ensure you're on the main branch

3. **Images not uploading**

   - Check file permissions on images directory
   - Verify file format is supported
   - Check file size (max 10MB default)

4. **Preview not updating**
   - Refresh the page
   - Check browser console for errors
   - Verify server is running

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=* npm start
```

## 📝 Customization

### Adding New Fields

1. Add form fields to `admin.html`
2. Update the `getFormData()` function
3. Modify the template parsing functions in `server.js`
4. Update the template update functions

### Styling Changes

- Edit the CSS in `admin.html`
- Modify the preview iframe styling
- Update responsive breakpoints as needed

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

```bash
npm start
```

### Environment Variables

```bash
PORT=3000                    # Server port
NODE_ENV=production          # Environment
GIT_REPO_PATH=./            # Git repository path
```

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review the browser console for errors
3. Check the server logs
4. Verify all dependencies are installed

## 🔄 Updates

To update the admin panel:

1. Pull the latest changes from Git
2. Run `npm install` to update dependencies
3. Restart the server
4. Test the functionality

---

**Note**: This admin panel is designed for the Beta Shorts website and specifically works with the `home-template.html` layout. For other templates or sites, modifications will be needed.
