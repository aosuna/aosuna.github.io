const urlAPI = 'http://api.forismatic.com/api/1.0/?method=getQuote&formate=jsonp&lang=en&jsonp=?';

function getQuote() {
    $.ajax({
        url: urlAPI,
        data: {
            method: 'getQuote',
            lang: 'en',
            format: 'jsonp',
            dataType: 'jsonp'
        },
        dataType: 'jsonp',
        success: function (res) {
            //console.log(JSON.stringify(res, null, 2));
            $('.text').text(res.quoteText);
            if (res.quoteAuthor === '' || res.quoteAuthor === undefined) {
                $('.author').text('-- Anonymous')
            } else {
                $('.author').text('-- ' + res.quoteAuthor)
            }
        },
        error: function (res) {
            // console.log('Data could not be retrieved');
            alert('Data could not be retrieved');
        }
    })
}

function postTweet() {
    let tweet = {};
    let twitterLink = 'http://twitter.com/home?status=';
    tweet['quote'] = $('.text').text();
    tweet['author'] = $('.author').text();
    if (tweet['quote'] === undefined || tweet['quote'] === '') {
        alert('cannot send blank Tweet');
    } else if (tweet['quote'].length >= 140 - (tweet['author'].length + 5)) {
        let trimTweet = tweet['quote'].slice(0, tweet['author'].length - 5) + '... ';
        twitterLink += encodeURIComponent(trimTweet + '\n' + tweet['author']);
        window.open(twitterLink, '_blank');
    } else {
        twitterLink += encodeURIComponent(tweet['quote'] + '\n' + tweet['author']);
        window.open(twitterLink, '_blank');
    }
}

$(document).ready(function () {
    getQuote();

    $('#get-quote').on('click', function () {
        getQuote();
    });

    $('#tweet').on('click', function () {
        postTweet();
    });
});