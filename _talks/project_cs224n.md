---
title: "Aspect-Target Sentiment Classification for Cyberbullying Detection"
collection: projects
permalink: /projects/cs224n
venue: "Stanford, CA"
---  
[[Paper]](https://sharanramjee.github.io/files/projects/cs224n.pdf)
[[GitHub]](https://github.com/sharanramjee/cyberbullying-atsc)

Cyberbullying detection is a challenging task to tackle, given the complex nature of the problem and the lack of Natural Language Processing (NLP) literature when it comes to addressing this issue. For a piece of text to be considered as cyberbullying, it not only has to be associated with a negative sentiment, but must also be targeted. This motivates the use of Aspect-Target Sentiment Classification (ATSC), which evaluates the sentiment of a given piece with respect to an aspect-target in the text. In particular, we make use of the BERT-ADA transformer architecture, fine-tuned on the hatespeech-twitter dataset, to demonstrate its superior ability in detecting cyberbullying in comparison to other state-of-the-art sentiment analysis baselines. Additionally, we make use of Named Entity Recognition (NER) in order to extract aspect-targets from tweets that do not explicitly "@" username handles of other users.
