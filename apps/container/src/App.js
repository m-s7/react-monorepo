import React from 'react';
import HelloReactApp from './components/HelloReactApp';
import { Route, Routes, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import HelloVueApp from './components/HelloVueApp';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const history = createBrowserHistory();

const Header = () => (
    <div>
        <Link to='/'>home</Link><br />
        <Link to='/react'>use react</Link><br />
        <Link to='/vue'>use vue</Link><br />
    </div >
)

export default () => {
    return (
        <div>
            <HistoryRouter history={history}>
                <Header />
                <hr />
                <Routes>
                    <Route path='/' element={<div>HOME</div>} />
                    <Route path='/vue' element={<HelloVueApp />} />
                    <Route path='/react' element={<HelloReactApp />} />
                </Routes>
            </HistoryRouter>
        </div>
    )
}