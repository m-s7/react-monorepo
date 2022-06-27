import React from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const HelloWorld = () => (<div>Hello World!</div>)
const HelloReact = () => (<div>Hello React!</div>)

export default ({ history }) => {
    return <div>
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/react" element={<HelloReact />} />
                <Route path="/world" element={<HelloWorld />} />
            </Routes>
            <br />
            <Link to='/react'>Say hello to React!</Link>
            <br />
            <Link to='/world'>Say hello to the World!</Link>
        </HistoryRouter>
    </div>
}