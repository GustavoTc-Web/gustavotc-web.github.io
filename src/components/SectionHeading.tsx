import type { ReactNode } from 'react'

export function SectionHeading({ number, label, children }: { number: string; label: string; children?: ReactNode }) {
  return <div className="section-kicker"><span className="section-number">{number}</span><span>{label}</span><span className="kicker-line" />{children}</div>
}
