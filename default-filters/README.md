# bookmarklet to set up and apply default filters
this bookmarklet aims to make it easier to apply a pre-defined/saved set of filters to any works or bookmarks listing page on ao3, in a way that works both on mobile and desktop

## how to install
1. visit any of AO3's works or bookmarks listing page, like [the DCU works listing page](https://archiveofourown.org/tags/DCU/works), for instance
2. select all the filters that you want to set as saved filters, for example:
    1. to _Sort by_ "Bookmarks",
    2. to _Exclude_ everything with the "Not Rated" _Rating_,
    3. as well as the "Rape/Non-Con", "Underage", and "Creator Chose Not To Use Archive Warnings" _Warnings_, 
    4. "Dead Dove: Do Not Eat" in the _Other tags to exclude_,
    5. and have all the works with "English" as their _Language_
3. use the _Sort and Filter_ button to apply these filters
4. **add a browser bookmark** to the resulting works or bookmarks listing page
    1. most browsers have a :star: for this right next to the address bar that has a long line of text starting with something like "https://archiveofourown.org/..."
    2. some browsers have the :star: (sometimes with a :heavy_plus_sign:) hidden in the meatballs menu next to the address bar
    3. some browsers have the option to save a link/target as a bookmark in the menu that shows up when holding or right-clicking the button for another page of this particular works or bookmarks listing
5. open the form to **edit this new browser bookmark**
    1. some browsers allow you to do so by seleting the :star: again
    2. some browsers offer the option to edit a bookmark immediately after it has been created
    3. after locating the newly created bookmark in the listing with all the bookmarks saved on this browser, a menu that appears after holding or right-clicking or selecting the meatballs next to that bookmark may offer the option to edit that bookmark
6. make the following edits and save the changes:
    1. **change the name of the browser bookmark** to something that makes the purpose of this bookmark clear, like "ao3 saved filters"
    2. copy the following bit of code and paste it **at the very beginning of the bookmark URL**, before the "https://archiveofourown.org/...": `javascript:(function(){var%20urlWithFilters="`
    3. copy this string of code and paste it **at the very end of the bookmark URL**, there should be nothing that follows afterwards: `";if%20(urlWithFilters){blaaaaahhhh`
    4. for ease of access on desktop browsers, the bookmarklet should be placed in the _bookmarks toolbar_ if it's enabled in the browser, or otherwise directly in the _bookmarks menu_
7. and that's the setup all done!

## alternate way to install
1. create a new, blank bookmark
2. give it a snappy name like "ao3 saved filters"
3. copy the entire code [from this file](https://raw.githubusercontent.com/RhineCloud/ao3-bookmarklets/main/default-filters/ao3-saved-filters-blank.js) and paste it as the bookmark's URL
4. visit any of AO3's works or bookmarks listing page, like [the DCU works listing page](https://archiveofourown.org/tags/DCU/works), for instance
5. select all the filters that you want to set as saved filters, for example:
    1. to _Sort by_ "Bookmarks",
    2. to _Exclude_ everything with the "Not Rated" _Rating_,
    3. as well as the "Rape/Non-Con", "Underage", and "Creator Chose Not To Use Archive Warnings" _Warnings_, 
    4. "Dead Dove: Do Not Eat" in the _Other tags to exclude_,
    5. and have all the works with "English" as their _Language_
6. use the _Sort and Filter_ button to apply these filters
7. copy the URL of the resulting listing from the address bar
8. paste this URL between the pair of quotation marks `""` that come right after `javascript:(function(){var%20urlWithFilters=` at the beginning of the code in the bookmark's URL
9. save the bookmark at an easily accessible location, like the bookmarks toolbar or the bookmarks menu
10. done!

## how to use on mobile
1. be on any works or bookmarks listing page you want to apply the saved filters to
2. open the search/address bar
3. start to enter the name of your saved filters bookmarklet
4. the browser should be able to find the saved filters bookmark as you enter its name
5. select that bookmark
6. watch the magic happen :sparkles:

## how to use on desktop
1. be on any works or bookmarks listing page you want to apply the saved filters to
2. locate your saved filters bookmarklet
3. select said bookmarklet
4. and there's tha magic :sparkles:
