import React from 'react'
import { ModalOverlay } from '@chakra-ui/modal';
import { Modal, ModalCloseButton } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/modal';
import { ModalHeader } from '@chakra-ui/modal';
import { ModalBody } from '@chakra-ui/modal';

export default function ModalWrapper({ label, isOpen, onClose, children }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" as="ins" fontSize={{ base: "xl", md: "1xl", lg: "3xl" }}>{label}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={5}>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}