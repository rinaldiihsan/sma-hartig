'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { createSlug, compressImage } from '@/utils/articleUtils';

export default function NewArticle() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [date, setDate] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const today = new Date();
    setDate(`Medan, ${today.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    })}`);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;

    try {
      const webpFile = await compressImage(file);
      setImageFile(webpFile);
      setImagePreview(URL.createObjectURL(webpFile));
    } catch (err) {
      alert('Image compression failed');
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !imageFile) {
      alert('Semua kolom harus diisi dan gambar harus dipilih!');
      return;
    }

    const slug = createSlug(title);
    const fileName = `${Date.now()}.${imageFile.name.split('.').pop()}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('artikel-image')
      .upload(filePath, imageFile, {contentType: 'image/webp', upsert: true});

    if (uploadError) {
      console.log(imageFile);
      alert(uploadError.message);
      return;
    }

    const { publicUrl } = supabase.storage
      .from('artikel-image')
      .getPublicUrl(filePath).data;

    const articleData = { title, content, date, slug, imageUrl: publicUrl };
    const { error } = await supabase
      .from('Artikel')
      .insert([articleData]);

    if (error) {
      console.log(articleData);
      console.error(error.message);
      return;
    }

    router.push(`/akademik/artikel/${slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Judul</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 p-2 rounded"/>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Preview Gambar</label>

        <label
          htmlFor="image-upload"
          className={
            `w-full flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer p-4 ${imagePreview ? 'border-gray-300' : 'border-primary-400'}`
          }>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" width={800} height={0} className="w-full h-auto max-h-[600px] object-contain rounded"/>
          ) : (
            <span className="text-gray-500">Klik untuk unggah gambar</span>
          )}
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Konten</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full border border-gray-300 p-2 rounded text-justify"/>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!title.trim() || !content.trim() || !imagePreview}
        className={`px-6 py-3 rounded text-white ${!title.trim() || !content.trim() || !imagePreview ? 'bg-gray-400 cursor-not-allowed': 'bg-primary-600 hover:bg-primary-700'}`}
      >
        Publish Artikel
      </button>
    </div>
  );
}
