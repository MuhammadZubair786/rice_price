export default function SectionHead({ tag, title, description, align = 'center' }) {
  return (
    <div className={`section-head ${align === 'left' ? 'section-head--left' : ''}`}>
      {tag && <p className="section-tag">{tag}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
