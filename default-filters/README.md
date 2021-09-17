# bookmarklet to set up and apply default filters
this bookmarklet aims to make it easier to apply a pre-defined/saved set of filters to any works or bookmarks listing page on ao3, in a way that works both on mobile and desktop

there's also [a more detailed guide with less technical stuff on ao3](https://archiveofourown.org/works/33825019) and [a series of tumblr posts with screenshots taken in chrome on android](https://rheincloud.tumblr.com/tagged/saved-filters-on-ao3)

## how to install
1. visit any of AO3's works or bookmarks listing page, like [the DCU bookmarks listing page](https://archiveofourown.org/tags/DCU/bookmarks) or [the works listing page of Yuletide 2020](https://archiveofourown.org/collections/yuletide2020/works); you can recognise those pages by their big heading that begins with something like "1 - 20 of 235 Works" in addition to the existence of the filters bar
2. if you're using a narrow screen, such as vertical/portrait mode on mobile devices, select the _Filters_ button to summon the filters bar
3. select all the filters that you want to set as saved filters, for example:
    - to _Sort by_ "Bookmarks",
    - to _Exclude_ everything with the "Not Rated" _Rating_,
    - as well as the "Rape/Non-Con", "Underage", and "Creator Chose Not To Use Archive Warnings" _Warnings_, 
    - "Dead Dove: Do Not Eat" in the _Other tags to exclude_,
    - and have all the works with "English" as their _Language_
4. use the _Sort and Filter_ button to apply these filters
5. **add a browser bookmark** to the resulting works or bookmarks listing page; different browsers do this differently, one of these should do the job:
    - most browsers have a :star: for this right next to the address bar at the top (or in some browser setups the bottom) of the screen (the address bar shows which page you're on, and when selected on the filtered page should appear as a long line of text, starting with something like "https://archiveofourown.org/..."
    - some browsers have the :star: (sometimes with a :heavy_plus_sign:) hidden in the meatballs menu (the one with the three dots) next to the address bar
    - some browsers have the option to save a link/target as a bookmark in the menu that shows up when holding or right-clicking a link; you can use this option on one of the buttons leading to a different page of this filtered listing at the top and the bottom of the page and save that as a bookmark
6. open the form to **edit this new browser bookmark**; depending on your browser one of these should work:
    - some browsers allow you to do so by seleting the :star: again
    - some browsers offer the option to edit a bookmark immediately after it has been created
    - in the screen that lists all of the browser's saved bookmarks, locate the newly created bookmark, and a menu that appears after holding or right-clicking or selecting the meatballs (three dots) next to that bookmark may offer the option to edit that bookmark
7. make the following edits and save the changes:
    1. **change the name of the browser bookmark** to something that makes the purpose of this bookmark clear, like "ao3 saved filters"
    2. copy the following bit of code and paste it **at the very beginning of the bookmark URL**, before the "https://archiveofourown.org/...": `javascript:(function(){const%20urlWithFilters="`
        1. to select the code on a mobile device, hold some part of the `code` until it marks/selects (part of) the snippet
        2. carefully move the beginning and end points to encompass the entire string that's formatted as `code`(including the quotation mark `"` or the semicolon `;` at the beginning/end), but no more than the `code`
        3. select _Copy_ in the menu that appears
        4. in the bookmark editing form, hold at the spot you want to insert the `code` into
        5. select _Paste_ in the menu that appears
    3. copy this string of code and paste it **at the very end of the bookmark URL**, there should be nothing that follows afterwards: `";if(urlWithFilters){const%20filterParams=new%20URL(urlWithFilters).searchParams;const%20page=window.location.pathname.slice(0,-1).split("/").pop().replace("s","");if(window.location.hostname=="archiveofourown.org"&&(page=="work"||page=="bookmark")){const filters=new%20URLSearchParams(window.location.search);for(let[key,value]of%20filterParams){if(value.length){if(!key.includes(page)&&(key.includes("clude_")||key.includes("lang")||(key.includes("sort_")&&(value=="revised_at"||value=="bookmarkable_date"))||(key.includes("_tag")&&!key.includes("mark_tag"))||(key.includes("query")&&!key.includes("mark_query")))){key=key.replace(/(work_search|bookmark_search)/,page+"_search");key=key.includes("bookmarkable_query")?key.replace("bookmarkable_",""):key.replace("query","bookmarkable_query");value=value=="revised_at"?"bookmarkable_date":value.replace("bookmarkable_date","revised_at");}if(!filters.getAll(key).includes(value)&&key.includes(page+"_search")){if(filters.get(key)==null||filters.get(key)==""||((key.includes("rec")||key.includes("_notes"))&&filters.get(key)==0)||(key.includes("sort_")&&(filters.get(key)=="revised_at"||(key.includes("mark_")&&filters.get(key)=="created_at")))){filters.set(key,value);}else%20if(!(key.startsWith(page)||(key.startsWith("include_")&&key.includes("rating_ids")))){filters.append(key,value);}else%20if(key.includes("_tag_names")){filters.set(key,filters.get(key)+","+value);}else%20if(key.includes("query")){filters.set(key,filters.get(key)+"%20"+value);}}}}if("?"+filters-toString()!=window.location.search){window.location.search=filters.toString();}}}})();`
    4. for ease of access on desktop browsers, the bookmarklet should be placed in the _bookmarks toolbar_ if it's enabled in the browser, or otherwise directly in the _bookmarks menu_
7. and that's the setup all done!

## alternate way to install (presumably on desktop)
1. select [the entire code from this file](https://raw.githubusercontent.com/RhineCloud/ao3-bookmarklets/main/default-filters/ao3-saved-filters-blank.js)
2. try to **drag it into your bookmarks toolbar** to create a new bookmark
3. **change the bookmark's name** to something like "ao3 saved filters"
4. if the above didn't work for you, do this instead:
    1. **create a new, blank bookmark**
    2. give it a snappy **name** like "ao3 saved filters"
    3. copy [the entire code from this file](https://raw.githubusercontent.com/RhineCloud/ao3-bookmarklets/main/default-filters/ao3-saved-filters-blank.js) and paste it as the **bookmark's URL**
5. visit any of **AO3's works or bookmarks listing page**, like [the DCU bookmarks listing page](https://archiveofourown.org/tags/DCU/bookmarks) or [the works listing page of Yuletide 2020](https://archiveofourown.org/collections/yuletide2020/works), for instance
6. **select all the filters** that you want to set as saved filters, for example:
    - to _Sort by_ "Bookmarks",
    - to _Exclude_ everything with the "Not Rated" _Rating_,
    - as well as the "Rape/Non-Con", "Underage", and "Creator Chose Not To Use Archive Warnings" _Warnings_, 
    - "Dead Dove: Do Not Eat" in the _Other tags to exclude_,
    - and have all the works with "English" as their _Language_
7. use the _Sort and Filter_ button to **apply these filters**
8. **copy the URL** of the resulting filtered listing from the address bar
9. **paste this URL** between the pair of quotation marks `""` that come right after `javascript:(function(){const%20urlWithFilters=` at the beginning of the code in the bookmark's URL field
10. **save the bookmarklet** at an easily accessible location, like the bookmarks toolbar or the bookmarks menu
11. done!

## how to use on mobile
1. be on **any works or bookmarks listing page** you want to apply the saved filters to
2. open the **search/address bar**
3. start to enter the **name of your saved filters bookmarklet**
4. the browser should be able to find the saved filters bookmarklet as you enter its name
5. **select that bookmarklet**
6. watch the magic happen :sparkles:

## how to use on desktop
1. be on **any works or bookmarks listing page** you want to apply the saved filters to
2. **locate your saved filters bookmarklet**
3. **select** said bookmarklet
4. and there's the magic :sparkles:

## more code stuff
if you're curious about what the code does, there's [a more readable version with comments giving short explanations on what different parts of the code do](https://github.com/RhineCloud/ao3-bookmarklets/blob/main/default-filters/ao3-saved-filters-readable.js) that you're welcome to check out

## all the filters on ao3
I was taking notes on all the fields that exist to be set as filters to work out some of the logic stuff, and as I'd like to keep them if I ever need to go through the code again, I figured might as well tack them on here (instead of inside the readable code version)
- `filter_name`: optional extra notes on said filter

- in both `work_search` and `bookmark_search`:
    - `include_`/`exclude_`: tags use their numeric id and not their name
        - `rating_ids`: the `include_` filter can only be set to one singular value
        - `warning_ids`
        - `category_ids`
        - `fandom_ids`
        - `character_ids`
        - `relationship_ids`
        - `freeform_ids`
    - others:
        - `sort_column`: (lolsob)
            - `work_search` values: **revised_at** (recently updated works first, default), authors_/title_to_sort_on (author/title name), created_at (oldest published first), word_/kudos_/comments_/bookmarks_count (most words/kudos/comments/bookmarks first), hits (most hits first)
            - `bookmark_search` values: **created_at** (recently created bookmarks first, default), bookmarkable_date (recently updated _works_ first)
        - `other_`/`excluded_`(`bookmarkable_`)`tag_names`: aka other (work) tags to include/exclude field; tags get separated with a comma ","
        - (`bookmarkable_`)`query`: aka search within results field; in this version tacked on with a space " " (or the "%20" in the actual bookmarklet, almost at the end of the code) ergo as an AND search; can probably be changed to two pipes "||" for an OR search? (not tested though)
        - `language_id`
- `work_search` only (aka more options):
    - `crossover`/`complete`
    - `words_from`/`_to`
    - `date_from`/`_to`
- `bookmark_search` only (bookmarker's tags/notes stuff):
    - `other_`/`excluded_bookmark_tag_names`
    - `bookmark_query`
    - `rec`/`with_notes`: 0 as the default value instead of empty/null
- other things in the search parameters of the url of a filtered page:
    - `utf8`
    - `commit`
    - `tag_`/`user_`/`pseud_`/`collection_id`
