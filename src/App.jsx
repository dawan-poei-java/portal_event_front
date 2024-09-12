import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Helmet } from "react-helmet";

import './App.css'
import Header from './components/header'
import Home from "./views/home";
import Cities from "./views/cities";
import City from './views/city'
import Event from './views/event'
import "./styles/variables.scss"
import ProfilClient from "./views/profilClient"
import ListAllEvent from "./views/listAllEvent";
import ReservationClient from "./views/reservationClient";

function App() {


  return (
    <>
      <BrowserRouter>
        <Helmet>
          <title>Event</title>
          <meta name="description" content="Event" />
          <link href="./output.css" rel="stylesheet"></link>
        </Helmet>
        <Header />
        <Routes>
          <Route index path={"/"} element={<Home/>}/>
          <Route path={"/cities"} element={<Cities/>}/>

          <Route path={"/cities/:city"} element={<Cities/>}/>x

          <Route path={"/cities/:city"} element={<City/>}/>x
          <Route path={"/cities/:city/:eventId"} element={<Event/>}/>

          

          {/* a modifier quand le back est fini */}
          <Route path={"/profileclient"} element={<ProfilClient/>}/>
          <Route path={"/reservation"} element={<ReservationClient/>}/>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
