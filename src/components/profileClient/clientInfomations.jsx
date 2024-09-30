import { React, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

export default function ClientInfomations() {
  const [isChecked, setIsChecked] = useState(false);
  const { data: userData } = useApi(
    "/users/" + sessionStorage.getItem("userId")
  );
  const [userDataChanged, setUserDataChanged] = useState(null);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    console.log("first");
  };

  useEffect(() => {
    setUserDataChanged(userData);
  }, [userData]);

  return (
    <>
      {userDataChanged && (
        <div className="grid gap-10 page-container-profile">
          <div className="flex items-center gap-10 profile-heading">
            <div className="rounded-full profile-picture w-44 h-44 ">
              <img
                className="rounded-full"
                src="https://picsum.photos/200"
                alt="pp"
              />
            </div>
            <h2 className="text-5xl">
              {userDataChanged.firstName + " " + userDataChanged.lastName}
            </h2>
          </div>
          <h2 className="text-3xl">Info perso</h2>
          <div className="border profile-info p-9">
            <div className="grid gap-4 grid-cols-2 grid-rows-* mt-4 w-4/6">
              <div className="flex flex-col ">
                <label htmlFor="">Nom</label>
                <input
                  disabled
                  type="text"
                  className="border"
                  value={userDataChanged.lastName}
                />
              </div>

              <div className="grid">
                <label htmlFor="">Prénom</label>
                <input
                  disabled
                  type="text"
                  className="border"
                  value={userDataChanged.firstName}
                />
              </div>

              <div className="grid">
                <label htmlFor="">Adresse mail</label>

                <input
                  type="email"
                  className="border "
                  value={userDataChanged.email}
                />
              </div>
              <div className="grid">
                <label htmlFor="">Tel</label>
                <input
                  type="tel"
                  className="border"
                  value={userDataChanged.phoneNumber}
                />
              </div>
              <div className="grid">
                <label htmlFor="">Date de naissance</label>
                <input
                  type="mail"
                  className="border"
                  value={new Date(userDataChanged.birthDate)
                    .toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")}
                />
              </div>
              <button className="h-8 text-white bg-blue-500">
                Changer de mot de passe
              </button>
            </div>
          </div>
          <h2 className="text-3xl">Adresses</h2>
          <div className="border profile-info p-9">
            <div className="grid gap-4 grid-cols-2 grid-rows-* mt-4 w-full justify-between">
              <div>
                <h3 className="mb-4">Addresse de livraison</h3>
                <div className="flex flex-col ">
                  <label htmlFor="">Rue</label>
                  <input
                    type="text"
                    className="border"
                    value={userDataChanged.address}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Complément</label>
                  <input
                    type="text"
                    className="border"
                    value={userDataChanged.addressComplement}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Ville</label>
                  <input
                    type="text"
                    className="border"
                    value={userDataChanged.city.name}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Code postal</label>
                  <input
                    type="text"
                    className="border"
                    value={userData.zipCode}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="">Adresse de facturation identique</label>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={handleCheckboxChange}
                  />
                </div>
              </div>
              {!isChecked && (
                <div>
                  <h3 className="mb-4">Addresse de facturation</h3>
                  <div className="flex flex-col ">
                    <label htmlFor="">Rue</label>
                    <input
                      type="text"
                      className="border"
                      value={userDataChanged.address}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Complément</label>
                    <input
                      type="text"
                      className="border"
                      value={userDataChanged.addressComplement}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Ville</label>
                    <input
                      type="text"
                      className="border"
                      value={userDataChanged.city.name}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Code postal</label>
                    <input
                      type="text"
                      className="border"
                      value={userDataChanged.zipCode}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
