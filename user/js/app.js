
    // =============================================================================
    // KENTOLAB DOM SAFETY HELPERS
    // =============================================================================
    function safeAddClass(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.classList.add(className);
    }
    function safeRemoveClass(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.classList.remove(className);
    }
    function safeSetHTML(elementIdOrEl, html) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.innerHTML = html;
    }
    function safeSetText(elementIdOrEl, text) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.innerText = text;
    }
    function safeSetValue(elementIdOrEl, value) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.value = value;
    }
    function safeSetDisabled(elementIdOrEl, disabled) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.disabled = disabled;
    }
    function safeSetClassName(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.className = className;
    }

    // List of officially supported interactive simulation algorithms
    const playgroundAlgos = ["linear", "binary", "bubble", "selection", "bfs", "dfs", "dijkstra_graph", "sieve_primes"];

    function hasPlayground(algoId) {
      return playgroundAlgos.includes(algoId);
    }

    // System definitions of 31 Categories
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
          { id: "sha256", name: "SHA-255 Hashing", diff: "Medium", time: "O(length)" },
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

    // MegaGroups mapping to organize 31 categories into 7 large groups (UPGRADED DETAILED DESCRIPTIONS)
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

    let activeMegaGroupId = "core";
    let activeAlgoId = "binary";
    let activeCategoryId = "searching";
    let currentMode = "play"; // 'play' (Playground) or 'learn' (Theory)
    let currentView = "dashboard"; // 'dashboard' (shows grid cards) or 'workspace' (shows live playground) or 'profile' (User details page)

    // Audio State variables
    let audioCtx = null;
    let isSoundOn = false;

    // Simulation playback variables
    let steps = [];
    let currentStepIdx = 0;
    let playTimer = null;
    let playSpeed = 600; // ms
    let currentVisualizerType = 'array';

    // Sidebar DOM refs resolved lazily after loadSharedComponents()

    let isCollapsed = false;

    sidebarToggleDesktop.addEventListener("click", () => {
      isCollapsed = !isCollapsed;
      if (isCollapsed) {
        mainSidebar.classList.add("sidebar-collapsed");
        sidebarToggleIcon.className = "fa-solid fa-angles-right text-xs";
      } else {
        mainSidebar.classList.remove("sidebar-collapsed");
        sidebarToggleIcon.className = "fa-solid fa-angles-left text-xs";
      }
    });

    sidebarToggleMobile.addEventListener("click", () => {
      sidebarNavContainer.classList.toggle("hidden");
    });

    function playAudioTone(val, maxVal = 100) {
      if (!isSoundOn) return;
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const minFreq = 180;
        const maxFreq = 900;
        const freq = minFreq + (val / maxVal) * (maxFreq - minFreq);

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.16);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.16);
      } catch (err) {
        console.warn("Audio Context blocked or failed to initialize:", err);
      }
    }

    // Master database detailing standard algorithms
    const algorithmDatabase = {
      "linear": {
        category: "searching",
        vType: "array",
        best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)",
        shortSummary: "Tìm kiếm tuần tự duyệt qua từng phần tử mảng từ đầu đến cuối cho đến khi gặp giá trị cần tìm.",
        concept: "Tìm kiếm tuần tự (Linear Search) là giải thuật tìm kiếm đơn giản nhất. Để tìm một khóa Target trong danh sách, ta tiến hành quét tuyến tính qua từng phần tử từ index 0 đến n-1, so sánh giá trị cho tới khi khớp hoàn toàn.",
        conditions: "Không có điều kiện tiên quyết nào. Hoạt động trên mọi loại mảng số, danh sách liên kết, mảng chưa được sắp xếp hoặc có dữ liệu trùng lặp.",
        idea: "Xuất phát từ đầu danh sách. Tại mỗi bước so sánh giá trị phần tử hiện tại với mục tiêu. Nếu bằng nhau, trả về vị trí. Nếu đi hết mảng mà không khớp, kết luận phần tử không tồn tại.",
        guide: "Nhập giá trị 'Target' cần tìm trong bảng cấu hình bên trái. Nhấn nút Play để hệ thống quét sáng (vàng) tuần tự qua các ô số mảng cho đến khi ô số chuyển màu xanh (đã khớp) hoặc màu đỏ sọc (bị loại).",
        pseudocode: "procedure linearSearch(arr, target)\n  for i = 0 to arr.length - 1 do\n    if arr[i] == target then\n      return i // Đã tìm thấy\n  return -1 // Không tìm thấy\nend procedure",
        codeCpp: `#include <iostream>\n#include <vector>\n\nint linearSearch(const std::vector<int>& arr, int target) {\n    for (size_t i = 0; i < arr.size(); ++i) {\n        if (arr[i] == target) {\n            return i; // Found\n        }\n    }\n    return -1; // Not found\n}`,
        codePy: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i  # Found\n    return -1  # Not found`,
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
        ],
        generator: function (arr, target) {
          let steps = [];
          steps.push({ array: [...arr], highlights: {}, line: 1, desc: `Khởi động tìm kiếm tuần tự cho Target = ${target}` });
          let found = false;
          for (let i = 0; i < arr.length; i++) {
            steps.push({ array: [...arr], highlights: { [i]: 'compare' }, line: 2, desc: `Kiểm tra index i = ${i}: arr[i] = ${arr[i]}. So sánh với ${target}` });
            if (arr[i] === target) {
              steps.push({ array: [...arr], highlights: { [i]: 'match' }, line: 3, desc: `Đã tìm thấy Target ${target} khớp tại index ${i}!` });
              found = true;
              break;
            } else {
              let hl = {};
              for (let k = 0; k <= i; k++) hl[k] = 'skipped';
              steps.push({ array: [...arr], highlights: hl, line: 1, desc: `arr[${i}] = ${arr[i]} không khớp. Tăng i lên 1.` });
            }
          }
          if (!found) {
            let hl = {};
            for (let k = 0; k < arr.length; k++) hl[k] = 'skipped';
            steps.push({ array: [...arr], highlights: hl, line: 4, desc: "Đã duyệt qua toàn bộ mảng nhưng không tìm thấy Target." });
          }
          return steps;
        }
      },
      "binary": {
        category: "searching",
        vType: "array",
        best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)",
        shortSummary: "Tìm kiếm nhị phân liên tục chia đôi khoảng tìm kiếm, đòi hỏi mảng đã sắp xếp tăng dần.",
        concept: "Tìm kiếm nhị phân (Binary Search) là một giải thuật tìm kiếm chia để trị cực kỳ tối ưu. Bằng cách so sánh giá trị cần tìm với phần tử chính giữa mảng, thuật toán loại bỏ được một nửa không gian tìm kiếm sau mỗi bước so sánh.",
        conditions: "Mảng đầu vào bắt buộc phải được sắp xếp theo một thứ tự xác định (thường là tăng dần).",
        idea: "Đặt hai con trỏ Low và High ở đầu và cuối mảng. Tính vị trí chính giữa Mid. Nếu giá trị tại Mid bằng Target, dừng tìm kiếm. Nếu giá trị tại Mid bé hơn Target, co dải tìm kiếm sang nửa phải (Low = Mid + 1). Ngược lại co sang nửa trái (High = Mid - 1).",
        guide: "Hệ thống sẽ tự động sắp xếp mảng tăng dần trước khi bắt đầu. Nhìn vào màn hình trực quan, vùng nhạt mờ là vùng đã bị loại bỏ; Low và High đánh dấu ranh giới hoạt động, và ô màu vàng chính là Mid đang được xét duyệt.",
        pseudocode: "procedure binarySearch(arr, target)\n  low = 0, high = arr.length - 1\n  while low <= high do\n    mid = (low + high) / 2\n    if arr[mid] == target return mid\n    else if arr[mid] < target low = mid + 1\n    else high = mid - 1\n  return -1\nend procedure",
        codeCpp: `#include <iostream>\n#include <vector>\n\nint binarySearch(const std::vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        codePy: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
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
        ],
        generator: function (arr, target) {
          let sortedArr = [...arr].sort((a, b) => a - b);
          let steps = [];
          steps.push({ array: [...sortedArr], highlights: {}, low: 0, high: sortedArr.length - 1, line: 1, desc: `Sắp xếp mảng để chạy Binary Search cho Target = ${target}` });

          let low = 0, high = sortedArr.length - 1;
          let found = false;

          while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            let hl = {};
            for (let k = 0; k < sortedArr.length; k++) {
              if (k < low || k > high) hl[k] = 'skipped';
            }
            hl[mid] = 'compare';

            steps.push({ array: [...sortedArr], highlights: { ...hl }, low, high, mid, line: 3, desc: `Đặt ranh giới [Low=${low}, High=${high}]. Tính toán mid = ${mid} (arr[mid] = ${sortedArr[mid]})` });

            if (sortedArr[mid] === target) {
              hl[mid] = 'match';
              steps.push({ array: [...sortedArr], highlights: { ...hl }, low, high, mid, line: 4, desc: `Đã KHỚP! Tìm thấy Target tại vị trí mid = ${mid}.` });
              found = true;
              break;
            } else if (sortedArr[mid] < target) {
              low = mid + 1;
              let postHl = {};
              for (let k = 0; k < sortedArr.length; k++) {
                if (k < low) postHl[k] = 'skipped';
              }
              steps.push({ array: [...sortedArr], highlights: postHl, low, high, line: 5, desc: `Do arr[mid] (${sortedArr[mid]}) < ${target}, thu hẹp tìm kiếm sang nửa phải: low = mid + 1 = ${low}` });
            } else {
              high = mid - 1;
              let postHl = {};
              for (let k = 0; k < sortedArr.length; k++) {
                if (k > high) postHl[k] = 'skipped';
              }
              steps.push({ array: [...sortedArr], highlights: postHl, low, high, line: 6, desc: `Do arr[mid] (${sortedArr[mid]}) > ${target}, thu hẹp tìm kiếm sang nửa trái: high = mid - 1 = ${high}` });
            }
          }
          if (!found) {
            let hl = {};
            for (let k = 0; k < sortedArr.length; k++) hl[k] = 'skipped';
            steps.push({ array: [...sortedArr], highlights: hl, line: 2, desc: "Low > High. Không tìm thấy Target trong mảng." });
          }
          return steps;
        }
      },
      "bubble": {
        category: "sorting_comp",
        vType: "array",
        best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)",
        shortSummary: "Nổi bọt liên tục so sánh các cặp phần tử kề nhau để đẩy dần giá trị lớn nhất về cuối mảng.",
        concept: "Sắp xếp nổi bọt (Bubble Sort) hoạt động dựa trên nguyên lý so sánh liên tục từng cặp phần tử liền kề nhau và thực hiện hoán đổi nếu chúng sai thứ tự. Quá trình này được lặp đi lặp lại cho đến khi mảng đã được xếp đúng mong muốn.",
        conditions: "Hoạt động trực tiếp trên mảng không yêu cầu điều kiện bộ nhớ đặc thù. Phù hợp cho mục tiêu học tập.",
        idea: "Sử dụng 2 vòng lặp lồng nhau. Mỗi lần duyệt qua mảng chưa sắp xếp, so sánh arr[j] và arr[j+1]. Nếu arr[j] > arr[j+1], đổi chỗ hai số. Sau lượt quét thứ i, phần tử lớn thứ i sẽ chắc chắn trôi về cuối mảng.",
        guide: "Bấm Play để xem hoạt động hoán đổi. Hai phần tử màu cam thể hiện cặp số đang so sánh. Nếu xảy ra đổi chỗ, chúng sẽ chuyển màu đỏ. Các phần tử cố định màu xanh là đã nằm đúng vị trí.",
        pseudocode: "procedure bubbleSort(arr)\n  for i = 0 to arr.length - 2 do\n    for j = 0 to arr.length - i - 2 do\n      if arr[j] > arr[j+1] then\n        swap(arr[j], arr[j+1])\nend procedure",
        codeCpp: `#include <iostream>\n#include <vector>\n\nvoid bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; ++i) {\n        for (int j = 0; j < n - i - 1; ++j) {\n            if (arr[j] > arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}`,
        codePy: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
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
        ],
        generator: function (arr) {
          let steps = [];
          let temp = [...arr];
          let n = temp.length;
          steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi tạo mảng ban đầu, bắt đầu Bubble Sort." });
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              steps.push({ array: [...temp], highlights: { [j]: 'compare', [j + 1]: 'compare' }, line: 3, desc: `So sánh cặp phần tử kề nhau arr[${j}] (${temp[j]}) và arr[${j + 1}] (${temp[j + 1]})` });
              if (temp[j] > temp[j + 1]) {
                let s = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = s;
                steps.push({ array: [...temp], highlights: { [j]: 'swap', [j + 1]: 'swap' }, line: 4, desc: `Vì ${temp[j + 1]} < ${temp[j]}, tiến hành hoán đổi hai số này.` });
              }
            }
            let sorted = {};
            for (let k = n - i - 1; k < n; k++) sorted[k] = 'sorted';
            steps.push({ array: [...temp], highlights: sorted, line: 1, desc: `Phần tử lớn nhất trong phân đoạn quét (${temp[n - i - 1]}) đã cố định chính xác.` });
          }
          let sortedAll = {};
          for (let k = 0; k < n; k++) sortedAll[k] = 'sorted';
          steps.push({ array: [...temp], highlights: sortedAll, line: 1, desc: "Chúc mừng! Toàn bộ mảng đã được sắp xếp hoàn tất." });
          return steps;
        }
      },
      "selection": {
        category: "sorting_comp",
        vType: "array",
        best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)",
        shortSummary: "Quét vùng chưa sắp xếp, tìm phần tử bé nhất rồi đưa về vị trí đầu vùng.",
        concept: "Sắp xếp chọn (Selection Sort) chia mảng thành hai phần: phần đã sắp xếp nằm ở bên trái và phần chưa sắp xếp nằm ở bên phải. Tại mỗi bước, thuật toán sẽ tìm giá trị nhỏ nhất từ phần chưa sắp xếp và hoán đổi nó lên vị trí đầu tiên của phần đó.",
        conditions: "Không yêu cầu điều kiện mảng.",
        idea: "Chạy một vòng lặp i từ 0 đến n-2. Giả sử min_idx ban đầu bằng i. Quét qua các vị trí j từ i+1 đến n-1, nếu arr[j] < arr[min_idx], cập nhật min_idx = j. Sau vòng lặp quét, đổi vị trí phần tử arr[i] và arr[min_idx].",
        guide: "Phần tử được đánh dấu màu tím chính là mốc tối thiểu giả định đang nắm giữ. Khi phát hiện cột màu đỏ nhỏ hơn, mốc tím sẽ nhảy sang đó trước khi hoán đổi với cột đầu phân đoạn.",
        pseudocode: "procedure selectionSort(arr)\n  for i = 0 to n-1 do\n    min_idx = i\n    for j = i+1 to n-1 do\n      if arr[j] < arr[min_idx] then min_idx = j\n    swap(arr[i], arr[min_idx])\nend procedure",
        codeCpp: `#include <iostream>\n#include <vector>\n\nvoid selectionSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; ++i) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; ++j) {\n            if (arr[j] < arr[minIdx]) {\n                minIdx = j;\n            }\n        }\n        std::swap(arr[i], arr[minIdx]);\n    }\n}`,
        codePy: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
        apps: ["Tối ưu số lần ghi lên các thiết bị nhớ Flash (như ổ đĩa SSD) vì thuật toán này thực hiện hoán đổi tối đa chỉ n lần."],
        exercises: [{ name: "SPOJ - Selection Sort Practice", diff: "Easy", url: "#" }],
        codeTrace: [
          { num: 1, text: "for i = 0 to n-1 do" },
          { num: 2, text: "  min_idx = i" },
          { num: 3, text: "  for j = i+1 to n-1 do" },
          { num: 4, text: "    if arr[j] < arr[min_idx] then min_idx = j" },
          { num: 5, text: "  swap(arr[i], arr[min_idx])" }
        ],
        generator: function (arr) {
          let steps = [];
          let temp = [...arr];
          let n = temp.length;
          steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi động Selection Sort." });
          for (let i = 0; i < n - 1; i++) {
            let min_idx = i;
            steps.push({ array: [...temp], highlights: { [i]: 'pivot' }, line: 2, desc: `Giả sử giá trị nhỏ nhất tạm thời nằm ở index i = ${i} (arr[i] = ${temp[i]})` });
            for (let j = i + 1; j < n; j++) {
              steps.push({ array: [...temp], highlights: { [min_idx]: 'pivot', [j]: 'compare' }, line: 4, desc: `So sánh giá trị chưa sắp xếp arr[${j}] (${temp[j]}) với giá trị nhỏ nhất hiện có (${temp[min_idx]})` });
              if (temp[j] < temp[min_idx]) {
                min_idx = j;
                steps.push({ array: [...temp], highlights: { [min_idx]: 'pivot' }, line: 4, desc: `Tìm thấy phần tử nhỏ hơn! Cập nhật min_idx mới là ${min_idx} (arr[min_idx] = ${temp[min_idx]})` });
              }
            }
            if (min_idx !== i) {
              steps.push({ array: [...temp], highlights: { [i]: 'swap', [min_idx]: 'swap' }, line: 5, desc: `Tiến hành đổi chỗ giá trị đầu mảng chưa sắp xếp (${temp[i]}) với phần tử bé nhất tìm được (${temp[min_idx]})` });
              let s = temp[i];
              temp[i] = temp[min_idx];
              temp[min_idx] = s;
            }
            let sorted = {};
            for (let k = 0; k <= i; k++) sorted[k] = 'sorted';
            steps.push({ array: [...temp], highlights: sorted, line: 1, desc: `Phần tử nhỏ nhất thứ ${i + 1} đã được cố định chính xác tại index ${i}.` });
          }
          let sortedAll = {};
          for (let k = 0; k < n; k++) sortedAll[k] = 'sorted';
          steps.push({ array: [...temp], highlights: sortedAll, line: 1, desc: "Mảng đã hoàn toàn được sắp xếp tăng dần!" });
          return steps;
        }
      },
      "sieve_primes": {
        category: "math",
        vType: "console",
        best: "O(n log log n)", avg: "O(n log log n)", worst: "O(n log log n)", space: "O(n)",
        shortSummary: "Sàng nguyên tố Eratosthenes dùng mảng đánh dấu để lọc nhanh mọi số nguyên tố bé hơn N.",
        concept: "Sàng Eratosthenes là giải thuật số học cổ xưa để tìm tất cả các số nguyên tố trong phạm vi giới hạn từ 2 đến N cực kỳ nhanh chóng. Hoạt động dựa trên việc loại bỏ dần bội số của các số nguyên tố tìm thấy.",
        conditions: "Cần mảng bộ nhớ phụ có kích thước tối thiểu là N + 1 để đánh dấu trạng thái nguyên tố.",
        idea: "Khởi tạo tất cả số từ 2 đến N là số nguyên tố. Bắt đầu từ số nguyên tố đầu tiên p = 2. Nếu p chưa bị loại bỏ, đánh dấu toàn bộ các bội số của p lớn hơn hoặc bằng p² (2p, 3p,...) là hợp số. Tiếp tục quy trình với số p tiếp theo chưa bị loại.",
        guide: "Kiểm tra dòng lệnh console bên dưới để xem cách thuật toán khóa dần bội số của 2, 3, 5, 7, v.v., chừa lại các số nguyên tố cuối cùng dưới 100.",
        pseudocode: "procedure sieve(n)\n  prime[0..n] = true\n  prime[0] = prime[1] = false\n  for p = 2 to sqrt(n) do\n    if prime[p] == true then\n      for i = p*p to n step p do\n        prime[i] = false\nend procedure",
        codeCpp: `#include <iostream>\n#include <vector>\n#include <cmath>\n\nstd::vector<int> sieve(int n) {\n    std::vector<bool> isPrime(n + 1, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int p = 2; p * p <= n; ++p) {\n        if (isPrime[p]) {\n            for (int i = p * p; i <= n; i += p) {\n                isPrime[i] = false;\n            }\n        }\n    }\n    std::vector<int> primes;\n    for (int p = 2; p <= n; ++p) {\n        if (isPrime[p]) primes.push_back(p);\n    }\n    return primes;\n}`,
        codePy: `def sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for p in range(2, int(n**0.5) + 1):\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n    return [p for p in range(2, n + 1) if is_prime[p]]`,
        apps: ["Tìm kiếm và lưu trữ danh sách số nguyên tố lớn để giải các bài toán mật mã (như RSA).", "Phân tích thừa số nguyên tố nhanh cho nhiều số."],
        exercises: [{ name: "SPOJ - Prime Generator", diff: "Medium", url: "#" }],
        codeTrace: [
          { num: 1, text: "prime[2..n] = true" },
          { num: 2, text: "for p = 2 to sqrt(n) do" },
          { num: 3, text: "  if prime[p] == true then" },
          { num: 4, text: "    for i = p*p to n step p do" },
          { num: 5, text: "      prime[i] = false" }
        ],
        generator: function () {
          let steps = [];
          let n = 50;
          let is_prime = Array(n + 1).fill(true);
          is_prime[0] = is_prime[1] = false;
          steps.push({ consoleOut: "Bắt đầu khởi tạo sàng nguyên tố phạm vi N = 50.\nGiả sử ban đầu tất cả các số [2..50] đều là số nguyên tố.", line: 1 });

          for (let p = 2; p * p <= n; p++) {
            if (is_prime[p]) {
              steps.push({ consoleOut: `Số p = ${p} chưa bị đánh dấu -> Là SỐ NGUYÊN TỐ.\nTiến hành duyệt các bội số của ${p} bắt đầu từ ${p * p}...`, line: 3 });
              for (let i = p * p; i <= n; i += p) {
                if (is_prime[i]) {
                  is_prime[i] = false;
                  steps.push({ consoleOut: `  Đánh dấu bội số: ${i} = ${p} * ${i / p} là HỢP SỐ (loại bỏ khỏi sàng).`, line: 5 });
                }
              }
            }
          }
          let primes = [];
          for (let k = 2; k <= n; k++) {
            if (is_prime[k]) primes.push(k);
          }
          steps.push({ consoleOut: `Sàng hoàn tất!\nCác số nguyên tố tìm được trong phạm vi [2..50] là:\n>> [ ${primes.join(", ")} ]`, line: 1 });
          return steps;
        }
      },
      "bfs": {
        category: "graphs",
        vType: "graph",
        best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)",
        shortSummary: "Duyệt đồ thị theo chiều rộng sử dụng hàng đợi (Queue) để duyệt tuần tự các lân cận gần nhất.",
        concept: "Breadth-First Search (BFS) là thuật toán duyệt hoặc tìm kiếm trên đồ thị. Thuật toán bắt đầu từ một đỉnh gốc và duyệt tất cả các đỉnh lân cận ở mức hiện tại trước khi đi sâu xuống mức tiếp theo.",
        conditions: "Hoạt động tốt trên cả đồ thị có hướng và vô hướng. Phù hợp nhất để tìm đường đi ngắn nhất trên đồ thị không trọng số.",
        idea: "Sử dụng một cấu trúc dữ liệu Hàng đợi (Queue) và mảng đánh dấu các đỉnh đã duyệt (Visited). Bắt đầu đẩy đỉnh gốc vào Queue. Khi Queue không rỗng, lấy phần tử đầu ra, duyệt các lân cận chưa thăm của nó, đánh dấu đã thăm và đẩy tiếp vào Queue.",
        guide: "Bấm trực tiếp vào bất kỳ đỉnh nào trên màn hình trực quan (ví dụ: đỉnh A hoặc B) để kích hoạt mô phỏng duyệt BFS từng bước.",
        pseudocode: "procedure BFS(G, start_node)\n  let Q be a queue\n  label start_node as visited\n  Q.enqueue(start_node)\n  while Q is not empty do\n    v = Q.dequeue()\n    for all neighbors w of v in G do\n      if w is not labeled as visited then\n        label w as visited\n        Q.enqueue(w)\nend procedure",
        codeCpp: `// Code mẫu BFS bằng C++ sử dụng danh sách kề\n#include <iostream>\n#include <vector>\n#include <queue>\n\nvoid BFS(int start, const std::vector<std::vector<int>>& adj) {\n    std::vector<bool> visited(adj.size(), false);\n    std::queue<int> q;\n    visited[start] = true;\n    q.push(start);\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        std::cout << u << " ";\n        for (int v : adj[u]) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n}`,
        codePy: `def bfs(graph, start):\n    visited = set([start])\n    queue = [start]\n    while queue:\n        vertex = queue.pop(0)\n        print(vertex, end=\" \")\n        for neighbor in graph[vertex]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)`,
        apps: ["Tìm cây bao trùm tối thiểu.", "Tìm đường đi ngắn nhất trên đồ thị không trọng số.", "Thuật toán tìm kiếm lân cận trong mạng xã hội."],
        exercises: [{ name: "LeetCode 102. Binary Tree Level Order Traversal", diff: "Medium" }],
        codeTrace: [
          { num: 1, text: "Q.enqueue(start_node)" },
          { num: 2, text: "while Q is not empty do" },
          { num: 3, text: "  v = Q.dequeue()" },
          { num: 4, text: "  for each neighbor w of v do" },
          { num: 5, text: "    if w not visited then" },
          { num: 6, text: "      visited[w] = true, Q.enqueue(w)" }
        ]
      },
      "dfs": {
        category: "graphs",
        vType: "graph",
        best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)",
        shortSummary: "Duyệt đồ thị theo chiều sâu sử dụng đệ quy để đi sâu nhất có thể trên mỗi nhánh.",
        concept: "Depth-First Search (DFS) là giải thuật duyệt đồ thị bắt đầu từ đỉnh gốc và đi dọc theo mỗi nhánh sâu nhất có thể trước khi quay lui (backtrack).",
        conditions: "Hoạt động trên mọi đồ thị có hướng, vô hướng, liên thông hoặc không liên thông.",
        idea: "Sử dụng đệ quy (hệ thống Stack ngầm định). Bắt đầu từ đỉnh xuất phát, đánh dấu đỉnh hiện tại là đã duyệt. Với mỗi đỉnh lân cận chưa duyệt, tiến hành đi sâu vào đỉnh lân cận đó bằng cách gọi đệ quy tiếp tục.",
        guide: "Chọn một đỉnh bất kỳ (ví dụ: đỉnh A, B hoặc C) trên khung canvas phía trên để bắt đầu chuỗi mô phỏng DFS đi sâu.",
        pseudocode: "procedure DFS(G, v)\n  label v as visited\n  for all directed edges from v to w that are in G.adjacentEdges(v) do\n    if vertex w is not labeled as visited then\n      recursively call DFS(G, w)\nend procedure",
        codeCpp: `// Code mẫu DFS đệ quy bằng C++\n#include <iostream>\n#include <vector>\n\nvoid DFS(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {\n    visited[u] = true;\n    std::cout << u << " ";\n    for (int v : adj[u]) {\n        if (!visited[v]) {\n            DFS(v, adj, visited);\n        }\n    }\n}`,
        codePy: `def dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    print(start, end=\" \")\n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)`,
        apps: ["Tìm kiếm đường đi giữa hai đỉnh.", "Phát hiện chu trình trên đồ thị.", "Sắp xếp topo (Topological Sort)."],
        exercises: [{ name: "LeetCode 200. Number of Islands", diff: "Medium" }],
        codeTrace: [
          { num: 1, text: "label v as visited" },
          { num: 2, text: "for each neighbor w of v do" },
          { num: 3, text: "  if w not visited then" },
          { num: 4, text: "    recursively call DFS(G, w)" }
        ]
      },
      "dijkstra_graph": {
        category: "graphs",
        vType: "graph",
        best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V)",
        shortSummary: "Tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác trên đồ thị vô hướng.",
        concept: "Thuật toán Dijkstra giải quyết bài toán đường đi ngắn nhất nguồn đơn trên đồ thị có trọng số liên kết không âm. Bằng cách duy trì nhãn khoảng cách tạm thời và tối ưu hóa liên tục.",
        conditions: "Trọng số trên các cạnh bắt buộc phải lớn hơn hoặc bằng 0 (không âm).",
        idea: "Khởi tạo khoảng cách đến đỉnh nguồn là 0, các đỉnh khác là vô cùng. Tại mỗi bước, chọn đỉnh U chưa duyệt có khoảng cách nhỏ nhất. Cố định nhãn đỉnh U. Thực hiện tối ưu khoảng cách đến các đỉnh lân cận V của U.",
        guide: "Chọn đỉnh bắt đầu từ khung vẽ trực quan 2D phía trên để theo dõi quá trình tối ưu nhãn khoảng cách ngắn nhất từng bước.",
        pseudocode: "procedure Dijkstra(G, source)\n  dist[source] = 0\n  for each vertex v in G do\n    if v != source dist[v] = infinity\n  while Q is not empty do\n    u = vertex in Q with min dist\n    remove u from Q\n    for each neighbor v of u do\n      alt = dist[u] + length(u, v)\n      if alt < dist[v] then\n        dist[v] = alt\nend procedure",
        codeCpp: `// Code mẫu Dijkstra bằng C++\n#include <iostream>\n#include <vector>\n#include <queue>\n\nconst int INF = 1e9;\nvoid dijkstra(int source, const std::vector<std::vector<std::pair<int, int>>>& adj) {\n    std::vector<int> dist(adj.size(), INF);\n    dist[source] = 0;\n    // Code tối ưu dùng Priority Queue\n}`,
        codePy: `def dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    # Run algorithm priority queue\n    return distances`,
        apps: ["Bản đồ định vị vệ tinh như Google Maps.", "Định tuyến lưu lượng mạng dữ liệu máy tính."],
        exercises: [{ name: "LeetCode 743. Network Delay Time", diff: "Medium" }],
        codeTrace: [
          { num: 1, text: "dist[source] = 0" },
          { num: 2, text: "while Q is not empty do" },
          { num: 3, text: "  u = vertex with min dist" },
          { num: 4, text: "  for each neighbor v of u do" },
          { num: 5, text: "    relax: dist[u] + weight < dist[v]" }
        ]
      }
    };

    // Graph visualizer data modeling
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

    let isAddingNodeMode = false;
    let isConnectingMode = false;
    let firstSelectedNode = null;

    // ----------------------------------------------------
    // AUTHENTICATION LOGIC & INTERFACE CONTROLS
    // ----------------------------------------------------
    function syncAuthUI() {
      const loggedOutBox = document.getElementById("sidebar-auth-logged-out");
      const loggedInBox = document.getElementById("sidebar-auth-logged-in");

      if (currentUser) {
        loggedOutBox.classList.add("hidden");
        loggedInBox.classList.remove("hidden");

        document.getElementById("sidebar-user-name").innerText = currentUser.name;
        document.getElementById("sidebar-user-avatar-placeholder").innerText = currentUser.name.charAt(0).toUpperCase();

        const badge = document.getElementById("sidebar-user-badge");
        badge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;

        if (currentUser.plan === 'Free') {
          badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700";
        } else if (currentUser.plan === 'Pro') {
          badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 shadow-sm";
        } else {
          badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-purple-900/40 text-purple-300 border border-purple-500/30 shadow-sm animate-pulse";
        }
      } else {
        loggedOutBox.classList.remove("hidden");
        loggedInBox.classList.add("hidden");
      }
    }

    function openAuthModal(tab = 'login') {
      document.getElementById("auth-modal").classList.remove("hidden");
      toggleAuthTab(tab);
    }

    function closeAuthModal() {
      document.getElementById("auth-modal").classList.add("hidden");
    }

    function toggleAuthTab(tab) {
      const loginTabBtn = document.getElementById("auth-tab-login");
      const registerTabBtn = document.getElementById("auth-tab-register");
      const loginForm = document.getElementById("auth-form-login");
      const registerForm = document.getElementById("auth-form-register");

      if (tab === 'login') {
        loginTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-indigo-500 text-indigo-400";
        registerTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
      } else {
        loginTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
        registerTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-indigo-500 text-indigo-400";
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
      }
    }

    function submitLogin(e) {
      e.preventDefault();
      const email = document.getElementById("login-input-email").value.trim().toLowerCase();
      const pass = document.getElementById("login-input-password").value;

      const matchedUser = usersDb.find(u => u.email === email && u.password === pass);
      if (matchedUser) {
        currentUser = matchedUser;
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        syncAuthUI();
        closeAuthModal();
        showToast(`Chào mừng bạn quay lại, ${currentUser.name}!`, "success");
        // Reload dashboard to update locks representation
        if (currentView === "dashboard") {
          renderMegaGroupDashboard(activeMegaGroupId);
        } else if (currentView === "workspace") {
          selectAlgorithm(activeAlgoId, activeCategoryId);
        }
      } else {
        showToast("Sai địa chỉ email hoặc mật khẩu bảo mật!", "error");
      }
    }

    function submitRegister(e) {
      e.preventDefault();
      const name = document.getElementById("register-input-name").value.trim();
      const email = document.getElementById("register-input-email").value.trim().toLowerCase();
      const pass = document.getElementById("register-input-password").value;

      if (pass.length < 6) {
        showToast("Mật khẩu bảo mật phải có độ dài tối thiểu 6 ký tự!", "error");
        return;
      }

      if (usersDb.some(u => u.email === email)) {
        showToast("Địa chỉ email này đã tồn tại trên hệ thống!", "error");
        return;
      }

      const newUser = { email, password: pass, name, plan: 'Free' };
      usersDb.push(newUser);
      localStorage.setItem('users_db', JSON.stringify(usersDb));

      currentUser = newUser;
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      syncAuthUI();
      closeAuthModal();
      showToast("Đăng ký tài khoản thành công! Khởi tạo gói miễn phí.", "success");

      if (currentView === "dashboard") {
        renderMegaGroupDashboard(activeMegaGroupId);
      }
    }

    function handleLogout() {
      currentUser = null;
      localStorage.removeItem('current_user');
      syncAuthUI();
      showToast("Đã đăng xuất tài khoản an toàn.");
      if (currentView === "profile") {
        selectMegaGroup("core");
      } else if (currentView === "dashboard") {
        renderMegaGroupDashboard(activeMegaGroupId);
      } else if (currentView === "workspace") {
        selectAlgorithm(activeAlgoId, activeCategoryId);
      }
    }

    // ----------------------------------------------------
    // PAYMENT GATEWAY & SIMULATION SYSTEM
    // ----------------------------------------------------
    let pendingUpgradePlanName = "Pro";

    // ĐÃ CHỈNH SỬA: Cho phép click nâng cấp xem thông tin ngay, không bắt buộc đăng nhập
    function openPaymentModal() {
      document.getElementById("payment-modal").classList.remove("hidden");
      cancelPaymentFlow();
    }

    function closePaymentModal() {
      document.getElementById("payment-modal").classList.add("hidden");
    }

    function simulatePlanPayment(planName) {
      pendingUpgradePlanName = planName;
      const flowBox = document.getElementById("simulated-payment-flow");
      flowBox.classList.remove("hidden");

      document.getElementById("payment-flow-plan").innerText = planName;
      document.getElementById("payment-flow-price").innerText = planName === 'Pro' ? '129.000đ' : '399.000đ';

      // Auto scroll inside modal
      const modalBox = document.getElementById("payment-modal").firstElementChild;
      modalBox.scrollTop = modalBox.scrollHeight;
    }

    function cancelPaymentFlow() {
      document.getElementById("simulated-payment-flow").classList.add("hidden");
    }

    // ĐÃ CHỈNH SỬA: Tự động khởi tạo tài khoản Khách VIP nếu khách chưa có tài khoản
    function confirmSimulatedPayment() {
      if (!currentUser) {
        // Tự động sinh tài khoản khách mới, giảm ma sát cho trải nghiệm tối ưu
        const guestId = Math.floor(1000 + Math.random() * 9000);
        const guestEmail = `guest_${guestId}`;
        const guestPass = "123456";
        const guestName = `Học Viên VIP #${guestId}`;

        currentUser = { email: guestEmail, password: guestPass, name: guestName, plan: pendingUpgradePlanName };
        usersDb.push(currentUser);
        localStorage.setItem('users_db', JSON.stringify(usersDb));
        localStorage.setItem('current_user', JSON.stringify(currentUser));

        syncAuthUI();
        closePaymentModal();
        showToast(`Thanh toán thành công! Đã tự tạo tài khoản Khách VIP: [ ${guestEmail} ] - Mật khẩu: 123456`, "success");
      } else {
        // Nâng cấp trực tiếp trên tài khoản đang đăng nhập
        currentUser.plan = pendingUpgradePlanName;
        localStorage.setItem('current_user', JSON.stringify(currentUser));

        const idx = usersDb.findIndex(u => u.email === currentUser.email);
        if (idx !== -1) {
          usersDb[idx].plan = pendingUpgradePlanName;
          localStorage.setItem('users_db', JSON.stringify(usersDb));
        }

        syncAuthUI();
        closePaymentModal();
        showToast(`Chúc mừng! Gói thành viên của bạn đã được nâng cấp lên hạng [${pendingUpgradePlanName}]!`, "success");
      }

      // Phát âm thanh chúc mừng nâng cấp thành công
      if (isSoundOn && audioCtx) {
        playAudioTone(100, 100);
        setTimeout(() => playAudioTone(150, 100), 120);
      }

      // Làm mới lại giao diện hiển thị
      if (currentView === "dashboard") {
        renderMegaGroupDashboard(activeMegaGroupId);
      } else if (currentView === "workspace") {
        selectAlgorithm(activeAlgoId, activeCategoryId);
      } else if (currentView === "profile") {
        openProfilePage();
      }
    }

    // ----------------------------------------------------
    // PROFILE MANAGEMENT PANEL
    // ----------------------------------------------------
    function openProfilePage() {
      if (!currentUser) {
        showToast("Vui lòng đăng nhập để truy cập trang cá nhân!", "error");
        openAuthModal('login');
        return;
      }
      // MPA: if not on profile.html, navigate there
      if (!window.location.pathname.endsWith('profile.html')) {
        window.location.href = 'profile.html';
        return;
      }
      pausePlayback();
      currentView = "profile";

      // Hide dashboards & workspace, show Profile View
      safeAddClass("dashboard-container", "hidden");
      safeAddClass("workspace-container", "hidden");
      safeRemoveClass("profile-container", "hidden");

      safeAddClass("mode-switcher-container", "hidden");
      safeRemoveClass("btn-back-to-dashboard", "hidden");
      safeRemoveClass("breadcrumb-separator", "hidden");

      // Breadcrumbs Update
      safeSetText("algo-category-badge", "TÀI KHOẢN THÀNH VIÊN");
      safeSetHTML("workspace-title", `<i class="fa-solid fa-user-gear text-indigo-500"></i> Quản Trị Tài Khoản`);
      safeSetText("workspace-subtitle", "Tùy biến hồ sơ định danh, theo dõi nâng cấp dịch vụ.");

      // Load values into Profile Page
      safeSetText("profile-avatar-large", currentUser.name.charAt(0).toUpperCase());
      safeSetText("profile-lbl-name", currentUser.name);
      safeSetText("profile-lbl-email", currentUser.email);

      const planBadge = document.getElementById("profile-lbl-plan");
      if (planBadge) {
        planBadge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;
        if (currentUser.plan === 'Free') {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-850 text-slate-400 border border-slate-700";
          safeRemoveClass("profile-upgrade-btn", "hidden");
        } else if (currentUser.plan === 'Pro') {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30";
          safeAddClass("profile-upgrade-btn", "hidden");
        } else {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-900/40 text-purple-300 border border-purple-500/30";
          safeAddClass("profile-upgrade-btn", "hidden");
        }
      }

      // Input Prefills
      safeSetValue("profile-input-name", currentUser.name);
      safeSetValue("profile-input-email", currentUser.email);

      // Reset sensitive password forms
      safeSetValue("profile-input-old-pass", "");
      safeSetValue("profile-input-new-pass", "");
    }

    function handleUpdateProfile(e) {
      e.preventDefault();
      if (!currentUser) return;

      const newName = document.getElementById("profile-input-name").value.trim();
      if (!newName) return;

      currentUser.name = newName;
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      const idx = usersDb.findIndex(u => u.email === currentUser.email);
      if (idx !== -1) {
        usersDb[idx].name = newName;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
      }

      syncAuthUI();
      openProfilePage();
      showToast("Cập nhật thông tin họ tên thành công!", "success");
    }

    function handleUpdateEmail(e) {
      e.preventDefault();
      if (!currentUser) return;

      const newEmail = document.getElementById("profile-input-email").value.trim().toLowerCase();
      if (!newEmail) return;

      if (newEmail === currentUser.email) {
        showToast("Địa chỉ email trùng lặp với email hiện tại của tài khoản!", "error");
        return;
      }

      if (usersDb.some(u => u.email === newEmail)) {
        showToast("Địa chỉ email mới đã tồn tại trên một tài khoản khác!", "error");
        return;
      }

      const oldEmail = currentUser.email;
      currentUser.email = newEmail;
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      const idx = usersDb.findIndex(u => u.email === oldEmail);
      if (idx !== -1) {
        usersDb[idx].email = newEmail;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
      }

      syncAuthUI();
      openProfilePage();
      showToast("Thay đổi địa chỉ email liên hệ thành công!", "success");
    }

    function handleUpdatePassword(e) {
      e.preventDefault();
      if (!currentUser) return;

      const oldPass = document.getElementById("profile-input-old-pass").value;
      const newPass = document.getElementById("profile-input-new-pass").value;

      if (oldPass !== currentUser.password) {
        showToast("Xác thực thất bại: Mật khẩu hiện tại không chính xác!", "error");
        return;
      }

      if (newPass.length < 6) {
        showToast("Mật khẩu bảo mật mới phải tối thiểu từ 6 ký tự trở lên!", "error");
        return;
      }

      currentUser.password = newPass;
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      const idx = usersDb.findIndex(u => u.email === currentUser.email);
      if (idx !== -1) {
        usersDb[idx].password = newPass;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
      }

      openProfilePage();
      showToast("Đổi mật khẩu tài khoản thành công!", "success");
    }


    function buildSidebarCategories() {
      const container = document.getElementById("sidebar-nav-container");
      if (!container) return;
      container.innerHTML = "";

      megaGroups.forEach(group => {
        const isSelected = group.id === activeMegaGroupId;
        const btn = document.createElement("button");
        btn.className = `nav-btn w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-xs font-semibold transition duration-200 ${isSelected
            ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg"
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`;

        btn.onclick = () => {
          selectMegaGroup(group.id);
        };

        btn.innerHTML = `
          <div class="p-1.5 rounded bg-slate-950/40 text-slate-400 shrink-0">
            <i class="fa-solid ${group.icon} w-4 h-4 text-center"></i>
          </div>
          <span class="btn-text text-left flex-grow">${group.name}</span>
          <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
        `;
        container.appendChild(btn);
      });
    }

    // Render Dashboard Grid showing subcategories and their algorithms (UPGRADED BADGES & LOCK STATES)
    function renderMegaGroupDashboard(groupId) {
      const group = megaGroups.find(g => g.id === groupId);
      if (!group) return;

      const dashboard = document.getElementById("dashboard-container");
      if (!dashboard) return;
      dashboard.innerHTML = "";

      // Group introduction header Card (Học phần lớn)
      const introCard = document.createElement("div");
      introCard.className = `bg-gradient-to-r ${group.color} ${group.shadow} p-6 rounded-2xl shadow-xl flex items-center justify-between border border-white/10`;
      introCard.innerHTML = `
        <div class="space-y-2">
          <span class="px-2.5 py-1 bg-white/20 text-white rounded-md text-[9px] font-black uppercase tracking-wider">Học phần lớn</span>
          <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
            <i class="fa-solid ${group.icon}"></i> ${group.name}
          </h3>
          <p class="text-xs text-indigo-100 max-w-2xl leading-relaxed">${group.desc}</p>
        </div>
        <i class="hidden lg:block fa-solid ${group.icon} text-6xl text-white/10 shrink-0"></i>
      `;
      dashboard.appendChild(introCard);

      // Render Categories
      group.categoryIds.forEach(catId => {
        const category = algoCategories.find(c => c.id === catId);
        if (!category) return;

        const catSection = document.createElement("div");
        catSection.className = "space-y-4 pt-4";

        // Count total algorithms in this category
        const algoCount = category.algos.length;

        // Upgraded header styling to emphasize categories
        catSection.innerHTML = `
          <div class="flex items-center justify-between bg-slate-900/60 border-l-4 border-indigo-500 pl-4 pr-3 py-2.5 rounded-r-xl border border-y border-r border-slate-800/80 shadow-md">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <i class="fa-solid ${category.icon} text-sm"></i>
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-100 uppercase tracking-wider">${category.name}</h4>
                <p class="text-[10px] text-slate-500">Chuyên đề con thuộc phân nhóm chính</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 shadow-inner">
              ${algoCount} giải thuật
            </span>
          </div>
        `;

        const cardsGrid = document.createElement("div");
        cardsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3";

        category.algos.forEach(algo => {
          const isPlayable = hasPlayground(algo.id);
          const isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');

          let difficultyColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
          if (algo.diff === "Medium") difficultyColor = "bg-amber-950 text-amber-400 border-amber-500/20";
          if (algo.diff === "Hard") difficultyColor = "bg-rose-950 text-rose-400 border-rose-500/20";

          const card = document.createElement("div");

          if (isUnlocked) {
            card.className = "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition cursor-pointer flex flex-col justify-between space-y-3 group";
          } else {
            // Semi-transparent lock style for non-paying users
            card.className = "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 hover:border-slate-750 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75 hover:opacity-100 relative overflow-hidden";
          }

          const statusBadge = isPlayable
            ? `<span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-flask-vial mr-1 animate-pulse"></i>Chạy thử</span>`
            : (isUnlocked
              ? `<span class="px-1.5 py-0.5 rounded bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-unlock mr-1"></i>Đã mở khóa</span>`
              : `<span class="px-1.5 py-0.5 rounded bg-slate-850 text-slate-500 border border-slate-850 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-crown mr-1 text-amber-500"></i>Nâng cấp</span>`
            );

          card.onclick = () => {
            if (!isUnlocked) {
              openPaymentModal();
            } else {
              selectAlgorithm(algo.id, category.id);
            }
          };

          card.innerHTML = `
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${difficultyColor}">${algo.diff}</span>
                ${statusBadge}
              </div>
              <h5 class="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1.5">
                ${!isUnlocked ? '<i class="fa-solid fa-lock text-amber-500/80 text-[10px]"></i>' : ''}
                <span>${algo.name}</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
              </h5>
            </div>
            <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              ${algorithmDatabase[algo.id] ? algorithmDatabase[algo.id].shortSummary : "Khám phá từ điển thuật toán và tài liệu học thuật 10 tiêu chuẩn của chuyên đề này."}
            </p>
          `;
          cardsGrid.appendChild(card);
        });

        catSection.appendChild(cardsGrid);
        dashboard.appendChild(catSection);
      });
    }

    // Trigger state changes when selecting sidebar mega-group
    function selectMegaGroup(groupId) {
      // MPA: if not on index.html, navigate there
      if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html?mega=' + groupId;
        return;
      }
      activeMegaGroupId = groupId;
      currentView = "dashboard";
      pausePlayback();

      // Update Sidebar UI highlights
      buildSidebarCategories();

      // Render Dashboard Content
      renderMegaGroupDashboard(groupId);

      // Hide workspace & profile, show dashboard
      safeAddClass("workspace-container", "hidden");
      safeAddClass("profile-container", "hidden");
      safeRemoveClass("dashboard-container", "hidden");

      safeAddClass("mode-switcher-container", "hidden");
      safeAddClass("btn-back-to-dashboard", "hidden");
      safeAddClass("breadcrumb-separator", "hidden");

      // Simplified Breadcrumb Header (Removes duplication from screenshot)
      safeSetHTML("workspace-title", `<i class="fa-solid fa-graduation-cap text-indigo-500 mr-1"></i> Không Gian Học Tập`);
      safeSetText("workspace-subtitle", "Lựa chọn một chuyên đề học thuật bên dưới để khám phá phòng thí nghiệm trực quan sinh động.");
      safeSetText("algo-category-badge", "TỔNG QUAN");
    }

    function goBackToDashboard() {
      if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html?mega=' + activeMegaGroupId;
        return;
      }
      selectMegaGroup(activeMegaGroupId);
    }

    function renderCodeTrace(traceLines) {
      const view = document.getElementById("code-trace-viewport");
      view.innerHTML = "";
      if (!traceLines) {
        view.innerHTML = `<div class="text-slate-500 italic text-center p-4">Không có mã giả cho giải thuật này</div>`;
        return;
      }
      traceLines.forEach(line => {
        const lineDiv = document.createElement("div");
        lineDiv.id = `code-line-${line.num}`;
        lineDiv.className = "py-0.5 px-2 rounded flex items-start gap-2.5 transition-colors duration-150 hover:bg-slate-900";
        lineDiv.innerHTML = `
          <span class="text-slate-600 select-none w-4 text-right">${line.num}</span>
          <span class="whitespace-pre-wrap leading-relaxed">${line.text}</span>
        `;
        view.appendChild(lineDiv);
      });
    }

    function getSvgGraph() { return document.getElementById("visualizer-svg-graph"); }


    function drawInteractiveGraph(highlightNodeId = null, highlightColorClass = "fill-indigo-600 stroke-indigo-400") {
      svgGraph.innerHTML = "";
      if (graphData.nodes.length === 0) {
        svgGraph.innerHTML = `<text x="50%" y="50%" fill="#475569" font-size="11" font-weight="bold" text-anchor="middle">Click "+ Nút" và click khoảng trống trên canvas để vẽ.</text>`;
        return;
      }

      // 1. Draw connecting Lines (Edges)
      graphData.edges.forEach(edge => {
        const uNode = graphData.nodes.find(n => n.id === edge.u);
        const vNode = graphData.nodes.find(n => n.id === edge.v);
        if (uNode && vNode) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", uNode.x);
          line.setAttribute("y1", uNode.y);
          line.setAttribute("x2", vNode.x);
          line.setAttribute("y2", vNode.y);
          line.setAttribute("stroke", "#334155");
          line.setAttribute("stroke-width", "2");
          line.className.baseVal = "tree-edge";
          svgGraph.appendChild(line);

          // Weight indicator Text
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", (uNode.x + vNode.x) / 2);
          text.setAttribute("y", (uNode.y + vNode.y) / 2 - 5);
          text.setAttribute("fill", "#64748b");
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.textContent = edge.weight;
          svgGraph.appendChild(text);
        }
      });

      // 2. Draw Nodes Circles
      graphData.nodes.forEach(node => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", "cursor-pointer");

        group.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isConnectingMode) {
            if (!firstSelectedNode) {
              firstSelectedNode = node.id;
              showToast(`Đã chọn '${firstSelectedNode}'. Hãy chọn tiếp nút thứ 2 để kết nối.`, "info");
            } else if (firstSelectedNode !== node.id) {
              const edgeExists = graphData.edges.some(edge =>
                (edge.u === firstSelectedNode && edge.v === node.id) ||
                (edge.u === node.id && edge.v === firstSelectedNode)
              );
              if (!edgeExists) {
                const w = Math.floor(Math.random() * 9) + 1;
                graphData.edges.push({ u: firstSelectedNode, v: node.id, weight: w });
                drawInteractiveGraph();
                showToast(`Kết nối thành công ${firstSelectedNode} ⟷ ${node.id} (Trọng số: ${w})!`, "success");
              }
              isConnectingMode = false;
              firstSelectedNode = null;
              document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
            }
          } else {
            runGraphTraversalSimulation(node.id);
          }
        });

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", "14");

        let fill = "fill-slate-900";
        let stroke = "stroke-slate-700";
        let strokeW = "2";

        if (node.id === highlightNodeId) {
          fill = highlightColorClass.split(" ")[0];
          stroke = highlightColorClass.split(" ")[1];
          strokeW = "3";
        }

        circle.setAttribute("class", `tree-node-circle ${fill} ${stroke}`);
        circle.setAttribute("stroke-width", strokeW);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y + 4);
        text.setAttribute("fill", "#f8fafc");
        text.setAttribute("font-size", "10");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("text-anchor", "middle");
        text.textContent = node.id;

        group.appendChild(circle);
        group.appendChild(text);
        svgGraph.appendChild(group);
      });
    }

    function runGraphTraversalSimulation(startNodeId) {
      if (activeAlgoId !== "bfs" && activeAlgoId !== "dfs" && activeAlgoId !== "dijkstra_graph") {
        showToast("Chọn thuật toán BFS/DFS hoặc Dijkstra để chạy mô phỏng đồ thị này!", "info");
        return;
      }

      pausePlayback();
      showToast(`Khởi chạy mô phỏng đồ thị từ nút xuất phát: '${startNodeId}'`, "success");

      let pathSteps = [];
      if (activeAlgoId === "bfs") {
        let visited = new Set();
        let queue = [startNodeId];
        visited.add(startNodeId);

        pathSteps.push({ node: startNodeId, type: 'start', desc: `BFS: Bắt đầu duyệt từ đỉnh xuất phát '${startNodeId}'` });

        while (queue.length > 0) {
          let u = queue.shift();
          pathSteps.push({ node: u, type: 'visit', desc: `BFS: Rút đỉnh '${u}' ra khỏi Queue và tiến hành duyệt.` });

          let neighbors = [];
          graphData.edges.forEach(edge => {
            if (edge.u === u && !visited.has(edge.v)) neighbors.push(edge.v);
            if (edge.v === u && !visited.has(edge.u)) neighbors.push(edge.u);
          });

          neighbors.sort().forEach(v => {
            visited.add(v);
            queue.push(v);
            pathSteps.push({ node: v, type: 'enqueue', desc: `BFS: Phát hiện đỉnh lân cận '${v}' chưa duyệt. Đưa vào Queue.` });
          });
        }
      } else if (activeAlgoId === "dfs") {
        let visited = new Set();
        function dfsHelper(u) {
          visited.add(u);
          pathSteps.push({ node: u, type: 'visit', desc: `DFS: Đi tới duyệt đỉnh '${u}'` });

          let neighbors = [];
          graphData.edges.forEach(edge => {
            if (edge.u === u && !visited.has(edge.v)) neighbors.push(edge.v);
            if (edge.v === u && !visited.has(edge.u)) neighbors.push(edge.u);
          });

          neighbors.sort().forEach(v => {
            pathSteps.push({ node: v, type: 'go-deep', desc: `DFS: Rẽ nhánh đi sâu sang đỉnh lân cận '${v}'` });
            dfsHelper(v);
          });
        }
        dfsHelper(startNodeId);
      } else {
        let dist = {};
        let parent = {};
        let visited = new Set();
        graphData.nodes.forEach(n => dist[n.id] = Infinity);
        dist[startNodeId] = 0;

        pathSteps.push({ node: startNodeId, type: 'start', desc: `Dijkstra: Khởi tạo khoảng cách xuất phát từ đỉnh '${startNodeId}' = 0` });

        for (let i = 0; i < graphData.nodes.length; i++) {
          let u = null;
          graphData.nodes.forEach(n => {
            if (!visited.has(n.id)) {
              if (u === null || dist[n.id] < dist[u]) u = n.id;
            }
          });

          if (u === null || dist[u] === Infinity) break;
          visited.add(u);
          pathSteps.push({ node: u, type: 'visit', desc: `Dijkstra: Đỉnh có khoảng cách ngắn nhất chưa xét là '${u}' (khoảng cách = ${dist[u]}). Cố định nhãn.` });

          graphData.edges.forEach(edge => {
            let v = null;
            if (edge.u === u) v = edge.v;
            if (edge.v === u) v = edge.u;

            if (v !== null && !visited.has(v)) {
              let alt = dist[u] + edge.weight;
              if (alt < dist[v]) {
                dist[v] = alt;
                parent[v] = u;
                pathSteps.push({ node: v, type: 'relax', desc: `Dijkstra: Cập nhật đường đi ngắn nhất đến '${v}' qua '${u}': Mới = ${alt}` });
              }
            }
          });
        }
      }

      let stepIndex = 0;
      function nextStepAnimate() {
        if (stepIndex >= pathSteps.length) {
          drawInteractiveGraph();
          showToast("Mô phỏng đồ thị đã chạy hoàn thành!", "success");
          return;
        }
        let item = pathSteps[stepIndex];
        let colorClass = "fill-amber-600 stroke-amber-400";
        if (item.type === 'visit') colorClass = "fill-emerald-600 stroke-emerald-400";
        if (item.type === 'start') colorClass = "fill-indigo-600 stroke-indigo-400";

        drawInteractiveGraph(item.node, colorClass);
        document.getElementById("step-description-text").innerHTML = `<i class="fa-solid fa-play text-amber-500 mr-2"></i> ${item.desc}`;
        stepIndex++;
        setTimeout(nextStepAnimate, 900);
      }
      nextStepAnimate();
    }

    // Select specific algorithm, loading the visualizer and academic sheet
    function selectAlgorithm(algoId, catId) {
      // MPA: if not on algorithm.html, navigate there
      if (!window.location.pathname.endsWith('algorithm.html')) {
        window.location.href = 'algorithm.html?algo=' + algoId + '&cat=' + catId;
        return;
      }
      activeAlgoId = algoId;
      activeCategoryId = catId;
      currentView = "workspace";
      pausePlayback();

      // Check premium unlock state
      const isPlayable = hasPlayground(algoId);
      const isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');

      // Mode Switcher Controls
      if (isPlayable) {
        safeSetDisabled("mode-play-btn", false);
        safeSetClassName("mode-play-btn", `flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition ${currentMode === 'play' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'} rounded`);
        safeSetHTML("mode-play-btn", `<i class="fa-solid fa-flask-vial"></i> <span>Chạy Thử</span>`);
      } else {
        // Disabled style showing lock
        safeSetDisabled("mode-play-btn", true);
        safeSetClassName("mode-play-btn", "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition bg-slate-900 text-slate-600 rounded cursor-not-allowed opacity-45");
        safeSetHTML("mode-play-btn", `<i class="fa-solid fa-lock text-[10px] mr-1"></i> <span>Chạy Thử</span>`);
        // Force learn mode directly
        currentMode = 'learn';
      }

      // Locate profile from DB
      let profile = algorithmDatabase[algoId];
      if (!profile) {
        let catObj = algoCategories.find(c => c.id === catId);
        let algoObj = catObj ? catObj.algos.find(a => a.id === algoId) : { name: algoId };

        // Fallback auto generator ensuring 100% database coverage
        profile = {
          category: catId,
          vType: "console",
          best: "O(log n)", avg: "O(n)", worst: "O(n)", space: "O(1)",
          shortSummary: `Học thuật và trực quan lý thuyết của thuật toán ${algoObj.name}.`,
          concept: `Thuật toán ${algoObj.name} là một giải pháp thiết kế thông minh vượt trội trong lĩnh vực cấu trúc dữ liệu và giải thuật khoa học máy tính này.`,
          conditions: "Đầu vào đồng nhất, cấu trúc lưu trữ tương thích để phát huy tối đa lợi thế tính toán lý thuyết.",
          idea: `Tổ chức logic phân chia, lặp cấu trúc để xử lý tuần tự mà không tạo ra các không gian bộ nhớ thừa thãi.`,
          guide: "Mô hình này hiện chỉ hỗ trợ sổ tay lý thuyết chi tiết để bảo đảm sự tập trung lý thuyết tốt nhất.",
          pseudocode: `procedure ${algoId}(data)\n  // Phác thảo các bước thực thi mẫu\n  for each item in data do\n    process(item)\nend procedure`,
          codeCpp: `// Phiên bản mã nguồn mẫu chuẩn C++\n#include <iostream>\n\nvoid runAlgorithm() {\n    std::cout << "Algorithm ${algoObj.name} is running..." << std::endl;\n}`,
          codePy: `# Phiên bản mã nguồn mẫu chuẩn Python\ndef run_algorithm():\n    print("Algorithm ${algoObj.name} is running...")`,
          apps: ["Chuẩn hóa và tối ưu hóa hệ thống dữ liệu liên quan.", "Đóng vai trò nền tảng cho các lớp tính toán nâng cao."],
          exercises: [{ name: `LeetCode - Thử thách học thuật ${algoObj.name}`, diff: "Medium" }],
          codeTrace: [
            { num: 1, text: "Khởi tạo dữ liệu gốc" },
            { num: 2, text: "for each item in list do" },
            { num: 3, text: "  process(item)" }
          ],
          generator: function (arr) {
            return [
              { consoleOut: `Khởi chạy Terminal giả lập cho thuật toán: [${algoObj.name}].\nĐang tiền xử lý dữ liệu...`, line: 1 },
              { consoleOut: "Phân tích cấu trúc mảng đầu vào:\n" + JSON.stringify(arr), line: 2 },
              { consoleOut: "Bước 1: Chạy bộ máy tối ưu tính toán...", line: 3 },
              { consoleOut: "Trạng thái máy ảo: Sẵn sàng (OK).", line: 3 },
              { consoleOut: "Cập nhật kết quả thành công hoàn tất dữ liệu mẫu!", line: 1 }
            ];
          }
        };
      }

      currentVisualizerType = profile.vType;

      // Update Top breadcrumb UI
      safeRemoveClass("btn-back-to-dashboard", "hidden");
      safeRemoveClass("breadcrumb-separator", "hidden");
      const catFound = algoCategories.find(c => c.id === catId);
      if (catFound) safeSetText("algo-category-badge", catFound.name);
      safeSetHTML("workspace-title", `<i class="fa-solid fa-cube text-indigo-500 animate-pulse"></i> ` + algoId.toUpperCase().replace("_", " "));
      safeSetText("workspace-subtitle", profile.shortSummary);

      // Mode Switcher display
      safeRemoveClass("mode-switcher-container", "hidden");

      // Handle Sandbox layout swap
      safeAddClass("canvas-array", "hidden");
      safeAddClass("canvas-graph", "hidden");
      safeAddClass("canvas-dp-grid", "hidden");
      safeAddClass("canvas-console", "hidden");

      if (profile.vType === "array") {
        safeRemoveClass("canvas-array", "hidden");
      } else if (profile.vType === "graph") {
        safeRemoveClass("canvas-graph", "hidden");
        drawInteractiveGraph();
      } else if (profile.vType === "dp-grid") {
        safeRemoveClass("canvas-dp-grid", "hidden");
      } else {
        safeRemoveClass("canvas-console", "hidden");
      }

      // Hide or show playback control bar
      if (profile.vType === 'graph') {
        safeAddClass("playback-controls-bar", "hidden");
      } else {
        safeRemoveClass("playback-controls-bar", "hidden");
      }

      // Load Control parameters
      loadDynamicSandboxParameters(profile);

      // Setup timeline steps
      const initialArray = [45, 12, 85, 32, 78, 22, 60, 18, 92, 50];
      if (algoId === "binary") {
        initialArray.sort((a, b) => a - b);
      }
      steps = profile.generator(initialArray, 32);
      currentStepIdx = 0;

      // Populate theory sheet
      populateAcademicTheoryTab(profile, algoId);

      // Render pseudocode lines
      renderCodeTrace(profile.codeTrace);

      // Reset view modes
      switchMode(currentMode);

      // Show workspace view, hide dashboard & profile
      safeAddClass("dashboard-container", "hidden");
      safeAddClass("profile-container", "hidden");
      safeRemoveClass("workspace-container", "hidden");

      // Enable/Disable overlay locks based on membership status
      if (isUnlocked) {
        safeAddClass("academy-lock-overlay", "hidden");
      } else {
        safeRemoveClass("academy-lock-overlay", "hidden");
      }

      updateSandboxUI();
    }

    function loadDynamicSandboxParameters(profile) {
      const parent = document.getElementById("dynamic-controls");
      parent.innerHTML = "";

      if (profile.vType === "array") {
        parent.innerHTML = `
          <div class="space-y-3">
            <div>
              <span class="block font-medium text-slate-400 mb-2">Tạo dữ liệu mảng</span>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="regenerateRandomArray()" class="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 transition flex items-center justify-center gap-1">
                  <i class="fa-solid fa-dice"></i> Ngẫu nhiên
                </button>
                <button onclick="openCustomInputModal()" class="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 transition flex items-center justify-center gap-1">
                  <i class="fa-solid fa-keyboard"></i> Nhập tay
                </button>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-slate-400">Tốc độ chạy tự động:</span>
                <span id="lbl-playground-speed" class="text-indigo-400 font-bold">600ms</span>
              </div>
              <input type="range" id="slider-playground-speed" min="100" max="2000" step="100" value="600" oninput="changePlaySpeed(this.value)" class="w-full accent-indigo-500 cursor-pointer">
            </div>

            <div class="flex items-center justify-between border-t border-slate-800 pt-3">
              <div class="flex flex-col">
                <span class="font-medium text-slate-300">Âm thanh phản hồi</span>
                <span class="text-[9px] text-slate-500">Tần số theo chiều cao cột</span>
              </div>
              <button id="btn-sound-toggle" onclick="toggleSoundEngine()" class="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full font-bold text-rose-400 hover:border-rose-900 transition flex items-center gap-1">
                <i class="fa-solid fa-volume-xmark"></i> <span>Tắt</span>
              </button>
            </div>
          </div>
        `;
      } else if (profile.vType === "graph") {
        parent.innerHTML = `
          <div class="space-y-3">
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Bạn đang ở môi trường cấu trúc Đồ thị/Cây. Bạn có thể tự do thêm nút, nối các cạnh và click trực tiếp vào một đỉnh tròn bất kỳ để chạy mô phỏng BFS / DFS / Dijkstra xuất phát từ đỉnh đó.
            </p>
          </div>
        `;
      } else {
        parent.innerHTML = `
          <div class="space-y-3">
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Nhấn nút Play để nạp và chạy quy trình dòng lệnh / xử lý bit / mô phỏng mã hóa thời gian thực tại màn hình terminal bên cạnh.
            </p>
          </div>
        `;
      }

      document.getElementById("lbl-complexity-time").innerText = profile.best;
      document.getElementById("lbl-complexity-space").innerText = profile.space;
      document.getElementById("algo-short-summary").innerText = profile.shortSummary;
    }

    // Populate academic dictionary sheet (Theory View)
    function populateAcademicTheoryTab(profile, algoId) {
      document.getElementById("theory-title").innerHTML = `<i class="fa-solid fa-graduation-cap text-indigo-500"></i> Sổ Tay Học Thuật: ${algoId.toUpperCase().replace("_", " ")}`;
      document.getElementById("theory-subtitle").innerText = `Đầy đủ 10 tiêu chí học thuật tiêu chuẩn của giải thuật này.`;

      document.getElementById("theory-desc-concept").innerHTML = profile.concept;
      document.getElementById("theory-desc-conditions").innerHTML = profile.conditions;
      document.getElementById("theory-desc-idea").innerHTML = profile.idea;
      document.getElementById("theory-desc-guide").innerHTML = profile.guide;
      document.getElementById("theory-pseudocode").innerText = profile.pseudocode;

      document.getElementById("theory-code-cpp").value = profile.codeCpp;
      document.getElementById("theory-code-py").value = profile.codePy;
      document.getElementById("theory-rendered-code").innerText = profile.codeCpp;

      document.getElementById("theory-time-best").innerText = profile.best;
      document.getElementById("theory-time-avg").innerText = profile.avg;
      document.getElementById("theory-time-worst").innerText = profile.worst;
      document.getElementById("theory-space-complexity").innerText = profile.space;

      const appsContainer = document.getElementById("theory-apps-list");
      appsContainer.innerHTML = "";
      profile.apps.forEach(app => {
        const item = document.createElement("div");
        item.className = "flex gap-2 items-start";
        item.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500 mt-1 text-[10px]"></i> <p>${app}</p>`;
        appsContainer.appendChild(item);
      });

      const exContainer = document.getElementById("theory-exercises-list");
      exContainer.innerHTML = "";
      profile.exercises.forEach(ex => {
        let diffColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
        if (ex.diff === "Medium") diffColor = "bg-amber-950 text-amber-400 border-amber-500/20";
        if (ex.diff === "Hard") diffColor = "bg-rose-950 text-rose-400 border-rose-500/20";

        const row = document.createElement("div");
        row.className = "flex items-center justify-between p-2 bg-slate-900 border border-slate-850 rounded-lg text-xs";
        row.innerHTML = `
          <span class="font-semibold text-slate-200">${ex.name}</span>
          <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${diffColor}">${ex.diff || "Easy"}</span>
        `;
        exContainer.appendChild(row);
      });
    }

    function updateSandboxUI() {
      if (steps.length === 0) return;
      const step = steps[currentStepIdx];

      // 1. Array Visualizer Rendering
      if (currentVisualizerType === "array") {
        const parent = document.getElementById("canvas-array");
        parent.innerHTML = "";
        const maxVal = Math.max(...steps[0].array);

        step.array.forEach((val, idx) => {
          const barWrapper = document.createElement("div");
          barWrapper.className = "flex flex-col items-center flex-grow max-w-[28px] transition-all duration-200";

          let barColor = "bg-indigo-500 shadow-md";
          const highlightRole = step.highlights[idx];

          if (highlightRole === "compare") {
            barColor = "bg-amber-500 scale-105 animate-pulse shadow-lg shadow-amber-500/10";
          } else if (highlightRole === "swap") {
            barColor = "bg-rose-500 shadow-lg shadow-rose-500/15";
          } else if (highlightRole === "sorted" || highlightRole === "match") {
            barColor = "bg-emerald-500 shadow-md";
          } else if (highlightRole === "skipped") {
            barColor = "bg-slate-950 border border-slate-850 text-slate-700 border-dashed opacity-40";
          } else if (highlightRole === "pivot") {
            barColor = "bg-purple-500 shadow-lg shadow-purple-500/15";
          }

          const pct = (val / maxVal) * 80;
          barWrapper.innerHTML = `
            <span class="text-[9px] font-bold text-slate-400 mb-1 select-none">${val}</span>
            <div class="w-full rounded-t-sm ${barColor} transition-all duration-200" style="height: ${pct}px; min-height: 4px;"></div>
          `;
          parent.appendChild(barWrapper);
        });

        if (step.highlights && Object.keys(step.highlights).length > 0) {
          const firstKey = Object.keys(step.highlights)[0];
          playAudioTone(step.array[firstKey], maxVal);
        }
      }
      // 2. DP Grid Visualizer Rendering
      else if (currentVisualizerType === "dp-grid") {
        const parent = document.getElementById("canvas-dp-grid");
        parent.innerHTML = `<p class="text-slate-500 italic">Bản đồ quy hoạch động 2D đã sẵn sàng khởi tạo.</p>`;
      }
      // 3. Logic Terminal Console Rendering
      else {
        const parent = document.getElementById("canvas-console");
        parent.innerHTML = `<pre class="whitespace-pre-wrap leading-relaxed">${step.consoleOut}</pre>`;
      }

      // Code trace line highlight sync
      const activeLines = document.getElementById("code-trace-viewport").querySelectorAll(".bg-indigo-600\\/30");
      activeLines.forEach(line => {
        line.classList.remove("bg-indigo-600/30", "border-l-2", "border-indigo-500", "text-white");
      });

      const currentActiveLine = document.getElementById(`code-line-${step.line}`);
      if (currentActiveLine) {
        currentActiveLine.classList.add("bg-indigo-600/30", "border-l-2", "border-indigo-500", "text-white");
      }

      // Step action narrative
      document.getElementById("step-description-text").innerHTML = `<i class="fa-solid fa-angles-right text-amber-500 mr-2 animate-bounce"></i> ${step.desc || "Tiến hành chu kỳ tính toán tiếp theo..."}`;

      // Navigation playback indices sync
      document.getElementById("lbl-step-current-num").innerText = currentStepIdx + 1;
      document.getElementById("lbl-step-total-num").innerText = steps.length;
      document.getElementById("slider-step-timeline").max = steps.length - 1;
      document.getElementById("slider-step-timeline").value = currentStepIdx;

      const pctProgress = Math.round(((currentStepIdx + 1) / steps.length) * 100);
      document.getElementById("lbl-step-progress-percent").innerText = `${pctProgress}%`;
    }

    function nextStep() {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        updateSandboxUI();
      } else {
        pausePlayback();
        showToast("Thuật toán đã giả lập hoàn thành!", "success");
      }
    }

    function prevStep() {
      if (currentStepIdx > 0) {
        currentStepIdx--;
        updateSandboxUI();
      }
    }

    function startPlayback() {
      if (playTimer) return;
      if (currentStepIdx >= steps.length - 1) currentStepIdx = 0;

      document.getElementById("playback-play-icon").className = "fa-solid fa-pause text-sm";
      const btn = document.getElementById("btn-playback-play");
      btn.classList.replace("bg-indigo-600", "bg-rose-600");
      btn.classList.replace("hover:bg-indigo-500", "hover:bg-rose-500");

      playTimer = setInterval(nextStep, playSpeed);
    }

    function pausePlayback() {
      if (!playTimer) return;
      clearInterval(playTimer);
      playTimer = null;

      document.getElementById("playback-play-icon").className = "fa-solid fa-play text-sm ml-0.5";
      const btn = document.getElementById("btn-playback-play");
      btn.classList.replace("bg-rose-600", "bg-indigo-600");
      btn.classList.replace("hover:bg-rose-500", "hover:bg-indigo-500");
    }

    function togglePlayback() {
      if (playTimer) pausePlayback();
      else startPlayback();
    }

    document.getElementById("btn-playback-play").addEventListener("click", togglePlayback);
    document.getElementById("btn-playback-next").addEventListener("click", () => { pausePlayback(); nextStep(); });
    document.getElementById("btn-playback-prev").addEventListener("click", () => { pausePlayback(); prevStep(); });
    document.getElementById("btn-playback-first").addEventListener("click", () => { pausePlayback(); currentStepIdx = 0; updateSandboxUI(); });
    document.getElementById("btn-playback-last").addEventListener("click", () => { pausePlayback(); currentStepIdx = steps.length - 1; updateSandboxUI(); });
    document.getElementById("slider-step-timeline").addEventListener("input", (e) => { pausePlayback(); currentStepIdx = parseInt(e.target.value); updateSandboxUI(); });

    function changePlaySpeed(val) {
      playSpeed = parseInt(val);
      document.getElementById("lbl-playground-speed").innerText = `${playSpeed}ms`;
      if (playTimer) { pausePlayback(); startPlayback(); }
    }

    function toggleSoundEngine() {
      isSoundOn = !isSoundOn;
      const btn = document.getElementById("btn-sound-toggle");
      if (isSoundOn) {
        btn.className = "px-3 py-1 bg-slate-950 border border-emerald-800 rounded-full font-bold text-emerald-400 hover:border-emerald-600 transition flex items-center gap-1";
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Bật</span>';
        showToast("Đã kích hoạt tần số âm thanh phản hồi!", "success");
      } else {
        btn.className = "px-3 py-1 bg-slate-950 border border-slate-800 rounded-full font-bold text-rose-400 hover:border-rose-900 transition flex items-center gap-1";
        btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Tắt</span>';
        showToast("Đã tắt âm thanh phản hồi.");
      }
    }

    // Switch view modes: Playground (play) vs Theory (learn)
    function switchMode(mode) {
      if (mode === 'play' && !hasPlayground(activeAlgoId)) {
        showToast("Thuật toán này hiện chỉ hỗ trợ tài liệu học thuật (Lý thuyết)!", "error");
        return;
      }

      currentMode = mode;
      const playBtn = document.getElementById("mode-play-btn");
      const learnBtn = document.getElementById("mode-learn-btn");

      const sandboxDiv = document.getElementById("sandbox-container");
      const learnDiv = document.getElementById("learn-container");

      if (mode === "play") {
        if (hasPlayground(activeAlgoId)) {
          playBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition bg-indigo-600 text-white shadow";
        }
        learnBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition text-slate-400 hover:text-slate-200";
        sandboxDiv.classList.remove("hidden");
        learnDiv.classList.add("hidden");
      } else {
        if (hasPlayground(activeAlgoId)) {
          playBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition text-slate-400 hover:text-slate-200";
        }
        learnBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition bg-indigo-600 text-white shadow";
        sandboxDiv.classList.add("hidden");
        learnDiv.classList.remove("hidden");
        pausePlayback();
      }
    }

    // Array custom manipulation helpers
    function regenerateRandomArray() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 85) + 12);
      }
      if (activeAlgoId === "binary") {
        arr.sort((a, b) => a - b);
      }
      const profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
      steps = profile.generator(arr, 32);
      currentStepIdx = 0;
      updateSandboxUI();
      showToast("Đã khởi tạo mảng ngẫu nhiên mới thành công!");
    }

    const modal = document.getElementById("custom-input-modal");
    function openCustomInputModal() { modal.classList.remove("hidden"); }
    document.getElementById("btn-modal-cancel").addEventListener("click", () => modal.classList.add("hidden"));

    document.getElementById("btn-modal-submit").addEventListener("click", () => {
      const input = document.getElementById("custom-array-input").value;
      if (!input.trim()) return;
      const parsed = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
      if (parsed.length < 5 || parsed.length > 16) {
        showToast("Chiều dài mảng phải nằm trong khoảng từ 5 đến 16 phần tử!", "error");
        return;
      }
      modal.classList.add("hidden");
      if (activeAlgoId === "binary") {
        parsed.sort((a, b) => a - b);
      }
      const profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
      steps = profile.generator(parsed, 32);
      currentStepIdx = 0;
      updateSandboxUI();
      showToast("Đã áp dụng dữ liệu mảng tùy chọn thành công!", "success");
    });

    // Graph interactions controls
    document.getElementById("btn-graph-add-node").addEventListener("click", () => {
      isAddingNodeMode = !isAddingNodeMode;
      isConnectingMode = false;
      document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
      if (isAddingNodeMode) {
        document.getElementById("btn-graph-add-node").classList.add("bg-indigo-600");
        showToast("Hãy click vào vùng trống canvas để thả nút mới.", "info");
      } else {
        document.getElementById("btn-graph-add-node").classList.remove("bg-indigo-600");
      }
    });

    document.getElementById("btn-graph-connect").addEventListener("click", () => {
      isConnectingMode = !isConnectingMode;
      isAddingNodeMode = false;
      document.getElementById("btn-graph-add-node").classList.remove("bg-indigo-600");
      if (isConnectingMode) {
        document.getElementById("btn-graph-connect").classList.add("bg-indigo-600");
        showToast("Hãy bấm lần lượt vào 2 đỉnh trên sơ đồ để nối cạnh.", "info");
      } else {
        document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
      }
    });

    document.getElementById("btn-graph-clear").addEventListener("click", () => {
      graphData.nodes = [];
      graphData.edges = [];
      drawInteractiveGraph();
      showToast("Đã xóa trắng toàn bộ sơ đồ.");
    });

    algoSearchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase().trim();

      // If there is no search query, restore regular dashboard of active mega group
      if (query === "") {
        selectMegaGroup(activeMegaGroupId);
        return;
      }

      // Override view to show all search matches across all categories
      currentView = "dashboard";
      document.getElementById("workspace-container").classList.add("hidden");
      document.getElementById("profile-container").classList.add("hidden");
      document.getElementById("dashboard-container").classList.remove("hidden");
      document.getElementById("mode-switcher-container").classList.add("hidden");
      document.getElementById("btn-back-to-dashboard").classList.add("hidden");
      document.getElementById("breadcrumb-separator").classList.add("hidden");

      document.getElementById("workspace-title").innerHTML = `<i class="fa-solid fa-magnifying-glass text-indigo-500"></i> Kết quả tìm kiếm`;
      document.getElementById("workspace-subtitle").innerText = `Tìm kiếm tất cả giải thuật khớp với từ khóa: "${query}"`;
      document.getElementById("algo-category-badge").innerText = "TÌM KIẾM";

      const dashboard = document.getElementById("dashboard-container");
      dashboard.innerHTML = "";

      const resultsGrid = document.createElement("div");
      resultsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4";
      let matchCount = 0;

      algoCategories.forEach(category => {
        category.algos.forEach(algo => {
          if (algo.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
            matchCount++;
            const isPlayable = hasPlayground(algo.id);
            const isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');
            let difficultyColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
            if (algo.diff === "Medium") difficultyColor = "bg-amber-950 text-amber-400 border-amber-500/20";
            if (algo.diff === "Hard") difficultyColor = "bg-rose-950 text-rose-400 border-rose-500/20";

            const card = document.createElement("div");
            if (isUnlocked) {
              card.className = "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition cursor-pointer flex flex-col justify-between space-y-3 group";
            } else {
              card.className = "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 hover:border-slate-750 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75 hover:opacity-100";
            }

            const statusBadge = isPlayable
              ? `<span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-flask-vial mr-1"></i>Chạy thử</span>`
              : (isUnlocked
                ? `<span class="px-1.5 py-0.5 rounded bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-unlock mr-1"></i>Đã mở khóa</span>`
                : `<span class="px-1.5 py-0.5 rounded bg-slate-850 text-slate-500 border border-slate-850 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-crown mr-1 text-amber-500"></i>Nâng cấp</span>`
              );

            card.onclick = () => {
              if (!isUnlocked) {
                openPaymentModal();
              } else {
                selectAlgorithm(algo.id, category.id);
              }
            };

            card.innerHTML = `
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${difficultyColor}">${algo.diff}</span>
                  ${statusBadge}
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1.5">
                  ${!isUnlocked ? '<i class="fa-solid fa-lock text-amber-500/80 text-[10px]"></i>' : ''}
                  <span>${algo.name}</span>
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
                </h5>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                ${algorithmDatabase[algo.id] ? algorithmDatabase[algo.id].shortSummary : "Khám phá phòng thí nghiệm học thuật chuyên sâu và lý thuyết của thuật toán này."}
              </p>
            `;
            resultsGrid.appendChild(card);
          }
        });
      });

      if (matchCount > 0) {
        dashboard.appendChild(resultsGrid);
      } else {
        dashboard.innerHTML = `
          <div class="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">
            <i class="fa-solid fa-face-frown text-4xl text-slate-600 mb-3"></i>
            <h4 class="text-sm font-bold text-slate-400">Không tìm thấy thuật toán nào khớp với từ khóa</h4>
            <p class="text-xs text-slate-500 mt-1">Hãy thử tìm với các từ khóa phổ biến khác như: Sort, Search, DP, Tree...</p>
          </div>
        `;
      }
    });

    function copyToClipboard(id) {
      const text = document.getElementById(id).value;
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      showToast("Đã sao chép mã nguồn mẫu thành công!", "success");
    }

    // Global Toast alert system
    function showToast(msg, type = "info") {
      const container = document.getElementById("toast-container");
      const toast = document.createElement("div");
      toast.className = `flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg shadow-2xl border text-white transition duration-300 transform translate-y-2 opacity-0 pointer-events-auto`;

      if (type === "success") toast.className += " bg-emerald-950 border-emerald-500/30 text-emerald-300";
      else if (type === "error") toast.className += " bg-rose-950 border-rose-500/30 text-rose-300";
      else toast.className += " bg-indigo-950 border-indigo-500/30 text-indigo-300";

      toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
      container.appendChild(toast);

      setTimeout(() => toast.classList.remove("translate-y-2", "opacity-0"), 40);
      setTimeout(() => {
        toast.classList.add("translate-y-2", "opacity-0");
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }

    // Keyboard Shortcuts binding
    document.addEventListener("keydown", (e) => {
      if (document.activeElement.tagName === "INPUT") return;
      if (currentView === "workspace") {
        if (e.code === "Space") {
          e.preventDefault();
          togglePlayback();
        } else if (e.code === "ArrowRight") {
          pausePlayback();
          nextStep();
        } else if (e.code === "ArrowLeft") {
          pausePlayback();
          prevStep();
        }
      }
    });

// =============================================================================
// KENTOLAB MPA ROUTING - Page-specific initialization
// =============================================================================

// Lazy getters for sidebar DOM elements (injected by loadSharedComponents)
function getMainSidebar() { return document.getElementById("main-sidebar"); }
function getSidebarToggleDesktop() { return document.getElementById("sidebar-toggle-desktop"); }
function getSidebarToggleIcon() { return document.getElementById("sidebar-toggle-icon"); }
function getSidebarToggleMobile() { return document.getElementById("sidebar-toggle-mobile"); }
function getSidebarNavContainer() { return document.getElementById("sidebar-nav-container"); }
function getAlgoSearchInput() { return document.getElementById("algo-search-input"); }

// Wire up sidebar toggle buttons - called AFTER loadSharedComponents()
var _sidebarCollapsed = false;
function initSidebarEvents() {
    var mainSidebar = getMainSidebar();
    var btnDesktop = getSidebarToggleDesktop();
    var btnIcon = getSidebarToggleIcon();
    var btnMobile = getSidebarToggleMobile();
    var navContainer = getSidebarNavContainer();
    var searchInput = getAlgoSearchInput();

    if (btnDesktop) {
        btnDesktop.addEventListener("click", function() {
            _sidebarCollapsed = !_sidebarCollapsed;
            if (mainSidebar) {
                if (_sidebarCollapsed) {
                    mainSidebar.classList.add("sidebar-collapsed");
                    if (btnIcon) btnIcon.className = "fa-solid fa-angles-right text-xs";
                } else {
                    mainSidebar.classList.remove("sidebar-collapsed");
                    if (btnIcon) btnIcon.className = "fa-solid fa-angles-left text-xs";
                }
            }
        });
    }
    if (btnMobile && navContainer) {
        btnMobile.addEventListener("click", function() {
            navContainer.classList.toggle("hidden");
        });
    }
    if (searchInput) {
        searchInput.addEventListener("input", handleAlgoSearch);
    }
}

function handleAlgoSearch(e) {
    var query = e.target.value.toLowerCase().trim();
    if (query === "") {
        selectMegaGroup(activeMegaGroupId);
        return;
    }
    currentView = "dashboard";
    var dashboard = document.getElementById("dashboard-container");
    if (!dashboard) return;
    document.getElementById("workspace-container") && document.getElementById("workspace-container").classList.add("hidden");
    document.getElementById("profile-container") && document.getElementById("profile-container").classList.add("hidden");
    document.getElementById("dashboard-container") && document.getElementById("dashboard-container").classList.remove("hidden");

    dashboard.innerHTML = "";
    var resultsGrid = document.createElement("div");
    resultsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4";
    var matchCount = 0;

    algoCategories.forEach(function(category) {
        category.algos.forEach(function(algo) {
            if (algo.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
                matchCount++;
                var isPlayable = hasPlayground(algo.id);
                var isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');
                var diffColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
                if (algo.diff === "Medium") diffColor = "bg-amber-950 text-amber-400 border-amber-500/20";
                if (algo.diff === "Hard") diffColor = "bg-rose-950 text-rose-400 border-rose-500/20";

                var card = document.createElement("div");
                card.className = isUnlocked
                    ? "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 transition cursor-pointer flex flex-col justify-between space-y-3 group"
                    : "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75";
                card.onclick = function() {
                    if (!isUnlocked) { openPaymentModal(); }
                    else { selectAlgorithm(algo.id, category.id); }
                };
                card.innerHTML = '<div class="space-y-1"><div class="flex items-center justify-between">'
                    + '<span class="px-2 py-0.5 rounded border text-[9px] font-bold ' + diffColor + '">' + algo.diff + '</span></div>'
                    + '<h5 class="text-sm font-bold text-white">' + algo.name + '</h5></div>';
                resultsGrid.appendChild(card);
            }
        });
    });

    if (matchCount > 0) {
        dashboard.appendChild(resultsGrid);
    } else {
        dashboard.innerHTML = '<div class="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">'
            + '<i class="fa-solid fa-face-frown text-4xl text-slate-600 mb-3"></i>'
            + '<h4 class="text-sm font-bold text-slate-400">Không tìm thấy thuật toán khớp với từ khóa</h4></div>';
    }
}

// Wire up workspace-specific event listeners - called only on algorithm.html
function initWorkspaceEvents() {
    var btnPlay = document.getElementById("btn-playback-play");
    var btnNext = document.getElementById("btn-playback-next");
    var btnPrev = document.getElementById("btn-playback-prev");
    var btnFirst = document.getElementById("btn-playback-first");
    var btnLast = document.getElementById("btn-playback-last");
    var slider = document.getElementById("slider-step-timeline");
    var modal = document.getElementById("custom-input-modal");
    var btnCancel = document.getElementById("btn-modal-cancel");
    var btnSubmit = document.getElementById("btn-modal-submit");
    var btnAddNode = document.getElementById("btn-graph-add-node");
    var btnConnect = document.getElementById("btn-graph-connect");
    var btnClear = document.getElementById("btn-graph-clear");
    var svgGraph = getSvgGraph();

    if (btnPlay) btnPlay.addEventListener("click", togglePlayback);
    if (btnNext) btnNext.addEventListener("click", function() { pausePlayback(); nextStep(); });
    if (btnPrev) btnPrev.addEventListener("click", function() { pausePlayback(); prevStep(); });
    if (btnFirst) btnFirst.addEventListener("click", function() { pausePlayback(); currentStepIdx = 0; updateSandboxUI(); });
    if (btnLast) btnLast.addEventListener("click", function() { pausePlayback(); currentStepIdx = steps.length - 1; updateSandboxUI(); });
    if (slider) slider.addEventListener("input", function(e) { pausePlayback(); currentStepIdx = parseInt(e.target.value); updateSandboxUI(); });

    if (btnCancel) btnCancel.addEventListener("click", function() { if (modal) modal.classList.add("hidden"); });
    if (btnSubmit) btnSubmit.addEventListener("click", function() {
        var inputEl = document.getElementById("custom-array-input");
        if (!inputEl || !inputEl.value.trim()) return;
        var parsed = inputEl.value.split(",").map(function(x) { return parseInt(x.trim()); }).filter(function(x) { return !isNaN(x); });
        if (parsed.length < 5 || parsed.length > 16) { showToast("Mảng phải từ 5-16 phần tử!", "error"); return; }
        if (modal) modal.classList.add("hidden");
        if (activeAlgoId === "binary") parsed.sort(function(a, b) { return a - b; });
        var profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
        steps = profile.generator(parsed, 32);
        currentStepIdx = 0;
        updateSandboxUI();
        showToast("Đã nạp mảng tùy chỉnh!", "success");
    });

    if (btnAddNode) btnAddNode.addEventListener("click", function() {
        isAddingNodeMode = true;
        btnAddNode.classList.add("bg-indigo-600", "text-white");
        if (btnConnect) btnConnect.classList.remove("bg-indigo-600");
        showToast("Nhấp canvas để thêm nút.");
    });
    if (btnConnect) btnConnect.addEventListener("click", function() {
        isConnectingMode = !isConnectingMode;
        if (isConnectingMode) {
            btnConnect.classList.add("bg-indigo-600");
            showToast("Nhấp lần lượt 2 nút để kết nối.");
        } else {
            btnConnect.classList.remove("bg-indigo-600");
        }
    });
    if (btnClear) btnClear.addEventListener("click", function() {
        graphData.nodes = []; graphData.edges = [];
        drawInteractiveGraph(); showToast("Đã xóa sơ đồ.");
    });
    if (svgGraph) svgGraph.addEventListener("click", function(e) {
        if (!isAddingNodeMode) return;
        var rect = svgGraph.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x < 20 || x > rect.width - 20 || y < 20 || y > rect.height - 20) return;
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var chosen = "N";
        for (var i = 0; i < letters.length; i++) {
            if (!graphData.nodes.find(function(n) { return n.id === letters[i]; })) { chosen = letters[i]; break; }
        }
        graphData.nodes.push({ id: chosen, x: x, y: y });
        drawInteractiveGraph();
        showToast("Đã thêm nút '" + chosen + "'!", "success");
        isAddingNodeMode = false;
        if (btnAddNode) btnAddNode.classList.remove("bg-indigo-600", "text-white");
    });
}

// ─── Page init functions ─────────────────────────────────────────────────────

function initDashboard() {
    currentView = 'dashboard';
    loadSharedComponents();
    initSidebarEvents();
    syncAuthUI();
    buildSidebarCategories();
    var params = new URLSearchParams(window.location.search);
    var mega = params.get('mega') || 'core';
    activeMegaGroupId = mega;
    selectMegaGroup(mega);
}

function initAlgorithm() {
    currentView = 'workspace';
    loadSharedComponents();
    initSidebarEvents();
    initWorkspaceEvents();
    syncAuthUI();
    buildSidebarCategories();
    var params = new URLSearchParams(window.location.search);
    var algo = params.get('algo') || 'binary';
    var cat = params.get('cat') || 'searching';
    selectAlgorithm(algo, cat);
}

function initProfile() {
    currentView = 'profile';
    loadSharedComponents();
    initSidebarEvents();
    syncAuthUI();
    buildSidebarCategories();
    if (typeof renderProfileData === 'function') renderProfileData();
    else if (typeof openProfilePage === 'function') openProfilePage();
}
