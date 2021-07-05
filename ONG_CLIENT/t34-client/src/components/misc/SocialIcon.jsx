/*
  Circular social icons with hover, tooltip and click effect

  <SocialIcon />

  Props:
    icon: string - icon to display ("facebook", "email", "phone", "instagram", "twitter")
    link: string - full link to open on click as new tab
    tooltipText: optional string - text to display as tooltip
*/

import * as React from 'react';
import { Icon, Tooltip } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaPhone, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import PropTypes from 'prop-types';

const socialIconStyle = {
  cursor: 'pointer',
  boxSize: 7,
  bg: 'gray.800',
  box: 'black',
  _hover: {
    opacity: '70%',
  },
  transitionDuration: '500ms',
  transitionProperty: 'all',
  color: 'gray.100',
  p: 1,
  borderRadius: 'full',
};

function SocialIcon({ icon, link, tooltipText }) {
  let iconComponent;

  switch (icon) {
    case 'facebook':
      iconComponent = FaFacebookF;
      break;
    case 'twitter':
      iconComponent = FaTwitter;
      break;
    case 'email':
      iconComponent = HiOutlineMail;
      break;
    case 'phone':
      iconComponent = FaPhone;
      break;
    case 'instagram':
      iconComponent = FaInstagram;
      break;
    default:
      iconComponent = FaPhone;
  }

  const handleClick = () => {
    if (link) window.open(link, '_blank');
  };

  return (
    <Tooltip label={tooltipText} fontSize='md'>
      <span>
        <Icon as={iconComponent} {...socialIconStyle} onClick={handleClick} />
      </span>
    </Tooltip>
  );
}

SocialIcon.defaultProps = {
  link: "",
  tooltipText: "",
}

SocialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
  tooltipText: PropTypes.string,
}

export default SocialIcon;