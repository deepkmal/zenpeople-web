import type { RichTextContent, RichTextNode } from '../../utils/payload-api'

interface RichTextRendererProps {
  content: RichTextContent | undefined | null
  className?: string
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content?.root?.children) {
    return null
  }

  return (
    <div className={`rich-text ${className}`}>
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node} insideListItem={false} />
      ))}
    </div>
  )
}

interface RenderNodeProps {
  node: RichTextNode
  insideListItem?: boolean
}

function RenderNode({ node, insideListItem = false }: RenderNodeProps) {
  if (!node) return null

  // Text node
  if (node.type === 'text') {
    return <>{node.text}</>
  }

  // Paragraph - render as span if inside list item
  if (node.type === 'paragraph') {
    if (insideListItem) {
      return (
        <span className="text-gray-600">
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} insideListItem />
          ))}
        </span>
      )
    }
    return (
      <p className="mb-4 text-gray-600 last:mb-0">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </p>
    )
  }

  // Headings
  if (node.type === 'heading') {
    const HeadingTag = (node.tag || 'h3') as keyof JSX.IntrinsicElements
    const headingClasses: Record<string, string> = {
      h1: 'text-2xl font-bold text-navy mb-4',
      h2: 'text-xl font-bold text-navy mb-3',
      h3: 'text-lg font-semibold text-navy mb-2',
      h4: 'text-base font-semibold text-navy mb-2',
      h5: 'text-sm font-semibold text-navy mb-2',
      h6: 'text-sm font-semibold text-navy mb-2',
    }
    return (
      <HeadingTag className={headingClasses[node.tag || 'h3'] || headingClasses.h3}>
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </HeadingTag>
    )
  }

  // List
  if (node.type === 'list') {
    const ListTag = node.listType === 'number' ? 'ol' : 'ul'
    const listClass =
      node.listType === 'number'
        ? 'list-decimal list-inside mb-4 space-y-1'
        : 'list-disc list-inside mb-4 space-y-1'
    return (
      <ListTag className={listClass}>
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </ListTag>
    )
  }

  // List item
  if (node.type === 'listitem') {
    return (
      <li className="text-gray-600">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} insideListItem />
        ))}
      </li>
    )
  }

  // Link
  if (node.type === 'link') {
    return (
      <a
        href={(node as any).url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2175D9] hover:underline"
      >
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </a>
    )
  }

  // Bold
  if (node.type === 'bold' || (node as any).format === 'bold') {
    return (
      <strong className="font-semibold">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </strong>
    )
  }

  // Italic
  if (node.type === 'italic' || (node as any).format === 'italic') {
    return (
      <em>
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </em>
    )
  }

  // Quote
  if (node.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600 mb-4">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </blockquote>
    )
  }

  // Default: render children
  if (node.children) {
    return (
      <>
        {node.children.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </>
    )
  }

  return null
}
