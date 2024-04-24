import React from "react"
import { houses } from "../assets/households"
import HouseEntry from "./HouseEntry"
import HouseEntryHeader from "./HouseEntryHeader"
import PageManager from "./PageManager"
import { sortHouseHold } from "../util/util"

function HouseHolds(props) {

    const {LotAreaLower, LotAreaUpper, addrFilter, setSelectedAddr, id, selectedAddr, sortMethod, curPage, setCurPage, setHouseEntry, sortedSubset, setSortedSubset, setCenter, authorName, start, end} = props
    const [pageSize, setPageSize] = React.useState(10)
    const [filteredSubset, setFilteredSubset] = React.useState([]);
    // console.log(houses)
    // Filter the houses based on LotAreaLower, LotAreaUpper, and addrFilter
    
    

    React.useEffect(() => {
        let filteredData = houses.slice(start, end)
            // .filter(house => house[1] >= LotAreaLower)
            // .filter(house => house[1] <= LotAreaUpper);
            
        if (addrFilter !== "") {
            filteredData = filteredData.filter(house => house[0].toLowerCase().includes(addrFilter.toLowerCase()));
        }
        
        setFilteredSubset(filteredData);
    }, [LotAreaLower, LotAreaUpper, addrFilter]);

    // Sort the filteredSubset based on sortMethod
    React.useEffect(() => {
        let sortedData = [...filteredSubset]; // Create a copy of filteredSubset

        sortHouseHold(sortedData, sortMethod)

        setSortedSubset(sortedData);
    }, [filteredSubset, sortMethod, setSortedSubset]);

    

    // data that is current displaying
    const startIdx = curPage * pageSize;
    const endIdx = Math.min(startIdx + pageSize, sortedSubset.length);
    const display = sortedSubset.slice(curPage * pageSize, endIdx)

    const pageNum = Math.ceil(sortedSubset.length / pageSize)

    return <div>
        <PageManager 
        totalCount={sortedSubset.length} 
        startIdx={startIdx} 
        endIdx={endIdx}
        setCurPage={setCurPage}
        curPage={curPage}
        setPageSize={setPageSize}
        pageNum={pageNum}
        />
        {/* <HouseEntryHeader/> */}
        {display.map((house, idx) => 
        <HouseEntry key={idx} 
        setHouseEntry={setHouseEntry}
        houseEntry = {house} 
        setSelectedAddr={setSelectedAddr} 
        selectedAddr={selectedAddr}
        id={id}
        setCenter={setCenter}
        authorName={authorName}
        />
        )}
    </div>
}

export default HouseHolds