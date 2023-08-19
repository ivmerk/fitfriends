export type GetTrainingFeedQuery = {
  durations: string;
  priceMin: string;
  priceMax: string;
  caloriesQttMin: string;
  caloriesQttMax: string;
  ratingMin: string;
  ratingMax: string;
  page: number;
  limit: number;
  priceSortType: string;
};
