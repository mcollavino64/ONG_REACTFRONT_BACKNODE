import { Flex, Box } from '@chakra-ui/layout';
import React from 'react';
import DotLoader from 'react-spinners/DotLoader';
import ReactDOM from 'react-dom';

const backgroundStyle = {
    h: "100%",
    pos: "fixed",
    bgColor: "rgba(0, 0, 0, 0.4)",
    justify: "center",
    align: "center",
    zIndex: "100",
    top: "0", right: "0", bottom: "0", left: "0",
    boxSizing: "border-box"
}
const loaderStyle = {
    display: 'block',
    margin: '0',
    width: '100px',
    height: '100px'
}

export default function Loader({isLoading}) {
    if(!isLoading)
        return null;
    return ReactDOM.createPortal(
        <Flex {...backgroundStyle}>
           <Box d="inline-block" m="0">
                <DotLoader color="#9ac9fb" size={90} css={loaderStyle}/>
            </Box>
        </Flex>
        , document.getElementById('root'));
}
