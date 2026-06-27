const LOGO_SRC = '/logo.png'

export default function Logo({ variant = 'header', className = '' }) {
  const heights = {
    header: 56,
    footer: 56,
    admin: 64,
    large: 80,
  }

  const height = heights[variant] || heights.header

  return (
    <img
      src={LOGO_SRC}
      alt="AR Expo Global"
      className={`logo-img logo-img--${variant} ${className}`.trim()}
      height={height}
      decoding="async"
    />
  )
}
