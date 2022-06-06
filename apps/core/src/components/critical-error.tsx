import React from 'react'
import FatalError from '@/business/models/errors/fatal-error'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import { CardSmallCentered } from '@ms7/bui'

interface Props { error: FatalError, allowNavigation?: boolean }

const CriticalError = (props: Props) => (
    <LayoutEmpty>
        <CardSmallCentered>
            <h2>{`${props.error.name} - ${props.error.message}`}</h2>
            {props.allowNavigation &&
                <p>
                    <BaseLink
                        to='/'
                        text='Dashboard' />
                </p>
            }
        </CardSmallCentered>
    </LayoutEmpty>
)

export default CriticalError