import {CanOptional, model} from './model';
import {organisasi} from "./master/organisasi";
import {sumberdaya} from "./master/sumberdaya";


export const general: CanOptional = {
  ...model,
  /* relasi ke enumerator  */
  // uuidEnumerator: '',
  uuidEnumerator: {
    uuid: '1',
    nama: 'Muhammad Nur Annas',
    posisi: 'Enumerator'
  },

  /* relasi ke data sumberdaya */
  // uuidSumberDaya: '',
  uuidSumberDaya: {...sumberdaya},


  statusDokumen: '',
  photoNames: [],
  uuidPengupload: '',
  /* maybe to organization */
  organisasi: {...organisasi},
  wpp: '',
  /* maybe to user */
  terverifikasiOleh: '',
  untukEksternalTerverifikasiOleh: '',
  byMachine: false
};
export type General = typeof general;
