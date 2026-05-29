CREATE TABLE "battles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_a_id" text NOT NULL,
	"player_b_id" text NOT NULL,
	"winner_id" text,
	"problem_id" uuid NOT NULL,
	"language" text NOT NULL,
	"elo_change_a" integer NOT NULL,
	"elo_change_b" integer NOT NULL,
	"elo_before_a" integer NOT NULL,
	"elo_before_b" integer NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "elo" integer DEFAULT 1200 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "games_played" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "peak_elo" integer DEFAULT 1200 NOT NULL;--> statement-breakpoint
ALTER TABLE "problems" ADD COLUMN "driver_code" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_player_a_id_user_id_fk" FOREIGN KEY ("player_a_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_player_b_id_user_id_fk" FOREIGN KEY ("player_b_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_winner_id_user_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;