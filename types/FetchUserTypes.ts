export interface FetchUserSignUpTypes {
  nombre: string;
  apellido: string; 
  email: string; 
  telefono: number;
  contrasenia: string;
  id?: number;
};

export interface FetchUserSignUpErrorTypes{
  nombre: string;
  apellido: string; 
  email: string; 
  telefono: string;
  contrasenia: string;
  id?: number;
};

export interface FetchUserLoginTypes {
    email: string;
    contrasenia: string;
    message?: string;
}