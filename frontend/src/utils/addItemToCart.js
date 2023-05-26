async function addItemToCart(userId, newItem) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const cart = await response.json();
            return cart;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export default addItemToCart;