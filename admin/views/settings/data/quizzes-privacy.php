<?php

$quiz_retain_number  = get_option( 'powerform_retain_quiz_submissions_interval_number', 0 );
$quiz_retain_unit    = get_option( 'powerform_retain_quiz_submissions_interval_unit', 'days' );
$quiz_retain_forever = false;
if ( empty( $quiz_retain_number ) ) {
	$quiz_retain_forever = true;
}

?>

<div class="sui-box-settings-row">

	<div class="sui-box-settings-col-1">
		<span class="sui-settings-label"><?php esc_html_e( 'Test-Datenschutz', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Wähle aus, wie Du mit den Test-Einreichungen umgehen möchtest.', Powerform::DOMAIN ); ?></span>
	</div>

	<div class="sui-box-settings-col-2">

		<span class="sui-settings-label"><?php esc_html_e( 'Aufbewahrung von Einsendungen', Powerform::DOMAIN ); ?></span>
		<span class="sui-description"><?php esc_html_e( 'Wie lange möchtest Du die Quiz-Einreichungen aufbewahren?', Powerform::DOMAIN ); ?></span>

		<div class="sui-side-tabs" style="margin-top: 10px;">

			<div class="sui-tabs-menu">

				<label for="quiz_retain_submission-true" class="sui-tab-item<?php echo( $quiz_retain_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="quiz_retain_submission_forever"
					       value="true"
					       id="quiz_retain_submission-true"
						<?php checked( $quiz_retain_forever, true ); ?> />
					<?php esc_html_e( 'Für immer', Powerform::DOMAIN ); ?>
				</label>

				<label for="quiz_retain_submission-false" class="sui-tab-item<?php echo( ! $quiz_retain_forever ? ' active' : '' ); ?>">
					<input type="radio"
					       name="quiz_retain_submission_forever"
					       value="false"
					       id="quiz_retain_submission-false"
					       data-tab-menu="quiz_retain_submission"
						<?php checked( $quiz_retain_forever, false ); ?> />
					<?php esc_html_e( 'Benutzerdefiniert', Powerform::DOMAIN ); ?>
				</label>

			</div>

			<div class="sui-tabs-content">

				<div data-tab-content="quiz_retain_submission" class="sui-tab-content sui-tab-boxed<?php echo( ! $quiz_retain_forever ? ' active' : '' ); ?>">
					<div class="sui-row">
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<input type="number"
								       name="quiz_submissions_retention_number"
								       placeholder="<?php esc_html_e( 'Z.B. 10', Powerform::DOMAIN ); ?>"
								       value="<?php echo esc_attr( $quiz_retain_number ); ?>"
								       min="0"
								       class="sui-form-control sui-form-control-inline"/>
							</div>
						</div>
						<div class="sui-col-md-6">
							<div class="sui-form-field">

								<select name="quiz_submissions_retention_unit">
									<option value="days" <?php selected( $quiz_retain_unit, 'days' ); ?>>
										<?php esc_html_e( "Tag(e)", Powerform::DOMAIN ); ?></option>
									<option value="weeks" <?php selected( $quiz_retain_unit, 'weeks' ); ?>>
										<?php esc_html_e( "Woche(n)", Powerform::DOMAIN ); ?></option>
									<option value="months" <?php selected( $quiz_retain_unit, 'months' ); ?>>
										<?php esc_html_e( "Monat(e)", Powerform::DOMAIN ); ?></option>
									<option value="years" <?php selected( $quiz_retain_unit, 'years' ); ?>>
										<?php esc_html_e( "Jahr(e)", Powerform::DOMAIN ); ?></option>
								</select>

							</div>
						</div>
					</div>

				</div>

			</div>

		</div>


	</div>

</div>