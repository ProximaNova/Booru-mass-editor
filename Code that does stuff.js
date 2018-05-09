// Delete 0 comments statement

let e = document.getElementById('ci');
e.style.display = "none";
e.previousSibling.textContent = '';
e.nextSiblings().forEach(function(node,index) {
if (index < 3) node.remove();
});


///////////////////////// Integration breaks all code after it:
var isb = document.getElementsByTagName("input")[14]
isb.setAttribute("id", "SubmitButton");
isb.style.position = "relative";
isb.style.top = "-80px";
isb.style.width = "403px";
isb.style.height = "100px";
isb.style.fontSize = "20pt";
// Delete 0 comments statement
// = .replace(/0 comment<a href="#" id="ci" onclick="showHideIgnored\(\d{1,},'ci'\); return false;"> \(0 hidden\)<\/a><br><br><br>/g, "")
let commentsLink = document.getElementById('ci');
//if (commentsLink.innerHTML == "(0 hidden)" && commentsLink.previousSibling.textContent == "0 comment")
//{
  commentsLink.style.display = "none";
  commentsLink.previousSibling.textContent = '';
//}
commentsLink.nextSiblings().forEach(function(node,index) {
    if (index < 3) node.remove();
})
