$(document).ready(function(){
    $.getJSON('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json', function( data ) {
        var toDisplay = '';
        $.each( data, function( id, creditorInfo) {
            toDisplay += '<tr>';
            toDisplay += '<td>' + creditorInfo.creditorName + '</td>';
            toDisplay += '<td>' +  creditorInfo.firstName + '</td>';
            toDisplay += '<td>' + creditorInfo.lastName +  '</td>';
            toDisplay += '<td>' + creditorInfo.minPaymentPercentage +  '</td>';
            toDisplay += '<td>' + creditorInfo.balance + '</td>';
            toDisplay += '</tr>';
        });

        $('#creditorTable').append(toDisplay)
    });
});
