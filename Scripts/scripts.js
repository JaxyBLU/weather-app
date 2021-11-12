const apikey = '3265874a2c77ae4a04bb96236a642d2f';
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

/*========================== Function for getting the weather information from API ===========*/
async function getWeatherByLocation(location){
	const resp = await fetch(url(location), {origin: 'cors'});

	const respData = await resp.json();

	addWeatherToPage(respData);
}

/*============================== Function for displaying the weather information =============*/
function addWeatherToPage(data){
	const temp = KelvinToCelcius(data.main.temp);

	const weatherDiv = document.createElement('div');
	weatherDiv.classList.add('weatherElement');

	weatherDiv.innerHTML = `
			<small>There is</small>
			<h2>${temp}</h2>
			<p>in ${location}</p>
		`;
	document.body.appendChild(weatherDiv);
}

/*============================== Function for converting Kelvin to Celcius ===================*/
function KelvinToCelcius(K){
	return (K - 273.15).toFixed(2);
}


getWeatherByLocation('Dubai');