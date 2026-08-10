import { useState } from "react";
import { Button, Icon, Kicker, Link, Reveal, Section, useLang } from "../lib/site";
import { org } from "../content";

export type DetailType = "artikel" | "termin";

interface DetailItem {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  content: string[];
  date?: string;
  tag?: string;
  author?: string;
  readTime?: string;
  day?: string;
  month?: string;
  time?: string;
  place?: string;
}

function ShareBar({ title, shareTitle, copiedLabel }: { title: string; shareTitle: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const cls =
    "inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400 hover:shadow-md";

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-8">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        {shareTitle}
      </span>
      <a
        className={cls}
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + "\n" + url)}`}
      >
        <Icon name="mail" className="h-3.5 w-3.5" /> E-Mail
      </a>
      <a
        className={cls}
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon name="external" className="h-3.5 w-3.5" /> WhatsApp
      </a>
      <a
        className={cls}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon name="spark" className="h-3.5 w-3.5" /> X / Twitter
      </a>
      <button type="button" onClick={copyLink} className={cls}>
        <Icon name="check" className="h-3.5 w-3.5" />
        {copied ? copiedLabel : "Link"}
      </button>
    </div>
  );
}

export default function NewsDetail({ type, slug }: { type: DetailType; slug: string }) {
  const { t } = useLang();
  const n = t.news;
  const isEvent = type === "termin";

  const found = isEvent
    ? n.events.find((e) => e.slug === slug)
    : n.items.find((i) => i.slug === slug);
  const item: DetailItem | undefined = found;

  if (!item) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="text-7xl font-extrabold tracking-tight text-ink-200">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink-900">{n.back}</h1>
        <div className="mt-8">
          <Button to="/aktuelles">{n.back}</Button>
        </div>
      </div>
    );
  }

  const relatedNews = n.items.filter((i) => i.slug !== slug).slice(0, 3);
  const relatedEvents = n.events.filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <>
      {/* detail header */}
      <header className="relative overflow-hidden bg-ink-950 px-6 pb-16 pt-32 text-white sm:pb-20 sm:pt-40 lg:px-10">
        <div className="grain-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ink-500/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <Link
              to="/aktuelles"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ink-200 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
            >
              <Icon name="arrowLeft" className="h-3.5 w-3.5" />
              {n.back}
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-amber-warm px-3 py-1 font-bold uppercase tracking-widest text-ink-950">
                {isEvent ? n.eventsTitle : item.tag}
              </span>
              <time className="inline-flex items-center gap-1.5 text-ink-300">
                <Icon name="calendar" className="h-4 w-4" />
                {isEvent ? `${item.day}. ${item.month}` : item.date}
              </time>
              {!isEvent && item.author && (
                <span className="inline-flex items-center gap-1.5 text-ink-300">
                  <Icon name="users" className="h-4 w-4" />
                  {n.authorLabel} {item.author}
                </span>
              )}
              {!isEvent && item.readTime && (
                <span className="inline-flex items-center gap-1.5 text-ink-300">
                  <Icon name="clock" className="h-4 w-4" />
                  {item.readTime} {n.readLabel}
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">{item.excerpt}</p>
          </Reveal>
        </div>
      </header>

      <Section className="!pt-12 lg:!pt-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          {/* article */}
          <article className="min-w-0">
            {item.image && (
              <Reveal>
                <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(18,29,54,0.5)]">
                  <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover" />
                </div>
              </Reveal>
            )}

            {/* event info band */}
            {isEvent && (
              <Reveal delay={80}>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-ink-100 bg-sand p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
                      <Icon name="calendar" className="h-4 w-4" /> {n.dateLabel}
                    </div>
                    <p className="mt-2 font-bold tracking-tight text-ink-900">
                      {item.day}. {item.month}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink-100 bg-sand p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
                      <Icon name="clock" className="h-4 w-4" /> {n.timeLabel}
                    </div>
                    <p className="mt-2 font-bold tracking-tight text-ink-900">{item.time}</p>
                  </div>
                  <div className="rounded-2xl border border-ink-100 bg-sand p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
                      <Icon name="pin" className="h-4 w-4" /> {n.locationLabel}
                    </div>
                    <p className="mt-2 font-bold tracking-tight text-ink-900">{item.place}</p>
                  </div>
                </div>
              </Reveal>
            )}

            {/* body */}
            <Reveal delay={100}>
              <div className="mt-10 space-y-6">
                {item.content.map((para, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed text-ink-700 ${
                      i === 0 ? "text-lg font-medium text-ink-800 sm:text-xl" : "text-[16.5px]"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <ShareBar title={item.title} shareTitle={n.shareTitle} copiedLabel={n.copied} />
            </Reveal>

            {/* CTA */}
            <Reveal delay={120}>
              <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white sm:p-10">
                <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{t.home.ctaTitle}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-ink-200">{t.home.ctaText}</p>
                  </div>
                  <Button to="/mitmachen" variant="light" className="shrink-0">
                    {t.cta.donate}
                  </Button>
                </div>
              </div>
            </Reveal>
          </article>

          {/* sidebar */}
          <aside className="space-y-10">
            <Reveal delay={120}>
              <div>
                <Kicker>{isEvent ? n.relatedEvents : n.relatedNews}</Kicker>
                <div className="mt-6 space-y-4">
                  {(isEvent ? relatedEvents : relatedNews).map((r) => {
                    const rel: DetailItem = r;
                    return (
                      <Link
                        key={rel.slug}
                        to={isEvent ? `/aktuelles/termin/${rel.slug}` : `/aktuelles/artikel/${rel.slug}`}
                        className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-30px_rgba(18,29,54,0.5)]"
                      >
                        {rel.image && (
                          <img
                            src={rel.image}
                            alt=""
                            loading="lazy"
                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs text-ink-400">
                            {rel.date ?? `${rel.day}. ${rel.month}`}
                          </p>
                          <p className="mt-1 text-sm font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-ink-600">
                            {rel.title}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-3xl border border-ink-100 bg-sand p-7">
                <Icon name="mail" className="h-5 w-5 text-ink-700" />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{t.contact.lead}</p>
                <a
                  href={`mailto:${org.email}`}
                  className="mt-4 inline-block text-sm font-semibold text-ink-900 underline decoration-amber-warm underline-offset-4"
                >
                  {org.email}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
