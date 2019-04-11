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
	
    public $primary_key = 'jvkk.nano_session.id_sess';
	
	public function __construct()
    {
        parent::__construct();
    }

    public function auth_session($id_sess)
    {
    	$this->db->select('nano_session.session_user_id, nano_user.title_43_file, nano_user.name, nano_user.lastname, nano_user.group_id, nano_user.department_id, neural_user_group.name AS group_name');
        $this->db->join('jvkk.nano_user', 'jvkk.nano_user.id = jvkk.nano_session.session_user_id');
		$this->db->join('jvkk.neural_user_group', 'jvkk.neural_user_group.id = jvkk.nano_user.group_id', 'left');
        
		$query = $this->db->get_where('jvkk.nano_session', array('id_sess' => $id_sess));

        if ($query->num_rows() > 0) {
			
            $session = $query->row();
			
			$session_data = array(
				'user_id' 		=> $session->session_user_id,
				'id_sess'		=> $id_sess,
				'full_name'		=> $session->title_43_file.$session->name . ' ' . $session->lastname,
				'is_physician' 	=> ($session->group_id == 1)?TRUE:FALSE,
				'station_id' 	=> $this->get_station(),
				'group_id' 		=> ($session->group_id == 1 OR $session->group_id == 2 OR $session->group_id == 5 OR $session->group_id == 10)?1:$session->group_id,
				'department_id'	=> $session->department_id,
				'group_name'	=> $session->group_name,
				'logged_in'		=> TRUE
			);

			$this->session->set_userdata($session_data);

			return TRUE;
          
        }
		else {
			
			return FALSE;
		}
    }
    
    public function auth_check_session($user_id) {

		$this->db->select('session.id');
	    	
	    $this->db->where ('session.session_user_id', $user_id);
	    	
	    $result = $this->db->get ('jvkk.nano_session AS session');

		if ($result->num_rows() > 0) {

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