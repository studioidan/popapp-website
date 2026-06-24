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
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(5,8,16,0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.25s ease',
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(48px) scale(0.95) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--navy)',
        border: `1px solid ${project.color}33`,
        borderRadius: 24,
        maxWidth: 640,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        animation: 'slideUp 0.38s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: `0 32px 80px ${project.color}22`,
      }}>
        {/* Hero image */}
        <div style={{
          width: '100%', height: 220,
          background: `linear-gradient(135deg, ${project.color}22, rgba(8,14,31,0.9))`,
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={project.imageUrl}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${project.color}33, transparent)`,
          }} />
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 8 }}>{project.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: project.color }}>{project.name}</div>
          </div>
          {/* Close */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, left: 16,
            background: 'rgba(5,8,16,0.7)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--grey)', fontSize: '1.1rem',
            width: 36, height: 36, borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--grey)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Tag */}
          <div style={{
            display: 'inline-block',
            background: `${project.color}18`,
            color: project.color,
            border: `1px solid ${project.color}44`,
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 4, marginBottom: 16,
          }}>{project.tag}</div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 0,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden',
            marginBottom: 24,
          }}>
            {project.stats.map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, textAlign: 'center', padding: '16px 12px',
                borderRight: i < project.stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: project.color }}>{stat.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Short desc */}
          <p style={{ color: 'var(--white)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 16, fontWeight: 400 }}>
            {project.desc}
          </p>

          {/* Long desc */}
          <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 28 }}>
            {project.longDesc}
          </p>

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {project.tech.map(t => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--grey)', fontSize: '0.76rem',
                padding: '5px 14px', borderRadius: 20,
              }}>{t}</span>
            ))}
          </div>

          {/* CTA */}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: project.color, color: '#050810',
                textDecoration: 'none', padding: '13px 28px',
                borderRadius: 10, fontWeight: 700, fontSize: '0.95rem',
                fontFamily: 'inherit', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 36px ${project.color}55` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >לאתר הפרויקט ←</a>
          )}
        </div>
      </div>
    </div>
  )
}
