-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
