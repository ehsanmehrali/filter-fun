//global variable to upload an image//
let image = null;
//global variable to accesse the canvas Element//
let canvas = null;

//The image is uploaded using this function//
function uploadimage() {
  canvas = document.getElementById("can");
  let infile = document.getElementById("inputfile");
  image = new SimpleImage(infile);
  image.drawTo(canvas);
}

//The makeRed function first ensures that the image is uploaded, then calls the -//
//filterRed function and otherwise displays the appropriate message to the user.//
function makeRed() {
  if (imageIsLoaded(image)) {
    filterRed();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//The filterRed function checks the rgb average of each pixel and if it tends-//
//towards 100% light(average more than 128), it sets the red value to the average-//
//and the rest to zero. And otherwise, it sets the red value as 255 and the rest as-//
//twice the average minus 255.//
function filterRed() {
  for (let pixel of image.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setBlue(2 * avg - 255);
      pixel.setGreen(2 * avg - 255);
    }
  }
}

//makeGray function first ensures that the image is uploaded, then calls the -//
//filterGray function and otherwise displays the appropriate message to the user.//
function makeGray() {
  if (imageIsLoaded(image)) {
    filterGray();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//The filterGray function calculates the average rgb of each pixel and assigns it to all-//
//three primary colors.//
function filterGray() {
  for (let pixel of image.values()) {
    let avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
}

//The makeWindowpane function first ensures that the image is uploaded, then calls the -//
//setWindowpane function and otherwise displays the appropriate message to the user.//
function makeWindowpane() {
  if (imageIsLoaded(image)) {
    setWindowpane();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//This setWindowpane function creates a window in the form of a frame with a thickness(windowThickness)-//
//of 15 pixels and two horizontal rows and three vertical columns with a thickness(paneThickness) of 10-//
//pixels on the image.//
function setWindowpane() {
  let windowThickness = 15;
  let paneThickness = 10;
  let width = image.getWidth();
  let height = image.getHeight();
  let tileWidth = (width - windowThickness * 2 - paneThickness * 3) / 4;
  let tileHeight = (height - windowThickness * 2 - paneThickness) / 2;

  for (let pix of image.values()) {
    if (
      pix.getX() < windowThickness ||
      pix.getX() > width - windowThickness ||
      pix.getY() < windowThickness ||
      pix.getY() > height - windowThickness ||
      (pix.getX() > windowThickness + tileWidth &&
        pix.getX() < windowThickness + tileWidth + paneThickness) ||
      (pix.getX() > windowThickness + tileWidth * 2 + paneThickness &&
        pix.getX() < windowThickness + tileWidth * 2 + paneThickness * 2) ||
      (pix.getX() > windowThickness + tileWidth * 3 + paneThickness * 2 &&
        pix.getX() < width - (tileWidth + windowThickness)) ||
      (pix.getY() > windowThickness + tileHeight &&
        pix.getY() < height - (windowThickness + tileHeight))
    ) {
      drawBorders(pix);
    }
  }
}

//This drawBorders function is called by the setWindowpane function and sets the received pixels with rgb-//
//value 51,3,34.//
function drawBorders(pixel) {
  pixel.setRed(51);
  pixel.setGreen(3);
  pixel.setBlue(34);
  return pixel;
}
//The makeRainbow function first ensures that the image is uploaded, then calls the -//
//setRainbow function and otherwise displays the appropriate message to the user.//
function makeRainbow() {
  if (imageIsLoaded(image)) {
    setRainbow();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//The setRainbow function divides the image into 7 equal horizontal rows and calls the-//
//setRed, setOrange, setYellow, setGreen, setBlue, setIndigo and setViolet functions for-//
//each of them and creates a rainbow Rankine image.//
function setRainbow() {
  let rowsHeight = image.getHeight() / 7;

  for (let pixel of image.values()) {
    let avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;

    if (pixel.getY() <= rowsHeight) {
      setRed(pixel, avg);
    } else if (pixel.getY() > rowsHeight && pixel.getY() <= rowsHeight * 2) {
      setOrange(pixel, avg);
    } else if (
      pixel.getY() > rowsHeight * 2 &&
      pixel.getY() <= rowsHeight * 3
    ) {
      setYellow(pixel, avg);
    } else if (
      pixel.getY() > rowsHeight * 3 &&
      pixel.getY() <= rowsHeight * 4
    ) {
      setGreen(pixel, avg);
    } else if (
      pixel.getY() > rowsHeight * 4 &&
      pixel.getY() <= rowsHeight * 5
    ) {
      setBlue(pixel, avg);
    } else if (
      pixel.getY() > rowsHeight * 5 &&
      pixel.getY() <= rowsHeight * 6
    ) {
      setIndigo(pixel, avg);
    } else {
      setViolet(pixel, avg);
    }
  }
}
//The setRed function is called by the setRainbow function and turns the received pixels red.//
function setRed(pixel, average) {
  if (average < 128) {
    pixel.setRed(average * 2);
    pixel.setGreen(0);
    pixel.setBlue(0);
  } else if (average >= 128) {
    pixel.setRed(255);
    pixel.setGreen(2 * average - 255);
    pixel.setBlue(2 * average - 255);
  }
  return pixel;
}
//The setOrange function is called by the setRainbow function and turns the received pixels orange.//
function setOrange(pixel, average) {
  if (average < 128) {
    pixel.setRed(2 * average);
    pixel.setGreen(0.8 * average);
    pixel.setBlue(0);
  } else {
    pixel.setRed(255);
    pixel.setGreen(1.2 * average - 51);
    pixel.setBlue(2 * average - 255);
  }
  return pixel;
}
//The setYellow function is called by the setRainbow function and turns the received pixels yellow.//
function setYellow(pixel, average) {
  if (average < 128) {
    pixel.setRed(2 * average);
    pixel.setGreen(2 * average);
    pixel.setBlue(0);
  } else {
    pixel.setRed(255);
    pixel.setGreen(255);
    pixel.setBlue(2 * average - 255);
  }
  return pixel;
}
//The setGreen function is called by the setRainbow function and turns the received pixels green.//
function setGreen(pixel, average) {
  if (average < 128) {
    pixel.setRed(0);
    pixel.setGreen(2 * average);
    pixel.setBlue(0);
  } else {
    pixel.setRed(2 * average - 255);
    pixel.setGreen(255);
    pixel.setBlue(2 * average - 255);
  }
  return pixel;
}
//The setBlue function is called by the setRainbow function and turns the received pixels blue.//
function setBlue(pixel, average) {
  if (average < 128) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(2 * average);
  } else {
    pixel.setRed(2 * average - 255);
    pixel.setGreen(2 * average - 255);
    pixel.setBlue(255);
  }
  return pixel;
}
//The setIndigo function is called by the setRainbow function and turns the received pixels indigo.//
function setIndigo(pixel, average) {
  if (average < 128) {
    pixel.setRed(0.8 * average);
    pixel.setGreen(0);
    pixel.setBlue(2 * average);
  } else {
    pixel.setRed(1.2 * average - 51);
    pixel.setGreen(2 * average - 255);
    pixel.setBlue(255);
  }
  return pixel;
}
//The setViolet function is called by the setRainbow function and turns the received pixels violet.//
function setViolet(pixel, average) {
  if (average < 128) {
    pixel.setRed(1.6 * average);
    pixel.setGreen(0);
    pixel.setBlue(1.6 * average);
  } else {
    pixel.setRed(0.4 * average + 153);
    pixel.setGreen(2 * average - 255);
    pixel.setBlue(0.4 * average + 153);
  }
  return pixel;
}

//The makeTransparent function first ensures that the image is uploaded, then calls the -//
//transparency function and otherwise displays the appropriate message to the user.this-//
//function called by an input element with range type.The value sent by the slider-//
//determines the transparency of the image//
function makeTransparent() {
  if (imageIsLoaded(image)) {
    transparency();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//The Transparency function receives a number in the range of 0 to 255 through an input of-//
//range type. and adjusts the alpha value of the image accordingly.//
function transparency() {
  let sliderInput = document.getElementById("transparentSlider");
  let trncprntValue = sliderInput.value;
  for (let pixel of image.values()) {
    pixel.setAlpha(trncprntValue);
  }
}

//The makeBlur function first ensures that the image is uploaded, then calls the-//
//setBlur function and otherwise displays the appropriate message to the user.this-//
//function called by an input element with range type.The value sent by the slider-//
//determines the Blur value of the image//
function makeBlur() {
  if (imageIsLoaded(image)) {
    setBlur();
    image.drawTo(canvas);
  } else {
    alert("The image is not loaded");
  }
}

//The setBlur function called by makeBlur function and inside itself receives a number-//
//in the range of 0 to 10 through an input of range type. and adjusts the blur value of-//
//the image accordingly.//
function setBlur() {
  let sliderInput01 = document.getElementById("blurSlider");
  let blurValue = sliderInput01.value;
  for (let pixel of image.values()) {
    let halfTime = Math.random();
    if (halfTime < 0.5) {
      let x = pixel.getX();
      let y = pixel.getY();
      image.setPixel(x, y, pixel);
    } else if (halfTime >= 0.5) {
      let width = image.getWidth();
      let height = image.getHeight();
      let xrandom = Math.floor(Math.random() * blurValue);
      let finalX = pixel.getX() + xrandom;
      let yrandom = Math.floor(Math.random() * blurValue);
      let finalY = pixel.getY() - yrandom;
      if (finalX >= width) {
        finalX = width - 1;
      }
      if (finalY < 0) {
        finalY = 0;
      }
      image.setPixel(finalX, finalY, pixel);
    }
  }
}

//The doReset function first ensures that the image is uploaded, then calls the uploadimage function to reset-//
//all applied filters, otherwise displaying the appropriate message to the user.//
function doReset() {
  if (imageIsLoaded(image)) {
    uploadimage();
  } else {
    alert("The image is not loaded");
  }
}

//The imageIsLoaded function is called by the makeRed, makeGray, makeWindowpane, makeTransparent and doReset-//
//functions to ensure that the image is uploaded and actually checks if the image variable is not empty?-//
//If the image variable is empty or the loading process has not been completed, it returns false value,-//
//otherwise it returns true value.//
function imageIsLoaded(chackimages) {
  if (chackimages == null || !chackimages.complete()) {
    return false;
  } else {
    return true;
  }
}
