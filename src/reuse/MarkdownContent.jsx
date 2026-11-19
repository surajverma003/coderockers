import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { focusRing } from '../data/homeData';

// Shared Markdown renderer: ViewBlog (article page) aur CreateBlog (Preview tab) dono yahi use karte hain,
// isliye editor mein jo dikhta hai wahi article page par dikhta hai.

/* ==========================================================================
   Content renderer: plain text + Markdown (bina dangerouslySetInnerHTML ke)
   ========================================================================== */

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const stripInline = (text) =>
    text
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*`]/g, '')
        .trim();

const safeUrl = (url) => (/^(https?:\/\/|mailto:|\/|#)/i.test(url) ? url : null);

const isBlockStart = (l) =>
    /^```/.test(l) ||
    /^#{1,4}\s/.test(l) ||
    /^>\s?/.test(l) ||
    /^\s*[-*+]\s+/.test(l) ||
    /^\s*\d+[.)]\s+/.test(l) ||
    /^(-{3,}|\*{3,}|_{3,})\s*$/.test(l) ||
    /^!\[[^\]]*\]\([^)\s]+\)\s*$/.test(l);

const parseBlocks = (content) => {
    const text = String(content || '').replace(/\r\n/g, '\n');
    const lines = text.split('\n');
    // Agar blank line hai hi nahi, to har line ko alag paragraph maano (plain text content)
    const singleBreaks = !/\n\s*\n/.test(text) && text.includes('\n');

    const blocks = [];
    const usedIds = new Map();
    const makeId = (raw) => {
        const base = slugify(raw) || 'section';
        const n = usedIds.get(base) || 0;
        usedIds.set(base, n + 1);
        return n ? `${base}-${n}` : base;
    };

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) {
            i++;
            continue;
        }

        const fence = line.match(/^```(\w+)?\s*$/);
        if (fence) {
            const code = [];
            i++;
            while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
            i++;
            blocks.push({ type: 'code', lang: fence[1] || '', text: code.join('\n') });
            continue;
        }

        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
            const text = heading[2].trim();
            blocks.push({ type: 'heading', level: Math.max(2, heading[1].length), text, id: makeId(stripInline(text)) });
            i++;
            continue;
        }

        if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
            blocks.push({ type: 'hr' });
            i++;
            continue;
        }

        const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
        if (img) {
            blocks.push({ type: 'image', alt: img[1], src: img[2] });
            i++;
            continue;
        }

        if (/^>\s?/.test(line)) {
            const quote = [];
            while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
            blocks.push({ type: 'quote', text: quote.join(' ') });
            continue;
        }

        const ul = /^\s*[-*+]\s+(.*)$/;
        const ol = /^\s*\d+[.)]\s+(.*)$/;
        if (ul.test(line) || ol.test(line)) {
            const ordered = ol.test(line);
            const re = ordered ? ol : ul;
            const items = [];
            while (i < lines.length && re.test(lines[i])) items.push(lines[i++].match(re)[1]);
            blocks.push({ type: 'list', ordered, items });
            continue;
        }

        const para = [];
        while (i < lines.length && lines[i].trim() && (para.length === 0 || !isBlockStart(lines[i]))) {
            para.push(lines[i++].trim());
            if (singleBreaks) break;
        }
        blocks.push({ type: 'p', text: para.join(' ') });
    }
    return blocks;
};

// **bold**, *italic*, `code`, [text](url)
const renderInline = (text) => {
    const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
    const nodes = [];
    let last = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > last) nodes.push(text.slice(last, match.index));
        const token = match[0];

        if (token.startsWith('`')) {
            nodes.push(
                <code key={key++} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[0.9em] font-mono text-pink-600 dark:text-pink-400">
                    {token.slice(1, -1)}
                </code>
            );
        } else if (token.startsWith('**')) {
            nodes.push(
                <strong key={key++} className="font-semibold text-slate-900 dark:text-white">
                    {token.slice(2, -2)}
                </strong>
            );
        } else if (token.startsWith('*')) {
            nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
        } else {
            const link = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
            const url = link && safeUrl(link[2]);
            nodes.push(
                url ? (
                    <a key={key++} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300" >
                        {link[1]}
                    </a>
                ) : (
                    link?.[1] || token
                )
            );
        }
        last = regex.lastIndex;
    }
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
};

/* ------------------------------ Small parts ------------------------------ */

const CodeBlock = ({ code, lang }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">{lang || 'code'}</span>
                <button type="button" onClick={copy} className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white rounded ${focusRing}`} >
                    <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className="w-4 h-4" /> {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-7 font-mono text-slate-200">
                <code>{code}</code>
            </pre>
        </div>
    );
};

const Block = ({ block }) => {
    switch (block.type) {
        case 'heading': {
            const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
            const size = block.level === 2 ? 'text-2xl sm:text-3xl mt-12' : block.level === 3 ? 'text-xl sm:text-2xl mt-10' : 'text-lg mt-8';
            return (
                <Tag id={block.id} className={`group scroll-mt-24 font-bold tracking-tight text-slate-900 dark:text-white ${size}`}>
                    {renderInline(block.text)}
                    <a href={`#${block.id}`} aria-label="Link to this section" className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity">
                        #
                    </a>
                </Tag>
            );
        }
        case 'code':
            return <CodeBlock code={block.text} lang={block.lang} />;
        case 'quote':
            return (
                <blockquote className="border-l-4 border-blue-500 pl-5 py-1 text-lg italic leading-8 text-slate-600 dark:text-slate-300">
                    {renderInline(block.text)}
                </blockquote>
            );
        case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return (
                <List className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 text-lg leading-8 text-slate-700 dark:text-slate-300 marker:text-blue-500`}>
                    {block.items.map((item, index) => (
                        <li key={index}>{renderInline(item)}</li>
                    ))}
                </List>
            );
        }
        case 'image': {
            const src = safeUrl(block.src);
            return src ? <img src={src} alt={block.alt} loading="lazy" className="w-full rounded-xl border border-slate-200 dark:border-slate-800" /> : null;
        }
        case 'hr':
            return <hr className="border-slate-200 dark:border-slate-800 my-10" />;
        default:
            return <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">{renderInline(block.text)}</p>;
    }
};

export { parseBlocks, stripInline, Block };

// Poora content ek jagah render karne ke liye
export const MarkdownContent = ({ content }) => (
    <div className="space-y-6">
        {parseBlocks(content).map((block, index) => (
            <Block key={index} block={block} />
        ))}
    </div>
);
