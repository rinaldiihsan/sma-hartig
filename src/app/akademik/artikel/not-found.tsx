import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
        <p className="mb-8">Maaf, artikel yang Anda cari tidak dapat ditemukan.</p>
        <Link href="/akademik/artikel" className="bg-primary-600 text-white px-6 py-4 rounded-full hover:bg-primary-700 transition-colors duration-300">
          Kembali ke Daftar Artikel
        </Link>
      </div>
    </div>
  );
}
