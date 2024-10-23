export interface ApiSurah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  }
  
  export interface ApiAyah {
    number: number;
    text: string;
    surah: {
      number: number;
      name: string;
      englishName: string;
      revelationType: string;
    };
    numberInSurah: number;
  }
  
  export interface QuranApiResponse {
    code: number;
    status: string;
    data: {
      surahs: ApiSurah[];
    };
  }
  
  export interface AyahApiResponse {
    code: number;
    status: string;
    data: {
      text: string;
    };
  }
  
  class QuranService {
    private static BASE_URL = 'https://api.alquran.cloud/v1';
  
    static async getAllSurahs(): Promise<ApiSurah[]> {
      try {
        const response = await fetch(`${this.BASE_URL}/surah`);
        const data: QuranApiResponse = await response.json();
        return data.data.surahs;
      } catch (error) {
        console.error('Error fetching surahs:', error);
        throw error;
      }
    }
  
    static async getSurahWithTranslation(surahNumber: number): Promise<ApiAyah[]> {
      try {
        const response = await fetch(`${this.BASE_URL}/quran/en.asad`);
        const data = await response.json();
        return data.data.surahs[surahNumber - 1].ayahs;
      } catch (error) {
        console.error('Error fetching surah translation:', error);
        throw error;
      }
    }
  }
  
  export default QuranService;