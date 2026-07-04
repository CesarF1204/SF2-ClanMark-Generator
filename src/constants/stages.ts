import type { StageConfig, LayerStage } from '../types'

export const STAGE_CONFIGS: StageConfig[] = [
  {
    stage: 'background',
    title: 'Stage 1 — Front Logo',
    subtitle: 'Base layer',
    folderName: 'backgrounds',
  },
  {
    stage: 'foreground',
    title: 'Stage 2 — Overlay',
    subtitle: 'Foreground layer',
    folderName: 'foreground',
  },
  {
    stage: 'middle',
    title: 'Stage 3 — Pattern',
    subtitle: 'Middle layer',
    folderName: 'middle',
  },
]

export const STAGE_ORDER: LayerStage[] = ['background', 'middle', 'foreground']

export const STAGE_LABELS: Record<LayerStage, string> = {
  background: 'Logo',
  middle: 'Pattern',
  foreground: 'Overlay',
}