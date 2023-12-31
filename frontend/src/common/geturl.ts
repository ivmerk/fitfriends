import { APIRoute, AppRoute } from './const';

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

export const getPersonalTrainingOrderApprovingUrl = (
  orderId: number,
  newStatus: string
) =>
  APIRoute.PersonalOrderAprooving.replace(
    '{orderId}',
    orderId.toString()
  ).replace('{newStatus}', newStatus);

export const getListOfTrainingUrl = (
  trainingQttSortingType: string,
  totalMoneySortingType: string
) =>
  APIRoute.ListOfTraining.replace(
    '{trainingQttSortingType}',
    trainingQttSortingType
  ).replace('{totalMoneySortingType}', totalMoneySortingType);

export const getListOfUsersUrl = (
  typesOfTraining: string,
  locations: string,
  levelOfExperience: string,
  page: number,
  limit: number
) =>
  APIRoute.UsersList.replace('{limit}', limit.toString())
    .replace('{page}', page.toString())
    .replace('{levelOfExperience}', levelOfExperience)
    .replace('{locations}', locations)
    .replace('{typesOfTraining}', typesOfTraining);

export const getUserCardAppUrlByID = (userId: string): string =>
  AppRoute.ClientCard.replace(':id', userId);

export const getListOfTrainingForCatalogUrl = (
  typesOfTraining: string,
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
  APIRoute.TrainingsForCatalog.replace('{typesOfTraining}', typesOfTraining)
    .replace('{priceMin}', priceMin)
    .replace('{priceMax}', priceMax)
    .replace('{caloriesQttMin}', caloriesQttMin)
    .replace('{caloriesQttMax}', caloriesQttMax)
    .replace('{ratingMin}', ratingMin)
    .replace('{ratingMax}', ratingMax)
    .replace('{page}', page.toString())
    .replace('{limit}', limit.toString())
    .replace('{priceSortType}', priceSortType);
