var tbValue = 0;
var subject = new Array();//學科,分數,等地,積分
var chg = 0;
//-------------------------
function gpa(value){
    var sjId=7;
    if(chg===1){
        chg = 0;
        document.getElementById('chg').innerText = "轉換等地";
        for(sjId=7; sjId < tbValue; sjId+=5){
            document.getElementsByTagName('td')[sjId].innerText = subject[sjId][2];//分數
        }
    }else if(chg===0){
        chg = 2;
        document.getElementById('chg').innerText = "轉換GPA";
        for(sjId=7; sjId < tbValue; sjId+=5){
            document.getElementsByTagName('td')[sjId].innerText = subject[sjId][3];//等地
        }
    }else if(chg===2){
        chg = 1;
        document.getElementById('chg').innerText = "轉換分數";
        for(sjId=7; sjId < tbValue; sjId+=5){
            document.getElementsByTagName('td')[sjId].innerText = subject[sjId][4];//gpa
        }
    }
}
function compute(value){
    tbValue = document.getElementsByTagName('td').length;//58
    var gpa_i = 0;
    var gpa_m = 0;
    document.getElementsByTagName('p')[0].innerHTML += '<div id="gpa_f"></div>';
    for(var sjId=7; sjId < tbValue; sjId+=5){
        subject[sjId] = new Array();//新增一個陣列
        subject[sjId][0] = document.getElementsByTagName('td')[sjId-4].innerText;//課程編號
        subject[sjId][1] = document.getElementsByTagName('td')[sjId-3].innerText;//課程名稱
        subject[sjId][2] = document.getElementsByTagName('td')[sjId].innerText;//成績
        var cls = new Array();
        cls = tras(parseInt(document.getElementsByTagName('td')[sjId].innerText)).split(",");
        subject[sjId][3] = cls[0];//等地
        subject[sjId][4] = cls[1];//gpa
        gpa_i += parseInt(cls[1])*parseInt(document.getElementsByTagName('td')[sjId-1].innerText);
        gpa_m += parseInt(document.getElementsByTagName('td')[sjId-1].innerText);
    }
    document.getElementById('gpa_f').innerHTML += "你的GPA為 : " + (gpa_i/gpa_m).toFixed(2);
}
function tras(score){
    switch(true) {
        case (score>=80):
            return "A,4";
            break;
        case (score>=70):
            return "B,3";
            break;
            //（研究生及格標準)
        case (score>=60):
            return "C,2";
            break;
            //（學士班及格標準)
        case (score>=50):
            return "D,1";
            break;
        case (score>=0):
            return "E,0";
            break;
        default:
            return "不是分數,0";
    }
}
document.getElementsByTagName('td')[2].innerHTML += '<button id="chg" onclick="gpa(true)">轉換等地</button>';//新增按鈕
compute(true);
