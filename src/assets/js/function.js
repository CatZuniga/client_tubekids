$(document).ready(function() {

    Materialize.updateTextFields();

    $('.modal').modal();

    $('.slider').slider();
    $('.collapsible').collapsible();

    $('select').material_select();
    $('.carousel').carousel();

    $(".button-collapse").sideNav();
   // $('.sidenav').sidenav();
   

    $('.fixed-action-btn').openFAB();
    $('.fixed-action-btn').closeFAB();

    $('.dropdown-button').dropdown('open');
    $('.dropdown-button').dropdown('close');

    $('.fixed-action-btn').openFAB();
    $('.fixed-action-btn').closeFAB();
 


    $('.datepicker').pickadate({ 
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 150, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false, // Close upon selecting a date,
        container: undefined,
        format: 'yyyy/mm/dd' // ex. 'body' will append picker to body
      });

      

});

function setDate(){
console.log("");

    $("#getDate").val($("#birthdate").val());
    console.log($("#birthdate").val());
}