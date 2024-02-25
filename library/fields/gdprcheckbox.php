<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_GdprCheckbox
 *
 * @since 1.0.5
 */
class Powerform_GdprCheckbox extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'gdprcheckbox';

	/**
	 * @var string
	 */
	public $type = 'gdprcheckbox';

	/**
	 * @var int
	 */
	public $position = 21;

	/**
	 * @var array
	 */
	public $options = array();

	/**
	 * @var string
	 */
	public $category = 'standard';

	/**
	 * @var string
	 */
	public $icon = 'sui-icon-gdpr';

	/**
	 * Powerform_GdprChecbox constructor.
	 *
	 * @since 1.0.5
	 */

	public function __construct() {
		parent::__construct();

		$this->name = __( 'DSGVO-Genehmigung', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0.5
	 * @return array
	 */
	public function defaults() {
		return array(
			'required'         => 'true',
			'field_label'      => 'DSGVO',
			'gdpr_description' => __( 'Ja, ich stimme den <a href="#">Datenschutz-Bestimmungen</a> zu', Powerform::DOMAIN ),
		);
	}

	/**
	 * Autofill Setting
	 *
	 * @since 1.0.5
	 *
	 * @param array $settings
	 *
	 * @return array
	 */
	public function autofill_settings( $settings = array() ) {
		//Unsupported Autofill
		$autofill_settings = array();

		return $autofill_settings;
	}

	/**
	 * Field front-end markup
	 *
	 * @since 1.0.5
	 *
	 * @param $field
	 * @param $settings
	 *
	 * @return mixed
	 */
	public function markup( $field, $settings = array() ) {
		$this->field = $field;
		$html        = '';
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$description = self::get_property( 'gdpr_description', $field );
		$id          = $id . '-field-' . uniqid();
		$label       = self::get_property( 'field_label', $field );

		if ( $label ) {
			$html .= '<div class="powerform-field--label">';
			$html .= sprintf( '<label id="powerform-label-%s" class="powerform-label">%s %s</label>', $id, $label, powerform_get_required_icon() );
			$html .= '</div>';
		}

		$html .= '<div class="powerform-checkbox">';
		$html .= sprintf( '<input id="%s" type="checkbox" name="%s" value="true" class="powerform-checkbox--input" data-required="true">', $id, $name );
		$html .= sprintf( '<label for="%s" class="powerform-checkbox--design wpdui-icon wpdui-icon-check" aria-hidden="true"></label>', $id );
		$html .= sprintf( '<label for="%s" class="powerform-checkbox--label">%s</label>', $id, $description );
		$html .= '</div>';

		return apply_filters( 'powerform_field_gdprcheckbox_markup', $html, $id, $description );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0.5
	 * @return string
	 */
	public function get_validation_rules() {
		$field = $this->field;

		return '"' . $this->get_id( $field ) . '":{"required":true},';
	}

	/**
	 * Return field inline validation errors
	 *
	 * @since 1.0.5
	 * @return string
	 */
	public function get_validation_messages() {
		$messages = '';
		$field    = $this->field;
		$id       = $this->get_id( $field );

		$required_message = apply_filters(
			'powerform_gdprcheckbox_field_required_validation_message',
			__( 'Dieses Feld wird benötigt. Bestätige bitte das.', Powerform::DOMAIN ),
			$id,
			$field
		);
		$messages         .= '"' . $this->get_id( $field ) . '": {"required":"' . $required_message . '"},' . "\n";

		return $messages;
	}

	/**
	 * Field back-end validation
	 *
	 * @since 1.0.5
	 *
	 * @param array        $field
	 * @param array|string $data
	 */
	public function validate( $field, $data ) {
		// value of gdpr checkbox is `string` *true*
		$id = $this->get_id( $field );
		if ( empty( $data ) || 'true' !== $data ) {
			$this->validation_message[ $id ] = apply_filters(
				'powerform_gdprcheckbox_field_required_validation_message',
				__( 'Dieses Feld wird benötigt. Bestätige bitte das.', Powerform::DOMAIN ),
				$id,
				$field
			);
		}
	}

	/**
	 * Sanitize data
	 *
	 * @since 1.0.5
	 *
	 * @param array        $field
	 * @param array|string $data - the data to be sanitized
	 *
	 * @return array|string $data - the data after sanitization
	 */
	public function sanitize( $field, $data ) {
		$original_data = $data;
		// Sanitize
		$data = powerform_sanitize_field( $data );

		return apply_filters( 'powerform_field_gdprcheckbox_sanitize', $data, $field, $original_data );
	}
}