<title>Crawl boorus for ID links</title>

<style>
a { text-decoration: none; }
</style>

<form action="<?php basename($_SERVER['SCRIPT_FILENAME']); ?>" method="get">
    URL: <input type="text" name="url" size="100" placeholder="http://"
                value="<?php echo isset($_GET['url']) ? $_GET['url'] : ''; ?>" />
<br />Pages to display: <input type="text" name="pids" size="6" placeholder="#"
                               value="<?php echo isset($_GET['pids']) ? $_GET['pids'] : ''; ?>" />
<br /><input type="submit" value="Crawl" />
</form>

<?php
$max_pages = isset($_GET['pids']) ? $_GET['pids'] : '';
$booru_URL = isset($_GET['url']) ? $_GET['url'] : '';
$booru_URL_domain = preg_replace('/(http:\/\/)([^\/]*)(.*&tags=.*)/i', '$2', $booru_URL);

function get_links($url_domain, $url, $page_number) {
    $input = @file_get_contents($url);
    $regex = "<a [^>]* href=(\"??)index.php.page.post&amp;s=view&amp;id=([^\" >]*?)\" >(.*)<\/a>";
    preg_match_all("/$regex/siU", $input, $matches);

    $matches2 = array();
    for ($i = 0; $i < count($matches[2]); $i++) {
        $matches2[$i + 1] = $matches[2][$i];
    }

    for ($i = 1; $i < 43; $i++) {
        $matches2[$i] = '<a href="http://' . $url_domain . '/index.php?page=post&s=view&id=' .
        $matches2[$i] . '">post #' . $matches2[$i] . '</a>';
    }

    echo "<pre>";
    echo str_replace('Array',
                     'Page #' . $page_number . ":",
                     str_replace(array('[',']','(',')'),
                                 '',
                                 str_replace(' => ','. ',print_r($matches2,true))));
    echo "</pre>";
}

for ($i = 0; $i < 42 * $max_pages; $i += 42) {
    $to_crawl = $booru_URL . "&pid=" . $i;
    get_links($booru_URL_domain, $to_crawl, ($i / 42) + 1);
}
?>
