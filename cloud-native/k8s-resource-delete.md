# K8s Resource Delete

> remove namespace by api

```bash
(
NAMESPACE=insight-system
kubectl proxy &
kubectl get namespace $NAMESPACE -o json |jq '.spec = {"finalizers":[]}' >temp.json
curl -k -H "Content-Type: application/json" -X PUT --data-binary @temp.json 127.0.0.1:8001/api/v1/namespaces/$NAMESPACE/finalize
)
```

当资源对象的finalizers字段中包含值时，Kubernetes将无法删除该对象。这是为了防止意外删除资源对象，同时确保任何有关联的操作都已完成。

要查看某个资源对象的finalizers字段，您可以使用以下命令：

```bash
kubectl get RESOURCE_TYPE OBJECT_NAME -o jsonpath='{.metadata.finalizers}'
```

其中RESOURCE_TYPE是资源对象类型（例如deployment、pod等），OBJECT_NAME是资源对象的名称。通过运行上述命令，您将获得此资源对象的finalizers字段的当前状态。

例如，如果要查看名为my-deployment的Deployment对象的finalizers字段，则可以运行以下命令：

```bash
kubectl get deployment my-deployment -o jsonpath='{.metadata.finalizers}'
```

如果该资源对象有finalizers，则会显示该字段的值。否则，它将为空。

然后，如果您发现该资源对象的finalizers列表中的条目正在阻止删除，请使用以下命令删除它们：

```bash
kubectl patch RESOURCE_TYPE OBJECT_NAME -p '{"metadata":{"finalizers":[]}}' --type=merge
```

同样，RESOURCE_TYPE是资源对象类型（例如deployment、pod等），OBJECT_NAME是资源对象的名称。 运行以上命令将删除该资源对象的所有finalizers，从而允许您删除该对象。

例如，如果要删除名为my-deployment的Deployment对象的所有finalizers，则可以运行以下命令：

```bash
kubectl patch deployment my-deployment -p '{"metadata":{"finalizers":[]}}' --type=merge
```

请注意，如果您有其他处于未完成状态的操作，则删除资源对象可能会导致数据丢失或其他问题。最好在执行删除操作之前先进行备份，并确保您已经充分了解它的相关性以及风险。


```bash
too many open files
```

- Set limits in /etc/sysctl.conf by adding:

```bash
fs.inotify.max_user_watches=524288
fs.inotify.max_user_instances=512
```

- Open a new terminal or reload sysctl.conf variables with

```bash
sudo sysctl --system
```