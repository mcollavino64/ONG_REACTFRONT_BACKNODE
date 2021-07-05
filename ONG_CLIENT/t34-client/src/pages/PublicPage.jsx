import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { LoggedRoute } from '../routes/helpersRoutes';

import Home from '../components/Inicio';
import Nosotros from '../components/Nosotros';
import Contactos from '../components/Contact';
import Novelties from './Novelties';
import Testimonials from '../pages/Testimonials';
import CardDetail from '../components/novelties/CardDetail';
import Actividades from "../components/Actividades/ListaActividades";
import ActividadId from '../components/Actividades/ActividadId';
import Contribuye from '../components/Contribuye';
import Header from '../components/layout/header/index';
import Footer from '../components/layout/footer';
import {AnimatePresence, motion} from 'framer-motion';

const RouteTransition = (props) => {
  return(
      <motion.div
        initial={{x:-100, opacity: 0}}
        animate={{x:0, opacity: 1}}
        exit={{x:100, opacity: 0}}
        transition={{ type: 'spring', duration: 0.4 }}>
          <Route exact {...props} />
      </motion.div>
    );
};

export default function PublicPage() {
  const location = useLocation();
    return (
        <>
            <Header />
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.key}>
                    <RouteTransition path={'/inicio'} component={Home} />
                    <RouteTransition path={'/nosotros'} component={Nosotros} />
                    <RouteTransition path={'/contacto'} component={Contactos} />
                    <RouteTransition path={'/novedades/:id'} component={CardDetail} />
                    <RouteTransition path={'/novedades'} component={Novelties} />
                    <RouteTransition path={'/testimonios'} component={Testimonials} />
                    <RouteTransition path={'/actividades/:id'} component={ActividadId} />
                    <RouteTransition path={'/actividades'} component={Actividades} />
                    <RouteTransition path={'/contribuye'} component={Contribuye} />
                    <Redirect path={'/**'} to='/inicio' />
                </Switch>
            </AnimatePresence>
            <Footer />
        </>
    )
}
