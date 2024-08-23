export interface ICriptography {
  encrypt(value: string): string;
  compare(value: string, hash: string): boolean;
}
