import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Article } from '@/constants/artikel';

const supabase = createClient();
export function fetchArticles(slug: string | null = null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('Artikel')
          .select('id, title, date, content, imageUrl, slug');

        if (slug) {
          const { data, error } = await query.eq('slug', slug).single();
          if (error) throw error;
          setArticle(data);
          setArticles(null);
        } else {
          const { data, error } = await query.order('date', { ascending: false });
          if (error) throw error;
          setArticles(data);
          setArticle(null);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { article, articles, loading, error };
}

export async function deleteArticle(id: string | null = null) {
  if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?') || !id) return;

  const { error } = await supabase
    .from('Artikel')
    .delete()
    .eq('id', id);

  if (error) {
    alert('Gagal menghapus artikel.');
    return;
  }

  alert('Artikel berhasil dihapus.');
  window.location.reload();
}