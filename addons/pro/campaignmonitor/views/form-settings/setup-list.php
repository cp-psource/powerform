<?php
// Defaults
$vars = array(
	'error_message' => '',
	'list_id'       => '',
	'list_id_error' => '',
	'multi_id'      => '',
	'lists'         => array(),
);

/** @var array $template_vars */
foreach ( $template_vars as $key => $val ) {
	$vars[ $key ] = $val;
} ?>

<div class="integration-header">

	<h3 class="sui-box-title" id="dialogTitle2"><?php echo esc_html( __( 'Choose List', Powerform::DOMAIN ) ); ?></h3>

	<span class="sui-description" style="margin-top: 20px;"><?php esc_html_e( 'Pick Campaign Monitor List for new subscriber to be added to.', Powerform::DOMAIN ); ?></span>

	<?php if ( ! empty( $vars['error_message'] ) ) : ?>
		<div class="sui-notice sui-notice-error">
			<p><?php echo esc_html( $vars['error_message'] ); ?></p>
		</div>
	<?php endif; ?>

</div>

<form>

	<div class="sui-form-field<?php echo esc_attr( ! empty( $vars['list_id_error'] ) ? ' sui-form-field-error' : '' ); ?>"
		style="margin-bottom: 0;">

		<label class="sui-label"><?php esc_html_e( 'List', Powerform::DOMAIN ); ?></label>

		<select name="list_id" class="sui-select sui-form-control">
			<option><?php esc_html_e( 'Please select a list', Powerform::DOMAIN ); ?></option>
			<?php foreach ( $vars['lists'] as $list_id => $list_name ) : ?>
				<option value="<?php echo esc_attr( $list_id ); ?>"
					<?php selected( $vars['list_id'], $list_id ); ?>>
					<?php echo esc_html( $list_name ); ?>
				</option>
			<?php endforeach; ?>
		</select>

		<?php if ( ! empty( $vars['list_id_error'] ) ) : ?>
			<span class="sui-error-message"><?php echo esc_html( $vars['list_id_error'] ); ?></span>
		<?php endif; ?>

	</div>

	<input type="hidden"
		name="multi_id"
		value="<?php echo esc_attr( $vars['multi_id'] ); ?>" />

</form>