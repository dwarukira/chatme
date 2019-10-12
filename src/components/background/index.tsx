import React from "react"

import landing from "./landing.svg"
import styled from "styled-components"

const BackgroundStyled = styled.div`
    position: relative;
    height: 100vh;
    padding: 0;
    margin: 0;
    background-image: url(${landing});
    background-repeat: no-repeat;
    background-size: cover;
`

interface BackgroundProps {
    children?: React.ReactNode
}

export const Background = ({ children }: BackgroundProps) => {
    return (
        <BackgroundStyled>
            { children }
        </BackgroundStyled>
    );
}