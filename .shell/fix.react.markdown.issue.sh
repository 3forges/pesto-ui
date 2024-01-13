#!/bin/bash

echo "Fiwing \"[./node_modules/.pnpm/react-markdown@8.0.7_@preact+compat@17.1.2_@types+react@18.2.31/node_modules/react-markdown/lib/complex-types.ts]\""

ls -alh ./node_modules/.pnpm/react-markdown@8.0.7_@preact+compat@17.1.2_@types+react@18.2.31/node_modules/react-markdown/lib/complex-types.ts

cat <<EOF >./addon.react.markdown.ts
// import type {ReactNode, ComponentType, ComponentPropsWithoutRef} from 'react'
import type {Position} from 'unist'
import type {Element} from 'hast'
import { ReactNode } from 'preact/compat'

/* File for types which are not handled correctly in JSDoc mode */

export type ReactMarkdownProps = {
  node: Element
  children: ReactNode[]
  /**
   * Passed when \`options.rawSourcePos\` is given
   */
  sourcePosition?: Position
  /**
   * Passed when \`options.includeElementIndex\` is given
   */
  index?: number
  /**
   * Passed when \`options.includeElementIndex\` is given
   */
  siblingCount?: number
}

export type NormalComponents = {
  [TagName in keyof JSX.IntrinsicElements]:
    | keyof JSX.IntrinsicElements
    //| ComponentType<ComponentPropsWithoutRef<TagName> & ReactMarkdownProps>
}
EOF


cat ./addon.react.markdown.ts | tee ./node_modules/.pnpm/react-markdown@8.0.7_@preact+compat@17.1.2_@types+react@18.2.31/node_modules/react-markdown/lib/complex-types.ts
rm ./addon.react.markdown.ts