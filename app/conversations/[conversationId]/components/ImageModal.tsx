'use client';

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    if (!src) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Image 
                alt="Image"
                className="w-full h-auto"
                width='1080'
                height='0'
                src={src}
            />
        </Modal>
    );
}
 
export default ImageModal;