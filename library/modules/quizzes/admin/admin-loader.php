<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Quizz_Admin
 *
 * @property string            page_edit_nowrong
 * @property Powerform_Module module
 * @property string            page_edit_knowledge
 *
 * @since 1.0
 */
class Powerform_Quizz_Admin extends Powerform_Admin_Module {

	/**
	 * Initialize
	 *
	 * @since 1.0
	 */
	public function init() {
		$this->module              = Powerform_Quizzes::get_instance();
		$this->page                = 'powerform-quiz';
		$this->page_edit_nowrong   = 'powerform-nowrong-wizard';
		$this->page_edit_knowledge = 'powerform-knowledge-wizard';
		$this->page_entries        = 'powerform-quiz-view';
	}

	/**
	 * Include required files
	 *
	 * @since 1.0
	 */
	public function includes() {
		include_once dirname( __FILE__ ) . '/admin-page-new-nowrong.php';
		include_once dirname( __FILE__ ) . '/admin-page-new-knowledge.php';
		include_once dirname( __FILE__ ) . '/admin-page-view.php';
		include_once dirname( __FILE__ ) . '/admin-page-entries.php';
		include_once dirname( __FILE__ ) . '/admin-renderer-entries.php';
	}

	/**
	 * Add module pages to Admin
	 *
	 * @since 1.0
	 */
	public function add_menu_pages() {
		new Powerform_Quizz_Page( $this->page, 'quiz/list', __( 'Tests', Powerform::DOMAIN ), __( 'Tests', Powerform::DOMAIN ), 'powerform' );
		new Powerform_Quizz_New_NoWrong( $this->page_edit_nowrong, 'quiz/nowrong', __( 'Neuer Test', Powerform::DOMAIN ), __( 'Neuer Test', Powerform::DOMAIN ), 'powerform' );
		new Powerform_Quizz_New_Knowledge( $this->page_edit_knowledge, 'quiz/knowledge', __( 'Neuer Test', Powerform::DOMAIN ), __( 'Neuer Test', Powerform::DOMAIN ), 'powerform' );
		new Powerform_Quizz_View_Page( $this->page_entries, 'quiz/entries', __( 'Einreichungen:', Powerform::DOMAIN ), __( 'Test ansehen', Powerform::DOMAIN ), 'powerform' );
	}

	/**
	 * Remove necessary pages from menu
	 *
	 * @since 1.0
	 */
	public function hide_menu_pages() {
		remove_submenu_page( 'powerform', $this->page_edit_nowrong );
		remove_submenu_page( 'powerform', $this->page_edit_knowledge );
		remove_submenu_page( 'powerform', $this->page_entries );
	}

	/**
	 * Is the type of the quiz "knowledge"
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function is_knowledge_wizard() {
		global $plugin_page;

		return $this->page_edit_knowledge === $plugin_page;
	}

	/**
	 * Is the type of the quiz "no wrong answer"
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function is_nowrong_wizard() {
		global $plugin_page;

		return $this->page_edit_nowrong === $plugin_page;
	}

	/**
	 * Highlight parent page in sidebar
	 *
	 * @deprecated 1.1 No longer used because this function override prohibited WordPress global of $plugin_page
	 * @since      1.0
	 *
	 * @param $file
	 *
	 * @return mixed
	 */
	public function highlight_admin_parent( $file ) {
		_deprecated_function( __METHOD__, '1.1', null );

		return $file;
	}

	/**
	 * Highlight submenu on admin page
	 *
	 * @since 1.1
	 *
	 * @param $submenu_file
	 * @param $parent_file
	 *
	 * @return string
	 */
	public function admin_submenu_file( $submenu_file, $parent_file ) {
		global $plugin_page;

		if ( 'powerform' !== $parent_file ) {
			return $submenu_file;
		}

		if ( $this->page_edit_nowrong === $plugin_page || $this->page_edit_knowledge === $plugin_page || $this->page_entries === $plugin_page ) {
			$submenu_file = $this->page;
		}

		return $submenu_file;
	}

	/**
	 * Pass module defaults to JS
	 *
	 * @since 1.0
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_js_defaults( $data ) {
		$id    = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : null; // WPCS: CSRF ok.
		$model = null;

		if ( ! is_null( $id ) ) {
			/** @var  Powerform_Quiz_Form_Model $model */
			$model = Powerform_Quiz_Form_Model::model()->load( $id );
		}

		if ( $this->is_knowledge_wizard() ) {
			$data['formNonce']   = wp_create_nonce( 'powerform_save_quiz' );
			$data['application'] = 'knowledge';

			if ( ! self::is_edit() ) {
				$name = '';
				if ( isset( $_GET['name'] ) ) { // WPCS: CSRF ok.
					$name = sanitize_text_field( $_GET['name'] );
				}

				$data['currentForm'] = array(
					'settings' => array(
						'formName'               => $name,
						'admin-email-recipients' => array(
							get_option( 'admin_email' ),
						),
						'admin-email-title'      => __( "Neue Test-Einreichung für {quiz_name}", Powerform::DOMAIN ),
						'admin-email-editor'     => __(
							"Du hast eine neue Test-Einreichung: <br/><br/>{quiz_answer}<br/><br/>Test-Ergebnisse:<br/>{quiz_result} <br/>---<br/> Diese Nachricht wurde von {site_url} gesendet.",
							Powerform::DOMAIN
						),
						'results_behav' => 'after',
						'visual_style' => 'list',
						'powerform-quiz-theme' => 'default',
						'msg_correct' => 'Richtig! Es war %UserAnswer%.',
						'msg_incorrect' => 'Falsch! Es war %CorrectAnswer%, Entschuldigung...',
						'msg_count' => 'Du hast %YourNum%/%Total% richtig!',
						// KNOWLEDGE title
						'knowledge-title-color' =>                       '#333333',
						'knowledge-title-font-family' =>                 'Roboto',
						'knowledge-title-font-size' =>                   '42',
						'knowledge-title-font-weight' =>                 '500',
						// KNOWLEDGE description
						'knowledge-description-color' =>                 '#8C8C8C',
						'knowledge-description-font-family' =>           'Roboto',
						'knowledge-description-font-size' =>             '20',
						'knowledge-description-font-weight' =>           '400',
						// KNOWLEDGE question
						'knowledge-question-color' =>                    '#333333',
						'knowledge-question-font-family' =>              'Roboto',
						'knowledge-question-font-size' =>                '24',
						'knowledge-question-font-weight' =>              '500',
						// KNOWLEDGE answer
						'knowledge-answer-background-static' =>          '#FAFAFA',
						'knowledge-answer-background-hover' =>           '#F3FBFE',
						'knowledge-answer-background-active' =>          '#F3FBFE',
						'knowledge-aright-background' =>                 '#F4FCF2',
						'knowledge-awrong-background' =>                 '#FDF2F2',
						'knowledge-answer-border-static' =>              '#EBEDEB',
						'knowledge-answer-border-hover' =>               '#17A8E3',
						'knowledge-answer-border-active' =>              '#17A8E3',
						'knowledge-aright-border' =>                     '#0BC30B',
						'knowledge-awrong-border' =>                     '#DA0000',
						'knowledge-answer-color-static' =>               '#888888',
						'knowledge-answer-color-active' =>               '#333333',
						'knowledge-aright-color' =>                      '#0BC30B',
						'knowledge-awrong-color' =>                      '#DA0000',
						'knowledge-answer-font-size' =>                  '14',
						'knowledge-answer-font-family' =>                'Roboto',
						'knowledge-answer-font-weight' =>                '500',
						'knowledge-answer-check-border-static' =>        '#BFBFBF',
						'knowledge-answer-check-border-active' =>        '#17A8E3',
						'knowledge-answer-check-border-correct' =>       '#0BC30B',
						'knowledge-answer-check-border-incorrect' =>     '#DA0000',
						'knowledge-answer-check-background-static' =>    '#FFFFFF',
						'knowledge-answer-check-background-active' =>    '#17A8E3',
						'knowledge-answer-check-background-correct' =>   '#0BC30B',
						'knowledge-answer-check-background-incorrect' => '#DA0000',
						'knowledge-phrasing-color' =>                    '#4D4D4D',
						'knowledge-phrasing-font-size' =>                '16',
						'knowledge-phrasing-font-family' =>              'Roboto',
						'knowledge-phrasing-font-weight' =>              '700',
						// KNOWLEDGE button
						'knowledge-submit-background-static' =>          '#17A8E3',
						'knowledge-submit-background-hover' =>           '#008FCA',
						'knowledge-submit-background-active' =>          '#008FCA',
						'knowledge-submit-color-static' =>               '#FFFFFF',
						'knowledge-submit-color-hover' =>                '#FFFFFF',
						'knowledge-submit-color-active' =>               '#FFFFFF',
						'knowledge-submit-font-family' =>                'Roboto',
						'knowledge-submit-font-size' =>                  '14',
						'knowledge-submit-font-weight' =>                '500',
						// KNOWLEDGE summary
						'knowledge-summary-color' =>                     '#333333',
						'knowledge-summary-font-family' =>               'Roboto',
						'knowledge-summary-font-size' =>                 '40',
						'knowledge-summary-font-weight' =>               '400',
						// KNOWLEDGE social
						'knowledge-sshare-color' =>                      '#4D4D4D',
						'knowledge-sshare-font-family' =>                'Roboto',
						'knowledge-sshare-font-size' =>                  '20',
						'knowledge-social-facebook' =>                   '#0084BF',
						'knowledge-social-twitter' =>                    '#1DA1F2',
						'knowledge-social-google' =>                     '#DB4437',
						'powerform-knowledge-social-linkedin' =>        '#0084BF',
						'knowledge-social-size' =>                       '36'
					),
				);
			} else {
				// Load stored record
				if ( is_object( $model ) ) {
					$settings = apply_filters( 'powerform_quiz_settings', $model->settings, $model, $data, $this );

					$data['currentForm'] = array(
						'results'   => array(),
						'questions' => $model->questions,
						'settings'  => array_merge(
							$settings,
							array(
								'formName'    => powerform_get_name_from_model( $model ),
								'form_id'     => $model->id,
								'form_status' => $model->status,
								'quiz_title'  => $model->name,
								'version'     => POWERFORM_VERSION,
							)
						),
					);
				} else {
					$data['currentForm'] = array();
				}
			}
		}

		if ( $this->is_nowrong_wizard() ) {
			$data['formNonce']   = wp_create_nonce( 'powerform_save_quiz' );
			$data['application'] = 'nowrong';

			if ( ! self::is_edit() ) {
				$name = '';
				if ( isset( $_GET['name'] ) ) { // WPCS: CSRF ok.
					$name = sanitize_text_field( $_GET['name'] );
				}

				$data['currentForm'] = array(
					'questions' => array(),
					'results'   => array(),
					'settings'  => array(
						'formName'               => $name,
						'admin-email-recipients' => array(
							get_option( 'admin_email' ),
						),
						'results_behav' => 'after',
						'visual_style' => 'list',
						'powerform-quiz-theme' => 'default',
						'msg_correct' => 'Richtig! Es war %UserAnswer%.',
						'msg_incorrect' => 'Falsch! Es war %CorrectAnswer%, Entschuldigung...',
						'msg_count' => 'Du hast %YourNum%/%Total% richtig!',
						// NOWRONG title
						'nowrong-title-settings' =>                      false,
						'nowrong-title-color' =>                         '#333333',
						'nowrong-title-font-family' =>                   'Roboto',
						'nowrong-title-font-size' =>                     '42',
						'nowrong-title-font-weight' =>                   '500',
						// NOWRONG description
						'nowrong-description-settings' =>                false,
						'nowrong-description-color' =>                   '#8C8C8C',
						'nowrong-description-font-family' =>             'Roboto',
						'nowrong-description-font-size' =>               '20',
						'nowrong-description-font-weight' =>             '400',
						// NOWRONG image
						'nowrong-image-settings' =>                      false,
						'nowrong-image-border-color' =>                  '#000000',
						'nowrong-image-border-width' =>                  '0',
						'nowrong-image-border-style' =>                  'solid',
						// NOWRONG question
						'nowrong-question-settings' =>                   false,
						'nowrong-question-font-size' =>                  '24',
						'nowrong-question-font-family' =>                'Roboto',
						'nowrong-question-font-weight' =>                '500',
						// NOWRONG answer
						'nowrong-answer-settings' =>                     false,
						'nowrong-answer-border-static' =>                '#EBEDEB',
						'nowrong-answer-border-hover' =>                 '#17A8E3',
						'nowrong-answer-border-active' =>                '#17A8E3',
						'nowrong-answer-background-static' =>            '#FAFAFA',
						'nowrong-answer-background-hover' =>             '#F3FBFE',
						'nowrong-answer-background-active' =>            '#F3FBFE',
						'nowrong-answer-chkbo-static' =>                 '#BFBFBF',
						'nowrong-answer-chkbo-active' =>                 '#17A8E3',
						'nowrong-answer-color-static' =>                 '#888888',
						'nowrong-answer-color-active' =>                 '#333333',
						'nowrong-answer-font-size' =>                    '14',
						'nowrong-answer-font-family' =>                  'Roboto',
						'nowrong-answer-font-weight' =>                  '500',
						// NOWRONG submit
						'nowrong-submit-background-static' =>            '#17A8E3',
						'nowrong-submit-background-hover' =>             '#008FCA',
						'nowrong-submit-background-active' =>            '#008FCA',
						'nowrong-submit-color-static' =>                 '#FFFFFF',
						'nowrong-submit-color-hover' =>                  '#FFFFFF',
						'nowrong-submit-color-active' =>                 '#FFFFFF',
						'nowrong-submit-font-family' =>                  'Roboto',
						'nowrong-submit-font-size' =>                    '14',
						'nowrong-submit-font-weight' =>                  '500',
						// NOWRONG result
						'nowrong-result-background-main' =>              '#FAFAFA',
						'nowrong-result-background-header' =>            '#FAFAFA',
						'nowrong-result-border-color' =>                 '#17A8E3',
						'nowrong-result-quiz-color' =>                   '#FFFFFF',
						'nowrong-result-quiz-font-family' =>             'Roboto',
						'nowrong-result-quiz-font-size' =>               '15',
						'nowrong-result-quiz-font-weight' =>             '500',
						'nowrong-result-retake-font-family' =>           'Roboto',
						'nowrong-result-retake-font-size' =>             '13',
						'nowrong-result-retake-font-weight' =>           '500',
						'nowrong-result-retake-background-static' =>     '#17A8E3',
						'nowrong-result-retake-background-hover' =>      '#17A8E3',
						'nowrong-result-retake-background-active' =>     '#17A8E3',
						'nowrong-result-background-body' =>              '#EBEDEB',
						'nowrong-result-title-color' =>                  '#333333',
						'nowrong-result-title-font-family' =>            'Roboto',
						'nowrong-result-title-font-size' =>              '15',
						'nowrong-result-title-font-weight' =>            '500',
						'nowrong-result-description-color' =>            '#4D4D4D',
						'nowrong-result-description-font-family' =>      'Roboto',
						'nowrong-result-description-font-size' =>        '13',
						'nowrong-result-description-font-weight' =>      '400',
					),
				);
			} else {
				// Load stored record
				if ( is_object( $model ) ) {
					unset( $model->settings['priority_order'] );
					$settings = apply_filters( 'powerform_quiz_settings', $model->settings, $model, $data, $this );

					$data['currentForm'] = array(
						'results'   => $model->getResults(),
						'questions' => $model->questions,
						'settings'  => array_merge(
							$settings,
							array(
								'formName'    => powerform_get_name_from_model( $model ),
								'form_id'     => $model->id,
								'form_status' => $model->status,
								'quiz_title'  => $model->name,
								'version'     => POWERFORM_VERSION,
							)
						),
					);
				} else {
					$data['currentForm'] = array();
				}
			}
		}

		$data['modules']['quizzes'] = array(
			'nowrong_url'   => menu_page_url( $this->page_edit_nowrong, false ),
			'knowledge_url' => menu_page_url( $this->page_edit_knowledge, false ),
			'form_list_url' => menu_page_url( $this->page, false ),
			'preview_nonce' => wp_create_nonce( 'powerform_popup_preview_quizzes' ),
		);

		return apply_filters( 'powerform_quiz_admin_data', $data, $model, $this );
	}

	/**
	 * Localize modules strings
	 *
	 * @since 1.0
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_l10n_strings( $data ) {
		$data['quizzes'] = array(
			'quizzes'                      => __( 'Tests', Powerform::DOMAIN ),
			"popup_label"                  => __( "Testtyp auswählen", Powerform::DOMAIN ),
			"results"                      => __( "Ergebnisse", Powerform::DOMAIN ),
			"questions"                    => __( "Fragen", Powerform::DOMAIN ),
			"details"                      => __( "Details", Powerform::DOMAIN ),
			"settings"                     => __( "Einstellungen", Powerform::DOMAIN ),
			"appearance"                   => __( "Darstellung", Powerform::DOMAIN ),
			"preview"                      => __( "Vorschau", Powerform::DOMAIN ),
			"preview_quiz"                 => __( "Test Vorschau", Powerform::DOMAIN ),
			"list"                         => __( "Liste", Powerform::DOMAIN ),
			"grid"                         => __( "Raster", Powerform::DOMAIN ),
			"visual_style"                 => __( "Visuellen Stil", Powerform::DOMAIN ),
			"quiz_title"                   => __( "Test Titel", Powerform::DOMAIN ),
			"quiz_title_desc"              => __( "Passe das Erscheinungsbild des Quiztitels weiter an. Es erscheint als Kopfzeile des Ergebnisses.", Powerform::DOMAIN ),
			"title"                        => __( "Titel", Powerform::DOMAIN ),
			"title_desc"                   => __( "Erscheinungsbild des Testtitels weiter anpassen.", Powerform::DOMAIN ),
			"image_desc"                   => __( "Erscheinungsbild für das im Test vorgestellte Bild weiter anpassen.", Powerform::DOMAIN ),
			"enable_styles"                => __( "Benutzerdefinierte Stile aktivieren", Powerform::DOMAIN ),
			"desc_desc"                    => __( "Erscheinungsbild für Quizbeschreibung/Intro weiter anpassen.", Powerform::DOMAIN ),
			"description"                  => __( "Beschreibung / Einführung", Powerform::DOMAIN ),
			"feat_image"                   => __( "Ausgewähltes Bild", Powerform::DOMAIN ),
			"font_color"                   => __( "Schriftfarbe", Powerform::DOMAIN ),
			"browse"                       => __( "Durchsuche", Powerform::DOMAIN ),
			"clear"                        => __( "Leeren", Powerform::DOMAIN ),
			"results_behav"                => __( "Ergebnisverhalten", Powerform::DOMAIN ),
			"rb_description"               => __( "Wähle aus, ob Du die richtige Antwort anzeigen möchtest, wenn der Benutzer die Frage beendet hat oder erst nachdem der gesamte Test abgeschlossen ist.", Powerform::DOMAIN ),
			"reveal"                       => __( "Wann die richtige Antwort angezeigt wird", Powerform::DOMAIN ),
			"after"                        => __( "Nachdem der Benutzer eine Antwort ausgewählt hat", Powerform::DOMAIN ),
			"before"                       => __( "Am Ende des ganzen Test", Powerform::DOMAIN ),
			"phrasing"                     => __( "Antwortformulierung", Powerform::DOMAIN ),
			"phrasing_desc"                => __( "Wähle aus, wie die richtigen und falschen Antworten gelesen werden sollen. Verwende <strong>%UserAnswer%</strong>, um den vom Benutzer ausgewählten Wert einzugeben, und <strong>%CorrectAnswer%</strong>, um den richtigen Wert einzugeben.", Powerform::DOMAIN ),
			"phrasing_desc_alt"            => __( "Erscheinungsbild der Antwortnachricht weiter anpassen.", Powerform::DOMAIN ),
			"msg_correct"                  => __( "Richtige Antwort Nachricht", Powerform::DOMAIN ),
			"msg_incorrect"                => __( "Falsche Antwortnachricht", Powerform::DOMAIN ),
			"msg_count"                    => __( "Nachricht zur endgültigen Zählung", Powerform::DOMAIN ),
			"msg_count_desc"               => __( "Bearbeite die Kopie der Endergebnis-Zählungsmeldung, die nach Abschluss des Quiz angezeigt wird. Verwende <strong>%YourNum%</strong>, um die Anzahl der richtigen Antworten und <strong>%Total%</strong> für die Gesamtzahl der Fragen anzuzeigen.", Powerform::DOMAIN ),
			"msg_count_info"               => __( "Du kannst hier jetzt HTML-Inhalte hinzufügen, um noch mehr Text zu personalisieren, der als Nachricht für die endgültige Zählung angezeigt wird. Versuche es jetzt!", Powerform::DOMAIN ),
			"share"                        => __( "Auf Social Media teilen", Powerform::DOMAIN ),
			"order"                        => __( "Prioritätsreihenfolge der Ergebnisse", Powerform::DOMAIN ),
			"order_label"                  => __( "Wähle Priorität für Ergebnisse", Powerform::DOMAIN ),
			"order_alt"                    => __( "Tests können eine gerade Punktzahl für 2 oder mehr Ergebnisse haben. In diesen Szenarien hilft diese Reihenfolge, das Ergebnis zu bestimmen.", Powerform::DOMAIN ),
			"questions_title"              => __( "Fragen", Powerform::DOMAIN ),
			"question_desc"                => __( "Erscheinungsbild für Testfragen weiter anpassen.", Powerform::DOMAIN ),
			"result_title"                 => __( "Ergebnistitel", Powerform::DOMAIN ),
			"result_description"           => __( "Ergebnisbeschreibung", Powerform::DOMAIN ),
			"result_description_desc"      => __( "Passe das Erscheinungsbild für die Typografie der Ergebnisbeschreibung weiter an.", Powerform::DOMAIN ),
			"result_title_desc"            => __( "Passe das Erscheinungsbild für die Typografie des Ergebnistitels weiter an.", Powerform::DOMAIN ),
			"retake_button"                => __( "Schaltfläche Wiederholen", Powerform::DOMAIN ),
			"retake_button_desc"           => __( "Passe das Erscheinungsbild für die Schaltfläche zum Wiederholen des Tests weiter an.", Powerform::DOMAIN ),
			"validate_form_name"           => __( "Formularname darf nicht leer sein! Bitte wähle einen Namen für Deinen Test.", Powerform::DOMAIN ),
			"validate_form_question"       => __( "Testfrage darf nicht leer sein! Bitte füge Fragen für Deinen Test hinzu.", Powerform::DOMAIN ),
			"validate_form_answers"        => __( "Testantworten dürfen nicht leer sein! Bitte füge einige Fragen hinzu.", Powerform::DOMAIN ),
			"validate_form_answers_result" => __( "Ergebnisantwort darf nicht leer sein! Bitte wähle ein Ergebnis.", Powerform::DOMAIN ),
			"validate_form_correct_answer" => __( "Diese Frage braucht eine richtige Antwort. Bitte wähle eine aus, bevor Du speicherst oder mit dem nächsten Schritt fortfahren willst.", Powerform::DOMAIN ),
			"validate_form_no_answer"      => __( "Bitte füge eine Antwort auf diese Frage hinzu.", Powerform::DOMAIN ),
			"answer"                       => __( "Antworten", Powerform::DOMAIN ),
			"no_answer"                    => __( "Du hast noch keine Antwort auf diese Frage.", Powerform::DOMAIN ),
			"answer_desc"                  => __( "Erscheinungsbild für Testantworten weiter anpassen.", Powerform::DOMAIN ),
			"back"                         => __( "Zurück", Powerform::DOMAIN ),
			"cancel"                       => __( "Abbrechen", Powerform::DOMAIN ),
			"continue"                     => __( "Fortfahren", Powerform::DOMAIN ),
			"correct_answer"               => __( "Korrekte Antwort", Powerform::DOMAIN ),
			"correct_answer_desc"          => __( "Erscheinungsbild für richtige Antworten anpassen.", Powerform::DOMAIN ),
			"finish"                       => __( "Fertig", Powerform::DOMAIN ),
			"smartcrawl"                   => __( "<strong>Möchtest Du mehr Kontrolle?</strong> <strong><a href='https://n3rds.work/piestingtal_source/upfront/' target='_blank'>UpFront</a></strong> Awesome Theme-Builder mit inkl. SEO Tools.", Powerform::DOMAIN ),
			"submit"                       => __( "Einreichen", Powerform::DOMAIN ),
			"submit_desc"                  => __( "Erscheinungsbild der Schaltfläche zum Senden des Tests weiter anpassen.", Powerform::DOMAIN ),
			"main_styles"                  => __( "Hauptstile", Powerform::DOMAIN ),
			"border"                       => __( "Rahmen", Powerform::DOMAIN ),
			"border_desc"                  => __( "Rahmen für den Hauptcontainer des Ergebnisses weiter anpassen.", Powerform::DOMAIN ),
			"padding"                      => __( "Padding", Powerform::DOMAIN ),
			"background"                   => __( "Hintergrund", Powerform::DOMAIN ),
			"background_desc"              => __( "Das Ergebnisfeld hat drei verschiedene Hintergründe: Hauptcontainer, Kopfzeilenhintergrund (wo der Quiztitel und die Schaltfläche zum erneuten Laden platziert werden) und Inhaltshintergrund (wo der Ergebnistitel und die Beschreibung platziert werden). Hier kannst Du die drei anpassen.", Powerform::DOMAIN ),
			"bg_main"                      => __( "Haupt-BG", Powerform::DOMAIN ),
			"bg_header"                    => __( "Header-BG", Powerform::DOMAIN ),
			"bg_content"                   => __( "Inhalt-BG", Powerform::DOMAIN ),
			"color"                        => __( "Farbe", Powerform::DOMAIN ),
			"result_appearance"            => __( "Ergebnisbox", Powerform::DOMAIN ),
			"margin"                       => __( "Margin", Powerform::DOMAIN ),
			"summary"                      => __( "Zusammenfassung", Powerform::DOMAIN ),
			"summary_desc"                 => __( "Passe das Erscheinungsbild für die Test-Endzählungsnachricht weiter an", Powerform::DOMAIN ),
			"sshare"                       => __( "Teilen-Text", Powerform::DOMAIN ),
			"sshare_desc"                  => __( "Erscheinungsbild für das Teilen auf Social-Media-Texten weiter anpassen", Powerform::DOMAIN ),
			"social"                       => __( "Soziale Symbole", Powerform::DOMAIN ),
			"social_desc"                  => __( "Erscheinungsbild für Social-Media-Symbole weiter anpassen", Powerform::DOMAIN ),
			"wrong_answer"                 => __( "Falsche Antwort", Powerform::DOMAIN ),
			"wrong_answer_desc"            => __( "Aussehen für falsche Antworten anpassen.", Powerform::DOMAIN ),
			"msg_description"              => __( "Verwende <strong>%UserAnswer%</strong>, um den vom Benutzer ausgewählten Wert einzugeben, und <strong>%CorrectAnswer%</strong>, um den richtigen Wert einzugeben.", Powerform::DOMAIN ),
			"facebook"                     => __( "Facebook", Powerform::DOMAIN ),
			"twitter"                      => __( "Twitter", Powerform::DOMAIN ),
			"google"                       => __( "Google", Powerform::DOMAIN ),
			"linkedin"                     => __( "LinkedIn", Powerform::DOMAIN ),
			"title_styles"                 => __( "Titel Aussehen", Powerform::DOMAIN ),
			"enable"                       => __( "Aktivieren", Powerform::DOMAIN ),
			"checkbox_styles"              => __( "Kontrollkästchen-Stile", Powerform::DOMAIN ),
			"main"                         => __( "Haupt", Powerform::DOMAIN ),
			"header"                       => __( "Header", Powerform::DOMAIN ),
			"content"                      => __( "Inhalt", Powerform::DOMAIN ),
			"quiz_design"                  => __( "Test-Design", Powerform::DOMAIN ),
			"quiz_design_description"      => __( "Wähle einen vorgefertigten Stil für Deinen Test und passe das Erscheinungsbild weiter an.", Powerform::DOMAIN ),
			"customize_quiz_colors"        => __( "Testfarben anpassen", Powerform::DOMAIN ),
			"visual_style_description"     => __( "Es gibt zwei Möglichkeiten, Deine Testantworten anzuzeigen: Raster oder Liste.", Powerform::DOMAIN ),
		);

		$data['quiz_details'] = array(
			'name'                => __( 'Test Name', Powerform::DOMAIN ),
			'name_details'        => __( "Dies wird in deinem Quiz nicht angezeigt, hilft dir aber, es zu identifizieren.", Powerform::DOMAIN ),
			'name_validate'       => __( 'Quizname darf nicht leer sein! Bitte wähle einen Namen für Deinen Test.', Powerform::DOMAIN ),
			'title'               => __( 'Test Titel', Powerform::DOMAIN ),
			'title_details'       => __( 'Dies ist der Haupttitel Deines Test und wird auf der Vorderseite angezeigt.', Powerform::DOMAIN ),
			'image'               => __( 'Ausgewähltes Bild', Powerform::DOMAIN ),
			'image_details'       => __( 'Füge Deinem Test ein schönes Hauptbild hinzu.', Powerform::DOMAIN ),
			'description'         => __( 'Beschreibung', Powerform::DOMAIN ),
			'description_details' => __( 'Gib weitere Informationen zu Deinem Test an. Dieser Inhalt wird auf der Vorderseite angezeigt.' ),
		);

		$data['quiz_appearance'] = array(
			'answer'               => __( 'Antwort', Powerform::DOMAIN ),
			'checkbox'             => __( 'Checkbox', Powerform::DOMAIN ),
			'container_border'     => __( 'Containerrahmen', Powerform::DOMAIN ),
			'container_background' => __( 'Container-Hintergrund', Powerform::DOMAIN ),
			'customize_main'       => __( 'Hauptfarben anpassen', Powerform::DOMAIN ),
			'customize_question'   => __( 'Fragefarben anpassen', Powerform::DOMAIN ),
			'customize_answer'     => __( 'Antwortfarben anpassen', Powerform::DOMAIN ),
			'customize_result'     => __( "Passe die Feldfarben des Ergebnisses an", Powerform::DOMAIN ),
			'customize_submit'     => __( 'Farben der Senden-Schaltfläche anpassen', Powerform::DOMAIN ),
			'main_container'       => __( 'Hauptbehälter', Powerform::DOMAIN ),
			'main_border'          => __( 'Hauptrahmen', Powerform::DOMAIN ),
			'main_styles'          => __( 'Hauptstile', Powerform::DOMAIN ),
			'header_styles'        => __( 'Kopfzeilenstile', Powerform::DOMAIN ),
			'content_styles'       => __( 'Inhaltsstile', Powerform::DOMAIN ),
			'quiz_title'           => __( 'Test Titel', Powerform::DOMAIN ),
			'retake_button'        => __( 'Schaltfläche "Wiederholen"', Powerform::DOMAIN ),
			'result_title'         => __( 'Ergebnistitel', Powerform::DOMAIN ),
			'quiz_description'     => __( 'Testbeschreibung', Powerform::DOMAIN ),
			'result_description'   => __( 'Ergebnisbeschreibung', Powerform::DOMAIN ),
			'quiz_image'           => __( 'Testbild', Powerform::DOMAIN ),
			'question'             => __( 'Frage', Powerform::DOMAIN ),
			'answer_message'       => __( 'Nachricht beantworten', Powerform::DOMAIN ),
			'submit_button'        => __( 'Senden-Schaltfläche', Powerform::DOMAIN ),
			'quiz_result'          => __( 'Quizergebnis', Powerform::DOMAIN ),
			'social_share'         => __( 'Soziales Teilen', Powerform::DOMAIN ),
			'customize_colors'     => __( 'Farben anpassen', Powerform::DOMAIN ),
			'customize_typography' => __( 'Typografie anpassen', Powerform::DOMAIN ),
			'checkbox_border'      => __( 'Checkbox-Rahmen', Powerform::DOMAIN ),
			'checkbox_background'  => __( 'Checkbox-Hintergrund', Powerform::DOMAIN ),
			'checkbox_icon'        => __( 'Checkbox-Symbol', Powerform::DOMAIN ),
			'quiz_title_notice'    => __( "Der Testtitel erscheint in der Kopfzeile des Ergebnisses.", Powerform::DOMAIN ),
		);

		return $data;
	}
}