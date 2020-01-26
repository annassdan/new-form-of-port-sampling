import {Observable, of} from "rxjs";

export const MAX_WIDTH = 960;
export const rightArrowChar = '›';
export const EMPTY = '';
export const UNDEFINED = undefined;
export const NULL = null;
export const LOCALE = 'id';
export const PK_COLUMN = 'uuid';
export const ION_MOMENT_DATE_PATTERN = 'LL';
export const NON_STATIC_VIEW_CHILD = { static: false };
export const STATIC_VIEW_CHILD = { static: true };
export const FADE_TIME = 500;
export const INIT_FADE_IN = 600;

export const TYPE_OF_FUNCTION = '[object Function]';
export const TYPE_OF_STRING = '[object String]';
export const TYPE_OF_NUMBER = '[object Number]';
export const TYPE_OF_OBJECT = '[object Object]';
export const TYPE_OF_ARRAY = '[object Array]';
export const TYPE_OF_BOOLEAN = '[object Boolean]';

export const REF_TO_RINCIAN_PENDARATAN = 'rincian_pendaratan';

export const CONTROL_DATA_OPERASIONAL = 'dataOperasional';
export const CONTROL_DATA_UKURAN = 'dataUkuran';
export const CONTROL_DATA_REPRODUKSI = 'dataReproduksi';

export const WPP = (): Observable<string[]> => of([ '571', '572', '573', '711', '712', '713', '714', '715', '716', '717', '718']);

export const JENIS_RUMPON = (): Observable<string[]> => of([
  'Rumpon Bambu', 'Rumpon Ban', 'Rumpon Beton', 'Rumpon Dasar', 'Rumpon Hanyut', 'Rumpon Permukaan', 'Rumpon Rakit', 'Rumpon Tetap'
]);

export const WAKTU_SETTING = (): Observable<string[]> => of([ 'Mat. Terbit', 'Pagi', 'Siang', 'Sore', 'Mat. Terbenam', 'Malam' ]);

export const SUMBER_INFORMASI = (): Observable<string[]> => of([ 'Nakhoda', 'Fishing Master', 'Agen', 'Pemilik/Perusahaan', 'ABK', 'Lainnya' ]);


