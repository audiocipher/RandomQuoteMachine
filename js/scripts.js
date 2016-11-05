// js for random quote machine

// wait for the DOM to be ready before running the script
$(function(){

  // make a quote object
  // quote object contains a string representation of the words of the quote
  // quote object contains a string representation of the author of the quote

  class QuoteObj {
    constructor(quote, source){
      this._quote = quote;
      this._source = source;
    }

    getQuote(){
      return this._quote;
    }

    getSource(){
      return this._source;
    }
  }

  // make a quote machine object
  // contains a list of quote objects
  // can add, get, and fetch quotes

  var QuoteMachine = function(){
    this._quote_list = [];
    this._next_quote = 0; // index for quotes
  };

  // adds a quote object to the quote machine
  QuoteMachine.prototype.add_quote = function(quote, source) {
    var new_quote_obj = new QuoteObj(quote, source);
    this._quote_list.push(new_quote_obj);
  };

  // obtains a quote and moves index to next quote
  QuoteMachine.prototype.get_quote = function() {
    var index = this._next_quote;
    this._next_quote++;

    if(this._next_quote > (this._quote_list.length - 1)){
      this._next_quote = 0;
    }

    return this._quote_list[index];
  };

  // obtains a quote without moving index to next quote
  QuoteMachine.prototype.fetch_quote = function() {
    return this._quote_list[this._next_quote];
  };

  // instantiate a QuoteMachine
  var quote_machine = new QuoteMachine();

  quote_machine.add_quote(
    '\"Always remember: never accept the world as it appears to be; dare to see it for what it could be."',
    'Overwatch Animated Short | "Recall"'
  );

  quote_machine.add_quote(
    '\"Don\'t cry because it\'s over, smile because it happened.\"',
    'Dr. Seuss'
  );

  quote_machine.add_quote(
    '\"The fool doth think he is wise, but the wise man knows himself to be a fool.\"',
    'William Shakespeare'
  );

  quote_machine.add_quote(
    '\"Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.\"',
    'Albert Einstein'
  );

  quote_machine.add_quote(
    '\"So many books, so little time.\"',
    'Frank Zappa'
  );

  quote_machine.add_quote(
    '\"Be the change that you wish to see in the world.\"',
    'Mahatma Gandhi'
  );

  // twitter button functionality

  // need to update the href value every time the quote is changed (button listener)

  var update_href = function(){
    let $elTweet = $('#tweet'); // reference to the DOM element
    let temp_obj = quote_machine.fetch_quote(); // temporary quote object to get quote and source from
    let text = temp_obj.getQuote() + ' ' + temp_obj.getSource(); // concat quote and source
    let sub_url = encodeURI(text); // convert to "href friendly" text
    let the_url = 'https://twitter.com/intent/tweet?text=' +
                  sub_url +
                  '&hashtags=quotes';
    $elTweet.attr('href', the_url);
  }

  update_href(); // set the initial href value

  var current_quote = quote_machine.get_quote(); // initial quote to be displayed on the screen

  var $el_quotation = $('#quotation'); // cache DOM element

  var $el_source = $('#source');

  $el_quotation.text(current_quote.getQuote());
  $el_source.text(current_quote.getSource());

  // create a function to change quotes with DOM

  var change_quote = function(){
    update_href(); // update tweet href value

    current_quote = quote_machine.get_quote(); // get next quote object
    $el_quotation.text(current_quote.getQuote());
    $el_source.text(current_quote.getSource());
  };

  // create Listener for the New quote button

  var $el_button = $('#new-quote');
  $el_button.on('click', change_quote);

});
