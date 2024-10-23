export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
  };
}

export interface LastRead {
  surah: string;
  ayah: number;
}