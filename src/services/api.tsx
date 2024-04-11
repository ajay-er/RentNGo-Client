import { Vehicle, VehicleType } from '@/types';

export const fetchVehicleTypes = async (wheels: number): Promise<VehicleType[]> => {
  try {
    // const response = await fetch('http://localhost:8080/api/v1/vehicle/type');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch vehicle types');
    // }
    // const data = await response.json();
    // return data.vehicleTypes;
    console.log(wheels);
    return new Promise<VehicleType[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { typeId: 1, typeName: 'api' },
          { typeId: 2, typeName: 'Cruiser' },
          { typeId: 3, typeName: 'Sedan' },
          { typeId: 4, typeName: 'SUV' },
          { typeId: 5, typeName: 'Truck' },
          { typeId: 6, typeName: 'Convertible' },
          { typeId: 7, typeName: 'Minivan' },
          { typeId: 8, typeName: 'Electric' },
          { typeId: 9, typeName: 'Hybrid' },
          { typeId: 10, typeName: 'Luxury' },
        ]);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};

export const fetchVehicleModels = async (typeId: number): Promise<Vehicle[]> => {
  try {
    // const response = await fetch('http://localhost:8080/api/v1/vehicle/type');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch vehicle types');
    // }
    // const data = await response.json();
    // return data.vehicleTypes;
    console.log(typeId);
    return new Promise<Vehicle[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, vehicleName: 'Sports' },
          { id: 2, vehicleName: 'Cruiser' },
          { id: 3, vehicleName: 'Sedan' },
          { id: 4, vehicleName: 'SUV' },
          { id: 5, vehicleName: 'Truck' },
          { id: 6, vehicleName: 'Convertible' },
          { id: 7, vehicleName: 'Minivan' },
          { id: 8, vehicleName: 'Electric' },
          { id: 9, vehicleName: 'Hybrid' },
          { id: 10, vehicleName: 'Luxury' },
        ]);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    throw error;
  }
};
