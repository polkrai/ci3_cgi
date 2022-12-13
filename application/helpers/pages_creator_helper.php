<?php

  function create_new_page($page_name, $class_name, $controller_name, $modules=FALSE){
	  
	  if ($modules) {
		  
		  $apppath = APPPATH.'modules/'.$controller_name.'/';
		  
		  mkdir($apppath, 0775);
		  
		  $arr = array('controllers', 'models', 'views');
		  
		  for ($i=0;$i<count($arr);$i++) {
			  
			  mkdir($apppath . $arr[$i], 0775);
		  }
		  
	  }
	  else {
		  
		  $apppath = APPPATH;
	  }

  // Create Controller
  $controller = fopen($apppath.'controllers/'.$controller_name.'.php', "a") or die("Unable to open file!");

  $controller_content ="<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class $class_name extends MY_Controller  {

  public function __construct()
  {
    parent::__construct();

   }
  public function index()
   {
    \$this->data['site_title'] = '$page_name';
    \$this->twig->display('$page_name',\$this->data);

   }

   }";
  fwrite($controller, "\n". $controller_content);
  fclose($controller);

  // Create Model
  $model = fopen($apppath.'models/'.'Mdl_'.$page_name.'.php', "a") or die("Unable to open file!");

   $model_content ="<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class "."Mdl_".$class_name." extends CI_Model {
  
	function __construct() {
	  
		// Call the Model constructor
		parent::__construct();
	}

}";
  fwrite($model, "\n". $model_content);
  fclose($model);

  // Create Twig Page

  $page = fopen($apppath.'views/'.$page_name.'.php', "a") or die("Unable to open file!"); 

  $page_content ='<?php extends "base.twig" ?>
  <?php block content ?>

  <div class="row">
    <div class="col-md-12">
        <h1>TO DO {{ site_title }}</h1>

    </div>
    <!-- /.col -->
  </div>

   <?php endblock ?>';
  fwrite($page, "\n". $page_content);
  fclose($page);
   }