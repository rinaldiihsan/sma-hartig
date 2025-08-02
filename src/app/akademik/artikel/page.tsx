'use client';

import { fetchArticles } from '@/hooks/fetchArtikel';
import { JSX } from 'react';
import Link from 'next/link';

export default function Page(): JSX.Element {
  const { articles, loading, error } = fetchArticles();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if(loading) {
    return (
      <main className="min-h-screen">
        <header className="flex flex-col overflow-x-hidden py-[30px]">
          <div className="container flex flex-col items-center justify-center gap-y-[20px] py-10 px-5 xl:px-10">
            <div className="text-center font-bold gap-y-2 flex flex-col">
              <h3 className="uppercase text-xl lg:text-2xl text-primary-600">Berita dan Artikel</h3>
              <h1 className="uppercase text-2xl lg:text-4xl">sma harapan 3</h1>
            </div>
            <p className="text-justify lg:text-center w-full lg:w-[80%] text-secondary leading-8">
              Dapatkan informasi terbaru seputar berita dan artikel yang ada di SMA Harapan 3. Jangan lewatkan informasi terbaru yang dapat menambah wawasan Anda.
            </p>
          </div>
        </header>
        <section className="flex flex-col overflow-x-hidden py-[30px] items-center justify-center">
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14 px-5 xl:px-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <article
                key={index}
                className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="relative h-[240px] bg-gray-200" />
                <div className="flex flex-col p-6 gap-y-4 flex-grow">
                  <div className="h-4 w-1/3 bg-gray-300 rounded" />
                  <div className="h-6 w-3/4 bg-gray-300 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="mt-auto">
                    <div className="h-10 w-full bg-gray-300 rounded-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="flex flex-col overflow-x-hidden py-[30px]">
        <div className="container flex flex-col items-center justify-center gap-y-[20px] py-10 px-5 xl:px-10">
          <div className="text-center font-bold gap-y-2 flex flex-col">
            <h3 className="uppercase text-xl lg:text-2xl text-primary-600">Berita dan Artikel</h3>
            <h1 className="uppercase text-2xl lg:text-4xl">sma harapan 3</h1>
          </div>
          <p className="text-justify lg:text-center w-full lg:w-[80%] text-secondary leading-8">
            Dapatkan informasi terbaru seputar berita dan artikel yang ada di SMA Harapan 3. Jangan lewatkan informasi terbaru yang dapat menambah wawasan Anda.
          </p>
        </div>
      </header>

      {/* Section */}
      <section className="flex flex-col overflow-x-hidden py-[30px] items-center justify-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14 px-5 xl:px-10">
          {Array.isArray(articles) && articles.map((artikel, index) => (
            <article key={index} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-[240px] overflow-hidden">
                <img src={artikel.imageUrl} alt={artikel.title} className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col p-6 gap-y-4 flex-grow">
                <p className="text-sm text-gray-600">{artikel.date}</p>
                <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">{artikel.title}</h2>
                <p className="text-gray-600 line-clamp-3">{truncateText(artikel.content, 150)}</p>
                <Link href={`/akademik/artikel/${artikel.slug}`} className="mt-auto">
                  <button className="w-full mt-4 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center gap-2">
                    Baca Selengkapnya
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
