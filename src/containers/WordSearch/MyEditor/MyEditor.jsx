import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import boldIcon from '../../../assets/styling/tiptap/bold.svg';
import italicIcon from '../../../assets/styling/tiptap/italic.svg';
import strikeIcon from '../../../assets/styling/tiptap/strikethrough.svg';
import codeIcon from '../../../assets/styling/tiptap/code-line.svg';
import h_1Icon from '../../../assets/styling/tiptap/h-1.svg';
import h_2Icon from '../../../assets/styling/tiptap/h-2.svg';
import h_3Icon from '../../../assets/styling/tiptap/h-3.svg';
import h_4Icon from '../../../assets/styling/tiptap/h-4.svg';
import h_5Icon from '../../../assets/styling/tiptap/h-5.svg';
import h_6Icon from '../../../assets/styling/tiptap/h-6.svg';
import bulletListIcon from '../../../assets/styling/tiptap/list-check.svg';
import orderedListIcon from '../../../assets/styling/tiptap/list-ordered.svg';
import codeBlockIcon from '../../../assets/styling/tiptap/code-box-line.svg';
import quoteBlockIcon from '../../../assets/styling/tiptap/double-quotes-l.svg';
import horizontalRuleIcon from '../../../assets/styling/tiptap/separator.svg';
import paragraphIcon from '../../../assets/styling/tiptap/paragraph.svg';
import hardBreakIcon from '../../../assets/styling/tiptap/text-wrap.svg';
import clearFormatIcon from '../../../assets/styling/tiptap/format-clear.svg';
import undoIcon from '../../../assets/styling/tiptap/arrow-go-back-line.svg';
import redoIcon from '../../../assets/styling/tiptap/arrow-go-forward-line.svg';
import ReactTooltip from "react-tooltip";


const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <>
            <ReactTooltip id="boldTip" type="light" effect="float" place="bottom" arrowColor="rgba(0, 0, 0, 0)" delayShow={700}>
                Bold
            </ReactTooltip>
            <button
                data-tip data-for="boldTip"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <img src={boldIcon} alt="boldIcon"/><img/>
            </button>


            <ReactTooltip id="italicTip" type="light" effect="float" place="bottom" arrowColor="rgba(0, 0, 0, 0)" delayShow={700}>
                Italic
            </ReactTooltip>
            <button
                data-tip data-for="italicTip"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <img src={italicIcon} alt="italicIcon"/><img/>
            </button>

            <ReactTooltip id="strikeTip" type="light" effect="float" place="bottom" arrowColor="rgba(0, 0, 0, 0)" delayShow={700}>
                Strike
            </ReactTooltip>
            <button
                data-tip data-for="strikeTip"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <img src={strikeIcon} alt="strikeIcon"/><img/>
            </button>

            <ReactTooltip id="codeTip" type="light" effect="float" place="bottom" arrowColor="rgba(0, 0, 0, 0)" delayShow={700}>
                Code
            </ReactTooltip>
            <button
                data-tip data-for="codeTip"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <img src={codeIcon} alt="codeIcon"/><img/>
            </button>

            <ReactTooltip id="clearFormatTip" type="light" effect="float" place="bottom" arrowColor="rgba(0, 0, 0, 0)" delayShow={700}>
                Clear Format
            </ReactTooltip>
            <button
                data-tip data-for="clearFormatTip"
                onClick={() => editor.chain().focus().clearNodes().run()}>
                <img src={clearFormatIcon} alt="clearFormatIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <img src={paragraphIcon} alt="paragraphIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                <img src={h_1Icon} alt="h_1Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                <img src={h_2Icon} alt="h_2Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                <img src={h_3Icon} alt="h_3Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                <img src={h_4Icon} alt="h_4Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
                <img src={h_5Icon} alt="h_5Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
                <img src={h_6Icon} alt="h_6Icon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <img src={bulletListIcon} alt="bulletListIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <img src={orderedListIcon} alt="orderedListIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <img src={codeBlockIcon} alt="codeBlockIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <img src={quoteBlockIcon} alt="quoteBlockIcon"/><img/>
            </button>

            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <img src={horizontalRuleIcon} alt="horizontalRuleIcon"/><img/>
            </button>

            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                <img src={hardBreakIcon} alt="hardBreakIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                <img src={undoIcon} alt="undoIcon"/><img/>
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                <img src={redoIcon} alt="redoIcon"/><img/>
            </button>
        </>
    )
}

function Tiptap() {
    const front = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `
      <h2>
        This is the,
      </h2>
      <p>
        front page:
      </p>
    `,
    })

    return (
        <div>
            <MenuBar editor={front} />
            <EditorContent editor={front} />
        </div>
    )
}

export {
    Tiptap
}

