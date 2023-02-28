<?php    
    // remove value from cookie
    if(isset($_COOKIE["D"])) {
        $downloads = $_COOKIE["D"];

        $cookie_name = "D";
        $cookie_value = $downloads -1;

        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
    }
?>