/*! Load Comments */
$( '#comments' ).on( "click" , "nav.ajaxed a.page-numbers" , function(event){
	
	// Declare some stuff
	var curPage = newPage = postid = tooltip = dir = '';
	var button	= $(this);
			
	// Prevent default pageload
	event.preventDefault();
	
	// Get the pagination context
	postid 		= $( 'nav.pagination' ).data('postid');
	baseURL		= window.location.href;
	
	// Get the current page number
	curPage = parseInt( $( ".page-numbers.current" ).text() );
	
	// Get the requested page number
	newPage	= parseInt( button.text() );
	if ( button.hasClass( 'next' ) ) {
		newPage = curPage+1;
	} else if ( button.hasClass( 'prev' ) ) {
		newPage = curPage-1;
	}
	
	// Display a loading tooltip
	dir = ( newPage > curPage ) ? ".next" : ".prev";
	tooltip = ( newPage > curPage ) ? "Loading &raquo;" : "&laquo; Loading";
	$( 'a.page-numbers' + dir ).html(tooltip);
		
	// Send an AJAX request for more comments
	$.post( ajaxurl , {
			'action'	: 'apoc_load_comments',
			'postid'	: postid,
			'paged'		: newPage,
			'baseurl'	: baseURL,
		},
		function( response ) {
		
			// If we successfully retrieved comments
			if( response != '0' ) {
			
				// Do some beautiful jQuery
				$('.reply').fadeOut('slow').promise().done(function() {
					$('.reply').remove();
					$('nav.pagination').remove();
					$('ol#comment-list').append(response);
					$( 'ol#comment-list' ).after( $( 'nav.pagination' ) );
					$('html, body').animate({ 
						scrollTop: $( "#comments" ).offset().top 
					}, 600 );
					$('.reply').hide().fadeIn('slow');
					$( '#respond' ).show();
				});			
			}
		}
	);	
});

/*! Insert Comments */
$( "form#commentform" ).submit( function( event ) {

	// Get the form
	var error		= '';
	var form 		= $(this);
	var submitURL	= form.attr('action');
	var button		= $( '#submit' , form );
	var textarea	= $( '#comment' , form );
	
	// Prevent the default action
	event.preventDefault();
	
	// Prevent double posting
	button.attr( 'disabled' , "disabled" );
	
	// Create a feedback notice if one doesn't already exist
	if ( $( '#comment-notice' ).length == 0 ) {
		button.parent().prepend('<div id="comment-notice"></div>');
		$( '#comment-notice' ).hide();
	}
	
	// Save content from TinyMCE into the hidden form textarea
	tinyMCE.triggerSave();
	
	// Make sure the form isn't empty
	if ( '' == textarea.val() ) {
		error = "You didn't write anything!";			
	}
			
	// If there's been no error so far, go ahead and submit the AJAX
	if( !error ) {
	
		// Give a tooltip
		button.html( '<i class="icon-pencil"></i>Submitting...' );
		
		// Submit the comment form to the wordpress handler
		$.ajax({
			url 	: submitURL,
			type	: 'post',
			data	: form.serialize(),
			success	: function( data ) {
						
				// Display the new comment with sexy jQuery
				$( '#respond' ).slideUp('slow' , function() {
					$( 'ol#comment-list' ).append( data );
					$( '#comments .discussion-header' ).removeClass( 'noreplies' );
					$( 'ol#comment-list li.reply:last-child' ).hide().slideDown('slow');
	
					// Clear the editor
					tinyMCE.activeEditor.setContent('');
					tinyMCE.triggerSave();
					
					// Re-enable the form
					button.removeAttr( 'disabled' );
					button.html( '<i class="icon-pencil"></i>Post Comment' );
				});					
			},
			error 	: function( jqXHR , textStatus , errorThrown ) {
					error = "An error occurred during posting.";
			},
		});
	}
	
	// If there was an error at any point, display it
	if ( error ) {
		$( '#comment-notice' ).addClass('error').text(error).fadeIn('slow');
		button.removeAttr( 'disabled' );
		
		// Re-enable the form
		button.removeAttr( 'disabled' );
		button.html( '<i class="icon-pencil"></i>Post Comment' );
	}
	
});

/*! Delete Comments */
$( 'ol#comment-list' ).on( "click" , "a.delete-comment-link" , function(event){

	// Prevent the default action
	event.preventDefault();

	// Confirm the user's desire to delete the comment
	confirmation = confirm("Permanently delete this comment?");
	if(confirmation){
	
		// Visual tooltip
		button = $(this);
		button.text('Deleting...');
		
		// Get the arguments
		commentid	= $(this).data('id');
		nonce		= $(this).data('nonce');

		// Submit the POST AJAX
		$.post( ajaxurl, { 
			'action'	: 'apoc_delete_comment',
			'_wpnonce'	: nonce,
			'commentid' : commentid,
			}, 
			function( resp ){	
				if( resp ){	
					$( 'li#comment-' + commentid + ' div.reply-body' ).slideUp( 'slow', function() { 
						$( 'li#comment-' + commentid ).remove(); 
					});						
				}
			}
		);
	}
});