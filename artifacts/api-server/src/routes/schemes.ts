import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { schemesTable } from "@workspace/db";
import { ListSchemesQueryParams, ListSchemesResponse, GetSchemeParams, GetSchemeResponse, ListCategoriesResponse } from "@workspace/api-zod";
import { ilike, or, eq, count, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/schemes/categories", async (_req, res) => {
  try {
    const rows = await db.selectDistinct({ category: schemesTable.category }).from(schemesTable).orderBy(schemesTable.category);
    const categories = rows.map(r => r.category);
    const data = ListCategoriesResponse.parse({ categories });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/schemes/:id", async (req, res) => {
  try {
    const { id } = GetSchemeParams.parse({ id: Number(req.params.id) });
    const [scheme] = await db.select().from(schemesTable).where(eq(schemesTable.id, id)).limit(1);
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    const data = GetSchemeResponse.parse({
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      category: scheme.category,
      state: scheme.state,
      ministry: scheme.ministry,
      launchDate: scheme.launchDate,
      deadline: scheme.deadline ?? null,
      benefits: scheme.benefits,
      eligibility: scheme.eligibility,
      documents: scheme.documents,
      applicationUrl: scheme.applicationUrl ?? null,
      tags: scheme.tags,
      steps: scheme.steps,
      faqs: scheme.faqs,
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/schemes", async (req, res) => {
  try {
    const query = ListSchemesQueryParams.parse({
      search: req.query.search as string | undefined,
      category: req.query.category as string | undefined,
      state: req.query.state as string | undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const offset = (page - 1) * limit;

    const conditions: ReturnType<typeof ilike>[] = [];

    if (query.search) {
      conditions.push(
        ilike(schemesTable.name, `%${query.search}%`),
        ilike(schemesTable.description, `%${query.search}%`),
        ilike(schemesTable.ministry, `%${query.search}%`)
      );
    }

    const whereSearch = conditions.length > 0 ? or(...conditions) : undefined;

    const whereConditions = [];
    if (whereSearch) whereConditions.push(whereSearch);
    if (query.category) whereConditions.push(eq(schemesTable.category, query.category));
    if (query.state) whereConditions.push(eq(schemesTable.state, query.state));

    const whereClause = whereConditions.length > 0
      ? sql`${whereConditions.reduce((acc, cond) => sql`${acc} AND ${cond}`)}`
      : undefined;

    let schemesQuery = db.select().from(schemesTable);
    let countQuery = db.select({ total: count() }).from(schemesTable);

    if (whereClause) {
      schemesQuery = schemesQuery.where(whereClause) as typeof schemesQuery;
      countQuery = countQuery.where(whereClause) as typeof countQuery;
    }

    const [schemes, [{ total }]] = await Promise.all([
      schemesQuery.limit(limit).offset(offset),
      countQuery,
    ]);

    const data = ListSchemesResponse.parse({
      schemes: schemes.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        category: s.category,
        state: s.state,
        ministry: s.ministry,
        launchDate: s.launchDate,
        deadline: s.deadline ?? null,
        benefits: s.benefits,
        eligibility: s.eligibility,
        documents: s.documents,
        applicationUrl: s.applicationUrl ?? null,
        tags: s.tags,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
