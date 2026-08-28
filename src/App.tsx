import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowUp, ArrowUpRight, Check, Code2, Database,
  GitBranch, Globe2, Mail, Menu, Palette, Send, Server,
  Sparkles, X, Zap,
} from 'lucide-react'

const profile = {
  name: 'Gustavo Natan',
  email: 'gustavonatan.2001.pereira@gmail.com',
  githubUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  photo: '/assets/gustavo.jpg',
}

const projects = [
  { name: 'MeuTroco', type: 'Finanças', description: 'Aplicação web para gerenciamento financeiro pessoal, com receitas, despesas, saldo e transações em um dashboard interativo.', technologies: ['Java', 'Spring Boot', 'JWT', 'PostgreSQL', 'React', 'TypeScript'], image: '', githubUrl: '', demoUrl: '' },
  { name: 'Biblioteca de Livros', type: 'API & catálogo', description: 'Aplicação para consulta e gerenciamento de livros utilizando integração com API externa.', technologies: ['Java', 'Spring Boot', 'REST API', 'HTML', 'CSS', 'JavaScript'], image: '', githubUrl: '', demoUrl: '' },
  { name: 'Loja Virtual', type: 'E-commerce', description: 'Aplicação de e-commerce com gerenciamento de produtos, carrinho de compras e integração com pagamentos.', technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Mercado Pago'], image: '', githubUrl: '', demoUrl: '' },
  { name: 'Sistema de Barbearia', type: 'Gestão', description: 'Sistema web para gerenciamento de agendamentos e organização de horários.', technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'], image: '', githubUrl: '', demoUrl: '' },
]

const skillGroups = [
  { title: 'Frontend', icon: Code2, skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Responsive Design'] },
  { title: 'Backend', icon: Server, skills: ['Java', 'Spring Boot', 'Spring Security', 'APIs REST', 'Python'] },
  { title: 'Dados', icon: Database, skills: ['PostgreSQL', 'H2', 'SQL', 'Modelagem'] },
  { title: 'Ferramentas', icon: Zap, skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Maven'] },
]

const navItems = [['Início', 'inicio'], ['Sobre', 'sobre'], ['Habilidades', 'habilidades'], ['Projetos', 'projetos'], ['Experiência', 'experiencia'], ['Contato', 'contato']]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSending(true)
    setFormError('')
    setSent(false)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      if (!response.ok) throw new Error('Não foi possível enviar sua mensagem.')
      setSent(true)
      form.reset()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível enviar sua mensagem.')
    } finally {
      setSending(false)
    }
  }

  return <div className="site-shell">
    <div className="progress" style={{ width: `${scrollProgress}%` }} />
    <header className="navbar">
      <a href="#inicio" className="brand" onClick={closeMenu}><span className="brand-mark">GN</span><span>Gustavo<br /><b>Natan</b></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{navItems.map(([label, id]) => <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>)}<a className="nav-cta" href="#contato" onClick={closeMenu}>Vamos conversar <ArrowUpRight size={15} /></a></nav>
    </header>

    <main>
      <section className="hero section-grid" id="inicio">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="pulse" /> Desenvolvedor Full Stack</div>
          <h1>Ideias que ganham <em>forma</em> digital.</h1>
          <p className="hero-text">Sou Gustavo Natan, desenvolvedor Full Stack com formação em Design Gráfico e Análise e Desenvolvimento de Sistemas. Uno criatividade, experiência visual e tecnologia para criar aplicações web modernas, funcionais e escaláveis.</p>
          <div className="hero-actions"><a href="#projetos" className="button primary">Ver meus projetos <ArrowDown size={16} /></a><a href="#contato" className="button secondary">Entrar em contato <ArrowUpRight size={16} /></a></div>
          <div className="hero-note"><Check size={15} /> Disponível para oportunidades</div>
        </div>
        <div className="hero-visual reveal reveal-delay">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="photo-frame"><img src={profile.photo} alt="Gustavo Natan" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.classList.add('photo-missing') }} /><div className="photo-placeholder"><Palette size={25} /><span>Adicione sua foto em<br /><b>/assets/gustavo.jpg</b></span></div></div>
          <div className="floating-tag tag-top"><Code2 size={14} /> Java / Spring</div><div className="floating-tag tag-bottom"><Globe2 size={14} /> Full Stack</div>
          <div className="visual-caption"><span>01</span><span>Design + Tecnologia</span></div>
        </div>
      </section>
      <div className="scroll-cue"><span>Scroll para explorar</span><ArrowDown size={15} /></div>

      <section className="section about" id="sobre"><div className="section-label">01 / Sobre mim</div><div className="about-grid"><div><h2>Além do<br /><em>código.</em></h2></div><div className="about-content"><p className="lead">Minha trajetória começou no Design Gráfico, onde desenvolvi uma visão voltada para criatividade, estética e experiência visual.</p><p>Posteriormente, aprofundei meus conhecimentos em Análise e Desenvolvimento de Sistemas, transformando essa visão criativa em soluções digitais. Hoje, combino design, UX/UI, desenvolvimento, lógica, banco de dados, APIs e arquitetura de sistemas.</p><div className="stats"><div><strong>Design</strong><span>visão de produto</span></div><div><strong>Full Stack</strong><span>do conceito à entrega</span></div><div><strong>Java</strong><span>Spring Boot & APIs</span></div></div></div></div></section>

      <section className="section skills" id="habilidades"><div className="section-label">02 / Habilidades</div><div className="section-heading"><h2>Ferramentas para<br /><em>construir.</em></h2><p>Uma base multidisciplinar para transformar problemas complexos em produtos simples de usar.</p></div><div className="skill-grid">{skillGroups.map(({ title, icon: Icon, skills }, index) => <article className="skill-card" key={title} style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}><Icon className="skill-icon" /><h3>{title}</h3><div className="skill-list">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>

      <section className="section projects" id="projetos"><div className="section-label">03 / Projetos em destaque</div><div className="section-heading"><h2>Trabalho que fala<br /><em>por si.</em></h2><p>Projetos reais e estudos que unem arquitetura consistente com experiências claras.</p></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.name}><div className={`project-art art-${index + 1}`}>{project.image ? <img src={project.image} alt="" /> : <><span className="art-number">0{index + 1}</span><div className="art-lines" /><span className="art-type">{project.type}</span></>}</div><div className="project-body"><div className="project-meta"><span>{project.type}</span><span>0{index + 1}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-links">{project.demoUrl && <a href={project.demoUrl}>Ver projeto <ArrowUpRight size={14} /></a>}{project.githubUrl && <a href={project.githubUrl}><GitBranch size={14} /> GitHub</a>}{!project.demoUrl && !project.githubUrl && <span className="edit-hint">Links em breve</span>}</div></div></article>)}</div></section>

      <section className="section experience" id="experiencia"><div className="section-label">04 / Trajetória</div><div className="experience-grid"><h2>Uma trajetória<br /><em>em evolução.</em></h2><div className="timeline"><div className="timeline-item"><span>01</span><div><h3>Design Gráfico</h3><p>Criatividade, identidade visual e comunicação.</p></div></div><div className="timeline-item"><span>02</span><div><h3>Análise e Desenvolvimento de Sistemas</h3><p>Programação, banco de dados e engenharia de software.</p></div></div><div className="timeline-item"><span>03</span><div><h3>Desenvolvimento Full Stack</h3><p>APIs, sistemas web, aplicações e integrações.</p></div></div></div></div></section>

      <section className="difference"><div className="difference-inner"><div className="section-label">05 / O diferencial</div><div className="difference-copy"><h2>Código com visão<br /><em>de design.</em></h2><p>Enquanto muitos desenvolvedores pensam apenas no funcionamento da aplicação, minha formação em Design Gráfico me permite pensar também em como as pessoas percebem, entendem e utilizam cada interface.</p></div><div className="difference-cards"><div><Palette /><h3>Design</h3><p>Experiência visual e identidade.</p></div><div><Code2 /><h3>Desenvolvimento</h3><p>Código limpo e soluções funcionais.</p></div><div><Sparkles /><h3>Experiência</h3><p>Interfaces pensadas para pessoas.</p></div></div></div></section>

      <section className="section contact" id="contato"><div className="section-label">06 / Contato</div><div className="contact-grid"><div><h2>Vamos criar<br /><em>algo juntos?</em></h2><p>Tem uma ideia, projeto ou oportunidade? Entre em contato comigo.</p><a className="email-link" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a><div className="socials">{profile.githubUrl && <a href={profile.githubUrl} aria-label="GitHub"><GitBranch /></a>}{profile.linkedinUrl && <a href={profile.linkedinUrl} aria-label="LinkedIn"><Globe2 /></a>}{profile.instagramUrl && <a href={profile.instagramUrl} aria-label="Instagram"><Sparkles /></a>}</div></div><form className="contact-form" onSubmit={handleSubmit}><label>Nome<input required name="name" placeholder="Seu nome" /></label><label>Email<input required type="email" name="email" placeholder="voce@email.com" /></label><label>Assunto<input required name="subject" placeholder="Como posso ajudar?" /></label><label>Mensagem<textarea required name="message" rows={4} placeholder="Conte um pouco sobre seu projeto..." /></label><button className="button primary" type="submit">{sent ? <>Mensagem preparada <Check size={16} /></> : <>Enviar mensagem <Send size={16} /></>}</button>{sent && <p className="success-message">Obrigado. O formulário está pronto para conectar a um serviço de envio seguro.</p>}</form></div></section>
    </main>
    <footer><div className="footer-main"><a href="#inicio" className="brand"><span className="brand-mark">GN</span><span>Gustavo<br /><b>Natan</b></span></a><p>Transformando ideias em<br /> soluções digitais.</p><div className="footer-links">{navItems.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-contact"><span>Fale comigo</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div></div><div className="footer-bottom"><span>© 2026 Gustavo Natan. Todos os direitos reservados.</span><span>Full Stack Developer</span></div></footer><a className="back-top" href="#inicio" aria-label="Voltar ao topo"><ArrowUp size={17} /></a>
  </div>
}

export default App
