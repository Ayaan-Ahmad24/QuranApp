import { useState, useEffect } from 'react';
import QuranService, { ApiSurah, ApiAyah } from '../services/quranService';

export interface Surah extends ApiSurah {
  ayahs?: ApiAyah[];
}

export const useQuranData = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      const surahsData = await QuranService.getAllSurahs();
      setSurahs(surahsData);
    } catch (err) {
      setError('Failed to fetch Quran data');
    } finally {
      setLoading(false);
    }
  };

  const fetchSurahAyahs = async (surahNumber: number) => {
    try {
      const ayahs = await QuranService.getSurahWithTranslation(surahNumber);
      setSurahs(prevSurahs => 
        prevSurahs.map(surah => 
          surah.number === surahNumber
            ? { ...surah, ayahs }
            : surah
        )
      );
    } catch (err) {
      console.error('Error fetching ayahs:', err);
    }
  };

  return { surahs, loading, error, fetchSurahAyahs };
};