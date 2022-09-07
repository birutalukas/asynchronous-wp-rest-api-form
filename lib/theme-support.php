<?php

function _themename_add_theme_support() {
    add_theme_support( 'custom-logo', array(
        'height' => 200,
        'width' => 600,
        'flex-height' => true,
        'flex-width' => true
    ) );
}
add_action( 'after_setup_theme', '_themename_add_theme_support' );
?>