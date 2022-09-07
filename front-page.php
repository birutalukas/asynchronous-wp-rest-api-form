<?php get_header(); ?>

<div class="contact-form__wrapper">
    <div class="contact-form__contacts-wrapper">
        <h1 class="page-title"><?php the_title(); ?></h1>
        <div class="contact-form__contacts-items">
            <div class="contact-form__contacts-item">
                <h2>Call us</h2> <!-- ACF -->
                <a href="tel:+37068244588">+370 682 44588</a> <!-- ACF -->
            </div>
            <div class="contact-form__contacts-item">
                <h2>Write us</h2> <!-- ACF -->
                <a href="mailto:hello@vsbl.lt">hello@vsbl.lt</a> <!-- ACF -->
            </div>
        </div>
    </div>
    <div class="contact-form__content">
        <form action="" id="contactForm">
            <div class="form-row">
                <label for="customer-name"><?php esc_html_e('Full Name *', '_themename' ); ?></label>
                <div class="input-wrapper">
                    <input type="text" name="customer-name" class="" id="customer-name" placeholder="Your Full Name">
                    <div class="invalid-input-mark"><img src="<?= get_template_directory_uri(); ?>/dist/assets/images/error-icon.svg" alt="x" width="20" height="20"></div>
                </div>
            </div>
            <div class="form-row">
                <label for="customer-contact"><?php esc_html_e('Phone or Email Address *', '_themename' ); ?></label>
                <div class="input-wrapper">
                    <input type="text" name="customer-contact"  class="" id="customer-contact" placeholder="Your Contacts">
                    <div class="invalid-input-mark"><img src="<?= get_template_directory_uri(); ?>/dist/assets/images/error-icon.svg" alt="x" width="20" height="20"></div>
                </div>
            </div>
            <div class="form-row">
                <div class="textarea-wrapper">
                    <label for="customer-message"><?php esc_html_e('Your Message', '_themename' ); ?></label>
                    <textarea name="customer-message" id="customer-message"  class="" rows="10" placeholder="I Have This Project..."></textarea>
                    <div class="invalid-textarea-mark"><img src="<?= get_template_directory_uri(); ?>/dist/assets/images/error-icon.svg" alt="x" width="20" height="20"></div>
                </div>
            </div>
            <div class="form-row form-row--flex">
                <div class="form-col__privacy">
                    <input type="checkbox" name="aggree-with-privacy" id="aggree-with-privacy">
                    <div class="custom-aggree-checkbox"></div>
                    <label for="aggree-with-privacy">I consent with the personal data processing policy as it is described in the <a href="<?= get_privacy_policy_url(); ?>">Privacy Policy</a>.</label>
                </div>
                <div class="form-col__submit">
                    <button class="btn btn--secondary" id="submit-contact-form">Submit Application</button>
                </div>
            </div>
        </form>
        <div class="contact-form__whait" id="spinner">
            <img src="<?= get_template_directory_uri(); ?>/dist/assets/images/loader.svg" alt="" class="spinner">
            <h3><?php esc_html_e('Wait for it..', '_themename' ); ?></h3>
        </div>
        <div class="contact-form__success" id="successMessage">
            <img src="<?= get_template_directory_uri(); ?>/dist/assets/images/check.svg" alt="" width="80" height="80">
            <h2><?php esc_html_e('All done!', '_themename' ); ?></h2>
            <p class="response-message">Thanks for applying! We will get in touch with you very very soon.</p><!-- Response message should be passed from ACF. Can be retrieved from BE -->
            <a href="<?= get_home_url(); ?>" class="btn btn--primary">
                <?php esc_html_e('Go to Homepage', '_themename' ); ?>
            </a>
        </div>  
    </div>
</div>

<?php get_footer(); ?>