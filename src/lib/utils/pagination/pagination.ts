import { PagePagination, PaginatedResponse } from './types';
import { Query } from 'mongoose';

export const paginate = async <Doc>(
  qb: Query<Doc[], Doc>,
  options: PagePagination,
): Promise<PaginatedResponse<Doc>> => {
  const pageSize = options.pageSize ?? 0;
  const page = options.page ?? 1;
  const pageIndex = page - 1;

  const results = await qb
    .limit(pageSize)
    .skip(pageIndex * pageSize)
    .exec();
  const total = await qb.countDocuments();

  const totalPages = Math.ceil(total / pageSize);
  const hasMore = total > page * pageSize;

  return {
    items: results,
    hasMore,
    page,
    perPage: results.length,
    totalPages,
    total,
  };
};
