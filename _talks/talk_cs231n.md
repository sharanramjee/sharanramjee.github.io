---
title: "Context-Aware Skeleton-based Action Recognition via Spatial and Temporal Transformer Networks"
collection: talks
type: "Research Symposium Talk"
permalink: /talks/cs231n
venue: "Stanford University CS 231N: Convolutional Neural Networks for Visual Recognition, 2021"
date: 2021-06-04
location: "Stanford, California"
---
[[Paper]](https://sharanramjee.github.io/files/projects/cs231n.pdf)
[[Presentation]](https://sharanramjee.github.io/files/talks/cs231n.pdf)
[[GitHub]](https://github.com/sharanramjee/st-ctr)

## Abstract
Human action recognition is an important task in video understanding, with applications ranging from robotics to autonomous driving. Among the variety of approaches, Graph Learning based human action recognition has become extremely popular for its ability to simultaneously learn spatial and temporal patterns from data, in addition to its greater expressive power and stronger generalization capability in comparison to other methods. In particular, Spatial Temporal Graph Convolution Networks (ST-GCN) [1] use a set of spatial and temporal graph convolutions on the human skeleton sequences in order to achieve state-of-the-art performance on the NTU RGB+D 60 dataset, which is the largest in-house captured benchmark for 3D human action recognition. Nevertheless, an effective encoding of the latent information underlying the 3D skeleton is still an open problem, especially when it comes to extracting effective information from joint motion patterns and incorporating contextual information from the video frames. In this paper, we propose a novel Spatial-Temporal Context-aware Transformer Network (ST-CTR), which models dependencies between joints using the Transformer self-attention operator while incorporating contextual information from the human action recognition video frames. Through our extensive experiments, we demonstrate the improved action recognition performance of ST-CTR on the NTU RGB+D 60 dataset in comparison to other state-of-the-art human action recognition methods. The source code is available on GitHub: https://github.com/sharanramjee/st-ctr.
