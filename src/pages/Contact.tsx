import { useState } from "react";
import { Button, Icon, Kicker, PageHero, Reveal, Section, useLang } from "../lib/site";
import { org } from "../content";

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const field =
    "w-full rounded-2xl border border-ink-200 bg-white px-5 py-3.5 text-[15px] text-ink-900 outline-none transition-all duration-300 placeholder:text-ink-300 focus:border-ink-500 focus:ring-4 focus:ring-ink-100";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    window.location.href = `mailto:${org.email}?subject=${encodeURIComponent(
      form.subject || org.short,
    )}&body=${encodeURIComponent(`${form.message}\n\n${form.name} — ${form.email}`)}`;
  }

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} lead={c.lead} />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* form */}
          <Reveal>
            <div className="rounded-[2rem] border border-ink-100 bg-sand p-8 sm:p-10">
              <Kicker>{c.formTitle}</Kicker>
              <form className="mt-8 space-y-4" onSubmit={submit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className={field}
                    placeholder={c.form.name}
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-label={c.form.name}
                  />
                  <input
                    className={field}
                    type="email"
                    placeholder={c.form.email}
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-label={c.form.email}
                  />
                </div>
                <input
                  className={field}
                  placeholder={c.form.subject}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  aria-label={c.form.subject}
                />
                <textarea
                  className={`${field} min-h-40 resize-y`}
                  placeholder={c.form.message}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-label={c.form.message}
                />
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-800 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-ink-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 sm:w-auto"
                >
                  {c.form.send}
                  <Icon name="check" className="h-4 w-4" />
                </button>
                {sent && <p className="pt-1 text-sm font-medium text-sage-600">{c.form.sent}</p>}
              </form>

              <div className="mt-10 rounded-2xl bg-ink-900 p-6 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold leading-snug">{t.cta.donate}</p>
                  <Button to="/mitmachen" variant="light" className="!px-5 !py-3 text-[13px]">
                    {c.donateCta}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* details */}
          <div className="space-y-10">
            <Reveal delay={100}>
              <div>
                <Kicker>{c.infoTitle}</Kicker>
                <ul className="mt-7 space-y-5 text-[15px]">
                  <li className="flex gap-4">
                    <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                    <span className="text-ink-700">
                      <strong className="block font-semibold text-ink-900">{org.name}</strong>
                      {org.street}
                      <br />
                      {org.city}
                      <br />
                      <span className="text-ink-500">{org.district}</span>
                      <br />
                      <span className="text-ink-500">{org.postfach}</span>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                    <span className="text-ink-700">
                      {org.phone}
                      <br />
                      <span className="text-ink-500">
                        {org.boardName} · {org.boardPhone}
                      </span>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                    <a
                      className="text-ink-700 underline decoration-ink-200 underline-offset-4 transition hover:text-ink-900"
                      href={`mailto:${org.email}`}
                    >
                      {org.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-3xl border border-ink-100 bg-white p-7">
                <div className="flex items-center gap-2 text-ink-900">
                  <Icon name="clock" className="h-5 w-5 text-ink-400" />
                  <h3 className="text-base font-bold tracking-tight">{c.hoursTitle}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[15px] text-ink-600">
                  {c.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-ink-100 via-sand to-ink-50 p-8">
                <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
                <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Neuallermöhe · Bergedorf
                </p>
                <p className="relative mt-3 text-2xl font-extrabold tracking-tight text-ink-900">
                  {org.street}, {org.city}
                </p>
                <a
                  className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-800 underline decoration-amber-warm underline-offset-4"
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
                    `${org.street} ${org.city}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Karte öffnen / Open map
                  <Icon name="pin" className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* imprint */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <Kicker>{c.imprintTitle}</Kicker>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {c.imprintTitle}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.imprintBlocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-ink-100 bg-white p-7">
                <h3 className="text-sm font-bold tracking-tight text-ink-900">{b.title}</h3>
                <ul className="mt-4 space-y-1 text-[14px] leading-relaxed text-ink-600">
                  {b.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* non-profit recognition */}
        <Reveal delay={80}>
          <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-ink-100 bg-ink-900 p-9 text-white sm:p-12">
            <div className="grain-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-amber-warm">
                  <Icon name="check" className="h-5 w-5" />
                  <h3 className="text-lg font-bold tracking-tight">{c.nonProfitTitle}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-ink-200">{c.nonProfitText}</p>
              </div>
              <Button to="/mitmachen" variant="light" className="shrink-0">
                {c.donateCta}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* legal sections */}
        <Reveal delay={120}>
          <h3 className="mt-16 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {c.legalTitle}
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {c.legal.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-ink-100 bg-white p-8">
                <h4 className="text-base font-bold tracking-tight text-ink-900">{b.title}</h4>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
