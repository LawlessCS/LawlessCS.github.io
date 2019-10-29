class StandardCrop {
	constructor(name, price, growTime, sellPrice) {
		this.name = name;
		this.price = price;
		this.growTime = growTime;
		this.sellPrice = sellPrice;

		this.profitPerSell = this.sellPrice - this.price;
		this.profitPerDay = Math.round(this.profitPerSell / this.growTime * 100) / 100;

		this.harvestsPerMonth = Math.floor(27 / this.growTime);
		this.profitPerMonth = this.harvestsPerMonth * this.profitPerSell;
	}
}

class RegrowCrop {
	constructor(name, price, growTime, regrowTime, sellPrice, seasons) {
		this.name = name;
		this.price = price;
		this.growTime = growTime;
		this.sellPrice = sellPrice;
    this.regrowTime = regrowTime;
    
    this.breakEven = Math.round((this.price / this.sellPrice) * 100) / 100;

    this.seasons = seasons;

    this.daysInSeasons = (27 * this.seasons) - (1 - this.seasons);

    this.harvestsPerMonth = Math.floor((this.daysInSeasons - this.growTime + this.regrowTime) / this.regrowTime);
    this.growTimePerMonth = ((this.harvestsPerMonth - 1) * this.regrowTime) + this.growTime;
    this.maxProfitPerDay = Math.round((((this.harvestsPerMonth * this.sellPrice) - this.price) / this.growTimePerMonth) * 100) / 100;
    this.maxProfitPerMonth = Math.round(this.growTimePerMonth * this.maxProfitPerDay);
	}
}

function createCrops() {
  let crops = [];

  // Spring - Standard
  crops.push([]);
  crops[0].push(new StandardCrop("Blue Jazz", 30, 7, 50));
  crops[0].push(new StandardCrop("Cauliflower", 80, 12, 175));
  crops[0].push(new StandardCrop("Garlic", 40, 4, 60));
  crops[0].push(new StandardCrop("Kale", 70, 6, 110));
  crops[0].push(new StandardCrop("Parsnip", 20, 4, 35));
  crops[0].push(new StandardCrop("Potato", 50, 6, 80));
  crops[0].push(new StandardCrop("Rhubarb", 100, 13, 220));
  crops[0].push(new StandardCrop("Tulip", 20, 6, 30));
  // Spring - Regrow
  crops.push([]);
  crops[1].push(new RegrowCrop("Coffee Bean (Purchased, 2 Seasons)", 2500, 10, 2, 15*4, 2));
  crops[1].push(new RegrowCrop("Coffee Bean (Harvested, 2 Seasons)", 0, 10, 2, 15*4, 2));
  crops[1].push(new RegrowCrop("Coffee Bean (Purchased, 1 Season)", 2500, 10, 2, 15*4, 1));
  crops[1].push(new RegrowCrop("Coffee Bean (Harvested, 1 Season)", 0, 10, 2, 15*4, 1));
  crops[1].push(new RegrowCrop("Green Bean", 60, 10, 3, 40, 1));
  crops[1].push(new RegrowCrop("Strawberry", 100, 8, 4, 120, 1));

  // Summer - Standard
  crops.push([]);
  crops[2].push(new StandardCrop("Melon", 80, 12, 250));
  crops[2].push(new StandardCrop("Poppy", 100, 7, 140));
  crops[2].push(new StandardCrop("Radish", 40, 6, 90));
  crops[2].push(new StandardCrop("Red Cabbage", 100, 9, 260));
  crops[2].push(new StandardCrop("Starfruit", 400, 13, 750));
  crops[2].push(new StandardCrop("Summer Spangle", 50, 8, 90));
  crops[2].push(new StandardCrop("Sunflower", 200, 8, 80));
  crops[2].push(new StandardCrop("Wheat", 10, 4, 25));
  // Summer - Regrow
  crops.push([]);
  crops[3].push(new RegrowCrop("Blueberry", 80, 13, 4, 50*3, 1));
  crops[3].push(new RegrowCrop("Coffee Bean (Purchased, 1 Season)", 2500, 10, 2, 15*4, 1));
  crops[3].push(new RegrowCrop("Coffee Bean (Harvested, 1 Season)", 0, 10, 2, 15*4, 1));
  crops[3].push(new RegrowCrop("Corn (2 Seasons)", 150, 14, 4, 50, 2));
  crops[3].push(new RegrowCrop("Corn (1 Seasons)", 150, 14, 4, 50, 1));
  crops[3].push(new RegrowCrop("Hops", 60, 11, 1, 25, 1));
  crops[3].push(new RegrowCrop("Hot Pepper", 40, 5, 3, 40, 1));
  crops[3].push(new RegrowCrop("Tomato", 50, 11, 4, 60, 1));

  // Fall - Regular
  crops.push([]);
  crops[4].push(new StandardCrop("Amaranth", 70, 7, 150));
  crops[4].push(new StandardCrop("Artichoke", 30, 8, 160));
  crops[4].push(new StandardCrop("Beet", 20, 6, 100));
  crops[4].push(new StandardCrop("Bok Choy", 50, 4, 80));
  crops[4].push(new StandardCrop("Fairy Rose", 200, 12, 290));
  crops[4].push(new StandardCrop("Pumpkin", 100, 13, 320));
  crops[4].push(new StandardCrop("Sunflower", 200, 8, 80));
  crops[4].push(new StandardCrop("Sweet Gem Berry", 1000, 24, 3000));
  crops[4].push(new StandardCrop("Wheat", 10, 4, 25));
  crops[4].push(new StandardCrop("Yam", 60, 10, 160));

  // Fall - Regrow
  crops.push([]);
  crops[5].push(new RegrowCrop("Corn (1 Season)", 150, 14, 4, 50, 1));
  crops[5].push(new RegrowCrop("Cranberries", 240, 7, 5, 75*2, 1));
  crops[5].push(new RegrowCrop("Eggplant", 20, 5, 5, 60, 1));
  crops[5].push(new RegrowCrop("Grape", 60, 10, 3, 80, 1));

  return crops;
}