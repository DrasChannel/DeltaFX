<?php
    // variables
    $data = json_decode(file_get_contents("php://input"), true);
    $selectedFiles = explode("|", $data['selectedFiles']);
    $selectedFileNames = explode("|", $data['selectedFileNames']);
    $zipFileName = $data['zipFileName'];
    $filezip = $zipFileName;

    // create the zip
    $zip = new ZipArchive;
    if ($zip->open($zipFileName, ZipArchive::CREATE) === TRUE){
        // add all the files to the zip file
        for ($i = 0; $i < count($selectedFiles); $i++) {
            $zip->addFile($selectedFiles[$i], $selectedFileNames[$i]);
        }
        // close the zip file.
        $zip->close();
    }
    
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="'.basename($filezip).'"');
    readfile($filezip);
    unlink($filezip);
    
    /*if (file_exists($filezip)) {
        
        header('Content-Length: ' . filesize($filezip));
        readfile($filezip);
        unlink($filezip);
    }*/

?>
