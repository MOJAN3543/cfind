import styled from "styled-components";
import { SmallBackground } from "../../components/Background";
import DataFilter from "./DataFilter";
import { FilterContext } from "./FilterContext";
import { useContext, useEffect, useState } from "react";
import DataElement from "./DataElement";
import { tableData } from "../../../table";
import { useSort } from "../../hooks/useSort";
import SortIcon from "../../components/SortIcon";
import { GSMData } from "../../types";

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
        font-size: ${({ theme }) => theme.fontSize.xxxl};
    }
`

const DataLayout = styled.section`
    max-width: 95vw;
    margin: 64px auto;
    display: flex;
    gap: ${({ theme }) => theme.size.base};
`

const FilterSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size.sm};
    height: 100%;
    width: ${({theme}) => theme.size.xxxxl};
    h1{
        font-size: ${({theme}) => theme.fontSize.lg};
    }
`

const DataSection = styled.section`
    flex-grow: 1;
    height: 100%;
    display: table;
    border-collapse: collapse;
    &>*:nth-child(even){
        background-color: #EEEEEE;
    }
`

const DataHeader = styled.section`
    display: table-row;
    border: 1px solid #AAA;
    border-bottom: 4px solid #AAA;
    div{
        display: table-cell;
        font-size: ${({ theme }) => theme.fontSize.md};
        font-weight: 700;
        padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.xs};
        word-break: break-all;
        &:hover{
            cursor:pointer;
            background-color: #E2E2E2;
        }
        svg{
            padding-left: ${({theme}) => theme.size.xs};
            padding-top: ${({theme}) => theme.size.xxs};
        }
    }
`

type DataFilterType = {
    column: string;
    valueList: Array<string>;
    valueCount: Array<number>;
}

const Data = () => {
    const { filter } = useContext(FilterContext)!;

    const [DataList, sortDataList, setDataList] = useSort(tableData);

    const OriginalData = tableData;

    useEffect(() => {
        const filterList = Object.entries(filter).filter(([_, value]) => value.size > 0);
        const filterObj = Object.fromEntries(filterList);
        const filteredList = OriginalData.filter(Data => {
            return Object.keys(filterObj).every(key => {
                return filterObj[key].has(Data[key]);
            })
        })
        setDataList([...filteredList])
    }, [filter]);

    const DataFilterGroup:{
        [key: string]: DataFilterType
    } = {};

    Object.entries(tableData[0]).forEach(([key, _]) => {
        DataFilterGroup[key] = {
            column: key,
            valueList: [],
            valueCount: []
        }
    })
    tableData.forEach((table) => {
        Object.entries(table).forEach(([key, value]) => {
            const index = DataFilterGroup[key].valueList.indexOf(value);
            if(index == -1){
                DataFilterGroup[key].valueList.push(value);
                DataFilterGroup[key].valueCount.push(1);
            }
            else{
                DataFilterGroup[key].valueCount[index]++;
            }
        })
    })

    delete DataFilterGroup["GSE_ID"]
    delete DataFilterGroup["GSM_ID"]

    const [sortBy, setSortBy] = useState(0);
    const sortList = ["GSM ID", "GSE ID", "Disease", "Tissue", "Genotype", "Replicate Number", "age", "species"]
    const compareFuncList: ((a: GSMData, b: GSMData) => number)[] = [
        (a, b) => a.GSM_ID > b.GSM_ID ? 1 : -1,
        (a, b) => a.GSM_ID < b.GSM_ID ? 1 : -1,
        (a, b) => a.GSE_ID > b.GSE_ID ? 1 : -1,
        (a, b) => a.GSE_ID < b.GSE_ID ? 1 : -1,
        (a, b) => a.disease > b.disease ? 1 : -1,
        (a, b) => a.disease < b.disease ? 1 : -1,
        (a, b) => a.tissue > b.tissue ? 1 : -1,
        (a, b) => a.tissue < b.tissue ? 1 : -1,
        (a, b) => a.genotype > b.genotype ? 1 : -1,
        (a, b) => a.genotype < b.genotype ? 1 : -1,
        (a, b) => a.replicate_num > b.replicate_num ? 1 : -1,
        (a, b) => a.replicate_num < b.replicate_num ? 1 : -1,
        (a, b) => a.age > b.age ? 1 : -1,
        (a, b) => a.age < b.age ? 1 : -1,
        (a, b) => a.species > b.species ? 1 : -1,
        (a, b) => a.species < b.species ? 1 : -1
    ]

    useEffect(() => {
        sortDataList(compareFuncList[sortBy]);
    }, [sortBy])

    return (
        <>
            <SmallBackground>
                <BackgroundInfo>
                    <h1>
                        Data
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </BackgroundInfo>
            </SmallBackground>
            <DataLayout>
                    <FilterSection> 
                        <h1>
                            Filter
                        </h1>
                        {Object.entries(DataFilterGroup).map(([_, value]) => {
                            return(
                                <DataFilter key={value.column} {...value} />
                            )
                        })}
                    </FilterSection>
                <DataSection>
                    <DataHeader>
                        {sortList.map((value, index) => {
                            return(
                                <div onClick={() => {setSortBy(index*2+((sortBy==index*2)?1:0))}}>
                                    {value}
                                    <SortIcon up={index*2} down={index*2+1} value={sortBy} />
                                </div>
                            )
                        })}
                    </DataHeader>
                    {DataList.map((table) => {
                        return(
                            <DataElement key={table.GSM_ID} {...table} />
                        )
                    })}
                </DataSection>
            </DataLayout>
        </>
    )
}

export default Data;