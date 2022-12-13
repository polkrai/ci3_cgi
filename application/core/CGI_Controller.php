<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

require APPPATH."third_party/MX/Controller.php";

class CGI_Controller extends MX_Controller {

	public $user;

    public $settings;

    public $languages;

    public $includes;

    public $current_uri;

    public $theme;

    public $template;

    public $error;



	public function __construct() {

		parent::__construct();

		$this->load->database();

		$this->load->library(array('session', 'form_validation', 'pagination', 'email', 'jsi18n', 'redir'));

		$this->load->helper(array('url', 'file', 'directory', 'string', 'html', 'asset', 'form', 'uri', 'pager', 'trans'));

		$this->load->module('layout');

		$this->load->module('sessions');

		$settings = $this->settings_model->get_settings();

		$this->settings = new stdClass();

        foreach ($settings as $setting)
        {

            $this->settings->{$setting['name']} = (@unserialize($setting['value']) !== FALSE) ? unserialize($setting['value']) : $setting['value'];

        }

        $this->settings->site_version = $this->config->item('site_version');

        $this->settings->root_folder  = $this->config->item('root_folder');

        // get current uri

        $this->current_uri = "/" . uri_string();

        // set the time zone

        $timezones = $this->config->item('timezones');

        if (function_exists('date_default_timezone_set')) {

            date_default_timezone_set($timezones[$this->settings->timezones]);

        }

		 $this->add_external_css(

                array(

                    base_url("/assets/css/bootstrap.min.css"),
                    base_url("/assets/css/bootstrap-theme.min.css"),
                    base_url("/assets/css/font-awesome.min.css"),
                    base_url("/themes/core/css/core.css"),
					base_url("/assets/css/bootstrap-select.min.css"),
					base_url("/assets/css/bootstrap-multiselect.css"),
					base_url("/assets/css/style.css"),
					base_url("/assets/css/custom.css"),
					base_url("/assets/css/monospace.css"),
					base_url("assets/css/datepicker.css"),
                ))

            ->add_external_js(

                array(

                    base_url("/assets/js/jquery-1.9.1.min.js"),
                    base_url("/assets/js/bootstrap.min.js"),
                    base_url("/assets/js/bootstrap-select.min.js"),
                    base_url("/assets/js/bootstrap-datepicker.js"),
					base_url("/assets/js/locales/th.js"),
					base_url("/assets/js/moment-with-locales.js"),
					base_url("/assets/js/moment.min.js"),
					base_url("/assets/js/bootstrap-multiselect.js"),
                ));



		$core_js = $this->jsi18n->translate("/themes/core/js/core_i18n.js");

		$core_js = str_replace("<<base_url>>", base_url(), $core_js);



        $this->includes[ 'js_files_i18n' ] = array(

            $core_js

        );



		if ($this->session->userdata('logged_in')) {



			$this->user = $this->session->userdata('logged_in');

		}

		else {

			if ($this->input->get_post('id_sess')) {

				Modules::run('Sessions/sessions/set_session', $this->input->get_post('id_sess'));

				//$this->sessions->set_session($this->input->get_post('id_sess'));

			}

			else {



				//redirect("http://{$_SERVER['SERVER_ADDR']}/nano");

			}



		}



		// prepare theme name

        $this->settings->theme = strtolower($this->config->item('admin_theme'));



        // set up global header data

        $this->add_css_theme( "{$this->settings->theme}.css,summernote-bs3.css" )

             ->add_js_theme( "summernote.min.js" )

             ->add_js_theme( "{$this->settings->theme}_i18n.js", TRUE );



        // declare main template

        $this->template = "../../{$this->settings->root_folder}/themes/{$this->settings->theme}/template.php";



		//$this->output->set_template('default');

		//$this->_init();

		$this->lang->load('ip', 'Thai');
        $this->lang->load('form_validation', 'Thai');
        $this->lang->load('custom', 'Thai');
        $this->load->helper('language');

	}



	/**

     * Add CSS from external source or outside folder theme

     *

     * This function used to easily add css files to be included in a template.

     * with this function, we can just add css name as parameter and their external path,

     * or add css complete with path. See example.

     *

     * We can add one or more css files as parameter, either as string or array.

     * If using parameter as string, it must use comma separator between css file name.

     * -----------------------------------

     * Example:

     * -----------------------------------

     * 1. Using string as first parameter

     *     $this->add_external_css( "global.css, color.css", "http://example.com/assets/css/" );

     *      or

     *      $this->add_external_css(  "http://example.com/assets/css/global.css, http://example.com/assets/css/color.css" );

     *

     * 2. Using array as first parameter

     *     $this->add_external_css( array( "global.css", "color.css" ),  "http://example.com/assets/css/" );

     *      or

     *      $this->add_external_css(  array( "http://example.com/assets/css/global.css", "http://example.com/assets/css/color.css") );

     *

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.1.0

     * @access  public

     * @param   mixed

     * @param string, default = NULL

     * @return  chained object

     */

    function add_external_css($css_files, $path = NULL)

    {

        // make sure that $this->includes has array value

        if ( ! is_array( $this->includes ) )

            $this->includes = array();



        // if $css_files is string, then convert into array

        $css_files = is_array( $css_files ) ? $css_files : explode( ",", $css_files );



        foreach( $css_files as $css )

        {

            // remove white space if any

            $css = trim( $css );



            // go to next when passing empty space

            if ( empty( $css ) ) continue;



            // using sha1( $css ) as a key to prevent duplicate css to be included

            $this->includes[ 'css_files' ][ sha1( $css ) ] = is_null( $path ) ? $css : $path . $css;

        }

        return $this;

    }





    /**

     * Add JS from external source or outside folder theme

     *

     * This function used to easily add js files to be included in a template.

     * with this function, we can just add js name as parameter and their external path,

     * or add js complete with path. See example.

     *

     * We can add one or more js files as parameter, either as string or array.

     * If using parameter as string, it must use comma separator between js file name.

     * -----------------------------------

     * Example:

     * -----------------------------------

     * 1. Using string as first parameter

     *     $this->add_external_js( "global.js, color.js", "http://example.com/assets/js/" );

     *      or

     *      $this->add_external_js(  "http://example.com/assets/js/global.js, http://example.com/assets/js/color.js" );

     *

     * 2. Using array as first parameter

     *     $this->add_external_js( array( "global.js", "color.js" ),  "http://example.com/assets/js/" );

     *      or

     *      $this->add_external_js(  array( "http://example.com/assets/js/global.js", "http://example.com/assets/js/color.js") );

     *

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.1.0

     * @access  public

     * @param   mixed

     * @param string, default = NULL

     * @return  chained object

     */

    function add_external_js( $js_files, $path = NULL )

    {

        // make sure that $this->includes has array value

        if ( ! is_array( $this->includes ) )

            $this->includes = array();



        // if $js_files is string, then convert into array

        $js_files = is_array( $js_files ) ? $js_files : explode( ",", $js_files );



        foreach( $js_files as $js )

        {

            // remove white space if any

            $js = trim( $js );



            // go to next when passing empty space

            if ( empty( $js ) ) continue;



            // using sha1( $css ) as a key to prevent duplicate css to be included

            $this->includes[ 'js_files' ][ sha1( $js ) ] = is_null( $path ) ? $js : $path . $js;

        }



        return $this;

    }





    /**

     * Add CSS from Active Theme Folder

     *

     * This function used to easily add css files to be included in a template.

     * with this function, we can just add css name as parameter

     * and it will use default css path in active theme.

     *

     * We can add one or more css files as parameter, either as string or array.

     * If using parameter as string, it must use comma separator between css file name.

     * -----------------------------------

     * Example:

     * -----------------------------------

     * 1. Using string as parameter

     *     $this->add_css_theme( "bootstrap.min.css, style.css, admin.css" );

     *

     * 2. Using array as parameter

     *     $this->add_css_theme( array( "bootstrap.min.css", "style.css", "admin.css" ) );

     *

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.0.5

     * @access  public

     * @param   mixed

     * @return  chained object

     */

    function add_css_theme( $css_files )

    {

        // make sure that $this->includes has array value

        if ( ! is_array( $this->includes ) )

            $this->includes = array();



        // if $css_files is string, then convert into array

        $css_files = is_array( $css_files ) ? $css_files : explode( ",", $css_files );



        foreach( $css_files as $css )

        {

            // remove white space if any

            $css = trim( $css );



            // go to next when passing empty space

            if ( empty( $css ) ) continue;



            // using sha1( $css ) as a key to prevent duplicate css to be included

            $this->includes[ 'css_files' ][ sha1( $css ) ] = base_url( "/themes/{$this->settings->theme}/css" ) . "/{$css}";

        }



        return $this;

    }





    /**

     * Add JS from Active Theme Folder

     *

     * This function used to easily add js files to be included in a template.

     * with this function, we can just add js name as parameter

     * and it will use default js path in active theme.

     *

     * We can add one or more js files as parameter, either as string or array.

     * If using parameter as string, it must use comma separator between js file name.

     *

     * The second parameter is used to determine wether js file is support internationalization or not.

     * Default is FALSE

     * -----------------------------------

     * Example:

     * -----------------------------------

     * 1. Using string as parameter

     *     $this->add_js_theme( "jquery-1.11.1.min.js, bootstrap.min.js, another.js" );

     *

     * 2. Using array as parameter

     *     $this->add_js_theme( array( "jquery-1.11.1.min.js", "bootstrap.min.js,", "another.js" ) );

     *

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.0.5

     * @access  public

     * @param   mixed

     * @param   boolean

     * @return  chained object

     */

    function add_js_theme( $js_files, $is_i18n = FALSE )

    {

        if ( $is_i18n )

            return $this->add_jsi18n_theme( $js_files );



        // make sure that $this->includes has array value

        if ( ! is_array( $this->includes ) )

            $this->includes = array();



        // if $css_files is string, then convert into array

        $js_files = is_array( $js_files ) ? $js_files : explode( ",", $js_files );



        foreach( $js_files as $js )

        {

            // remove white space if any

            $js = trim( $js );



            // go to next when passing empty space

            if ( empty( $js ) ) continue;



            // using sha1( $js ) as a key to prevent duplicate js to be included

            $this->includes[ 'js_files' ][ sha1( $js ) ] = base_url( "/themes/{$this->settings->theme}/js" ) . "/{$js}";

        }



        return $this;

    }





    /**

     * Add JSi18n files from Active Theme Folder

     *

     * This function used to easily add jsi18n files to be included in a template.

     * with this function, we can just add jsi18n name as parameter

     * and it will use default js path in active theme.

     *

     * We can add one or more jsi18n files as parameter, either as string or array.

     * If using parameter as string, it must use comma separator between jsi18n file name.

     * -----------------------------------

     * Example:

     * -----------------------------------

     * 1. Using string as parameter

     *     $this->add_jsi18n_theme( "dahboard_i18n.js, contact_i18n.js" );

     *

     * 2. Using array as parameter

     *     $this->add_jsi18n_theme( array( "dahboard_i18n.js", "contact_i18n.js" ) );

     *

     * 3. Or we can use add_js_theme function, and add TRUE for second parameter

     *     $this->add_js_theme( "dahboard_i18n.js, contact_i18n.js", TRUE );

     *      or

     *     $this->add_js_theme( array( "dahboard_i18n.js", "contact_i18n.js" ), TRUE );

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.0.5

     * @access  public

     * @param   mixed

     * @return  chained object

     */

    function add_jsi18n_theme( $js_files )

    {

        // make sure that $this->includes has array value

        if ( ! is_array( $this->includes ) )

            $this->includes = array();



        // if $css_files is string, then convert into array

        $js_files = is_array( $js_files ) ? $js_files : explode( ",", $js_files );



        foreach( $js_files as $js )

        {

            // remove white space if any

            $js = trim( $js );



            // go to next when passing empty space

            if ( empty( $js ) ) continue;



            // using sha1( $js ) as a key to prevent duplicate js to be included

            $this->includes[ 'js_files_i18n' ][ sha1( $js ) ] = $this->jsi18n->translate( "/themes/{$this->settings->theme}/js/{$js}" );

        }



        return $this;

    }





    /* Set Page Title

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.0.5

     * @access  public

     * @param   string

     * @return  chained object

     */

    function set_title($page_title=NULL)

    {

        $this->includes[ 'page_title' ] = $page_title;



        /* check wether page_header has been set or has a value

        * if not, then set page_title as page_header

        */

        $this->includes[ 'page_header' ] = isset( $this->includes[ 'page_header' ] ) ? $this->includes[ 'page_header' ] : $page_title;



		return $this;

    }





    /* Set Page Header

     * sometime, we want to have page header different from page title

     * so, use this function

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.0.5

     * @access  public

     * @param   string

     * @return  chained object

     */

    function set_page_header( $page_header )

    {

        $this->includes[ 'page_header' ] = $page_header;

        return $this;

    }





    /* Set Template

     * sometime, we want to use different template for different page

     * for example, 404 template, login template, full-width template, sidebar template, etc.

     * so, use this function

     * --------------------------------------

     * @author  Arif Rahman Hakim

     * @since   Version 3.1.0

     * @access  public

     * @param   string, template file name

     * @return  chained object

     */

    function set_template( $template_file = 'template.php' )

    {

        // make sure that $template_file has .php extension

        $template_file = substr( $template_file, -4 ) == '.php' ? $template_file : ( $template_file . ".php" );



        $this->template = "../../{$this->settings->root_folder}/themes/{$this->settings->theme}/{$template_file}";

    }



}