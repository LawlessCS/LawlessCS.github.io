window.onload = setup;

function setup() {
	let crops = createCrops();

	let numSeasons = 3;

	for (let i = 0; i < numSeasons; i++) {
		let tableID = i == 0 ? "SpringStd" : i == 1 ? "SummerStd" : "FallStd";
		let table = document.getElementById(tableID);

		for (let j = 0; j < crops[i * 2].length; j++) {
			let newTR = document.createElement("tr");

			let newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].name;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].price;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].growTime;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].sellPrice;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].profitPerSell;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].profitPerDay;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].harvestsPerMonth;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2][j].profitPerMonth;
			newTR.appendChild(newTD);

			table.children[1].appendChild(newTR);
		}
	}

	for (let i = 3; i < numSeasons + 3; i++) {
		//debugger;
		let tableID = i == 3 ? "SpringReg" : i == 4 ? "SummerReg" : "FallReg";
		let table = document.getElementById(tableID);

		for (let j = 0; j < crops[i * 2 - 5].length; j++) {
			let newTR = document.createElement("tr");

			let newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].name;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].price;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].growTime;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].regrowTime;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].sellPrice;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].breakEven;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].seasons;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].harvestsPerMonth;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].growTimePerMonth;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].maxProfitPerDay;
			newTR.appendChild(newTD);

			newTD = document.createElement("td");
			newTD.innerText = crops[i * 2 - 5][j].maxProfitPerMonth;
			newTR.appendChild(newTD);

			table.children[1].appendChild(newTR);
		}
	}
}
