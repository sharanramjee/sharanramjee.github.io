---
title: "A Machine Learning Driven Analysis of Private Equity Funding in Seed-Stage Healthcare Startups"
collection: projects
permalink: /projects/gene225
venue: "Stanford, CA"
---  
[[Paper]](https://sharanramjee.github.io/files/projects/gene225.pdf)
[[Presentation]](https://sharanramjee.github.io/files/talks/gene225.pdf)
[[GitHub]](https://github.com/sharanramjee/healthcare-vc-shap)

The seed funding is the first official equity funding stage for startups and arguably the most crucial for those in the healthcare space given the high barriers to entry that they face. Private equity plays a pivotal role in funding healthcare startups, especially in the seed-stage to get them off the ground. However, there is not much information in literature regarding the factors driving their investments due to risk of exposing their play-books to competitors. This paper proposes a novel Machine Learning driven approach to analyzing and evaluating these factors. Our analysis will make use of investment data from Crunchbase pertaining to seed-stage healthcare startups headquartered in the United States to train Gradient Boosted Decision Trees, which are human-interpretable Machine Learning models. SHapley Additive exPlanations, which is a technique for probing such Machine Learning models, will then be applied to the trained Gradient Boosted Decision Trees both at a global scale (top and bottom 100 companies by total funding raised) and at a local scale (top and bottom 3 companies by total funding raised) to reveal insights into the factors that drove private equity investments at these companies. The code is available on GitHub: https://github.com/sharanramjee/healthcare-vc-shap.
