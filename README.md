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

(For quicker editting at the newest version of Gelbooru get the form to display automatically instead of having to click "Edit" to unhide it.)

## Remove, add, and replace tags when the pags loads

Add these tags into Account > Options > My Tags (no one or more tags should be in both adition and subtraction):
* To replace tags add: `re:bad_tag1_with_good_tag1|re:bt1_with_bt1|re:bt2_with_gt2;re;` or `re:bad_tag_with_good_tag;re;` (only replaces one tag)
* To add tags add: `add:x|y|z;add;` (adds tags `x`, `y`, and `z`) or `add:x;add;` (only adds `x`)
* To remove tags add: `rm:x|y|z;rm;` (removes tags `x`, `y`, and `z`) or `rm:x;rm;` (only removes `x`)
* To add the "tagme" tag if an image has less than a certain amount of tags add: `tagmeif:lt#;endif;` where `#` is, examples: `tagmeif:lt5;endif;` and `tagmeif:lt10;endif;`

## See also
Seedmanc's userscripts:
* [Booru mass uploader](https://github.com/Seedmanc/Booru-mass-uploader)
* [Booru Augmentation Project](https://github.com/Seedmanc/Booru-Augmentation-Project)
