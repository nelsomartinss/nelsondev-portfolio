import { ExternalLink, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { Figure } from "@/components/ascii/Figure";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/brands";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Section";
import { contact, stripProtocol } from "@/content/contact";
import { getDictionary } from "@/i18n/dictionaries";

function ContactCard({
  icon,
  label,
  value,
  children,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-fg">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{label}</h3>
          <p className="truncate font-mono text-sm text-muted">{value}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">{children}</div>
    </Card>
  );
}

export async function Contact() {
  const dict = await getDictionary();
  const t = dict.contact;
  const iconClass = "size-5";

  return (
    <Section
      id="contato"
      title={dict.sections.contact}
      background={
        <Figure
          src="/figures/hands.png"
          mode="halftone"
          cell={7}
          fade="sides"
          className="inset-x-0 top-28 h-24 opacity-90 sm:top-40 sm:h-60 dark:opacity-70"
        />
      }
    >
      <p className="mb-8 max-w-xl pt-24 text-base text-muted sm:pt-60 sm:text-lg">
        {t.intro}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <ContactCard
            icon={<WhatsappIcon className={iconClass} />}
            label={t.whatsapp}
            value={contact.whatsappDisplay}
          >
            <CopyButton
              value={contact.whatsappDisplay}
              label={t.copy}
              copiedLabel={t.copied}
              ariaLabel={`${t.copy} ${t.whatsapp}`}
            />
            <ButtonLink
              href={`https://wa.me/${contact.whatsapp}`}
              external
              variant="primary"
            >
              <WhatsappIcon className="size-4" />
              {t.openWhatsapp}
            </ButtonLink>
          </ContactCard>
        </li>
        <li>
          <ContactCard
            icon={<Mail className={iconClass} aria-hidden />}
            label={t.email}
            value={contact.email}
          >
            <CopyButton
              value={contact.email}
              label={t.copy}
              copiedLabel={t.copied}
              ariaLabel={`${t.copy} ${t.email}`}
            />
            <ButtonLink href={`mailto:${contact.email}`}>
              <Mail className="size-4" aria-hidden />
              {t.sendEmail}
            </ButtonLink>
          </ContactCard>
        </li>
        <li>
          <ContactCard
            icon={<LinkedinIcon className={iconClass} />}
            label="LinkedIn"
            value={stripProtocol(contact.linkedin)}
          >
            <ButtonLink href={contact.linkedin} external>
              {t.openProfile}
              <ExternalLink className="size-4" aria-hidden />
            </ButtonLink>
          </ContactCard>
        </li>
        <li>
          <ContactCard
            icon={<GithubIcon className={iconClass} />}
            label="GitHub"
            value={stripProtocol(contact.github)}
          >
            <ButtonLink href={contact.github} external>
              {t.openProfile}
              <ExternalLink className="size-4" aria-hidden />
            </ButtonLink>
          </ContactCard>
        </li>
      </ul>
    </Section>
  );
}
