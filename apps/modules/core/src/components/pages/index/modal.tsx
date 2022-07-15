import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import SimpleModal from 'Core/components/modals/simple-modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@ms7/bui'

const Modal = () => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)

    return (
        <div className="d-flex flex-row m-1">
            <Card className="w-25">
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