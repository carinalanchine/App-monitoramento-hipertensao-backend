import * as bcrypt from "bcrypt";

export class CriptographyAdapter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 8);
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
