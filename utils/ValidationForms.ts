import { FetchUserLoginTypes, FetchUserSignUpErrorTypes, FetchUserSignUpTypes } from "../types/FetchUserTypes";

export const validateSignUpForm = (formValues: FetchUserSignUpTypes): FetchUserSignUpErrorTypes => {
    const errors: FetchUserSignUpErrorTypes = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      contrasenia: '',
    };
  
    if (!formValues.nombre) {
      errors.nombre = 'El nombre es obligatorio';
    }
    if (!formValues.apellido) {
      errors.apellido = 'El apellido es obligatorio';
    }
    if (!formValues.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(formValues.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!formValues.telefono) {
      errors.telefono = 'El teléfono es obligatorio';
    } else if (isNaN(formValues.telefono)) {
      errors.telefono = 'El teléfono debe ser un número';
    }
    if (!formValues.contrasenia) {
      errors.contrasenia = 'La contraseña es obligatoria';
    }
  
    return errors;
  };
  
  export const validateLoginForm = (formValues: FetchUserLoginTypes): FetchUserLoginTypes => {
    const errors: FetchUserLoginTypes = {
      email: '',
      contrasenia: '',
    };
  
    if (!formValues.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(formValues.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
  
    if (!formValues.contrasenia) {
      errors.contrasenia = 'La contraseña es obligatoria';
    }
  
    return errors;
  };

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

