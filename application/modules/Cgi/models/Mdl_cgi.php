<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Cgi extends Response_Model {

	public $table = 'med.cgi';

    public $primary_key = 'med.cgi.id';

    public function __construct()
    {
        parent::__construct();
    }

	public function default_select() {

        $this->db->select("cgi.*, to_char(cgi.created_date, 'DD/MM/YYYY') AS cgi_date, cgi_clinic.clinic_name, nano_visit.vn, users.name, users.lastname");
    }

	 public function default_join()
    {
        $this->db->join('med.cgi_clinic AS cgi_clinic', 'cgi_clinic.id = cgi.clinic1', 'left');
		$this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id = cgi.vn_id');
		$this->db->join('jvkk.nano_user AS users', 'users.id = cgi.created_by');
    }

    public function default_order_by()
    {
        $this->db->order_by('med.cgi.id ASC');
    }

    public function validation_rules()
    {
        return array(
            'vn_id'     => array(
                'field' => 'vn_id'
            ),
            'hn'      	=> array(
                'field' => 'hn'
            ),
            'cgi_score'     => array(
                'field' => 'cgi_score',
                'label' => trans('score'),
                'rules' => 'required'
            ),
            'clinic1'      => array(
                'field' => 'clinic1',
                'label' => trans('clinic'),
                //'rules' => 'required'
            ),
            'created_date' => array(
                'field' => 'created_date',
                'label' => 'วันที่บันทึก',
                'rules' => 'required'
            )
        );
    }

    public function db_array() {

	    $db_array = parent::db_array();

	    //$db_array['clinic1'] = $_POST['clinic'][0];
	    //$db_array['clinic2'] = $_POST['clinic'][1];

	    $db_array['created_by'] = $this->session->userdata('user_id');

	    return $db_array;
	}

	public function deleted($id = NULL, $db_array = NULL)
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

    		$db_array['updated_by'] 	= $this->session->userdata('user_id');
    		$db_array['updated_date'] 	= date('Y-m-d H:i:s');
    	}

        $id = parent::save($id, $db_array);

		return $id;
    }

	public function filter_select($hn)
    {
        $this->filter_where('cgi.hn', $hn);
		$this->filter_where('cgi.deleted', 'f');

        return $this;
    }

}