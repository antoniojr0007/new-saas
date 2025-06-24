CREATE TYPE "public"."ban_reason" AS ENUM('SPAM', 'ABUSE', 'INAPPROPRIATE_CONTENT', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."certidao" AS ENUM('NASCIMENTO', 'CASAMENTO', 'DIVORCIO', 'OBITO');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING_APPROVED', 'ACTIVE', 'INACTIVE', 'EXCLUDED', 'PENDING_EXCLUDED');--> statement-breakpoint
CREATE TYPE "public"."status_member_family" AS ENUM('ACTIVE', 'INACTIVE', 'DECEASED', 'EXCLUDED', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"providerAccountId" text NOT NULL,
	"provider" text NOT NULL,
	"userId" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"street" text NOT NULL,
	"number" text NOT NULL,
	"complement" text,
	"neighborhood" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"member_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"emailSecundario" text,
	"phone" text,
	"cell_phone" text,
	"facebook" text,
	"instagram" text,
	"telegram" text,
	"whatsapp" text,
	"member_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" text PRIMARY KEY NOT NULL,
	"cpf" text,
	"rg_cin" text,
	"rg_orgao_emissor" text,
	"rg_uf" text,
	"rg_data_emissao" timestamp,
	"cnh" text,
	"cnh_categoria" text,
	"cnh_data_emissao" timestamp,
	"cnh_data_vencimento" timestamp,
	"cnh_orgao_emissor" text,
	"cnh_uf" text,
	"cartao_sus" text,
	"titulo_eleitor" text,
	"numero_certidao" text,
	"type_certidao" "certidao" NOT NULL,
	"member_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documents_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "documents_rg_cin_unique" UNIQUE("rg_cin"),
	CONSTRAINT "documents_cnh_unique" UNIQUE("cnh"),
	CONSTRAINT "documents_cartao_sus_unique" UNIQUE("cartao_sus"),
	CONSTRAINT "documents_titulo_eleitor_unique" UNIQUE("titulo_eleitor"),
	CONSTRAINT "documents_numero_certidao_unique" UNIQUE("numero_certidao")
);
--> statement-breakpoint
CREATE TABLE "families" (
	"id" text PRIMARY KEY NOT NULL,
	"vaga" integer NOT NULL,
	"pontuacao" integer DEFAULT 0,
	"faltas" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"status" "status" DEFAULT 'PENDING_APPROVED' NOT NULL,
	"status_details" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "families_vaga_unique" UNIQUE("vaga")
);
--> statement-breakpoint
CREATE TABLE "family_members" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"birth_date" timestamp NOT NULL,
	"status" "status_member_family" DEFAULT 'ACTIVE' NOT NULL,
	"status_details" text,
	"family_id" text NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires" timestamp NOT NULL,
	"sessionToken" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"impersonatedBy" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"username" text NOT NULL,
	"displayUsername" text,
	"image" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"banned" boolean,
	"banReason" "ban_reason",
	"banDetails" text,
	"banExpires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
