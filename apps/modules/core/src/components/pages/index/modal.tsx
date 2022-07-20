import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import SimpleModal from 'Core/components/modals/simple-modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@ms7/ui'

const Modal = () => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-25 align-items-center">
                <Button
                    onClick={() => { setShow(true) }}>
                    {t('modal.button.show-modal')}
                </Button>
                <SimpleModal
                    show={show}
                    title={'Modal'}
                    onHidden={() => { setShow(false) }}>
                    {'🔥🍉🎪🏠⚽🎨☢🇵🇱'}
                </SimpleModal>
            </Card>
        </div>
    )
}

export default Modal