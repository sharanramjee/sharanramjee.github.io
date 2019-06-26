---
title: "A PyTorch Framework for Automatic Modulation Classification"
collection: talks
type: "Research Symposium Talk"
permalink: /talks/surf2019a
venue: "The Summer Undergraduate Research Fellowship (SURF) Symposium"
date: 2018-08-02
location: "West Lafayette, Indiana"
---

In this work, we investigate the application of Principal Component Analysis to the task of wireless signal modulation recognition using deep neural network architectures. Sampling signals at the Nyquist rate, which is often very high, requires a large amount of energy and space to collect and store the samples. Moreover, the time taken to train neural networks for the task of modulation classification is large due to the large number of samples. These problems can be drastically reduced using Principal Component Analysis, which is a technique that allows us to reduce the dimensionality or number of features of the samples used for training the neural networks. We used a framework for generating a dataset using GNU radio that mimics the imperfections in a real wireless channel and uses 10 different types of modulations with 128 sampling points where samples are collected at the Nyquist rate. The code implements Principal Component Analysis to reduce the number of features of the samples. We found that using the dataset that uses samples collected at Sub-Nyquist rates obtained using Principal Component Analysis requires drastically lower time to train the neural networks as compared to the time required to train the neural networks with a data set that uses samples collected at the Nyquist rate. Furthermore, the space required for the storage of the samples is also reduced after the application of Principal Component Analysis to the dataset.
