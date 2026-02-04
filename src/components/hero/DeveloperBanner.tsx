'use client';

export function DeveloperBanner() {
  return (
    <a
      href="/developers/apply"
      className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-center group block"
    >
      <span className="text-white text-sm font-medium">
        🚀 Build apps for AI agents —{' '}
        <span className="underline group-hover:no-underline">
          Get early access to our developer platform →
        </span>
      </span>
    </a>
  );
}
