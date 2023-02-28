<?php    
    if(isset($_COOKIE["downloads"])) {
        $downloads = $_COOKIE["downloads"];

        $cookie_name = "downloads";
        $cookie_value = $downloads -1;

        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
    }
?>