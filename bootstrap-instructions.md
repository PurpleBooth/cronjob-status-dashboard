# How to start from nothing

## Install Kubernetes
If you don't already have access to a cluster, you'll need something to try it out.

### Pre-requisites

Docker (or alternative)
kubectl (see https://kubernetes.io/docs/tasks/tools/)

### Kind

https://kind.sigs.k8s.io/docs/user/quick-start

On MacOS: `brew install kind`

then...

*Note* `kind create cluster` can take > 5 minutes

```
%kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.24.0) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Have a nice day! 👋

% kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:53000
CoreDNS is running at https://127.0.0.1:53000/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

## Create a K8s cron job

(from https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/)

```
kubectl create -f https://k8s.io/examples/application/job/cronjob.yaml
```


## Clone and run

*Note* npm install includes `Next` and can take > 5 minutes

```

git clone git@github.com:PurpleBooth/cronjob-status-dashboard.git
npm install

```
