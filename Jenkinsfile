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
                        withCredentials([usernamePassword(credentialsId: 'dockerhub_cred', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]){
                            echo 'Build & Push Frontend Docker Image'
                            sh "docker build -t upwarpiyush/dsa-tracker-frontend:${BUILD_NUMBER} ."
                            sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                            sh "docker push upwarpiyush/dsa-tracker-frontend:${BUILD_NUMBER}"
                        }
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
                url: 'https://github.com/piyush-fine/dsa-tracker-manifest.git',
                branch: 'master'
            }
        }

        stage('Update K8S manifest & push to Repo'){
            steps {
                script{
                    withCredentials([gitUsernamePassword(credentialsId: 'github_cred', gitToolName: 'Default')])  {
                        echo 'Current frontend-deployment.yaml content:'
                        sh 'cat frontend-deployment.yaml'
                        
                        sh "sed -i 's/dsa-tracker-frontend:[^ ]*/dsa-tracker-frontend:${BUILD_NUMBER}/g' frontend-deployment.yaml"

                        
                        echo 'Updated frontend-deployment.yaml content:'
                        sh 'cat frontend-deployment.yaml'

                        echo 'Current server-deployment.yaml content:'
                        sh 'cat server-deployment.yaml'
                        
                        sh "sed -i 's/dsa-tracker-sever:[^ ]*/dsa-tracker-server:${BUILD_NUMBER}/g' server-deployment.yaml"
                        
                        echo 'Updated server-deployment.yaml content:'
                        sh 'cat server-deployment.yaml'
                        
                        sh 'git add frontend-deployment.yaml server-deployment.yaml'
                        sh "git commit -m 'Updated the deployment yaml | Jenkins Pipeline'"
                        sh 'git push -u origin master'                   
                    }
                }
            }
        }
    }        
}





// stage('Update K8S Manifest & Push to Repo') {
//             steps {
//                 script {
//                     withCredentials([usernamePassword(credentialsId: 'github_cred', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        
//                         sh 'git config --global user.name "${GIT_USERNAME}"'
//                         sh 'git config --global user.password "${GIT_PASSWORD}"'
                        
//                         echo 'Current frontend-deployment.yaml content:'
//                         sh 'cat frontend-deployment.yaml'
                        
//                         sh "sed -i 's/dsa-tracker-frontend:[^ ]*/dsa-tracker-frontend:${BUILD_NUMBER}/g' frontend-deployment.yaml"

                        
//                         echo 'Updated frontend-deployment.yaml content:'
//                         sh 'cat frontend-deployment.yaml'

//                         echo 'Current server-deployment.yaml content:'
//                         sh 'cat server-deployment.yaml'
                        
//                         sh "sed -i 's/dsa-tracker-sever:[^ ]*/dsa-tracker-server:${BUILD_NUMBER}/g' server-deployment.yaml"
                        
//                         echo 'Updated server-deployment.yaml content:'
//                         sh 'cat server-deployment.yaml'
                        
//                         sh 'git add frontend-deployment.yaml server-deployment.yaml'
//                         sh "git commit -m 'Updated the deployment yaml | Jenkins Pipeline'"
//                         sh 'git push -u origin master'
//                     }
//                 }
//             }
//         }
// }