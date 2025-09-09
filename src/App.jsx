import './index.css'
import {useForm} from 'react-hook-form' 

function App(){
  const {register, handleSubmit, formState:{errors}, watch, setValue, reset} = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    
    alert("Formulario enviado")

    reset()
  })

  return (
    <form onSubmit = {onSubmit}>
      <label htmlFor="Nombre">Nombre</label>
      <input type="text" {...register("nombre",{
        required:{
          value:true,
          message:"El nombre es obligatorio"
        },
        minLength:{
          value:3,
          message:"El nombre debe tener al menos 3 caracteres"
      } 
        })}/>
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }
      <label htmlFor="Correo">Correo</label>
      <input type="email" {...register("email", {
        required:{
          value:true,
          message:"El correo es obligatorio"
        },
        pattern:{
          value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message:"El correo no es válido"
        }
      })}/>
      
      {
        errors.email && <span> {errors.email.message} </span>
      }

      <label htmlFor="Password">Password</label>
      <input type="password" {...register("password", {
        required:{
          value: true,
          message:"El password es obligatorio"
        },
        minLength:{
          value:6,
          message:"El password debe tener al menos 6 caracteres"
        }
      })}/>

      {
        errors.password && <span>{errors.password.message}</span>
      }

      <label htmlFor="ConfirmPassword">Confirmar Password</label>
      <input type="password" {...register("ConfirmPassword", {
        required:{
          value:true,
          message:"Debes confirmar tu password"
        },
        minLength:{
          value:6,
          message:"El password debe tener al menos 6 caracteres"
        },
        validate: (value) => value === watch("password") || "Los passwords no coinciden"
      })}/>
      {
        errors.ConfirmPassword && <span>{errors.ConfirmPassword.message}</span>
      }


      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input type="date" {...register("fechaNacimiento", {
        required:{
          value:true,
          message:"La fecha de nacimiento es obligatoria"
        },
        validate: (value) => {
          const fechaNacimiento = new Date(value);
          const fechaActual = new Date();

          const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
          
          return edad >=18 || "Debes ser mayor de 18 años"
        }
      })}/>

      <label htmlFor="Pas">Pais</label>
      <select {...register("pais", {
        required:{
          value:true,
          message:"El país es obligatorio"
        }
        })}>
        <option value="ar">Argentina</option>
        <option value="br">Brasil</option>
        <option value="ch">Chile</option>
      </select>
    
        {
        errors.pais && <span>{errors.pais.message}</span>
        }

        {
          watch("pais") === "ar" && (
            <input type="text" placeholder="Código Postal" {...register("codigoPostal", {
              required:{
                value:true,
                message:"El código postal es obligatorio"
              },
              pattern:{
                value:/^\d{4}$/,
                message:"El código postal debe tener 4 dígitos"
              }
            })}/>
          )
        }
      <label htmlFor="file">Foto de Perfil</label>
      <input type="file" 
      onChange={ (e) => {
        setValue('fotoDelUsuario', e.target.files[0].name)
      } }
      />


      <label htmlFor="terminos">Acepto Terminos y condicioens</label>
      <input type="checkbox" {...register("terminos",
        { required: {value:true, message:"Debes aceptar los términos y condiciones"} }
      )}/>

      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }

      <button type="submit">Enviar</button>
    
      <pre>{JSON.stringify(watch(), null, 2)}</pre>

    </form>
  )
}

export default App