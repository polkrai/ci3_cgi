<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Queuekios extends Response_Model {

	public $table = 'medrec.kios_queue';

    public $primary_key = 'kios_queue.id';

    public $date_created_field  = 'created_date';

    //public $date_modified_field = 'update_date';

    public function __construct()
    {
        parent::__construct();
    }

	public function default_select() {

        $this->db->select("kios_queue.id AS kios_id, kios_queue.hn, kios_queue.cid, kios_queue.queue_number, patient.pa_pre_name, patient.pa_name, patient.pa_lastname");
    }

	public function default_join()
    {
        $this->db->join('medrec.nano_patient AS patient', 'patient.hn = kios_queue.hn');
		//$this->db->join('jvkk.nano_user AS users_created', 'users_created.id = neural_appointment.created_by', 'left');
		//$this->db->join('jvkk.nano_components AS components', 'components.id = neural_appointment.component_id', 'left');
		//$this->db->join('jvkk.nano_user AS users', 'users.id = neural_appointment.user_id', 'left');
    }
    
    public function default_where()
    {
        $date = date ('Y-m-d');

        $this->db->where("kios_queue.created_date BETWEEN '{$date} 00:00:00' AND '{$date} 23:59:59'");
        $this->db->where('kios_queue.is_visit', 'f');
        $this->db->where('kios_queue.deleted', 'f');
    }

    public function default_order_by()
    {
        $this->db->order_by('kios_queue.id, kios_queue.created_date ASC');
    }

    public function default_group_by()
    {
        $this->db->group_by('kios_queue.id, kios_queue.queue_number, kios_queue.created_date, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname');
    }

    public function validation_rules()
    {
        return array(
	        'hn' => array(
                'field' => 'hn',
                'rules' => 'required'
            ),
            'cid' => array(
                'field' => 'cid',
                'rules' => 'required'
            ),
            'queue_number'  => array(
                'field' => 'queue_number',
                //'rules' => 'required'
            )
        );
    }

    
    public function save($id = NULL, $db_array = NULL) {

	    //$db_array = parent::db_array();
		$db_array['hn'] 		  = $this->input->get_post('hn');
		$db_array['cid'] 		  = $this->input->get_post('cid');
		$db_array['queue_number'] = ($this->input->get_post('queue_number') != "")?$this->input->get_post('queue_number'):NULL;

	    $id = parent::save($id, $db_array);

	    return $id;
	}

	public function deleted($id = NULL, $db_array = NULL)
    {
    	//$db_array = parent::db_array();

    	$db_array['deleted'] = 't';
    	//$db_array['deleted_date'] = date ('Y-m-d H:i:s');
    	//$db_array['deleted_by']   = $this->session->userdata('user_id');

        $id = parent::deleted($id, $db_array);

		return $id;
    }
    
    /*
    public function filter_select_kios($date_select=NULL)
    {	    
		//echo ">>" . $this->session->userdata('group_id');exit();
		
        $this->filter_where('nano_user.status', '1');
		$this->filter_where('nano_user.group_id', $group_id);
		
        
        return $this;
    }
    */

}
