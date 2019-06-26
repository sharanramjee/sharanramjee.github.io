---
title: "Deep Learning for Interference Identification: Band, Training SNR, and Sample Selection"
collection: publications
permalink: /publications/spawc2019
venue: "IEEE Signal Processing Advances in Wireless Communications (SPAWC)"
date: 2019-07-01
citation: 'Xiwen Zhang, Tolunay Zeyfi, Shengtai Ju, Sharan Ramjee, Aly El Gamal, Yonina C. Eldar. “Deep Learning for Interference Identification: Band, Training SNR, and Sample Selection”. IEEE Signal Processing Advances in Wireless Communications (SPAWC), 2019'
---  
[[ArXiv]](https://arxiv.org/abs/1905.08054)
[[PDF]](https://sharanramjee.github.io/files/1905.08054.pdf)
[[Code]](https://github.com/dl4amc/dl4wii)
[[Cite]](https://scholar.googleusercontent.com/scholar.bib?q=info:91r17l37Wc0J:scholar.google.com/&output=citation&scisdr=CgVBXfELEOvukc_gsn8:AAGBfm0AAAAAXRPlqn9bHiyuOXfoFdz6lHBI5NNp-pv0&scisig=AAGBfm0AAAAAXRPlqqoQW14cR3x8iEvkIzfGh3TuKC5T&scisf=4&ct=citation&cd=-1&hl=en&scfhb=1)

## Abstract
We study the problem of interference source identification, through the lens of recognizing one of 15 different channels that belong to 3 different wireless technologies- Bluetooth, Zigbee, and WiFi. We employ deep learning algorithms trained on received samples taken from a 10 MHz band in the 2.4 GHz ISM Band. We obtain a classification accuracy of around 89.5% using any of four different deep neural network architectures- CNN, ResNet, CLDNN, and LSTM, which demonstrate the generality of the effectiveness of deep learning at the considered task. Interestingly, our proposed CNN architecture requires approximately 60% of the training time required by the state of the art while achieving slightly larger classification accuracy. We then focus on the CNN architecture and further optimize its training time while incurring minimal loss in classification accuracy using three different approaches- 1- Band Selection, where we only use samples belonging to the lower and uppermost 2 MHz bands, 2- SNR Selection, where we only use training samples belonging to a single SNR value, and 3- Sample Selection, where we try various sub-Nyquist sampling methods to select the subset of samples most relevant to the classification task. Our results confirm the feasibility of fast deep learning for wireless interference identification, by showing that the training time can be reduced by as much as 30x with minimal loss in accuracy.
