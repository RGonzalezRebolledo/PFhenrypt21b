
"use client";


import { useFormRegister } from "@/hooks/useFormRegister";
import { velidateFormRegister } from "@/helpers/validateRegister";
import { fetchRegister } from "@/api/register";
import Image from "next/image";

import registerImg from "../../../public/register_prueba.png";
import Style from "./register.module.css";
import Loading from "../Loading/Loading";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  dni: "",
};

const RegisterComponent = () => {
  const { form, errors, loading, handleChange, handleBlur, handleSubmit } =
    useFormRegister(initialForm, velidateFormRegister, fetchRegister);

  return (
    <form onSubmit={handleSubmit} className={Style.container}>
      {/*Imagen estática para el componente Register*/}
      <div className={Style.imgContainer}>
        <Image src={registerImg} alt="Usuario" width={500} height={500} />
      </div>
      {/*Formulario de registro*/}
      <div className={Style.formContainer}>
        <h1>Registrarse</h1>
        {errors.name && (
          <p className="text-red-500 text-xs m-2">{errors.name}</p>
        )}
        {/*Nombre*/}
        <div className={Style.inputLabelGroup}>
          <input
            type="text"
            name="name"
            id="name_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
            className={Style.inputForm}
            placeholder=" "
            autoComplete="off"
          />
          <label htmlFor="name_id" className={Style.labelForm}>
            Nombre Completo
          </label>
        </div>
        {/*Email*/}
        {errors.email && (
          <p className="text-red-500 text-xs m-2">{errors.email}</p>
        )}
        <div className={Style.inputLabelGroup}>
          <input
            type="text"
            name="email"
            id="email_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.email}
            className={Style.inputForm}
            placeholder=" "
          />
          <label htmlFor="email_id" className={Style.labelForm}>
            Correo Electrónico
          </label>
        </div>
        {/*Contraseña*/}
        {errors.password && (
          <p className="text-red-500 text-xs m-2">{errors.password}</p>
        )}
        <div className={Style.inputLabelGroup}>
          <input
            type="password"
            name="password"
            id="password_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
            className={Style.inputForm}
            placeholder=" "
          />
          <label htmlFor="password_id" className={Style.labelForm}>
            Contraseña
          </label>
        </div>
        {/*Confirmar contraseña*/}
        {errors.confirm_password && (
          <p className="text-red-500 text-xs m-2">{errors.confirm_password}</p>
        )}
        <div className={Style.inputLabelGroup}>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.confirm_password}
            className={Style.inputForm}
            placeholder=" "
          />
          <label htmlFor="confirm_password_id" className={Style.labelForm}>
            Confirmar Contraseña
          </label>
        </div>
        {/*Teléfono*/}
        {errors.phone && (
          <p className="text-red-500 text-xs m-2">{errors.phone}</p>
        )}
        <div className={Style.inputLabelGroup}>
          <input
            type="text"
            name="phone"
            id="phone_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.phone}
            className={Style.inputForm}
            placeholder=" "
          />
          <label htmlFor="phone_id" className={Style.labelForm}>
            Teléfono
          </label>
        </div>
        {/*Dni*/}
        {errors.dni && <p className="text-red-500 text-xs m-2">{errors.dni}</p>}
        <div className={Style.inputLabelGroup}>
          <input
            type="text"
            name="dni"
            id="dni_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.dni}
            className={Style.inputForm}
            placeholder=" "
          />
          <label htmlFor="dni_id" className={Style.labelForm}>
            DNI
          </label>
        </div>

        <p className={Style.tienesCuenta}>
          ¿Ya tienes una cuenta? <a href="/login">INICIA SESIÓN</a>
        </p>

        <button type="submit" 
        className={`${
        Object.values(form).every(value => value.trim() !== "")
        ? Style.submit
        : Style.submitDisabled
        }`}
        disabled={
          !form.name || 
          !form.email || 
          !form.password || 
          !form.confirm_password || 
          !form.phone || 
          !form.dni
        }
        >
          {loading ? <Loading /> : "REGISTRATE"}
        </button>
      </div>
    </form>
  );
};

export default RegisterComponent;

