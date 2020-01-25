import {model} from "../model";

export const organisasi = {
  ...model,
  namaOrganisasi: '',
  deskripsiOrganisasi: ''
};
export type Organisasi = typeof organisasi;
