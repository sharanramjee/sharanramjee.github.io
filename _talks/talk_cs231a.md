---
title: "Single-Image Stereo Depth Estimation using GANs"
collection: talks
type: "Research Symposium Talk"
permalink: /talks/cs231a
venue: "Stanford University CS 231A: Computer Vision, From 3D Reconstruction to Recognition, 2021"
date: 2021-03-14
location: "Stanford, California"
---
[[Paper]](https://sharanramjee.github.io/files/projects/cs231a.pdf)
[[Presentation]](https://sharanramjee.github.io/files/talks/cs231a.pdf)
[[GitHub]](https://github.com/sharanramjee/single-image-stereo-depth-estimation)

## Abstract
Supervised Deep Learning based monocular methods are among the state-of-the-art methods for estimating depth maps from from single images. However, they still lack in performance in comparison to stereo depth estimation methods that estimate depth maps from stereo image pairs. Unfortunately, due to the complexity of setting up stereo systems, monocular depth estimation methods are still the go-to approach when it comes to depth estimation, despite their inferior performance in comparison to stereo depth estimation methods. We propose a novel pipeline to make use of stereo depth estimation methods through the use of Generative Adversarial Networks (GANs). Our single-image stereo depth estimation pipeline makes use of a GAN (DepthGAN) to generate a "plausible" depth map given a single input image, followed by the generation of a stereo counter-part (depth2stereo) to the original input image given the "plausible" depth map, followed by the use of another GAN (StereoDepthGAN) to generate the final depth map given the stereo image pair. The DepthGAN and StereoDepthGAN, pretrained on the KITTI and Cityscapes datasets and fine-tuned on the NYU Depth V2 dataset, enable our pipeline to outperform current state-of-the-art monocular depth estimation methods, as examined in this paper through our extensive experiments.
