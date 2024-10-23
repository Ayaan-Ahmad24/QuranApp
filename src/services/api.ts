const API_BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};

export const fetchAyah = async (number: number): Promise<Ayah> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ayah/${number}/en.asad`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching ayah:', error);
    throw error;
  }
};