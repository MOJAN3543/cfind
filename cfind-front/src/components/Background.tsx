import styled from "styled-components";
import BackgroundImage from "../assets/images/background.jpg"

const Background = styled.section`
    background-image: url(${BackgroundImage});
    background-position: right top;
    height: 640px;
    padding: 0 128px;
    display: flex;
    align-items: center;
`

const SmallBackground = styled(Background)`
    background-position: right 6% top -100px;
    height: 360px;
`

export {Background, SmallBackground};