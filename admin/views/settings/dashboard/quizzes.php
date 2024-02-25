<?php
$dashboard_settings = powerform_get_dashboard_settings( 'quizzes', array() );
$num_recent         = isset( $dashboard_settings['num_recent'] ) ? $dashboard_settings['num_recent'] : 4;
$published          = isset( $dashboard_settings['published'] ) ? filter_var( $dashboard_settings['published'], FILTER_VALIDATE_BOOLEAN ) : true;
$draft              = isset( $dashboard_settings['draft'] ) ? filter_var( $dashboard_settings['draft'], FILTER_VALIDATE_BOOLEAN ) : true;
?>
<div class="sui-box-settings-row">

	<div class="sui-box-settings-col-1">
		<span class="sui-settings-label"><?php esc_html_e( 'Tests', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Passe Deine Dashboard-Testliste nach Deinen Wünschen an.', Powerform::DOMAIN ); ?></span>
	</div>

	<div class="sui-box-settings-col-2">

		<?php
		// SECTION: Number of quizzes ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Anzahl der Tests', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle die Anzahl der letzten Tests aus, die in der Dashboard-Quizliste angezeigt werden sollen.', Powerform::DOMAIN ); ?></span>

			<input
				type="number"
				placeholder="0"
				class="sui-form-control"
				style="max-width: 100px;"
				min="0"
				value="<?php echo esc_attr( $num_recent ); ?>"
				name="num_recent[quizzes]"
			/>

			<span class="sui-error-message" style="display: none;"><?php esc_html_e( "Dieses Feld sollte nicht leer sein." ); ?></span>

		</div>

		<?php
		// SECTION: Status ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Status', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle Tests mit einem bestimmten Status aus, die im Dashboard aufgeführt werden sollen. Du musst mindestens eine der folgenden Optionen auswählen, da sonst die Testliste leer erscheint.', Powerform::DOMAIN ); ?></span>

			<label for="powerform-quizzes-status-published" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-quizzes-status-published"
					value="true"
					<?php echo checked( $published ); ?>
					name="published[quizzes]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Veröffentlicht', Powerform::DOMAIN ); ?></span>
			</label>

			<label for="powerform-quizzes-status-drafts" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-quizzes-status-drafts"
					value="true"
					<?php echo checked( $draft ); ?>
					name="draft[quizzes]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Entwürfe', Powerform::DOMAIN ); ?></span>
			</label>

		</div>

	</div>

</div>