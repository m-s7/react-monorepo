## Deployment

Download repo:

```bash
git clone [url] codebase
```

Install

```bash
cd codebase
yarn install
```

Build

```bash
yarn build
```

###Docker

```bash
cd apps/modules/guide
docker run -d -p 8901:80 msmolik/ms7-guide
```

Navigate to http://localhost:8901 \
If app loads delete image:

```bash
docker stop $(docker ps -a -q)
```

###Kubernetes

```bash
minikube start
minikube create namespace ms7-guide
kubectl config set-context --current --namespace=ms7-guide
cd tools/k8s
kubectl apply -f deployment.yaml
kubectl apply -f load-balancer.yaml
```

Check your minikube ip:

```bash
minikube ip
```

Navigate to:
http://[minikubeip]:31000

## Resources
https://docs.docker.com/engine/install/centos/ \
https://minikube.sigs.k8s.io/docs/start/ \
https://kubernetes.io/docs/tasks/tools/ \
https://blog.logrocket.com/deploy-react-app-kubernetes-using-docker/