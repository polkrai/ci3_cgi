<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*
 * FusionInvoice
 * 
 * A free and open source web based invoicing system
 *
 * @package		FusionInvoice
 * @author		Jesse Terry
 * @copyright	Copyright (c) 2012 - 2013 FusionInvoice, LLC
 * @license		http://www.fusioninvoice.com/license.txt
 * @link		http://www.fusioninvoice.com
 * 
 */

class Sessions extends MX_Controller {
	
	public function __construct() {
		
        parent::__construct();
        
        $this->load->database(); 
        
        $this->load->library('session');
        
        $this->load->helper('ip');
     
    }


    public function index()
    {
        //redirect('sessions/login');
        
        echo ">>>>" . $this->input->get_post('id_sess');
        
        
        $query = $this->db->query("SELECT * FROM jvkk.nano_session WHERE id_sess = '477bdccab5de0ba24960ccb0383f4ff9'");

        if ($query->num_rows() > 0) {
			
            $session = $query->row();
			
			$session_data = array(
				'user_id' 	=> $session->session_user_id,
				'id_sess'	=> $id_sess
			);

			$this->session->set_userdata($session_data);

			return TRUE;
          
        }
		else {
			
			return FALSE;
		}
    }
    
    public function set_session ($id_sess=NULL) {
	  
	    
	    if ($id_sess) {
		    
		    $this->load->model ('mdl_sessions');
		    
            $this->mdl_sessions->auth_session($id_sess);
            
	        //echo ">>>>" . $this->input->get_post('id_sess');
            
        }

    }

    public function login()
    {
        if ($this->input->post('btn_login'))
        {
            if ($this->authenticate($this->input->post('email'), $this->input->post('password')))
            {
				/*
                if ($this->session->userdata('user_type') == 1)
                {
                    redirect('dashboard');
                }
                elseif ($this->session->userdata('user_type') == 2) {
	                
                    redirect('guest');
                }
				*/
            }
        }

        $data = array(
            'login_logo' => NULL
        );

        //$this->load->view('session_login', $data);
    }

    public function logout()
    {
		$this->load->model ('mdl_sessions');
		
		$this->mdl_sessions->delete($this->session->userdata('id_sess'));
		
        $this->session->sess_destroy();

        //redirect('sessions/login');

		redirect("http://{$_SERVER['SERVER_ADDR']}/nano");
    }

    public function authenticate($email_address, $password)
    {
        $this->load->model('mdl_sessions');

        if ($this->mdl_sessions->auth($email_address, $password))
        {
            return TRUE;
        }

        return FALSE;
    }
    
    public function check_session () {
    	
    	$this->load->model('mdl_sessions');
	    
	    if ($this->mdl_sessions->auth_check_session($this->session->userdata('user_id')) AND $this->session->userdata('logged_in')) {
		    
		    echo "TRUE";
	    }
	    else {
		    
		    echo "FALSE";
	    }
    }

}

?>