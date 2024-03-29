<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Front ajax for custom forms
 *
 * @since 1.0
 */
class Powerform_CForm_Front_Action extends Powerform_Front_Action {

	/**
	 * Entry type
	 *
	 * @var string
	 */
	public $entry_type = 'custom-forms';

	/**
	 * Plugin instance
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Response message
	 *
	 * @var array
	 */
	private static $response = array();

	/**
	 * Render ID of Form
	 *
	 * @var array
	 */
	private static $render_id = '';

	/**
	 * Hold $_POST submitted data
	 *
	 * @since 1.5.1
	 * @var array
	 */
	private $_post_data = array();

	/**
	 * Return the plugin instance
	 *
	 * @since 1.0
	 * @return Powerform_Front_Action
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Do PayPal backend check
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to get_post_data()
	 *
	 * @param $payment_id
	 *
	 * @return array
	 */
	public function handle_paypal( $payment_id ) {
		$post_data     = $this->get_post_data();
		$payment_total = isset( $post_data['payment_total'] ) ? sanitize_text_field( $post_data['payment_total'] ) : false;
		$paypal        = new Powerform_Paypal_Express();

		$result = $paypal->paypal_check( $payment_id, $payment_total );

		$response = array(
			'success' => $result ? true : false,
		);

		return $response;
	}

	/**
	 * Handle submit
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 */
	public function handle_submit() {
		$this->_post_data = $this->get_post_data();
		$post_data        = $this->_post_data;

		$form_id = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false; // WPCS: CSRF OK

		if ( $form_id ) {
			/**
			 * Action called before full form submit
			 *
			 * @since 1.0.2
			 *
			 * @param int $form_id - the form id
			 */
			do_action( 'powerform_custom_form_before_handle_submit', $form_id );

			$response = $this->handle_form( $form_id );

			// sanitize front end message
			if ( is_array( $response ) && isset( $response['message'] ) && ! empty( $response['message'] ) ) {
				$response['message'] = wp_kses_post( $response['message'] );
			}

			/**
			 * Filter submit response
			 *
			 * @since 1.0.2
			 *
			 * @param array $response - the post response
			 * @param int   $form_id  - the form id
			 *
			 * @return array $response
			 */
			$response = apply_filters( 'powerform_custom_form_submit_response', $response, $form_id );

			/**
			 * Action called after full form submit
			 *
			 * @since 1.0.2
			 *
			 * @param int   $form_id  - the form id
			 * @param array $response - the post response
			 */
			do_action( 'powerform_custom_form_after_handle_submit', $form_id, $response );

			if ( $response && is_array( $response ) ) {
				if ( ! empty( $response ) ) {
					self::$response = $response;
					add_action( 'powerform_cform_post_message', array( $this, 'form_response_message' ), 10, 2 );
					if ( ! $response['success'] && isset( $response['errors'] ) ) {
						add_action( 'wp_footer', array( $this, 'footer_message' ) );
					}
					if ( $response['success'] ) {
						if ( isset( $response['url'] ) ) {
							wp_safe_redirect( $response['url'] );
							exit;
						} else {
							// cleanup submitted data
							$_POST = array();
						}
					}
				}
			}
		}
	}

	/**
	 * Save entry
	 *
	 * @since 1.0
	 * @since 1.1 Change $_POST to get_post_data
	 * @return void
	 */
	public function save_entry() {
		$this->_post_data = $this->get_post_data();
		$post_data        = $this->_post_data;

		if ( $this->validate_ajax( 'powerform_submit_form', 'POST', 'powerform_nonce' ) ) {
			$form_id    = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false; // WPCS: CSRF OK
			$payment_id = isset( $post_data['payment_id'] ) ? sanitize_text_field( $post_data['payment_id'] ) : false; // WPCS: CSRF OK

			if ( $form_id ) {

				/**
				 * Action called before form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int    $form_id - the form id
				 * @param string $type    - the submit type. In this case submit
				 */
				do_action( 'powerform_custom_form_before_save_entry', $form_id, 'submit' );

				$response = $this->handle_form( $form_id );

				// sanitize front end message
				if ( is_array( $response ) && isset( $response['message'] ) && ! empty( $response['message'] ) ) {
					$response['message'] = wp_kses_post( $response['message'] );
				}

				/**
				 * Filter ajax response
				 *
				 * @since 1.0.2
				 *
				 * @param array  $response - the post response
				 * @param int    $form_id  - the form id
				 * @param string $type     - the submit type. In this case submit
				 *
				 */
				$response = apply_filters( 'powerform_custom_form_ajax_submit_response', $response, $form_id, 'submit' );


				/**
				 * Action called after form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int    $form_id  - the form id
				 * @param array  $response - the post response
				 * @param string $type     - the submit type. In this case submit
				 */
				do_action( 'powerform_custom_form_after_save_entry', $form_id, $response, 'submit' );

				if ( ! $response['success'] && isset( $response['errors'] ) ) {
					wp_send_json_error( $response );
				} else {
					wp_send_json_success( $response );
				}
			} elseif ( $payment_id ) {

				/**
				 * Action called before form payment
				 *
				 * @since 1.0.2
				 *
				 * @param int    $payment_id - the payment id
				 * @param string $type       - the submit type. In this case payment
				 */
				do_action( 'powerform_custom_form_before_save_entry', $payment_id, 'payment' );

				$response = $this->handle_paypal( $payment_id );

				/**
				 * Filter ajax payment response
				 *
				 * @since 1.0.2
				 *
				 * @param array  $response   - the post response
				 * @param int    $payment_id - the payment id
				 * @param string $type       - the submit type. In this case payment
				 *
				 * @return array $response
				 */
				$response = apply_filters( 'powerform_custom_form_ajax_submit_response', $response, $payment_id, 'payment' );

				/**
				 * Action called after form payment
				 *
				 * @since 1.0.2
				 *
				 * @param int    $payment_id - the payment id
				 * @param array  $response   - the post response
				 * @param string $type       - the submit type. In this case payment
				 */
				do_action( 'powerform_custom_form_after_save_entry', $payment_id, $response, 'payment' );

				if ( ! $response['success'] && isset( $response['errors'] ) ) {
					wp_send_json_error( $response );
				} else {
					wp_send_json_success( $response );
				}
			}
		}
	}

	/**
	 * Save entry
	 *
	 * @since 1.6
	 * @return void
	 */
	public function save_entry_preview() {
		$this->_post_data = $this->get_post_data();
		$post_data        = $this->_post_data;

		if ( $this->validate_ajax( 'powerform_submit_form', 'POST', 'powerform_nonce' ) ) {
			$form_id    = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false; // WPCS: CSRF OK
			$payment_id = isset( $post_data['payment_id'] ) ? sanitize_text_field( $post_data['payment_id'] ) : false; // WPCS: CSRF OK

			if ( $form_id ) {

				/**
				 * Action called before form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int    $form_id - the form id
				 * @param string $type    - the submit type. In this case submit
				 */
				do_action( 'powerform_custom_form_before_save_entry', $form_id, 'submit' );

				$response = $this->handle_form( $form_id, true );

				// sanitize front end message
				if ( is_array( $response ) && isset( $response['message'] ) && ! empty( $response['message'] ) ) {
					$response['message'] = wp_kses_post( $response['message'] );
				}

				/**
				 * Filter ajax response
				 *
				 * @since 1.0.2
				 *
				 * @param array  $response - the post response
				 * @param int    $form_id  - the form id
				 * @param string $type     - the submit type. In this case submit
				 *
				 */
				$response = apply_filters( 'powerform_custom_form_ajax_submit_response', $response, $form_id, 'submit' );


				/**
				 * Action called after form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int    $form_id  - the form id
				 * @param array  $response - the post response
				 * @param string $type     - the submit type. In this case submit
				 */
				do_action( 'powerform_custom_form_after_save_entry', $form_id, $response, 'submit' );

				if ( ! $response['success'] && isset( $response['errors'] ) ) {
					wp_send_json_error( $response );
				} else {
					wp_send_json_success( $response );
				}
			}
		}
	}

	/**
	 * Handle form
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 * @since 1.5.1 utilize `_post_data` which already defined on submit
	 *
	 * @param $form_id
	 * @param $preview
	 *
	 * @return array|bool
	 */
	public function handle_form( $form_id, $preview = false ) {
		$submitted_data = $this->_post_data;

		/** @var Powerform_Custom_Form_Model $custom_form */
		$custom_form = Powerform_Custom_Form_Model::model()->load( $form_id );
		if ( is_object( $custom_form ) ) {
			$setting          = $this->get_form_settings( $custom_form );
			$form_submit      = $custom_form->form_can_submit();
			$can_submit       = $form_submit['can_submit'];
			$submit_error     = $form_submit['error'];
			$prevent_store    = $custom_form->is_prevent_store();
			$submission_behav = $custom_form->get_submission_behaviour();

			// If preview, prevent storing
			if ( $preview ) {
				$prevent_store = true;
			}

			if ( isset( $setting['logged-users'] ) && $setting['logged-users'] ) {
				$error = __( "Nur angemeldete Benutzer können dieses Formular senden.", Powerform::DOMAIN );
				$can_submit = is_user_logged_in();
			}

			// disable submit if status is not published
			if ( Powerform_Custom_Form_Model::STATUS_PUBLISH !== $custom_form->status ) {
				$error = __( "This form is not published.", Powerform::DOMAIN );
				$can_submit = false;
			}

			/**
			 * Filter to check if current user can submit the form
			 *
			 * @since 1.0.2
			 *
			 * @param bool $can_submit - if can submit depending on above conditions
			 * @param int  $form_id    - the form id
			 *
			 * @return bool $can_submit - true|false
			 */
			$can_submit = apply_filters( 'powerform_custom_form_handle_form_user_can_submit', $can_submit, $form_id );

			if ( $can_submit ) {
				$submit_errors     = array();
				$entry             = new Powerform_Form_Entry_Model();
				$entry->entry_type = $this->entry_type;
				$entry->form_id    = $form_id;
				$field_data_array  = array();
				$fields            = $custom_form->get_fields();
				$field_suffix      = Powerform_Form_Entry_Model::field_suffix();
				$field_forms       = powerform_fields_to_array();
				$product_fields    = array();

				// set default response to error message
				$response = array(
					'message' => __( "Zum Absenden des Formulars muss mindestens ein Feld ausgefüllt werden.", Powerform::DOMAIN ),
					'errors'  => array(),
					'success' => false,
					'behav'   => $submission_behav,
				);

				if ( ! is_null( $fields ) ) {

					// verify captcha before any else
					$captcha_field = $custom_form->get_captcha_field();
					if ( $captcha_field && isset( $field_forms['captcha'] ) && $field_forms['captcha'] instanceof Powerform_Captcha ) {
						$captcha_field_array   = $captcha_field->to_formatted_array();
						$field_id              = Powerform_Field::get_property( 'element_id', $captcha_field_array );
						$captcha_user_response = '';
						if ( isset( $submitted_data['g-recaptcha-response'] ) ) {
							$captcha_user_response = $submitted_data['g-recaptcha-response'];
						}

						/**
						 * Filter captcha user response, default is from `g-recaptcha-response`
						 *
						 * @since 1.5.3
						 *
						 * @param string $captcha_user_response
						 * @param int    $form_id
						 * @param array  $submitted_data
						 *
						 * @return string captcha user response
						 */
						$captcha_user_response = apply_filters( 'powerform_captcha_user_response', $captcha_user_response, $form_id, $submitted_data );

						/** @var Powerform_Field $field_captcha_obj */
						$field_captcha_obj = $field_forms['captcha'];
						if ( $field_captcha_obj->is_available( $captcha_field_array ) ) {
							$field_captcha_obj->validate( $captcha_field_array, $captcha_user_response );

							$valid_response = $field_captcha_obj->is_valid_entry();
							if ( is_array( $valid_response ) && isset( $valid_response[ $field_id ] ) ) {
								$submit_errors[][ $captcha_field->slug ] = $valid_response[ $field_id ];

								// does not need validate other fields
								$fields = array();
							}
						}

					}

					$ignored_field_types = Powerform_Form_Entry_Model::ignored_fields();
					foreach ( $fields as $field ) {
						$field_array = $field->to_formatted_array();
						$field_type  = $field_array["type"];
						if ( in_array( $field_type, $ignored_field_types, true ) ) {
							continue;
						}
						if ( isset( $field->slug ) ) {
							$field_id     = Powerform_Field::get_property( 'element_id', $field_array );
							$mod_field_id = $field_id;
							$field_data   = array();
							$field_type   = $field_array["type"];
							$post_file    = false;
							if ( ! isset( $submitted_data[ $field_id ] ) ) {
								foreach ( $field_suffix as $suffix ) {
									$mod_field_id = $field_id . '-' . $suffix;
									if ( isset( $submitted_data[ $mod_field_id ] ) ) {
										$field_data[ $suffix ] = $submitted_data[ $mod_field_id ];
									} elseif ( isset( $_FILES[ $mod_field_id ] ) ) {
										if ( "postdata" === $field_type && 'post-image' === $suffix ) {
											$post_file = $mod_field_id;
										}
									}
								}
								if ( "postdata" === $field_type ) {
									$custom_vars = Powerform_Field::get_property( 'custom_vars', $field_array );
									if ( ! empty( $custom_vars ) ) {
										foreach ( $custom_vars as $variable ) {
											$value    = ! empty( $variable['value'] ) ? $variable['value'] : sanitize_title( $variable['label'] );
											$input_id = $field_id . '-post_meta-' . $value;
											$label    = $variable['label'];
											if ( isset( $submitted_data[ $input_id ] ) ) {
												$field_data['post-custom'][] = array(
													'label' => $label,
													'value' => $submitted_data[ $input_id ],
													'key'   => $value,
												);
											}
										}
									}
								}
							} else {
								$field_data = $submitted_data[ $field_id ];
							}

							if ( isset( $field_forms[ $field_type ] ) && ! empty( $field_forms[ $field_type ] ) ) {
								/** @var Powerform_Field $form_field_obj */
								$form_field_obj = $field_forms[ $field_type ];

								// is conditionally hidden go to next field
								if ( $form_field_obj->is_hidden( $field_array, $submitted_data ) ) {
									continue;
								}

								if ( "upload" === $field_type ) {
									/** @var  Powerform_Upload $form_field_obj */
									$upload_data = $form_field_obj->handle_file_upload( $field_array );
									if ( isset( $upload_data['success'] ) && $upload_data['success'] ) {
										$field_data['file'] = $upload_data;
									} elseif ( isset( $upload_data['success'] ) && false === $upload_data['success'] ) {
										$response = array(
											'message' => $upload_data['message'],
											'errors'  => array(),
											'success' => false,
											'behav'   => $submission_behav,
										);

										return $response;
									} else {
										// no file uploaded for this field_id
										$field_data = '';
									}
								}
								if ( "postdata" === $field_type ) {
									if ( $post_file ) {
										$post_image = $form_field_obj->upload_post_image( $field_array, $post_file );
										if ( is_array( $post_image ) && $post_image['attachment_id'] > 0 ) {
											$field_data['post-image'] = $post_image;
										} else {
											$field_data['post-image'] = '';
										}
									}

								}
								if ( 'url' === $field_type ) {
									$field_data = $form_field_obj->add_scheme_url( $field_data );
								}

								/**
								 * @since 1.0.5
								 * Load Autofill
								 */
								$form_field_obj->init_autofill( $setting );

								if ( ! empty( $field_data ) || '0' === $field_data ) {
									// Validate data when its available and not hidden on front end
									if ( $form_field_obj->is_available( $field_array ) && ! $form_field_obj->is_hidden( $field_array, $submitted_data ) ) {

										/**
										 * @since 1.0.5
										 * Mayble re autofill, when autofill not editable, it should return autofill value
										 */
										$field_data = $form_field_obj->maybe_re_autofill( $field_array, $field_data, $setting );

										$form_field_obj->validate( $field_array, $field_data );
									}
									$valid_response = $form_field_obj->is_valid_entry();
									if ( ! is_array( $valid_response ) ) {

										/**
										 * Sanitize data
										 *
										 * @since 1.0.2
										 *
										 * @param array        $field
										 * @param array|string $data - the data to be sanitized
										 */
										$field_data = $form_field_obj->sanitize( $field_array, $field_data );


										if ( "postdata" === $field_type && ! $form_field_obj->is_hidden( $field_array, $submitted_data ) ) {
											// check if field_data of post values not empty (happen when postdata is not required)
											$filtered = array_filter( $field_data );
											if ( ! empty( $filtered ) ) {
												$post_id = $form_field_obj->save_post( $field_array, $field_data );
												if ( $post_id ) {
													$field_data             = array();
													$field_data['postdata'] = $post_id;
												} else {
													$submit_errors[][ $field->slug ] = __( 'Beim Speichern der Beitragsdaten ist ein Fehler aufgetreten. Bitte versuche es erneut', Powerform::DOMAIN );
												}
											} else {
												$field_data             = array();
												$field_data['postdata'] = null;
											}

										}
										if ( "product" === $field_type ) {
											$product_fields[] = array(
												'name'  => $field_id,
												'value' => $field_data,
											);
										}
										$field_data_array[] = array(
											'name'  => $field_id,
											'value' => $field_data,
										);
									} else {
										if ( is_array( $valid_response ) ) {
											foreach ( $valid_response as $error_field => $error_response ) {
												$submit_errors[][ $error_field ] = $error_response;
											}
										}
									}

								} else {
									// Validate data when its available and not hidden on front end
									if ( $form_field_obj->is_available( $field_array ) && ! $form_field_obj->is_hidden( $field_array, $submitted_data ) ) {
										/**
										 * @since 1.0.5
										 * Mayble re autofill, when autofill not editable, it should return autofill value
										 */
										$field_data = $form_field_obj->maybe_re_autofill( $field_array, '', $setting );
										$form_field_obj->validate( $field_array, $field_data );
									}
									$valid_response = $form_field_obj->is_valid_entry();
									if ( is_array( $valid_response ) && isset( $valid_response[ $field_id ] ) ) {
										$submit_errors[][ $field->slug ] = $valid_response[ $field_id ];
									}
								}
							}
						}
					}

				}

				/**
				 * Filter submission errors
				 *
				 * @since 1.0.2
				 *
				 * @param array $submit_errors - the submission errors
				 * @param int   $form_id       - the form id
				 *
				 * @return array $submit_errors
				 */
				$submit_errors = apply_filters( 'powerform_custom_form_submit_errors', $submit_errors, $form_id, $field_data_array );

				if ( empty( $submit_errors ) ) {
					if ( isset( $setting['honeypot'] ) && filter_var( $setting['honeypot'], FILTER_VALIDATE_BOOLEAN ) ) {
						$total_fields = count( $fields ) + 1;
						if ( isset( $submitted_data["input_$total_fields"] ) && empty( $submitted_data["input_$total_fields"] ) ) {
							$can_submit = true;
						} else {
							$can_submit = false;
							//show success but dont save form
							$response = array(
								'message' => __( "Form entry saved", Powerform::DOMAIN ),
								'success' => true,
								'behav'   => $submission_behav,
							);
						}
					}
				}
				if ( $can_submit ) {
					if ( ! empty( $field_data_array ) && empty( $submit_errors ) ) {

						/**
						 * Handle spam protection
						 * Add-ons use this filter to check if content has spam data
						 *
						 * @since 1.0.2
						 *
						 * @param bool false - defauls to false
						 * @param array  $field_data_array - the entry data
						 * @param int    $form_id          - the form id
						 * @param string $form_type        - the form type. In this case defaults to 'custom_form'
						 *
						 * @return bool true|false
						 */
						$is_spam = apply_filters( 'powerform_spam_protection', false, $field_data_array, $form_id, 'custom_form' );

						$entry->is_spam = $is_spam;

						// If preview, skip integrations
						if ( ! $preview ) {
							//ADDON on_form_submit
							$addon_error = $this->attach_addons_on_form_submit( $form_id, $custom_form );

							if ( true !== $addon_error ) {
								$response = array(
									'message' => $addon_error,
									'success' => false,
									'errors'  => array(),
									'behav'   => $submission_behav,
								);

								return $response;
							}
						}

						if ( $prevent_store || $entry->save() ) {

							$response = array(
								'message' => __( "Formulareintrag gespeichert", Powerform::DOMAIN ),
								'success' => true,
								'behav'   => $submission_behav,
							);
							if ( isset( $submitted_data['product-shipping'] ) && intval( $submitted_data['product-shipping'] > 0 ) ) {
								$field_data_array[] = array(
									'name'  => 'product_shipping',
									'value' => $submitted_data['product-shipping'],
								);
							}
							$field_data_array[] = array(
								'name'  => '_powerform_user_ip',
								'value' => Powerform_Geo::get_user_ip(),
							);

							/**
							 * Filter saved data before persisted into the database
							 *
							 * @since 1.0.2
							 *
							 * @param array $field_data_array - the entry data
							 * @param int   $form_id          - the form id
							 *
							 * @return array $field_data_array
							 */
							$field_data_array = apply_filters( 'powerform_custom_form_submit_field_data', $field_data_array, $form_id );

							/**
							 * Action called before setting fields to database
							 *
							 * @since 1.0.2
							 *
							 * @param Powerform_Form_Entry_Model $entry            - the entry model
							 * @param int                         $form_id          - the form id
							 * @param array                       $field_data_array - the entry data
							 *
							 */
							do_action( 'powerform_custom_form_submit_before_set_fields', $entry, $form_id, $field_data_array );

							// ADDON add_entry_fields
							// @since 1.2 Add field_data_array to param
							$added_data_array = $this->attach_addons_add_entry_fields( $form_id, $custom_form, $field_data_array );
							$added_data_array = array_merge( $field_data_array, $added_data_array );

							$entry->set_fields( $added_data_array );

							//ADDON after_entry_saved
							$this->attach_addons_after_entry_saved( $form_id, $entry );

							$powerform_mail_sender = new Powerform_CForm_Front_Mail();
							$powerform_mail_sender->process_mail( $custom_form, $submitted_data, $entry );
							if ( isset( $setting['submission-behaviour'] ) && 'behaviour-redirect' === $setting['submission-behaviour'] ) {
								if ( isset( $setting['redirect-url'] ) && ! empty( $setting['redirect-url'] ) ) {
									$response['redirect'] = true;
									//replace form data vars with value
									$redirect_url = powerform_replace_form_data( $setting['redirect-url'], $submitted_data );
									//replace misc data vars with value
									$redirect_url    = powerform_replace_variables( $redirect_url, $form_id );
									$response['url'] = esc_url( $redirect_url );
								}
							}
							if ( isset( $setting['submission-behaviour'] ) && 'behaviour-thankyou' === $setting['submission-behaviour'] ) {
								if ( isset( $setting['thankyou-message'] ) && ! empty( $setting['thankyou-message'] ) ) {
									//replace form data vars with value
									$thankyou_message = powerform_replace_form_data( $setting['thankyou-message'], $submitted_data );
									//replace misc data vars with value
									$thankyou_message    = powerform_replace_variables( $thankyou_message, $form_id );
									$response['message'] = $thankyou_message;
								}
							}

							if ( ! empty( $product_fields ) ) {
								//Process purchase

								$page_id  = $submitted_data['page_id']; //use page id to get permalink for redirect
								$entry_id = $entry->entry_id;
								$shipping = 0;

								if ( isset( $submitted_data['product-shipping'] ) ) {
									$shipping = $submitted_data['product-shipping'];
								}

								/**
								 * Process purchase
								 *
								 * @since 1.0.0
								 *
								 * @param array $response       - the response array
								 * @param array $product_fields - the product fields
								 * @param int   $entry_id       - the entry id ( reference for callback)
								 * @param int   $page_id        - the page id. Used to generate a return url
								 * @param int   $shipping       - the shipping cost
								 */
								$response = apply_filters( 'powerform_cform_process_purchase', $response, $product_fields, $field_data_array, $entry_id, $page_id, $shipping );
							}
						}
					}
					if ( ! empty( $submit_errors ) ) {
						$response = array(
							'message' => $this->get_invalid_form_message( $setting, $form_id ),
							'success' => false,
							'errors'  => $submit_errors,
							'behav'   => $submission_behav,
						);
					}
				}
			} else {
				$response = array(
					'message' => $submit_error,
					'success' => false,
					'errors'  => array(),
					'behav'   => $submission_behav,
				);
			}

			return $response;
		}

		return false;
	}

	/**
	 * Response message
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 * @since 1.5.1 utilize `_post_data` which already defined on submit
	 *
	 * @param $form_id
	 * @param $render_id
	 */
	public function form_response_message( $form_id, $render_id ) {
		$submitted_data = $this->_post_data;

		$post_form_id   = isset( $submitted_data['form_id'] ) ? sanitize_text_field( $submitted_data['form_id'] ) : 0;
		$post_render_id = isset( $submitted_data['render_id'] ) ? sanitize_text_field( $submitted_data['render_id'] ) : 0;
		$response       = self::$response;

		//only show to related form
		if ( ! empty( $response ) && is_array( $response ) && (int) $form_id === (int) $post_form_id && (int) $render_id === (int) $post_render_id ) {
			$label_class = $response['success'] ? 'success' : 'error';
			?>
			<label class="powerform-label--<?php echo esc_attr( $label_class ); ?>"><span><?php echo $response['message']; // WPCS: XSS ok. ?></span></label>
			<?php

			if ( isset( $response['success'] ) && $response['success'] && isset( $response['behav'] ) && 'behaviour-hide' === $response['behav'] ) {
				$selector = '#powerform-module-' . $form_id . '[data-powerform-render="' . $render_id . '"]';
				?>
				<script type="text/javascript">var PowerformFormHider =
					<?php
					echo wp_json_encode(
						array(
							'selector' => $selector,
						)
					);
					?>
				</script>
				<?php
			}

		}
	}

	/**
	 * @since 1.0
	 *
	 * @param array $setting - the form settings
	 * @param int   $form_id - the form id
	 *
	 * @return mixed
	 */
	public function get_invalid_form_message( $setting, $form_id ) {
		$invalid_form_message = __( "Error: Your form is not valid, please fix the errors!", Powerform::DOMAIN );
		if ( isset( $setting['submitData']['custom-invalid-form-message'] ) && ! empty( $setting['submitData']['custom-invalid-form-message'] ) ) {
			$invalid_form_message = $setting['submitData']['custom-invalid-form-message'];
		}

		return apply_filters( 'powerform_custom_form_invalid_form_message', $invalid_form_message, $form_id );
	}


	/**
	 * Add Error message on footer script if available
	 *
	 * @since 1.0
	 * @since 1.1 change $_POST to `get_post_data`
	 * @since 1.5.1 utilize `_post_data` which already defined on submit
	 */
	public function footer_message() {
		$submitted_data = $this->_post_data;

		$response  = self::$response;
		$form_id   = isset( $submitted_data['form_id'] ) ? sanitize_text_field( $submitted_data['form_id'] ) : false;
		$render_id = isset( $submitted_data['render_id'] ) ? sanitize_text_field( $submitted_data['render_id'] ) : '';
		$selector  = '#powerform-module-' . $form_id . '[data-powerform-render="' . $render_id . '"]';
		if ( ! empty( $response ) && is_array( $response ) ) {
			?>
			<script type="text/javascript">var PowerformValidationErrors =
				<?php
				echo wp_json_encode(
					array(
						'selector' => $selector,
						'errors'   => $response['errors'],
					)
				);
				?>
			</script>
			<?php
		}

	}

	/**
	 * Executor On form submit for attached addons
	 *
	 * @see   Powerform_Addon_Form_Hooks_Abstract::on_form_submit()
	 * @since 1.1
	 *
	 * @param                              $form_id
	 *
	 * @param Powerform_Custom_Form_Model $custom_form_model
	 *
	 * @return bool true on success|string error message from addon otherwise
	 */
	private function attach_addons_on_form_submit( $form_id, Powerform_Custom_Form_Model $custom_form_model ) {
		$allowed_form_fields = powerform_addon_format_form_fields( $custom_form_model );
		$submitted_data      = powerform_format_submitted_data_for_addon( $_POST, $_FILES, $allowed_form_fields );// WPCS: CSRF ok. its already validated before.
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $form_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $form_id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$addon_return = $form_hooks->on_form_submit( $submitted_data );
					if ( true !== $addon_return ) {
						return $form_hooks->get_submit_form_error_message();
					}
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to attach_addons_on_form_submit', $e->getMessage() );
			}

		}

		return true;
	}

	/**
	 * Executor to add more entry fields for attached addons
	 *
	 * @see   Powerform_Addon_Form_Hooks_Abstract::add_entry_fields()
	 *
	 * @since 1.1
	 * @since 1.2 Add $current_entry_fields for Addon
	 *
	 * @param                              $form_id
	 * @param Powerform_Custom_Form_Model $custom_form_model
	 * @param array                        $current_entry_fields
	 *
	 * @return array added fields to entry
	 */
	private function attach_addons_add_entry_fields( $form_id, Powerform_Custom_Form_Model $custom_form_model, $current_entry_fields ) {
		$additional_fields_data = array();
		$allowed_form_fields    = powerform_addon_format_form_fields( $custom_form_model );
		$submitted_data         = powerform_format_submitted_data_for_addon( $_POST, $_FILES, $allowed_form_fields, $current_entry_fields );// WPCS: CSRF ok. its already validated before.
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $form_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $form_id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$addon_fields = $form_hooks->add_entry_fields( $submitted_data, $current_entry_fields );
					//reformat additional fields
					$addon_fields           = self::format_addon_additional_fields( $connected_addon, $addon_fields );
					$additional_fields_data = array_merge( $additional_fields_data, $addon_fields );
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to add_entry_fields', $e->getMessage() );
			}

		}

		return $additional_fields_data;
	}

	/**
	 * Executor action for attached addons after entry saved on storage
	 *
	 * @see   Powerform_Addon_Form_Hooks_Abstract::after_entry_saved()
	 *
	 * @since 1.1
	 *
	 * @param                             $form_id
	 * @param Powerform_Form_Entry_Model $entry_model
	 */
	private function attach_addons_after_entry_saved( $form_id, Powerform_Form_Entry_Model $entry_model ) {
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $form_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $form_id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$form_hooks->after_entry_saved( $entry_model );// run and forget
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to attach_addons_on_form_submit', $e->getMessage() );
			}

		}
	}

	/**
	 * Return Form Settings
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Custom_Form_Model $form
	 *
	 * @return mixed
	 */
	private function get_form_settings( $form ) {
		// If not using the new "submission-behaviour" setting, set it according to the previous settings
		if ( ! isset( $form->settings['submission-behaviour'] ) ) {
			$redirect = ( isset( $form->settings['redirect'] ) && filter_var( $form->settings['redirect'], FILTER_VALIDATE_BOOLEAN ) );
			$thankyou = ( isset( $form->settings['thankyou'] ) && filter_var( $form->settings['thankyou'], FILTER_VALIDATE_BOOLEAN ) );

			if ( ! $redirect && ! $thankyou ) {
				$form->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $thankyou ) {
				$form->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $redirect ) {
				$form->settings['submission-behaviour'] = 'behaviour-redirect';
			}
		}

		return $form->settings;
	}
}