import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"

const SortIcon = ({
    up,
    down,
    value
}:{
    up: number,
    down: number,
    value: number,
}) => {
    return(
        <>
            {
                value == up ?
                <FaSortUp /> :
                value == down ?
                    <FaSortDown /> :
                    <FaSort />
            }
        </>
    )
}

export default SortIcon