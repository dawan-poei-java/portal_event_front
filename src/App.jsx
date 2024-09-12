import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Helmet } from "react-helmet";

import './App.css'
import Header from './components/header'
import Home from "./views/home";
import Events from "./views/events";
import EventsVille from './views/eventsVille'
import Event from './views/event'
import "./styles/variables.scss"


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
          <Route path={"/event"} element={<Events/>}/>
          <Route path={"/event/:city"} element={<EventsVille/>}/>
          <Route path={"/event/:city/:eventId"} element={<Event/>}/>
          
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
