"use client"
import "./Explorer.css"
import { Search, Mic, ArrowUpRight } from "lucide-react"

import Link from "next/link"

const categories = [
  {
    name: "Corrida",
    image: "/galeria/corrida/1.jpg",
  },
  {
    name: "Volei",
    image: "/galeria/volei/1.jpg",
  },
  {
    name: "CrossFit",
    image: "/galeria/crossfit/1.jpg",
  },
  {
    name: "Natação",
    image: "/galeria/natacao/1.jpg",
  },
  {
    name: "Jiu-jitsu",
    image: "/galeria/jiu-jitsu/1.jpg",
  },
  {
    name: "FutVôlei",
    image: "/galeria/futvolei/1.jpg",
  },
  {
    name: "Pilates",
    image: "/galeria/pilates/1.jpg",
  },
  {
    name: "Volei de praia",
    image: "/galeria/volei-de-praia/1.jpg",
  },
  {
    name: "Academia",
    image: "/galeria/academia/1.jpg",
  },
  {
    name: "Muay Thai",
    image: "/galeria/muay-thai/1.jpg",
  },

]

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

import { useRouter } from "next/navigation"

export default function Explorer() {
  const router = useRouter();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`/gallery/${slugify(value)}`);
    }
  };

  return (
    <section className="explorer" id="explorer">
      <div className="explorer-header">
        <h2 className="explorer-title">Explorar</h2>

        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <select className="search-input" onChange={handleSelectChange}>
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="view-all-button">
          Ver tudo
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="categories-grid">
        {categories.slice(0, 8).map((category) => (
          <Link
            href={`/gallery/${slugify(category.name)}`}
            key={category.name}
            className="category-card"
          >
            <img src={category.image || "/placeholder.svg"} alt={category.name} className="category-image" />
            <div className="category-overlay button-s">
              <span className="category-name">{category.name}</span>
              <ArrowUpRight className="category-icon" size={20} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
