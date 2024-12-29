# 批量创建 NS 脚本

```shell
#!/bin/bash

# 输入：要创建的 Namespace 的开始和结束数字
start=$1
end=$2

# 检查是否输入了有效的数字
if [[ ! $start =~ ^[0-9]+$ ]] || [[ ! $end =~ ^[0-9]+$ ]]; then
  echo "Error: Please enter valid numbers for start and end."
  exit 1
fi

# 确保结束数字大于或等于开始数字
if [[ $start -gt $end ]]; then
  echo "Error: End number should be greater than or equal to start number."
  exit 1
fi

# 创建 Namespace 和 Service
for i in $(seq $start $end); do
  ns="namespace-$i"
  
  # 创建 Namespace
  kubectl create namespace $ns
  
  # 创建 Service YAML 文件
  cat <<EOL > svc-$i.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
    - name: http-alt
      protocol: TCP
      port: 8080
      targetPort: 8080
    - name: https
      protocol: TCP
      port: 443
      targetPort: 443
EOL
  
  # 在新的 Namespace 中应用 Service
  kubectl apply -f svc-$i.yaml -n $ns
  
  # 删除临时的 Service YAML 文件
  rm svc-$i.yaml
done
```

使用方式：

1. 保存上面的脚本到一个文件中，比如 create_ns_and_svc.sh。
2. 给脚本执行权限：chmod +x create_ns_and_svc.sh。
3. 运行脚本并传入开始和结束数字作为参数：./create_ns_and_svc.sh 1 100。