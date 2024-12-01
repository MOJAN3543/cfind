import styled from "styled-components";
import { SmallBackground } from "../../components/Background";

const BackgroundInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 48px;
    width: 100%;
    gap: 8px;
    color: white;
    h1{
        font-size: ${({theme}) => theme.fontSize.xxxl};
    }
`

const Contact = () => {
    return (
        <>
            <SmallBackground>
                <BackgroundInfo>
                    <h1>
                        Contact
                    </h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </BackgroundInfo>
            </SmallBackground>
            Contact
        </>
    )
}

export default Contact;