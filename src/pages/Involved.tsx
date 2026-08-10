import { Button, Icon, Kicker, PageHero, Reveal, Section, useLang } from "../lib/site";
import { org } from "../content";

export default function Involved() {
  const { t } = useLang();
  const g = t.involved;

  return (
    <>
      <PageHero kicker={g.kicker} title={g.title} lead={g.lead} />

      {/* ways to get involved */}
      <Section>
        <div className="grid gap-7 md:grid-cols-2">
          {g.ways.map((w, i) => (
            <Reveal key={w.title} delay={i * 90}>
              <div className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-38px_rgba(18,29,54,0.5)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                  <Icon name={w.icon} className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-xl font-bold tracking-tight text-ink-900">{w.title}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">{w.text}</p>
                <div className="mt-7">
                  <Button to="/kontakt" variant="outline" className="!px-5 !py-3 text-[13px]">
                    {w.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* how to become a member */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>{g.stepsTitle}</Kicker>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                {g.stepsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600">{g.stepsText}</p>
            </div>
            <Button to="/kontakt">{t.cta.membership}</Button>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {g.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="relative h-full rounded-3xl border border-ink-100 bg-white p-8">
                <span className="absolute right-7 top-6 text-6xl font-extrabold tracking-tight text-ink-100">
                  0{i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-amber-warm text-sm font-extrabold text-ink-950">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* donation */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-ink-900 p-9 text-white sm:p-12">
              <Kicker light>{g.donateTitle}</Kicker>
              <h2 className="mt-6 text-3xl font-bold tracking-tight">{g.donateTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-200">{g.donateText}</p>
              <dl className="mt-9 space-y-4 border-t border-white/10 pt-8 text-sm">
                {[
                  [g.accountHolder, org.name],
                  ["Bank", org.bankName],
                  ["IBAN", org.iban],
                  ["BIC", org.bic],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-400">{k}</dt>
                    <dd className="font-semibold tracking-tight text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-9">
                <Button to="/kontakt" variant="light">
                  {g.donateCta}
                </Button>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-ink-400">
                {org.register} · {org.ustId} · {org.email}
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            {/* charity shop / fundraising */}
            <Reveal delay={80}>
              <div className="rounded-[2rem] border border-ink-100 bg-sand p-9 sm:p-10">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-amber-warm">
                  <Icon name="gift" className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink-900">
                  {g.fundraisingTitle}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
                  {g.fundraisingText}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to="/kontakt" variant="outline" className="!px-5 !py-3 text-[13px]">
                    {t.cta.contact}
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* volunteering */}
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-center rounded-[2rem] border border-ink-100 bg-white p-9 sm:p-10">
                <Kicker>{g.volunteerTitle}</Kicker>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink-900">
                  {g.volunteerTitle}
                </h3>
                <ul className="mt-7 space-y-4">
                  {g.volunteerPoints.map((p) => (
                    <li key={p} className="flex gap-3.5 text-[15.5px] leading-relaxed text-ink-700">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Button to="/kontakt">{t.cta.volunteer}</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
