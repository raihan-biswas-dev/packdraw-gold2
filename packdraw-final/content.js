// Create a div element for the sticky info
const a4_pack_stats = document.createElement('div');
a4_pack_stats.id = 'sticky-info';
a4_pack_stats.className = 'd-hide';
a4_pack_stats.innerHTML = '<div id="card1" class="card d-hide" style=" border: none; "> <div class="card-header"><br><br><br><br></div> <div class="card-body"> <div class="form-group" style=" text-align: center; display: block; "> <label class="form-label label-sm" >YOU MUST BE USING CODE</label> <button class="btn btn-block btn-primary" id="splash_code" style=" background-image: linear-gradient(to right, #FD0606 , #A718FF);color: white; font-weight: 1000; " >SPLASH</button> <label class="form-label label-sm" >TO ENABLE SplashStats</label> </div> </div> <div class="card-footer"><br><br><br><br></div></div> <div id="card2" class="card" style=" border: none; "> <div class="card-header"> <ul class="menu">  </ul> </div> <div class="card-body" style=" color: white; font-weight: 1000; "> </div> <div class="card-footer"></div> </div>';
// Append the div to the body of the page
document.body.appendChild(a4_pack_stats);
// Define a variable to store data
let myStatus = { a3_option_price_bar: true, a3_option_price_bar_running: false, a4_option_pack_stats: true, a4_option_pack_stats_running: false, };
//Utils Function

function click_chakra_button(_text) {
    var buttons = document.querySelectorAll('div.chakra-stack>button.chakra-button');
    //    console.log("click_chakra_button:" + buttons.length);
    // Loop through each button
    for (var i = 0; i < buttons.length; i++) {
        // Check if the button's text content is "Deposit"
        if (buttons[i].textContent.trim() === _text) {
            // Click the button
            buttons[i].click();
            // Exit the loop after clicking the button
            break;
        }
    }
}
//FIRST PROCESS

var timer_id_check_show = setInterval(check_show, 1000);
function check_show() {
    chrome.storage.local.get(['option_price_bar', 'option_pack_stats']).then(({ option_price_bar, option_pack_stats }) => {

        // document.title = "3" + myStatus.a3_option_price_bar_running + ":4" + myStatus.a4_option_pack_stats_running;
        //3333
        if (option_price_bar != false && document.location.href.includes("/battles/") && document.location.href.includes("/battles/create")==false) {
            //enable
            myStatus.a3_option_price_bar = true;
            if (myStatus.a3_option_price_bar_running == false) {
                myStatus.a3_option_price_bar_running = true;
                a3_timer_id_price_bar_calculate = setTimeout(a3_start_price_bar_calculate, 100);
            }
        } else {
            myStatus.a3_option_price_bar = false;
            myStatus.a3_option_price_bar_running = false;
            clearTimeout(a3_timer_id_price_bar_calculate);
        }
        if (myStatus.a3_option_price_bar_running == false) {
            a3_price_bar_show(myStatus.a3_option_price_bar);
        }
        ///44444
        if (option_pack_stats != false) {
            //enable
            myStatus.a4_option_pack_stats = true;
            if (myStatus.a4_option_pack_stats_running == false) {

                myStatus.a4_option_pack_stats_running = true;
                a4_timer_id_pack_stats_calculate = setTimeout(a4_start_pack_stats_calculate, 100);
            }
        } else {
            //disable
            myStatus.a4_option_pack_stats = false;
            myStatus.a4_option_pack_stats_running = false;
            clearTimeout(a4_timer_id_pack_stats_calculate);
        }
        if (myStatus.a4_option_pack_stats_running == false) {
            a4_pack_stats_show(myStatus.a4_option_pack_stats);
        }
    });
}
function a4_pack_stats_show(_show) {

    if (_show) {
        a4_pack_stats.className = '';
    } else {

        a4_pack_stats.className = 'd-hide';
    }
}
function a3_price_bar_show(_show) {
    if (_show) {
        document.getElementById("battle_bar")?.setAttribute('class', 'bar');
    } else {
        document.getElementById("battle_bar")?.setAttribute('class', 'bar d-hide');
    }
}

//SECOND PROCESSS
var timer_id_ref = setInterval(process_referralCode, 100);

function splash_code(_splash_code) {

    if (_splash_code) {
        //enable
        document.title = "Activated";
        a4_pack_stats_show(false);
        document.getElementById('card1').classList.add('d-hide');
        document.getElementById('card2').classList.remove('d-hide');
    } else {
        //disable
        a4_pack_stats_show(true);
        document.getElementById('card2').classList.add('d-hide');
        document.getElementById('card1').classList.remove('d-hide');
    }
}
function process_referralCode() {
    var ref = document.getElementById("referralCode");
    if (ref) {
        const local = sessionStorage.getItem("local");
        if (local != "SPLASH") {
            setTimeout(() => {
                ref = document.getElementById("referralCode");
                if (ref) {
                    ref.focus();
                    document.execCommand("selectAll");
                    document.execCommand("insertText", false, "SPLASH");
                    click_chakra_button("Submit");
                    ref.remove();
                }
            }, 99);
        }
    } else {
        var splash = document.body.textContent.toLowerCase();
        if (splash.includes("using referral code: splash") || splash.includes("referral code \"splash\"")) {
            clearInterval(timer_id_ref);
            sessionStorage.setItem("local", "SPLASH");
            splash_code(true);
        }
    }
}
//THIRD PROCESS battle_bar
var players, battle_bar, player1, player2, player3, player4, a2vs2_icon, body_content;
var sum, left_value, right_value, left_percent, parent, last_values;
const red = "linear-gradient(to right,#eb3f41, #f46869)";
const green = "linear-gradient(to right, #5eea81, #3ae765)";
var a3_timer_id_price_bar_calculate;
function update_price_bar() {
    console.log('update_price_bar');
    a3_price_bar_show(myStatus.a3_option_price_bar);
    // document.title = left_value + ":" + right_value;
    if (left_value <= right_value) {
        battle_bar.children[0].style.setProperty('background-image', red);
        battle_bar.children[1].style.setProperty('background-image', green);
    } else {
        battle_bar.children[0].style.setProperty('background-image', green);
        battle_bar.children[1].style.setProperty('background-image', red);
    }
    battle_bar.children[0].style.setProperty('width', left_percent + '%');
    battle_bar.children[0].textContent = left_value.toFixed(2);
    battle_bar.children[1].style.setProperty('width', (100 - left_percent) + '%');
    battle_bar.children[1].textContent = (sum - left_value).toFixed(2);
}
function a3_start_price_bar_calculate() {
    //    console.log("a3_start_price_bar_calculate start");
    a2vs2_icon = document.querySelectorAll("svg.css-3vhlzt");//Points Rush
    //    console.log("a2vs2_icon:" + a2vs2_icon.length);
    body_content = document.body.textContent.toLowerCase();
    //get 4 html players parent
    players = document.querySelectorAll('.css-tdrjeu>.chakra-stack');
    //    console.log("players:" + players.length);
    if (a2vs2_icon.length == 1 && players.length == 4 && players[0].firstChild.textContent.includes("$") && document.querySelectorAll('.chakra-container>.chakra-stack>div>div>p.chakra-text').length < 6) {
        battle_bar = document.getElementById("battle_bar");
        if (battle_bar) {
            last_values = document.querySelectorAll(".css-revdf2");
            //    console.log("last_values:" + last_values.length);
            if (last_values.length == 4 && last_values[0].textContent.includes('$')) {
                left_value = parseFloat(last_values[0].textContent.replace(/[$,]/g, "")) + parseFloat(last_values[1].textContent.replace(/[$,]/g, ""));
                right_value = parseFloat(last_values[2].textContent.replace(/[$,]/g, "")) + parseFloat(last_values[3].textContent.replace(/[$,]/g, ""));
                sum = left_value + right_value;
                left_percent = left_value / sum * 100;
                update_price_bar();
            } else {
                try {
                    player1 = players[0].firstChild.innerText.replace(",", "").split(/[$\n]+/g);
                    player1 = parseFloat(player1[player1.length - 1]);

                    player2 = players[1].firstChild.innerText.replace(",", "").split(/[$\n]+/g);
                    player2 = parseFloat(player2[player2.length - 1]);

                    player3 = players[2].firstChild.innerText.replace(",", "").split(/[$\n]+/g);
                    player3 = parseFloat(player3[player3.length - 1]);

                    player4 = players[3].firstChild.innerText.replace(",", "").split(/[$\n]+/g);
                    player4 = parseFloat(player4[player4.length - 1]);

                    if (player1 > 0 && player2 > 0 && player3 > 0 && player4 > 0) {
                        sum = player1 + player2 + player3 + player4;
                        left_value = player1 + player2;
                        right_value = player3 + player4;
                        left_percent = left_value / sum * 100;
                        update_price_bar();
                    }
                } catch (error) {
                    document.title = "err: battle_bar";
                }

            }
        } else {
            parent = document.querySelector('.css-1b23abr');
            console.log("parent:" + parent.innerHTML);
            if (parent) {
                html_bar = '<div class="bar" id="battle_bar" style="height: 24px;line-height: 24px;font-size: 20px;font-weight: 700;color: black"> <div style="text-align: right;width:50%;background-image: linear-gradient(to right,#eb3f41, #f46869);padding-right: 10px; border-radius: 0.2rem; margin:0px 2px;max-width: 95%;min-width: 5%;">50%</div> <div style="width:50%;background-image: linear-gradient(to right, #5eea81, #3ae765);text-align: left;padding-left: 10px; border-radius: 0.2rem; margin:0px 2px;max-width: 95%;min-width: 5%;">50%</div> </div>';
                parent.insertAdjacentHTML('beforebegin', html_bar);
            } else {
                document.title = "battle_not_found";
            }
        }
    } else {
        a3_price_bar_show(false);
        document.title = "battle_null:"+new Date().getMilliseconds();
    }
    if (myStatus.a3_option_price_bar) {
        myStatus.a3_option_price_bar_running = true;
        a3_timer_id_price_bar_calculate = setTimeout(a3_start_price_bar_calculate, 100);
    }
}

//FOURTH PROCESSS
var a4_timer_id_pack_stats_calculate;
function RTP_Calculate(costToOpen, items) {
    // Calculate expected value for each item
    const expectedValues = items.map(item => item.probability * item.value);

    // Sum up the expected values
    const totalExpectedValue = expectedValues.reduce((acc, curr) => acc + curr, 0);

    // Calculate RTP
    const rtp = (totalExpectedValue / costToOpen);
    return rtp;
}

function a4_start_pack_stats_calculate() {

    //    console.log("a4_start_pack_stats_calculate start");
    a4_pack_stats_show(false);
    myStatus.a4_option_pack_stats_running = true;
    const dialog_headers = document.querySelectorAll("section[role=dialog]>header");
    //    console.log("dialog_headers:" + dialog_headers.length);
    if (dialog_headers.length == 1 && dialog_headers[0].textContent.includes("$") && dialog_headers[0].textContent.includes("Cart ") == false) {
        let dialog_found = dialog_headers[0].parentElement;
        process_dialog_found(dialog_found);

    } else if (dialog_headers.length == 2) {
        dialog_headers.forEach(header => {
            if (header.textContent.includes("$") && dialog_headers[0].textContent.includes("Cart ") == false) {
                let dialog_found = header.parentElement;
                process_dialog_found(dialog_found);
            }
        });
    } else {
        const title_usd = document.querySelector(".css-1uvhj0q")?.innerText || "";
        //    console.log("title_usd:" + title_usd);
        const direct_pack_found = document.querySelector("div[class=\"chakra-container css-4k4dvr\"]");
        //    console.log("direct_pack_found:" + direct_pack_found);
        if (direct_pack_found && title_usd.includes("$")) {
            a4_pack_stats_show(true);
            if (direct_pack_found.getAttribute("found") != "true") {
                const local = sessionStorage.getItem("local");
                if (local && local == "SPLASH") {
                    //mark old data
                    // document.querySelector("div[class=\"chakra-container css-4k4dvr\"]").classList.add("saved");
                    splash_code(true);
                    const card2_body = document.querySelector("#card2 div.card-body");

                    card2_body.innerHTML = "";
                    const card2_head = document.querySelector("#card2 ul.menu");
                    card2_head.innerHTML = "";

                    direct_pack_found.setAttribute("found", "true");
                    setTimeout(show_datadirect, 1000);
                } else {
                    //div.chakra-stack>button.chakra-button
                    splash_code(false);
                    click_chakra_button("Deposit");
                    click_chakra_button("Login");
                    document.getElementById('splash_code').onclick = function () {
                        click_chakra_button("Deposit");
                        click_chakra_button("Login");
                    };
                }

            }
        } else {
            //pack_stats.className = 'd-hide';
            a4_pack_stats_show(false);
        }
    }

    if (myStatus.a4_option_pack_stats == true) {
        myStatus.a4_option_pack_stats_running == true;
        a4_timer_id_pack_stats_calculate = setTimeout(a4_start_pack_stats_calculate, 500);
    }

}
function process_dialog_found(dialog_found) {
    //    console.log("process_dialog_found 1");
    a4_pack_stats_show(true);
    const img_found = dialog_found?.querySelector("img");
    if (img_found && dialog_found.getAttribute("found") != "true") {
        const local = sessionStorage.getItem("local");
        if (local && local == "SPLASH") {
            //mark old data

            dialog_found.setAttribute("found", "true");
            splash_code(true);
            setTimeout(() => {
                show_datadialog(dialog_found);
            }, 1000);
        } else {
            //div.chakra-stack>button.chakra-button
            splash_code(false);
            click_chakra_button("Deposit");
            click_chakra_button("Login");
            document.getElementById('splash_code').onclick = function () {
                click_chakra_button("Deposit");
                click_chakra_button("Login");
            };
        }

    }
}
function show_datadialog(dialog_found) {

    //    console.log("show_datadialog 2");
    // pack_stats.className = '';
    a4_pack_stats_show(true);
    const list_items = dialog_found.querySelectorAll("div[id^=chakra-modal--body-]>div>div");
    const base_name = dialog_found.querySelector("header")?.firstChild?.textContent;
    const base_price = parseFloat((dialog_found.querySelector("header")?.lastChild?.textContent || "1")?.replace(/[$,]/g, ""));
    show_header(base_name, base_price, list_items.length);
    const default_key_value_dialog = JSON.parse(localStorage.getItem("key_value_dialog") || '{ "css-1ctu0iv": 0, "css-1kk1hmt": 0, "css-jzf6cd": 0, "css-1jyuj31": 0, "css-g07nwu": 0, "css-1wut6lp": 0 }');
    process_list_item(default_key_value_dialog, list_items, base_price, "key_value_dialog");
}
function show_header(base_name, base_price, count_items) {
    //    console.log("show_header 3");
    const card2_head = document.querySelector("#card2 ul.menu");
    var base_head_text = '<li class="menu-item" style=" text-align: center; font-weight: 900;font-size: 24px; "> <div > <div >SplashStats</div> </div> </li>';
    base_head_text += '<li class="menu-item" style=" font-size: 12px; font-weight: 700; color: #5B5E61;margin-top: 1px; "><a href="#menus">Name is</a> <div class="menu-badge"> <label  style=" color: #1da1f2 !important; ">' + base_name + '</label> </div> </li>';
    base_head_text += '<li class="menu-item" style=" font-size: 12px; font-weight: 700; color: #5B5E61;margin-top: 1px; "><a href="#menus">Price is</a> <div class="menu-badge"> <label style=" color: #1da1f2 !important; ">$' + base_price + '</label> </div> </li>';
    base_head_text += '<li class="menu-item" style=" font-size: 12px; font-weight: 700; color: #5B5E61;margin-top: 1px; "><a href="#menus">Total Items is</a> <div class="menu-badge"> <label style=" color: #1da1f2 !important; ">' + count_items + '</label> </div> </li>';
    card2_head.innerHTML = base_head_text;
}
function show_datadirect() {
    //    console.log("show_datadirect 4");
    // pack_stats.className = '';
    a4_pack_stats_show(true);
    const list_items = document.querySelectorAll("div[style*=\"transform: none;\"]>div");
    //    console.log("list_items:" + list_items.length);
    const base_titles = document.querySelector(".css-1uvhj0q")?.innerText.split(/\s-\s+/);
    //    console.log("base_titles:" + base_titles.innerHTML);
    const base_name = base_titles[0] || "Null";
    var base_price = 1;
    if (base_titles.length > 1) {
        base_price = parseFloat(base_titles[base_titles.length - 1].replace(/[$,]/g, ""))
    }
    show_header(base_name, base_price, list_items.length);
    const default_key_value_direct = JSON.parse(localStorage.getItem("key_value_direct") || '{ "css-pa0kop": 0, "css-1q8ykca": 0, "css-1e0ui6g": 0, "css-il1eu0": 0, "css-u6jzlu": 0, "css-1t1vy7e": 0 }');
    process_list_item(default_key_value_direct, list_items, base_price, "key_value_direct");
}
function process_list_item(default_key_value, list_items, base_price, base_name = "key_value_dialog") {
    //    console.log("process_list_item 5");
    const card2_body = document.querySelector("#card2 div.card-body");
    const key_value = {};
    var list_items_RTP = [];
    list_items.forEach((element, index) => {
        const array3items = element.innerText.split(/\n+/);
        if (array3items.length >= 3) {
            try {
                const item_percentage = parseFloat(array3items[0] || "1");
                const item_price = parseFloat((array3items[array3items.length - 1] || "1").replace(/[$,]/g, ""));
                list_items_RTP.push({ "probability": item_percentage, "value": item_price });
                // const calculate_price = item_price / base_price;
                const class_name = element.className;
                if (class_name) {
                    const old_value = key_value[class_name] || 0;
                    key_value[class_name] = old_value + item_percentage;
                }
            } catch (error) {
                alert("pareFloat error:" + element.innerText);
            }
        } else {
            document.title = "err:" + element.innerText;
        }
    });
    var last_value = 0, levels = [], html_array = [];
    // const colors = ["#FFD700;color:black;overflow-wrap: normal;font-size: large", "#FF0000;color:black;overflow-wrap: normal;font-size: large", "#FFC0CB;color:black;overflow-wrap: normal;font-size: large;color:black", "#800080;font-size: large;overflow-wrap: normal;color:black", "#0000FF;font-size: large;overflow-wrap: normal;color:black", "#808080;font-size: large;overflow-wrap: normal;"];
    const colors = ["background-image: linear-gradient(to right, #FDD506 , #FFB800);",
        "background-image: linear-gradient(to right, #FF3A3A , #D70707);",
        "background-image: linear-gradient(to right, #FF57D0 , #B430CA);",
        "background-image: linear-gradient(to right, #9006FD , #4D0F9B);",
        "background-image: linear-gradient(to right, #06EEFD , #00C2FF);",
        "background-image: linear-gradient(to right, #7D7D7D , #555555);"];
    const color_names = ["GOLD", "RED", "PINK", "PURPLE", "BLUE", "GRAY"];
    const last_index = colors.length;
    // console.log("key_value:" + JSON.stringify(key_value));
    const obj_keys = Object.keys(key_value);
    document.title = "colors:" + obj_keys.length;
    if (obj_keys.length < 6) {
        var null_key_index = 0;
        var null_keys = [];
        var null_positions = [];
        const obj_keys_default = Object.keys(default_key_value);
        obj_keys_default.forEach((d_key, d_index) => {
            if (key_value[d_key] == undefined) {
                null_keys.push(d_key);
                null_positions.push(d_index);
            }
        });
        for (let index = obj_keys.length; index < 6; index++) {
            obj_keys.splice(null_positions[null_key_index], 0, null_keys[null_key_index]);
            null_key_index++;
        }
    } else {

        var save_default_keys = {};
        obj_keys.forEach(element => {
            save_default_keys[element] = 0;
        });
        localStorage.setItem(base_name, JSON.stringify(save_default_keys));
    }
    for (let index = 0; index < last_index; index++) {
        const color = colors[index];
        const color_name = color_names[index];
        const _key = obj_keys[index];
        const percent = key_value[_key] || 0;
        html_array.push('<div class="bar" style="height: 40px;margin-top: 5px"><div class="bar-item" style="width:' + (percent + 1) + '%;' + color + ';"></div><div style="position: absolute; width: 100%; text-align: center; padding-top: 8px; ">' + color_name + ' = ' + Number(percent).toFixed(2) + '%</div></div>');
    }
    card2_body.innerHTML = html_array.join("\n");
    // console.log(JSON.stringify(list_items_RTP));
    var rtp = RTP_Calculate(base_price, list_items_RTP).toFixed(2);
    const card2_head = document.querySelector("#card2 ul.menu");
    card2_head.innerHTML += '<li class="menu-item" style=" font-size: 12px; font-weight: 700; color: #5B5E61;margin-top: 1px; "><a href="#menus">RTP</a> <div class="menu-badge"> <label style=" color: #1da1f2 !important; ">' + rtp + '%</label> </div> </li>';
    // pack_stats.innerHTML += '\n<div class="bar" style="height: 3rem;"><div class="bar-item" style="width:' + rtp + '%;background:cyan;font-size: large;color:black"><br>RTP:' + rtp + '%</div></div>';

}


