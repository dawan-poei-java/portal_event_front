import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./App.css";
import Header from "./components/header";
import Home from "./views/home";
import Cities from "./views/cities";
import City from "./views/city";
import Event from "./views/event";
import "./styles/variables.scss";
import ProfilClient from "./views/profilClient";

import ListAllEvent from "./views/listAllEvent";
import ReservationClient from "./views/reservationClient";
import ListEventOrga from "./views/listEventOrga";
import NotFound from "./views/notFound";
import Contact from "./views/contact";
import Footer from "./components/footer";


import Auth from "./views/auth";

import Cart from "./views/cart";
import Logout from "./components/logout";

import { authProvider as AuthProvider } from "./context/authProvider";



function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Helmet>
            <title>Event</title>
            <meta name="description" content="Event" />
            <link href="./output.css" rel="stylesheet"></link>
          </Helmet>
          <Header />
          <Routes>
            <Route index path={"/"} element={<Home />} />
            <Route path="*" element={<NotFound/>}/>
            <Route path={"/cities"} element={<Cities />} />

            <Route path={"/cities/:city"} element={<City />} />
            <Route path={"/cities/:city/:eventId"} element={<Event />} />
            <Route path={"/contact"} element={<Contact/>} />
            {/* a modifier quand le back est fini */}
            <Route path={"/profileclient"} element={<ProfilClient />} />
            <Route path={"/reservation"} element={<ReservationClient />} />
            <Route path={"/eventOrga"} element={<ListEventOrga />} />
            <Route path={"/allEvents"} element={<ListAllEvent />} />
            <Route path={"/cart"} element={<Cart/>} />
            <Route path={"/login"} element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
