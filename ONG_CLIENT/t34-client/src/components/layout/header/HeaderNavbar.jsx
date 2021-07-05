import React from 'react';
import HeaderNavLink from './HeaderNavLink';
import { Button } from '@chakra-ui/react';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { useSelector } from 'react-redux';
import { isAdmin, isLoggedIn } from './../../../features/login/loginSlice';
import HeaderLogoutBtn from './HeaderLogoutBtn';
import { Link } from 'react-router-dom';

export default function HeaderNavbar({ show, toggleNav, isMobile }) {
    const _isLoggedIn = useSelector(isLoggedIn);

    const navbarStyle = {
        d: 'block',
        pos: isMobile ? 'absolute' : 'static',
        top: isMobile ? '100%' : '0',
        left: isMobile ? '0' : 'auto',
        w: isMobile ? '100%' : 'auto',
        py: isMobile ? '0' : '5px',
        flexGrow: '1'
    };
    const navItemsListStyle = {
        bgColor: isMobile ? '#18A0FB' : 'transparent',
        color: isMobile ? 'white' : '#18A0FB',
        direction: { base: 'column', sm: 'row' },
        h: isMobile ? 'auto' : '100%',
        wrap: 'wrap',
        align: 'center',
        spacing: 0
    };
    const buttonStyle = {
        d: { base: 'flex', md: 'none' },
        fontSize: '15px',
        w: {base: '80%', md: '40%'},
        my: '5px',
        fontWeight: '550',
        px: '0',
        _hover: {
            fontSize: '17px'
        }
    };

    const navItems = [
        { label: 'Inicio', path: '/inicio' },
        { label: 'Nosotros', path: '/nosotros' },
        { label: 'Actividades', path: '/actividades' },
        { label: 'Novedades', path: '/novedades' },
        { label: 'Testimonios', path: '/testimonios' },
        { label: 'Contacto', path: '/contacto' },
        { label: 'Contribuye', path: '/contribuye' },
    ];

    // Botones al no estar logueado
    const guestButtons = (<>
        <Button as={Link} to='/acceso'
        color='#18A0FB' border='1px solid #18A0FB' bgColor='white'
        {...buttonStyle} >Log in</Button>
        <Button as={Link} to='/registro'
        bgColor='#18A0FB' color='white' border='1px solid white'
        {...buttonStyle} >Registrate</Button>
    </>); 
    // Botones al estar logueado
    const memberButtons = (<>
    <HeaderLogoutBtn color='#18A0FB' border='1px solid #18A0FB' bgColor='black'
    {...buttonStyle} >Cerrar sesión</HeaderLogoutBtn>
    <Button as={Link} to='/backoffice'
    color='#18A0FB' border='1px solid #18A0FB' bgColor='white'
    {...buttonStyle} >Backoffice</Button></>);

    return (
        <Box {...navbarStyle} >
            <Collapse in={!isMobile || show} >
                <Flex {...navItemsListStyle} >
                    {navItems.map((navItem) => (
                        <HeaderNavLink key={navItem.label} path={navItem.path} isMobile={isMobile}
                            onClick={toggleNav}>
                            {navItem.label}
                        </HeaderNavLink>
                    ))}
                    <Stack align="center" justify="center" w="100%"
                    direction={['column', 'row']} p={['3', '3', '0']} >
                        {_isLoggedIn ? memberButtons : guestButtons}
                    </Stack>
                </Flex>
            </Collapse>
        </Box>
    );
}
