$("#dashboardBtn").on('click',()=>{
    $("#dashboard-section").css({
        display:"block"
    });
    $("#customer-section").css({
        display:"none"
    });
    $("#item-section").css({
        display:"none"
    });
    $("#order-section").css({
        display:"none"
    });
    $("#payment-section").css({
        display:"none"
    });
});
$("#inventoryBtn").on('click',()=>{
    $("#dashboard-section").css({
        display:"none"
    });
    $("#customer-section").css({
        display:"none"
    });
    $("#item-section").css({
        display:"block"
    });
    $("#order-section").css({
        display:"none"
    });
    $("#payment-section").css({
        display:"none"
    });
});
$("#ordersBtn").on('click',()=>{
    $("#dashboard-section").css({
        display:"none"
    });
    $("#customer-section").css({
        display:"none"
    });
    $("#item-section").css({
        display:"none"
    });
    $("#order-section").css({
        display:"block"
    });
    $("#payment-section").css({
        display:"none"
    });
});
$("#customerBtn").on('click',()=>{
    $("#dashboard-section").css({
        display:"none"
    });
    $("#customer-section").css({
        display:"block"
    });
    $("#item-section").css({
        display:"none"
    });
    $("#order-section").css({
        display:"none"
    });
    $("#payment-section").css({
        display:"none"
    });
});

$("#paymentBtn").on('click',()=>{
    $("#dashboard-section").css({
        display:"none"
    });
    $("#customer-section").css({
        display:"none"
    });
    $("#item-section").css({
        display:"none"
    });
    $("#order-section").css({
        display:"none"
    });
    $("#payment-section").css({
        display:"block"
    });
});
function showSection(sectionId) {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('customer-section').style.display = 'none';
    document.getElementById('item-section').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}

window.onload = function() {
    showSection('dashboard-section');
};
