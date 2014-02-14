<?php
/**
 * Apocrypha Theme Login Functions
 * Andrew Clayton
 * Version 1.0.1
 * 1-7-2014
 */
 
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Force usernames to not contain spaces
 * since 1.0.1
 */
add_filter( 'sanitize_user' , 'apoc_sanitize_user' );
function apoc_sanitize_user( $username ) {
	return str_replace( " " , "-" , $username );
}
 
/**
 * Overrides the display of wp-login.php
 * @version 1.0.0
 */
add_action( 'login_enqueue_scripts', 'apoc_login_styles' );
function apoc_login_styles() {
	echo '<link rel="stylesheet" href="' . THEME_URI . '/library/css/login-style.css?ver=1.1.0" type="text/css" media="all" />';
}
add_filter( 'login_headerurl', 'apoc_login_url' );
function apoc_login_url() {
    return SITEURL;
}
add_filter( 'login_headertitle', 'apoc_login_title' );
function apoc_login_title() {
    return 'Tamriel Foundry &bull; An ESO fansite and forum dedicated to discussing mechanics, theorycrafting, and guides for The Elder Scrolls Online.';
}

/** 
 * Display the AJAX login form in the header.
 * @since 0.1
 */
function apoc_header_login() {
	
	// Requires BuddyPress, bail if it's missing
	if ( !class_exists( 'BuddyPress' ) )
		return false;
	
	echo 'true';
}

/** 
 * Prevent "Banned" users from logging in
 * @since 1.0
 */
add_filter( 'wp_authenticate_user' , 'apoc_block_banned' , 10 );
function apoc_block_banned( $object ) {

	// If there hasn't already been an error, check to make sure the user is not banned
	if ( !is_wp_error( $object ) && $object->has_cap( 'banned' ) )
		return new WP_Error( 'forbidden' , "Your user account has been banned from Tamriel Foundry." );
	else
		return $object;
}

/** 
 * Prevent "Banned" users automatically authenticating with a cookie
 * @since 1.0
 */
add_action( 'auth_cookie_valid' , 'apoc_screen_cookie' , 10 , 2 );
function apoc_screen_cookie( $cookie_elements , $user ) {
	
	// If the user is "Banned" delete their authentication cookie
	if( $user->has_cap( 'banned' ) )
		wp_clear_auth_cookie();
}

/** 
 * Get the current page URL for redirection.
 * @since 0.1
 */
function get_current_url() {
	$current_url = esc_attr( $_SERVER['HTTP_HOST'] );
	$current_url .= esc_attr( $_SERVER['REQUEST_URI'] );
	return esc_url( $current_url );
}

/** 
 * Sets custom login urls when needed
 * @since 0.1
 */
add_filter('login_url' , 'custom_login_url');
function custom_login_url($login_url) {
    return SITEURL . '/wp-login.php';
}
add_filter( 'lostpassword_url', 'custom_lostpass_url' );
function custom_lostpass_url( $lostpassword_url ) {
    return SITEURL . '/wp-login.php?action=lostpassword';
}

?>