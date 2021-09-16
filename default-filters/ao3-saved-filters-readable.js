javascript: (function() {
  /** Sample settings from the DCU works listing page
   *   Exclude Ratings: General Audiences, Teen And Up Audiences
   *   Exclude Warnings: No Archive Warnings Apply
   *   Exclude Additional Tags: Kid Fic
   *   Other tags to exclude: Age Regression/De-Aging
   *   Language: English
   */
  const urlWithFilters = "https://archiveofourown.org/tags/DCU/works?work_search%5Bsort_column%5D=created_at&include_work_search%5Btag_ids%5D%5B%5D=747397&exclude_work_search%5Brating_ids%5D%5B%5D=10&exclude_work_search%5Brating_ids%5D%5B%5D=11&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=16&exclude_work_search%5Bfreeform_ids%5D%5B%5D=7193&work_search%5Bexcluded_tag_names%5D=Age+Regression%2FDe-Aging&work_search%5Blanguage_id%5D=en";
  if (urlWithFilters) {
    /** Check if text (an URL) was inserted above to base the saved filters on
     *  before turning them into something easier to use in code
     */
    const filterParams = new URL(urlWithFilters).searchParams;
    const page = window.location.pathname.slice(0, -1).split("/").pop().replace("s", "");
    if (window.location.hostname == "archiveofourown.org" &&
    (page == "work" || page == "bookmark")) {
      /** Check if current page is an AO3 works/bookmarks listing
       *  and grab any filters that are already active, if there are any
       */
      const filters = new URLSearchParams(window.location.search);
      for (let [key, value] of filterParams) {
        /** Go through each saved filter that was set
         *  and check if it's something that may need to be renamed
         *  (the same filters use different terms in works and bookmarks)
         */
        if (value.length) {
          if (!key.includes(page) && (key.includes("clude_") || 
          key.includes("sort_") || key.includes("lang") ||
          (key.includes("_tag") && !key.includes("mark_tag")) ||
          (key.includes("query") && !key.includes("mark_query")))) {
            key = key.replace(/(work_search|bookmark_search)/, page + "_search");
            key = key.includes("bookmarkable_query") ? key.replace("bookmarkable_", "") : key.replace("query", "bookmarkable_query");
            value = value == "revised_at" ? "bookmarkable_date" : value.replace("bookmarkable_date", "revised_at");
          }
          if (!filters.getAll(key).includes(value) && key.includes(page + "_search")) {
            /** Check that the saved filter being checked wasn't active already
             *  and can be applied to the current page
             */
            if (filters.get(key) == null || filters.get(key) == "" ||
            ((key.includes("rec") || key.includes("_notes")) && filters.get(key) == 0) ||
            (key.includes("sort_") && (filters.get(key) == "revised_at" ||
            (key.includes("mark_") && filters.get(key) == "created_at")))) {
              /** Set the saved filter option
               *  if it was still empty/using the archive default */
              filters.set(key, value);
            } else if (!(key.startsWith(page) || (key.startsWith("include_") && key.includes("rating_ids")))) {
              /** Add a tag from the saved filters */
              filters.append(key, value);
            } else if (key.includes("_tag_names")) {
              /** Connect tags in a Other tags to in/exlude kind of field */
              filters.set(key, filters.get(key) + "," + value);
            } else if (key.includes("query")) {
              /** Add what was saved in a Search within results kind of field
               *  (The saved stuff gets tacked on after a space " ",
               *   which works as an AND on AO3;
               *   could probably be set to two pipes "||" instead
               *   for OR in search)
               */
              filters.set(key, filters.get(key) + " " + value);
            }
          }
        }
      }
      /** Move on to the listing with the saved filters
       *  if they weren't all active already
       */
      if ("?" + filters-toString() != window.location.search) {
        window.location.search = filters.toString();
      }
    }
  }
})();

/** extra notes on "key"s:
 * - in any _search:
 *   - include/exclude_: tags are presented using their id number
 *     - rating_ids: include filter can only be set to one value
 *     - warning_ids
 *     - category_ids
 *     - fandom_ids
 *     - character_ids
 *     - relationship_ids
 *     - freeform_ids
 *   - other:
 *     - sort_column:
 *       - work_ values: REVISED_AT, authors/title_to_sort_on, created_at, word/kudos/comments/bookmarks_count, hits
 *       - bookmark_ values: CREATED_AT, bookmarkable_date
 *       - both revised_at and bookmarkable_date list most recently updated works first
 *     - other_tag_names/excluded_tag_names: different tags are separated with a comma ","
 *     - query/bookmarkable_query: use space " " as and AND operator
 *     - language_id
 * - work_ exclusive:
 *   - crossover
 *   - complete
 *   - words_from/to
 *   - date_from/to
 * - bookmark_ exclusive:
 *   - other_bookmark_tag_names/excluded_bookmark_tag_names
 *   - bookmark_query
 *   - rec/with_notes: set to 0 by default rather than empty/null
 * - other:
 *   - utf8
 *   - commit
 *   - tag/user/collection_id
 */