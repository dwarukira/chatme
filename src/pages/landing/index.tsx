import * as React from "react";
import { Background } from "../../components/background";
import styled from "styled-components";
import { Button } from "../../components/common";
import { ReactComponent as Item } from "../../icons/Group.svg";
import { ReactComponent as Item2 } from "../../icons/Group-1.svg";
import { ReactComponent as Item3 } from "../../icons/Group-2.svg";
import { ReactComponent as Item4 } from "../../icons/Group-3.svg";

import "./index.scss"

const LandingStyled = styled.div`
    height: 100%;

    div:first {
        height: 100%;
    }
    * {
        padding: 0;
        margin: 0;
    }

    display: grid;
    grid-template-columns: repeat(2,50%);
    


`

export const Landing = ({ onClick }) => {
    return (
        <div>
            <Background>
                <LandingStyled >
                    <div className="center">
                        <div className="">
                            <h3>Chat & Organize</h3>
                            <p>You don’t have to do everything today. Simply swipe your messages to snooze it for later and keep your inbox organized.</p>
                        </div>

                    </div>

                    <div className="items">

                        <div className="actions">
                            <Item />
                            <Item2 />
                            <Item3 />
                            <Item4 />



                        </div>

                        <div className="action">
                            <Button onClick={onClick}>
                                SIGN IN WITH GOOGLE
                                </Button>



                        </div>


                    </div>






                </LandingStyled>
            </Background>

        </div>
    )
}