<html>
<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/jquery-1.7.1.min.js"></script>
<style>
.error {color: #FF0000;}

.success {color: #0da529;}
</style>
<body>  

<?php
// define variables and set to empty values
$nameErr = $lnameErr = $areaErr = $activityErr = $telErr = "";
$name = $lname = $area = $activity = $tel = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "กรุณากรอกชื่อ";
  } 
  else {
    $name = test_input($_POST["name"]);
    if (!preg_match("/^[ก-ฮ]+$/",$name)) {
      $nameErr = "กรุณาตรวจสอบชื่อ";
    }
  }
  
  if (empty($_POST["lname"])) {
    $lnameErr = "กรุณากรอกนามสกุล";
  } 
  else {
    $lname = test_input($_POST["lname"]);
    if (!preg_match("/^[ก-ฮ]+$/",$lname)) {
      $lnameErr = "กรุณาตรวจสอบนามสกุล";
    }
  }
 
  if (empty($_POST["area"])) {
    $genderErr = "กรุณากรอกพื้นที่ที่เข้า";
  } else {
    $area = test_input($_POST["area"]);
  }

  if (empty($_POST["activity"])) {
    $genderErr = "กรุณากรอกกิจกกรม";
  } else {
    $activity = test_input($_POST["activity"]);
  }



}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

<h2>เจ้าหน้าที่เข้าตึก :: COHORT</h2>
<?php echo (@$message)?"<p id=\"p_span\"><span class=\"success\">{$message}</span></p>":NULL;?>
<form id="configform" method="post" action="<?php echo site_url('Cohort/insert_data');?>">  
     ชื่อ : <input type="text" name="name" id="name" value="<?php echo $name;?>">
  <span class="error">* <?php echo $nameErr;?></span>
   นามสกุล : <input type="text" name="lname" value="<?php echo $lname;?>">
  <span class="error">* <?php echo $lnameErr;?></span>
 ออกจากตึก : <input type="checkbox" name="check_out" value="1">
  <br><br>
 พื้นที่ที่เข้าไป:
  <input type="radio" name="area" <?php if (isset($area) && $area=="front") echo "checked";?> value="1">ด้านหน้า
  <input type="radio" name="area" <?php if (isset($area) && $area=="nurse") echo "checked";?> value="2">ห้องพยาบาล
  <input type="radio" name="area" <?php if (isset($area) && $area=="anteroom") echo "checked";?> value="3">anteroom 
  <input type="radio" name="area" <?php if (isset($area) && $area=="patient") echo "checked";?> value="4">ห้องผู้ป่วย   
  <span class="error">* <?php echo $areaErr;?></span>
  <br><br>
 กิจกรรม:
  <input type="radio" name="activity" <?php if (isset($activity) && $activity=="visit_pt") echo "checked";?> value="1">เยี่ยมผู้ป่วย
  <input type="radio" name="activity" <?php if (isset($activity) && $activity=="morning") echo "checked";?> value="2">เวรเช้า
  <input type="radio" name="activity" <?php if (isset($activity) && $activity=="afternoon") echo "checked";?> value="3">เวรบ่าย 
  <input type="radio" name="activity" <?php if (isset($activity) && $activity=="nigth") echo "checked";?> value="4">เวรดึก   
  <input type="radio" name="activity" <?php if (isset($activity) && $activity=="contact") echo "checked";?> value="5">ติดต่อประสานงาน 
  <span class="error">* <?php echo $activityErr;?></span>
  <br><br>
    
  หมายเลขโทรศัพท์ : <input type="text" name="tel" value="<?php echo $tel;?>">
  <span class="error">* <?php echo $telErr;?></span>
 <br><br>

  <input type="submit" name="submit" value="Submit">  
</form>

<script>
$( document ).ready(function() {

	var message_int = "<?php echo @$message_int?>";
	//alert (message_int);
	
	if(message_int != "") {
		
		setTimeout(function(){
			//alert (1);
			//$('#p_span').html();
			//document.getElementById("p_span").value = ""; 
			//$('#configform').reset();//.trigger("reset");
			window.location.replace("<?php echo site_url('Cohort/insert_data')?>");
		}, 3000);
	}
});
</script>

</body>
</html>