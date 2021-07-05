import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react';

export default function HeaderNavToggle({ show, isMobile, toggleNav }) {
    const toggleStyle = {
        d: { base:'flex', lg: isMobile ? 'flex' : 'none'},
        size: '40px',
        p: show ? '10px' : '4px',
        radius: 'md'
    };

    return (
        <Button onClick={toggleNav} {...toggleStyle} >
            {show ? <CloseIcon boxSize='1.1em' /> : <HamburgerIcon boxSize='2em' />}
        </Button>
    );
}
