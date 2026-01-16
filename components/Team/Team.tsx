import "./Team.css"

const teamMembers = [
  {
    name: "Marcos Henrique",
    role: "Full-Stack",
    image: "team/Subtract.svg",
  },
  {
    name: "Indigo Tavares",
    role: "Web-Designer",
    image: "team/2Subtract.svg",
  },
  {
    name: "Mateus Gama",
    role: "Tech Lead",
    image: "team/3Subtract.svg",
  },
]

export default function Team() {
  return (
    <section className="team" id="team">
      <h2 className="team-title">Equipe de desenvolvedores</h2>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-card">
            <div className="team-image-container">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-image" />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
