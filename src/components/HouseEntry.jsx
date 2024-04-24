import { insertOneNote } from "../util/util"
function HouseEntry(props) {
    const {houseEntry, setSelectedAddr, selectedAddr, setHouseEntry, setCenter, authorName} = props
    return <div className="bottom right left" style={{minHeight: "30px", display: "flex", flexDirection: "row"}}>
        
        <div style={{width: "100%", alignContent: "center", textAlign: "center"}}
        onClick={e => {
            // if (authorName.trim() === "" && 
            // document.getElementById("note") !== null && 
            // document.getElementById("note").innerHTML.trim() !== "" && 
            // document.getElementById("note").innerHTML.trim() !== "loading...") {
            //     alert("please enter your name")
            //     return
            // }
            
            setHouseEntry(houseEntry)
            setCenter([houseEntry[2], houseEntry[3]])
            setSelectedAddr(houseEntry[0])
            
            if (document.getElementById("note") === null) return
            // insertNote(id, selectedAddr, document.getElementById("note").innerHTML)
            insertOneNote(selectedAddr, document.getElementById("note").innerHTML, authorName)
            document.getElementById("note").innerHTML = ""
        }}>{houseEntry[0] + 1}</div>

        {/* <div style={{width: "100px", alignContent: "center", textAlign: "center"}}>{houseEntry[1]}</div> */}
        
    </div>
}
export default HouseEntry