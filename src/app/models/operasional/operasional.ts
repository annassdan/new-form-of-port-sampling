import {model} from '../model';
import {general} from '../general';


export const hasilTangkapanOperasional = {
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


export const spesifikasiAlatTangkapOperasional = {
  ...model,
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: '',
  spesifikasi: '',
  nilaiSpesifikasi: '',
  satuanSpesifikasi: '',
};
export type SpesifikasiAlatTangkapOperasional = typeof spesifikasiAlatTangkapOperasional;


export const operasional = {
  ...general,
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
  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: '',
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
  dataOperasionalDetailTangkapan: [],
  // double
  jumlahTangkapanVolume: 0,
  jumlahTangkapanIndividu: 0,
  // double
  lamaPerendaman: 0,
};
export type Operasional = typeof operasional;
