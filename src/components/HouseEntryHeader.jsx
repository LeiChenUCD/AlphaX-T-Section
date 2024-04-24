function HouseEntryHeader() {
    return <div style={{minHeight: "30px", border: "1px solid black", display: "flex", flexDirection: "row"}}>
        <div style={{width: "300px", borderRight: "1px solid black", alignContent: "center", textAlign: "center"}}>PropertyAddressFull</div>
        <div style={{width: "100px", alignContent: "center", textAlign: "center"}}>AreaLotSF</div>
    </div>
}

export default HouseEntryHeader;