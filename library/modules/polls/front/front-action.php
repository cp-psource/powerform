<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Front action for polls
 *
 * @since 1.0
 */
class Powerform_Poll_Front_Action extends Powerform_Front_Action {

	/**
	 * Entry type
	 *
	 * @var string
	 */
	public $entry_type = 'poll';

	/**
	 * Response message
	 *
	 * @var array
	 */
	private static $response = array();

	/**
	 * Handle submit
	 *
	 * @since 1.0
	 * @since 1.1 Refactor $_POST to use `get_post_data`
	 */
	public function handle_submit() {
		$post_data = $this->get_post_data();
		$form_id   = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false;
		if ( $form_id ) {

			/**
			 * Action called before full form submit
			 *
			 * @since 1.0.2
			 *
			 * @param int $form_id - the form id
			 */
			do_action( 'powerform_polls_before_handle_submit', $form_id );

			$response = $this->handle_form( $form_id );

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
			$response = apply_filters( 'powerform_polls_submit_response', $response, $form_id );

			/**
			 * Action called after full form submit
			 *
			 * @since 1.0.2
			 *
			 * @param int   $form_id  - the form id
			 * @param array $response - the post response
			 */
			do_action( 'powerform_polls_after_handle_submit', $form_id, $response );

			if ( $response && is_array( $response ) ) {
				if ( isset( $response['url'] ) ) {
					$url = apply_filters( 'powerform_poll_submit_url', $response['url'], $form_id );
					wp_safe_redirect( $url );
					exit;
				} else {
					self::$response = $response;
					add_action( 'powerform_poll_post_message', array( $this, 'form_response_message' ) );
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
		if ( $this->validate_ajax( 'powerform_submit_form', 'POST', 'powerform_nonce' ) ) {
			$post_data = $this->get_post_data();
			$form_id   = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false;
			if ( $form_id ) {

				/**
				 * Action called before poll ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int $form_id - the form id
				 */
				do_action( 'powerform_polls_before_save_entry', $form_id );

				$response = $this->handle_form( $form_id, true );

				/**
				 * Filter ajax response
				 *
				 * @since 1.0.2
				 *
				 * @param array $response - the post response
				 * @param int   $form_id  - the form id
				 *
				 * @return array $response
				 */
				$response = apply_filters( 'powerform_polls_ajax_submit_response', $response, $form_id );


				/**
				 * Action called after form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int   $form_id  - the form id
				 * @param array $response - the post response
				 */
				do_action( 'powerform_polls_after_save_entry', $form_id, $response );

				if ( $response && is_array( $response ) ) {
					if ( ! $response['success'] ) {
						wp_send_json_error( $response );
					} else {
						wp_send_json_success( $response );
					}
				}
			}
		}
	}

	/**
	 * Save entry
	 *
	 * @since 1.0
	 * @since 1.1 refactor $_POST to `get_post_data`
	 * @return void /json Json response
	 */
	public function save_entry() {
		if ( $this->validate_ajax( 'powerform_submit_form', 'POST', 'powerform_nonce' ) ) {
			$post_data = $this->get_post_data();
			$form_id   = isset( $post_data['form_id'] ) ? sanitize_text_field( $post_data['form_id'] ) : false;
			if ( $form_id ) {

				/**
				 * Action called before poll ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int $form_id - the form id
				 */
				do_action( 'powerform_polls_before_save_entry', $form_id );

				$response = $this->handle_form( $form_id );

				/**
				 * Filter ajax response
				 *
				 * @since 1.0.2
				 *
				 * @param array $response - the post response
				 * @param int   $form_id  - the form id
				 *
				 * @return array $response
				 */
				$response = apply_filters( 'powerform_polls_ajax_submit_response', $response, $form_id );


				/**
				 * Action called after form ajax
				 *
				 * @since 1.0.2
				 *
				 * @param int   $form_id  - the form id
				 * @param array $response - the post response
				 */
				do_action( 'powerform_polls_after_save_entry', $form_id, $response );

				if ( $response && is_array( $response ) ) {
					if ( ! $response['success'] ) {
						wp_send_json_error( $response );
					} else {
						wp_send_json_success( $response );
					}
				}
			}
		}
	}

	/**
	 * Handle form action
	 *
	 * @since 1.0
	 *
	 * @param int  $form_id
	 * @param bool $preview
	 *
	 * @return bool|array
	 */
	private function handle_form( $form_id, $preview = false ) {
		$poll = Powerform_Poll_Form_Model::model()->load( $form_id );
		if ( is_object( $poll ) ) {

			// disable submissions if not published
			if ( Powerform_Poll_Form_Model::STATUS_PUBLISH !== $poll->status ) {
				return array(
					'message' => __( "Umfrageübermittlung deaktiviert.", Powerform::DOMAIN ),
					'notice'  => 'error',
					'success' => false,
				);
			}

			$user_can_vote = $poll->current_user_can_vote();
			$prevent_store = $poll->is_prevent_store();

			// If preview, prevent storing
			if ( $preview ) {
				$prevent_store = true;
			}

			/**
			 * Filter to check if current user can vote
			 *
			 * @since 1.0.2
			 *
			 * @param bool $user_can_vote - if can vote depending on above conditions
			 * @param int  $form_id       - the form id
			 *
			 * @return bool $user_can_vote - true|false
			 */
			$user_can_vote = apply_filters( 'powerform_poll_handle_form_user_can_vote', $user_can_vote, $form_id );

			$post_data = $this->get_post_data();

			if ( $user_can_vote ) {
				$field_data  = isset( $post_data[ $form_id ] ) ? $post_data[ $form_id ] : false;
				$extra_field = isset( $post_data[ $form_id . '-extra' ] ) ? $post_data[ $form_id . '-extra' ] : false;
				if ( $field_data && ! empty( $field_data ) ) {
					$entry             = new Powerform_Form_Entry_Model();
					$entry->entry_type = $this->entry_type;
					$entry->form_id    = $form_id;
					// get fields labels
					$fields_labels    = $poll->pluck_fields_array( 'title', 'element_id', '1' );
					$field_data_array = array(
						array(
							'name'  => $field_data,
							'value' => isset( $fields_labels[ $field_data ] ) ? $fields_labels[ $field_data ] : '1',
						),
						array(
							'name'  => '_powerform_user_ip',
							'value' => Powerform_Geo::get_user_ip(),
						),
					);
					if ( $extra_field && ! empty( $extra_field ) ) {
						$field_data_array[] = array(
							'name'  => 'extra',
							'value' => $extra_field,
						);

						/**
						 * Handle spam protection
						 * Add-ons use this filter to check if content has spam data
						 *
						 * @since 1.0.2
						 *
						 * @param bool false - defauls to false
						 * @param array  $field_data_array - the entry data
						 * @param int    $form_id          - the form id
						 * @param string $form_type        - the form type. In this case defaults to 'poll'
						 *
						 * @return bool true|false
						 */
						$is_spam = apply_filters( 'powerform_spam_protection', false, $field_data_array, $form_id, 'poll' );

						$entry->is_spam = $is_spam;
					}

					// If preview, skip integrations
					if ( ! $preview ) {
						//ADDON on_form_submit
						$addon_error = $this->attach_addons_on_poll_submit( $form_id, $poll );

						if ( true !== $addon_error ) {
							$response = array(
								'message' => $addon_error,
								'notice'  => 'error',
								'success' => false,
							);

							return $response;
						}
					}

					if ( $prevent_store || $entry->save() ) {

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
						$field_data_array = apply_filters( 'powerform_polls_submit_field_data', $field_data_array, $form_id );

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
						do_action( 'powerform_polls_submit_before_set_fields', $entry, $form_id, $field_data_array );

						// ADDON add_entry_fields
						$added_data_array = $this->attach_addons_add_entry_fields( $form_id, $poll, $field_data_array );
						$added_data_array = array_merge( $field_data_array, $added_data_array );

						$entry->set_fields( $added_data_array );

						//ADDON after_entry_saved
						$this->attach_addons_after_entry_saved( $form_id, $entry );

						// Email
						$powerform_mail_sender = new Powerform_Poll_Front_Mail();
						$powerform_mail_sender->process_mail( $poll, $post_data, $entry );

						$setting = $poll->settings;

						if ( isset( $setting['results-behav'] ) && ( 'show_after' === $setting['results-behav'] || 'link_on' === $setting['results-behav'] ) ) {
							$url       = $post_data['_wp_http_referer'];
							$render_id = $post_data['render_id'];
							$url       = add_query_arg(
								array(
									'saved'     => 'true',
									'form_id'   => $form_id,
									'render_id' => $render_id,
								),
								$url
							);
							$url       = apply_filters( 'powerform_poll_submit_url', $url, $form_id );
							$response  = array(
								'message' => __( 'Deine Stimme wurde gespeichert', Powerform::DOMAIN ),
								'notice'  => 'success',
								'success' => true,
							);

							if ( ! isset( $setting['enable-ajax'] ) || empty( $setting['enable-ajax'] ) ) {
								$is_ajax_enabled = false;
							} else {
								$is_ajax_enabled = filter_var( $setting['enable-ajax'], FILTER_VALIDATE_BOOLEAN );
							}

							if ( $is_ajax_enabled ) {
								// ajax enabled send result data to front end
								$response['chart_data']  = $this->get_chart_data( $poll );
								$response['back_button'] = '<button class="powerform-button" type="button">' . __( 'Zurück zur Umfrage', Powerform::DOMAIN ) . '</button>';
							} else {
								// its not ajax enabled, send url result to front end
								$response['url'] = $url;
							}

							return $response;
						}

						return array(
							'message' => __( 'Deine Stimme wurde gespeichert', Powerform::DOMAIN ),
							'notice'  => 'success',
							'success' => true,
						);
					}
				} else {
					return array(
						'message' => __( "Du musst eine Umfrageoption auswählen", Powerform::DOMAIN ),
						'notice'  => 'error',
						'success' => false,
					);
				}
			} else {
				return array(
					'message' => __( "Du hast bereits eine Abstimmung zu dieser Umfrage abgegeben", Powerform::DOMAIN ),
					'notice'  => 'notice',
					'success' => false,
				);
			}
		}

		return false;
	}

	/**
	 * Get Chart data of Poll
	 *
	 * @param Powerform_Poll_Form_Model $poll
	 *
	 * @return array
	 */
	private function get_chart_data( Powerform_Poll_Form_Model $poll ) {
		$chart_colors         = powerform_get_poll_chart_colors( $poll->id );
		$default_chart_colors = $chart_colors;
		$chart_datas          = array();
		$chart_datas[]        = array(
			__( 'Frage', Powerform::DOMAIN ),
			__( 'Ergebnisse', Powerform::DOMAIN ),
			array( 'role' => 'style' ),
			array( 'role' => 'annotation' ),
		);

		$form_settings        = $poll->settings;
		$number_votes_enabled = false;
		if ( isset( $form_settings['show-votes-count'] ) && $form_settings['show-votes-count'] ) {
			$number_votes_enabled = true;
		}

		$fields_array = $poll->get_fields_as_array();
		$map_entries  = Powerform_Form_Entry_Model::map_polls_entries( $poll->id, $fields_array );
		$fields       = $poll->get_fields();
		if ( ! is_null( $fields ) ) {
			foreach ( $fields as $field ) {
				$annotation = '';
				$label      = addslashes( $field->title );

				if ( empty( $chart_colors ) ) {
					$chart_colors = $default_chart_colors;
				}
				$color   = array_shift( $chart_colors );
				$slug    = isset( $field->slug ) ? $field->slug : sanitize_title( $label );
				$entries = 0;
				if ( in_array( $slug, array_keys( $map_entries ), true ) ) {
					$entries = $map_entries[ $slug ];
				}
				if ( $number_votes_enabled ) {
					$annotation = $entries . __( ' Abstimmung(en) ', Powerform::DOMAIN );
				}
				$style = 'color: ' . $color;

				$chart_datas[] = array(
					(string) $label,
					(int) $entries,
					(string) $style,
					(string) $annotation,
				);
			}

		}

		return $chart_datas;
	}

	/**
	 * Response message
	 *
	 * @since 1.0
	 */
	public function form_response_message() {
		$response = self::$response;
		if ( ! empty( $response ) && is_array( $response ) ) {
			?>
			<label class="powerform-label--<?php echo esc_attr( $response['notice'] ); ?>"><span><?php echo $response['message']; // WPCS: XSS ok. ?></span></label>
			<?php
		}
	}

	/**
	 * Executor On form submit for attached addons
	 *
	 * @see   Powerform_Addon_Poll_Hooks_Abstract::on_poll_submit()
	 * @since 1.6.1
	 *
	 * @param                              $poll_id
	 * @param Powerform_Poll_Form_Model   $poll_model
	 *
	 * @return bool true on success|string error message from addon otherwise
	 */
	private function attach_addons_on_poll_submit( $poll_id, Powerform_Poll_Form_Model $poll_model ) {
		$submitted_data = powerform_addon_format_poll_submitted_data( $_POST, $_FILES );// WPCS: CSRF ok. its already validated before.
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_poll( $poll_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$poll_hooks = $connected_addon->get_addon_poll_hooks( $poll_id );
				if ( $poll_hooks instanceof Powerform_Addon_Poll_Hooks_Abstract ) {
					$addon_return = $poll_hooks->on_poll_submit( $submitted_data );
					if ( true !== $addon_return ) {
						return $poll_hooks->get_submit_poll_error_message();
					}
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to attach_addons_on_poll_submit', $e->getMessage() );
			}

		}

		return true;
	}

	/**
	 * Executor to add more entry fields for attached addons
	 *
	 * @see   Powerform_Addon_Poll_Hooks_Abstract::add_entry_fields()
	 *
	 * @since 1.6.1
	 *
	 * @param                              $poll_id
	 * @param Powerform_Poll_Form_Model   $poll_form_model
	 * @param array                        $current_entry_fields
	 *
	 * @return array added fields to entry
	 */
	private function attach_addons_add_entry_fields( $poll_id, Powerform_Poll_Form_Model $poll_form_model, $current_entry_fields ) {
		$additional_fields_data = array();
		$submitted_data         = powerform_addon_format_poll_submitted_data( $_POST, $_FILES );// WPCS: CSRF ok. its already validated before.
		//find is_poll_connected
		$connected_addons = powerform_get_addons_instance_connected_with_poll( $poll_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$poll_hooks = $connected_addon->get_addon_poll_hooks( $poll_id );
				if ( $poll_hooks instanceof Powerform_Addon_Poll_Hooks_Abstract ) {
					$addon_fields = $poll_hooks->add_entry_fields( $submitted_data, $current_entry_fields );
					//reformat additional fields
					$addon_fields           = self::format_addon_additional_fields( $connected_addon, $addon_fields );
					$additional_fields_data = array_merge( $additional_fields_data, $addon_fields );
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to poll add_entry_fields', $e->getMessage() );
			}

		}

		return $additional_fields_data;
	}


	/**
	 * Executor action for attached addons after entry saved on storage
	 *
	 * @see   Powerform_Addon_Poll_Hooks_Abstract::after_entry_saved()
	 *
	 * @since 1.6.1
	 *
	 * @param                             $poll_id
	 * @param Powerform_Form_Entry_Model $entry_model
	 */
	private function attach_addons_after_entry_saved( $poll_id, Powerform_Form_Entry_Model $entry_model ) {
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_poll( $poll_id );

		foreach ( $connected_addons as $connected_addon ) {
			try {
				$poll_hooks = $connected_addon->get_addon_poll_hooks( $poll_id );
				if ( $poll_hooks instanceof Powerform_Addon_Poll_Hooks_Abstract ) {
					$poll_hooks->after_entry_saved( $entry_model );// run and forget
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to poll attach_addons_after_entry_saved', $e->getMessage() );
			}

		}
	}
}