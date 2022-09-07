<?php

// Main Theme Assets
function _themename_assets() {
    // Styles
    wp_enqueue_style( '_themename-stylesheet', get_template_directory_uri() . '/dist/assets/css/bundle.css', array(), '1.0.0', 'all');

    // Scripts
    wp_enqueue_script( '_themename-scripts', get_template_directory_uri() . '/dist/assets/js/bundle.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', '_themename_assets');

// Theme Admin Assets
function _themename_admin_assets() {
    // Styles
    wp_enqueue_style( '_themename-admin-stylesheet', get_template_directory_uri() . '/dist/assets/css/admin.css', array(), '1.0.0', 'all');

    // Scripts
    wp_enqueue_script( '_themename-admin-scripts', get_template_directory_uri() . '/dist/assets/js/admin.js', array(), '1.0.0', true);
}
add_action('admin_enqueue_scripts', '_themename_admin_assets');
?>