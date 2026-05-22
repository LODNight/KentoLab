// src/core/registry.js

class AlgorithmRegistry {
  constructor() {
    this.algorithms = new Map();
  }

  register(algoModule) {
    if (!algoModule || !algoModule.metadata || !algoModule.metadata.id) {
      console.error("Invalid Algorithm Module format. Missing metadata or id.");
      return;
    }
    this.algorithms.set(algoModule.metadata.id, algoModule);
  }

  get(id) {
    return this.algorithms.get(id);
  }
  
  getAllMetadata() {
    return Array.from(this.algorithms.values()).map(algo => algo.metadata);
  }
}

export const registry = new AlgorithmRegistry();
