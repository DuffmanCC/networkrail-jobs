import NodeCache from "node-cache";

// Create and export a shared cache instance
const cache = new NodeCache();

console.log("🚀 ~ file: cache.js:5 ~ cache:", cache.keys());

export default cache;
