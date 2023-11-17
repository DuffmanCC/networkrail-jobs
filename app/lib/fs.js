const { writeFile, appendFile, readFile } = require("fs/promises");

async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
    console.log("✅ Data has been written to the file");
  } catch (err) {
    console.error("❌ Error writing to file:", err);
  }
}

async function appendToFile(fileName, data) {
  try {
    await appendFile(fileName, data, { flag: "a" });
    console.log(`✅ Appended data to ${fileName}`);
  } catch (error) {
    console.error("❌ Got an error trying to append the file:", error);
  }
}

async function readThisFile(filePath) {
  try {
    const data = await readFile(filePath);
    console.log(`✅ ${filePath} file content: ${data.toString()}`);
  } catch (error) {
    console.error(`❌ Got an error trying to read the file: ${error.message}`);
  }
}

async function isFileContentSameAsString(filePath, contentToCompare) {
  try {
    // Read the content of the file
    const fileContent = await readFile(filePath, "utf8");

    // Compare the file content with the string
    return fileContent === contentToCompare;
  } catch (error) {
    // Handle any errors that may occur during file reading
    console.error(error);
    return false; // Return false if an error occurs
  }
}

async function execute() {
  await writeToFile("./test.txt", "hola");
  await appendToFile("./test.txt", "adios");
  await readThisFile("./test.txt", "adios");
  const res = await isFileContentSameAsString("./test.txt", "holaadios");
  console.log("🚀 ~ file: cache-files.js:49 ~ execute ~ res:", res);
}

execute();
