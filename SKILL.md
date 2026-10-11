# Skill: Deploy Thai Spa Luxury App to Cloudflare

**Objective**: Automate the setup, database initialization, and deployment of the Thai Spa Luxury full‑stack app on Cloudflare Pages, D1, and R2.

## When to Use
- Starting a new instance of the app (e.g., for a new spa branch).
- Refreshing the environment after changes to schema or dependencies.

## Inputs
- None (skill assumes you are in the project root with a valid Git repo).

## Outputs
- A deployed Cloudflare Pages application with:
  - D1 database created and schema applied.
  - R2 bucket created (if needed).
  - Secrets for LINE notifications configured (prompted).
  - Latest code built and deployed to the `production` preview.

## Steps
1. **Install Wrangler** (if not already):
   ```bash
   npm install -g wrangler
   ```
2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```
3. **Create D1 database**:
   ```bash
   wrangler d1 create spa-database
   ```
   - Copy the returned `database_id` into `wrangler.toml` under the `[[d1_databases]]` section.
4. **Apply schema**:
   ```bash
   wrangler d1 execute spa-database --file=./schema.sql
   ```
5. **Create R2 bucket** (optional, for media):
   ```bash
   wrangler r2 bucket create spa-assets
   ```
   - Ensure `wrangler.toml` contains the bucket binding.
6. **Set secrets** (you will be prompted):
   ```bash
   wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
   wrangler secret put ADMIN_LINE_USER_OR_GROUP_ID
   ```
7. **Install npm dependencies**:
   ```bash
   npm install
   ```
8. **Build and deploy**:
   ```bash
   npx wrangler pages deploy
   ```
   - This command runs `npm run build` internally, uploads the `dist/` folder, and deploys the Functions.

## Validation
- Visit the deployed URL (shown after deployment) and verify:
  - Home page loads with Luxury styling.
  - Treatment list loads (calls `/api/services`).
  - Booking form shows slot availability after selecting therapist and date.
  - Submit a test booking and check that a LINE message arrives (if tokens set).

## Notes
- The skill assumes you have a Cloudflare account with permission to create D1 databases, R2 buckets, and Workers.
- If you already have a D1 database, skip steps 3‑4 and just ensure the `database_id` matches.
- For subsequent deployments, you only need to run step 8 (build & deploy) unless schema changes.

---
*This skill encapsulates the end‑to‑end process to get the Thai Spa Luxury app live on Cloudflare with zero manual dashboard clicking.*
