import { databases, DATABASE_ID } from '../appwrite/appwrite';
import { BLOGS_COLLECTION_ID } from '../data/adminDashboardData';

// Post publish / unpublish (error caller handle karta hai)
export const setBlogPublished = (blogId, published) =>
    databases.updateDocument(DATABASE_ID, BLOGS_COLLECTION_ID, blogId, { is_published: published });

export const deleteBlog = (blogId) =>
    databases.deleteDocument(DATABASE_ID, BLOGS_COLLECTION_ID, blogId);
