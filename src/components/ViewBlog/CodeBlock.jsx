import React from 'react'

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

export default CodeBlock
