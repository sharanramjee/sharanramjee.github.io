---
title: "FLITE: Focusing LITE for Memory-Efficient Meta Learning"
collection: talks
type: "Research Symposium Talk"
permalink: /talks/cs330
venue: "Stanford University CS 330: Deep Multi-Task and Meta Learning, 2021"
date: 2021-12-01
location: "Stanford, California"
---
[[Paper]](https://sharanramjee.github.io/files/projects/cs330.pdf)
[[Presentation]](https://sharanramjee.github.io/files/talks/cs330.pdf)
[[GitHub]](https://github.com/SConsul/FLITE)

## Abstract
Object recognition has received a lot of attention from the research community in the past decade, with tremendous developments that have enabled a plethora of real-world applications. However, these object recognition models predominantly still rely on many high-quality training examples per object category. In real-world settings, videos and images of objects can be taken in settings where the target object may be placed in a cluttered environment, occluded by other objects, or not ideally positioned and framed.

Few-shot learning research has been driven in the past mostly by benchmark datasets that lack the high variation that these applications will face when deployed in the real-world. We investigate the ORBIT dataset that is composed of videos taken by blind/low-vision users. The ORBIT [1] dataset and benchmark was introduced in order to close this gap, with the specific focus of developing real-world applications using teachable object recognizers for people with impaired vision. Meta-learning has shown remarkable success in such few-shot classification tasks. However, this performance comes at the cost of them being memory intensive to train.

Large Image and Task Episodic (LITE) [2] is a training scheme that addresses this limitation by obtaining an unbiased estimate of the gradients by computing the gradient on a random subset of the support set. A limitation of LITE is that it fails to achieve optimal results when classifying objects in a cluttered setting. To address this limitation, we propose FLITE, an improvement to LITE by focusing the object classification task through selective backpropagation heuristics and inclusion of bounding box information. We conduct biased subsampling of the support set for backpropagation through blur and bounding box heuristics and use forced attention and object detection to focus the model on the target object. The base our approach on a CNAPs [3] and ProtoNet [4] model with an EfficientNet-B0 [5] backbone.


To address issues caused by the cluttered settings of the images, we use forced attention and object detection approaches. This was inspired by work in areas of image segmentation [6] and multi-headed object detection and classification [7]. We conduct forced attention through using the provided ground-truth bounding boxes to black out the parts of the image not in the bounding boxes. These masked images are applied in two ways: only on the support set during meta-training and only on the query set during meta-training. Forced attention failed to improve accuracies over our cluttered ProtoNet baseline. Masking the query set images led to performance gains over masking the support set images but resulted in slightly lower accuracies compared to the baseline. We experiment with using a multi-headed approach for object detection and classification, and we add an object detection head alongside the classification head and generate an auxiliary loss (sum of both object detection and classification losses) to back-propagate on. Performing object detection did lead to slight performance gains over using forced attention on the support and query set results. However, compared to the baseline the frame and video accuracies decreased marginally.

Inspired by work in the area of sample filtering for gradient estimation [8], we apply blur and bounding box size heuristics for backpropagation subsampling selection. The blurriness of an image is computed using the variance of the laplacian, and we take the three heuristics of the top k least blurry, most blurry, and median blurry images. All three blurry heuristics (least, most, and median) on the cluttered support set led to gains over the baseline. Using the median blur heuristic led to better performance compared to least and most blurry heuristics. For the bounding box size heuristic, we took the top k largest, smallest, and median sized bounding boxes. Using the median bounding box heuristic led to an 0.79% increase in frame accuracy and 2.20% increase in video accuracy. The biggest bbox heuristic led to a decrease of 1.77 frames in the number of frames-to-recognition.

Our approach outperforms the baseline cluttered image object classification results. We evaluate our proposed modifications on the ORBIT dataset, where the video clips are cluttered with other objects and observe a 2.2% gain in video accuracy compared to LITE.

The code used for our experiments is available here: https://github.com/SConsul/FLITE/.
