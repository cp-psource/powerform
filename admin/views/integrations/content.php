<?php $path = powerform_plugin_url(); ?>

<div class="sui-row-with-sidenav powerform-integrations-wrapper">

	<div class="sui-sidenav">

		<ul class="sui-vertical-tabs sui-sidenav-hide-md">

			<li class="sui-vertical-tab powerform-integrations" data-tab-id="powerform-integrations">
				<a href="#powerform-integrations" role="button"><?php esc_html_e( "Anwendungen", Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab powerform-api" data-tab-id="powerform-api">
				<a href="#powerform-api" role="button"><?php esc_html_e( "API", Powerform::DOMAIN ); ?></a>
			</li>

		</ul>

		<select class="sui-mobile-nav sui-sidenav-hide-lg">
			<option value="powerform-integrations"><?php esc_html_e( 'Anwendungen', Powerform::DOMAIN ); ?></option>
			<option value="powerform-api"><?php esc_html_e( 'API', Powerform::DOMAIN ); ?></option>
		</select>

	</div>

	<div id="powerform-integrations" class="wpmudev-settings--box" style="display: block;">

		<div class="sui-box">

			<div class="sui-box-header">

				<h2 class="sui-box-title"><?php esc_html_e( "Anwendungen", Powerform::DOMAIN ); ?></h2>

			</div>

			<div id="powerform-integrations-page" class="sui-box-body">

				<p><?php esc_html_e( "Powerformulare lässt sich in Deine bevorzugten E-Mail- und Speicher-Apps integrieren. Hier ist eine Liste der derzeit verfügbaren Apps. Du kannst sie in Deinem Bereich \"Formulare/Integrationen\" konfigurieren.", Powerform::DOMAIN ); ?></p>

				<div id="powerform-integrations-display"></div>

			</div>

		</div>

	</div>

	<div id="powerform-api" class="wpmudev-settings--box" style="display: none;">

		<div class="sui-box">

			<div class="sui-box-header">

				<h2 class="sui-box-title"><?php esc_html_e( "API", Powerform::DOMAIN ); ?></h2>

			</div>

			<div class="sui-box">

				<div class="sui-box-body sui-block-content-center">

					<?php if ( powerform_is_show_branding() ): ?>
						<img src="<?php echo $path . 'assets/img/powerform-disabled.png'; // WPCS: XSS ok. ?>"
						     srcset="<?php echo $path . 'assets/img/powerform-disabled.png'; // WPCS: XSS ok. ?> 1x,
						     <?php echo $path . 'assets/img/powerform-disabled@2x.png'; // WPCS: XSS ok. ?> 2x"
						     alt="<?php esc_html_e( 'Powerformulare APIs', Powerform::DOMAIN ); ?>"
						     class="sui-image sui-image-center fui-image"/>
					<?php endif; ?>

					<div class="fui-limit-block-600 fui-limit-block-center">

					<p>
						<?php
						esc_html_e( "Erstelle Deine eigenen Integrationen und benutzerdefinierten Powerformulare-Apps mit unserer API mit allen Funktionen! Besuche die Powerform API-Dokumente, um loszulegen.", Powerform::DOMAIN );
						?>
					</p>
					<p>
						<a href="https://n3rds.work" target="_blank" class="sui-button sui-button-blue">LOSLEGEN</a>
					</p>
					</div>

				</div>

			</div>

		</div>

	</div>

</div>