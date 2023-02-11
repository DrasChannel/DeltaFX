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
    
    // headers
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="'.basename($filezip).'"');
    header("Content-Length: " . filesize($filezip));

    // Open the file for reading
    $fp = fopen($filezip, "r");
    
    // Read the file in 8KB chunks and send the data to the client
    while(!feof($fp)) {
        echo fread($fp, 16384);
        flush();
    }
    
    // Close and unlink the files
    fclose($fp);
    unlink($filezip);
    unset($zipFileName);
    unset($filezip);
    unset($fp);
?>
