pipeline {
    agent any 
    
    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github_cred', 
                url: 'https://github.com/piyush-fine/dsa-tracker-cicd',
                branch: 'master'
            }
        }

        stage('Build & Push Frontend Docker Image') {
            steps {
                dir('frontend'){
                    script {
                        echo 'Build & Push Frontend Docker Image'
                        sh "whoami"
                        sh "docker build -t upwarpiyush/dsa-tracker-frontend:${BUILD_NUMBER} ."
                        sh "docker push upwarpiyush/dsa-tracker-frontend:${BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Build & Push Server Docker Image') {
            steps {
                dir('server'){
                    script {
                        echo 'Build & Push Server Docker Image'
                        sh "docker build -t upwarpiyush/dsa-tracker-server:${BUILD_NUMBER} ."
                        sh "docker push upwarpiyush/dsa-tracker-server:${BUILD_NUMBER}"
                    }
                }
            }
        }
        
        stage('Checkout K8S Manifest SCM') {
            steps {
                git credentialsId: 'github_cred', 
                url: 'https://github.com/piyush-fine/dsa-tracker-manifest',
                branch: 'master'
            }
        }
    }
}
