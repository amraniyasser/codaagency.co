import { asset, type ProjectId } from "@/lib/site";

function Photograph({ file, priority = false, className = "" }: { file: string; priority?: boolean; className?: string }) {
  return <picture className={className}><source type="image/avif" srcSet={`${asset(`images/${file}-640.avif`)} 640w, ${asset(`images/${file}-1280.avif`)} 1280w`} sizes="(max-width: 760px) 90vw, 640px" /><img src={asset(`images/${file}-1280.webp`)} srcSet={`${asset(`images/${file}-640.webp`)} 640w, ${asset(`images/${file}-1280.webp`)} 1280w`} sizes="(max-width: 760px) 90vw, 640px" width="1280" height="853" alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" /></picture>;
}

export function Mockup({ id, priority = false }: { id: ProjectId; priority?: boolean }) {
  return <div className={`mockup mockup-${id}`} aria-hidden="true">
    {id === "azur" && <>
      <div className="mock-nav"><span className="azur-logo">maison azur<span>UNE AUTRE IDÉE DE L’AILLEURS</span></span><span>La maison &nbsp;&nbsp; Les expériences</span><span className="mock-nav-button">Votre séjour ↗</span></div>
      <div className="azur-image"><Photograph file="azur-residence" priority={priority} /><div className="azur-text"><span>UNE MAISON. MILLE HORIZONS.</span><p>Le temps<br />vous appartient.</p><span className="mock-cta">Découvrir la maison <span>↗</span></span></div><span className="azur-coordinate">35° N — AU BORD DE L’ESSENTIEL</span></div>
      <div className="azur-bottom"><span>Un lieu rare.<br />Une autre façon d’habiter le monde.</span><span>01 / 03</span></div>
    </>}
    {id === "aura" && <>
      <div className="mock-nav"><span className="aura-logo">aura.</span><span>Les essentiels &nbsp;&nbsp; Notre philosophie</span><span>Panier (0)</span></div>
      <div className="aura-main"><Photograph file="aura-botanique" priority={priority} /><div className="aura-text"><span>LE BEAU COMMENCE PAR VOUS.</span><p>La nature.<br />À fleur<br /><em>de peau.</em></p><span className="mock-cta">Trouver mon rituel ↗</span></div></div>
      <div className="aura-bottom"><span>Moins. Mais mieux.</span><span>Des soins qui vont à l’essentiel.</span><span>BOTANIQUE PAR NATURE</span></div>
    </>}
    {id === "elan" && <>
      <div className="mock-nav"><span className="elan-logo">élan<span>STUDIO DE MOUVEMENT</span></span><span>Le studio &nbsp;&nbsp; Nos pratiques</span><span className="mock-nav-button">Trouver mon cours ↗</span></div>
      <div className="elan-main"><div className="elan-text"><span>LE CORPS EN CONFIANCE.</span><p>Un peu<br />plus <em>vous.</em></p><span className="elan-description">Le mouvement juste.<br />L’énergie retrouvée.</span><span className="mock-cta">Découvrir le studio ↗</span></div><Photograph file="studio-elan" priority={priority} /></div>
      <div className="elan-bottom"><span>PILATES</span><span>MOUVEMENT</span><span>ÉQUILIBRE</span><span>POUR SOI.</span></div>
    </>}
    {id === "tempo" && <>
      <div className="mock-nav"><span className="tempo-logo">tempo<span>®</span></span><span>La plateforme &nbsp;&nbsp; Pour les équipes</span><span className="mock-nav-button">Commencer ↗</span></div>
      <div className="tempo-main"><span>FAITES PLACE À L’ESSENTIEL.</span><p>Moins de chaos.<br /><em>Plus d’élan.</em></p><span className="tempo-description">Vos projets. Votre équipe. Un seul espace.</span><span className="mock-cta">Découvrir Tempo ↗</span></div>
      <div className="tempo-dashboard"><div className="tempo-sidebar"><b>t.</b><span>Vue d’ensemble</span><span>Mes projets</span><span>L’équipe</span></div><div className="tempo-content"><div className="tempo-greeting"><strong>Tout avance.</strong><span>Cette semaine ↗</span></div><div className="tempo-metrics"><div><span>Projets actifs</span><b>12</b><i>+2 cette semaine</i></div><div><span>Temps retrouvé</span><b>8,5 h</b><i>Pour ce qui compte</i></div><div><span>Dans les temps</span><b>100 %</b><i>Gardez le rythme</i></div></div><div className="tempo-task"><span>Identité de marque</span><span className="task-line" /><span>En cours</span></div><div className="tempo-task"><span>Nouveau site</span><span className="task-line short" /><span>À valider</span></div></div></div>
    </>}
  </div>;
}
