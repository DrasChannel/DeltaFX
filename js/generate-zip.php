<?php
if (isset($_POST['selectedFiles'])) {
    $selectedFiles = $_POST['selectedFiles'];
    $zip = new ZipArchive();
    $zipName = 'download.zip';
    if ($zip->open($zipName, ZipArchive::CREATE) === TRUE) {
        foreach ($selectedFiles as $file) {
            $zip->addFile($file);
        }
        $zip->close();
        header('Content-Type: application/zip');
        header("Content-Disposition: attachment; filename=$zipName");
        header('Content-Length: ' . filesize($zipName));
        readfile($zipName);
        unlink($zipName);
        exit;
    }
}
?>