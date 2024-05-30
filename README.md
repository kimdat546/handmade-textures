# Handmade Textures - README

![Handmade Textures Demo](./assets/handmade_textures_demo.gif)

## Overview

Handmade Textures is a web application that allows users to upload an image, convert it to a canvas drawing that simulates a pencil sketch, and then download the final artwork. This project provides an interactive and engaging way to transform regular images into hand-drawn textures with a few simple steps.

## Features

-   Upload Image: Users can upload their own images.
-   Convert to Canvas: The uploaded image is processed and displayed as a pencil sketch on a canvas.
-   Download Image: Users can download the canvas as an image file.
-   Preloaded Images: The app includes a set of preloaded images for quick demonstration.

## Technology Stack

-   React: For building the user interface.
-   FontFaceObserver: For loading custom fonts.
-   TypeAnimation: For text animation effects.
-   Canvas API: For image processing and drawing.

## Installation

#### 1. Clone the Repository:

```bash
git clone https://github.com/kimdat546/handmade-textures.git
cd handmade-textures
```

#### 2. Install Dependencies:

```bash
npm i
```

#### 3. Start the Development Server:

```bash
npm run dev
```

The application should now be running on http://localhost:5173.

## Usage

### Interface Overview

-   Image Gallery: A set of preloaded images you can choose from to convert into pencil sketches.
-   Upload Button: Allows you to upload your own image.
-   Canvas: Displays the converted pencil sketch.
-   Reset Button: Clears the current canvas and allows you to start over.
-   Download Button: Downloads the current canvas as an image file.

### Steps to Use

#### 1. Select a Preloaded Image or Upload Your Own:

-   Click on any of the preloaded images to use them.
-   Alternatively, click the upload button to upload your own image file.

#### 2. View the Converted Image:

-   Once an image is selected or uploaded, it will be processed and displayed as a pencil sketch on the canvas.

#### 3. Download the Image:

-   Click the download button to save the canvas as an image file.

#### 4. Reset the Canvas:

-   If you want to start over, click the reset button to clear the current image from the canvas.

## Future Enhancements

-   Additional Filters: Add more image processing filters for varied effects.
-   Customizable Text: Allow users to customize the text overlay on the canvas.
-   Mobile Optimization: Improve the user interface for better mobile compatibility.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
