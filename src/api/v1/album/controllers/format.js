const XlsxPopulate = require("xlsx-populate");

async function format(req, res, next) {
  try {
    // ... existing code for file handling and sheet retrieval ...

    // Extract used range boundaries from input sheet
    const { startRow, endRow, startCol, endCol } = extractUsedRange(inputSheet);

    // Define comparison column (adjust as needed)
    const compareCol = "A"; // Change to "E" if comparing by column E

    // Track target row
    let targetRow = 1;

    // Identify all unique albums
    const uniqueAlbums = identifyUniqueAlbums(inputSheet, compareCol, startRow, endRow);

    // Loop through identified unique albums
    for (const album of uniqueAlbums) {
      // Insert a gap before the album (optional for single row)
      // insertGap(outputSheet, targetRow, 1); // Uncomment if needed

      // Copy album name to the first row of the group
      outputSheet.cell(`<span class="math-inline">\{compareCol\}</span>{targetRow}`).value(album);

      // Loop and copy remaining rows for the album's tracks
      const albumTracks = getAlbumTracks(inputSheet, compareCol, album, startRow, endRow);
      for (const trackRow of albumTracks) {
        const inputRow = inputSheet.row(trackRow);
        const outputRow = outputSheet.row(targetRow++);
        inputRow.copyTo(outputRow, { deep: true });
      }

      // Update targetRow for the next album (considering gap)
      // targetRow += 1; // Uncomment if gap is inserted
    }

    // ... existing code for saving the workbook ...

  } catch (error) {
    // ... existing error handling ...
  }
}

// Existing functions (extractUsedRange, identifyUniqueAlbums, getAlbumTracks) remain unchanged
