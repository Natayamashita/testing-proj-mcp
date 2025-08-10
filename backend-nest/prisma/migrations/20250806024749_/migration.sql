-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector(768) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
