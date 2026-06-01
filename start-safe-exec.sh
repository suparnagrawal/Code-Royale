#!/bin/bash
echo "Building safe execution sandbox..."
docker build --load -t code-royale-exec -f Dockerfile.exec .

echo "Starting safe execution sandbox on port 2358..."
echo "Any code submitted will be trapped inside this container!"

# Run with resource limits to prevent fork bombs and memory exhaustion
docker run --rm \
  --name code-royale-exec \
  --pids-limit 100 \
  --memory 512m \
  -p 2358:2358 \
  code-royale-exec
