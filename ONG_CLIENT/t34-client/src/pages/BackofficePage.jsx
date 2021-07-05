import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from '../components/Backoffice/navbar/Navbar';
import Sidebar from '../components/Backoffice/sidebar/Sidebar';
import Profile from '../components/Profile';
import EditOrganization from '../components/Backoffice/edit-organization/edit-organization'
import ContactList from '../components/ContactList/index'
import News from '../components/News'
import Testimonials from "../pages/Testimonials";
import BackofficeUsers from "../components/BackofficeUsers/index";
import CategoryList from "../components/Categorias/CategoryList/CategoryList";
import Activities from "../components/Backoffice/activities_backoffice/activities";
import EditHomeForm from '../components/EditHomeForm';
import { Box, Flex } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { isAdmin } from '../features/login/loginSlice';
import { BackofficeRoute } from '../routes/helpersRoutes';

export default function BackofficePage() {
    const _isAdmin = useSelector(isAdmin);
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box bg="#F5F6F9" h="100vh">
            <Navbar isOpen={isOpen} onToggle={onToggle} isAdmin={_isAdmin} />
            <Flex w="100%">
                <Sidebar isOpen={isOpen} isAdmin={_isAdmin} onToggle={onToggle} />
                <Box w="full" h="full" pt="8" ml={{base: "0px", md: "300px"}}>
                    <Switch>
                        <Route exact path="/backoffice/perfil" component={Profile} />
                        <BackofficeRoute exact path="/backoffice/activities" component={Activities} />
                        <BackofficeRoute exact path="/backoffice/users" component={BackofficeUsers} />
                        <BackofficeRoute exact path="/backoffice/news" component={News} />
                        <BackofficeRoute exact path="/backoffice/contacts" component={ContactList} />
                        <BackofficeRoute exact path="/backoffice/testimonials" component={Testimonials} />
                        <BackofficeRoute exact path="/backoffice/edit-organization" component={EditOrganization} />
                        <BackofficeRoute exact path="/backoffice/categories" component={CategoryList} />
                        <BackofficeRoute exact path="/backoffice/edit-home" component={EditHomeForm} />
                        <Redirect path={'/**'} to='/backoffice/perfil' />
                    </Switch>
                </Box>
            </Flex>
        </Box>
    )
}
