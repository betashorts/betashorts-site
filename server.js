const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create images directory if it doesn't exist
async function ensureImagesDir() {
    try {
        await fs.access('images');
    } catch {
        await fs.mkdir('images');
    }
}

// Git operations
async function gitCommit(message) {
    return new Promise((resolve, reject) => {
        exec(`git add . && git commit -m "${message}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function gitPush() {
    return new Promise((resolve, reject) => {
        exec('git push origin main', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

// API Routes

// Get current template data
app.get('/api/template-data', async (req, res) => {
    try {
        const templatePath = '_layouts/home-template.html';
        const templateContent = await fs.readFile(templatePath, 'utf8');
        
        // Extract data from template (simplified parsing)
        const data = {
            hero: {
                title: extractContent(templateContent, 'hero-title'),
                subtitle: extractContent(templateContent, 'hero-subtitle'),
                btnPrimary: extractContent(templateContent, 'btn-primary'),
                btnSecondary: extractContent(templateContent, 'btn-secondary')
            },
            services: {
                title: extractContent(templateContent, 'section-title'),
                subtitle: extractContent(templateContent, 'section-subtitle'),
                service1: {
                    title: extractServiceTitle(templateContent, 1),
                    description: extractServiceDescription(templateContent, 1)
                },
                service2: {
                    title: extractServiceTitle(templateContent, 2),
                    description: extractServiceDescription(templateContent, 2)
                },
                service3: {
                    title: extractServiceTitle(templateContent, 3),
                    description: extractServiceDescription(templateContent, 3)
                },
                service4: {
                    title: extractServiceTitle(templateContent, 4),
                    description: extractServiceDescription(templateContent, 4)
                }
            },
            contact: {
                title: extractContent(templateContent, 'contact-title'),
                subtitle: extractContent(templateContent, 'contact-subtitle'),
                address: extractContactInfo(templateContent, 'address'),
                email: extractContactInfo(templateContent, 'email'),
                phone: extractContactInfo(templateContent, 'phone')
            }
        };
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update template data
app.post('/api/update-template', async (req, res) => {
    try {
        const { data } = req.body;
        const templatePath = '_layouts/home-template.html';
        
        // Read current template
        let templateContent = await fs.readFile(templatePath, 'utf8');
        
        // Update template content
        templateContent = updateTemplateContent(templateContent, data);
        
        // Write updated template
        await fs.writeFile(templatePath, templateContent, 'utf8');
        
        // Commit and push changes
        await gitCommit('Update home template via admin panel');
        await gitPush();
        
        res.json({ success: true, message: 'Template updated and pushed to GitHub' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload image
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
    try {
        await ensureImagesDir();
        
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const imagePath = req.file.path;
        const imageUrl = `/images/${req.file.filename}`;
        
        // Commit and push the new image
        await gitCommit(`Add new image: ${req.file.filename}`);
        await gitPush();
        
        res.json({ 
            success: true, 
            imageUrl: imageUrl,
            filename: req.file.filename,
            message: 'Image uploaded and pushed to GitHub' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get list of available images
app.get('/api/images', async (req, res) => {
    try {
        await ensureImagesDir();
        const files = await fs.readdir('images');
        const images = files.filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        
        res.json({ images: images.map(img => `/images/${img}`) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update image reference in template
app.post('/api/update-image', async (req, res) => {
    try {
        const { imageType, imageUrl, altText } = req.body;
        const templatePath = '_layouts/home-template.html';
        
        let templateContent = await fs.readFile(templatePath, 'utf8');
        
        // Update image in template
        templateContent = updateImageInTemplate(templateContent, imageType, imageUrl, altText);
        
        await fs.writeFile(templatePath, templateContent, 'utf8');
        
        await gitCommit(`Update ${imageType} image`);
        await gitPush();
        
        res.json({ success: true, message: 'Image updated in template' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper functions for template parsing and updating
function extractContent(template, className) {
    const regex = new RegExp(`class="${className}">([^<]+)</`, 'i');
    const match = template.match(regex);
    return match ? match[1].trim() : '';
}

function extractServiceTitle(template, serviceNum) {
    const regex = new RegExp(`service-title">([^<]+)</h3>`, 'i');
    const matches = template.match(new RegExp(regex.source, 'gi'));
    return matches && matches[serviceNum - 1] ? 
        matches[serviceNum - 1].match(/">([^<]+)</)[1].trim() : '';
}

function extractServiceDescription(template, serviceNum) {
    const regex = new RegExp(`service-description">([^<]+)</p>`, 'i');
    const matches = template.match(new RegExp(regex.source, 'gi'));
    return matches && matches[serviceNum - 1] ? 
        matches[serviceNum - 1].match(/">([^<]+)</)[1].trim() : '';
}

function extractContactInfo(template, type) {
    const regex = new RegExp(`<span>([^<]+${type}[^<]*)</span>`, 'i');
    const match = template.match(regex);
    return match ? match[1].trim() : '';
}

function updateTemplateContent(template, data) {
    // Update hero section
    template = template.replace(
        /class="hero-title">[^<]+</h1>/,
        `class="hero-title">${data.hero.title}</h1>`
    );
    
    template = template.replace(
        /class="hero-subtitle">[^<]+</p>/,
        `class="hero-subtitle">${data.hero.subtitle}</p>`
    );
    
    // Update services section
    template = template.replace(
        /class="section-title">[^<]+</h2>/,
        `class="section-title">${data.services.title}</h2>`
    );
    
    template = template.replace(
        /class="section-subtitle">[^<]+</p>/,
        `class="section-subtitle">${data.services.subtitle}</p>`
    );
    
    // Update contact section
    template = template.replace(
        /class="contact-title">[^<]+</h2>/,
        `class="contact-title">${data.contact.title}</h2>`
    );
    
    template = template.replace(
        /class="contact-subtitle">[^<]+</p>/,
        `class="contact-subtitle">${data.contact.subtitle}</p>`
    );
    
    return template;
}

function updateImageInTemplate(template, imageType, imageUrl, altText) {
    const imageRegex = new RegExp(`<img[^>]*alt="[^"]*${imageType}[^"]*"[^>]*>`, 'i');
    const newImageTag = `<img src="${imageUrl}" alt="${altText}" width="600" height="400">`;
    
    return template.replace(imageRegex, newImageTag);
}

// Start server
app.listen(PORT, () => {
    console.log(`Admin server running on port ${PORT}`);
    console.log(`Admin panel available at: http://localhost:${PORT}/admin.html`);
}); 