<?php

require_once dirname( __FILE__ ) . '/powerform-addon-zapier-exception.php';
require_once dirname( __FILE__ ) . '/lib/class-wp-zapier-api.php';

/**
 * Class Powerform_Addon_Zapier
 * Zapier Addon Main Class
 *
 * @since 1.0 Zapier Addon
 */
final class Powerform_Addon_Zapier extends Powerform_Addon_Abstract {

	/**
	 * @var self|null
	 */
	private static $_instance = null;

	protected $_slug                   = 'zapier';
	protected $_version                = POWERFORM_ADDON_ZAPIER_VERSION;
	protected $_min_powerform_version = '1.1';
	protected $_short_title            = 'Zapier';
	protected $_title                  = 'Zapier';
	protected $_url                    = 'https://premium.wpmudev.org';
	protected $_full_path              = __FILE__;

	protected $_form_settings = 'Powerform_Addon_Zapier_Form_Settings';
	protected $_form_hooks    = 'Powerform_Addon_Zapier_Form_Hooks';

	protected $_poll_settings = 'Powerform_Addon_Zapier_Poll_Settings';
	protected $_poll_hooks    = 'Powerform_Addon_Zapier_Poll_Hooks';

	protected $_quiz_settings = 'Powerform_Addon_Zapier_Quiz_Settings';
	protected $_quiz_hooks    = 'Powerform_Addon_Zapier_Quiz_Hooks';

	/**
	 * Powerform_Addon_Zapier constructor.
	 *
	 * @since 1.0 Zapier Addon
	 */
	public function __construct() {
		// late init to allow translation
		$this->_description                = __( 'Make your form Zap-able', Powerform::DOMAIN );
		$this->_activation_error_message   = __( 'Sorry but we failed to activate Zapier Integration, don\'t hesitate to contact us', Powerform::DOMAIN );
		$this->_deactivation_error_message = __( 'Sorry but we failed to deactivate Zapier Integration, please try again', Powerform::DOMAIN );

		$this->_update_settings_error_message = __(
			'Sorry, we failed to update settings, please check your form and try again',
			Powerform::DOMAIN
		);

		$this->_icon     = powerform_addon_zapier_assets_url() . 'icons/zapier.png';
		$this->_icon_x2  = powerform_addon_zapier_assets_url() . 'icons/zapier@2x.png';
		$this->_image    = powerform_addon_zapier_assets_url() . 'img/zapier.png';
		$this->_image_x2 = powerform_addon_zapier_assets_url() . 'img/zapier@2x.png';
	}

	/**
	 * Get Instance
	 *
	 * @since 1.0 Zapier Addon
	 * @return self|null
	 */
	public static function get_instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Setting apier Addon
	 *
	 * @since 1.1 Zapier Addon
	 * @return array
	 */
	public function settings_wizards() {
		return array(
			array(
				'callback'     => array( $this, 'setup_connect' ),
				'is_completed' => array( $this, 'is_connected' ),
			),
		);
	}

	/**
	 * Activate Zapier
	 *
	 * @since 1.1 Zapier Addon
	 *
	 * @param     $submitted_data
	 * @param int $form_id
	 *
	 * @return array
	 */
	public function setup_connect( $submitted_data, $form_id = 0 ) {
		$settings_values = $this->get_settings_values();

		$template         = powerform_addon_zapier_dir() . 'views/settings/setup-connect.php';
		$template_success = powerform_addon_zapier_dir() . 'views/settings/setup-connect-success.php';

		$template_params = array(
			'is_connected'  => $this->is_connected(),
			'error_message' => '',
		);

		$has_errors   = false;
		$show_success = false;
		$is_submit    = ! empty( $submitted_data );

		foreach ( $template_params as $key => $value ) {
			if ( isset( $submitted_data[ $key ] ) ) {
				$template_params[ $key ] = $submitted_data[ $key ];
			} elseif ( isset( $settings_values[ $key ] ) ) {
				$template_params[ $key ] = $settings_values[ $key ];
			}
		}

		if ( $is_submit ) {
			$connect = isset( $submitted_data['connect'] ) ? $submitted_data['connect'] : '';

			try {
				if ( empty( $connect ) ) {
					throw new Powerform_Addon_Zapier_Exception( __( 'Please Connect Zapier', Powerform::DOMAIN ) );
				}

				if ( ! powerform_addon_is_active( $this->_slug ) ) {
					$activated = Powerform_Addon_Loader::get_instance()->activate_addon( $this->_slug );
					if ( ! $activated ) {
						throw new Powerform_Addon_Zapier_Exception( Powerform_Addon_Loader::get_instance()->get_last_error_message() );
					}
				}
				// no form_id its on global settings
				if ( empty( $form_id ) ) {
					$show_success = true;
				}

			} catch ( Powerform_Addon_Zapier_Exception $e ) {
				$template_params['error_message'] = $e->getMessage();
				$has_errors                       = true;
			}
		}

		if ( $show_success ) {
			$template = $template_success;
		}

		$buttons = array();

		if ( $show_success ) {
			$buttons['close'] = array(
				'markup' => self::get_button_markup( esc_html__( 'Close', Powerform::DOMAIN ), 'sui-button-ghost powerform-addon-close' ),
			);
		} else {
			if ( $this->is_connected() ) {
				$buttons['disconnect'] = array(
					'markup' => self::get_button_markup( esc_html__( 'DISCONNECT', Powerform::DOMAIN ), 'sui-button-ghost powerform-addon-disconnect' ),
				);
			} else {
				$buttons['submit'] = array(
					'markup' => self::get_button_markup( esc_html__( 'Activate', Powerform::DOMAIN ), 'powerform-addon-connect' ),
				);
			}


		}

		return array(
			'html'       => self::get_template( $template, $template_params ),
			'buttons'    => $buttons,
			'redirect'   => false,
			'has_errors' => $has_errors,
		);
	}

	/**
	 * Override on is_connected
	 *
	 * @since 1.0 Zapier Addon
	 * @since 1.1 Disable auto activate
	 *
	 * @return bool
	 */
	public function is_connected() {
		try {
			// check if its active
			if ( ! $this->is_active() ) {
				throw new Powerform_Addon_Zapier_Exception( __( 'Zapier is not active', Powerform::DOMAIN ) );
			}
			$is_connected = true;
		} catch ( Powerform_Addon_Zapier_Exception $e ) {
			$is_connected = false;
		}

		/**
		 * Filter connected status of zapier
		 *
		 * @since 1.1
		 *
		 * @param bool $is_connected
		 */
		$is_connected = apply_filters( 'powerform_addon_zapier_is_connected', $is_connected );

		return $is_connected;
	}

	/**
	 * Check if zapier is connected with current form
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param $form_id
	 *
	 * @return bool
	 */
	public function is_form_connected( $form_id ) {
		try {
			$form_settings_instance = null;
			if ( ! $this->is_connected() ) {
				throw new Powerform_Addon_Zapier_Exception( __( 'Zapier is not connected', Powerform::DOMAIN ) );
			}

			$form_settings_instance = $this->get_addon_form_settings( $form_id );
			if ( ! $form_settings_instance instanceof Powerform_Addon_Zapier_Form_Settings ) {
				throw new Powerform_Addon_Zapier_Exception( __( 'Invalid Form Settings of Zapier', Powerform::DOMAIN ) );
			}

			// Mark as active when there is at least one active connection
			if ( false === $form_settings_instance->find_one_active_connection() ) {
				throw new Powerform_Addon_Zapier_Exception( __( 'No active Zapier connection found in this form', Powerform::DOMAIN ) );
			}

			$is_form_connected = true;

		} catch ( Powerform_Addon_Zapier_Exception $e ) {
			$is_form_connected = false;
			powerform_addon_maybe_log( __METHOD__, $e->getMessage() );
		}

		/**
		 * Filter connected status of zapier with the form
		 *
		 * @since 1.1
		 *
		 * @param bool                                       $is_form_connected
		 * @param int                                        $form_id                Current Form ID
		 * @param Powerform_Addon_Zapier_Form_Settings|null $form_settings_instance Instance of form settings, or null when unavailable
		 *
		 */
		$is_form_connected = apply_filters( 'powerform_addon_zapier_is_form_connected', $is_form_connected, $form_id, $form_settings_instance );

		return $is_form_connected;
	}

	/**
	 * Get Zapier API
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param string $endpoint
	 *
	 * @return Powerform_Addon_Zapier_Wp_Api|null
	 * @throws Powerform_Addon_Zapier_Wp_Api_Exception
	 */
	public function get_api( $endpoint ) {
		return Powerform_Addon_Zapier_Wp_Api::get_instance( $endpoint );
	}

	/**
	 * Flag show full log on entries
	 *
	 * @since 1.0 Zapier Addon
	 * @return bool
	 */
	public static function is_show_full_log() {
		if ( defined( 'POWERFORM_ADDON_ZAPIER_SHOW_FULL_LOG' ) && POWERFORM_ADDON_ZAPIER_SHOW_FULL_LOG ) {
			return true;
		}

		return false;
	}

	/**
	 * Allow multiple connection on one form
	 *
	 * @since 1.0 Zapier Addon
	 * @return bool
	 */
	public function is_allow_multi_on_form() {
		return true;
	}

	/**
	 * Flag for check if and addon connected to a poll(poll settings such as list id completed)
	 *
	 * Please apply necessary WordPress hook on the inheritance class
	 *
	 * @since   1.6.1
	 *
	 * @param $poll_id
	 *
	 * @return boolean
	 */
	public function is_poll_connected( $poll_id ) {
		try {
			$poll_settings_instance = null;
			if ( ! $this->is_connected() ) {
				throw new Powerform_Addon_Zapier_Exception( 'Zapier is not connected' );
			}

			$poll_settings_instance = $this->get_addon_poll_settings( $poll_id );
			if ( ! $poll_settings_instance instanceof Powerform_Addon_Zapier_Poll_Settings ) {
				throw new Powerform_Addon_Zapier_Exception( 'Zapier Poll Settings of Trello' );
			}

			// Mark as active when there is at least one active connection
			if ( false === $poll_settings_instance->find_one_active_connection() ) {
				throw new Powerform_Addon_Zapier_Exception( 'No active Poll connection found in this poll' );
			}

			$is_poll_connected = true;

		} catch ( Powerform_Addon_Zapier_Exception $e ) {

			$is_poll_connected = false;
		}

		/**
		 * Filter connected status Zapier with the poll
		 *
		 * @since 1.6.1
		 *
		 * @param bool                                       $is_poll_connected
		 * @param int                                        $poll_id                Current Poll ID
		 * @param Powerform_Addon_Trello_Poll_Settings|null $poll_settings_instance Instance of poll settings, or null when unavailable
		 *
		 */
		$is_poll_connected = apply_filters( 'powerform_addon_zapier_is_poll_connected', $is_poll_connected, $poll_id, $poll_settings_instance );

		return $is_poll_connected;
	}

	/**
	 * Allow multiple connection on one poll
	 *
	 * @since 1.6.1
	 * @return bool
	 */
	public function is_allow_multi_on_poll() {
		return true;
	}

	/**
	 * Flag for check if and addon connected to a quiz(quiz settings such as list id completed)
	 *
	 * Please apply necessary WordPress hook on the inheritance class
	 *
	 * @since   1.6.2
	 *
	 * @param $quiz_id
	 *
	 * @return boolean
	 */
	public function is_quiz_connected( $quiz_id ) {
		try {
			$quiz_settings_instance = null;
			if ( ! $this->is_connected() ) {
				throw new Powerform_Addon_Zapier_Exception( 'Zapier is not connected' );
			}

			$quiz_settings_instance = $this->get_addon_quiz_settings( $quiz_id );
			if ( ! $quiz_settings_instance instanceof Powerform_Addon_Zapier_Quiz_Settings ) {
				throw new Powerform_Addon_Zapier_Exception( 'Zapier Quiz Settings of Trello' );
			}

			// Mark as active when there is at least one active connection
			if ( false === $quiz_settings_instance->find_one_active_connection() ) {
				throw new Powerform_Addon_Zapier_Exception( 'No active Zapier connection found in this quiz' );
			}

			$is_quiz_connected = true;

		} catch ( Powerform_Addon_Zapier_Exception $e ) {

			$is_quiz_connected = false;
		}

		/**
		 * Filter connected status Zapier with the quiz
		 *
		 * @since 1.6.2
		 *
		 * @param bool                                       $is_quiz_connected
		 * @param int                                        $quiz_id                Current Quiz ID
		 * @param Powerform_Addon_Trello_Quiz_Settings|null $quiz_settings_instance Instance of quiz settings, or null when unavailable
		 *
		 */
		$is_quiz_connected = apply_filters( 'powerform_addon_zapier_is_quiz_connected', $is_quiz_connected, $quiz_id, $quiz_settings_instance );

		return $is_quiz_connected;
	}

	/**
	 * Allow multiple connection on one quiz
	 *
	 * @since 1.6.2
	 * @return bool
	 */
	public function is_allow_multi_on_quiz() {
		return true;
	}
}