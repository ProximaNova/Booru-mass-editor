// ==UserScript==
// @name		Booru Mass Editor
// @description	Quickly edit images on older versions of Gelbooru
// @version	1
// @author		usernam
// @include     http://*.booru.org/index.php?page=post&s=view&id=*
// @include     http://safebooru.org/index.php?page=post&s=view&id=*
// @include     http://rule34.xxx/index.php?page=post&s=view&id=*
// @include     http://xbooru.com/index.php?page=post&s=view&id=*
// @grant 		none 
// @noframes
// ==/UserScript==

var ID = window.location.href.replace(/^.*&id=/g, "").replace(/#$/g, "");
var sidebar = document.getElementById("tag_list").innerHTML;
var usernameStr = sidebar.substring(sidebar.lastIndexOf("          By: ") + 14, sidebar.lastIndexOf(" <br>\n          Size:"));
var imageStr = document.getElementById("image").src;
var imageExt = imageStr.replace(/^.*\./g, "").toUpperCase();
var scoreStr = document.getElementById("post-view").innerHTML.match(/<a id="psc">\d+<\/a>/g);
var myTags = document.getElementById("my-tags").innerHTML;
// Fixing "My Tags":
if (myTags.match(/+/g)) {
    var tagsRegex = /&amp;tags=.*?"/g;
    var tagsStr   = myTags.match(tagsRegex).replace(/&amp;tags=/g, "").replace(/"$/g, "");
    var tagsArray = tagsStr.split("+");
    for (i = 0; i < tagsArray.length; i++) {
        myTags = "<a href=\"index.php?page=post&amp;s=list&amp;tags=" +
                 tagsArray[i] +
                 "text\" id=\"t_" + 
                 tagsArray[i] +
                 "\" onclick=\"javascript:toggleTags('" +
                 tagsArray[i] +
                 "','tags','t_" +
                 tagsArray[i] +
                 "');return false;\">" +
                 tagsArray[i] +
                 "</a> "
    }
}

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
.replace(/          Rating.*\n/g, "")
.replace(/0 comment<a href="#" id="ci" onclick="showHideIgnored\(\d{1,},'ci'\); return false;"> \(0 hidden\)<\/a><br><br><br>/g, "")
.replace(/Don't like these ads\? Want em removed or want to donate to booru.org\? Check out our Patreon!/g, "")
.replace(/>Note history</g, "><")
.replace(/>Add note</g, "><")
.replace(/>Next</g, "><")
.replace(/>Previous</g, "><")
.replace(/>Next Post</g, "><")
.replace(/>Edit</g, "><")
.replace(/My Tags<br>/g, "<br>")
/*
Replacing:
*/
.replace(/div style="float\: left; margin\: 1em 0"/g, "div style='float: left;'")
.replace(/<br \/><p id="note-count">/g, "<p id='note-count'>")
.replace(/<td>\n.*<br>\n.*<input /g, "<td><div style='height:4px;'></div><input ")
.replace(/Recent Tags<br>\n.*?\n.*?<\/td>/g, "</td>")
.replace(/>Tag History<\/a>/g, ">Tag history</a> &bull; Vote: <a href='#' onclick=\"post_vote('" + ID + "', 'up')\">+</a> <a href='#' onclick=\"post_vote('" + ID+ "', 'down')\">-</a>")
.replace(/Previous Post<br>/g, "<br>")
.replace(/ id="image" onclick="Note.toggle\(\);" style="margin-right\: 70px;"/g, " id='image' onclick='Note.toggle();' style='max-width:800px; margin-right: 70px; position:relative; top:-7px;'")
.replace(/;}; return false;">Remove<\/a>/g, ";}; return false;\">Remove</a> &bull; ")
.replace(/>Keep<\/a>/g, ">Favorite</a> &bull; ")
.replace(/<input name="submit" value="Save changes" type="submit">/g, "<input style='position:relative;top:-80px;' name='submit' value='Save changes' type='submit'>")
.replace(/type="radio">Safe/g, "type='radio'>Safe (&larr;Rating)")
.replace(/ type="text">\n		<\/td><\/tr><tr><td>\n		<input name="parent"/g, " type='text'> (&larr;Title)<\/td><\/tr><tr><td><input name='parent'")
.replace(/ type="text">\n		<\/td><\/tr><tr><td><br>\n		<input name="next_post"/g, " type='text'> (&larr;Parent) (&darr;Source)</td></tr><tr><td><br><input style='display: none;' name='next_post'")
.replace(/Rating<br>/g, "<br>")
.replace(/          Id.*<br>/g, "File format: " + imageExt + "<br>")
.replace(/ \d+:\d+:\d+ <br>\n          By: /g, "<br>\n          By: ")
.replace(/          By: .*? <br>/g, "          By: <a href='index.php?page=account_profile&amp;uname=" + usernameStr + "usernam'>" + usernameStr + "</a><br>")
.replace(/          Score: \d+ <br>/g, "          Score: " + scoreStr + "<br>")

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

// Editing buttons:
document.getElementById("my-tags").innerHTML =
    "<button type='button' onclick='fnTagToSource()'><tt>filename tag &rarr; source</tt></button>" +
    " or <button type='button' onclick='fnTagToTitle()'><tt>filename tag &rarr; title</tt></button>"
function fnTagToSource() {
    var textarea = document.getElementById("tags");
    var filename = textarea.value.match(/\w+\.(jp?g|png|gif)/g)
    textarea.value = textarea.value.replace(filename, "").replace("bad_tag", "")
    document.getElementById("source").value = filename
}
function fnTagToTitle() {
    var textarea = document.getElementById("tags");
    var filename = textarea.value.match(/\w+\.(jp?g|png|gif)/g)
    textarea.value = textarea.value.replace(filename, "").replace("bad_tag", "")
    document.getElementById("title").value = filename
}
*/
