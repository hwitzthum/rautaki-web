import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="text-center max-w-narrow">
        <p className="text-gold font-sans text-sm tracking-widest uppercase mb-6">404</p>
        <h1 className="font-serif text-h2 text-white mb-4">Seite nicht gefunden</h1>
        <p className="text-white/45 font-sans text-body mb-10">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="text-white font-sans text-sm tracking-wide hover:text-gold transition-colors duration-200"
        >
          Zurück zur Startseite →
        </Link>
      </div>
    </main>
  )
}
