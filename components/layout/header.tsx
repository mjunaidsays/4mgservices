"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  interiorsNav,
  logisticsNav,
  mainNav,
  siteConfig,
  technologyNav,
  type NavLink,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Every page opens on a dark hero, so the header sits transparent over it and
 * only gains a background once the page scrolls. Text stays white throughout,
 * which keeps contrast predictable and avoids a colour swap mid-scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-50 text-white",
        "transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out-quart",
        scrolled
          ? "bg-navy-950/90 shadow-e2 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0 rounded-btn"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo />
        </Link>

        <NavigationMenu.Root
          delayDuration={80}
          className="relative hidden lg:block"
        >
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(
                  "group inline-flex h-10 items-center gap-1.5 rounded-btn px-3.5",
                  "text-[0.9375rem] text-white/85 transition-colors duration-160",
                  "hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10",
                )}
              >
                Services
                <ChevronDown
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>

              {/* No <Viewport> is rendered: with one present Radix moves this
                  content into it, and the viewport's own height animation left
                  the panel collapsed. Positioning it here keeps it in the DOM
                  where it is written. The top padding is a deliberate hover
                  bridge — a margin would create a dead gap that closes the menu
                  as the pointer travels from the trigger. */}
              <NavigationMenu.Content
                className={cn(
                  "absolute top-full left-0 w-[min(58rem,calc(100vw-3rem))] pt-2",
                  "data-[state=open]:animate-menu-in",
                )}
              >
                <MegaMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {mainNav
              .filter((item) => item.label !== "Services")
              .map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-10 items-center rounded-btn px-3.5",
                        "text-[0.9375rem] transition-colors duration-160",
                        "hover:bg-white/10 hover:text-white",
                        pathname.startsWith(item.href)
                          ? "text-white"
                          : "text-white/85",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/quote">Get a Quote</Link>
          </Button>

          <a
            href={`tel:${siteConfig.contact.phoneE164}`}
            className="inline-flex size-11 items-center justify-center rounded-btn text-white/85 transition-colors duration-160 hover:bg-white/10 hover:text-white sm:hidden"
            aria-label={`Call ${siteConfig.contact.phone}`}
          >
            <Phone aria-hidden className="size-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-btn text-white transition-colors duration-160 hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
          >
            <Menu aria-hidden className="size-6" />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}

/**
 * Three columns, deliberately unequal: logistics is the business; technology
 * and interiors are two distinct sides of it, kept visually separate rather
 * than folded into one "also from 4M" list.
 */
function MegaMenu() {
  return (
    <div className="overflow-hidden rounded-panel border border-navy-700 bg-navy-900 shadow-e3">
      <div className="grid gap-px bg-navy-700 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <MegaMenuColumn
          title="Logistics"
          items={logisticsNav}
          titleClassName="text-orange-400"
          className="bg-navy-900"
        />
        <MegaMenuColumn
          title="Technology"
          items={technologyNav}
          className="bg-navy-850"
        />
        <MegaMenuColumn
          title="Interiors"
          items={interiorsNav}
          className="bg-navy-850"
          footer={
            <NavigationMenu.Link asChild>
              <Link
                href="/services"
                className="text-sm font-medium text-orange-400 underline-offset-4 hover:underline"
              >
                View all services &rarr;
              </Link>
            </NavigationMenu.Link>
          }
        />
      </div>
    </div>
  );
}

function MegaMenuColumn({
  title,
  items,
  className,
  titleClassName,
  footer,
}: {
  title: string;
  items: NavLink[];
  className?: string;
  titleClassName?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col p-6", className)}>
      <p
        className={cn(
          "text-eyebrow font-semibold uppercase",
          titleClassName ?? "text-white/60",
        )}
      >
        {title}
      </p>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <NavigationMenu.Link asChild>
              <Link
                href={item.href}
                className="block rounded-btn px-3 py-2.5 transition-colors duration-160 hover:bg-white/[0.07]"
              >
                <span className="block text-[0.9375rem] font-medium text-white">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm text-white/55">
                  {item.description}
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>

      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </div>
  );
}
