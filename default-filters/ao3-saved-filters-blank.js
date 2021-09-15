javascript:(function() {
    const urlWithFilters = "https://archiveofourown.org/bookmarks?utf8=%E2%9C%93&bookmark_search%5Bsort_column%5D=created_at&include_bookmark_search%5Brating_ids%5D%5B%5D=11&include_bookmark_search%5Bcharacter_ids%5D%5B%5D=2332&bookmark_search%5Bother_tag_names%5D=Batman+-+All+Media+Types&bookmark_search%5Bother_bookmark_tag_names%5D=&exclude_bookmark_search%5Barchive_warning_ids%5D%5B%5D=14&bookmark_search%5Bexcluded_tag_names%5D=Superman+-+All+Media+Types&bookmark_search%5Bexcluded_bookmark_tag_names%5D=&bookmark_search%5Bbookmarkable_query%5D=-reader&bookmark_search%5Bbookmark_query%5D=&bookmark_search%5Blanguage_id%5D=&bookmark_search%5Brec%5D=0&bookmark_search%5Brec%5D=1&bookmark_search%5Bwith_notes%5D=0&commit=Sort+and+Filter&tag_id=DCU";
    if (urlWithFilters) {
        const filterParams = new URL(urlWithFilters).searchParams;
        const path = window.location.pathname;
        var pageType;
        if (path.includes("/works")) {
            pageType = "work";
        } else if (path.includes("/bookmarks")) {
            pageType = "bookmark";
        }
        if (filterParams && pageType) {
            const newFilters = new URLSearchParams(window.location.search);
            for (const [key, value] of filterParams) {
                if (!key.endsWith("_id") && value) {
                    let newKey = key;
                    if (!key.includes(pageType + "_search") &&
                    !(key.includes("crossover") || key.includes("complete") || key.includes("words_") || key.includes("date_") ||
                    key.includes("bookmark_tag") || key.includes("bookmark_query") || key.includes("rec") || key.includes("with_notes") ||
                    (key.includes("sort_column") && value != "created_at"))) {
                        newKey = key.replace(/(work_search|bookmark_search)/, pageType + "_search");
                        newKey = key.includes("bookmarkable_query") ? newKey.replace("bookmarkable_query", "query") : newKey.replace("query", "bookmarkable_query");
                    }
                    if (!newFilters.getAll(newKey).includes(value) && newKey.includes(pageType + "_search")) {
                        if (newFilters.get(newKey) == null || newFilters.get(newKey) == "" ||
                        ((key.includes("rec") || key.includes("with_notes")) && newFilters.get(key) == 0) ||
                        (key.includes("sort_column") && (newFilters.get(newKey) == "revised_at" || newFilters.get(newKey) == "bookmarkable_date"))) {
                            newFilters.set(newKey, value);
                            console.log("set " + newKey + " as " + value);
                        } else if (!(newKey.startsWith(pageType) || (key.startsWith("include_") && key.includes("rating_ids")))) {
                            newFilters.append(newKey, value);
                            console.log("append " + newKey + " with " + value);
                        } else if (key.includes("_tag_names")) {
                            newFilters.set(newKey, newFilters.get(newKey) + "," + value);
                            console.log("set " + newKey + " as " + newFilters.get(newKey));
                        } else if (key.includes("query")) {
                            newFilters.set(newKey, newFilters.get(newKey) + " " + value);
                            console.log("set " + newKey + " as " + newFilters.get(newKey));
                        }
                    }
                }
            }
            if (newFilters) {
                window.location.search = newFilters.toString();
            }
        }
    }
})();