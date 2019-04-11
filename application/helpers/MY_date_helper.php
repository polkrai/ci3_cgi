<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Overwriting the timezones function to include Arizona timezone
 */


if ( ! function_exists('timezones'))
{
    /**
     * Timezones
     *
     * Returns an array of timezones. This is a helper function
     * for various other ones in this library
     *
     * @param   string  timezone
     * @return  string
     */
    function timezones($tz = '')
    {
        // Note: Don't change the order of these even though
        // some items appear to be in the wrong order

        $zones = array(
            'UM12'      => -12,
            'UM11'      => -11,
            'UM10'      => -10,
            'UM95'      => -9.5,
            'UM9'       => -9,
            'UM8'       => -8,
            'UM75'      => -7,
            'UM7'       => -7,
            'UM6'       => -6,
            'UM5'       => -5,
            'UM45'      => -4.5,
            'UM4'       => -4,
            'UM35'      => -3.5,
            'UM3'       => -3,
            'UM2'       => -2,
            'UM1'       => -1,
            'UTC'       => 0,
            'UP1'       => +1,
            'UP2'       => +2,
            'UP3'       => +3,
            'UP35'      => +3.5,
            'UP4'       => +4,
            'UP45'      => +4.5,
            'UP5'       => +5,
            'UP55'      => +5.5,
            'UP575'     => +5.75,
            'UP6'       => +6,
            'UP65'      => +6.5,
            'UP7'       => +7,
            'UP8'       => +8,
            'UP875'     => +8.75,
            'UP9'       => +9,
            'UP95'      => +9.5,
            'UP10'      => +10,
            'UP105'     => +10.5,
            'UP11'      => +11,
            'UP115'     => +11.5,
            'UP12'      => +12,
            'UP1275'    => +12.75,
            'UP13'      => +13,
            'UP14'      => +14
        );

        if ($tz === '')
        {
            return $zones;
        }

        return isset($zones[$tz]) ? $zones[$tz] : 0;
    }
}

function date_formats()
{
    return array(
        'm/d/Y' => array(
            'setting' => 'm/d/Y',
            'datepicker' => 'mm/dd/yyyy'
        ),
        'm-d-Y' => array(
            'setting' => 'm-d-Y',
            'datepicker' => 'mm-dd-yyyy'
        ),
        'm.d.Y' => array(
            'setting' => 'm.d.Y',
            'datepicker' => 'mm.dd.yyyy'
        ),
        'Y/m/d' => array(
            'setting' => 'Y/m/d',
            'datepicker' => 'yyyy/mm/dd'
        ),
        'Y-m-d' => array(
            'setting' => 'Y-m-d',
            'datepicker' => 'yyyy-mm-dd'
        ),
        'Y.m.d' => array(
            'setting' => 'Y.m.d',
            'datepicker' => 'yyyy.mm.dd'
        ),
        'd/m/Y' => array(
            'setting' => 'd/m/Y',
            'datepicker' => 'dd/mm/yyyy'
        ),
        'd-m-Y' => array(
            'setting' => 'd-m-Y',
            'datepicker' => 'dd-mm-yyyy'
        ),
        'd-M-Y' => array(
            'setting' => 'd-M-Y',
            'datepicker' => 'dd-M-yyyy'
        ),
        'd.m.Y' => array(
            'setting' => 'd.m.Y',
            'datepicker' => 'dd.mm.yyyy'
        ),
        'j.n.Y' => array(
            'setting' => 'j.n.Y',
            'datepicker' => 'd.m.yyyy'
        ),
        'd M,Y' => array(
            'setting' => 'd M,Y',
            'datepicker' => 'dd M,yyyy'
        ),
    );
}

function date_from_mysql($date, $ignore_post_check = false)
{
    if ($date <> '0000-00-00') {
        if (!$_POST or $ignore_post_check) {
            $CI = &get_instance();

            $date = DateTime::createFromFormat('Y-m-d', $date);
            
            return $date->format($CI->mdl_settings->setting('date_format'));
        }
        return $date;
    }
    return '';
}

function date_to_thai($datetime, $showtime=true)
{
	
	//$datetime = ($showtime)?substr($datetime, 0, -3):$datetime;
	
    $thai_month_arr = array("0"=>"", "1"=>"มกราคม", "2"=>"กุมภาพันธ์", "3"=>"มีนาคม", "4"=>"เมษายน", "5"=>"พฤษภาคม", "6"=>"มิถุนายน", "7"=>"กรกฎาคม", "8"=>"สิงหาคม", "9"=>"กันยายน", "10"=>"ตุลาคม", "11"=>"พฤศจิกายน", "12"=>"ธันวาคม");

    $thai_date_return = date("j", strtotime($datetime));   
    $thai_date_return.= "&nbsp;&nbsp;".$thai_month_arr[date("n", strtotime($datetime))];   
    $thai_date_return.= "&nbsp;&nbsp;".(date("Y", strtotime($datetime))+543);
     
    if($showtime) {
	    
	    $thai_date_return.= "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เวลา&nbsp;".date("H:i", strtotime($datetime)) . " น.</b>";
    }
    
    
    return $thai_date_return;

}

function date_from_timestamp($timestamp)
{
    $CI = &get_instance();

    $date = new DateTime();
    $date->setTimestamp($timestamp);
    return $date->format($CI->mdl_settings->setting('date_format'));
}

function date_to_mysql($date)
{
    $CI = &get_instance();

    $date = DateTime::createFromFormat($CI->mdl_settings->setting('date_format'), $date);
    
    return $date->format('Y-m-d');
}

function date_thai_show($date)
{
    $CI = &get_instance();
    
    if ($date) {
	    
	    $date = substr($date, 0, 10);
	    
	    $date_arr = explode('-', $date);
	    
	    return "$date_arr[2]/$date_arr[1]/$date_arr[0]";
    }
	else {
		
    //$date = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    
    	return NULL;
    }
}


function date_format_setting()
{
    $CI = &get_instance();

    $date_format = $CI->mdl_settings->setting('date_format');

    $date_formats = date_formats();

    return $date_formats[$date_format]['setting'];
}

function date_format_datepicker()
{
    $CI = &get_instance();

    $date_format = $CI->mdl_settings->setting('date_format');

    $date_formats = date_formats();

    return $date_formats[$date_format]['datepicker'];
}

/**
 * Adds interval to user formatted date and returns user formatted date
 * To be used when date is being output back to user
 * @param $date - user formatted date
 * @param $increment - interval (1D, 2M, 1Y, etc)
 * @return user formatted date
 */
function increment_user_date($date, $increment)
{
    $CI = &get_instance();

    $mysql_date = date_to_mysql($date);

    $new_date = new DateTime($mysql_date);
    $new_date->add(new DateInterval('P' . $increment));

    return $new_date->format($CI->mdl_settings->setting('date_format'));
}

/**
 * Adds interval to yyyy-mm-dd date and returns in same format
 * @param $date
 * @param $increment
 * @return date
 */
function increment_date($date, $increment)
{
    $new_date = new DateTime($date);
    $new_date->add(new DateInterval('P' . $increment));
    return $new_date->format('Y-m-d');
}
