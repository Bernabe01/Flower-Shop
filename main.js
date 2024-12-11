// Mock Inventory for the Shop
const inventory = [
    { name: "Roses", stock: 15, minRequired: 50 },
    { name: "Tulips", stock: 0, minRequired: 30 }, // Example: Tulips are out of stock
];

// Handle Order Form Submission
document.getElementById('orderForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const arrangement = document.getElementById('arrangement').value;

    // Find the inventory item
    const item = inventory.find(i => i.name === arrangement);

    // Check stock level
    if (item && item.stock > 0) {
        // Display order confirmation
        const confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = `<p>Thank you, ${customerName}! Your order for ${arrangement} has been placed.</p>`;
        confirmationDiv.style.color = "green";

        // Decrease stock
        item.stock--;
    } else {
        // Notify that the item is out of stock
        alert(`${arrangement} is out of stock. Please check back later.`);
        const confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = `<p>Sorry, ${arrangement} is currently out of stock.</p>`;
        confirmationDiv.style.color = "red";
    }

    // Reset form
    this.reset();
});

// Generate Weekly Order Sheet
function generateOrderSheet() {
    const orderSheet = inventory
        .filter(item => item.stock < item.minRequired)
        .map(item => ({
            name: item.name,
            order: item.minRequired - item.stock,
        }));

    const orderDiv = document.getElementById('orderSheet'); // Ensure this ID exists in admin.html
    if (orderSheet.length > 0) {
        orderDiv.innerHTML = `
            <h3>Weekly Order Sheet</h3>
            <ul>
                ${orderSheet.map(item => `<li>${item.name}: ${item.order} units</li>`).join('')}
            </ul>
        `;

        // Notify about out-of-stock items
        inventory.forEach(item => {
            if (item.stock === 0) {
                const outOfStockAlert = document.createElement('p');
                outOfStockAlert.textContent = `${item.name} is out of stock!`;
                outOfStockAlert.style.color = "red";
                orderDiv.appendChild(outOfStockAlert);
            }
        });
    } else {
        orderDiv.innerHTML = `<p>All inventory is sufficient. No orders needed.</p>`;
    }
}


// Display Restock Buttons
function displayRestockButtons() {
    const restockSection = document.getElementById('restockSection');
    restockSection.innerHTML = inventory
        .map(item => `
            <div>
                <p>${item.name} (Current Stock: ${item.stock})</p>
                <button onclick="restockItem('${item.name}')">Restock ${item.name}</button>
            </div>
        `)
        .join('');
}

// Restock an Item
function restockItem(itemName) {
    const restockNotification = document.getElementById('restockNotification');

    // Find the item in the inventory and restock it
    const item = inventory.find(i => i.name === itemName);
    if (item) {
        item.stock = item.minRequired; // Restock to minimum required level
        restockNotification.innerHTML = `<p style="color: green;">We restocked on ${item.name}!</p>`;
    }

    // Update the restock buttons to reflect the new stock
    displayRestockButtons();
}

// Initialize the Admin Dashboard
document.addEventListener('DOMContentLoaded', () => {
    displayRestockButtons(); // Create restock buttons on page load
});
