<form name="res_check" id="res_check" onmouseover="check_input();" >
<table width="80%" height="335" border="0" align="center" cellspacing="2" >
  <tr>
    <td width="194">&nbsp;</td>
    <td width="188"><input type="hidden" name="pasex" id="pasex" value="<?php echo $rows_his['pa_sex'];?>" /></td>
    <td width="88"><div align="left" class="style7">วันที่ตรวจ</div></td>
    <td width="272"><div align="left">
      <input style="width:100px;" class="binput" type="text" name="MyDateA" id="MyDateA" value="<?php echo $date_thai;?>" size="10" readonly="true" />
      </div></td>
  </tr>
  <tr>
    <td><div align="left" class="style7">น้ำหนัก</div></td>
    <td><div align="left"><input  class="binput" type="text" name="weight" id="weight" size="15" onkeypress="return noNumbers(event)" /></div></td>
    <td><div align="left" class="style7">ส่วนสูง</div></td>
    <td><div align="left">
	<input class="binput" type="text" name="height" id="height" size="15" onKeyUp="bmi_check();" onkeypress="return noNumbers(event)"/></div></td>
  </tr>
  <!-- <tr>
    <td><div align="left" class="style7">อัตราเต้นชีพจร</div></td>
    <td><div align="left"><input class="binput" type="text" name="hr" id="hr" size="15" onkeypress="return noNumbers(event)"></div></td>
    <td><div align="left" class="style7">อุณหภูมิ</div></td>
    <td><div align="left"><input class="binput" type="text" name="temp" id="temp" size="15" onkeypress="return noNumbers(event)"></div></td>
  </tr> -->
  <tr>
    <td><div align="left" class="style7">ความดัน</div></td>
    <td><div align="left">
	<input class="binput" type="text" style="width:50px;" name="systolic" id="systolic" size="15" onkeypress="return noNumbers(event)">/
	<input class="binput" type="text" style="width:50px;" name="diastolic" id="diastolic" size="15" onkeypress="return noNumbers(event) disabled="false">
	</div></td>
    <td><div align="left" class="style7">อุณหภูมิ</div></td>
    <td><div align="left"><input class="binput" type="text" name="temp" id="temp" size="15" onkeypress="return noNumbers(event)"></div></td>
  </tr>
  <tr>
    <td><div align="left" class="style7">อัตราเต้นชีพจร</div></td>
    <td><div align="left"><input class="binput" type="text" name="pressure" id="pressure" size="15" onkeypress="return noNumbers(event)"></div></td>
    <td><div align="left" class="style7">BMI</div></td>
    <td><div align="left"><input class="binput" type="text" name="bmi" id="bmi" size="15" readonly><spen id="str_bmi" style="color:red;size:18px;"></spen></div></td>
  </tr>
  <tr>
    <td valign="top"><div align="center" class="style7">
      <div align="left">อาการนำส่ง</div>
    </div></td>
    <td colspan="3"><div align="left">
      <textarea class="textarea" name="diag_basic" id="diag_basic" cols="45" rows="4"></textarea>
    </div></td>
  </tr>
  <tr>
    <td><div align="left" class="style7">การแพ้ยา</div></td>
    <td colspan="3"><div align="left">
    <input style="width:300px;" class="binput" name="sideeffect" type="text" id="sideeffect" size="50" value="<?php echo $rows_his['allergic'];?>" /></div></td>
  </tr>
  <tr>
    <td><div align="left" class="style7">โรคประจำตัว</div></td>
    <td colspan="3"><div align="left">
    <input style="width:300px;" class="binput" name="personal_dis" type="text" id="personal_dis" size="50" value="<?php echo $rows_his['congenital'];?>" /></div></td>
  </tr>
  <tr>
    <td valign="top"><div align="left" class="style7">หมายเหตุ</div></td>
    <td colspan="3"><div align="left">
    <textarea class="textarea" name="remark" id="remark" cols="45" rows="4"></textarea>
    </div></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="4">
      <div align="right">
		<input name="button6" type="submit" class="submit" id="button6" value=" Submit ">
      </div><input type="hidden" name="q4u_id" name="q4u_id" value="<?php //echo $rows_room['q4u_id']?>"></td>
    </tr>
</table>
</form>