## :medal_military: Containerize and Orchestrate	

**:yellow_circle: Prerequisities**

•	AWS account with IAM user having ECS, ECR, and ALB permissions.\
•	Git-Action to create the docker image and push in the ECR\
•	AWS CLI installed and configured (aws configure).\
•	Basic application code (e.g., Html, Css, Js).

**:yellow_circle:	Dockerize the Application**

Dockerfile

	FROM nginx:alpine
	WORKDIR /usr/share/nginx/html
	RUN rm -rf /usr/share/nginx/html/*
	COPY . /usr/share/nginx/html
	EXPOSE 80


**:yellow_circle:	CI/CD Pipeline**

Create a CI/CD pipeline to create to the docker image and push in the ECR
name: Deploy Static Website with ECS

	on:
  	push:
    branches:
      - main  # or your deployment branch

	jobs:
  	deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}

    - name: Log in to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v2

    - name: Build, tag, and push image to ECR
      run: |
        IMAGE_TAG=latest
        docker build -t <accountId>.dkr.ecr.us-east-1.amazonaws.com/ecs-project:$IMAGE_TAG .
        docker push <accountId>.dkr.ecr.us-east-1.amazonaws.com/ecs-project:$IMAGE_TAG


**:yellow_circle:	Create the ECS Cluster (Fargate)**

Create a Cluster with the below command
Syntax: aws ecs create-cluster --cluster-name pg-project-cluster
Create the task definition with the docker image uri which in the ECR

**:yellow_circle:	Create Application Load Balancer**

Create ALB in the same VPC.
Create a target group for ECS tasks (port 80)
Configure listener on port 80 -> forward to target group

**:yellow_circle:	Deploy ECS Service**

Create the ECS Service to deploy the task

**:yellow_circle:	Verify Deployment**







