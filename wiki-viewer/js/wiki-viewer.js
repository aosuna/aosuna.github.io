const wikiRandom = 'https://en.wikipedia.org/wiki/Special:Random';
const wikiRedirect = 'https://en.wikipedia.org/wiki/';
const wikiAPI = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=raw&gsrnamespace=0&gsrlimit=10&gsroffset=0&origin=*&gsrsearch='

$(document).ready(function () {
    let searchText = document.querySelector('input[name=Wikipedia]');
    let button = document.querySelector('#wiki-search');

    searchText.addEventListener('keyup', function(event) {
        event.preventDefault();
        if(event.keyCode === 13){
            wikiSearch();
        }
    })
    button.onclick = function () {
        wikiSearch();
    }

    let scrollBtn = document.querySelector("#scroll-top");

    window.onscroll = function() {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    };

    scrollBtn.addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    });

});

function wikiSearch() {
    let prevContent = document.querySelector('#wiki-result');
    let revChild = prevContent.firstChild;
    while(revChild) {
        prevContent.removeChild(revChild);
        revChild = prevContent.firstChild;
    }
    console.log(prevContent);
    let searchText = document.querySelector('input[name=Wikipedia]').value
    fetch(wikiAPI + searchText)
        .then(response => response.json())
        .then(data => {
            // console.log(JSON.stringify(data, null, 2))
            let div = document.querySelector('#wiki-result');
            let element = data.query.pages;
            console.log(element);
            for(let i in element) {
                let wikiContent = document.createElement('div');
                wikiContent.classList.add('wiki-query');
                wikiContent.id = element[i].title.replace(/ /g, '-');
                div.appendChild(wikiContent)
                let wikiText = document.createElement('a');
                wikiText.classList.add(...['list-group-item', 'list-group-item-action']);
                wikiText.setAttribute('href',
                    'https://en.wikipedia.org/wiki/' +
                    element[i].title.replace(' ', '_')
                );
                wikiText.setAttribute('target', '_blank');
                wikiText.setAttribute('title', `Wikipedia: ${element[i].title}`)
                wikiText.innerHTML = element[i].title;
                let text = document.createElement('span');
                text.innerHTML = "-" + element[i].extract
                wikiContent.appendChild(wikiText);
                wikiText.appendChild(text)
            };
        })
        .catch(error => console.log(error));
}