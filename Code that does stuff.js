// I need more comments in my code.

var parentID = document.getElementsByName("parent")[0].value;
 
 document.getElementsByTagName("h2")[0].style.display = "inline";
-document.getElementsByTagName("h2")[0].innerHTML += "&emsp;";
+document.getElementsByTagName("h2")[0].nextSibling.nodeValue = "\u2003\u2003"; // = "&emsp; in <h2>, but is 3 pixels wider"
 
 //  1.0  Improve $("title"):
 if (document.getElementById("tags").value.match(" ")) {
-    document.getElementsByTagName("title")[0].innerHTML = booruName + " - " +
+    document.getElementsByTagName("title")[0].childNodes[0].nodeValue = booruName + " - " +
     document.getElementById("tags").value.replace(/ /g, ", ").replace(/_/g, " ");
 }
 
@@ -319,9 +319,11 @@ if (document.getElementById("tags").value.match(" ")) {
             }
         }
 //  3.4  If the tag is only on one image then "1" will be colored red:
-        if (document.getElementsByTagName("li")[i - 2].innerHTML.match(/<\/a> 1<\/span>/g)) {
-            document.getElementsByTagName("li")[i - 2].innerHTML = document.getElementsByTagName("li")[i - 2].innerHTML
-            .replace(/<\/a> 1<\/span>/g, "</a> <span style='color:red;'>1</span></span>");
+        if (document.getElementsByTagName("li")[i - 2].childNodes[0].childNodes[2].nodeValue == " 1") {
+            var redStuff = document.createElement("span");
+            redStuff.setAttribute("style", "color:red;")
+            redStuff.appendChild(document.createTextNode(" 1"));
+            document.getElementsByTagName("li")[i - 2].childNodes[0].childNodes[2].replaceWith(redStuff);
         }
 //  3.5  Non breaking space between "? tag" and "#":
         document.getElementsByTagName("li")[i - 2].innerHTML = document.getElementsByTagName("li")[i - 2].innerHTML
