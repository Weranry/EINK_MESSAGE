# 使用官方Node.js镜像作为基础镜像
FROM node:14

# 安装node-canvas所需的系统依赖
RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libxi-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libgles2-mesa-dev \
    libxtst-dev \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖，包括node-canvas
RUN npm install

# 复制项目文件
COPY . .

# 如果您的项目需要构建步骤，取消注释下面的行
# RUN npm run build

# 启动命令
CMD ["npm", "start"]