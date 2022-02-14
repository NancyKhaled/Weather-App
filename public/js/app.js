
var form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    temperature()
})

let temperature = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?location=' + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            document.getElementById('error').innerText = data.error
            document.getElementById('forecast').innerText = ''
        } else {
            document.getElementById('forecast').innerText = data.forecast
            document.getElementById('error').innerText = ''
        }
    }
    catch(e) {
        console.log(e)
    }
}