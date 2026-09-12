import { Header, HeroShowcase, ProjectGallery, ContactForm, MotionEnhancer } from "@/components/experience";
import { Arrow } from "@/components/icons";
import { asset, site, siteUrl } from "@/lib/site";

const schema = {"@context":"https://schema.org", "@graph":[
  {"@type":"Organization", "@id":`${siteUrl}/#organization`,name:site.name,url:`${siteUrl}/`,logo:`${siteUrl}/assets/logo/coda-agency.svg`,description:site.description},
  {"@type":"WebSite","@id":`${siteUrl}/#website`,name:site.name,url:`${siteUrl}/`,inLanguage:"fr",publisher:{"@id":`${siteUrl}/#organization`}},
  {"@type":"WebPage","@id":`${siteUrl}/#webpage`,url:`${siteUrl}/`,name:site.title,description:site.description,inLanguage:"fr",isPartOf:{"@id":`${siteUrl}/#website`},about:{"@id":`${siteUrl}/#service`}},
  {"@type":"Service","@id":`${siteUrl}/#service`,name:"Création de sites web au Maroc",serviceType:"Conception et développement de sites web sur mesure",provider:{"@id":`${siteUrl}/#organization`},areaServed:{"@type":"Country",name:"Maroc"},url:`${siteUrl}/`,description:"Design, développement et référencement de sites web pour les entreprises de tous secteurs."}
]};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
    <a href="#contenu" className="skip-link">Aller au contenu</a>
    <Header />
    <main id="contenu">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title"><span>Création de </span><span>sites web </span><span className="hero-final">au Maroc<span className="accent-dot">.</span></span></h1>
          <p>Votre entreprise a du caractère.<br />Votre site devrait en avoir autant.</p>
          <div className="hero-actions"><a className="button button-dark" href="#contact">Parler de votre projet <Arrow diagonal /></a><a className="text-link" href="#approche">Notre approche <Arrow /></a></div>
        </div>
        <HeroShowcase />
        <div className="hero-baseline"><span>Votre univers. Notre savoir-faire.</span><span>DESIGN · DÉVELOPPEMENT · RÉFÉRENCEMENT</span><a href="#univers" aria-label="Découvrir les concepts de sites"><span>Explorer</span><span className="down-arrow">↓</span></a></div>
      </section>

      <section className="work-section shell section-space" id="univers" aria-labelledby="work-title">
        <div className="section-heading" data-reveal><div><span className="eyebrow">01 / CHAMP DES POSSIBLES</span><h2 id="work-title">À chaque ambition,<br /><span className="muted">son univers.</span></h2></div><p>Quel que soit votre métier,<br />créons le site qui vous ressemble.</p></div>
        <ProjectGallery />
        <p className="concept-note">Concepts créatifs imaginés par Coda. Des marques fictives pour explorer de vraies possibilités.</p>
      </section>

      <section className="approach-section" id="approche" aria-labelledby="approach-title"><div className="shell approach-grid">
        <div className="approach-intro" data-reveal><span className="eyebrow">02 / L’APPROCHE CODA</span><h2 id="approach-title">Beau.<br />Intuitif.<br /><span className="muted">Évident.</span></h2><p>Du premier dessin à la mise en ligne,<br />chaque détail a sa raison d’être.</p><a className="text-link" href="#contact">Construisons le vôtre <Arrow diagonal /></a></div>
        <div className="approach-details" data-reveal>
          <details open><summary><span className="detail-index">01</span><h3>Un design qui vous distingue.</h3><span className="detail-toggle" /></summary><div className="detail-body"><p>Votre identité, votre ton, votre univers. Une expérience dessinée autour de votre entreprise et de ceux qui la découvrent.</p><div className="detail-tags"><span>Direction artistique</span><span>UI / UX</span><span>Sur mesure</span></div></div></details>
          <details><summary><span className="detail-index">02</span><h3>Une expérience sans effort.</h3><span className="detail-toggle" /></summary><div className="detail-body"><p>Des pages rapides, une navigation naturelle et le même soin sur chaque écran. Un site simple à utiliser, pensé pour évoluer avec vous.</p><div className="detail-tags"><span>Développement</span><span>Mobile</span><span>Performance</span></div></div></details>
          <details><summary><span className="detail-index">03</span><h3>Une présence qui se trouve.</h3><span className="detail-toggle" /></summary><div className="detail-body"><p>Une structure claire et des contenus compréhensibles par Google et les moteurs d’IA. Les bases du référencement sont intégrées dès la conception.</p><div className="detail-tags"><span>SEO</span><span>GEO</span><span>AEO</span></div></div></details>
        </div>
      </div></section>

      <section className="contact-section shell section-space" id="contact" aria-labelledby="contact-title">
        <div className="contact-intro" data-reveal><span className="eyebrow">03 / TOUT COMMENCE ICI</span><h2 id="contact-title">Et si on créait<br /><span className="muted">la suite ?</span></h2><p>Une idée précise ou une page blanche.<br />Parlons de ce que vous avez en tête.</p><a className="contact-direct text-link" href={`mailto:${site.email}`}>Vous préférez nous écrire directement ? <Arrow diagonal /></a></div>
        <ContactForm />
      </section>
    </main>
    <footer className="footer"><div className="shell">
      <div className="footer-top"><p>Du caractère.<br /><span>Par nature.</span></p><nav aria-label="Navigation de pied de page"><a href="#univers">Nos univers</a><a href="#approche">Notre approche</a><a href="#contact">Votre projet <Arrow diagonal /></a></nav><div className="footer-location">Imaginé au Maroc.<br />Pensé sans frontières.</div></div>
      <a className="footer-signature" href="#contenu" aria-label="Coda Agency — retour en haut"><img src={asset("logo/coda-wordmark-light.svg")} alt="Coda." width="1180" height="385" loading="lazy" /></a>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Coda Agency</span><span>Création de sites web au Maroc</span><a href="#contact">Faisons quelque chose de beau. <Arrow diagonal /></a></div>
    </div></footer>
    <MotionEnhancer />
  </>;
}
