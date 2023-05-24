// god i hate everything

var fullbox = 50;
var settingson = false;

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function checkforfull() {
    if (parseInt(document.getElementById("counter1").innerHTML) >= fullbox) {
        var audio = new Audio('/stuff/notif.wav');
        audio.play();
        setTimeout(
            function() 
            {
                if (confirm(document.getElementById("countername1").value + " is full! Reset counter?") == true) {
                    document.getElementById("counter1").innerHTML = "0"
                }
            }, 500);
    } else if (parseInt(document.getElementById("counter2").innerHTML) >= fullbox) {
        var audio = new Audio('/stuff/notif.wav');
        audio.play();
        setTimeout(
            function() 
            {
                if (confirm(document.getElementById("countername2").value + " is full! Reset counter?") == true) {
                    document.getElementById("counter2").innerHTML = "0"
                }
            }, 500);
    } else if (parseInt(document.getElementById("counter3").innerHTML) >= fullbox) {
        var audio = new Audio('/stuff/notif.wav');
        audio.play();
        setTimeout(
            function() 
            {
                if (confirm(document.getElementById("countername3").value + " is full! Reset counter?") == true) {
                    document.getElementById("counter3").innerHTML = "0"
                }
            }, 500);
    } else if (parseInt(document.getElementById("counter4").innerHTML) >= fullbox) {
        var audio = new Audio('/stuff/notif.wav');
        audio.play();
        setTimeout(
            function() 
            {
                if (confirm(document.getElementById("countername4").value + " is full! Reset counter?") == true) {
                    document.getElementById("counter4").innerHTML = "0"
                }
            }, 500);
    }
}

document.getElementById("add1").onclick = function(){
    document.getElementById("counter1").innerHTML = String(parseInt(document.getElementById("counter1").innerHTML) + 1)
    checkforfull()
};

document.getElementById("add2").onclick = function(){
    document.getElementById("counter2").innerHTML = String(parseInt(document.getElementById("counter2").innerHTML) + 1)
    checkforfull()
};

document.getElementById("add3").onclick = function(){
    document.getElementById("counter3").innerHTML = String(parseInt(document.getElementById("counter3").innerHTML) + 1)
    checkforfull()
};

document.getElementById("add4").onclick = function(){
    document.getElementById("counter4").innerHTML = String(parseInt(document.getElementById("counter4").innerHTML) + 1)
    checkforfull()
};

document.getElementById("sub1").onclick = function(){
    document.getElementById("counter1").innerHTML = String(parseInt(document.getElementById("counter1").innerHTML) - 1)
    checkforfull()
};

document.getElementById("sub2").onclick = function(){
    document.getElementById("counter2").innerHTML = String(parseInt(document.getElementById("counter2").innerHTML) - 1)
    checkforfull()
};

document.getElementById("sub3").onclick = function(){
    document.getElementById("counter3").innerHTML = String(parseInt(document.getElementById("counter3").innerHTML) - 1)
    checkforfull()
};

document.getElementById("sub4").onclick = function(){
    document.getElementById("counter4").innerHTML = String(parseInt(document.getElementById("counter4").innerHTML) - 1)
    checkforfull()
};

document.getElementById("settings").onclick = function(){
    if (settingson == false) {
        settingson = true;
        var cmd = prompt("Welcome to Settings! Current Commands:\nsetfullval: Sets the full value of a full box. Usage: setfullval=<numbervalue>\nresetall: Resets ALL Counters. Usage: resetall\nreset: Resets a counter. Usage reset=<counter number>");
        if (cmd != null) {
            var cmdt = cmd.split("=");
            if (cmdt[0] == "setfullval") {
                if (isNaN(cmdt[1])) {alert("Not a number")} else {
                    fullbox = parseInt(cmdt[1]);
                    alert("Full Box Value set to " + String(fullbox));
                }
            } else if (cmdt[0] == "resetall") {
                if (confirm("Are you sure you want to reset all counters?") == true) {
                    document.getElementById("counter1").innerHTML = "0";
                    document.getElementById("counter2").innerHTML = "0";
                    document.getElementById("counter3").innerHTML = "0";
                    document.getElementById("counter4").innerHTML = "0";
                    alert("All counters reset");
                }
            } else if (cmdt[0] == "reset") {
                if (document.getElementById("counter" + cmdt[1]) != null) {
                document.getElementById("counter" + cmdt[1]).innerHTML = "0";
                alert("Counter reset");
                } else {alert("Counter nonexistent")}
        }  
        
        
        else {alert("Invalid command")}
    settingson = false;
    } else { settingson = false}
}
}

document.getElementById("savecounters").onclick = function(){
    var data = {
        counter1name: document.getElementById("countername1").value,
        counter1value: parseInt(document.getElementById("counter1").innerHTML),
        counter2name: document.getElementById("countername2").value,
        counter2value: parseInt(document.getElementById("counter2").innerHTML),
        counter3name: document.getElementById("countername3").value,
        counter3value: parseInt(document.getElementById("counter3").innerHTML),
        counter4name: document.getElementById("countername4").value,
        counter4value: parseInt(document.getElementById("counter4").innerHTML)
    }
    download(JSON.stringify(data), 'counters.txt', 'text/plain');
}

document.getElementById("loadcounters").onclick = function(){
    if (document.getElementById("countersfile").style.display == "none") {
        document.getElementById("countersfile").style = "display: block";
    }
}

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    console.log(event.target.result);
    if (isJsonString(event.target.result)) {
    var obj = JSON.parse(event.target.result);
    if (obj.counter1name != null && obj.counter1value != null) {
        document.getElementById("countername1").value = obj.counter1name;
        document.getElementById("counter1").innerHTML = String(obj.counter1value);
        document.getElementById("countername2").value = obj.counter2name;
        document.getElementById("counter2").innerHTML = String(obj.counter2value);
        document.getElementById("countername3").value = obj.counter3name;
        document.getElementById("counter3").innerHTML = String(obj.counter3value);
        document.getElementById("countername4").value = obj.counter4name;
        document.getElementById("counter4").innerHTML = String(obj.counter4value);
        document.getElementById("countersfile").style = "display: none";
        alert("Load Success");
    } else {alert("Invalid JSON File")}
    } else {alert("Invalid JSON File")}
}

document.getElementById('countersfile').addEventListener('change', onChange);