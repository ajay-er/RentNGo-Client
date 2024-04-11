import { Vehicle, VehicleType } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const fetchVehicleTypes = async (wheels: number): Promise<VehicleType[]> => {
  try {
    const url = new URL(`${API_BASE_URL}/vehicle/types`);
    url.searchParams.append('wheels', wheels.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorMessage = `Failed to fetch vehicle types. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.responseObject;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};

export const fetchVehicleModels = async (typeId: number): Promise<Vehicle[]> => {
  try {
    const url = new URL(`${API_BASE_URL}/vehicle/models`);
    url.searchParams.append('typeId', typeId.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorMessage = `Failed to fetch vehicle models. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data.responseObject;
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    throw error;
  }
};

export const bookVehicle = async (bookingData: any): Promise<any> => {
  try {
    const url = `${API_BASE_URL}/booking/submit`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorMessage = `Failed to book vehicle. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.status === 200;
  } catch (error) {
    console.error('Error booking vehicle:', error);
    throw error;
  }
};
