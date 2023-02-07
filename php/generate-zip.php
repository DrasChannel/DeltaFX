<?php
$files = json_decode($_POST['files'], true);

echo '<pre>';
print_r($files);
echo '</pre>';

$zip = new ZipArchive();
$zipName = 'files.zip';

if ($zip->open($zipName, ZipArchive::CREATE) === true) {
    foreach($files as $file) {
        if (file_exists($file)) {
            $zip->addFile($file);
        } else {
            echo "Error: file not found: $file";
        }
    }

    $zip->close();

    header('Content-Type: application/zip');
    header("Content-Disposition: attachment; filename='$zipName'");
    header('Content-Length: ' . filesize($zipName));
    readfile($zipName);

    unlink($zipName);
} else {
    echo "Error: Could not create zip file.";
}
?>