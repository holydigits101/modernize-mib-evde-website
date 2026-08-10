import { Button, Icon, Kicker, Link, PageHero, Reveal, Section, useLang } from "../lib/site";

export default function Projects() {
  const { t } = useLang();
  const p = t.projects;

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead} />

      <Section>
        <div className="space-y-8 lg:space-y-10">
          {p.items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 2) * 60}>
              <Link
                to={`/projekte/detail/${item.slug}`}
                className={`group grid overflow-hidden rounded-[2rem] border border-ink-100 bg-white transition-all duration-500 hover:shadow-[0_40px_90px_-50px_rgba(18,29,54,0.55)] lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative m-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04] lg:h-full lg:min-h-[22rem]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-700">
                    {item.tag}
                  </span>
                </figure>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="text-xs font-mono text-ink-300">
                    0{i + 1} / 0{p.items.length}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 text-[16px] leading-relaxed text-ink-600">{item.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
                    {t.news.readMore}
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* cooperation partners */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <Kicker>{p.partnersKicker}</Kicker>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {p.partnersTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600">{p.partnersText}</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-4">
          {p.partners.map((name, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400 hover:shadow-md">
                <span className="h-2 w-2 rounded-full bg-sage-500" />
                {name}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-ink-900 p-10 text-white sm:p-14 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.home.ctaTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-200">{t.home.ctaText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/mitmachen" variant="light">
                {t.cta.donate}
              </Button>
              <Button to="/kontakt" variant="ghost" className="text-white hover:text-amber-warm">
                {t.cta.contact}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
