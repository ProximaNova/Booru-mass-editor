# Booru mass editor

Use the Booru mass editor (BME) to quickly edit individual images at websites running Gelbooru software. BME also imporves the interface at `index.php?page=post&s=view&id=#` and elsewhere.

## Required additional software

To use BME you <i>must</i> have the following software:
* A web browser:
  * <b>Firefox</b> - BME works best in Mozilla Firefox.
  * <b>Chrome</b> (ew) - I haven't tested BME in Google Chrome in one or more years, so it probably will not work.
  * BME probably will not work in the following: Opera, Microsoft Edge, and Internet Explorer.
* A userscript add-on:
  * <b>Greasemonkey</b> for Firefox: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
  * <b>Tampermonkey</b> for Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
  * (I think a usercript add-on exists for Opera, but I don't know what it is called.)
  * (Does a userscript add-on exist for Microsoft Edge and Internet Explorer?)

## Required or highly recommended additional software

Add these types of add-ons to your web broswer:
* An add-on that only loads a tab when you select/view that tab
  * I use <b>LoadTabOnSelect</b>: https://addons.mozilla.org/en-US/firefox/addon/loadtabonselect/
* Optional, but very helpful: An add-on that opens multiple links after one click-and-drag
  * I use <b>Snap Links</b>: https://addons.mozilla.org/en-US/firefox/addon/snaplinksplus/
  * If you can run PHP files use this type of link opening software in conjunction with a booru crawler that I wrote: [GetIDs.php](https://github.com/ProximaNova/Booru-mass-editor/blob/master/GetIDs.php) (I don't know if GetIDs.php still works).

## How to use this software

### Functionality

BME will work on websites that run the following software:
* Gelbooru Beta 0.1.11: what most hostnames on booru.org use; BME works best on this variant of Gelbooru. ("Hostname" referes to the &#42; in &#42;.example.com; it is also called a "subdomain".)
* Gelbooru Beta 0.2 (more featuers planned to be added).
* Gelbooru Beta 0.2.0 or Gelbooru Beta 0.2.5 (more featuers planned to be added).

### Editing upgrades

Add these tags at the ID page or at Account > Options > My Tags (no one or more of the same tag(s) should be in "My Tags", use `&#44;` for commas in "My Tags", and don't add too much text because the data cookie can only hold two paragraphs max):
* To change the rating add: `r:s;r;` (changes the rating to `safe`)
* To replace tags add: `re:bad_tag1_>_good_tag1|re:bt1_>_bt1|re:bt2_>_gt2;re;` or `re:bad_tag_>_good_tag;re;` (only replaces one tag)
* To add tags add: `add:x|y|z;add;` (adds tags `x`, `y`, and `z`) or `add:x;add;` (only adds `x`)
* To remove tags add: `re:x_>_|y_>_|z_>_;re;` (removes tags `x`, `y`, and `z`) or `re:x_>_;re;` (only removes `x`)
* To add the "tagme" tag if an image has less than a certain amount of tags add: `tagmeif:lt#;endif;` where `#` is, examples: `tagmeif:lt5;endif;` and `tagmeif:lt10;endif;`
* To implicate tags use: `im:particular_>_general;im;` or `im:all_>_tag|implications_>_are|based_>_on|inductive_>_reasoning;im;` here is 268 pages of implications: http://danbooru.donmai.us/tag_implications
* To submit the aforementioned changes when the page loads add: `op:onload;op;`; this bullet point is why this script is called a "mass editor": careful using this one. DO NOT add aliased tags because it will submit the form a bunch of times which results in duplicate tag history revisions. For the script's functionality with a newer version, if Firefox, go to about:config to change `dom.allow_scripts_to_close_windows` to true so get it to work as it does on Google Chrome.

### Post list improvements

* [Keyboard shortcuts](http://danbooru.donmai.us/static/keyboard_shortcuts)
* Fix `'` in links: `%26%23039%3B` &rarr; `%27`
* Fix `"` in links: `%26quot%3B` &rarr; `%22`
* Hide adverts:
  * link with href matching: `https://www.patreon.com/booru`
  * `("#bottom")` (for the newer version)
  * `("#top")` (for the newer version)
* Compact view (done): switch on or off (future)
* Remove excess space at the bottom
* Improve `("#header")` and rearrange links to the blank `("#long-notice")` part
* Future:
  * Fix pagination
  * Pagination links length based on page width

## Future updates

For newer versions of Gelbooru:
* Get the form to display automatically instead of having to click "Edit" to unhide it - done, I think
* Other stuff: this script is not finished
* Regular expression replacements and removals at `&id=` pages

## Trends and information

The newer the software the more tags a booru has: 
* Gelbooru version Beta 0.1.11
  * Users could post images with no tags resulting in the images having the "tagme" tag
  * Many boorus have vast image dumps with no tags (for example, 80% images at [meme.booru.org](http://meme.booru.org/index.php?page=forum&s=list) have no tags (out of 30,000 images total))
  * Thus, many boorus really need to be tagged.
* Gelbooru versions equal to or greater than "Beta 0.2" (the newest version takes 15 seconds per page when mass tag editing):
  * The software forces users to have at least 4 tags
  * The software is not free so the popularity of the booru has to pay for the software's cost
  * Basically they mainly contain popular content that is very well tagged so add tags to boorus with older free (price = $0) Gelbooru software!

## See also

Seedmanc's userscripts:
* [Booru mass uploader](https://github.com/Seedmanc/Booru-mass-uploader)
* [Booru Augmentation Project](https://github.com/Seedmanc/Booru-Augmentation-Project) ([my fork](https://github.com/ProximaNova/Booru-Augmentation-Project))
