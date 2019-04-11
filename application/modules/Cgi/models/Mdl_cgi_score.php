<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Cgi_Score extends Response_Model { 

	public $table = 'med.cgi_score';

    public $primary_key = 'med.cgi_score.id';

    public function __construct()
    {

        parent::__construct();

    }

	public function default_select() {

        $this->db->select('med.cgi_score.id, med.cgi_score.score_name', FALSE);

    }



    public function default_order_by()

    {

        $this->db->order_by('med.cgi_score.id ASC');

    }

    

    public function validation_rules()

    {

        return array(

            'score_name'      => array(

                'field' => 'score_name',

                'label' => 'ชื่อคะแนน',

                'rules' => 'required'

            )

        );

    }

    

    public function db_array() {

    	

	    $db_array = parent::db_array();

		

	    $db_array['created_by'] = '486';



	    return $db_array;

	}

}