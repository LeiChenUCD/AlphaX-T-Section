function PrevNote(props) {
    const {time, author, note} = props
    const splitter = "-"
    const showDayOfWeek = false
    
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    var minute = date.getMinutes()
    minute = minute < 10 ? "0" + minute : minute
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayOfWeek = days[date.getDay()]

    const dateStr = showDayOfWeek ? 
    `${year}${splitter}${month}${splitter}${day} (${dayOfWeek}) ${hour}:${minute}` 
    : `${year}${splitter}${month}${splitter}${day} ${hour}:${minute}`

    return <div style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
        {`[${dateStr}] ${author}: ${note}`}
    </div>
}

export default PrevNote