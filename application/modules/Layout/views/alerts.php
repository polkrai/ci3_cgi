<?php if (function_exists('validation_errors')) {
    if (validation_errors()) {
        echo validation_errors('<div class="alert alert-danger">', '</div>');
    }
} ?>

<?php if ($this->session->flashdata('alert_success')) { ?>
<div class="alert alert-success"><?php echo $this->session->flashdata('alert_success'); ?></div>
<?php } ?>

<?php if ($this->session->flashdata('alert_info')) { ?>
<div class="alert alert-info"><?php echo $this->session->flashdata('alert_info'); ?></div>
<?php } ?>

<?php if ($this->session->flashdata('alert_error')) { ?>
<<<<<<< HEAD
<div class="alert alert-error"><?php echo $this->session->flashdata('alert_error'); ?></div>
=======
<div class="alert alert-danger"><?php echo $this->session->flashdata('alert_error'); ?></div>
>>>>>>> 13a7918... first commit
<?php } ?>

<script>

var explode = function(){
	
  $( "div.alert" ).remove();
  
};

//setTimeout(explode, 3000);
</script>