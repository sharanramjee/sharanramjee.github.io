---
title: "A PyTorch Framework for Automatic Modulation Classification"
collection: talks
type: "Research Symposium Talk"
permalink: /talks/surf2018a
venue: "The Summer Undergraduate Research Fellowship (SURF) Symposium"
date: 2018-08-02
location: "West Lafayette, Indiana"
---
[[e-Pubs]](https://docs.lib.purdue.edu/surf/2018/Presentations/77/)
[[PDF]](https://sharanramjee.github.io/files/talks/surf2019a.pdf)
[[Code]](https://github.com/dl4amc/source)
[[Cite]](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C15&q=A+PyTorch+Framework+for+Automatic+Modulation+Classification+using+Deep+Neural+Networks&btnG=#d=gs_cit&u=%2Fscholar%3Fq%3Dinfo%3AisuN6UN81hsJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den)

## Abstract
Automatic modulation classification of wireless signals is an important feature for both military and civilian applications as it contributes to the intelligence capabilities of a wireless signal receiver. Signals that travel in space are usually modulated using different methods. It is important for a receiver or a demodulator of a system to be able to recognize the modulation type of the signal accurately and efficiently. The goal of our research is to use deep learning for the task of automatic modulation classification and fine tune the model parameters to achieve faster run-time. Different deep learning architectures were investigated in previous work such as the Convolutional Neural Network (CNN) and the Convolutional Long Short-Term Memory Dense Neural Network (CLDNN). Our task here is to migrate the existing framework from Theano to PyTorch to be able to better exploit the available multiple Graphics Processing Units (GPUs) for training the neural networks. The new PyTorch framework yielded similar accuracies with faster run speed by utilizing data parallelism across multiple GPUs compared to the original framework developed using Theano. We found – from experiments so far – that the reduction in run time is linearly proportional to the number of GPUs available.
