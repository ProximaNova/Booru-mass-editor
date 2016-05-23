<title>Crawl boorus for ID links</title>

<style>
a { text-decoration: none; }
</style>

<?php

function get_links($url, $pageNumber) {
    $input = @file_get_contents($url);
    $regex = "<a [^>]* href=(\"??)index.php.page.post&amp;s=view&amp;id=([^\" >]*?)\" >(.*)<\/a>";
    preg_match_all("/$regex/siU", $input, $matches);

    for ($i = 0; $i < count($matches[2]); $i++) {
        $matches[2][$i] = '<a href="http://*/index.php?page=post&s=view&id=' . $matches[2][$i] .
        '">post #' . $matches[2][$i] . '</a>';
    }

    echo "<pre>";
    echo str_replace('Array','Page #' . $pageNumber,print_r($matches[2],true));//print_r($matches[2]);
    echo "</pre>";
}

for ($i = 0; $i < 84; $i += 42) {
    $to_crawl = "http://*/index.php?page=post&s=list&tags=*&pid=" . $i;
    get_links($to_crawl, ($i / 42) + 1);
}

?>
