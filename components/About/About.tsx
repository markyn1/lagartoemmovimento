import "./About.css"

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-background"></div>
      <div className="about-image-container">
        <img src="about/person.png" alt="Runner" className="about-image" />
      </div>

      <div className="about-content button-shadow button-blur">
        <div className="about-header-pill">
          <h2 className="about-title ">Quem somos</h2>
        </div>
        <p className="about-text">
          O projeto "Lagarto em Movimento: Histórias, Treinos e Vida Saudável" nasce com o propósito de registrar,
          valorizar e celebrar as práticas esportivas e os hábitos saudáveis presentes no dia a dia da cidade de
          Lagarto. Através da fotografia, o projeto conta histórias reais de movimento, superação e disciplina,
          promovendo bem-estar, inclusão e qualidade de vida. Mais do que imagens, a iniciativa busca inspirar pessoas,
          fortalecer laços comunitários e mostrar o esporte como um caminho acessível para uma vida mais ativa e
          saudável.
        </p>
      </div>
    </section>
  )
}
