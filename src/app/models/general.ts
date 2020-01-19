import {model} from './model';


export const general  = {
  ...model,
  /* relasi ke enumerator  */
  // uuidEnumerator: '',
  uuidEnumerator: {
    uuid: '1',
    nama: 'Muhammad Nur Annas',
    posisi: ''
  },

  /* relasi ke data sumberdaya */
  // uuidSumberDaya: '',
  uuidSumberDaya: {
    uuid: '',
    namaSumberdaya: ''
  },


  statusDokumen: '',
  photoNames: [],
  uuidPengupload: '',
  /* maybe to organization */
  organisasi: '',
  wpp: '',
  /* maybe to user */
  terverifikasiOleh: '',
  untukEksternalTerverifikasiOleh: '',
  byMachine: false
};
export type General = typeof general;
