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

class Mdl_Sessions extends MY_Model {
	
	public $table = 'jvkk.nano_session';
	
    public $primary_key = 'jvkk.nano_session.id';
	
	public function __construct()
    {
        parent::__construct();
    }

    public function auth_session($id_sess)
    {
        $this->db->join('jvkk.nano_user', 'jvkk.nano_user.id = jvkk.nano_session.session_user_id');

        $query = $this->db->get_where('jvkk.nano_session', array('id_sess' => $id_sess));

        if ($query->num_rows() > 0) {
			
            $session = $query->row();
			
			$session_data = array(
				'user_id' 		=> $session->session_user_id,
				'id_sess'		=> $id_sess,
				'full_name'		=> $session->title_43_file.$session->name . ' ' . $session->lastname,
				'is_physician' 	=> ($session->group_id == 1)?TRUE:FALSE,
				'station_id' 	=> $this->get_station(),
				'logged_in'		=> TRUE
			);

			$this->session->set_userdata($session_data);

			return TRUE;
          
        }
		else {
			
			return FALSE;
		}
    }
    
    public function get_station () {
    	
		$this->db->select ('id');
		
		$query = $this->db->get_where('med.neural_station', array('ip' => get_ip_address()));
		
		if ($query->num_rows() > 0) {
			
            $row = $query->row();

			return $row->id;
          
        }
        else {
			
			return 10;
		}
	}
    
    public function patient_session($vn_id) {
		
		$this->db->select ('id AS vn_id, vn, id_patient, hn');
		
		$query = $this->db->get_where ('medrec.nano_visit', array('id' => $vn_id));
		
		if ($query->num_rows() > 0) {
			
            $row = $query->row();
			
			$session_data = array(
				'vn_id'		=> $row->vn_id,
				'vn'		=> $row-vn,
				'id_patient'=> $row->id_patient,
				'hn'		=> $row->hn
			);		

			$this->session->set_userdata($session_data);

			return TRUE;
          
        }
		else {
			
			return FALSE;
		}
	}

}

?>