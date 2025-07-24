#!/bin/bash

# Test script to verify issue body parsing
# This simulates what the GitHub Actions workflow does

# Simulate the issue body format from admin panel
ISSUE_BODY='## Content Update Request

**Commit Message:** Update home template content via admin panel - 7/24/2025, 3:51:41 PM

**YAML Content:**
```yaml
# Home Template Content Configuration
# This file stores all content for the home template
# The admin panel reads from and writes to this file
# Last updated: 2025-01-28

hero:
  title: "Transform Business with Innovative Solutions"
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  image:
    src: "https://via.placeholder.com/600x400/2563eb/ffffff?text=Hero+Image"
    alt: "Business transformation illustration showing growth and innovation"
    width: 600
    height: 400
  buttons:
    primary:
      text: "Explore Services"
      href: "#services"
    secondary:
      text: "Get Started"
      href: "#contact"
```

---
*This issue was created by the admin panel and will be automatically processed by GitHub Actions.*'

echo "=== Testing Issue Body Parsing ==="
echo ""

echo "1. Raw issue body (first 200 chars):"
echo "$ISSUE_BODY" | head -c 200
echo ""
echo ""

echo "2. Testing YAML content extraction:"
# Save to temporary file
echo "$ISSUE_BODY" > test_issue_body.txt

# Extract YAML content
CONTENT=$(sed -n '/```yaml/,/```/p' test_issue_body.txt | sed '1d;$d')

echo "Extracted content length: $(echo "$CONTENT" | wc -c)"
echo "First 100 chars of extracted content:"
echo "$CONTENT" | head -c 100
echo ""
echo ""

echo "3. Testing commit message extraction:"
MESSAGE=$(echo "$ISSUE_BODY" | grep "**Commit Message:**" | sed 's/.*\*\*Commit Message:\*\* //' | xargs)
echo "Extracted message: $MESSAGE"
echo ""

echo "4. Testing JSON payload creation:"
# Create JSON payload
cat > test_payload.json << EOF
{
  "content": "$CONTENT",
  "message": "$MESSAGE",
  "secretKey": "test-secret-key"
}
EOF

echo "Payload created successfully"
echo "Payload length: $(cat test_payload.json | wc -c)"
echo "First 200 chars of payload:"
cat test_payload.json | head -c 200
echo ""
echo ""

echo "5. Cleanup:"
rm -f test_issue_body.txt test_payload.json
echo "Test files cleaned up"
echo ""
echo "=== Test Complete ===" 