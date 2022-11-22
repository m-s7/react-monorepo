import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Spinner } from './spinner'
import { CardCentered } from './card-centered'

interface ModalLoaderOverlayProps {
    show?: boolean,
    children?: React.ReactNode,
}

export const ModalOverlaySpinner = (props: ModalLoaderOverlayProps) => {
    const { t } = useTranslation()
    const { show = false, children = t('common.please-wait') } = props

    return (
        <Modal
            centered
            show={show}
            size="lg"
            animation={false}
            backdrop={true}
            keyboard={false}>
            <Modal.Body className="text-center background-darker h-50">
                <CardCentered>
                    <Spinner
                        size={150}
                        className="mb-2" />
                    <span>{children}</span>
                </CardCentered>
            </Modal.Body>
        </Modal>
    )
}
