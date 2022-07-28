import React from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface ModalProps extends React.PropsWithChildren {
    title?: string,
    show?: boolean,
    backdrop?: boolean | 'static',
    keyboard?: boolean,
    focus?: boolean,
    onHidden?: () => void,
}

export const SimpleModalRB = (props: ModalProps) => {
    const { t } = useTranslation()
    const { title = '', show = false, backdrop = true, keyboard = true, focus = true, onHidden, children } = props

    return (
        <Modal
            show={show}
            backdrop={backdrop}
            keyboard={keyboard}
            autoFocus={focus}
            onHide={onHidden}>
            <Modal.Header closeButton>
                <Modal.Title className="text-color-secondary">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">{children}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHidden}>
                    {t('common.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
