---
title: "AdaLA: Adapting Gradient Estimation by Looking Ahead"
collection: projects
permalink: /projects/cs361
venue: "Stanford, CA"
---  
[[Paper]](https://sharanramjee.github.io/files/projects/cs361.pdf)
[[GitHub]](https://github.com/sharanramjee/adala-optimizer)

First-order gradient methods used for the optimization of neural networks broadly fall into two categories: stochastic gradient descent (SGD) methods and adaptive learning rate methods. While SGD methods lead to better generalization performance on large datasets, adaptive learning rate methods lead to faster convergence in early training phases. In order to address these issues, Zhuang et al.(1) proposed the AdaBelief optimizer, which adapts the step sizes through the use of an Exponential Moving Average (EMA) of the gradients to quantify the "belief" in the step size to be taken. AdaBelief, however, assumes a smooth parameter space that does not change much in terms of the gradients, which, in turn, justifies the use of the EMA of the gradients to "predict" the next gradients. However, this assumption does not always hold in complex parameter spaces as the gradients could drastically change at every iteration of the optimizer, in which case, the EMA of the gradients is not a good approximation of the next gradients. In order to address this issue, this paper proposes AdaLA: Adaptive Gradient Estimation by Looking Ahead, which is simple modification to AdaBelief that looks ahead to better adapt step sizes. Through extensive experiments, this paper demonstrates that AdaLA leads to better convergence across a variety of Deep Learning tasks, datasets, and models. The implementation of AdaLA can be found on GitHub: https://github.com/sharanramjee/adala-optimizer.
