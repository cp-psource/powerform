<?php
// defaults
$vars = array(
	'error_message'   => '',
	'target_id'       => '',
	'target_id_error' => '',
	'targets'         => array(),
	'help_message'    => '',
);
/** @var array $template_vars */
foreach ( $template_vars as $key => $val ) {
	$vars[ $key ] = $val;
}

?>
<div class="integration-header">
	<h3 class="sui-box-title" id="dialogTitle2"><?php echo esc_html( __( 'Select Target', Powerform::DOMAIN ) ); ?></h3>
	<p><?php echo esc_html( $vars['help_message'] ); ?></p>
	<?php if ( ! empty( $vars['error_message'] ) ) : ?>
		<span class="sui-notice sui-notice-error"><p><?php echo esc_html( $vars['error_message'] ); ?></p></span>
	<?php endif; ?>
</div>
<form>

	<div class="sui-form-field <?php echo esc_attr( ! empty( $vars['target_id_error'] ) ? 'sui-form-field-error' : '' ); ?>">
		<label class="sui-label"><?php esc_html_e( 'Type', Powerform::DOMAIN ); ?>
			<select name="target_id" class="sui-select sui-form-control">
				<option><?php esc_html_e( 'Please select target', Powerform::DOMAIN ); ?></option>
				<?php foreach ( $vars['targets'] as $target_id => $target_name ) : ?>
					<option value="<?php echo esc_attr( $target_id ); ?>" <?php selected( $vars['target_id'], $target_id ); ?>><?php echo esc_html( $target_name ); ?></option>
				<?php endforeach; ?>
			</select>
			<?php if ( ! empty( $vars['target_id_error'] ) ) : ?>
				<span class="sui-error-message"><?php echo esc_html( $vars['target_id_error'] ); ?></span>
			<?php endif; ?>
		</label>
	</div>

	<input type="hidden" name="multi_id" value="<?php echo esc_attr( $vars['multi_id'] ); ?>">
</form>