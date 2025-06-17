import { carMaker } from "../models/carMake.model";
import { generateId } from "../utils/generate-id";


// create a map with value carMaker and string as key
const carMakers: Map<string, carMaker> = new Map();

// create a new car maker 
const createCarMaker = (data: Omit<carMaker, 'id' | 'createdAt' | 'updatedAt'>): carMaker => {
  const id = generateId();
  const now = new Date();
  const carMaker: carMaker = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
// add the new created car maker to map carMakers
  carMakers.set(id, carMaker);
  // return the created car maker 
  return carMaker;
}

// get all car makers from the map as an array
const getAllCarMakers = (): carMaker[] => {
  return Array.from(carMakers.values());
}
// get a car maker by id from the map
const getCarMakerByID = (id: string): carMaker | undefined => {
  return carMakers.get(id);
}
// update a car maker by id in the map
const updateCarMaker = (id: string, data: Partial<Omit<carMaker, 'id' | 'createdAt'>>): carMaker | undefined => {
  // first get the car maker by id
  const carMaker = carMakers.get(id);
  if (!carMaker) return undefined;  
// update the found car maker with the updated data and update the updatedAt field
  const updatedCarMaker: carMaker = {
    ...carMaker,
    ...data,
    updatedAt: new Date(),
  };
  // set the updated car maker in the map by using the same id
  // this will update the existing car maker in the map
  carMakers.set(id, updatedCarMaker);
  return updatedCarMaker;

}

// delete a car maker by id from the map

const deleteCarMaker = (id: string): boolean => {
  return carMakers.delete(id);
}

export const carMakerStore = {
  createCarMaker,
  getAllCarMakers,
  getCarMakerByID,
  updateCarMaker,
  deleteCarMaker,
};