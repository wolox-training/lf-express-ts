import axios from 'axios';
import { externalApiError } from '../errors';
import { Cards, CardsInfo } from '../interfaces/cards';

const BASE_URL = process.env.HEARTHSTONE_API_BASE_URL;
const KEY = process.env.HEARTHSTONE_API_KEY as string;
const HOST = process.env.HEARTHSTONE_API_HOST;

const card = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'x-rapidapi-host': HOST,
    'x-rapidapi-key': KEY
  }
});

export async function getAllCards(): Promise<Cards> {
  try {
    const response = await card.get<Cards>('cards');
    return response.data;
  } catch (error) {
    throw externalApiError(`External API error getting all cards ${error}`);
  }
}

export async function getInfo(): Promise<CardsInfo> {
  try {
    const response = await card.get<CardsInfo>('info');
    return response.data;
  } catch (error) {
    throw externalApiError(`External API error gettinf cards info ${error}`);
  }
}

export default {
  getAllCards,
  getInfo
};
