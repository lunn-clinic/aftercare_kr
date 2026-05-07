type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  subtitle?: string;
  breadcrumb?: Crumb[];
};

export default function PageBanner({ title, subtitle, breadcrumb }: Props) {
  return (
    <section className="relative bg-primary-navy pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#2a2420]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />

      <div className="relative max-w-[1140px] mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-white/50 text-base lg:text-lg max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        ) : null}
        {breadcrumb && breadcrumb.length ? (
          <nav className="mt-6 flex items-center justify-center gap-2 text-sm text-white/30 flex-wrap">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 ? <span>›</span> : null}
                {item.href ? (
                  <a href={item.href} className="hover:text-accent-beige transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-accent-beige/80">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
