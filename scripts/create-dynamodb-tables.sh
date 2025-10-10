#!/bin/bash

# Create DynamoDB Tables for Smeedies Maritime
# Run this script to set up the required DynamoDB tables

echo "🚀 Creating DynamoDB tables for Smeedies Maritime..."

# Set region
REGION=${AWS_REGION:-us-east-1}

# Create main messages table
echo "📝 Creating messages table..."
aws dynamodb create-table \
  --table-name smeedies-maritime-messages \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
  --key-schema \
    AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

# Wait for table to be created
echo "⏳ Waiting for messages table to be created..."
aws dynamodb wait table-exists \
  --table-name smeedies-maritime-messages \
  --region $REGION

# Create admin users table
echo "👤 Creating admin users table..."
aws dynamodb create-table \
  --table-name smeedies-maritime-admin-users \
  --attribute-definitions \
    AttributeName=username,AttributeType=S \
  --key-schema \
    AttributeName=username,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

# Wait for table to be created
echo "⏳ Waiting for admin users table to be created..."
aws dynamodb wait table-exists \
  --table-name smeedies-maritime-admin-users \
  --region $REGION

echo "✅ DynamoDB tables created successfully!"
echo ""
echo "📊 Tables created:"
echo "  - smeedies-maritime-messages"
echo "  - smeedies-maritime-admin-users"
echo ""
echo "🔧 Next steps:"
echo "  1. Set environment variables:"
echo "     export DYNAMODB_TABLE_NAME=smeedies-maritime-messages"
echo "     export DYNAMODB_ADMIN_TABLE_NAME=smeedies-maritime-admin-users"
echo "     export AWS_REGION=$REGION"
echo ""
echo "  2. Deploy Lambda functions:"
echo "     serverless deploy"
echo ""
echo "  3. Test the endpoints"
