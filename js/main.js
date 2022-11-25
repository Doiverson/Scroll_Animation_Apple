const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 148;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// Set canvas dimensions
canvas.width = 1158;
canvas.height = 770;

// Create, load and draw the image
const img = new Image();
img.src = currentFrame(1);
// we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
img.onload = () => {
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0)
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  // Diagonal scroll
  // canvas.style.transform = `
  //       translate(${-30 + Math.floor(scrollTop) * 3}px, ${550 - Math.floor(scrollTop)}px)
  // `;

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});


preloadImages();
