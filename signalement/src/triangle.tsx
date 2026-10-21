import { React } from 'jimu-core'

interface Props {
  color: string
  iconUrl?: string
  size?: number
}

/** Triangle de couleur avec, au centre, le PNG choisi */
export const Triangle = ({ color, iconUrl, size = 36 }: Props) => (
  <svg
    width={size}
    height={Math.round(size * 0.9)}
    viewBox="0 0 40 36"
    aria-hidden="true"
    style={{ flex: '0 0 auto' }}
  >
    <polygon points="20,3 37,33 3,33" fill="#FFFFFF" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    {iconUrl && (
      <image href={iconUrl} x="14" y="17" width="12" height="12" preserveAspectRatio="xMidYMid meet" />
    )}
  </svg>
)
