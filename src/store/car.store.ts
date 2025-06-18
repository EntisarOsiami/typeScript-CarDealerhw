import { Car } from '../models/car.model';
import { generateId } from '../utils/generate-id';

// create a map object to store cars
const cars: Map<string, Car> = new Map();

// create a car object and add it to the map cars
const createCar = (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Car => {
  const id = generateId();
  const now = new Date();
  const car: Car = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  cars.set(id, car);
  return car;
};

// get all cars from the map
const getAllCars = (): Car[] => {
  return Array.from(cars.values());
};

// get car by id from the map
const getCarByID = (id: string): Car | undefined => {
  return cars.get(id);
};

// update car by id in the map
const updateCar = (
  id: string,
  data: Partial<Omit<Car, 'id' | 'createdAt'>>
): Car | undefined => {
  const car = cars.get(id);
  if (!car) return undefined;
  
  const updatedCar: Car = {
    ...car,
    ...data,
    updatedAt: new Date(),
  };

  cars.set(id, updatedCar);
  return updatedCar;
};

// delete car by id from the map
const deleteCar = (id: string): boolean => {
  return cars.delete(id);
};

// get cars by dealerId
const getCarsByDealerId = (dealerId: string): Car[] => {
  return getAllCars().filter((car) => car.dealerId === dealerId);
};
// get cars by carMakerId
const getCarsByCarMakerId = (carMakerId: string): Car[] => {
  return getAllCars().filter(
    (car) => car.carMakerId === carMakerId
  );
};
// get cars by dealerId and carMakerId
const getCarsFiltered = (dealerId: string, carMakerId: string): Car[] => {
  return getAllCars().filter(
    (car) => car.dealerId === dealerId && car.carMakerId === carMakerId
  );
};

export const carStore = {
  createCar,
  getAllCars,
  getCarByID,
  updateCar,
  deleteCar,
  getCarsByDealerId,
  getCarsByCarMakerId,
  getCarsFiltered,
};
