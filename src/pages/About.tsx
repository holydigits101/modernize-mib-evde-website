import { Button, Icon, Kicker, PageHero, Reveal, Section, useLang } from "../lib/site";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} lead={a.lead} />

      {/* mission */}
      <Section>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-900 p-9 text-white sm:p-14 lg:p-16">
          <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sage-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <Kicker light>{a.missionTitle}</Kicker>
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {a.missionTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-200">{a.missionText}</p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="flex h-full flex-col justify-center gap-4">
                {a.missionBullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-[15px] leading-relaxed text-ink-100"
                  >
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-amber-warm" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* charter */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-col gap-6 rounded-[2rem] border border-ink-100 bg-sand p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-10">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink-900 text-center text-[11px] font-bold uppercase leading-tight tracking-widest text-white">
              Charta
              <br />
              der
              <br />
              Vielfalt
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ink-900">{a.charterTitle}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{a.charterText}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* philosophy & values */}
      <Section className="bg-ink-50/60">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <Kicker>{a.philosophyTitle}</Kicker>
              <div className="mt-8 overflow-hidden rounded-3xl">
                <img
                  src="/images/philsophy.jpeg"
                  alt="Ehrenamtliche des Vereins"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6">
            {a.philosophy.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={`leading-relaxed text-ink-700 ${i === 0 ? "text-xl sm:text-2xl font-medium text-ink-900 leading-snug" : "text-[17px]"}`}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <div className="mt-10">
                <h3 className="text-lg font-bold tracking-tight text-ink-900">{a.valuesTitle}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {a.values.map((v) => (
                    <div
                      key={v.title}
                      className="rounded-2xl border border-ink-100 bg-sand/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 text-ink-800">
                        <Icon name="check" className="h-4 w-4 text-sage-600" />
                        <h4 className="text-base font-bold tracking-tight">{v.title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* history */}
      <Section>
        <Reveal>
          <Kicker>{a.historyTitle}</Kicker>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {a.historyTitle}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-1">
          {a.history.map((item, i) => (
            <Reveal key={item.year} delay={i * 70}>
              <div className="group grid gap-3 border-t border-ink-200 py-7 lg:grid-cols-[9rem_1fr_1.4fr] lg:items-baseline lg:gap-10">
                <span className="text-2xl font-extrabold tracking-tight text-ink-400 transition-colors duration-300 group-hover:text-amber-warm">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-ink-900">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-600">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* board */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <div className="max-w-2xl">
            <Kicker>{a.boardTitle}</Kicker>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {a.boardTitle}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{a.boardText}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {a.board.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <article className="group h-full overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(18,29,54,0.45)]">
                <div className="relative grid aspect-[4/3] place-items-center bg-gradient-to-br from-ink-100 via-ink-50 to-sand">
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-ink-800 text-2xl font-extrabold text-white shadow-xl transition-transform duration-500 group-hover:scale-105">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    Foto folgt
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold tracking-tight text-ink-900">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-amber-warm">{m.role}</p>
                  {m.phone && (
                    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700">
                      <Icon name="phone" className="h-3.5 w-3.5" />
                      {m.phone}
                    </p>
                  )}
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{m.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button to="/projekte">{t.cta.primary}</Button>
            <Button to="/kontakt" variant="outline">
              {t.cta.contact}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
