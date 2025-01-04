import bcrypt from 'bcrypt';

export class HashManager {
  hash = async (text: string) => {
    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(text, salt);

    return hashed;
  };

  isValid = async (text: string, hashedText: string) => {
    const result = await bcrypt.compare(text, hashedText);

    return result;
  };
}