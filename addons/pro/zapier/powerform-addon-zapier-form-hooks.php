<?php

/**
 * Class Powerform_Addon_Zapier_Form_Hooks
 *
 * @since 1.0 Zapier Addon
 *
 */
class Powerform_Addon_Zapier_Form_Hooks extends Powerform_Addon_Form_Hooks_Abstract {

	/**
	 * Addon instance are auto available form abstract
	 * Its added here for development purpose,
	 * Autocomplete will resolve addon directly to `Zapier` instance instead of the abstract
	 * And its public properties can be exposed
	 *
	 * @since 1.0 Zapier Addon
	 * @var Powerform_Addon_Zapier
	 */
	protected $addon;

	/**
	 * Form Settings Instance
	 *
	 * @since 1.0 Zapier Addon
	 * @var Powerform_Addon_Zapier_Form_Settings | null
	 */
	protected $form_settings_instance;

	/**
	 * Powerform_Addon_Zapier_Form_Hooks constructor.
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param Powerform_Addon_Abstract $addon
	 * @param                           $form_id
	 *
	 * @throws Powerform_Addon_Exception
	 */
	public function __construct( Powerform_Addon_Abstract $addon, $form_id ) {
		parent::__construct( $addon, $form_id );
		$this->_submit_form_error_message = __( 'Zapier failed to process submitted data. Please check your form and try again', Powerform::DOMAIN );
	}


	/**
	 * Save status of request sent and received for each connected zap(s)
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param array $submitted_data
	 *
	 * @return array
	 */
	public function add_entry_fields( $submitted_data ) {

		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Filter zapier submitted form data to be processed
		 *
		 * @since 1.1
		 *
		 * @param array                                 $submitted_data
		 * @param int                                   $form_id                current Form ID
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Addon Form Settings instance
		 */
		$submitted_data = apply_filters(
			'powerform_addon_zapier_form_submitted_data',
			$submitted_data,
			$form_id,
			$form_settings_instance
		);

		powerform_addon_maybe_log( __METHOD__, $submitted_data );

		$addon_setting_values = $this->form_settings_instance->get_form_settings_values();
		$form_settings        = $this->form_settings_instance->get_form_settings();

		$data = array();

		/**
		 * Fires before sending data to Webhook URL(s)
		 *
		 * @since 1.1
		 *
		 * @param int                                   $form_id                current Form ID
		 * @param array                                 $submitted_data
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Addon Form Settings instance
		 */
		do_action( 'powerform_addon_zapier_before_post_to_webhook', $form_id, $submitted_data, $form_settings_instance );

		foreach ( $addon_setting_values as $key => $addon_setting_value ) {
			// save it on entry field, with name `status-$MULTI_ID`, and value is the return result on sending data to zapier
			$data[] = array(
				'name'  => 'status-' . $key,
				'value' => $this->get_status_on_send_data( $key, $submitted_data, $addon_setting_value, $form_settings ),
			);
		}

		$entry_fields = $data;
		/**
		 * Filter zapier entry fields to be saved to entry model
		 *
		 * @since 1.1
		 *
		 * @param array                                 $entry_fields
		 * @param int                                   $form_id                current Form ID
		 * @param array                                 $submitted_data
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
		 */
		$data = apply_filters(
			'powerform_addon_zapier_entry_fields',
			$entry_fields,
			$form_id,
			$submitted_data,
			$form_settings_instance
		);


		return $data;

	}

	/**
	 * Get status on sending data to zapier
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param $connection_id
	 * @param $submitted_data
	 * @param $connection_settings
	 * @param $form_settings
	 *
	 * @return array `is_sent` true means its success send data to zapier, false otherwise
	 */
	private function get_status_on_send_data( $connection_id, $submitted_data, $connection_settings, $form_settings ) {
		// initialize as null
		$zapier_api = null;

		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		//check required fields
		try {
			if ( ! isset( $connection_settings['webhook_url'] ) ) {
				throw new Powerform_Addon_Zapier_Exception( __( 'Webhook URL is not properly setup', Powerform::DOMAIN ) );
			}

			$endpoint = $connection_settings['webhook_url'];
			/**
			 * Filter Endpoint Webhook URL to send
			 *
			 * @since 1.1
			 *
			 * @param string $endpoint
			 * @param int    $form_id             current Form ID
			 * @param array  $connection_settings current connection setting, it contains `name` and `webhook_url`
			 */
			$endpoint = apply_filters(
				'powerform_addon_zapier_endpoint',
				$endpoint,
				$form_id,
				$connection_settings
			);

			$zapier_api = $this->addon->get_api( $endpoint );


			$args               = $submitted_data;
			$args['form-title'] = $form_settings['formName'];
			$args['entry-time'] = current_time( 'Y-m-d H:i:s' );

			/**
			 * Filter arguments to passed on to Zapier Webhook API
			 *
			 * @since 1.1
			 *
			 * @param array                                 $args
			 * @param int                                   $form_id                Current Form id
			 * @param string                                $connection_id          ID of current connection
			 * @param array                                 $submitted_data
			 * @param array                                 $connection_settings    current connection setting, contains `name` and `webhook_url`
			 * @param array                                 $form_settings          Displayed Form settings
			 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
			 */
			$args = apply_filters(
				'powerform_addon_zapier_post_to_webhook_args',
				$args,
				$form_id,
				$connection_id,
				$submitted_data,
				$connection_settings,
				$form_settings,
				$form_settings_instance
			);

			$zapier_api->post_( $args );

			powerform_addon_maybe_log( __METHOD__, 'Success Send Data' );

			return array(
				'is_sent'         => true,
				'connection_name' => $connection_settings['name'],
				'description'     => __( 'Successfully send data to Zapier', Powerform::DOMAIN ),
				'data_sent'       => $zapier_api->get_last_data_sent(),
				'data_received'   => $zapier_api->get_last_data_received(),
				'url_request'     => $zapier_api->get_last_url_request(),
			);

		} catch ( Powerform_Addon_Zapier_Exception $e ) {
			powerform_addon_maybe_log( __METHOD__, 'Failed to Send to Zapier' );

			return array(
				'is_sent'         => false,
				'description'     => $e->getMessage(),
				'connection_name' => $connection_settings['name'],
				'data_sent'       => ( ( $zapier_api instanceof Powerform_Addon_Zapier_Wp_Api ) ? $zapier_api->get_last_data_sent() : array() ),
				'data_received'   => ( ( $zapier_api instanceof Powerform_Addon_Zapier_Wp_Api ) ? $zapier_api->get_last_data_received() : array() ),
				'url_request'     => ( ( $zapier_api instanceof Powerform_Addon_Zapier_Wp_Api ) ? $zapier_api->get_last_url_request() : '' ),
			);
		}
	}

	/**
	 * It wil add new row on entry table of submission page, with couple of subentries
	 * subentries included are defined in @see Powerform_Addon_Zapier_Form_Hooks::get_additional_entry_item()
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 * @param                             $addon_meta_data
	 *
	 * @return array
	 */
	public function on_render_entry( Powerform_Form_Entry_Model $entry_model, $addon_meta_data ) {

		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 *
		 * Filter zapier metadata that previously saved on db to be processed
		 *
		 * @since 1.1
		 *
		 * @param array                                 $addon_meta_data
		 * @param int                                   $form_id                current Form ID
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
		 */
		$addon_meta_data = apply_filters(
			'powerform_addon_zapier_metadata',
			$addon_meta_data,
			$form_id,
			$form_settings_instance
		);


		$addon_meta_datas = $addon_meta_data;
		if ( ! isset( $addon_meta_data[0] ) || ! is_array( $addon_meta_data[0] ) ) {
			return array();
		}

		$addon_meta_data = $addon_meta_data[0];

		// make sure its `status`, because we only add this
		// when its `status` then its single connection (backward compat on dev)
		// when its status-$MULTI_ID its multiple connection its default behaviour
		if ( 'status' !== $addon_meta_data['name'] ) {
			if ( stripos( $addon_meta_data['name'], 'status-' ) === 0 ) {
				return $this->on_render_entry_multi_connection( $addon_meta_datas );
			}

			return array();
		}

		$additional_entry_item = $this->get_additional_entry_item( $addon_meta_data );
		if ( empty( $additional_entry_item ) ) {
			return array();
		}

		return array( $additional_entry_item );

	}

	/**
	 * Loop through addon meta data on multiple zap(s)
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param $addon_meta_datas
	 *
	 * @return array
	 */
	private function on_render_entry_multi_connection( $addon_meta_datas ) {
		$additional_entry_item = array();
		foreach ( $addon_meta_datas as $addon_meta_data ) {
			$additional_entry_item[] = $this->get_additional_entry_item( $addon_meta_data );
		}

		return $additional_entry_item;

	}

	/**
	 * Format additional entry item as label and value arrays
	 *
	 * - Integration Name : its defined by user when they adding zapier integration on their form
	 * - Sent To Zapier : will be Yes/No value, that indicates whether sending data to zapier was successful
	 * - Info : Text that are generated by addon when building and sending data to zapier @see Powerform_Addon_Zapier_Form_Hooks::add_entry_fields()
	 * - Below subentries will be added if full log enabled, @see Powerform_Addon_Zapier::is_show_full_log() @see POWERFORM_ADDON_ZAPIER_SHOW_FULL_LOG
	 *      - API URL : URL that wes requested when sending data to zapier
	 *      - Data sent to Zapier : json encoded body request that was sent
	 *      - Data received from Zapier : json encoded body response that was received
	 *
	 * @param $addon_meta_data
	 *
	 * @since 1.0 Zapier Addon
	 * @return array
	 */
	private function get_additional_entry_item( $addon_meta_data ) {

		if ( ! isset( $addon_meta_data['value'] ) || ! is_array( $addon_meta_data['value'] ) ) {
			return array();
		}
		$status                = $addon_meta_data['value'];
		$additional_entry_item = array(
			'label' => __( 'Zapier Integration', Powerform::DOMAIN ),
			'value' => '',
		);


		$sub_entries = array();
		if ( isset( $status['connection_name'] ) ) {
			$sub_entries[] = array(
				'label' => __( 'Integration Name', Powerform::DOMAIN ),
				'value' => $status['connection_name'],
			);
		}

		if ( isset( $status['is_sent'] ) ) {
			$is_sent       = true === $status['is_sent'] ? __( 'Yes', Powerform::DOMAIN ) : __( 'No', Powerform::DOMAIN );
			$sub_entries[] = array(
				'label' => __( 'Sent To Zapier', Powerform::DOMAIN ),
				'value' => $is_sent,
			);
		}

		if ( isset( $status['description'] ) ) {
			$sub_entries[] = array(
				'label' => __( 'Info', Powerform::DOMAIN ),
				'value' => $status['description'],
			);
		}

		if ( Powerform_Addon_Zapier::is_show_full_log() ) {
			// too long to be added on entry data enable this with `define('POWERFORM_ADDON_ZAPIER_SHOW_FULL_LOG', true)`
			if ( isset( $status['url_request'] ) ) {
				$sub_entries[] = array(
					'label' => __( 'API URL', Powerform::DOMAIN ),
					'value' => $status['url_request'],
				);
			}

			if ( isset( $status['data_sent'] ) ) {
				$sub_entries[] = array(
					'label' => __( 'Data sent to Zapier', Powerform::DOMAIN ),
					'value' => '<pre class="sui-code-snippet">' . wp_json_encode( $status['data_sent'], JSON_PRETTY_PRINT ) . '</pre>',
				);
			}

			if ( isset( $status['data_received'] ) ) {
				$sub_entries[] = array(
					'label' => __( 'Data received from Zapier', Powerform::DOMAIN ),
					'value' => '<pre class="sui-code-snippet">' . wp_json_encode( $status['data_received'], JSON_PRETTY_PRINT ) . '</pre>',
				);
			}
		}


		$additional_entry_item['sub_entries'] = $sub_entries;

		// return single array
		return $additional_entry_item;
	}

	/**
	 * Zapier will add a column on the title/header row
	 * its called `Zapier Info` which can be translated on powerform lang
	 *
	 * @since 1.0 Zapier Addon
	 * @return array
	 */
	public function on_export_render_title_row() {

		$export_headers = array(
			'info' => __( 'Zapier Info', Powerform::DOMAIN ),
		);

		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Filter zapier headers on export file
		 *
		 * @since 1.1
		 *
		 * @param array                                 $export_headers         headers to be displayed on export file
		 * @param int                                   $form_id                current Form ID
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
		 */
		$export_headers = apply_filters(
			'powerform_addon_zapier_export_headers',
			$export_headers,
			$form_id,
			$form_settings_instance
		);

		return $export_headers;
	}

	/**
	 * Zapier will add a column that give user information whether sending data to zapier successfully or not
	 * It will only add one column even its multiple connection, every connection will be separated by comma
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 * @param                             $addon_meta_data
	 *
	 * @return array
	 */
	public function on_export_render_entry( Powerform_Form_Entry_Model $entry_model, $addon_meta_data ) {

		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 *
		 * Filter zapier metadata that previously saved on db to be processed
		 *
		 * @since 1.1
		 *
		 * @param array                                 $addon_meta_data
		 * @param int                                   $form_id                current Form ID
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
		 */
		$addon_meta_data = apply_filters(
			'powerform_addon_zapier_metadata',
			$addon_meta_data,
			$form_id,
			$form_settings_instance
		);

		$export_columns = array(
			'info' => $this->get_from_addon_meta_data( $addon_meta_data, 'description', '' ),
		);

		/**
		 * Filter zapier columns to be displayed on export submissions
		 *
		 * @since 1.1
		 *
		 * @param array                                 $export_columns         column to be exported
		 * @param int                                   $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model           $entry_model            Form Entry Model
		 * @param array                                 $addon_meta_data        meta data saved by addon on entry fields
		 * @param Powerform_Addon_Zapier_Form_Settings $form_settings_instance Zapier Form Settings instance
		 */
		$export_columns = apply_filters(
			'powerform_addon_zapier_export_columns',
			$export_columns,
			$form_id,
			$entry_model,
			$addon_meta_data,
			$form_settings_instance
		);

		return $export_columns;
	}

	/**
	 * Get Addon meta data, will be recursive if meta data is multiple because of multiple connection added
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param        $addon_meta_data
	 * @param        $key
	 * @param string $default
	 *
	 * @return string
	 */
	private function get_from_addon_meta_data( $addon_meta_data, $key, $default = '' ) {
		$addon_meta_datas = $addon_meta_data;
		if ( ! isset( $addon_meta_data[0] ) || ! is_array( $addon_meta_data[0] ) ) {
			return $default;
		}

		$addon_meta_data = $addon_meta_data[0];

		// make sure its `status`, because we only add this
		if ( 'status' !== $addon_meta_data['name'] ) {
			if ( stripos( $addon_meta_data['name'], 'status-' ) === 0 ) {
				$meta_data = array();
				foreach ( $addon_meta_datas as $addon_meta_data ) {
					// make it like single value so it will be processed like single meta data
					$addon_meta_data['name'] = 'status';

					// add it on an array for next recursive process
					$meta_data[] = $this->get_from_addon_meta_data( array( $addon_meta_data ), $key, $default );
				}

				return implode( ', ', $meta_data );
			}

			return $default;

		}

		if ( ! isset( $addon_meta_data['value'] ) || ! is_array( $addon_meta_data['value'] ) ) {
			return $default;
		}
		$status = $addon_meta_data['value'];
		if ( isset( $status[ $key ] ) ) {
			$connection_name = '';
			if ( 'connection_name' !== $key ) {
				if ( isset( $status['connection_name'] ) ) {
					$connection_name = '[' . $status['connection_name'] . '] ';
				}
			}

			return $connection_name . $status[ $key ];
		}

		return $default;
	}
}