**Containerize and Orchestrate**

Prerequisities
•	AWS account with IAM user having ECS, ECR, and ALB permissions.
•	AWS CLI installed and configured (aws configure).
•	Docker installed locally.
•	Basic application code (e.g., Html, Css, Js).

**Dockerize the Application**
Dockerfile
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html
EXPOSE 80

**Build the Image**
Syntax: docker build -t static-project .

**	Push Image to Amazon ECR**

Create the ECR repository with the below command
Syntax: aws ecr create-repository --repository-name pg-project

Authenticate the Docker to ECR
Syntax: aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 287767576128.dkr.ecr.us-east-1.amazonaws.com

Tag and push the image in repository with the syntax given below
Syntax: docker tag pg-project:latest 287767576128.dkr.ecr.us-east-1.amazonaws.com/pg-project:latest
docker push 287767576128.dkr.ecr.us-east-1.amazonaws.com/pg-project:latest

**	Create the ECS Cluster (Fargate)**

Create a Cluster with the below command
Syntax: aws ecs create-cluster --cluster-name pg-project-cluster
Create the task definition with the docker image uri

**	Create Application Load Balancer**

Create ALB in the same VPC.
Create a target group for ECS tasks (port 80)
Configure listener on port 80 -> forward to target group

**	Deploy ECS Service**

Create the ECS Service to deploy the task

**	Verify Deployment**

http://pg-project-2073774823.us-east-1.elb.amazonaws.com







