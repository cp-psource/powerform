<?php

/**
 * Powerform_Poll_Front_Mail
 *
 * @since 1.6.1
 */
class Powerform_Poll_Front_Mail extends Powerform_Mail {

	protected $message_vars;

	/**
	 * Default content type
	 *
	 * @var string
	 */
	protected $content_type = 'text/html; charset=UTF-8';

	/**
	 * Initialize the mail
	 *
	 * @param array $post_vars - post variables
	 */
	public function init( $post_vars ) {
		$user_email  = false;
		$user_name   = '';
		$user_login  = '';
		$embed_id    = $post_vars['page_id'];
		$embed_title = get_the_title( $embed_id );
		$embed_url   = powerform_get_current_url();
		$site_url    = site_url();

		//Check if user is logged in
		if ( is_user_logged_in() ) {
			$current_user = wp_get_current_user();
			$user_email   = $current_user->user_email;
			if ( ! empty( $current_user->user_firstname ) ) {
				$user_name = $current_user->user_firstname . ' ' . $current_user->user_lastname;
			} elseif ( ! empty( $current_user->display_name ) ) {
				$user_name = $current_user->display_name;
			} else {
				$user_name = $current_user->display_name;
			}
			$user_login = $current_user->user_login;
		}

		//Set up mail variables
		$message_vars       = powerform_set_message_vars( $embed_id, $embed_title, $embed_url, $user_name, $user_email, $user_login, $site_url );
		$this->message_vars = $message_vars;

	}

	/**
	 * Process mail
	 *
	 * @since 1.6.1
	 *
	 * @param Powerform_Poll_Form_Model  $poll
	 * @param array                       $data
	 * @param Powerform_Form_Entry_Model $entry
	 */
	public function process_mail( $poll, $data, Powerform_Form_Entry_Model $entry ) {
		$setting = $poll->settings;

		if ( ! isset( $data['current_url'] ) || empty( $data['current_url'] ) ) {
			$data['current_url'] = powerform_get_current_url();
		}

		/**
		 * Message data filter
		 *
		 * @since 1.6.1
		 *
		 * @param array                       $data - the post data
		 * @param Powerform_Poll_Form_Model  $poll - the poll model
		 * @param Powerform_Form_Entry_Model $entry
		 *
		 *
		 * @return array $data
		 */
		$data = apply_filters( 'powerform_poll_mail_data', $data, $poll, $entry );

		/**
		 * Action called before mail is sent
		 *
		 * @param Powerform_Poll_Form_Model  $this - the current poll
		 * @param Powerform_Poll_Form_Model  $poll - the current poll
		 * @param array                       $data - current data
		 * @param Powerform_Form_Entry_Model $entry
		 */
		do_action( 'powerform_poll_mail_before_send_mail', $this, $poll, $data, $entry );

		//Process admin mail
		if ( $this->is_send_admin_mail( $setting ) ) {
			$this->init( $_POST ); // WPCS: CSRF OK
			$recipients = $this->get_admin_email_recipients( $setting, $data, $poll, $entry );

			/**
			 * Custom form admin mail recipients filter
			 *
			 * @since 1.6.1
			 *
			 * @param array                      $recipients
			 * @param Powerform_Poll_Form_Model $poll the current poll
			 *
			 * @return array $recipients
			 */
			$recipients = apply_filters_deprecated(
				'powerform_poll_mail_admin_recipients',
				array( $recipients, $poll, $data, $entry, $this ),
				'1.6.2',
				'powerform_poll_get_admin_email_recipients'
			);

			if ( ! empty( $recipients ) ) {
				$subject = $setting['admin-email-title'];
				$subject = powerform_replace_variables( $subject, $poll->id, $data['current_url'] );
				$subject = powerform_replace_poll_form_data( $subject, $poll, $data, $entry );

				/**
				 * Poll subject filter
				 *
				 * @since 1.6.1
				 *
				 * @param string                     $subject
				 * @param Powerform_Poll_Form_Model $poll the current poll
				 *
				 * @return string $subject
				 */
				$subject = apply_filters( 'powerform_poll_mail_admin_subject', $subject, $poll, $data, $entry, $this );


				$message = $setting['admin-email-editor'];
				$message = powerform_replace_variables( $message, $poll->id, $data['current_url'] );
				$message = powerform_replace_poll_form_data( $message, $poll, $data, $entry );

				/**
				 * Poll mail message filter
				 *
				 * @since 1.6.1
				 *
				 * @param string                     $message
				 * @param Powerform_Poll_Form_Model $poll the current poll
				 * @param array                      $data
				 * @param Powerform_Poll_Front_Mail $this
				 *
				 * @return string $message
				 */
				$message = apply_filters( 'powerform_poll_mail_admin_message', $message, $poll, $data, $entry, $this );

				$from_name = $this->sender_name;
				if ( isset( $setting['admin-email-from-name'] ) && ! empty( $setting['admin-email-from-name'] ) ) {
					$setting_from_name = $setting['admin-email-from-name'];
					$setting_from_name = powerform_replace_variables( $setting_from_name, $poll->id, $data['current_url'] );
					$setting_from_name = powerform_replace_poll_form_data( $setting_from_name, $poll, $data, $entry );

					if ( ! empty( $setting_from_name ) ) {
						$from_name = $setting_from_name;
					}
				}
				/**
				 * Filter `From` name of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param string                      $from_name
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$from_name = apply_filters( 'powerform_poll_mail_admin_from_name', $from_name, $poll, $data, $entry, $this );

				$from_email = $this->sender_email;
				if ( isset( $setting['admin-email-from-address'] ) && ! empty( $setting['admin-email-from-address'] ) ) {
					$setting_from_address = $setting['admin-email-from-address'];
					$setting_from_address = powerform_replace_variables( $setting_from_address, $poll->id, $data['current_url'] );
					$setting_from_address = powerform_replace_poll_form_data( $setting_from_address, $poll, $data, $entry );

					if ( is_email( $setting_from_address ) ) {
						$from_email = $setting_from_address;
					}
				}
				/**
				 * Filter `From` email address of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param string                      $from_email
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$from_email = apply_filters( 'powerform_poll_mail_admin_from_email', $from_email, $poll, $data, $entry, $this );

				$reply_to_address = '';
				if ( isset( $setting['admin-email-reply-to-address'] ) && ! empty( $setting['admin-email-reply-to-address'] ) ) {
					$setting_reply_to_address = $setting['admin-email-reply-to-address'];
					$setting_reply_to_address = powerform_replace_variables( $setting_reply_to_address, $poll->id, $data['current_url'] );
					$setting_reply_to_address = powerform_replace_poll_form_data( $setting_reply_to_address, $poll, $data, $entry );

					if ( is_email( $setting_reply_to_address ) ) {
						$reply_to_address = $setting_reply_to_address;
					}
				}

				/**
				 * Filter `Reply To` email address of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param string                      $reply_to_address
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$reply_to_address = apply_filters( 'powerform_poll_mail_admin_reply_to', $reply_to_address, $poll, $data, $entry, $this );

				$cc_addresses = array();
				if ( isset( $setting['admin-email-cc-address'] ) && ! empty( $setting['admin-email-cc-address'] ) && is_array( $setting['admin-email-cc-address'] ) ) {
					$setting_cc_addresses = $setting['admin-email-cc-address'];

					foreach ( $setting_cc_addresses as $key => $setting_cc_address ) {
						$setting_cc_address = powerform_replace_variables( $setting_cc_address, $poll->id, $data['current_url'] );
						$setting_cc_address = powerform_replace_poll_form_data( $setting_cc_address, $poll, $data, $entry );
						if ( is_email( $setting_cc_address ) ) {
							$cc_addresses[] = $setting_cc_address;
						}
					}
				}
				/**
				 * Filter `CC` email addresses of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param array                       $cc_addresses
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$cc_addresses = apply_filters( 'powerform_poll_mail_admin_cc_addresses', $cc_addresses, $poll, $data, $entry, $this );

				$bcc_addresses = array();
				if ( isset( $setting['admin-email-bcc-address'] ) && ! empty( $setting['admin-email-bcc-address'] ) && is_array( $setting['admin-email-bcc-address'] ) ) {
					$setting_bcc_addresses = $setting['admin-email-bcc-address'];

					foreach ( $setting_bcc_addresses as $key => $setting_bcc_address ) {
						$setting_bcc_address = powerform_replace_variables( $setting_bcc_address, $poll->id, $data['current_url'] );
						$setting_bcc_address = powerform_replace_poll_form_data( $setting_bcc_address, $poll, $data, $entry );
						if ( is_email( $setting_bcc_address ) ) {
							$bcc_addresses[] = $setting_bcc_address;
						}
					}
				}
				/**
				 * Filter `BCC` email addresses of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param array                       $bcc_addresses
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$bcc_addresses = apply_filters( 'powerform_poll_mail_admin_bcc_addresses', $bcc_addresses, $poll, $data, $entry, $this );

				$content_type = $this->content_type;
				/**
				 * Filter `Content-Type` of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param string                      $content_type
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$content_type = apply_filters( 'powerform_poll_mail_admin_content_type', $content_type, $poll, $data, $entry, $this );

				$headers = array();

				// only change From header if these two are valid
				if ( ! empty( $from_name ) && ! empty( $from_email ) ) {
					$headers[] = 'Von: ' . $from_name . ' <' . $from_email . '>';
				}

				if ( ! empty( $reply_to_address ) ) {
					$headers[] = 'Antwort an: ' . $reply_to_address;
				}

				if ( ! empty( $cc_addresses ) && is_array( $cc_addresses ) ) {
					$headers[] = 'Cc: ' . implode( ', ', $cc_addresses );
				}

				if ( ! empty( $bcc_addresses ) && is_array( $bcc_addresses ) ) {
					$headers[] = 'BCc: ' . implode( ', ', $bcc_addresses );
				}

				if ( ! empty( $content_type ) ) {
					$headers[] = 'Content-Typ: ' . $content_type;
				}

				/**
				 * Filter headers of mail that send to admin
				 *
				 * @since 1.6.1
				 *
				 * @param array                       $headers
				 * @param Powerform_Poll_Form_Model  $poll  current poll Model
				 * @param array                       $data  POST data
				 * @param Powerform_Form_Entry_Model $entry entry model
				 * @param Powerform_Poll_Front_Mail  $this  mail class
				 */
				$headers = apply_filters( 'powerform_poll_mail_admin_headers', $headers, $poll, $data, $entry, $this );

				$this->set_headers( $headers );

				$this->set_subject( $subject );
				$this->set_recipients( $recipients );
				$this->set_message_with_vars( $this->message_vars, $message );
				$this->send_multiple();

				/**
				 * Action called after admin mail sent
				 *
				 * @param Powerform_Poll_Front_Mail - the current poll
				 * @param Powerform_Poll_Form_Model - the current poll
				 * @param array                       $data       - current data
				 * @param Powerform_Form_Entry_Model $entry      - saved entry
				 * @param array                       $recipients - array or recipients
				 */
				do_action( 'powerform_poll_mail_admin_sent', $this, $poll, $data, $entry, $recipients );
			}
		}


		/**
		 * Action called after mail is sent
		 *
		 * @param Powerform_Poll_Front_Mail - the current poll
		 * @param Powerform_Poll_Form_Model - the current poll
		 * @param array $data - current data
		 */
		do_action( 'powerform_poll_mail_after_send_mail', $this, $poll, $data );
	}

	/**
	 * Check if all conditions are met to send admin email
	 *
	 * @since 1.6.1
	 *
	 * @param array $setting - the poll settings
	 *
	 * @return bool
	 */
	public function is_send_admin_mail( $setting ) {
		if ( isset( $setting['use-admin-email'] ) && ! empty( $setting['use-admin-email'] ) ) {
			if ( filter_var( $setting['use-admin-email'], FILTER_VALIDATE_BOOLEAN ) ) {
				if ( isset( $setting['admin-email-title'] ) && isset( $setting['admin-email-editor'] ) ) {
					return true;
				}
			}
		}

		return false;
	}


	/**
	 * Get Recipients of admin emails
	 *
	 * @since 1.6.1
	 * @since 1.6.2 add $data, $poll model, $entry
	 *
	 * @param array                       $setting backward compat param
	 * @param array                       $data
	 * @param Powerform_Poll_Form_Model  $poll
	 * @param Powerform_Form_Entry_Model $entry
	 *
	 * @return array
	 */
	public function get_admin_email_recipients( $setting, $data = array(), $poll = null, $entry = null ) {

		// use settings from model if applicable
		if ( $poll instanceof Powerform_Poll_Form_Model ) {
			$setting = $poll->settings;
		}
		$email = array();
		if ( isset( $setting['admin-email-recipients'] ) && ! empty( $setting['admin-email-recipients'] ) ) {
			if ( is_array( $setting['admin-email-recipients'] ) ) {
				$email = $setting['admin-email-recipients'];
			}
		}

		return apply_filters( 'powerform_poll_get_admin_email_recipients', $email, $setting, $data, $poll, $entry );
	}

}