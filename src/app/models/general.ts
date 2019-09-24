import {model} from './model';


export const general  = {
  ...model,
  /* relasi ke enumerator  */
  uuidEnumerator: '',
  /* relasi ke data sumberdaya */
  uuidSumberDaya: '',
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
