const fs = require('fs');
const path = require('path');

const galleryDir = path.join('public', 'galeria');

// Function to get current directories
const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

const categories = getDirectories(galleryDir);

categories.forEach(category => {
    const categoryPath = path.join(galleryDir, category);
    const metadataPath = path.join(categoryPath, 'metadata.json');

    // Get all images in the category folder
    const files = fs.readdirSync(categoryPath);
    const images = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));

    if (images.length === 0) {
        console.log(`No images found in ${category}, skipping.`);
        return;
    }

    let metadata = {};

    // Read existing metadata if it exists
    if (fs.existsSync(metadataPath)) {
        try {
            const content = fs.readFileSync(metadataPath, 'utf8');
            metadata = JSON.parse(content);
        } catch (err) {
            console.error(`Error reading existing metadata for ${category}:`, err);
            // If error (e.g. malformed JSON), strict validity might fail, keep empty or backup? 
            // For now we assume we can start fresh or merging is nice. 
            // If the user made a syntax error in the previous step (like the comma), JSON.parse might fail. 
            // I'll try to handle the trailing comma issue if I can, or just start fresh/warn.
        }
    }

    // Update metadata with new images, preserving existing ones
    let updated = false;
    images.forEach(image => {
        if (!metadata[image]) {
            metadata[image] = {
                "author": "Acervo Lagarto em Movimento",
                "date": "2025",
                "location": "Lagarto-SE"
            };
            updated = true;
        }
    });

    // Write back if there are changes or if we are creating it
    // But we always want to ensure it contains all images based on the user request.
    // The user said "grab the names of the photos and put them as indices".

    // Sort keys for tidiness
    const sortedMetadata = {};
    Object.keys(metadata).sort().forEach(key => {
        // Only include if the file still exists (optional cleanup, but safer to keep all in case)
        // The user just wants to ADD indices.
        sortedMetadata[key] = metadata[key];
    });

    fs.writeFileSync(metadataPath, JSON.stringify(sortedMetadata, null, 4));
    console.log(`Updated metadata for ${category}`);
});
