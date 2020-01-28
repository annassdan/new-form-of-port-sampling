
export type TransformType = 'FormGroup' | 'FormArray' | 'FormControl' | string;
export type TransformModel = { from: string, to: string, type: TransformType };

export const PENDARATAN_X_OPERASIONAL: TransformModel[] = [
  { from: 'uuidEnumerator', to: 'uuidEnumerator', type: "FormGroup" },
  { from: 'uuidSumberDaya', to: 'uuidSumberDaya', type: "FormGroup" },
  { from: 'organisasi', to: 'organisasi', type: "FormGroup" },
  { from: 'wpp', to: 'wpp', type: "FormControl" },
  { from: 'namaLokasiPendaratan', to: 'namaLokasiPendaratan', type: "FormControl" },
  { from: 'tanggalPendaratan', to: 'tanggalSampling', type: "FormControl" },
];
export const PENDARATAN_X_UKURAN: TransformModel[] = [
  { from: 'uuidEnumerator', to: 'uuidEnumerator', type: "FormGroup" },
  { from: 'uuidSumberDaya', to: 'uuidSumberDaya', type: "FormGroup" },
  { from: 'organisasi', to: 'organisasi', type: "FormGroup" },
  { from: 'wpp', to: 'wpp', type: "FormControl" },
];
export const PENDARATAN_X_REPRODUKSI: TransformModel[] = [
  { from: 'uuidEnumerator', to: 'uuidEnumerator', type: "FormGroup" },
  { from: 'uuidSumberDaya', to: 'uuidSumberDaya', type: "FormGroup" },
  { from: 'organisasi', to: 'organisasi', type: "FormGroup" },
  { from: 'wpp', to: 'wpp', type: "FormControl" }
];

export const RINCIAN_PENDARATAN_X_OPERASIONAL: TransformModel[] = [
  { from: 'namaKapal', to: 'namaKapal', type: "FormControl" },

  /* for temporary*/
  { from: 'uuidAlatTangkap', to: 'uuidAlatTangkap', type: "FormGroup" },

  { from: 'jumlahSetting', to: 'jumlahSetting', type: "FormControl" },
  { from: 'daerahPenangkapan', to: 'daerahPenangkapan', type: "FormControl" },
  { from: 'jumlahHariPerTrip', to: 'jumlahHariPerTrip', type: "FormControl" },
  { from: 'jumlahHariMenangkap', to: 'jumlahHariMenangkap', type: "FormControl" },
  { from: 'totalTangkapanVolume', to: 'jumlahTangkapanVolume', type: "FormControl" },
  { from: 'totalTangkapanIndividu', to: 'jumlahTangkapanIndividu', type: "FormControl" }
];
export const RINCIAN_PENDARATAN_X_UKURAN: TransformModel[] = [
  /* for temporary*/
  { from: 'uuidAlatTangkap', to: 'uuidAlatTangkap', type: "FormGroup" },

  { from: 'penampung', to: 'penampung', type: "FormControl" },
  { from: 'penangkap', to: 'penangkap', type: "FormControl" },
  { from: 'namaKapal', to: 'namaKapal', type: "FormControl" },
  { from: 'daerahPenangkapan', to: 'daerahPenangkapan', type: "FormControl" },
  { from: 'totalTangkapanVolume', to: 'totalTangkapanVolume', type: "FormControl" },
  { from: 'totalTangkapanIndividu', to: 'totalTangkapanIndividu', type: "FormControl" }
];
export const RINCIAN_PENDARATAN_X_REPRODUKSI = [
  { from: 'penampung', to: 'penampung', type: "FormControl" },
  { from: 'penangkap', to: 'penangkap', type: "FormControl" },
  { from: 'namaKapal', to: 'namaKapal', type: "FormControl" },
  /* for temporary*/
  { from: 'uuidAlatTangkap', to: 'uuidAlatTangkap', type: "FormGroup" }
];
