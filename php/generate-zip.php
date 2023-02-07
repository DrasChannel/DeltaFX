<?php
    mkdir("temp");
    $zipFile = "4K_png.zip";
    $zipArchive = new ZipArchive();

    if (!$zipArchive->open($zipFile, ZIPARCHIVE::CREATE))
        die("Failed to create archive\n");

    $zipArchive->addFile('test.png', 'content/materials/concretepanels1/4K_png/concretepanels1_4K_ao.png');
    if (!$zipArchive->status == ZIPARCHIVE::ER_OK)
        echo "Failed to write local files to zip\n";

    $zipArchive->close();
?>