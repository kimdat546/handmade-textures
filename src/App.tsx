import FontFaceObserver from "fontfaceobserver";
import { useEffect, useRef, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { HiOutlineUpload } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import { TypeAnimation } from "react-type-animation";

type ImageType = {
    href: string;
    whiteThreshold: number;
};

const Images: ImageType[] = [
    {
        href: "./cute-girl-drawing-52.jpg",
        whiteThreshold: 200,
    },
    {
        href: "./Royalty-Free-Images-Argonaut-GraphicsFairy21.jpg",
        whiteThreshold: 200,
    },
    {
        href: "./il_1588xN.2334800953_lwbq.webp",
        whiteThreshold: 200,
    },
    {
        href: "./face-drawing-colored.jpg",
        whiteThreshold: 200,
    },
    {
        href: "./indian-skull.jpg",
        whiteThreshold: 200,
    },
];

function App() {
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageChange = (item: ImageType) => {
        setSelectedImage(item);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const image = new Image();
                image.src = e.target.result as string;
                image.onload = () => {
                    setSelectedImage({
                        href: image.src,
                        whiteThreshold: 200,
                    });
                };
            }
        };
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        setSelectedImage(null);
    };

    const downloadImage = (canvas: HTMLCanvasElement) => {
        const link = document.createElement("a");
        link.download = "handmade-texture-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const newCanvas = document.createElement("canvas");
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const ctx = newCanvas.getContext("2d") as CanvasRenderingContext2D;
        const img = new Image();
        img.src = "./white-paper-texture-with-flecks.jpg";
        img.onload = () => {
            ctx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
            downloadImage(newCanvas);
        };
    };

    useEffect(() => {
        if (selectedImage === null) {
            return;
        }
        const img = new Image();
        img.src = selectedImage.href;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const font = new FontFaceObserver("Reenie Beanie");

            font.load().then(() => {
                const canvas = canvasRef.current;
                if (!canvas) {
                    return;
                }
                const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
                const w = window.innerWidth;
                const h = window.innerHeight;
                const aspectRatio = img.width / img.height;

                if (img.width > w || img.height > h) {
                    if (aspectRatio > w / h) {
                        canvas.width = w;
                        canvas.height = w / aspectRatio;
                    } else {
                        canvas.width = h * aspectRatio;
                        canvas.height = h;
                    }
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const pixels = imageData.data;

                const whiteThreshold = selectedImage?.whiteThreshold || 200;

                for (let i = 0; i < pixels.length; i += 4) {
                    const brightness =
                        0.2126 * pixels[i] +
                        0.7152 * pixels[i + 1] +
                        0.0722 * pixels[i + 2];
                    if (brightness > whiteThreshold) {
                        pixels[i + 3] = 0;
                    } else {
                        pixels[i + 3] *= 0.9;
                    }
                }

                ctx.putImageData(imageData, 0, 0);

                ctx.font = `40px 'Reenie Beanie'`;
                ctx.fillStyle = "rgba(0,0,0,0.6)";
                ctx.fillText(
                    "Make it by your hand",
                    canvas.width - 300,
                    canvas.height - 130
                );
            });
        };
    }, [selectedImage]);

    return (
        <div className="container">
            {!selectedImage ? (
                <div className="wrapper">
                    <TypeAnimation
                        sequence={[
                            "Handmade Texture Images\nby Your Hand",
                            1000, // Waits 1s
                            "Handmade Texture Images\nby Your Images",
                            2000, // Waits 2s
                            "Handmade Texture Images\nby Me",
                            3000,
                        ]}
                        className="title"
                        wrapper="h2"
                        cursor={true}
                        repeat={Infinity}
                        speed={25}
                    />
                    <div className="images">
                        {Images.map((image, index) => (
                            <div
                                key={index}
                                role="button"
                                onClick={() => handleImageChange(image)}
                            >
                                <img
                                    className="image"
                                    src={image.href}
                                    alt={`image-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <label htmlFor="file" className="custom-file-upload">
                        <div className="custom-file-upload-label">
                            <HiOutlineUpload fontSize={24} />
                            Upload your own image
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-file"
                            id="file"
                            onChange={handleOnChange}
                        />
                    </label>
                </div>
            ) : (
                <div className="wrapper">
                    <canvas ref={canvasRef}></canvas>
                    <div className="images">
                        <button onClick={handleReset} className="reset-button">
                            <FiRefreshCw fontSize={24} />
                            Reset
                        </button>
                        <button
                            onClick={handleDownload}
                            className="reset-button"
                        >
                            <LuDownload fontSize={24} />
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
