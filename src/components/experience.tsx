"use client";

import { useEffect, useRef, useState } from "react";
import { asset, basePath, projects, makeProjectMessage, site } from "@/lib/site";
import { Arrow, Close, Pause } from "./icons";
import { Mockup } from "./mockup";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="header shell"><a className="wordmark" href={`${basePath}/`} aria-label="Coda Agency, accueil"><img src={asset("logo/coda-agency.svg")} alt="Coda Agency" width="192" height="55" /></a><nav className="desktop-nav" aria-label="Navigation principale"><a href="#univers">Nos univers</a><a href="#approche">Notre approche</a></nav><a className="header-contact" href="#contact">Un projet en tête ? <span><Arrow diagonal /></span></a><button className="menu-button" ref={menuButton} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <Close /> : <span className="menu-lines" />}</button><nav id="mobile-menu" aria-label="Navigation mobile" className={`mobile-nav ${open ? "open" : ""}`} hidden={!open}><a href="#univers" onClick={() => setOpen(false)}>Nos univers <Arrow /></a><a href="#approche" onClick={() => setOpen(false)}>Notre approche <Arrow /></a><a href="#contact" onClick={() => setOpen(false)}>Parler de votre projet <Arrow diagonal /></a></nav></header>;
}

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const stopped = paused || reduced || !visible || hovered || focused;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener("change", sync);
    const node = region.current;
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (node) observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => { media.removeEventListener("change", sync); observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    if (stopped) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % projects.length), 8500);
    return () => window.clearInterval(timer);
  }, [stopped, active]);
  const select = (index: number) => { setActive(index); setPaused(true); };
  return <div className="hero-showcase" ref={region} role="region" aria-roledescription="carrousel" aria-label="Concepts de sites imaginés par Coda" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="showcase-surface" style={{background: projects[active].color}}>
      <div className="showcase-browser"><div className="browser-bar"><span className="browser-dots"><i /><i /><i /></span><span>Imaginé par Coda</span><span className="browser-expand">↗</span></div><div className="showcase-slides">{projects.map((project,index) => <div className={`showcase-slide ${active === index ? "active" : ""}`} key={project.id} aria-hidden={active !== index}><Mockup id={project.id} priority={index === 0} /></div>)}</div></div>
      <div className="showcase-floating-label"><span className="label-mark">c.</span><span>Votre prochaine<br /><strong>première impression.</strong></span><Arrow diagonal /></div>
    </div>
    <div className="showcase-caption"><div aria-live={paused ? "polite" : "off"}><strong>{projects[active].name}</strong><span>{projects[active].sector}</span></div><div className="carousel-controls"><div className="carousel-dots">{projects.map((p,i) => <button key={p.id} aria-label={`Voir le concept ${p.name}`} aria-pressed={active===i} onClick={() => select(i)}><span /></button>)}</div><button className="pause-button" aria-label={paused ? "Lancer le défilement automatique" : "Mettre le défilement en pause"} aria-pressed={paused} onClick={() => setPaused(!paused)} disabled={reduced}><Pause paused={paused || reduced} /></button></div></div>
  </div>;
}

export function ProjectGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected === null || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);
  const close = () => { dialog.current?.close(); setSelected(null); trigger.current?.focus(); };
  return <>
    <div className="project-grid">{projects.map((project,index) => <article className={`project-card project-card-${project.id}`} key={project.id} data-reveal><button className="project-open" onClick={event => { trigger.current = event.currentTarget; setSelected(index); }} aria-label={`Explorer le concept ${project.name}, ${project.sector}`}><div className="project-art" style={{background:project.color}}><div className="project-browser"><Mockup id={project.id} /></div><span className="project-hover">Explorer le concept <Arrow diagonal /></span></div><div className="project-info"><div><h3>{project.name}</h3><p>{project.sector}</p></div><span className="project-number">0{index+1} <Arrow diagonal /></span></div></button></article>)}</div>
    <dialog className="project-dialog" ref={dialog} aria-labelledby="concept-title" onClose={() => { setSelected(null); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {selected !== null && <div className="dialog-inner"><div className="dialog-heading"><div><span className="eyebrow">CONCEPT CRÉATIF / MARQUE FICTIVE</span><h2 id="concept-title">{projects[selected].name}</h2></div><button className="close-dialog" onClick={close} aria-label="Fermer le concept"><Close /></button></div><div className="dialog-preview"><Mockup id={projects[selected].id} priority /></div><div className="dialog-footer"><p>{projects[selected].note}</p><a className="button button-dark" href="#contact" onClick={close}>Créons votre univers <Arrow diagonal /></a></div></div>}
    </dialog>
  </>;
}

export function ContactForm() {
  const [service, setService] = useState("Création de site web");
  const [prepared, setPrepared] = useState<ReturnType<typeof makeProjectMessage> | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) || "").trim();
    const message = makeProjectMessage({name:value("name"),company:value("company"),email:value("email"),phone:value("phone"),budget:value("budget"),service,details:value("details")});
    setPrepared(message); setCopied(false); setCopyFailed(false);
    window.location.href = message.href;
  };
  const copy = async () => {
    if (!prepared) return;
    try { await navigator.clipboard.writeText(prepared.body); setCopied(true); setCopyFailed(false); }
    catch { setCopyFailed(true); requestAnimationFrame(() => messageField.current?.select()); }
  };
  return <form className="contact-form" action={`mailto:${site.email}`} method="post" encType="text/plain" onSubmit={submit} onChange={() => { if(prepared) setPrepared(null); }}>
    <fieldset className="service-choice"><legend>Qu’avez-vous en tête ?</legend><div>{["Création de site web","Refonte de site","Autre projet"].map(label => <label key={label}><input type="radio" name="service" value={label} checked={service===label} onChange={() => setService(label)} /><span>{label}</span></label>)}</div></fieldset>
    <div className="form-grid"><label className="form-field"><span>Votre nom <span aria-hidden="true">*</span></span><input name="name" autoComplete="name" placeholder="Comment vous appelez-vous ?" required maxLength={100} /></label><label className="form-field"><span>Entreprise</span><input name="company" autoComplete="organization" placeholder="Le nom de votre entreprise" maxLength={120} /></label><label className="form-field"><span>Email <span aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" placeholder="vous@entreprise.com" required maxLength={150} /></label><label className="form-field"><span>Téléphone</span><input name="phone" type="tel" autoComplete="tel" placeholder="Votre numéro" maxLength={30} /></label></div>
    <label className="form-field budget-field"><span>Budget envisagé</span><select name="budget" defaultValue=""><option value="">À définir ensemble</option><option>Moins de 10 000 MAD</option><option>10 000 – 25 000 MAD</option><option>25 000 – 50 000 MAD</option><option>Plus de 50 000 MAD</option></select></label>
    <label className="form-field"><span>Votre projet, en quelques mots <span aria-hidden="true">*</span></span><textarea name="details" rows={3} placeholder="Votre activité, vos envies, ce que vous aimeriez changer…" required maxLength={1800} /></label>
    <div className="form-submit"><span className="form-note">* Champs requis.<br />Le message s’ouvre dans votre application email.</span><button className="button button-dark" type="submit">Préparer mon email <Arrow diagonal /></button></div>
    {prepared && <div className="form-response" role="status"><p>Votre message est prêt. Envoyez-le depuis votre application email.</p><div><a href={prepared.href} className="text-link">Rouvrir mon email <Arrow diagonal /></a><button type="button" className="text-link" onClick={copy}>{copied ? "Message copié" : "Copier le message"}</button></div>{copyFailed && <label className="form-field"><span>Sélectionnez et copiez votre message :</span><textarea ref={messageField} readOnly value={prepared.body} rows={8} /></label>}</div>}
    <noscript><p>Écrivez-nous directement grâce au lien de contact, ou activez JavaScript pour préparer votre message.</p></noscript>
  </form>;
}

/** Progressive enhancement: content remains visible without JavaScript.
 * Motion code is loaded only when a below-the-fold element enters the viewport.
 * Reduced-motion users receive no reveals, scroll effects or autoplay. */
export function MotionEnhancer() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    const controls: {stop:()=>void}[] = [];
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect(); controls.forEach(control => control.stop());
      if (media.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          import("framer-motion").then(({animate}) => {
            if (disposed || media.matches) return;
            controls.push(animate(entry.target as HTMLElement,{transform:["translateY(26px)","translateY(0px)"],opacity:[0.3,1]},{duration:0.8,ease:[0.16,1,0.3,1]}));
          });
        }
      },{threshold:0.08});
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(node => { if(node.getBoundingClientRect().top>window.innerHeight) observer?.observe(node); });
    };
    setup(); media.addEventListener("change",setup);
    return () => { disposed=true; observer?.disconnect(); controls.forEach(control=>control.stop()); media.removeEventListener("change",setup); };
  },[]);
  return null;
}
