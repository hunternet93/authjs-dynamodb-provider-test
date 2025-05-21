#!/usr/bin/env bash
AWS_ACCESS_KEY_ID="localdev"
AWS_SECRET_ACCESS_KEY="localdev"

aws \
 --endpoint-url "http://localhost:8000/" \
 dynamodb delete-table \
  --table-name next-auth

aws \
 --endpoint-url "http://localhost:8000/" \
 dynamodb create-table \
    --table-name next-auth \
    --attribute-definitions \
        AttributeName=pk,AttributeType=S \
        AttributeName=sk,AttributeType=S \
        AttributeName=GSI1PK,AttributeType=S \
        AttributeName=GSI1SK,AttributeType=S \
    --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
    --table-class STANDARD \
    --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"GSI1\",
                \"KeySchema\": [{\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}],
                \"Projection\":{
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 10,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]"

