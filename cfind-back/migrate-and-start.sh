#!/bin/sh

sleep 15
npx prisma generate
npx prisma db push
npm run start