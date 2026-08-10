import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "../content";

/* ---------------- language ---------------- */

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content };
const LangCtx = createContext<Ctx>({ lang: "de", setLang: () => {}, t: content.de });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("mib-lang") : null;
    return stored === "en" ? "en" : "de";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("mib-lang", lang);
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang: setLangState, t: content[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);

/* ---------------- hash router ---------------- */

const readPath = () => {
  const h = window.location.hash.replace(/^#/, "");
  return h === "" ? "/" : h;
};

export function useRoute() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const onHash = () => {
      setPath(readPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return path;
}

export function navigate(to: string) {
  if (readPath() === to) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = to;
}

export function Link({
  to,
  className,
  children,
  ...rest
}: { to: string; className?: string; children: ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        rest.onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ---------------- scroll reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------------- UI primitives ---------------- */

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        light ? "text-ink-200" : "text-ink-500"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-ink-300/60" : "bg-ink-300"}`} />
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-24 lg:px-10 lg:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "solid" | "outline" | "light" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const btnBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-400 focus-visible:ring-offset-2";

const variants: Record<string, string> = {
  solid: "bg-ink-800 text-white shadow-lg shadow-ink-900/15 hover:bg-ink-900 hover:shadow-xl hover:shadow-ink-900/25 hover:-translate-y-0.5",
  outline: "border border-ink-200 bg-white/70 text-ink-800 hover:border-ink-400 hover:bg-white hover:-translate-y-0.5",
  light: "bg-white text-ink-900 shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-xl",
  ghost: "text-ink-700 hover:text-ink-900",
};

export function Button({ children, to, href, variant = "solid", className = "", type }: BtnProps) {
  const cls = `${btnBase} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type ?? "button"} className={cls}>
      {inner}
    </button>
  );
}

/* ---------------- icons ---------------- */

const paths: Record<string, ReactNode> = {
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></>,
  hands: <><path d="M11 13V5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M14 12V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 12V7.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-2a7 7 0 0 1-7-7v-4a1.5 1.5 0 0 1 3 0v2" /></>,
  heart: <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v9h14v-9" /><path d="M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5M12 8s1.5-5 4-5a2.5 2.5 0 0 1 0 5" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
  spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 13 4 4L19 7" />,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}

/* ---------------- page header ---------------- */

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="relative overflow-hidden bg-ink-950 px-6 pb-20 pt-36 text-white sm:pb-24 sm:pt-44 lg:px-10">
      <div className="grain-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-ink-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-[-6rem] h-[22rem] w-[22rem] rounded-full bg-sage-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal>
          <Kicker light>{kicker}</Kicker>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">{lead}</p>
        </Reveal>
      </div>
    </header>
  );
}
