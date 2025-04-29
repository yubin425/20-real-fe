#!/bin/bash
PM2_NAME="nextjs-app"

# PM2 프로세스 종료
pm2 delete $PM2_NAME || true
