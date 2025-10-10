import { getImageUrl } from '@/config/assets';

export default function QuoteSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${getImageUrl('MARITIME_LOGISTICS')})`
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
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
