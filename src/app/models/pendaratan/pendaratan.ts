import {model} from '../model';
import {general} from '../general';


export const hasilTangkapanPendaratan = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  /*double*/
  tangkapanVolume: 0,
  /*double*/
  tangkapanIndividu: 0,
};
export type HasilTangkapanPendaratan = typeof hasilTangkapanPendaratan;

export const rincianPendaratan = {
  ...model,
  namaKapal: '',
  penampung: false,
  penangkap: false,
  jumlahKapalPenangkap: 0,
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: '',
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

export const pendaratan = {
  ...general,
  tanggalPendaratan: '',
  namaLokasiPendaratan: '',
  dataRincianPendaratan: [],
  dataOperasional: [],
  dataUkuran: []
};
export type Pendaratan = typeof pendaratan;


