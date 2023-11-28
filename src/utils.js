export const filterData = (val, posts, tags, time) => {
  const value = val.toLowerCase();
  let d = posts.filter(
    (post) =>
      post.itemDescription.toLowerCase().includes(value) ||
      post.itemTag.toLowerCase().includes(value) ||
      post.location.toLowerCase().includes(value)
  );
  if (tags && tags.length !== 0) {
    d = d.filter((post) => {
      const ftags = tags.map((tag) => tag.value);
      return ftags.includes(post.itemTag);
    });
    if (time && time === "older") {
      d = d.sort(
        (b, a) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }
  return d;
};
export const resizeImage = (base64Str, maxWidth = 1024, maxHeight = 720) => {
    return new Promise((resolve) => {
    console.log("Converting image")
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png' , 0.8));
    };
  });
};
