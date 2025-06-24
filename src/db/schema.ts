import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["admin", "user"]);
export const certidaoEnum = pgEnum("certidao", [
  "NASCIMENTO",
  "CASAMENTO",
  "DIVORCIO",
  "OBITO",
]);
export const banReasonEnum = pgEnum("ban_reason", [
  "SPAM",
  "ABUSE",
  "INAPPROPRIATE_CONTENT",
  "OTHER",
]);
export const statusEnum = pgEnum("status", [
  "PENDING_APPROVED",
  "ACTIVE",
  "INACTIVE",
  "EXCLUDED",
  "PENDING_EXCLUDED",
]);
export const statusMemberFamilyEnum = pgEnum("status_member_family", [
  "ACTIVE",
  "INACTIVE",
  "DECEASED",
  "EXCLUDED",
  "BLOCKED",
]);

// User table
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("emailVerified").default(false),
  username: text("username").notNull().unique(),
  displayUsername: text("displayUsername"),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
  banned: boolean("banned"),
  banReason: banReasonEnum("banReason"),
  banDetails: text("banDetails"),
  banExpires: timestamp("banExpires", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Session table
export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires", { mode: "date" }).notNull(),
  token: text("sessionToken").notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  impersonatedBy: text("impersonatedBy"),
  userId: text("userId").notNull(),
});

// Account table
export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("providerAccountId").notNull(),
  providerId: text("provider").notNull(),
  userId: text("userId").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires", { mode: "date" }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", { mode: "date" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Verification table
export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Family table
export const families = pgTable("families", {
  id: text("id").primaryKey(),
  vaga: integer("vaga").notNull().unique(),
  pontuacao: integer("pontuacao").default(0),
  faltas: integer("faltas").default(0),
  isActive: boolean("is_active").default(true),
  status: statusEnum("status").default("PENDING_APPROVED").notNull(),
  statusDetails: text("status_details"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Contact table
export const contacts = pgTable("contacts", {
  id: text("id").primaryKey(),
  email: text("email"),
  emailSecundario: text("emailSecundario"),
  phone: text("phone"),
  cellPhone: text("cell_phone"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  telegram: text("telegram"),
  whatsapp: text("whatsapp"),
  memberId: text("member_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Address table
export const addresses = pgTable("addresses", {
  id: text("id").primaryKey(),
  street: text("street").notNull(),
  number: text("number").notNull(),
  complement: text("complement"),
  neighborhood: text("neighborhood").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  memberId: text("member_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// FamilyMember table
export const familyMembers = pgTable("family_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  birthDate: timestamp("birth_date", { mode: "date" }).notNull(),
  status: statusMemberFamilyEnum("status").default("ACTIVE").notNull(),
  statusDetails: text("status_details"),
  familyId: text("family_id").notNull(),
  userId: text("user_id"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Document table
export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  cpf: text("cpf").unique(),
  rgCin: text("rg_cin").unique(),
  rgOrgaoEmissor: text("rg_orgao_emissor"),
  rgUf: text("rg_uf"),
  rgDataEmissao: timestamp("rg_data_emissao", { mode: "date" }),
  cnh: text("cnh").unique(),
  cnhCategoria: text("cnh_categoria"),
  cnhDataEmissao: timestamp("cnh_data_emissao", { mode: "date" }),
  cnhDataVencimento: timestamp("cnh_data_vencimento", { mode: "date" }),
  cnhOrgaoEmissor: text("cnh_orgao_emissor"),
  cnhUf: text("cnh_uf"),
  cartaoSus: text("cartao_sus").unique(),
  tituloEleitor: text("titulo_eleitor").unique(),
  numeroCertidao: text("numero_certidao").unique(),
  typeCertidao: certidaoEnum("type_certidao").notNull(),
  memberId: text("member_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});
