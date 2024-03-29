<?php
$path = powerform_plugin_url();
if ( empty( $poll_id ) ) {
	$poll_id = 0;
}
?>

<?php

if ( ! empty( $addons['poll_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Aktiv", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['poll_connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_poll_row_html_markup( $provider, $poll_id, true, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}

if ( ! empty( $addons['not_poll_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Verfügbare Integrationen", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['not_poll_connected'] as $key => $provider ) : ?>

			<?php if ( ! $provider['is_poll_settings_available'] ) {
				continue;
			}
			?>

			<?php echo powerform_addon_poll_row_html_markup( $provider, $poll_id, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}
?>