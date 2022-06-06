import React from 'react'
import FatalError from '@/business/models/errors/fatal-error'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import CardCenterSmall from '@/components/ui/card/card-center-small'

interface Props { error: FatalError, allowNavigation?: boolean }

const CriticalError = (props: Props) => (
    <LayoutEmpty>
        <CardCenterSmall>
            <h2>{`${props.error.name} - ${props.error.message}`}</h2>
            {props.allowNavigation &&
                <p>
                    <BaseLink
                        to='/'
                        text='Dashboard' />
                </p>
            }
        </CardCenterSmall>
    </LayoutEmpty>
)

export default CriticalError