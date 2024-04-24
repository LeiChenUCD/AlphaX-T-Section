function MandatoryFields(props) {
    const {setAuthorName} = props

    return <div style={{display: "flex", flexDirection: "column"}} 
    onInput={e => setAuthorName(e.target.value)}>
        Name
        <input placeholder={"Please enter your name here"}></input>
    </div>
}

export default MandatoryFields;