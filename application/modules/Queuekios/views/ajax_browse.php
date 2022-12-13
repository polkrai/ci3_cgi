<div class="pager">
    <ul>
        <li class="results">Pages:</li>
        <?php echo $this->page->create_links();?>
    </ul>
</div>
<div class="clr"></div>
<div id="browse_table">
    <p>Displaying <?php echo $this->page->page_stats();?></p>
    
    <table cellspacing="0">
    <thead>
        <tr class="headers">
            <th class="first" scope="col"><div>Last Name<ul class="sort"><li class="up"><?php echo $this->page->create_sort_link('last_name', 'asc'); ?></li><li class="down"><?php echo $this->page->create_sort_link('last_name', 'desc'); ?></li></ul></div></th>
            <th scope="col"><div>First Name<ul class="sort"><li class="up"><?php echo $this->page->create_sort_link('first_name', 'asc'); ?></li><li class="down"><?php echo $this->page->create_sort_link('first_name', 'desc'); ?></li></ul></div></th>
            <th scope="col"><div>E-Mail<ul class="sort"><li class="up"><?php echo $this->page->create_sort_link('email', 'asc'); ?></li><li class="down"><?php echo $this->page->create_sort_link('email', 'desc'); ?></li></ul></div></th>
        </tr>
    </thead>
    <?php
    if($query->num_rows() > 0)
    {
        $x=0;
        foreach($query->result() as $row)
        {
    ?>
    <tr>
        <td><?php echo $row->last_name?></td>
        <td><?php echo $row->first_name?></td>
        <td><?php echo $row->email?></td>
    </tr>
    <?php
            $x++;
        }
    }
    else
    {
    ?>
    <tr>
        <td colspan="3">Sorry, there are no records.</td>
    </tr>
    <?php
    }
    ?>
    </table>
</div>