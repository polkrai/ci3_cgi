<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('set_actual'))
{
	function set_actual ($actual)
	{
		$problems_actual = '';

		for ($i=1; $i < 17; $i++)
		{
			if($actual == $i)
				$problems_actual .= $actual . '|';
			else
				$problems_actual .= '0|';
		}

		return substr($problems_actual, 0, -1);
	}
}

if ( ! function_exists('set_boolen'))
{
	function set_boolen ($boolen)
	{

		if($boolen == 'f' OR $boolen == 't'){
			return 1;
		}
		else if ($boolen == ""){
		
			return NULL;
		}
	}
}

if ( ! function_exists('set_problems_other'))
{
	function set_problems_other ()
	{
		$problems_other = '';

		for ($i=1; $i < 17; $i++)
		{
			if(@$_POST['problems_other_'.$i])
				$problems_other .= $_POST['problems_other_'.$i].'|';
			else
				$problems_other .= '0|';
		}

		return substr($problems_other, 0, -1)."|".$_POST['actual_text'];
	}
}

if ( ! function_exists('set_problems_brought'))
{
	function set_problems_brought ()
	{
		$problems_brought = '';

		for ($i=1; $i < 8; $i++)
		{
			if(@$_POST['problems_brought_'.$i])
				$problems_brought .= $_POST['problems_brought_'.$i].'|';
			else
				$problems_brought .= '0|';
		}

		return substr($problems_brought, 0, -1);
	}
}

if ( ! function_exists('get_actual'))
{
	function get_actual ($val_arr=0) {

		switch ($val_arr) {

			case 0:
				return NULL;
			break;
			case 1:
				return "เจ็บป่วยทางกาย";
			break;
			case 2:
				return " เจ็บป่วยทางจิต";
			break;
			case 3:
				return " ด้านครอบครัว";
			break;
			case 4:
				return " ด้านเศรษฐกิจ";
			break;
			case 5:
				return " ด้านการทำงาน";
			break;
			case 6:
				return "ด้านการปรับตัว";
			break;
			case 7:
				return "ปัญหาการเรียน";
			break;
			case 8:
				return "ปัญหาซึมเศร้า";
			break;
			case 9:
				return "ปัญหาฆ่าตัวตาย";
			break;
			case 10:
				return "ปัญหาสารเสพติด";
			break;
			case 11:
				return "ปัญหาทางเพศ";
			break;
			case 12:
				return "ปัญหาความสัมพันธ์/คู่รัก";
			break;
			case 13:
				return "ปัญหาความเครียด / วิตกกังวล";
			break;
		}
	}
}

if (! function_exists('set_problems_actual')) {

	function set_problems_actual ($actual) {


	}
}

if (! function_exists('get_actual_report')) {

	function get_actual_report ($index, $actual) {

		$act = explode('|', $actual);

		if ($act[$index-1] != 0) {

			return 1;
		}
		else {
			return 0;
		}
	}
}

if ( ! function_exists('get_helping'))
{
	function get_helping ($val_arr) {

		if ($val_arr == 0) {
			return NULL;
		}
		else if ($val_arr == 1) {
			return " - Csg";
		}
		else if ($val_arr == 2) {
			return " - F/Csg";
		}
		else if ($val_arr == 3) {
			return " - Relaxation";
		}
		else if ($val_arr == 4) {
			return " - Pre-Test";
		}
		else if ($val_arr == 5) {
			return " - Post-Test";
		}
		else if ($val_arr == 6) {
			return " - Psycho therapy";
		}
		else if ($val_arr == 7) {
			return " - Supportive Psycho therapy";
		}
		else if ($val_arr == 8) {
			return " - Family therapy";
		}

	}
}

if ( ! function_exists('get_techno_helping'))
{
	function get_techno_helping ($val_arr) {
		if ($val_arr == 0) {
			return NULL;
		}
		else if ($val_arr == 1) {
			return " - CBT";
		}
		else if ($val_arr == 2) {
			return " - REBT";
		}
		else if ($val_arr == 3) {
			return " - Client Center";
		}
		else if ($val_arr == 4) {
			return " - Sartir";
		}
		else if ($val_arr == 5) {
			return " - ผสมผสาน";
		}
	}
}
//get_operation
if ( ! function_exists('get_operation'))
{
	function get_operation ($val_arr) {

		if($val_arr == 3 || $val_arr == 6 || $val_arr == 7 || $val_arr == 8)
			$arr_ex = explode (";", $val_arr);

		if ($val_arr == 0) {
			return NULL;
		}
		else if ($val_arr == 1) {
			return " - เข้าใจปัญหาที่เกิดขึ้น";
		}
		else if ($val_arr == 2) {
			return " - ร่วมมือในการแก้ปัญหา";
		}
		else if (@$arr_ex[0] == 3) {
			return (@$arr_ex[1] != "")?" - มีแนวทางในการแก้ปัญหา ระบุ :".nbs(2).@$arr_ex[1]:"- มีแนวทางในการแก้ปัญหา";
		}
		else if ($val_arr == 4) {
			return " - สบายใจขึ้น";
		}
		else if ($val_arr == 5) {
			return " - ส่งต่อแพทย์";
		}
		else if (@$arr_ex[0] == 6) {
			return (@$arr_ex[1] != "")?" - ซึมเศร้าลดลง ระบุ :".nbs(2).@$arr_ex[1]:"- ซึมเศร้าลดลง";//" - ซึมเศร้าลดลง";
		}
		else if (@$arr_ex[0] == 7) {
			return (@$arr_ex[1] != "")?" - วิตกกังวลลดลง ระบุ :".nbs(2).@$arr_ex[1]:"- วิตกกังวลลดลง";//" - วิตกกังวลลดลง";
		}
		else if (@$arr_ex[0] == 8) {
			return (@$arr_ex[1] != "")?" - เครียดลดลง ระบุ :".nbs(2).@$arr_ex[1]:"- เครียดลดลง";//" - เครียดลดลง";
		}
	}
}

if ( ! function_exists('set_help'))
{
	function set_help ()
	{
		$problems_helping = '';

		for ($i=1; $i <= 9; $i++)
		{
			if(@$_POST['help_'.$i])
				$problems_helping .= $_POST['help_'.$i].'|';
			else
				$problems_helping .= '0|';
		}

		return $problems_helping.$_POST['problems_helping_text'];
	}
}

if ( ! function_exists('set_techno'))
{
	function set_techno ()
	{
		$techno_helping = '';

		for ($i=1; $i <= 6; $i++)
		{
			if(@$_POST['techno_'.$i])
				$techno_helping .= $_POST['techno_'.$i].'|';
			else
				$techno_helping .= '0|';
		}

		return substr($techno_helping, 0, -1);
	}
}

if ( ! function_exists('set_overall'))
{
	function set_overall ()
	{
		$overall_operation = '';
		$arr = array();

		for ($i=1; $i < 10; $i++)
		{
			if(@$_POST['overall_'.$i]):
				if(@$_POST['overall_'.$i.'_identify']):
					$overall_operation .= $_POST['overall_'.$i].';'.@$_POST['overall_'.$i.'_identify'].'|';
				else:
					$overall_operation .= $_POST['overall_'.$i].'|';
				endif;

			endif;
		}

		return substr($overall_operation, 0, -1);
	}
}

if ( ! function_exists('set_the_time'))
{
	function set_the_time () {

		$CI =& get_instance();

		$CI->db->select ('hn');
		$CI->db->where ('hn', $CI->session->userdata ('hn'));
		$CI->db->where ('deletes', 'f');

		return $CI->db->get ('medoptions.mi_relax')->num_rows ();
	}
}

//provided

if ( ! function_exists('set_provided'))
{
	function set_provided () {

		$services_provided = '';

		for ($i=1; $i < 6; $i++)
		{
			if(@$_POST['services_provided_'.$i])
				$services_provided .= $_POST['services_provided_'.$i].'|';
			else
				$services_provided .= '0|';
		}


		return substr($services_provided, 0, -1);
	}
}

if ( ! function_exists('get_provided'))
{
	function get_provided ($val_arr) {

		switch ($val_arr) {
			case 0:
				return NULL;
			break;
			case 1:
				return " - นวดตัว";
			break;
			case 2:
				return " - นวดเท้า";
			break;
			case 3:
				return " - อบสมุนไพร";
			break;
			case 4:
				return " - ประคบ";
			break;
			case 4:
				return " - ให้คำแนะนำ";
			break;
		}
	}
}

if ( ! function_exists('get_last_order_id'))
{
	function get_last_order_id ($vn_id, $id_patient, $order_type) {

		$CI =& get_instance();

		$CI->db->select ('id AS order_id');
		$CI->db->where ('vn_id', $vn_id);
		$CI->db->where ('order_type', $order_type);
		$CI->db->where ('pa_id', $id_patient);
		$CI->db->order_by ('id', 'DESC');
		$CI->db->limit (1);

		$Q = $CI->db->get ('med.neural_order');

		if($Q->num_rows () > 0) {
			return $Q->row()->order_id;
		}
		else {
			return 0;
		}
	}
}

if ( ! function_exists ('get_problems_actual')) {

	function get_problems_actual ($problems_actual) {

		$value = NULL;

		$arr = explode ('|', $problems_actual);

		for ($i=0;$i<16;$i++) {

			if (@$arr[$i] != 0) {

				$value.= get_actual (@$arr[$i]) . ", ";
			}
		}

		return substr($value, 0, -2); //. (isset($arr[16]))?$arr[16]:"";

	}
}
