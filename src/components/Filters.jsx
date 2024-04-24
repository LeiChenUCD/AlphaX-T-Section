function Filters(props) {
    const {setLotAreaLower, setLotAreaUpper, setAddrFilter, setSortMethod, setCurPage} = props
    const inputStyle = {
        width: "60px"
    }
    return <div style={{display: "flex", flexDirection: "column"}}>
        Address
        <input onInput={e => {
            setAddrFilter(e.target.value.trim())
            setCurPage(0)
        }}></input>
        AreaLotSF
        <div>
        <input style={inputStyle} onInput={e => {
            setLotAreaLower(e.target.value.trim() === "" ? 0 : parseInt(e.target.value))
            setCurPage(0)
            }}></input>
        ————
        <input style={inputStyle} onInput={e => {
            setLotAreaUpper(e.target.value.trim() === "" ? Number.MAX_SAFE_INTEGER : parseInt(e.target.value))
            setCurPage(0)
            }}></input>
        </div>
        Order By
        <select onChange={e => {
            setSortMethod(e.target.value)
            setCurPage(0)
            }}>
            <option>Default</option>
            <option>PropertyAddressFull (A-Z)</option>
            <option>PropertyAddressFull (Z-A)</option>
            <option>Smallest AreaLotSF</option>
            <option>Biggest AreaLotSF</option>
        </select>
    </div>
    // <div style={{width: "100px"}}></div>
}

export default Filters