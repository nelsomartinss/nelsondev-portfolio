// TODO: replace the placeholders below with your real contact data.

export const contact = {
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: "5500000000000",
  /** How the number is shown and copied. */
  whatsappDisplay: "+55 (00) 00000-0000",
  email: "voce@exemplo.com",
  linkedin: "https://www.linkedin.com/in/seu-usuario",
  github: "https://github.com/nelsomartinss",
};

export const stripProtocol = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
