const apikey = '3265874a2c77ae4a04bb96236a642d2f';
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

/*========================== Function for getting the weather information from API ===========*/
async function getWeatherByLocation(place){
	const resp = await fetch(url(place), {origin: 'cors'});

	const respData = await resp.json();
	
	addWeatherToPage(respData);
}

/*============================== Function for displaying the weather information =============*/
function addWeatherToPage(data){
	const temp = KelvinToCelcius(data.main.temp);

	const weatherDiv = document.createElement('div');
	weatherDiv.classList.add('weatherElement');

	weatherDiv.innerHTML = `
			<h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}° C 
				<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
			<small>${data.weather[0].main}</small>
			<p>in ${data.name}</p>
		`;

	main.innerText = '';
	main.appendChild(weatherDiv);
}

/*============================== Function for converting Kelvin to Celcius ===================*/
function KelvinToCelcius(K){
	return (K - 273.15).toFixed(2);
}

/*============================ Event Listener for searching by Location ======================*/
form.addEventListener('submit', (e)=>{
	e.preventDefault();

	const place = search.value;
	search.value = '';
	search.blur();

	if(place){
		getWeatherByLocation(place);
	}
})