import bcryptjs from 'bcryptjs';

export async function encrypt(data: string): Promise<string> {
  try {
    const salt: string = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(data, salt);
  } catch (error) {
    throw new Error(`Helper encrypt: ${error}`);
  }
}

export default encrypt;
