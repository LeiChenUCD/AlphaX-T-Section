import React from "react";
function PageManager(props) {
    const {totalCount, startIdx, endIdx, setCurPage, curPage, setPageSize, pageNum} = props
    const [selectedSize, setSelectedSize] = React.useState(10); // Initial selected Size
    const [inputValue, setInputValue] = React.useState(curPage.toString()); // Store temporary input value

     // Update input value when curPage prop changes
    React.useEffect(() => {
        setInputValue(curPage.toString());
    }, [curPage]);

    // Event handler to update selected Size
    const handleSelectChange = (event) => {
        setSelectedSize(event.target.value);
    };

    return <div style={{minHeight: "30px", border: "1px solid black", borderBottom: "1px solid black", display: "flex", flexDirection: "row", alignItems: "center"}}>
        <div className="switch_page" onClick={e => setCurPage(curPage === 0 ? 0 : curPage - 1)}>
            &#8249;
        </div>
        <div className="switch_page" onClick={e => setCurPage(endIdx === totalCount ? curPage : curPage + 1)}>&#8250;</div>
        {startIdx + 1} - {endIdx} / {totalCount} 
        <div style={{width: "10px"}}></div>
        {/* <label for="dog-names">Choose a dog name:</label>  */}
        {/* <select onChange={e => {setPageSize(parseInt(e.target.value))
                                handleSelectChange(e)}} value={selectedSize}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
        </select> */}
        <div style={{width: "10px"}}></div>
        <input value={parseInt(inputValue) + 1} 
        onChange={(e) => setInputValue(e.target.value === "" ? -1 : e.target.value - 1)} 
        onBlur={(e) => {
            if (inputValue === -1) {
                setCurPage(0)
            } else {
                setCurPage(Math.min(parseInt(inputValue), pageNum - 1))
            }
            }} style={{border: "none", borderBottom: "1px solid black", width: "30px", textAlign: "center"}}></input>
        <div style={{width: "10px"}}></div>
        {/* <a href="https://z1wxnr4c1l.larksuite.com/base/ZJYxbUZW0ah85TssgMqupEZJsB8?table=tbla08osMELjTNKE&view=vewGBjICN6" target="_blank"
        rel="noreferrer"
        >
            Lark Table
        </a> */}
    </div>
} 

export default PageManager