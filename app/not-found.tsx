import Link from "next/link";

import { Button } from "@/components/ui/button";
import { logisticsNav } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[70vh] items-center bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />

      <div className="container-site py-24">
        <p className="text-eyebrow font-semibold text-orange-400 uppercase">
          Error 404
        </p>

        <h1 className="mt-4 text-h1 text-white">
          This one didn&apos;t reach its destination
        </h1>

        <p className="mt-5 max-w-xl text-lead text-white/70">
          The page you were looking for has moved or never existed. Here is the
          way back.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        <div className="mt-14 border-t border-navy-800 pt-8">
          <h2 className="text-eyebrow font-semibold text-white/60 uppercase">
            Our services
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {logisticsNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/70 underline-offset-4 transition-colors duration-160 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
