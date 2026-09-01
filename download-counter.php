<?php
header('Content-Type: application/json');

// Path to JSON storage file
$storage = __DIR__ . '/download-counts.json';

// Create file if missing
if (!file_exists($storage)) {
    file_put_contents($storage, json_encode([]));
}

// Load existing counts
$counts = json_decode(file_get_contents($storage), true);

// Get file identifier
$file = isset($_GET['file']) ? $_GET['file'] : null;

if ($file) {
    // Increment counter
    if (!isset($counts[$file])) {
        $counts[$file] = 0;
    }
    $counts[$file]++;

    // Save updated counts
    file_put_contents($storage, json_encode($counts));
}

// Return all counters
echo json_encode($counts);
?>
