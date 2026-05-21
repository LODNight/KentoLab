/* ==========================================================================
   Kento Lab - Academic Encyclopedia Database
   ========================================================================== */

// 1. System definitions of 31 Categories (Structured mapping)
const algoCategories = [
  {
    id: "searching",
    name: "1. Thuật toán tìm kiếm",
    icon: "fa-magnifying-glass",
    algos: [
      { id: "linear", name: "Linear Search", diff: "Easy", time: "O(n)" },
      { id: "binary", name: "Binary Search", diff: "Easy", time: "O(log n)" },
      { id: "jump", name: "Jump Search", diff: "Easy", time: "O(√n)" },
      { id: "interpolation", name: "Interpolation Search", diff: "Medium", time: "O(log log n)" },
      { id: "exponential", name: "Exponential Search", diff: "Medium", time: "O(log n)" },
      { id: "fibonacci_search", name: "Fibonacci Search", diff: "Hard", time: "O(log n)" },
      { id: "ternary", name: "Ternary Search", diff: "Medium", time: "O(log n)" }
    ]
  },
  {
    id: "sorting_comp",
    name: "2. Sắp xếp So Sánh",
    icon: "fa-arrow-up-wide-short",
    algos: [
      { id: "bubble", name: "Bubble Sort", diff: "Easy", time: "O(n²)" },
      { id: "selection", name: "Selection Sort", diff: "Easy", time: "O(n²)" },
      { id: "insertion", name: "Insertion Sort", diff: "Easy", time: "O(n²)" },
      { id: "merge_sort", name: "Merge Sort", diff: "Medium", time: "O(n log n)" },
      { id: "quick_sort", name: "Quick Sort", diff: "Medium", time: "O(n log n)" },
      { id: "heap_sort", name: "Heap Sort", diff: "Medium", time: "O(n log n)" },
      { id: "shell_sort", name: "Shell Sort", diff: "Medium", time: "O(n log n)" },
      { id: "tim_sort", name: "Tim Sort", diff: "Hard", time: "O(n log n)" },
      { id: "intro_sort", name: "Intro Sort", diff: "Hard", time: "O(n log n)" },
      { id: "tree_sort", name: "Tree Sort", diff: "Medium", time: "O(n log n)" },
      { id: "cocktail", name: "Cocktail Sort", diff: "Easy", time: "O(n²)" },
      { id: "comb_sort", name: "Comb Sort", diff: "Medium", time: "O(n log n)" },
      { id: "gnome_sort", name: "Gnome Sort", diff: "Easy", time: "O(n²)" },
      { id: "odd_even", name: "Odd-Even Sort", diff: "Easy", time: "O(n²)" }
    ]
  },
  {
    id: "sorting_noncomp",
    name: "3. Sắp xếp Không So Sánh",
    icon: "fa-filter",
    algos: [
      { id: "counting_sort", name: "Counting Sort", diff: "Medium", time: "O(n + k)" },
      { id: "radix_sort", name: "Radix Sort", diff: "Hard", time: "O(nk)" },
      { id: "bucket_sort", name: "Bucket Sort", diff: "Medium", time: "O(n + k)" },
      { id: "pigeonhole_sort", name: "Pigeonhole Sort", diff: "Medium", time: "O(n + Range)" }
    ]
  },
  {
    id: "divide_conquer",
    name: "4. Chia để trị (Divide & Conquer)",
    icon: "fa-divide",
    algos: [
      { id: "dac_merge", name: "Merge Sort (D&C)", diff: "Medium", time: "O(n log n)" },
      { id: "dac_quick", name: "Quick Sort (D&C)", diff: "Medium", time: "O(n log n)" },
      { id: "dac_binsearch", name: "Binary Search (D&C)", diff: "Easy", time: "O(log n)" },
      { id: "karatsuba", name: "Karatsuba Multiplication", diff: "Hard", time: "O(n^1.58)" },
      { id: "strassen", name: "Strassen Matrix", diff: "Hard", time: "O(n^2.81)" },
      { id: "closest_pair", name: "Closest Pair of Points", diff: "Hard", time: "O(n log n)" }
    ]
  },
  {
    id: "greedy",
    name: "5. Tham lam (Greedy)",
    icon: "fa-coins",
    algos: [
      { id: "activity_select", name: "Activity Selection", diff: "Easy", time: "O(n log n)" },
      { id: "frac_knapsack", name: "Fractional Knapsack", diff: "Medium", time: "O(n log n)" },
      { id: "huffman_coding", name: "Huffman Coding", diff: "Hard", time: "O(n log n)" },
      { id: "greedy_prim", name: "Prim Algorithm", diff: "Medium", time: "O(E log V)" },
      { id: "greedy_kruskal", name: "Kruskal Algorithm", diff: "Medium", time: "O(E log E)" },
      { id: "greedy_dijkstra", name: "Dijkstra Algorithm", diff: "Medium", time: "O(E log V)" },
      { id: "job_sequencing", name: "Job Sequencing", diff: "Medium", time: "O(n²)" },
      { id: "optimal_merge", name: "Optimal Merge Pattern", diff: "Medium", time: "O(n log n)" },
      { id: "coin_change_greedy", name: "Coin Change (Greedy)", diff: "Easy", time: "O(n)" }
    ]
  },
  {
    id: "dp",
    name: "6. Quy hoạch động (DP)",
    icon: "fa-layer-group",
    algos: [
      { id: "fib_dp", name: "Fibonacci DP", diff: "Easy", time: "O(n)" },
      { id: "knapsack_dp", name: "0/1 Knapsack", diff: "Medium", time: "O(nW)" },
      { id: "lcs_dp", name: "Longest Common Subsequence", diff: "Medium", time: "O(nm)" },
      { id: "lis_dp", name: "Longest Increasing Subsequence", diff: "Medium", time: "O(n log n)" },
      { id: "matrix_chain", name: "Matrix Chain Multiplication", diff: "Hard", time: "O(n³)" },
      { id: "coin_dp", name: "Coin Change (DP)", diff: "Medium", time: "O(n * amount)" },
      { id: "edit_distance", name: "Edit Distance", diff: "Hard", time: "O(nm)" },
      { id: "rod_cutting", name: "Rod Cutting", diff: "Medium", time: "O(n²)" },
      { id: "kadane", name: "Kadane Algorithm", diff: "Easy", time: "O(n)" },
      { id: "bellman_ford_dp", name: "Bellman Ford (DP)", diff: "Medium", time: "O(VE)" },
      { id: "floyd_warshall_dp", name: "Floyd Warshall (DP)", diff: "Hard", time: "O(V³)" },
      { id: "dp_trees", name: "DP on Trees", diff: "Hard", time: "O(V)" },
      { id: "digit_dp", name: "Digit DP", diff: "Hard", time: "O(log10(N) * states)" },
      { id: "bitmask_dp", name: "Bitmask DP", diff: "Hard", time: "O(2^n * n²)" }
    ]
  },
  {
    id: "backtracking",
    name: "7. Quay lui (Backtracking)",
    icon: "fa-undo",
    algos: [
      { id: "n_queens", name: "N Queens", diff: "Hard", time: "O(N!)" },
      { id: "sudoku", name: "Sudoku Solver", diff: "Hard", time: "O(9^(n²))" },
      { id: "rat_maze", name: "Rat in a Maze", diff: "Medium", time: "O(2^(n²))" },
      { id: "word_search", name: "Word Search", diff: "Medium", time: "O(N * 4^L)" },
      { id: "hamiltonian_back", name: "Hamiltonian Path", diff: "Hard", time: "O(N!)" },
      { id: "graph_coloring", name: "Graph Coloring", diff: "Hard", time: "O(V^V)" },
      { id: "subset_sum", name: "Subset Sum", diff: "Medium", time: "O(2^n)" },
      { id: "permutations", name: "Permutation Generator", diff: "Easy", time: "O(N!)" }
    ]
  },
  {
    id: "recursion",
    name: "8. Đệ quy (Recursion)",
    icon: "fa-arrows-spin",
    algos: [
      { id: "tower_hanoi", name: "Tower of Hanoi", diff: "Medium", time: "O(2^n)" },
      { id: "rec_binary", name: "Recursive Binary Search", diff: "Easy", time: "O(log n)" },
      { id: "rec_dfs", name: "Recursive DFS", diff: "Medium", time: "O(V + E)" },
      { id: "rec_merge", name: "Recursive Merge Sort", diff: "Medium", time: "O(n log n)" },
      { id: "rec_quick", name: "Recursive Quick Sort", diff: "Medium", time: "O(n log n)" },
      { id: "rec_tree_traverse", name: "Tree Traversal", diff: "Easy", time: "O(N)" }
    ]
  },
  {
    id: "graphs",
    name: "9. Đồ thị (Graph)",
    icon: "fa-network-wired",
    algos: [
      { id: "bfs", name: "Breadth First Search (BFS)", diff: "Easy", time: "O(V + E)" },
      { id: "dfs", name: "Depth First Search (DFS)", diff: "Easy", time: "O(V + E)" },
      { id: "dijkstra_graph", name: "Dijkstra (Shortest Path)", diff: "Medium", time: "O(E log V)" },
      { id: "bellman_ford", name: "Bellman Ford", diff: "Medium", time: "O(VE)" },
      { id: "floyd_warshall", name: "Floyd Warshall", diff: "Hard", time: "O(V³)" },
      { id: "astar", name: "A* Algorithm", diff: "Medium", time: "O(E)" },
      { id: "johnson", name: "Johnson Algorithm", diff: "Hard", time: "O(VE log V)" },
      { id: "kruskal_mst", name: "Kruskal MST", diff: "Medium", time: "O(E log E)" },
      { id: "prim_mst", name: "Prim MST", diff: "Medium", time: "O(E log V)" },
      { id: "boruvka", name: "Borůvka MST", diff: "Hard", time: "O(E log V)" },
      { id: "union_find", name: "Union Find / DSU", diff: "Easy", time: "O(α(V))" },
      { id: "tarjan", name: "Tarjan SCC", diff: "Hard", time: "O(V + E)" },
      { id: "kosaraju", name: "Kosaraju SCC", diff: "Hard", time: "O(V + E)" },
      { id: "articulation", name: "Articulation Point", diff: "Hard", time: "O(V + E)" },
      { id: "bridge_find", name: "Bridge Finding", diff: "Hard", time: "O(V + E)" },
      { id: "ford_fulkerson", name: "Ford Fulkerson Flow", diff: "Hard", time: "O(E * max_flow)" },
      { id: "edmonds_karp", name: "Edmonds Karp Flow", diff: "Hard", time: "O(VE²)" },
      { id: "dinic", name: "Dinic Algorithm", diff: "Hard", time: "O(V²E)" },
      { id: "push_relabel", name: "Push Relabel", diff: "Hard", time: "O(V³)" },
      { id: "kahn_topo", name: "Kahn Algorithm", diff: "Medium", time: "O(V + E)" },
      { id: "dfs_topo", name: "DFS Topological Sort", diff: "Medium", time: "O(V + E)" },
      { id: "hopcroft_karp", name: "Hopcroft Karp Matching", diff: "Hard", time: "O(E √V)" },
      { id: "hungarian", name: "Hungarian Algorithm", diff: "Hard", time: "O(V³)" },
      { id: "euler_path", name: "Euler Path", diff: "Hard", time: "O(V + E)" },
      { id: "hamiltonian_graph", name: "Hamiltonian Path", diff: "Hard", time: "O(V!)" },
      { id: "centroid", name: "Centroid Decomposition", diff: "Hard", time: "O(V log V)" },
      { id: "hld", name: "Heavy Light Decomposition", diff: "Hard", time: "O(V)" },
      { id: "lca", name: "Lowest Common Ancestor", diff: "Medium", time: "O(log V)" }
    ]
  },
  {
    id: "trees",
    name: "10. Cây & Phân cấp (Tree)",
    icon: "fa-tree",
    algos: [
      { id: "inorder", name: "Inorder Traversal", diff: "Easy", time: "O(N)" },
      { id: "preorder", name: "Preorder Traversal", diff: "Easy", time: "O(N)" },
      { id: "postorder", name: "Postorder Traversal", diff: "Easy", time: "O(N)" },
      { id: "levelorder", name: "Level Order Traversal", diff: "Easy", time: "O(N)" },
      { id: "avl_tree", name: "AVL Tree", diff: "Hard", time: "O(log N)" },
      { id: "red_black", name: "Red Black Tree", diff: "Hard", time: "O(log N)" },
      { id: "splay_tree", name: "Splay Tree", diff: "Hard", time: "O(log N)" },
      { id: "treap", name: "Treap", diff: "Hard", time: "O(log N)" },
      { id: "b_tree", name: "B Tree", diff: "Hard", time: "O(log N)" },
      { id: "b_plus_tree", name: "B+ Tree", diff: "Hard", time: "O(log N)" },
      { id: "segment_tree", name: "Segment Tree", diff: "Hard", time: "O(log N)" },
      { id: "fenwick", name: "Fenwick Tree / BIT", diff: "Medium", time: "O(log N)" },
      { id: "sparse_table", name: "Sparse Table", diff: "Medium", time: "O(1) Query" },
      { id: "interval_tree", name: "Interval Tree", diff: "Hard", time: "O(log N)" },
      { id: "trie", name: "Trie (Prefix Tree)", diff: "Medium", time: "O(L)" },
      { id: "suffix_tree", name: "Suffix Tree", diff: "Hard", time: "O(N)" }
    ]
  },
  {
    id: "strings",
    name: "11. Chuỗi (String)",
    icon: "fa-font",
    algos: [
      { id: "naive_string", name: "Naive String Match", diff: "Easy", time: "O(nm)" },
      { id: "kmp", name: "KMP String Matching", diff: "Hard", time: "O(n + m)" },
      { id: "rabin_karp", name: "Rabin Karp", diff: "Medium", time: "O(n + m)" },
      { id: "boyer_moore", name: "Boyer Moore", diff: "Hard", time: "O(n + m)" },
      { id: "z_algo", name: "Z Algorithm", diff: "Medium", time: "O(n + m)" },
      { id: "aho_corasick", name: "Aho Corasick", diff: "Hard", time: "O(n + m + z)" },
      { id: "suffix_array", name: "Suffix Array", diff: "Hard", time: "O(n log n)" },
      { id: "lps_function", name: "Longest Prefix Suffix", diff: "Medium", time: "O(m)" }
    ]
  },
  {
    id: "hashing",
    name: "12. Băm (Hashing)",
    icon: "fa-hashtag",
    algos: [
      { id: "hash_table", name: "Hash Table", diff: "Easy", time: "O(1) Avg" },
      { id: "double_hash", name: "Double Hashing", diff: "Medium", time: "O(1)" },
      { id: "rolling_hash", name: "Rolling Hash", diff: "Medium", time: "O(n)" },
      { id: "md5", name: "MD5 Hashing", diff: "Medium", time: "O(length)" },
      { id: "sha256", name: "SHA-256 Hashing", diff: "Medium", time: "O(length)" },
      { id: "bcrypt", name: "bcrypt Cryptographic", diff: "Hard", time: "O(Work factor)" }
    ]
  },
  {
    id: "math",
    name: "13. Toán học (Mathematical)",
    icon: "fa-calculator",
    algos: [
      { id: "euclidean", name: "Euclidean GCD", diff: "Easy", time: "O(log min(a,b))" },
      { id: "extended_gcd", name: "Extended Euclidean", diff: "Medium", time: "O(log min(a,b))" },
      { id: "sieve_primes", name: "Sieve of Eratosthenes", diff: "Easy", time: "O(n log log n)" },
      { id: "fast_exponentiation", name: "Fast Exponentiation", diff: "Easy", time: "O(log n)" },
      { id: "mod_exponentiation", name: "Modular Exponentiation", diff: "Easy", time: "O(log n)" },
      { id: "chinese_remainder", name: "Chinese Remainder Theorem", diff: "Hard", time: "O(k log n)" },
      { id: "miller_rabin", name: "Miller Rabin Primality", diff: "Hard", time: "O(k log³ n)" },
      { id: "gaussian_elim", name: "Gaussian Elimination", diff: "Hard", time: "O(n³)" },
      { id: "monte_carlo", name: "Monte Carlo Algorithm", diff: "Medium", time: "O(N)" }
    ]
  },
  {
    id: "bit_manipulation",
    name: "14. Thao tác Bit (Bitmask)",
    icon: "fa-binary",
    algos: [
      { id: "xor_tricks", name: "XOR Tricks", diff: "Easy", time: "O(1)" },
      { id: "bitmasking", name: "Bitmasking", diff: "Medium", time: "O(1)" },
      { id: "fast_subset_enum", name: "Fast Subset Enumeration", diff: "Hard", time: "O(3^n)" },
      { id: "kernighan_alg", name: "Brian Kernighan", diff: "Easy", time: "O(Set bits)" },
      { id: "gray_code", name: "Gray Code", diff: "Medium", time: "O(1)" }
    ]
  },
  {
    id: "computational_geometry",
    name: "15. Hình học tính toán",
    icon: "fa-compass",
    algos: [
      { id: "graham_scan", name: "Graham Scan (Convex Hull)", diff: "Hard", time: "O(n log n)" },
      { id: "jarvis_march", name: "Jarvis March (Convex Hull)", diff: "Hard", time: "O(nh)" },
      { id: "line_sweep", name: "Line Sweep Algorithm", diff: "Hard", time: "O(n log n)" },
      { id: "rotating_calipers", name: "Rotating Calipers", diff: "Hard", time: "O(n)" }
    ]
  },
  {
    id: "optimization",
    name: "16. Tối ưu hóa (Optimization)",
    icon: "fa-chart-area",
    algos: [
      { id: "simulated_annealing", name: "Simulated Annealing", diff: "Hard", time: "O(Iterations)" },
      { id: "genetic_algo", name: "Genetic Algorithm", diff: "Hard", time: "O(G * P * L)" },
      { id: "hill_climbing", name: "Hill Climbing", diff: "Medium", time: "O(Steps)" },
      { id: "branch_bound", name: "Branch and Bound", diff: "Hard", time: "O(2^n) worst" }
    ]
  },
  {
    id: "ml",
    name: "17. Trí tuệ nhân tạo (ML)",
    icon: "fa-robot",
    algos: [
      { id: "linear_regression", name: "Linear Regression", diff: "Medium", time: "O(pn² + p³)" },
      { id: "logistic_regression", name: "Logistic Regression", diff: "Medium", time: "O(Iterations * n * p)" },
      { id: "decision_tree", name: "Decision Tree", diff: "Hard", time: "O(n * p * log n)" },
      { id: "knn", name: "KNN Classifier", diff: "Medium", time: "O(n * p)" },
      { id: "kmeans", name: "K-Means Clustering", diff: "Medium", time: "O(I * k * n * p)" },
      { id: "transformers_selfattn", name: "Transformer Attention", diff: "Hard", time: "O(L² * d)" }
    ]
  },
  {
    id: "compression",
    name: "18. Nén dữ liệu (Compression)",
    icon: "fa-file-zipper",
    algos: [
      { id: "rle_compress", name: "Run Length Encoding", diff: "Easy", time: "O(N)" },
      { id: "lzw_compress", name: "LZW Compression", diff: "Medium", time: "O(N)" },
      { id: "arithmetic_coding", name: "Arithmetic Coding", diff: "Hard", time: "O(N)" }
    ]
  },
  {
    id: "cryptography",
    name: "19. Mật mã học (Cryptography)",
    icon: "fa-lock",
    algos: [
      { id: "aes_encrypt", name: "AES Encryption", diff: "Hard", time: "O(Blocks)" },
      { id: "rsa_crypto", name: "RSA Encryption", diff: "Hard", time: "O(log³ N)" },
      { id: "ecc_curve", name: "Elliptic Curve (ECC)", diff: "Hard", time: "O(Scalar mult)" },
      { id: "ecdsa_sign", name: "ECDSA Digital Signature", diff: "Hard", time: "O(Scalar mult)" }
    ]
  },
  {
    id: "parallel_concurrent",
    name: "20. Song song & Đồng thời",
    icon: "fa-server",
    algos: [
      { id: "parallel_merge", name: "Parallel Merge Sort", diff: "Hard", time: "O((n log n)/P)" },
      { id: "mapreduce", name: "MapReduce Framework", diff: "Medium", time: "O(Map + Reduce)" },
      { id: "producer_consumer", name: "Producer Consumer Pattern", diff: "Medium", time: "O(1) thread sync" },
      { id: "dining_phil", name: "Dining Philosophers", diff: "Hard", time: "O(Deadlock avoidance)" }
    ]
  },
  {
    id: "cache_memory",
    name: "21. Cache & Bộ nhớ",
    icon: "fa-memory",
    algos: [
      { id: "lru_cache", name: "LRU Cache", diff: "Medium", time: "O(1)" },
      { id: "lfu_cache", name: "LFU Cache", diff: "Hard", time: "O(1)" },
      { id: "fifo_paging", name: "FIFO Page Replacement", diff: "Easy", time: "O(1)" },
      { id: "opt_paging", name: "Optimal Page Replacement", diff: "Medium", time: "O(Capacity * Pages)" }
    ]
  },
  {
    id: "scheduling",
    name: "22. Điều phối tác vụ (Scheduling)",
    icon: "fa-clock",
    algos: [
      { id: "fcfs_sched", name: "FCFS CPU Scheduling", diff: "Easy", time: "O(N)" },
      { id: "sjf_sched", name: "SJF Scheduling", diff: "Medium", time: "O(N log N)" },
      { id: "round_robin", name: "Round Robin Scheduling", diff: "Medium", time: "O(N)" },
      { id: "scan_disk", name: "SCAN Disk Scheduling", diff: "Medium", time: "O(N log N)" }
    ]
  },
  {
    id: "networking",
    name: "23. Mạng máy tính (Networking)",
    icon: "fa-wifi",
    algos: [
      { id: "distance_vector", name: "Distance Vector Routing", diff: "Medium", time: "O(V * E)" },
      { id: "link_state", name: "Link State Routing", diff: "Medium", time: "O(E log V)" },
      { id: "tcp_congestion", name: "TCP Congestion Control", diff: "Medium", time: "O(Transmission window RTT)" }
    ]
  },
  {
    id: "databases",
    name: "24. Cơ sở dữ liệu (Database)",
    icon: "fa-database",
    algos: [
      { id: "b_plus_index", name: "B+ Tree Indexing", diff: "Hard", time: "O(log N)" },
      { id: "hash_index", name: "Hash Indexing", diff: "Medium", time: "O(1)" },
      { id: "nested_loop_join", name: "Nested Loop Join", diff: "Easy", time: "O(R * S)" },
      { id: "hash_join", name: "Hash Join", diff: "Medium", time: "O(R + S)" }
    ]
  },
  {
    id: "ai_search",
    name: "25. Tìm kiếm trong AI",
    icon: "fa-chess",
    algos: [
      { id: "minimax", name: "Minimax Tree Search", diff: "Medium", time: "O(b^d)" },
      { id: "alpha_beta", name: "Alpha Beta Pruning", diff: "Hard", time: "O(b^(d/2))" },
      { id: "beam_search", name: "Beam Search", diff: "Medium", time: "O(B * d)" },
      { id: "mcts", name: "Monte Carlo Tree Search", diff: "Hard", time: "O(Simulations * Depth)" }
    ]
  },
  {
    id: "streaming",
    name: "26. Dòng dữ liệu (Streaming)",
    icon: "fa-water",
    algos: [
      { id: "bloom_filter", name: "Bloom Filter", diff: "Medium", time: "O(k)" },
      { id: "count_min_sketch", name: "Count Min Sketch", diff: "Hard", time: "O(k)" },
      { id: "hyperloglog", name: "HyperLogLog", diff: "Hard", time: "O(1) updates" }
    ]
  },
  {
    id: "randomized",
    name: "27. Thuật toán ngẫu nhiên",
    icon: "fa-dice-d20",
    algos: [
      { id: "rand_quicksort", name: "Randomized Quick Sort", diff: "Medium", time: "O(n log n) Expected" },
      { id: "reservoir_sampling", name: "Reservoir Sampling", diff: "Medium", time: "O(N)" }
    ]
  },
  {
    id: "distributed",
    name: "28. Hệ phân tán (Distributed)",
    icon: "fa-cloud",
    algos: [
      { id: "paxos_consensus", name: "Paxos Consensus", diff: "Hard", time: "O(Messages cost)" },
      { id: "raft_consensus", name: "Raft Consensus", diff: "Hard", time: "O(Network RTT)" },
      { id: "gossip_protocol", name: "Gossip Protocol", diff: "Medium", time: "O(log N) cycles" },
      { id: "consistent_hashing", name: "Consistent Hashing", diff: "Hard", time: "O(log Nodes)" }
    ]
  },
  {
    id: "game_algos",
    name: "29. Lập trình Game (Game Dev)",
    icon: "fa-gamepad",
    algos: [
      { id: "navmesh_path", name: "NavMesh Pathfinding", diff: "Hard", time: "O(E log V)" },
      { id: "steering_behaviors", name: "Steering Behaviors", diff: "Medium", time: "O(Entities)" },
      { id: "bsp_tree", name: "Binary Space Partitioning (BSP)", diff: "Hard", time: "O(N log N)" }
    ]
  },
  {
    id: "compiler",
    name: "30. Trình biên dịch (Compiler)",
    icon: "fa-terminal",
    algos: [
      { id: "lexical_analysis", name: "Lexical Analysis", diff: "Medium", time: "O(N)" },
      { id: "ll_parser", name: "LL Parser", diff: "Hard", time: "O(N)" },
      { id: "lr_parser", name: "LR Parser", diff: "Hard", time: "O(N)" },
      { id: "dfa_nfa", name: "DFA/NFA State Construction", diff: "Hard", time: "O(2^S)" }
    ]
  },
  {
    id: "signal_image",
    name: "31. Xử lý ảnh & Tín hiệu",
    icon: "fa-image",
    algos: [
      { id: "fft", name: "Fast Fourier Transform (FFT)", diff: "Hard", time: "O(N log N)" },
      { id: "canny_edge", name: "Canny Edge Detection", diff: "Hard", time: "O(Pixels)" },
      { id: "jpeg_compress", name: "JPEG Compression", diff: "Hard", time: "O(Blocks)" },
      { id: "shor_quantum", name: "Shor (Quantum Algorithm)", diff: "Hard", time: "O(log³ N) qubits" },
      { id: "grover_quantum", name: "Grover (Quantum Search)", diff: "Hard", time: "O(√N)" }
    ]
  }
];

// 2. MegaGroups mapping to organize 31 categories into 7 large groups
const megaGroups = [
  {
    id: "core",
    name: "Thuật toán cơ sở",
    desc: "Học phần nền tảng cốt lõi của Khoa học máy tính. Khám phá các phương pháp Sắp xếp (Sorting) tối ưu hiệu năng, kỹ thuật Tìm kiếm (Searching) từ tuyến tính đến chia đôi nhị phân, các mô hình Đệ quy (Recursion) kinh điển và triết lý Chia để trị (Divide & Conquer) giúp bẻ gãy các cấu trúc bài toán siêu phức tạp.",
    icon: "fa-cubes",
    color: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/10",
    categoryIds: ["searching", "sorting_comp", "sorting_noncomp", "divide_conquer", "recursion"]
  },
  {
    id: "design",
    name: "Thiết kế & Tối ưu",
    desc: "Kỹ nghệ thiết kế tối ưu hóa hệ thống để giải quyết các thách thức NP-Khó và bài toán phân phối thực tế. Thực thi chiến lược Tham lam (Greedy) lựa chọn cực trị cục bộ, mô hình Quy hoạch động (Dynamic Programming) lưu trữ trạng thái thông minh triệt tiêu lặp thừa, và kỹ thuật Quay lui (Backtracking) thử-sai giải quyết không gian nghiệm khổng lồ.",
    icon: "fa-wand-magic-sparkles",
    color: "from-amber-600 to-orange-600",
    shadow: "shadow-amber-500/10",
    categoryIds: ["greedy", "dp", "backtracking", "optimization"]
  },
  {
    id: "structures",
    name: "Cấu trúc & Đồ thị",
    desc: "Xương sống định hình kiến trúc liên kết dữ liệu mạng lưới và quản trị bộ nhớ phức tạp. Mô phỏng chi tiết các giải thuật Đồ thị chuyên sâu (BFS, DFS, Dijkstra, Luồng cực đại, Cây bao trùm cực tiểu), hệ thống Cây tự cân bằng đỉnh cao (AVL, Red-Black, Segment Tree) kết hợp các cơ chế bảng Băm (Hash Table) tối ưu truy xuất tiệm cận O(1).",
    icon: "fa-network-wired",
    color: "from-emerald-600 to-teal-600",
    shadow: "shadow-emerald-500/10",
    categoryIds: ["graphs", "trees", "hashing"]
  },
  {
    id: "strings_math",
    name: "Chuỗi & Toán học",
    desc: "Điểm giao thoa học thuật giữa số học nâng cao và xử lý văn bản quy mô lớn. Trực quan hóa các giải thuật Số học lý thuyết số (Sàng nguyên tố Eratosthenes, Lũy thừa Modular nhanh, GCD mở rộng), Thao tác Bitmask siêu tốc, Hình học tính toán không gian đa chiều và các bộ khớp mẫu Chuỗi ký tự (KMP, Rabin-Karp, Boyer-Moore) kinh điển.",
    icon: "fa-calculator",
    color: "from-purple-600 to-pink-600",
    shadow: "shadow-purple-500/10",
    categoryIds: ["strings", "math", "bit_manipulation", "computational_geometry"]
  },
  {
    id: "ai_game",
    name: "AI & Lập trình Game",
    desc: "Mô phỏng kiến trúc tự động hóa trí tuệ nhân tạo hiện đại và cơ chế vận hành của thế giới Game Engine ảo. Tích hợp trực quan học máy có giám sát và phân cụm (Hồi quy, KNN, K-Means, Transformer Attention), cơ chế duyệt cây đối kháng trong AI (Minimax, Alpha-Beta, MCTS) cùng các mô hình định tuyến không gian Game (NavMesh, BSP).",
    icon: "fa-gamepad",
    color: "from-rose-600 to-pink-600",
    shadow: "shadow-rose-500/10",
    categoryIds: ["ml", "ai_search", "game_algos"]
  },
  {
    id: "systems_security",
    name: "Hệ thống & An ninh",
    desc: "Phương pháp quản lý phần cứng hệ điều hành, tối ưu hóa lưu trữ dữ liệu và bảo mật an toàn thông tin doanh nghiệp. Làm chủ các giải thuật Nén không tổn hao (Huffman, LZW), cơ chế mã hóa Mật mã học bất đối xứng (AES, RSA, ECC, chữ ký số), thuật toán điều phối bộ nhớ CPU, Cache (LRU, LFU) và kiến trúc Join tối ưu hóa cơ sở dữ liệu.",
    icon: "fa-shield-halved",
    color: "from-cyan-600 to-blue-600",
    shadow: "shadow-cyan-500/10",
    categoryIds: ["compression", "cryptography", "parallel_concurrent", "cache_memory", "scheduling", "networking", "databases"]
  },
  {
    id: "distributed_advanced",
    name: "Phân tán & Nâng cao",
    desc: "Nghiên cứu kiến trúc đồng thuận dữ liệu mạng lưới đám mây quy mô toàn cầu và tính toán lượng tử đột phá. Trực quan hóa cơ chế đồng thuận phân tán (Paxos, Raft, Consistent Hashing), thuật toán xử lý luồng dữ liệu cực lớn thời gian thực (Bloom Filter, HyperLogLog) kết hợp mô hình Trình biên dịch và giải thuật lượng tử Shor, Grover.",
    icon: "fa-cloud-arrow-up",
    color: "from-fuchsia-600 to-purple-600",
    shadow: "shadow-fuchsia-500/10",
    categoryIds: ["streaming", "randomized", "distributed", "compiler", "signal_image"]
  }
];

// 3. Initial Graph visualizer data modeling (Default layout)
let graphData = {
  nodes: [
    { id: "A", x: 150, y: 70 },
    { id: "B", x: 100, y: 170 },
    { id: "C", x: 220, y: 120 },
    { id: "D", x: 300, y: 170 },
    { id: "E", x: 360, y: 70 }
  ],
  edges: [
    { u: "A", v: "B", weight: 4 },
    { u: "A", v: "C", weight: 2 },
    { u: "B", v: "C", weight: 5 },
    { u: "C", v: "D", weight: 1 },
    { u: "C", v: "E", weight: 8 },
    { u: "D", v: "E", weight: 3 }
  ]
};

// 4. Hardcoded academic algorithms database (3-Layer structure, metadata only)
const hardcodedDatabase = {
  "linear": {
    name: "Linear Search",
    details: {
      category: "searching",
      vType: "array",
      complexity: {
        best: "O(1)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)"
      },
      shortSummary: "Tìm kiếm tuần tự duyệt qua từng phần tử mảng từ đầu đến cuối cho đến khi gặp giá trị cần tìm.",
      concept: "Tìm kiếm tuần tự (Linear Search) là giải thuật tìm kiếm đơn giản nhất. Để tìm một khóa Target trong danh sách, ta tiến hành quét tuyến tính qua từng phần tử từ index 0 đến n-1, so sánh giá trị cho tới khi khớp hoàn toàn.",
      conditions: "Không có điều kiện tiên quyết nào. Hoạt động trên mọi loại mảng số, danh sách liên kết, mảng chưa được sắp xếp hoặc có dữ liệu trùng lặp.",
      idea: "Xuất phát từ đầu danh sách. Tại mỗi bước so sánh giá trị phần tử hiện tại với mục tiêu. Nếu bằng nhau, trả về vị trí. Nếu đi hết mảng mà không khớp, kết luận phần tử không tồn tại.",
      guide: "Nhập giá trị 'Target' cần tìm trong bảng cấu hình bên trái. Nhấn nút Play để hệ thống quét sáng (vàng) tuần tự qua các ô số mảng cho đến khi ô số chuyển màu xanh (đã khớp) hoặc màu đỏ sọc (bị loại).",
      pseudocode: "procedure linearSearch(arr, target)\n  for i = 0 to arr.length - 1 do\n    if arr[i] == target then\n      return i // Đã tìm thấy\n  return -1 // Không tìm thấy\nend procedure",
      sourceCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nint linearSearch(const std::vector<int>& arr, int target) {\n    for (size_t i = 0; i < arr.size(); ++i) {\n        if (arr[i] == target) {\n            return i; // Found\n        }\n    }\n    return -1; // Not found\n}`,
        python: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i  # Found\n    return -1  # Not found`
      },
      apps: ["Tìm kiếm phần tử trong mảng nhỏ chưa sắp xếp.", "Quét tìm kiếm thô ban đầu trong cơ sở dữ liệu nhỏ.", "Làm thuật toán dự phòng khi dữ liệu quá nhỏ không đáng tốn phí sắp xếp."],
      exercises: [
        { name: "LeetCode 704. Binary Search (áp dụng Linear như giải pháp thô)", diff: "Easy", url: "#" },
        { name: "SPOJ - Search in Array", diff: "Easy", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "for i = 0 to n-1 do" },
        { num: 2, text: "  if arr[i] == target then" },
        { num: 3, text: "    return i" },
        { num: 4, text: "return -1" }
      ]
    }
  },
  "binary": {
    name: "Binary Search",
    details: {
      category: "searching",
      vType: "array",
      complexity: {
        best: "O(1)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)"
      },
      shortSummary: "Tìm kiếm nhị phân liên tục chia đôi khoảng tìm kiếm, đòi hỏi mảng đã sắp xếp tăng dần.",
      concept: "Tìm kiếm nhị phân (Binary Search) là một giải thuật tìm kiếm chia để trị cực kỳ tối ưu. Bằng cách so sánh giá trị cần tìm với phần tử chính giữa mảng, thuật toán loại bỏ được một nửa không gian tìm kiếm sau mỗi bước so sánh.",
      conditions: "Mảng đầu vào bắt buộc phải được sắp xếp theo một thứ tự xác định (thường là tăng dần).",
      idea: "Đặt hai con trỏ Low và High ở đầu và cuối mảng. Tính vị trí chính giữa Mid. Nếu giá trị tại Mid bằng Target, dừng tìm kiếm. Nếu giá trị tại Mid bé hơn Target, co dải tìm kiếm sang nửa phải (Low = Mid + 1). Ngược lại co sang nửa trái (High = Mid - 1).",
      guide: "Hệ thống sẽ tự động sắp xếp mảng tăng dần trước khi bắt đầu. Nhìn vào màn hình trực quan, vùng nhạt mờ là vùng đã bị loại bỏ; Low và High đánh dấu ranh giới hoạt động, và ô màu vàng chính là Mid đang được xét duyệt.",
      pseudocode: "procedure binarySearch(arr, target)\n  low = 0, high = arr.length - 1\n  while low <= high do\n    mid = (low + high) / 2\n    if arr[mid] == target return mid\n    else if arr[mid] < target low = mid + 1\n    else high = mid - 1\n  return -1\nend procedure",
      sourceCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nint binarySearch(const std::vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        python: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`
      },
      apps: ["Tìm kiếm trong tập dữ liệu siêu lớn như Database Indexes.", "Hỗ trợ các thuật toán tìm kiếm khoảng, tìm cận trên/dưới (upper_bound, lower_bound).", "Ứng dụng trong các thư viện chuẩn (std::binary_search, Arrays.binarySearch)."],
      exercises: [
        { name: "LeetCode 704. Binary Search", diff: "Easy", url: "#" },
        { name: "LeetCode 34. Find First and Last Position", diff: "Medium", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "low = 0, high = n - 1" },
        { num: 2, text: "while low <= high do" },
        { num: 3, text: "  mid = (low + high) / 2" },
        { num: 4, text: "  if arr[mid] == target return mid" },
        { num: 5, text: "  if arr[mid] < target low = mid + 1" },
        { num: 6, text: "  else high = mid - 1" }
      ]
    }
  },
  "bubble": {
    name: "Bubble Sort",
    details: {
      category: "sorting_comp",
      vType: "array",
      complexity: {
        best: "O(n)",
        avg: "O(n²)",
        worst: "O(n²)",
        space: "O(1)"
      },
      shortSummary: "Nổi bọt liên tục so sánh các cặp phần tử kề nhau để đẩy dần giá trị lớn nhất về cuối mảng.",
      concept: "Sắp xếp nổi bọt (Bubble Sort) hoạt động dựa trên nguyên lý so sánh liên tục từng cặp phần tử liền kề nhau và thực hiện hoán đổi nếu chúng sai thứ tự. Quá trình này được lặp đi lặp lại cho đến khi mảng đã được xếp đúng mong muốn.",
      conditions: "Hoạt động trực tiếp trên mảng không yêu cầu điều kiện bộ nhớ đặc thù. Phù hợp cho mục tiêu học tập.",
      idea: "Sử dụng 2 vòng lặp lồng nhau. Mỗi lần duyệt qua mảng chưa sắp xếp, so sánh arr[j] và arr[j+1]. Nếu arr[j] > arr[j+1], đổi chỗ hai số. Sau lượt quét thứ i, phần tử lớn thứ i sẽ chắc chắn trôi về cuối mảng.",
      guide: "Bấm Play để xem hoạt động hoán đổi. Hai phần tử màu cam thể hiện cặp số đang so sánh. Nếu xảy ra đổi chỗ, chúng sẽ chuyển màu đỏ. Các phần tử cố định màu xanh là đã nằm đúng vị trí.",
      pseudocode: "procedure bubbleSort(arr)\n  for i = 0 to arr.length - 2 do\n    for j = 0 to arr.length - i - 2 do\n      if arr[j] > arr[j+1] then\n        swap(arr[j], arr[j+1])\nend procedure",
      sourceCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nvoid bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; ++i) {\n        for (int j = 0; j < n - i - 1; ++j) {\n            if (arr[j] > arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}`,
        python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]`
      },
      apps: ["Dùng giảng dạy tư duy thuật toán cơ bản.", "Sắp xếp các mảng số lượng phần tử cực nhỏ nơi hiệu năng không là vấn đề.", "Nhận biết mảng đã sắp xếp nhanh nhờ cờ hiệu cải tiến (Optimized Bubble Sort)."],
      exercises: [
        { name: "LeetCode 912. Sort an Array", diff: "Medium", url: "#" },
        { name: "SPOJ - Bubble Sort Practice", diff: "Easy", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "for i = 0 to n-1 do" },
        { num: 2, text: "  for j = 0 to n-i-1 do" },
        { num: 3, text: "    if arr[j] > arr[j+1] then" },
        { num: 4, text: "      swap(arr[j], arr[j+1])" }
      ]
    }
  },
  "selection": {
    name: "Selection Sort",
    details: {
      category: "sorting_comp",
      vType: "array",
      complexity: {
        best: "O(n²)",
        avg: "O(n²)",
        worst: "O(n²)",
        space: "O(1)"
      },
      shortSummary: "Quét vùng chưa sắp xếp, tìm phần tử bé nhất rồi đưa về vị trí đầu vùng.",
      concept: "Sắp xếp chọn (Selection Sort) chia mảng thành hai phần: phần đã sắp xếp nằm ở bên trái và phần chưa sắp xếp nằm ở bên phải. Tại mỗi bước, thuật toán sẽ tìm giá trị nhỏ nhất từ phần chưa sắp xếp và hoán đổi nó lên vị trí đầu tiên của phần đó.",
      conditions: "Không yêu cầu điều kiện mảng.",
      idea: "Chạy một vòng lặp i từ 0 đến n-2. Giả sử min_idx ban đầu bằng i. Quét qua các vị trí j từ i+1 đến n-1, nếu arr[j] < arr[min_idx], cập nhật min_idx = j. Sau vòng lặp quét, đổi vị trí phần tử arr[i] và arr[min_idx].",
      guide: "Phần tử được đánh dấu màu tím chính là mốc tối thiểu giả định đang nắm giữ. Khi phát hiện cột màu đỏ nhỏ hơn, mốc tím sẽ nhảy sang đó trước khi hoán đổi với cột đầu phân đoạn.",
      pseudocode: "procedure selectionSort(arr)\n  for i = 0 to n-1 do\n    min_idx = i\n    for j = i+1 to n-1 do\n      if arr[j] < arr[min_idx] then min_idx = j\n    swap(arr[i], arr[min_idx])\nend procedure",
      sourceCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nvoid selectionSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; ++i) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; ++j) {\n            if (arr[j] < arr[minIdx]) {\n                minIdx = j;\n            }\n        }\n        std::swap(arr[i], arr[minIdx]);\n    }\n}`,
        python: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
      },
      apps: ["Tối ưu số lần ghi lên các thiết bị nhớ Flash (như ổ đĩa SSD) vì thuật toán này thực hiện hoán đổi tối đa chỉ n lần."],
      exercises: [{ name: "SPOJ - Selection Sort Practice", diff: "Easy", url: "#" }],
      codeTrace: [
        { num: 1, text: "for i = 0 to n-1 do" },
        { num: 2, text: "  min_idx = i" },
        { num: 3, text: "  for j = i+1 to n-1 do" },
        { num: 4, text: "    if arr[j] < arr[min_idx] then min_idx = j" },
        { num: 5, text: "  swap(arr[i], arr[min_idx])" }
      ]
    }
  },
  "sieve_primes": {
    name: "Sàng Eratosthenes",
    details: {
      category: "math",
      vType: "console",
      complexity: {
        best: "O(n log log n)",
        avg: "O(n log log n)",
        worst: "O(n log log n)",
        space: "O(n)"
      },
      shortSummary: "Sàng nguyên tố Eratosthenes dùng mảng đánh dấu để lọc nhanh mọi số nguyên tố bé hơn N.",
      concept: "Sàng Eratosthenes là giải thuật số học cổ xưa để tìm tất cả các số nguyên tố trong phạm vi giới hạn từ 2 đến N cực kỳ nhanh chóng. Hoạt động dựa trên việc loại bỏ dần bội số của các số nguyên tố tìm thấy.",
      conditions: "Cần mảng bộ nhớ phụ có kích thước tối thiểu là N + 1 để đánh dấu trạng thái nguyên tố.",
      idea: "Khởi tạo tất cả số từ 2 đến N là số nguyên tố. Bắt đầu từ số nguyên tố đầu tiên p = 2. Nếu p chưa bị loại bỏ, đánh dấu toàn bộ các bội số của p lớn hơn hoặc bằng p² (2p, 3p,...) là hợp số. Tiếp tục quy trình với số p tiếp theo chưa bị loại.",
      guide: "Kiểm tra dòng lệnh console bên dưới để xem cách thuật toán khóa dần bội số của 2, 3, 5, 7, v.v., chừa lại các số nguyên tố cuối cùng dưới 100.",
      pseudocode: "procedure sieve(n)\n  prime[0..n] = true\n  prime[0] = prime[1] = false\n  for p = 2 to sqrt(n) do\n    if prime[p] == true then\n      for i = p*p to n step p do\n        prime[i] = false\nend procedure",
      sourceCode: {
        cpp: `#include <iostream>\n#include <vector>\n#include <cmath>\n\nstd::vector<int> sieve(int n) {\n    std::vector<bool> isPrime(n + 1, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int p = 2; p * p <= n; ++p) {\n        if (isPrime[p]) {\n            for (int i = p * p; i <= n; i += p) {\n                isPrime[i] = false;\n            }\n        }\n    }\n    std::vector<int> primes;\n    for (int p = 2; p <= n; ++p) {\n        if (isPrime[p]) primes.push_back(p);\n    }\n    return primes;\n}`,
        python: `def sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for p in range(2, int(n**0.5) + 1):\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n    return [p for p in range(2, n + 1) if is_prime[p]]`
      },
      apps: ["Tìm kiếm và lưu trữ danh sách số nguyên tố lớn để giải các bài toán mật mã (như RSA).", "Phân tích thừa số nguyên tố nhanh cho nhiều số."],
      exercises: [{ name: "SPOJ - Prime Generator", diff: "Medium", url: "#" }],
      codeTrace: [
        { num: 1, text: "prime[2..n] = true" },
        { num: 2, text: "for p = 2 to sqrt(n) do" },
        { num: 3, text: "  if prime[p] == true then" },
        { num: 4, text: "    for i = p*p to n step p do" },
        { num: 5, text: "      prime[i] = false" }
      ]
    }
  },
  "bfs": {
    name: "Breadth First Search (BFS)",
    details: {
      category: "graphs",
      vType: "graph",
      complexity: {
        best: "O(V + E)",
        avg: "O(V + E)",
        worst: "O(V + E)",
        space: "O(V)"
      },
      shortSummary: "Duyệt đồ thị theo chiều rộng, lan tỏa dần từ đỉnh gốc ra các đỉnh lân cận như sóng nước.",
      concept: "BFS là thuật toán tìm kiếm và duyệt trên đồ thị/cây. Bắt đầu từ một đỉnh gốc, thuật toán sẽ duyệt tất cả các đỉnh kề trực tiếp với nó trước khi tiến sâu hơn xuống các tầng tiếp theo.",
      conditions: "Cần cấu trúc dữ liệu Hàng đợi (Queue) để lưu trữ các đỉnh đang chờ xử lý.",
      idea: "Dùng Queue và mảng Visited. Đưa đỉnh xuất phát vào Queue và đánh dấu Visited. Lặp lại việc lấy đỉnh u khỏi Queue, lấy tất cả các đỉnh lân cận v chưa Visited của u đưa vào Queue. Lặp đến khi Queue rỗng.",
      guide: "Thêm đỉnh (Node) và nối Cạnh (Edge) tùy ý trên Canvas đồ thị. Bấm trực tiếp vào đỉnh bạn muốn làm gốc xuất phát. Hệ thống sẽ mô phỏng lan truyền từ đỉnh đó theo từng mức.",
      pseudocode: "procedure BFS(G, start)\n  Q = empty queue\n  Q.enqueue(start)\n  visited[start] = true\n  while Q is not empty do\n    u = Q.dequeue()\n    for each v in G.adjacent(u) do\n      if not visited[v] then\n        visited[v] = true\n        Q.enqueue(v)\nend procedure",
      sourceCode: {
        cpp: `// Mã nguồn mẫu C++: BFS (Breadth-First Search)\n#include <iostream>\n#include <vector>\n#include <queue>\n\nvoid bfs(int start, const std::vector<std::vector<int>>& adj) {\n    std::vector<bool> visited(adj.size(), false);\n    std::queue<int> q;\n    \n    visited[start] = true;\n    q.push(start);\n    \n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        std::cout << "Đã duyệt: " << u << std::endl;\n        \n        for (int v : adj[u]) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n}`,
        python: `# Mã nguồn mẫu Python: BFS (Breadth-First Search)\nfrom collections import deque\n\ndef bfs(start, adj):\n    visited = [False] * len(adj)\n    q = deque([start])\n    visited[start] = True\n    \n    while q:\n        u = q.popleft()\n        print(f"Đã duyệt: {u}")\n        \n        for v in adj[u]:\n            if not visited[v]:\n                visited[v] = True\n                q.append(v)`
      },
      apps: ["Tìm đường đi ngắn nhất trên đồ thị không trọng số.", "Thuật toán loang (Flood fill) trong xử lý ảnh.", "Mạng xã hội để tìm bạn bè chung gần nhất."],
      exercises: [
        { name: "LeetCode 200. Number of Islands", diff: "Medium", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "Q.enqueue(start), visited[start] = true" },
        { num: 2, text: "while Q is not empty do" },
        { num: 3, text: "  u = Q.dequeue()" },
        { num: 4, text: "  for each v in G.adjacent(u) do" },
        { num: 5, text: "    if not visited[v]: Q.enqueue(v)" }
      ]
    }
  },
  "dfs": {
    name: "Depth First Search (DFS)",
    details: {
      category: "graphs",
      vType: "graph",
      complexity: {
        best: "O(V + E)",
        avg: "O(V + E)",
        worst: "O(V + E)",
        space: "O(V)"
      },
      shortSummary: "Duyệt đồ thị theo chiều sâu, ưu tiên đi đến tận cùng của một nhánh trước khi quay lui.",
      concept: "DFS là một giải thuật duyệt đồ thị/cây hoạt động theo nguyên tắc đệ quy (hoặc dùng ngăn xếp). Nó đi theo một nhánh con sâu nhất có thể cho đến khi không còn đường đi, rồi Backtrack (quay lui) về để thử nhánh khác.",
      conditions: "Có thể cài đặt đệ quy thông qua Call Stack của hệ điều hành, hoặc dùng Stack (Ngăn xếp) tường minh.",
      idea: "Hàm DFS(u): đánh dấu u là Visited. Lặp qua tất cả đỉnh kề v của u. Nếu v chưa Visited, gọi đệ quy DFS(v). Cứ như thế đồ thị sẽ được quét hết theo từng nhánh sâu.",
      guide: "Thêm đỉnh (Node) và nối Cạnh (Edge) tùy ý trên Canvas đồ thị. Bấm trực tiếp vào đỉnh bạn muốn làm gốc xuất phát. Hệ thống sẽ mô phỏng đi sâu và quay lui.",
      pseudocode: "procedure DFS(u, visited)\n  visited[u] = true\n  for each v in G.adjacent(u) do\n    if not visited[v] then\n      DFS(v, visited)\nend procedure",
      sourceCode: {
        cpp: `// Mã nguồn mẫu C++: DFS (Depth-First Search)\n#include <iostream>\n#include <vector>\n\nvoid dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {\n    visited[u] = true;\n    std::cout << "Đã duyệt: " << u << std::endl;\n    \n    for (int v : adj[u]) {\n        if (!visited[v]) {\n            dfs(v, adj, visited);\n        }\n    }\n}`,
        python: `# Mã nguồn mẫu Python: DFS (Depth-First Search)\ndef dfs(u, adj, visited):\n    visited[u] = True\n    print(f"Đã duyệt: {u}")\n    \n    for v in adj[u]:\n        if not visited[v]:\n            dfs(v, adj, visited)`
      },
      apps: ["Tìm kiếm chu trình (Cycle detection) trong đồ thị.", "Sắp xếp tô-pô (Topological Sort).", "Giải mê cung (Maze solving)."],
      exercises: [
        { name: "LeetCode 547. Number of Provinces", diff: "Medium", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "visited[u] = true" },
        { num: 2, text: "for each v in G.adjacent(u) do" },
        { num: 3, text: "  if not visited[v] then" },
        { num: 4, text: "    DFS(v)" }
      ]
    }
  },
  "dijkstra_graph": {
    name: "Dijkstra Algorithm",
    details: {
      category: "graphs",
      vType: "graph",
      complexity: {
        best: "O(E + V log V)",
        avg: "O(E + V log V)",
        worst: "O(E + V log V)",
        space: "O(V)"
      },
      shortSummary: "Tìm đường đi ngắn nhất từ một đỉnh gốc tới tất cả các đỉnh khác trên đồ thị có trọng số dương.",
      concept: "Thuật toán Dijkstra thuộc nhóm Tham lam (Greedy). Nó duy trì một mảng khoảng cách ngắn nhất từ đỉnh gốc, và tại mỗi bước chọn ra đỉnh có khoảng cách nhỏ nhất chưa xét để cập nhật khoảng cách cho các đỉnh láng giềng.",
      conditions: "Trọng số của tất cả các cạnh trên đồ thị phải là KHÔNG ÂM (>= 0). Nếu có cạnh âm, phải dùng Bellman-Ford.",
      idea: "Khởi tạo khoảng cách mảng dist[] = vô cực, dist[start] = 0. Tại mỗi bước, lấy đỉnh u có dist[u] nhỏ nhất ra khỏi tập chưa xét (dùng Priority Queue). Cập nhật đỉnh kề v: nếu dist[u] + weight(u,v) < dist[v] thì dist[v] = dist[u] + weight(u,v).",
      guide: "Thêm đỉnh và nối cạnh (trọng số sẽ tự sinh ngẫu nhiên). Bấm vào một đỉnh để hệ thống chạy mô phỏng loang tìm đường đi ngắn nhất từ đỉnh đó đi khắp đồ thị.",
      pseudocode: "procedure Dijkstra(G, start)\n  dist[v] = infinity for all v\n  dist[start] = 0\n  Q = priority_queue of all nodes\n  while Q is not empty do\n    u = Q.extract_min()\n    for each v in neighbors(u) do\n      alt = dist[u] + weight(u, v)\n      if alt < dist[v]:\n        dist[v] = alt\n        Q.decrease_key(v, alt)\nend procedure",
      sourceCode: {
        cpp: `// Mã nguồn mẫu C++: Dijkstra's Shortest Path\n#include <iostream>\n#include <vector>\n#include <queue>\n#include <limits>\n\nconst int INF = std::numeric_limits<int>::max();\n\nvoid dijkstra(int start, const std::vector<std::vector<std::pair<int, int>>>& adj) {\n    std::vector<int> dist(adj.size(), INF);\n    // priority_queue lưu pair<dist, node>\n    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> pq;\n    \n    dist[start] = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        if (d > dist[u]) continue;\n        \n        for (auto edge : adj[u]) {\n            int v = edge.first;\n            int weight = edge.second;\n            if (dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n}`,
        python: `# Mã nguồn mẫu Python: Dijkstra's Shortest Path\nimport heapq\n\ndef dijkstra(start, adj):\n    dist = [float('inf')] * len(adj)\n    dist[start] = 0\n    pq = [(0, start)]\n    \n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n            \n        for v, weight in adj[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                heapq.heappush(pq, (dist[v], v))`
      },
      apps: ["Định tuyến mạng máy tính (Network routing OSPF).", "Chỉ đường trên Google Maps, GPS.", "AI cho nhân vật tìm đường trong game."],
      exercises: [
        { name: "LeetCode 743. Network Delay Time", diff: "Medium", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "dist[start] = 0; Q = {all nodes}" },
        { num: 2, text: "while Q is not empty do" },
        { num: 3, text: "  u = Q.extract_min()" },
        { num: 4, text: "  for v in neighbors(u) do" },
        { num: 5, text: "    alt = dist[u] + weight(u, v)" },
        { num: 6, text: "    if alt < dist[v]: dist[v] = alt" }
      ]
    }
  }
};

// 5. Helper function to locate an algorithm profile metadata in categories array
function findAlgorithmMetadata(algoId) {
  for (let cat of algoCategories) {
    let algo = cat.algos.find(a => a.id === algoId);
    if (algo) return { algo, category: cat };
  }
  return null;
}

// 6. General Dynamic Engine generator mapping logic based on ID names (Returns static metadata only)
function autoGenerateAlgorithmProfile(algoId, catId) {
  let meta = findAlgorithmMetadata(algoId);
  let algoObj = meta ? meta.algo : { name: algoId, time: "O(n)" };

  // Predict visualizer type
  let vType = "console";
  if (catId === "sorting_comp" || catId === "sorting_noncomp") {
    vType = "array";
  } else if (catId === "searching") {
    vType = "array";
  } else if (catId === "dp") {
    vType = "dp-grid";
  } else if (catId === "graphs" || catId === "trees") {
    vType = "graph";
  }

  // Custom Vietnamese Academic descriptions (static metadata only)
  return {
    name: algoObj.name,
    details: {
      category: catId,
      vType: vType,
      complexity: {
        best: algoObj.time || "O(n)",
        avg: algoObj.time || "O(n)",
        worst: algoObj.time || "O(n)",
        space: "O(1)"
      },
      shortSummary: `Học thuật và giả lập trực quan hóa sinh động thuật toán ${algoObj.name}.`,
      concept: `${algoObj.name} là giải thuật tối ưu nằm trong phân nhóm ${meta ? meta.category.name : catId}. Trực quan hóa giúp hiểu sâu nguyên lý cấu trúc hoạt động thực tiễn của giải thuật này.`,
      conditions: "Dữ liệu được nạp vào ở dạng chuẩn hóa, tương thích các cấu trúc dữ liệu cơ sở của hệ thống.",
      idea: `Duyệt qua không gian trạng thái, chia nhỏ các bài toán thành phần để xử lý độc lập tối ưu hiệu năng tính toán.`,
      guide: vType === "array"
        ? "Nhấn nút Play trên thanh điều khiển. Ô màu cam/vàng đại diện cho phần so sánh/duyệt, ô màu đỏ biểu thị hoán đổi, ô màu xanh biểu thị phần tử đã sắp xếp đúng vị trí."
        : vType === "dp-grid"
          ? "Nhấn nút Play để nạp bảng quy hoạch động 2D. Tế bào màu vàng biểu thị ô đang tính toán, các ô màu xanh đại diện cho trạng thái tối ưu đã được lưu trữ."
          : "Xem thông tin log dòng lệnh terminal phía dưới hiển thị chu kỳ chạy của các bước thuật toán.",
      pseudocode: `procedure ${algoId}(data)\n  // Khởi tạo các tham số lặp\n  for each element in data do\n    process(element)\nend procedure`,
      sourceCode: {
        cpp: `// Phiên bản mã nguồn mẫu C++ chuẩn hóa\n#include <iostream>\n\nvoid runAlgorithm() {\n    std::cout << "Algorithm ${algoObj.name} is running..." << std::endl;\n}`,
        python: `# Phiên bản mã nguồn mẫu Python chuẩn hóa\ndef run_algorithm():\n    print("Algorithm ${algoObj.name} is running...")`
      },
      apps: [
        `Tối ưu hiệu năng xử lý phần mềm.`,
        `Ứng dụng trong các module hệ thống cốt lõi.`
      ],
      exercises: [
        { name: `LeetCode - Bài tập về ${algoObj.name}`, diff: "Medium", url: "#" }
      ],
      codeTrace: [
        { num: 1, text: "Khởi tạo tài nguyên" },
        { num: 2, text: "Duyệt vòng lặp chính" },
        { num: 3, text: "  Xử lý logic từng phần tử" }
      ]
    }
  };
}

// 7. Intercept database accesses to dynamically support all categories automatically and link dynamic executions
const algorithmDatabase = new Proxy(hardcodedDatabase, {
  get: function (target, prop) {
    if (prop === "linear" || prop === "binary" || prop === "bubble" || prop === "selection" || prop === "sieve_primes") {
      let profile = target[prop];
      return {
        ...profile,
        execution: {
          generator: getAlgorithmGenerator(prop, profile.details.category)
        }
      };
    }

    // Find category ID of this algorithm to generate profile
    let meta = findAlgorithmMetadata(prop);
    if (!meta) return undefined;

    let catId = meta.category.id;
    let profile = autoGenerateAlgorithmProfile(prop, catId);

    return {
      ...profile,
      execution: {
        generator: getAlgorithmGenerator(prop, catId)
      }
    };
  }
});
