-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "cne" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "phone_number" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_logon" DATETIME,
    "jwtoken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Lab" (
    "lab_id" TEXT NOT NULL PRIMARY KEY,
    "lab_name" TEXT NOT NULL,
    "lab_logo" TEXT,
    "lab_username" TEXT NOT NULL,
    "lab_password_hash" TEXT NOT NULL,
    "totp" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_logon" DATETIME,
    "jwtoken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lab_id" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "is_activated" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usage" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ApiKeys_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "Lab" ("lab_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicalReports" (
    "report_id" TEXT NOT NULL PRIMARY KEY,
    "lab_id" TEXT,
    "user_id" TEXT,
    "report_title" TEXT NOT NULL,
    "report_description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_url" TEXT NOT NULL,
    "report_thumbnail_url" TEXT,
    "processed_report_data" TEXT,
    "seen_by_user" BOOLEAN NOT NULL DEFAULT false,
    "seen_at" DATETIME,
    CONSTRAINT "MedicalReports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MedicalReports_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "Lab" ("lab_id") ON DELETE SET NULL ON UPDATE CASCADE
);
