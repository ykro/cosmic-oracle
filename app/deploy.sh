#!/bin/bash
set -e

# Configuration
PROJECT_ID="caramel-banner-478016-t5"
SERVICE_NAME="cosmic-oracle-frontend"
REGION="us-central1"
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "======================================================"
echo "Deploying $SERVICE_NAME to Google Cloud Run"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "======================================================"

# Ensure we are in the right directory (app)
# Already in app directory

# 1. Build and Push the Container Image using Cloud Build
echo "Building container image..."
gcloud builds submit --tag "$IMAGE_TAG" .

# 2. Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_TAG" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080

echo "Deployment successful!"
echo "Service URL:"
gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --format 'value(status.url)'
