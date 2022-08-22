# How to start from nothing

## Install Kubernetes
If you don't already have access to a cluster, you'll need something to try it out.

### Pre-requisites

Docker (or alternative)

### Kind

https://kind.sigs.k8s.io/docs/user/quick-start

On MacOS: `brew install kind`

then...

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
