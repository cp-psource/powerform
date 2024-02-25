<?php
$empty_icon   = powerform_plugin_url() . 'assets/images/powerform-noicon.png';
$empty_icon2x = powerform_plugin_url() . 'assets/images/powerform-noicon@2x.png';
if ( empty( $poll_id ) ) {
	$poll_id = 0;
}

$show_action = false;

$icon_class_action = 'sui-icon-plus';
$tooltip           = __( 'Integration konfigurieren', Powerform::DOMAIN );
$action            = 'powerform_addon_settings';

$multi_id   = 0;
$multi_name = false;

if ( ! empty( $poll_id ) ) {
	$action            = 'powerform_addon_poll_settings';
	$show_action       = false;
	$icon_class_action = 'sui-icon-plus';
	if ( isset( $addon['is_poll_settings_available'] ) && ! empty( $addon['is_poll_settings_available'] ) && true === $addon['is_poll_settings_available'] ) {
		$show_action = true;
		if ( $addon['is_allow_multi_on_poll'] ) {
			if ( isset( $addon['multi_name'] ) ) {
				$icon_class_action = 'sui-icon-widget-settings-config';
				$tooltip           = __( 'Integration konfigurieren', Powerform::DOMAIN );
				$multi_id          = $addon['multi_id'];
				$multi_name        = $addon['multi_name'];
			} else {
				if ( isset( $addon['multi_id'] ) ) {
					$multi_id = $addon['multi_id'];
				}
				$icon_class_action = 'sui-icon-plus';
				$tooltip           = __( 'Integration hinzufügen', Powerform::DOMAIN );
			}
		} else {
			if ( $addon['is_poll_connected'] ) {
				$icon_class_action = 'sui-icon-widget-settings-config';
				$tooltip           = __( 'Integration konfigurieren', Powerform::DOMAIN );
			} else {
				$icon_class_action = 'sui-icon-plus';
				$tooltip           = __( 'Integration hinzufügen', Powerform::DOMAIN );
			}
		}

	}
} else {
	// on integrations page
	if ( isset( $addon['is_settings_available'] ) && ! empty( $addon['is_settings_available'] ) && true === $addon['is_settings_available'] ) {
		$show_action = true;
		if ( $addon['is_connected'] ) {
			$icon_class_action = 'sui-icon-widget-settings-config';
			$tooltip           = __( 'Integration konfigurieren', Powerform::DOMAIN );
		} else {
			$icon_class_action = 'sui-icon-plus';
			$tooltip           = __( 'Integration hinzufügen', Powerform::DOMAIN );
		}
	}
}

$action_available = false;
if ( ! empty( $show_pro_info ) && $show_pro_info ) {
	$show_pro_info = true;
} else {
	$show_pro_info = false;
}

/**
 * force Disable pro tag y default
 */
$show_pro_info = false;

$pro_url        = 'https://n3rds.work';
$pro_url_target = '_blank';

// MULTI NAME (SAMPLE)
// To be added in the table later when design is ready.
/*
<td><?php if ( ! empty( $multi_name ) ): ?>
	<?php echo esc_html( $multi_name ); ?>
<?php endif; ?></td>
*/ ?>

<tr class="<?php echo( $is_active ? 'fui-integration-enabled' : '' ); ?>">

	<td class="sui-table-item-title">

		<span>

			<?php if ( isset( $addon['icon'] ) && ! empty( $addon['icon'] ) ) { ?>
				<img src="<?php echo esc_url( $addon['icon'] ); ?>"
				     srcset="<?php echo esc_url( $addon['icon'] ); ?> 1x, <?php echo esc_url( $addon['icon_x2'] ); ?> 2x"
				     alt="<?php echo esc_attr( $addon['short_title'] ); ?>"
				     class="sui-image"
				     aria-hidden="true"/>
			<?php } else { ?>
				<img src="<?php echo esc_url( $empty_icon ); ?>"
				     srcset="<?php echo esc_url( $empty_icon ); ?> 1x, <?php echo esc_url( $empty_icon2x ); ?> 2x"
				     alt="<?php echo esc_attr( $addon['short_title'] ); ?>"
				     class="sui-image"
				     aria-hidden="true"/>
			<?php } ?>

			<span><?php echo esc_html( $addon['title'] ); ?><?php if ( $show_pro_info && $addon['is_pro'] ) : ?>
					<span class="sui-tag sui-tag-pro">
					<?php esc_html_e( "PRO", Powerform::DOMAIN ); ?>
				</span>
				<?php endif; ?></span>

			<?php if ( $show_action ) : ?>
				<button class="sui-button-icon sui-tooltip sui-tooltip-top-right connect-integration"
				        data-tooltip="<?php echo esc_attr( $tooltip ); ?>"
				        data-slug="<?php echo esc_attr( $addon['slug'] ); ?>"
				        data-title="<?php echo esc_attr( $addon['title'] ); ?>"
				        data-image="<?php echo esc_attr( $addon['image'] ); ?>"
				        data-imagex2="<?php echo esc_attr( $addon['image_x2'] ); ?>"
				        data-nonce="<?php echo wp_create_nonce( 'powerform_addon_action' ); // WPCS: XSS ok. ?>"
				        data-action="<?php echo esc_attr( $action ); ?>"
				        data-poll-id="<?php echo esc_attr( $poll_id ); ?>"
				        data-multi-id="<?php echo esc_attr( $multi_id ); ?>">
					<i class="<?php echo esc_attr( $icon_class_action ); ?>" aria-hidden="true"></i>
					<span class="sui-screen-reader-text"><?php esc_html_e( 'Verbinde diese Integration', Powerform::DOMAIN ); ?></span>
				</button>
			<?php endif; ?>

		</span>

	</td>

</tr>