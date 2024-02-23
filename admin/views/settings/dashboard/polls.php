<?php
$dashboard_settings = powerform_get_dashboard_settings( 'polls', array() );
$num_recent         = isset( $dashboard_settings['num_recent'] ) ? $dashboard_settings['num_recent'] : 4;
$published          = isset( $dashboard_settings['published'] ) ? filter_var( $dashboard_settings['published'], FILTER_VALIDATE_BOOLEAN ) : true;
$draft              = isset( $dashboard_settings['draft'] ) ? filter_var( $dashboard_settings['draft'], FILTER_VALIDATE_BOOLEAN ) : true;
?>
<div class="sui-box-settings-row">

	<div class="sui-box-settings-col-1">
		<span class="sui-settings-label"><?php esc_html_e( 'Umfragen', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Passe Deine Dashboard-Umfrageliste nach Deinen Wünschen an.', Powerform::DOMAIN ); ?></span>
	</div>

	<div class="sui-box-settings-col-2">

		<?php
		// SECTION: Number of polls ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Anzahl der Umfragen', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle die Anzahl der letzten Umfragen aus, die in der Dashboard-Umfrageliste angezeigt werden sollen.', Powerform::DOMAIN ); ?></span>

			<input
				type="number"
				placeholder="0"
				class="sui-form-control"
				style="max-width: 100px;"
				min="0"
				value="<?php echo esc_attr( $num_recent ); ?>"
				name="num_recent[polls]"
			/>

			<span class="sui-error-message" style="display: none;"><?php esc_html_e( "Dieses Feld sollte nicht leer sein." ); ?></span>

		</div>

		<?php
		// SECTION: Status ?>
		<div class="sui-form-field">

			<label class="sui-settings-label"><?php esc_html_e( 'Status', Powerform::DOMAIN ); ?></label>

			<span class="sui-description" style="margin-bottom: 10px;"><?php esc_html_e( 'Wähle Umfragen mit einem bestimmten Status aus, die im Dashboard aufgeführt werden sollen. Du musst mindestens eine der folgenden Optionen auswählen, da sonst die Umfrageliste leer erscheint.', Powerform::DOMAIN ); ?></span>

			<label for="powerform-polls-status-published" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-polls-status-published"
					value="true"
					<?php echo checked( $published ); ?>
					name="published[polls]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Veröffentlicht', Powerform::DOMAIN ); ?></span>
			</label>

			<label for="powerform-polls-status-drafts" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">
				<input
					type="checkbox"
					id="powerform-polls-status-drafts"
					value="true"
					<?php echo checked( $draft ); ?>
					name="draft[polls]"
				/>
				<span aria-hidden="true"></span>
				<span><?php esc_html_e( 'Entwürfe', Powerform::DOMAIN ); ?></span>
			</label>

		</div>

	</div>

</div>