pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: node18
                image: node:18
                command:
                - sleep
                args:
                - infinity
            '''
            defaultContainer 'node18'
        }
    }
    stages {
        stage('Compile') {
            steps {
                sh '''
                npm i --no-fund
                npm run compile
                '''
            }
        }
        stage('Build') {
            steps {
                withCredentials([
                    string(credentialsId: 'ECR_HOST', variable: 'ECR_GQL_HOST')
                ]) {
                    step {
                        def GQL_IMAGE_NAME = "${ECR_GQL_HOST}/gql-base:${env.TAG_NAME}-${env.BUILD_NUMBER}"
                        sh '''
                        echo $ECR_GQL_HOST
                        '''
                        def gqlImage = docker.build(GQL_IMAGE_NAME)
                    }

                    step {
                    
                        docker.withRegistry("https://${ECR_GQL_HOST}") {
                            gqlImage.push()
                        }
                    }
                    
                }
            }  
            steps {
                step {
                    sh '''
                    Imagen generada [$GQL_IMAGE_NAME]
                    '''
                }
            }
        }
        stage('Deploy') {
            withCredentials([
                string(credentialsId: 'ACM_ARN', variable: 'ACM_GQL_ARN'),
                string(credentialsId: 'DOMAIN_HOST', variable: 'DOMAIN_GQL_HOST')
            ]) {
                step {
                    def GQL_DOMAIN = "gql-base.${DOMAIN_GQL_HOST}"
                }

                step {
                    sh '''
                    echo "Image: $gqlImageName"
                    echo "Domain: $DOMAIN_GQL_HOST"

                    sed -i -e '/image: /s|GQL_BASE_IMAGE|${GQL_IMAGE_NAME}|g' deploy/gql-base.yaml
                    '''                    
                }
                

            }            
        }

        stage('Kube Apply') {
            // withKubeConfig([
            //     credentialsId: K8S_CREDENTIALS_NAME, 
            //     serverUrl: K8S_SERVER_URL,
            //     namespace: K8S_NAMESPACE
            // ]) {
            withKubeConfig([
                serverUrl: 'https://kubernetes.default',
                namespace: 'demo-apis'
            ]) {
                step {
                    echo "Deploy Modificado"
                    cat 'deploy/gql-base.yaml'
                }
            }
        }
    }
    post {
        failure {
            echo "Proceso [$BUILD_NUMBER] con error."
        }
        always {
            echo "Proceso [$BUILD_NUMBER] finalizado."
        }
    }
}
