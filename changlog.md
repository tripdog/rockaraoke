# Changelog 
## Wait, what did I do? And why?

* 09/15/2021
    -   Bugfix: Fields not clearing on players/search.html, thus, double-entries were occurring
        -   index.js & index-client.js added the function resetFormFields then called the fn inside the add_btn event
    -   Enhancement: Changed h1-h6 to Jubilat(Adobe) and left the old Google font as a fallback incase I stop paying Adobe