<?php
if ( ! defined( 'ABSPATH' ) ) {
    die();
}

/**
 * Class Powerform_Module
 *
 * Abstract class for modules
 *
 * @since 1.0
 */
abstract class Powerform_Template {

    /*
     * Template fields
     *
     * @var array
     */
    protected $template_fields = array();

    /*
     * Template settings
     *
     * @var array
     */
    protected $template_settings = array();

    /*
     * Template options
     *
     * @var array
     */
    public $options = array();

    public function __construct() {
        $this->template_fields = $this->fields();
        $this->template_settings = $this->settings();
        $this->options = $this->defaults();
    }

    /**
     * Get fields for the template
     *
     * @since 1.0
     * @return array
     */
    abstract protected function fields();

    /**
     * Get settings for the template
     *
     * @since 1.0
     * @return array
     */
    abstract protected function settings();

    /**
     * Get default settings for the template
     *
     * @since 1.0
     * @return array
     */
    abstract protected function defaults();

    /**
     * Get specific option from module options
     *
     * @since 1.0
     * @param string $option
     * @param mixed $default
     *
     * @return mixed
     */
    public function get_option( $option, $default = '' ) {
        return isset( $this->options[ $option ] ) ? $this->options[ $option ] : $default;
    }
}