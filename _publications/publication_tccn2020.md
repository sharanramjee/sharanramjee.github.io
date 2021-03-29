---
title: "Ensemble Wrapper Subsampling for Deep Modulation Classification"
collection: publications
permalink: /publications/tccn2020
venue: "IEEE Transactions on Cognitive Communications and Networking (TCCN)"
date: 2020-05-01
citation: 'Sharan Ramjee, Shengtai Ju, Diyu Yang, Xiaoyu Liu, Aly El Gamal, Yonina C. Eldar. “Ensemble Wrapper Subsampling for Deep Modulation Classification”. Submitted to IEEE Transactions on Cognitive Communications and Networking (TCCN), May. 2020'
---
[[ArXiv]](https://arxiv.org/abs/2005.04586)
[[PDF]](https://sharanramjee.github.io/files/publications/tccn2020.pdf)
[[Code]](https://github.com/dl4amc/dds)

## Abstract
Subsampling of received wireless signals is important for relaxing hardware requirements as well as the computational cost of signal processing algorithms that rely on the output samples. We propose a subsampling technique to facilitate the use of deep learning for automatic modulation classification in wireless communication systems. Unlike traditional approaches that rely on pre-designed strategies that are solely based on expert knowledge, the proposed data-driven subsampling strategy employs deep neural network architectures to simulate the effect of removing candidate combinations of samples from each training input vector, in a manner inspired by how wrapper feature selection models work. The subsampled data is then processed by another deep learning classifier that recognizes each of the considered 10 modulation types. We show that the proposed subsampling strategy not only introduces drastic reduction in the classifier training time, but can also improve the classification accuracy to higher levels than those reached before for the considered dataset. An important feature herein is exploiting the transferability property of deep neural networks to avoid retraining the wrapper models and obtain superior performance through an ensemble of wrappers over that possible through solely relying on any of them.
