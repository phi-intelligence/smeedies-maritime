export default function QuoteSection() {
  return (
    <section className="py-24 bg-primary/5 border-y border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <blockquote className="text-2xl md:text-3xl font-serif italic text-white mb-6" data-testid="text-quote">
          "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
        </blockquote>
        <p className="text-lg text-white font-semibold" data-testid="text-author">
          — Aristotle
        </p>
      </div>
    </section>
  );
}
