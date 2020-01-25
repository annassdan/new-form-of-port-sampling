import {CanOptional, model} from '../model';
import {general} from '../general';
import {REF_TO_RINCIAN_PENDARATAN} from "../../shared/constants";


export const rincianBiologiReproduksi: CanOptional = {
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


export const biologiReproduksi: CanOptional = {
  ...general,

  /* reference ke tabel rincian pendaratan yang mana untuk menentukan kapal mana yang di sampling */
  rincian_pendaratan: '',

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
