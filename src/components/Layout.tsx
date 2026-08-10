import { useEffect, useState, type ReactNode } from "react";
import { nav, org } from "../content";
import { Icon, Link, useLang } from "../lib/site";

const HD_URL = "https://holydigits101.com";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={org.name}>
      <img
        src="/images/logo.png"
        alt={org.name}
        className="h-18 w-30 shrink-0 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="leading-tight">
        <span
          className={`block text-[15px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          
        </span>
        <span
          className={`block text-[11px] font-medium uppercase tracking-[0.18em] ${
            light ? "text-ink-300" : "text-ink-500"
          }`}
        >
        </span>
      </span>
    </Link>
  );
}

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`relative flex items-center rounded-full border p-0.5 ${
        compact ? "border-ink-200 bg-white" : "border-ink-200/80 bg-ink-50"
      }`}
      role="group"
      aria-label="Sprache / Language"
    >
      <span
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-ink-800 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: lang === "de" ? "translateX(0)" : "translateX(100%)" }}
        aria-hidden="true"
      />
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 w-10 rounded-full py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
            lang === l ? "text-white" : "text-ink-500 hover:text-ink-800"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header({ path }: { path: string }) {
  const { lang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const items = nav[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        {lang === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink-100 bg-white/85 py-2 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(18,29,54,0.35)]"
            : "border-b border-transparent bg-white/0 py-4"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Hauptnavigation">
            {items.map((item) => {
              const active =
                item.path === "/" ? path === "/" : path === item.path || path.startsWith(item.path + "/");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                    active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-amber-warm transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              to="/mitmachen"
              className="hidden rounded-full bg-ink-800 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-ink-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 lg:inline-flex"
            >
              {t.cta.donate}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-800 transition hover:border-ink-400 xl:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 rounded-b-[2rem] bg-white px-6 pb-8 pt-24 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <nav className="flex flex-col divide-y divide-ink-100">
            {items.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-4 text-lg font-semibold tracking-tight transition-colors ${
                  item.path === "/"
                    ? path === "/"
                      ? "text-ink-900"
                      : "text-ink-600"
                    : path === item.path || path.startsWith(item.path + "/")
                      ? "text-ink-900"
                      : "text-ink-600"
                }`}
              >
                {item.label}
                <span className="text-xs font-mono text-ink-300">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <Link
            to="/mitmachen"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-ink-800 px-6 py-4 text-sm font-semibold text-white"
          >
            {t.cta.donate}
          </Link>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const { lang, t } = useLang();
  const items = nav[lang];
  return (
    <footer className="relative overflow-hidden bg-ink-950 px-6 pt-20 pb-10 text-ink-200 lg:px-10">
      <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-300">{t.footer.about}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t.footer.nav}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.path}>
                  <Link to={i.path} className="text-ink-300 transition hover:text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t.footer.contact}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-300">
              <li className="flex gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <span>
                  {org.street}
                  <br />
                  {org.city}
                  <br />
                  {org.postfach}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <a className="transition hover:text-white" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <span>{org.phone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t.footer.partner}
            </h3>
            <a
              href={HD_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="relative mt-5 block overflow-hidden rounded-2xl border border-white/10 p-5 transition duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('/images/hero.jpg')" }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/40 to-ink-950/60" aria-hidden="true" />
              <span className="relative flex items-center gap-2 text-sm font-bold text-white">
                HolyDigits101
                <Icon name="spark" className="h-4 w-4 text-amber-warm" />
              </span>
              <span className="relative mt-2 block text-xs leading-relaxed text-ink-300">
                {t.footer.madeWith} HolyDigits101 — holydigits101.com
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {org.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/kontakt" className="transition hover:text-white">
              {t.footer.imprint}
            </Link>
            <span>{org.register}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header path={path} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
