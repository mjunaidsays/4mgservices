import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { footerNav, siteConfig } from "@/lib/site-config";

/**
 * The footer doubles as a sitemap — every route is one click from every page,
 * which is both a usability win and the crawl path search engines expect.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="on-dark bg-navy-950 bg-grid-dark text-white">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              A UAE and Pakistan based shipping and logistics company
              simplifying international trade for businesses of every size.
            </p>

            <div className="mt-7 space-y-3 text-[0.9375rem]">
              <a
                href={`tel:${siteConfig.contact.phoneE164}`}
                className="flex items-center gap-3 text-white/75 transition-colors duration-160 hover:text-white"
              >
                <Phone aria-hidden className="size-4 shrink-0 text-orange-400" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-white/75 transition-colors duration-160 hover:text-white"
              >
                <Mail aria-hidden className="size-4 shrink-0 text-orange-400" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2
                  id={`footer-${group.title}`}
                  className="text-eyebrow font-semibold text-white/60 uppercase"
                >
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-white/70 transition-colors duration-160 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-navy-800 pt-10 sm:grid-cols-2">
          {siteConfig.offices.map((office) => (
            <div key={office.id} className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-orange-400" />
              <address className="text-[0.9375rem] not-italic">
                <span className="font-medium text-white">{office.country}</span>
                <span className="mt-1 block text-white/60">
                  {office.addressLines.join(", ")}
                </span>
              </address>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socials.map(([network, url]) => (
              <a
                key={network}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="capitalize transition-colors duration-160 hover:text-white"
              >
                {network}
              </a>
            ))}
            <Link href="/privacy" className="transition-colors duration-160 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-160 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
