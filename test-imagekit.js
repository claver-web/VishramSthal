require('dotenv').config();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

async function test() {
  try {
    const response = await imagekit.upload({
      file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", // 1px transparent png
      fileName: "test.png",
    });
    console.log("Success:", response.url);
  } catch (error) {
    console.error("Error:", error);
  }
}
test();
