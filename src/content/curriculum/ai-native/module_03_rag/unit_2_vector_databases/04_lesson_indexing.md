# Lesson 2.4: Indexing Strategies and Performance

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 2 - Vector Databases

---

## 📚 Reading Material

### Index Types

**HNSW (Hierarchical Navigable Small World)**
- Best recall/speed trade-off
- Higher memory usage
- Default for most databases

**IVF (Inverted File Index)**
- Faster builds, good for updates
- Lower memory
- Slightly lower recall

**PQ (Product Quantization)**
- Compressed vectors
- Lowest memory
- Lower accuracy

### Performance Tuning

**HNSW Parameters**:
```python
# m: connections per node (16-64)
# ef_construction: build quality (100-500)
# ef: search quality (50-500)

# More connections = better recall, more memory
# Higher ef = better recall, slower queries
```

**Batch Operations**:
```python
# Bad: one at a time
for doc in documents:
    index.upsert([doc])

# Good: batched
index.upsert(documents, batch_size=100)
```

### Scaling Strategies

| Scale | Strategy |
|-------|----------|
| < 100K | Single node, any index |
| 100K - 10M | HNSW with tuning |
| 10M - 100M | Sharding, replicas |
| > 100M | Distributed clusters |

---

## 🎬 Video Script

**[INTRO - Performance chart]**

Indexing choices determine performance. Let me show you how to tune.

**[CUT TO: Index types]**

HNSW for best quality. IVF for frequent updates. PQ when memory is tight.

**[CUT TO: Tuning parameters]**

Higher m and ef mean better recall but slower queries. Find your balance based on acceptable latency.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Which index type offers the best recall/speed trade-off?

A) IVF  
B) HNSW  
C) Flat  
D) PQ  

**Correct Answer**: B

---

*Congratulations on completing Unit 2! You understand vector databases.*
