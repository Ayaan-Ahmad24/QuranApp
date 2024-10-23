export interface Ayah {
  number: number;
  text: string;
}

export interface Surah {
  number: number;
  name: string;
  nameEnglish: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs?: Ayah[];
}

export interface LastRead {
  surah: string;
  ayah: number;
}