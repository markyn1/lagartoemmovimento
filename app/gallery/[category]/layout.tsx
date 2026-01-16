import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
        </div>
    )
}
