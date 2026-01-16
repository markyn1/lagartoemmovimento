import Header from "@/components/Header/Header"
import Hero from "@/components/Hero/Hero"
import Explorer from "@/components/Explorer/Explorer"
import About from "@/components/About/About"
import Team from "@/components/Team/Team"
import LGPD from "@/components/LGPD/LGPD"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Explorer />
      <About />
      <Team />
      <LGPD />
      <Footer />
    </main>
  )
}
