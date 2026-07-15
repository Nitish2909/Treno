import fs from "fs";
import path from "path";

/**
 * Delete a single temporary file (non-blocking)
 * @param {string} filePath - Absolute or relative path to the temp file
 */
export const deleteTempFile = (filePath) => {
  if (!filePath) return;

  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      // ENOENT = file doesn't exist, that's fine
      console.error(`Failed to delete temp file ${filePath}:`, err.message);
    }
  });
};

/**
 * Delete multiple temporary files (non-blocking)
 * @param {string[]} filePaths - Array of file paths
 */
export const deleteTempFiles = (filePaths = []) => {
  filePaths.forEach((filePath) => deleteTempFile(filePath));
};

/**
 * Delete temp file synchronously (use only in error-handling paths)
 * @param {string} filePath
 */
export const deleteTempFileSync = (filePath) => {
  if (!filePath) return;
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Failed to delete temp file sync ${filePath}:`, err.message);
    }
  }
};

/**
 * Extract local paths from an express req.files object (multer fields)
 * @param {object} reqFiles - req.files from multer fields upload
 * @returns {string[]}
 */
export const extractTempFilePaths = (reqFiles = {}) => {
  const paths = [];
  if (!reqFiles) return paths;

  // req.files can be an array (array upload) or an object (fields upload)
  if (Array.isArray(reqFiles)) {
    reqFiles.forEach((f) => f?.path && paths.push(f.path));
  } else {
    Object.values(reqFiles).forEach((fieldFiles) => {
      if (Array.isArray(fieldFiles)) {
        fieldFiles.forEach((f) => f?.path && paths.push(f.path));
      }
    });
  }
  return paths;
};

export default {
  deleteTempFile,
  deleteTempFiles,
  deleteTempFileSync,
  extractTempFilePaths,
};
