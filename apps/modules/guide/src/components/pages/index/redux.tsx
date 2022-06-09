import React from 'react'
import { useAppSelector } from 'Guide/hooks/use-app-selector'
import { useAppDispatch } from 'Guide/hooks/use-app-dispatch'
import { setId, setDescription, setName, setType, setAge } from 'Guide/store/reducers/person-reducer'
import { Button } from '@ms7/bui'

const Redux = () => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.guidePerson.id)
    const description = useAppSelector(state => state.guidePerson.description)
    const { name, type, age } = useAppSelector(state => state.guidePerson.data)

    return (
        <React.Fragment>
            <h5>{'Redux Example'}</h5>
            <div className="d-flex flex-row p-3">
                <div className="w-50">
                    <p>Person State:</p>
                    <ul>
                        <li>{`id: ${id}`}</li>
                        <li>{`age: ${age}`}</li>
                        <li>{`name: ${name}`}</li>
                        <li>{`type: ${type}`}</li>
                        <li>{`desc: ${description}`}</li>
                    </ul>
                    <p>
                        <Button
                            className="d-block m-1"
                            onClick={() => dispatch(setId(Math.floor(Math.random() * (100 - 1 + 1)) + 1))}>
                            {'change id'}
                        </Button>
                        <Button
                            className="d-block m-1"
                            onClick={() => dispatch(setAge((age + 1)))}>
                            {'increment age'}
                        </Button>
                        <Button
                            className="d-block m-1"
                            onClick={() => dispatch(setName((name === 'Mark' ? 'Claudia' : 'Mark')))}>
                            {'switch name'}
                        </Button>
                        <Button
                            className="d-block m-1"
                            onClick={() => dispatch(setType(type === 'man' ? 'woman' : 'man'))}>
                            {'switch type'}
                        </Button>
                        <Button
                            className="d-block m-1"
                            onClick={() => dispatch(setDescription((Math.random() + 1).toString(36).substring(7)))}>
                            {'change description'}
                        </Button>
                    </p>
                </div>
                <div>
                    COUNTER EXAMPLE
                </div>
            </div>
        </React.Fragment>
    )
}

export default Redux