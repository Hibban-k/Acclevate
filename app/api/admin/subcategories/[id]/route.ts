import { handleGetSubcategoryById, handlePutSubcategory, handleDeleteSubcategory } from '@/lib/controllers/subcategory.controller';

export const GET = handleGetSubcategoryById;
export const PUT = handlePutSubcategory;
export const DELETE = handleDeleteSubcategory;
