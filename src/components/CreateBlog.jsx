import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { LIMITS, categories, inputCls, cardCls, labelCls } from '../data/createBlogData';
import { focusRing } from '../data/homeData';

import { MarkdownContent } from '../reuse/MarkdownContent';
import useCreateBlog from '../hooks/useCreateBlog';

const Spinner = () => <Icon icon="svg-spinners:ring-resize" className="w-5 h-5" aria-hidden="true" />;

const CreateBlog = () => {
    const navigate = useNavigate();
    const {
        user, form, tags, words, readMinutes, coverSrc,
        restored, checking, result, error, saving, tab, dragging, imageBroken,
        textareaRef, fileInputRef,
        setTab, setDragging, setImageBroken,
        handleChange, handleImageUrlChange, pickFile, removeImage,
        toolbar, onEditorKeyDown, submit, resetAll, discardDraft,
    } = useCreateBlog();

    /* ---- Screens ---- */
    if (checking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 dark:bg-slate-950 text-blue-600 dark:text-blue-400">
                <Icon icon="svg-spinners:ring-resize" width="48" height="48" aria-hidden="true" />
                <p className="mt-4 text-slate-600 dark:text-slate-400" role="status">Checking your session…</p>
            </div>
        );
    }

    if (!user) {
        return (
            <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20">
                <div className={`${cardCls} max-w-md w-full p-8 text-center`}>
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                        <Icon icon="mdi:account-lock-outline" className="text-3xl" aria-hidden="true" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sign in to write</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">You need an account to create articles.</p>
                    <Link to="/login" className={`inline-flex px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`}>Sign in</Link>
                </div>
            </section>
        );
    }

    if (result) {
        return (
            <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20">
                <div className={`${cardCls} max-w-lg w-full p-8 sm:p-10 text-center`} role="status">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400">
                        <Icon icon={result.publish ? 'mdi:check-circle-outline' : 'mdi:content-save-check-outline'} className="text-4xl" aria-hidden="true" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{result.publish ? 'Your article is live!' : 'Draft saved'}</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {result.publish ? 'Readers can find it on the articles page now.' : 'It is saved as a draft and is not visible to readers yet.'}
                    </p>
                    {result.dropped.length > 0 && (
                        <p className="mb-6 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-800 dark:text-amber-300">
                            Saved without <strong>{result.dropped.join(', ')}</strong>, because your Appwrite table has no such column yet. Add it under Columns to store it next time.
                        </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {result.publish ? (
                            <Link to={`/view-blog/${result.slug}`} className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`}>
                                <Icon icon="mdi:open-in-new" aria-hidden="true" /> View article
                            </Link>
                        ) : (
                            <Link to="/admin-dashboard" className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`}>
                                <Icon icon="mdi:view-dashboard-outline" aria-hidden="true" /> Go to dashboard
                            </Link>
                        )}
                        <button type="button" onClick={resetAll} className={`flex-1 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${focusRing}`}>
                            Write another
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    /* ---- Editor ---- */
    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950" data-testid="create-blog-page">
            {/* Sticky action bar */}
            <div className="sticky top-16 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}>
                            <Icon icon="mdi:arrow-left" className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <div className="min-w-0">
                            <h1 className="font-bold text-slate-900 dark:text-white truncate">New article</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Draft is saved on this device as you type</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => submit(false)} disabled={Boolean(saving)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60 transition-colors ${focusRing}`}>
                            {saving === 'draft' ? <Spinner /> : <Icon icon="mdi:content-save-outline" className="w-5 h-5" aria-hidden="true" />}
                            <span className="hidden sm:inline">Save draft</span>
                        </button>
                        <button type="button" onClick={() => submit(true)} disabled={Boolean(saving)} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed transition-colors ${focusRing}`}>
                            {saving === 'publish' ? <><Spinner />Publishing…</> : <><Icon icon="mdi:send" className="w-5 h-5" aria-hidden="true" />Publish</>}
                        </button>
                    </div>
                </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} noValidate className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-8">
                {/* --------------------------- Main column --------------------------- */}
                <div className="min-w-0 space-y-6">
                    {restored && (
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-3 text-sm text-blue-800 dark:text-blue-200">
                            <span className="flex items-center gap-2"><Icon icon="mdi:history" className="text-lg" aria-hidden="true" />We restored your unsaved draft.</span>
                            <button type="button" onClick={discardDraft} className={`font-semibold underline underline-offset-2 rounded ${focusRing}`}>Discard draft</button>
                        </div>
                    )}

                    {error && (
                        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 px-4 py-3">
                            <Icon icon="mdi:alert-circle" className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Title */}
                    <div className={`${cardCls} p-6`}>
                        <label htmlFor="title" className="sr-only">Article title</label>
                        <input id="title" name="title" type="text" value={form.title} onChange={handleChange} maxLength={LIMITS.title} placeholder="Article title" className="w-full bg-transparent text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white placeholder-slate-400 outline-none" />
                        <p className={`mt-2 text-right text-xs ${form.title.length > LIMITS.title * 0.9 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>{form.title.length}/{LIMITS.title}</p>
                    </div>

                    {/* Editor */}
                    <div className={`${cardCls} overflow-hidden`}>
                        <div className="flex items-center justify-between gap-3 px-4 pt-3 border-b border-slate-200 dark:border-slate-800">
                            <div role="tablist" aria-label="Editor mode" className="flex gap-1">
                                {[{ id: 'write', label: 'Write', icon: 'mdi:pencil-outline' }, { id: 'preview', label: 'Preview', icon: 'mdi:eye-outline' }].map((t) => (
                                    <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${focusRing} ${tab === t.id ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`} >
                                        <Icon icon={t.icon} className="w-5 h-5" aria-hidden="true" />{t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {tab === 'write' ? (
                            <>
                                <div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                    {toolbar.map((b, i) =>
                                        b.divider ? (
                                            <span key={i} className="w-px h-6 mx-1 bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                                        ) : (
                                            <button key={i} type="button" onClick={b.run} title={b.title} aria-label={b.title} className={`p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors ${focusRing}`}>
                                                <Icon icon={b.icon} className="w-5 h-5" aria-hidden="true" />
                                            </button>
                                        )
                                    )}
                                </div>
                                <label htmlFor="content" className="sr-only">Article content (Markdown)</label>
                                <textarea id="content" name="content" ref={textareaRef} value={form.content} onChange={handleChange} onKeyDown={onEditorKeyDown} maxLength={LIMITS.content} placeholder="Start writing… You can use Markdown: ## Heading, **bold**, - list, > quote" className="block w-full min-h-[420px] resize-y p-6 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-mono text-sm leading-7 outline-none" />
                            </>
                        ) : (
                            <div className="p-6 sm:p-8 min-h-[420px]">
                                {form.content.trim() ? (
                                    <>
                                        {form.title.trim() && <h2 className="mb-8 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">{form.title}</h2>}
                                        {coverSrc && !imageBroken && <img src={coverSrc} alt="" onError={() => setImageBroken(true)} className="mb-8 w-full aspect-[21/9] object-cover rounded-2xl border border-slate-200 dark:border-slate-800" />}
                                        <MarkdownContent content={form.content} />
                                    </>
                                ) : (
                                    <p className="text-slate-500 dark:text-slate-400">Nothing to preview yet. Write something in the Write tab.</p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                            <span>{words} {words === 1 ? 'word' : 'words'} · {readMinutes} min read</span>
                            <span className={form.content.length > LIMITS.content * 0.9 ? 'text-amber-600 dark:text-amber-400' : ''}>{form.content.length}/{LIMITS.content} characters</span>
                        </div>
                    </div>
                </div>

                {/* ---------------------------- Sidebar ---------------------------- */}
                <aside className="space-y-6 lg:sticky lg:top-36 h-fit">
                    {/* Cover image */}
                    <div className={`${cardCls} p-5`}>
                        <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Cover image</h2>

                        {coverSrc && !imageBroken ? (
                            <div className="relative group rounded-xl overflow-hidden">
                                <img src={coverSrc} alt="Cover preview" onError={() => setImageBroken(true)} className="w-full aspect-[16/10] object-cover" />
                                <button type="button" onClick={removeImage} aria-label="Remove cover image" className={`absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors ${focusRing}`}>
                                    <Icon icon="mdi:close" className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        ) : (
                            <div role="button" tabIndex={0} onClick={() => fileInputRef.current?.click()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), fileInputRef.current?.click())} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }} className={`rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${focusRing} ${dragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'}`} >
                                <Icon icon="mdi:cloud-upload-outline" className="w-10 h-10 mx-auto mb-2 text-slate-400" aria-hidden="true" />
                                <p className="text-sm text-slate-600 dark:text-slate-300">Click or drag an image here</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to {LIMITS.imageMB} MB</p>
                            </div>
                        )}
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => pickFile(e.target.files?.[0])} className="hidden" aria-label="Upload cover image" />

                        <label htmlFor="imageUrl" className="mt-4 mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">…or paste an image URL</label>
                        <input id="imageUrl" name="imageUrl" type="url" inputMode="url" value={form.imageUrl} onChange={handleImageUrlChange} placeholder="https://images.unsplash.com/…" className={`${inputCls} text-sm py-2.5`} />
                        {imageBroken && <p className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">We couldn’t load this image. Check the link.</p>}
                    </div>

                    {/* Details */}
                    <div className={`${cardCls} p-5 space-y-5`}>
                        <div>
                            <label htmlFor="category" className={labelCls}>Category <span className="text-red-500" aria-hidden="true">*</span></label>
                            <div className="relative">
                                <select id="category" name="category" value={form.category} onChange={handleChange} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className={labelCls}>Tags</label>
                            <input id="tags" name="tags" type="text" value={form.tags} onChange={handleChange} placeholder="react, javascript, web" className={inputCls} />
                            {tags.length > 0 ? (
                                <div className="mt-3 flex flex-wrap gap-2" aria-label="Tag preview">
                                    {tags.map((t) => <span key={t} className="rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">#{t}</span>)}
                                </div>
                            ) : (
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Separate with commas. Up to {LIMITS.tags}.</p>
                            )}
                        </div>
                    </div>

                    {/* Formatting help */}
                    <details className={`${cardCls} p-5 text-sm`}>
                        <summary className={`cursor-pointer font-semibold text-slate-900 dark:text-white rounded ${focusRing}`}>Formatting help</summary>
                        <ul className="mt-3 space-y-1.5 font-mono text-xs text-slate-600 dark:text-slate-400">
                            <li>## Section heading</li>
                            <li>**bold** · *italic* · `code`</li>
                            <li>- bullet · 1. numbered</li>
                            <li>&gt; quote</li>
                            <li>[text](https://link)</li>
                            <li>Ctrl+B · Ctrl+I · Ctrl+K</li>
                        </ul>
                    </details>
                </aside>
            </form>
        </section>
    );
};

export default CreateBlog;
