javascript: (function() {
  /* Sample settings from a filtered DCU works listing page
  (Sort by: Bookmarks;
  Exclude Ratings: Not Rated;
  Exclude Warnings: Creator Chose Not To Use Archive Warnings, Rape/Non-Con, Underage;
  Other tags to exclude: Dead Dove: Do Not Eat;
  Language: English) */
  var urlWithFilters = "https://archiveofourown.org/works?utf8=%E2%9C%93&work_search%5Bsort_column%5D=bookmarks_count&work_search%5Bother_tag_names%5D=&exclude_work_search%5Brating_ids%5D%5B%5D=9&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=14&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=19&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=20&work_search%5Bexcluded_tag_names%5D=Dead+Dove%3A+Do+Not+Eat&work_search%5Bcrossover%5D=&work_search%5Bcomplete%5D=&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=en&commit=Sort+and+Filter&tag_id=DCU";
  /* Check if filters to be saved were actually set above */
  if (urlWithFilters) {
    /* Turn hexcodes in the URL for saved filters into actual brackets */
    urlWithFilters = urlWithFilters.replace(/\u00255B/g, "[");
    urlWithFilters = urlWithFilters.replace(/\u00255D/g, "]");
    /* Copy the part of the URL with the actual filter settings */
    var filters = urlWithFilters.trim().slice(urlWithFilters.indexOf("?") + 1,
                                              urlWithFilters.lastIndexOf("=") + 1);
    /* Copy the URL of the page the bookmarklet is being used on */
    var currentUrl = new String(window.location);
    /* Turn hexcode in the current URL into actual brackets */
    currentUrl = currentUrl.replace(/\u00255B/g, "[");
    currentUrl = currentUrl.replace(/\u00255D/g, "]");
    /* Turn the saved filters into usable works filter settings if on a works listing page */
    if (currentUrl.includes("/works")) {
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[other_bookmark_tag_names]="),
                                              filters.indexOf("&", "[other_bookmark_tag_names]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[excluded_bookmark_tag_names]="),
                                              filters.indexOf("&", "[excluded_bookmark_tag_names]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[bookmark_query]="),
                                              filters.indexOf("&", "[bookmark_query]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[rec]="),
                                              filters.indexOf("&", "[rec]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[with_notes]="),
                                              filters.indexOf("&", "[with_notes]=")), "");
      filters = filters.replace(/\u0026bookmark/g, "&work");
      filters = filters.replace(/\u0026include\u005Fbookmark/g, "&include_work");
      filters = filters.replace(/\u0026exclude\u005Fbookmark/g, "&exclude_work");
    /* Turn the saved filters into usable bookmarks filter settings if on a bookmarks listing page */
    } else if (currentUrl.includes("/bookmarks")) {
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[crossover]="),
                                              filters.indexOf("&", "[crossover]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[complete]="),
                                              filters.indexOf("&", "[complete]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[words_from]="),
                                              filters.indexOf("&", "[words_from]")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[words_to]="),
                                              filters.indexOf("&", "[words_to]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[date_from]="),
                                              filters.indexOf("&", "[date_from]=")), "");
      filters = filters.replace(filters.slice(filters.lastIndexOf("&", "[date_to]="),
                                              filters.indexOf("&", "[date_to]=")), "");
      filters = filters.replace(/\u0026work/g, "&bookmark");
      filters = filters.replace(/\u0026include\u005Fwork/g, "&include_bookmark");
      filters = filters.replace(/\u0026exclude\u005Fwork/g, "&exclude_bookmark");
    /* Make the filters blank if it's not a page this bookmarklet was designed for */
    } else {
      filters = "";
    }
    if (filters) {
      /* Check if the page already has some filters applied */
      if (currentUrl.includes("tag_id=")) {
        /* Separate each saved filter setting into its own bit */
        var settings = filters.split("&");
        /* Keep track of the URL for the listing with the saved filters applied on top */
        var filteredUrl = currentUrl;
        /* Check each individual saved filter setting */
        for (let selected of settings) {
          /* Check if this is a saved filter setting that was actually defined */
          if (!selected.endsWith("=")) {
            /* Copy the setting category without the value */
            var category = selected.slice(0, selected.indexOf("=") + 1);
            /* Check if the specific saved filter setting was already applied */
            if (!filteredUrl.includes(selected)) {
              if (filteredUrl.includes(category + "&") ||
                  category.includes("sort_column")) {
                /* Overwrite empty settings with saved filters,
                or the Sort by direction with the saved one */
                filteredUrl = filteredUrl.replace(filteredUrl.slice(filteredUrl.indexOf(category),
                                                                    filteredUrl.indexOf("&", filteredUrl.indexOf(category))),
                                                  selected);
              } else if (category.includes("_tag_names")) {
                /* Insert saved Other tags to include/exclude */
                filteredUrl = filteredUrl.replace(category, selected + "%2C");
              } else if (category.includes("query")) {
                /* Insert anything saved for the Search within results fields */
                filteredUrl = filteredUrl.replace(category, selected + "+");
              } else if (category!="utf8=" &&
                         category!="commit=" &&
                         !(category.startsWith("include_") && category.includes("rating_ids")) &&
                         !category.includes("language_id") &&
                         category!="page=") {
                /* Make sure it's not one of the things where only one option can be selected
                before adding this saved filter setting */
                filteredUrl = filteredUrl + "&" + selected;
              }
            }
          }
        }
        /* Finally, go to the listing with all the saved filters applied on top */
        window.location = filteredUrl;
      } else if (currentUrl.includes("/tags/")) {
        /* If it's a works or bookmarks listing page without any filters applied,
        go to the listing page with all the saved filters */
        window.location = "https://archiveofourown.org/" + currentUrl.split("/").splice(5, 1) + "?" +
          filters.replace(filters.slice(filters.indexOf("page="), filters.indexOf("&", "page=")), "") +
          currentUrl.split("/").splice(4, 1);
      }
    }
  }
})();
