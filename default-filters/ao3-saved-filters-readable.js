javascript: (function() {
  /* sample settings from DCU works listing page
  (sort by: bookmarks;
  exclude: not rated, creator chose not to use archive warnings, rape/non-con, underage, dead dove: do not eat;
  language: english) */
  var urlWithFilters = "https://archiveofourown.org/works?utf8=%E2%9C%93&work_search%5Bsort_column%5D=bookmarks_count&work_search%5Bother_tag_names%5D=&exclude_work_search%5Brating_ids%5D%5B%5D=9&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=14&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=19&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=20&work_search%5Bexcluded_tag_names%5D=Dead+Dove%3A+Do+Not+Eat&work_search%5Bcrossover%5D=&work_search%5Bcomplete%5D=&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=en&commit=Sort+and+Filter&tag_id=DCU";
  /* check if there's a saved set of filters */
  if (urlWithFilters) {
    /* turn unicode into actual brackets */
    urlWithFilters = urlWithFilters.replace(/\u00255B/g, "[");
    urlWithFilters = urlWithFilters.replace(/\u00255D/g, "]");
    /* copy the part of the url with the actual filter settings */
    var filters = urlWithFilters.trim().slice(urlWithFilters.indexOf("?") + 1,
                                              urlWithFilters.lastIndexOf("=") + 1);
    /* copy url of the current page */
    var currentUrl = new String(window.location);
    /* turn unicode into actual brackets */
    currentUrl = currentUrl.replace(/\u00255B/g, "[");
    currentUrl = currentUrl.replace(/\u00255D/g, "]");
    /* turn the saved filters into usable works filter settings if on a works listing page */
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
    /* turn the saved filters into usable bookmarks filter settings if on a bookmarks listing page */
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
    /* make it blank if it's not a page that can have these saved filters applied */
    } else {
      filters = "";
    }
    if (filters) {
      /* the page already has some filters applied */
      if (currentUrl.includes("tag_id=")) {
        /* separate each saved filter setting into its own bit */
        var settings = filters.split("&");
        /* figure out where to go once the saved filters are added */
        var filteredUrl = currentUrl;
        /* check each individual filter setting */
        for (let selected of settings) {
          /* check if this is a filter setting that was actually defined */
          if (!selected.endsWith("=")) {
            /* copy the setting category without the value */
            var category = selected.slice(0, selected.indexOf("=") + 1);
            /* check if the specific filter setting was already applied */
            if (!filteredUrl.includes(selected)) {
              if (filteredUrl.includes(category + "&") ||
                  category.includes("sort_column")) {
                /* overwrite empty settings with saved filters,
                or the sort by direction with the saved one */
                filteredUrl = filteredUrl.replace(filteredUrl.slice(filteredUrl.indexOf(category),
                                                                    filteredUrl.indexOf("&", filteredUrl.indexOf(category))),
                                                  selected);
              } else if (category.includes("_tag_names")) {
                /* insert saved other tags to include/exclude */
                filteredUrl = filteredUrl.replace(category, selected + "%2C");
              } else if (category.includes("query")) {
                /* insert anything saved for the search within results field */
                filteredUrl = filteredUrl.replace(category, selected + "+");
              } else if (category!="utf8=" &&
                         category!="commit=" &&
                         !(category.startsWith("include_") && category.includes("rating_ids")) &&
                         !category.includes("language_id") &&
                         category!="page=") {
                /* make sure it's not one of the things where only one filter can be selected
                before adding this saved filter setting */
                filteredUrl = filteredUrl + "&" + selected;
              }
            }
          }
        }
        /* go to the listing with all the saved filters applied */
        window.location = filteredUrl;
      } else if (currentUrl.includes("/tags/")) {
        /* if it's a works or bookmarks listing page without any filters applied,
        go to the listing page with all the saved filters */
        window.location = "https://archiveofourown.org/" + currentUrl.split("/").splice(5, 1) + "?" +
          filters.replace(filters.slice(filters.indexOf("page="), filters.indexOf("&", "page=")), "") +
          currentUrl.split("/").splice(4, 1);
      }
    }
  }
})();
