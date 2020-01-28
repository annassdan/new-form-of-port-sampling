import {model} from "../model";

export const organisasi = {
  ...model,
  namaOrganisasi: '',
  deskripsiOrganisasi: ''
};
export type Organisasi = typeof organisasi;


export const alatTangkap = {
  ...model,
  namaAlatTangkap: '',
  deskripsiAlatTangkap: ''
};
export type AlatTangkap = typeof  alatTangkap;
