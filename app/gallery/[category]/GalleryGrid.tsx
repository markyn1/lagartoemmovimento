"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

interface GalleryGridProps {
    images: string[];
    title: string;
}

export default function GalleryGrid({ images, title }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (images.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Nenhuma imagem encontrada nesta galeria.</p>
            </div>
        );
    }

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`${title} image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                <ZoomIn className="text-white w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox / Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[2010]"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Fechar"
                    >
                        <X size={40} />
                    </button>

                    <div
                        className="flex flex-col items-center w-full max-w-5xl max-h-screen p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-[75vh] rounded-lg overflow-hidden mb-6">
                            <Image
                                src={selectedImage}
                                alt="Gallery Preview"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>

                        <div className="text-center animate-in slide-in-from-bottom-4 duration-300 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
                            <p className="text-white text-lg font-medium font-sans">
                                Fotografia: <span className="text-[var(--color-accent-green)] font-semibold">Acervo Lagarto em Movimento</span>
                            </p>
                            <p className="text-white/60 text-sm mt-1 font-sans">
                                Ano: 2025
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
