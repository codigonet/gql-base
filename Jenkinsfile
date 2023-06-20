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
            // Can also wrap individual steps:
            // container('node18') {
            //     sh 'node --version'
            // }
            // container('python310') {
            //     sh 'python --version'
            // }
            defaultContainer 'node18'
        }
    }
    stages {
        stage('Main') {
            steps {
                sh '''
                npm i --no-audit
                npm run compile
                '''
            }
        }
    }
}
