import React, { useEffect, useState } from "react";
import "../styles/auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authProvider";
import { useApi } from "../hooks/useApi";
import { TbAlertCircleFilled } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";

export default function Auth() {
  const [authForm, setAuthForm] = useState("login");
  const [errorMsg, setErrorMsg] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    address: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    role: "USER",
    birthDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [cities, setCities] = useState([]);
  const { data } = useApi("/cities");

  const navigate = useNavigate();

  const { login, register, authError } = useAuth();

  // Next step: Store token in local storage and make sure all useful data is stored in token
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login : " + form.email + " " + form.password);
    try {
      await login(form.email, form.password);
      // Navigation seulement après une connexion réussie
      navigate("/");
    } catch (error) {
      // Gérer les erreurs de connexion ici
      console.error("Erreur de connexion :", error);
      handleCloseAlert(null, "Erreur lors de l'authentification");
      // Éventuellement, afficher un message d'erreur à l'utilisateur
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("register");
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      console.error("Erreur de connexion :", error);
      handleCloseAlert(null, "Erreur lors de l'authentification");
    }
  };

  const handleCloseAlert = (e, msg = null) => {
    setErrorMsg(msg);
  };

  useEffect(() => {
    console.log("Data => " + data);
    setCities(data);
    console.log("Cities => " + cities);
  }, [data]);

  return (
    <>
      {/* ALERT ERROR MSG */}
      {errorMsg && (
        <div className="absolute flex items-center gap-4 px-6 py-4 my-4 text-lg bg-red-200 border border-red-300 rounded-md inset-x-8 top-36">
          <IoIosClose
            size={32}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={handleCloseAlert}
            color="#DC2626"
          />
          <TbAlertCircleFilled color="#DC2626" size={28} />
          <p className="text-red-500">{errorMsg}</p>
        </div>
      )}
      <section className="pt-8 page-container">
        <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center rounded-md" role="group">
              <button
                type="button"
                onClick={() => setAuthForm("login")}
                className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${
                  authForm == "login" ? "bg-slate-100" : "bg-white"
                }`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setAuthForm("register")}
                className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${
                  authForm == "register" ? "bg-slate-100" : "bg-white"
                }`}
              >
                S'inscrire
              </button>
            </div>
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
              {authForm == "login"
                ? "Sign in to your account"
                : "Create a new account"}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={authForm == "login" ? handleLogin : handleRegister}
            >
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {form == "login" && (
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {authForm == "register" && (
                <>
                  <div className="mt-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm password
                    </label>
                    <input
                      id="confirmedPassword"
                      name="confirmedPassword"
                      type="password"
                      autoComplete="confirmed-password"
                      required
                      value={form.confirmedPassword}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={form.address}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      {cities && cities.length > 0 && (
                        <select
                          name="city"
                          id="city"
                          value={form.city}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Sélectionner une ville</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Role
                    </label>
                    <div className="mt-2">
                      <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="USER" selected>
                          Utilisateur
                        </option>
                        <option value="ORGANIZER">Organisateur</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Zipcode
                    </label>
                    <div className="mt-2">
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        value={form.zipCode}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Date de naissance
                    </label>
                    <div className="mt-2">
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        required
                        value={form.birthDate}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
