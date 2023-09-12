import { generateRandomId, requestSQL } from "./functions.js";


export async function login(playerName, playerPassword) {
    
    var existingPlayer = await requestSQL(`SELECT * FROM accounts WHERE nickname = "${playerName}"`);
    
    if (existingPlayer.length > 0) {
        if (existingPlayer[0].password == playerPassword) {
            return {
                success: true,
                gameID: existingPlayer[0].account_id
            }
        }
    } 
    return {
        success: false,
        gameID: null
    };
    
}

export async function register(playerName, playerPassword) {
    try {
        let foundAvailableID = false;
        let gameID;

        while (!foundAvailableID) {
            gameID = generateRandomId();
            const existingAccount = await requestSQL(`SELECT * FROM accounts WHERE account_id = "${gameID}"`);

            if (existingAccount.length < 1) {
                foundAvailableID = true;
            }
        }

        const existingPlayer = await requestSQL(`SELECT * FROM accounts WHERE nickname = "${playerName}"`);

        if (existingPlayer.length > 0) {
            return {
                success: false,
                gameID: null
            };
        } else {
            const farms = await requestSQL(`SELECT * FROM farms`);
            const newFarmId = farms.length + 1;

            await requestSQL(`INSERT INTO farms (farm_id) VALUES (${newFarmId});`);
            await requestSQL(`INSERT INTO accounts (account_id, account_farm_id, nickname, password) VALUES ("${gameID}", ${newFarmId}, "${playerName}", "${playerPassword}");`);

            return {
                success: true,
                gameID: gameID
            };
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
