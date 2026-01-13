pipeline {
    agent any
    
    environment {
        APP_NAME = 'nodejs-github-app'
        ECR_REGISTRY = '000000000000.dkr.ecr.eu-central-1.localhost.localstack.cloud:4566'
        ECR_REPOSITORY = 'bootcamp/nodejs-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_IMAGE = "${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
        DOCKER_IMAGE_LATEST = "${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '=== Checking out code from GitHub ==='
                checkout scm
                sh 'git rev-parse HEAD'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '=== Building Docker Image ==='
                script {
                    sh """
                        docker build -t ${APP_NAME}:${IMAGE_TAG} .
                        docker tag ${APP_NAME}:${IMAGE_TAG} ${DOCKER_IMAGE}
                        docker tag ${APP_NAME}:${IMAGE_TAG} ${DOCKER_IMAGE_LATEST}
                    """
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                echo '=== Pushing to LocalStack ECR ==='
                script {
                    sh """
                        docker push ${DOCKER_IMAGE}
                        docker push ${DOCKER_IMAGE_LATEST}
                    """
                }
            }
        }
        
        stage('Verify') {
            steps {
                echo '=== Verifying image in ECR ==='
                script {
                    sh """
                        docker images | grep ${APP_NAME}
                        echo "Image pushed successfully to ECR!"
                    """
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                echo '=== Cleaning up local images ==='
                script {
                    sh """
                        docker rmi ${APP_NAME}:${IMAGE_TAG} || true
                        echo "Local images cleaned up"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '=== Pipeline SUCCESS ==='
            echo "Image: ${DOCKER_IMAGE}"
            echo "Image: ${DOCKER_IMAGE_LATEST}"
            echo "Build completed successfully!"
        }
        failure {
            echo '=== Pipeline FAILED ==='
            echo "Build failed. Check logs above."
        }
    }
}
