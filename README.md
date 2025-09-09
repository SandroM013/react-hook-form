# Formulario con React Hook Form

Este proyecto muestra un ejemplo de cómo implementar formularios en React utilizando la librería **[react-hook-form](https://react-hook-form.com/)**.

---

## ¿Qué es React Hook Form?

**react-hook-form (RHF)** es una librería ligera para el manejo de formularios en React que:

- Permite registrar inputs sin necesidad de manejar un estado controlado.
- Ofrece validación integrada y soporte para validadores personalizados.
- Mejora el rendimiento al evitar re-renderizados innecesarios.
- Proporciona funciones y utilidades para leer valores, manejar errores, reiniciar el formulario, entre otros.

Se inicializa con el hook principal:

```js
import { useForm } from "react-hook-form"

const { register, handleSubmit, formState, watch, setValue, reset } = useForm()
```

## Desestructuración de useForm()

En el código se extraen varios objetos y funciones de useForm():

### register

Registra un input en el formulario.

Define reglas de validación (required, minLength, pattern, validate).

Se utiliza en cada campo del formulario para conectarlo con RHF.

Ejemplo:

```jsx
<input type="text" {...register("nombre", {
  required: { value: true, message: "El nombre es obligatorio" },
  minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
})}/>

```

### handleSubmit

Función que valida el formulario y ejecuta el callback de envío.

Si hay errores, estos quedan almacenados en formState.errors.

Si todo está correcto, entrega los datos al callback.

Ejemplo:
```jsx
const onSubmit = handleSubmit((data) => {
  console.log(data)
  alert("Formulario enviado")
  reset()
})
```
### formState.errors

Objeto que contiene los errores de validación por campo.

Cada propiedad corresponde al nombre del input.

Se accede al mensaje de error con errors.campo.message.

Ejemplo:
```jsx
{errors.nombre && <span>{errors.nombre.message}</span>}
```
### watch

Permite leer el valor actual de un campo sin provocar re-renderizados globales.

Útil para validaciones cruzadas y renderizado condicional.

Ejemplos:

validate: (value) => value === watch("password") || "Los passwords no coinciden"
```jsx
{watch("pais") === "ar" && (
  <input {...register("codigoPostal", { required: true })} />
)}
```
### setValue

Asigna un valor a un campo del formulario de forma programática.

Se utiliza, por ejemplo, para inputs de tipo file.

Ejemplo:
```jsx
<input
  type="file"
  onChange={(e) => setValue("fotoDelUsuario", e.target.files[0].name)}
/>
```
### reset

Reinicia el formulario a su estado inicial o a valores dados.

En este caso se usa tras enviar el formulario.

Ejemplo:
```jsx
reset()
```
## Validaciones implementadas en el formulario

1. Nombre: obligatorio y mínimo 3 caracteres.

2. Email: obligatorio y con formato válido (regex).

3. Password: obligatorio y mínimo 6 caracteres.

4. ConfirmPassword: obligatorio, mínimo 6 caracteres y debe coincidir con password.

5. Fecha de Nacimiento: obligatoria y con validación de mayoría de edad (≥ 18 años).

6. País: obligatorio, con campo adicional de código postal si se selecciona Argentina.

7. Términos y condiciones: checkbox obligatorio.

## Flujo del formulario

El usuario completa los campos.

Al hacer submit, handleSubmit valida todos los campos.

Si hay errores, se muestran en pantalla mediante errors.

Si no hay errores, se ejecuta el callback (onSubmit) que:

Muestra un alert.

Imprime los datos en consola.

Llama a reset() para limpiar el formulario.