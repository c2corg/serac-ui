export default interface Report {
  id: number;
  description: string;
  locales: Locale[];
}

export interface Locale {
  title: string;
}
