import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import SimpleModal from 'Core/components/pages/index/modal/simple-modal'
import { useTranslation } from 'react-i18next'

const Modal = () => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default Modal