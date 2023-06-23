import axios from 'axios';
import queryString from 'query-string';
import { PrizeInterface, PrizeGetQueryInterface } from 'interfaces/prize';
import { GetQueryInterface } from '../../interfaces';

export const getPrizes = async (query?: PrizeGetQueryInterface) => {
  const response = await axios.get(`/api/prizes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPrize = async (prize: PrizeInterface) => {
  const response = await axios.post('/api/prizes', prize);
  return response.data;
};

export const updatePrizeById = async (id: string, prize: PrizeInterface) => {
  const response = await axios.put(`/api/prizes/${id}`, prize);
  return response.data;
};

export const getPrizeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/prizes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePrizeById = async (id: string) => {
  const response = await axios.delete(`/api/prizes/${id}`);
  return response.data;
};
