/**
 * Calendar block
 */
let events = [
  { type: "Session", month: 3, date: 1 },
  { type: "Session", month: 3, date: 8 },
  { type: "Session", month: 3, date: 12 },
  { type: "Session", month: 3, date: 17 },
  { type: "Session", month: 3, date: 22 },
  { type: "Session", month: 3, date: 26 },
  { type: "development", month: 3, date: 27 },
  { type: "Session", month: 4, date: 1 },
  { type: "Session", month: 4, date: 8 },
  { type: "Session", month: 4, date: 15 },
  { type: "Session", month: 4, date: 25 },
  { type: "Session", month: 5, date: 1 },
  { type: "Session", month: 5, date: 8 },
  { type: "Session", month: 5, date: 15 },
  { type: "Session", month: 5, date: 22 },
  { type: "development", month: 5, date: 25 },
  { type: "Session", month: 6, date: 1 },
  { type: "Session", month: 6, date: 8 },
  { type: "Session", month: 6, date: 12 },
  { type: "Session", month: 6, date: 15 },
  { type: "Session", month: 6, date: 22 },
  { type: "development", month: 6, date: 26 },
  { type: "Session", month: 7, date: 1 },
  { type: "development", month: 7, date: 7 },
  { type: "Session", month: 7, date: 8 },
  { type: "Session", month: 7, date: 15 },
  { type: "Session", month: 7, date: 22 },
  { type: "Session", month: 8, date: 1 },
  { type: "Session", month: 8, date: 8 },
  { type: "Session", month: 8, date: 15 },
  { type: "Session", month: 8, date: 22 },
];

var year = 4647
let mo1to4 = ["Zarantyr", "Olarune", "Therendor","Eyre"]
let mo5to8 = ["Dravago", "Nymm", "Lharvion", "Barrakas"]
let mo9to12 = ["Rhaan", "Sypheros", "Aryth", "Vult"]
let days = ["U","M","T","W","R","F","S"]

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    th.setAttribute("colspan", 7)
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  let row = table.insertRow();
  for (let i = 0; i<4; i++){
    for (let element of data) {
      let cell = row.insertCell();
      let text = document.createTextNode(element);
      cell.appendChild(text);
    }
  }
  let row2 = table.insertRow();
  for (let i = 0; i<4; i++){
    for (let j=1; j<8; j++) {
      let cell = row2.insertCell();
      let text = document.createTextNode(j);
      cell.appendChild(text);
      cell.id = table.id + 30*i+j
    }
  }
  let row3 = table.insertRow();
  for (let i = 0; i<4; i++){
    for (let j=8; j<15; j++) {
      let cell = row3.insertCell();
      let text = document.createTextNode(j);
      cell.appendChild(text);
      cell.id = table.id + 30*i+j
    }
  }
  let row4 = table.insertRow();
  for (let i = 0; i<4; i++){
    for (let j=15; j<22; j++) {
      let cell = row4.insertCell();
      let text = document.createTextNode(j);
      cell.appendChild(text);
      cell.id = table.id + 30*i+j
    }
  }
  let row5 = table.insertRow();
  for (let i = 0; i<4; i++){
    for (let j=22; j<29; j++) {
      let cell = row5.insertCell();
      let text = document.createTextNode(j);
      cell.appendChild(text);
      cell.id = table.id + 30*i+j
    }
  }
}

function highlightdate(data) {
  const dates = []
  for (let element of data){
    // select the color for the highlight based on the event type
    if(element['type'] == "development"){
      var color = 'gold'
    } else { var color = 'lightgreen' }
    // select which table will be edited in the highlight based on the month
    var m = element['month']
    if(m==3 || m==4){
      tableselect = "mo1-4"
    } else if(m==5 || m==6 || m==7 || m==8){
      tableselect = "mo5-8"
    } else {tableselect = "mo9-12"}
    //console.log(element['type'], element['month'], element['date'])
    var targetdate = document.getElementById(tableselect + 30*((element['month']-1)%4) + element['date'])
    targetdate.className += color
    //targetdate.style.backgroundColor = color // permanently sets a highlight, overriding style sheet
    targetdate.style.fontWeight = 'bold'
    dates.push(targetdate)
  }
  return dates
}

let table = document.getElementById("mo1-4");
generateTable(table, days);
generateTableHead(table, mo1to4);
let table2 = document.getElementById("mo5-8");
generateTable(table2, days);
generateTableHead(table2, mo5to8);
let table3 = document.getElementById("mo9-12");
generateTable(table3, days);
generateTableHead(table3, mo9to12);
var x = highlightdate(events)

// bind summaries and names to highlighted dates for click events
var gold_desc = [
  'Official communication from Fausta',
  'Reinforcements Arrive',
  'Amlid arrives on the island',
  'Sariel Joins the party'
]

const names = []
const summaries = []

console.log(parseFloat(region_pillar.features[15].properties.markernames[0].substring(8,10)))
for (let i = 0; i<region_pillar.features.length; i++){
  for (let j=0; j<region_pillar.features[i].properties.markernames.length;j++){
    names.push(region_pillar.features[i].properties.markernames[j])
    summaries.push(region_pillar.features[i].properties.markersummary[j])
  }
}

function swapElements(array,i1,i2){
  [array[i1],array[i2]] = [array[i2],array[i1]]
}
//sorting names and summaries so they're in the correct order
var order = 1
while(order == 1){
  order = 0
  for (let k=0; k<names.length; k++){
    if(k>0 && parseFloat(names[k].substring(8,10)) < parseFloat(names[k-1].substring(8,10))){
      swapElements(names,k,(k-1))
      swapElements(summaries,k,(k-1))
      order = 1
    }
  }
}

function ondateclick(y,z,a) {
  var count = -1
  var doubt = -1
  for (let i = 0; i<x.length; i++){
    if(x[i].className == 'gold'){
      count++
      for (let j = 0; j<y.length; j++){
        if(j==count){
          x[i].addEventListener('click',(event) =>{
            document.getElementById("marker_name").innerHTML = '';
            document.getElementById("summary").innerHTML = '<p>' + y[j] + '</p>';
          })
        }
      }
    }
    else if(x[i].className == 'lightgreen'){
      doubt++
      for(let k = 0; k<z.length ; k++){ 
        if(k==doubt){
          x[i].addEventListener('click',(event) =>{
            document.getElementById("marker_name").innerHTML = '<h6>' + z[k] + '</h6>';
            document.getElementById("summary").innerHTML = '<p>' + a[k] + '</p>';
          })
        }
      }
    }
  };
}
ondateclick(gold_desc,names,summaries)