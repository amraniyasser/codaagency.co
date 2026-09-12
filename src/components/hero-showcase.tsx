"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/site";
import { Pause } from "./icons";
import { Mockup } from "./mockup";

/** CSS perspective keeps the gallery light; pointer movement never rerenders React. */
export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const stopped = paused || reduced || !visible || hovered || focused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (stopped) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % projects.length), 8000);
    return () => window.clearInterval(timer);
  }, [stopped, active]);

  useEffect(() => {
    const node = stage.current;
    if (!node || reduced || !visible) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      node.style.setProperty("--pointer-x", "0deg");
      node.style.setProperty("--pointer-y", "0deg");
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") return;
      const bounds = node.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--pointer-x", `${-y * 3}deg`);
        node.style.setProperty("--pointer-y", `${x * 4}deg`);
      });
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      reset();
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      finePointer.removeEventListener("change", reset);
    };
  }, [reduced, visible]);

  const select = (index: number) => {
    setActive((index + projects.length) % projects.length);
    setPaused(true);
  };

  return <div className="hero-3d" ref={region} role="region" aria-roledescription="carrousel"
    aria-label="Galerie de concepts de sites imaginés par Coda" data-stopped={stopped}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        select(active + (event.key === "ArrowRight" ? 1 : -1));
      }
    }}>
    <div className="hero-3d-stage" ref={stage} aria-hidden="true">
      <div className="hero-3d-orbit">
        {projects.map((project, index) => <div className="hero-3d-card" key={project.id}
          data-position={(index - active + projects.length) % projects.length}>
          <div className="hero-3d-float">
            <div className="hero-3d-window">
              <div className="hero-3d-bar"><span className="hero-3d-window-dots"><i /><i /><i /></span><span>{project.name}</span><span>↗</span></div>
              <Mockup id={project.id} priority={index === 0} />
            </div>
          </div>
        </div>)}
      </div>
    </div>
    <div className="hero-3d-caption">
      <div className="hero-3d-current" aria-live={paused ? "polite" : "off"} aria-atomic="true">
        <span className="hero-3d-index">0{active + 1} <span>/ 04</span></span>
        <div><strong>{projects[active].name}</strong><span>Concept créatif · {projects[active].sector}</span></div>
      </div>
      <div className="hero-3d-controls">
        {projects.map((project, index) => <button key={project.id} type="button"
          aria-label={`Voir le concept ${project.name}`} aria-pressed={active === index}
          onClick={() => select(index)}><span className="hero-3d-dot" /></button>)}
        <button type="button" className="hero-3d-pause" disabled={reduced}
          aria-label={reduced ? "Animations désactivées selon vos préférences" : paused ? "Lancer le défilement automatique" : "Mettre le défilement en pause"}
          aria-pressed={paused || reduced} onClick={() => setPaused(value => !value)}><Pause paused={paused || reduced} /></button>
      </div>
    </div>
  </div>;
}
