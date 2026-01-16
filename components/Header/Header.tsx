import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <a href="/#hero" className="nav-button">Início</a>
          <a href="/#team" className="nav-button">Quem somos</a>
          <a href="/#lgpd" className="nav-button">LGPD</a>
          <a href="/#explorer" className="nav-button">Explorar</a>
          <a href="/#footer" className="nav-button">Contato</a>
        </nav>

        <a href="https://forms.gle/xDM5hkT7VQZyNSG97" className="submit-button">Faça sua submissão</a>
      </div>
    </header>
  )
}
