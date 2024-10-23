import { useState, useEffect } from 'react';
import { fetchSurahs } from '../services/api';
import { storeData, getData } from '../storage/asyncStorage';
import { Surah } from '../types/types';

interface UseQuranDataReturn {
  surahs: Surah[];
  loading: boolean;
  error: Error | null;
}

export const useQuranData = (): UseQuranDataReturn => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cachedData = await getData<Surah[]>('surahs');
        
        if (cachedData) {
          setSurahs(cachedData);
          setLoading(false);
        }

        const freshData = await fetchSurahs();
        setSurahs(freshData);
        await storeData('surahs', freshData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { surahs, loading, error };
};