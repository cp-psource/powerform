<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Shortcode_Generator
 */
class Powerform_Shortcode_Generator {

	/**
	 * Powerform_Shortcode_Generator constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		add_filter( 'media_buttons_context', array( $this, 'attach_button' ) );
		add_action( 'admin_footer', array( $this, 'enqueue_js_scripts' ) );
		if ( function_exists( 'hustle_activated' ) ) {
			add_action( 'admin_footer', array( $this, 'enqueue_preview_scripts_for_hustle' ) );
		}
	}

	/**
	 * Check if current page is Hustle wizard page
	 *
	 * @since 1.0.5
	 *
	 * @return bool
	 */
	public function is_hustle_wizard() {
		$screen = get_current_screen();

		// If no screen id, abort
		if( !isset( $screen->id ) ) return false;

		// Hustle wizard pages
		$pages = array(
			'hustle_page_hustle_popup',
			'hustle_page_hustle_slidein',
			'hustle_page_hustle_embedded',
			'hustle_page_hustle_sshare'
		);

		// Check if current page is hustle wizard page
		if( in_array( $screen->id, $pages, true ) ) return true;

		return false;
	}

	/**
	 * Attach button
	 *
	 * @since 1.0
	 * @param $content
	 *
	 * @return string
	 */
	public function attach_button( $content ) {
		global $pagenow;
		$html = '';

		// If page different than Post or Page, abort
		if ( 'post.php' !== $pagenow && 'post-new.php' !== $pagenow && ! $this->is_hustle_wizard() ) {
			return $content;
		}

		// Button markup
		$html .= '<a id="powerform-generate-shortcode" class="button" data-editor="content"><span class="dashicons dashicons-welcome-add-page"></span>' . __( 'Formular hinzufügen', Powerform::DOMAIN ) . '</a>';

		$content .= $html;
		return $content;
	}

	/**
	 * @since 1.0
	 * @param $content
	 *
	 * @return mixed
	 */
	public function enqueue_js_scripts( $content ) {
		global $pagenow;

		// If page different than Post or Page, abort
		if ( 'post.php' !== $pagenow && 'post-new.php' !== $pagenow && ! $this->is_hustle_wizard() ) {
			return $content;
		}

		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui-widget' );
		wp_enqueue_script( 'jquery-ui-mouse' );
		wp_enqueue_script( 'jquery-ui-tabs' );
		wp_enqueue_script( 'select2-powerform', powerform_plugin_url() . 'assets/js/library/select2.full.min.js', array( 'jquery' ), POWERFORM_VERSION, false );
		wp_enqueue_style( 'select2-powerform-css', powerform_plugin_url() . 'assets/css/select2.min.css', array(), "4.0.3" ); // Select2
		wp_enqueue_style( 'powerform-shortcode-generator-styles', powerform_plugin_url() . 'assets/css/scgen.min.css', array(), POWERFORM_VERSION );
		wp_enqueue_script( 'powerform-shortcode-generator', powerform_plugin_url() . 'build/admin/scgen.min.js', array( 'jquery' ), POWERFORM_VERSION, false );

		$this->print_markup();
		?>
		<script type="text/javascript">
			jQuery(document).ready(function () {
				jQuery("#powerform-generate-shortcode").on( 'click', function(e) {
					e.preventDefault();
				});
			});
		</script>
		<?php
	}

	/**
	 * @since 1.0
	 * @param $content
	 *
	 * @return mixed
	 */
	public function enqueue_preview_scripts_for_hustle( $content ) {
		// If page is not Hustle module settings page, abort
		if ( ! $this->is_hustle_wizard() ) {
			return $content;
		}

		wp_enqueue_style( 'powerform-shortcode-generator-front-styles', powerform_plugin_url() . 'assets/css/front.min.css', array(), POWERFORM_VERSION );
	}

	/**
	 * Print modal markup
	 *
	 * @since 1.0
	 */
	public function print_markup() {
		?>
		<div id="powerform-popup" class="wpmudev-modal" style="display: none;">

			<div class="wpmudev-modal-mask" aria-hidden="true"></div>

			<div class="wpmudev-box wpmudev-show">

				<div class="wpmudev-box-header">

					<div class="wpmudev-header--text">
						<h2 class="wpmudev-subtitle"><?php echo esc_html__( "Formular-Shortcode generieren", Powerform::DOMAIN ); ?></h2>
					</div>

					<div class="wpmudev-header--action">
						<button id="powerform-popup-close" class="wpmudev-box--action">
							<span class="wpmudev-icon--close"></span>
						</button>

					</div>

				</div>

				<div class="wpmudev-box-section">

					<div class="wpmudev-section--text">

						<div class="wpmudev-tabs">

							<ul class="wpmudev-tabs--nav">

								<li class="wpmudev-tab"><a class="wpmudev-tab--link" href="#powerform-custom-forms"><?php esc_html_e( 'Benutzerdefinierte Formulare', Powerform::DOMAIN ); ?></a></li>

								<li class="wpmudev-tab"><a class="wpmudev-tab--link" href="#powerform-polls"><?php esc_html_e( 'Umfragen', Powerform::DOMAIN ); ?></a></li>

								<li class="wpmudev-tab"><a class="wpmudev-tab--link" href="#powerform-quizzes"><?php esc_html_e( 'Tests', Powerform::DOMAIN ); ?></a></li>

							</ul>

							<div id="powerform-custom-forms" class="wpmudev-tabs--content">

								<?php echo $this->get_forms(); // WPCS: XSS ok. ?>

								<div class="wpmudev-tabs--action">

									<button class="wpmudev-button wpmudev-button-blue wpmudev-insert-cform"><?php esc_html_e( 'Formular einfügen', Powerform::DOMAIN ); ?></button>

								</div>

							</div>

							<div id="powerform-polls" class="wpmudev-tabs--content">

								<?php echo $this->get_polls(); // WPCS: XSS ok. ?>

								<div class="wpmudev-tabs--action">

									<button class="wpmudev-button wpmudev-button-blue wpmudev-insert-poll"><?php esc_html_e( 'Formular einfügen', Powerform::DOMAIN ); ?></button>

								</div>

							</div>

							<div id="powerform-quizzes" class="wpmudev-tabs--content">

								<?php echo $this->get_quizzes(); // WPCS: XSS ok. ?>

								<div class="wpmudev-tabs--action">

									<button class="wpmudev-button wpmudev-button-blue wpmudev-insert-quiz"><?php esc_html_e( 'Formular einfügen', Powerform::DOMAIN ); ?></button>

								</div>

							</div>

						</div>

					</div>

				</div>

			</div>

		</div>
		<?php
	}

	/**
	 * Print forms select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_forms() {
		$html = '<select name="forms" class="wpmudev-select powerform-custom-form-list">';
		$html .= '<option value="">' . __( "Wähle Formular", Powerform::DOMAIN ) . '</option>';
		$modules = powerform_cform_modules( 999 );
		foreach( $modules as $module ) {
			$title = powerform_get_form_name( $module['id'], 'custom_form' );
			if ( mb_strlen( $title ) > 25 ) {
				$title = mb_substr( $title, 0, 25 ) . '...';
			}
			$html .= '<option value="' . $module['id'] . '">' . $title. ' - ID: ' . $module['id'] . '</option>';
		}
		$html .= '</select>';

		return $html;
	}

	/**
	 * Print polls select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_polls() {
		$html = '<select name="forms" class="wpmudev-select powerform-insert-poll">';
		$html .= '<option value="">' . __( "Wähle Umfrage", Powerform::DOMAIN ) . '</option>';
		$modules = powerform_polls_modules( 999 );
		foreach( $modules as $module ) {
			$title = powerform_get_form_name( $module['id'], 'poll');
			if ( mb_strlen( $title ) > 25 ) {
				$title = mb_substr( $title, 0, 25 ) . '...';
			}
			$html .= '<option value="' . $module['id'] . '">' . $title . ' - ID: ' . $module['id'] . '</option>';
		}
		$html .= '</select>';

		return $html;
	}

	/**
	 * Print quizzes select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_quizzes() {
		$html = '<select name="forms" class="wpmudev-select powerform-quiz-list">';
		$html .= '<option value="">' . __( "Wähle Test", Powerform::DOMAIN ) . '</option>';
		$modules = powerform_quizzes_modules( 999 );
		foreach( $modules as $module ) {
			$title = powerform_get_form_name( $module['id'], 'quiz');
			if ( mb_strlen( $title ) > 25 ) {
				$title = mb_substr( $title, 0, 25 ) . '...';
			}
			$html .= '<option value="' . $module['id'] . '">' . $title . ' - ID: ' . $module['id'] . '</option>';
		}
		$html .= '</select>';

		return $html;
	}
}