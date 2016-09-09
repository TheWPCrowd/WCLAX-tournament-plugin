<?php
/*
Plugin Name: WP Crowd Tournament Plugin
Description: For the 2016 WCLAX PS4 Tournament
Version:     0.0.1
Plugin URI:  https://thewpcrowd.com/wclax-tournament
Author:      The WP Crowd
Author URI:  https://www.thewpcrowd.com
Text Domain: wclax-tournament
Domain Path: /languages/
License:     GPL v3 or later
*/


class wpcrowd_tournament {

	function __construct() {
		add_shortcode( 'tournament', array( $this, 'tournament_shortcode' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'tournament_script' ) );
	}

	function tournament_script() {
		wp_enqueue_script( 'firebase', '//www.gstatic.com/firebasejs/3.3.0/firebase.js', array( 'jquery' ), null, false );
		wp_register_script('wpcrowd-tournament-script', plugin_dir_url( __FILE__ ) . '/build/js/scripts.js', array( 'firebase' ), '0.0.1', false );

		$local_object = array(
			'template_directory' => plugin_dir_url( __FILE__ ) . 'templates/'
		);

		wp_localize_script( 'wpcrowd-tournament-script', 'tournamentObject', $local_object );
	}

	function tournament_shortcode( $atts ) {
		wp_enqueue_script( 'wpcrowd-tournament-script' );

		$a = shortcode_atts( array(
			'game' => 'PS4 Game',
			'firebase' => false
		), $atts );
		
		if( !$a['firebase'] ) {
			return '<p>You need a Firebase URL to continue</p>';
		} else {
			return '<div ng-app="wpcrowd_tournament"><tournament name="' . $a['game'] . '" firebase="' . $a['firebase'] . '"></tournament></div>';
		}
		
	}

}

new wpcrowd_tournament();