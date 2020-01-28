import {CanOptional, model} from '../model';
import {general} from '../general';
import {alatTangkap} from "../master/organisasi";


export const hasilTangkapanPendaratan: CanOptional = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  /*double*/
  tangkapanVolume: 0,
  /*double*/
  tangkapanIndividu: 0,
};
export type HasilTangkapanPendaratan = typeof hasilTangkapanPendaratan;

export const rincianPendaratan: CanOptional = {
  ...model,
  namaKapal: '',
  penampung: false,
  penangkap: false,
  jumlahKapalPenangkap: 0,
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: {...alatTangkap},
  jumlahSetting: 0,
  jumlahMataPancing: 0,
  rumpon: false,
  cahaya: false,
  daerahPenangkapan: '',
  jumlahHariPerTrip: 0,
  jumlahHariMenangkap: 0,

  /*double*/
  totalTangkapanVolume: 0,
  totalTangkapanIndividu: 0,
  dataRincianTangkapanPendaratan: []
};
export type RincianPendaratan = typeof rincianPendaratan;

export const pendaratan: CanOptional = {
  ...general,
  tanggalPendaratan: '',
  namaLokasiPendaratan: '',
  dataRincianPendaratan: [],
  dataOperasional: [],
  dataUkuran: [],
  dataReproduksi: []
};
export type Pendaratan = typeof pendaratan;


