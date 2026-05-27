#!/bin/bash
# Fix subordinate UID/GID ranges for rootless Podman to support Judge0
# Judge0 image requires UIDs up to ~200000
# Run this with: sudo bash judge0/fix-subuid.sh

set -e

echo "suparn:100000:1000000" > /etc/subuid
echo "suparn:100000:1000000" > /etc/subgid

echo "Updated /etc/subuid and /etc/subgid"
echo "Now run: podman system migrate"
echo "Then run: docker compose -f judge0/docker-compose.yml up -d"
