-- Add userId column to Description (nullable first for safety)
ALTER TABLE "Description" ADD COLUMN IF NOT EXISTS "userId" INTEGER;

-- Make the column required (no existing data after reset)
ALTER TABLE "Description" ALTER COLUMN "userId" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "Description" ADD CONSTRAINT "Description_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
