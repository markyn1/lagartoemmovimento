import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import GalleryGrid from "./GalleryGrid";

interface GalleryImage {
    src: string;
    author?: string;
    date?: string;
    location?: string;
}

// Function to get images and metadata from the specific category folder
async function getGalleryImages(category: string): Promise<GalleryImage[]> {
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

        // Check for metadata.json
        let metadata: Record<string, { author?: string; date?: string; location?: string }> = {};
        const metadataPath = path.join(categoryPath, "metadata.json");

        if (fs.existsSync(metadataPath)) {
            try {
                const metadataContent = await fs.promises.readFile(metadataPath, "utf-8");
                metadata = JSON.parse(metadataContent);
            } catch (err) {
                console.error("Error reading metadata.json:", err);
            }
        }

        // Map to image objects
        return imageFiles.map(file => {
            const fileMetadata = metadata[file] || {};
            return {
                src: `/galeria/${matchingDir.name}/${file}`,
                author: fileMetadata.author,
                date: fileMetadata.date,
                location: fileMetadata.location
            };
        });
    } catch (error) {
        console.error(`Error reading gallery directory for ${category}:`, error);
        return [];
    }
}

const data: Record<string, string> = {
    "corrida": "A corrida é uma prática esportiva acessível que melhora o condicionamento físico, a resistência cardiovascular e a saúde mental. Pode ser realizada ao ar livre ou em esteiras, auxiliando no controle do peso, na redução do estresse e no aumento da disposição. Em Lagarto, observa-se um crescimento notável de adeptos, sendo o principal local a Avenida Sindicalista Antônio Francisco da Rocha, popularmente conhecida como Avenida da Bica.",

    "volei": "O vôlei é um esporte coletivo que estimula o trabalho em equipe, a comunicação e a coordenação motora. Trabalha força, agilidade e resistência física, podendo ser praticado de forma recreativa ou competitiva. Os principais locais são a Praça do Rosário, o Centro de Esporte CIE III e as quadras do Balneário Bica.",

    "crossfit": "O CrossFit é um método de treinamento de alta intensidade que combina exercícios funcionais, levantamento de peso e atividades cardiovasculares. Tem como objetivo melhorar a força, a resistência e o condicionamento físico geral. Em Lagarto, a prática destaca-se no estabelecimento Alquimia Cross Training, localizado na Av. Nossa Sra. da Piedade, 171 - Centro.",

    "natacao": "A natação é uma atividade física completa, que trabalha praticamente todos os grupos musculares. Melhora a capacidade cardiorrespiratória, aumenta a resistência e reduz o impacto nas articulações. A prática pode ser realizada no centro de treinamento CETTA, localizado na Av. Santo Antônio, 333 - Centro.",

    "jiu-jitsu": "O jiu-jitsu é uma arte marcial de origem japonesa focada no combate corpo a corpo. O termo (arte suave) destaca o uso de alavancas e imobilizações para neutralizar oponentes. Em Lagarto, a modalidade é ensinada na Escola de Jiu-Jitsu Alex Pereira, localizada na R. Francisco Libório, 185 - Libório.",

    "futvolei": "O futevôlei combina elementos do futebol e do vôlei, praticado na areia. Desenvolve agilidade, coordenação motora e força muscular. A prática desse esporte encontra-se no estabelecimento Duna Play, localizado na R. João Temóteo dos Santos, 110 - Horta.",

    "pilates": "O Pilates é um método que foca no fortalecimento do core, na postura, no equilíbrio e na flexibilidade. Seus movimentos controlados ajudam a prevenir lesões, aliviar dores e promover maior consciência corporal.",

    "volei-de-praia": "O vôlei de praia é uma modalidade derivada do vôlei tradicional, praticada na areia. Estimula o trabalho em equipe e a coordenação motora. O esporte pode ser praticado no Duna Play, localizado na R. João Temóteo dos Santos, 110 - Horta.",

    "academia": "A musculação foca no fortalecimento muscular e na melhoria da composição corporal. Com a crescente demanda em Lagarto, grandes marcas estabeleceram-se na cidade, como a SmartFit (Av. Contorno, 3795 - Centro) e a Selfit (Av. Sindicalista Antônio Francisco da Rocha, 3400 - Exposição).",

    "muay-thai": "O Muay Thai é uma arte marcial tailandesa conhecida como 'a arte das oito armas', utilizando punhos, cotovelos, joelhos e pernas. Promove disciplina física e mental. A referência local é o RB FightClub, localizado na R. Jorge Henrique de Andrade, 322 - São José."
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
                    {data[category]}
                </p>
            </div>

            <GalleryGrid images={images} title={title} />
        </div>
    );
}
