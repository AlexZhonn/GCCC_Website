import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'zh');
  CREATE TYPE "public"."enum_fellowships_ministry_category" AS ENUM('kids', 'youth', 'college', 'adults', 'senior-adults', 'discipleship');
  CREATE TYPE "public"."enum_ministry_categories_category_id" AS ENUM('kids', 'youth', 'college', 'adults', 'senior-adults', 'discipleship');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "speakers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "speakers_locales" (
  	"name" varchar NOT NULL,
  	"title" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "leaders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"email" varchar,
  	"order" numeric DEFAULT 99,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leaders_locales" (
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sermon_series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"start_date" timestamp(3) with time zone,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sermon_series_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sermons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"speaker_id" integer NOT NULL,
  	"scripture" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"series_id" integer,
  	"youtube_link" varchar,
  	"english_youtube_link" varchar,
  	"audio_link" varchar,
  	"thumbnail_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sermons_locales" (
  	"title" varchar NOT NULL,
  	"notes" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fellowships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 99,
  	"is_active" boolean DEFAULT true,
  	"ministry_category" "enum_fellowships_ministry_category",
  	"instagram_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fellowships_locales" (
  	"name" varchar NOT NULL,
  	"schedule" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"contact" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "activities_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"time" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activities_locales" (
  	"title" varchar NOT NULL,
  	"fellowship" varchar NOT NULL,
  	"description" jsonb,
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ministry_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" "enum_ministry_categories_category_id" NOT NULL,
  	"banner_image_id" integer,
  	"color" varchar,
  	"order" numeric DEFAULT 99,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ministry_categories_locales" (
  	"label" varchar NOT NULL,
  	"age_range" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sunday_service_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sunday_service_schedule_items_locales" (
  	"time" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sunday_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sunday_service_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"watch_live_url" varchar,
  	"watch_live_label" varchar,
  	"find_us_label" varchar,
  	"address_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_prayer_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prayer_feature_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campus_focus_direction_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campus_focus_direction_items_locales" (
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campus_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_campus_focus_locales" (
  	"section_title" varchar NOT NULL,
  	"section_desc" varchar,
  	"directions_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_activities_items_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_activities_items_legacy_photo_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar
  );
  
  CREATE TABLE "pages_blocks_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_activities_items_locales" (
  	"fellowship" varchar,
  	"title" varchar NOT NULL,
  	"date_label" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_activities_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_church_history_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar
  );
  
  CREATE TABLE "pages_blocks_church_history_documents_locales" (
  	"label" varchar NOT NULL,
  	"year" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_church_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"church_portrait_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_church_history_locales" (
  	"proclamation_of_faith" jsonb,
  	"history_heading" varchar,
  	"history_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_announcements_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "pages_blocks_announcements_list_items_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_announcements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_announcements_list_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_newsletter_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_issues_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_give_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_give_methods_locales" (
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_give" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_give_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"tax_note" jsonb,
  	"scripture" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_visitor_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_visitor_faq_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_visitor_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_visitor_faq_locales" (
  	"modal_title" varchar NOT NULL,
  	"modal_subtitle" varchar,
  	"intro_text" jsonb,
  	"closing_note" varchar,
  	"close_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_who_we_are_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_who_we_are_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer_get_connected_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_get_connected_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_locales" (
  	"worship_times_line" varchar,
  	"instagram_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"speakers_id" integer,
  	"leaders_id" integer,
  	"sermon_series_id" integer,
  	"sermons_id" integer,
  	"fellowships_id" integer,
  	"activities_id" integer,
  	"ministry_categories_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"pastor_name" varchar,
  	"pastor_email" varchar,
  	"pastor_cell" varchar,
  	"youtube_live_url" varchar,
  	"google_calendar_id" varchar,
  	"google_maps_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"church_name" varchar NOT NULL,
  	"tagline" varchar,
  	"welcome_blurb_subject" varchar,
  	"welcome_blurb_text" jsonb,
  	"welcome_history_text" jsonb,
  	"address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_home_sunday_service_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_home_sunday_service_schedule_items_locales" (
  	"time" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home_campus_focus_direction_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_home_campus_focus_direction_items_locales" (
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home_activities_items_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "page_home_activities_items_legacy_photo_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar
  );
  
  CREATE TABLE "page_home_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_home_activities_items_locales" (
  	"fellowship" varchar,
  	"title" varchar NOT NULL,
  	"date_label" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"sunday_service_image_id" integer,
  	"prayer_feature_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_home_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"sunday_service_eyebrow" varchar,
  	"sunday_service_heading" varchar NOT NULL,
  	"sunday_service_body" jsonb,
  	"sunday_service_watch_live_url" varchar,
  	"sunday_service_watch_live_label" varchar,
  	"sunday_service_find_us_label" varchar,
  	"sunday_service_address_line" varchar,
  	"prayer_feature_eyebrow" varchar,
  	"prayer_feature_heading" varchar NOT NULL,
  	"prayer_feature_body" jsonb,
  	"prayer_feature_cta_label" varchar,
  	"campus_focus_section_title" varchar NOT NULL,
  	"campus_focus_section_desc" varchar,
  	"campus_focus_directions_title" varchar,
  	"activities_heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_about_church_history_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar
  );
  
  CREATE TABLE "page_about_church_history_documents_locales" (
  	"label" varchar NOT NULL,
  	"year" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"church_history_church_portrait_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_about_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"church_history_proclamation_of_faith" jsonb,
  	"church_history_history_heading" varchar,
  	"church_history_history_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_announcements_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "page_announcements_items_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_announcements_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_give_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_give_methods_locales" (
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_give" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_give_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"tax_note" jsonb,
  	"scripture" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_gainesville_dew_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar
  );
  
  CREATE TABLE "page_gainesville_dew_issues_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_gainesville_dew" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_gainesville_dew_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_fellowships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_fellowships_locales" (
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_leadership" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_leadership_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"intro_paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_contact_locales" (
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"form_section_heading" varchar,
  	"form_submit_label" varchar,
  	"form_success_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speakers" ADD CONSTRAINT "speakers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "speakers_locales" ADD CONSTRAINT "speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders_locales" ADD CONSTRAINT "leaders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sermon_series" ADD CONSTRAINT "sermon_series_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sermon_series_locales" ADD CONSTRAINT "sermon_series_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sermon_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sermons" ADD CONSTRAINT "sermons_speaker_id_speakers_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."speakers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sermons" ADD CONSTRAINT "sermons_series_id_sermon_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."sermon_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sermons" ADD CONSTRAINT "sermons_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sermons_locales" ADD CONSTRAINT "sermons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sermons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fellowships" ADD CONSTRAINT "fellowships_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fellowships_locales" ADD CONSTRAINT "fellowships_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fellowships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_photos" ADD CONSTRAINT "activities_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_photos" ADD CONSTRAINT "activities_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_locales" ADD CONSTRAINT "activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ministry_categories" ADD CONSTRAINT "ministry_categories_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministry_categories_locales" ADD CONSTRAINT "ministry_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ministry_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sunday_service_schedule_items" ADD CONSTRAINT "pages_blocks_sunday_service_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sunday_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sunday_service_schedule_items_locales" ADD CONSTRAINT "pages_blocks_sunday_service_schedule_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sunday_service_schedule_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sunday_service" ADD CONSTRAINT "pages_blocks_sunday_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_sunday_service" ADD CONSTRAINT "pages_blocks_sunday_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sunday_service_locales" ADD CONSTRAINT "pages_blocks_sunday_service_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sunday_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prayer_feature" ADD CONSTRAINT "pages_blocks_prayer_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_prayer_feature" ADD CONSTRAINT "pages_blocks_prayer_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prayer_feature_locales" ADD CONSTRAINT "pages_blocks_prayer_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_prayer_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus_direction_items" ADD CONSTRAINT "pages_blocks_campus_focus_direction_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus_direction_items_locales" ADD CONSTRAINT "pages_blocks_campus_focus_direction_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus_direction_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus" ADD CONSTRAINT "pages_blocks_campus_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus_locales" ADD CONSTRAINT "pages_blocks_campus_focus_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_items_photos" ADD CONSTRAINT "pages_blocks_activities_items_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_items_photos" ADD CONSTRAINT "pages_blocks_activities_items_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_items_legacy_photo_paths" ADD CONSTRAINT "pages_blocks_activities_items_legacy_photo_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_items" ADD CONSTRAINT "pages_blocks_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_items_locales" ADD CONSTRAINT "pages_blocks_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities" ADD CONSTRAINT "pages_blocks_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_locales" ADD CONSTRAINT "pages_blocks_activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history_documents" ADD CONSTRAINT "pages_blocks_church_history_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history_documents" ADD CONSTRAINT "pages_blocks_church_history_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_church_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history_documents_locales" ADD CONSTRAINT "pages_blocks_church_history_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_church_history_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history" ADD CONSTRAINT "pages_blocks_church_history_church_portrait_id_media_id_fk" FOREIGN KEY ("church_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history" ADD CONSTRAINT "pages_blocks_church_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_church_history_locales" ADD CONSTRAINT "pages_blocks_church_history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_church_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcements_list_items" ADD CONSTRAINT "pages_blocks_announcements_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_announcements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcements_list_items_locales" ADD CONSTRAINT "pages_blocks_announcements_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_announcements_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcements_list" ADD CONSTRAINT "pages_blocks_announcements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_announcements_list_locales" ADD CONSTRAINT "pages_blocks_announcements_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_announcements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_issues" ADD CONSTRAINT "pages_blocks_newsletter_issues_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_issues" ADD CONSTRAINT "pages_blocks_newsletter_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_issues_locales" ADD CONSTRAINT "pages_blocks_newsletter_issues_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_locales" ADD CONSTRAINT "pages_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_give_methods" ADD CONSTRAINT "pages_blocks_give_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_give_methods_locales" ADD CONSTRAINT "pages_blocks_give_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_give_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_give" ADD CONSTRAINT "pages_blocks_give_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_give_locales" ADD CONSTRAINT "pages_blocks_give_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visitor_faq_faqs" ADD CONSTRAINT "pages_blocks_visitor_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visitor_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visitor_faq_faqs_locales" ADD CONSTRAINT "pages_blocks_visitor_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visitor_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visitor_faq" ADD CONSTRAINT "pages_blocks_visitor_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visitor_faq_locales" ADD CONSTRAINT "pages_blocks_visitor_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visitor_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_who_we_are_links" ADD CONSTRAINT "pages_blocks_footer_who_we_are_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_who_we_are_links_locales" ADD CONSTRAINT "pages_blocks_footer_who_we_are_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_who_we_are_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_get_connected_links" ADD CONSTRAINT "pages_blocks_footer_get_connected_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_get_connected_links_locales" ADD CONSTRAINT "pages_blocks_footer_get_connected_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_get_connected_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_locales" ADD CONSTRAINT "pages_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_speakers_fk" FOREIGN KEY ("speakers_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sermon_series_fk" FOREIGN KEY ("sermon_series_id") REFERENCES "public"."sermon_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sermons_fk" FOREIGN KEY ("sermons_id") REFERENCES "public"."sermons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fellowships_fk" FOREIGN KEY ("fellowships_id") REFERENCES "public"."fellowships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ministry_categories_fk" FOREIGN KEY ("ministry_categories_id") REFERENCES "public"."ministry_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_sunday_service_schedule_items" ADD CONSTRAINT "page_home_sunday_service_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_sunday_service_schedule_items_locales" ADD CONSTRAINT "page_home_sunday_service_schedule_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_sunday_service_schedule_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_campus_focus_direction_items" ADD CONSTRAINT "page_home_campus_focus_direction_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_campus_focus_direction_items_locales" ADD CONSTRAINT "page_home_campus_focus_direction_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_campus_focus_direction_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_activities_items_photos" ADD CONSTRAINT "page_home_activities_items_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home_activities_items_photos" ADD CONSTRAINT "page_home_activities_items_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_activities_items_legacy_photo_paths" ADD CONSTRAINT "page_home_activities_items_legacy_photo_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_activities_items" ADD CONSTRAINT "page_home_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_activities_items_locales" ADD CONSTRAINT "page_home_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_sunday_service_image_id_media_id_fk" FOREIGN KEY ("sunday_service_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_prayer_feature_image_id_media_id_fk" FOREIGN KEY ("prayer_feature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home_locales" ADD CONSTRAINT "page_home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about_church_history_documents" ADD CONSTRAINT "page_about_church_history_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_about_church_history_documents" ADD CONSTRAINT "page_about_church_history_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about_church_history_documents_locales" ADD CONSTRAINT "page_about_church_history_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about_church_history_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about" ADD CONSTRAINT "page_about_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_about" ADD CONSTRAINT "page_about_church_history_church_portrait_id_media_id_fk" FOREIGN KEY ("church_history_church_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_about_locales" ADD CONSTRAINT "page_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_announcements_items" ADD CONSTRAINT "page_announcements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_announcements_items_locales" ADD CONSTRAINT "page_announcements_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_announcements_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_announcements_locales" ADD CONSTRAINT "page_announcements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_give_methods" ADD CONSTRAINT "page_give_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_give_methods_locales" ADD CONSTRAINT "page_give_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_give_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_give_locales" ADD CONSTRAINT "page_give_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_gainesville_dew_issues" ADD CONSTRAINT "page_gainesville_dew_issues_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_gainesville_dew_issues" ADD CONSTRAINT "page_gainesville_dew_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_gainesville_dew"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_gainesville_dew_issues_locales" ADD CONSTRAINT "page_gainesville_dew_issues_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_gainesville_dew_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_gainesville_dew_locales" ADD CONSTRAINT "page_gainesville_dew_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_gainesville_dew"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_fellowships" ADD CONSTRAINT "page_fellowships_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_fellowships_locales" ADD CONSTRAINT "page_fellowships_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_fellowships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_leadership" ADD CONSTRAINT "page_leadership_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_leadership_locales" ADD CONSTRAINT "page_leadership_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_leadership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_contact" ADD CONSTRAINT "page_contact_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_contact_locales" ADD CONSTRAINT "page_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "speakers_photo_idx" ON "speakers" USING btree ("photo_id");
  CREATE INDEX "speakers_updated_at_idx" ON "speakers" USING btree ("updated_at");
  CREATE INDEX "speakers_created_at_idx" ON "speakers" USING btree ("created_at");
  CREATE UNIQUE INDEX "speakers_locales_locale_parent_id_unique" ON "speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "leaders_photo_idx" ON "leaders" USING btree ("photo_id");
  CREATE INDEX "leaders_updated_at_idx" ON "leaders" USING btree ("updated_at");
  CREATE INDEX "leaders_created_at_idx" ON "leaders" USING btree ("created_at");
  CREATE UNIQUE INDEX "leaders_locales_locale_parent_id_unique" ON "leaders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sermon_series_cover_image_idx" ON "sermon_series" USING btree ("cover_image_id");
  CREATE INDEX "sermon_series_updated_at_idx" ON "sermon_series" USING btree ("updated_at");
  CREATE INDEX "sermon_series_created_at_idx" ON "sermon_series" USING btree ("created_at");
  CREATE UNIQUE INDEX "sermon_series_locales_locale_parent_id_unique" ON "sermon_series_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sermons_speaker_idx" ON "sermons" USING btree ("speaker_id");
  CREATE INDEX "sermons_series_idx" ON "sermons" USING btree ("series_id");
  CREATE INDEX "sermons_thumbnail_idx" ON "sermons" USING btree ("thumbnail_id");
  CREATE INDEX "sermons_updated_at_idx" ON "sermons" USING btree ("updated_at");
  CREATE INDEX "sermons_created_at_idx" ON "sermons" USING btree ("created_at");
  CREATE UNIQUE INDEX "sermons_locales_locale_parent_id_unique" ON "sermons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "fellowships_slug_idx" ON "fellowships" USING btree ("slug");
  CREATE INDEX "fellowships_image_idx" ON "fellowships" USING btree ("image_id");
  CREATE INDEX "fellowships_updated_at_idx" ON "fellowships" USING btree ("updated_at");
  CREATE INDEX "fellowships_created_at_idx" ON "fellowships" USING btree ("created_at");
  CREATE UNIQUE INDEX "fellowships_locales_locale_parent_id_unique" ON "fellowships_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "activities_photos_order_idx" ON "activities_photos" USING btree ("_order");
  CREATE INDEX "activities_photos_parent_id_idx" ON "activities_photos" USING btree ("_parent_id");
  CREATE INDEX "activities_photos_photo_idx" ON "activities_photos" USING btree ("photo_id");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE UNIQUE INDEX "activities_locales_locale_parent_id_unique" ON "activities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "ministry_categories_category_id_idx" ON "ministry_categories" USING btree ("category_id");
  CREATE INDEX "ministry_categories_banner_image_idx" ON "ministry_categories" USING btree ("banner_image_id");
  CREATE INDEX "ministry_categories_updated_at_idx" ON "ministry_categories" USING btree ("updated_at");
  CREATE INDEX "ministry_categories_created_at_idx" ON "ministry_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "ministry_categories_locales_locale_parent_id_unique" ON "ministry_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_sunday_service_schedule_items_order_idx" ON "pages_blocks_sunday_service_schedule_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_sunday_service_schedule_items_parent_id_idx" ON "pages_blocks_sunday_service_schedule_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_sunday_service_schedule_items_locales_locale_pa" ON "pages_blocks_sunday_service_schedule_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_sunday_service_order_idx" ON "pages_blocks_sunday_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_sunday_service_parent_id_idx" ON "pages_blocks_sunday_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sunday_service_path_idx" ON "pages_blocks_sunday_service" USING btree ("_path");
  CREATE INDEX "pages_blocks_sunday_service_image_idx" ON "pages_blocks_sunday_service" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_sunday_service_locales_locale_parent_id_unique" ON "pages_blocks_sunday_service_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_prayer_feature_order_idx" ON "pages_blocks_prayer_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_prayer_feature_parent_id_idx" ON "pages_blocks_prayer_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prayer_feature_path_idx" ON "pages_blocks_prayer_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_prayer_feature_image_idx" ON "pages_blocks_prayer_feature" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_prayer_feature_locales_locale_parent_id_unique" ON "pages_blocks_prayer_feature_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_campus_focus_direction_items_order_idx" ON "pages_blocks_campus_focus_direction_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_campus_focus_direction_items_parent_id_idx" ON "pages_blocks_campus_focus_direction_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_campus_focus_direction_items_locales_locale_par" ON "pages_blocks_campus_focus_direction_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_campus_focus_order_idx" ON "pages_blocks_campus_focus" USING btree ("_order");
  CREATE INDEX "pages_blocks_campus_focus_parent_id_idx" ON "pages_blocks_campus_focus" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_campus_focus_path_idx" ON "pages_blocks_campus_focus" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_campus_focus_locales_locale_parent_id_unique" ON "pages_blocks_campus_focus_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_activities_items_photos_order_idx" ON "pages_blocks_activities_items_photos" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_items_photos_parent_id_idx" ON "pages_blocks_activities_items_photos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_activities_items_photos_photo_idx" ON "pages_blocks_activities_items_photos" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_activities_items_legacy_photo_paths_order_idx" ON "pages_blocks_activities_items_legacy_photo_paths" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_items_legacy_photo_paths_parent_id_idx" ON "pages_blocks_activities_items_legacy_photo_paths" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_activities_items_order_idx" ON "pages_blocks_activities_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_items_parent_id_idx" ON "pages_blocks_activities_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_activities_items_locales_locale_parent_id_uniqu" ON "pages_blocks_activities_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_activities_order_idx" ON "pages_blocks_activities" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_parent_id_idx" ON "pages_blocks_activities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_activities_path_idx" ON "pages_blocks_activities" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_activities_locales_locale_parent_id_unique" ON "pages_blocks_activities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_church_history_documents_order_idx" ON "pages_blocks_church_history_documents" USING btree ("_order");
  CREATE INDEX "pages_blocks_church_history_documents_parent_id_idx" ON "pages_blocks_church_history_documents" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_church_history_documents_file_idx" ON "pages_blocks_church_history_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "pages_blocks_church_history_documents_locales_locale_parent_" ON "pages_blocks_church_history_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_church_history_order_idx" ON "pages_blocks_church_history" USING btree ("_order");
  CREATE INDEX "pages_blocks_church_history_parent_id_idx" ON "pages_blocks_church_history" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_church_history_path_idx" ON "pages_blocks_church_history" USING btree ("_path");
  CREATE INDEX "pages_blocks_church_history_church_portrait_idx" ON "pages_blocks_church_history" USING btree ("church_portrait_id");
  CREATE UNIQUE INDEX "pages_blocks_church_history_locales_locale_parent_id_unique" ON "pages_blocks_church_history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_announcements_list_items_order_idx" ON "pages_blocks_announcements_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_announcements_list_items_parent_id_idx" ON "pages_blocks_announcements_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_announcements_list_items_locales_locale_parent_" ON "pages_blocks_announcements_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_announcements_list_order_idx" ON "pages_blocks_announcements_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_announcements_list_parent_id_idx" ON "pages_blocks_announcements_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_announcements_list_path_idx" ON "pages_blocks_announcements_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_announcements_list_locales_locale_parent_id_uni" ON "pages_blocks_announcements_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_newsletter_issues_order_idx" ON "pages_blocks_newsletter_issues" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_issues_parent_id_idx" ON "pages_blocks_newsletter_issues" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_issues_file_idx" ON "pages_blocks_newsletter_issues" USING btree ("file_id");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_issues_locales_locale_parent_id_uniq" ON "pages_blocks_newsletter_issues_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_locales_locale_parent_id_unique" ON "pages_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_give_methods_order_idx" ON "pages_blocks_give_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_give_methods_parent_id_idx" ON "pages_blocks_give_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_give_methods_locales_locale_parent_id_unique" ON "pages_blocks_give_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_give_order_idx" ON "pages_blocks_give" USING btree ("_order");
  CREATE INDEX "pages_blocks_give_parent_id_idx" ON "pages_blocks_give" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_give_path_idx" ON "pages_blocks_give" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_give_locales_locale_parent_id_unique" ON "pages_blocks_give_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_visitor_faq_faqs_order_idx" ON "pages_blocks_visitor_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_visitor_faq_faqs_parent_id_idx" ON "pages_blocks_visitor_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_visitor_faq_faqs_locales_locale_parent_id_uniqu" ON "pages_blocks_visitor_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_visitor_faq_order_idx" ON "pages_blocks_visitor_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_visitor_faq_parent_id_idx" ON "pages_blocks_visitor_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visitor_faq_path_idx" ON "pages_blocks_visitor_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_visitor_faq_locales_locale_parent_id_unique" ON "pages_blocks_visitor_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_who_we_are_links_order_idx" ON "pages_blocks_footer_who_we_are_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_who_we_are_links_parent_id_idx" ON "pages_blocks_footer_who_we_are_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_who_we_are_links_locales_locale_parent_i" ON "pages_blocks_footer_who_we_are_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_get_connected_links_order_idx" ON "pages_blocks_footer_get_connected_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_get_connected_links_parent_id_idx" ON "pages_blocks_footer_get_connected_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_footer_get_connected_links_locales_locale_paren" ON "pages_blocks_footer_get_connected_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_footer_order_idx" ON "pages_blocks_footer" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_parent_id_idx" ON "pages_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_path_idx" ON "pages_blocks_footer" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_footer_locales_locale_parent_id_unique" ON "pages_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_speakers_id_idx" ON "payload_locked_documents_rels" USING btree ("speakers_id");
  CREATE INDEX "payload_locked_documents_rels_leaders_id_idx" ON "payload_locked_documents_rels" USING btree ("leaders_id");
  CREATE INDEX "payload_locked_documents_rels_sermon_series_id_idx" ON "payload_locked_documents_rels" USING btree ("sermon_series_id");
  CREATE INDEX "payload_locked_documents_rels_sermons_id_idx" ON "payload_locked_documents_rels" USING btree ("sermons_id");
  CREATE INDEX "payload_locked_documents_rels_fellowships_id_idx" ON "payload_locked_documents_rels" USING btree ("fellowships_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_ministry_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("ministry_categories_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_sunday_service_schedule_items_order_idx" ON "page_home_sunday_service_schedule_items" USING btree ("_order");
  CREATE INDEX "page_home_sunday_service_schedule_items_parent_id_idx" ON "page_home_sunday_service_schedule_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_home_sunday_service_schedule_items_locales_locale_paren" ON "page_home_sunday_service_schedule_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_campus_focus_direction_items_order_idx" ON "page_home_campus_focus_direction_items" USING btree ("_order");
  CREATE INDEX "page_home_campus_focus_direction_items_parent_id_idx" ON "page_home_campus_focus_direction_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_home_campus_focus_direction_items_locales_locale_parent" ON "page_home_campus_focus_direction_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_activities_items_photos_order_idx" ON "page_home_activities_items_photos" USING btree ("_order");
  CREATE INDEX "page_home_activities_items_photos_parent_id_idx" ON "page_home_activities_items_photos" USING btree ("_parent_id");
  CREATE INDEX "page_home_activities_items_photos_photo_idx" ON "page_home_activities_items_photos" USING btree ("photo_id");
  CREATE INDEX "page_home_activities_items_legacy_photo_paths_order_idx" ON "page_home_activities_items_legacy_photo_paths" USING btree ("_order");
  CREATE INDEX "page_home_activities_items_legacy_photo_paths_parent_id_idx" ON "page_home_activities_items_legacy_photo_paths" USING btree ("_parent_id");
  CREATE INDEX "page_home_activities_items_order_idx" ON "page_home_activities_items" USING btree ("_order");
  CREATE INDEX "page_home_activities_items_parent_id_idx" ON "page_home_activities_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_home_activities_items_locales_locale_parent_id_unique" ON "page_home_activities_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_hero_hero_background_image_idx" ON "page_home" USING btree ("hero_background_image_id");
  CREATE INDEX "page_home_sunday_service_sunday_service_image_idx" ON "page_home" USING btree ("sunday_service_image_id");
  CREATE INDEX "page_home_prayer_feature_prayer_feature_image_idx" ON "page_home" USING btree ("prayer_feature_image_id");
  CREATE UNIQUE INDEX "page_home_locales_locale_parent_id_unique" ON "page_home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_about_church_history_documents_order_idx" ON "page_about_church_history_documents" USING btree ("_order");
  CREATE INDEX "page_about_church_history_documents_parent_id_idx" ON "page_about_church_history_documents" USING btree ("_parent_id");
  CREATE INDEX "page_about_church_history_documents_file_idx" ON "page_about_church_history_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "page_about_church_history_documents_locales_locale_parent_id" ON "page_about_church_history_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_about_hero_hero_background_image_idx" ON "page_about" USING btree ("hero_background_image_id");
  CREATE INDEX "page_about_church_history_church_history_church_portrait_idx" ON "page_about" USING btree ("church_history_church_portrait_id");
  CREATE UNIQUE INDEX "page_about_locales_locale_parent_id_unique" ON "page_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_announcements_items_order_idx" ON "page_announcements_items" USING btree ("_order");
  CREATE INDEX "page_announcements_items_parent_id_idx" ON "page_announcements_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_announcements_items_locales_locale_parent_id_unique" ON "page_announcements_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_announcements_locales_locale_parent_id_unique" ON "page_announcements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_give_methods_order_idx" ON "page_give_methods" USING btree ("_order");
  CREATE INDEX "page_give_methods_parent_id_idx" ON "page_give_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_give_methods_locales_locale_parent_id_unique" ON "page_give_methods_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_give_locales_locale_parent_id_unique" ON "page_give_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_gainesville_dew_issues_order_idx" ON "page_gainesville_dew_issues" USING btree ("_order");
  CREATE INDEX "page_gainesville_dew_issues_parent_id_idx" ON "page_gainesville_dew_issues" USING btree ("_parent_id");
  CREATE INDEX "page_gainesville_dew_issues_file_idx" ON "page_gainesville_dew_issues" USING btree ("file_id");
  CREATE UNIQUE INDEX "page_gainesville_dew_issues_locales_locale_parent_id_unique" ON "page_gainesville_dew_issues_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_gainesville_dew_locales_locale_parent_id_unique" ON "page_gainesville_dew_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_fellowships_hero_hero_background_image_idx" ON "page_fellowships" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "page_fellowships_locales_locale_parent_id_unique" ON "page_fellowships_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_leadership_hero_hero_background_image_idx" ON "page_leadership" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "page_leadership_locales_locale_parent_id_unique" ON "page_leadership_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_contact_hero_hero_background_image_idx" ON "page_contact" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "page_contact_locales_locale_parent_id_unique" ON "page_contact_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "speakers" CASCADE;
  DROP TABLE "speakers_locales" CASCADE;
  DROP TABLE "leaders" CASCADE;
  DROP TABLE "leaders_locales" CASCADE;
  DROP TABLE "sermon_series" CASCADE;
  DROP TABLE "sermon_series_locales" CASCADE;
  DROP TABLE "sermons" CASCADE;
  DROP TABLE "sermons_locales" CASCADE;
  DROP TABLE "fellowships" CASCADE;
  DROP TABLE "fellowships_locales" CASCADE;
  DROP TABLE "activities_photos" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "activities_locales" CASCADE;
  DROP TABLE "ministry_categories" CASCADE;
  DROP TABLE "ministry_categories_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_sunday_service_schedule_items" CASCADE;
  DROP TABLE "pages_blocks_sunday_service_schedule_items_locales" CASCADE;
  DROP TABLE "pages_blocks_sunday_service" CASCADE;
  DROP TABLE "pages_blocks_sunday_service_locales" CASCADE;
  DROP TABLE "pages_blocks_prayer_feature" CASCADE;
  DROP TABLE "pages_blocks_prayer_feature_locales" CASCADE;
  DROP TABLE "pages_blocks_campus_focus_direction_items" CASCADE;
  DROP TABLE "pages_blocks_campus_focus_direction_items_locales" CASCADE;
  DROP TABLE "pages_blocks_campus_focus" CASCADE;
  DROP TABLE "pages_blocks_campus_focus_locales" CASCADE;
  DROP TABLE "pages_blocks_activities_items_photos" CASCADE;
  DROP TABLE "pages_blocks_activities_items_legacy_photo_paths" CASCADE;
  DROP TABLE "pages_blocks_activities_items" CASCADE;
  DROP TABLE "pages_blocks_activities_items_locales" CASCADE;
  DROP TABLE "pages_blocks_activities" CASCADE;
  DROP TABLE "pages_blocks_activities_locales" CASCADE;
  DROP TABLE "pages_blocks_church_history_documents" CASCADE;
  DROP TABLE "pages_blocks_church_history_documents_locales" CASCADE;
  DROP TABLE "pages_blocks_church_history" CASCADE;
  DROP TABLE "pages_blocks_church_history_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_announcements_list_items" CASCADE;
  DROP TABLE "pages_blocks_announcements_list_items_locales" CASCADE;
  DROP TABLE "pages_blocks_announcements_list" CASCADE;
  DROP TABLE "pages_blocks_announcements_list_locales" CASCADE;
  DROP TABLE "pages_blocks_newsletter_issues" CASCADE;
  DROP TABLE "pages_blocks_newsletter_issues_locales" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_newsletter_locales" CASCADE;
  DROP TABLE "pages_blocks_give_methods" CASCADE;
  DROP TABLE "pages_blocks_give_methods_locales" CASCADE;
  DROP TABLE "pages_blocks_give" CASCADE;
  DROP TABLE "pages_blocks_give_locales" CASCADE;
  DROP TABLE "pages_blocks_visitor_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_visitor_faq_faqs_locales" CASCADE;
  DROP TABLE "pages_blocks_visitor_faq" CASCADE;
  DROP TABLE "pages_blocks_visitor_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_footer_who_we_are_links" CASCADE;
  DROP TABLE "pages_blocks_footer_who_we_are_links_locales" CASCADE;
  DROP TABLE "pages_blocks_footer_get_connected_links" CASCADE;
  DROP TABLE "pages_blocks_footer_get_connected_links_locales" CASCADE;
  DROP TABLE "pages_blocks_footer" CASCADE;
  DROP TABLE "pages_blocks_footer_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "page_home_sunday_service_schedule_items" CASCADE;
  DROP TABLE "page_home_sunday_service_schedule_items_locales" CASCADE;
  DROP TABLE "page_home_campus_focus_direction_items" CASCADE;
  DROP TABLE "page_home_campus_focus_direction_items_locales" CASCADE;
  DROP TABLE "page_home_activities_items_photos" CASCADE;
  DROP TABLE "page_home_activities_items_legacy_photo_paths" CASCADE;
  DROP TABLE "page_home_activities_items" CASCADE;
  DROP TABLE "page_home_activities_items_locales" CASCADE;
  DROP TABLE "page_home" CASCADE;
  DROP TABLE "page_home_locales" CASCADE;
  DROP TABLE "page_about_church_history_documents" CASCADE;
  DROP TABLE "page_about_church_history_documents_locales" CASCADE;
  DROP TABLE "page_about" CASCADE;
  DROP TABLE "page_about_locales" CASCADE;
  DROP TABLE "page_announcements_items" CASCADE;
  DROP TABLE "page_announcements_items_locales" CASCADE;
  DROP TABLE "page_announcements" CASCADE;
  DROP TABLE "page_announcements_locales" CASCADE;
  DROP TABLE "page_give_methods" CASCADE;
  DROP TABLE "page_give_methods_locales" CASCADE;
  DROP TABLE "page_give" CASCADE;
  DROP TABLE "page_give_locales" CASCADE;
  DROP TABLE "page_gainesville_dew_issues" CASCADE;
  DROP TABLE "page_gainesville_dew_issues_locales" CASCADE;
  DROP TABLE "page_gainesville_dew" CASCADE;
  DROP TABLE "page_gainesville_dew_locales" CASCADE;
  DROP TABLE "page_fellowships" CASCADE;
  DROP TABLE "page_fellowships_locales" CASCADE;
  DROP TABLE "page_leadership" CASCADE;
  DROP TABLE "page_leadership_locales" CASCADE;
  DROP TABLE "page_contact" CASCADE;
  DROP TABLE "page_contact_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_fellowships_ministry_category";
  DROP TYPE "public"."enum_ministry_categories_category_id";`)
}
