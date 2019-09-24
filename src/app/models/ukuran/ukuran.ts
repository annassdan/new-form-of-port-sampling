import {model} from '../model';
import {general} from '../general';


export const rincianBiologiUkuran = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  // double
  panjang: 0
};
export type  RincianBiologiUkuran = typeof rincianBiologiUkuran;


export const sampelBiologiUkuran = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  // double
  sampleVolume: 0,
  // double
  sampleIndividu: 0,
  tipePanjang: ''
};
export type SampelBiologiUkuran = typeof sampelBiologiUkuran;


export const biologiUkuran = {
  ...general,
  namaLokasiSampling: '',
  tanggalSampling: '',
  namaKapal: '',
  /* ke tabel daerah penangkapan, karena mesti displitting by coma */
  daerahPenangkapan: '',
  /* ke table alat tangkap  */
  uuidAlatTangkap: '',
  penampung: false,
  penangkap: false,
  // double
  totalTangkapanVolume: 0,
  totalTangkapanIndividu: 0,
  totalSampelIndividu: 0,
  // double
  totalSampelVolume: '',
  dataSampleDetail: [],
  dataUkuranDetail: []
};
export type BiologiUkuran = typeof biologiUkuran;
