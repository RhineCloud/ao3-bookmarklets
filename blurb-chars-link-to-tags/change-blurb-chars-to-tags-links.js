javascript:let%20url=new%20URL(window.location.href);if(url.hostname==='archiveofourown.org'){if(url.pathname.match(/\/tags\/.+/)&&!url.pathname.split(/\/tags\/[^\/]+/).pop()||url.pathname.match(/\/(works|bookmarks)(\?.+|(?!\/\d+))/)){let%20tags=document.querySelectorAll('li.blurb%20ul.tags%20li.characters%20a.tag');tags.forEach((tag)=>{tag.setAttribute('href',tag.getAttribute('href').slice(0,-6));});}}
