# rime-color-scheme-configurator

Rime 颜色方案配置器，用于配置小狼毫与鼠须管的颜色方案。

[Demo](https://cucumber7748.serv00.net/)

## 预览

![preview](./images/preview.jpg)

## Docker 部署

```bash
# pull
docker pull giterhub/rime-color-scheme-configurator:latest

# run
docker run -d \
    --name rime-color-scheme-configurator \
    --restart unless-stopped \
    -p 80:80 \
    giterhub/rime-color-scheme-configurator:latest
```
