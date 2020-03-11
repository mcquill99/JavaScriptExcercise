var total = 0;
var id = 0;

function removeRows() {
    $("#creditorTable").find('input:checkbox').each(function(i, el){
        if($(el).is(':checked')){
            document.getElementsByTagName("tr")[i].remove();
        }
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
        newRow += '<td>' + creditor.minPaymentPercentage.toFixed(2) +  '</td>';
        newRow += '<td>' + creditor.balance.toFixed(2) + '</td>';
        newRow += '</tr>';
        total += creditor.balance;
        id++;
        return newRow;
    }
    $.getJSON('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json', function( data ) {
        var toDisplay = '';
        $.each( data, function( id, creditorInfo) {
            toDisplay += createRow(creditorInfo);
        });

        $('#creditorTable').append(toDisplay)
    });

    $( "#submit").click(function() {
        var toDisplay = '';
        var formdata = $('#add-form').serializeArray();
        var data = {};
        $(formdata).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        toDisplay += createRow(data);
        $('#creditorTable').append(toDisplay)
    });

});
