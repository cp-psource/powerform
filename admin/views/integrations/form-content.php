<?php
$path = powerform_plugin_url();
if ( empty( $form_id ) ) {
	$form_id = 0;
}
?>

<?php

if ( ! empty( $addons['form_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Aktiv", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['form_connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_row_html_markup( $provider, $form_id, true, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}

if ( ! empty( $addons['not_form_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Verfügbare Integrationen", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['not_form_connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_row_html_markup( $provider, $form_id, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}
?>