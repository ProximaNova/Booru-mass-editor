<title>Crawl boorus for ID links</title>

<style> a { text-decoration: none; } </style>

<form action="<?php basename($_SERVER['SCRIPT_FILENAME']); ?>" method="get">
    URL: <input type="text" id="url" size="100" placeholder="http://"
                value="<?php echo isset($_GET['domain'])
                                  ? 
                                      'http://' . $_GET['domain'] .
                                      '/index.php?page=post&s=list&tags=' .
                                      str_replace(" ", "+", $_GET['tags'])
                                  :
                                      ''
                                  ; ?>" />

<!-- <URL-parameters order="domain, tags, pids"> -->
<!-- <HIDDEN> -->
<input type="text" name="domain" id="domain" value="" style="display:none;" />
<input type="text" name="tags" id="tags" value="" style="display:none;"	 />
<!-- </HIDDEN> -->

<br />Pages to display: <input type="text" name="pids" size="6" placeholder="#"
                               value="<?php echo isset($_GET['pids'])
                                                 ?
                                                     $_GET['pids']
                                                 :
                                                     ''
                                                 ; ?>" />
<!-- </URL-parameters> -->
<br /><input type="submit" id="submit" value="Crawl" />
<!--<input type="button" value="Open links" onclick="open_urls()" />-->
</form>

<script>
document.getElementById("submit").addEventListener("click", function() {
    document.getElementById("domain").value =
        document.getElementById("url").value.replace(/http:\/\//g, "")
                                            .replace(/\/.*/g, "");
    document.getElementById("tags").value =
        document.getElementById("url").value.replace(/http:.*&tags=/g, "")
                                            .replace(/\+/g, " ")
                                            .replace(/&pid=\d+/g, "");
});

/*
// Although the following code block works I am not including it for certain reasons:
function open_urls() {
    var urls = [], links = document.links;
	// Getting array of URLs
    for (i = 0; i < links.length; i++) {
		urls.push(links[i].href);
	}
	// Opening URLs in new tabs
	for (i = 0; i < urls.length; i++) {
        window.open(urls[i],"_blank");
    }
}
// This diff: thanks to https://www.youtube.com/watch?v=TVH1dTj34Ys and http://www.stackoverflow.com/questions/3871358/
// noinclude, long: http://www.stackoverflow.com/questions/3871358/get-all-the-href-attributes-of-a-web-site
*/
</script>

<?php
$max_pages = isset($_GET['pids']) ? $_GET['pids'] : '';
$booru_URL = isset($_GET['domain']) ? 'http://' . $_GET['domain'] .
                                      '/index.php?page=post&s=list&tags=' . $_GET['tags'] : '';
$booru_URL_domain = preg_replace('/(http:\/\/)([^\/]*)(.*&tags=.*)/i', '$2', $booru_URL);

function get_links($url_domain, $url, $page_number) {
    $input = @file_get_contents($url);
    $regex = "<a [^>]* href=(\"??)index.php.page.post&amp;s=view&amp;id=([^\" >]*?)\" >(.*)<\/a>";
    preg_match_all("/$regex/siU", $input, $matches);

    // Links on pages aren't always 42: getting 42 or less # for next loop
    $matches2 = array();
    for ($i = 0; $i < count($matches[2]); $i++) {
        $matches2[$i + 1] = $matches[2][$i];
    }

    // Converting /\d+/ numbers in indices to HTML links:
    for ($i = 1; $i < count($matches2) + 1; $i++) {
        $matches2[$i] = '<a href="http://' . $url_domain . '/index.php?page=post&s=view&id=' .
        $matches2[$i] . '">post #' . $matches2[$i] . '</a>';
    }

    // Output of links on pages:
    if (count($matches2) !== 0) {
        echo "<pre>";
        echo str_replace('Array',
                         'Page #' . $page_number . ":",
                         str_replace(array('[',']','(',')'),
                                     '',
                                     str_replace(' => ','. ',print_r($matches2,true))));
        echo "</pre>";
    }
}

for ($i = 0; $i < 42 * $max_pages; $i += 42) {
    $to_crawl = $booru_URL . "&pid=" . $i;
//    if ($i % 840 == 0) {
//        sleep(100);
//        get_links($booru_URL_domain, $to_crawl, ($i / 42) + 1);    
//    } else {
        get_links($booru_URL_domain, $to_crawl, ($i / 42) + 1);
//    }
}
?>
