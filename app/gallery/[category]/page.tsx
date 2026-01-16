import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import GalleryGrid from "./GalleryGrid";

// Function to get images from the specific category folder
async function getGalleryImages(category: string): Promise<string[]> {
    // Decode fully first to handle URL encoded chars like %C3%A3
    const decodedCategory = decodeURIComponent(category);

    const normalizedCategory = decodedCategory
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9-]/g, "-")     // Replace non-alphanumeric with hyphen
        .replace(/-+/g, "-")             // Deduplicate hyphens
        .replace(/^-|-$/g, "");          // Trim hyphens

    console.log(`Fetching gallery for: ${category} -> Decoded: ${decodedCategory} -> Normalized: ${normalizedCategory}`);

    // List all directories in public/galeria to find the matching one case-insensitively
    const galleryBasePath = path.join(process.cwd(), "public", "galeria");

    if (!fs.existsSync(galleryBasePath)) {
        console.log("Galeria base folder not found");
        return [];
    }

    const entries = await fs.promises.readdir(galleryBasePath, { withFileTypes: true });

    // Find directory that matches the normalized name (ignoring case)
    const matchingDir = entries.find(entry =>
        entry.isDirectory() &&
        entry.name.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedCategory
    );

    if (!matchingDir) {
        console.log(`No directory found matching: ${normalizedCategory}`);
        return [];
    }

    const categoryPath = path.join(galleryBasePath, matchingDir.name);

    try {
        const files = await fs.promises.readdir(categoryPath);

        // Filter for image files
        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
        );

        // Map to public URL paths using the REAL directory name found
        return imageFiles.map(file => `/galeria/${matchingDir.name}/${file}`);
    } catch (error) {
        console.error(`Error reading gallery directory for ${category}:`, error);
        return [];
    }
}

export default async function GalleryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const title = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

    const images = await getGalleryImages(category);

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 anime-fade-in">
            {/* Breadcrumb / Back Navigation */}
            <div className="mb-8">
                <Link
                    href="/#explorer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft size={30} />
                    <span>Voltar para Explorar</span>
                </Link>
            </div>

            {/* Header Section */}
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 font-['Montserrat',sans-serif]">
                    Galeria: <span className="text-[var(--color-accent-green)]">{title}</span>
                </h1>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Confira os melhores momentos e registros visuais da prática de {title} em Lagarto.
                </p>
            </div>

            <GalleryGrid images={images} title={title} />
        </div>
    );
}
