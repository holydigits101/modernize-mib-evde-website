import { Button, Icon, Kicker, Link, Reveal, Section, useLang } from "../lib/site";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLang();
  const p = t.projects;
  const item = p.items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="text-7xl font-extrabold tracking-tight text-ink-200">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink-900">Projekt nicht gefunden</h1>
        <div className="mt-8">
          <Button to="/projekte">Zurück zu Projekte</Button>
        </div>
      </div>
    );
  }

  const related = p.items.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden bg-ink-950 px-6 pb-16 pt-32 text-white sm:pb-20 sm:pt-40 lg:px-10">
        <div className="grain-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ink-500/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <Link to="/projekte" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ink-200 backdrop-blur-sm transition hover:bg-white/10 hover:text-white">
              <Icon name="arrowLeft" className="h-3.5 w-3.5" />
              Zurück zu Projekte
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-amber-warm px-3 py-1 font-bold uppercase tracking-widest text-ink-950">{item.tag}</span>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{item.title}</h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">{item.text}</p>
          </Reveal>
        </div>
      </header>

      <Section className="!pt-12 lg:!pt-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <article className="min-w-0">
            {item.img && (
              <Reveal>
                <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(18,29,54,0.5)]">
                  <img src={item.img} alt={item.title} className="aspect-[16/9] w-full object-cover" />
                </div>
              </Reveal>
            )}
            <Reveal delay={100}>
              <div className="mt-10 space-y-6">
                {item.content?.map((para, i) => (
                  <p key={i} className={`leading-relaxed text-ink-700 ${i === 0 ? "text-lg font-medium text-ink-800 sm:text-xl" : "text-[16.5px]"}`}>
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white sm:p-10">
                <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{t.home.ctaTitle}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-ink-200">{t.home.ctaText}</p>
                  </div>
                  <Button to="/mitmachen" variant="light" className="shrink-0">{t.cta.donate}</Button>
                </div>
              </div>
            </Reveal>
          </article>

          <aside className="space-y-10">
            <Reveal delay={120}>
              <div>
                <Kicker>Weitere Projekte</Kicker>
                <div className="mt-6 space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} to={`/projekte/detail/${r.slug}`} className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-30px_rgba(18,29,54,0.5)]">
                      <img src={r.img} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs text-ink-400">{r.tag}</p>
                        <p className="mt-1 text-sm font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-ink-600">{r.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="rounded-3xl border border-ink-100 bg-sand p-7">
                <Icon name="mail" className="h-5 w-5 text-ink-700" />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{t.contact.lead}</p>
                <a href="mailto:info@mib-ev.de" className="mt-4 inline-block text-sm font-semibold text-ink-900 underline decoration-amber-warm underline-offset-4">info@mib-ev.de</a>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}