import React from 'react'

interface Props { name: string, age: number, isAlive: boolean }

const TestProps = (props: Props) => (
    <div>{`Data: ${props.name} - ${props.name} - ${props.isAlive}`}</div>
)

export default TestProps