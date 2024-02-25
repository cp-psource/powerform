<?php

/**
 * Class Powerform_Admin_Data
 *
 * @since 1.0
 */
class Powerform_Admin_Data {

	public $core = null;

	/**
	 * Current Nonce
	 *
	 * @since 1.2
	 * @var string
	 */
	private $_nonce = '';

	/**
	 * Powerform_Admin_Data constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		$this->core = Powerform::get_instance();
	}

	/**
	 * Combine Data and pass to JS
	 *
	 * @since 1.0
	 * @return array
	 */
	public function get_options_data() {
		$data           = $this->admin_js_defaults();
		$data           = apply_filters( "powerform_data", $data );
		$data['fields'] = powerform_get_fields_sorted( 'position', SORT_ASC );

		return $data;
	}

	/**
	 * Generate nonce
	 *
	 * @since 1.2
	 */
	public function generate_nonce() {
		$this->_nonce = wp_create_nonce( 'powerform_load_google_fonts' );
	}

	/**
	 * Get current generated nonce
	 *
	 * @since 1.2
	 * @return string
	 */
	public function get_nonce() {
		return $this->_nonce;
	}

	/**
	 * Default Admin properties
	 *
	 * @since 1.0
	 * @return array
	 */
	public function admin_js_defaults() {
		// Generate addon nonce
		Powerform_Addon_Admin_Ajax::get_instance()->generate_nonce();

		return array(
			'ajaxUrl'                        => powerform_ajax_url(),
			'application'                    => '',
			'is_touch'                       => wp_is_mobile(),
			'dashboardUrl'                   => menu_page_url( 'powerform', false ),
			'formEditUrl'                    => menu_page_url( 'powerform-cform-wizard', false ),
			'noWrongEditUrl'				 => menu_page_url( 'powerform-nowrong-wizard', false ),
			'knowledgeEditUrl'               => menu_page_url( 'powerform-knowledge-wizard', false ),
			'pollEditUrl'					 => menu_page_url( 'powerform-poll-wizard', false ),
			'settingsUrl'                    => menu_page_url( 'powerform-settings', false ),
			'hasCaptcha'                     => powerform_has_captcha_settings(),
			'formNonce'                      => $this->get_nonce(),
			'searchNonce'                    => wp_create_nonce( 'powerform_search_emails' ),
			'gFontNonce'                     => wp_create_nonce( 'powerform_load_google_fonts' ),
			'addons_enabled'                 => Powerform::is_addons_feature_enabled(),
			'pluginUrl'                      => powerform_plugin_url(),
			'imagesUrl'                      => powerform_plugin_url() . 'assets/images',
			'addonNonce'                     => Powerform_Addon_Admin_Ajax::get_instance()->get_nonce(),
			'countries'                      => powerform_get_countries_list(),
			'userList'                       => powerform_list_users(),
			'variables'                      => powerform_get_vars(),
			'maxUpload'                      => powerform_get_max_upload(),
			'captchaLangs'                   => powerform_get_captcha_languages(),
			'erasure'                        => get_option( 'powerform_enable_erasure_request_erase_form_submissions', false ),
			'retain_number'                  => get_option( 'powerform_retain_submissions_interval_number', 0 ),
			'retain_unit'                    => get_option( 'powerform_retain_submissions_interval_unit', 'days' ),
			'poll_ip_retain_number'          => get_option( 'powerform_retain_votes_interval_number', 0 ),
			'poll_ip_retain_unit'            => get_option( 'powerform_retain_votes_interval_unit', 'days' ),
			'submissions_ip_retain_number'   => get_option( 'powerform_retain_poll_submissions_interval_number', 0 ),
			'submissions_ip_retain_unit'     => get_option( 'powerform_retain_poll_submissions_interval_unit', 'days' ),
			'submissions_quiz_retain_number' => get_option( 'powerform_retain_quiz_submissions_interval_number', 0 ),
			'submissions_quiz_retain_unit'   => get_option( 'powerform_retain_quiz_submissions_interval_unit', 'days' ),
			'fileExts'                       => powerform_get_ext_types(),
			'version'                        => POWERFORM_VERSION,
			'showDocLink'                    => powerform_is_show_documentation_link(),
			'showBranding'                   => powerform_is_show_branding(),
		);
	}
}