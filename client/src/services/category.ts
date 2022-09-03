import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';

export interface Category {
  id: string;
  name: string;
}

export interface GetAllCategoryResponse {
  categories: Category[];
}

export const getAllCategories = async (): Promise<GetAllCategoryResponse> => {
  const res = await privateClient.get(apiEndpoints.GET_ALL_CATEGORIES);

  return res.data;
};
