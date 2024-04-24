const endpoint = "http://localhost:3001/"
export function insertNote(idx, lat, long, observation) {
    // console.log(observation.trim() === "")
    if (observation === "loading...") return
    if (observation.trim() === "") return
    const obj = {
        // id,
        fields: {
            fields: {
                Idx: idx,
                Lat: String(lat),
                Long: String(long),
                Observation: observation + '\n'
            }
        }
    }
    const requestOptions = {
        // mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };
    // console.log(requestOptions.body)
    return fetch(endpoint + "insertNote", requestOptions)
    .then(res => res.json())
    .then(data => {return data})
    .catch((error) => {
        // alert(error);
        console.error("Error:", error);
      });
}

export function insertOneNote(address, note, author) {
    if (note === "loading...") return
    if (note.trim() === "") return
    if (author.trim() === "") {
        alert("please enter your name")
        return
    }
    const obj = {
        fields: {
            fields: {
                Address: address,
                Notes: note,
                Author: author,
                Time: Date.now()
            }
        }
    }
    const requestOptions = {
        // mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };
    // console.log(requestOptions.body)
    return fetch(endpoint + "insertOneNote", requestOptions)
    .then(res => res.json())
    .then(data => {return data})
    .catch((error) => {
        // alert(error);
        console.error("Error:", error);
      });
}

export function getNote(address) {
    const obj = {
        Address: address
    }
    const requestOptions = {
        // mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };
    // console.log(requestOptions.body)
    return fetch(endpoint + "getNote", requestOptions)
    .then(res => {
        // Check if the response is ok (status code 200)
        // console.log(res)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // Parse the JSON response and return it (returns a Promise)
        return res.json();
      })
    .then(res => {
        // console.log(res)
        return res})
    .catch((error) => {
        // alert(error);
        console.error("Error:", error);
      });
}

export function sortHouseHold(sortedData, sortMethod) {
    if (sortMethod === "PropertyAddressFull (A-Z)") {
        sortedData.sort((a, b) => {
            const addressA = a[0].toUpperCase();
            const addressB = b[0].toUpperCase();
            if (addressA < addressB) {
                return -1;
            }
            if (addressA > addressB) {
                return 1;
            }
            return 0;
        });
    } else if (sortMethod === "PropertyAddressFull (Z-A)") {
        sortedData.sort((a, b) => {
            const addressA = a[0].toUpperCase();
            const addressB = b[0].toUpperCase();
            if (addressA < addressB) {
                return 1;
            }
            if (addressA > addressB) {
                return -1;
            }
            return 0;
        });
    } else if (sortMethod === "Smallest AreaLotSF") {
        sortedData.sort((a, b) => {
            if (a[1] < b[1]) {
                return -1;
            }
            if (a[1] > b[1]) {
                return 1;
            }
            return 0;
        });
    } else if (sortMethod === "Biggest AreaLotSF") {
        sortedData.sort((a, b) => {
            if (a[1] < b[1]) {
                return 1;
            }
            if (a[1] > b[1]) {
                return -1;
            }
            return 0;
        });
    }
}

export function isBetween(num, boundA, boundB) {
    return (boundA >= num && boundB <= num) || (boundA <= num && boundB >= num)
}