---
title: "Deep Learning for Interference Identification: Band, Training SNR, and Sample Selection"
collection: talks
type: "Conference Proceedings Talk"
permalink: /talks/spawc2019
venue: "IEEE Signal Processing Advances in Wireless Communications (SPAWC)"
date: 2019-07-02
location: "Cannes, France"
---
[[ArXiv]](https://arxiv.org/abs/1901.05850)
[[PDF]](https://sharanramjee.github.io/files/publications/spawc2019.pdf)
[[Presentation]](https://sharanramjee.github.io/files/talks/spawc2019.pdf)
[[Code]](https://github.com/dl4amc/source)
[[Cite]](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C15&q=Deep+learning+for+interference+identification%3A+Band%2C+training+SNR%2C+and+sample+selection&btnG=#d=gs_cit&u=%2Fscholar%3Fq%3Dinfo%3A91r17l37Wc0J%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den)

## Abstract
We study the problem of interference source identification, through the lens of recognizing one of 15 different channels that belong to 3 different wireless technologies: Bluetooth, Zigbee, and WiFi. We employ deep learning algorithms trained on received samples taken from a 10 MHz band in the 2.4 GHz ISM Band. We obtain a classification accuracy of around 89.5% using any of four different deep neural network architectures: CNN, ResNet, CLDNN, and LSTM, which demonstrate the generality of the effectiveness of deep learning at the considered task. Interestingly, our proposed CNN architecture requires approximately 60% of the training time required by the state of the art while achieving slightly larger classification accuracy. We then focus on the CNN architecture and further optimize its training time while incurring minimal loss in classification accuracy using three different approaches: 1- Band Selection, where we only use samples belonging to the lower and uppermost 2 MHz bands, 2- SNR Selection, where we only use training samples belonging to a single SNR value, and 3- Sample Selection, where we try various sub-Nyquist sampling methods to select the subset of samples most relevant to the classification task. Our results confirm the feasibility of fast deep learning for wireless interference identification, by showing that the training time can be reduced by as much as 30x with minimal loss in accuracy.
