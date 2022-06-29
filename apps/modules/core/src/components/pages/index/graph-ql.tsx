import React from 'react'
import { Card } from '@ms7/bui'
import { useTranslation } from 'react-i18next'
import { useGetCarsQuery } from 'Core/api/rtk-car-api'

const GraphQL = () => {
    const { t } = useTranslation()

    const { data: cars, error, isLoading, isFetching, refetch } = useGetCarsQuery(undefined, { refetchOnMountOrArgChange: false, skip: false })

    const Cars = () => (
        <React.Fragment>
            {cars?.map(car => (<div key={car.id}>{`${car.brand} - ${car.model}`}</div>))}
        </React.Fragment>

    )

    return (
        <div className="d-flex flex-column">
            <Card className="m-1 w-50">
                <Cars />
            </Card>
        </div>
    )
}

export default GraphQL