<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Admin_AJAX
 *
 * @since 1.0
 */
class Powerform_Admin_AJAX {

	/**
	 * Powerform_Admin_AJAX constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		// Handle close welcome box
		add_action( "wp_ajax_powerform_dismiss_welcome", array( $this, "dismiss_welcome" ) );
		add_action( "wp_ajax_nopriv_powerform_dismiss_welcome", array( $this, "dismiss_welcome" ) );

		// Handle load google fonts
		add_action( "wp_ajax_powerform_load_google_fonts", array( $this, "load_google_fonts" ) );

		// Handle load reCaptcha preview
		add_action( "wp_ajax_powerform_load_recaptcha_preview", array( $this, "load_recaptcha_preview" ) );

		// Handle save settings
		add_action( "wp_ajax_powerform_save_builder", array( $this, "save_builder" ) );
		add_action( "wp_ajax_powerform_save_poll", array( $this, "save_poll_form" ) );
		add_action( "wp_ajax_powerform_save_quiz_nowrong", array( $this, "save_quiz" ) );
		add_action( "wp_ajax_powerform_save_quiz_knowledge", array( $this, "save_quiz" ) );
		add_action( "wp_ajax_powerform_save_login", array( $this, "save_login" ) );
		add_action( "wp_ajax_powerform_save_register", array( $this, "save_register" ) );

		// Handle settings popups
		add_action( "wp_ajax_powerform_load_paypal_popup", array( $this, "load_paypal" ) );
		add_action( "wp_ajax_powerform_save_paypal_popup", array( $this, "save_paypal" ) );

		add_action( "wp_ajax_powerform_load_captcha_popup", array( $this, "load_captcha" ) );
		add_action( "wp_ajax_powerform_save_captcha_popup", array( $this, "save_captcha" ) );

		add_action( "wp_ajax_powerform_load_currency_popup", array( $this, "load_currency" ) );
		add_action( "wp_ajax_powerform_save_currency_popup", array( $this, "save_currency" ) );

		add_action( "wp_ajax_powerform_load_pagination_entries_popup", array( $this, "load_pagination_entries" ) );
		add_action( "wp_ajax_powerform_save_pagination_entries_popup", array( $this, "save_pagination_entries" ) );

		add_action( "wp_ajax_powerform_load_pagination_listings_popup", array( $this, "load_pagination_listings" ) );
		add_action( "wp_ajax_powerform_save_pagination_listings_popup", array( $this, "save_pagination_listings" ) );

		add_action( "wp_ajax_powerform_load_email_settings_popup", array( $this, "load_email_form" ) );
		add_action( "wp_ajax_powerform_save_email_settings_popup", array( $this, "save_email_form" ) );

		add_action( "wp_ajax_powerform_load_uninstall_settings_popup", array( $this, "load_uninstall_form" ) );
		add_action( "wp_ajax_powerform_save_uninstall_settings_popup", array( $this, "save_uninstall_form" ) );

		add_action( "wp_ajax_powerform_load_preview_cforms_popup", array( $this, "preview_custom_forms" ) );
		add_action( "wp_ajax_powerform_load_preview_polls_popup", array( $this, "preview_polls" ) );
		add_action( "wp_ajax_powerform_load_preview_quizzes_popup", array( $this, "preview_quizzes" ) );

		// Handle exports popup
		add_action( "wp_ajax_powerform_load_exports_popup", array( $this, "load_exports" ) );
		add_action( "wp_ajax_powerform_clear_exports_popup", array( $this, "clear_exports" ) );

		// Handle search user email
		add_action( "wp_ajax_powerform_builder_search_emails", array( $this, "search_emails" ) );

		add_action( "wp_ajax_powerform_load_privacy_settings_popup", array( $this, "load_privacy_settings" ) );
		add_action( "wp_ajax_powerform_save_privacy_settings_popup", array( $this, "save_privacy_settings" ) );

		add_action( "wp_ajax_powerform_load_export_custom_form_popup", array( $this, "load_export_custom_form" ) );
		add_action( "wp_ajax_powerform_load_import_custom_form_popup", array( $this, "load_import_custom_form" ) );
		add_action( "wp_ajax_powerform_save_import_custom_form_popup", array( $this, "save_import_custom_form" ) );

		add_action( "wp_ajax_powerform_load_export_poll_popup", array( $this, "load_export_poll" ) );
		add_action( "wp_ajax_powerform_load_import_poll_popup", array( $this, "load_import_poll" ) );
		add_action( "wp_ajax_powerform_save_import_poll_popup", array( $this, "save_import_poll" ) );

		add_action( "wp_ajax_powerform_load_export_quiz_popup", array( $this, "load_export_quiz" ) );
		add_action( "wp_ajax_powerform_load_import_quiz_popup", array( $this, "load_import_quiz" ) );
		add_action( "wp_ajax_powerform_save_import_quiz_popup", array( $this, "save_import_quiz" ) );

		add_action( "wp_ajax_powerform_save_pagination_popup", array( $this, "save_pagination" ) );

		add_action( "wp_ajax_powerform_save_accessibility_settings_popup", array( $this, "save_accessibility_settings" ) );
		add_action( "wp_ajax_powerform_save_dashboard_settings_popup", array( $this, "save_dashboard_settings" ) );
	}

	/**
	 * Save quizzes
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 */
	public function save_quiz() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		powerform_validate_ajax( "powerform_save_quiz" );

		$submitted_data = $this->get_post_data();

		$quiz_data      = array();
		if ( isset( $submitted_data['data'] ) ) {
			$quiz_data = $submitted_data['data'];
			$quiz_data = json_decode( stripslashes( $quiz_data ), true );
		}

		$questions  = array();
		$results = array();
		$settings = array();
		$msg_count = false;
		$id      = isset( $submitted_data['form_id'] ) ? $submitted_data['form_id'] : null;
		$id      = intval( $id );
		$title   = isset( $submitted_data['quiz_title'] ) ? sanitize_text_field( $submitted_data['quiz_title'] ) : sanitize_text_field( $submitted_data['formName'] );
		$status  = isset( $submitted_data['status'] ) ? sanitize_text_field( $submitted_data['status'] ) : '';
		$version = isset( $submitted_data['version'] ) ? sanitize_text_field( $submitted_data['version'] ) : '1.0';

		if ( is_null( $id ) || $id <= 0 ) {
			$form_model = new Powerform_Quiz_Form_Model();
			if ( empty( $status ) ) {
				$status = Powerform_Poll_Form_Model::STATUS_PUBLISH;
			}
		} else {
			$form_model = Powerform_Quiz_Form_Model::model()->load( $id );
			if ( ! is_object( $form_model ) ) {
				wp_send_json_error( __( "Testmodell existiert nicht", Powerform::DOMAIN ) );
			}
			if ( empty( $status ) ) {
				$status = $form_model->status;
			}
			//we need to empty fields cause we will send new data
			$form_model->clear_fields();
		}

		$action    = isset( $submitted_data['action'] ) ? $submitted_data['action'] : '';

		// Detect action
		$form_model->quiz_type = 'knowledge';
		if ( 'powerform_save_quiz_nowrong' === $action ) {
			$form_model->quiz_type = 'nowrong';
		}

		// Check if results exist
		if ( isset( $quiz_data['results'] ) && is_array( $quiz_data['results'] ) ) {
			$results = $quiz_data['results'];
			foreach ( $quiz_data['results'] as $key => $result ) {
				$description = '';
				if ( isset( $result['description'] ) ) {
					$description = $result['description'];
				}
				$results[ $key ]['description'] = $description;
			}

			$form_model->results = $results;
		}

		// Check if answers exist
		if ( isset( $quiz_data['questions'] ) ) {
			$questions = powerform_sanitize_field( $quiz_data['questions'] );
		}

		// Check if questions exist
		if ( isset( $questions ) ) {
			foreach ( $questions as &$question ) {
				$question['type'] = $form_model->quiz_type;
				if ( ! isset( $question['slug'] ) || empty( $question['slug'] ) ) {
					$question['slug'] = uniqid();
				}
			}
		}

		$form_model->set_var_in_array( 'name', 'formName', $submitted_data );

		// Handle quiz questions
		$form_model->questions = $questions;

		if( isset( $quiz_data['msg_count'] ) ) {
			$msg_count = $quiz_data['msg_count']; //Backup, we allow html here
		}

		if ( isset( $quiz_data['settings'] ) ) {
			// Sanitize settings
			$settings = powerform_sanitize_field( $quiz_data['settings'] );
		}

		// Sanitize admin email message
		if ( isset( $quiz_data['settings']['admin-email-editor'] ) ) {
			$settings['admin-email-editor'] = $quiz_data['settings']['admin-email-editor'];
		}

		// Sanitize quiz description
		if ( isset( $quiz_data['settings']['quiz_description'] ) ) {
			$settings['quiz_description'] = $quiz_data['settings']['quiz_description'];
		}

		// Update with backuped version
		if( $msg_count ) {
			$settings['msg_count'] = $msg_count;
		}

		// version
		$settings['version'] = $version;

		$form_model->settings = $settings;

		$quiz_data['formName'] = $title;

		// status
		$form_model->status = $status;

		// Save data
		$id = $form_model->save();

		wp_send_json_success( $id );
	}

	/**
	 * Save poll
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 */
	public function save_poll_form() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		powerform_validate_ajax( "powerform_save_poll" );

		$submitted_data = $this->get_post_data();
		$poll_data      = array();
		if ( isset( $submitted_data['data'] ) ) {
			$poll_data = $submitted_data['data'];
			$poll_data = json_decode( stripslashes( $poll_data ), true );
		}

		$answers  = array();
		$settings = array();
		$id       = isset( $submitted_data['form_id'] ) ? $submitted_data['form_id'] : null;
		$id       = intval( $id );
		$status   = isset( $submitted_data['status'] ) ? sanitize_text_field( $submitted_data['status'] ) : '';
		$version  = isset( $submitted_data['version'] ) ? sanitize_text_field( $submitted_data['version'] ) : '1.0';

		if ( is_null( $id ) || $id <= 0 ) {
			$form_model = new Powerform_Poll_Form_Model();
			if ( empty( $status ) ) {
				$status = Powerform_Poll_Form_Model::STATUS_PUBLISH;
			}
		} else {
			$form_model = Powerform_Poll_Form_Model::model()->load( $id );
			if ( ! is_object( $form_model ) ) {
				wp_send_json_error( __( "Umfragemodell existiert nicht", Powerform::DOMAIN ) );
			}
			if ( empty( $status ) ) {
				$status = $form_model->status;
			}

			//we need to empty fields cause we will send new data
			$form_model->clear_fields();
		}

		$form_model->set_var_in_array( 'name', 'formName', $submitted_data );

		// Check if answers exist
		if ( isset( $poll_data['answers'] ) ) {
			$answers = powerform_sanitize_field( $poll_data['answers'] );
		}

		if ( isset( $poll_data['settings'] ) ) {
			// Sanitize settings
			$settings = powerform_sanitize_field( $poll_data['settings'] );
		}

		// Sanitize admin email message
		if ( isset( $poll_data['settings']['admin-email-editor'] ) ) {
			$settings['admin-email-editor'] = $poll_data['settings']['admin-email-editor'];
		}

		// version
		$settings['version'] = $version;

		$form_model->settings = $settings;

		foreach ( $answers as $answer ) {
			$field_model  = new Powerform_Form_Field_Model();
			$answer['id'] = $answer['element_id'];
			$field_model->import( $answer );
			$field_model->slug = $answer['element_id'];
			$form_model->add_field( $field_model );
		}

		// status
		$form_model->status = $status;

		// Save data
		$id = $form_model->save();

		// add privacy settings to global option
		$override_privacy = false;
		if ( isset( $settings['enable-ip-address-retention'] ) ) {
			$override_privacy = filter_var( $settings['enable-ip-address-retention'], FILTER_VALIDATE_BOOLEAN );
		}
		$retention_number = null;
		$retention_unit   = null;
		if ( $override_privacy ) {
			$retention_number = 0;
			$retention_unit   = 'days';
			if ( isset( $settings['ip-address-retention-number'] ) ) {
				$retention_number = (int) $settings['ip-address-retention-number'];
			}
			if ( isset( $settings['ip-address-retention-unit'] ) ) {
				$retention_unit = $settings['ip-address-retention-unit'];
			}
		}

		powerform_update_poll_ip_address_retention( $id, $retention_number, $retention_unit );

		wp_send_json_success( $id );
	}

	/**
	 * Save custom form fields
	 *
	 * @since 1.2
	 */
	public function save_builder() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		powerform_validate_ajax( "powerform_save_builder_fields" );

		$submitted_data = $this->get_post_data();
		$form_data      = $submitted_data['data'];
		$form_data      = json_decode( stripslashes( $form_data ), true );

		$fields  = array();
		$id      = isset( $submitted_data['form_id'] ) ? $submitted_data['form_id'] : null;
		$id      = intval( $id );
		$title   = sanitize_text_field( $submitted_data['formName'] );
		$status  = isset( $submitted_data['status'] ) ? sanitize_text_field( $submitted_data['status'] ) : '';
		$version = isset( $submitted_data['version'] ) ? sanitize_text_field( $submitted_data['version'] ) : '1.0';

		if ( is_null( $id ) || $id <= 0 ) {
			$form_model = new Powerform_Custom_Form_Model();
			if ( empty( $status ) ) {
				$status = Powerform_Custom_Form_Model::STATUS_PUBLISH;
			}
		} else {
			$form_model = Powerform_Custom_Form_Model::model()->load( $id );
			if ( ! is_object( $form_model ) ) {
				wp_send_json_error( __( "Formularmodell existiert nicht", Powerform::DOMAIN ) );
			}
			if ( empty( $status ) ) {
				$status = $form_model->status;
			}

			//we need to empty fields cause we will send new data
			$form_model->clear_fields();
		}

		$form_model->set_var_in_array( 'name', 'formName', $submitted_data, 'powerform_sanitize_field' );

		// Build the fields
		if ( isset( $form_data ) ) {
			$fields = $form_data['wrappers'];
			unset( $form_data['wrappers'] );
		}

		foreach ( $fields as $row ) {
			foreach ( $row['fields'] as $f ) {
				$field          = new Powerform_Form_Field_Model();
				$field->form_id = $row['wrapper_id'];
				$field->slug    = $f['element_id'];
				unset( $f['element_id'] );
				$field->import( $f );
				$form_model->add_field( $field );
			}
		}

		// Sanitize settings
		$settings = powerform_sanitize_field( $form_data['settings'] );

		// Sanitize custom css
		if ( isset( $form_data['settings']['custom_css'] ) ) {
			$settings['custom_css'] = sanitize_textarea_field( $form_data['settings']['custom_css'] );
		}

		// Sanitize thank you message
		if ( isset( $form_data['settings']['thankyou-message'] ) ) {
			$settings['thankyou-message'] = $form_data['settings']['thankyou-message'];
		}

		// Sanitize user email message
		if ( isset( $form_data['settings']['user-email-editor'] ) ) {
			$settings['user-email-editor'] = $form_data['settings']['user-email-editor'];
		}

		// Sanitize admin email message
		if ( isset( $form_data['settings']['admin-email-editor'] ) ) {
			$settings['admin-email-editor'] = $form_data['settings']['admin-email-editor'];
		}

		$settings['formName'] = $title;

		$settings['version']  = $version;
		$form_model->settings = $settings;

		// status
		$form_model->status = $status;

		// Save data
		$id = $form_model->save();

		// add privacy settings to global option
		$override_privacy = false;
		if ( isset( $settings['enable-submissions-retention'] ) ) {
			$override_privacy = filter_var( $settings['enable-submissions-retention'], FILTER_VALIDATE_BOOLEAN );
		}
		$retention_number = null;
		$retention_unit   = null;
		if ( $override_privacy ) {
			$retention_number = 0;
			$retention_unit   = 'days';
			if ( isset( $settings['submissions-retention-number'] ) ) {
				$retention_number = (int) $settings['submissions-retention-number'];
			}
			if ( isset( $settings['submissions-retention-unit'] ) ) {
				$retention_unit = $settings['submissions-retention-unit'];
			}
		}

		powerform_update_form_submissions_retention( $id, $retention_number, $retention_unit );

		wp_send_json_success( $id );
	}

	/**
	 * Save custom form settings
	 *
	 * @since 1.2
	 */
	public function save_builder_settings() {
		_deprecated_function( 'save_builder_settings', '1.6', 'save_builder' );
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		powerform_validate_ajax( "powerform_save_builder_fields" );

		$submitted_data = $this->get_post_data();
		$fields         = array();
		$id             = isset( $submitted_data['form_id'] ) ? $submitted_data['form_id'] : null;
		$id             = intval( $id );
		$title          = sanitize_text_field( $submitted_data['formName'] );
		$status         = isset( $submitted_data['status'] ) ? sanitize_text_field( $submitted_data['status'] ) : '';
		$version        = isset( $submitted_data['version'] ) ? sanitize_text_field( $submitted_data['version'] ) : '1.0';

		if ( is_null( $id ) || $id <= 0 ) {
			$form_model = new Powerform_Custom_Form_Model();
			if ( empty( $status ) ) {
				$status = Powerform_Custom_Form_Model::STATUS_PUBLISH;
			}
		} else {
			$form_model = Powerform_Custom_Form_Model::model()->load( $id );
			if ( ! is_object( $form_model ) ) {
				wp_send_json_error( __( "Formularmodell existiert nicht", Powerform::DOMAIN ) );
			}
			if ( empty( $status ) ) {
				$status = $form_model->status;
			}
		}
		$form_model->set_var_in_array( 'name', 'formName', $submitted_data, 'powerform_sanitize_field' );

		// Sanitize settings
		$settings = powerform_sanitize_field( $submitted_data['data'] );

		// Sanitize custom css
		if ( isset( $submitted_data['data']['custom_css'] ) ) {
			$settings['custom_css'] = sanitize_textarea_field( $submitted_data['data']['custom_css'] );
		}

		// Sanitize thank you message
		if ( isset( $submitted_data['data']['thankyou-message'] ) ) {
			$settings['thankyou-message'] = $submitted_data['data']['thankyou-message'];
		}

		// Sanitize user email message
		if ( isset( $submitted_data['data']['user-email-editor'] ) ) {
			$settings['user-email-editor'] = $submitted_data['data']['user-email-editor'];
		}

		// Sanitize admin email message
		if ( isset( $submitted_data['data']['admin-email-editor'] ) ) {
			$settings['admin-email-editor'] = $submitted_data['data']['admin-email-editor'];
		}

		$settings['formName'] = $title;
		$settings['version']  = $version;
		$form_model->settings = $settings;

		// status
		$form_model->status = $status;

		// Save data
		$id = $form_model->save();

		// add privacy settings to global option
		$override_privacy = false;
		if ( isset( $settings['enable-submissions-retention'] ) ) {
			$override_privacy = filter_var( $settings['enable-submissions-retention'], FILTER_VALIDATE_BOOLEAN );
		}
		$retention_number = null;
		$retention_unit   = null;
		if ( $override_privacy ) {
			$retention_number = 0;
			$retention_unit   = 'days';
			if ( isset( $settings['submissions-retention-number'] ) ) {
				$retention_number = (int) $settings['submissions-retention-number'];
			}
			if ( isset( $settings['submissions-retention-unit'] ) ) {
				$retention_unit = $settings['submissions-retention-unit'];
			}
		}

		powerform_update_form_submissions_retention( $id, $retention_number, $retention_unit );

		wp_send_json_success( $id );
	}

	/**
	 * Load existing custom field keys
	 *
	 * @since 1.0
	 * @return string JSON
	 */
	public function load_existing_cfields() {

		powerform_validate_ajax( "powerform_load_existing_cfields" );

		$keys = array();
		$html = '';

		foreach ( $keys as $key ) {
			$html .= "<option value='$key'>$key</option>";
		}

		wp_send_json_success( $html );
	}

	/**
	 * Dismiss welcome message
	 *
	 * @since 1.0
	 */
	public function dismiss_welcome() {
		powerform_validate_ajax( "powerform_dismiss_welcome" );
		update_option( "powerform_welcome_dismissed", true );
		wp_send_json_success();
	}

	/**
	 * Load Google Fonts
	 *
	 * @since 1.0
	 */
	public function load_fonts() {
		powerform_validate_ajax( "powerform_load_fonts" );
		_deprecated_function( 'load_fonts', '1.0.5', 'load_google_fonts' );
		wp_send_json_error( array() );
	}


	/**
	 * Load google fonts
	 *
	 * @since 1.0.5
	 */
	public function load_google_fonts() {
		powerform_validate_ajax( "powerform_load_google_fonts" );

		$is_object = false;

		if ( isset( $_POST['data']['isObject'] ) ) {
			$is_object = sanitize_text_field( $_POST['data']['isObject'] );
		}
		$fonts = powerform_get_font_families( $is_object );
		wp_send_json_success( $fonts );
	}

	/**
	 * Load paypal settings
	 *
	 * @since 1.0
	 */
	public function load_paypal() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_paypal" );

		$html = powerform_template( 'settings/popup/edit-paypal-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save paypal popup data
	 *
	 * @since 1.0
	 */
	public function save_paypal() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_paypal" );

		update_option( "powerform_paypal_api_mode", sanitize_text_field( $_POST['api_mode'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_paypal_client_id", sanitize_text_field( $_POST['client_id'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_paypal_secret", sanitize_text_field( $_POST['secret'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.

		wp_send_json_success();
	}

	/**
	 * Load reCaptcha settings
	 *
	 * @since 1.0
	 */
	public function load_captcha() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_captcha" );

		$html = powerform_template( 'settings/popup/edit-captcha-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save reCaptcha popup data
	 *
	 * @since 1.0
	 */
	public function save_captcha() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_captcha" );

		update_option( "powerform_captcha_key", sanitize_text_field( $_POST['captcha_key'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_captcha_secret", sanitize_text_field( $_POST['captcha_secret'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_captcha_language", sanitize_text_field( $_POST['captcha_language'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_captcha_theme", sanitize_text_field( $_POST['captcha_theme'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		wp_send_json_success();
	}

	/**
	 * Load currency modal
	 *
	 * @since 1.0
	 */
	public function load_currency() {
		powerform_validate_ajax( "powerform_popup_currency" );

		$html = powerform_template( 'settings/popup/edit-currency-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save reCaptcha popup data
	 *
	 * @since 1.0
	 */
	public function save_currency() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_currency" );

		update_option( "powerform_currency", sanitize_text_field( $_POST['currency'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		wp_send_json_success();
	}

	/**
	 * Load entries pagination modal
	 *
	 * @since 1.0.2
	 */
	public function load_pagination_entries() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_pagination_entries" );

		$html = powerform_template( 'settings/popup/edit-pagination-entries-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save entries pagination popup data
	 *
	 * @since 1.0.2
	 */
	public function save_pagination_entries() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_pagination_entries" );

		$pagination = intval( sanitize_text_field( $_POST['pagination_entries'] ) );// WPCS: CSRF ok by powerform_validate_ajax.

		if ( 0 < $pagination ) {

			update_option( "powerform_pagination_entries", $pagination );
			wp_send_json_success();

		} else {

			wp_send_json_error( __( "Das Limit pro Seite darf nicht kleiner als eins sein.", Powerform::DOMAIN ) );

		}

	}

	/*
	 * Load reCaptcha preview
	 *
	 * @since 1.5.4
	 */
	public function load_recaptcha_preview() {
		$language = get_option( "powerform_captcha_language", "en" );

		$captcha_key   = get_option( "powerform_captcha_key", "" );
		$captcha_theme = get_option( "powerform_captcha_theme", "light" );
		$html = '';

		$html = '';

		if ( ! empty( $captcha_key ) && ! empty( $captcha_theme ) ) {
			// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
			$html .= '<script src="https://www.google.com/recaptcha/api.js?hl=' . $language . '&render=explicit&onload=powerform_render_admin_captcha" async defer></script>';

			$html .= '<div class="powerform-g-recaptcha" data-sitekey="' . $captcha_key . '" data-theme="' . $captcha_theme . '" data-size="normal"></div>';
		} else {
			$html .= '<div class="sui-notice">';
			$html .= '<p>' . esc_html__( 'Du musst zuerst Deine Anmeldeinformationen speichern, um das reCAPTCHA zu laden. ', Powerform::DOMAIN ) . '</p>';
			$html .= '</div>';
		}

		wp_send_json_success( $html );
	}

	/**
	 * Load listings pagination modal
	 *
	 * @since 1.0.2
	 */
	public function load_pagination_listings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_pagination_listings" );

		$html = powerform_template( 'settings/popup/edit-pagination-listings-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save listings pagination popup data
	 *
	 * @since 1.0.2
	 */
	public function save_pagination_listings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_pagination_listings" );

		$pagination = intval( sanitize_text_field( $_POST['pagination_listings'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.

		if ( 0 < $pagination ) {

			update_option( "powerform_pagination_listings", $pagination );
			wp_send_json_success();

		} else {

			wp_send_json_error( __( "Das Limit pro Seite darf nicht kleiner als eins sein.", Powerform::DOMAIN ) );

		}

	}

	/**
	 * Load the email settings form
	 *
	 * @since 1.1
	 */
	public function load_email_form() {
		// Validate nonce
		powerform_validate_ajax( "powerform_load_popup_email_settings" );

		$html = powerform_template( 'settings/popup/edit-email-content' );

		wp_send_json_success( $html );
	}

	/**
	 * Save email settings data
	 *
	 * @since 1.1
	 */
	public function save_email_form() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_email_settings" );

		update_option( "powerform_sender_email_address", sanitize_text_field( $_POST['sender_email'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.
		update_option( "powerform_sender_name", sanitize_text_field( $_POST['sender_name'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.
		wp_send_json_success();
	}

	/**
	 * Load the uninstall form
	 *
	 * @since 1.0.2
	 */
	public function load_uninstall_form() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_uninstall_form" );

		$html = powerform_template( 'settings/popup/edit-uninstall-content' );

		wp_send_json_success( $html );
	}


	/**
	 * Save listings pagination popup data
	 *
	 * @since 1.0.2
	 */
	public function save_uninstall_form() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_uninstall_settings" );

		$delete_uninstall = isset( $_POST['delete_uninstall'] ) ? $_POST['delete_uninstall'] : false;// WPCS: CSRF ok by powerform_validate_ajax.
		$delete_uninstall = filter_var( $delete_uninstall, FILTER_VALIDATE_BOOLEAN );

		update_option( "powerform_uninstall_clear_data", $delete_uninstall );
		wp_send_json_success();

	}

	/**
	 * Preview custom forms
	 *
	 * @since 1.0
	 */
	public function preview_custom_forms() {
		// Validate nonce
		//powerform_validate_ajax( "powerform_popup_preview_cforms" );

		$preview_data = false;
		$form_id      = false;

		if ( isset( $_POST['id'] ) ) { // WPCS: CSRF ok by powerform_validate_ajax.
			$form_id = intval( $_POST['id'] );
		}

		// Check if preview data set
		if ( isset( $_POST['data'] ) && ! empty( $_POST['data'] ) ) {// WPCS: CSRF ok by powerform_validate_ajax.
			$data = $_POST['data']; // WPCS: CSRF ok by powerform_validate_ajax.
			if ( ! is_array( $data ) ) {
				$data = json_decode( stripslashes( $data ), true );
			}
			$preview_data = powerform_data_to_model_form( $data );// WPCS: CSRF ok by powerform_validate_ajax.
		}

		$html = powerform_form_preview( $form_id, true, $preview_data );

		wp_send_json_success( $html );
	}

	/**
	 * Preview polls
	 *
	 * @since 1.0
	 */
	public function preview_polls() {
		// Validate nonce
		//powerform_validate_ajax( "powerform_popup_preview_polls" );

		$preview_data = false;
		// force -1 for preview
		$form_id = - 1;

		if ( isset( $_POST['id'] ) ) { // WPCS: CSRF ok by powerform_validate_ajax.
			$form_id = intval( $_POST['id'] );
		}

		// Check if preview data set
		// Check if preview data set
		if ( isset( $_POST['data'] ) && ! empty( $_POST['data'] ) ) {// WPCS: CSRF ok by powerform_validate_ajax.
			$data = $_POST['data']; // WPCS: CSRF ok by powerform_validate_ajax.
			if ( ! is_array( $data ) ) {
				$data = json_decode( stripslashes( $data ), true );
			}
			$preview_data = powerform_data_to_model_poll( $data );// WPCS: CSRF ok by powerform_validate_ajax.
		}

		$html = powerform_poll_preview( $form_id, true, $preview_data );

		wp_send_json_success( $html );
	}

	/**
	 * Preview quizzes
	 *
	 * @since 1.0
	 */
	public function preview_quizzes() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_preview_quizzes" );

		$preview_data = false;
		// force -1 for preview
		$form_id = - 1;

		if ( isset( $_POST['id'] ) ) { // WPCS: CSRF ok by powerform_validate_ajax.
			$form_id = intval( $_POST['id'] );
		}

		// Check if preview data set
		if ( isset( $_POST['data'] ) && ! empty( $_POST['data'] ) ) {// WPCS: CSRF ok by powerform_validate_ajax.
			$preview_data = powerform_data_to_model_quiz( $_POST['data'] );// WPCS: CSRF ok by powerform_validate_ajax.
		}

		$html = powerform_quiz_preview( $form_id, true, $preview_data );

		wp_send_json_success( $html );
	}

	/**
	 * Load list of exports
	 *
	 * @since 1.0
	 */
	public function load_exports() {
		// Validate nonce
		powerform_validate_ajax( "powerform_load_exports" );

		$form_id = isset( $_POST['id'] ) && $_POST['id'] >= 0 ? $_POST['id'] : false;// WPCS: CSRF ok by powerform_validate_ajax.
		if ( $form_id ) {
			$args = array(
				'form_id' => $form_id,
			);
			$html = powerform_template( 'settings/popup/exports-content', $args );
			wp_send_json_success( $html );
		} else {
			wp_send_json_error( __( "Keine gültige Modul-ID angegeben.", Powerform::DOMAIN ) );
		}
	}

	/**
	 * Clear list of exports
	 *
	 * @since 1.0
	 */
	public function clear_exports() {
		// Validate nonce
		powerform_validate_ajax( "powerform_clear_exports" );

		$form_id = isset( $_POST['id'] ) && $_POST['id'] >= 0 ? $_POST['id'] : false;// WPCS: CSRF ok by powerform_validate_ajax.

		if ( ! $form_id ) {
			wp_send_json_error( __( "Es wurde keine ID angegeben.", Powerform::DOMAIN ) );
		}

		$was_cleared = delete_export_logs( $form_id );

		if ( $was_cleared ) {
			wp_send_json_success( __( "Exporte gelöscht.", Powerform::DOMAIN ) );
		} else {
			wp_send_json_error( __( "Exporte konnten nicht gelöscht werden.", Powerform::DOMAIN ) );
		}
	}

	/**
	 * Search Emails
	 *
	 * @since 1.0.3
	 * @since 1.1 change $_POST to `get_post_data`
	 */
	public function search_emails() {
		powerform_validate_ajax( "powerform_search_emails" );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$submitted_data = $this->get_post_data();

		//TODO : add ajax validate here and js admin too
		$admin_email  = ( ( isset( $submitted_data['admin_email'] ) && $submitted_data['admin_email'] ) ? true : false );
		$search_email = ( ( isset( $submitted_data['q'] ) && $submitted_data['q'] ) ? sanitize_text_field( $submitted_data['q'] ) : false );

		// return admin_email when requested
		if ( $admin_email ) {
			wp_send_json_success( get_option( 'admin_email' ) );
		}

		if ( ! $search_email ) {
			wp_send_json_success( array() );
		}

		$args = array(
			'search'  => '*' . $search_email . '*',
			'number'  => 10,
			'orderby' => 'user_login',
			'order'   => 'ASC',
		);

		/**
		 * Filter args to be passed on to get_users
		 *
		 * @see   get_users()
		 *
		 * @since 1.2
		 *
		 * @param array  $args
		 * @param string $search_email string to search
		 */
		$args = apply_filters( 'powerform_builder_search_emails_args', $args, $search_email );

		$users = get_users( $args );
		$data  = array();
		if ( ! empty( $users ) ) {
			foreach ( $users as $user ) {
				$data[] = array(
					'id'           => $user->user_email,
					'text'         => $user->user_email,
					'display_name' => $user->display_name,
				);
			}
		}

		/**
		 * Filter returned data when builder search emails
		 *
		 * @since 1.2
		 *
		 * @param array  $data
		 * @param array  $users        search result of get_users
		 * @param array  $args         current query args passed to get_users
		 * @param string $search_email string to search
		 */
		$data = apply_filters( 'powerform_builder_search_emails_data', $data, $users, $args, $search_email );

		wp_send_json_success( $data );
	}

	/**
	 * Get $_POST data
	 *
	 * @since 1.1
	 *
	 * @param string $nonce_action       action to validate
	 * @param array  $sanitize_callbacks {
	 *                                   custom sanitize options, its assoc array
	 *                                   'field_name_1' => 'function_to_call_1' function will called with `call_user_func_array`,
	 *                                   'field_name_2' => 'function_to_call_2',
	 *                                   }
	 *
	 * @return array
	 */
	protected function get_post_data( $nonce_action = '', $sanitize_callbacks = array() ) {
		// do nonce / caps check when requested
		if ( ! empty( $nonce_action ) ) {
			// it will wp_send_json_error
			powerform_validate_ajax( $nonce_action );
		}

		// TODO : mark this as phpcs comply after checking usages of this function
		$post_data = $_POST; // WPCS: CSRF OK

		// do some sanitize
		foreach ( $sanitize_callbacks as $field => $sanitize_func ) {
			if ( isset( $post_data[ $field ] ) ) {
				if ( is_callable( $sanitize_func ) ) {
					$post_data[ $field ] = call_user_func_array( array( $sanitize_func ), array( $post_data[ $field ] ) );
				}
			}
		}

		// do some validation

		return $post_data;
	}

	/*
	 * Load Privacy Settings
	 *
	 * @since 1.0.6
	 */
	public function load_privacy_settings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_privacy_settings" );

		$html = powerform_template( 'settings/popup/edit-privacy-settings' );

		wp_send_json_success( $html );
	}

	/**
	 * Save Privacy Settings
	 *
	 * @since 1.0.6
	 */
	public function save_privacy_settings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_privacy_settings" );
		$post_data = $_POST; // WPCS: CSRF OK by powerform_validate_ajax

		/**
		 * CUSTOM FORMS
		 */
		// Account Erasure Requests
		if ( isset( $post_data['erase_form_submissions'] ) ) {
			$post_data['erase_form_submissions']           = sanitize_text_field( $post_data['erase_form_submissions'] );
			$enable_erasure_request_erase_form_submissions = filter_var( $post_data['erase_form_submissions'], FILTER_VALIDATE_BOOLEAN );
			update_option( 'powerform_enable_erasure_request_erase_form_submissions', $enable_erasure_request_erase_form_submissions );
		}
		// Account Erasure Requests

		// Submissions Retention
		$cform_retain_forever = filter_var( $post_data['retain_submission_forever'], FILTER_VALIDATE_BOOLEAN );
		if ( $cform_retain_forever ) {
			$post_data['submissions_retention_number'] = 0;
		}
		if ( isset( $post_data['submissions_retention_number'] ) ) {
			$post_data['submissions_retention_number'] = sanitize_text_field( $post_data['submissions_retention_number'] );
			$post_data['submissions_retention_unit']   = sanitize_text_field( $post_data['submissions_retention_unit'] );
			$submissions_retention_number              = intval( $post_data['submissions_retention_number'] );
			if ( $submissions_retention_number < 0 ) {
				$submissions_retention_number = 0;
			}
			update_option( 'powerform_retain_submissions_interval_number', $submissions_retention_number );
		}
		update_option( 'powerform_retain_submissions_interval_unit', $post_data['submissions_retention_unit'] );
		// Submissions Retention

		// IP Retention
		$cform_retain_ip_forever = filter_var( $post_data['retain_ip_forever'], FILTER_VALIDATE_BOOLEAN );
		if ( $cform_retain_ip_forever ) {
			$post_data['cform_retention_ip_number'] = 0;
		}
		if ( isset( $post_data['cform_retention_ip_number'] ) ) {
			$post_data['cform_retention_ip_number'] = sanitize_text_field( $post_data['cform_retention_ip_number'] );
			$post_data['cform_retention_ip_unit']   = sanitize_text_field( $post_data['cform_retention_ip_unit'] );
			$cform_ip_retention_number              = intval( $post_data['cform_retention_ip_number'] );
			if ( $cform_ip_retention_number < 0 ) {
				$cform_ip_retention_number = 0;
			}
			update_option( 'powerform_retain_ip_interval_number', $cform_ip_retention_number );
		}
		update_option( 'powerform_retain_ip_interval_unit', $post_data['cform_retention_ip_unit'] );
		// IP Retention


		/**
		 * POLLS
		 */
		// Submissions Retention
		$poll_retain_submissions_forever = filter_var( $post_data['poll_retain_submission_forever'], FILTER_VALIDATE_BOOLEAN );
		if ( $poll_retain_submissions_forever ) {
			$post_data['poll_submissions_retention_number'] = 0;
		}
		// Polls
		if ( isset( $post_data['poll_submissions_retention_number'] ) ) {
			$post_data['poll_submissions_retention_number'] = sanitize_text_field( $post_data['poll_submissions_retention_number'] );
			$post_data['poll_submissions_retention_unit']   = sanitize_text_field( $post_data['poll_submissions_retention_unit'] );
			$poll_submissions_retention_number              = intval( $post_data['poll_submissions_retention_number'] );
			if ( $poll_submissions_retention_number < 0 ) {
				$poll_submissions_retention_number = 0;
			}
			update_option( 'powerform_retain_poll_submissions_interval_number', $poll_submissions_retention_number );
		}
		update_option( 'powerform_retain_poll_submissions_interval_unit', $post_data['poll_submissions_retention_unit'] );
		// Submissions Retention

		// IP Retention
		$poll_retain_ip_forever = filter_var( $post_data['retain_poll_forever'], FILTER_VALIDATE_BOOLEAN );
		if ( $poll_retain_ip_forever ) {
			$post_data['votes_retention_number'] = 0;
		}
		if ( isset( $post_data['votes_retention_number'] ) ) {
			$post_data['votes_retention_number'] = sanitize_text_field( $post_data['votes_retention_number'] );
			$post_data['votes_retention_unit']   = sanitize_text_field( $post_data['votes_retention_unit'] );
			$votes_retention_number              = intval( $post_data['votes_retention_number'] );
			if ( $votes_retention_number < 0 ) {
				$votes_retention_number = 0;
			}
			update_option( 'powerform_retain_votes_interval_number', $votes_retention_number );
		}
		update_option( 'powerform_retain_votes_interval_unit', $post_data['votes_retention_unit'] );
		// IP Retention

		/**
		 * QUIZ
		 */
		// Submissions Retention
		$quiz_retain_submissions_forever = filter_var( $post_data['quiz_retain_submission_forever'], FILTER_VALIDATE_BOOLEAN );
		if ( $quiz_retain_submissions_forever ) {
			$post_data['quiz_submissions_retention_number'] = 0;
		}
		if ( isset( $post_data['quiz_submissions_retention_number'] ) ) {
			$post_data['quiz_submissions_retention_number'] = sanitize_text_field( $post_data['quiz_submissions_retention_number'] );
			$post_data['quiz_submissions_retention_unit']   = sanitize_text_field( $post_data['quiz_submissions_retention_unit'] );
			$quiz_submissions_retention_number              = intval( $post_data['quiz_submissions_retention_number'] );
			if ( $quiz_submissions_retention_number < 0 ) {
				$quiz_submissions_retention_number = 0;
			}
			update_option( 'powerform_retain_quiz_submissions_interval_number', $quiz_submissions_retention_number );
		}
		update_option( 'powerform_retain_quiz_submissions_interval_unit', $post_data['quiz_submissions_retention_unit'] );
		// Submissions Retention

		wp_send_json_success();
	}

	/**
	 * Load Export Custom Form Popup
	 *
	 * @since 1.5
	 */
	public function load_export_custom_form() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_export_cform" );

		$html = powerform_template( 'custom-form/popup/export' );

		wp_send_json_success( $html );
	}

	/**
	 * Load Import Custom Form Popup
	 *
	 * @since 1.5
	 */
	public function load_import_custom_form() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_import_cform" );

		$html = powerform_template( 'custom-form/popup/import' );

		wp_send_json_success( $html );
	}

	/**
	 * Execute Import Form
	 *
	 * @since 1.5
	 */
	public function save_import_custom_form() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_error( __( 'Import Export Funktion deaktiviert.', Powerform::DOMAIN ) );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_save_import_custom_form" );

		$post_data  = $this->get_post_data();
		$importable = isset( $post_data['importable'] ) ? $post_data['importable'] : '';// wpcs: CSRF ok
		$importable = trim( $importable );
		$importable = sanitize_text_field( $importable );
		$importable = wp_unslash( $importable );

		try {
			if ( empty( $importable ) ) {
				throw new Exception( __( 'Importtext darf nicht leer sein.', Powerform::DOMAIN ) );
			}

			$import_data = json_decode( $importable, true );

			if ( empty( $import_data ) || ! is_array( $import_data ) ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			if ( ! isset( $import_data['type'] ) || 'form' !== $import_data['type'] ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			$model = Powerform_Custom_Form_Model::create_from_import_data( $import_data, 'Powerform_Custom_Form_Model' );

			if ( is_wp_error( $model ) ) {
				throw new Exception( $model->get_error_message() );
			}

			if ( ! $model instanceof Powerform_Custom_Form_Model ) {
				throw new Exception( __( 'Fehler beim Importieren des Formulars. Stelle sicher, dass der Importtext gültig ist, und versuche es erneut.', Powerform::DOMAIN ) );
			}

			$return_url = admin_url( 'admin.php?page=powerform-cform' );

			wp_send_json_success(
				array(
					'id'  => $model->id,
					'url' => $return_url,
				)
			);

		} catch ( Exception $e ) {
			wp_send_json_error( $e->getMessage() );
		}
	}

	/**
	 * Load Export Poll Popup
	 *
	 * @since 1.5
	 */
	public function load_export_poll() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_export_poll" );

		$html = powerform_template( 'poll/popup/export' );

		wp_send_json_success( $html );
	}

	/**
	 * Load Import Poll Popup
	 *
	 * @since 1.5
	 */
	public function load_import_poll() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_import_poll" );

		$html = powerform_template( 'poll/popup/import' );

		wp_send_json_success( $html );
	}

	/**
	 * Execute Import Poll
	 *
	 * @since 1.5
	 */
	public function save_import_poll() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_error( __( 'Import Export Funktion deaktiviert.', Powerform::DOMAIN ) );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_save_import_poll" );

		$post_data  = $this->get_post_data();
		$importable = isset( $post_data['importable'] ) ? $post_data['importable'] : '';// wpcs: CSRF ok
		$importable = trim( $importable );
		$importable = sanitize_text_field( $importable );
		$importable = wp_unslash( $importable );

		try {
			if ( empty( $importable ) ) {
				throw new Exception( __( 'Importtext darf nicht leer sein.', Powerform::DOMAIN ) );
			}

			$import_data = json_decode( $importable, true );

			if ( empty( $import_data ) || ! is_array( $import_data ) ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			if ( ! isset( $import_data['type'] ) || 'poll' !== $import_data['type'] ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			$model = Powerform_Poll_Form_Model::create_from_import_data( $import_data, 'Powerform_Poll_Form_Model' );

			if ( is_wp_error( $model ) ) {
				throw new Exception( $model->get_error_message() );
			}

			if ( ! $model instanceof Powerform_Poll_Form_Model ) {
				throw new Exception( __( 'Fehler beim Importieren der Umfrage. Stelle sicher, dass der Importtext gültig ist, und versuche es erneut.', Powerform::DOMAIN ) );
			}

			$return_url = admin_url( 'admin.php?page=powerform-poll' );

			wp_send_json_success(
				array(
					'id'  => $model->id,
					'url' => $return_url,
				)
			);

		} catch ( Exception $e ) {
			wp_send_json_error( $e->getMessage() );
		}
	}

	/**
	 * Load Export Quiz Popup
	 *
	 * @since 1.5
	 */
	public function load_export_quiz() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_export_quiz" );

		$html = powerform_template( 'quiz/popup/export' );

		wp_send_json_success( $html );
	}

	/**
	 * Load Import Quiz Popup
	 *
	 * @since 1.5
	 */
	public function load_import_quiz() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_success( '' );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_popup_import_quiz" );

		$html = powerform_template( 'quiz/popup/import' );

		wp_send_json_success( $html );
	}

	/**
	 * Execute Import Quiz
	 *
	 * @since 1.5
	 */
	public function save_import_quiz() {
		if ( ! Powerform::is_import_export_feature_enabled() ) {
			wp_send_json_error( __( 'Import Export Funktion deaktiviert.', Powerform::DOMAIN ) );
		}
		// Validate nonce
		powerform_validate_ajax( "powerform_save_import_quiz" );

		$post_data  = $this->get_post_data();
		$importable = isset( $post_data['importable'] ) ? $post_data['importable'] : '';// wpcs: CSRF ok
		$importable = trim( $importable );
		$importable = sanitize_text_field( $importable );
		$importable = wp_unslash( $importable );

		try {
			if ( empty( $importable ) ) {
				throw new Exception( __( 'Importtext darf nicht leer sein.', Powerform::DOMAIN ) );
			}

			$import_data = json_decode( $importable, true );

			if ( empty( $import_data ) || ! is_array( $import_data ) ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			if ( ! isset( $import_data['type'] ) || 'quiz' !== $import_data['type'] ) {
				throw new Exception( __( 'Hoppla, es sieht so aus, als hätten wir ein Problem gefunden. Importtext darf keine Leerzeichen oder Sonderzeichen enthalten.', Powerform::DOMAIN ) );
			}

			/** @var Powerform_Quiz_Form_Model|WP_Error $model */
			$model = Powerform_Quiz_Form_Model::create_from_import_data( $import_data, 'Powerform_Quiz_Form_Model' );

			if ( is_wp_error( $model ) ) {
				throw new Exception( $model->get_error_message() );
			}

			if ( ! $model instanceof Powerform_Quiz_Form_Model ) {
				throw new Exception( __( 'Fehler beim Importieren des Quiz. Stelle sicher, dass der Importtext gültig ist, und versuche es erneut.', Powerform::DOMAIN ) );
			}

			$return_url = admin_url( 'admin.php?page=powerform-quiz' );

			wp_send_json_success(
				array(
					'id'  => $model->id,
					'url' => $return_url,
				)
			);

		} catch ( Exception $e ) {
			wp_send_json_error( $e->getMessage() );
		}
	}

	/**
	 * Save pagination data
	 *
	 * @since 1.6
	 */
	public function save_pagination() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_popup_pagination" );

		$pagination         = intval( sanitize_text_field( $_POST['pagination_entries'] ) );// WPCS: CSRF ok by powerform_validate_ajax.
		$pagination_listing = intval( sanitize_text_field( $_POST['pagination_listings'] ) ); // WPCS: CSRF ok by powerform_validate_ajax.

		if ( 1 > $pagination || 1 > $pagination_listing ) {
			wp_send_json_error( __( "Das Limit pro Seite darf nicht kleiner als eins sein.", Powerform::DOMAIN ) );
		}

		update_option( "powerform_pagination_entries", $pagination );
		update_option( "powerform_pagination_listings", $pagination_listing );
		wp_send_json_success();

	}

	/**
	 * Save accessibility_settings
	 *
	 * @since 1.6.1
	 */
	public function save_accessibility_settings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_accessibility_settings" );

		$enable_accessibility = isset( $_POST['enable_accessibility'] ) ? $_POST['enable_accessibility'] : false;// WPCS: CSRF ok by powerform_validate_ajax.
		$enable_accessibility = filter_var( $enable_accessibility, FILTER_VALIDATE_BOOLEAN );

		update_option( "powerform_enable_accessibility", $enable_accessibility );
		wp_send_json_success();
	}

	/**
	 * Save dashboard
	 *
	 * @since 1.6.3
	 */
	public function save_dashboard_settings() {
		// Validate nonce
		powerform_validate_ajax( "powerform_save_dashboard_settings" );

		$dashboard_settings = powerform_get_dashboard_settings();
		$widgets            = array( 'forms', 'polls', 'quizzes' );

		$num_recents = isset( $_POST['num_recent'] ) ? $_POST['num_recent'] : array();// WPCS: CSRF ok by powerform_validate_ajax.
		$publisheds  = isset( $_POST['published'] ) ? $_POST['published'] : array();// WPCS: CSRF ok by powerform_validate_ajax.
		$drafts      = isset( $_POST['draft'] ) ? $_POST['draft'] : array();// WPCS: CSRF ok by powerform_validate_ajax.

		// value based settings
		foreach ( $num_recents as $widget => $value ) {
			if ( ! isset( $dashboard_settings[ $widget ] ) ) {
				$dashboard_settings[ $widget ] = array();
			}
			$value = intval( $value );
			// at least 0
			if ( $value >= 0 ) {
				$dashboard_settings[ $widget ]['num_recent'] = intval( $value );
			}
		}

		// bool based settings aka checkboxes
		foreach ( $widgets as $widget ) {
			if ( ! isset( $dashboard_settings[ $widget ] ) ) {
				$dashboard_settings[ $widget ] = array();
			}

			// default enabled, handle when not exist = false
			if ( ! isset( $publisheds[ $widget ] ) ) {
				$dashboard_settings[ $widget ]['published'] = false;
			}
			if ( ! isset( $drafts[ $widget ] ) ) {
				$dashboard_settings[ $widget ]['draft'] = false;
			}
		}

		update_option( 'powerform_dashboard_settings', $dashboard_settings );

		wp_send_json_success();
	}

}