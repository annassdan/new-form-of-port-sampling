import {CanOptional, model} from '../model';
import {general} from '../general';
import {alatTangkap, organisasi} from "../master/organisasi";


export const hasilTangkapanOperasional: CanOptional = {
  ...model,
  /* relasi ke tabel spesies */
  uuidSpesies: '',
  kodeFao: '',
  totalBeratKg: 0,
  totalBeratEkor: 0,
  segar: false,
  beku: false,
  asin: false,
  loin: false,
  rebus: false,
};
export type HasilTangkapanOperasional = typeof hasilTangkapanOperasional;


export const spesifikasiAlatTangkapOperasional: CanOptional = {
  ...model,
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: '',
  spesifikasi: '',
  nilaiSpesifikasi: '',
  satuanSpesifikasi: '',
};
export type SpesifikasiAlatTangkapOperasional = typeof spesifikasiAlatTangkapOperasional;


export const operasional: CanOptional = {
  ...general,

  /* reference ke tabel rincian pendaratan yang mana untuk menentukan kapal mana yang di sampling */
  rincian_pendaratan: '',

  /* any untuk kemungkinan pengubahan menjadi object */
  namaLokasiPendaratan: '',
  jamSampling: '',
  tanggalSampling: '',
  /* any karena bisa menjadi object model */
  namaKapal: '',
  tanggalBerangkat: '',
  /**/
  tandaSelar: '',
  tanggalKembali: '',
  namaPemilikKapal: '',
  pelabuhanAsal: '',
  namaKapten: '',
  jumlahAbk: 0,
  // double
  panjangKapal: 0,
  materialKapal: '',
  dayaCahaya: 0,
  // double
  bobotKapal: 0,
  kapalBantu: false,
  ukuranKapalBantu: 0,
  kapalAndon: false,
  asalKapalAndon: '',
  jumlahPalka: 0,
  jumlahBoks: 0,
  mesinUtama: 0,
  freezer: false,
  // double
  kapasitasFreezer: 0,
  kapasitasPalkaBoks: 0,
  mesinBantu: 0,
  gps: false,
  jenisGps: '',

  /*TEMPORARY*/
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: {...alatTangkap},


  material: '',
  jumlahAlatTangkapYangDioperasikan: 0,
  jumlahSetting: 0,
  // double
  kedalamanAirMulai: 0,
  // double
  kedalamanAirHingga: 0,
  daerahPenangkapan: '',
  jumlahHariPerTrip: 0,
  jumlahHariMenangkap: 0,
  jenisRumpon: '',
  // double
  jumlahBalokEs: 0,
  jumlahRumponDikunjungi: 0,
  jumlahRumponBerhasil: 0,
  waktuMemancing: '',
  komentar: '',
  sumberInformasi: '',
  // double
  jumlahTangkapanUntukDimakanDilautVolume: 0,
  jumlahTangkapanUntukDimakanDilautIndividu: 0,
  dataSpesifikasiAlatTangkap: [],

  /* ikan hasil tangkapan */
  dataOperasionalDetailTangkapan: [],

  // double
  jumlahTangkapanVolume: 0,
  jumlahTangkapanIndividu: 0,
  // double
  lamaPerendaman: 0,


};
export type Operasional = typeof operasional;
