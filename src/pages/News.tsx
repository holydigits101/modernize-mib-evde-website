import { Button, Icon, Kicker, Link, PageHero, Reveal, Section, useLang } from "../lib/site";
import { org } from "../content";

export default function News() {
  const { t } = useLang();
  const n = t.news;

  return (
    <>
      <PageHero kicker={n.kicker} title={n.title} lead={n.lead} />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.9fr] lg:gap-20">
          {/* blog list */}
          <div>
            <Reveal>
              <Kicker>{n.newsTitle}</Kicker>
            </Reveal>

            <div className="mt-8 space-y-8">
              {n.items.map((item, i) => (
                <Reveal key={item.slug} delay={(i % 2) * 60}>
                  <Link
                    to={`/aktuelles/artikel/${item.slug}`}
                    className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_1px_2px_rgba(18,29,54,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-38px_rgba(18,29,54,0.5)] sm:grid sm:grid-cols-[0.9fr_1.1fr]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-700">
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-9">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-400">
                        <time>{item.date}</time>
                        <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
                        <span>
                          {n.authorLabel} {item.author}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
                        <span>
                          {item.readTime} {n.readLabel}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-ink-600 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{item.excerpt}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
                        {n.readMore}
                        <Icon
                          name="arrowRight"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* press */}
            <Reveal>
              <div className="mt-12 rounded-3xl border border-ink-100 bg-sand p-8">
                <h3 className="text-lg font-bold tracking-tight text-ink-900">{n.pressTitle}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{n.pressText}</p>
                <div className="mt-6">
                  <Button to="/kontakt" variant="outline">
                    {t.cta.contact}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* events sidebar */}
          <aside>
            <Reveal>
              <Kicker>{n.eventsTitle}</Kicker>
            </Reveal>

            <div className="mt-8 space-y-4">
              {n.events.map((e, i) => (
                <Reveal key={e.slug} delay={i * 80}>
                  <Link
                    to={`/aktuelles/termin/${e.slug}`}
                    className="group flex gap-5 rounded-2xl border border-ink-100 bg-white p-5 transition-all duration-400 hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_24px_50px_-30px_rgba(18,29,54,0.45)]"
                  >
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-ink-900 text-white transition-colors duration-300 group-hover:bg-amber-warm">
                      <span className="text-xl font-extrabold leading-none">{e.day}</span>
                      <span className="text-[10px] uppercase tracking-widest">{e.month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-bold leading-snug tracking-tight text-ink-900">
                        {e.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                        <Icon name="clock" className="h-3.5 w-3.5 shrink-0" /> {e.time}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                        <Icon name="pin" className="h-3.5 w-3.5 shrink-0" /> {e.place}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                        {n.detailsLabel}
                        <Icon
                          name="arrowRight"
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-8 rounded-2xl bg-ink-900 p-7 text-white">
                <Icon name="mail" className="h-5 w-5 text-amber-warm" />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-200">{t.contact.lead}</p>
                <a
                  href={`mailto:${org.email}`}
                  className="mt-4 inline-block text-sm font-semibold text-white underline decoration-amber-warm underline-offset-4"
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
