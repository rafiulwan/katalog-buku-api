# TODO: Fix Error on Katalog Buku API Website Display

## Information Gathered
- The API is an Express.js application with authentication and book management routes.
- Uses Prisma ORM with PostgreSQL database.
- Includes Swagger UI for API documentation.
- Error occurs on Vercel deployment: 500 INTERNAL_SERVER_ERROR with FUNCTION_INVOCATION_FAILED, likely due to Prisma client issues in serverless environment.
- No vercel.json or api/index.js present for Vercel deployment.
- Prisma client needs to be configured for serverless to avoid connection issues.

## Plan
1. Create vercel.json for Vercel deployment configuration.
2. Create api/index.js as the serverless function entry point.
3. Update Prisma client initialization to be serverless-compatible (avoid multiple connections).
4. Ensure code is compatible with Vercel's serverless functions.

## Dependent Files to be Edited
- vercel.json (new file) - DONE
- api/index.js (new file) - DONE
- controllers/book.controller.js (update Prisma client usage) - DONE
- controllers/auth.controller.js (update Prisma client usage) - DONE
- middleware/auth.middleware.js (update Prisma client usage) - DONE

## Followup Steps
1. Set DATABASE_URL in Vercel environment variables.
2. Deploy to Vercel and test the API endpoints.
3. Verify Swagger docs are accessible.
4. Check logs for any remaining errors.
