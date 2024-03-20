window.addEventListener(
	'load', 
	() => {
		document.getElementById("search-button").addEventListener("click", lookup);
		document.getElementById('remove-Api-key').addEventListener("click", 
			()=> localStorage.removeItem('apiKey'));
	}, false);
	

async function lookup() {
	if (!localStorage.getItem("apiKey")) {
		let key = prompt("Add your hypixel api key");
		if(confirm("Save key for all future api calls?")) localStorage.setItem('apiKey', key);
	}
	const searchValue = document.getElementById('searchbar').value;
	if (searchValue == '') return alert("Add a name maybe???");
	const stats = await(await fetch(`https://api.hypixel.net/v2/player?name=${searchValue}`, { method: "GET", headers: {
        "API-Key": localStorage.getItem("apiKey"),
      },},
 	)).json();
 	if (!stats.success) return alert("Hypixel API call did not suceed");
 	console.log(stats.player)
 	let walls = stats?.player?.stats?.Walls;
 	if (!walls) walls = {};
 	const { kills, wins, assists, losses, deaths } = walls;
 	const new_elem = `
 		<div class="stats">
 			Wins: ${wins || 0}<br>
 			Kills: ${kills || 0}<br>
 			Assists: ${assists || 0}<br>
 			Losses: ${losses || 0}<br>
 			Deaths: ${deaths || 0}<br>
 			K/D: ${Math.round((kills || 0)/(deaths || 0)*100)/100}<br>
 			W/L: ${Math.round((wins || 0)/(losses || 0)*100)/100}
 		</div>
 	`
 	document.getElementById("results").innerHTML = new_elem;
}
