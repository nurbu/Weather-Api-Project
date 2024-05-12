const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "9e1841364109c4af1729ece46b4a4c9f";

weatherform.addEventListener("submit", async event =>
{
    event.preventDefault();
    const city = cityinput.value; 

    if(city)
    {
        try {
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        } catch (error) {
            console.log(error);
            displayerror(error);
        }
    }
    else
    {
        displayerror("Please Enter a city");
    }
})

async function getweatherdata(city)
{
const apiurl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
const Response = await fetch(apiurl);
console.log(Response);
if(!Response.ok)
{
    throw new error("Could not fetch weather data");
}
return await Response.json();
}
function displayweatherinfo(data)
{console.log(data);
   const {city:{name}, list} = data;
   const[array1] = list;
   const {main:{temp,humidity}, weather:[{description,id}]} = array1
   card.textContent = "";
   card.style.display = "flex";

   const citydisplay = document.createElement("h1");
   const tempdisplay = document.createElement("p");
   const humiditydisplay = document.createElement("p");
   const descdisplay = document.createElement("p");
   const weatheremoji = document.createElement("p");

   citydisplay.textContent = name;
   citydisplay.classList.add("citydisplay");
   tempdisplay.textContent = `${((temp-273.15)*9/5+32).toFixed(1)}°F`;
   tempdisplay.classList.add("tempdisplay");
   humiditydisplay.textContent = `Humidity: ${humidity}`;
   humiditydisplay.classList.add("humditiydisplay");
   descdisplay.textContent = description;
    descdisplay.classList.add("descdisplay");
    weatheremoji.textContent = getweatheremoji(id);
    weatheremoji.classList.add("weatheremoji");
    
   card.appendChild(citydisplay);
   card.appendChild(tempdisplay);
   card.appendChild(humiditydisplay);
   card.appendChild(descdisplay);
   card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid)
{

    switch(true)
    {
        case(weatherid>=200 && weatherid<300):
        return "⛈️";
        case(weatherid>=300 && weatherid<400):
        return "🌧️";
        case(weatherid>=500 && weatherid<600):
        return "☔";
        case(weatherid>=600 && weatherid<700):
        return "❄️";
        case(weatherid>=700 && weatherid<800):
        return "🌫️";
        case(weatherid ===800):
        return "🌞";
        case(weatherid>=801 && weatherid<810):
        return "☁️";
        default:
            return "🤔"
    }
}
function displayerror(message)
{
const errordisplay = document.createElement("p");
errordisplay.textContent = message;
errordisplay.classList.add("errordisplay");

card.textContent = "";
card.style.display = "flex";
card.appendChild(errordisplay);
}