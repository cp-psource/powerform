<?php
$dashboard_settings = powerform_get_dashboard_settings( 'forms', array() );
$num_recent         = isset( $dashboard_settings['num_recent'] ) ? $dashboard_settings['num_recent'] : 4;
$published          = isset( $dashboard_settings['published'] ) ? filter_var( $dashboard_settings['published'], FILTER_VALIDATE_BOOLEAN ) : true;
$draft              = isset( $dashboard_settings['draft'] ) ? filter_var( $dashboard_settings['draft'], FILTER_VALIDATE_BOOLEAN ) : true;

?>
<div class="sui-box-settings-row">

	<div class="sui-box-settings-col-1">
		<span class="sui-settings-label"><?php esc_html_e( 'Formulare', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Passe Deine Dashboard-Formularliste nach Deinen Wünschen an.', Powerform::DOMAIN ); ?></span>
	</div>

	<div class="sui-box-settings-col-2">

		<?php
		// SECTION: Number of forms ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Anzahl der Formulare', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle die Anzahl der zuletzt verwendeten Formulare aus, die in der Dashboard-Formularliste angezeigt werden sollen.', Powerform::DOMAIN ); ?></span>

			<input
				type="number"
				placeholder="0"
				class="sui-form-control"
				style="max-width: 100px;"
				min="0"
				value="<?php echo esc_attr( $num_recent ); ?>"
				name="num_recent[forms]"
			/>

			<span class="sui-error-message" style="display: none;"><?php esc_html_e( "Dieses Feld sollte nicht leer sein." ); ?></span>

		</div>

		<?php
		// SECTION: Status ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Status', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle Formulare mit einem bestimmten Status aus, die im Dashboard aufgelistet werden sollen. Du musst mindestens eine der folgenden Optionen auswählen, da sonst die Formularliste leer erscheint.', Powerform::DOMAIN ); ?></span>

			<label for="powerform-forms-status-published" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-forms-status-published"
					value="true"
					<?php echo checked( $published ); ?>
					name="published[forms]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Veröffentlicht', Powerform::DOMAIN ); ?></span>
			</label>

			<label for="powerform-forms-status-drafts" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-forms-status-drafts"
					value="true"
					<?php echo checked( $draft ); ?>
					name="draft[forms]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Entwürfe', Powerform::DOMAIN ); ?></span>
			</label>

		</div>

	</div>

</div>