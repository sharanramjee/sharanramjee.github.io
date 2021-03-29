---
title: "Efficient Training of Deep Classifiers for Wireless Source Identification using Test SNR Estimates"
collection: publications
permalink: /publications/wcl2020
venue: "IEEE Wireless Communication Letters (WCL)"
date: 2020-04-01
citation: 'Xingchen Wang, Shengtai Ju, Xiwen Zhang, Sharan Ramjee, Aly El Gamal. “Efficient Training of Deep Classifiers for Wireless Source Identification using Test SNR Estimates”. IEEE Wireless Communication Letters (WCL), Apr. 2020'
---  
[[ArXiv]](https://arxiv.org/abs/1912.11896)
[[PDF]](https://sharanramjee.github.io/files/publications/wcl2020.pdf)
[[Code]](https://github.com/dl4amc/source)
[[Cite]](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C15&q=Efficient+Training+of+Deep+Classifiers+for+Wireless+Source+Identification+using+Test+SNR+Estimates&btnG=#d=gs_cit&u=%2Fscholar%3Fq%3Dinfo%3AWa3G5X02mqAJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den)

## Abstract
We investigate the potential of training time reduction for deep learning algorithms that process received wireless signals, if an accurate test Signal to Noise Ratio (SNR) estimate is available. Our focus is on two tasks that facilitate source identification- 1- Identifying the modulation type, 2- Identifying the wireless technology and channel index in the 2.4 GHZ ISM band. For benchmarking, we rely on a fast growing recent literature on testing deep learning algorithms against two well-known synthetic datasets. We first demonstrate that using training data corresponding only to the test SNR value leads to dramatic reductions in training time - that can reach up to 35x - while incurring a small loss in average test accuracy, as it improves the accuracy for low test SNR values. Further, we show that an erroneous test SNR estimate with a small positive offset is better for training than another having the same error magnitude with a negative offset. Secondly, we introduce a greedy training SNR Boosting algorithm that leads to uniform improvement in test accuracy across all tested SNR values, while using only a small subset of training SNR values at each test SNR. Finally, we discuss, with empirical evidence, the potential of bootstrap aggregating (Bagging) based on training SNR values to improve generalization at low test SNR.
