import { APIRoute } from '../const';

export const getTreinerListQuery = (
  durations: string,
  priceMin: string,
  priceMax: string,
  caloriesQttMin: string,
  caloriesQttMax: string,
  ratingMin: string,
  ratingMax: string,
  page: number,
  limit: number,
  priceSortType: string
) =>
  APIRoute.TrainingFeed.replace('{durations}', durations)
    .replace('{priceMin}', priceMin)
    .replace('{priceMax}', priceMax)
    .replace('{caloriesQttMin}', caloriesQttMin)
    .replace('{caloriesQttMax}', caloriesQttMax)
    .replace('{ratingMin}', ratingMin)
    .replace('{ratingMax}', ratingMax)
    .replace('{page}', page.toString())
    .replace('{limit}', limit.toString())
    .replace('{priceSortType}', priceSortType);
