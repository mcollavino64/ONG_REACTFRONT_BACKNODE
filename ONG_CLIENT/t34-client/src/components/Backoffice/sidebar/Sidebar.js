import * as React from 'react';
import * as FaIcons from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/login/loginSlice';
import { NavLink, useHistory } from 'react-router-dom';
import { VStack } from '@chakra-ui/layout';
import { Icon, Link, Button, Image } from '@chakra-ui/react';
import styles from './Sidebar.module.css';
import logoWhite from '../../../assets/images/somosmas_white.png';
import {motion} from 'framer-motion';
import { Text } from '@chakra-ui/react';

const Sidebar = ({isOpen, isAdmin, onToggle}) =>{
    const sidebarRef = React.useRef(null);
    const dispatch =  useDispatch();
    const history = useHistory();
    const sidebarStyle ={
        background: 'gray.800',
        h: '100vh',
        w: "30vh",
        px: 3,
        transition: 'all 0.2s',
        zIndex: '7',
        position: "fixed",
        d: { base: isOpen ? 'flex' : 'none', md: 'flex'}
    }
    const navLinkStyle = {
        d: 'flex',
        my: "6px",
        justifyContent:"center",
        alignItems: "center",
        textAlign:"center",
        color: '#f3f4f6',
        padding: '9px',
        rounded: "lg",
        fontSize: "md",
        w: "full",
        activeClassName: styles.active,
        onClick: onToggle
    }
    const navLinkLabelStyle = {
        ml: "10px",
        letterSpacing: "widest"
    }
    const logOutHandler = () => {
        dispatch(logOut());
        history.push("/");
    }
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onToggle();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef, isOpen]);
    return(
        <VStack ref={sidebarRef} as={motion.div} {...sidebarStyle} initial={{x: -800}} animate={{x:0}}>
            <Image src={logoWhite} w="80%" p={1} py={5} />
            {/* active_menu_link */}
            <Link as={NavLink} to="/backoffice/perfil" {...navLinkStyle}>                    
                <Icon as={FaIcons.FaUser} /> <Text {...navLinkLabelStyle}>Perfil</Text>
            </Link>
            { isAdmin?
            <>
                <Link as={NavLink} to="/backoffice/edit-home" {...navLinkStyle}>
                    <Icon as={FaIcons.FaHome} /> <Text {...navLinkLabelStyle}>Home</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/edit-organization" {...navLinkStyle}>
                    <Icon as={FaIcons.FaPeopleCarry} /> <Text {...navLinkLabelStyle}>Organizacion</Text>
                </Link> 
                <Link as={NavLink} to="/backoffice/activities" {...navLinkStyle}>
                    <Icon as={FaIcons.FaRunning} /> <Text {...navLinkLabelStyle}>Actividades</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/news" {...navLinkStyle}>
                    <Icon as={FaIcons.FaNewspaper} /> <Text {...navLinkLabelStyle}>Novedades</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/testimonials" {...navLinkStyle}>
                    <Icon as={FaIcons.FaCommentAlt} /> <Text {...navLinkLabelStyle}>Testimonios</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/contacts" {...navLinkStyle}>
                    <Icon as={FaIcons.FaPhone} /> <Text {...navLinkLabelStyle}>Contactos</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/users" {...navLinkStyle}>
                    <Icon as={FaIcons.FaHeart} /> <Text {...navLinkLabelStyle}>Usuarios</Text>
                </Link>
                <Link as={NavLink} to="/backoffice/categories" {...navLinkStyle}>
                    <Icon as={FaIcons.FaTags} /> <Text {...navLinkLabelStyle}>Categories</Text>
                </Link>
            </>
            : null
            }
            <Button colorScheme="red" {...navLinkStyle} onClick={logOutHandler} >
                <Icon as={FaIcons.FaPowerOff} /> <Text {...navLinkLabelStyle}>Cerrar Sesión</Text>
            </Button>
        </VStack>
    )
}

export default Sidebar;