use App\Http\Controllers\FileController;

// Route to list all files
Route::get('/files', [FileController::class, 'index']);

// Route to create a new file
Route::post('/files/create', [FileController::class, 'createFile']);

// Route to delete a file
Route::delete('/files/delete/{file}', [FileController::class, 'deleteFile']);

// Route to create a new directory
Route::post('/directories/create', [FileController::class, 'createDirectory']);

// Route to delete a directory
Route::delete('/directories/delete/{directory}', [FileController::class, 'deleteDirectory']);

// Route to list all directories
Route::get('/directories', [FileController::class, 'listDirectories']);
