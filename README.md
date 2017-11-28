# Node XRAY Scraper

CLI for [x-ray](https://www.npmjs.com/package/x-ray).<br>
Scrape clean JSON lists of links from webpages with a range of specificity.
Saves output of results.json in the same directory.

## Example queries

### 1. URL to scrape

``` shell
node xray google.com
          ^URL
```

### 2. Scope the link scraping to an id, class, or tag (example: .post)

```shell
$ node xray google.com div
                     ^SCOPE
$ node xray ycombinator.com .post
                          ^CSS BASED SCOPE
```

### 3. In scope: Id, class, or tag with wanted .text for link titles.

``` shell
$ node xray ycombinator.com .post 'h1 a' '.article-title'
                                ^CALIBRATE TITLE SOURCE
```

### 4. In scope: Class or id for elements with wanted href.

``` shell
$ node xray ycombinator.com .post 'h1 a' '.article-title'
                                       ^CALIBRATE HREF SOURCE
```

## Sample Output

``` shell
=======================================

Scraping for links at: google.com
Within element(s): a
... Received 2067 bytes of data.
Here's what I found:

=======================================

[Images]: http://www.google.com/imghp?hl=en&tab=wi
[Maps]: http://maps.google.com/maps?hl=en&tab=wl
[Play]: https://play.google.com/?hl=en&tab=w8
[YouTube]: http://www.youtube.com/?gl=US&tab=w1
[News]: http://news.google.com/nwshp?hl=en&tab=wn
[Gmail]: https://mail.google.com/mail/?tab=wm
[Drive]: https://drive.google.com/?tab=wo
[More »]: https://www.google.com/intl/en/options/
...
```
