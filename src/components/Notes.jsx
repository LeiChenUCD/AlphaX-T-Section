import { useEffect } from "react"
import { getNote } from "../util/util"
import { insertOneNote } from "../util/util"
import { insertNote } from "../util/util"
import { houses } from "../assets/households"
import React from "react"
import PrevNote from "./PrevNote"
// import style from '../index.css'

// append note to existing note record
async function submitNote(e, idx, lat, long, observation) {
    document.getElementById("submit").innerHTML = "Submitting..."
    // console.log("hi")
    await insertNote(idx, lat, long, observation)
    // console.log(res.data.record.record_id)
    // setId(res.data.record.record_id)
    document.getElementById("submit").innerHTML = "Submit"
}

// create a new node record
// async function submitOneNote(e, address, note, author) {
//     document.getElementById("submit").innerHTML = "Submitting..."
//     // const res = await insertOneNote(address, note, author)
//     await insertOneNote(address, note, author)
//     document.getElementById("submit").innerHTML = "Submit"
// }

function Notes(props) {
    const {selectedAddr, authorName, setSelectedAddr, setHouseEntry, setCenter, start, end } = props
    const hideClass = selectedAddr === "" ? "hide" : ""

    const [prevNotes, setPrevNotes] = React.useState([])
    function appendText(text) {
        document.getElementById("note").innerHTML = text
    }

    return <div style={{width: "600px", display: "flex", flexDirection: "column", marginTop: "10px"}}>

        
        <div style={{className: "top", height: "30px"}} className="centerText left bottom right top">
            {selectedAddr + 1} ({start + 1}-{end})
            </div>

        <div>
            {prevNotes.map((note, idx) => {
                return <PrevNote 
                key={idx} 
                time={note.fields.Time}
                author={note.fields.Author[0].text}
                note={note.fields.Notes[0].text}
                />
            })}
        </div>

        <div className="left right" style={{minHeight: "300px", outline: "0px solid transparent"}} contentEditable="true" id="note">
            
        </div>
        
        <div style={{display: "flex", direction: "rtl"}} className="left bottom right">
            <button 
            style={{display: "flex", alignSelf: "end", margin: "5px 10px"}} 
            className={`${hideClass}`} 
            onClick={async e => {
                e.preventDefault();
                document.getElementById("submit").innerHTML = "Submitting..."
                // if (authorName.trim() === "") {
                //     alert("please enter your name")
                //     return
                // }
                if (document.getElementById("note").innerHTML !== "") {
                    // setSelectedAddr(selectedAddr + 1)
                    const houseEntry = houses[selectedAddr + 1]
                    const obs = document.getElementById("note").innerHTML
                    document.getElementById("note").innerHTML = ""
                    await insertNote(selectedAddr, houses[selectedAddr][2], houses[selectedAddr][3], obs)
                    // await submitOneNote(e, selectedAddr, document.getElementById("note").innerHTML, authorName)
                    const newNote = {
                        fields: {
                            Address: [{
                                text: selectedAddr
                            }],
                            Author: [{
                                text: authorName
                            }],
                            Notes: [{
                                text: document.getElementById("note").innerHTML
                            }],
                            Time: Date.now()
                        }
                    }
                    // setPrevNotes([...prevNotes, newNote])
                    
                    setHouseEntry(houseEntry)
                    setCenter([houseEntry[2], houseEntry[3]])
                    setSelectedAddr(houseEntry[0])
                    document.getElementById("submit").innerHTML = "Submit"
                }
            }}
            // onClick={e => 
            // submitNote(e, id, selectedAddr, document.getElementById("note").innerHTML, setId)}
            id="submit"
            >Submit</button>
        </div>
        
        
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <button onClick={e => {appendText(e.target.innerHTML)}}>
                Yes 
            </button>
            <button onClick={e => {appendText(e.target.innerHTML)}}>
                Not Sure 
            </button>
            <button onClick={e => {appendText(e.target.innerHTML)}}>
                No 
            </button>
            <br></br>
        </div>
        

    </div>
}

export default Notes