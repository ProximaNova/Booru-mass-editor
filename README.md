# Booru mass editor
Use this script to quickly edit individual images at websites runing older versions of Gelbooru. It imporves the interface at `index.php?page=post&s=view&id=#`.

Functionality (it works best on Firefox):
* It works the best on Gelbooru Beta 0.1.11: what most hostnames (*.example.com) on booru.org use.
* It sort of works on Gelbooru Beta 0.2.
* It doesn't work at all on Gelbooru Beta 0.2.0 or Gelbooru Beta 0.2.5.

It is not really a problem that this script only works on older versions of Gelbooru:
* Gelbooru version Beta 0.1.11"
 * Users could post images with no tags resulting in the images having the "tagme" tag
 * Many boorus have vast image dumps with no tags (for example, 80% images at [meme.booru.org](http://meme.booru.org/index.php?page=forum&s=list) have no tags (out of 30,000 images total))
 * Thus, many boorus really need to be tagged
* Gelbooru versions equal to or greater than "Beta 0.2":
 * The software forces users to have at least 4 tags
 * The software is not free so the popularity of the booru has to pay for the software's cost
 * Basically they mainly contain popular content that is very well tagged so there is not really a reason to worry about this not working for the newer Gelbooru software. (Also at Gebooru.com tags can only be submitted between annoyingly long intervals of time, so it is impossible to bulk edit, that is, submit changes just when the page loads.)

## Editing upgrades

Add these tags at the ID page or Account > Options > My Tags (no one or more of the same tag(s) should be in "My Tags"):
* To change the rating add: `r:s;r;` (changes the rating to `safe`)
* To replace tags add: `re:bad_tag1_>_good_tag1|re:bt1_>_bt1|re:bt2_>_gt2;re;` or `re:bad_tag_>_good_tag;re;` (only replaces one tag)
* To add tags add: `add:x|y|z;add;` (adds tags `x`, `y`, and `z`) or `add:x;add;` (only adds `x`)
* To remove tags add: `rm:x|y|z;rm;` (removes tags `x`, `y`, and `z`) or `rm:x;rm;` (only removes `x`)
* To add the "tagme" tag if an image has less than a certain amount of tags add: `tagmeif:lt#;endif;` where `#` is, examples: `tagmeif:lt5;endif;` and `tagmeif:lt10;endif;`
* To submit the aforementioned changes when the page loads add: `op:onload;op;`; this bullet point is why this script is called a "mass editor": careful using this one. DO NOT add aliased tags because it will submit the form a bunch of times which results in duplicate tag history revisions.

## Post list improvements
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

## Future updates:
For newer versions of Gelbooru:
* Get the form to display automatically instead of having to click "Edit" to unhide it
* Autotag on page load for missing tag implications (see: http://danbooru.donmai.us/tag_implications)
* Other stuff: this script is not finished

## Issues

### Issues with this script on Gelbooru Beta 0.2 &rarr; `&id=` pages ([source](https://github.com/ProximaNova/Booru-mass-editor/commits/master)):

* b22dbe69a2311655624a1f76c43658a959c90605
* 2384dd00dfaf81aa39eb3a7396a7d1f2ee54fb59
* 1ee7c78534c1de7a525aaad2f603ed46bd668c2f

### Issues then notes with the post list improver
* https://github.com/ProximaNova/Booru-Augmentation-Project/commit/1e2b865901fc6c8588d70e24c9bb47fae2bb90a8
* https://github.com/ProximaNova/Booru-Augmentation-Project/commit/9b759151b9a3b2abb179dfe08a8e59aeaf3522ee
* https://github.com/ProximaNova/Booru-Augmentation-Project/commit/addbdf98b1184fc348ebf1719e126483d62b9f65

## See also
Seedmanc's userscripts:
* [Booru mass uploader](https://github.com/Seedmanc/Booru-mass-uploader)
* [Booru Augmentation Project](https://github.com/Seedmanc/Booru-Augmentation-Project) ([my fork](https://github.com/ProximaNova/Booru-Augmentation-Project))
