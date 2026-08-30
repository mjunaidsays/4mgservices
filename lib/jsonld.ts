import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

/**
 * schema.org builders. Structured data is now an AI trust signal as well as an
 * SEO one — answer engines lean on it to decide what to cite — so every route
 * emits the node that matches what it actually is.
 */

type JsonLdNode = Record<string, unknown>;

export const ORGANIZATION_ID = absoluteUrl("/#organization");
export const WEBSITE_ID = absoluteUrl("/#website");

export function organizationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    slogan: siteConfig.motto,
    description: siteConfig.description,
    logo: absoluteUrl("/brand/logo.jpeg"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    areaServed: siteConfig.offices.map((office) => office.country),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        availableLanguage: ["en", "ur"],
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

/** One node per office, so each market can rank locally. */
export function localBusinessJsonLd(): JsonLdNode[] {
  return siteConfig.offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl(`/#office-${office.id}`),
    name: `${siteConfig.name} — ${office.country}`,
    parentOrganization: { "@id": ORGANIZATION_ID },
    url: siteConfig.url,
    telephone: office.phone,
    email: office.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.addressLines.join(", "),
      addressLocality: office.city,
      addressCountry: office.countryCode,
      ...(office.postalCode ? { postalCode: office.postalCode } : {}),
    },
  }));
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  slug: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: siteConfig.offices.map((office) => ({
      "@type": "Country",
      name: office.country,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: { name: string; href: string }[],
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/insights/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author ?? siteConfig.name },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
  };
}

/**
 * MND Interiors is a design/fit-out business, not a software product, so it
 * gets `HomeAndConstructionBusiness` rather than `SoftwareApplication` — the
 * schema.org type built for exactly this kind of trade.
 */
export function interiorsBusinessJsonLd(business: {
  name: string;
  description: string;
  url: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    description: business.description,
    url: absoluteUrl(business.url),
    parentOrganization: { "@id": ORGANIZATION_ID },
    areaServed: siteConfig.offices.map((office) => office.country),
  };
}

export function softwareApplicationJsonLd(app: {
  name: string;
  description: string;
  category: string;
  url: string;
  operatingSystem?: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: app.category,
    operatingSystem: app.operatingSystem ?? "Web",
    url: absoluteUrl(app.url),
    publisher: { "@id": ORGANIZATION_ID },
  };
}
