console.log("Post Man Clone");

// Getting url
let url = document.getElementById("url")

// Show and Hide Content Type Div
let contentTypeDiv = document.getElementById("contentTypeDiv")
contentTypeDiv.style.display = "none"

let postRadio = document.getElementById("postRadio")
postRadio.addEventListener("click", () => {
    contentTypeDiv.style.display = "block"
    dataShowingArea.innerHTML = ""
    dataShowingArea.removeAttribute("rows")

    let submitBtn = document.getElementById("submitBtn")
    submitBtn.innerText = "Post Data"

})

let getRadio = document.getElementById("getRadio")
getRadio.addEventListener("click", () => {
    contentTypeDiv.style.display = "none"
    dataShowingArea.innerHTML = ""
    dataShowingArea.removeAttribute("rows")

    let submitBtn = document.getElementById("submitBtn")
    submitBtn.innerText = "Get Data"
})

// Show and Hide json and custom parameter division

let parameterResponceDiv = document.getElementById("parameterResponceDiv")
parameterResponceDiv.style.display = "none";

let jsonResponceDiv = document.getElementById("jsonResponceDiv")
jsonResponceDiv.style.display = "none"

let jsonRadio = document.getElementById("jsonRadio")
let customParametersRadio = document.getElementById("customParametersRadio")

jsonRadio.addEventListener("click", () => {
    jsonResponceDiv.style.display = "block"
    parameterResponceDiv.style.display = "none";
})

customParametersRadio.addEventListener("click", () => {
    parameterResponceDiv.style.display = "block";
    jsonResponceDiv.style.display = "none";
})


// Add and Deleting Parameter Div

let addParameterResponceDivBtn = document.getElementById("addParameterResponceDivBtn")
addParameterResponceDivBtn.addEventListener("click", addParamsDiv)

let str;
let n = 2

function addParamsDiv() {
    showDiv()
    n++
}

function showDiv() {

    str = `<div class="row mb-3" id="${n}">
                    <h6>Parameter</h6>
                    <div class="col">
                        <input type="text" class="form-control keys" placeholder="Enter Parameter Key"
                            aria-label="First name" id="key${n}">
                    </div>
                    <div class="col" style="display: inline;">
                        <input type="text" class="form-control values" placeholder="Enter Parameter Value"
                            aria-label="Last name" id="value${n}">
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger" onClick="removeRow(${n})" id="removeParameterResponceDiv">-</button>
                    </div>
                </div>`

    let addDiv = document.createElement("div")
    addDiv.innerHTML = str
    let divToEnterNewRow = document.getElementById("divToEnterNewRow")
    divToEnterNewRow.appendChild(addDiv)
}

function removeRow(id) {
    let rowdiv = document.getElementById(`${id}`)
    rowdiv.parentElement.remove()
}

let myObj;

let dataShowBtn = document.getElementById("dataShowBtn")
dataShowBtn.addEventListener("click", () => {
    myObj = {}

    let allKeys = document.getElementsByClassName("keys")
    let allValues = document.getElementsByClassName("values")

    for (let index = 0; index < allKeys.length; index++) {
        const key = allKeys[index];
        const value = allValues[index]

        let ValueOfKey = key.value
        let ValueofValue = value.value
        console.log(key.value, value.value);

        myObj[ValueOfKey] = ValueofValue
    }

    console.log(myObj);

    let dataShowingArea = document.getElementById("dataShowingArea")
    dataShowingArea.setAttribute("rows", `${Object.keys(myObj).length}`)
    dataShowingArea.innerHTML = ""

    for (const key in myObj) {
        if (Object.hasOwnProperty.call(myObj, key)) {
            dataShowingArea.innerHTML += `${key} : ${myObj[key]}\n`
        }
    }
})

let submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", () => {
    if (getRadio.checked) {
        dataShowingArea.setAttribute("rows", "10")
        fetch(url.value)
            .then(responce => responce.text())
            .then(data => dataShowingArea.innerHTML = data)
    }
    if (postRadio.checked) {
        if (customParametersRadio.checked) {
            console.log("Cus");
            postData(JSON.stringify(myObj))
        }

        if (jsonRadio.checked) {
            let jsonResponce = document.getElementById("jsonResponce")
            postData(jsonResponce.value)
        }
    }
})

function postData(dataInBody) {
    fetch(url.value, {
        method: 'POST',         // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: dataInBody        //JSON.stringify(myObj),/jsonResponce.value
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dataShowingArea.innerHTML = ""
            let alert = document.getElementById("alert")
            alert.innerHTML =   `<div class="alert alert-success d-flex align-items-center" role="alert">
                                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                                        <use xlink:href="#check-circle-fill" />
                                    </svg>
                                    <div>
                                        An example success alert with an icon
                                    </div>
                                </div>`
            setTimeout(() => {
                window.location.reload()
            }, 2000);

        }).catch(() => {
            console.log("error");
            let alert = document.getElementById("alert")
            alert.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
                                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                        <use xlink:href="#exclamation-triangle-fill" />
                                    </svg>
                                    <div>
                                        Some Error Occurs. Please Check Your URL and Data
                                    </div>
                                </div>`
            // alert("Some Error Occurs")
        })
}