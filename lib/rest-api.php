<?php 
add_action('rest_api_init', function () {

    register_rest_route('vsbl/v1', 'emails', array(
        'methods' => 'POST',
        'callback' => 'send_email_callback',
        'permission_callback' => '__return_true'
    ));

});

function send_email_callback( WP_REST_Request $request ) {
    $response = array(
        'status'  => 304,
        'message' => 'Something went wrong and email was not sent.'
    );

    $siteName = wp_strip_all_tags( trim( get_option( 'blogname' ) ) );
    $name = $request['customer-name'];
    $contact = $request['customer-contact'];
    $message = $request['customer-message'];

    $subject = "[$siteName] New message from $name";
    $body = "<p><b>Name:</b> $name</p>";
    $body .= "<p><b>Contacts:</b> $contact</p>";
    $body .= "<p><b>Message:</b> $message</p>";

    $to = get_option( 'admin_email' );

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        "Reply-To: $name <$contact>",
    );

    if ( wp_mail( $to, $subject, $body, $headers ) ) {
        $response['status'] = 200;
        $response['message'] = 'Thanks for applying! We will get in touch with you very very soon.';
    }

    return new WP_REST_Response( $response );
}
?>