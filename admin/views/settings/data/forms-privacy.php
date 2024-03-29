<?php
$form_submission_erasure_enabled = get_option( 'powerform_enable_erasure_request_erase_form_submissions', false );

$cform_retain_number  = get_option( 'powerform_retain_submissions_interval_number', 0 );
$cfrom_retain_unit    = get_option( 'powerform_retain_submissions_interval_unit', 'days' );
$cform_retain_forever = false;
if ( empty( $cform_retain_number ) ) {
	$cform_retain_forever = true;
}

$cform_retain_ip_number  = get_option( 'powerform_retain_ip_interval_number', 0 );
$cfrom_retain_ip_unit    = get_option( 'powerform_retain_ip_interval_unit', 'days' );
$cform_retain_ip_forever = false;
if ( empty( $cform_retain_ip_number ) ) {
	$cform_retain_ip_forever = true;
}

?>

<div class="sui-box-settings-row">

	<div class="sui-box-settings-col-1">
		<span class="sui-settings-label"><?php esc_html_e( 'Formulare Datenschutz', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Wähle aus, wie Du mit der Formulardatenspeicherung umgehen möchtest.', Powerform::DOMAIN ); ?></span>
	</div>

	<div class="sui-box-settings-col-2">

		<span class="sui-settings-label"><?php esc_html_e( 'Aufbewahrung von Einsendungen', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Wie lange möchtest Du die Formulareinreichungen aufbewahren?', Powerform::DOMAIN ); ?></span>

		<div class="sui-side-tabs" style="margin-top: 10px;">

			<div class="sui-tabs-menu">

				<label for="retain_submission-true" class="sui-tab-item<?php echo( $cform_retain_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="retain_submission_forever"
					       value="true"
					       id="retain_submission-true"
						<?php checked( $cform_retain_forever, true ); ?> />
					<?php esc_html_e( 'Für immer', Powerform::DOMAIN ); ?>
				</label>

				<label for="retain_submission-false" class="sui-tab-item<?php echo( ! $cform_retain_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="retain_submission_forever"
					       value="false"
					       id="retain_submission-false"
					       data-tab-menu="retain_submission"
						<?php checked( $cform_retain_forever, false ); ?> />
					<?php esc_html_e( 'Benutzerdefiniert', Powerform::DOMAIN ); ?>
				</label>

			</div>

			<div class="sui-tabs-content">

				<div data-tab-content="retain_submission" class="sui-tab-content sui-tab-boxed<?php echo( ! $cform_retain_forever ? ' active' : '' ); ?>">
					<div class="sui-row">
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<input type="number"
								       name="submissions_retention_number"
								       placeholder="<?php esc_html_e( 'Z.B. 10', Powerform::DOMAIN ); ?>"
								       value="<?php echo esc_attr( $cform_retain_number ); ?>"
								       min="0"
								       class="sui-form-control sui-form-control-inline"/>
							</div>
						</div>
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<select name="submissions_retention_unit">
									<option value="days" <?php selected( $cfrom_retain_unit, 'days' ); ?>>
										<?php esc_html_e( "Tag(e)", Powerform::DOMAIN ); ?></option>
									<option value="weeks" <?php selected( $cfrom_retain_unit, 'weeks' ); ?>>
										<?php esc_html_e( "Woche(n)", Powerform::DOMAIN ); ?></option>
									<option value="months" <?php selected( $cfrom_retain_unit, 'months' ); ?>>
										<?php esc_html_e( "Monat(e)", Powerform::DOMAIN ); ?></option>
									<option value="years" <?php selected( $cfrom_retain_unit, 'years' ); ?>>
										<?php esc_html_e( "Jahr(e)", Powerform::DOMAIN ); ?></option>
								</select>

							</div>
						</div>
					</div>

				</div>

			</div>

		</div>

		<span class="sui-settings-label"><?php esc_html_e( 'IP-Aufbewahrung', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Wähle aus, wie lange die IP-Adresse gespeichert werden soll, bevor eine Übermittlung anonymisiert wird.', Powerform::DOMAIN ); ?></span>

		<div class="sui-side-tabs" style="margin-top: 10px;">

			<div class="sui-tabs-menu">

				<label for="retain_ip-true" class="sui-tab-item<?php echo( $cform_retain_ip_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="retain_ip_forever"
					       value="true"
					       id="retain_ip-true"
						<?php checked( $cform_retain_ip_forever, true ); ?> />
					<?php esc_html_e( 'Für immer', Powerform::DOMAIN ); ?>
				</label>

				<label for="retain_ip-false" class="sui-tab-item<?php echo( ! $cform_retain_ip_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="retain_ip_forever"
					       value="false"
					       id="retain_ip-false"
					       data-tab-menu="retain_ip"
						<?php checked( $cform_retain_ip_forever, false ); ?> />
					<?php esc_html_e( 'Benutzerdefiniert', Powerform::DOMAIN ); ?>
				</label>

			</div>

			<div class="sui-tabs-content">

				<div data-tab-content="retain_ip" class="sui-tab-content sui-tab-boxed<?php echo( ! $cform_retain_ip_forever ? ' active' : '' ); ?>">
					<div class="sui-row">
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<input type="number"
								       name="cform_retention_ip_number"
								       placeholder="<?php esc_html_e( 'Z.B. 10', Powerform::DOMAIN ); ?>"
								       value="<?php echo esc_attr( $cform_retain_ip_number ); ?>"
								       min="0"
								       class="sui-form-control sui-form-control-inline"/>

							</div>
						</div>
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<select name="cform_retention_ip_unit">
									<option value="days" <?php selected( $cfrom_retain_ip_unit, 'days' ); ?>>
										<?php esc_html_e( "Tag(e)", Powerform::DOMAIN ); ?></option>
									<option value="weeks" <?php selected( $cfrom_retain_ip_unit, 'weeks' ); ?>>
										<?php esc_html_e( "Woche(n)", Powerform::DOMAIN ); ?></option>
									<option value="months" <?php selected( $cfrom_retain_ip_unit, 'months' ); ?>>
										<?php esc_html_e( "Monat(e)", Powerform::DOMAIN ); ?></option>
									<option value="years" <?php selected( $cfrom_retain_ip_unit, 'years' ); ?>>
										<?php esc_html_e( "Jahr(e)", Powerform::DOMAIN ); ?></option>
								</select>

							</div>
						</div>
					</div>


				</div>

			</div>

		</div>

		<span class="sui-settings-label"><?php esc_html_e( 'Anfragen zur Kontolöschung', Powerform::DOMAIN ); ?></span>
		<span class="sui-description">
			<?php echo( sprintf( __( 'Was möchtest Du tun, wenn Du eine <a href="%s"> Anfrage zur Löschung eines Kontos</a> bearbeitest, die eine mit einer Übermittlung verknüpfte E-Mail enthält?', Powerform::DOMAIN ),
			                     esc_url( admin_url( 'tools.php?page=remove_personal_data' ) ) ) ); // wpcs: xss ok. ?>
		</span>

		<div class="sui-side-tabs" style="margin-top: 10px;">

			<div class="sui-tabs-menu">

				<label for="erase_form_submissions-true" class="sui-tab-item<?php echo $form_submission_erasure_enabled ? ' active' : ''; ?>">
					<input type="radio"
					       name="erase_form_submissions"
					       value="true"
					       id="erase_form_submissions-true"
						<?php checked( $form_submission_erasure_enabled, true ); ?> />
					<?php esc_html_e( 'Einreichung behalten', Powerform::DOMAIN ); ?>
				</label>

				<label for="erase_form_submissions-false" class="sui-tab-item<?php echo $form_submission_erasure_enabled ? '' : ' active'; ?>">
					<input type="radio"
					       name="erase_form_submissions"
					       value="false"
					       id="erase_form_submissions-false"
						<?php checked( $form_submission_erasure_enabled, false ); ?> />
					<?php esc_html_e( 'Einreichung entfernen', Powerform::DOMAIN ); ?>
				</label>

			</div>

		</div>

	</div>

</div>