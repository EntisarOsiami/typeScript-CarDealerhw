import { carDealer } from "../models/carDealer.model";
import { generateId } from "../utils/generate-id";

const carDealers: Map<string, carDealer> = new Map();

const createDealer = (data: Omit<carDealer, 'id' | 'createdAt' | 'updatedAt'>): carDealer => {
  const id = generateId();
  const now = new Date();
  const carDealer: carDealer = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  carDealers.set(id, carDealer);
  return carDealer;
}

const getAllDealers = (): carDealer[] => {
  return Array.from(carDealers.values());
}

const getDealerById = (id: string): carDealer | undefined => {
  return carDealers.get(id);
}

const updateDealerById = (id: string, data: Partial<Omit<carDealer, 'id' |'createdAt'>>): carDealer | undefined => {
  const carDealer = carDealers.get(id);
  if (!carDealer) return undefined;

  const updatedCarDealer: carDealer = {
    ...carDealer,
    ...data,
    updatedAt: new Date(),
  };

  carDealers.set(id, updatedCarDealer);
  return updatedCarDealer;
}

const deleteDealerById = (id: string): boolean => {
  return carDealers.delete(id);
}



export const carDealerStore = {
  createDealer,
  getAllDealers,
  getDealerById,
  updateDealerById,
  deleteDealerById, 
  
};