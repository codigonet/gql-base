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
                script {
                    sh '''
                    npm i --no-fund
                    npm run compile
                    '''
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'stage-ECR_HOST', variable: 'ECR_GQL_HOST')
                    ]) {
                        GQL_IMAGE_NAME = "${ECR_GQL_HOST}/gql-base:${env.TAG_NAME}-${env.BUILD_NUMBER}"
                        sh '''
                        echo $ECR_GQL_HOST
                        '''
                        gqlImage = docker.build(GQL_IMAGE_NAME)
                    
                        docker.withRegistry("https://${ECR_GQL_HOST}") {
                            gqlImage.push()
                        }
                    }
                }

                script {
                    sh '''
                    Imagen generada [$GQL_IMAGE_NAME]
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'ACM_ARN', variable: 'ACM_GQL_ARN'),
                        string(credentialsId: 'DOMAIN_HOST', variable: 'DOMAIN_GQL_HOST')
                    ]) {
                            GQL_DOMAIN = "gql-base.${DOMAIN_GQL_HOST}"
    
                            sh '''
                            echo "Image: $gqlImageName"
                            echo "Domain: $DOMAIN_GQL_HOST"
        
                            sed -i -e '/image: /s|GQL_BASE_IMAGE|${GQL_IMAGE_NAME}|g' deploy/gql-base.yaml
                            '''                    
                    }
                }            
            }            
        }

        stage('Kube Apply') {
            steps {
                script {
                    // withKubeConfig([
                    //     credentialsId: K8S_CREDENTIALS_NAME, 
                    //     serverUrl: K8S_SERVER_URL,
                    //     namespace: K8S_NAMESPACE
                    // ]) {
                    withKubeConfig([
                        serverUrl: 'https://kubernetes.default',
                        namespace: 'demo-apis'
                    ]) {
                        echo "Deploy Modificado"
                        cat 'deploy/gql-base.yaml'
                    }
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
