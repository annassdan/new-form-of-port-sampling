import {CanOptional, model} from '../model';
import {general} from '../general';
import {REF_TO_RINCIAN_PENDARATAN} from "../../shared/constants";
import {alatTangkap, organisasi} from "../master/organisasi";


export const rincianBiologiUkuran: CanOptional = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  // double
  panjang: 0
};
export type  RincianBiologiUkuran = typeof rincianBiologiUkuran;


export const sampelBiologiUkuran: CanOptional = {
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


export const biologiUkuran: CanOptional = {
  ...general,

  /* reference ke tabel rincian pendaratan yang mana untuk menentukan kapal mana yang di sampling */
  rincian_pendaratan: '',

  namaLokasiSampling: '',
  tanggalSampling: '',
  namaKapal: '',
  /* ke tabel daerah penangkapan, karena mesti displitting by coma */
  daerahPenangkapan: '',

  /*TEMPORARY*/
  /* ke table alat tangkap  */
  uuidAlatTangkap: {...alatTangkap},


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
