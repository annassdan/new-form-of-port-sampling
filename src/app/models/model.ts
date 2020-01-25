
export type CanOptional = { [key: string]: any };

export const model: CanOptional = {
  uuid: '',
  dibuatPadaTanggal: '',
  terakhirDiubahPadaTanggal: '',
  dibuatOleh: '',
  terakhirDiubahOleh: ''
};
export type Model = typeof model;

export const fotoDokumentasi: CanOptional = {
  foto: '',
  path: ''
};
export type FotoDokumentasi = typeof fotoDokumentasi;
