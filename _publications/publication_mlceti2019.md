---
title: "Fast Deep Learning for Automatic Modulation Classification"
collection: publications
permalink: /publications/mlceti2019
venue: "IEEE Machine Learning for Communications Emerging Technologies Initiatives (MLCETI)"
date: 2019-01-01
citation: 'Sharan Ramjee, Shengtai Ju, Diyu Yang, Xiaoyu Liu, Aly El Gamal, Yonina C. Eldar. “Fast Deep Learning for Automatic Modulation Classification”.
IEEE Machine Learning for Communications Emerging Technologies Initiatives (MLCETI), Jan. 2019'
---  
[[ArXiv]](https://arxiv.org/abs/1901.05850)
[[PDF]](https://sharanramjee.github.io/files/publications/mlceti2019.pdf)
[[Code]](https://github.com/dl4amc/source)
[[Cite]](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C15&q=Fast+deep+learning+for+automatic+modulation+classification&btnG=#d=gs_cit&u=%2Fscholar%3Fq%3Dinfo%3A_eXCgQPyV1oJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den)

## Abstract
In this work, we investigate the feasibility and effectiveness of employing deep learning algorithms for automatic recognition of the modulation type of received wireless communication signals from subsampled data. Recent work considered a GNU radio-based data set that mimics the imperfections in a real wireless channel and uses 10 different modulation types. A Convolutional Neural Network (CNN) architecture was then developed and shown to achieve performance that exceeds that of expert-based approaches. Here, we continue this line of work and investigate deep neural network architectures that deliver high classification accuracy. We identify three architectures - namely, a Convolutional Long Short-term Deep Neural Network (CLDNN), a Long Short-Term Memory neural network (LSTM), and a deep Residual Network (ResNet) - that lead to typical classification accuracy values around 90% at high SNR. We then study algorithms to reduce the training time by minimizing the size of the training data set, while incurring a minimal loss in classification accuracy. To this end, we demonstrate the performance of Principal Component Analysis in significantly reducing the training time, while maintaining good performance at low SNR. We also investigate subsampling techniques that further reduce the training time, and pave the way for online classification at high SNR. Finally, we identify representative SNR values for training each of the candidate architectures, and consequently, realize drastic reductions of the training time, with negligible loss in classification accuracy.
