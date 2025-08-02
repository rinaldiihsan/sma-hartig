'use client'

import Link from 'next/link';
import { deleteArticle, fetchArticles } from '@/hooks/fetchArtikel';

export default function DashboardPage() {
  const { articles, loading, error } = fetchArticles();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="flex flex-col overflow-x-hidden py-[30px]">
        <div className="container flex flex-col items-center justify-center gap-y-[20px] py-10 px-5 xl:px-10">
          <div className="text-center font-bold gap-y-2 flex flex-col">
            <h1 className="text-2xl lg:text-4xl">Dashboard Blog</h1>
          </div>
        </div>
      </header>

      {/* Section */}
      <section className="flex flex-col overflow-x-hidden py-[30px] items-center justify-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14 px-5 xl:px-10">
          {Array.isArray(articles) && articles.map((artikel, index) => (
            <article key={index} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-[240px] overflow-hidden">
                <img src={artikel.imageUrl} alt={artikel.title} className="object-cover transition-transform" />
              </div>
              <div className="flex flex-col p-6 gap-y-4 flex-grow">
                <p className="text-sm text-gray-600">{artikel.date}</p>
                <h2 className="text-xl font-bold line-clamp-2 transition-colors duration-300">
                  {artikel.title}
                </h2>

                <div className="mt-auto w-full">
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-red-100 text-red-700 rounded-[10%] hover:bg-red-200 transition-colors duration-300 flex items-center justify-center"
                      onClick={() => deleteArticle(artikel.id)}
                    >
                      Hapus
                    </button>
                    <Link href={`/akademik/artikel/edit/${artikel.slug}`} >
                      <button 
                        type="button" 
                        className="px-6 py-3 bg-primary-600 text-white rounded-[10%] hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <Link href={`/akademik/artikel/new`}>
            <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-xl h-[400px] cursor-pointer hover:border-primary-600 transition duration-300 mt-4">
              <div className="flex flex-col items-center text-center px-6">
                <span className="text-5xl text-primary-600">+</span>
                <p className="mt-4 text-lg font-semibold text-gray-700">Buat Artikel Baru</p>
                <p className="text-sm text-gray-500">Klik di sini untuk menambahkan artikel</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}