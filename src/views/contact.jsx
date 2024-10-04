import React, { useState } from "react";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsSent(true);
  };
  return (
    <>
      <section className="bg-white  page-container">
        <div className="max-w-screen-md px-4 py-8 mx-auto lg:py-16">
          {isSent && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
              role="alert"
            >
              <p className="text-sm font-semibold">
                Merci! Votre message a été envoyé avec succès.
              </p>
            </div>
          )}
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900 ">
            Contact
          </h2>
          <p className="mb-8 font-light text-center text-gray-500 lg:mb-16 ">
            Vous avez un problème technique ? Vous souhaitez donner votre avis
            sur une fonctionnalité bêta ? Vous avez besoin de détails sur notre
            offre? Faites-le nous savoir.
          </p>
          <form onSubmit={handleSubmitEmail} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Votre adresse email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                placeholder="nom@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Comment pouvons-nous vous aider?"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Votre message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Entrez votre demande"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
