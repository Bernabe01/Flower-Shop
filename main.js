// Handle Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const arrangement = document.getElementById('arrangement').value;

    // Display order confirmation
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.innerHTML = `<p>Thank you, ${customerName}! Your order for ${arrangement} has been placed.</p>`;
    confirmationDiv.style.color = "green";

    // Reset form
    this.reset();
});

// Generate Weekly Order Sheet
function generateOrderSheet() {
    const inventory = [
        { name: "Roses", stock: 15, minRequired: 50 },
        { name: "Tulips", stock: 10, minRequired: 30 },
    ];

    const orderSheet = inventory
        .filter(item => item.stock < item.minRequired)
        .map(item => ({
            name: item.name,
            order: item.minRequired - item.stock,
        }));

    const orderDiv = document.getElementById('orderSheet');
    if (orderSheet.length > 0) {
        orderDiv.innerHTML = `
            <h3>Weekly Order Sheet</h3>
            <ul>
                ${orderSheet.map(item => `<li>${item.name}: ${item.order} units</li>`).join('')}
            </ul>
        `;
    } else {
        orderDiv.innerHTML = `<p>All inventory is sufficient. No orders needed.</p>`;
    }
}
