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

/*
// Enter pressed anywhere = submit forum:
var insertScript = document.createElement("script");
var textarea = getElementById("tags")
insertScript.textContent = "\
document.textarea.addEventListener(onkeypress, function(e) { \
    if (e.which == 13) { \
        doument.getElementById('edit_form').submit(); \
    } \
});";
document.body.appendChild(insertScript);
*/

var ID = window.location.href.replace(/^.*&id=/g, "").replace(/#$/g, "");
var usernameRegex = /By\: usernam <br.*\n.*Size/g
var usernameStr = document.getElementById("tag_list").innerHTML.match(usernameRegex).replace(/By\: /g, "").replace(/ <br.*\n.*/g, "");
// var badMyTagsStr = toString(document.getElementById("my-tags").innerHTML)
// var badMyTagsSpecificStr = badMyTagsStr.substring(badMyTagsStr.lastIndexOf("")+1,badMyTagsStr.lastIndexOf(""));
var imageExt = document.getElementById("image").src.replace(/^.*\./g, "").toUpperCase();

// Delete text function (could be better):
function RegDel(a,b,c,d,e,f,g,h,i) {
    document.body.innerHTML = document.body.innerHTML
    .replace(a, "")
    .replace(b, "")
    .replace(c, "")
    .replace(d, "")
    .replace(e, "")
    .replace(f, "")
    .replace(g, "")
    .replace(h, "")
    .replace(i, "")
}
RegDel(
/0 comment<a href="#" id="ci" onclick="showHideIgnored\(\d{1,},'ci'\); return false;"> \(0 hidden\)<\/a><br><br><br>/g,
/Don't like these ads\? Want em removed or want to donate to booru.org\? Check out our Patreon!/g,
/<a href="index.php\?page=post&amp;s=view&amp;id=\d+"><\/a><br>/g,
/Source<br>/g,
/Title<br>/g,
/Parent<br>/g,
/ \| /g,
/<b>Score<\/b>.*Report post.<\/a>/g,
/<br.*Posted on \d.* by  <a href="index.php\?page=account_profile&amp;uname=.*?">.*?<\/a>/g
);

// Replacing and hiding:
document.body.innerHTML =
document.body.innerHTML
.replace(/div style="float\: left; margin\: 1em 0"/g, "div style='float: left;'")
.replace(/<br \/><p id="note-count">/g, "<p id='note-count'>")
.replace(/<td>\n.*<br>\n.*<input /g, "<td><div style='height:4px;'></div><input ")
.replace(/>Next Post</g, "><")
.replace(/Recent Tags<br>\n.*?\n.*?<\/td>/g, "</td>")
.replace(/>Tag History<\/a>/g, ">Tag history</a> &bull; Vote: <a href='#' onclick=\"post_vote('" + ID + "', 'up')\">+</a> <a href='#' onclick=\"post_vote('" + ID+ "', 'down')\">-</a>")
.replace(/>Note history</g, "><")
.replace(/>Add note</g, "><")
.replace(/>Next</g, "><")
.replace(/>Previous</g, "><")
.replace(/Previous Post<br>/g, "<br>")
.replace(/ id="image" onclick="Note.toggle\(\);" style="margin-right\: 70px;"/g, " id='image' onclick='Note.toggle();' style='max-width:800px; margin-right: 70px; position:relative; top:-7px;'")
.replace(/;}; return false;">Remove<\/a>/g, ";}; return false;\">Remove</a> &bull; ")
.replace(/>Keep<\/a>/g, ">Favorite</a> &bull; ")
.replace(/>Edit</g, "><")
.replace(/<input name="submit" value="Save changes" type="submit">/g, "<input style='position:relative;top:-80px;' name='submit' value='Save changes' type='submit'>")
.replace(/type="radio">Safe/g, "type='radio'>Safe (&larr;Rating)")
.replace(/ type="text">\n		<\/td><\/tr><tr><td>\n		<input name="parent"/g, " type='text'> (&larr;Title)<\/td><\/tr><tr><td><input name='parent'")
.replace(/ type="text">\n		<\/td><\/tr><tr><td><br>\n		<input name="next_post"/g, " type='text'> (&larr;Parent) (&darr;Source)</td></tr><tr><td><br><input style='display: none;' name='next_post'")
.replace(/Rating<br>/g, "<br>")
.replace(/          Id.*<br>/g, "File format: " + imageExt + "<br>")
.replace(/          Rating.*\n/g, "") // Use to display something else
.replace(/My Tags<br>/g, "<br>")
// document.getElementById("my-tags").innerHTML = document.getElementById("my-tags").innerHTML.replace(/\+/g, " ");
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



/* Editing buttons:
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
} */
