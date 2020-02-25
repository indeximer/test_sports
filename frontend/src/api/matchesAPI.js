import { request, gremioId } from './apiConstants'
const endPoint = '/matches'


export const getAll = (signal) => request(`${endPoint}/${gremioId}`, signal)
export const getByAdversary = (adversaryId, signal) => request(`${endPoint}/${gremioId}/adversary/${adversaryId}`, signal)
export const getByChampionship = (chanpionshipId, signal) => request(`${endPoint}/${gremioId}/championship/${chanpionshipId}`, signal)