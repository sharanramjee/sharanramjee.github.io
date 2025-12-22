/**
 * Code Background
 * Floating code snippets on parchment that move with parallax scrolling
 */

(function() {
  'use strict';

  const codeSnippets = [
    `def attention(Q, K, V):
    scores = Q @ K.T / sqrt(d_k)
    weights = softmax(scores)
    return weights @ V`,

    `class Transformer:
    def forward(self, x):
        x = self.attention(x)
        return self.ffn(x)`,

    `for epoch in range(epochs):
    loss = model(x, y)
    loss.backward()
    optimizer.step()`,

    `model = nn.Sequential(
    nn.Linear(768, 512),
    nn.ReLU(),
    nn.Dropout(0.1),
    nn.Linear(512, 10)
)`,

    `def softmax(x):
    e_x = np.exp(x - max(x))
    return e_x / e_x.sum()`,

    `Q = W_q @ embeddings
K = W_k @ embeddings
V = W_v @ embeddings`,

    `loss = -sum(y * log(y_hat)) / N`,

    `hidden = tanh(W_h @ x + b_h)
output = sigmoid(W_o @ hidden)`,

    `for layer in layers:
    x = layer(x)
    x = dropout(x, p=0.1)`,

    `dL_dw = dL_dy * dy_dw
w -= learning_rate * dL_dw`,

    `def forward(self, x):
    residual = x
    x = self.norm(x)
    x = self.attn(x)
    return x + residual`,

    `PE[pos, 2i] = sin(pos / 10000^(2i/d))
PE[pos, 2i+1] = cos(pos / 10000^(2i/d))`,

    `optimizer = Adam(
    model.parameters(),
    lr=3e-4,
    betas=(0.9, 0.999)
)`,

    `def forward(self, x, h, c):
    gates = self.linear(x, h)
    i, f, g, o = gates.chunk(4)
    c = f * c + i * tanh(g)
    h = o * tanh(c)
    return h, c`,

    `for step in range(max_len):
    probs = model(tokens)
    topk = probs.topk(beam_width)
    candidates.extend(topk)`,

    `def gelu(x):
    return 0.5 * x * (1 + tanh(
        sqrt(2/pi) * (x + 0.044715 * x**3)
    ))`,

    `mean = x.mean(dim=-1)
var = x.var(dim=-1)
return (x - mean) / sqrt(var + eps)`,

    `embeddings = nn.Embedding(
    vocab_size=50257,
    embedding_dim=768
)`,

    `D_KL = sum(P(x) * log(P(x) / Q(x)))`,

    `class MultiHeadAttention:
    def __init__(self, d_model, n_heads):
        self.d_k = d_model // n_heads
        self.heads = n_heads`,

    `logits = model(input_ids)
loss = F.cross_entropy(logits, labels)`,

    `with torch.no_grad():
    output = model.generate(
        input_ids,
        max_length=512,
        temperature=0.7
    )`,

    `def rope(x, pos):
    freqs = 1.0 / (10000 ** (i / dim))
    return x * cos(pos * freqs) +
           rotate(x) * sin(pos * freqs)`,

    `class GPT(nn.Module):
    def __init__(self, config):
        self.wte = nn.Embedding(vocab, d_model)
        self.wpe = nn.Embedding(ctx_len, d_model)
        self.blocks = nn.ModuleList([
            Block(config) for _ in range(n_layers)
        ])`,

    `def top_p_sampling(logits, p=0.9):
    sorted_logits = torch.sort(logits)
    cumsum = torch.cumsum(softmax(sorted_logits))
    mask = cumsum < p
    return sample(logits[mask])`,

    `kv_cache[layer] = torch.cat([
    kv_cache[layer],
    new_kv
], dim=1)`,

    `class LoRA(nn.Module):
    def __init__(self, d, r=8):
        self.A = nn.Linear(d, r, bias=False)
        self.B = nn.Linear(r, d, bias=False)
    def forward(self, x):
        return self.B(self.A(x))`,

    `flash_attn = F.scaled_dot_product_attention(
    Q, K, V,
    is_causal=True
)`,

    `loss_actor = -min(
    ratio * advantage,
    clip(ratio, 1-eps, 1+eps) * advantage
)`,

    `rewards = reward_model(responses)
advantages = rewards - baseline
policy_loss = -log_probs * advantages`,

    `def swiglu(x):
    x1, x2 = x.chunk(2, dim=-1)
    return F.silu(x1) * x2`,

    `class RMSNorm(nn.Module):
    def forward(self, x):
        rms = sqrt(mean(x ** 2) + eps)
        return x / rms * self.weight`,

    `q = q.view(B, T, n_heads, d_k).transpose(1, 2)
k = k.view(B, T, n_heads, d_k).transpose(1, 2)
v = v.view(B, T, n_heads, d_k).transpose(1, 2)`,

    `mask = torch.triu(
    torch.ones(T, T), diagonal=1
).bool()
scores.masked_fill_(mask, float('-inf'))`,

    `Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V`,

    `L = -∑ yᵢ log(ŷᵢ)`,

    `σ(x) = 1 / (1 + e⁻ˣ)`,

    `∇θJ(θ) = 𝔼[∇θ log π(a|s) · R]`,

    `p(x) = ∫ p(x|z) p(z) dz`,

    `ELBO = 𝔼[log p(x|z)] - KL(q(z|x) || p(z))`,

    `hₜ = tanh(Wₓₕxₜ + Wₕₕhₜ₋₁ + b)`,

    `P(y|x) = softmax(Wx + b)`,

    `θ ← θ - α∇θL(θ)`,

    `f(x) = max(0, x)`,

    `H(p,q) = -∑ p(x) log q(x)`,

    `z = μ + σ · ε`,

    `∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w`,

    `BatchNorm(x) = γ(x-μ)/σ + β`,

    `cos_sim(a,b) = a·b / (‖a‖‖b‖)`,

    `ℒ_InfoNCE = -log(exp(q·k⁺/τ) / ∑exp(q·kᵢ/τ))`,

    `ℒ_DPO = -log σ(β(log π/πref(yw) - log π/πref(yl)))`,

    `r(x,y) = β log(π(y|x) / πref(y|x))`,

    `MultiHead(Q,K,V) = Concat(head₁,...,headₕ)Wᴼ`,

    `FFN(x) = max(0, xW₁ + b₁)W₂ + b₂`,

    `LayerNorm(x) = α ⊙ (x-μ)/√(σ²+ε) + β`,

    `Lᴄᴇ = -∑ᵢ tᵢ log(pᵢ)`,

    `Adam: mₜ = β₁mₜ₋₁ + (1-β₁)gₜ`,

    `vₜ = β₂vₜ₋₁ + (1-β₂)gₜ²`,

    `θₜ = θₜ₋₁ - α·m̂ₜ/(√v̂ₜ + ε)`,

    `GAN: min_G max_D 𝔼[log D(x)] + 𝔼[log(1-D(G(z)))]`,

    `VAE: ℒ = -𝔼_q[log p(x|z)] + KL(q(z|x) ‖ p(z))`,

    `Bellman: Q(s,a) = r + γ max_a' Q(s',a')`,

    `PPO: ℒᶜˡⁱᵖ = 𝔼[min(rₜ(θ)Âₜ, clip(rₜ(θ))Âₜ)]`,

    `Contrastive: ℒ = -log(exp(zᵢ·zⱼ/τ) / ∑exp(zᵢ·zₖ/τ))`,

    `SwiGLU(x) = Swish(xW) ⊗ (xV)`,

    `RoPE: q' = q·cos(mθ) + rotate(q)·sin(mθ)`,

    `FlashAttn: O(N) memory via tiling`,

    `GQA: n_kv_heads < n_q_heads`,

    `MoE: y = ∑ᵢ G(x)ᵢ · Eᵢ(x)`,

    `LoRA: W' = W + BA, B∈ℝᵈˣʳ, A∈ℝʳˣᵏ`,

    `∇_x ℒ = ∂ℒ/∂y · ∂y/∂x`,

    `softmax(xᵢ) = exp(xᵢ) / ∑ⱼ exp(xⱼ)`,

    `tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)`,

    `GELU(x) = x · Φ(x)`,

    `DropPath(x) = x / (1 - p)`,

    `CE(p,q) = H(p) + KL(p‖q)`,

    `class Attention(nn.Module):
    def forward(self, x):
        qkv = self.qkv(x)
        q, k, v = qkv.chunk(3, dim=-1)
        attn = (q @ k.transpose(-2, -1)) * self.scale
        return self.proj(attn.softmax(dim=-1) @ v)`,

    `def train_step(batch):
    optimizer.zero_grad()
    loss = compute_loss(model, batch)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()
    return loss.item()`,

    `scheduler = CosineAnnealingLR(
    optimizer,
    T_max=num_epochs,
    eta_min=1e-6
)`,

    `def compute_metrics(pred, labels):
    accuracy = (pred.argmax(-1) == labels).float().mean()
    return {"accuracy": accuracy}`,

    `class FeedForward(nn.Module):
    def __init__(self, d_model, d_ff):
        self.w1 = nn.Linear(d_model, d_ff)
        self.w2 = nn.Linear(d_ff, d_model)
    def forward(self, x):
        return self.w2(F.gelu(self.w1(x)))`,

    `hidden_states = self.embed_tokens(input_ids)
for layer in self.layers:
    hidden_states = layer(hidden_states, attention_mask)
return self.norm(hidden_states)`,

    `class SinusoidalPE(nn.Module):
    def forward(self, x):
        pe = torch.zeros(seq_len, d_model)
        pos = torch.arange(seq_len).unsqueeze(1)
        div = torch.exp(-math.log(10000) * torch.arange(0, d_model, 2) / d_model)
        pe[:, 0::2] = torch.sin(pos * div)
        pe[:, 1::2] = torch.cos(pos * div)
        return x + pe`,

    `def nucleus_sampling(logits, p=0.95):
    sorted_logits, sorted_idx = torch.sort(logits, descending=True)
    cumsum = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)
    sorted_idx_to_remove = cumsum > p
    sorted_logits[sorted_idx_to_remove] = float('-inf')
    return torch.multinomial(F.softmax(sorted_logits, dim=-1), 1)`,

    `class MLP(nn.Module):
    def __init__(self, config):
        self.gate_proj = nn.Linear(config.hidden_size, config.intermediate_size)
        self.up_proj = nn.Linear(config.hidden_size, config.intermediate_size)
        self.down_proj = nn.Linear(config.intermediate_size, config.hidden_size)
    def forward(self, x):
        return self.down_proj(F.silu(self.gate_proj(x)) * self.up_proj(x))`,

    `def generate(self, input_ids, max_new_tokens):
    for _ in range(max_new_tokens):
        logits = self(input_ids)[:, -1, :]
        next_token = torch.argmax(logits, dim=-1, keepdim=True)
        input_ids = torch.cat([input_ids, next_token], dim=1)
    return input_ids`,

    `loss_fn = nn.CrossEntropyLoss(ignore_index=pad_token_id)
logits = model(input_ids).view(-1, vocab_size)
labels = labels.view(-1)
loss = loss_fn(logits, labels)`,

    `class RotaryEmbedding(nn.Module):
    def __init__(self, dim, max_seq_len=2048):
        inv_freq = 1.0 / (10000 ** (torch.arange(0, dim, 2) / dim))
        t = torch.arange(max_seq_len)
        freqs = torch.einsum('i,j->ij', t, inv_freq)
        self.cos_cached = freqs.cos()
        self.sin_cached = freqs.sin()`,

    `def apply_rotary_pos_emb(q, k, cos, sin):
    q_embed = (q * cos) + (rotate_half(q) * sin)
    k_embed = (k * cos) + (rotate_half(k) * sin)
    return q_embed, k_embed`,

    `class GroupedQueryAttention(nn.Module):
    def __init__(self, d_model, n_heads, n_kv_heads):
        self.n_rep = n_heads // n_kv_heads
        self.q_proj = nn.Linear(d_model, n_heads * head_dim)
        self.k_proj = nn.Linear(d_model, n_kv_heads * head_dim)
        self.v_proj = nn.Linear(d_model, n_kv_heads * head_dim)`,

    `def repeat_kv(x, n_rep):
    if n_rep == 1:
        return x
    return x.unsqueeze(2).expand(-1, -1, n_rep, -1, -1).reshape(bs, seq_len, n_heads, head_dim)`,

    `class MoELayer(nn.Module):
    def forward(self, x):
        router_logits = self.gate(x)
        routing_weights = F.softmax(router_logits, dim=-1)
        topk_weights, topk_indices = torch.topk(routing_weights, self.top_k)
        output = sum(w * self.experts[i](x) for w, i in zip(topk_weights, topk_indices))
        return output`,

    `def contrastive_loss(z1, z2, temperature=0.5):
    z1 = F.normalize(z1, dim=-1)
    z2 = F.normalize(z2, dim=-1)
    logits = z1 @ z2.T / temperature
    labels = torch.arange(len(z1))
    return F.cross_entropy(logits, labels)`,

    `class VAE(nn.Module):
    def forward(self, x):
        mu, logvar = self.encoder(x).chunk(2, dim=-1)
        std = torch.exp(0.5 * logvar)
        z = mu + std * torch.randn_like(std)
        return self.decoder(z), mu, logvar`,

    `def vae_loss(recon_x, x, mu, logvar):
    recon_loss = F.binary_cross_entropy(recon_x, x, reduction='sum')
    kl_loss = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    return recon_loss + kl_loss`,

    `class Discriminator(nn.Module):
    def forward(self, x):
        x = F.leaky_relu(self.conv1(x), 0.2)
        x = F.leaky_relu(self.conv2(x), 0.2)
        return torch.sigmoid(self.fc(x.flatten(1)))`,

    `def gan_loss(real_output, fake_output):
    real_loss = F.binary_cross_entropy(real_output, torch.ones_like(real_output))
    fake_loss = F.binary_cross_entropy(fake_output, torch.zeros_like(fake_output))
    return real_loss + fake_loss`,

    `class DiffusionModel(nn.Module):
    def forward(self, x, t):
        t_emb = self.time_embed(t)
        return self.unet(x, t_emb)`,

    `def ddpm_sample(model, shape, num_steps=1000):
    x = torch.randn(shape)
    for t in reversed(range(num_steps)):
        noise_pred = model(x, t)
        x = (x - beta[t] * noise_pred) / sqrt(alpha[t])
        if t > 0:
            x += sqrt(beta[t]) * torch.randn_like(x)
    return x`,

    `class CLIP(nn.Module):
    def forward(self, images, texts):
        image_features = self.encode_image(images)
        text_features = self.encode_text(texts)
        return image_features @ text_features.T * self.logit_scale.exp()`,

    `def reward_model_loss(chosen, rejected):
    chosen_rewards = reward_model(chosen)
    rejected_rewards = reward_model(rejected)
    return -F.logsigmoid(chosen_rewards - rejected_rewards).mean()`,

    `def dpo_loss(policy_chosen_logps, policy_rejected_logps, ref_chosen_logps, ref_rejected_logps, beta=0.1):
    chosen_rewards = beta * (policy_chosen_logps - ref_chosen_logps)
    rejected_rewards = beta * (policy_rejected_logps - ref_rejected_logps)
    return -F.logsigmoid(chosen_rewards - rejected_rewards).mean()`,

    `class QNetwork(nn.Module):
    def forward(self, state):
        x = F.relu(self.fc1(state))
        x = F.relu(self.fc2(x))
        return self.fc3(x)`,

    `def dqn_loss(q_values, target_q_values, actions, rewards, dones, gamma=0.99):
    q_value = q_values.gather(1, actions)
    target = rewards + gamma * target_q_values.max(1)[0] * (1 - dones)
    return F.mse_loss(q_value, target.unsqueeze(1))`,

    `def ppo_loss(old_log_probs, new_log_probs, advantages, clip_eps=0.2):
    ratio = torch.exp(new_log_probs - old_log_probs)
    clipped_ratio = torch.clamp(ratio, 1 - clip_eps, 1 + clip_eps)
    return -torch.min(ratio * advantages, clipped_ratio * advantages).mean()`,

    `Transformer: y = softmax(QKᵀ/√d)V`,

    `Cross-Entropy: H(p,q) = -∑ p(x)log q(x)`,

    `KL Divergence: D_KL(P‖Q) = ∑ P(x)log(P(x)/Q(x))`,

    `Jensen-Shannon: JS(P‖Q) = ½KL(P‖M) + ½KL(Q‖M)`,

    `Wasserstein: W(P,Q) = inf 𝔼[‖x-y‖]`,

    `Mutual Info: I(X;Y) = H(X) - H(X|Y)`,

    `Entropy: H(X) = -∑ p(x)log p(x)`,

    `Bayes: P(θ|D) = P(D|θ)P(θ) / P(D)`,

    `MLE: θ* = argmax ∏ p(xᵢ|θ)`,

    `MAP: θ* = argmax P(D|θ)P(θ)`,

    `SGD: θₜ₊₁ = θₜ - η∇L(θₜ)`,

    `Momentum: vₜ = γvₜ₋₁ + η∇L(θₜ)`,

    `RMSprop: θₜ₊₁ = θₜ - η/√(vₜ+ε) · gₜ`,

    `AdaGrad: θₜ₊₁ = θₜ - η/√(Gₜ+ε) · gₜ`,

    `LAMB: rₜ = ‖θₜ‖ / ‖Adam_update‖`,

    `Weight Decay: L' = L + λ‖θ‖²`,

    `Dropout: y = x · mask / (1-p)`,

    `LayerDrop: skip layer with prob p`,

    `Attention: αᵢⱼ = exp(eᵢⱼ) / ∑ₖexp(eᵢₖ)`,

    `Scaled Dot-Product: eᵢⱼ = qᵢᵀkⱼ / √dₖ`,

    `Additive Attention: eᵢⱼ = vᵀtanh(Wq + Uk)`,

    `Linear Attention: Attention = φ(Q)φ(K)ᵀV`,

    `Sparse Attention: attend to fixed pattern`,

    `Sliding Window: attend to local context`,

    `ALiBi: softmax(QKᵀ - m|i-j|)`,

    `NTK-aware scaling: θ' = θ · s^(d/(d-2))`,

    `YaRN: NTK + temperature scaling`,

    `Chinchilla: N_opt ∝ C^0.5, D_opt ∝ C^0.5`,

    `Scaling Law: L(N) = (Nₒ/N)^α`,

    `Perplexity: PPL = exp(H(p,q))`,

    `BLEU = BP · exp(∑ wₙ log pₙ)`,

    `ROUGE-L: F = (1+β²)PR / (R+β²P)`,

    `BERTScore: F = 2PR / (P+R)`,

    `F1 = 2 · precision · recall / (precision + recall)`,

    `AUC = ∫ TPR d(FPR)`,

    `IoU = |A ∩ B| / |A ∪ B|`,

    `Dice = 2|A ∩ B| / (|A| + |B|)`,

    `FID = ‖μᵣ - μₒ‖² + Tr(Σᵣ + Σₒ - 2√(ΣᵣΣₒ))`,

    `LPIPS = ∑ wₗ · ‖φₗ(x) - φₗ(x̂)‖²`,

    `CLIP Score = cos(CLIP(image), CLIP(text))`,

    `R-precision = |relevant ∩ retrieved| / |retrieved|`,

    `NDCG = DCG / IDCG`,

    `MAP = ∑ AP(q) / |Q|`,

    `MRR = 1/|Q| ∑ 1/rankᵢ`,

    `UCB: aₜ = argmax[Q(a) + c√(ln t / Nₜ(a))]`,

    `Thompson: sample θ ~ P(θ|D), act greedily`,

    `ε-greedy: explore with prob ε`,

    `A* = g(n) + h(n)`,

    `MCTS: UCT = wᵢ/nᵢ + c√(ln N/nᵢ)`,

    `TD(0): V(s) ← V(s) + α[r + γV(s') - V(s)]`,

    `Q-learning: Q(s,a) ← Q(s,a) + α[r + γmax Q(s',a') - Q(s,a)]`,

    `SARSA: Q(s,a) ← Q(s,a) + α[r + γQ(s',a') - Q(s,a)]`,

    `Actor-Critic: ∇J = 𝔼[∇log π(a|s) · A(s,a)]`,

    `GAE: Â = ∑ (γλ)ˡ δₜ₊ₗ`,

    `V-trace: vₛ = V(s) + ∑ γⁱ(∏ cⱼ)δᵢ`,

    `IMPALA: off-policy actor-critic`,

    `SAC: J = 𝔼[Q(s,a) - α log π(a|s)]`,

    `TD3: twin delayed deep deterministic`,

    `DDPG: μ(s) = argmax Q(s,a)`,

    `Rainbow = DQN + PER + Dueling + NoisyNet + C51 + n-step`
  ];

  class CodeBackground {
    constructor() {
      this.container = null;
      this.snippets = [];
      this.scrollY = 0;
      this.ticking = false;

      this.init();
    }

    init() {
      this.createContainer();
      this.createSnippets();
      this.bindEvents();
      this.positionSnippets();
    }

    createContainer() {
      this.container = document.createElement('div');
      this.container.className = 'code-background';
      this.container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      `;
      document.body.prepend(this.container);
    }

    createSnippets() {
      // Use fewer snippets on subpages (not attention-home)
      const isHomepage = document.body.classList.contains('attention-home');
      const snippetCount = isHomepage ? Math.min(50, codeSnippets.length) : 5;
      const usedSnippets = this.shuffleArray([...codeSnippets]).slice(0, snippetCount);

      usedSnippets.forEach((code, i) => {
        const snippet = document.createElement('pre');
        snippet.className = 'code-snippet';
        snippet.textContent = code;

        // Random properties for variety
        const rotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
        const parallaxSpeed = 0.1 + Math.random() * 0.3; // How fast it moves with scroll
        const scale = 0.8 + Math.random() * 0.4; // Size variation

        snippet.style.cssText = `
          position: absolute;
          font-family: 'Courier New', Consolas, monospace;
          font-size: ${12 * scale}px;
          line-height: 1.4;
          color: rgba(74, 55, 40, 0.35);
          white-space: pre;
          transform: rotate(${rotation}deg);
          padding: 1rem;
          background: transparent;
          user-select: none;
        `;

        this.container.appendChild(snippet);
        this.snippets.push({
          element: snippet,
          baseX: 0,
          baseY: 0,
          rotation: rotation,
          parallaxSpeed: parallaxSpeed,
          scale: scale
        });
      });
    }

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    positionSnippets() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Position snippets across the page
      this.snippets.forEach((snippet, i) => {
        // Distribute across width with some randomness
        const col = i % 2; // Left or right side
        const baseX = col === 0
          ? Math.random() * (width * 0.3) + 20
          : width * 0.6 + Math.random() * (width * 0.3);

        // Distribute vertically across the page
        const baseY = (i / this.snippets.length) * pageHeight * 0.8 + Math.random() * height * 0.5;

        snippet.baseX = baseX;
        snippet.baseY = baseY;
        snippet.element.style.left = baseX + 'px';
        snippet.element.style.top = baseY + 'px';
      });
    }

    bindEvents() {
      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY;

        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.updatePositions();
            this.ticking = false;
          });
          this.ticking = true;
        }
      });

      window.addEventListener('resize', () => {
        this.positionSnippets();
      });
    }

    updatePositions() {
      this.snippets.forEach(snippet => {
        // Parallax: snippets move slower than scroll (creates depth)
        const offsetY = -this.scrollY * snippet.parallaxSpeed;

        snippet.element.style.transform = `
          translateY(${offsetY}px)
          rotate(${snippet.rotation}deg)
        `;
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CodeBackground());
  } else {
    new CodeBackground();
  }
})();
