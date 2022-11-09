import bcryptjs from 'bcryptjs';
import config from '../../config';

export async function encrypt(data: string): Promise<string> {
  try {
    const salt: string = await bcryptjs.genSalt(config.common.session.saltrounds);
    return await bcryptjs.hash(data, salt);
  } catch (error) {
    throw new Error(`Helper encrypt: ${error}`);
  }
}

export default encrypt;
