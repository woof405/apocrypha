/*! Forum Quotes */
$("#comments,#forums").on( "click" , "a.quote-link" , function( event ){

	// Declare some variables
	var context=quoteParent=quoteSource=posttext=quote='';
	
	// Prevent the default
	event.preventDefault();
	
	// Get the passed arguments
	context	= $(this).data('context');
	postid 	= $(this).data('id');
	author 	= $(this).data('author');
	date	= $(this).data('date');
	
	// Determine the context
	if ( 'reply' == context ) {
		quoteParent = '#post-' + postid;
		quoteSource = '#post-' + postid + ' .reply-content';
		editor		= 'bbp_reply_content'
	} else if ( 'comment' == context ) {
		quoteParent = '#comment-' + postid;
		quoteSource = '#comment-' + postid + ' .reply-content';
		editor		= 'comment'
	}
	
	// Look first for a specific text selection		
	if (window.getSelection) {
		posttext = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		posttext = document.selection.createRange().text;
	}
	else return;
			
	// If there is a selection, make sure it came from the right place
	if ( '' != posttext ) {
		
		// Split the selection to grab the first and last lines
		postlines = posttext.split(/\r?\n/);
		firstline 	= postlines[0];
		lastline 	= postlines[postlines.length-1];
		
		// If both the first line AND the last line come from within the target area, it must be valid
		if ( 0 == $( quoteSource ).find( ":contains(" + firstline + ")" ).length || 0 == $( quoteSource ).find( ":contains(" + lastline + ")" ).length ) {
			alert( 'This is not a valid quote selection. Either select a specific passage or select nothing to quote the full post.' );
			return;
		}
	}
		
	// Otherwise, if there's no selection, grab the whole post
	if ( '' == posttext )
		posttext = $( quoteSource ).html();
		
	// Remove revision log
	posttext = posttext.replace(/<ul id="bbp-reply-revision((.|\n)*?)(<\/ul>)/,"");
	posttext = posttext.replace(/<ul id="bbp-topic-revision((.|\n)*?)(<\/ul>)/,"");
	
	// Remove spoilers (greedily)
	posttext = posttext.replace(/<div class="spoiler">((.|\n)*?)(<\/div>)/g,"");
	
	// Remove images (greedily)
	posttext = posttext.replace(/<img((.|\n)*?)(>)/g,"");
	
	// Remove extra line-breaks and spaces
	posttext = posttext.replace(/<br>/g,"");
	posttext = posttext.replace(/&nbsp;/g,"");
	
	// Strip out quote-toggle buttons from deep threads (greedily)
	posttext = posttext.replace(/<button class="quote-toggle((.|\n)*?)(<\/button>)/g,"");
	
	// Make collapsed content visible in the editor
	posttext = posttext.replace(/display: none;/g,"");

	// Build the quote
	quote = '\r\n\r\n[quote author="' + author + '|' +quoteParent.substring(1)+ '|' +date+ '"]';
	quote += '\r\n' +posttext;
	quote += '\r\n[/quote]\r\n\r\n&nbsp;';
	
	// Switch to the html editor to embed the quote
	editor_html = document.getElementById( editor + '-html');
		switchEditors.switchto(editor_html);
			
	// Write the quote
	document.getElementById( editor ).value += quote;

	// Switch back to visual
	editor_tmce = document.getElementById( editor + '-tmce' );
		switchEditors.switchto(editor_tmce);
			
	 $('html, body').animate({ scrollTop: $( '#respond' ).offset().top }, 600);
		
});


/*! Reply Link Scrolling */
$("#comments,#forums").on( "click" , "a.reply-link" , function( event ){

	// Prevent default hashtagging
	event.preventDefault();

	// Scroll to the reply form
	$('html, body').animate({ scrollTop: $( '#respond' ).offset().top }, 600);
});


/*! Collapsing Quotes */
$('#forums,#comments').on( "load" , function(){
	
    // identify subquotes
    $('div.quote').children('div.quote').addClass("subquote");
	
    // add the quote toggle button
    $('div.subquote').children('p.quote-author').append('<button class="quote-toggle button-dark">Expand Quote</button>');
	
	// hide nested quote content
    $('div.subquote').children().not('p.quote-author,div.subquote').hide();
    
    // perform the toggle
    $('button.quote-toggle').click(function() {
		var oldtext = newtext = '';
        $(this).parent().parent().children().not('p.quote-author,div.subquote').slideToggle(500,"swing");
        oldtext = $(this).text();
        newtext = ( oldtext == "Expand Quote" ) ? "Collapse Quote" : "Expand Quote";
        $(this).text(newtext);
    });
});

/*! Collapsing Spoilers */
$(document).ready(function(){
    // add the spoiler toggle button
    $('div.spoiler').children('p.spoiler-title').append('<button class="spoiler-toggle button-dark">Reveal Spoiler</button>');
	
	// hide nested quote content
    $('div.spoiler').children().not('p.spoiler-title').hide();
    
    // perform the toggle
    $('button.spoiler-toggle').click(function() {
		var oldtext = newtext = '';
        $(this).parent().parent().children().not('p.spoiler-title').slideToggle(500,"swing");
        oldtext = $(this).text();
        newtext = ( oldtext == "Reveal Spoiler" ) ? "Conceal Spoiler" : "Reveal Spoiler";
        $(this).text(newtext);
    });
});

/*! Show Author IP Address on Click */
$("p.author-ip").hide();
$("a.author-ip-toggle").click( function() { 
	var post = $(this).parent().parent();
	post.find("p.author-ip").slideToggle();
});