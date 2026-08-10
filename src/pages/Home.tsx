import { Button, Icon, Kicker, Link, Reveal, Section, useLang } from "../lib/site";

export default function Home() {
  const { t } = useLang();
  const h = t.home;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 text-white sm:pt-36">
        <div className="grain-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-ink-500/25 blur-3xl animate-floaty"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-sage-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pb-32">
          <div>
            <Reveal>
              <Kicker light>{h.kicker}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 whitespace-pre-line text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                {h.title}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-200">{h.lead}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button to="/projekte" variant="light">
                  {t.cta.primary}
                </Button>
                <Button to="/mitmachen" variant="solid" className="!bg-amber-warm !text-ink-950 !shadow-amber-warm/30 hover:!bg-amber-warm/90">
                  {t.cta.donate}
                </Button>
                <Button to="/mitmachen" variant="ghost" className="text-white hover:text-amber-warm">
                  {t.cta.secondary}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.18em] text-ink-400">
                <span>Hamburg · Bergedorf</span>
                <span>Neuallermöhe</span>
                <span className="text-amber-warm">Charta der Vielfalt</span>
                <span>HolyDigits101</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/5 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <img
                  src="/images/backgroud.jpeg"
                  alt="Menschen unterschiedlicher Herkunft begegnen sich im Stadtteiltreff"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-4 w-56 rounded-2xl bg-white p-5 text-ink-900 shadow-2xl sm:-left-8">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  <Icon name="users" className="h-4 w-4" />
                  est. 2014
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{h.statsTitle}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <Section className="bg-sand">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {h.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="border-l-2 border-ink-200 pl-5">
                <div className="text-4xl font-extrabold tracking-tight text-ink-900 lg:text-5xl">
                  {s.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MISSION */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Kicker>{h.missionKicker}</Kicker>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              {h.missionTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-600">{h.missionText}</p>
            <div className="mt-8">
              <Button to="/ueber-uns" variant="outline">
                {t.cta.more}
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-1">
            {h.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="group flex gap-5 rounded-3xl border border-ink-100 bg-white p-7 shadow-[0_1px_2px_rgba(18,29,54,0.04)] transition-all duration-400 hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_24px_60px_-30px_rgba(18,29,54,0.4)]">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-ink-800 group-hover:text-white">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-ink-900">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS PREVIEW */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>{h.projectsKicker}</Kicker>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                {h.projectsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600">
                {h.projectsText}
              </p>
            </div>
            <Button to="/projekte" variant="outline">
              {t.cta.all}
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                to={`/projekte/detail/${p.slug}`}
                className="group block h-full overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(18,29,54,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(18,29,54,0.5)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-700">
                    {p.tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold tracking-tight text-ink-900">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-600">{p.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800">
                    {t.news.readMore}
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PARTNER STRIP */}
      <Section>
        <Reveal>
          <div className="grid items-center gap-12 rounded-[2rem] border border-ink-100 bg-sand p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:p-16">
            <div>
              <Kicker>{h.partnersKicker}</Kicker>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                {h.partnersTitle}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-600">{h.partnersText}</p>
              <div className="mt-8">
                <Button to="/partner" variant="solid">
                  {t.cta.more}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://holydigits101.com"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative overflow-hidden rounded-2xl border border-ink-900/10 p-6 text-white transition-all duration-400 hover:-translate-y-1 hover:shadow-xl sm:col-span-2"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('/images/community1.jpg')" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-warm">
                      {t.partners.strategicKicker}
                    </span>
                    <Icon name="spark" className="h-5 w-5 text-amber-warm" />
                  </div>
                  <div className="mt-3 text-2xl font-extrabold tracking-tight">HolyDigits101</div>
                  <p className="mt-2 text-sm text-ink-300">holydigits101.com</p>
                </div>
              </a>
              {t.projects.partners.slice(0, 4).map((n) => (
                <div
                  key={n}
                  className="grid place-items-center rounded-2xl border border-ink-100 bg-white p-6 text-center text-sm font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-1 hover:border-ink-200"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-900 px-6 py-24 text-white lg:px-10 lg:py-28">
        <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-sage-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{h.ctaTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">{h.ctaText}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/mitmachen" variant="light">
                {t.cta.secondary}
              </Button>
              <Button to="/kontakt" variant="ghost" className="text-white hover:text-amber-warm">
                {t.cta.contact}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
