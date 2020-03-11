var total = 0;
var id = 0;

function calculateTotal(){
    total = 0;
    $("#creditorTable").find('.balance').each(function(i, el){
        total += parseFloat($(el).text());
    });

    $('#total').text('$' + total.toFixed(2));
}

function removeRows() {
    $("#creditorTable").find('input:checkbox').each(function(i, el){
        if($(el).is(':checked')){
            if(i === 0){
                $('#creditorTable').find("tr:gt(0)").remove();
                $(el).prop('checked', false);
            }
            else{
                $(el).parents("tr").remove();

            }
        }
    });
    calculateTotal();
}

function checkAll(topCheck){
    let checked = false;
    if(topCheck.checked){
        checked = true;
    }
    $("#creditorTable").find('input:checkbox').each(function(i, el){
        $(el).prop('checked', checked);
    });
}

$(document).ready(function(){
    function createRow(creditor){
        let newRow = '';
        newRow += '<tr class="table-info" id="' + id + '">';
        newRow += '<td><input type="checkbox"/></td>';
        newRow += '<td>' + creditor.creditorName + '</td>';
        newRow += '<td>' +  creditor.firstName + '</td>';
        newRow += '<td>' + creditor.lastName +  '</td>';
        newRow += '<td>' + parseFloat(creditor.minPaymentPercentage).toFixed(2) +  '</td>';
        newRow += '<td class="balance">' + parseFloat(creditor.balance).toFixed(2) + '</td>';
        newRow += '</tr>';
        total += parseFloat(creditor.balance);
        return newRow;
    }
    $.getJSON('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json', function( data ) {
        var toDisplay = '';
        $.each( data, function( id, creditorInfo) {
            toDisplay += createRow(creditorInfo);
        });

        $('#creditorTable').append(toDisplay);
        calculateTotal();
    });

    $( "#submit").click(function() {
        var toDisplay = '';
        var formdata = $('#add-form').serializeArray();
        var data = {};
        $(formdata).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        toDisplay += createRow(data);
        $('#creditorTable').append(toDisplay);
        calculateTotal();
    });

});
