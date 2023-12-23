export function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    return videoExtensions.includes(`.${fileExtension.toLowerCase()}`);
  }
  
  export function isImageFile(filename) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
    const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    return imageExtensions.includes(`.${fileExtension.toLowerCase()}`);
  }