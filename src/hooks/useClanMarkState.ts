import { useCallback, useMemo, useReducer } from 'react'
import type { AssetItem, FullSelection, LayerStage, StageCategories } from '../types'

type SelectionAction =
  | { type: 'SELECT_CATEGORY'; stage: LayerStage; categoryId: string }
  | { type: 'SELECT_ASSET'; stage: LayerStage; asset: AssetItem }
  | { type: 'DESELECT_STAGE'; stage: LayerStage }
  | { type: 'RESET' }
  | {
      type: 'RANDOMIZE'
      categories: StageCategories
    }

interface StageSelectionState {
  selectedCategoryId: string | null
  selectedAsset: AssetItem | null
}

const initialStageState: StageSelectionState = {
  selectedCategoryId: null,
  selectedAsset: null,
}

const initialSelection: FullSelection = {
  background: { ...initialStageState },
  middle: { ...initialStageState },
  foreground: { ...initialStageState },
}

function selectionReducer(
  state: FullSelection,
  action: SelectionAction,
): FullSelection {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        [action.stage]: {
          selectedCategoryId: action.categoryId,
          selectedAsset: null, // Reset asset when category changes
        },
      }
    case 'SELECT_ASSET':
      return {
        ...state,
        [action.stage]: {
          ...state[action.stage],
          selectedAsset: action.asset,
        },
      }
    case 'DESELECT_STAGE':
      return {
        ...state,
        [action.stage]: {
          selectedCategoryId: null,
          selectedAsset: null,
        },
      }
    case 'RESET':
      return initialSelection
    case 'RANDOMIZE': {
      const { categories } = action
      const randomSelection: FullSelection = {} as FullSelection

      for (const stage of ['background', 'middle', 'foreground'] as LayerStage[]) {
        const stageCategories = categories[stage]
        if (stageCategories.length === 0) {
          randomSelection[stage] = { ...initialStageState }
        } else {
          const randomCategory = stageCategories[Math.floor(Math.random() * stageCategories.length)]
          const assets = randomCategory.assets
          const randomAsset = assets.length > 0 ? assets[Math.floor(Math.random() * assets.length)] : null

          randomSelection[stage] = {
            selectedCategoryId: randomCategory.id,
            selectedAsset: randomAsset,
          }
        }
      }

      return randomSelection
    }
    default:
      return state
  }
}

export function useClanMarkState(categories: StageCategories) {
  const [selection, dispatch] = useReducer(selectionReducer, initialSelection)

  const selectCategory = useCallback((stage: LayerStage, categoryId: string) => {
    dispatch({ type: 'SELECT_CATEGORY', stage, categoryId })
  }, [])

  const selectAsset = useCallback((stage: LayerStage, asset: AssetItem) => {
    dispatch({ type: 'SELECT_ASSET', stage, asset })
  }, [])

  const deselectStage = useCallback((stage: LayerStage) => {
    dispatch({ type: 'DESELECT_STAGE', stage })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const randomize = useCallback(() => {
    dispatch({ type: 'RANDOMIZE', categories })
  }, [categories])

  // Get layer URLs for preview (filtered to only include selected assets)
  // Order: Stage 1 (Background), Stage 2 (Foreground), Stage 3 (Middle)
  // After .reverse() → Stage 3 top, Stage 2 middle, Stage 1 bottom
  const layerUrls = useMemo(() => {
    const urls: string[] = []

    // Stage 1 - Background (will be at bottom after reversal)
    if (selection.background.selectedAsset) {
      urls.push(selection.background.selectedAsset.path)
    }
    // Stage 2 - Foreground (will be at middle after reversal)
    if (selection.foreground.selectedAsset) {
      urls.push(selection.foreground.selectedAsset.path)
    }
    // Stage 3 - Middle (will be at top after reversal)
    if (selection.middle.selectedAsset) {
      urls.push(selection.middle.selectedAsset.path)
    }

    return urls
  }, [selection])

  const hasSelection = layerUrls.length > 0

  const isComplete =
    selection.background.selectedAsset !== null &&
    selection.middle.selectedAsset !== null &&
    selection.foreground.selectedAsset !== null

  // Get current category's assets for display
  const getCurrentAssets = useCallback((stage: LayerStage): AssetItem[] => {
    const stageSelection = selection[stage]
    if (!stageSelection.selectedCategoryId) return []
    const category = categories[stage].find(c => c.id === stageSelection.selectedCategoryId)
    return category?.assets ?? []
  }, [selection, categories])

  return {
    selection,
    selectCategory,
    selectAsset,
    deselectStage,
    reset,
    randomize,
    layerUrls,
    hasSelection,
    isComplete,
    getCurrentAssets,
  }
}