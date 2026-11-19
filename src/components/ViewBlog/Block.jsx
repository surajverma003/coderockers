import React from 'react';
import CodeBlock from './CodeBlock';
import { safeUrl } from '../../utils/viewBlogUtils';

// **bold**, *italic*, `code`, [text](url)
export const renderInline = (text) => {
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

export default Block;
