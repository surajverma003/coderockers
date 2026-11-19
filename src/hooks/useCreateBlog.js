import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import myContext from '../context/myContext';
import { DRAFT_KEY, LIMITS, emptyForm } from '../data/createBlogData';
import { readDraft, slugify, makeUniqueSlug, parseTags, uploadImage, createWithFallback } from '../utils/createBlogUtils';

const useCreateBlog = () => {
    const { user, checkStatus, getBlogs } = useContext(myContext);

    const [restored, setRestored] = useState(() => Boolean(readDraft()));
    const [form, setForm] = useState(() => readDraft() || emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [imageBroken, setImageBroken] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [tab, setTab] = useState('write');
    const [saving, setSaving] = useState(null); // null | 'draft' | 'publish'
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [checking, setChecking] = useState(!user);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const tags = useMemo(() => parseTags(form.tags), [form.tags]);
    const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
    const readMinutes = Math.max(1, Math.ceil(words / 200));
    const coverSrc = filePreview || form.imageUrl.trim();

    /* ---- Session check ---- */
    useEffect(() => {
        if (user) {
            setChecking(false);
            return undefined;
        }
        let alive = true;
        Promise.resolve(checkStatus?.()).finally(() => alive && setChecking(false));
        return () => { alive = false; };
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ---- Draft autosave (is device par) ---- */
    useEffect(() => {
        if (result) return undefined;
        const timer = setTimeout(() => {
            try {
                if (form.title || form.content) localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
                else localStorage.removeItem(DRAFT_KEY);
            } catch { /* storage full/band ho to ignore */ }
        }, 800);
        return () => clearTimeout(timer);
    }, [form, result]);

    /* ---- Local image preview URL cleanup ---- */
    useEffect(() => () => { if (filePreview) URL.revokeObjectURL(filePreview); }, [filePreview]);

    const setField = (name, value) => {
        setForm((f) => ({ ...f, [name]: value }));
        setError('');
    };
    const handleChange = (e) => setField(e.target.name, e.target.value);

    /* ---- Image ---- */
    const pickFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return setError('Please choose an image file (PNG, JPG, GIF, WebP).');
        if (file.size > LIMITS.imageMB * 1024 * 1024) return setError(`Image must be smaller than ${LIMITS.imageMB} MB.`);
        setError('');
        setImageBroken(false);
        setImageFile(file);
        setFilePreview(URL.createObjectURL(file));
        setField('imageUrl', '');
    };

    const removeImage = () => {
        setImageFile(null);
        setFilePreview('');
        setImageBroken(false);
        setField('imageUrl', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Image URL input change (paste URL => uploaded file hata do)
    const handleImageUrlChange = (e) => {
        handleChange(e);
        setImageBroken(false);
        if (imageFile) {
            setImageFile(null);
            setFilePreview('');
        }
    };

    /* ---- Markdown toolbar ---- */
    const edit = (fn) => {
        const ta = textareaRef.current;
        if (!ta) return;
        const { text, start, end } = fn(ta.value, ta.selectionStart, ta.selectionEnd);
        setField('content', text);
        requestAnimationFrame(() => {
            ta.focus();
            ta.setSelectionRange(start, end);
        });
    };

    const wrap = (before, after = before, placeholder = 'text') =>
        edit((v, s, e) => {
            const sel = v.slice(s, e) || placeholder;
            return { text: v.slice(0, s) + before + sel + after + v.slice(e), start: s + before.length, end: s + before.length + sel.length };
        });

    const prefixLines = (makePrefix) =>
        edit((v, s, e) => {
            const lineStart = v.lastIndexOf('\n', s - 1) + 1;
            const nl = v.indexOf('\n', e);
            const lineEnd = nl === -1 ? v.length : nl;
            const out = v.slice(lineStart, lineEnd).split('\n').map((line, i) => makePrefix(i) + line).join('\n');
            return { text: v.slice(0, lineStart) + out + v.slice(lineEnd), start: lineStart, end: lineStart + out.length };
        });

    const insertLink = (image = false) =>
        edit((v, s, e) => {
            const label = v.slice(s, e) || (image ? 'alt text' : 'link text');
            const url = 'https://';
            const md = `${image ? '!' : ''}[${label}](${url})`;
            const urlStart = s + md.length - url.length - 1;
            return { text: v.slice(0, s) + md + v.slice(e), start: urlStart, end: urlStart + url.length };
        });

    const codeBlock = () =>
        edit((v, s, e) => {
            const sel = v.slice(s, e) || 'code';
            const lead = s > 0 && v[s - 1] !== '\n' ? '\n' : '';
            const open = lead + '```js\n';
            return { text: v.slice(0, s) + open + sel + '\n```\n' + v.slice(e), start: s + open.length, end: s + open.length + sel.length };
        });

    const toolbar = [
        { icon: 'mdi:format-bold', title: 'Bold (Ctrl+B)', run: () => wrap('**', '**', 'bold text') },
        { icon: 'mdi:format-italic', title: 'Italic (Ctrl+I)', run: () => wrap('*', '*', 'italic text') },
        { divider: true },
        { icon: 'mdi:format-header-2', title: 'Heading 2', run: () => prefixLines(() => '## ') },
        { icon: 'mdi:format-header-3', title: 'Heading 3', run: () => prefixLines(() => '### ') },
        { divider: true },
        { icon: 'mdi:format-list-bulleted', title: 'Bulleted list', run: () => prefixLines(() => '- ') },
        { icon: 'mdi:format-list-numbered', title: 'Numbered list', run: () => prefixLines((i) => `${i + 1}. `) },
        { icon: 'mdi:format-quote-close', title: 'Quote', run: () => prefixLines(() => '> ') },
        { divider: true },
        { icon: 'mdi:code-tags', title: 'Inline code', run: () => wrap('`', '`', 'code') },
        { icon: 'mdi:code-braces-box', title: 'Code block', run: codeBlock },
        { icon: 'mdi:link-variant', title: 'Link (Ctrl+K)', run: () => insertLink(false) },
        { icon: 'mdi:image-outline', title: 'Image', run: () => insertLink(true) },
    ];

    const onEditorKeyDown = (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;
        const key = e.key.toLowerCase();
        if (key === 'b') { e.preventDefault(); wrap('**', '**', 'bold text'); }
        if (key === 'i') { e.preventDefault(); wrap('*', '*', 'italic text'); }
        if (key === 'k') { e.preventDefault(); insertLink(false); }
    };

    /* ---- Submit ---- */
    const fail = (message) => { setError(message); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const submit = async (publish) => {
        if (saving) return;
        setError('');

        const title = form.title.trim();
        const content = form.content.trim();
        const imageUrl = form.imageUrl.trim();

        if (!title) return fail('Please enter a title.');
        if (!content) return fail('Please write some content.');
        if (content.length > LIMITS.content) return fail(`Content is too long (${content.length}/${LIMITS.content} characters).`);
        if (publish && !form.category) return fail('Please choose a category before publishing.');
        if (imageUrl && !/^https?:\/\//i.test(imageUrl)) return fail('Image URL must start with http:// or https://');

        setSaving(publish ? 'publish' : 'draft');
        try {
            const image = imageFile ? await uploadImage(imageFile) : imageUrl;
            const slug = await makeUniqueSlug(slugify(title) || 'untitled');

            const data = {
                title,
                content,
                slug,
                views: 0,
                author: user.name || user.email?.split('@')[0] || 'Anonymous',
                is_published: publish,
                category: form.category || 'General',
                ...(tags.length ? { tags } : {}),
                ...(image ? { image } : {}),
            };

            const { dropped } = await createWithFallback(data);

            try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
            try { await getBlogs?.(true); } catch { /* list refresh fail hona publish ko fail nahi karta */ }
            setResult({ slug, publish, dropped });
            window.scrollTo({ top: 0 });
        } catch (err) {
            console.error('Create blog error:', err?.message);
            fail(err?.code === 401 ? 'You do not have permission to create articles. Check the collection permissions in Appwrite.' : err?.message || 'Could not save the article. Please try again.');
        } finally {
            setSaving(null);
        }
    };

    const resetAll = () => {
        setForm(emptyForm);
        removeImage();
        setResult(null);
        setRestored(false);
        setTab('write');
    };

    const discardDraft = () => {
        if (!window.confirm('Discard this draft?')) return;
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
        resetAll();
    };

    return {
        // state
        user, form, tags, words, readMinutes, coverSrc,
        restored, checking, result, error, saving, tab, dragging, imageBroken,
        // refs
        textareaRef, fileInputRef,
        // setters
        setTab, setDragging, setImageBroken,
        // handlers
        handleChange, handleImageUrlChange, pickFile, removeImage,
        toolbar, onEditorKeyDown, submit, resetAll, discardDraft,
    };
};

export default useCreateBlog;
