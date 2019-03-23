<?php
/**
 * Plugin Name: KD Blocks
 * Plugin URI: http://kielydesign.com/
 * Description: Kiely Design Custom Blocks
 * Author: Nicolas Menescardi
 * Author URI: https://www.linkedin.com/in/menescardi/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
