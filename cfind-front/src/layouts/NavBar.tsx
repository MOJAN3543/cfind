import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";

const NavBarLayout = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    color: white;
    font-weight: bold;
`

const NavBarScrollStyle: React.CSSProperties = {
    color: theme.color.primary,
    backgroundColor: "#F0F0F0"
}

const NavBarWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 128px;
    width: 100%;
    margin: 0 auto;
    transition: 0.3s background-color ease-in-out;
    &:hover{
        background-color: #f0f0f0;
        color: ${({ theme }) => theme.color.primary};
    }
`

const LogoWrapper = styled(Link)`
    color: inherit;
    text-decoration: none;
    h1{
        font-size: ${({ theme }) => theme.fontSize.xxl};
        font-weight: 900;
    }
    p{
        font-size: ${({ theme }) => theme.fontSize.sm};
        font-weight: 300;
    }
`

const LinkWrapper = styled.div`
    display: flex;
    gap: 80px;
`

const NavLink = styled(Link)`
    height: 100%;
    color: inherit;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.lg};
    text-decoration: none;
    font-weight: 600;
    &:hover{
        transition: 0.2s ease-in-out;
        color: royalblue;
        /* font-weight: 700; */
    }
`

const NavBar = () => {
    const [position, setPosition] = useState(0);
    function onScroll() {
        setPosition(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    return (
        <NavBarLayout>
            <NavBarWrapper style={position > 0 ? NavBarScrollStyle : undefined}>
                <LogoWrapper to="/">
                    <h1>
                        C-FIND
                    </h1>
                    <p>
                        Cardio-fibrosis Innovative Novel Drug Development
                    </p>
                </LogoWrapper>
                <LinkWrapper>
                    <NavLink to='/'>
                        Main
                    </NavLink>
                    <NavLink to='/data'>
                        Data
                    </NavLink>
                    <NavLink to='/contact'>
                        Contact
                    </NavLink>
                </LinkWrapper>
            </NavBarWrapper>
        </NavBarLayout>
    )
}

export default NavBar;