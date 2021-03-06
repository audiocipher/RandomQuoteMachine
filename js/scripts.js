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
    'Always remember: never accept the world as it appears to be; dare to see it for what it could be.',
    'Overwatch Animated Short "Recall"'
  );

  quote_machine.add_quote(
    'Don\'t cry because it\'s over, smile because it happened.',
    'Dr. Seuss'
  );

  quote_machine.add_quote(
    'The fool doth think he is wise, but the wise man knows himself to be a fool.',
    'William Shakespeare'
  );

  quote_machine.add_quote(
    'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.',
    'Albert Einstein'
  );

  quote_machine.add_quote(
    'So many books, so little time.',
    'Frank Zappa'
  );

  quote_machine.add_quote(
    'Be the change that you wish to see in the world.',
    'Mahatma Gandhi'
  );

  quote_machine.add_quote(
    'If you are not willing to risk the usual, you will have to settle for the ordinary.',
    'Jim Rohn'
  );

  quote_machine.add_quote(
    'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    'Mark Twain'
  );

  quote_machine.add_quote(
    'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    'Ralph Waldo Emerson'
  );

  quote_machine.add_quote(
    'If you can dream it, you can do it.',
    'Walt Disney'
  );

  // twitter button functionality

  // need to update the href value every time the quote is changed (button listener)

  var update_href = function(){
    let $elTweet = $('#tweet'); // reference to the DOM element
    let temp_obj = quote_machine.fetch_quote(); // temporary quote object to get quote and source from
    let text = temp_obj.getQuote() + ' \u2015' + temp_obj.getSource(); // concat quote and source
    let sub_url = encodeURIComponent(text); // convert to "href friendly" text
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
    change_color(); // change color of the page

    current_quote = quote_machine.get_quote(); // get next quote object
    $el_quotation.text(current_quote.getQuote());
    $el_source.text(current_quote.getSource());
  };

  // colors in order: red, orange, green, blue, indigo, violet, brown, dark gold
  var color_wheel = ['#9e1527',
                     '#b34700',
                     '#006600',
                     '#0000b3',
                     '#3d0099',
                     '#990099',
                     '#664400',
                     '#806600'];

  var current_color = -1; // used to remember previous color

  var change_color = function(){
    var color_index; // used to update color of the page

    do{
      color_index = Math.floor((Math.random() * 8));
    }
    while(color_index === current_color);

    current_color = color_index;

    $el_body = $('body').css('background-color', color_wheel[color_index]);

    $el_p = $('.jumbotron p').css('color', color_wheel[color_index]);

    $el_foot = $('.jumbotron footer').css('color', color_wheel[color_index]);

    $el_tweet = $('#tweet').css('color', color_wheel[color_index]);

    $el_quote = $('#new-quote').css('background-color', color_wheel[color_index]);
  }

  change_color();

  // create Listener for the New quote button

  var $el_button = $('#new-quote');
  $el_button.on('click', change_quote);

});
