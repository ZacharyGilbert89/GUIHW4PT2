let minCol = 0;
let minRow = 0;
let maxCol = 0;
let maxRow = 0;

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();


    minCol = document.getElementById("minCol").value;
    maxCol = document.getElementById("maxCol").value;
    minRow = document.getElementById("minRow").value;
    maxRow = document.getElementById("maxRow").value;

    var errorDiv = document.getElementById("inputError");
    if((maxCol > 50 || minCol < -50) || (maxRow > 50 || minRow < -50)) {
      //Show Error
      errorDiv.innerText = "An Input is Out of Range!!!! (-50 to 50)";
      //alert("Temp Error, an input is out of range");
    } else if((minCol > maxCol) || (minRow > maxRow)) {
      //throw Error
      errorDiv.innerText = "A Min Value CANNOT Exceed a Max Value!";
      //alert("Temp Error, an minimum cannot be greater or equal to max");
    } else {
      errorDiv.innerText = "";
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
