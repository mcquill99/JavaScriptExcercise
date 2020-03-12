var total = 0;
var totalRows = 0;
var checkedRows = 0;

function calculateTotal(){
    total = 0;
    $("#creditorTable").find('.balance').each(function(i, el){
        let num = $(el).text().slice(1).replace(',', '');
        total += parseFloat(num);
    });

    $('#total').text('$' + total.toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2}));
}

function updateRows(){
    $('#totalRows').text('Total Rows: ' + totalRows);
}

function updateCheckedRows(){
    $('#checkedRows').text('Checked Rows: ' + checkedRows);
}

function incCheckedRows(el){
    if($(el).is(':checked')){
        checkedRows++;
    }
    else{
        checkedRows--;
    }

    updateCheckedRows();
}

function removeRows() {
    $("#creditorTable").find('input:checkbox').each(function(i, el){
        if($(el).is(':checked')){
            if(i === 0){
                $('#creditorTable').find("tr:gt(0)").remove();
                $(el).prop('checked', false);
                totalRows = 0;
                checkedRows = 0;
                return false; //break
            }
            else{
                $(el).parents("tr").remove();
                totalRows--;
                checkedRows--;

            }
        }
    });
    calculateTotal();
    updateRows();
    updateCheckedRows();
}

function checkAll(topCheck){
    let checked = false;
    if(topCheck.checked){
        checked = true;
        checkedRows = totalRows;
    }
    else{
        checkedRows = 0;
    }
    $("#creditorTable").find('input:checkbox').each(function(i, el){
        $(el).prop('checked', checked);
    });

    updateCheckedRows();
}

function createRow(creditor){
    let newRow = '';
    newRow += '<tr class="table-info">';
    newRow += '<td><input type="checkbox" onclick="incCheckedRows(this)"/></td>';
    newRow += '<td>' + creditor.creditorName + '</td>';
    newRow += '<td>' +  creditor.firstName + '</td>';
    newRow += '<td>' + creditor.lastName +  '</td>';
    newRow += '<td class="num text-right">' + parseFloat(creditor.minPaymentPercentage).toLocaleString('en',{'minimumFractionDigits':2,'maximumFractionDigits':2}) +  '%</td>';
    newRow += '<td class="balance text-right">$' + parseFloat(creditor.balance).toLocaleString('en',{'minimumFractionDigits':2,'maximumFractionDigits':2}) + '</td>';
    newRow += '</tr>';

    total += parseFloat(creditor.balance);
    totalRows++;
    return newRow;
}

$(document).ready(function(){

    $.getJSON('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json', function( data ) {
        var toDisplay = '';
        $.each( data, function( id, creditorInfo) {
            toDisplay += createRow(creditorInfo);
        });

        $('#creditorTable').append(toDisplay);

        calculateTotal();
        updateRows();
    });

    $("#add").click(function(){
        $('#add-form').toggle();
    });

    $( "#submit").click(function() {
        let form = $('#add-form');
        var toDisplay = '';
        var formData = form.serializeArray();
        var parsedData = {};
        var enteredData = true;
        $(formData).each(function(index, obj){
            if(obj.value === ""){
                alert("Please enter values for all fields");
                enteredData = false;
                return false;
            }
            parsedData[obj.name] = obj.value;
        });

        if(enteredData){
            toDisplay += createRow(parsedData);
            $('#creditorTable').append(toDisplay);

            calculateTotal();
            updateRows();

            form.trigger("reset");
            form.toggle();
        }


    });

});
