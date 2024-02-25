<?php
$section              = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.
$nonce                = wp_create_nonce( 'powerform_save_popup_uninstall_settings' );
$powerform_uninstall = get_option( "powerform_uninstall_clear_data", false );

?>

<div class="sui-box" data-nav="data" style="<?php echo esc_attr( 'data' !== $section ? 'display: none;' : '' ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title"><?php esc_html_e( 'Daten', Powerform::DOMAIN ); ?></h2>
	</div>

	<form class="powerform-settings-save" action="">

		<div class="sui-box-body">
			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Deinstallation', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Was möchtest Du mit den Plugindaten tun, wenn Du dieses Plugin deinstallierst?', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">
					<div class="sui-side-tabs">

						<div class="sui-tabs-menu">

							<label for="delete_uninstall-false" class="sui-tab-item<?php echo $powerform_uninstall ? '' : ' active'; ?>">
								<input type="radio"
								       name="delete_uninstall"
								       value="false"
								       id="delete_uninstall-false"
									<?php echo esc_attr( checked( $powerform_uninstall, false ) ); ?> />
								<?php esc_html_e( 'Bewahren', Powerform::DOMAIN ); ?>
							</label>

							<label for="delete_uninstall-true" class="sui-tab-item<?php echo $powerform_uninstall ? ' active' : ''; ?>">
								<input type="radio"
								       name="delete_uninstall"
								       value="true"
								       id="delete_uninstall-true"
									<?php echo esc_attr( checked( $powerform_uninstall, true ) ); ?> />
								<?php esc_html_e( 'Zurücksetzen', Powerform::DOMAIN ); ?>
							</label>

						</div>

					</div>
				</div>

			</div>

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Plugin zurücksetzen', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Musst Du neu anfangen? Verwende diese Einstellung, um zum Standard-Plugin-Status zurückzukehren.', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">
					<button
							class="sui-button sui-button-ghost wpmudev-open-modal"
							data-modal="reset-plugin-settings"
							data-modal-title="<?php esc_attr_e( 'Plugin zurücksetzen', Powerform::DOMAIN ); ?>"
							data-modal-content="<?php esc_attr_e( 'Möchtest Du das Plugin wirklich auf den Standardzustand zurücksetzen?', Powerform::DOMAIN ); ?>"
							data-nonce="<?php echo wp_create_nonce( 'powerformSettingsRequest' ); // WPCS: XSS ok. ?>"
					>

						<span class="sui-loading-text">
							<i class="sui-icon-refresh"></i> <?php esc_html_e( 'ZURÜCKSETZEN', Powerform::DOMAIN ); ?>
						</span>
						<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>

					</button>
					<span class="sui-description">
						<?php esc_html_e(
							'Hinweis: Dadurch werden alle Formulare/Umfragen/Tests, die Du derzeit hast, gelöscht und alle Einstellungen auf den Standardzustand zurückgesetzt.',
							Powerform::DOMAIN
						); ?>
					</span>
				</div>

			</div>

		</div>

		<div class="sui-box-footer">

			<div class="sui-actions-right">

				<button class="sui-button sui-button-blue wpmudev-action-done" data-title="<?php esc_attr_e( "Dateneinstellungen", Powerform::DOMAIN ); ?>" data-action="uninstall_settings"
				        data-nonce="<?php echo esc_attr( $nonce ); ?>">
					<span class="sui-loading-text"><?php esc_html_e( 'Einstellungen speichern', Powerform::DOMAIN ); ?></span>
					<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
				</button>

			</div>

		</div>

	</form>

</div>