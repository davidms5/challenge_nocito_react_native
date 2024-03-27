import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FetchUserLoginTypes, FetchUserSignUpErrorTypes } from '../types/FetchUserTypes';
import { validateLoginForm } from '../utils/ValidationForms';

interface LoginFormProps {
  onSubmit: (values: FetchUserLoginTypes) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<FetchUserLoginTypes>({
    email: '',
    contrasenia: '',
  });

  const [errors, setErrors] = useState<FetchUserLoginTypes>({
    email: '',
    contrasenia: '',
  });

  const handleChange = (name: keyof FetchUserLoginTypes, value: string) => {
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = () => {
    const validationErrors = validateLoginForm(formValues);

   
    const hasErrors = Object.values(validationErrors).some(error => error !== '');

    if (hasErrors) {
      setErrors(validationErrors);
    } else {
      onSubmit(formValues);
      setErrors({
        email: '',
        contrasenia: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email: </Text>
      <TextInput
        onChangeText={(value) => handleChange('email', value)}
        value={formValues.email}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <Text style={styles.label}>Contraseña: </Text>
      <TextInput
        onChangeText={(value) => handleChange('contrasenia', value)}
        value={formValues.contrasenia}
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />
      {errors.contrasenia ? <Text style={styles.errorText}>{errors.contrasenia}</Text> : null}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
},
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});
export default LoginForm;
