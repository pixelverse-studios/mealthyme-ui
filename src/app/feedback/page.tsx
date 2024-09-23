'use client'
import { useState, useMemo } from 'react'
import { TextInput, Select, Button } from '@mantine/core'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { FaCheck } from 'react-icons/fa6'
import { useMutation } from '@apollo/client'

import { isHandledError } from '../../utils/gql'
import Banner from '../../components/banner'
import { SUBMIT_FEEDBACK } from '../../lib/gql/mutations/feedback'
import StringUtils from '../../utils/validations/strings'
import { useUserStore } from '../../lib/store'
import styles from './Feedback.module.css'

import '@mantine/tiptap/styles.css'

export default function FeedbackPage() {
  const { profile } = useUserStore()

  const [loading, setLoading] = useState<boolean>(false)
  const [request, setRequest] = useState<string | null>('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: ''
  })

  const [createFeedback] = useMutation(SUBMIT_FEEDBACK, {
    onCompleted({ createFeedback: data }) {
      if (isHandledError(data)) {
        setLoading(false)
        return Banner.Error(data.message)
      }
      setLoading(false)
      return Banner.Success('Your feedback request was submitted')
    },
    onError() {
      setLoading(false)
      return Banner.Error(`There was an issue submitting your feedback request`)
    }
  })

  const onSubmit = async () => {
    setLoading(true)
    createFeedback({
      variables: {
        userId: profile._id,
        payload: { request, description: editor?.getHTML() }
      }
    })
  }

  const disabled = useMemo(
    () => editor?.isEmpty || StringUtils.isEmpty(request ?? ''),
    [editor, request]
  )

  return (
    <section className={styles.FeedbackPage}>
      <h1>Feedback</h1>
      <form className={styles.form}>
        <fieldset className={`${styles.fieldSet} ${styles.doubleCol}`}>
          <TextInput label="Email" id="email" value={profile?.email} disabled />
          <Select
            label="Request"
            placeholder="Select one"
            data={['Bug/Issue', 'General Feedback', 'New Feature']}
            searchable
            clearable
            onChange={e => setRequest(e)}
            value={request}
          />
        </fieldset>
        <fieldset className={styles.fieldSet}>
          <label htmlFor="description">Description</label>
          <RichTextEditor
            id="description"
            editor={editor}
            className={styles.textEditor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className={styles.textContent} />
          </RichTextEditor>
        </fieldset>
        <div className={styles.actions}>
          <Button
            loading={loading}
            variant="filled"
            rightSection={<FaCheck />}
            onClick={onSubmit}
            disabled={disabled}>
            Submit Feedback
          </Button>
        </div>
      </form>
    </section>
  )
}
