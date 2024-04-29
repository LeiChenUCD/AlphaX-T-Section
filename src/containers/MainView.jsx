import React from "react";
import Filters from "../components/Filters";
import { houses } from "../assets/households"
import HouseHolds from "../components/Households";
import Notes from "../components/Notes";
import Map from "../components/Map";
import MandatoryFields from "../components/MandatoryFields";
// import { houses } from "../assets/households"

function MainView() {


    const urlId = new URLSearchParams(window.location.search).get('id') === null ? 0 : new URLSearchParams(window.location.search).get('id')
    const start = urlId * 100
    const end = Math.min(start + 100, houses.length)

    const curIdx = start

    const [LotAreaLower, setLotAreaLower] = React.useState(0)
    const [LotAreaUpper, setLotAreaUpper] = React.useState(Number.MAX_SAFE_INTEGER)
    const [addrFilter, setAddrFilter] = React.useState("")
    const [selectedAddr, setSelectedAddr] = React.useState(houses[curIdx][0])
    const [id, setId] = React.useState("")
    const [sortMethod, setSortMethod] = React.useState("Default")
    const [curPage, setCurPage] = React.useState(0)
    const [houseEntry, setHouseEntry] = React.useState(houses[curIdx])
    const [sortedSubset, setSortedSubset] = React.useState([]);
    // [lat, long]
    const [center, setCenter] = React.useState(houseEntry.length === 0 ? [37.32516216754616, -121.9282651794365] : [houseEntry[2], houseEntry[3]])
    const [authorName, setAuthorName] = React.useState("placeHolder")
    
    // console.log(authorName)
    return <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "30px"}}>
        {/* <div>
        
        <MandatoryFields
        setAuthorName={setAuthorName}
        />

        <Filters 
        setLotAreaLower={setLotAreaLower} 
        setLotAreaUpper={setLotAreaUpper} 
        setAddrFilter={setAddrFilter}
        setSortMethod={setSortMethod}
        setCurPage={setCurPage}
        />
        </div> */}

        <div style={{width: "10px"}}></div>

        <div>
        
        <div style={{display: "flex"}}>

        {/* <HouseHolds 
        curPage={curPage}
        setCurPage={setCurPage}
        LotAreaLower={LotAreaLower} 
        LotAreaUpper={LotAreaUpper} 
        addrFilter={addrFilter} 
        setSelectedAddr={setSelectedAddr}
        id={id}
        selectedAddr={selectedAddr}
        sortMethod={sortMethod}
        setHouseEntry={setHouseEntry}
        sortedSubset={sortedSubset}
        setSortedSubset={setSortedSubset}
        setCenter={setCenter}
        authorName={authorName}
        start={start}
        end={end}
        /> */}
        </div>

        <div style={{display: "flex", flexDirection: "column", paddingTop: "30px", alignItems: "center"}}>
        <h1>
            Is it a T-Section?
        </h1>
        <a href="https://patch.com/new-york/chelsea-ny/feng-shui-t-junction-good-or-bad" 
        target="_blank" 
        rel="noreferrer"
        style={{marginBottom: "10px", width: "100%"}}>
            What is a T-Section?
        </a>
        
        <a href="https://zhuanlan.zhihu.com/p/420633758#:~:text=%E8%B7%AF%E5%86%B2%E6%98%AF%E6%8C%87%E6%88%BF%E5%AD%90,%E5%86%B2%E7%85%9E%E7%9A%84%E9%A3%8E%E6%B0%B4%E7%85%9E%E3%80%82" 
        target="_blank" 
        rel="noreferrer"
        style={{marginBottom: "10px", width: "100%"}}>
            什么是路冲?
        </a>

        <Map houseEntry={houseEntry}
        sortedSubset={sortedSubset}
        center={center}
        setCenter={setCenter}
        setHouseEntry={setHouseEntry}
        setSelectedAddr={setSelectedAddr}
        />

        {selectedAddr === "" ? null : 
        <Notes selectedAddr={selectedAddr} 
        setSelectedAddr={setSelectedAddr}
        id={id} 
        setId={setId}
        authorName={authorName}
        setHouseEntry={setHouseEntry}
        setCenter={setCenter}
        start={start}
        end={end}
        />} 
        </div>
        </div>
    </div>
}

export default MainView;