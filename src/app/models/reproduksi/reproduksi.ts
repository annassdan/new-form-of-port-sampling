import {model} from '../model';
import {general} from '../general';


export const rincianBiologiReproduksi = {
  ...model,
  // double
  panjang: 0,
  tipePanjang: '',
  jenisKelamin: '',
  // double
  berat: 0,
  tkg: '',
  // double
  beratIsiPerut: 0
};
export type RincianBiologiReproduksi = typeof rincianBiologiReproduksi;


export const biologiReproduksi = {
  ...general,
  namaLokasiSampling: '',
  namaKapal: '',
  daerahPenangkapan: '',
  penampung: false,
  penangkap: false,
  /* relasi tabel alat tangkap */
  uuidAlatTangkap: '',
  tanggalSampling: '',
  dataDetailReproduksi: []
};
export type BiologiReproduksi = typeof biologiReproduksi;
