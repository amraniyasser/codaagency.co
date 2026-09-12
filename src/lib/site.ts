export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/codaagency.co";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://amraniyasser.github.io/codaagency.co").replace(/\/$/, "");

export const site = {
  name: "Coda Agency",
  title: "Création de sites web au Maroc — Coda Agency",
  description: "Un site à la hauteur de votre entreprise. Coda Agency crée des sites web sur mesure au Maroc : design, développement et référencement, pour tous les secteurs.",
  // Public contact address of this repository's owner. Set a dedicated agency
  // inbox here when available. No unverified domain inbox or third-party form.
  email: "amrani.nejjar.yasser@gmail.com",
};
export const asset = (path: string) => `${basePath}/assets/${path}`;

export const projects = [
  {id: "azur", name: "Maison Azur", sector: "Hospitalité & immobilier", note: "L’art de prendre le large.", color: "#dae3e4"},
  {id: "aura", name: "Aura Botanique", sector: "Beauté & art de vivre", note: "Le soin, dans sa plus belle forme.", color: "#ecbfa6"},
  {id: "elan", name: "Studio Élan", sector: "Sport & bien-être", note: "Le mouvement, à votre rythme.", color: "#deded0"},
  {id: "tempo", name: "Tempo", sector: "Technologie & services", note: "De la clarté dans vos journées.", color: "#d7d8e0"},
] as const;
export type ProjectId = typeof projects[number]["id"];

export function makeProjectMessage(data: { name: string; company: string; email: string; phone: string; budget: string; service: string; details: string }) {
  const subject = `Projet web — ${data.company || data.name}`;
  const body = `Bonjour Coda,\n\n${data.details}\n\nNom : ${data.name}\nEntreprise : ${data.company || "Non précisée"}\nEmail : ${data.email}\nTéléphone : ${data.phone || "Non précisé"}\nBudget : ${data.budget || "À définir"}\nBesoin : ${data.service}\n\nÀ bientôt.`;
  return {subject, body, href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
