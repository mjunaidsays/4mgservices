/**
 * Client testimonials.
 *
 * Deliberately empty. The owner has confirmed real testimonials exist — until
 * they are supplied, the homepage and about page simply omit the section rather
 * than display invented praise. Add entries here and the section appears.
 *
 * TODO(owner): supply quote, name, role, company and (optionally) a logo path.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Path under /public, e.g. "/clients/acme.svg". Optional. */
  logo?: string;
};

export const testimonials: Testimonial[] = [];

/**
 * Client logos for the trust strip. Same rule: nothing shown until real logos
 * are provided.
 *
 * TODO(owner): supply client logos as SVG or transparent PNG in /public/clients.
 */
export type ClientLogo = { name: string; src: string; width: number; height: number };

export const clientLogos: ClientLogo[] = [];
