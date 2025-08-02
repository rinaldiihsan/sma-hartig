-- CreateTable
CREATE TABLE "Artikel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);
