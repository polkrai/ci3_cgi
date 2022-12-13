<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Users extends Response_Model { 
	
	public $table = 'jvkk.nano_user';
	
    public $primary_key = 'jvkk.nano_user.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("nano_user.*");
    }

    public function default_order_by()
    {
        $this->db->order_by('nano_user.id ASC');
    }
    
    public function user_dropdown ($users) {
    	
    	$options = array('' => "เลือกเจ้าหน้าที่หรือแพทย์ที่นัด");
		
		foreach ($users as $user) {
			
			$options[$user->id] = $user->title . $user->name . ' ' . $user->lastname;
		}
		
		return $options;
		
	}
    
    public function validation_rules()
    {
        return array(
            'title'     => array(
                'field' => 'title',
                'label' => 'คำนำหน้า',
                'rules' => 'required'
            ),
            'name'      => array(
                'field' => 'name',
                'label' => 'ชื่อ',
                'rules' => 'required'
            ),
            'lastname' => array(
                'field' => 'lastname',
                'label' => 'นามสกุล',
                'rules' => 'required'
            )
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();

	    //$db_array['created_by'] = $this->session->userdata('user_id');

	    return $db_array;
	}

	public function delete($id = NULL, $db_array = NULL)
    {
        $id = parent::save($id, $db_array);

		return $id;
    }
    
    public function save($id = NULL, $db_array = NULL)
    {
    	if ($id) {
	    	
	    	$db_array = parent::db_array();
	    	
	    	//$db_array['clinic1'] = $_POST['clinic'][0];
	    	//$db_array['clinic2'] = $_POST['clinic'][1];

    		//$db_array['updated_by'] 	= $this->session->userdata('user_id');
    		//$db_array['updated_date'] 	= date('Y-m-d H:i:s');
    	}
    	
        $id = parent::save($id, $db_array);

		return $id;
    }
	
	public function filter_select_user($group_id=1)
    {	    
		//echo ">>" . $this->session->userdata('group_id');exit();
		
        $this->filter_where('nano_user.status', '1');
		$this->filter_where('nano_user.group_id', $group_id);
		
		if ($group_id == 1) {
			
			$this->filter_where('nano_user.number_licensed IS NOT NULL');
		}
        
        return $this;
    }
	
}