// ==UserScript==
// @name        implying
// @namespace   booru
// @include     http://placeholder-because-there-are-other-sites.com/*
// @include     http://rule34.xxx/index.php?page=post&s=view&id=*
// @version     1
// @grant       none
// ==/UserScript==

//document.getElementById("edit_form").innerHTML =
//    document.getElementById("edit_form").innerHTML.replace(/ value="Save changes" /g, " id='SubmitButton' value='Save changes' ");
document.getElementById("edit_form").style.display = "block";
document.getElementsByName("submit")[0].style.width = "403px";
document.getElementsByName("submit")[0].style.height = "100px";
document.getElementsByName("submit")[0].style.fontSize = "20pt";
document.getElementsByName("submit")[0].setAttribute("id", "SubmitButton");

function addTags(tagToAdd) {
    var addTagMatchCase1 = new RegExp(" " + tagToAdd + " ", "gi");
    var addTagMatchCase2 = new RegExp("^" + tagToAdd + " ", "gi");
    var addTagMatchCase3 = new RegExp(" " + tagToAdd + "$", "gi");
    if (!(document.getElementById("tags").value.match(addTagMatchCase1) ||
    document.getElementById("tags").value.match(addTagMatchCase2) ||
    document.getElementById("tags").value.match(addTagMatchCase3))) {
        document.getElementById("tags").value = document.getElementById("tags").value + " " + tagToAdd + " ";
    }
}

function replaceTags(tagToReplace, mc1to, mc2to, mc3to) {
    var replaceTagMatchCase1 = new RegExp(" " + tagToReplace + " ", "gi");
    var replaceTagMatchCase2 = new RegExp("^" + tagToReplace + " ", "gi");
    var replaceTagMatchCase3 = new RegExp(" " + tagToReplace + "$", "gi");
    if (document.getElementById("tags").value.match(replaceTagMatchCase1)) {
        document.getElementById("tags").value = document.getElementById("tags").value.replace(replaceTagMatchCase1, mc1to);
    }
    if (document.getElementById("tags").value.match(replaceTagMatchCase2)) {
        document.getElementById("tags").value = document.getElementById("tags").value.replace(replaceTagMatchCase2, mc2to);
    }
    if (document.getElementById("tags").value.match(replaceTagMatchCase3)) {
        document.getElementById("tags").value = document.getElementById("tags").value.replace(replaceTagMatchCase3, mc3to);
    }
}

if (document.getElementById("tags").value.match(" ")) {
    if (document.getElementById("my-tags").textContent.match(/tagmeif:lt\d+;endif;/g) &&
    document.getElementById("tags").value.match(/(^tagme | tagme | tagme$)/g) &&
    document.getElementById("tags").value.match(/ /g).length >= 10) {
        replaceTags("tagme", " ", "", "");
    }
} else {
//  11.2  Add it (based on ("#my-tags")):
    if (document.getElementById("my-tags").textContent.match(/tagmeif:lt\d+;endif;/g) &&
    document.getElementById("tags").value.match(/ /g).length <=
    Number(document.getElementById("my-tags").textContent.replace(/.*tagmeif:lt/g, "").replace(/;endif;.*/, ""))) {
        document.getElementById("tags").value = document.getElementById("tags").value + " tagme ";
    }
}

if (document.getElementById("my-tags").textContent.match(/add:.*;add;/g)) {
    var myTagsAdding = true;
    var myTagsAddTag = document.getElementById("my-tags").textContent.replace(/.*add:/g, "").replace(/;add;.*/g, "");
    if (myTagsAddTag.match("|")) {
        var myTagsAddTags = myTagsAddTag.split("|");
    } else {
        var myTagsAddTags = myTagsAddTag;
    }
    if (typeof(myTagsAddTags) == "object") {
        for (i = 0; i < myTagsAddTags.length; i++) {
            addTags(myTagsAddTags[i]);
        }
        var myTagsAddTagInfo = "<li><u>Adding:</u> <code>" + myTagsAddTags.join(" ") + "</code></li>";
    } else {
        addTags(myTagsAddTags);
        var myTagsAddTagInfo = "<li><u>Adding:</u> <code>" + myTagsAddTags + "</code></li>";
    }
}

function htmlDecode(input){
    var e = document.createElement('span');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}

function simulateClickSubmit(element)
{
    var oEvent = document.createEvent('MouseEvents');
    oEvent.initMouseEvent("click", true, true, document.defaultView,
    0, 0, 0, 0, 0, false, false, false, false, 0, element);
    element.dispatchEvent(oEvent);
}
if (document.getElementById("my-tags").textContent.match(/op:onload;op;/g)) {
    if (htmlDecode(document.getElementById("tags").innerHTML) !== document.getElementById("tags").value) {
        simulateClickSubmit(document.getElementById("SubmitButton"));
    }
}

// <thanks to="http://javascript.info/tutorial/onload-ondomcontentloaded">
window.addEventListener("load", function() {
    window.close();
});
// </thanks>
