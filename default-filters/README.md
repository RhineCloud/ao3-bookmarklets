# bookmarklet to set up and apply default filters
this bookmarklet aims to make it easier to apply a pre-defined/saved set of filters to any works or bookmarks listing page on ao3, in a way that works both on mobile and desktop

## how to install
1. visit any of AO3's works or bookmarks listing page, like [the DCU works listing page](https://archiveofourown.org/tags/DCU/works), for instance
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
    2. copy the following bit of code and paste it **at the very beginning of the bookmark URL**, before the "https://archiveofourown.org/...": `javascript:(function(){var%20urlWithFilters="`
        1. to select the code on a mobile device, hold some part of the `code` until it marks/selects (part of) the snippet
        2. carefully move the beginning and end points to encompass the entire string that's formatted as `code`(including the quotation mark `"` or the semicolon `;` at the beginning/end), but no more than the `code`
        3. select _Copy_ in the menu that appears
        4. in the bookmark editing form, hold at the spot you want to insert the `code` into
        5. select _Paste_ in the menu that appears
    3. copy this string of code and paste it **at the very end of the bookmark URL**, there should be nothing that follows afterwards: `";if(urlWithFilters){urlWithFilters=urlWithFilters.replace(/\u00255B/g,"[");urlWithFilters=urlWithFilters.replace(/\u00255D/g,"]");var%20filters=urlWithFilters.trim().slice(urlWithFilters.indexOf("?")+1);if(filters.lastIndexOf("&")==filters.lastIndexOf("&",filters.indexOf("_id="))){filters=filters.slice(0,filters.lastIndexOf("&"));}else{filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("_id=")),filters.indexOf("&",filters.indexOf("_id="))),"");}filters=filters.replace(filters.slice(filters.indexOf("&page="),filters.indexOf("&",filters.indexOf("page="))),"");var%20currentUrl=new%20String(window.location);currentUrl=currentUrl.replace(/\u00255B/g,"[");currentUrl=currentUrl.replace(/\u00255D/g,"]");if(currentUrl.includes("/works")){if(filters.includes("[sort_column]=bookmarkable_date")){filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[sort_column]=")),filters.indexOf("&", filters.indexOf("[sort_column]="))),"");}filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[other_bookmark_tag_names]=")),filters.indexOf("&",filters.indexOf("[other_bookmark_tag_names]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[excluded_bookmark_tag_names]=")),filters.indexOf("&",filters.indexOf("[excluded_bookmark_tag_names]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[bookmark_query]=")),filters.indexOf("&",filters.indexOf("[bookmark_query]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[rec]=")),filters.indexOf("&",filters.indexOf("[rec]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[with_notes]=")),filters.indexOf("&",filters.indexOf("[with_notes]="))),"");filters=filters.replace(/\u0026bookmark/g, "&work");filters=filters.replace(/\u0026include\u005Fbookmark/g,"&include_work");filters=filters.replace(/\u0026exclude\u005Fbookmark/g,"&exclude_work");}else%20if(currentUrl.includes("/bookmarks")){if(!(filters.includes("[sort_column]=created_at")||filters.includes("[sort_column]=bookmarkable_date"))){filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[sort_column]=")),filters.indexOf("&",filters.indexOf("[sort_column]="))),"");}filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[crossover]=")),filters.indexOf("&",filters.indexOf("[crossover]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[complete]=")),filters.indexOf("&",filters.indexOf("[complete]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[words_from]=")),filters.indexOf("&",filters.indexOf("[words_from]"))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[words_to]=")),filters.indexOf("&",filters.indexOf("[words_to]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&", filters.indexOf("[date_from]=")),filters.indexOf("&",filters.indexOf("[date_from]="))),"");filters=filters.replace(filters.slice(filters.lastIndexOf("&",filters.indexOf("[date_to]=")),filters.indexOf("&",filters.indexOf("[date_to]="))),"");filters=filters.replace(/\u0026work/g,"&bookmark");filters=filters.replace(/\u0026include\u005Fwork/g,"&include_bookmark");filters=filters.replace(/\u0026exclude\u005Fwork/g,"&exclude_bookmark");}else{filters="";}if(filters){if(currentUrl.includes("tag_id=")||currentUrl.includes("user_id=")||currentUrl.includes("collection_id=")){var%20settings=filters.split("&");var%20filteredUrl=currentUrl;for(let%20selected%20of%20settings){if(!selected.endsWith("=")){var%20category=selected.slice(0,selected.indexOf("=")+1);if(!filteredUrl.includes(selected)){if(filteredUrl.includes(category+"&")||category.includes("sort_column")){filteredUrl=filteredUrl.replace(filteredUrl.slice(filteredUrl.indexOf(category),filteredUrl.indexOf("&",filteredUrl.indexOf(category))),selected);}else%20if(category.includes("_tag_names")){filteredUrl=filteredUrl.replace(category,selected+"%2C");}else%20if(category.includes("query")){filteredUrl=filteredUrl.replace(category,selected+"+");}else%20if(category!="utf8="&&category!="commit="&&!(category.startsWith("include_")&&category.includes("rating_ids"))&&!category.includes("language_id")){filteredUrl=filteredUrl+"&"+selected;}}}}window.location=filteredUrl;}else%20if(currentUrl.includes("/tags/")){window.location="https://archiveofourown.org/"+currentUrl.split("/").splice(5,1)+"?"+filters+"&tag_id="+currentUrl.split("/").splice(4,1);}else%20if(currentUrl.includes("/users/")){if(currentUrl.includes("/pseuds/")){window.location="https://archiveofourown.org/"+currentUrl.split("/").splice(7,1)+"?"+filters+"&user_id="+currentUrl.split("/").splice(4,1)+"&pseud_id="+currentUrl.split("/").splice(6,1);}else{window.location="https://archiveofourown.org/"+currentUrl.split("/").splice(5,1)+"?"+filters+"&user_id="+currentUrl.split("/").splice(4,1);}}else%20if(currentUrl.includes("/collections/")){window.location=currentUrl+"?"+filters;}}}})();`
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
5. visit any of **AO3's works or bookmarks listing page**, like [the DCU works listing page](https://archiveofourown.org/tags/DCU/works), for instance
6. **select all the filters** that you want to set as saved filters, for example:
    - to _Sort by_ "Bookmarks",
    - to _Exclude_ everything with the "Not Rated" _Rating_,
    - as well as the "Rape/Non-Con", "Underage", and "Creator Chose Not To Use Archive Warnings" _Warnings_, 
    - "Dead Dove: Do Not Eat" in the _Other tags to exclude_,
    - and have all the works with "English" as their _Language_
7. use the _Sort and Filter_ button to **apply these filters**
8. **copy the URL** of the resulting filtered listing from the address bar
9. **paste this URL** between the pair of quotation marks `""` that come right after `javascript:(function(){var%20urlWithFilters=` at the beginning of the code in the bookmark's URL field
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

## extra
if you're curious about what the code does, there's [a more readable version with comments giving short explanations on what different parts of the code do](https://github.com/RhineCloud/ao3-bookmarklets/blob/main/default-filters/ao3-saved-filters-readable.js) that you're welcome to check out
