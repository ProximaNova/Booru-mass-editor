// ==UserScript==
// @name		Booru Mass Editor
// @description	Quickly edit images on older versions of Gelbooru
// @version	4
// @author		usernam
// @include     http://*.booru.org/index.php?page=post&s=view&id=*
// @include     http://safebooru.org/index.php?page=post&s=view&id=*
// @include     http://xbooru.com/index.php?page=post&s=view&id=*
// @include     http://rule34.xxx/index.php?page=post&s=view&id=*
// @grant 		none 
// @noframes
// ==/UserScript==

var ID = window.location.href.replace(/^.*&id=/g, "").replace(/#$/g, "");
var sidebar = document.getElementById("tag_list").innerHTML;
var tagList = sidebar.substring(sidebar.lastIndexOf("<h5>Tags</h5>\n		<ul>") + 20, sidebar.lastIndexOf("<strong>Statistics</strong>")).replace(/<\/a> /g, "</a>&nbsp;").replace(/"/g, "'");
var usernameStr = sidebar.substring(sidebar.lastIndexOf("          By: ") + 14, sidebar.lastIndexOf(" <br>\n          Size:"));
var imageStr = document.getElementById("image").src;
var imageTempStr = imageStr.substring(imageStr.lastIndexOf("//") + 9, imageStr.lastIndexOf("/"));
var imageThumbStr = document.getElementById("image").src.replace(/img\.booru\.org/g, "thumbs.booru.org").replace(/\/\/images\//g, "/thumbnails//").replace(/\/\/\d+\//g, "//" + imageTempStr + "/thumbnail_");
var imageExt = imageStr.replace(/^.*\./g, "").toUpperCase();
var scoreStr = document.getElementById("post-view").innerHTML.match(/<a id="psc">\d+<\/a>/g);
var timeSpecificStr = sidebar.substring(sidebar.lastIndexOf("          Posted: ") + 29, sidebar.lastIndexOf(" <br>\n          By: "))
var hostname = window.location.href.replace(/http:\/\//g, "").replace(/\.booru\.org.*/g, "");

document.getElementsByTagName("title")[0].innerHTML = hostname + " - " + document.getElementById("tags").value.replace(/ /g, ", ").replace(/_/g, " ");

// Fixing "My Tags":
var myTagsStr1 = document.getElementById("my-tags").textContent;
var myTagsStr  = myTagsStr1.substring(0, myTagsStr1.length - 1);
if (myTagsStr.match(/\+/g)) {
    var tagsArray = myTagsStr.split("+");
    var myTagsDiv = "";
    for (i = 0; i < tagsArray.length; i++) {
        var boldToggle = (document.getElementById("tags").value.match(" " + tagsArray[i]) || document.getElementById("tags").value.match(tagsArray[i] + " ")) ?
            "if (this.style.fontWeight == 'bold') {this.style.fontWeight = 'normal'} else {this.style.fontWeight = 'bold'};return false;\" style=\"font-weight:bold;\""
        :
            "return false;\""
        ;
        myTagsDiv += "<a href=\"index.php?page=post&amp;s=list&amp;tags=" +
                     tagsArray[i] +
                     "\" id=\"t_" +
                     tagsArray[i] +
                     "\" onclick=\"javascript:toggleTags('" +
                     tagsArray[i] +
                     "','tags','t_" +
                     tagsArray[i] +
                     "');" +
                     boldToggle +
                     ">"
                     +
                     tagsArray[i]
                     +
                     "</a> "
    }
} else {
    var tagsArray = myTagsStr.split(" ");
    var myTagsDiv = "";
    for (i = 0; i < tagsArray.length; i++) {
        var boldToggle = (document.getElementById("tags").value.match(" " + tagsArray[i]) || document.getElementById("tags").value.match(tagsArray[i] + " ")) ?
            "if (this.style.fontWeight == 'bold') {this.style.fontWeight = 'normal'} else {this.style.fontWeight = 'bold'};return false;\" style=\"font-weight:bold;\""
        :
            "return false;\""
        ;
        myTagsDiv += "<a href=\"index.php?page=post&amp;s=list&amp;tags=" +
                     tagsArray[i] +
                     "\" id=\"t_" +
                     tagsArray[i] +
                     "\" onclick=\"javascript:toggleTags('" +
                     tagsArray[i] +
                     "','tags','t_" +
                     tagsArray[i] +
                     "');" +
                     boldToggle +
                     ">"
                     +
                     tagsArray[i]
                     +
                     "</a> "
    }
}
document.getElementById("my-tags").innerHTML = myTagsDiv;

/*
Removing:
*/
document.body.innerHTML =
document.body.innerHTML
.replace(/<b>Score<\/b>.*Report post.<\/a>/g, "")
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
.replace(/          Source:  <br>/g, "")
/*
Replacing:
*/
.replace(/div style="float\: left; margin\: 1em 0"/g, "div style='float: left;'")
.replace(/<br \/><p id="note-count">/g, "<p id='note-count'>")
.replace(/<td>\n.*<br>\n.*<input /g, "<td><div style='height:4px;'></div><input ")
.replace(/Recent Tags<br>\n.*?\n.*?<\/td>/g, "</td>")
.replace(/>Tag History<\/a>/g, ">Tag history</a> &bull; Vote: <a href='#' onclick=\"post_vote('" + ID + "', 'up')\">+</a> <a href='#' onclick=\"post_vote('" + ID + "', 'down')\">-</a>")
.replace(/Previous Post<br>/g, "<br>")
.replace(/ id="image" onclick="Note.toggle\(\);" style="margin-right\: 70px;"/g, " id='image' onclick='Note.toggle();' style='max-width:800px; margin-right: 70px; position:relative; top:-7px;'")
.replace(/;}; return false;">Remove<\/a>/g, ";}; return false;\">Remove</a> &bull; ")
.replace(/>Keep<\/a>/g, ">Favorite</a> &bull; ")
.replace(/<input name="submit" value="Save changes" type="submit">/g, "<input style='position:relative;top:-80px;' name='submit' value='Save changes' type='submit'>")
.replace(/type="radio">Safe/g, "type='radio'>Safe (&larr;Rating)")
.replace(/ type="text">\n		<\/td><\/tr><tr><td>\n		<input name="parent"/g, " type='text'> (&larr;Title)<\/td><\/tr><tr><td><input name='parent'")
.replace(/ type="text">\n		<\/td><\/tr><tr><td><br>\n		<input name="next_post"/g, " type='text'> (&larr;Parent) (&darr;Source)</td></tr><tr><td><br><input style='display: none;' name='next_post'")
.replace(/Rating.*<br>/g, "Similar: <a href='http://iqdb.org/?url=" + imageThumbStr + "'>iqdb</a> (for anime images)<br>")
.replace(/          Id.*<br>/g, "File format: " + imageExt + "<br>")
.replace(/ \d+:\d+:\d+ <br>\n          By: /g, " (" + timeSpecificStr + ")<br>          By: ")
.replace(/          By: .*? <br>/g, "          Uploader: <a href='index.php?page=account_profile&amp;uname=" + usernameStr + "'>" + usernameStr + "</a><br>")
.replace(/          Score: \d+ <br>/g, "          Score: " + scoreStr + "<br>")
;
if (document.getElementById("tags").value.match(/\w+((-\w+)+)?\.(jp?g|png|gif)/g)) {
    document.getElementById("source").value = document.getElementById("tags").value.match(/\w+((-\w+)+)?-?\.(jpe?g|png|gif)/g)
}
if (document.getElementById("title").value.match(/Booru mass uploader/g)) {
    document.getElementById("title").value = "";
}
document.getElementById("tags").value = document.getElementById("tags").value.replace(/ ?\w+((-\w+)+)?-?\.(jpe?g|png|gif) ?/g, " ").replace(/ bad_tag /g, " ") + " ";
document.getElementById("tag_list").innerHTML = document.getElementById("tag_list").innerHTML.replace(/<ul>.*<strong>/g, tagList + "<strong>");

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

/* Fail:
// Submit form when enter is pressed in the textarea:
document.getElementById("tags").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        document.getElementById("edit_form").style.backgroundColor = "green";
        document.getElementById("edit_form").submit();
        document.forms[2].submit();
    }
});
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
