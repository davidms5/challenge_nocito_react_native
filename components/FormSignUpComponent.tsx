import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FetchUserSignUpErrorTypes, FetchUserSignUpTypes } from '../types/FetchUserTypes';
import { validateSignUpForm } from '../utils/ValidationForms';
interface SignUpFormProps {
    onSubmit: (values: FetchUserSignUpTypes) => void;
  }
  
const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {

  const [formValues, setFormValues] = useState<FetchUserSignUpTypes>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    contrasenia: '',
  });

  const [errors, setErrors] = useState<FetchUserSignUpErrorTypes>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasenia: '',
  });
  const [sendingForm, setSendingForm] = useState(false);

  const handleChange = (name: keyof FetchUserSignUpTypes, value: string | number) => {
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async () => {

    setSendingForm(true);
    const validationErrors = validateSignUpForm(formValues);
    const hasErrors = Object.values(validationErrors).some(error => error !== '');

    if (hasErrors) {
      setErrors(validationErrors);
      setSendingForm(false);
      return;
    } else {
      onSubmit(formValues);
      setSendingForm(false);
      setErrors({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contrasenia: '',
      });
    }
  };
    
 

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => handleChange('nombre', value)}
        value={formValues.nombre}
        placeholder="Nombre"
        style={styles.input}
      />
      {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
      <TextInput
        onChangeText={(value) => handleChange('apellido', value)}
        value={formValues.apellido}
        placeholder="Apellido"
        style={styles.input}
      />
      {errors.apellido ? <Text style={styles.errorText}>{errors.apellido}</Text> : null}
      <TextInput
        onChangeText={(value) => handleChange('email', value)}
        value={formValues.email}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        onChangeText={(value) => handleChange('telefono', parseInt(value, 10))}
        value={isNaN(formValues.telefono) ? '' : formValues.telefono.toString()}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        style={styles.input}
      />
      {errors.telefono ? <Text style={styles.errorText}>{errors.telefono}</Text> : null}
      <TextInput
        onChangeText={(value) => handleChange('contrasenia', value)}
        value={formValues.contrasenia}
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />
      {errors.contrasenia ? <Text style={styles.errorText}>{errors.contrasenia}</Text> : null}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        {sendingForm ? (
            <ActivityIndicator size="small" color="blue"/>
        ): 
        (<Text style={styles.buttonText}>Registrarse</Text> )}
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'grey',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUpForm;