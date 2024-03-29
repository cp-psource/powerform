<?php
// defaults
$vars = array(
	'error_message'  => '',
	'board_id'       => '',
	'board_id_error' => '',
	'multi_id'       => '',
	'boards'         => array(),
);
/** @var array $template_vars */
foreach ( $template_vars as $key => $val ) {
	$vars[ $key ] = $val;
}

?>
<div class="integration-header">
	<h3 class="sui-box-title" id="dialogTitle2"><?php echo esc_html( __( 'Assign Board', Powerform::DOMAIN ) ); ?></h3>
	<p><?php esc_html_e( 'Your account is now authorized, choose which board you want Trello cards to be added to.', Powerform::DOMAIN ); ?></p>
	<?php if ( ! empty( $vars['error_message'] ) ) : ?>
		<span class="sui-notice sui-notice-error"><p><?php echo esc_html( $vars['error_message'] ); ?></p></span>
	<?php endif; ?>
</div>
<form>
	<div class="sui-form-field <?php echo esc_attr( ! empty( $vars['board_id_error'] ) ? 'sui-form-field-error' : '' ); ?>">
		<label class="sui-label" for="trello-board-id"><?php esc_html_e( 'Board', Powerform::DOMAIN ); ?></label>
			<select name="board_id" class="sui-select sui-form-control" id="trello-board-id">
				<option><?php esc_html_e( 'Please select a board', Powerform::DOMAIN ); ?></option>
				<?php foreach ( $vars['boards'] as $board_id => $board_name ) : ?>
					<option value="<?php echo esc_attr( $board_id ); ?>" <?php selected( $vars['board_id'], $board_id ); ?>><?php echo esc_html( $board_name ); ?></option>
				<?php endforeach; ?>
			</select>
			<?php if ( ! empty( $vars['board_id_error'] ) ) : ?>
				<span class="sui-error-message"><?php echo esc_html( $vars['board_id_error'] ); ?></span>
			<?php endif; ?>
	</div>
	<input type="hidden" name="multi_id" value="<?php echo esc_attr( $vars['multi_id'] ); ?>">
</form>