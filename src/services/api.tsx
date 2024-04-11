export const fetchVehicleTypes = async (): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/vehicle/type');
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle types');
    }
    const data = await response.json();
    return data.vehicleTypes;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};
