'use client'
import { useEffect } from 'react'
import { Project } from '@/lib/projects'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(5,8,16,0.85)',
        backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--navy)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '48px',
          maxWidth: 560,
          width: '90%',
          position: 'relative',
          animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, left: 20,
            background: 'none', border: 'none',
            color: 'var(--grey)', fontSize: '1.4rem',
            cursor: 'pointer', lineHeight: 1, fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey)')}
        >✕</button>

        {/* Tag */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,229,255,0.1)',
          color: 'var(--cyan)',
          border: '1px solid var(--border)',
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 4,
          marginBottom: 16,
        }}>{project.tag}</div>

        {/* Icon + Title */}
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>{project.icon}</div>
        <h3 style={{
          fontSize: '2rem', fontWeight: 900, marginBottom: 12,
          color: project.color,
        }}>{project.name}</h3>

        {/* Desc */}
        <p style={{
          color: 'var(--grey)', lineHeight: 1.75,
          fontSize: '0.97rem', marginBottom: 28,
        }}>{project.desc}</p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--grey)',
              fontSize: '0.76rem',
              padding: '4px 12px', borderRadius: 20,
            }}>{t}</span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--cyan)', color: 'var(--black)',
              textDecoration: 'none',
              padding: '12px 28px', borderRadius: 8,
              fontWeight: 700, fontSize: '0.95rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            לאתר הפרויקט →
          </a>
        )}
      </div>
    </div>
  )
}
