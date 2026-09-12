import { basePath } from "@/lib/site";
export default function NotFound() {
  return <main className="not-found shell"><span className="eyebrow">CODA AGENCY / 404</span><h1>Une autre<br />direction.</h1><p>Cette page n’existe plus. Retrouvez notre nouvel univers.</p><a className="button button-dark" href={`${basePath}/`}>Retour à l’accueil ↗</a></main>;
}
