'use client';

import { fetchArticles } from '@/hooks/fetchArtikel';
import Link from 'next/link';
import { JSX } from 'react';

export default function ArtikelHomepage(): JSX.Element {
  const { articles, loading, error } = fetchArticles();

  const previewArticles = articles?.slice(0, 3) || [];

  if(loading) {
    return (
      <div className="flex flex-col gap-y-12 animate-pulse">
        <div className="flex flex-col xl:flex-row gap-y-7 xl:gap-x-14 items-center justify-center">
          <div className="w-full h-[25rem] xl:min-w-[50%] bg-gray-200 rounded-lg" />
          <div className="flex flex-col justify-between gap-y-6 w-full">
            <div className="flex flex-col gap-y-3">
              <div className="h-4 w-1/4 bg-gray-300 rounded" />
              <div className="h-8 w-3/4 bg-gray-300 rounded" />
              <div className="h-24 w-full bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-40 bg-gray-300 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-y-4">
              <div className="w-full h-[15rem] bg-gray-200 rounded-lg" />
              <div className="flex flex-col gap-y-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
                <div className="h-6 w-2/3 bg-gray-300 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
                <div className="h-12 w-40 bg-gray-300 rounded-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="flex flex-col px-4 py-[50px] lg:py-[80px] gap-y-16 z-30 container">
      <div className="flex flex-col items-center text-center gap-y-3">
        <h2 className="text-primary-600 text-xl xl:text-2xl font-bold uppercase">berita dan artikel</h2>
        <h1 className="uppercase text-2xl xl:text-4xl font-bold">SMA HARAPAN 3</h1>
      </div>

      <div className="flex flex-col gap-y-12">
        {/* Artikel Utama */}
        {previewArticles[0] && (
          <div className="flex flex-col xl:flex-row gap-y-7 xl:gap-x-14 items-center justify-center">
            <img src={previewArticles[0].imageUrl} alt={previewArticles[0].title} width={800} height={600} className="w-full h-[25rem] xl:min-w-[50%] rounded-lg object-cover object-center" />

            <div className="flex flex-col justify-between gap-y-6">
              <div className="flex flex-col gap-y-3">
                <h3 className="font-medium">{previewArticles[0].date}</h3>
                <h1 className="text-xl md:text-3xl uppercase font-extrabold">{previewArticles[0].title}</h1>
                <p className="text-justify w-full leading-7">{previewArticles[0].content.slice(0, 400)}...</p>
              </div>

              <Link
                href={`/akademik/artikel/${previewArticles[0].slug}`}
                className="bg-primary-600 border border-primary-600 px-7 py-3 xl:px-10 xl:py-4 font-semibold text-white rounded-full hover:bg-white hover:text-primary-600 transition-colors duration-300 text-center lg:self-start"
              >
                Baca artikel
              </Link>
            </div>
          </div>
        )}

        {/* Artikel Tambahan */}
        {previewArticles.length > 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            {previewArticles.slice(1).map((artikel, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                <img src={artikel.imageUrl} alt={artikel.title} width={600} height={400} className="w-full h-[15rem] rounded-lg object-cover object-center" />
                <div className="flex flex-col gap-y-2">
                  <h3 className="font-medium">{artikel.date}</h3>
                  <h2 className="text-xl uppercase font-bold">{artikel.title}</h2>
                  <p className="text-justify leading-6">{artikel.content.slice(0, 400)}...</p>
                  <Link
                    href={`/akademik/artikel/${artikel.slug}`}
                    className="bg-primary-600 border border-primary-600 px-7 py-3 xl:px-10 xl:py-4 font-semibold text-white rounded-full hover:bg-white hover:text-primary-600 transition-colors duration-300 text-center self-start mt-2"
                  >
                    Baca artikel
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
