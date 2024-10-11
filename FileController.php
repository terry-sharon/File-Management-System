<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    // List all files in a directory
    public function listFiles()
    {
        $files = Storage::files('storage');  // Adjust path based on your setup
        return response()->json($files);
    }

    // Create a new file
    public function createFile(Request $request)
    {
        $fileName = $request->input('name');
        if (!$fileName) {
            return response()->json(['error' => 'File name is required'], 400);
        }

        $filePath = 'storage/' . $fileName;
        if (Storage::exists($filePath)) {
            return response()->json(['error' => 'File already exists'], 400);
        }

        Storage::put($filePath, '');  // Creates an empty file
        return response()->json(['success' => 'File created', 'file' => $fileName]);
    }

    // Delete a file
    public function deleteFile($file)
    {
        $filePath = 'storage/' . $file;
        if (!Storage::exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        Storage::delete($filePath);
        return response()->json(['success' => 'File deleted']);
    }

    // List all directories
    public function listDirectories()
    {
        $directories = Storage::directories('storage');  // Adjust path based on your setup
        return response()->json($directories);
    }

    // Create a new directory
    public function createDirectory(Request $request)
    {
        $dirName = $request->input('name');
        if (!$dirName) {
            return response()->json(['error' => 'Directory name is required'], 400);
        }

        $dirPath = 'storage/' . $dirName;
        if (Storage::exists($dirPath)) {
            return response()->json(['error' => 'Directory already exists'], 400);
        }

        Storage::makeDirectory($dirPath);
        return response()->json(['success' => 'Directory created', 'directory' => $dirName]);
    }

    // Delete a directory
    public function deleteDirectory($directory)
    {
        $dirPath = 'storage/' . $directory;
        if (!Storage::exists($dirPath)) {
            return response()->json(['error' => 'Directory not found'], 404);
        }

        if (count(Storage::files($dirPath)) > 0) {
            return response()->json(['error' => 'Directory is not empty'], 400);
        }

        Storage::deleteDirectory($dirPath);
        return response()->json(['success' => 'Directory deleted']);
    }
}
