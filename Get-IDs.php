<?php

$to_crawl = "*/index.php?page=post&s=list&tags=*";

function get_links($url) {
    $input = @file_get_contents($url);
    $regex = "<a[^>]*href=(\"??)index.php.page.post&amp;s=view&amp;id=([^\" >]*?)\" >(.*)<\/a>";
    preg_match_all("/$regex/siU", $input, $matches);

    echo "<pre>";
    print_r($matches[2]);
    echo "</pre>";
}

get_links($to_crawl);

?>
