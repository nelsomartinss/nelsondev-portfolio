export const contact = {
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: "5583996442273",
  /** How the number is shown and copied. */
  whatsappDisplay: "+55 (83) 99644-2273",
  email: "nelsonmartinsjp2001@gmail.com",
  linkedin: "https://www.linkedin.com/in/nelsomartinss",
  github: "https://github.com/nelsomartinss",
};

export const stripProtocol = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
