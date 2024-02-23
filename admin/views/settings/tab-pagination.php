<?php
$section = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.

$entries_per_page = get_option( "powerform_pagination_entries", 10 );
$module_per_page  = get_option( "powerform_pagination_listings", 10 );
$nonce            = wp_create_nonce( 'powerform_save_popup_pagination' );

?>

<div class="sui-box" data-nav="pagination" style="<?php echo esc_attr( 'pagination' !== $section ? 'display: none;' : '' ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title"><?php esc_html_e( 'Seitennummerierung', Powerform::DOMAIN ); ?></h2>
	</div>

	<form class="powerform-settings-save" action="">

		<div class="sui-box-body">

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Einreichungen', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Wähle die Anzahl der Einträge pro Seite für die Einreichungen.', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">

					<div class="sui-form-field">
						<label for="powerform-limit-entries" class="sui-label"><?php esc_html_e( 'Einträge pro Seite', Powerform::DOMAIN ); ?></label>
						<input type="number"
						       name="pagination_entries"
						       placeholder="<?php esc_html_e( 'Z.B. 10', Powerform::DOMAIN ); ?>"
						       value="<?php echo esc_attr( $entries_per_page ); ?>"
						       min="1"
						       id="powerform-limit-entries"
						       class="sui-form-control powerform-required"/>
						<span class="sui-error-message" style="display: none;"><?php esc_html_e( 'Dieses Feld kann nicht leer sein.', Powerform::DOMAIN ); ?></span>

					</div>

				</div>

			</div>

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Module', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Wähle die Anzahl der Module pro Seite für die Liste der Formulare, Umfragen und Quiz.', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">

					<div class="sui-form-field">
						<label for="powerform-limit-listing" class="sui-label"><?php esc_html_e( 'Module pro Seite', Powerform::DOMAIN ); ?></label>
						<input type="number"
						       name="pagination_listings"
						       placeholder="<?php esc_html_e( 'Z.B. 10', Powerform::DOMAIN ); ?>"
						       value="<?php echo esc_attr( $module_per_page ); ?>"
						       min="1"
						       id="powerform-limit-listing"
						       class="sui-form-control powerform-required"/>
						<span class="sui-error-message" style="display: none;"><?php esc_html_e( 'Dieses Feld kann nicht leer sein.', Powerform::DOMAIN ); ?></span>

					</div>

				</div>

			</div>

		</div>

		<div class="sui-box-footer">

			<div class="sui-actions-right">

				<button class="sui-button sui-button-blue wpmudev-action-done" data-title="<?php esc_attr_e( "Paginierungseinstellungen", Powerform::DOMAIN ); ?>" data-action="pagination"
				        data-nonce="<?php echo esc_attr( $nonce ); ?>">
					<span class="sui-loading-text"><?php esc_html_e( 'Einstellungen speichern', Powerform::DOMAIN ); ?></span>
					<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
				</button>

			</div>

		</div>

	</form>

</div>