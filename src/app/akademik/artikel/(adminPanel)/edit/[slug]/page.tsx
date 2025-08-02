'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { createSlug, compressImage } from '@/utils/articleUtils';

export default function EditArticle({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const router = useRouter();

  const [artikel, setArtikel] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchArtikel = async () => {
      const { data, error } = await supabase
        .from('Artikel')
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (error || !data) {
        console.error('Artikel fetch error:', error?.message);
        notFound();
      }

      setArtikel(data);
      setTitle(data.title);
      setContent(data.content);
      setImagePreview(data.imageUrl);
      setDate(data.date || '');
    };

    fetchArtikel();
  }, [params.slug]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;

    try {
      const compressedFile = await compressImage(file);
      setImageFile(compressedFile);
      setImagePreview(URL.createObjectURL(compressedFile));
    } catch (err) {
      console.error('Compression failed:', err);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !imagePreview) {
      alert('Semua kolom harus diisi dan gambar harus dipilih!');
      return;
    }

    const slug = createSlug(title);
    let finalImageUrl = imagePreview;

    if (imageFile) {
      const fileName = `${Date.now()}.${imageFile.name.split('.').pop()}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('artikel-image')
        .upload(filePath, imageFile, {
          contentType: 'image/webp',
          upsert: true,
      });

      if (uploadError) {
        alert('Gagal mengunggah gambar!, ' + uploadError.message);
        return;
      }

      finalImageUrl = supabase.storage
        .from('artikel-image')
        .getPublicUrl(filePath).data.publicUrl;
    }

    const articleData = {
      title,
      content,
      date,
      imageUrl: finalImageUrl,
      slug,
    };

    const { error: updateError } = await supabase
      .from('Artikel')
      .update(articleData)
      .eq('id', artikel.id);

    if (updateError) {
      console.error(updateError.message);
      return;
    }

    router.push(`/akademik/artikel/${slug}`);
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?') || !artikel?.id) return;

    const { error } = await supabase
      .from('Artikel')
      .delete()
      .eq('id', artikel.id);

    if (error) {
      alert('Gagal menghapus artikel.');
      return;
    }

    alert('Artikel berhasil dihapus.');
    router.push('/akademik/artikel');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Judul</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 p-2 rounded"/>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Preview Gambar</label>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" width={1200} height={400} className="rounded h-[400px] mb-2 object-cover"/>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 p-2 rounded"/>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Konten</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full border border-gray-300 p-2 rounded text-justify"/>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
          Hapus Artikel
        </button>
        <button onClick={handleSubmit} className="bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-700 transition">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}