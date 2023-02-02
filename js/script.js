const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.querySelector(".facebook")
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// show loader 
function loadin() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
} 

// Show New Quote 
function newQuote() {
    loadin();
    // Pick a random quotte from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check if quote author is empty or not  
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }

    // if quotetext is long or not and add a new class on it 
    if (quote.text.lenght > 60) {
        quoteText.classList.add("long-qoute");
    } else {
        quoteText.classList.remove("long-qoute");
    }
    // hide loader
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API 
async function getQuotes () {
    loadin();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
    }
}
function tweetQuotes () {
    const tweetLink = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetLink, '_blank');
}
function facebookQuotes () {
    const facebookLink = `https://www.facebook.com/intent/newpost?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(facebookLink, '_blank')
}
facebookBtn.addEventListener("click", facebookQuotes);
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuotes);
// On Load 
getQuotes();