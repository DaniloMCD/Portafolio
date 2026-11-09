"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

type NavbarProps = {
  brand: string;
  items: NavItem[];
};

export default function Navbar({ brand, items }: NavbarProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // Marks as active the section that crosses the middle of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    // The last section can be short, so force it when reaching the bottom
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && items.length > 0) {
        setActive(items[items.length - 1].id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav className="pf-nav" aria-label="Main navigation">
      <div className="pf-nav-inner">
        <a href={`#${items[0]?.id ?? ""}`} className="pf-brand">
          {brand}
        </a>
        <ul className="pf-nav-links">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`pf-nav-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}