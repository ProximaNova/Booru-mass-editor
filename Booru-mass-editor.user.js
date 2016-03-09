// ==UserScript==
// @name		Booru Mass Editor
// @description	Quickly edit images on older versions of Gelbooru
// @version	5
// @author		usernam
// @include     http://*.booru.org/index.php?page=post&s=view&id=*
// @include     http://safebooru.org/index.php?page=post&s=view&id=*
// @include     http://xbooru.com/index.php?page=post&s=view&id=*
// @include     http://rule34.xxx/index.php?page=post&s=view&id=*
// @grant 		none 
// @noframes
// ==/UserScript==

var ID = window.location.href.replace(/^.*&id=/g, "").replace(/#$/g, "");
var score = document.getElementById("post-view").innerHTML.match(/<a id="psc">\d+<\/a>/g);
var sidebar = document.getElementById("tag_list").innerHTML;
var imageSrc = document.getElementById("image").src;
var imageSrcOneDir = imageSrc.substring(imageSrc.lastIndexOf("//") + 9, imageSrc.lastIndexOf("/"));
var imageSrcThumb = document.getElementById("image").src.replace(/img\.booru\.org/g, "thumbs.booru.org").replace(/\/\/images\//g, "/thumbnails//").replace(/\/\/\d+\//g, "//" + imageSrcOneDir + "/thumbnail_");
var imageSrcExt = imageSrc.replace(/^.*\./g, "").toUpperCase();
var imageSizeWandH = sidebar.substring(sidebar.lastIndexOf("          Size: ") + 16, sidebar.lastIndexOf(" <br>\n          Source: "));
var imageSizeWidth = Number(imageSizeWandH.replace(/x\d+/g, ""));
var imageSizeHeight = Number(imageSizeWandH.replace(/\d+x/g, ""));
var userName = sidebar.substring(sidebar.lastIndexOf("          By: ") + 14, sidebar.lastIndexOf(" <br>\n          Size:"));
var userCheckAnon = (userName !== 'Anonymous') ? "account_profile&amp;uname=" : "post&s=list&tags=user%3A"
var timeYMD = sidebar.substring(sidebar.lastIndexOf("          Posted: ") + 18, sidebar.lastIndexOf("          Posted: ") + 28)
var timeSpecific = sidebar.substring(sidebar.lastIndexOf("          Posted: ") + 29, sidebar.lastIndexOf(" <br>\n          By: "))
var parentID = document.getElementsByName("parent")[0].value;

// Improve title:
if (document.getElementById("tags").value.match(" ")) {
    document.getElementsByTagName("title")[0].innerHTML = document.getElementsByTagName("h2")[0].textContent + " - " + document.getElementById("tags").value.replace(/ /g, ", ").replace(/_/g, " ");
}

// Display parent if viewing child:
if (parentID !== "" && imageSizeWidth < 800) {
    document.getElementById("post-view").innerHTML = document.getElementById("post-view").innerHTML.replace(/<div class="sidebar">/g,
    "<div style='background: #f0f0f0; padding: 10px; text-align: center; border: 3px solid #dadada;'>This post has a <a href='index.php?page=post&amp;s=list&amp;tags=parent:" + parentID + "'><b>parent post</b></a>.</div><br><br><div class='sidebar'>")
}
// Notify that the image has been "resized" and it has a parent:
else if (parentID !== "" && imageSizeWidth > 800) {
    document.getElementById("post-view").innerHTML = document.getElementById("post-view").innerHTML.replace(/<div class="sidebar">/g,
    "<div style='background: #f0f0f0; padding: 10px; text-align: center; border: 3px solid #dadada;'>This post has a <a href='index.php?page=post&amp;s=list&amp;tags=parent:" + parentID + "'><b>parent post</b></a>.</div><br> \
    <div style='background: #f0f0f0; padding: 10px; text-align: center; border: 3px solid #dadada;'>This image has been \"resized\"; however, if you copy or save it then it will be the full sized version. Click to expand and contract.</div><br><br><div class='sidebar'>")
}
// FAIL:
// Notify that the image has been "resized" when there is a notification of child post(s):
else if (parentID !== "" && imageSizeWidth > 800 && document.body.innerHTML.match("<b>child posts</b>")) {
    document.getElementById("post-view").innerHTML = document.getElementById("post-view").innerHTML.replace(/<br><div class="sidebar">/g,
    "<div style='background: #f0f0f0; padding: 10px; text-align: center; border: 3px solid #dadada;'>This image has been \"resized\"; however, if you copy or save it then it will be the full sized version. Click to expand and contract.</div><br><br><div class='sidebar'>")
}
// Notify that the image has been "resized":
else if (parentID == "" && imageSizeWidth > 800) {
    document.getElementById("post-view").innerHTML = document.getElementById("post-view").innerHTML.replace(/<div class="sidebar">/g,
    "<div style='background: #f0f0f0; padding: 10px; text-align: center; border: 3px solid #dadada;'>This image has been \"resized\"; however, if you copy or save it then it will be the full sized version. Click to expand and contract.</div><br><br><div class='sidebar'>")
}

// Improving "#tag_list":
if (document.getElementById("tags").value.match(" ")) {
    for (i = 10; i < document.getElementById("tags").value.match(/ /g).length + 11; i++) {
        if (document.getElementsByTagName("a")[i].href.match(/_\(artist\)/g)) {
            document.getElementsByTagName("a")[i].style.color = "#A00";
        } else if (document.getElementsByTagName("a")[i].href.match(/_\(character\)/g)) {
            document.getElementsByTagName("a")[i].style.color = "#0A0";
        } else if (document.getElementsByTagName("a")[i].href.match(/_\(copyright\)/g)) {
            document.getElementsByTagName("a")[i].style.color = "#A0A";
        }
        document.getElementsByTagName("li")[i].innerHTML = document.getElementsByTagName("li")[i].innerHTML.replace(/<\/a> /g, "</a>&nbsp;");
    }
}

// Improving "#my-tags":
var getMyTagsText1 = document.getElementById("my-tags").textContent;
var getMyTagsText  = getMyTagsText1.substring(0, getMyTagsText1.length - 1);
function refreshMyTags(sep) {
    var getMyTagsAsArray = getMyTagsText.split(sep);
    var myTagsNew = "";
    for (i = 0; i < getMyTagsAsArray.length; i++) {
        var myTagsMatchCase1 = new RegExp(" " + getMyTagsAsArray[i] + " ", "gi");
        var myTagsMatchCase2 = new RegExp("^" + getMyTagsAsArray[i] + " ", "gi");
        var myTagsMatchCase3 = new RegExp(" " + getMyTagsAsArray[i] + "$", "gi");
        var myTagsBoldToggle =
        (document.getElementById("tags").value.match(myTagsMatchCase1)
        || document.getElementById("tags").value.match(myTagsMatchCase2)
        || document.getElementById("tags").value.match(myTagsMatchCase3))
        ?
            "if (this.style.fontWeight == 'bold') { \
                 this.style.fontWeight = 'normal' \
             } else { \
                 this.style.fontWeight = 'bold'; \
             }; \
             return false;\" style='font-weight:bold;'"
        :
            "return false;\""
        ;
        var myTagsHiddenTags =
        (getMyTagsAsArray[i].match(/.*?:.*?;.*?;/g))
        ?
            "style='display:none;' "
        :
            ""
        ;
        myTagsNew += "<a " +
                     myTagsHiddenTags +
                     "href=\"index.php?page=post&amp;s=list&amp;tags=" +
                     getMyTagsAsArray[i].toLowerCase() +
                     "\" id=\"t_" +
                     getMyTagsAsArray[i].toLowerCase() +
                     "\" onclick=\"javascript:toggleTags('" +
                     getMyTagsAsArray[i].toLowerCase() +
                     "','tags','t_" +
                     getMyTagsAsArray[i].toLowerCase() +
                     "');" +
                     myTagsBoldToggle +
                     ">"
                     +
                     getMyTagsAsArray[i]
                     +
                     "</a> "
    }
    document.getElementById("my-tags").innerHTML = myTagsNew;
}
if (getMyTagsText.match(/\+/g)) {
    refreshMyTags("+");
} else {
    refreshMyTags(" ");
}

document.body.innerHTML =
document.body.innerHTML
/*
Removing:
*/
.replace(/<b>Score<\/b>.*Report post.<\/a>/g, "")
.replace(/Rating.*<br>/g, "")
.replace(/Source<br>/g, "")
.replace(/Title<br>/g, "")
.replace(/Parent<br>/g, "")
.replace(/<br.*Posted on \d.* by  <a href="index.php\?page=account_profile&amp;uname=.*?">.*?<\/a>/g, "")
.replace(/ \| /g, "")
.replace(/<a href="index.php\?page=post&amp;s=view&amp;id=\d+"><\/a><br>/g, "")
.replace(/0 comment<a href="#" id="ci" onclick="showHideIgnored\(\d{1,},'ci'\); return false;"> \(0 hidden\)<\/a><br><br><br>/g, "")
.replace(/Don't like these ads\? Want em removed or want to donate to booru.org\? Check out our Patreon!/g, "")
.replace(/>Note history</g, "><")
.replace(/>Add note</g, "><")
.replace(/>Next</g, "><")
.replace(/>Previous</g, "><")
.replace(/>Next Post</g, "><")
.replace(/>Edit</g, "><")
.replace(/My Tags<br>/g, "<br>")
.replace(/          Posted: .* <br>/g, "")
.replace(/          Source:  <br>/g, "")
/*
Replacing:
*/
.replace(/div style="float\: left; margin\: 1em 0"/g, "div style='float: left;'")
.replace(/          Id.*<br>/g, "<u>File format:</u> " + imageSrcExt + "<br>")
.replace(/ \d+:\d+:\d+ <br>\n          By: /g, " (" + timeSpecific + ")<br>          By: ")
.replace(/          By: .*? <br>/g, "          <u>Uploader:</u> <a href='index.php?page=" + userCheckAnon + userName + "'>" + userName + "</a><br>on " + timeYMD + " (" + timeSpecific + ")" + "<br>")
.replace(/          Size.*<br>/g, "<u>Size:</u> " + imageSizeWidth + " <b style='font-size:7.5pt;position:relative;top:-1px;'>&times;</b> " + imageSizeHeight + " pixels<br>")
.replace(/          Source: /g, "          <u>Source:</u> ")
.replace(/          Score: \d+ <br>/g, "          <u>Score:</u> " + score + "<br>")
.replace(/ id="image" onclick="Note.toggle\(\);" style="margin-right\: 70px;"/g, " id='image' onclick=\"Note.toggle();if (this.style.maxWidth == '800px') {this.style.maxWidth = 'none';} else {this.style.maxWidth = '800px';}\" style='max-width:800px; margin-right:70px; position:relative; top:-7px;'")
.replace(/<br \/><p id="note-count">/g, "<p id='note-count'>")
.replace(/<td>\n.*<br>\n.*<input /g, "<td><div style='height:4px;'></div><input ")
.replace(/Recent Tags<br>\n.*?\n.*?<\/td>/g, "</td>")
.replace(/>Tag History<\/a>/g, ">Tag history</a> &bull; Vote: <a href='#' onclick=\"post_vote('" + ID + "', 'up')\">+</a> <a href='#' onclick=\"post_vote('" + ID + "', 'down')\">-</a>")
.replace(/Previous Post<br>/g, "<br>")
.replace(/;}; return false;">Remove<\/a>/g, ";}; return false;\">Remove</a> &bull; ")
.replace(/>Keep<\/a>/g, ">Favorite</a> &bull; ")
.replace(/<input name="submit" value="Save changes" type="submit">/g, "<input id='SubmitButton' style='position:relative;top:-80px;width:403px;height:100px;font-size:20pt;' name='submit' value='Save changes' type='submit'>")
.replace(/type="radio">Safe/g, "type='radio'>Safe (&larr;Rating)")
.replace(/ type="text">\n		<\/td><\/tr><tr><td>\n		<input name="parent"/g, " type='text'> (&larr;Title)<\/td><\/tr><tr><td><input name='parent'")
.replace(/ type="text">\n		<\/td><\/tr><tr><td><br>\n		<input name="next_post"/g, " type='text'> (&larr;Parent) (&darr;Source)</td></tr><tr><td><br><input style='display: none;' name='next_post'")
.replace(/<strong>Statistics<\/strong><br>/g, "<h5>Statistics</h5>")
//.replace(/<textarea id="tags"/g, "<textarea id='tags' autofocus")
;

// Remove "mass uploader" in feilds:
if (document.getElementById("title").value == "Booru mass uploader") {
    document.getElementById("title").value = "";
}
if (document.getElementById("source").value == "https://ibsearch.xxx" ||
document.getElementById("source").value == "http://ibsearch.i-forge.net/mass-upload" ||
document.getElementById("source").value == "Booru mass uploader") {
    document.getElementById("source").value = "";
}

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

// Remove the "tagme" tag if there is 10 other tags:
if (document.getElementById("tags").value.match(" ")) {
    if (document.getElementById("tags").value.match(/ tagme /g)
    || document.getElementById("tags").value.match(/^tagme /g)
    || document.getElementById("tags").value.match(/ tagme$/g)
    && document.getElementById("tags").value.match(/ /g).length >= 10) {
        replaceTags("tagme", " ", "", "");
    }

// Add the "tagme" tag based on user defined specifications:
    if (!(document.getElementById("tags").value.match(/ tagme /g)
    || document.getElementById("tags").value.match(/^tagme /g)
    || document.getElementById("tags").value.match(/ tagme$/g))
    && document.getElementById("my-tags").textContent.match(/tagmeif:lt.*;endif;/g)
    && document.getElementById("tags").value.match(/ /g).length <=
    Number(document.getElementById("my-tags").textContent.replace(/.*tagmeif:lt/g, "").replace(/;endif;.*/, ""))) {
        document.getElementById("tags").value = document.getElementById("tags").value + " tagme ";
    }
}

// Add resolution tags:
if (imageSizeWidth <= 500 && imageSizeHeight <= 500 && imageSrcExt !== "GIF") {
    addTags("lowres");
}
if (imageSizeWidth >= 1600 && imageSizeHeight >= 1200) {
    addTags("highres");
}
if (imageSizeWidth >= 3200 && imageSizeHeight >= 2400) {
    addTags("absurdres");
}
if (imageSizeWidth >= 10000 && imageSizeHeight >= 10000) {
    addTags("incredibly_absurdres");
}
if (imageSizeHeight > imageSizeWidth * 3) {
    addTags("tall_image");
}
if (imageSizeWidth == imageSizeHeight) {
    addTags("1:1_aspect_ratio");
}

// TAGGING OPERATIONS:
// Replace tags:
if (document.getElementById("my-tags").textContent.match(/re:.*;re;/g)) {
    var myTagsReplacing = true;
    var myTagsReplaceTag1 = document.getElementById("my-tags").textContent.replace(/.*re:/g, "").replace(/_with_.*/g, "");
    var myTagsReplaceTag2 = document.getElementById("my-tags").textContent.replace(/.*re:/g, "").replace(/.*_with_/g, "").replace(/;re;.*/g, "");
    replaceTags(myTagsReplaceTag1, " " + myTagsReplaceTag2 + " ", myTagsReplaceTag2 + " ", " " + myTagsReplaceTag2);
    var myTagsReplaceTagInfo = "<li>Replacing: <code>" + myTagsReplaceTag1 + "</code> &rarr;<br><code>" + myTagsReplaceTag2 + "</code></li>";
} else {
    var myTagsReplacing = false;
    var myTagsReplaceTagInfo = "";
}

// Add tags:
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
        var myTagsAddTagInfo = "<li>Adding: <code>" + myTagsAddTags.join(" ") + "</code></li>";
    } else {
        addTags(myTagsAddTags);
        var myTagsAddTagInfo = "<li>Adding: <code>" + myTagsAddTags + "</code></li>";
    }
} else {
    var myTagsAdding = false;
    var myTagsAddTagInfo = "";
}

// Remove tags:
if (document.getElementById("my-tags").textContent.match(/rm:.*;rm;/g)) {
    var myTagsRming = true;
    var myTagsRmTag = document.getElementById("my-tags").textContent.replace(/.*rm:/g, "").replace(/;rm;.*/g, "")
    if (myTagsRmTag.match("|")) {
        var myTagsRmTags = myTagsRmTag.split("|");
    } else {
        var myTagsRmTags = myTagsRmTag;
    }
    if (typeof(myTagsRmTags) == "object") {
        for (i = 0; i < myTagsRmTags.length; i++) {
            replaceTags(myTagsRmTags[i], " ", " ", " ")
        }
        var myTagsRmTagInfo = "<li>Removing: <code>" + myTagsRmTags.join(" ") + "</code></li>";
    } else {
        replaceTags(myTagsRmTags, " ", "", "")
        var myTagsRmTagInfo = "<li>Removing: <code>" + myTagsRmTags + "</code></li>";
    }
} else {
    var myTagsRming = false;
    var myTagsRmTagInfo = "";
}

// Move filename tags:
if (document.getElementById("tags").value.match(/[^ ]+\.(jpe?g|png|gif)/g)) {
    document.getElementById("source").value = document.getElementById("tags").value.match(/[^ ]+\.(jpe?g|png|gif)/g);
    document.getElementById("tags").value = document.getElementById("tags").value.replace(/ ?(\.+)?[^ ]+\.(jpe?g|png|gif) ?/g, " ");
}

// Move UNIX timestamp:
if (document.getElementById("tags").value.match(/^\d{13}/g)) {
    document.getElementById("source").value = document.getElementById("tags").value.match(/\d{13}/g);
    document.getElementById("tags").value = document.getElementById("tags").value.replace(/\d{13} /g, "");
}

// "  " ---> " "
document.getElementById("tags").value = document.getElementById("tags").value.replace(/  /g, " ");

// Hiding:
document.getElementById("previous_post").style.display = "none";
document.getElementById("next_post").style.display = "none";

// Unhiding:
document.getElementById("edit_form").style.display = "block";

// Positioning:
document.getElementById("source").style.position = "relative";
document.getElementById("source").style.top = "-40px";
document.getElementById("tags").style.position = "relative";
document.getElementById("tags").style.top = "-55px";
document.getElementById("my-tags").style.position = "relative";
document.getElementById("my-tags").style.top = "-72px";

document.getElementById("tags").addEventListener("keyup", function(e) {
    if (getMyTagsText.match(/\+/g)) {
        refreshMyTags("+");
    } else {
        refreshMyTags(" ");
    }
});
window.addEventListener("load", function(e) {
    if (getMyTagsText.match(/\+/g)) {
        refreshMyTags("+");
    } else {
        refreshMyTags(" ");
    }
});

var reverseSearch = document.createElement("ul");
reverseSearch.style.cssText = "max-width:20em;position:relative;bottom:125px;";
reverseSearch.innerHTML =
"<h5>Reverse search</h5> \
<li><a href='http://iqdb.org/?url=" + imageSrc + "'>iqdb</a> (for anime images)</li> \
<li><a href='http://www.google.com/searchbyimage?image_url=" + imageSrc + "'>Google</a> (for general images)</li>";
document.getElementById("tag_list").appendChild(reverseSearch);

var myTagsEdit1 = document.createElement("h5");
myTagsEdit1.style.cssText = "max-width:20em;position:relative;bottom:125px;";
myTagsEdit1.innerHTML =
"My Tags";
document.getElementById("tag_list").appendChild(myTagsEdit1);

var myTagsEdit2 = document.createElement("textarea");
myTagsEdit2.setAttribute("id", "MyTagsEdit");
myTagsEdit2.style.cssText = "max-width:20em;position:relative;bottom:120px;";
myTagsEdit2.innerHTML = readCookie("tags").split(" ").join(" ");
document.getElementById("tag_list").appendChild(myTagsEdit2);
var MyTagsEditVal = document.getElementById('MyTagsEdit').value;

var myTagsEdit3 = document.createElement("input");
myTagsEdit3.setAttribute("type", "submit");
myTagsEdit3.setAttribute("onclick", "document.cookie='tags=" + MyTagsEditVal + "'"); 
myTagsEdit3.style.cssText = "max-width:20em;position:relative;bottom:120px;display:block;";
myTagsEdit3.value = "Edit my tags";
document.getElementById("tag_list").appendChild(myTagsEdit3);

if (myTagsReplacing == true || myTagsAdding == true || myTagsRming == true) {
    var tagsMods = document.createElement("ul");
    tagsMods.style.cssText = "max-width:20em;position:relative;bottom:105px;";
    tagsMods.innerHTML =
    "<h5>Tagging operations</h5>" +
    myTagsReplaceTagInfo +
    myTagsAddTagInfo +
    myTagsRmTagInfo;
    document.getElementById("tag_list").appendChild(tagsMods);
}

/*
// Fail:
// There is only sequence here but it is causing a loop--maybe there is repetitive bits in the initMouseEvent method
// Or maybe initMouseEvent executes around 16 times each time submitting the form:
// <thanks to="http://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript">
function simulate(element)
{
    var oEvent = document.createEvent('MouseEvents');
    oEvent.initMouseEvent("click", true, true, document.defaultView,
    0, 0, 0, 0, 0, false, false, false, false, 0, element);
    element.dispatchEvent(oEvent);
    
}
// </thanks> 
simulate(document.getElementById("SubmitButton"));
*/

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

// From: http://www.arantius.com/misc/greasemonkey/linkify-plus.user.js
// This should works on the whole booru but only works on the &id part:
// ==UserScript==
// @name        Linkify Plus
// @version     3.2
// @namespace   http://arantius.com/misc/greasemonkey/
// @description Turn plain text URLs into links.	Supports http, https, ftp, email addresses.
// @include     http://*.booru.org/*
// @grant       none
// ==/UserScript==
//
// Copyright (c) 2011, Anthony Lieuallen
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
// * Neither the name of Anthony Lieuallen nor the names of its contributors
//   may be used to endorse or promote products derived from this software
//   without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//

/*******************************************************************************
Loosely based on the Linkify script located at:
  http://downloads.mozdev.org/greasemonkey/linkify.user.js

Version history:
 Version 3.2 (Oct 30, 2015):
  - Don't break when `.className` has no `.match` (<svg>).
 Version 3.1 (Aug 23, 2015):
  - Remove unnecessary debug logs.
 Version 3 (Jul 31, 2015):
  - Switch from event listener to mutation observer.
 Version 2.1.4 (Aug 12, 2012):
  - Bug fix for when (only some) nodes have been removed from the document.
 Version 2.1.3 (Oct 24, 2011):
  - More excludes.
 Version 2.1.2:
  - Some bug fixes.
 Version 2.1.1:
  - Ignore certain "highlighter" script containers.
 Version 2.1:
  - Rewrite the regular expression to be more readable.
  - Fix trailing "." characters.
 Version 2.0.3:
  - Fix infinite recursion on X(HT)ML pages.
 Version 2.0.2:
  - Limit @include, for greater site/plugin compatibility.
 Version 2.0.1:
  - Fix aberrant 'mailto:' where it does not belong.
 Version 2.0:
  - Apply incrementally, so the browser does not hang on large pages.
  - Continually apply to new content added to the page (i.e. AJAX).
 Version 1.1.4:
  - Basic "don't screw up xml pretty printing" exception case
 Version 1.1.3:
  - Include "+" in the username of email addresses.
 Version 1.1.2:
  - Include "." in the username of email addresses.
 Version 1.1:
  - Fixed a big that caused the first link in a piece of text to
    be skipped (i.e. not linkified).
*******************************************************************************/

var notInTags = [
	  'a', 'code', 'head', 'noscript', 'option', 'script', 'style',
	  'title', 'textarea'];
var textNodeXpath =
  	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
//  - http://www.regular-expressions.info/regexbuddy/email.html
var urlRE = new RegExp(
    '('
    // leading scheme:// or "www."
    + '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    // everything until non-URL character
    + '[^\\s\'"<>()]+'
    + '|'
    // email
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b'
    + ')', 'gi');
var queue = [];

/******************************************************************************/

linkifyContainer(document.body);
(new MutationObserver(function(mutations) {
  for (var i = 0, mutation = null; mutation = mutations[i]; i++) {
    linkifyContainer(mutation.target);
  }
})).observe(
    document.body,
    {childList: true, subtree: true, characterData: true}
    );

/******************************************************************************/

function linkifyContainer(container) {
	// Prevent infinite recursion, in case X(HT)ML documents with namespaces
	// break the XPath's attempt to do so.	(Don't evaluate spans we put our
	// classname into.)
	if (container.className && container.className.match
	    && container.className.match(/\blinkifyplus\b/)) {
	  return;
	}

	var xpathResult = document.evaluate(
		  textNodeXpath, container, null,
		  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = 0;
	function continuation() {
		var node = null, counter = 0;
		while (node = xpathResult.snapshotItem(i++)) {
		  var parent = node.parentNode;
		  if (!parent) continue;

		  // Skip styled <pre> -- often highlighted by script.
		  if ('PRE' == parent.tagName && parent.className) continue;

			linkifyTextNode(node);

			if (++counter > 50) {
				return setTimeout(continuation, 0);
			}
		}
	}
	setTimeout(continuation, 0);
}

function linkifyTextNode(node) {
	var i, l, m;
	var txt = node.textContent;
	var span = null;
	var p = 0;
	while (m = urlRE.exec(txt)) {
		if (null == span) {
			// Create a span to hold the new text with links in it.
			span = document.createElement('span');
			span.className = 'linkifyplus';
		}

		//get the link without trailing dots
		l = m[0].replace(/\.*$/, '');
		var lLen = l.length;
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		a = document.createElement('a');
		a.className = 'linkifyplus';
		a.appendChild(document.createTextNode(l));
		if (l.indexOf(":/") < 0) {
			if (l.indexOf("@") > 0) {
				l = "mailto:" + l;
			} else {
				l = "http://" + l;
		  }
		}
		a.setAttribute('href', l);
		span.appendChild(a);
		//track insertion point
		p = m.index+lLen;
	}
	if (span) {
		//take the text after the last link
		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
		//replace the original text with the new span
		try {
			node.parentNode.replaceChild(span, node);
		} catch (e) {
			console.error(e);
			console.log(node);
		}
	}
}
