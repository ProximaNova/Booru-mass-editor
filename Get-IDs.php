<title>Crawl boorus for ID links</title>

<style>
a { text-decoration: none; }
</style>

<form action="<?php basename($_SERVER['SCRIPT_FILENAME']); ?>" method="post">
    URL: <input type="text" name="BooruURL" size="100" /><br />
    Pages to display: <input type="text" name="MaxPages" size="6" /><br />
    <input type="submit" name="submit" value="Crawl" />
</form>

<?php
$max_pages = $_POST['MaxPages'];
$booru_URL = $_POST['BooruURL'];
$booru_URL_domain = preg_replace('/(http:\/\/)([^\/]*)(.*&tags=.*)/i', '$2', $booru_URL);

function get_links($url_domain, $url, $page_number) {
    $input = @file_get_contents($url);
    $regex = "<a [^>]* href=(\"??)index.php.page.post&amp;s=view&amp;id=([^\" >]*?)\" >(.*)<\/a>";
    preg_match_all("/$regex/siU", $input, $matches);

    for ($i = 0; $i < count($matches[2]); $i++) {
        $matches[2][$i] = '<a href="http://' . $url_domain . '/index.php?page=post&s=view&id=' .
        $matches[2][$i] . '">post #' . $matches[2][$i] . '</a>';
    }

    echo "<pre>";
    echo str_replace('Array',
                     'Page #' . $page_number . ":",
                     str_replace(array('(',')'),'',print_r($matches[2],true)));
    echo "</pre>";
}

for ($i = 0; $i < 42 * $max_pages; $i += 42) {
    $to_crawl = $booru_URL . "&pid=" . $i;
    get_links($booru_URL_domain, $to_crawl, ($i / 42) + 1);
}

?>
