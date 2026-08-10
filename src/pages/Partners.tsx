import { Button, Icon, Kicker, PageHero, Reveal, Section, useLang } from "../lib/site";

const HD_URL = "https://holydigits101.com";

export default function Partners() {
  const { t } = useLang();
  const p = t.partners;

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead} />

      {/* strategic partner */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-ink-100 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800 p-9 text-white sm:p-14 lg:p-16">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: "url('/images/community1.jpg')" }}
              aria-hidden="true"
            />
            <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-warm/20 blur-3xl animate-floaty"
              aria-hidden="true"
            />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Kicker light>{p.strategicKicker}</Kicker>
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {p.hdTitle}
                  <span className="text-amber-warm">.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-200">{p.hdText}</p>
                <div className="mt-9">
                  <Button href={HD_URL} variant="light">
                    {p.hdCta}
                  </Button>
                </div>
              </div>
              <ul className="space-y-4 self-center">
                {p.hdPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-[15px] leading-relaxed text-ink-100 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/10"
                  >
                    <Icon name="spark" className="h-5 w-5 shrink-0 text-amber-warm" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* other partners */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <Kicker>{p.othersTitle}</Kicker>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {p.othersTitle}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.others.map((o, i) => (
            <Reveal key={o.name} delay={i * 70}>
              <div className="group h-full rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-35px_rgba(18,29,54,0.45)]">
                <div className="grid h-14 place-items-center rounded-xl bg-sand text-center text-sm font-extrabold uppercase tracking-[0.14em] text-ink-700">
                  {o.name}
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-600">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-ink-100 bg-sand p-10 sm:p-14 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                {p.becomeTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">{p.becomeText}</p>
            </div>
            <Button to="/kontakt">{t.cta.contact}</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
