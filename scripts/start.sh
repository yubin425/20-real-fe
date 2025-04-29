#!/bin/bash
APP_DIR="/home/ubuntu/frontend"
PM2_NAME="frontend-app"

cd $APP_DIR

# PM2 설치 여부 확인
if ! command -v pm2 &> /dev/null
then
    echo "PM2 not found. Installing..."
    npm install -g pm2
fi

# pnpm 설치 여부 확인
if ! command -v pnpm &> /dev/null
then
    echo "pnpm not found. Installing..."
    npm install -g pnpm
fi

# 의존성 설치
pnpm install

# 빌드
pnpm build

# 서버 실행
pm2 delete $PM2_NAME || true
pm2 start "pnpm start" --name "$PM2_NAME"
pm2 save
