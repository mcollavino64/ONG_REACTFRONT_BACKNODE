import React from 'react';
import avatar from "../../../assets/images/avatar.svg";
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Button, Image, Text } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const Navbar = ({ isOpen, onToggle, isAdmin }) => {
    const { image } = useSelector((state) => state.publicInfo.data);
    const navbarStyle = {
        w: "100%",
        justify: "center",
        pos: "fixed",
        bg: {base:"white", md:"transparent"},
        shadow: {base:"lg", md:"none"},
        top: "0px",
        zIndex: "6",
        py: "4px",
        h:"60px"
    }
    const toggleStyle = {
        pos: "absolute",
        left: "10px",
        d: { base:'flex', md: 'none'},
        size: '40px',
        p: isOpen ? '10px' : '4px',
        radius: 'md'
    };
    return (
        <HStack {...navbarStyle} >
            <Button onClick={onToggle} {...toggleStyle}>
                {isOpen ? <CloseIcon boxSize='1.1em' /> : <HamburgerIcon boxSize='2em' />}
            </Button>
            <Link to="/inicio">
                <Image h='60px' py='4px' px='15px' d={{base:"flex", md:"none"}} src={image || logo} />
            </Link>
            <HStack pos="absolute" right="16px" spacing={3}>
                <Text as="h1" fontSize="lg" fontWeight="bold" d={{base: "none", md: "block"}}>
                    {isAdmin ? 'Administrador' : 'Usuario'}
                    </Text>
                <Link to="/backoffice/editar-usuario" >
                    <Image w="40px" borderRadius="full" src={avatar} alt="avatar" radius="100%" />
                </Link>
            </HStack>
        </HStack>
    );
};

export default Navbar;