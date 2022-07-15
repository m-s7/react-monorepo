import React, { useLayoutEffect, useRef } from 'react'
import { Modal as BootstrapModal } from 'bootstrap'
import { useTranslation } from 'react-i18next'

interface ModalProps extends React.PropsWithChildren {
    title?: string,
    show?: boolean,
    backdrop?: boolean | 'static',
    keyboard?: boolean,
    focus?: boolean,
    onHidden?: () => void,
}

const SimpleModal = (props: ModalProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const { title = '', show = false, backdrop = true, keyboard = true, focus = true, onHidden, children } = props

    const modalHidden = () => {
        if(onHidden) onHidden()
    }

    useLayoutEffect(() => {
        const el = ref.current
        el?.addEventListener('hidden.bs.modal', modalHidden)

        if(show) showModal()
        else hideModal()

        return () => {
            el?.removeEventListener('hidden.bs.modal', modalHidden)
        }
    }, [props])

    const showModal = () => {
        const el = ref.current
        
        if(el) {
            const modal = new BootstrapModal(el, {
                backdrop,
                keyboard,
                focus,
            })
            modal.show()
        }
    }

    const hideModal = () => {
        const el = ref.current

        if(el) {
            const modal = BootstrapModal.getOrCreateInstance(el)
            modal.hide()
        }
    }

    return (
        <React.Fragment>
            <div
                ref={ref}
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLabel">
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                {t('common.close')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SimpleModal