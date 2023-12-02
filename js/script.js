// File: script.js
// GUI Assignment: HW4
// Zachary Gilbert, UMass Lowell Computer Science,
// Zachary_Gilbert@student.uml.edu
// Copyright (c) 2023 by Zachary Gilbert. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by ZG on December 1, 2023 at 11:30 AM
//global variables that hold the values for the table
let minCol = 0;
let minRow = 0;
let maxCol = 0;
let maxRow = 0;

let newMinCol = 0;
let newMaxCol = 0; 
let newMinRow = 0;
let newMaxRow = 0;
$(document).ready(function (){
  $("input").trigger("submit");
});
//Sliders
$(function(){
  $("#minColSlider").slider({
    min: -50, //min-max values
    max: 50,
    slide: function (event, ui) {
      $("#minCol").val(ui.value);
      $("input").trigger("submit");//submit when user done dragging
    },
  });
  $("#maxColSlider").slider({
    min: -50,//min-max values
    max: 50,
    slide: function (event, ui) {
      $("#maxCol").val(ui.value);
      $("input").trigger("submit");//submit when user done dragging
    },
  });
  $("#minRowSlider").slider({
    min: -50,//min-max values
    max: 50,
    slide: function (event, ui) {
      $("#minRow").val(ui.value);
      $("input").trigger("submit");//submit when user done dragging
    },
  });
  $("#maxRowSlider").slider({
    min: -50,//min-max values
    max: 50,
    slide: function (event, ui) {
      $("#maxRow").val(ui.value);
      $("input").trigger("submit");//submit when user done dragging
    },
  });
  
  //Double Binds, so when the user enters a value into the text box, the slider changes with it
  $("#minCol").on("keyup", function () {
    var inputValue = parseInt($(this).val());
    $("#minColSlider").slider("value", inputValue);
    if ($("#form").valid() == true) {
      $("input").trigger("submit");
    }
  });
  $("#maxCol").on("keyup", function () {
    var inputValue = parseInt($(this).val());
    $("#maxColSlider").slider("value", inputValue);
    if ($("#form").valid() == true) {
      $("input").trigger("submit");
    }
  });
  $("#minRow").on("keyup", function () {
    var inputValue = parseInt($(this).val());
    $("#minRowSlider").slider("value", inputValue);
    if ($("#form").valid() == true) {
      $("input").trigger("submit");
    }
  });
  $("#maxRow").on("keyup", function () {
    var inputValue = parseInt($(this).val());
    $("#maxRowSlider").slider("value", inputValue);
    if ($("#form").valid() == true) {
      $("input").trigger("submit");
    }
  });
});
//validators
$.validator.addMethod("greaterThan", function(value, element, param){//makes sure that a min value doesnt exceed a max value
  return this.optional(element) || parseInt(value) >= parseInt($(param).val());
});
$.validator.addMethod("noDecimal", function(value, element){//makes sure that the value entered is a number
return !(value % 1);
});
$(document).ready(function() 
{
  $("#form").validate({
    rules: {
      minCol: {
          required: true,
          noDecimal: true,
          range: [-50, 50]
      },
      maxCol: {
        required: true,
        range: [-50, 50],
        greaterThan: "#minCol"
      },
      minRow: {
        required: true,
        range: [-50, 50]
      },
      maxRow: {
        required: true,
        range: [-50, 50],
        greaterThan: "#minRow"
      }, 
    },
    //Validation messages if the user creates an error
    messages: {
      minCol: {
          required: "Please Enter a Minimum Column",
          integer: "Please Enter an Integer",
          range: "Please Stay Between the Ranges of (-50 to 50)"
      },
      maxCol: {
        required: "Please Enter a Maximum Column",
        integer: "Please Enter an Integer",
        range: "Please Stay Between the Ranges of (-50 to 50)",
        greaterThan: "Cannot have a minimum exceeding a maximum"
      },
      minRow: {
        required: "Please Enter a Minimum Row",
        integer: "Please Enter an Integer",
        range: "Please Stay Between the Ranges of (-50 to 50)"
      },
      maxRow: {
        required: "Please Enter a Maximum Row",
        integer: "Please Enter an Integer",
        range: "Please Stay Between the Ranges of (-50 to 50)",
        greaterThan: "Cannot have a minimum exceeding a maximum"
      }
    }, 
    
    submitHandler: function(form) 
    {
      //Creates the TABLE
      const table = document.createElement("table");
      const tabledata = document.getElementById("table");
      tabledata.innerHTML = ""; //clears previous table if there was one
      //gets values
      minCol = document.getElementById("minCol").value;
      maxCol = document.getElementById("maxCol").value;
      minRow = document.getElementById("minRow").value;
      maxRow = document.getElementById("maxRow").value;

      newMinCol = minCol;
      newMaxCol = maxCol;
      newMinRow = minRow;
      newMaxRow = maxRow;
      //fills table
      minRow -= 1;//used this to offset so we can have a top row that shows each value
      minCol -= 1;//used this to offset so we can have a left column that shows each column value
      for (let i = minRow; i <= maxRow; i++) {
        row = document.createElement("tr");//creates a row
        for (let j = minCol; j <= maxCol; j++) {//fills the row based on i*j
            colH = document.createElement("th");
            if(i == minRow) {//if its the first row
              if(i == minRow && j == minCol){//if its the first cell in the table(top right cell), we do not want to do i*j, we instead want to fill it with nothing
                colH.innerText = " ";
                row.appendChild(colH);
              } else { //since its the first row, we just want to store the j values
                colH.innerText = j;
                row.appendChild(colH);
              }
            } else if(j == minCol) {//if its the first column, we only want to fill it with i values
              colH.innerText = i;
              row.appendChild(colH);
            }else {//else it fills each cell with their respective products
              colH.innerText = j * i;
              row.appendChild(colH);
            }
        }
        table.appendChild(row);//appends all the row data
      }
      tabledata.appendChild(table);//sets the table with the table data
      //--------------------------------------------
    }
  });
});
//Creates tabs
var num_tabs = $("tabs ul li").length + 1; //Tabs Counter
$("#addTab").click(function(){ //on addTab button create tab
  $("#tabs").tabs();
  const elements = document.querySelectorAll('#tabs ul li');
  const count = elements.length;
  $("#tabs ul").append(
    "<li><input type='checkbox'><a href='#tab-" + num_tabs + "'>" + newMinCol + " to " + newMaxCol + " X " + newMinRow + " to " + newMaxRow + "</a><span class = 'ui-icon ui-icon-close'>Remove</span></li>"//creates tab
  );
  $("#tabs").append('<div id="tab-' + num_tabs + '">' + $("#table").html() + "</div>");//fills tab with table
  num_tabs++;//Increases tab number
  $("#tabs").tabs("refresh");
  $("#tabs").tabs({ active: (count - 1) });//sets current tab to new one
});
var tabs = $("#tabs").tabs(); //gets current tabs that are open
tabs.delegate("span.ui-icon-close", "click", function() { //closes out tab when selecting x button on tab
  $("#tabs").tabs("refresh");
  var panelId = $(this).closest("li").remove().attr("aria-controls"); //deletes tab
  $("#" + panelId).remove();
  tabs.tabs("refresh");
});
$("#deleteSelected").on("click",function(){ //closes out tabs that have the checkbox selected on each tab
  $("#tabs").tabs("refresh");
  $("input:checkbox").each(function() {
      if ($(this).is(":checked")) {
        var panelId = $(this).closest("li").remove().attr("aria-controls");//deletes tab
        $("#" + panelId).remove();
      }
  });
});

