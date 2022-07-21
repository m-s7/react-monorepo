import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import SimpleModal from 'Core/components/modals/simple-modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@ms7/ui'
import SimpleModalRB from 'Core/components/modals/simple-modal-rb'

const Modal = () => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)
    const [showRB, setShowRB] = useState(false)

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50 align-items-center">
                <div className="mb-1">
                    <Button
                        className="w-100"
                        onClick={() => { setShow(true) }}>
                        {t('modal.button.show-modal')}
                    </Button>
                </div>
                <div>
                    <Button
                        className="w-100"
                        onClick={() => { setShowRB(true) }}>
                        {t('modal.button.show-modal-rb')}
                    </Button>
                </div>
            </Card>
            <SimpleModal
                show={show}
                title="Modal Bootstrap"
                onHidden={() => { setShow(false) }}>
                {'🔥🍉🎪🏠⚽🎨☢🇵🇱'}
            </SimpleModal>
            <SimpleModalRB
                show={showRB}
                title="Modal React Bootstrap"
                onHidden={() => { setShowRB(false) }}>
                {'🧚🌌🍺🎢🏅🎇🚸🛠'}
            </SimpleModalRB>
        </div>
    )
}

export default Modal