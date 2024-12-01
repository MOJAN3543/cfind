import styled, { css } from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSet } from "../../hooks/useSet";
import { FilterContext } from "./FilterContext";
import { useSort } from "../../hooks/useSort";
import { useToggle } from "../../hooks/useToggle";
import { HiMinus, HiPlus } from "react-icons/hi";
import SortIcon from "../../components/SortIcon";

interface DataFilterProps {
    column: string;
    valueList: Array<string>;
    valueCount: Array<number>;
}

const DataFilterWrapper = styled.article<{ $iscollapse: string, $isexpand: string}>`
    display: flex;
    flex-direction: column;
    border: 1px solid #999999;
    border-radius: ${({ theme }) => theme.size.xxs};
    overflow: hidden;
    ${(props) => props.$isexpand == 'false' && css`
        &>*:nth-child(n+13):not(:last-child){
            height: 0;
            padding-top: 0;
            padding-bottom: 0;
            border: none;
            margin-top: 0;
            margin-bottom: 0;
            opacity: 0;
            pointer-events: none;
        }
    `}
    
    ${(props) => props.$iscollapse == 'true' && css`
        &>*:nth-child(n+2){
            height: 0;
            padding-top: 0;
            padding-bottom: 0;
            border: none;
            margin-top: 0;
            margin-bottom: 0;
            opacity: 0;
            pointer-events: none;
        }
    `}
`

const ExpandWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #999999;
    padding: ${({ theme }) => theme.size.xs};
    gap: ${({ theme }) => theme.size.xs};
    font-weight: 600;
    color: #0057D9;
    cursor: pointer;
`

const ColumnTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size.xs};
    padding: ${({ theme }) => theme.size.xs};
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    div{
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size.xs};
    }
`

const ColumnTitle = ({
    children
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <ColumnTitleWrapper>
            {children}
        </ColumnTitleWrapper>
    )
}


const ValueWrapper = styled.div`
    margin: ${({ theme }) => theme.size.xs};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size.xs};
    transition: 0.2s all ease;
    input{
        width: 16px;
        height: 16px;
    }
    label{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select: none;
    }
    p{
        flex-grow: 1;
        text-align: right;
    }
`

const ValueSortWrapper = styled(ValueWrapper)`
    display: flex;
    justify-content: space-between;
    margin: 0;
    border-bottom: 1px solid #AAA;
    padding: ${({ theme }) => theme.size.xxs};
    padding-left: calc(16px + ${({ theme }) => theme.size.sm});
    div{
        display: flex;
        font-weight: 600;
        padding: ${({ theme }) => theme.size.xs};
        border-radius: ${({ theme }) => theme.size.xs};
        gap: ${({ theme }) => theme.size.xxs};
        align-items: center;
        transition: 0.15s all ease-in-out;
        &:hover{
            cursor:pointer;
            background-color: #E2E2E2;
        }
    }
    div:last-child{
        justify-content: flex-end;
    }
`

interface ValueProps extends React.HTMLAttributes<HTMLInputElement> {
    id: string,
    value: string,
    count: number,
    percent: number,
}

const Value = ({
    id,
    value,
    count,
    percent,
    onChange
}: ValueProps) => {
    return (
        <ValueWrapper>
            <input type="checkbox" id={id + value} onChange={(e) => { onChange!(e); }} />
            <label htmlFor={id + value}>
                {value}
            </label>
            <p>
                {count} ({percent.toFixed(2)}%)
            </p>
        </ValueWrapper>
    )
}

type ValueCount = {
    value: string;
    count: number;
}

const DataFilter = ({
    column,
    valueList,
    valueCount,
}: DataFilterProps) => {

    const valueCountList: ValueCount[] = []
    valueList.forEach((value, index) => {
        valueCountList.push({ value, count: valueCount[index] })
    })

    const [filterList, sortFilterList] = useSort(valueCountList);

    const sortTable: ((a: ValueCount, b: ValueCount) => number)[] = [
        (a, b) => {
            return a.value > b.value ? 1 : -1;
        },
        (a, b) => {
            return a.value < b.value ? 1 : -1;
        },
        (a, b) => {
            return a.count - b.count;
        },
        (a, b) => {
            return b.count - a.count;
        }
    ]

    const [sortBy, setSortBy] = useState(3)
    const handleSortBy = (N: number) => {
        const handleTable: number[][] = [[1, 0, 0, 0], [3, 3, 3, 2]];
        setSortBy((sortBy) => { return handleTable[N][sortBy] });
    }

    useEffect(() => {
        sortFilterList(sortTable[sortBy]);
    }, [sortBy])

    const { setFilter } = useContext(FilterContext)!;
    const totalCount = valueCount.reduce((acc, cur) => acc + cur, 0);

    const [checkedSet, toggleSet] = useSet<string>();
    useEffect(() => {
        console.log(checkedSet);
        setFilter(column, checkedSet);
    }, [checkedSet])

    const [isCollapse, toggleCollapse] = useToggle(false);

    const [isExpand, toggleExpand] = useToggle(false);

    const ValueList = useMemo(() => {
        return (<>
            {filterList.map(({ value, count }) => {
                return (
                    <Value key={value} value={value} count={count} id={column} percent={count / totalCount * 100} onChange={() => { toggleSet(value) }}></Value>
                )
            })}
        </>)
    }, [filterList, sortBy])

    return (
        <DataFilterWrapper $iscollapse={isCollapse.toString()} $isexpand={isExpand.toString()}>
            <ColumnTitle>
                <div style={{ cursor: "pointer" }} onClick={() => { toggleCollapse() }}>
                    {isCollapse ?
                        <FaChevronDown /> :
                        <FaChevronUp />
                    }
                    {column}
                </div>
            </ColumnTitle>
            <ValueSortWrapper>
                <div onClick={() => { handleSortBy(0) }}>
                    Value
                    <SortIcon up={0} down={1} value={sortBy}/>
                </div>
                <div onClick={() => { handleSortBy(1) }}>
                    Count(%)
                    <SortIcon up={2} down={3} value={sortBy}/>
                </div>
            </ValueSortWrapper>
            {
                ValueList
            }
            {
                filterList.length > 10 &&
                <ExpandWrapper onClick={() => { toggleExpand() }}>
                    {
                        isExpand ?
                            <>
                                <HiMinus />
                                View Less
                            </> :
                            <>
                                <HiPlus />
                                View More ({filterList.length - 10} items)
                            </>
                    }
                </ExpandWrapper>
            }
        </DataFilterWrapper>
    )
}

export default DataFilter;