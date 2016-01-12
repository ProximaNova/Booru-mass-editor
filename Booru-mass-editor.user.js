// ==UserScript==
// @name		Booru quick editor
// @description	Quickly edit image tags on your booru
// @version	1
// @author		usernam
// @include	http://rule34.xxx/index.php*
// @include	http://*.booru.org/index.php*
// @include 	http://gelbooru.com/index.php*
// @include	http://safebooru.org/index.php*
// @grant 		none 
// @noframes
// ==/UserScript==

// Replacing/hiding:
document.body.innerHTML =
document.body.innerHTML
.replace(/>Next Post</g, "><")
.replace(/>Previous Post</g, "><")
.replace(/My Tags<br>/g, "<br>")
.replace(/Recent Tags<br>\n.*?\n.*?<\/td>/g, "</td>")
.replace(/0 comment<a href="#" id="ci" onclick="showHideIgnored\(\d{1,},'ci'\); return false;"> \(0 hidden\)<\/a><br><br><br>/g, "")
.replace(/>Tag History</g, "><")
.replace(/>Note history</g, "><")
.replace(/>Add note</g, "><")
.replace(/ \| /g, "")
.replace(/>Next</g, "><")
.replace(/>Previous</g, "><")
.replace(/Posted on \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} by  <a href="index.php\?page=account_profile&amp;uname=.*?">.*?<\/a>/g, "")
.replace(/>Remove<\/a>/g, ">Remove</a> &bull; ")
.replace(/>Keep</g, ">Favorite<br><")
.replace(/>Edit</g, "><")
.replace(/<input name="submit" value="Save changes" type="submit">/g, "<input style='position:relative;top:-80px;' name='submit' value='Save changes' type='submit'>")
.replace(/Don't like these ads\? Want em removed or want to donate to booru.org\? Check out our Patreon!/g, "")
.replace(/<a href="index.php\?page=post&amp;s=view&amp;id=\d+"><\/a><br>/g, "")
.replace(/&gt;&gt;Respond/g, "")
.replace(/Source<br>/g, "")
.replace(/Title<br>/g, "")
.replace(/Parent<br>/g, "")
.replace(/type="radio">Safe/g, "type=\"radio\">Safe (&larr;Rating)")
.replace(/ type="text">\n		<\/td><\/tr><tr><td>\n		<input name="parent"/g, " type=\"text\"> (&larr;Title)<\/td><\/tr><tr><td><input name=\"parent\"")
.replace(/ type="text">\n		<\/td><\/tr><tr><td><br>\n		<input name="next_post"/g, " type=\"text\"> (&larr;Parent) (&darr;Source)</td></tr><tr><td><br><input style=\"display: none;\" name=\"next_post\"")
.replace(/Rating<br>/g, "<br>")
.replace(/<strong>Statistics.*\n.*Id.*\n.*Posted.*\n.*By\:/g, "<b>By:</b>")
.replace(/          Source:.*\n.*Rating.*\n.*Score.*?<br>/g, "")
.replace(/          Size\: /g, "          <b>Size:</b> ")
.replace(/">Report post.</g, "\"><");
document.getElementById("previous_post").style.display = "none";
document.getElementById("next_post").style.display = "none";
/*
For when <input type=submit> is hidden (enter pressed anywhere = submit form):
.replace(/	<html/g, "<html onkeydown='submit()'")
function submit {
    document.getElementById('edit_form').submit();
}
*/

// Unhiding
document.getElementById("edit_form").style.display = "block";

// Positioning:
document.getElementById("source").style.position = "relative";
document.getElementById("source").style.top = "-40px";
document.getElementById("tags").style.position = "relative";
document.getElementById("tags").style.top = "-55px";
document.getElementById("my-tags").style.position = "relative";
document.getElementById("my-tags").style.top = "-72px";



/* Editing buttons:
document.getElementById("my-tags").innerHTML =
    "<button type='button' onclick='fnTagToSource()'><tt>filenamez tag &rarr; source</tt></button>" +
    " or <button type='button' onclick='fnTagToTitle()'><tt>filenamez tag &rarr; title</tt></button>"
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
} */
