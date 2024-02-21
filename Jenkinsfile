
pipeline {
    agent any
    stages {
         stage('Create and push Docker Image') {
                    steps {
                        dir("${WORKSPACE}/") {
                            script {
                                // Docker login using the credentials stored in Jenkins
                                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                                    // Use printf to securely pass the password to docker login
                                    sh "printf '%s' ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"

                                    // Build and push Docker image
                                    sh "docker build -t sivasankar99/ftg-ui ."
                                    sh "docker push sivasankar99/ftg-ui"
                                }
                            }
                        }
                    }
         }
    }
}