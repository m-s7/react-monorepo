import React from 'react'
import EBus from '@ms7/event-bus'
import { uniqueId } from 'lodash'
import { Button, Card } from '@ms7/bui'
import { useTranslation } from 'react-i18next'

const EventBus = () => {
    const { t } = useTranslation()
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="m-1 w-50">
                <div className="d-flex flex-column align-items-center mt-3">
                    <span>{t('event-bus.label.register')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => EBus.register('test-channel')}>
                        {t('event-bus.button.register')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('event-bus.label.subscribe')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            EBus.subscribe('test-channel', x => {
                                console.log('message received sub1', x)
                            })
                            EBus.subscribeOnce('test-channel', x => {
                                console.log('message received sub2', x)
                            })
                            EBus.subscribeTimes('test-channel', x => {
                                console.log('message received sub3', x)
                            }, 3)
                        }}>
                        {t('event-bus.button.subscribe')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('event-bus.label.dispatch')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => EBus.dispatch('test-channel', { 'uniqueId': uniqueId(), data: { message: 'hello' }})}>
                        {t('event-bus.button.dispatch')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('event-bus.label.unsubscribe')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            EBus.unsubscribe('test-channel')
                            EBus.unsubscribe('test-channel')
                            EBus.unsubscribe('test-channel')
                        }}>
                        {t('event-bus.button.unsubscribe')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('event-bus.label.unregister')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            EBus.unregister('test-channel')
                        }}>
                        {t('event-bus.button.unregister')}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default EventBus