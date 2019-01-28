var infors = new Array();
//---------------物件---------------
var horLine = '<div class="ts horizontal divider">{msg}</div>';//大標
var Line = '<div class="ts fitted divider"></div>';//水平線
//---------------物件---------------
var item =
    '<div class="item" id="{id}" >' +
    '<div class="tertiary extra content">' +
    '<div class="header"><i class="{icon_id} icon"></i>{name}</div>' +
    '</div>' +
    '</div>';
//---------------script------------
var script =
    '$("#{id}").click(function(){' +
    'window.open("{url}");' +
    '});';
//---------------物件---------------
$(document).ready(function () {
    "use strict";
    $.getJSON("https://spreadsheets.google.com/feeds/cells/1_BnLNBlhI3Y259SohQdFBxxY1HCnHKIXpBpGGKWD0rM/1/public/values?alt=json",
        function (jsonGet) {
            let el = document.querySelector('#maincontent');
            let html = "";
            el.innerHTML = html.trim();
            let Gets = jsonGet.feed.entry;
            var urls = new Array();
            for (var i = 4; i < Gets.length; i += 4) {
                switch (true) {
                    case (Gets[i].gs$cell.$t === "horLine"):
                        el.innerHTML += horLine.replace("{msg}", Gets[i + 3].gs$cell.$t);
                        break;
                    case (Gets[i].gs$cell.$t === "Line"):
                        el.innerHTML += Line;
                        break;
                    default:
                        el.innerHTML += item.replace("{id}", Gets[i].gs$cell.$t).replace("{icon_id}", Gets[i + 1].gs$cell.$t).replace("{name}", Gets[i + 3].gs$cell.$t);
                        infors.push(Gets[i].gs$cell.$t+","+Gets[i + 2].gs$cell.$t);
                }
            }
            loadClick(infors);
        });

});
function loadClick(inforList) {
    inforList.forEach(element => {
        var item = element.split(",");
        if (item[0] === "about") {
            document.getElementById(item[0]).onclick = function () { alert(item[1].replace(/next/g,"\n")) }
            console.log(item[1]);
        } else {
            document.getElementById(item[0]).onclick = function () { window.open(item[1]) }
        }
    });
    return false;
}

