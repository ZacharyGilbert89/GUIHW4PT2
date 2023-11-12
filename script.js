let minCol = 0;
let minRow = 0;
let maxCol = 0;
let maxRow = 0;

jQuery.validator.setDefaults ({
    debug:false,
    success:"valid"

});
$(document).ready(function() {
  //alert("submitted");
  $("#minColSlider").slider({
    slide: function(event, ui) {
      $("sliderDisplay").html(ui.value);
    }
  }),
  $("#form").validate({
    rules: {
      minCol: {
          required: false,
          range: [-50, 50]
      },
      maxCol: {
        required: false,
        range: [-50, 50]
      },
      minRow: {
        required: false,
        range: [-50, 50]
      },
      maxRow: {
        required: false,
        range: [-50, 50]
      }, 
    },
    messages: {
      minCol: {
          required: "Please Enter a Minimum Column",
          integer: "Please Enter an Integer",
          range: "Please Stay Between the Ranges of (-50 to 50)"
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