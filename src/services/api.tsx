import { ApiResponseType } from '@/types';

export const fetchVehicleTypes = async (wheels: number): Promise<ApiResponseType> => {
  try {
    const url = new URL(`${process.env.API_BASE_URL}/vehicle/types`);
    url.searchParams.append('wheels', wheels.toString());

    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};

export const fetchVehicleModels = async (typeId: number): Promise<ApiResponseType> => {
  try {
    const url = new URL(`${process.env.API_BASE_URL}/vehicle/models`);
    url.searchParams.append('typeId', typeId.toString());

    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    throw error;
  }
};

export const bookVehicle = async (bookingData: any): Promise<ApiResponseType> => {
  try {
    const url = `${process.env.API_BASE_URL}/booking/submit`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error booking vehicle:', error);
    throw error;
  }
};
