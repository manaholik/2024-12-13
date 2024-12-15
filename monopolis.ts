type Tile = {
    name: string;
    type: 'property' | 'special' | 'tax' | 'railroad' | 'utility';
    price?: number;
    rent?: number[];
    rentMultiplier?: number[];
    color?: string;
    houseCost?: number;
    hotelCost?: number;
    amount?: number;
    description?: string;
};

// Define board tiles
const boardTiles: Tile[] = [
    { name: "GO", type: "special", description: "Collect $200 when you pass." },
    { name: "Mediterranean Avenue", type: "property", color: "brown", price: 60, rent: [2, 10, 30, 90, 160, 250], houseCost: 50, hotelCost: 50 },
    { name: "Community Chest", type: "special", description: "Draw a Community Chest card." },
    { name: "Baltic Avenue", type: "property", color: "brown", price: 60, rent: [4, 20, 60, 180, 320, 450], houseCost: 50, hotelCost: 50 },
    { name: "Income Tax", type: "tax", amount: 200 },
    { name: "Reading Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200] },
    { name: "Oriental Avenue", type: "property", color: "light blue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, hotelCost: 50 },
    { name: "Chance", type: "special", description: "Draw a Chance card." },
    { name: "Vermont Avenue", type: "property", color: "light blue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, hotelCost: 50 },
    { name: "Connecticut Avenue", type: "property", color: "light blue", price: 120, rent: [8, 40, 100, 300, 450, 600], houseCost: 50, hotelCost: 50 },
    { name: "Jail", type: "special", description: "Just visiting or in jail." },
    { name: "St. Charles Place", type: "property", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, hotelCost: 100 },
    { name: "Electric Company", type: "utility", price: 150, rentMultiplier: [4, 10] },
    { name: "States Avenue", type: "property", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, hotelCost: 100 },
    { name: "Virginia Avenue", type: "property", color: "pink", price: 160, rent: [12, 60, 180, 500, 700, 900], houseCost: 100, hotelCost: 100 },
    { name: "St. James Place", type: "property", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, hotelCost: 100 },
    { name: "Tennessee Avenue", type: "property", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, hotelCost: 100 },
    { name: "New York Avenue", type: "property", color: "orange", price: 200, rent: [16, 80, 220, 600, 800, 1000], houseCost: 100, hotelCost: 100 },
    { name: "Free Parking", type: "special", description: "No action." },
    { name: "Kentucky Avenue", type: "property", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, hotelCost: 150 },
    { name: "Indiana Avenue", type: "property", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, hotelCost: 150 },
    { name: "Illinois Avenue", type: "property", color: "red", price: 240, rent: [20, 100, 300, 750, 925, 1100], houseCost: 150, hotelCost: 150 },
    { name: "B&O Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200] },
    { name: "Atlantic Avenue", type: "property", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, hotelCost: 150 },
    { name: "Ventnor Avenue", type: "property", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, hotelCost: 150 },
    { name: "Water Works", type: "utility", price: 150, rentMultiplier: [4, 10] },
    { name: "Marvin Gardens", type: "property", color: "yellow", price: 280, rent: [24, 120, 360, 850, 1025, 1200], houseCost: 150, hotelCost: 150 },
    { name: "Go to Jail", type: "special", description: "Move directly to Jail. Do not pass GO, do not collect $200." },
    { name: "Pacific Avenue", type: "property", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, hotelCost: 200 },
    { name: "North Carolina Avenue", type: "property", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, hotelCost: 200 },
    { name: "Pennsylvania Avenue", type: "property", color: "green", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], houseCost: 200, hotelCost: 200 },
    { name: "Short Line", type: "railroad", price: 200, rent: [25, 50, 100, 200] },
    { name: "Park Place", type: "property", color: "dark blue", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], houseCost: 200, hotelCost: 200 },
    { name: "Luxury Tax", type: "tax", amount: 100 },
    { name: "Boardwalk", type: "property", color: "dark blue", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], houseCost: 200, hotelCost: 200 },
];

type Player = {
    name: string;
    icon: HTMLElement;
    position: number;
    money: number;
    properties: Tile[];
    houses: { [key: string]: number };
    hotels: { [key: string]: number };
};

class MonopolyGame {
    boardSpaces: NodeListOf<HTMLElement>;
    players: Player[];
    currentPlayerIndex: number;

    constructor(boardSpaces: NodeListOf<HTMLElement>, players: Player[]) {
        this.boardSpaces = boardSpaces;
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    movePlayer(steps: number): void {
        const player = this.players[this.currentPlayerIndex];
        let newPosition = player.position + steps;

        if (newPosition >= this.boardSpaces.length) {
            newPosition -= this.boardSpaces.length;
            this.passGo(player);
        }

        player.position = newPosition;
        this.updatePlayerPosition(player);
        this.checkTile(player);
    }

    updatePlayerPosition(player: Player): void {
        // Clear current position
        this.boardSpaces.forEach(space => {
            const playerIconsContainer = space.querySelector('.player-icons');
            if (playerIconsContainer && playerIconsContainer.contains(player.icon)) {
                playerIconsContainer.removeChild(player.icon);
            }
        });

        // Set new position
        const targetSpace = this.boardSpaces[player.position];
        let playerIconsContainer = targetSpace.querySelector('.player-icons');

        if (!playerIconsContainer) {
            playerIconsContainer = document.createElement('div');
            playerIconsContainer.classList.add('player-icons');
            targetSpace.prepend(playerIconsContainer);
        }

        playerIconsContainer.appendChild(player.icon);
        console.log(`${player.name} moved to ${boardTiles[player.position].name}`);
    }

    passGo(player: Player): void {
        player.money += 200;
        console.log(`${player.name} passed GO and collected $200.`);
        this.updatePlayerMoneyDisplay(player);
    }

    checkTile(player: Player): void {
        const tile = boardTiles[player.position];
        console.log(`${player.name} landed on ${tile.name}`);

        switch (tile.type) {
            case 'property':
                if (!this.isOwned(tile)) {
                    this.promptPurchase(player, tile);
                } else {
                    this.payRent(player, tile);
                }
                break;
            case 'tax':
                this.payTax(player, tile);
                break;
            // Add cases for other tile types
            case 'utility':
            case 'railroad':
                // Logic for these can be similar to property
                break;
            case 'special':
                this.handleSpecialTile(player, tile);
                break;
        }

        if (player.money <= 0) {
            console.log(`${player.name} is out of money! Game over.`);
        }
        this.promptForHouseOrHotelPurchase(player); // Allow purchase of houses/hotels if applicable
    }

    isOwned(tile: Tile): boolean {
        return this.players.some(p => p.properties.includes(tile));
    }

    promptPurchase(player: Player, tile: Tile): void {
        if (tile.price && confirm(`${player.name}, do you want to buy ${tile.name} for $${tile.price}?`)) {
            this.purchaseProperty(player, tile);
        } else {
            console.log(`${player.name} chose not to purchase ${tile.name}.`);
        }
    }

    purchaseProperty(player: Player, tile: Tile): void {
        if (player.money >= tile.price!) {
            player.money -= tile.price!;
            player.properties.push(tile);
            this.updatePlayerMoneyDisplay(player);
            console.log(`${player.name} purchased ${tile.name}.`);
        } else {
            console.log(`${player.name} can't afford ${tile.name}.`);
        }
    }

    payRent(player: Player, tile: Tile): void {
        // Calculate appropriate rent based on houses/hotels
        const houseCount = player.houses[tile.name] || 0;
        const rent = tile.rent ? tile.rent[houseCount] : 0;
        player.money = Math.max(0, player.money - rent);
        this.updatePlayerMoneyDisplay(player);
        console.log(`${player.name} paid $${rent} rent for ${tile.name}.`);
    }

    payTax(player: Player, tile: Tile): void {
        player.money = Math.max(0, player.money - tile.amount!);
        this.updatePlayerMoneyDisplay(player);
        console.log(`${player.name} paid $${tile.amount} in taxes.`);
    }

    handleSpecialTile(player: Player, tile: Tile): void {
        if (tile.name === "Go to Jail") {
            player.position = 10;
            this.updatePlayerPosition(player);
            console.log(`${player.name} goes directly to Jail!`);
        }
        // Additional special tile logic here
    }

    updatePlayerMoneyDisplay(player: Player): void {
        const moneyDisplay = document.querySelectorAll('.player .player-info span:last-child')[this.currentPlayerIndex];
        if (moneyDisplay) moneyDisplay.textContent = `$${player.money}`;
    }

    promptForHouseOrHotelPurchase(player: Player): void {
        const properties = player.properties.filter(prop => prop.type === 'property');

        if (properties.length > 0) {
            properties.forEach(property => {
                if (confirm(`Do you want to buy a house/hotel for ${property.name}?`)) {
                    if (confirm(`Press OK for House ($${property.houseCost}) or Cancel for Hotel ($${property.hotelCost})`)) {
                        this.buyHouse(player, property);
                    } else {
                        this.buyHotel(player, property);
                    }
                }
            });
        } else {
            console.log(`${player.name} has no properties to build on.`);
        }
    }

    buyHouse(player: Player, tile: Tile): void {
        if (tile.houseCost && player.money >= tile.houseCost) {
            const houseCount = player.houses[tile.name] || 0;
            if (houseCount < 4) {
                player.money -= tile.houseCost;
                player.houses[tile.name] = houseCount + 1;
                this.updatePlayerMoneyDisplay(player);
                console.log(`${player.name} built a house on ${tile.name}.`);
            } else {
                console.log(`${tile.name} already has 4 houses. Consider building a hotel.`);
            }
        } else {
            console.log(`${player.name} can't afford a house on ${tile.name}.`);
        }
    }

    buyHotel(player: Player, tile: Tile): void {
        if (tile.hotelCost && player.money >= tile.hotelCost) {
            const houseCount = player.houses[tile.name] || 0;
            if (houseCount === 4) {
                player.money -= tile.hotelCost;
                delete player.houses[tile.name];
                player.hotels[tile.name] = 1;
                this.updatePlayerMoneyDisplay(player);
                console.log(`${player.name} built a hotel on ${tile.name}.`);
            } else {
                console.log(`Need 4 houses on ${tile.name} before building a hotel.`);
            }
        } else {
            console.log(`${player.name} can't afford a hotel on ${tile.name}.`);
        }
    }

    nextTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`It's ${this.players[this.currentPlayerIndex].name}'s turn.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const boardSpaces = document.querySelectorAll('.space');
    const player1Icon = document.getElementById('player1-icon')!;
    const player2Icon = document.getElementById('player2-icon')!;

    const players: Player[] = [
        { name: "Player 1", icon: player1Icon, position: 0, money: 1500, properties: [], houses: {}, hotels: {} },
        { name: "Player 2", icon: player2Icon, position: 0, money: 1500, properties: [], houses: {}, hotels: {} },
    ];

    const game = new MonopolyGame(boardSpaces, players);

    const rollButton = document.querySelector<HTMLElement>('.roll-button')!;
    rollButton.addEventListener('click', () => {
        const diceValue = game.rollDice();
        console.log(`${game.players[game.currentPlayerIndex].name} rolled: ${diceValue}`);
        game.movePlayer(diceValue);
        game.nextTurn();
    });
});
