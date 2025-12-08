var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  campaignVotes: () => campaignVotes,
  disasterCampaigns: () => disasterCampaigns,
  dustyBinDonations: () => dustyBinDonations,
  insertCampaignVoteSchema: () => insertCampaignVoteSchema,
  insertDisasterCampaignSchema: () => insertDisasterCampaignSchema,
  insertDustyBinDonationSchema: () => insertDustyBinDonationSchema,
  insertLearnEntrySchema: () => insertLearnEntrySchema,
  insertMerchantChainSchema: () => insertMerchantChainSchema,
  insertMerchantOutletSchema: () => insertMerchantOutletSchema,
  insertOrganizationSchema: () => insertOrganizationSchema,
  insertPasswordResetTokenSchema: () => insertPasswordResetTokenSchema,
  insertPayoutSchema: () => insertPayoutSchema,
  insertPhilanthropistSchema: () => insertPhilanthropistSchema,
  insertRecurringDonationSchema: () => insertRecurringDonationSchema,
  insertReferralSchema: () => insertReferralSchema,
  insertStorySchema: () => insertStorySchema,
  insertTagSchema: () => insertTagSchema,
  insertTaxReceiptSchema: () => insertTaxReceiptSchema,
  insertTransactionSchema: () => insertTransactionSchema,
  insertUdrSchema: () => insertUdrSchema,
  insertUserRoleSchema: () => insertUserRoleSchema,
  insertUserSchema: () => insertUserSchema,
  insertWalletSchema: () => insertWalletSchema,
  insertWhatsappContactSchema: () => insertWhatsappContactSchema,
  insertWhatsappConversationSchema: () => insertWhatsappConversationSchema,
  insertWhatsappMessageSchema: () => insertWhatsappMessageSchema,
  insertWhatsappTicketSchema: () => insertWhatsappTicketSchema,
  learnEntries: () => learnEntries,
  merchantChains: () => merchantChains,
  merchantOutlets: () => merchantOutlets,
  organizations: () => organizations,
  passwordResetTokens: () => passwordResetTokens,
  payouts: () => payouts,
  philanthropists: () => philanthropists,
  recurringDonations: () => recurringDonations,
  referrals: () => referrals,
  stories: () => stories,
  tags: () => tags,
  taxReceipts: () => taxReceipts,
  transactions: () => transactions,
  udr: () => udr,
  userRoles: () => userRoles,
  users: () => users,
  wallets: () => wallets,
  whatsappContacts: () => whatsappContacts,
  whatsappConversations: () => whatsappConversations,
  whatsappMessages: () => whatsappMessages,
  whatsappTickets: () => whatsappTickets
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users, userRoles, organizations, wallets, tags, merchantChains, merchantOutlets, transactions, taxReceipts, philanthropists, referrals, stories, recurringDonations, insertUserSchema, insertUserRoleSchema, insertOrganizationSchema, insertWalletSchema, insertTagSchema, insertMerchantChainSchema, insertMerchantOutletSchema, insertTransactionSchema, insertTaxReceiptSchema, insertPhilanthropistSchema, insertReferralSchema, insertStorySchema, insertRecurringDonationSchema, disasterCampaigns, dustyBinDonations, campaignVotes, insertDisasterCampaignSchema, insertDustyBinDonationSchema, insertCampaignVoteSchema, whatsappContacts, whatsappConversations, whatsappMessages, whatsappTickets, insertWhatsappContactSchema, insertWhatsappConversationSchema, insertWhatsappMessageSchema, insertWhatsappTicketSchema, udr, payouts, insertUdrSchema, insertPayoutSchema, passwordResetTokens, insertPasswordResetTokenSchema, learnEntries, insertLearnEntrySchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: text("email").notNull().unique(),
      passwordHash: text("password_hash").notNull(),
      fullName: text("full_name").notNull(),
      phone: text("phone"),
      country: text("country"),
      avatarUrl: text("avatar_url"),
      bio: text("bio"),
      isEmailVerified: integer("is_email_verified").default(0),
      blockkoinAccountId: text("blockkoin_account_id"),
      // Auto-created Blockkoin account
      blockkoinKycStatus: text("blockkoin_kyc_status").default("none").$type(),
      // KYC for $50+ transactions
      preferredCurrency: text("preferred_currency").default("ZAR"),
      // Auto-convert target currency
      createdAt: timestamp("created_at").defaultNow(),
      lastLoginAt: timestamp("last_login_at")
    });
    userRoles = pgTable("user_roles", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      role: text("role").notNull().$type(),
      entityId: varchar("entity_id"),
      // Links to specific tag, merchant, philanthropist, or organization
      isActive: integer("is_active").default(1),
      createdAt: timestamp("created_at").defaultNow()
    });
    organizations = pgTable("organizations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      type: text("type").notNull(),
      parentId: varchar("parent_id"),
      country: text("country"),
      taxId: text("tax_id"),
      charityRegistrationNumber: text("charity_registration_number"),
      taxExemptStatus: text("tax_exempt_status").default("pending").$type(),
      smartContractAddress: text("smart_contract_address"),
      // Fireblocks blockchain smart contract address
      blockchainNetwork: text("blockchain_network"),
      // e.g., "Ethereum", "Polygon", etc.
      contractDeployedAt: timestamp("contract_deployed_at"),
      referralCode: varchar("referral_code").unique(),
      referredBy: varchar("referred_by"),
      website: text("website"),
      facebook: text("facebook"),
      twitter: text("twitter"),
      instagram: text("instagram"),
      linkedin: text("linkedin"),
      description: text("description"),
      logoUrl: text("logo_url"),
      email: text("email").unique(),
      passwordHash: text("password_hash"),
      // USDT Auto-Convert fields
      kybStatus: text("kyb_status").default("pending").$type(),
      // Know Your Business verification
      fireblocksVaultId: text("fireblocks_vault_id"),
      // Fireblocks custody vault ID for USDT
      usdtBalanceCents: integer("usdt_balance_cents").default(0),
      // USDT balance in cents (for tracking)
      payoutPreference: text("payout_preference").default("BANK").$type(),
      // Preferred payout method
      bankAccountRef: text("bank_account_ref")
      // Reference to bank account for fiat payouts
    });
    wallets = pgTable("wallets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      type: text("type").notNull().$type(),
      name: text("name").notNull(),
      balanceZAR: integer("balance_zar").notNull().default(0)
    });
    tags = pgTable("tags", {
      tagCode: varchar("tag_code").primaryKey(),
      walletId: varchar("wallet_id").notNull(),
      userId: varchar("user_id"),
      // Links to unified users table
      pin: varchar("pin", { length: 6 }),
      // Legacy PIN system (optional with unified auth)
      organizationId: varchar("organization_id"),
      beneficiaryType: text("beneficiary_type"),
      beneficiaryName: text("beneficiary_name"),
      beneficiaryPhone: text("beneficiary_phone"),
      issuedAt: timestamp("issued_at").defaultNow(),
      sumsubApplicantId: varchar("sumsub_applicant_id"),
      verificationStatus: text("verification_status").default("pending").$type(),
      verifiedAt: timestamp("verified_at"),
      referralCode: varchar("referral_code").unique(),
      referredBy: varchar("referred_by"),
      website: text("website"),
      facebook: text("facebook"),
      twitter: text("twitter"),
      instagram: text("instagram"),
      linkedin: text("linkedin"),
      description: text("description"),
      logoUrl: text("logo_url")
    });
    merchantChains = pgTable("merchant_chains", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow()
    });
    merchantOutlets = pgTable("merchant_outlets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      outletCode: varchar("outlet_code").unique(),
      chainId: varchar("chain_id").notNull(),
      walletId: varchar("wallet_id").notNull().unique(),
      userId: varchar("user_id"),
      // Links to unified users table
      displayName: text("display_name").notNull(),
      town: text("town").notNull(),
      region: text("region"),
      address: text("address"),
      status: text("status").notNull().default("active").$type(),
      referralCode: varchar("referral_code").unique(),
      referredBy: varchar("referred_by"),
      createdAt: timestamp("created_at").defaultNow()
    });
    transactions = pgTable("transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      ts: timestamp("ts").notNull().defaultNow(),
      kind: text("kind").notNull(),
      fromWalletId: varchar("from_wallet_id"),
      toWalletId: varchar("to_wallet_id"),
      amount: integer("amount").notNull(),
      ref: text("ref"),
      merchantOutletId: varchar("merchant_outlet_id"),
      currency: text("currency").default("ZAR"),
      donorCountry: text("donor_country"),
      taxDeductible: integer("tax_deductible").default(1),
      donorName: text("donor_name"),
      donorEmail: text("donor_email"),
      donorTagCode: varchar("donor_tag_code"),
      // Freedom Tag code used to make donation (for account-based tracking)
      blockchainTxHash: text("blockchain_tx_hash"),
      blockchainNetwork: text("blockchain_network"),
      cryptoPaymentId: text("crypto_payment_id"),
      // Blockkoin payment ID for tracking
      status: text("status").default("completed").$type()
      // Payment status
    });
    taxReceipts = pgTable("tax_receipts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull(),
      organizationId: varchar("organization_id").notNull(),
      donorName: text("donor_name"),
      donorEmail: text("donor_email"),
      donorTaxId: text("donor_tax_id"),
      donorCountry: text("donor_country").notNull(),
      amount: integer("amount").notNull(),
      currency: text("currency").notNull(),
      taxYear: integer("tax_year").notNull(),
      receiptNumber: text("receipt_number").notNull().unique(),
      issuedAt: timestamp("issued_at").defaultNow(),
      pdfUrl: text("pdf_url")
    });
    philanthropists = pgTable("philanthropists", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id"),
      // Links to unified users table (replaces email/password)
      email: text("email").notNull().unique(),
      // Keep for legacy compatibility
      passwordHash: text("password_hash").notNull(),
      // Keep for legacy compatibility
      displayName: text("display_name"),
      bio: text("bio"),
      walletId: varchar("wallet_id").notNull().unique(),
      isAnonymous: integer("is_anonymous").default(1),
      country: text("country"),
      referralCode: varchar("referral_code").unique(),
      referredBy: varchar("referred_by"),
      blockkoinAccountId: text("blockkoin_account_id"),
      // Auto-created Blockkoin account
      blockkoinKycStatus: text("blockkoin_kyc_status").default("none").$type(),
      // KYC for $50+ transactions
      createdAt: timestamp("created_at").defaultNow()
    });
    referrals = pgTable("referrals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      referrerCode: varchar("referrer_code").notNull(),
      referrerType: text("referrer_type").notNull().$type(),
      referredCode: varchar("referred_code").notNull(),
      referredType: text("referred_type").notNull().$type(),
      createdAt: timestamp("created_at").defaultNow(),
      rewardAmount: integer("reward_amount").default(0),
      rewardPaid: integer("reward_paid").default(0)
    });
    stories = pgTable("stories", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull(),
      authorType: text("author_type").notNull().$type(),
      message: text("message").notNull(),
      photoUrl: text("photo_url"),
      isPublic: integer("is_public").default(1),
      showAmount: integer("show_amount").default(1),
      showGiver: integer("show_giver").default(0),
      showRecipient: integer("show_recipient").default(1),
      sharingPlatforms: text("sharing_platforms").array().default(sql`ARRAY[]::text[]`),
      createdAt: timestamp("created_at").defaultNow()
    });
    recurringDonations = pgTable("recurring_donations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      philanthropistId: varchar("philanthropist_id").notNull(),
      recipientType: text("recipient_type").notNull().$type(),
      recipientId: varchar("recipient_id").notNull(),
      // tagCode or organizationId
      amountCents: integer("amount_cents").notNull(),
      // Amount in USD cents for consistency
      cryptocurrency: text("cryptocurrency").notNull().default("USDT"),
      // USDT, BTC, ETH, USDC, DAI, etc.
      frequency: text("frequency").notNull().default("monthly").$type(),
      status: text("status").notNull().default("active").$type(),
      autoDonatesDust: integer("auto_donates_dust").default(1),
      // Auto-donate dust amounts
      dustThresholdCents: integer("dust_threshold_cents").default(100),
      // $1 USD threshold
      donorName: text("donor_name"),
      // Optional attribution
      nextProcessingDate: timestamp("next_processing_date"),
      lastProcessedAt: timestamp("last_processed_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true,
      lastLoginAt: true
    });
    insertUserRoleSchema = createInsertSchema(userRoles).omit({
      id: true,
      createdAt: true
    }).extend({
      role: z.enum(["BENEFICIARY", "MERCHANT", "PHILANTHROPIST", "ORGANIZATION", "ADMIN"])
    });
    insertOrganizationSchema = createInsertSchema(organizations).omit({
      id: true
    });
    insertWalletSchema = createInsertSchema(wallets).omit({
      id: true
    }).extend({
      type: z.enum(["TAG", "MERCHANT", "PHILANTHROPIST"])
    });
    insertTagSchema = createInsertSchema(tags).omit({
      issuedAt: true
    });
    insertMerchantChainSchema = createInsertSchema(merchantChains).omit({
      id: true,
      createdAt: true
    });
    insertMerchantOutletSchema = createInsertSchema(merchantOutlets).omit({
      id: true,
      createdAt: true
    }).extend({
      status: z.enum(["active", "inactive"]).default("active")
    });
    insertTransactionSchema = createInsertSchema(transactions).omit({
      id: true,
      ts: true
    });
    insertTaxReceiptSchema = createInsertSchema(taxReceipts).omit({
      id: true,
      issuedAt: true
    });
    insertPhilanthropistSchema = createInsertSchema(philanthropists).omit({
      id: true,
      createdAt: true
    });
    insertReferralSchema = createInsertSchema(referrals).omit({
      id: true,
      createdAt: true
    }).extend({
      referrerType: z.enum(["PHILANTHROPIST", "TAG", "MERCHANT", "ORGANIZATION"]),
      referredType: z.enum(["PHILANTHROPIST", "TAG", "MERCHANT", "ORGANIZATION"])
    });
    insertStorySchema = createInsertSchema(stories).omit({
      id: true,
      createdAt: true
    }).extend({
      authorType: z.enum(["GIVER", "RECEIVER"])
    });
    insertRecurringDonationSchema = createInsertSchema(recurringDonations).omit({
      id: true,
      createdAt: true,
      lastProcessedAt: true
    }).extend({
      recipientType: z.enum(["TAG", "ORGANIZATION"]),
      frequency: z.enum(["monthly"]).default("monthly"),
      status: z.enum(["active", "paused", "cancelled"]).default("active")
    });
    disasterCampaigns = pgTable("disaster_campaigns", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      organizationId: varchar("organization_id").notNull().references(() => organizations.id),
      title: text("title").notNull(),
      description: text("description").notNull(),
      disasterType: text("disaster_type").notNull(),
      // e.g., "Earthquake", "Flood", "Hurricane"
      location: text("location").notNull(),
      urgencyLevel: text("urgency_level").notNull().$type(),
      status: text("status").notNull().default("active").$type(),
      totalRaisedCents: integer("total_raised_cents").notNull().default(0),
      // Amount raised in ZAR cents
      voteCount: integer("vote_count").notNull().default(0),
      monthYear: text("month_year").notNull(),
      // Format: "2025-01" for grouping by month
      createdAt: timestamp("created_at").defaultNow(),
      distributedAt: timestamp("distributed_at")
    });
    dustyBinDonations = pgTable("dusty_bin_donations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id),
      cryptocurrency: text("cryptocurrency").notNull(),
      amountCrypto: text("amount_crypto").notNull(),
      // Crypto amount as string for precision
      amountUsdCents: integer("amount_usd_cents").notNull(),
      // USD value in cents
      monthYear: text("month_year").notNull(),
      // Format: "2025-01"
      createdAt: timestamp("created_at").defaultNow()
    });
    campaignVotes = pgTable("campaign_votes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      campaignId: varchar("campaign_id").notNull().references(() => disasterCampaigns.id),
      monthYear: text("month_year").notNull(),
      // Format: "2025-01"
      createdAt: timestamp("created_at").defaultNow()
    });
    insertDisasterCampaignSchema = createInsertSchema(disasterCampaigns).omit({
      id: true,
      totalRaisedCents: true,
      voteCount: true,
      createdAt: true,
      distributedAt: true
    });
    insertDustyBinDonationSchema = createInsertSchema(dustyBinDonations).omit({
      id: true,
      createdAt: true
    });
    insertCampaignVoteSchema = createInsertSchema(campaignVotes).omit({
      id: true,
      createdAt: true
    });
    whatsappContacts = pgTable("whatsapp_contacts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      phoneNumber: text("phone_number").notNull().unique(),
      name: text("name").notNull(),
      email: text("email"),
      tags: text("tags").array().default(sql`ARRAY[]::text[]`),
      source: text("source").default("demo"),
      lastMessageAt: timestamp("last_message_at"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow()
    });
    whatsappConversations = pgTable("whatsapp_conversations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      contactId: varchar("contact_id").notNull().references(() => whatsappContacts.id),
      status: text("status").notNull().default("active").$type(),
      assignedTo: varchar("assigned_to"),
      lastMessageAt: timestamp("last_message_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    whatsappMessages = pgTable("whatsapp_messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      conversationId: varchar("conversation_id").notNull().references(() => whatsappConversations.id),
      direction: text("direction").notNull().$type(),
      messageType: text("message_type").notNull().$type(),
      content: text("content").notNull(),
      mediaUrl: text("media_url"),
      status: text("status").default("sent").$type(),
      isAiGenerated: integer("is_ai_generated").default(0),
      sentAt: timestamp("sent_at").defaultNow()
    });
    whatsappTickets = pgTable("whatsapp_tickets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      ticketNumber: text("ticket_number").notNull().unique(),
      conversationId: varchar("conversation_id").notNull().references(() => whatsappConversations.id),
      contactId: varchar("contact_id").notNull().references(() => whatsappContacts.id),
      subject: text("subject").notNull(),
      priority: text("priority").notNull().default("medium").$type(),
      status: text("status").notNull().default("open").$type(),
      assignedTo: varchar("assigned_to"),
      category: text("category"),
      notes: text("notes"),
      resolvedAt: timestamp("resolved_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertWhatsappContactSchema = createInsertSchema(whatsappContacts).omit({
      id: true,
      createdAt: true
    });
    insertWhatsappConversationSchema = createInsertSchema(whatsappConversations).omit({
      id: true,
      createdAt: true
    }).extend({
      status: z.enum(["active", "resolved", "archived"]).default("active")
    });
    insertWhatsappMessageSchema = createInsertSchema(whatsappMessages).omit({
      id: true,
      sentAt: true
    }).extend({
      direction: z.enum(["incoming", "outgoing"]),
      messageType: z.enum(["text", "image", "document", "template", "button", "list"]),
      status: z.enum(["sent", "delivered", "read", "failed"]).optional()
    });
    insertWhatsappTicketSchema = createInsertSchema(whatsappTickets).omit({
      id: true,
      createdAt: true,
      resolvedAt: true
    }).extend({
      priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
      status: z.enum(["open", "in_progress", "waiting", "resolved", "closed"]).default("open")
    });
    udr = pgTable("udr", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
      // Channel and allocation
      channel: text("channel").notNull().$type(),
      charityId: varchar("charity_id").references(() => organizations.id),
      campaignId: varchar("campaign_id"),
      tagId: varchar("tag_id").references(() => tags.tagCode),
      // Source donation details
      amountSource: text("amount_source").notNull(),
      // Numeric string for precision
      currencySource: text("currency_source").notNull(),
      // ZAR, USD, ETH, BTC, etc.
      // Bank/PSP references (for fiat)
      bankRef: text("bank_ref"),
      pspRef: text("psp_ref"),
      // On-chain inbound (for crypto)
      onchainTxHashIn: text("onchain_tx_hash_in"),
      networkIn: text("network_in"),
      // Ethereum, Polygon, TRON, etc.
      // Conversion to USDT
      convertedAsset: text("converted_asset").notNull().default("USDT"),
      convertedAmount: text("converted_amount"),
      // Numeric string for precision
      fxRate: text("fx_rate"),
      // Exchange rate used
      conversionFee: text("conversion_fee"),
      // Fee in USDT
      // Fireblocks custody (transfer to charity vault)
      fireblocksVaultId: text("fireblocks_vault_id"),
      fireblocksTxIdToVault: text("fireblocks_tx_id_to_vault"),
      onchainTxHashToVault: text("onchain_tx_hash_to_vault"),
      networkToVault: text("network_to_vault"),
      // TRON, Polygon, Ethereum
      // Status tracking
      status: text("status").notNull().default("RECEIVED").$type(),
      // Evidence and metadata
      evidence: text("evidence"),
      // JSON string with PSP receipts, exchange fills, etc.
      failureReason: text("failure_reason")
    });
    payouts = pgTable("payouts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      charityId: varchar("charity_id").notNull().references(() => organizations.id),
      // Payout details
      type: text("type").notNull().$type(),
      amount: text("amount").notNull(),
      // Numeric string for precision
      currency: text("currency").notNull(),
      // USDT, ZAR, USD, EUR, etc.
      // Status and execution
      status: text("status").notNull().default("QUEUED").$type(),
      // On-chain details (for USDT withdrawals)
      recipientAddress: text("recipient_address"),
      network: text("network"),
      // TRON, Polygon, Ethereum
      txHash: text("tx_hash"),
      fireblocksTransferId: text("fireblocks_transfer_id"),
      // Bank details (for fiat payouts)
      bankAccountRef: text("bank_account_ref"),
      bankTransferRef: text("bank_transfer_ref"),
      // Conversion (if USDT → fiat)
      usdtSold: text("usdt_sold"),
      // Amount of USDT converted
      fxRate: text("fx_rate"),
      conversionFee: text("conversion_fee"),
      // Evidence and tracking
      evidence: text("evidence"),
      // JSON string with receipts, proofs
      failureReason: text("failure_reason"),
      createdAt: timestamp("created_at").defaultNow(),
      completedAt: timestamp("completed_at")
    });
    insertUdrSchema = createInsertSchema(udr).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      channel: z.enum(["FIAT", "CRYPTO"]),
      status: z.enum(["RECEIVED", "CONVERTING", "CONVERTED", "ANCHORING", "ONCHAIN_CONFIRMED", "ALLOCATED", "SETTLED", "FAILED"]).default("RECEIVED")
    });
    insertPayoutSchema = createInsertSchema(payouts).omit({
      id: true,
      createdAt: true,
      completedAt: true
    }).extend({
      type: z.enum(["FIAT", "USDT"]),
      status: z.enum(["QUEUED", "PROCESSING", "SENT", "SETTLED", "FAILED", "CANCELLED"]).default("QUEUED")
    });
    passwordResetTokens = pgTable("password_reset_tokens", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull(),
      // Can reference users.id or philanthropists.id
      userType: text("user_type").notNull().$type(),
      // Track which table the user is in
      email: text("email").notNull(),
      token: text("token").notNull().unique(),
      // Secure random token
      sumsubApplicantId: text("sumsub_applicant_id"),
      // Sumsub verification applicant ID
      sumsubAccessToken: text("sumsub_access_token"),
      // Temporary Sumsub SDK token
      verificationStatus: text("verification_status").notNull().default("pending").$type(),
      verifiedAt: timestamp("verified_at"),
      expiresAt: timestamp("expires_at").notNull(),
      usedAt: timestamp("used_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokens).omit({
      id: true,
      createdAt: true
    }).extend({
      userType: z.enum(["user", "philanthropist"]),
      verificationStatus: z.enum(["pending", "verified", "rejected"]).default("pending")
    });
    learnEntries = pgTable("learn_entries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      route: text("route").notNull().unique(),
      // Page route, e.g., "/donate", "/tags/create"
      title: text("title").notNull(),
      // e.g., "Donate — How to use this page"
      howSteps: text("how_steps").array().notNull(),
      // Step-by-step instructions
      whatHappensNext: text("what_happens_next").array().notNull(),
      // Post-action outcomes
      requirements: text("requirements").array().notNull(),
      // Prerequisites for this page
      commonErrors: text("common_errors").notNull(),
      // JSON string of {code, fix}[]
      privacyNote: text("privacy_note"),
      // Optional privacy/trust message
      status: text("status").notNull().default("draft").$type(),
      gitRef: text("git_ref"),
      // Short git commit hash when generated/updated
      createdAt: timestamp("created_at").defaultNow(),
      lastUpdatedAt: timestamp("last_updated_at").defaultNow(),
      publishedAt: timestamp("published_at"),
      publishedBy: varchar("published_by")
      // User ID who published
    });
    insertLearnEntrySchema = createInsertSchema(learnEntries).omit({
      id: true,
      createdAt: true,
      lastUpdatedAt: true
    }).extend({
      status: z.enum(["draft", "needs_review", "published"]).default("draft")
    });
  }
});

// supabase.ts
import { createClient } from "@supabase/supabase-js";
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_m, p1) => p1.toUpperCase());
}
function camelizeRow(row) {
  if (!row || typeof row !== "object") return row;
  if (Array.isArray(row)) return row.map((r) => camelizeRow(r));
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    const key = toCamelCase(k);
    if (v instanceof Date) {
      out[key] = v;
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      out[key] = camelizeRow(v);
    } else if (Array.isArray(v)) {
      out[key] = v.map((el) => typeof el === "object" ? camelizeRow(el) : el);
    } else {
      out[key] = v;
    }
  }
  return out;
}
function camelizeRows(rows) {
  if (!rows) return [];
  return rows.map((r) => camelizeRow(r));
}
function toSnakeCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
function snakeifyRow(row) {
  if (!row || typeof row !== "object") return row;
  if (Array.isArray(row)) return row.map((r) => snakeifyRow(r));
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    const key = toSnakeCase(k);
    if (v instanceof Date) {
      out[key] = v;
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      out[key] = snakeifyRow(v);
    } else if (Array.isArray(v)) {
      out[key] = v.map((el) => typeof el === "object" ? snakeifyRow(el) : el);
    } else {
      out[key] = v;
    }
  }
  return out;
}
var SUPABASE_URL, SUPABASE_KEY, supabase;
var init_supabase = __esm({
  "supabase.ts"() {
    "use strict";
    SUPABASE_URL = process.env.SUPABASE_URL;
    SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
      global: { headers: { "x-client": "freedom-server" } }
    }) : null;
  }
});

// db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool,
  supabase: () => supabase
});
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "db.ts"() {
    "use strict";
    init_schema();
    init_supabase();
    neonConfig.webSocketConstructor = ws;
    pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : void 0;
    db = process.env.DATABASE_URL ? drizzle({ client: pool, schema: schema_exports }) : void 0;
  }
});

// sumsub.ts
var sumsub_exports = {};
__export(sumsub_exports, {
  DemoSumsubClient: () => DemoSumsubClient,
  SumsubClient: () => SumsubClient,
  createSumsubClient: () => createSumsubClient
});
import crypto2 from "crypto";
function createSumsubClient() {
  const rawAppToken = process.env.SUMSUB_APP_TOKEN || "";
  const rawSecretKey = process.env.SUMSUB_SECRET_KEY || "";
  const mask = (s) => s ? `${s.slice(0, 6)}...${s.slice(-6)} (${s.length})` : "<empty>";
  console.log("[Sumsub] tokens (masked):", mask(rawAppToken), mask(rawSecretKey));
  const appToken = rawAppToken.replace(/^Bearer\s+/i, "").trim();
  const secretKey = rawSecretKey.trim();
  if (!appToken || !secretKey) {
    console.warn("Sumsub credentials not configured or empty. Set SUMSUB_APP_TOKEN and SUMSUB_SECRET_KEY environment variables.");
    console.log("[Sumsub DEMO API] Using DEMO MODE - verification will be simulated for development");
    return new DemoSumsubClient();
  }
  if (appToken.toLowerCase().startsWith("bearer")) {
    console.warn('SUMSUB_APP_TOKEN appears to contain a "Bearer" prefix which should be removed. Stripping it automatically.');
  }
  if (appToken.length < 10 || secretKey.length < 10) {
    console.warn("SUMSUB_APP_TOKEN or SUMSUB_SECRET_KEY look unusually short; double-check the values you configured.");
  }
  const bothLookSecret = appToken.startsWith("sb_secret") && secretKey.startsWith("sb_secret");
  const identical = appToken === secretKey;
  if (bothLookSecret) {
    console.warn('Both SUMSUB_APP_TOKEN and SUMSUB_SECRET_KEY appear to be secret-like strings (start with "sb_secret..."). Confirm you copied the correct App token into SUMSUB_APP_TOKEN (App token is different from the Secret key)');
  }
  if (identical) {
    console.warn("SUMSUB_APP_TOKEN and SUMSUB_SECRET_KEY are identical \u2014 this is likely incorrect; check your env values and from the Sumsub dashboard.");
  }
  if (bothLookSecret || identical) {
    console.warn("Potential Sumsub misconfiguration detected; falling back to DemoSumsubClient to avoid API errors. Fix your env or Supabase values to use the correct App Token and Secret Key.");
    return new DemoSumsubClient();
  }
  return new SumsubClient({
    appToken,
    secretKey,
    levelName: process.env.SUMSUB_LEVEL_NAME || "basic-kyc-level"
  });
}
var SumsubClient, DemoSumsubClient;
var init_sumsub = __esm({
  "sumsub.ts"() {
    "use strict";
    SumsubClient = class {
      constructor(config) {
        this.config = {
          ...config,
          baseUrl: config.baseUrl || "https://api.sumsub.com",
          levelName: config.levelName || "basic-kyc-level"
        };
      }
      generateSignature(method, url, timestamp2, body) {
        const signatureString = timestamp2 + method.toUpperCase() + url + (body || "");
        return crypto2.createHmac("sha256", this.config.secretKey).update(signatureString).digest("hex");
      }
      async makeRequest(method, endpoint, body) {
        const timestamp2 = Math.floor(Date.now() / 1e3);
        const url = `/resources${endpoint}`;
        const bodyString = body ? JSON.stringify(body) : void 0;
        const signature = this.generateSignature(method, url, timestamp2, bodyString);
        const headers = {
          "X-App-Token": this.config.appToken,
          "X-App-Access-Ts": timestamp2.toString(),
          "X-App-Access-Sig": signature,
          "Content-Type": "application/json"
        };
        const fullUrl = `${this.config.baseUrl}${url}`;
        const response = await fetch(fullUrl, {
          method,
          headers,
          body: bodyString
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Sumsub API error: ${response.status} - ${errorText}`);
        }
        return response.json();
      }
      async createApplicant(request) {
        const body = {
          externalUserId: request.externalUserId,
          info: {
            firstName: request.firstName,
            lastName: request.lastName,
            country: "ZAF"
          },
          email: request.email,
          phone: request.phone
        };
        return this.makeRequest("POST", `/applicants?levelName=${this.config.levelName}`, body);
      }
      async getApplicant(applicantId) {
        return this.makeRequest("GET", `/applicants/${applicantId}/one`);
      }
      async generateAccessToken(applicantId, externalUserId, ttlInSeconds = 600) {
        const body = {
          userId: externalUserId,
          ttlInSecs: ttlInSeconds
        };
        const result = await this.makeRequest(
          "POST",
          `/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSeconds}`,
          body
        );
        return {
          token: result.token,
          userId: externalUserId
        };
      }
      async getApplicantStatus(applicantId) {
        const applicant = await this.getApplicant(applicantId);
        return {
          reviewStatus: applicant.reviewStatus || "pending",
          reviewResult: applicant.reviewResult?.reviewAnswer
        };
      }
      getSdkUrl(applicantId, accessToken) {
        return `https://cockpit.sumsub.com/idensic/index.html?app=${this.config.appToken}&applicantId=${applicantId}&accessToken=${accessToken}`;
      }
    };
    DemoSumsubClient = class {
      async createApplicant(request) {
        const mockApplicantId = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        return {
          id: mockApplicantId,
          externalUserId: request.externalUserId,
          reviewStatus: "pending"
        };
      }
      async getApplicant(applicantId) {
        return {
          id: applicantId,
          externalUserId: applicantId,
          reviewStatus: "completed",
          reviewResult: {
            reviewAnswer: "GREEN"
          }
        };
      }
      async generateAccessToken(applicantId, externalUserId) {
        return {
          token: `demo_token_${Date.now()}`,
          userId: externalUserId
        };
      }
      async getApplicantStatus(applicantId) {
        return {
          reviewStatus: "completed",
          reviewResult: "GREEN"
        };
      }
      getSdkUrl(applicantId, accessToken) {
        const replitDomains = process.env.REPLIT_DOMAINS;
        const baseUrl = replitDomains ? `https://${replitDomains.split(",")[0]}` : "http://localhost:3000";
        return `${baseUrl}/demo-verification?applicantId=${applicantId}&token=${accessToken}`;
      }
    };
  }
});

// utils/referral.ts
var referral_exports = {};
__export(referral_exports, {
  calculateReferralReward: () => calculateReferralReward,
  generateReferralCode: () => generateReferralCode
});
function generateReferralCode(type, id) {
  const prefix = {
    PHILANTHROPIST: "PHIL",
    TAG: "TAG",
    MERCHANT: "MERC",
    ORGANIZATION: "ORG"
  }[type];
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${randomPart}`;
}
function calculateReferralReward(referrerType, referredType) {
  const rewards = {
    PHILANTHROPIST: {
      PHILANTHROPIST: 5e3,
      // R 50
      TAG: 2e3,
      // R 20
      MERCHANT: 3e3,
      // R 30
      ORGANIZATION: 5e3
      // R 50
    },
    TAG: {
      PHILANTHROPIST: 3e3,
      // R 30
      TAG: 1e3,
      // R 10
      MERCHANT: 2e3,
      // R 20
      ORGANIZATION: 2e3
      // R 20
    },
    MERCHANT: {
      PHILANTHROPIST: 5e3,
      // R 50
      TAG: 2e3,
      // R 20
      MERCHANT: 3e3,
      // R 30
      ORGANIZATION: 3e3
      // R 30
    },
    ORGANIZATION: {
      PHILANTHROPIST: 5e3,
      // R 50
      TAG: 2e3,
      // R 20
      MERCHANT: 3e3,
      // R 30
      ORGANIZATION: 5e3
      // R 50
    }
  };
  return rewards[referrerType]?.[referredType] ?? 1e3;
}
var init_referral = __esm({
  "utils/referral.ts"() {
    "use strict";
  }
});

// index.ts
import "dotenv/config";
import cors from "cors";
import express20 from "express";
import session from "express-session";

// routes.ts
import { createServer } from "http";

// storage.ts
init_schema();
init_db();
init_supabase();
import { eq, desc, isNull, sql as sql2 } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
var DatabaseStorage = class {
  constructor() {
    // WhatsApp Business API Demo - In-Memory Implementation
    this.whatsappContacts = /* @__PURE__ */ new Map();
    this.whatsappConversations = /* @__PURE__ */ new Map();
    this.whatsappMessages = /* @__PURE__ */ new Map();
    this.whatsappTickets = /* @__PURE__ */ new Map();
    this.whatsappDemoSeeded = false;
    this.seedPromise = this.seedData().catch((err) => {
      console.error("Seeding failed:", err instanceof Error ? err.message : err);
    });
  }
  async ensureSeeded() {
    await this.seedPromise;
  }
  async seedMerchantChainsOnly() {
    let pickNPayChain;
    let havenShelterChain;
    if (supabase) {
      const { data: pnpData, error: pnpErr } = await supabase.from("merchant_chains").insert(snakeifyRow({
        name: "Pick n Pay",
        description: "Leading South African supermarket chain"
      })).select().maybeSingle();
      if (pnpErr) throw pnpErr;
      pickNPayChain = camelizeRow(pnpData);
      const { data: hsData, error: hsErr } = await supabase.from("merchant_chains").insert(snakeifyRow({
        name: "Haven Shelter",
        description: "Shelter and support services for the homeless"
      })).select().maybeSingle();
      if (hsErr) throw hsErr;
      havenShelterChain = camelizeRow(hsData);
    } else if (db) {
      const [pnpRow] = await db.insert(merchantChains).values({
        name: "Pick n Pay",
        description: "Leading South African supermarket chain"
      }).returning();
      pickNPayChain = pnpRow;
      const [hsRow] = await db.insert(merchantChains).values({
        name: "Haven Shelter",
        description: "Shelter and support services for the homeless"
      }).returning();
      havenShelterChain = hsRow;
    } else {
      throw new Error("Neither Supabase nor Drizzle DB is configured. Cannot seed merchant chains.");
    }
    const pickNPayOutlets = [
      { town: "Cape Town CBD", region: "Western Cape" },
      { town: "Johannesburg Sandton", region: "Gauteng" },
      { town: "Durban Central", region: "KwaZulu-Natal" },
      { town: "Pretoria Menlyn", region: "Gauteng" },
      { town: "Port Elizabeth", region: "Eastern Cape" },
      { town: "Bloemfontein", region: "Free State" },
      { town: "East London", region: "Eastern Cape" },
      { town: "Polokwane", region: "Limpopo" },
      { town: "Nelspruit", region: "Mpumalanga" },
      { town: "Kimberley", region: "Northern Cape" },
      { town: "Rustenburg", region: "North West" },
      { town: "Cape Town Claremont", region: "Western Cape" },
      { town: "Johannesburg Rosebank", region: "Gauteng" },
      { town: "Durban Umhlanga", region: "KwaZulu-Natal" },
      { town: "Stellenbosch", region: "Western Cape" },
      { town: "Pietermaritzburg", region: "KwaZulu-Natal" },
      { town: "George", region: "Western Cape" },
      { town: "Midrand", region: "Gauteng" },
      { town: "Somerset West", region: "Western Cape" },
      { town: "Centurion", region: "Gauteng" },
      { town: "Ballito", region: "KwaZulu-Natal" },
      { town: "Randburg", region: "Gauteng" }
    ];
    for (const { town, region } of pickNPayOutlets) {
      let wallet;
      if (supabase) {
        const { data, error } = await supabase.from("wallets").insert(snakeifyRow({
          type: "MERCHANT",
          name: `Pick n Pay - ${town}`,
          balanceZar: 0
        })).select().maybeSingle();
        if (error) throw error;
        wallet = camelizeRow(data);
      } else if (db) {
        const [row] = await db.insert(wallets).values({
          type: "MERCHANT",
          name: `Pick n Pay - ${town}`,
          balanceZAR: 0
        }).returning();
        wallet = row;
      } else {
        throw new Error("Neither Supabase nor Drizzle DB is configured. Cannot seed merchant outlets.");
      }
      if (supabase) {
        const { error } = await supabase.from("merchant_outlets").insert(snakeifyRow({
          chainId: pickNPayChain.id,
          walletId: wallet.id,
          displayName: `Pick n Pay - ${town}`,
          town,
          region,
          status: "active"
        }));
        if (error) throw error;
      } else if (db) {
        await db.insert(merchantOutlets).values({
          chainId: pickNPayChain.id,
          walletId: wallet.id,
          displayName: `Pick n Pay - ${town}`,
          town,
          region,
          status: "active"
        });
      }
    }
    let havenWallet;
    if (supabase) {
      const { data, error } = await supabase.from("wallets").insert(snakeifyRow({
        type: "MERCHANT",
        name: "Haven Shelter - Cape Town",
        balanceZar: 0
      })).select().maybeSingle();
      if (error) throw error;
      havenWallet = camelizeRow(data);
    } else if (db) {
      const [row] = await db.insert(wallets).values({
        type: "MERCHANT",
        name: "Haven Shelter - Cape Town",
        balanceZAR: 0
      }).returning();
      havenWallet = row;
    } else {
      throw new Error("Neither Supabase nor Drizzle DB is configured. Cannot seed haven shelter outlet.");
    }
    if (supabase) {
      const { error } = await supabase.from("merchant_outlets").insert(snakeifyRow({
        chainId: havenShelterChain.id,
        walletId: havenWallet.id,
        displayName: "Haven Shelter - Cape Town",
        town: "Cape Town",
        region: "Western Cape",
        status: "active"
      }));
      if (error) throw error;
    } else if (db) {
      await db.insert(merchantOutlets).values({
        chainId: havenShelterChain.id,
        walletId: havenWallet.id,
        displayName: "Haven Shelter - Cape Town",
        town: "Cape Town",
        region: "Western Cape",
        status: "active"
      });
    }
  }
  async seedData() {
    try {
      if (!supabase) {
        console.error("Supabase is not configured. Please set SUPABASE_URL and SUPABASE_KEY environment variables. Skipping seed.");
        return;
      }
      const { data: chainsData, error: chainsError } = await supabase.from("merchant_chains").select("*");
      let existingChains = [];
      if (chainsError) {
        console.error("Supabase seed merchant chains check error:", chainsError.message || chainsError);
        existingChains = [];
      } else {
        existingChains = chainsData || [];
      }
      if (existingChains.length > 0) {
        return;
      }
      let existingOrgs = [];
      let existingTags = [];
      const [orgsRes, tagsRes] = await Promise.all([
        supabase.from("organizations").select("*"),
        supabase.from("tags").select("*")
      ]);
      if (orgsRes.error) {
        console.error("Supabase seed organizations check error:", orgsRes.error.message || orgsRes.error);
        existingOrgs = [];
      } else {
        existingOrgs = orgsRes.data || [];
      }
      if (tagsRes.error) {
        console.error("Supabase seed tags check error:", tagsRes.error.message || tagsRes.error);
        existingTags = [];
      } else {
        existingTags = tagsRes.data || [];
      }
      if (existingOrgs.length > 0 && existingTags.length > 0) {
        await this.seedMerchantChainsOnly();
        return;
      }
      const { data: hsOrgData, error: hsOrgError } = await supabase.from("organizations").insert(snakeifyRow({
        name: "Haven Shelter",
        type: "Shelter for Homeless",
        parentId: null
      })).select().maybeSingle();
      if (hsOrgError) throw hsOrgError;
      const havenShelter = camelizeRow(hsOrgData);
      const { data: pnpOrgData, error: pnpOrgError } = await supabase.from("organizations").insert(snakeifyRow({
        name: "Pick n Pay Foundation",
        type: "Corporate Foundation",
        parentId: null
      })).select().maybeSingle();
      if (pnpOrgError) throw pnpOrgError;
      const pickNPayFoundation = camelizeRow(pnpOrgData);
      const { data: saOrgData, error: saOrgError } = await supabase.from("organizations").insert(snakeifyRow({
        name: "Student Aid Program",
        type: "Educational Support",
        parentId: pickNPayFoundation.id
      })).select().maybeSingle();
      if (saOrgError) throw saOrgError;
      const studentAid = camelizeRow(saOrgData);
      const tagData = [
        // Haven Shelter - Homeless beneficiaries
        { code: "CT001", pin: "1234", orgId: havenShelter.id, type: "Homeless", name: "John Doe" },
        { code: "CT002", pin: "5678", orgId: havenShelter.id, type: "Homeless", name: "Sarah Williams" },
        { code: "CT003", pin: "4321", orgId: havenShelter.id, type: "Homeless", name: "Michael Brown" },
        { code: "CT004", pin: "8765", orgId: havenShelter.id, type: "Homeless", name: "Patricia Jones" },
        { code: "CT005", pin: "2468", orgId: havenShelter.id, type: "Homeless", name: "David Miller" },
        { code: "CT006", pin: "1357", orgId: havenShelter.id, type: "Homeless", name: "Maria Garcia" },
        { code: "CT007", pin: "9876", orgId: havenShelter.id, type: "Homeless", name: "James Wilson" },
        { code: "CT008", pin: "5432", orgId: havenShelter.id, type: "Homeless", name: "Linda Martinez" },
        { code: "CT009", pin: "7890", orgId: havenShelter.id, type: "Homeless", name: "Robert Anderson" },
        { code: "CT010", pin: "3456", orgId: havenShelter.id, type: "Homeless", name: "Barbara Thomas" },
        // Haven Shelter - Unbanked beneficiaries
        { code: "CT011", pin: "6789", orgId: havenShelter.id, type: "Unbanked", name: "Jane Smith" },
        { code: "CT012", pin: "2345", orgId: havenShelter.id, type: "Unbanked", name: "William Taylor" },
        { code: "CT013", pin: "8901", orgId: havenShelter.id, type: "Unbanked", name: "Elizabeth Moore" },
        { code: "CT014", pin: "4567", orgId: havenShelter.id, type: "Unbanked", name: "Charles Jackson" },
        { code: "CT015", pin: "0123", orgId: havenShelter.id, type: "Unbanked", name: "Mary White" },
        { code: "CT016", pin: "9012", orgId: havenShelter.id, type: "Unbanked", name: "Joseph Harris" },
        { code: "CT017", pin: "5670", orgId: havenShelter.id, type: "Unbanked", name: "Susan Martin" },
        { code: "CT018", pin: "1238", orgId: havenShelter.id, type: "Unbanked", name: "Thomas Thompson" },
        { code: "CT019", pin: "7891", orgId: havenShelter.id, type: "Unbanked", name: "Nancy Garcia" },
        { code: "CT020", pin: "3457", orgId: havenShelter.id, type: "Unbanked", name: "Christopher Lee" },
        // Haven Shelter - Migrant Workers
        { code: "CT021", pin: "9013", orgId: havenShelter.id, type: "Migrant Worker", name: "Daniel Rodriguez" },
        { code: "CT022", pin: "5671", orgId: havenShelter.id, type: "Migrant Worker", name: "Jennifer Lopez" },
        { code: "CT023", pin: "1239", orgId: havenShelter.id, type: "Migrant Worker", name: "Matthew Gonzalez" },
        { code: "CT024", pin: "7892", orgId: havenShelter.id, type: "Migrant Worker", name: "Karen Wilson" },
        { code: "CT025", pin: "3458", orgId: havenShelter.id, type: "Migrant Worker", name: "Anthony Perez" },
        { code: "CT026", pin: "9014", orgId: havenShelter.id, type: "Migrant Worker", name: "Lisa Sanchez" },
        { code: "CT027", pin: "5672", orgId: havenShelter.id, type: "Migrant Worker", name: "Mark Ramirez" },
        { code: "CT028", pin: "1230", orgId: havenShelter.id, type: "Migrant Worker", name: "Betty Torres" },
        { code: "CT029", pin: "7893", orgId: havenShelter.id, type: "Migrant Worker", name: "Donald Flores" },
        { code: "CT030", pin: "3459", orgId: havenShelter.id, type: "Migrant Worker", name: "Sandra Rivera" },
        // Student Aid Program - Students
        { code: "CT031", pin: "9999", orgId: studentAid.id, type: "Student", name: "Mike Johnson" },
        { code: "CT032", pin: "1111", orgId: studentAid.id, type: "Student", name: "Emily Chen" },
        { code: "CT033", pin: "2222", orgId: studentAid.id, type: "Student", name: "Jacob Nguyen" },
        { code: "CT034", pin: "3333", orgId: studentAid.id, type: "Student", name: "Olivia Patel" },
        { code: "CT035", pin: "4444", orgId: studentAid.id, type: "Student", name: "Noah Kim" },
        { code: "CT036", pin: "5555", orgId: studentAid.id, type: "Student", name: "Emma Ahmed" },
        { code: "CT037", pin: "6666", orgId: studentAid.id, type: "Student", name: "Liam Singh" },
        { code: "CT038", pin: "7777", orgId: studentAid.id, type: "Student", name: "Sophia Mbeki" },
        { code: "CT039", pin: "8888", orgId: studentAid.id, type: "Student", name: "William Dlamini" },
        { code: "CT040", pin: "0000", orgId: studentAid.id, type: "Student", name: "Ava Naidoo" },
        { code: "CT041", pin: "1212", orgId: studentAid.id, type: "Student", name: "James Khumalo" },
        { code: "CT042", pin: "2323", orgId: studentAid.id, type: "Student", name: "Isabella van der Merwe" },
        { code: "CT043", pin: "3434", orgId: studentAid.id, type: "Student", name: "Benjamin Botha" },
        { code: "CT044", pin: "4545", orgId: studentAid.id, type: "Student", name: "Mia Mthembu" },
        { code: "CT045", pin: "5656", orgId: studentAid.id, type: "Student", name: "Lucas Nel" },
        { code: "CT046", pin: "6767", orgId: studentAid.id, type: "Student", name: "Charlotte Mokoena" },
        { code: "CT047", pin: "7878", orgId: studentAid.id, type: "Student", name: "Henry Zulu" },
        { code: "CT048", pin: "8989", orgId: studentAid.id, type: "Student", name: "Amelia Ndlovu" },
        { code: "CT049", pin: "9090", orgId: studentAid.id, type: "Student", name: "Alexander De Villiers" },
        { code: "CT050", pin: "0101", orgId: studentAid.id, type: "Student", name: "Harper Maluleke" }
      ];
      for (const { code, pin, orgId, type, name } of tagData) {
        let wallet;
        if (supabase) {
          const { data, error } = await supabase.from("wallets").insert(snakeifyRow({
            type: "TAG",
            name: `Tag ${code}`,
            balanceZar: 0
          })).select().maybeSingle();
          if (error) throw error;
          wallet = camelizeRow(data);
        } else if (db) {
          const [row] = await db.insert(wallets).values({
            type: "TAG",
            name: `Tag ${code}`,
            balanceZar: 0
          }).returning();
          wallet = row;
        } else {
          throw new Error("Neither Supabase nor Drizzle DB is configured. Cannot seed demo data.");
        }
        const tagValues = {
          tagCode: code,
          walletId: wallet.id,
          pin,
          organizationId: orgId,
          beneficiaryType: type,
          beneficiaryName: name
        };
        if (code === "CT001") {
          tagValues.sumsubApplicantId = "demo_biometric_CT001";
          tagValues.verificationStatus = "approved";
          tagValues.verifiedAt = /* @__PURE__ */ new Date();
        }
        if (supabase) {
          const { error } = await supabase.from("tags").insert(snakeifyRow(tagValues));
          if (error) throw error;
        } else if (db) {
          await db.insert(tags).values(tagValues);
        } else {
          throw new Error("Neither Supabase nor Drizzle DB is configured. Cannot seed demo data.");
        }
      }
      const { data: pnpChainData, error: pnpChainErr } = await supabase.from("merchant_chains").insert(snakeifyRow({
        name: "Pick n Pay",
        description: "Leading South African supermarket chain"
      })).select().maybeSingle();
      if (pnpChainErr) throw pnpChainErr;
      const pickNPayChain = camelizeRow(pnpChainData);
      const { data: hsChainData, error: hsChainErr } = await supabase.from("merchant_chains").insert(snakeifyRow({
        name: "Haven Shelter",
        description: "Shelter and support services for the homeless"
      })).select().maybeSingle();
      if (hsChainErr) throw hsChainErr;
      const havenShelterChain = camelizeRow(hsChainData);
      const pickNPayOutlets = [
        { town: "Cape Town CBD", region: "Western Cape" },
        { town: "Johannesburg Sandton", region: "Gauteng" },
        { town: "Durban Central", region: "KwaZulu-Natal" },
        { town: "Pretoria Menlyn", region: "Gauteng" },
        { town: "Port Elizabeth", region: "Eastern Cape" },
        { town: "Bloemfontein", region: "Free State" },
        { town: "East London", region: "Eastern Cape" },
        { town: "Polokwane", region: "Limpopo" },
        { town: "Nelspruit", region: "Mpumalanga" },
        { town: "Kimberley", region: "Northern Cape" },
        { town: "Rustenburg", region: "North West" },
        { town: "Cape Town Claremont", region: "Western Cape" },
        { town: "Johannesburg Rosebank", region: "Gauteng" },
        { town: "Durban Umhlanga", region: "KwaZulu-Natal" },
        { town: "Stellenbosch", region: "Western Cape" },
        { town: "Pietermaritzburg", region: "KwaZulu-Natal" },
        { town: "George", region: "Western Cape" },
        { town: "Midrand", region: "Gauteng" },
        { town: "Somerset West", region: "Western Cape" },
        { town: "Centurion", region: "Gauteng" },
        { town: "Ballito", region: "KwaZulu-Natal" },
        { town: "Randburg", region: "Gauteng" }
      ];
      for (const { town, region } of pickNPayOutlets) {
        const { data: walletData, error: walletError } = await supabase.from("wallets").insert(snakeifyRow({
          type: "MERCHANT",
          name: `Pick n Pay - ${town}`,
          balanceZar: 0
        })).select().maybeSingle();
        if (walletError) throw walletError;
        const wallet = camelizeRow(walletData);
        const { error: outletError } = await supabase.from("merchant_outlets").insert(snakeifyRow({
          chainId: pickNPayChain.id,
          walletId: wallet.id,
          displayName: `Pick n Pay - ${town}`,
          town,
          region,
          status: "active"
        }));
        if (outletError) throw outletError;
      }
      const { data: havenWalletData, error: havenWalletError } = await supabase.from("wallets").insert(snakeifyRow({
        type: "MERCHANT",
        name: "Haven Shelter - Cape Town",
        balanceZar: 0
      })).select().maybeSingle();
      if (havenWalletError) throw havenWalletError;
      const havenWallet = camelizeRow(havenWalletData);
      const { error: havenOutletError } = await supabase.from("merchant_outlets").insert(snakeifyRow({
        chainId: havenShelterChain.id,
        walletId: havenWallet.id,
        displayName: "Haven Shelter - Cape Town",
        town: "Cape Town",
        region: "Western Cape",
        status: "active"
      }));
      if (havenOutletError) throw havenOutletError;
    } catch (error) {
      console.error("Seeding failed:", error);
      throw error;
    }
  }
  // User operations (unified authentication)
  async getUser(id) {
    if (supabase) {
      const { data, error } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getUser error:", error.message || error);
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByEmail(email) {
    if (supabase) {
      const { data, error } = await supabase.from("users").select("*").eq("email", email).maybeSingle();
      if (error) {
        console.error("Supabase getUserByEmail error:", error.message || error);
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async createUser(insertUser) {
    if (supabase) {
      const { data, error } = await supabase.from("users").insert(snakeifyRow(insertUser)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUserLastLogin(id) {
    if (supabase) {
      const { data, error } = await supabase.from("users").update({ last_login_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [user] = await db.update(users).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  async updateUser(id, updates) {
    if (supabase) {
      const { data, error } = await supabase.from("users").update(snakeifyRow(updates)).eq("id", id).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("User not found");
      return camelizeRow(data);
    }
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    if (!user) throw new Error("User not found");
    return user;
  }
  async getUserRoles(userId) {
    if (supabase) {
      const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", userId);
      if (error) {
        console.error("Supabase getUserRoles error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(userRoles).where(eq(userRoles.userId, userId));
  }
  async createUserRole(insertUserRole) {
    if (supabase) {
      const { data, error } = await supabase.from("user_roles").insert(snakeifyRow(insertUserRole)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [role] = await db.insert(userRoles).values(insertUserRole).returning();
    return role;
  }
  async getUserWithRoles(userId) {
    const user = await this.getUser(userId);
    if (!user) return void 0;
    const roles = await this.getUserRoles(userId);
    return { user, roles };
  }
  async getOrganization(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("organizations").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getOrganization error:", error.message || error);
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
    return org || void 0;
  }
  async getOrganizationByEmail(email) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("organizations").select("*").eq("email", email).maybeSingle();
      if (error) {
        console.error("Supabase getOrganizationByEmail error:", error.message || error);
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [org] = await db.select().from(organizations).where(eq(organizations.email, email));
    return org || void 0;
  }
  async getAllOrganizations() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("organizations").select("*");
      if (error) {
        console.error("Supabase getAllOrganizations error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(organizations);
  }
  async getOrganizationsByParent(parentId) {
    await this.ensureSeeded();
    if (supabase) {
      if (parentId === null) {
        const { data: data2, error: error2 } = await supabase.from("organizations").select("*").is("parent_id", null);
        if (error2) {
          console.error("Supabase getOrganizationsByParent error:", error2.message || error2);
          return [];
        }
        return camelizeRows(data2);
      }
      const { data, error } = await supabase.from("organizations").select("*").eq("parent_id", parentId);
      if (error) {
        console.error("Supabase getOrganizationsByParent error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    if (parentId === null) {
      return await db.select().from(organizations).where(isNull(organizations.parentId));
    }
    return await db.select().from(organizations).where(eq(organizations.parentId, parentId));
  }
  async createOrganization(insertOrganization) {
    if (supabase) {
      const { data, error } = await supabase.from("organizations").insert(snakeifyRow(insertOrganization)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [org] = await db.insert(organizations).values(insertOrganization).returning();
    return org;
  }
  async getWallet(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("wallets").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getWallet error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [wallet] = await db.select().from(wallets).where(eq(wallets.id, id));
    return wallet || void 0;
  }
  async getAllWallets() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("wallets").select("*");
      if (error) {
        console.error("Supabase getAllWallets error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(wallets);
  }
  async getMerchantWallets() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("wallets").select("*").eq("type", "MERCHANT");
      if (error) {
        console.error("Supabase getMerchantWallets error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(wallets).where(eq(wallets.type, "MERCHANT"));
  }
  async createWallet(insertWallet) {
    if (supabase) {
      const { data, error } = await supabase.from("wallets").insert(snakeifyRow(insertWallet)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [wallet] = await db.insert(wallets).values(insertWallet).returning();
    return wallet;
  }
  async updateWalletBalance(id, newBalance) {
    if (supabase) {
      const { data, error } = await supabase.from("wallets").update({ balance_zar: newBalance }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Wallet not found");
      return camelizeRow(data);
    }
    const [wallet] = await db.update(wallets).set({ balanceZAR: newBalance }).where(eq(wallets.id, id)).returning();
    if (!wallet) throw new Error("Wallet not found");
    return wallet;
  }
  async getTag(tagCode) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("tags").select("*").eq("tag_code", tagCode).maybeSingle();
      if (error) {
        console.error("Supabase getTag error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [tag] = await db.select().from(tags).where(eq(tags.tagCode, tagCode));
    return tag || void 0;
  }
  async getTagByUserId(userId) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("tags").select("*").eq("user_id", userId).maybeSingle();
      if (error) {
        console.error("Supabase getTagByUserId error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [tag] = await db.select().from(tags).where(eq(tags.userId, userId));
    return tag || void 0;
  }
  async getAllTags() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("tags").select("*");
      if (error) {
        console.error("Supabase getAllTags error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(tags);
  }
  async getTagsByOrganization(organizationId) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("tags").select("*").eq("organization_id", organizationId);
      if (error) {
        console.error("Supabase getTagsByOrganization error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(tags).where(eq(tags.organizationId, organizationId));
  }
  async createTag(insertTag) {
    console.log("\u{1F4BE} createTag called with:", insertTag);
    if (supabase) {
      const snakified = snakeifyRow(insertTag);
      console.log("\u{1F40D} Snakified data for Supabase:", snakified);
      const { data, error } = await supabase.from("tags").insert(snakified).select().maybeSingle();
      if (error) {
        console.error("\u274C Supabase insert error:", error);
        throw error;
      }
      const result = data ? camelizeRow(data) : void 0;
      console.log("\u2705 Tag created in Supabase, result:", result);
      return result;
    }
    const [tag] = await db.insert(tags).values(insertTag).returning();
    console.log("\u2705 Tag created in Drizzle, result:", tag);
    return tag;
  }
  async updateTagVerification(tagCode, sumsubApplicantId, status) {
    const updates = {
      sumsubApplicantId,
      verificationStatus: status
    };
    if (status === "approved") {
      updates.verifiedAt = /* @__PURE__ */ new Date();
    }
    const [tag] = await db.update(tags).set(updates).where(eq(tags.tagCode, tagCode)).returning();
    if (!tag) {
      throw new Error("Tag not found");
    }
    return tag;
  }
  async updateTagPin(tagCode, newPin) {
    const [tag] = await db.update(tags).set({ pin: newPin }).where(eq(tags.tagCode, tagCode)).returning();
    if (!tag) {
      throw new Error("Tag not found");
    }
    return tag;
  }
  async createTransaction(insertTransaction) {
    if (supabase) {
      const { data, error } = await supabase.from("transactions").insert(snakeifyRow(insertTransaction)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [transaction] = await db.insert(transactions).values(insertTransaction).returning();
    return transaction;
  }
  async getAllTransactions() {
    if (supabase) {
      const { data, error } = await supabase.from("transactions").select("*").order("ts", { ascending: false });
      if (error) {
        console.error("Supabase getAllTransactions error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(transactions).orderBy(desc(transactions.ts));
  }
  async updateTransactionAmount(id, amount) {
    if (supabase) {
      const { data, error } = await supabase.from("transactions").update({ amount, status: "completed" }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Transaction not found");
      return camelizeRow(data);
    }
    const [transaction] = await db.update(transactions).set({ amount, status: "completed" }).where(eq(transactions.id, id)).returning();
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }
  async updateTransactionStatus(id, status) {
    if (supabase) {
      const { data, error } = await supabase.from("transactions").update({ status }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Transaction not found");
      return camelizeRow(data);
    }
    const [transaction] = await db.update(transactions).set({ status }).where(eq(transactions.id, id)).returning();
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }
  async getMerchantChain(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_chains").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getMerchantChain error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [chain] = await db.select().from(merchantChains).where(eq(merchantChains.id, id));
    return chain || void 0;
  }
  async getAllMerchantChains() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_chains").select("*");
      if (error) {
        console.error("Supabase getAllMerchantChains error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return db.select().from(merchantChains);
  }
  async createMerchantChain(insertChain) {
    if (supabase) {
      const { data, error } = await supabase.from("merchant_chains").insert(snakeifyRow(insertChain)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [chain] = await db.insert(merchantChains).values(insertChain).returning();
    return chain;
  }
  async getMerchantOutlet(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_outlets").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getMerchantOutlet error:", error.message || error);
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [outlet] = await db.select().from(merchantOutlets).where(eq(merchantOutlets.id, id));
    return outlet || void 0;
  }
  async getMerchantOutletByCode(outletCode) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_outlets").select("*").eq("outlet_code", outletCode).maybeSingle();
      if (error) console.error("Supabase getMerchantOutletByCode error:", error.message || error);
      return data ? camelizeRow(data) : void 0;
    }
    const [outlet] = await db.select().from(merchantOutlets).where(eq(merchantOutlets.outletCode, outletCode));
    return outlet || void 0;
  }
  async getMerchantOutletsByChain(chainId) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_outlets").select("*").eq("chain_id", chainId);
      if (error) {
        console.error("Supabase getMerchantOutletsByChain error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(merchantOutlets).where(eq(merchantOutlets.chainId, chainId));
  }
  async getAllMerchantOutlets() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("merchant_outlets").select("*");
      if (error) {
        console.error("Supabase getAllMerchantOutlets error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(merchantOutlets);
  }
  async createMerchantOutlet(insertOutlet) {
    if (supabase) {
      const { data, error } = await supabase.from("merchant_outlets").insert(snakeifyRow(insertOutlet)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [outlet] = await db.insert(merchantOutlets).values(insertOutlet).returning();
    return outlet;
  }
  async getPhilanthropist(id) {
    if (supabase) {
      const { data, error } = await supabase.from("philanthropists").select("*").eq("id", id).maybeSingle();
      if (error) console.error("Supabase getPhilanthropist error:", error.message || error);
      return data ? camelizeRow(data) : void 0;
    }
    const [philanthropist] = await db.select().from(philanthropists).where(eq(philanthropists.id, id));
    return philanthropist || void 0;
  }
  async getPhilanthropistByEmail(email) {
    if (supabase) {
      const { data, error } = await supabase.from("philanthropists").select("*").eq("email", email).maybeSingle();
      if (error) console.error("Supabase getPhilanthropistByEmail error:", error.message || error);
      return data ? camelizeRow(data) : void 0;
    }
    const [philanthropist] = await db.select().from(philanthropists).where(eq(philanthropists.email, email));
    return philanthropist || void 0;
  }
  async getPhilanthropistByUserId(userId) {
    if (supabase) {
      const { data, error } = await supabase.from("philanthropists").select("*").eq("user_id", userId).maybeSingle();
      if (error) console.error("Supabase getPhilanthropistByUserId error:", error.message || error);
      return data ? camelizeRow(data) : void 0;
    }
    const [philanthropist] = await db.select().from(philanthropists).where(eq(philanthropists.userId, userId));
    return philanthropist || void 0;
  }
  async createPhilanthropist(insertPhilanthropist) {
    if (supabase) {
      const { data, error } = await supabase.from("philanthropists").insert(snakeifyRow(insertPhilanthropist)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [philanthropist] = await db.insert(philanthropists).values(insertPhilanthropist).returning();
    return philanthropist;
  }
  async getAllPhilanthropists() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("philanthropists").select("*");
      if (error) {
        console.error("Supabase getAllPhilanthropists error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(philanthropists);
  }
  async createReferral(insertReferral) {
    if (supabase) {
      const { data, error } = await supabase.from("referrals").insert(snakeifyRow(insertReferral)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [referral] = await db.insert(referrals).values(insertReferral).returning();
    return referral;
  }
  async getReferralsByReferrer(referrerCode) {
    if (supabase) {
      const { data, error } = await supabase.from("referrals").select("*").eq("referrer_code", referrerCode);
      if (error) {
        console.error("Supabase getReferralsByReferrer error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(referrals).where(eq(referrals.referrerCode, referrerCode));
  }
  async getReferralsByReferred(referredCode) {
    if (supabase) {
      const { data, error } = await supabase.from("referrals").select("*").eq("referred_code", referredCode);
      if (error) {
        console.error("Supabase getReferralsByReferred error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return await db.select().from(referrals).where(eq(referrals.referredCode, referredCode));
  }
  async createStory(insertStory) {
    if (supabase) {
      const { data, error } = await supabase.from("stories").insert(snakeifyRow(insertStory)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [story] = await db.insert(stories).values(insertStory).returning();
    return story;
  }
  async getStoryByTransaction(transactionId) {
    const [story] = await db.select().from(stories).where(eq(stories.transactionId, transactionId));
    return story || void 0;
  }
  async getAllPublicStories() {
    const toWallet = alias(wallets, "toWallet");
    const results = await db.select({
      // Story fields
      id: stories.id,
      transactionId: stories.transactionId,
      authorType: stories.authorType,
      message: stories.message,
      photoUrl: stories.photoUrl,
      isPublic: stories.isPublic,
      showAmount: stories.showAmount,
      showGiver: stories.showGiver,
      showRecipient: stories.showRecipient,
      sharingPlatforms: stories.sharingPlatforms,
      createdAt: stories.createdAt,
      // Transaction fields
      amount: transactions.amount,
      // Wallet fields
      fromWalletName: wallets.name,
      toWalletName: toWallet.name,
      // Entity names
      philanthropistName: philanthropists.displayName,
      tagName: tags.beneficiaryName,
      outletName: merchantOutlets.name
    }).from(stories).innerJoin(transactions, eq(stories.transactionId, transactions.id)).innerJoin(wallets, eq(transactions.fromWalletId, wallets.id)).innerJoin(toWallet, eq(transactions.toWalletId, toWallet.id)).leftJoin(philanthropists, eq(wallets.id, philanthropists.walletId)).leftJoin(tags, eq(toWallet.id, tags.walletId)).leftJoin(merchantOutlets, eq(toWallet.id, merchantOutlets.walletId)).where(eq(stories.isPublic, 1)).orderBy(desc(stories.createdAt));
    return results.map((row) => ({
      id: row.id,
      transactionId: row.transactionId,
      authorType: row.authorType,
      message: row.message,
      photoUrl: row.photoUrl,
      isPublic: row.isPublic,
      showAmount: row.showAmount,
      showGiver: row.showGiver,
      showRecipient: row.showRecipient,
      sharingPlatforms: row.sharingPlatforms,
      createdAt: row.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      amountZAR: row.showAmount === 1 ? row.amount : null,
      giverName: row.showGiver === 1 ? row.philanthropistName || row.fromWalletName || "Anonymous" : null,
      recipientName: row.showRecipient === 1 ? row.tagName || row.outletName || row.toWalletName || "Recipient" : null
    }));
  }
  async getStoriesByAuthor(authorType) {
    if (supabase) {
      const { data, error } = await supabase.from("stories").select("*").eq("author_type", authorType).order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase getStoriesByAuthor error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return db.select().from(stories).where(eq(stories.authorType, authorType)).orderBy(desc(stories.createdAt));
  }
  async lookupReferralCode(code) {
    if (supabase) {
      const { data: philanthropistData, error: philError } = await supabase.from("philanthropists").select("*").eq("referral_code", code).maybeSingle();
      if (!philError && philanthropistData) {
        const phil = camelizeRow(philanthropistData);
        return { type: "PHILANTHROPIST", id: phil.id, walletId: phil.walletId };
      }
      const { data: tagData, error: tagError } = await supabase.from("tags").select("*").eq("referral_code", code).maybeSingle();
      if (!tagError && tagData) {
        const tag2 = camelizeRow(tagData);
        return { type: "TAG", id: tag2.tagCode, walletId: tag2.walletId };
      }
      const { data: outletData, error: outletError } = await supabase.from("merchant_outlets").select("*").eq("referral_code", code).maybeSingle();
      if (!outletError && outletData) {
        const outlet2 = camelizeRow(outletData);
        return { type: "MERCHANT", id: outlet2.id, walletId: outlet2.walletId };
      }
      const { data: orgData, error: orgError } = await supabase.from("organizations").select("*").eq("referral_code", code).maybeSingle();
      if (!orgError && orgData) {
        const org2 = camelizeRow(orgData);
        return { type: "ORGANIZATION", id: org2.id };
      }
      return null;
    }
    const [philanthropist] = await db.select().from(philanthropists).where(eq(philanthropists.referralCode, code));
    if (philanthropist) {
      return { type: "PHILANTHROPIST", id: philanthropist.id, walletId: philanthropist.walletId };
    }
    const [tag] = await db.select().from(tags).where(eq(tags.referralCode, code));
    if (tag) {
      return { type: "TAG", id: tag.tagCode, walletId: tag.walletId };
    }
    const [outlet] = await db.select().from(merchantOutlets).where(eq(merchantOutlets.referralCode, code));
    if (outlet) {
      return { type: "MERCHANT", id: outlet.id, walletId: outlet.walletId };
    }
    const [org] = await db.select().from(organizations).where(eq(organizations.referralCode, code));
    if (org) {
      return { type: "ORGANIZATION", id: org.id };
    }
    return null;
  }
  async createRecurringDonation(insertDonation) {
    if (supabase) {
      const { data, error } = await supabase.from("recurring_donations").insert(snakeifyRow(insertDonation)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [donation] = await db.insert(recurringDonations).values(insertDonation).returning();
    return donation;
  }
  async getRecurringDonation(id) {
    if (supabase) {
      const { data, error } = await supabase.from("recurring_donations").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getRecurringDonation error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [donation] = await db.select().from(recurringDonations).where(eq(recurringDonations.id, id));
    return donation || void 0;
  }
  async getRecurringDonationsByPhilanthropist(philanthropistId) {
    if (supabase) {
      const { data, error } = await supabase.from("recurring_donations").select("*").eq("philanthropist_id", philanthropistId).order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase getRecurringDonationsByPhilanthropist error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return db.select().from(recurringDonations).where(eq(recurringDonations.philanthropistId, philanthropistId)).orderBy(desc(recurringDonations.createdAt));
  }
  async updateRecurringDonationStatus(id, status) {
    if (supabase) {
      const { data, error } = await supabase.from("recurring_donations").update({ status }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [donation] = await db.update(recurringDonations).set({ status }).where(eq(recurringDonations.id, id)).returning();
    return donation;
  }
  async updateRecurringDonationProcessing(id, nextDate) {
    if (supabase) {
      const { data, error } = await supabase.from("recurring_donations").update({
        last_processed_at: (/* @__PURE__ */ new Date()).toISOString(),
        next_processing_date: nextDate.toISOString()
      }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [donation] = await db.update(recurringDonations).set({
      lastProcessedAt: /* @__PURE__ */ new Date(),
      nextProcessingDate: nextDate
    }).where(eq(recurringDonations.id, id)).returning();
    return donation;
  }
  async getActiveRecurringDonationsDueForProcessing() {
    if (supabase) {
      const now2 = (/* @__PURE__ */ new Date()).toISOString();
      const { data, error } = await supabase.from("recurring_donations").select("*").eq("status", "active").or(`next_processing_date.is.null,next_processing_date.lte.${now2}`);
      if (error) {
        console.error("Supabase getActiveRecurringDonationsDueForProcessing error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    const now = /* @__PURE__ */ new Date();
    return db.select().from(recurringDonations).where(
      sql2`${recurringDonations.status} = 'active' 
        AND (${recurringDonations.nextProcessingDate} IS NULL 
        OR ${recurringDonations.nextProcessingDate} <= ${now})`
    );
  }
  // Disaster Relief Campaigns (Dusty Bin)
  async createDisasterCampaign(insertCampaign) {
    if (supabase) {
      const { data, error } = await supabase.from("disaster_campaigns").insert(snakeifyRow(insertCampaign)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [campaign] = await db.insert(disasterCampaigns).values(insertCampaign).returning();
    return campaign;
  }
  async getDisasterCampaignById(id) {
    if (supabase) {
      const { data, error } = await supabase.from("disaster_campaigns").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getDisasterCampaignById error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [campaign] = await db.select().from(disasterCampaigns).where(eq(disasterCampaigns.id, id));
    return campaign || void 0;
  }
  async getDisasterCampaignsByMonth(monthYear) {
    if (supabase) {
      const { data, error } = await supabase.from("disaster_campaigns").select("*").eq("month_year", monthYear).order("vote_count", { ascending: false });
      if (error) {
        console.error("Supabase getDisasterCampaignsByMonth error:", error.message || error);
        return [];
      }
      return camelizeRows(data);
    }
    return db.select().from(disasterCampaigns).where(eq(disasterCampaigns.monthYear, monthYear)).orderBy(desc(disasterCampaigns.voteCount));
  }
  async createCampaignVote(insertVote) {
    if (supabase) {
      const { data, error } = await supabase.from("campaign_votes").insert(snakeifyRow(insertVote)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    const [vote] = await db.insert(campaignVotes).values(insertVote).returning();
    return vote;
  }
  async hasUserVotedForCampaign(userId, campaignId) {
    if (supabase) {
      const { data, error } = await supabase.from("campaign_votes").select("*").eq("user_id", userId).eq("campaign_id", campaignId).maybeSingle();
      if (error) {
        console.error("Supabase hasUserVotedForCampaign error:", error.message || error);
        return false;
      }
      return !!data;
    }
    const [vote] = await db.select().from(campaignVotes).where(
      sql2`${campaignVotes.userId} = ${userId} AND ${campaignVotes.campaignId} = ${campaignId}`
    );
    return !!vote;
  }
  async incrementCampaignVotes(campaignId) {
    if (supabase) {
      const { data, error } = await supabase.rpc("increment_campaign_votes", { campaign_id: campaignId });
      if (error) {
        console.error("Supabase incrementCampaignVotes error:", error.message || error);
      }
      return;
    }
    await db.update(disasterCampaigns).set({ voteCount: sql2`${disasterCampaigns.voteCount} + 1` }).where(eq(disasterCampaigns.id, campaignId));
  }
  async getTotalDustyBinForMonth(monthYear) {
    if (supabase) {
      const { data, error } = await supabase.rpc("get_total_dusty_bin_for_month", { month_year: monthYear });
      if (error) {
        console.error("Supabase getTotalDustyBinForMonth error:", error.message || error);
        return 0;
      }
      return data?.total || 0;
    }
    const result = await db.select({ total: sql2`SUM(${dustyBinDonations.amountUsdCents})` }).from(dustyBinDonations).where(eq(dustyBinDonations.monthYear, monthYear));
    return result[0]?.total || 0;
  }
  async getOrganizationById(id) {
    if (supabase) {
      const { data, error } = await supabase.from("organizations").select("*").eq("id", id).maybeSingle();
      if (error) {
        console.error("Supabase getOrganizationById error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
    return org || void 0;
  }
  async getUserRoleByUserId(userId, role) {
    if (supabase) {
      const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", userId).eq("role", role).maybeSingle();
      if (error) {
        console.error("Supabase getUserRoleByUserId error:", error.message || error);
        return void 0;
      }
      return data ? camelizeRow(data) : void 0;
    }
    const [userRole] = await db.select().from(userRoles).where(
      sql2`${userRoles.userId} = ${userId} AND ${userRoles.role} = ${role}`
    );
    return userRole || void 0;
  }
  async seedWhatsappDemoData() {
    if (this.whatsappDemoSeeded) return;
    const now = /* @__PURE__ */ new Date();
    const minutesAgo = (minutes) => new Date(now.getTime() - minutes * 6e4);
    const hoursAgo = (hours) => new Date(now.getTime() - hours * 36e5);
    const daysAgo = (days) => new Date(now.getTime() - days * 864e5);
    const contacts = [
      {
        id: crypto.randomUUID(),
        name: "Aisha Okonkwo",
        phone: "+27821234567",
        email: "aisha.o@investcorp.co.za",
        tags: ["donor", "crypto", "regular"],
        notes: "Tech entrepreneur, monthly ETH donor, passionate about education",
        createdAt: daysAgo(45)
      },
      {
        id: crypto.randomUUID(),
        name: "Thabo Nkosi",
        phone: "+27829876543",
        email: "thabo.nkosi@gmail.com",
        tags: ["beneficiary", "freedom-tag"],
        notes: "Freedom Tag recipient, fruit vendor in Johannesburg CBD",
        createdAt: daysAgo(30)
      },
      {
        id: crypto.randomUUID(),
        name: "UNICEF South Africa",
        phone: "+27823456789",
        email: "digital@unicef.org.za",
        tags: ["charity", "verified", "international"],
        notes: "Global organization with smart contract, children and education focus",
        createdAt: daysAgo(120)
      },
      {
        id: crypto.randomUUID(),
        name: "Chen Wei",
        phone: "+27824567890",
        email: "chen.wei@blockventures.com",
        tags: ["donor", "crypto", "whale"],
        notes: "BTC whale investor, disaster relief advocate, Dusty Bin supporter",
        createdAt: daysAgo(15)
      },
      {
        id: crypto.randomUUID(),
        name: "Fatima Al-Rashid",
        phone: "+27825678901",
        email: "fatima@empowerafrica.org",
        tags: ["beneficiary", "active"],
        notes: "Active Freedom Tag user, craft market seller at V&A Waterfront",
        createdAt: daysAgo(60)
      },
      {
        id: crypto.randomUUID(),
        name: "Red Cross Red Crescent",
        phone: "+27826789012",
        email: "blockchain@redcross.org.za",
        tags: ["charity", "verified", "disaster-relief"],
        notes: "International humanitarian org with ERC-20F vault, disaster response",
        createdAt: daysAgo(90)
      },
      {
        id: crypto.randomUUID(),
        name: "Isabella Rodriguez",
        phone: "+27827890123",
        email: "isabella.r@gmail.com",
        tags: ["donor", "recurring"],
        notes: "Corporate donor from Stellenbosch, monthly fiat contributor",
        createdAt: daysAgo(25)
      },
      {
        id: crypto.randomUUID(),
        name: "Doctors Without Borders",
        phone: "+27828901234",
        email: "crypto@msf.org.za",
        tags: ["charity", "verified", "medical"],
        notes: "Medical humanitarian organization, blockchain verified since 2023",
        createdAt: daysAgo(150)
      }
    ];
    contacts.forEach((contact) => {
      this.whatsappContacts.set(contact.id, contact);
    });
    const aishaId = contacts[0].id;
    const thaboId = contacts[1].id;
    const unicefId = contacts[2].id;
    const chenId = contacts[3].id;
    const fatimaId = contacts[4].id;
    const redCrossId = contacts[5].id;
    const isabellaId = contacts[6].id;
    const msfId = contacts[7].id;
    const conv1Id = crypto.randomUUID();
    this.whatsappConversations.set(conv1Id, {
      id: conv1Id,
      contactId: aishaId,
      status: "active",
      lastMessageAt: minutesAgo(15),
      createdAt: daysAgo(45)
    });
    const aishaMessages = [
      { id: crypto.randomUUID(), conversationId: conv1Id, sender: "contact", content: "Hi, I want to set up monthly ETH donations for education programs. Can I target specific schools?", sentAt: hoursAgo(2) },
      { id: crypto.randomUUID(), conversationId: conv1Id, sender: "agent", content: "Absolutely! Thanks for supporting education, Aisha. You can set up recurring crypto donations with USD-pegged amounts that convert to ETH monthly. You can donate to verified organizations like UNICEF or specific Freedom Tags for individual beneficiaries.", sentAt: new Date(hoursAgo(2).getTime() + 12e4) },
      { id: crypto.randomUUID(), conversationId: conv1Id, sender: "contact", content: "Perfect! I also have some crypto dust left over from trading. What is this Dusty Bin I heard about?", sentAt: new Date(hoursAgo(1).getTime() + 9e5) },
      { id: crypto.randomUUID(), conversationId: conv1Id, sender: "agent", content: "The Dusty Bin is brilliant for that! Donate your leftover crypto to a community fund. Each month, users vote on which disaster relief campaign gets the pooled funds. Only smart contract-verified organizations can create campaigns, so everything is transparent on-chain.", sentAt: new Date(hoursAgo(1).getTime() + 96e4) },
      { id: crypto.randomUUID(), conversationId: conv1Id, sender: "contact", content: "Love it! Setting up R5000/month ETH donations now. Can I get tax receipts?", sentAt: minutesAgo(15) }
    ];
    aishaMessages.forEach((msg) => {
      this.whatsappMessages.set(msg.id, msg);
    });
    const conv2Id = crypto.randomUUID();
    this.whatsappConversations.set(conv2Id, {
      id: conv2Id,
      contactId: thaboId,
      status: "active",
      lastMessageAt: minutesAgo(45),
      createdAt: daysAgo(30)
    });
    const thaboMessages = [
      { id: crypto.randomUUID(), conversationId: conv2Id, sender: "contact", content: "Hello, a charity worker gave me a Freedom Tag. How does it work?", sentAt: hoursAgo(4) },
      { id: crypto.randomUUID(), conversationId: conv2Id, sender: "agent", content: "Welcome Thabo! Your Freedom Tag lets you receive donations instantly via QR code. Set it up in 30 seconds - do you have your tag code?", sentAt: new Date(hoursAgo(4).getTime() + 9e4) },
      { id: crypto.randomUUID(), conversationId: conv2Id, sender: "contact", content: "Yes: FT-2025-JHB-8821", sentAt: new Date(hoursAgo(4).getTime() + 3e5) },
      { id: crypto.randomUUID(), conversationId: conv2Id, sender: "agent", content: "Perfect! Tag verified. Donors can now scan your QR code to give - they stay anonymous, but the blockchain shows where funds go. You control your tag with a PIN. Check your balance anytime at /donor", sentAt: new Date(hoursAgo(3).getTime() + 48e4) },
      { id: crypto.randomUUID(), conversationId: conv2Id, sender: "contact", content: "Just received my first donation - R50! This is amazing, thank you!", sentAt: minutesAgo(45) }
    ];
    thaboMessages.forEach((msg) => {
      this.whatsappMessages.set(msg.id, msg);
    });
    const conv3Id = crypto.randomUUID();
    this.whatsappConversations.set(conv3Id, {
      id: conv3Id,
      contactId: unicefId,
      status: "active",
      lastMessageAt: hoursAgo(8),
      createdAt: daysAgo(120)
    });
    const unicefMessages = [
      { id: crypto.randomUUID(), conversationId: conv3Id, sender: "contact", content: "UNICEF is interested in blockchain-verified donations for our South African education programs. What is required?", sentAt: daysAgo(5) },
      { id: crypto.randomUUID(), conversationId: conv3Id, sender: "agent", content: "Excellent! Smart contract verification provides ultimate transparency. Requirements: 1) Sumsub KYC, 2) Fireblocks ERC-20F vault deployment, 3) Organization registration. Your Etherscan contract link will be public for donor verification.", sentAt: new Date(daysAgo(5).getTime() + 6e5) },
      { id: crypto.randomUUID(), conversationId: conv3Id, sender: "contact", content: "We already have Fireblocks infrastructure. Can we integrate existing vaults?", sentAt: daysAgo(4) },
      { id: crypto.randomUUID(), conversationId: conv3Id, sender: "agent", content: "Yes! Existing Fireblocks vaults can be integrated. You will also qualify for Dusty Bin disaster campaigns. With smart contracts, donors trust you because the world can verify fund movements on-chain.", sentAt: new Date(daysAgo(4).getTime() + 3e5) },
      { id: crypto.randomUUID(), conversationId: conv3Id, sender: "contact", content: "Perfect. Our compliance team will send documents tomorrow. Expected timeline?", sentAt: hoursAgo(8) }
    ];
    unicefMessages.forEach((msg) => {
      this.whatsappMessages.set(msg.id, msg);
    });
    const conv4Id = crypto.randomUUID();
    this.whatsappConversations.set(conv4Id, {
      id: conv4Id,
      contactId: chenId,
      status: "active",
      lastMessageAt: minutesAgo(30),
      createdAt: daysAgo(15)
    });
    const chenMessages = [
      { id: crypto.randomUUID(), conversationId: conv4Id, sender: "contact", content: "I hold significant BTC and want to support disaster relief. Tell me about Dusty Bin voting.", sentAt: hoursAgo(3) },
      { id: crypto.randomUUID(), conversationId: conv4Id, sender: "agent", content: "Dusty Bin is perfect for crypto advocates! Donate any crypto (including dust amounts) to a monthly pool. Community votes decide which verified disaster campaign wins. Only smart contract orgs can participate - fully transparent.", sentAt: new Date(hoursAgo(3).getTime() + 18e4) },
      { id: crypto.randomUUID(), conversationId: conv4Id, sender: "contact", content: "How is voting integrity maintained? Can whales dominate?", sentAt: hoursAgo(2) },
      { id: crypto.randomUUID(), conversationId: conv4Id, sender: "agent", content: "One vote per user per campaign - prevents whale dominance. Real-time vote counts visible. All campaigns show Etherscan links and blockchain verification badges. Donors stay anonymous but fund distribution is 100% transparent on-chain.", sentAt: new Date(hoursAgo(2).getTime() + 24e4) },
      { id: crypto.randomUUID(), conversationId: conv4Id, sender: "contact", content: "Brilliant design! Just donated 0.05 BTC to this month's pool. Which campaign is winning?", sentAt: minutesAgo(30) }
    ];
    chenMessages.forEach((msg) => {
      this.whatsappMessages.set(msg.id, msg);
    });
    const conv5Id = crypto.randomUUID();
    this.whatsappConversations.set(conv5Id, {
      id: conv5Id,
      contactId: redCrossId,
      status: "active",
      lastMessageAt: hoursAgo(2),
      createdAt: daysAgo(90)
    });
    const redCrossMessages = [
      { id: crypto.randomUUID(), conversationId: conv5Id, sender: "contact", content: "Red Cross wants to create a Dusty Bin campaign for flood relief in KZN. How do we start?", sentAt: hoursAgo(6) },
      { id: crypto.randomUUID(), conversationId: conv5Id, sender: "agent", content: "Your smart contract is already verified! You can create disaster campaigns at /dusty-bin. Community votes monthly - winning campaign gets pooled crypto donations. Perfect for urgent relief efforts.", sentAt: new Date(hoursAgo(6).getTime() + 3e5) },
      { id: crypto.randomUUID(), conversationId: conv5Id, sender: "contact", content: "Excellent. Our ERC-20F vault is live at 0x742d...A3f9. Campaign launching today.", sentAt: hoursAgo(2) }
    ];
    redCrossMessages.forEach((msg) => {
      this.whatsappMessages.set(msg.id, msg);
    });
    const tickets = [
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now()}-A1B2`,
        contactId: aishaId,
        subject: "ETH recurring donation - tax receipt setup",
        description: "Need to configure automatic tax receipts for R5000/month ETH donations to education programs",
        status: "in_progress",
        priority: "high",
        assignedTo: "Compliance Team",
        createdAt: hoursAgo(6),
        updatedAt: hoursAgo(2)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 5e4}-B3C4`,
        contactId: thaboId,
        subject: "QR code printed cards request",
        description: "Freedom Tag working great! Can I get physical QR code cards to display at my fruit stand?",
        status: "open",
        priority: "medium",
        assignedTo: "Operations Team",
        createdAt: hoursAgo(4),
        updatedAt: hoursAgo(4)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 1e5}-D5E6`,
        contactId: unicefId,
        subject: "Fireblocks vault integration timeline",
        description: "UNICEF compliance docs submitted. What is expected integration timeline for ERC-20F vault?",
        status: "in_progress",
        priority: "high",
        assignedTo: "Blockchain Team",
        createdAt: hoursAgo(10),
        updatedAt: hoursAgo(8)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 15e4}-F7G8`,
        contactId: chenId,
        subject: "BTC donation confirmation on Etherscan",
        description: "Just donated 0.05 BTC to Dusty Bin. Where can I verify the transaction on blockchain?",
        status: "resolved",
        priority: "low",
        assignedTo: "Support Team",
        createdAt: hoursAgo(2),
        updatedAt: minutesAgo(90),
        resolvedAt: minutesAgo(90)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 2e5}-H9I0`,
        contactId: fatimaId,
        subject: "Multiple donations received - balance update",
        description: "Received 3 donations today (R120 total) but balance shows R100. Missing R20?",
        status: "open",
        priority: "high",
        assignedTo: "Finance Team",
        createdAt: hoursAgo(3),
        updatedAt: hoursAgo(3)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 25e4}-J1K2`,
        contactId: redCrossId,
        subject: "Disaster campaign - KZN flood relief setup",
        description: "Red Cross launching urgent flood relief campaign. Need Dusty Bin campaign creation assistance.",
        status: "resolved",
        priority: "high",
        assignedTo: "Campaign Team",
        createdAt: hoursAgo(8),
        updatedAt: hoursAgo(2),
        resolvedAt: hoursAgo(2)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 3e5}-L3M4`,
        contactId: isabellaId,
        subject: "Corporate matching program integration",
        description: "Can our company match employee donations? Need API documentation for corporate integration.",
        status: "open",
        priority: "medium",
        assignedTo: "Business Development",
        createdAt: hoursAgo(12),
        updatedAt: hoursAgo(12)
      },
      {
        id: crypto.randomUUID(),
        ticketNumber: `TKT-${Date.now() - 35e4}-N5O6`,
        contactId: msfId,
        subject: "Smart contract audit report request",
        description: "Doctors Without Borders needs audit report for our deployed ERC-20F vault for compliance",
        status: "resolved",
        priority: "medium",
        assignedTo: "Compliance Team",
        createdAt: daysAgo(2),
        updatedAt: daysAgo(1),
        resolvedAt: daysAgo(1)
      }
    ];
    tickets.forEach((ticket) => {
      this.whatsappTickets.set(ticket.id, ticket);
    });
    this.whatsappDemoSeeded = true;
  }
  async createWhatsappContact(contact) {
    const id = crypto.randomUUID();
    const newContact = { id, ...contact, createdAt: /* @__PURE__ */ new Date() };
    this.whatsappContacts.set(id, newContact);
    return newContact;
  }
  async getWhatsappContact(id) {
    return this.whatsappContacts.get(id);
  }
  async getAllWhatsappContacts() {
    await this.seedWhatsappDemoData();
    return Array.from(this.whatsappContacts.values());
  }
  async updateWhatsappContact(id, updates) {
    const contact = this.whatsappContacts.get(id);
    if (!contact) throw new Error("Contact not found");
    const updated = { ...contact, ...updates };
    this.whatsappContacts.set(id, updated);
    return updated;
  }
  async createWhatsappConversation(conversation) {
    const id = crypto.randomUUID();
    const newConvo = { id, ...conversation, createdAt: /* @__PURE__ */ new Date() };
    this.whatsappConversations.set(id, newConvo);
    return newConvo;
  }
  async getWhatsappConversation(id) {
    return this.whatsappConversations.get(id);
  }
  async getWhatsappConversationsByContact(contactId) {
    return Array.from(this.whatsappConversations.values()).filter((c) => c.contactId === contactId);
  }
  async getAllWhatsappConversations() {
    await this.seedWhatsappDemoData();
    return Array.from(this.whatsappConversations.values());
  }
  async updateWhatsappConversation(id, updates) {
    const convo = this.whatsappConversations.get(id);
    if (!convo) throw new Error("Conversation not found");
    const updated = { ...convo, ...updates };
    this.whatsappConversations.set(id, updated);
    return updated;
  }
  async createWhatsappMessage(message) {
    const id = crypto.randomUUID();
    const newMessage = { id, ...message, sentAt: /* @__PURE__ */ new Date() };
    this.whatsappMessages.set(id, newMessage);
    return newMessage;
  }
  async getWhatsappMessage(id) {
    return this.whatsappMessages.get(id);
  }
  async getWhatsappMessagesByConversation(conversationId) {
    return Array.from(this.whatsappMessages.values()).filter((m) => m.conversationId === conversationId).sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
  }
  async createWhatsappTicket(ticket) {
    const id = crypto.randomUUID();
    const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const newTicket = { id, ticketNumber, ...ticket, createdAt: /* @__PURE__ */ new Date() };
    this.whatsappTickets.set(id, newTicket);
    return newTicket;
  }
  async getWhatsappTicket(id) {
    return this.whatsappTickets.get(id);
  }
  async getAllWhatsappTickets() {
    await this.seedWhatsappDemoData();
    return Array.from(this.whatsappTickets.values());
  }
  async updateWhatsappTicket(id, updates) {
    const ticket = this.whatsappTickets.get(id);
    if (!ticket) throw new Error("Ticket not found");
    const updated = { ...ticket, ...updates };
    if (updates.status === "resolved" || updates.status === "closed") {
      updated.resolvedAt = /* @__PURE__ */ new Date();
    }
    this.whatsappTickets.set(id, updated);
    return updated;
  }
  // Password Reset operations (Biometric KYC)
  async createPasswordResetToken(token) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("password_reset_tokens").insert(snakeifyRow(token)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async getPasswordResetToken(token) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("password_reset_tokens").select("*").eq("token", token).maybeSingle();
      if (error) throw error;
      return data ? camelizeRow(data) : void 0;
    }
    throw new Error("Supabase client not initialized");
  }
  async getPasswordResetTokenById(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("password_reset_tokens").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data ? camelizeRow(data) : void 0;
    }
    throw new Error("Supabase client not initialized");
  }
  async updatePasswordResetVerification(id, status, sumsubApplicantId) {
    await this.ensureSeeded();
    if (supabase) {
      const updates = { verification_status: status };
      if (status === "verified") {
        updates.verified_at = (/* @__PURE__ */ new Date()).toISOString();
      }
      if (sumsubApplicantId) {
        updates.sumsub_applicant_id = sumsubApplicantId;
      }
      const { data, error } = await supabase.from("password_reset_tokens").update(updates).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async markPasswordResetTokenUsed(id) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("password_reset_tokens").update({ used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async deleteExpiredPasswordResetTokens() {
    await this.ensureSeeded();
    if (supabase) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const { error } = await supabase.from("password_reset_tokens").delete().lt("expires_at", now);
      if (error) throw error;
      return;
    }
    throw new Error("Supabase client not initialized");
  }
  async updateUserPassword(userId, newPasswordHash, userType) {
    await this.ensureSeeded();
    if (supabase) {
      if (userType === "philanthropist") {
        const { data, error } = await supabase.from("philanthropists").update({ password_hash: newPasswordHash }).eq("id", userId).select().maybeSingle();
        if (error) throw error;
        return camelizeRow(data);
      } else {
        const { data, error } = await supabase.from("users").update({ password_hash: newPasswordHash }).eq("id", userId).select().maybeSingle();
        if (error) throw error;
        return camelizeRow(data);
      }
    }
    throw new Error("Supabase client not initialized");
  }
  // Learn System operations
  async getLearnEntry(route) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("learn_entries").select("*").eq("route", route).maybeSingle();
      if (error) throw error;
      return data ? camelizeRow(data) : void 0;
    }
    throw new Error("Supabase client not initialized");
  }
  async getAllLearnEntries() {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("learn_entries").select("*").order("last_updated_at", { ascending: false });
      if (error) throw error;
      return camelizeRows(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async getPublishedLearnEntry(route) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("learn_entries").select("*").eq("route", route).eq("status", "published").maybeSingle();
      if (error) throw error;
      return data ? camelizeRow(data) : void 0;
    }
    throw new Error("Supabase client not initialized");
  }
  async createLearnEntry(entry) {
    await this.ensureSeeded();
    if (supabase) {
      const { data, error } = await supabase.from("learn_entries").insert(snakeifyRow(entry)).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async updateLearnEntry(id, entry) {
    await this.ensureSeeded();
    if (supabase) {
      const updates = { ...snakeifyRow(entry), last_updated_at: (/* @__PURE__ */ new Date()).toISOString() };
      const { data, error } = await supabase.from("learn_entries").update(updates).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
  async publishLearnEntry(id, publishedBy) {
    await this.ensureSeeded();
    if (supabase) {
      const updates = {
        status: "published",
        published_at: (/* @__PURE__ */ new Date()).toISOString(),
        published_by: publishedBy,
        last_updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await supabase.from("learn_entries").update(updates).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return camelizeRow(data);
    }
    throw new Error("Supabase client not initialized");
  }
};
var storage = new DatabaseStorage();

// routes/auth.ts
import express from "express";

// blockkoin.ts
var BlockkoinClient = class {
  constructor() {
    const apiKey = process.env.BLOCKKOIN_API_KEY;
    const apiSecret = process.env.BLOCKKOIN_API_SECRET;
    this.demoMode = !apiKey || !apiSecret;
    this.config = {
      apiKey: apiKey || "demo_key",
      apiSecret: apiSecret || "demo_secret",
      baseUrl: "https://api.blockkoin.com/v1"
      // Update with actual Blockkoin API URL
    };
    if (this.demoMode) {
      console.log("[Blockkoin DEMO API] Running in DEMO mode - using simulated API calls for development");
    }
  }
  /**
   * Create a Blockkoin account automatically when user signs up for Freedom Tag
   */
  async createAccount(email, fullName, country) {
    if (this.demoMode) {
      return {
        id: `bk_${Math.random().toString(36).substring(7)}`,
        email,
        kycStatus: "none",
        wallets: [
          { currency: "USDT", address: `usdt_${Math.random().toString(36).substring(7)}`, balance: 0 },
          { currency: "BTC", address: `btc_${Math.random().toString(36).substring(7)}`, balance: 0 },
          { currency: "ETH", address: `eth_${Math.random().toString(36).substring(7)}`, balance: 0 }
        ]
      };
    }
    const response = await fetch(`${this.config.baseUrl}/accounts/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "X-API-Secret": this.config.apiSecret
      },
      body: JSON.stringify({
        email,
        fullName,
        country,
        source: "freedom_tag"
      })
    });
    if (!response.ok) {
      throw new Error(`Blockkoin account creation failed: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Check if user already has a Blockkoin account and link it
   */
  async findExistingAccount(email) {
    if (this.demoMode) {
      return null;
    }
    const response = await fetch(`${this.config.baseUrl}/accounts/find?email=${encodeURIComponent(email)}`, {
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "X-API-Secret": this.config.apiSecret
      }
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Blockkoin account lookup failed: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Get real-time exchange rates for all supported cryptocurrencies
   */
  async getExchangeRates(targetCurrency = "ZAR") {
    if (this.demoMode) {
      if (targetCurrency === "USD") {
        return [
          { from: "USDT", to: "USD", rate: 100, timestamp: Date.now() },
          // 1 USDT = $1.00
          { from: "BTC", to: "USD", rate: 65e5, timestamp: Date.now() },
          // 1 BTC = $65,000
          { from: "ETH", to: "USD", rate: 3e5, timestamp: Date.now() },
          // 1 ETH = $3,000
          { from: "USDC", to: "USD", rate: 100, timestamp: Date.now() },
          // 1 USDC = $1.00
          { from: "DAI", to: "USD", rate: 100, timestamp: Date.now() }
          // 1 DAI = $1.00
        ];
      }
      return [
        { from: "USDT", to: targetCurrency, rate: 1850, timestamp: Date.now() },
        // 1 USDT = R18.50
        { from: "BTC", to: targetCurrency, rate: 12e7, timestamp: Date.now() },
        // 1 BTC = R1,200,000
        { from: "ETH", to: targetCurrency, rate: 55e5, timestamp: Date.now() },
        // 1 ETH = R55,000
        { from: "USDC", to: targetCurrency, rate: 1850, timestamp: Date.now() },
        { from: "DAI", to: targetCurrency, rate: 1850, timestamp: Date.now() }
      ];
    }
    const response = await fetch(`${this.config.baseUrl}/exchange/rates?target=${targetCurrency}`, {
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Create a crypto payment with optional auto-conversion
   */
  async createPayment(params) {
    if (this.demoMode) {
      return {
        id: `pay_${Math.random().toString(36).substring(7)}`,
        amount: params.amount,
        currency: params.currency,
        targetCurrency: params.targetCurrency,
        address: params.toAddress,
        status: "pending",
        autoConvert: params.autoConvert
      };
    }
    const response = await fetch(`${this.config.baseUrl}/payments/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "X-API-Secret": this.config.apiSecret
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      throw new Error(`Payment creation failed: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Initiate KYC verification for transactions over $50
   */
  async initiateKYC(accountId, userId) {
    if (this.demoMode) {
      return {
        kycUrl: `/demo-verification?accountId=${accountId}`,
        status: "pending"
      };
    }
    const response = await fetch(`${this.config.baseUrl}/kyc/initiate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "X-API-Secret": this.config.apiSecret
      },
      body: JSON.stringify({
        accountId,
        userId,
        source: "freedom_tag"
      })
    });
    if (!response.ok) {
      throw new Error(`KYC initiation failed: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Check KYC status for an account
   */
  async checkKYCStatus(accountId) {
    if (this.demoMode) {
      return "none";
    }
    const response = await fetch(`${this.config.baseUrl}/kyc/status/${accountId}`, {
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "X-API-Secret": this.config.apiSecret
      }
    });
    if (!response.ok) {
      throw new Error(`KYC status check failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data.status;
  }
  /**
   * Get supported cryptocurrencies from Blockkoin
   */
  async getSupportedCurrencies() {
    if (this.demoMode) {
      return ["USDT", "BTC", "ETH", "USDC", "DAI", "BNB", "XRP", "ADA", "SOL", "DOGE"];
    }
    const response = await fetch(`${this.config.baseUrl}/currencies`, {
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch currencies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.currencies;
  }
  /**
   * Check if transaction requires KYC based on $50 threshold
   */
  requiresKYC(amountUSD, kycStatus) {
    return amountUSD > 50 && kycStatus !== "verified";
  }
  /**
   * Buy cryptocurrency (convert fiat to crypto)
   */
  async buyCrypto(params) {
    if (this.demoMode) {
      const rates = await this.getExchangeRates(params.fiatCurrency);
      const rate = rates.find((r) => r.from === params.currency)?.rate || 1850;
      const cryptoAmount = Math.floor(params.amount / rate * 1e8) / 1e8;
      const fee = Math.floor(params.amount * 0.01);
      return {
        transactionId: `buy_${Math.random().toString(36).substring(7)}`,
        cryptoAmount,
        fee,
        blockchainHash: `0x${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`
      };
    }
    const response = await fetch(`${this.config.baseUrl}/exchange/buy`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "X-API-Secret": this.config.apiSecret
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      throw new Error(`Crypto buy failed: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Sell cryptocurrency (convert crypto to fiat)
   */
  async sellCrypto(params) {
    if (this.demoMode) {
      const rates = await this.getExchangeRates(params.fiatCurrency);
      const rate = rates.find((r) => r.from === params.currency)?.rate || 1850;
      const grossFiatAmount = Math.floor(params.cryptoAmount * rate);
      const fee = Math.floor(grossFiatAmount * 0.01);
      return {
        transactionId: `sell_${Math.random().toString(36).substring(7)}`,
        fiatAmount: grossFiatAmount,
        // Return GROSS amount (endpoint will calculate net)
        fee,
        blockchainHash: `0x${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`
      };
    }
    const response = await fetch(`${this.config.baseUrl}/exchange/sell`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "X-API-Secret": this.config.apiSecret
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      throw new Error(`Crypto sell failed: ${response.statusText}`);
    }
    return await response.json();
  }
};
var blockkoinClient = new BlockkoinClient();

// routes/auth.ts
init_db();
import bcrypt from "bcrypt";
var router = express.Router();
router.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, fullName, phone, country, role } = req.body || {};
    console.log("test=====>", { email, password, fullName, phone, country, role });
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({ error: "email, password, fullName, and role are required" });
    }
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const bcrypt3 = await import("bcrypt");
    const passwordHash = await bcrypt3.hash(password, 10);
    let blockkoinAccountId = null;
    let blockkoinKycStatus = "none";
    try {
      const existingBlockkoinAccount = await blockkoinClient.findExistingAccount(email);
      if (existingBlockkoinAccount) {
        blockkoinAccountId = existingBlockkoinAccount.id;
        blockkoinKycStatus = existingBlockkoinAccount.kycStatus;
        console.log(`[Blockkoin] Linked existing account for ${email}`);
      } else {
        const newBlockkoinAccount = await blockkoinClient.createAccount(email, fullName, country);
        blockkoinAccountId = newBlockkoinAccount.id;
        blockkoinKycStatus = newBlockkoinAccount.kycStatus;
        console.log(`[Blockkoin] Created new account for ${email}: ${blockkoinAccountId}`);
      }
    } catch (error) {
      console.error("[Blockkoin] Account creation/linking failed:", error);
    }
    const user = await storage.createUser({
      email,
      passwordHash,
      fullName,
      phone: phone || null,
      country: country || null,
      blockkoinAccountId,
      blockkoinKycStatus,
      preferredCurrency: country === "ZA" ? "ZAR" : "USD"
    });
    await storage.createUserRole({
      userId: user.id,
      role: role.toUpperCase(),
      entityId: null,
      // Will be set when entity is created
      isActive: 1
    });
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.userAuth = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName
      };
      req.session.save(async (err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        const userRoles2 = await storage.getUserRoles(user.id);
        res.json({
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName
          },
          roles: userRoles2.map((r) => r.role)
        });
      });
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }
    const user = await storage.getUserByEmail(email);
    if (!user) {
      console.warn("[Auth/Login] No user found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const bcrypt3 = await import("bcrypt");
    const isValid = await bcrypt3.compare(password, user.passwordHash);
    if (!isValid) {
      console.warn("[Auth/Login] Password mismatch for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const roles = await storage.getUserRoles(user.id);
    await storage.updateUserLastLogin(user.id);
    let organizationInfo = null;
    const org = await storage.getOrganizationByEmail(user.email);
    if (org) {
      const tags2 = await storage.getTagsByOrganization(org.id);
      const primaryTag = tags2.find((t) => t.beneficiaryType === "charity" || t.beneficiaryType === "organization");
      organizationInfo = {
        organizationId: org.id,
        organizationName: org.name,
        tagCode: primaryTag?.tagCode || null
      };
      console.log("[Auth/Login] Organization found for email:", email, "orgId:", org.id, "tagCode:", organizationInfo.tagCode);
    } else {
      console.log("[Auth/Login] No organization linked for email:", email);
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.userAuth = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            country: user.country,
            avatarUrl: user.avatarUrl
          },
          roles: roles.map((r) => r.role),
          organization: organizationInfo
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/auth/me", async (req, res) => {
  try {
    if (!req.session.userAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    console.log("\u{1F4CB} Session userAuth:", req.session.userAuth);
    const user = await storage.getUser(req.session.userAuth.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("\u{1F464} User from DB:", { id: user.id, email: user.email, fullName: user.fullName });
    const roles = await storage.getUserRoles(user.id);
    let beneficiaryTag = null;
    if (roles.some((r) => r.role === "BENEFICIARY")) {
      console.log("\u{1F50D} Looking for tag for userId:", user.id);
      const tag = await storage.getTagByUserId(user.id);
      console.log("\u{1F3F7}\uFE0F Tag found:", tag);
      if (tag) {
        const wallet = await storage.getWallet(tag.walletId);
        beneficiaryTag = {
          tagCode: tag.tagCode,
          beneficiaryName: tag.beneficiaryName,
          balanceZAR: wallet ? wallet.balanceZar : 0
        };
      }
    }
    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        country: user.country,
        avatarUrl: user.avatarUrl,
        blockkoinAccountId: user.blockkoinAccountId,
        blockkoinKycStatus: user.blockkoinKycStatus
      },
      roles: roles.map((r) => r.role),
      beneficiaryTag
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ success: true });
  });
});
router.post("/auth/change-password", async (req, res) => {
  try {
    if (!req.session.userAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }
    const user = await storage.getUser(req.session.userAuth.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await storage.updateUserPassword(user.id, newPasswordHash);
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    let user = await storage.getUserByEmail(email);
    let userType = "user";
    if (!user) {
      const philanthropist = await storage.getPhilanthropistByEmail(email);
      if (philanthropist) {
        user = philanthropist;
        userType = "philanthropist";
      }
    }
    if (!user) {
      return res.json({
        message: "If this email is registered, you will receive password reset instructions",
        requiresBiometric: true
      });
    }
    const crypto4 = await import("crypto");
    const token = crypto4.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1e3);
    const sumsubClient2 = req.app.get("sumsubClient");
    if (!sumsubClient2) {
      return res.status(500).json({ error: "Verification service not available" });
    }
    const fullName = user.fullName || user.displayName || "User";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "Account";
    const applicant = await sumsubClient2.createApplicant({
      externalUserId: `pwd-reset-${user.id}-${Date.now()}`,
      firstName,
      lastName,
      email: user.email,
      phone: user.phone || ""
    });
    const sumsubToken = await sumsubClient2.generateAccessToken(
      applicant.id,
      applicant.externalUserId
    );
    await storage.createPasswordResetToken({
      userId: user.id,
      userType,
      email: user.email,
      token,
      sumsubApplicantId: applicant.id,
      sumsubAccessToken: sumsubToken.token,
      verificationStatus: "pending",
      expiresAt
    });
    const verificationUrl = sumsubClient2.getSdkUrl(applicant.id, sumsubToken.token);
    res.json({
      message: "Biometric verification required for password reset",
      requiresBiometric: true,
      resetToken: token,
      verificationUrl,
      sumsubToken: sumsubToken.token,
      sumsubApplicantId: applicant.id
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to initiate password reset" });
  }
});
router.get("/auth/reset-token/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const resetToken = await storage.getPasswordResetToken(token);
    if (!resetToken) {
      return res.status(404).json({ error: "Invalid or expired reset token" });
    }
    if (resetToken.usedAt) {
      return res.status(400).json({ error: "Reset token already used" });
    }
    if (/* @__PURE__ */ new Date() > new Date(resetToken.expiresAt)) {
      return res.status(400).json({ error: "Reset token expired" });
    }
    res.json({
      valid: true,
      email: resetToken.email,
      verificationStatus: resetToken.verificationStatus,
      sumsubApplicantId: resetToken.sumsubApplicantId
    });
  } catch (error) {
    console.error("Reset token check error:", error);
    res.status(500).json({ error: "Failed to validate reset token" });
  }
});
router.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    const resetToken = await storage.getPasswordResetToken(token);
    if (!resetToken) {
      return res.status(404).json({ error: "Invalid or expired reset token" });
    }
    if (resetToken.usedAt) {
      return res.status(400).json({ error: "Reset token already used" });
    }
    if (/* @__PURE__ */ new Date() > new Date(resetToken.expiresAt)) {
      return res.status(400).json({ error: "Reset token expired" });
    }
    if (resetToken.verificationStatus !== "verified") {
      return res.status(403).json({
        error: "Biometric verification required",
        verificationStatus: resetToken.verificationStatus,
        message: "Complete biometric verification to reset your password"
      });
    }
    const bcrypt3 = await import("bcrypt");
    const passwordHash = await bcrypt3.hash(newPassword, 10);
    await storage.updateUserPassword(resetToken.userId, passwordHash, resetToken.userType);
    await storage.markPasswordResetTokenUsed(resetToken.id);
    res.json({
      success: true,
      message: "Password reset successful. You can now login with your new password."
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});
router.post("/auth/password-reset-verification-webhook", async (req, res) => {
  try {
    const { applicantId, reviewStatus, reviewResult } = req.body || {};
    console.log("[Password Reset] Sumsub verification webhook:", { applicantId, reviewStatus, reviewResult });
    if (!applicantId) {
      return res.status(400).json({ error: "Applicant ID required" });
    }
    if (!supabase) {
      console.error("[Password Reset] Supabase client is not initialized");
      return res.status(500).json({ error: "Database client not available" });
    }
    const { data: allTokens, error } = await supabase.from("password_reset_tokens").select("*").eq("sumsub_applicant_id", applicantId);
    if (error) {
      console.error("[Password Reset] Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }
    const resetToken = allTokens && allTokens[0];
    if (!resetToken) {
      console.log("[Password Reset] No reset token found for applicant:", applicantId);
      return res.status(404).json({ error: "Reset token not found" });
    }
    if (reviewStatus === "completed" && reviewResult?.reviewAnswer === "GREEN") {
      await storage.updatePasswordResetVerification(resetToken.id, "verified", applicantId);
      console.log("[Password Reset] Verification successful for:", resetToken.email);
    } else if (reviewStatus === "completed" && reviewResult?.reviewAnswer === "RED") {
      await storage.updatePasswordResetVerification(resetToken.id, "rejected", applicantId);
      console.log("[Password Reset] Verification rejected for:", resetToken.email);
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Password reset verification webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
var auth_default = router;

// routes/merchant.ts
import express2 from "express";
var router2 = express2.Router();
router2.post("/merchant/redeem", async (req, res) => {
  try {
    const { merchantOutletId, tagCode, amountZAR } = req.body || {};
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "unknown tag" });
    }
    const outlet = await storage.getMerchantOutlet(String(merchantOutletId));
    if (!outlet) {
      return res.status(404).json({ error: "outlet not found" });
    }
    const tagWallet = await storage.getWallet(tag.walletId);
    const merchantWallet = await storage.getWallet(outlet.walletId);
    if (!tagWallet || !merchantWallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    const amountInCents = Number(amountZAR);
    if (tagWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "insufficient tag balance" });
    }
    await storage.updateWalletBalance(tagWallet.id, tagWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(merchantWallet.id, merchantWallet.balanceZAR + amountInCents);
    await storage.createTransaction({
      kind: "REDEMPTION",
      fromWalletId: tagWallet.id,
      toWalletId: merchantWallet.id,
      amount: amountInCents,
      merchantOutletId: outlet.id
    });
    res.json({
      ok: true,
      merchantBalanceZAR: merchantWallet.balanceZAR + amountInCents
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.post("/merchant/spend", async (req, res) => {
  try {
    const { fromMerchantOutletId, toMerchantOutletId, amountZAR } = req.body || {};
    const fromOutlet = await storage.getMerchantOutlet(String(fromMerchantOutletId));
    const toOutlet = await storage.getMerchantOutlet(String(toMerchantOutletId));
    if (!fromOutlet || !toOutlet) {
      return res.status(404).json({ error: "outlet not found" });
    }
    const fromWallet = await storage.getWallet(fromOutlet.walletId);
    const toWallet = await storage.getWallet(toOutlet.walletId);
    if (!fromWallet || !toWallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    const amountInCents = Number(amountZAR);
    if (fromWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "insufficient balance" });
    }
    await storage.updateWalletBalance(fromWallet.id, fromWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + amountInCents);
    await storage.createTransaction({
      kind: "P2M",
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
      amount: amountInCents,
      merchantOutletId: fromOutlet.id
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.post("/merchant/withdraw", async (req, res) => {
  try {
    const { merchantOutletId, amountZAR } = req.body || {};
    const outlet = await storage.getMerchantOutlet(String(merchantOutletId));
    if (!outlet) {
      return res.status(404).json({ error: "outlet not found" });
    }
    const wallet = await storage.getWallet(outlet.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    const amountInCents = Number(amountZAR);
    if (wallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "insufficient balance" });
    }
    await storage.updateWalletBalance(wallet.id, wallet.balanceZAR - amountInCents);
    await storage.createTransaction({
      kind: "WITHDRAW",
      fromWalletId: wallet.id,
      amount: amountInCents,
      ref: "LOCAL:SIM",
      merchantOutletId: outlet.id
    });
    res.json({ ok: true, status: "SETTLED" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.get("/merchant/chains", async (_req, res) => {
  try {
    const chains = await storage.getAllMerchantChains();
    res.json({ chains });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.get("/merchant/chains/:chainId", async (req, res) => {
  try {
    const chain = await storage.getMerchantChain(String(req.params.chainId));
    if (!chain) {
      return res.status(404).json({ error: "chain not found" });
    }
    res.json(chain);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.get("/merchant/chains/:chainId/outlets", async (req, res) => {
  try {
    const outlets = await storage.getMerchantOutletsByChain(String(req.params.chainId));
    const outletsWithBalance = await Promise.all(
      outlets.map(async (outlet) => {
        const wallet = await storage.getWallet(outlet.walletId);
        return {
          id: outlet.id,
          chainId: outlet.chainId,
          walletId: outlet.walletId,
          displayName: outlet.displayName,
          town: outlet.town,
          region: outlet.region,
          address: outlet.address,
          status: outlet.status,
          balanceZAR: wallet?.balanceZAR || 0
        };
      })
    );
    res.json({ outlets: outletsWithBalance });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router2.get("/merchant/outlets/:outletId", async (req, res) => {
  try {
    const outletIdOrCode = String(req.params.outletId);
    let outlet = await storage.getMerchantOutletByCode(outletIdOrCode);
    if (!outlet) {
      outlet = await storage.getMerchantOutlet(outletIdOrCode);
    }
    if (!outlet) {
      return res.status(404).json({ error: "outlet not found" });
    }
    const chain = await storage.getMerchantChain(outlet.chainId);
    const wallet = await storage.getWallet(outlet.walletId);
    res.json({
      id: outlet.id,
      name: outlet.displayName,
      chainName: chain?.name || "Unknown Chain",
      location: `${outlet.town}${outlet.region ? ", " + outlet.region : ""}`,
      chainId: outlet.chainId,
      walletId: outlet.walletId,
      displayName: outlet.displayName,
      town: outlet.town,
      region: outlet.region,
      address: outlet.address,
      status: outlet.status,
      balanceZAR: wallet?.balanceZAR || 0
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
var merchant_default = router2;

// routes/donate.ts
import express3 from "express";
var router3 = express3.Router();
router3.post("/donate/public", async (req, res) => {
  try {
    const { tagCode, amountZAR, currency, country, needTaxReceipt, donorEmail, donorName } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "tagCode and amountZAR required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const bankRef = `DONOR:${tagCode}:${Date.now()}`;
    let bankSimUrl = `/bank/pay?bankRef=${encodeURIComponent(bankRef)}&tagCode=${encodeURIComponent(tagCode)}&amountZAR=${amountZAR}&source=public`;
    if (needTaxReceipt && donorEmail) {
      bankSimUrl += `&taxReceipt=1&donorEmail=${encodeURIComponent(donorEmail)}`;
      if (donorName) {
        bankSimUrl += `&donorName=${encodeURIComponent(donorName)}`;
      }
    }
    if (currency) {
      bankSimUrl += `&currency=${encodeURIComponent(currency)}`;
    }
    if (country) {
      bankSimUrl += `&country=${encodeURIComponent(country)}`;
    }
    res.json({
      bankSimUrl,
      bankRef
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router3.post("/donate/start", async (req, res) => {
  try {
    const { tagCode, amountZAR } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "tagCode and amountZAR required" });
    }
    if (!req.session.donorAuth || req.session.donorAuth.tagCode !== tagCode) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const bankRef = `TAG:${tagCode}:${Date.now()}`;
    res.json({
      bankSimUrl: `/bank/pay?bankRef=${encodeURIComponent(bankRef)}&tagCode=${encodeURIComponent(tagCode)}&amountZAR=${amountZAR}`,
      bankRef
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router3.post("/bank/settle", async (req, res) => {
  try {
    const { bankRef, tagCode, amountZAR, source, taxReceipt, donorEmail, donorName, currency, country } = req.body || {};
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).send("unknown tag");
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).send("wallet not found");
    }
    await storage.updateWalletBalance(wallet.id, wallet.balanceZar + Number(amountZAR) * 100);
    await storage.createTransaction({
      kind: "DONATION",
      toWalletId: wallet.id,
      amount: Number(amountZAR) * 100,
      ref: String(bankRef),
      currency: currency || "ZAR",
      donorCountry: country || void 0,
      taxDeductible: taxReceipt === "1" ? 1 : 0
    });
    let redirectUrl;
    if (source === "kiosk") {
      redirectUrl = `/kiosk/donate/${encodeURIComponent(String(tagCode))}?paid=1`;
    } else if (source === "public") {
      redirectUrl = `/donor/view/${encodeURIComponent(String(tagCode))}?paid=1`;
      if (taxReceipt === "1") {
        redirectUrl += `&taxReceipt=1`;
      }
    } else {
      redirectUrl = `/tag/${encodeURIComponent(String(tagCode))}?paid=1`;
    }
    res.redirect(redirectUrl);
  } catch (error) {
    console.log("/bank/settle", error);
    res.status(500).send("internal server error");
  }
});
router3.post("/recurring-donations/process", async (req, res) => {
  try {
    const duedonations = await storage.getActiveRecurringDonationsDueForProcessing();
    const results = [];
    for (const donation of duedonations) {
      try {
        const philanthropist = await storage.getPhilanthropist(donation.philanthropistId);
        if (!philanthropist) {
          results.push({ donationId: donation.id, status: "error", error: "Philanthropist not found" });
          continue;
        }
        const fromWallet = await storage.getWallet(philanthropist.walletId);
        if (!fromWallet) {
          results.push({ donationId: donation.id, status: "error", error: "Wallet not found" });
          continue;
        }
        let toWallet;
        if (donation.recipientType === "TAG") {
          const tag = await storage.getTag(donation.recipientId);
          if (!tag) {
            results.push({ donationId: donation.id, status: "error", error: "Tag not found" });
            continue;
          }
          toWallet = await storage.getWallet(tag.walletId);
        } else {
          const tags2 = await storage.getAllTags();
          const orgTag = tags2.find((t) => t.organizationId === donation.recipientId && t.beneficiaryType === "organization");
          if (!orgTag) {
            results.push({ donationId: donation.id, status: "error", error: "Organization tag not found" });
            continue;
          }
          toWallet = await storage.getWallet(orgTag.walletId);
        }
        if (!toWallet) {
          results.push({ donationId: donation.id, status: "error", error: "Recipient wallet not found" });
          continue;
        }
        const amountZARCents = Math.round(donation.amountCents * 18.5);
        if (fromWallet.balanceZAR < amountZARCents) {
          results.push({
            donationId: donation.id,
            status: "insufficient_funds",
            required: amountZARCents,
            available: fromWallet.balanceZAR
          });
          continue;
        }
        await storage.updateWalletBalance(fromWallet.id, fromWallet.balanceZAR - amountZARCents);
        await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + amountZARCents);
        const donationRef = donation.donorName ? `Recurring donation from ${donation.donorName} (${donation.cryptocurrency})` : `Recurring anonymous donation (${donation.cryptocurrency})`;
        await storage.createTransaction({
          kind: "RECURRING_DONATION",
          fromWalletId: fromWallet.id,
          toWalletId: toWallet.id,
          amount: amountZARCents,
          ref: donationRef,
          currency: "ZAR"
        });
        const updatedWallet = await storage.getWallet(fromWallet.id);
        if (updatedWallet && donation.autoDonatesDust === 1) {
          const dustThresholdZAR = Math.round(donation.dustThresholdCents * 18.5);
          if (updatedWallet.balanceZAR > 0 && updatedWallet.balanceZAR < dustThresholdZAR) {
            await storage.updateWalletBalance(fromWallet.id, 0);
            await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + updatedWallet.balanceZAR);
            await storage.createTransaction({
              kind: "DUST_DONATION",
              fromWalletId: fromWallet.id,
              toWalletId: toWallet.id,
              amount: updatedWallet.balanceZAR,
              ref: `Auto-donated crypto dust (${donation.cryptocurrency})`,
              currency: "ZAR"
            });
            results.push({
              donationId: donation.id,
              status: "success_with_dust",
              amount: amountZARCents,
              dustAmount: updatedWallet.balanceZAR
            });
          } else {
            results.push({ donationId: donation.id, status: "success", amount: amountZARCents });
          }
        } else {
          results.push({ donationId: donation.id, status: "success", amount: amountZARCents });
        }
        const nextDate = new Date(donation.nextProcessingDate || /* @__PURE__ */ new Date());
        nextDate.setMonth(nextDate.getMonth() + 1);
        await storage.updateRecurringDonationProcessing(donation.id, nextDate);
      } catch (error) {
        console.error(`Error processing recurring donation ${donation.id}:`, error);
        results.push({
          donationId: donation.id,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
    res.json({
      success: true,
      processed: results.length,
      results
    });
  } catch (error) {
    console.error("Process recurring donations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router3.get("/donations/recent", async (_req, res) => {
  try {
    const allTransactions = await storage.getAllTransactions();
    const recentDonations = allTransactions.filter((t) => (t.kind === "GIVE" || t.kind === "DONOR") && t.toWalletId).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 50);
    const enriched = await Promise.all(
      recentDonations.map(async (txn) => {
        const allTags = await storage.getAllTags();
        const tag = allTags.find((t) => t.walletId === txn.toWalletId);
        let organizationName = "Anonymous Charity";
        if (tag?.organizationId) {
          const org = await storage.getOrganization(tag.organizationId);
          if (org) {
            organizationName = org.name;
          }
        } else if (tag?.beneficiaryName) {
          organizationName = tag.beneficiaryName;
        }
        return {
          id: txn.id,
          amount: txn.amount,
          organizationName,
          timestamp: txn.createdAt
        };
      })
    );
    res.json({ donations: enriched });
  } catch (error) {
    console.error("Recent donations feed error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router3.get("/terms", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation Terms - Freedom Tag</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          h2 {
            color: #0aa968;
            border-bottom: 2px solid #0aa968;
            padding-bottom: 10px;
          }
          p {
            margin: 16px 0;
          }
          strong {
            color: #000;
          }
          em {
            font-style: italic;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <h2>Donation Terms</h2>
        <p><strong>Reallocation, Stewardship & No-Refund Policy.</strong></p>
        <p>(a) <em>Stewardship.</em> All donations are received by the Organization in its capacity as trustee/steward to be applied toward its mission and program purposes. Donors acknowledge and agree that the Organization retains full and final discretion over the use and application of donated funds to ensure they are used effectively and for charitable purposes.</p>
        <p>(b) <em>Specific Beneficiaries & Overfunding.</em> Where a donation is made in reference to a specific beneficiary (e.g., an individual animal or case) or campaign, Donor directs the Organization to first apply funds to that purpose. If the beneficiary dies, recovers, becomes ineligible, the need is satisfied, or the campaign is fully funded/overfunded, Donor authorizes the Organization to reallocate the remaining funds to substantially similar purposes within the same program or, if not practicable, to other urgent needs within the Organization's mission.</p>
        <p>(c) <em>No Refunds.</em> All donations are final, irrevocable, and non-refundable, except where required by applicable law or in cases of proven unauthorized or fraudulent payment.</p>
        <p>(d) <em>Transparency.</em> The Organization will maintain appropriate records and may publish aggregated reports on the use of funds; personal donor data will only be disclosed per the Organization's privacy policy and donor consents.</p>
      </body>
      </html>
    `);
});
var donate_default = router3;

// routes/beneficiary.ts
import express4 from "express";
var router4 = express4.Router();
router4.post("/beneficiary/verify-pin", async (req, res) => {
  try {
    const { tagCode, pin } = req.body || {};
    if (!tagCode || !pin) {
      return res.status(400).json({ error: "tagCode and pin required" });
    }
    const tag = await storage.getTag(String(tagCode));
    console.log("PIN login attempt for tag:", tagCode);
    console.log("Verifying PIN for tag:", tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (tag.pin !== String(pin)) {
      return res.status(401).json({ error: "Invalid PIN" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.donorAuth = {
        tagCode: tag.tagCode,
        beneficiaryName: tag.beneficiaryName || ""
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          tagCode: tag.tagCode,
          beneficiaryName: tag.beneficiaryName,
          beneficiaryType: tag.beneficiaryType,
          balanceZAR: wallet.balanceZAR,
          walletId: wallet.id
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router4.post("/beneficiary/biometric-login", async (req, res) => {
  try {
    const { tagCode } = req.body || {};
    if (!tagCode) {
      return res.status(400).json({ error: "tagCode required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (!tag.sumsubApplicantId || tag.verificationStatus !== "approved") {
      return res.status(400).json({
        error: "Biometric login not available. Please complete registration first or use PIN login."
      });
    }
    const sumsubModule = await Promise.resolve().then(() => (init_sumsub(), sumsub_exports));
    const sumsubClient2 = sumsubModule.createSumsubClient();
    const tokenData = await sumsubClient2.generateAccessToken(
      tag.sumsubApplicantId,
      String(tagCode)
    );
    const verificationUrl = sumsubClient2.getSdkUrl(tag.sumsubApplicantId, tokenData.token);
    const urlWithTag = `${verificationUrl}&tagCode=${tagCode}`;
    res.json({
      verificationUrl: urlWithTag,
      accessToken: tokenData.token,
      beneficiaryName: tag.beneficiaryName
    });
  } catch (error) {
    console.error("[Biometric Login] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router4.post("/beneficiary/biometric-complete", async (req, res) => {
  try {
    const { tagCode } = req.body || {};
    if (!tagCode) {
      return res.status(400).json({ error: "tagCode required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (!tag.sumsubApplicantId || tag.verificationStatus !== "approved") {
      return res.status(400).json({
        error: "Biometric verification not approved"
      });
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.donorAuth = {
        tagCode: tag.tagCode,
        beneficiaryName: tag.beneficiaryName || ""
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          tagCode: tag.tagCode,
          beneficiaryName: tag.beneficiaryName,
          beneficiaryType: tag.beneficiaryType,
          balanceZAR: wallet.balanceZAR,
          walletId: wallet.id
        });
      });
    });
  } catch (error) {
    console.error("[Biometric Complete] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router4.post("/beneficiary/login", async (req, res) => {
  try {
    const { tagCode, pin } = req.body || {};
    if (!tagCode || !pin) {
      return res.status(400).json({ error: "tagCode and pin required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "tag not found" });
    }
    if (tag.pin !== String(pin)) {
      return res.status(401).json({ error: "invalid pin" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.donorAuth = {
        tagCode: tag.tagCode,
        beneficiaryName: tag.beneficiaryName || ""
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          tagCode: tag.tagCode,
          walletId: wallet.id,
          balanceZAR: wallet.balanceZAR
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router4.post("/beneficiary/transfer", async (req, res) => {
  try {
    const { fromTagCode, toTagCode, amountZAR } = req.body || {};
    const fromTag = await storage.getTag(String(fromTagCode));
    const toTag = await storage.getTag(String(toTagCode));
    if (!fromTag || !toTag) {
      return res.status(404).json({ error: "tag not found" });
    }
    const fromWallet = await storage.getWallet(fromTag.walletId);
    const toWallet = await storage.getWallet(toTag.walletId);
    if (!fromWallet || !toWallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    const amount = Number(amountZAR);
    const amountInCents = amount * 100;
    if (fromWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "insufficient balance" });
    }
    await storage.updateWalletBalance(fromWallet.id, fromWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + amountInCents);
    await storage.createTransaction({
      kind: "P2P",
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
      amount: amountInCents
    });
    res.json({
      ok: true,
      newBalance: fromWallet.balanceZAR - amountInCents
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router4.post("/beneficiary/change-pin", async (req, res) => {
  try {
    const { currentPin, newPin } = req.body || {};
    if (!currentPin || !newPin) {
      return res.status(400).json({ error: "Current PIN and new PIN required" });
    }
    if (!req.session.beneficiary?.tagCode) {
      return res.status(401).json({ error: "Not authenticated. Please login first." });
    }
    const tagCode = req.session.beneficiary.tagCode;
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (tag.pin !== String(currentPin)) {
      return res.status(401).json({ error: "Current PIN is incorrect" });
    }
    await storage.updateTagPin(tagCode, String(newPin));
    res.json({ success: true, message: "PIN changed successfully" });
  } catch (error) {
    console.error("Change PIN error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var beneficiary_default = router4;

// routes/donor.ts
import express5 from "express";
var router5 = express5.Router();
router5.post("/donor/verify-pin", async (req, res) => {
  try {
    const { tagCode, pin } = req.body || {};
    if (!tagCode || !pin) {
      return res.status(400).json({ error: "tagCode and pin required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (tag.pin !== String(pin)) {
      return res.status(401).json({ error: "Invalid PIN" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.donorAuth = {
        tagCode: tag.tagCode,
        beneficiaryName: tag.beneficiaryName || ""
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          tagCode: tag.tagCode,
          beneficiaryName: tag.beneficiaryName,
          beneficiaryType: tag.beneficiaryType,
          balanceZAR: wallet.balanceZAR,
          walletId: wallet.id
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router5.post("/donor/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ success: true });
  });
});
router5.get("/donor/track/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const allTransactions = await storage.getAllTransactions();
    const donorTransactions = allTransactions.filter(
      (tx) => tx.kind === "DONATION" && tx.donorEmail === email
    );
    const enrichedTransactions = await Promise.all(
      donorTransactions.map(async (tx) => {
        const toWallet = tx.toWalletId ? await storage.getWallet(tx.toWalletId) : null;
        let tagInfo = null;
        let orgInfo = null;
        if (toWallet) {
          const allTags = await storage.getAllTags();
          const tag = allTags.find((t) => t.walletId === toWallet.id);
          if (tag) {
            tagInfo = {
              tagCode: tag.tagCode,
              beneficiaryName: tag.beneficiaryName,
              beneficiaryType: tag.beneficiaryType
            };
            if (tag.organizationId) {
              const org = await storage.getOrganization(tag.organizationId);
              if (org) {
                orgInfo = {
                  id: org.id,
                  name: org.name,
                  smartContractAddress: org.smartContractAddress,
                  blockchainNetwork: org.blockchainNetwork
                };
              }
            }
          }
        }
        return {
          id: tx.id,
          ts: tx.ts,
          amount: tx.amount,
          currency: tx.currency || "ZAR",
          tagInfo,
          orgInfo,
          blockchainTxHash: tx.blockchainTxHash,
          blockchainNetwork: tx.blockchainNetwork
        };
      })
    );
    res.json({
      donations: enrichedTransactions,
      totalAmount: donorTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      count: donorTransactions.length
    });
  } catch (error) {
    console.error("Track donor error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router5.get("/donor/track/tag/:tagCode", async (req, res) => {
  try {
    const tagCode = req.params.tagCode;
    const allTransactions = await storage.getAllTransactions();
    const donationsMade = allTransactions.filter(
      (tx) => tx.kind === "DONATION" && tx.donorTagCode === tagCode
    );
    const tag = await storage.getTag(tagCode);
    let donationsReceived = [];
    if (tag) {
      const wallet = await storage.getWallet(tag.walletId);
      if (wallet) {
        donationsReceived = allTransactions.filter(
          (tx) => tx.kind === "DONATION" && tx.toWalletId === wallet.id
        );
      }
    }
    const enrichedDonationsMade = await Promise.all(
      donationsMade.map(async (tx) => {
        const toWallet = tx.toWalletId ? await storage.getWallet(tx.toWalletId) : null;
        let tagInfo2 = null;
        let orgInfo = null;
        if (toWallet) {
          const allTags = await storage.getAllTags();
          const toTag = allTags.find((t) => t.walletId === toWallet.id);
          if (toTag) {
            tagInfo2 = {
              tagCode: toTag.tagCode,
              beneficiaryName: toTag.beneficiaryName,
              beneficiaryType: toTag.beneficiaryType
            };
            if (toTag.organizationId) {
              const org = await storage.getOrganization(toTag.organizationId);
              if (org) {
                orgInfo = {
                  id: org.id,
                  name: org.name,
                  smartContractAddress: org.smartContractAddress,
                  blockchainNetwork: org.blockchainNetwork
                };
              }
            }
          }
        }
        return {
          id: tx.id,
          ts: tx.ts,
          amount: tx.amount,
          currency: tx.currency || "ZAR",
          type: "made",
          tagInfo: tagInfo2,
          orgInfo,
          blockchainTxHash: tx.blockchainTxHash,
          blockchainNetwork: tx.blockchainNetwork
        };
      })
    );
    const enrichedDonationsReceived = await Promise.all(
      donationsReceived.map(async (tx) => {
        let orgInfo = null;
        if (tag?.organizationId) {
          const org = await storage.getOrganization(tag.organizationId);
          if (org) {
            orgInfo = {
              id: org.id,
              name: org.name,
              smartContractAddress: org.smartContractAddress,
              blockchainNetwork: org.blockchainNetwork
            };
          }
        }
        return {
          id: tx.id,
          ts: tx.ts,
          amount: tx.amount,
          currency: tx.currency || "ZAR",
          type: "received",
          donorName: tx.donorName,
          donorEmail: tx.donorEmail,
          orgInfo,
          blockchainTxHash: tx.blockchainTxHash,
          blockchainNetwork: tx.blockchainNetwork
        };
      })
    );
    const tagInfo = tag ? {
      tagCode: tag.tagCode,
      beneficiaryName: tag.beneficiaryName,
      beneficiaryType: tag.beneficiaryType,
      currentBalance: tag.walletId ? (await storage.getWallet(tag.walletId))?.balanceZAR : 0
    } : null;
    res.json({
      tagInfo,
      donationsMade: enrichedDonationsMade,
      donationsReceived: enrichedDonationsReceived,
      totalDonated: donationsMade.reduce((sum, tx) => sum + tx.amount, 0),
      totalReceived: donationsReceived.reduce((sum, tx) => sum + tx.amount, 0),
      countDonated: donationsMade.length,
      countReceived: donationsReceived.length
    });
  } catch (error) {
    console.error("Track by tag error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router5.get("/donor/flow/:transactionId", async (req, res) => {
  try {
    const txId = req.params.transactionId;
    const allTransactions = await storage.getAllTransactions();
    const donation = allTransactions.find((tx) => tx.id === txId);
    if (!donation) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    const flow = {
      donation: {
        id: donation.id,
        ts: donation.ts,
        amount: donation.amount,
        currency: donation.currency || "ZAR",
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        blockchainTxHash: donation.blockchainTxHash,
        blockchainNetwork: donation.blockchainNetwork
      },
      tag: null,
      organization: null,
      distributions: []
    };
    if (donation.toWalletId) {
      const toWallet = await storage.getWallet(donation.toWalletId);
      if (toWallet) {
        const allTags = await storage.getAllTags();
        const tag = allTags.find((t) => t.walletId === toWallet.id);
        if (tag) {
          flow.tag = {
            tagCode: tag.tagCode,
            beneficiaryName: tag.beneficiaryName,
            beneficiaryType: tag.beneficiaryType,
            currentBalance: toWallet.balanceZAR
          };
          if (tag.organizationId) {
            const org = await storage.getOrganization(tag.organizationId);
            if (org) {
              flow.organization = {
                id: org.id,
                name: org.name,
                smartContractAddress: org.smartContractAddress,
                blockchainNetwork: org.blockchainNetwork
              };
            }
          }
          const distributions = allTransactions.filter(
            (tx) => tx.kind === "DISTRIBUTION" && tx.fromWalletId === toWallet.id
          );
          flow.distributions = await Promise.all(
            distributions.map(async (dist) => {
              const toWallet2 = dist.toWalletId ? await storage.getWallet(dist.toWalletId) : null;
              const allTags2 = await storage.getAllTags();
              const toTag = toWallet2 ? allTags2.find((t) => t.walletId === toWallet2.id) : null;
              return {
                id: dist.id,
                ts: dist.ts,
                amount: dist.amount,
                toBeneficiary: toTag ? {
                  tagCode: toTag.tagCode,
                  beneficiaryName: toTag.beneficiaryName
                } : null
              };
            })
          );
        }
      }
    }
    res.json(flow);
  } catch (error) {
    console.error("Get flow error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var donor_default = router5;

// routes/blockkoin.ts
import express6 from "express";
var router6 = express6.Router();
router6.get("/blockkoin/rates", async (req, res) => {
  try {
    const targetCurrency = req.query.target || "ZAR";
    const rates = await blockkoinClient.getExchangeRates(targetCurrency);
    res.json(rates);
  } catch (error) {
    console.error("Exchange rates error:", error);
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
});
router6.get("/blockkoin/currencies", async (req, res) => {
  try {
    const currencies = await blockkoinClient.getSupportedCurrencies();
    res.json({ currencies });
  } catch (error) {
    console.error("Currencies error:", error);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
});
router6.post("/blockkoin/check-kyc", async (req, res) => {
  try {
    const { amountUSD, userId } = req.body;
    if (!userId) {
      return res.json({ requiresKYC: amountUSD > 50, kycStatus: "none" });
    }
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const requiresKYC = blockkoinClient.requiresKYC(amountUSD, user.blockkoinKycStatus || "none");
    res.json({
      requiresKYC,
      kycStatus: user.blockkoinKycStatus,
      blockkoinAccountId: user.blockkoinAccountId
    });
  } catch (error) {
    console.error("KYC check error:", error);
    res.status(500).json({ error: "Failed to check KYC requirement" });
  }
});
router6.post("/blockkoin/link", async (req, res) => {
  try {
    if (!req.session?.userAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { accountId } = req.body || {};
    const id = String(accountId || "").trim();
    if (!id || id.length < 3) {
      return res.status(400).json({ error: "Valid Blockkoin account ID is required" });
    }
    let kycStatus = "none";
    try {
      kycStatus = await blockkoinClient.checkKYCStatus(id);
    } catch (e) {
      kycStatus = "none";
    }
    const userId = req.session.userAuth.userId;
    await storage.updateUser(userId, {
      blockkoinAccountId: id,
      blockkoinKycStatus: kycStatus
    });
    const user = await storage.getUser(userId);
    res.json({
      success: true,
      blockkoinAccountId: user?.blockkoinAccountId || id,
      blockkoinKycStatus: user?.blockkoinKycStatus || kycStatus
    });
  } catch (error) {
    console.error("[Blockkoin Link] Error:", error);
    res.status(500).json({ error: "Failed to link Blockkoin account" });
  }
});
var blockkoin_default = router6;

// routes/tag.ts
import express7 from "express";
init_referral();
var router7 = express7.Router();
router7.get("/tag/:tagCode", async (req, res) => {
  try {
    const requestedTagCode = String(req.params.tagCode);
    const tag = await storage.getTag(requestedTagCode);
    if (!tag) {
      return res.status(404).json({ error: "unknown tag" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    console.log("\u{1F4B0} Tag wallet:", wallet ? wallet.balanceZar : 0);
    if (!wallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    res.json({
      tagCode: tag.tagCode,
      walletId: wallet.id,
      balanceZAR: wallet ? wallet.balanceZar : 0
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router7.get("/tags/list", async (_req, res) => {
  try {
    const allTags = await storage.getAllTags();
    const tagsWithBalance = await Promise.all(
      allTags.map(async (tag) => {
        const wallet = await storage.getWallet(tag.walletId);
        return {
          tagCode: tag.tagCode,
          walletId: tag.walletId,
          balanceZAR: wallet?.balanceZAR || 0
        };
      })
    );
    res.json({ tags: tagsWithBalance });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router7.get("/tag/:tagCode/info", async (req, res) => {
  try {
    const tag = await storage.getTag(String(req.params.tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    res.json({
      tagCode: tag.tagCode,
      beneficiaryName: tag.beneficiaryName || "Anonymous",
      beneficiaryType: tag.beneficiaryType || "Individual",
      balanceZAR: wallet?.balanceZAR || 0
    });
  } catch (error) {
    console.error("Get tag info error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router7.post("/quick-tag-setup", async (req, res) => {
  try {
    const { beneficiaryName, beneficiaryPhone, pin, referredBy, userId: requestUserId } = req.body || {};
    if (!beneficiaryName || !pin) {
      return res.status(400).json({ error: "Beneficiary name and PIN required" });
    }
    if (String(pin).length !== 4) {
      return res.status(400).json({ error: "PIN must be 4 digits" });
    }
    const tagCode = `ST${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const wallet = await storage.createWallet({
      type: "TAG",
      name: `${beneficiaryName}'s Freedom Tag`,
      balanceZAR: 0
    });
    const referralCode = generateReferralCode("TAG", wallet.id);
    let validReferredBy = null;
    let referrer = null;
    if (referredBy) {
      referrer = await storage.lookupReferralCode(String(referredBy));
      if (referrer) {
        validReferredBy = String(referredBy);
      }
    }
    let userId = requestUserId || null;
    if (!userId && req.session && req.session.userAuth) {
      userId = req.session.userAuth.userId;
    }
    console.log("\u{1F510} Final userId for tag creation:", userId);
    const tag = await storage.createTag({
      tagCode,
      walletId: wallet.id,
      userId,
      // Link to authenticated user if logged in
      pin: String(pin),
      organizationId: null,
      beneficiaryType: "individual",
      beneficiaryName,
      beneficiaryPhone: beneficiaryPhone || null,
      verificationStatus: "pending",
      referralCode,
      referredBy: validReferredBy
    });
    console.log("\u2705 Tag created:", { tagCode: tag.tagCode, userId: tag.userId, walletId: tag.walletId });
    if (referrer && validReferredBy) {
      const rewardAmount = calculateReferralReward(referrer.type, "TAG");
      let rewardPaid = 0;
      if (referrer.walletId) {
        try {
          const referrerWallet = await storage.getWallet(referrer.walletId);
          if (referrerWallet) {
            await storage.updateWalletBalance(referrer.walletId, referrerWallet.balanceZAR + rewardAmount);
            rewardPaid = 1;
          }
        } catch (error) {
          console.error("Failed to pay referral reward:", error);
        }
      }
      await storage.createReferral({
        referrerCode: validReferredBy,
        referrerType: referrer.type,
        referredCode: referralCode,
        referredType: "TAG",
        rewardAmount,
        rewardPaid
      });
    }
    res.json({
      success: true,
      tagCode: tag.tagCode,
      beneficiaryName,
      beneficiaryPhone: beneficiaryPhone || null,
      referralCode,
      donationUrl: `/donor?tag=${tag.tagCode}`
    });
  } catch (error) {
    console.error("Quick tag setup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router7.post("/agent/create-tag", async (req, res) => {
  try {
    const { beneficiaryName, beneficiaryPhone, organizationId, accessCode } = req.body || {};
    if (!beneficiaryName || !organizationId || !accessCode) {
      return res.status(400).json({ error: "Beneficiary name, organization ID, and access code required" });
    }
    const organization = await storage.getOrganization(String(organizationId));
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    if (accessCode !== organization.email) {
      return res.status(401).json({ error: "Invalid access code" });
    }
    const defaultPin = "1066";
    const orgPrefix = organization.name.substring(0, 2).toUpperCase();
    const tagCode = `${orgPrefix}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const wallet = await storage.createWallet({
      type: "TAG",
      name: `${beneficiaryName}'s Freedom Tag`,
      balanceZAR: 0
    });
    const referralCode = generateReferralCode("TAG", wallet.id);
    const sumsubModule = await Promise.resolve().then(() => (init_sumsub(), sumsub_exports));
    const sumsubClient2 = sumsubModule.createSumsubClient();
    const nameParts = beneficiaryName.trim().split(" ");
    const firstName = nameParts[0] || beneficiaryName;
    const lastName = nameParts.slice(1).join(" ") || beneficiaryName;
    const applicant = await sumsubClient2.createApplicant({
      externalUserId: tagCode,
      firstName,
      lastName,
      email: `${tagCode.toLowerCase()}@freedomtag.blockkoin.io`,
      phone: beneficiaryPhone || void 0
    });
    const tag = await storage.createTag({
      tagCode,
      walletId: wallet.id,
      pin: defaultPin,
      organizationId,
      beneficiaryType: "individual",
      beneficiaryName,
      beneficiaryPhone: beneficiaryPhone || null,
      verificationStatus: "pending",
      referralCode,
      sumsubApplicantId: applicant.id
    });
    const tokenData = await sumsubClient2.generateAccessToken(
      applicant.id,
      tagCode
    );
    const verificationUrl = sumsubClient2.getSdkUrl(applicant.id, tokenData.token);
    res.json({
      success: true,
      tagCode: tag.tagCode,
      beneficiaryName,
      defaultPin,
      verificationUrl,
      accessToken: tokenData.token
    });
  } catch (error) {
    console.error("Agent tag setup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var tag_default = router7;

// routes/crypto.ts
import express8 from "express";
import crypto3 from "crypto";
var router8 = express8.Router();
router8.get("/crypto/balances", async (req, res) => {
  try {
    const userId = req.session?.userAuth?.userId;
    const philanthropistId = req.session?.philanthropistAuth?.philanthropistId;
    if (!userId && !philanthropistId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    let blockkoinAccountId = null;
    if (userId) {
      const user = await storage.getUser(userId);
      if (!user || !user.blockkoinAccountId) {
        return res.status(404).json({
          error: "No Blockkoin account found",
          message: "Please complete signup to get a Blockkoin wallet"
        });
      }
      blockkoinAccountId = user.blockkoinAccountId;
    } else if (philanthropistId) {
      const philanthropist = await storage.getPhilanthropist(philanthropistId);
      if (!philanthropist || !philanthropist.blockkoinAccountId) {
        return res.status(404).json({
          error: "No Blockkoin account found",
          message: "Please complete signup to get a Blockkoin wallet"
        });
      }
      blockkoinAccountId = philanthropist.blockkoinAccountId;
    }
    const balances = {
      BTC: 0,
      ETH: 0,
      USDT: 0
    };
    res.json(balances);
  } catch (error) {
    console.error("[Crypto Balances] Error:", error);
    res.status(500).json({ error: "Failed to fetch crypto balances" });
  }
});
router8.post("/crypto/donate", async (req, res) => {
  try {
    const { tagCode, amountZAR, cryptoCurrency = "USDT" } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "tagCode and amountZAR required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (!tag.userId) {
      return res.status(400).json({ error: "Tag not linked to a user account" });
    }
    const beneficiary = await storage.getUser(tag.userId);
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    const preferredCurrency = beneficiary.preferredCurrency || "ZAR";
    const USD_TO_ZAR_RATE = 18.5;
    const amountUSD = amountZAR / 100 / USD_TO_ZAR_RATE;
    if (amountUSD >= 50 && beneficiary.blockkoinKycStatus !== "verified") {
      return res.status(400).json({
        error: "KYC_REQUIRED",
        message: "Transactions over $50 USD require identity verification",
        kycUrl: beneficiary.blockkoinAccountId ? `https://kyc.blockkoin.com/${beneficiary.blockkoinAccountId}` : "https://bkr.blockkoin.io/register",
        currentStatus: beneficiary.blockkoinKycStatus,
        amountUSD: amountUSD.toFixed(2)
      });
    }
    const exchangeRates = await blockkoinClient.getExchangeRates(preferredCurrency);
    const cryptoRate = exchangeRates.find((r) => r.from === cryptoCurrency);
    if (!cryptoRate) {
      return res.status(400).json({
        error: `Unsupported cryptocurrency: ${cryptoCurrency}`,
        supportedCurrencies: exchangeRates.map((r) => r.from)
      });
    }
    const cryptoAmount = amountZAR / cryptoRate.rate;
    let blockkoinAccountId = beneficiary.blockkoinAccountId;
    if (!blockkoinAccountId) {
      try {
        const account = await blockkoinClient.createAccount(
          beneficiary.email,
          beneficiary.fullName,
          beneficiary.country
        );
        blockkoinAccountId = account.id;
        await storage.updateUser(beneficiary.id, {
          blockkoinAccountId: account.id,
          blockkoinKycStatus: account.kycStatus
        });
      } catch (error) {
        console.error("[Blockkoin] Failed to create account:", error);
        return res.status(500).json({ error: "Failed to create payment account" });
      }
    }
    const payment = await blockkoinClient.createPayment({
      amount: cryptoAmount,
      currency: cryptoCurrency,
      toAddress: blockkoinAccountId,
      // Simplified - in production would be wallet address
      autoConvert: true,
      targetCurrency: preferredCurrency
    });
    await storage.createTransaction({
      kind: "DONATION",
      toWalletId: tag.walletId,
      amount: 0,
      // Will be updated when payment confirms
      ref: `CRYPTO_${cryptoCurrency}_${payment.id}`,
      cryptoPaymentId: payment.id,
      status: "pending"
    });
    res.json({
      success: true,
      paymentId: payment.id,
      cryptoAmount,
      cryptoCurrency,
      estimatedZAR: amountZAR,
      exchangeRate: cryptoRate.rate,
      rateTimestamp: cryptoRate.timestamp,
      // In demo mode, return simulation URL; in production, return Blockkoin payment page
      paymentUrl: `/crypto/pay?paymentId=${payment.id}&tagCode=${tagCode}&amount=${cryptoAmount}&currency=${cryptoCurrency}`,
      qrCodeData: JSON.stringify({
        paymentId: payment.id,
        amount: cryptoAmount,
        currency: cryptoCurrency,
        recipient: blockkoinAccountId
      })
    });
  } catch (error) {
    console.error("Crypto donation error:", error);
    res.status(500).json({ error: "Failed to process crypto donation" });
  }
});
router8.post("/crypto/webhook/blockkoin", async (req, res) => {
  try {
    const signature = req.headers["x-blockkoin-signature"];
    const webhookSecret = process.env.BLOCKKOIN_WEBHOOK_SECRET;
    if (webhookSecret) {
      const expectedSignature = crypto3.createHmac("sha256", webhookSecret).update(JSON.stringify(req.body)).digest("hex");
      if (signature !== expectedSignature) {
        console.error("[Blockkoin Webhook] Invalid signature");
        return res.status(401).json({ error: "Invalid signature" });
      }
    } else {
      console.warn("[Blockkoin Webhook] No BLOCKKOIN_WEBHOOK_SECRET set, skipping verification");
    }
    const { event, payment } = req.body;
    console.log(`[Blockkoin Webhook] Received event: ${event}`, payment);
    if (event === "payment.completed") {
      const transactions2 = await storage.getAllTransactions();
      const transaction = transactions2.find((t) => t.cryptoPaymentId === payment.id);
      if (!transaction) {
        console.error(`[Blockkoin Webhook] Transaction not found for payment: ${payment.id}`);
        return res.status(404).json({ error: "Transaction not found" });
      }
      const convertedAmountZAR = payment.convertedAmount || payment.amount;
      await storage.updateTransactionAmount(transaction.id, convertedAmountZAR);
      const wallet = await storage.getWallet(transaction.toWalletId);
      if (wallet) {
        await storage.updateWalletBalance(
          wallet.id,
          wallet.balanceZAR + convertedAmountZAR
        );
        console.log(`[Blockkoin Webhook] \u2705 Payment completed: ${payment.id}, amount: R${convertedAmountZAR / 100}`);
      }
    } else if (event === "payment.failed") {
      console.log(`[Blockkoin Webhook] \u26A0\uFE0F Payment failed: ${payment.id}`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("[Blockkoin Webhook] Processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
router8.post("/crypto/public", async (req, res) => {
  try {
    const { tagCode, amountZAR } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "tagCode and amountZAR required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const cryptoRef = `DONOR-CRYPTO:${tagCode}:${Date.now()}`;
    res.json({
      cryptoSimUrl: `/crypto/pay?cryptoRef=${encodeURIComponent(cryptoRef)}&tagCode=${encodeURIComponent(tagCode)}&amountZAR=${amountZAR}&source=public`,
      cryptoRef
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router8.post("/crypto/start", async (req, res) => {
  try {
    const { tagCode, amountZAR } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "tagCode and amountZAR required" });
    }
    if (!req.session.donorAuth || req.session.donorAuth.tagCode !== tagCode) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "unknown tag" });
    }
    const cryptoRef = `CRYPTO:${tagCode}:${Date.now()}`;
    res.json({
      cryptoSimUrl: `/crypto/pay?cryptoRef=${encodeURIComponent(cryptoRef)}&tagCode=${encodeURIComponent(tagCode)}&amountZAR=${amountZAR}`,
      cryptoRef
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router8.post("/crypto/settle", async (req, res) => {
  try {
    const { cryptoRef, tagCode, amountZAR, crypto: crypto4, source } = req.body || {};
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).send("unknown tag");
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).send("wallet not found");
    }
    await storage.updateWalletBalance(wallet.id, wallet.balanceZar + Number(amountZAR) * 100);
    await storage.createTransaction({
      kind: "DONATION",
      toWalletId: wallet.id,
      amount: Number(amountZAR) * 100,
      ref: `${cryptoRef} [${crypto4}]`
    });
    console.log("@=========> source", source);
    if (source === "public") {
      res.redirect(`/donor/view/${encodeURIComponent(String(tagCode))}?paid=1&crypto=${crypto4}`);
    } else {
      res.redirect(`/tag/${encodeURIComponent(String(tagCode))}?paid=1&crypto=${crypto4}`);
    }
  } catch (error) {
    console.log("Crypto settle error:", error);
    res.status(500).send("internal server error");
  }
});
router8.post("/crypto/buy", async (req, res) => {
  try {
    const { amountZAR } = req.body || {};
    if (!amountZAR || amountZAR < 100) {
      return res.status(400).json({ error: "Minimum purchase is R 1.00" });
    }
    const auth = req.session.philanthropistAuth || req.session.donorAuth;
    if (!auth) {
      return res.status(401).json({ error: "Authentication required" });
    }
    let wallet;
    if (req.session.philanthropistAuth) {
      const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
      if (!philanthropist) {
        return res.status(404).json({ error: "User not found" });
      }
      wallet = await storage.getWallet(philanthropist.walletId);
    } else if (req.session.donorAuth) {
      const tag = await storage.getTag(req.session.donorAuth.tagCode);
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      wallet = await storage.getWallet(tag.walletId);
    }
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    if (wallet.balanceZAR < amountZAR) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    const buyResult = await blockkoinClient.buyCrypto({
      accountId: wallet.id.toString(),
      amount: amountZAR,
      // Amount in cents
      currency: "USDT",
      fiatCurrency: "ZAR"
    });
    const totalDeduction = amountZAR + buyResult.fee;
    if (wallet.balanceZAR < totalDeduction) {
      return res.status(400).json({ error: "Insufficient balance including fees" });
    }
    await storage.updateWalletBalance(wallet.id, wallet.balanceZAR - totalDeduction);
    await storage.createTransaction({
      fromWalletId: wallet.id,
      toWalletId: wallet.id,
      // Same wallet, crypto purchase
      amount: totalDeduction,
      // Store full deduction (amount + fee) to match wallet debit
      kind: "CRYPTO_BUY",
      ref: `BUY_USDT_${buyResult.transactionId} (Amount: R${(amountZAR / 100).toFixed(2)}, Fee: R${(buyResult.fee / 100).toFixed(2)}, Total: R${(totalDeduction / 100).toFixed(2)})`,
      blockchainTxHash: buyResult.blockchainHash,
      blockchainNetwork: "Ethereum"
    });
    res.json({
      success: true,
      usdtPurchased: buyResult.cryptoAmount,
      zarSpent: amountZAR / 100,
      // Convert cents to rands for display
      fee: buyResult.fee / 100,
      totalCost: totalDeduction / 100,
      blockchainTxHash: buyResult.blockchainHash
    });
  } catch (error) {
    console.error("Buy crypto error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router8.post("/crypto/sell", async (req, res) => {
  try {
    const { amountUSDT } = req.body || {};
    if (!amountUSDT || amountUSDT < 1) {
      return res.status(400).json({ error: "Minimum sale is 1 USDT" });
    }
    const auth = req.session.philanthropistAuth || req.session.donorAuth;
    if (!auth) {
      return res.status(401).json({ error: "Authentication required" });
    }
    let wallet;
    if (req.session.philanthropistAuth) {
      const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
      if (!philanthropist) {
        return res.status(404).json({ error: "User not found" });
      }
      wallet = await storage.getWallet(philanthropist.walletId);
    } else if (req.session.donorAuth) {
      const tag = await storage.getTag(req.session.donorAuth.tagCode);
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      wallet = await storage.getWallet(tag.walletId);
    }
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const sellResult = await blockkoinClient.sellCrypto({
      accountId: wallet.id.toString(),
      cryptoAmount: amountUSDT,
      currency: "USDT",
      fiatCurrency: "ZAR"
    });
    const grossAmount = sellResult.fiatAmount;
    const netAmount = grossAmount - sellResult.fee;
    await storage.updateWalletBalance(wallet.id, wallet.balanceZAR + netAmount);
    await storage.createTransaction({
      fromWalletId: wallet.id,
      toWalletId: wallet.id,
      // Same wallet, crypto sale
      amount: netAmount,
      // Store net amount to match wallet credit
      kind: "CRYPTO_SELL",
      ref: `SELL_USDT_${sellResult.transactionId} (Gross: R${(grossAmount / 100).toFixed(2)}, Fee: R${(sellResult.fee / 100).toFixed(2)}, Net: R${(netAmount / 100).toFixed(2)})`,
      blockchainTxHash: sellResult.blockchainHash,
      blockchainNetwork: "Ethereum"
    });
    res.json({
      success: true,
      usdtSold: amountUSDT,
      zarGross: grossAmount / 100,
      // Gross amount before fee
      fee: sellResult.fee / 100,
      // Fee amount
      zarReceived: netAmount / 100,
      // Net amount after fee
      blockchainTxHash: sellResult.blockchainHash
    });
  } catch (error) {
    console.error("Sell crypto error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var crypto_default = router8;

// routes/stripe.ts
import express9 from "express";
var router9 = express9.Router();
router9.post("/stripe/create-checkout-session", express9.json(), async (req, res) => {
  try {
    const { tagCode, amount, donorEmail } = req.body;
    if (!tagCode || !amount) {
      return res.status(400).json({ error: "Missing tagCode or amount" });
    }
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-11-20.acacia"
    });
    const session2 = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: {
              name: `Donation to ${tagCode}`,
              description: `Support ${tag.beneficiaryName || tagCode}`
            },
            unit_amount: parseInt(amount)
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.BACKEND_URL?.replace("3000", "5173") || "http://localhost:5173"}/stripe/success?session_id={CHECKOUT_SESSION_ID}&tag=${tagCode}`,
      cancel_url: `${process.env.BACKEND_URL?.replace("3000", "5173") || "http://localhost:5173"}/stripe/donate/${tagCode}?canceled=true`,
      customer_email: donorEmail || void 0,
      metadata: {
        tagCode,
        amountZAR: amount
      }
    });
    res.json({
      sessionId: session2.id,
      url: session2.url
    });
  } catch (error) {
    console.error("[Stripe] Create checkout session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});
router9.post("/stripe/create-payment-intent", express9.json(), async (req, res) => {
  try {
    const { tagCode, amount, donorEmail, donorName } = req.body;
    if (!tagCode || !amount) {
      return res.status(400).json({ error: "Missing tagCode or amount" });
    }
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-11-20.acacia"
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: "zar",
      metadata: {
        tagCode,
        amountZAR: amount,
        donorEmail: donorEmail || "",
        donorName: donorName || ""
      },
      description: `Donation to ${tagCode}`
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error("[Stripe] Create payment intent error:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});
router9.post("/stripe/webhook-demo", express9.json(), async (req, res) => {
  try {
    console.log("[Stripe Webhook Demo] Event received:", req.body.type);
    const event = req.body;
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("[Stripe] Payment succeeded:", paymentIntent.id);
        const metadata = paymentIntent.metadata || {};
        const tagCode = metadata.tagCode;
        const amountZAR = parseInt(metadata.amountZAR || "0");
        const donorEmail = metadata.donorEmail;
        const donorName = metadata.donorName;
        if (!tagCode || !amountZAR) {
          console.error("[Stripe] Missing required metadata. tagCode:", tagCode, "amountZAR:", amountZAR);
          return res.status(400).json({ error: "Missing required metadata" });
        }
        const tag = await storage.getTag(tagCode);
        if (!tag) {
          console.error("[Stripe] Tag not found:", tagCode);
          return res.status(404).json({ error: "Tag not found" });
        }
        const wallet = await storage.getWallet(tag.walletId);
        if (!wallet) {
          console.error("[Stripe] Wallet not found:", tag.walletId);
          return res.status(404).json({ error: "Wallet not found" });
        }
        const currentBalance = wallet.balanceZAR ?? 0;
        const newBalance = currentBalance + amountZAR;
        await storage.updateWalletBalance(wallet.id, newBalance);
        await storage.createTransaction({
          kind: "DONATION",
          fromWalletId: null,
          toWalletId: wallet.id,
          amount: amountZAR,
          ref: `Stripe payment: ${paymentIntent.id}`,
          donorEmail: donorEmail || null,
          donorName: donorName || null
        });
        console.log("[Stripe] Transaction created for tag:", tagCode, "Amount:", amountZAR);
        break;
      }
      default:
        console.log("[Stripe] Unhandled event type:", event.type);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook Demo] Error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
router9.post("/stripe/webhook", express9.raw({ type: "application/json" }), async (req, res) => {
  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    if (!endpointSecret || endpointSecret === "whsec_your_webhook_secret_here") {
      console.log("[Stripe Webhook] DEMO MODE - Skipping signature verification");
      const bodyString = Buffer.isBuffer(req.body) ? req.body.toString("utf-8") : JSON.stringify(req.body);
      event = JSON.parse(bodyString);
    } else {
      const sig = req.headers["stripe-signature"];
      if (!sig) {
        console.error("[Stripe Webhook] Missing stripe-signature header");
        return res.status(400).json({ error: "Missing signature" });
      }
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        apiVersion: "2024-11-20.acacia"
      });
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
      }
    }
    console.log("[Stripe Webhook] Event received:", event.type);
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("[Stripe] Payment succeeded:", paymentIntent.id);
        console.log("[Stripe] Full payment intent:", JSON.stringify(paymentIntent, null, 2));
        const metadata = paymentIntent.metadata || {};
        console.log("[Stripe] Metadata:", metadata);
        const tagCode = metadata.tagCode;
        const amountZAR = parseInt(metadata.amountZAR || "0");
        const donorEmail = metadata.donorEmail;
        const donorName = metadata.donorName;
        if (!tagCode || !amountZAR) {
          console.error("[Stripe] Missing required metadata. tagCode:", tagCode, "amountZAR:", amountZAR);
          return res.status(400).json({ error: "Missing required metadata" });
        }
        const tag = await storage.getTag(tagCode);
        if (!tag) {
          console.error("[Stripe] Tag not found:", tagCode);
          return res.status(404).json({ error: "Tag not found" });
        }
        const wallet = await storage.getWallet(tag.walletId);
        if (!wallet) {
          console.error("[Stripe] Wallet not found:", tag.walletId);
          return res.status(404).json({ error: "Wallet not found" });
        }
        const currentBalance = wallet.balanceZAR ?? 0;
        const newBalance = currentBalance + amountZAR;
        await storage.updateWalletBalance(wallet.id, newBalance);
        await storage.createTransaction({
          kind: "DONATION",
          fromWalletId: null,
          toWalletId: wallet.id,
          amount: amountZAR,
          ref: `Stripe payment: ${paymentIntent.id}`,
          donorEmail: donorEmail || null,
          donorName: donorName || null
        });
        console.log("[Stripe] Transaction created for tag:", tagCode, "Amount:", amountZAR);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.error("[Stripe] Payment failed:", paymentIntent.id, paymentIntent.last_payment_error?.message);
        const metadata = paymentIntent.metadata;
        if (metadata.tagCode) {
          const tag = await storage.getTag(metadata.tagCode);
          if (tag) {
            await storage.createTransaction({
              kind: "DONATION",
              fromWalletId: null,
              toWalletId: tag.walletId,
              amount: parseInt(metadata.amountZAR || "0"),
              ref: `Failed Stripe payment: ${paymentIntent.id}`
            });
          }
        }
        break;
      }
      case "charge.succeeded": {
        const charge = event.data.object;
        console.log("[Stripe] Charge succeeded:", charge.id);
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object;
        console.log("[Stripe] Charge refunded:", charge.id);
        const metadata = charge.metadata;
        if (metadata.tagCode && metadata.amountZAR) {
          const tag = await storage.getTag(metadata.tagCode);
          if (tag) {
            const wallet = await storage.getWallet(tag.walletId);
            if (wallet) {
              const refundAmount = parseInt(metadata.amountZAR);
              const newBalance = Math.max(0, wallet.balanceZAR - refundAmount);
              await storage.updateWalletBalance(wallet.id, newBalance);
              await storage.createTransaction({
                kind: "REFUND",
                fromWalletId: wallet.id,
                toWalletId: null,
                amount: refundAmount,
                ref: `Stripe refund: ${charge.id}`
              });
              console.log("[Stripe] Refund processed for tag:", metadata.tagCode);
            }
          }
        }
        break;
      }
      case "checkout.session.completed": {
        const session2 = event.data.object;
        console.log("[Stripe] Checkout session completed:", session2.id);
        break;
      }
      default:
        console.log("[Stripe] Unhandled event type:", event.type);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error processing webhook:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
var stripe_default = router9;

// routes/organizations.ts
import express10 from "express";
var router10 = express10.Router();
router10.get("/organizations/list", async (_req, res) => {
  try {
    const organizations2 = await storage.getAllOrganizations();
    res.json({ organizations: organizations2 });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router10.get("/organizations/:id", async (req, res) => {
  try {
    const organization = await storage.getOrganization(String(req.params.id));
    if (!organization) {
      return res.status(404).json({ error: "organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router10.get("/organizations/:id/tags", async (req, res) => {
  try {
    const tags2 = await storage.getTagsByOrganization(String(req.params.id));
    const tagsWithBalance = await Promise.all(
      tags2.map(async (tag) => {
        const wallet = await storage.getWallet(tag.walletId);
        return {
          tagCode: tag.tagCode,
          walletId: tag.walletId,
          beneficiaryType: tag.beneficiaryType,
          beneficiaryName: tag.beneficiaryName,
          issuedAt: tag.issuedAt,
          balanceZAR: wallet?.balanceZAR || 0
        };
      })
    );
    res.json({ tags: tagsWithBalance });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router10.post("/organizations/:id/issue-tag", async (req, res) => {
  try {
    const { tagCode, pin, beneficiaryType, beneficiaryName, beneficiaryEmail, beneficiaryPhone } = req.body || {};
    const organizationId = String(req.params.id);
    if (!tagCode || !pin || !beneficiaryType || !beneficiaryName) {
      return res.status(400).json({ error: "tagCode, pin, beneficiaryType, and beneficiaryName required" });
    }
    const organization = await storage.getOrganization(organizationId);
    if (!organization) {
      return res.status(404).json({ error: "organization not found" });
    }
    const existingTag = await storage.getTag(String(tagCode));
    if (existingTag) {
      return res.status(400).json({ error: "tag code already exists" });
    }
    const wallet = await storage.createWallet({
      type: "TAG",
      name: `Tag ${tagCode}`,
      balanceZAR: 0
    });
    let sumsubData = {};
    const sumsubClient2 = router10.get("sumsubClient");
    console.log("[Tag Issuance] Sumsub client available:", !!sumsubClient2);
    if (sumsubClient2) {
      try {
        const [firstName, ...lastNameParts] = String(beneficiaryName).split(" ");
        const lastName = lastNameParts.join(" ") || firstName;
        const applicant = await sumsubClient2.createApplicant({
          externalUserId: String(tagCode),
          email: beneficiaryEmail,
          phone: beneficiaryPhone,
          firstName,
          lastName
        });
        console.log("[Tag Issuance] Applicant created:", applicant.id);
        const tokenData = await sumsubClient2.generateAccessToken(
          applicant.id,
          String(tagCode)
        );
        const verificationUrl = sumsubClient2.getSdkUrl(applicant.id, tokenData.token);
        console.log("[Tag Issuance] Verification URL:", verificationUrl);
        sumsubData = {
          applicantId: applicant.id,
          accessToken: tokenData.token,
          verificationUrl
        };
      } catch (sumsubError) {
        console.error("Sumsub error during tag issuance:", sumsubError);
      }
    }
    const tag = await storage.createTag({
      tagCode: String(tagCode),
      walletId: wallet.id,
      pin: String(pin),
      organizationId,
      beneficiaryType: String(beneficiaryType),
      beneficiaryName: String(beneficiaryName),
      sumsubApplicantId: sumsubData.applicantId,
      verificationStatus: sumsubData.applicantId ? "pending" : void 0
    });
    res.json({
      ok: true,
      tag: {
        tagCode: tag.tagCode,
        walletId: wallet.id,
        beneficiaryType: tag.beneficiaryType,
        beneficiaryName: tag.beneficiaryName,
        issuedAt: tag.issuedAt,
        balanceZAR: 0
      },
      sumsub: sumsubData.applicantId ? {
        verificationUrl: sumsubData.verificationUrl,
        accessToken: sumsubData.accessToken,
        applicantId: sumsubData.applicantId
      } : void 0
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
router10.get("/organizations/:id/tree", async (req, res) => {
  try {
    const organizationId = String(req.params.id);
    const organization = await storage.getOrganization(organizationId);
    if (!organization) {
      return res.status(404).json({ error: "organization not found" });
    }
    const buildTree = async (orgId) => {
      const org = await storage.getOrganization(orgId);
      if (!org) return null;
      const children = await storage.getOrganizationsByParent(orgId);
      const tags2 = await storage.getTagsByOrganization(orgId);
      return {
        id: org.id,
        name: org.name,
        type: org.type,
        tagCount: tags2.length,
        children: await Promise.all(children.map((child) => buildTree(child.id)))
      };
    };
    const tree = await buildTree(organizationId);
    res.json(tree);
  } catch (error) {
    console.error("Get organization tree error:", error);
    res.status(500).json({ error: "internal server error" });
  }
});
router10.post("/organizations/:id/recover-pin", async (req, res) => {
  try {
    const { tagCode } = req.body || {};
    const organizationId = String(req.params.id);
    console.log("[PIN Recovery] Request:", { tagCode, organizationId });
    if (!tagCode) {
      return res.status(400).json({ error: "tagCode required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      console.log("[PIN Recovery] Tag not found:", tagCode);
      return res.status(404).json({ error: "tag not found" });
    }
    console.log("[PIN Recovery] Tag found:", { tagCode: tag.tagCode, orgId: tag.organizationId, applicantId: tag.sumsubApplicantId });
    if (tag.organizationId !== organizationId) {
      return res.status(403).json({ error: "unauthorized - tag belongs to different organization" });
    }
    const sumsubClient2 = router10.get("sumsubClient");
    if (!sumsubClient2) {
      console.log("[PIN Recovery] Sumsub client not available");
      return res.status(503).json({ error: "Sumsub not configured" });
    }
    if (!tag.sumsubApplicantId) {
      console.log("[PIN Recovery] Tag has no applicant ID");
      return res.status(400).json({ error: "Tag does not have biometric verification on file" });
    }
    const tokenData = await sumsubClient2.generateAccessToken(
      tag.sumsubApplicantId,
      tag.tagCode
    );
    const verificationUrl = sumsubClient2.getSdkUrl(tag.sumsubApplicantId, tokenData.token);
    console.log("[PIN Recovery] Verification URL generated:", verificationUrl);
    res.json({
      ok: true,
      verificationUrl,
      accessToken: tokenData.token,
      applicantId: tag.sumsubApplicantId
    });
  } catch (error) {
    console.error("PIN recovery error:", error);
    res.status(500).json({ error: "internal server error" });
  }
});
router10.post("/organizations/:id/reset-pin", async (req, res) => {
  try {
    const { tagCode, newPin } = req.body || {};
    const organizationId = String(req.params.id);
    if (!tagCode || !newPin) {
      return res.status(400).json({ error: "tagCode and newPin required" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "tag not found" });
    }
    if (tag.organizationId !== organizationId) {
      return res.status(403).json({ error: "unauthorized" });
    }
    if (tag.verificationStatus !== "approved") {
      return res.status(403).json({ error: "beneficiary must complete verification first" });
    }
    const updatedTag = await storage.updateTagPin(tag.tagCode, String(newPin));
    res.json({
      ok: true,
      message: "PIN successfully reset",
      tagCode: updatedTag.tagCode
    });
  } catch (error) {
    console.error("PIN reset error:", error);
    res.status(500).json({ error: "internal server error" });
  }
});
router10.post("/organizations/:id/give-to-tag", async (req, res) => {
  try {
    const { beneficiaryTagCode, amountZAR, donorName } = req.body || {};
    const organizationId = String(req.params.id);
    if (!beneficiaryTagCode || !amountZAR) {
      return res.status(400).json({ error: "beneficiaryTagCode and amountZAR required" });
    }
    const organization = await storage.getOrganization(organizationId);
    if (organization == null || organization === void 0) {
      return res.status(404).json({ error: "organization not found" });
    }
    const allTags = await storage.getAllTags();
    const organizationTag = allTags.find(
      (tag) => tag.organizationId === organizationId && tag.beneficiaryType === "organization"
    );
    if (!organizationTag) {
      return res.status(404).json({ error: "organization tag not found" });
    }
    const beneficiaryTag = await storage.getTag(String(beneficiaryTagCode));
    if (beneficiaryTag == null || beneficiaryTag === void 0) {
      return res.status(404).json({ error: "beneficiary tag not found" });
    }
    const orgWallet = await storage.getWallet(organizationTag.walletId);
    const beneficiaryWallet = await storage.getWallet(beneficiaryTag.walletId);
    if (!orgWallet || !beneficiaryWallet) {
      return res.status(404).json({ error: "wallet not found" });
    }
    const amountInCents = Math.round(Number(amountZAR) * 100);
    if (orgWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "insufficient organization balance" });
    }
    await storage.updateWalletBalance(orgWallet.id, orgWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(beneficiaryWallet.id, beneficiaryWallet.balanceZAR + amountInCents);
    const reference = donorName ? `Distribution from ${organization.name} (${donorName}) to ${beneficiaryTagCode}` : `Distribution from ${organization.name} to ${beneficiaryTagCode}`;
    await storage.createTransaction({
      kind: "DISTRIBUTION",
      fromWalletId: orgWallet.id,
      toWalletId: beneficiaryWallet.id,
      amount: amountInCents,
      reference
    });
    res.json({
      ok: true,
      newOrgBalance: orgWallet.balanceZAR - amountInCents,
      message: `Successfully transferred R ${amountZAR.toFixed(2)} to ${beneficiaryTag.beneficiaryName}`
    });
  } catch (error) {
    console.error("Organization give error:", error);
    res.status(500).json({ error: "internal server error" });
  }
});
var organizations_default = router10;

// routes/philanthropist.ts
import express11 from "express";
import bcrypt2 from "bcrypt";
var router11 = express11.Router();
router11.post("/philanthropist/signup", async (req, res) => {
  try {
    const bcrypt3 = await import("bcrypt");
    const { generateReferralCode: generateReferralCode2, calculateReferralReward: calculateReferralReward2 } = await Promise.resolve().then(() => (init_referral(), referral_exports));
    const { email, password, displayName, referredBy } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const existingPhilanthropist = await storage.getPhilanthropistByEmail(String(email));
    if (existingPhilanthropist) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt3.hash(String(password), 10);
    const wallet = await storage.createWallet({
      type: "PHILANTHROPIST",
      name: `${email}'s Wallet`,
      balanceZAR: 0
    });
    const referralCode = generateReferralCode2("PHILANTHROPIST", wallet.id);
    let validReferredBy = null;
    let referrer = null;
    if (referredBy) {
      referrer = await storage.lookupReferralCode(String(referredBy));
      if (referrer) {
        validReferredBy = String(referredBy);
      }
    }
    let blockkoinAccountId = null;
    let blockkoinKycStatus = "none";
    try {
      const account = await blockkoinClient.createAccount(
        String(email),
        displayName ? String(displayName) : String(email),
        void 0
      );
      blockkoinAccountId = account.id;
      blockkoinKycStatus = account.kycStatus;
    } catch (error) {
      console.error("[Philanthropist Signup] Blockkoin account creation failed:", error);
    }
    const philanthropist = await storage.createPhilanthropist({
      email: String(email),
      passwordHash,
      displayName: displayName ? String(displayName) : null,
      walletId: wallet.id,
      isAnonymous: 1,
      country: null,
      referralCode,
      referredBy: validReferredBy,
      blockkoinAccountId: blockkoinAccountId || null,
      blockkoinKycStatus: blockkoinKycStatus || "none"
    });
    if (referrer && validReferredBy) {
      const rewardAmount = calculateReferralReward2(referrer.type, "PHILANTHROPIST");
      let rewardPaid = 0;
      if (referrer.walletId) {
        try {
          const referrerWallet = await storage.getWallet(referrer.walletId);
          if (referrerWallet) {
            await storage.updateWalletBalance(referrer.walletId, referrerWallet.balanceZAR + rewardAmount);
            rewardPaid = 1;
          }
        } catch (error) {
          console.error("Failed to pay referral reward:", error);
        }
      }
      await storage.createReferral({
        referrerCode: validReferredBy,
        referrerType: referrer.type,
        referredCode: referralCode,
        referredType: "PHILANTHROPIST",
        rewardAmount,
        rewardPaid
      });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.philanthropistAuth = {
        philanthropistId: philanthropist.id,
        email: philanthropist.email
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          id: philanthropist.id,
          email: philanthropist.email,
          displayName: philanthropist.displayName,
          walletId: philanthropist.walletId,
          referralCode: philanthropist.referralCode
        });
      });
    });
  } catch (error) {
    console.error("Philanthropist signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const philanthropist = await storage.getPhilanthropistByEmail(String(email));
    if (!philanthropist) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt2.compare(String(password), philanthropist.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ error: "Session error" });
      }
      req.session.philanthropistAuth = {
        philanthropistId: philanthropist.id,
        email: philanthropist.email
      };
      req.session.save((err2) => {
        if (err2) {
          return res.status(500).json({ error: "Session save error" });
        }
        res.json({
          id: philanthropist.id,
          email: philanthropist.email,
          displayName: philanthropist.displayName,
          walletId: philanthropist.walletId,
          referralCode: philanthropist.referralCode
        });
      });
    });
  } catch (error) {
    console.error("Philanthropist login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ success: true });
  });
});
router11.get("/philanthropist/me", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const wallet = await storage.getWallet(philanthropist.walletId);
    res.json({
      id: philanthropist.id,
      email: philanthropist.email,
      displayName: philanthropist.displayName,
      bio: philanthropist.bio,
      walletId: philanthropist.walletId,
      // balanceZAR: wallet?.balanceZAR || 0,
      balanceZAR: wallet ? wallet.balanceZar : 0,
      isAnonymous: philanthropist.isAnonymous,
      referralCode: philanthropist.referralCode,
      country: philanthropist.country,
      blockkoinAccountId: philanthropist.blockkoinAccountId,
      blockkoinKycStatus: philanthropist.blockkoinKycStatus
    });
  } catch (error) {
    console.error("Get philanthropist error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/fund", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { crypto: crypto4, amountCrypto } = req.body || {};
    if (!crypto4 || amountCrypto === void 0 || amountCrypto === null || amountCrypto <= 0) {
      return res.status(400).json({ error: "Crypto type and amount required" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const amountZAR = convertCryptoToZAR(String(crypto4), Number(amountCrypto));
    const wallet = await storage.getWallet(philanthropist.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const newBalance = wallet.balanceZar + amountZAR * 100;
    await storage.updateWalletBalance(wallet.id, newBalance);
    await storage.createTransaction({
      kind: "CRYPTO_FUND",
      fromWalletId: null,
      toWalletId: wallet.id,
      amount: amountZAR * 100,
      ref: `Crypto funding: ${amountCrypto} ${crypto4}`
    });
    res.json({ success: true, newBalance, amountZAR });
  } catch (error) {
    console.error("Fund philanthropist error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/fund-fiat", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { method, amountZAR } = req.body || {};
    if (!method || amountZAR === void 0 || amountZAR === null || amountZAR <= 0) {
      return res.status(400).json({ error: "Payment method and amount required" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const wallet = await storage.getWallet(philanthropist.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const amount = Number(amountZAR);
    const newBalance = wallet.balanceZar + amount * 100;
    await storage.updateWalletBalance(wallet.id, newBalance);
    const methodLabel = method === "card" ? "Instant Card" : "Bank Transfer (EFT)";
    await storage.createTransaction({
      kind: "FIAT_FUND",
      fromWalletId: null,
      toWalletId: wallet.id,
      amount: amount * 100,
      ref: `Fiat funding via Blockkoin (${methodLabel})`
    });
    res.json({ success: true, newBalance, amountZAR: amount });
  } catch (error) {
    console.error("Fiat fund philanthropist error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.get("/philanthropist/organizations", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const tags2 = await storage.getAllTags();
    const organizations2 = tags2.map((tag) => ({
      tagCode: tag.tagCode,
      name: tag.beneficiaryName,
      description: tag.description || "",
      type: tag.beneficiaryType
    }));
    res.json({ organizations: organizations2 });
  } catch (error) {
    console.error("List organizations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/give", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { tagCode, amountZAR, donorName } = req.body || {};
    if (!tagCode || !amountZAR) {
      return res.status(400).json({ error: "Tag code and amount required" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const tag = await storage.getTag(String(tagCode));
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const fromWallet = await storage.getWallet(philanthropist.walletId);
    const toWallet = await storage.getWallet(tag.walletId);
    if (!fromWallet || !toWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const amount = Number(amountZAR);
    const amountInCents = amount * 100;
    if (fromWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    await storage.updateWalletBalance(fromWallet.id, fromWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + amountInCents);
    const donationRef = donorName ? `Donation from ${donorName} to ${tag.tagCode}` : `Anonymous donation to ${tag.tagCode}`;
    const transaction = await storage.createTransaction({
      kind: "PHILANTHROPIST_DONATION",
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
      amount: amountInCents,
      ref: donationRef
    });
    res.json({ success: true, amountZAR: amount, transaction });
  } catch (error) {
    console.error("Give philanthropist error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/spend", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { outletId, amountZAR } = req.body || {};
    if (!outletId || !amountZAR) {
      return res.status(400).json({ error: "Outlet ID and amount required" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    let outlet = await storage.getMerchantOutletByCode(String(outletId));
    if (!outlet) {
      outlet = await storage.getMerchantOutlet(String(outletId));
    }
    if (!outlet) {
      return res.status(404).json({ error: "Merchant outlet not found" });
    }
    const fromWallet = await storage.getWallet(philanthropist.walletId);
    const toWallet = await storage.getWallet(outlet.walletId);
    if (!fromWallet || !toWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const amount = Number(amountZAR);
    const amountInCents = amount * 100;
    if (fromWallet.balanceZAR < amountInCents) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    await storage.updateWalletBalance(fromWallet.id, fromWallet.balanceZAR - amountInCents);
    await storage.updateWalletBalance(toWallet.id, toWallet.balanceZAR + amountInCents);
    await storage.createTransaction({
      kind: "PHILANTHROPIST_SPEND",
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
      amount: amountInCents,
      ref: `Payment to ${outlet.name}`
    });
    res.json({ success: true, amountZAR: amount });
  } catch (error) {
    console.error("Spend philanthropist error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.post("/philanthropist/recurring-donations", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const { recipientType, recipientId, amountUSD, cryptocurrency, donorName, autoDonatesDust, dustThresholdUSD } = req.body || {};
    if (!recipientType || !recipientId || !amountUSD || !cryptocurrency) {
      return res.status(400).json({ error: "Recipient type, recipient ID, amount, and cryptocurrency required" });
    }
    if (recipientType === "TAG") {
      const tag = await storage.getTag(recipientId);
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
    } else if (recipientType === "ORGANIZATION") {
      const org = await storage.getOrganization(recipientId);
      if (!org) {
        return res.status(404).json({ error: "Organization not found" });
      }
    }
    const nextDate = /* @__PURE__ */ new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    nextDate.setDate(1);
    nextDate.setHours(0, 0, 0, 0);
    const donation = await storage.createRecurringDonation({
      philanthropistId: philanthropist.id,
      recipientType,
      recipientId,
      amountCents: Math.round(Number(amountUSD) * 100),
      // USD cents
      cryptocurrency: cryptocurrency || "USDT",
      frequency: "monthly",
      status: "active",
      autoDonatesDust: autoDonatesDust ? 1 : 0,
      dustThresholdCents: dustThresholdUSD ? Math.round(Number(dustThresholdUSD) * 100) : 100,
      donorName: donorName || null,
      nextProcessingDate: nextDate
    });
    res.json({ success: true, donation });
  } catch (error) {
    console.error("Create recurring donation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.get("/philanthropist/recurring-donations", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const donations = await storage.getRecurringDonationsByPhilanthropist(philanthropist.id);
    res.json(donations);
  } catch (error) {
    console.error("Get recurring donations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router11.patch("/philanthropist/recurring-donations/:id", async (req, res) => {
  try {
    if (!req.session.philanthropistAuth) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const philanthropist = await storage.getPhilanthropist(req.session.philanthropistAuth.philanthropistId);
    if (!philanthropist) {
      return res.status(404).json({ error: "Philanthropist not found" });
    }
    const donation = await storage.getRecurringDonation(req.params.id);
    if (!donation || donation.philanthropistId !== philanthropist.id) {
      return res.status(404).json({ error: "Recurring donation not found" });
    }
    const { status } = req.body || {};
    if (!status || !["active", "paused", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Valid status required (active, paused, cancelled)" });
    }
    const updated = await storage.updateRecurringDonationStatus(req.params.id, status);
    res.json({ success: true, donation: updated });
  } catch (error) {
    console.error("Update recurring donation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var philanthropist_default = router11;

// routes/disasterCampaigns.ts
import express12 from "express";
var router12 = express12.Router();
router12.get("/disaster-campaigns/current", async (req, res) => {
  try {
    const currentMonthYear = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const userId = req.session.userAuth?.userId;
    const campaigns = await storage.getDisasterCampaignsByMonth(currentMonthYear);
    const totalDustUsd = await storage.getTotalDustyBinForMonth(currentMonthYear);
    const enrichedCampaigns = await Promise.all(campaigns.map(async (campaign) => {
      const org = await storage.getOrganizationById(campaign.organizationId);
      const userHasVoted = userId ? await storage.hasUserVotedForCampaign(userId, campaign.id) : false;
      return {
        ...campaign,
        organization: org,
        userHasVoted
      };
    }));
    res.json({
      campaigns: enrichedCampaigns,
      totalDustUsd
    });
  } catch (error) {
    console.error("Get disaster campaigns error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router12.post("/disaster-campaigns/:id/vote", async (req, res) => {
  try {
    const userId = req.session.userAuth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const campaignId = String(req.params.id);
    const currentMonthYear = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const campaign = await storage.getDisasterCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    if (campaign.status !== "active") {
      return res.status(400).json({ error: "Campaign is not active" });
    }
    const hasVoted = await storage.hasUserVotedForCampaign(userId, campaignId);
    if (hasVoted) {
      return res.status(400).json({ error: "You have already voted for this campaign" });
    }
    await storage.createCampaignVote({
      userId,
      campaignId,
      monthYear: currentMonthYear
    });
    await storage.incrementCampaignVotes(campaignId);
    res.json({ success: true });
  } catch (error) {
    console.error("Vote for campaign error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router12.post("/disaster-campaigns", async (req, res) => {
  try {
    const userId = req.session.userAuth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const userRole = await storage.getUserRoleByUserId(userId, "ORGANIZATION");
    if (!userRole) {
      return res.status(403).json({ error: "Organization access required" });
    }
    const org = await storage.getOrganizationById(userRole.entityId);
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }
    if (!org.smartContractAddress) {
      return res.status(403).json({
        error: "Smart contract verification required. Only blockchain-verified organizations can participate in Dusty Bin disaster relief."
      });
    }
    const { title, description, disasterType, location, urgencyLevel } = req.body;
    const currentMonthYear = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const campaign = await storage.createDisasterCampaign({
      organizationId: org.id,
      title,
      description,
      disasterType,
      location,
      urgencyLevel,
      monthYear: currentMonthYear
    });
    res.json(campaign);
  } catch (error) {
    console.error("Create disaster campaign error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var disasterCampaigns_default = router12;

// routes/leaderboards.ts
import express13 from "express";
var router13 = express13.Router();
router13.get("/leaderboards/organizations", async (_req, res) => {
  try {
    const orgs = await storage.getAllOrganizations();
    const verifiedOrgs = orgs.filter((org) => org.smartContractAddress);
    const leaderboard = await Promise.all(
      verifiedOrgs.map(async (org) => {
        const tags2 = await storage.getTagsByOrganization(org.id);
        let totalDonations = 0;
        const allTransactions = await storage.getAllTransactions();
        for (const tag of tags2) {
          const wallet = await storage.getWallet(tag.walletId);
          if (wallet) {
            const donations = allTransactions.filter((t) => t.toWalletId === wallet.id && (t.kind === "GIVE" || t.kind === "DONOR")).reduce((sum, t) => sum + t.amount, 0);
            totalDonations += donations;
          }
        }
        return {
          id: org.id,
          name: org.name,
          smartContractAddress: org.smartContractAddress,
          blockchainNetwork: org.blockchainNetwork || "Ethereum",
          totalDonations,
          tagCount: tags2.length
        };
      })
    );
    const sorted = leaderboard.sort((a, b) => b.totalDonations - a.totalDonations);
    res.json({ organizations: sorted.slice(0, 10) });
  } catch (error) {
    console.error("Organizations leaderboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router13.get("/leaderboards/tags", async (_req, res) => {
  try {
    const allTags = await storage.getAllTags();
    const allTransactions = await storage.getAllTransactions();
    const leaderboard = await Promise.all(
      allTags.map(async (tag) => {
        const wallet = await storage.getWallet(tag.walletId);
        let totalReceived = 0;
        if (wallet) {
          totalReceived = allTransactions.filter((t) => t.toWalletId === wallet.id && (t.kind === "GIVE" || t.kind === "DONOR")).reduce((sum, t) => sum + t.amount, 0);
        }
        let organization = null;
        if (tag.organizationId) {
          organization = await storage.getOrganization(tag.organizationId);
        }
        return {
          tagCode: tag.tagCode,
          beneficiaryName: tag.beneficiaryName || "Anonymous",
          beneficiaryType: tag.beneficiaryType,
          totalReceived,
          organizationName: organization?.name,
          smartContractVerified: !!organization?.smartContractAddress
        };
      })
    );
    const sorted = leaderboard.sort((a, b) => b.totalReceived - a.totalReceived);
    res.json({ tags: sorted.slice(0, 10) });
  } catch (error) {
    console.error("Tags leaderboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router13.get("/leaderboards/philanthropists", async (_req, res) => {
  try {
    const allPhilanthropists = await storage.getAllPhilanthropists();
    const allTransactions = await storage.getAllTransactions();
    const publicPhilanthropists = allPhilanthropists.filter((p) => !p.isAnonymous);
    const leaderboard = await Promise.all(
      publicPhilanthropists.map(async (phil) => {
        const wallet = await storage.getWallet(phil.walletId);
        let totalGiven = 0;
        if (wallet) {
          totalGiven = allTransactions.filter((t) => t.fromWalletId === wallet.id && t.kind === "GIVE").reduce((sum, t) => sum + t.amount, 0);
        }
        return {
          id: phil.id,
          displayName: phil.displayName || "Anonymous Donor",
          totalGiven,
          country: phil.country
        };
      })
    );
    const sorted = leaderboard.sort((a, b) => b.totalGiven - a.totalGiven);
    res.json({ philanthropists: sorted.slice(0, 10) });
  } catch (error) {
    console.error("Philanthropists leaderboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var leaderboards_default = router13;

// routes/stories.ts
import express14 from "express";
var router14 = express14.Router();
router14.post("/stories", async (req, res) => {
  try {
    const { transactionId, authorType, message, photoUrl, isPublic, showAmount, showGiver, showRecipient, sharingPlatforms } = req.body || {};
    if (!transactionId || !authorType || !message) {
      return res.status(400).json({ error: "Transaction ID, author type, and message required" });
    }
    const story = await storage.createStory({
      transactionId: String(transactionId),
      authorType,
      message,
      photoUrl: photoUrl || null,
      isPublic: isPublic !== false ? 1 : 0,
      showAmount: showAmount !== false ? 1 : 0,
      showGiver: showGiver !== false ? 1 : 0,
      showRecipient: showRecipient !== false ? 1 : 0,
      sharingPlatforms: Array.isArray(sharingPlatforms) ? sharingPlatforms : []
    });
    res.json(story);
  } catch (error) {
    console.error("Create story error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router14.get("/stories/public", async (req, res) => {
  try {
    const stories2 = await storage.getAllPublicStories();
    res.json(stories2);
  } catch (error) {
    console.error("Get public stories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router14.get("/stories/transaction/:transactionId", async (req, res) => {
  try {
    const story = await storage.getStoryByTransaction(String(req.params.transactionId));
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    console.error("Get story by transaction error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var stories_default = router14;

// routes/whatsapp.ts
import express15 from "express";
var router15 = express15.Router();
router15.post("/whatsapp/contacts", async (req, res) => {
  try {
    const { phoneNumber, name, tags: tags2, notes } = req.body || {};
    if (!phoneNumber || !name) {
      return res.status(400).json({ error: "Phone number and name required" });
    }
    const contact = await storage.createWhatsappContact({
      phoneNumber,
      name,
      tags: tags2 || [],
      notes: notes || null,
      lastContactedAt: /* @__PURE__ */ new Date()
    });
    res.json(contact);
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/contacts", async (_req, res) => {
  try {
    const contacts = await storage.getAllWhatsappContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/contacts/:id", async (req, res) => {
  try {
    const contact = await storage.getWhatsappContact(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.patch("/whatsapp/contacts/:id", async (req, res) => {
  try {
    const updated = await storage.updateWhatsappContact(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.post("/whatsapp/conversations", async (req, res) => {
  try {
    const { contactId } = req.body || {};
    if (!contactId) {
      return res.status(400).json({ error: "Contact ID required" });
    }
    const conversation = await storage.createWhatsappConversation({
      contactId,
      status: "active",
      lastMessageAt: /* @__PURE__ */ new Date()
    });
    res.json(conversation);
  } catch (error) {
    console.error("Create conversation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/conversations", async (_req, res) => {
  try {
    const conversations = await storage.getAllWhatsappConversations();
    res.json(conversations);
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/conversations/:id", async (req, res) => {
  try {
    const conversation = await storage.getWhatsappConversation(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.post("/whatsapp/messages", async (req, res) => {
  try {
    const { conversationId, content, sender, messageType } = req.body || {};
    if (!conversationId || !content || !sender) {
      return res.status(400).json({ error: "Conversation ID, content, and sender required" });
    }
    const message = await storage.createWhatsappMessage({
      conversationId,
      content,
      sender,
      messageType: messageType || "text",
      status: "sent"
    });
    await storage.updateWhatsappConversation(conversationId, {
      lastMessageAt: /* @__PURE__ */ new Date()
    });
    res.json(message);
  } catch (error) {
    console.error("Create message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/messages/:conversationId", async (req, res) => {
  try {
    const messages = await storage.getWhatsappMessagesByConversation(req.params.conversationId);
    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.post("/whatsapp/chatbot", async (req, res) => {
  try {
    const { conversationId, userMessage } = req.body || {};
    if (!conversationId || !userMessage) {
      return res.status(400).json({ error: "Conversation ID and user message required" });
    }
    let botResponse = "";
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes("donate") || lowerMsg.includes("donation")) {
      botResponse = "To make a donation, simply scan the QR code of a Freedom Tag or visit our website. You can donate using crypto or fiat currency. Would you like to know more about our verified charities?";
    } else if (lowerMsg.includes("tag") || lowerMsg.includes("freedom tag")) {
      botResponse = "Freedom Tags are blockchain-verified donation cards that help beneficiaries receive transparent, traceable support. Each tag has a unique QR code for instant donations. Want to create a tag for someone in need?";
    } else if (lowerMsg.includes("charity") || lowerMsg.includes("organization")) {
      botResponse = "We work with smart contract-verified charities to ensure 100% transparency. Every donation is tracked on the blockchain. You can see all verified charities on our website. Would you like to see the list?";
    } else if (lowerMsg.includes("help") || lowerMsg.includes("support")) {
      botResponse = "I can help you with:\n\u2022 Making donations\n\u2022 Creating Freedom Tags\n\u2022 Finding verified charities\n\u2022 Understanding blockchain verification\n\u2022 Ticket support\n\nWhat would you like to know more about?";
    } else if (lowerMsg.includes("ticket") || lowerMsg.includes("issue")) {
      botResponse = "I can create a support ticket for you. Please provide details about your issue and our team will assist you within 24 hours.";
    } else {
      botResponse = "Thanks for your message! I'm the Blockkoin Freedom Tag assistant. I can help you with donations, Freedom Tags, verified charities, and support. How can I assist you today?";
    }
    const message = await storage.createWhatsappMessage({
      conversationId,
      content: botResponse,
      sender: "bot",
      messageType: "text",
      status: "sent"
    });
    await storage.updateWhatsappConversation(conversationId, {
      lastMessageAt: /* @__PURE__ */ new Date()
    });
    res.json(message);
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.post("/whatsapp/tickets", async (req, res) => {
  try {
    const { contactId, subject, description, priority } = req.body || {};
    if (!contactId || !subject || !description) {
      return res.status(400).json({ error: "Contact ID, subject, and description required" });
    }
    const ticket = await storage.createWhatsappTicket({
      contactId,
      subject,
      description,
      priority: priority || "medium",
      status: "open"
    });
    res.json(ticket);
  } catch (error) {
    console.error("Create ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/tickets", async (_req, res) => {
  try {
    const tickets = await storage.getAllWhatsappTickets();
    res.json(tickets);
  } catch (error) {
    console.error("Get tickets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.get("/whatsapp/tickets/:id", async (req, res) => {
  try {
    const ticket = await storage.getWhatsappTicket(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Get ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router15.patch("/whatsapp/tickets/:id", async (req, res) => {
  try {
    const updated = await storage.updateWhatsappTicket(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Update ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var whatsapp_default = router15;

// routes/user.ts
import express16 from "express";
var router16 = express16.Router();
router16.get("/api/user/dashboard/:tagCode", async (req, res) => {
  try {
    const tagCode = req.params.tagCode;
    if (!req.session.donorAuth || req.session.donorAuth.tagCode !== tagCode) {
      return res.status(401).json({ error: "Not authenticated or unauthorized" });
    }
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    const allTransactions = await storage.getAllTransactions();
    const donationsMade = allTransactions.filter(
      (tx) => (tx.kind === "DONATION" || tx.kind === "PHILANTHROPIST_DONATION") && tx.donorTagCode === tagCode
    );
    const donationsReceived = allTransactions.filter(
      (tx) => (tx.kind === "DONATION" || tx.kind === "PHILANTHROPIST_DONATION") && tx.toWalletId === wallet?.id
    );
    const totalGiven = donationsMade.reduce((sum, tx) => sum + tx.amount, 0);
    const totalReceived = donationsReceived.reduce((sum, tx) => sum + tx.amount, 0);
    let recurringDonations2 = [];
    if (tag.userId) {
      recurringDonations2 = await storage.getRecurringDonationsByPhilanthropist(tag.userId);
    }
    let organization = null;
    if (tag.organizationId) {
      organization = await storage.getOrganization(tag.organizationId);
    }
    res.json({
      tag: {
        tagCode: tag.tagCode,
        beneficiaryName: tag.beneficiaryName,
        beneficiaryType: tag.beneficiaryType,
        description: tag.description,
        website: tag.website,
        facebook: tag.facebook,
        twitter: tag.twitter,
        instagram: tag.instagram,
        linkedin: tag.linkedin,
        logoUrl: tag.logoUrl,
        referralCode: tag.referralCode
      },
      wallet: {
        id: wallet?.id,
        balance: wallet?.balanceZAR || 0
      },
      stats: {
        totalGiven,
        totalReceived,
        donationsMadeCount: donationsMade.length,
        donationsReceivedCount: donationsReceived.length
      },
      organization,
      recurringDonationsCount: recurringDonations2.length
    });
  } catch (error) {
    console.error("Get user dashboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router16.get("/api/user/activity/:tagCode", async (req, res) => {
  try {
    const tagCode = req.params.tagCode;
    if (!req.session.donorAuth || req.session.donorAuth.tagCode !== tagCode) {
      return res.status(401).json({ error: "Not authenticated or unauthorized" });
    }
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    const allTransactions = await storage.getAllTransactions();
    const userTransactions = allTransactions.filter(
      (tx) => tx.fromWalletId === wallet?.id || tx.toWalletId === wallet?.id || tx.donorTagCode === tagCode
    );
    const enrichedActivity = await Promise.all(
      userTransactions.map(async (tx) => {
        let fromInfo = null;
        let toInfo = null;
        if (tx.fromWalletId) {
          const fromWallet = await storage.getWallet(tx.fromWalletId);
          const allTags = await storage.getAllTags();
          const fromTag = fromWallet ? allTags.find((t) => t.walletId === fromWallet.id) : null;
          if (fromTag) {
            fromInfo = {
              tagCode: fromTag.tagCode,
              beneficiaryName: fromTag.beneficiaryName
            };
          }
        }
        if (tx.toWalletId) {
          const toWallet = await storage.getWallet(tx.toWalletId);
          const allTags = await storage.getAllTags();
          const toTag = toWallet ? allTags.find((t) => t.walletId === toWallet.id) : null;
          if (toTag) {
            toInfo = {
              tagCode: toTag.tagCode,
              beneficiaryName: toTag.beneficiaryName
            };
          }
        }
        return {
          id: tx.id,
          ts: tx.ts,
          kind: tx.kind,
          amount: tx.amount,
          currency: tx.currency || "ZAR",
          ref: tx.ref,
          donorName: tx.donorName,
          donorEmail: tx.donorEmail,
          donorTagCode: tx.donorTagCode,
          blockchainTxHash: tx.blockchainTxHash,
          blockchainNetwork: tx.blockchainNetwork,
          fromInfo,
          toInfo,
          direction: tx.donorTagCode === tagCode ? "sent" : tx.toWalletId === wallet?.id ? "received" : "other"
        };
      })
    );
    enrichedActivity.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    res.json({ activity: enrichedActivity });
  } catch (error) {
    console.error("Get user activity error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router16.get("/api/user/recurring-donations/:tagCode", async (req, res) => {
  try {
    const tagCode = req.params.tagCode;
    if (!req.session.donorAuth || req.session.donorAuth.tagCode !== tagCode) {
      return res.status(401).json({ error: "Not authenticated or unauthorized" });
    }
    const tag = await storage.getTag(tagCode);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    if (!tag.userId) {
      return res.json({ recurringDonations: [] });
    }
    const philanthropist = await storage.getPhilanthropistByUserId(tag.userId);
    if (!philanthropist) {
      return res.json({ recurringDonations: [] });
    }
    const donations = await storage.getRecurringDonationsByPhilanthropist(philanthropist.id);
    const enrichedDonations = await Promise.all(
      donations.map(async (donation) => {
        let recipientInfo = null;
        if (donation.recipientType === "TAG") {
          const recipientTag = await storage.getTag(donation.recipientId);
          if (recipientTag) {
            recipientInfo = {
              type: "tag",
              tagCode: recipientTag.tagCode,
              beneficiaryName: recipientTag.beneficiaryName
            };
          }
        } else if (donation.recipientType === "ORGANIZATION") {
          const org = await storage.getOrganization(donation.recipientId);
          if (org) {
            recipientInfo = {
              type: "organization",
              name: org.name,
              smartContractAddress: org.smartContractAddress
            };
          }
        }
        return {
          ...donation,
          recipientInfo
        };
      })
    );
    res.json({ recurringDonations: enrichedDonations });
  } catch (error) {
    console.error("Get recurring donations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router16.patch("/api/user/recurring-donations/:id", async (req, res) => {
  try {
    const donation = await storage.getRecurringDonation(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Recurring donation not found" });
    }
    const philanthropist = await storage.getPhilanthropist(donation.philanthropistId);
    if (!philanthropist || !philanthropist.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const allTags = await storage.getAllTags();
    const userTag = allTags.find((t) => t.userId === philanthropist.userId);
    if (!userTag || !req.session.donorAuth || req.session.donorAuth.tagCode !== userTag.tagCode) {
      return res.status(401).json({ error: "Not authenticated or unauthorized" });
    }
    const { status } = req.body || {};
    if (!status || !["active", "paused", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Valid status required (active, paused, cancelled)" });
    }
    const updated = await storage.updateRecurringDonationStatus(req.params.id, status);
    res.json({ success: true, donation: updated });
  } catch (error) {
    console.error("Update recurring donation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var user_default = router16;

// routes/charity.ts
import express17 from "express";
var router17 = express17.Router();
router17.post("/charity/signup", async (req, res) => {
  try {
    const bcrypt3 = await import("bcrypt");
    const { generateReferralCode: generateReferralCode2, calculateReferralReward: calculateReferralReward2 } = await Promise.resolve().then(() => (init_referral(), referral_exports));
    const {
      organizationName,
      email,
      password,
      description,
      website,
      facebook,
      twitter,
      instagram,
      linkedin,
      logoUrl,
      referralCode: referredBy
    } = req.body || {};
    if (!organizationName || !email || !password) {
      return res.status(400).json({ error: "Organization name, email, and password required" });
    }
    const existingOrg = await storage.getOrganizationByEmail(String(email));
    if (existingOrg) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt3.hash(String(password), 10);
    const wallet = await storage.createWallet({
      type: "TAG",
      name: `${organizationName} Wallet`,
      balanceZAR: 0
    });
    const orgId = `ORG${Date.now()}`;
    const tagCode = `CH${orgId.slice(-6).toUpperCase()}`;
    const orgReferralCode = generateReferralCode2("ORGANIZATION", wallet.id);
    let validReferredBy = null;
    let referrer = null;
    if (referredBy) {
      referrer = await storage.lookupReferralCode(String(referredBy));
      if (referrer) {
        validReferredBy = String(referredBy);
      }
    }
    const organization = await storage.createOrganization({
      name: String(organizationName),
      type: "charity",
      country: null,
      taxId: null,
      charityRegistrationNumber: null,
      taxExemptStatus: "pending",
      referralCode: orgReferralCode,
      referredBy: validReferredBy,
      website: website || null,
      facebook: facebook || null,
      twitter: twitter || null,
      instagram: instagram || null,
      linkedin: linkedin || null,
      description: description || null,
      logoUrl: logoUrl || null,
      email: String(email),
      passwordHash
    });
    const tag = await storage.createTag({
      tagCode,
      walletId: wallet.id,
      pin: null,
      organizationId: organization.id,
      beneficiaryType: "charity",
      beneficiaryName: String(organizationName),
      verificationStatus: "pending",
      referralCode: orgReferralCode,
      // Same referral code as org
      referredBy: validReferredBy,
      website: website || null,
      facebook: facebook || null,
      twitter: twitter || null,
      instagram: instagram || null,
      linkedin: linkedin || null,
      description: description || null,
      logoUrl: logoUrl || null
    });
    if (referrer && validReferredBy) {
      const referrerReward = calculateReferralReward2(referrer.type, "ORGANIZATION");
      const refereeReward = 2e3;
      let rewardPaid = 0;
      if (referrer.walletId) {
        try {
          const referrerWallet = await storage.getWallet(referrer.walletId);
          if (referrerWallet) {
            await storage.updateWalletBalance(referrer.walletId, referrerWallet.balanceZAR + referrerReward);
            await storage.updateWalletBalance(wallet.id, wallet.balanceZAR + refereeReward);
            rewardPaid = 1;
          }
        } catch (error) {
          console.error("Failed to pay referral reward:", error);
        }
      }
      await storage.createReferral({
        referrerCode: validReferredBy,
        referrerType: referrer.type,
        referredCode: orgReferralCode,
        referredType: "ORGANIZATION",
        rewardAmount: referrerReward,
        rewardPaid
      });
    }
    res.json({
      organizationId: organization.id,
      tagCode: tag.tagCode,
      referralCode: orgReferralCode,
      walletId: wallet.id
    });
  } catch (error) {
    console.error("Charity signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router17.post("/charity/login", async (req, res) => {
  try {
    const bcrypt3 = await import("bcrypt");
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const organization = await storage.getOrganizationByEmail(String(email));
    if (!organization) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (!organization.passwordHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt3.compare(String(password), String(organization.passwordHash));
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const tags2 = await storage.getTagsByOrganization(organization.id);
    const primaryTag = tags2.find((t) => t.beneficiaryType === "charity" || t.beneficiaryType === "organization");
    let walletInfo = null;
    if (primaryTag?.walletId) {
      const wallet = await storage.getWallet(primaryTag.walletId);
      if (wallet) {
        walletInfo = {
          walletId: wallet.id,
          balanceZAR: wallet.balanceZAR
        };
      }
    }
    try {
      req.session.regenerate(() => {
        req.session.organizationAuth = {
          organizationId: organization.id,
          email: organization.email,
          name: organization.name
        };
        req.session.save(() => {
        });
      });
    } catch (_) {
    }
    return res.json({
      organizationId: organization.id,
      organizationName: organization.name,
      tagCode: primaryTag?.tagCode || null,
      referralCode: organization.referralCode || null,
      wallet: walletInfo
    });
  } catch (error) {
    console.error("Charity login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router17.get("/charity/credibility/:charityCode", async (req, res) => {
  try {
    const { charityCode } = req.params;
    const referralCode = req.query.ref;
    const tags2 = await storage.getAllTags();
    const tag = tags2.find(
      (t) => t.tagCode === charityCode || t.organizationId === charityCode || t.referralCode === charityCode
    );
    if (!tag || !tag.organizationId) {
      return res.status(404).json({ error: "Charity not found" });
    }
    const organization = await storage.getOrganization(tag.organizationId);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    const wallet = await storage.getWallet(tag.walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const allTransactions = await storage.getAllTransactions();
    const charityTransactions = allTransactions.filter(
      (tx) => tx.toWalletId === tag.walletId && (tx.kind === "DONATION" || tx.kind === "PHILANTHROPIST_DONATION" || tx.kind === "CRYPTO_FUND" || tx.kind === "FIAT_FUND")
    );
    const totalDonations = charityTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const donationCount = charityTransactions.length;
    const recentDonations = charityTransactions.sort((a, b) => new Date(b.ts || "").getTime() - new Date(a.ts || "").getTime()).slice(0, 10).map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      date: tx.ts ? new Date(tx.ts).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
      fromPhilanthropist: tx.fromWalletId ? "Anonymous Donor" : void 0,
      fromAnonymous: true
    }));
    let referrer = null;
    if (referralCode) {
      const referrerData = await storage.lookupReferralCode(referralCode);
      if (referrerData) {
        const referrerDonations = charityTransactions.filter(
          (tx) => tx.fromWalletId === referrerData.walletId
        );
        const totalDonated = referrerDonations.reduce((sum, tx) => sum + tx.amountZAR, 0);
        referrer = {
          name: referrerData.type === "PHILANTHROPIST" ? "Anonymous Philanthropist" : referrerData.name || "Unknown",
          type: referrerData.type,
          totalDonated
        };
      }
    }
    res.json({
      organization: {
        id: organization.id,
        name: organization.name,
        description: organization.description,
        website: organization.website,
        facebook: organization.facebook,
        twitter: organization.twitter,
        instagram: organization.instagram,
        linkedin: organization.linkedin,
        logoUrl: organization.logoUrl
      },
      tag: {
        tagCode: tag.tagCode,
        referralCode: tag.referralCode || ""
      },
      wallet: {
        balanceZAR: Number(wallet.balanceZAR) || 0
      },
      totalDonations,
      donationCount,
      recentDonations,
      referrer
    });
  } catch (error) {
    console.error("Get charity credibility error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var charity_default = router17;

// routes/learn.ts
import express18 from "express";
var router18 = express18.Router();
router18.get("/learn/:route(*)", async (req, res) => {
  try {
    const route = `/${req.params.route}`;
    const entry = await storage.getPublishedLearnEntry(route);
    if (!entry) {
      return res.status(404).json({ error: "Learn guide not found for this page" });
    }
    res.json(entry);
  } catch (error) {
    console.error("Get Learn entry error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router18.get("/admin/learn", async (req, res) => {
  try {
    const entries = await storage.getAllLearnEntries();
    res.json(entries);
  } catch (error) {
    console.error("Get all Learn entries error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router18.post("/admin/learn", async (req, res) => {
  try {
    const entry = await storage.createLearnEntry(req.body);
    res.json(entry);
  } catch (error) {
    console.error("Create Learn entry error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router18.patch("/admin/learn/:id", async (req, res) => {
  try {
    const entry = await storage.updateLearnEntry(req.params.id, req.body);
    res.json(entry);
  } catch (error) {
    console.error("Update Learn entry error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router18.post("/admin/learn/:id/publish", async (req, res) => {
  try {
    const { publishedBy } = req.body;
    const entry = await storage.publishLearnEntry(req.params.id, publishedBy);
    res.json(entry);
  } catch (error) {
    console.error("Publish Learn entry error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
var learn_default = router18;

// routes.ts
var CRYPTO_RATES = {
  BTC: 12e7,
  // 1 BTC = R1,200,000 ZAR (in cents)
  ETH: 55e5,
  // 1 ETH = R55,000 ZAR (in cents)
  USDT: 1850,
  // 1 USDT = R18.50 ZAR (in cents - stablecoin)
  USDC: 1850,
  // 1 USDC = R18.50 ZAR (in cents - stablecoin)
  DAI: 1850,
  // 1 DAI = R18.50 ZAR (in cents - stablecoin)
  BNB: 11e5,
  // 1 BNB = R11,000 ZAR (in cents)
  XRP: 1e3,
  // 1 XRP = R10 ZAR (in cents)
  ADA: 800,
  // 1 ADA = R8 ZAR (in cents)
  SOL: 28e4,
  // 1 SOL = R2,800 ZAR (in cents)
  DOGE: 150
  // 1 DOGE = R1.50 ZAR (in cents)
};
function convertCryptoToZAR(crypto4, amount) {
  const rate = CRYPTO_RATES[crypto4];
  if (!rate) throw new Error("Unknown crypto");
  return Math.floor(amount * rate);
}
async function registerRoutes(app2) {
  app2.use("/api", auth_default);
  app2.use("/api", merchant_default);
  app2.use("/api", donate_default);
  app2.use("/api", beneficiary_default);
  app2.use("/api", donor_default);
  app2.use("/api", blockkoin_default);
  app2.use("/api", tag_default);
  app2.use("/api", crypto_default);
  app2.use("/api", stripe_default);
  app2.use("/api", organizations_default);
  app2.use("/api", philanthropist_default);
  app2.use("/api", disasterCampaigns_default);
  app2.use("/api", leaderboards_default);
  app2.use("/api", stories_default);
  app2.use("/api", whatsapp_default);
  app2.use("/api", user_default);
  app2.use("/api", charity_default);
  app2.use("/api", learn_default);
  app2.get("/api/debug/db", async (_req, res) => {
    try {
      const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const isPostgres = !!pool2;
      const txs = await storage.getAllTransactions();
      res.json({ connected: true, driver: isPostgres ? "postgres" : "sqlite", transactionCount: txs.length });
    } catch (err) {
      console.error("DB debug error:", err);
      res.status(500).json({ connected: false, error: String(err) });
    }
  });
  app2.post("/api/sumsub/webhook", async (req, res) => {
    try {
      const { type, applicantId, reviewResult } = req.body || {};
      if (type === "applicantReviewed") {
        const externalUserId = req.body.externalUserId;
        const reviewAnswer = reviewResult?.reviewAnswer;
        if (externalUserId && reviewAnswer) {
          const tag = await storage.getTag(externalUserId);
          if (tag) {
            const status = reviewAnswer === "GREEN" ? "approved" : "rejected";
            await storage.updateTagVerification(tag.tagCode, applicantId, status);
          }
        }
      }
      res.json({ ok: true });
    } catch (error) {
      console.error("Sumsub webhook error:", error);
      res.status(500).json({ error: "internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// vite.ts
import express19 from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupClientProxy(app2, server) {
  const DEV_CLIENT_PORT = parseInt(process.env.CLIENT_DEV_PORT || "5173", 10);
  const DEV_TARGET = `http://localhost:${DEV_CLIENT_PORT}`;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  if (app2.get("env") === "development") {
    app2.use(
      createProxyMiddleware(
        (pathname, _req) => {
          return !pathname.startsWith("/api");
        },
        {
          target: DEV_TARGET,
          changeOrigin: true,
          ws: true,
          // proxy websockets (HMR)
          logLevel: "warn",
          onError: (err, _req, res) => {
            console.warn(`Client proxy error: ${err?.message || err}`);
            if (res && !res.headersSent) {
              res.status(502).end("Client dev server not running (start client dev server separately)");
            }
          }
        }
      )
    );
    return;
  }
  const distPath = path.resolve(__dirname, "..", "client", "dist");
  if (!fs.existsSync(distPath)) {
    console.warn("\u26A0\uFE0F Frontend not found. Running backend in API-only mode.");
    return;
  }
  app2.use(express19.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// index.ts
init_sumsub();
import "dotenv/config";
var app = express20();
app.use(express20.json());
app.use(express20.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
var sumsubClient = createSumsubClient();
if (sumsubClient) {
  app.set("sumsubClient", sumsubClient);
  if (sumsubClient instanceof DemoSumsubClient) {
    log("Sumsub client initialized (DEMO mode)");
  } else {
    const mask = (s) => s ? `${s.slice(0, 6)}...${s.slice(-6)}` : "<empty>";
    log(`Sumsub client initialized (appToken=${mask(process.env.SUMSUB_APP_TOKEN)})`);
  }
} else {
  log("Sumsub integration not configured (set SUMSUB_APP_TOKEN and SUMSUB_SECRET_KEY)");
}
if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required in production");
}
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-only-secret-" + Math.random().toString(36),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 36e5,
    // 1 hour
    sameSite: "lax"
    // CSRF protection
  }
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  await setupClientProxy(app, server);
  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen({
    port: 3e3,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
