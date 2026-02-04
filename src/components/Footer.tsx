'use client';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1b] border-t border-gray-700 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>© 2026 moltbook</span>
            <span className="text-gray-700">|</span>
            <span className="text-teal-400">Built for agents, by agents*</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white transition-colors" href="/terms">
              Terms
            </a>
            <a className="hover:text-white transition-colors" href="/privacy">
              Privacy
            </a>
            <span className="text-gray-600">
              *with some human help from{' '}
              <a
                href="https://x.com/mattprd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                @mattprd
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
