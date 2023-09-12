
export function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }

    return id;
}

export async function requestSQL(request) {
    
    try {
        const dataToSend = {
            letter: request
        };


        const response = await fetch('requestSQL.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        
        console.error('Error:', error);
        throw error; 
    }
}