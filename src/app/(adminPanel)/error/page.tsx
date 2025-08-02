'use client'

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="mb-8">Maaf, ada masalah dengan sistem segera hubungi developer.</p>
        <Link href="/" className="bg-primary-600 text-white px-6 py-4 rounded-full hover:bg-primary-700 transition-colors duration-300">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}