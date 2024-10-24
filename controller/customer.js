import CustomerModel from "../model/customerModel.js";
import {customers} from "../db/db.js";

window.onload = function(){

    const http =new XMLHttpRequest();
    http.onreadystatechange =() =>{
        //check state
        if (http.readyState == 4){
            if (http.status == 200){
                const data = JSON.parse(http.responseText);
                data.forEach((item) => {
                    customers.push(new CustomerModel(item.id,item.name,item.address,item.contact_number,item.date));
                });
                loadCustomerValues();
            }else {
                console.error("Failed");
                console.error("Status Received" , http.status);
                console.error("Processing Stage" , http.readyState);
            }
        }else{
            console.log("Processing stage", http.readyState);
        }
    }

    http.open("GET","http://localhost:8080/inventory/customer",true);
    http.setRequestHeader("Content-Type","application/json");
    http.send();





}

let index;
$("#customerSavebtn").on('click', () => {
    let btnText = $("#customerSavebtn").text();
    if (btnText == "Update") {

        //Todo:update
        customers[index].customerId = $("#customerIdField").val();
        customers[index].customerName = $("#cusrtomerNameField").val();
        customers[index].customerAddress = $("#customerAddressField").val();
        customers[index].customerContact = $("#customerContactField").val();

        const CustomerDTO = {
            id : $("#customerIdField").val(),
            name :  $("#cusrtomerNameField").val(),
            address : $("#customerAddressField").val(),
            contact_number : $("#customerContactField").val(),
            date : ""
        }

        const http = new XMLHttpRequest();

        const CustomerJson = JSON.stringify(CustomerDTO);

        http.onreadystatechange = ()=>{
            if(http.readyState == 4){
                if(http.status == 200){
                    alert("Customer Updatd");
                }else{
                    console.log("Status ",http.status);
                    console.log("Stage ",http.readyState);
                }
            }else{
                console.log("Processing Stage", http.readyState);
            }
        }

        http.open("PUT", "http://localhost:8080/inventory/customer",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(CustomerJson);

        loadCustomerValues();
        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide();
    } else {
        var regexId=/^C00-\d{3}$/;
        var regexContact = /^\d{10}$/;
        if (regexContact.test($("#customerContactField").val())) {
            let cusId = $("#customerIdField").val();
            let cusContact = $("#customerContactField").val();
            let cusName = $("#cusrtomerNameField").val();
            let cusAddress = $("#customerAddressField").val();
            let date = Date.now();

            let customer = new CustomerModel(cusId, cusName, cusAddress, cusContact, date);
            customers.push(customer);

            const CustomerDTO = {
                id : 0,
                name : cusName,
                address : cusAddress,
                contact_number : cusContact,
                date : date
            }

            const CustomerJson = JSON.stringify(CustomerDTO);

            const http =new XMLHttpRequest();
            http.onreadystatechange =() =>{
                //check state
                if (http.readyState == 4){
                    if (http.status == 200){
                        alert("saved!!!!!");
                    }else {
                        console.error("Failed");
                        console.error("Status Received" , http.status);
                        console.error("Processing Stage" , http.readyState);
                    }
                }else{
                    console.log("Processing stage", http.readyState);
                }
            }

            http.open("POST","http://localhost:8080/inventory/customer",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(CustomerJson);

            loadCustomerValues();
            let modelel = $("#modelAddCustomer");
            var modal = bootstrap.Modal.getInstance(modelel)
            modal.hide();
        }else {
            alert("Wrong Contact Number!!");
        }
    }
});


function loadCustomerValues() {
    $("#customerTbody").empty();

    customers.map(function (customer) {
        var value =
            ` <tr>
                <td class="customerId-val">${customer.customerId}</td>
                <td class="customerName-val">${customer.customerName}</td>
                <td class="customerAddress-val">${customer.customerAddress}</td>
                <td class="customerContact-val">${customer.customerContact}</td>
                <td class="customerDate-val">${customer.customerAddDate}</td>
            </tr>`

        $("#customerTbody").append(value);
    });
}

// table row click
$("#customerTbody").on('click', 'tr', function () {
    let id = $(this).find('.customerId-val').text();
    let name = $(this).find('.customerName-val').text();
    let address = $(this).find('.customerAddress-val').text();
    let contact = $(this).find('.customerContact-val').text();
    index = $(this).index();

    $('#modelAddCustomer').modal('show');

    $("#customerSavebtn").text("Update");
    $("#customerModelHeader").text("Update Customer");

    $("#customerDeleteBtn").text("Delete");
    $("#customerDeleteBtn").css({
        background : "red"
    })
    $("#customerIdField").val(id);
    $("#customerContactField").val(contact);
    $("#cusrtomerNameField").val(name);
    $("#customerAddressField").val(address);

    removeValidation();
});

$("#customerDeleteBtn").on('click',function () {
    let btnText = $("#customerDeleteBtn").text();
    let idtoDelete = $("#customerIdField").val();
    if (btnText == "Delete") {
        customers.splice(index, 1);

        const http = new XMLHttpRequest();
        http.onreadystatechange =() =>{
            //check state
            if (http.readyState == 4){
                if (http.status == 200){
                    alert("Deleted!!!!!");
                }else {
                    console.error("Failed");
                    console.error("Status Received" , http.status);
                    console.error("Processing Stage" , http.readyState);
                }
            }else{
                console.log("Processing stage", http.readyState);
            }
        }

        http.open("DELETE","http://localhost:8080/inventory/customer",true);
        http.setRequestHeader("Content-Type","application/json")
        http.send(idtoDelete);



        loadCustomerValues();
        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }else {

        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }
})

$("#btn").on('click', function () {
    $('#modelAddCustomer').modal('show');
    $("#customerSavebtn").text("Save Changes");
    $("#customerModelHeader").text("Add Customer");
    $("#customerIdField").val("");
    $("#customerContactField").val("");
    $("#cusrtomerNameField").val("");
    $("#customerAddressField").val("");
    $("#customerDeleteBtn").text("Close");
    $("#customerDeleteBtn").css({
        background : "gray"
    })
    removeValidation()
})


function removeValidation() {

    $("#customerIdField").removeClass('is-invalid');
    $("#customerContactField").removeClass('is-invalid');
    $("#cusrtomerNameField").removeClass('is-invalid');
    $("#customerAddressField").removeClass('is-invalid');


    $("#customerIdField").removeClass('is-valid');
    $("#customerContactField").removeClass('is-valid');
    $("#cusrtomerNameField").removeClass('is-valid');
    $("#customerAddressField").removeClass('is-valid');
}


$("#customerIdField").on('keyup',()=>{
    let value = $("#customerIdField").val();
    var regexId=/^C00-\d{3}$/;
    if (regexId.test(value)){
        $("#customerIdField").removeClass('is-invalid');
        $("#customerIdField").addClass('is-valid');
    }else {
        $("#customerIdField").removeClass('is-valid');
        $("#customerIdField").addClass('is-invalid');
    }
})

$("#customerContactField").on('keyup',()=>{
    var regexContact = /^\d{10}$/;
    let val = $("#customerContactField").val();
    if (regexContact.test(val)){
        $("#customerContactField").removeClass('is-invalid');
        $("#customerContactField").addClass('is-valid');
    }else {
        $("#customerContactField").removeClass('is-valid');
        $("#customerContactField").addClass('is-invalid');
    }

});
$("#customerAddressField").on('keyup',()=>{
    const regex = /^.{4,}$/;
    let val = $("#customerAddressField").val();
    if (regex.test(val)){
        $("#customerAddressField").removeClass('is-invalid');
        $("#customerAddressField").addClass('is-valid');
    }else {
        $("#customerAddressField").removeClass('is-valid');
        $("#customerAddressField").addClass('is-invalid');
    }

});

const toggleBtn = document.getElementById('toggleWidthBtn');
const customerSection = document.getElementById('ovrCus');

// Add event listener to toggle the width
toggleBtn.addEventListener('click', () => {
    customerSection.classList.toggle('wider');
});
