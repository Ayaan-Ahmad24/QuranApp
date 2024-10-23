import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getData, storeData } from '../storage/asyncStorage';

interface UseOfflineStorageReturn<T> {
  data: T;
  setData: (newData: T) => Promise<void>;
  isOnline: boolean;
  loadData: () => Promise<void>;
}

export const useOfflineStorage = <T>(
  key: string, 
  initialData: T
): UseOfflineStorageReturn<T> => {
  const [data, setData] = useState<T>(initialData);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const loadData = async (): Promise<void> => {
    const storedData = await getData<T>(key);
    if (storedData) {
      setData(storedData);
    }
  };

  const saveData = async (newData: T): Promise<void> => {
    await storeData(key, newData);
    setData(newData);
  };

  return { data, setData: saveData, isOnline, loadData };
};