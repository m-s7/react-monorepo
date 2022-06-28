## Deployment

Ściągnij repo:

```bash
git clone [url] codebase
```

Zainstaluje

```bash
cd codebase
yarn install
```

Zbuduj

```bash
yarn build
```

###Docker

```bash
cd apps/modules/core
docker build -t codebase-test .
docker run -p 3000:80 msmolik/ms7-core
```

Otwórz w przeglądarce stronę http://localhost:3000 \
Powinna się pojawić strina 404 (u góry jest menu którym można przejść na inną stronę).
Ostatnia linia info czemu remote

###Kubernetes

```bash
minikube start
minikube create namespace ms7-core
kubectl config set-context --current --namespace=ms7-core
cd tools/k8s
kubectl apply -f deployment.yaml
kubectl apply -f load-balancer.yaml
```

Sprawdź adres ip minikube:

```bash
minikube ip
```

Otwórz stronę w przeglądarce:
http://[minikube_ip]:31000

Wszystko odpalałem i testowałe na ```Ubuntu 20.04```.

## Resources
https://docs.docker.com/engine/install/centos/ \
https://minikube.sigs.k8s.io/docs/start/ \
https://kubernetes.io/docs/tasks/tools/ \
https://blog.logrocket.com/deploy-react-app-kubernetes-using-docker/

Problem:
Minikube w wersji podstawowej nie działa z lokalnymi obrazami, stąd w plikach konfiguracyjnych w katalobu k8s jest ścieżka do obrazów: `msmolik/ms7-core` (```msmolik``` to moje konto na platformie docker).\
Da się to ominąć, jest sporo materiałów na ten temat w sieci więc nic nie będe linkował. \

Co bym chciał:
 - na branch została wysłana zmiana (załóżmy że na początku tylko branch ```devel```), jenkins buduje, wszystko zbudowało się poprawnie
 - następnym krokiem jest odpalenie poda kubernetesowego ze zbudowaną aplikację oraz możliwość dostania się do tego poda przez przeglądarkę (jak w powyższym przykładzie)

Po co mi to:
- na ten moment Krystian musi po zbudowaniu apliakcji ręcznie przenosić wszystko na lokalny serwer apache i tam to testuje