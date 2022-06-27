import { mount } from 'helloMap/MapApp'
import React, {useRef, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext } from "react-router-dom";

export default () => {
    const ref = useRef(null);
    const history = useNavigate();
    const navigation = useContext(UNSAFE_NavigationContext).navigator;

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current)
        navigation.listen(onParentNavigate({ pathname: navigation.location.pathname }))
    }, [])

    return <div ref={ref} />
}