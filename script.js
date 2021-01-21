const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Stop Loading 
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API

async function getQuote() {
    loading();
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank add unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // Stop Loader And show the quote
        complete();
    } catch (error) {
        
        console.log('oops, no quote', error);
    }
}
// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load

getQuote();
