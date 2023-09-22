-- CreateEnum
CREATE TYPE "RequestTypeEnum" AS ENUM ('REFUND', 'CREDIT', 'INVOICE_REQUEST', 'SETTLEMENT');

-- CreateEnum
CREATE TYPE "RequestStatusEnum" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SettlementStatusEnum" AS ENUM ('APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "thirdPartyResponseStatusEnum" AS ENUM ('PENDING', 'VERIFIED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "requestId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "RequestTypeEnum" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "RequestStatusEnum" NOT NULL,
    "requestContent" JSONB,
    "responseContent" JSONB,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("requestId")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "settlementId" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestStatus" "SettlementStatusEnum" NOT NULL,
    "thirdPartyResponseStatus" "thirdPartyResponseStatusEnum" NOT NULL,
    "transactionId" INTEGER,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("settlementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_requestId_key" ON "Settlement"("requestId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("requestId") ON DELETE RESTRICT ON UPDATE CASCADE;
