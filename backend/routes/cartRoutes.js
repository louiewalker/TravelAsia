const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product')
const Travel = require('../models/Travel')
const Event = require('../models/Event')

// Route to get cart items
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        // Loop over all items in cart and populate based on category
        for (let i = 0; i < user.cart.length; i++) {
            let item = user.cart[i];
            let Model;
            switch (item.category) {
                case 'Event':
                    Model = Event;
                    break;
                case 'Travel':
                    Model = Travel;
                    break;
                case 'Product':
                    Model = Product;
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid category' });
            }
            // Use populate to get item details
            await Model.populate(item, { path: 'item' });
        }
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Route to add an item to the cart
router.post('/:userId', async (req, res) => {
    const newItem = req.body;
    try {
        const user = await User.findById(req.params.userId);
        if (!user.cart) user.cart = []
        user.cart.push(newItem);
        await user.save();
        res.status(201).json(user.cart);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});



router.delete("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Clear the cart array
        user.cart = [];

        // Save the updated user document
        await user.save();

        res.json({ message: "Cart emptied successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to remove an item from the cart
router.delete('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItemIndex = user.cart.findIndex(
            (item) => item._id.toString() === itemId
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        user.cart.splice(cartItemIndex, 1);

        await user.save();

        res.json({ message: "Item removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
