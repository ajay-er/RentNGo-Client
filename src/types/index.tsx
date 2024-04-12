export interface VehicleType {
  id: number;
  typeName: string;
}
export interface Vehicle {
  id: number;
  name: string;
}

export interface ApiResponseType {
  message: string;
  responseObject: any;
  statusCode: number;
  success: boolean;
}
