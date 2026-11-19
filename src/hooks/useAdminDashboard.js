import { useContext, useEffect, useMemo, useState } from 'react';
import myContext from '../context/myContext';
import { ROWS_SHOWN } from '../data/adminDashboardData';
import { setBlogPublished, deleteBlog } from '../api/adminDashboardApi';
import { isPublished, calcStats, getTopPosts, filterPosts, buildStatCards, buildTabs } from '../utils/adminDashboardUtils';

const useAdminDashboard = () => {
    const { user, blogs, getBlogs, blogsLoading, blogsError, timeFormat } = useContext(myContext);

    const [filter, setFilter] = useState('all'); // all | published | drafts
    const [busyId, setBusyId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [actionError, setActionError] = useState('');

    useEffect(() => {
        if (user) getBlogs();
    }, [user, getBlogs]);

    // Escape dabane pe delete popup band
    useEffect(() => {
        if (!deleteTarget) return;
        const onKey = (e) => e.key === 'Escape' && !busyId && setDeleteTarget(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [deleteTarget, busyId]);

    const list = blogs || [];

    const stats = useMemo(() => calcStats(list), [list]);
    const topPosts = useMemo(() => getTopPosts(list), [list]);
    const maxViews = topPosts[0]?.views || 1;
    const filtered = useMemo(() => filterPosts(list, filter), [list, filter]);
    const rows = filtered.slice(0, ROWS_SHOWN);

    const statCards = buildStatCards(stats);
    const tabs = buildTabs(stats);
    const initialLoading = blogsLoading && list.length === 0;

    const togglePublish = async (blog) => {
        setBusyId(blog.$id);
        setActionError('');
        try {
            await setBlogPublished(blog.$id, !isPublished(blog));
            await getBlogs(true);
        } catch (err) {
            console.error('Update Error:', err.message);
            setActionError(err.message || 'Could not update the post.');
        } finally {
            setBusyId(null);
        }
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setBusyId(deleteTarget.$id);
        setActionError('');
        try {
            await deleteBlog(deleteTarget.$id);
            setDeleteTarget(null);
            await getBlogs(true);
        } catch (err) {
            console.error('Delete Error:', err.message);
            setDeleteTarget(null);
            setActionError(err.message || 'Could not delete the post.');
        } finally {
            setBusyId(null);
        }
    };

    return {
        user, timeFormat, getBlogs, blogsLoading, blogsError,
        filter, setFilter, filtered, rows, topPosts, maxViews, statCards, tabs, initialLoading,
        busyId, deleteTarget, setDeleteTarget, actionError,
        togglePublish, confirmDelete,
    };
};

export default useAdminDashboard;
