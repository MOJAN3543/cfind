import styled from "styled-components";
import { Background } from "../../components/Background";
import { GoGoal } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { PiFlask } from "react-icons/pi";

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size.sm};
`

const BackgroundInfo = styled.article`
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: white;
    h1{
        font-weight: 800;
        font-size: 5rem;
    }
`

const MainSection = styled.section`
    max-width: 80vw;
    margin: 64px auto;
    display: flex;
    flex-direction: column;
    gap: 80px;
    & > *:nth-child(even){
        flex-direction: row-reverse;
    }
`

const DescriptionContainer = styled.section`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size.lg};
`

const SampleIamge = styled.article`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({theme}) => theme.size.lg};
    background-color: #EEE;
    border-radius: 48px;
    height: 320px;
`

const DescriptionWrapper = styled.article`
    display: flex;
    flex-direction: column;
    width: 50%;
    h1{
        font-size: ${({ theme }) => theme.fontSize.xxl};
        margin-bottom: ${({ theme }) => theme.size.sm};
    }
    p, li{
        line-height: ${({ theme }) => theme.size.base};
    }
    li{
        text-indent: ${({ theme }) => theme.size.sm};
    }
`

const Main = () => {
    return (
        <MainLayout>
            <Background>
                <BackgroundInfo>
                    <h1>
                        C-FIND
                    </h1>
                    <p>
                        Redefining the future of heart health and precision medicine.
                    </p>
                </BackgroundInfo>
            </Background>
            <MainSection>
                <DescriptionContainer>
                    <DescriptionWrapper>
                        <h1>
                            What is the C-FIND?
                        </h1>
                        <p>
                            <b>C-FIND</b> (Cardio-fibrosis Innovative Novel Drug Development) is a cutting-edge platform aimed at developing innovative therapies for <b>heart failure</b>. By integrating intelligent multi-omics analyses and advanced AI technologies, C-FIND targets <b>cardiac fibrosis</b>, a critical pathological driver of heart failure, to discover novel therapeutic candidates. This initiative is designed to accelerate the identification of key biomarkers and foster a deeper understanding of heart failure mechanisms. Through seamless collaboration with leading researchers, C-FIND is <b>redefining the future of heart health and precision medicine</b>.
                        </p>
                    </DescriptionWrapper>
                    <SampleIamge>
                        <IoIosSearch size="64" />
                    </SampleIamge>
                </DescriptionContainer>
                <DescriptionContainer>
                    <DescriptionWrapper>
                        <h1>
                            Our Goal
                        </h1>
                        <p>
                            Our goal is to <b>revolutionize heart failure treatment</b> by leveraging <b>multi-omics data</b> and <b>AI-driven insights</b> to develop personalized therapeutic strategies. C-FIND aims to establish a robust analysis pipeline, build a comprehensive database, and investigate the relationship between omics patterns and disease progression. Furthermore, we seek to create AI models for predicting disease outcomes and a user-friendly web-based platform for data visualization and exploration. These efforts are focused on <b>advancing the understanding of heart failure</b> and <b>supporting the development of effective, patient-specific treatments</b>.
                        </p>
                    </DescriptionWrapper>
                    <SampleIamge>
                        <GoGoal size="64" />
                    </SampleIamge>
                </DescriptionContainer>
                <DescriptionContainer>
                    <DescriptionWrapper>
                        <h1>
                            Our Projects
                        </h1>
                        <p>
                            C-FIND is built on several core research initiatives:
                        </p>
                        <li>
                            <b>Target Identification and Analysis</b>: Conducting systematic multi-omics and AI-based analyses to pinpoint critical drivers of cardiac fibrosis and heart failure.
                        </li>
                        <li>
                            <b>Therapeutic Candidate Development</b>: Discovering and evaluating promising new drug candidates based on identified targets.
                        </li>
                        <li>
                            <b>Precision Medicine Platform</b>: Establishing a platform to analyze patient-specific data, enabling the development of tailored treatment strategies.
                        </li>
                        <p>
                            By conducting these projects, C-FIND contributes to uncovering the underlying mechanisms of heart failure and advancing innovative therapies that improve patient outcomes.
                        </p>
                    </DescriptionWrapper>
                    <SampleIamge>
                        <PiFlask size="64" />
                    </SampleIamge>
                </DescriptionContainer>
            </MainSection>
        </MainLayout>
    )
}

export default Main;