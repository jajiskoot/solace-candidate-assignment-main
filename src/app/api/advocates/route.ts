import { ilike, or } from 'drizzle-orm';

import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get('searchTerm');

  // Add drizzle schema for where clause error
  const data = await db.select().from(advocates).where(
    or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
      // make this work for json or use different query method altogether
      // ilike(advocates.specialties, `%${searchTerm}%`),
      // use different search param for years of experience (possibly search greater than years of experience?)
      // ilike(advocates.yearsOfExperience, `%${searchTerm}%`),
    )
  );

  return Response.json({ data });
}
