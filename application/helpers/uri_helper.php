<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function uri_assoc($var, $segment = 3) {

	$CI =& get_instance();

	$uri_assoc = $CI->uri->uri_to_assoc($segment);

	if (isset($uri_assoc[$var])) {

		return $uri_assoc[$var];

	}
	else {

		return NULL;

	}

}

function get_class_name () {
	
	$router =& load_class('Router', 'core');
	
	return $router->fetch_class();
}

function get_method_name () {
	
	$router =& load_class('Router', 'core');

	return $router->fetch_method();
}

function url_current () {

	$CI =& get_instance();

	$query = $_SERVER['QUERY_STRING'] ? '?'.$_SERVER['QUERY_STRING'] : '';

	return $CI->config->site_url () . "/" . $CI->uri->uri_string (). $query;
}
