import styled from "styled-components";
import { GSMData } from "../../types";

const DataElementWrapper = styled.article`
    display: table-row;
    border: 1px solid #AAA;
    p{
        display: table-cell;
        font-size: ${({ theme }) => theme.fontSize.base};
        padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.xs};
        word-break: break-all;
    }
    :first-child{
        font-weight: 600;
    }
`


const DataElement = ({
    ...props
}: GSMData) => {
    return (
        <DataElementWrapper>
            {Object.entries(props).map(([_, value]) => {
                return (
                    <p key={value}>
                        {value}
                    </p>
                )
            })}
        </DataElementWrapper>
    )
}

export default DataElement;