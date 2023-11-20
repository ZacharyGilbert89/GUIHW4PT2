let minCol = 0;
let minRow = 0;
let maxCol = 0;
let maxRow = 0;

$(function(){
  $("#minColSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minCol").val(ui.value);
      $("input").trigger("submit");
    },
  });
  $("#maxColSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxCol").val(ui.value);

      $("input").trigger("submit");
    },
  });
  $("#minRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minRow").val(ui.value);
      $("input").trigger("submit");
    },
  });
  $("#maxRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxRow").val(ui.value);
      $("input").trigger("submit");
    },
  });
});
$.validator.addMethod("greaterThan", function(value, element, param){
  return this.optional(element) || parseInt(value) >= parseInt($(param).val());
});
$.validator.addMethod("noDecimal", function(value, element){
return !(value % 1);
});
$(document).ready(function() {
  
  $("#form").validate({
    rules: {
      minCol: {
          required: false,
          noDecimal: true,
          range: [-50, 50]
      },
      maxCol: {
        required: false,
        range: [-50, 50],
        greaterThan: "#minCol"
      },
      minRow: {
        required: false,
        range: [-50, 50]
      },
      maxRow: {
        required: false,
        range: [-50, 50],
        greaterThan: "#minRow"
      }, 
    },
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
    submitHandler: function(form) {
    //alert("Submitted");
    minCol = document.getElementById("minCol").value;
    maxCol = document.getElementById("maxCol").value;
    minRow = document.getElementById("minRow").value;
    maxRow = document.getElementById("maxRow").value;
      
    const table = document.createElement("table");
      const tabledata = document.getElementById("table");
      tabledata.innerHTML = "";
      minRow -= 1;
      minCol -= 1;
      for (let i = minRow; i <= maxRow; i++) {
        row = document.createElement("tr");
        for (let j = minCol; j <= maxCol; j++) {
            colH = document.createElement("th");
            if(i == minRow) {
              if(i == minRow && j == minCol){
                colH.innerText = " ";
                row.appendChild(colH);
              } else {
                colH.innerText = j;
                row.appendChild(colH);
              }
            } else if(j == minCol) {
              colH.innerText = i;
              row.appendChild(colH);
            }else {
              colH.innerText = j * i;
              row.appendChild(colH);
            }
        }
        table.appendChild(row);
      }
      tabledata.appendChild(table);
    }
  });
});